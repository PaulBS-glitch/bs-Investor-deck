/* BuySooner Roadmap LVR status bands
   Purpose: keep the core maths unchanged, but avoid treating 80.1% LVR as a hard failure. */
(function () {
  function num(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    var parsed = Number(String(value == null ? '' : value).replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function money(value) {
    return '$' + Math.round(num(value)).toLocaleString('en-AU');
  }

  function pct(value) {
    return (num(value) * 100).toFixed(1) + '%';
  }

  function getStatus(lvr) {
    if (lvr <= 0.80) {
      return {
        key: 'green',
        label: 'Green Light',
        page9Label: 'Likely step-out point',
        tone: 'This scenario suggests you may be refinance-ready.',
        action: 'At this point, a standard bank refinance may be workable, subject to valuation, serviceability, credit assessment and lender policy.'
      };
    }

    if (lvr <= 0.82) {
      return {
        key: 'near',
        label: 'Near Ready',
        page9Label: 'Broker review point',
        tone: 'This scenario is close to the standard refinance range.',
        action: 'A broker would review lender options, valuation, income, repayments and policy settings before confirming whether refinance is workable.'
      };
    }

    if (lvr <= 0.85) {
      return {
        key: 'more-equity',
        label: 'More Equity Needed',
        page9Label: 'More equity needed',
        tone: 'This scenario is moving in the right direction, but is still above the preferred refinance range.',
        action: 'More property growth, mortgage reduction, extra repayments or additional time may be needed before a standard refinance is likely to work.'
      };
    }

    return {
      key: 'not-yet',
      label: 'Not Yet',
      page9Label: 'Not yet',
      tone: 'This scenario is still outside the likely refinance range.',
      action: 'The practical focus is to keep building equity, reduce the mortgage balance where possible and review again as the numbers improve.'
    };
  }

  function payment(loan, annualRate, termYears) {
    loan = num(loan);
    annualRate = num(annualRate);
    termYears = num(termYears) || 30;
    if (!loan) return 0;
    var monthlyRate = annualRate / 12;
    var totalMonths = termYears * 12;
    if (!monthlyRate) return loan / totalMonths;
    return loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths));
  }

  function remainingBalance(loan, annualRate, termYears, months, extraMonthly) {
    loan = num(loan);
    annualRate = num(annualRate);
    termYears = num(termYears) || 30;
    months = Math.max(0, Math.round(num(months)));
    extraMonthly = Math.max(0, num(extraMonthly));
    if (!loan || months <= 0) return loan;

    var monthlyRate = annualRate / 12;
    var monthlyPayment = payment(loan, annualRate, termYears) + extraMonthly;
    var balance = loan;

    for (var i = 0; i < months; i++) {
      balance = Math.max(0, balance + (balance * monthlyRate) - monthlyPayment);
      if (balance <= 0) break;
    }

    return balance;
  }

  function base(data) {
    var d = data || {};
    var property = d.property || {};
    var finance = d.finance || {};
    var derived = d.derived || {};
    var price = num(property.targetPurchasePrice) || 1000000;
    var deposit = num(finance.customerContribution || finance.customerSavings || derived.customerContribution) || 100000;
    var boost = num(finance.buySoonerBoost || derived.buySoonerBoost) || Math.max(0, price * 0.2 - deposit) || 100000;
    var bankLoan = num(finance.estimatedBankLoan || derived.estimatedBankLoan) || Math.max(0, price - deposit - boost) || 800000;

    return {
      price: price,
      deposit: deposit,
      boost: boost,
      bankLoan: bankLoan,
      years: 30
    };
  }

  function scenario(data, input) {
    var b = base(data);
    var growth = num(input.growth);
    var rate = num(input.rate);
    var year = num(input.year) || 4;
    var extra = num(input.extra);
    var value = b.price * Math.pow(1 + growth, year);
    var balance = remainingBalance(b.bankLoan, rate, b.years, year * 12, extra);
    var participationRate = b.price ? ((1 / 5) * (b.boost / b.price)) : 0;
    var participation = value * participationRate * year;
    var payout = b.boost + participation;
    var refinanceAmount = balance + payout;
    var lvr = value ? refinanceAmount / value : 0;

    return {
      year: year,
      value: value,
      balance: balance,
      boost: b.boost,
      participation: participation,
      payout: payout,
      refinanceAmount: refinanceAmount,
      lvr: lvr,
      equity: value - refinanceAmount,
      originalPayment: payment(b.bankLoan, rate, b.years),
      newPayment: payment(refinanceAmount, rate, b.years)
    };
  }

  function bestReviewPoint(data) {
    var best = null;

    for (var y = 3; y <= 5; y++) {
      var result = scenario(data, { year: y, growth: 0.05, rate: 0.065, extra: 0 });
      var status = getStatus(result.lvr);
      result.status = status;

      if (status.key === 'green' || status.key === 'near') return result;
      if (!best || result.lvr < best.lvr) best = result;
    }

    if (best) best.status = getStatus(best.lvr);
    return best;
  }

  function findTextElement(root, selector, fallbackText) {
    var el = root.querySelector(selector);
    if (el) return el;
    if (!fallbackText) return null;

    var all = Array.prototype.slice.call(root.querySelectorAll('*'));
    return all.find(function (node) {
      return String(node.textContent || '').trim() === fallbackText;
    }) || null;
  }

  function patchPage9(data, root) {
    root = root || document;
    var page = root.querySelector('.rm9-page');
    if (!page) return;

    var result = bestReviewPoint(data || {});
    if (!result) return;

    var status = result.status || getStatus(result.lvr);
    var estimate = page.querySelector('.rm9-estimate');
    if (!estimate) return;

    var label = estimate.querySelector('.rm9-year-line span:first-child');
    var year = estimate.querySelector('.year');
    var copy = estimate.querySelector('p');

    if (label) label.textContent = status.page9Label;
    if (year) year.textContent = 'Year ' + result.year;
    if (copy) {
      copy.textContent = status.tone + ' The estimated loan ratio is ' + pct(result.lvr) + '. ' + status.action;
    }
  }

  function readPage9AInput(root) {
    root = root || document;

    function sliderValue(control, fallback) {
      var el = root.querySelector('.rm9a-slider[data-control="' + control + '"]');
      return el ? num(el.value) : fallback;
    }

    return {
      year: sliderValue('year', 4),
      growth: sliderValue('growth', 5) / 100,
      rate: sliderValue('rate', 65) / 1000,
      extra: sliderValue('extra', 0)
    };
  }

  function patchPage9A(data, root) {
    root = root || document;
    var page = root.querySelector('.rm9a-page');
    if (!page) return;

    var input = readPage9AInput(page);
    var result = scenario(data || {}, input);
    var status = getStatus(result.lvr);

    var headline = page.querySelector('[data-out="green"]');
    var summary = page.querySelector('[data-out="summary"]');
    var action = page.querySelector('[data-out="action"]');

    if (headline) headline.textContent = status.label + ' for Year ' + result.year;

    if (summary) {
      summary.textContent = status.tone + ' The estimated loan ratio is ' + pct(result.lvr) + '.';
    }

    if (action) {
      if (status.key === 'green') {
        action.textContent = 'The Exit Action: a standard bank loan of about ' + money(result.refinanceAmount) + ' could repay the remaining mortgage and pay BuySooner out. You would continue with approximately ' + money(result.equity) + ' in home equity, subject to valuation, serviceability and lender policy.';
      } else if (status.key === 'near') {
        action.textContent = 'The Exit Action: this sits in the broker review zone. A broker would test lender options, valuation, income, repayments and policy settings before treating the refinance as workable.';
      } else if (status.key === 'more-equity') {
        action.textContent = 'The Exit Action: keep building equity and reducing the mortgage balance. Extra repayments, more time or stronger property growth may move this into the broker review or green-light range.';
      } else {
        action.textContent = 'The Exit Action: this is not yet in the likely refinance range. Continue building equity and review again as the numbers improve.';
      }
    }
  }

  function patchCurrent(data, root) {
    try { patchPage9(data, root); } catch (_) {}
    try { patchPage9A(data, root); } catch (_) {}
  }

  function wrapRenderer(name, patcher) {
    function attempt() {
      var original = window[name];
      if (typeof original !== 'function') {
        setTimeout(attempt, 40);
        return;
      }
      if (original.__lvrBandWrapped) return;

      window[name] = function (data, root) {
        original(data, root);
        window.__bsLvrBandData = data || window.__bsLvrBandData;
        window.__bsLvrBandRoot = root || window.__bsLvrBandRoot || document.getElementById('roadmap-root');
        setTimeout(function () { patcher(data, root); }, 0);
        setTimeout(function () { patcher(data, root); }, 80);
      };

      window[name].__lvrBandWrapped = true;
    }

    attempt();
  }

  wrapRenderer('renderRoadmapPage9', patchPage9);
  wrapRenderer('renderRoadmapPage9A', function (data, root) {
    patchPage9A(data, root);

    var scope = root || document;
    Array.prototype.slice.call(scope.querySelectorAll('.rm9a-slider')).forEach(function (slider) {
      if (slider.__lvrBandPatched) return;
      slider.__lvrBandPatched = true;
      slider.addEventListener('input', function () {
        setTimeout(function () { patchPage9A(data, root); }, 0);
      });
      slider.addEventListener('change', function () {
        setTimeout(function () { patchPage9A(data, root); }, 0);
      });
    });
  });

  document.addEventListener('input', function (event) {
    if (event.target && event.target.closest && event.target.closest('.rm9a-page')) {
      setTimeout(function () {
        patchPage9A(window.__bsLvrBandData || {}, window.__bsLvrBandRoot || document);
      }, 0);
    }
  }, true);

  document.addEventListener('change', function (event) {
    if (event.target && event.target.closest && event.target.closest('.rm9a-page')) {
      setTimeout(function () {
        patchPage9A(window.__bsLvrBandData || {}, window.__bsLvrBandRoot || document);
      }, 0);
    }
  }, true);

  window.BSLvrStatusBands = {
    getStatus: getStatus,
    scenario: scenario,
    patchCurrent: patchCurrent
  };
})();