/* BuySooner roadmap data capture layer
   Purpose:
   - Keep the large prototype index.html stable.
   - Capture prototype inputs into one clean roadmap data object.
   - Persist that object for roadmap.html and future roadmap pages.

   Required hook in index.html, before </body>:
   <script src="roadmap-data.js"></script>

   Useful console tests:
   BSRoadmap.captureAndPreview()
   const d = JSON.parse(localStorage.BuySoonerRoadmapData)
   d.customer
   d.property
   d.finance
   d.broker
   d.derived
*/

(function () {
  const STORAGE_KEY = "BuySoonerRoadmapData";
  const PLACEHOLDER_ADDRESSES = ["42 rangers avenue"];

  function loadResponsiveStylesheet() {
    if (document.getElementById("roadmap-responsive-style")) return;
    const link = document.createElement("link");
    link.id = "roadmap-responsive-style";
    link.rel = "stylesheet";
    link.href = "roadmap-responsive.css?v=20260521-46";
    document.head.appendChild(link);
  }

  loadResponsiveStylesheet();

  function text(value) {
    return String(value == null ? "" : value).trim();
  }

  function normalisedText(value) {
    return text(value).toLowerCase();
  }

  function num(value) {
    if (typeof value === "number") return Number.isFinite(value) ? value : 0;
    const cleaned = String(value == null ? "" : value).replace(/[^0-9.-]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function money(value) {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0
    }).format(num(value));
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function fieldValue(id) {
    const el = byId(id);
    if (!el) return "";

    if (el.type === "radio") {
      const checked = document.querySelector(`input[name="${el.name}"]:checked`);
      return checked ? text(checked.value || checked.id) : "";
    }

    if (el.type === "checkbox") return el.checked;

    return text(el.value != null ? el.value : el.textContent);
  }

  function firstExisting(ids) {
    for (const id of ids) {
      const value = fieldValue(id);
      if (value !== "" && value !== false) return value;
    }
    return "";
  }

  function firstNumber(ids) {
    for (const id of ids) {
      const value = fieldValue(id);
      if (value === "" || value === false) continue;
      const parsed = num(value);
      if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
  }

  function checkedValue(namesOrIds) {
    for (const key of namesOrIds) {
      const checkedByName = document.querySelector(`input[name="${key}"]:checked`);
      if (checkedByName) return text(checkedByName.value || checkedByName.id);

      const checkedById = byId(key);
      if (checkedById && checkedById.checked) {
        return text(checkedById.value || checkedById.id);
      }
    }
    return "";
  }

  function collectAllInputs() {
    const values = {};

    document.querySelectorAll("input, select, textarea").forEach((el) => {
      const key = el.id || el.name;
      if (!key) return;

      if (el.type === "radio") {
        if (el.checked) values[key] = el.value || el.id || true;
        return;
      }

      if (el.type === "checkbox") {
        values[key] = !!el.checked;
        return;
      }

      values[key] = el.value;
    });

    return values;
  }

  function addressKnownFromInputs(rawInputs) {
    const selected = checkedValue(["addressKnown"]);
    const raw = selected || (rawInputs ? rawInputs.addressKnown : "");
    const value = normalisedText(raw);
    return value === "yes" || value === "true" || value === "known" || value === "address" || value.includes("yes");
  }

  function isPlaceholderAddress(value) {
    const cleaned = normalisedText(value).replace(/,?\s*nsw\s*\d{4}$/i, "").trim();
    return PLACEHOLDER_ADDRESSES.includes(cleaned);
  }

  function shouldSuppressAddress(rawInputs, address) {
    if (!address) return true;
    if (addressKnownFromInputs(rawInputs)) return false;
    return true;
  }

  function normaliseRoadmapData(data) {
    if (!data || typeof data !== "object") return data;
    data.property = data.property || {};
    data.rawInputs = data.rawInputs || {};

    const address = text(data.property.address);
    const known = addressKnownFromInputs(data.rawInputs);

    if (!known || isPlaceholderAddress(address)) {
      data.property.address = "";
    }

    if (!data.property.suburb) {
      data.property.suburb =
        text(data.rawInputs.preSuburb) ||
        text(data.rawInputs.targetSuburb) ||
        text(data.rawInputs.targetArea) ||
        "your target area";
    }

    return data;
  }

  function inferBuyerType(rawType) {
    const value = text(rawType).toLowerCase();

    if (
      value.includes("upgrade") ||
      value.includes("upgrad") ||
      value.includes("owner") ||
      value.includes("current")
    ) {
      return "upgrader";
    }

    if (
      value.includes("rent") ||
      value.includes("renter") ||
      value.includes("renting")
    ) {
      return "renter";
    }

    return value || "renter";
  }

  function normaliseLvr(value) {
    const parsed = num(value);
    if (!parsed) return 0.8;
    return parsed > 1 ? parsed / 100 : parsed;
  }

  function calculateRoadmapDerived(data) {
    const price = num(data.property.targetPurchasePrice);
    const contribution = num(data.finance.customerContribution);

    let boost = num(data.finance.buySoonerBoost);
    if (!boost && price) {
      boost = Math.max(0, price * 0.2 - contribution);
    }

    const totalDeposit = contribution + boost;

    let estimatedBankLoan = num(data.finance.estimatedBankLoan);
    if (!estimatedBankLoan && price) {
      estimatedBankLoan = Math.max(0, price - totalDeposit);
    }

    const depositPercent = price ? totalDeposit / price : 0;
    const depositGap = boost;

    return {
      buySoonerBoost: boost,
      totalDeposit,
      depositGap,
      depositPercent,
      estimatedBankLoan,
      formatted: {
        targetPurchasePrice: money(price),
        customerContribution: money(contribution),
        buySoonerBoost: money(boost),
        totalDeposit: money(totalDeposit),
        depositGap: money(depositGap),
        estimatedBankLoan: money(estimatedBankLoan),
        currentRentMonthly: money(data.finance.currentRentMonthly),
        livingExpenses: money(data.finance.livingExpenses),
        debts: money(data.finance.debts),
        creditCardLimits: money(data.finance.creditCardLimits),
        income: money(data.customer.income),
        depositPercent: `${(depositPercent * 100).toFixed(1)}%`
      }
    };
  }

  function collectRoadmapData() {
    const rawInputs = collectAllInputs();

    const customerName = firstExisting([
      "customerName",
      "preName",
      "clientName",
      "fullName",
      "name",
      "buyerName",
      "applicantName"
    ]);

    const buyerTypeRaw =
      checkedValue([
        "buyerSituation",
        "customerType",
        "buyerType",
        "journeyType",
        "ownershipStatus",
        "scenarioType"
      ]) ||
      firstExisting([
        "buyerSituation",
        "customerType",
        "buyerType",
        "journeyType",
        "ownershipStatus",
        "scenarioType"
      ]);

    const buyerType = inferBuyerType(buyerTypeRaw);

    const capturedAddress = firstExisting([
      "address",
      "preAddress",
      "propertyAddress",
      "targetAddress",
      "targetPropertyAddress"
    ]);

    const propertyAddress = shouldSuppressAddress(rawInputs, capturedAddress) ? "" : capturedAddress;

    const targetArea = firstExisting([
      "preSuburb",
      "targetSuburb",
      "targetArea",
      "suburb",
      "preferredSuburb",
      "targetLocation",
      "area"
    ]);

    const targetPurchasePrice = firstNumber([
      "purchasePrice",
      "prePrice",
      "targetPurchasePrice",
      "targetPrice",
      "propertyPrice",
      "homePrice"
    ]);

    const customerContribution = firstNumber([
      "deposit",
      "preSavings",
      "customerContribution",
      "cashContribution",
      "savings",
      "availableDeposit",
      "availableContribution"
    ]);

    const buySoonerBoost = firstNumber([
      "buySoonerBoost",
      "boost",
      "depositBoost",
      "bsBoost"
    ]);

    const estimatedBankLoan = firstNumber([
      "estimatedBankLoan",
      "bankLoan",
      "seniorLoan",
      "seniorMortgage",
      "mortgageAmount"
    ]);

    const currentRentMonthly = firstNumber([
      "housingCost",
      "preRent",
      "currentRentMonthly",
      "monthlyRent",
      "rent",
      "currentRent",
      "monthlyHousingCost"
    ]);

    const income = firstNumber([
      "preIncome",
      "income",
      "annualIncome",
      "grossIncome",
      "householdIncome",
      "combinedIncome"
    ]);

    const dependants = firstNumber([
      "preDependants",
      "preDependents",
      "dependants",
      "dependents",
      "numberOfDependants",
      "children"
    ]);

    const livingExpenses = firstNumber([
      "preEstimatedLiving",
      "livingExpenses",
      "monthlyLivingExpenses",
      "expenses"
    ]);

    const debts = firstNumber([
      "preDebts",
      "debts",
      "monthlyDebts",
      "debtRepayments",
      "liabilities"
    ]);

    const creditCardLimits = firstNumber([
      "preCardLimits",
      "creditCardLimits",
      "creditCards",
      "cardLimits"
    ]);

    const marketGrowth = firstNumber([
      "marketGrowthSelect",
      "upgMarketGrowthSelect",
      "growthRate",
      "marketGrowth",
      "projectedGrowth"
    ]);

    const timelineYears = firstNumber([
      "timelineSelect",
      "upgTimelineSelect",
      "refinanceStartYear",
      "refiStartYear"
    ]);

    const brokerName = firstExisting([
      "preBrokerName",
      "brokerName",
      "broker",
      "brokerFullName"
    ]);

    const brokerFirm = firstExisting([
      "preBrokerFirm",
      "brokerFirm",
      "brokerCompany",
      "brokerBusiness"
    ]);

    const data = normaliseRoadmapData({
      capturedAt: new Date().toISOString(),
      source: "BuySooner prototype",
      rawInputs,

      customer: {
        name: customerName || "Customer",
        buyerType,
        dependants: dependants || 0,
        income
      },

      property: {
        suburb: targetArea || "your target area",
        address: propertyAddress,
        targetPurchasePrice
      },

      finance: {
        customerContribution,
        currentRentMonthly,
        livingExpenses,
        debts,
        creditCardLimits,
        buySoonerBoost,
        estimatedBankLoan
      },

      broker: {
        name: brokerName || "Alex B Broker",
        firm: brokerFirm || "AB Broker and Associates",
        email: firstExisting([
          "preBrokerEmail",
          "brokerEmail",
          "brokerEmailAddress"
        ]) || "",
        phone: firstExisting([
          "preBrokerPhone",
          "brokerPhone",
          "brokerMobile"
        ]) || ""
      },

      assumptions: {
        growthRate: marketGrowth || 0.05,
        refinanceStartYear: timelineYears || 3,
        refinanceEndYear: (timelineYears || 3) + 2,
        refinanceTargetLvr: normaliseLvr(firstNumber([
          "refinanceTargetLvr",
          "targetLvr"
        ]) || 0.8)
      },

      derived: {}
    });

    data.derived = calculateRoadmapDerived(data);
    data.finance.buySoonerBoost = data.derived.buySoonerBoost;
    data.finance.estimatedBankLoan = data.derived.estimatedBankLoan;

    return data;
  }

  function saveRoadmapData(data) {
    const finalData = normaliseRoadmapData(data || collectRoadmapData());
    window.BuySoonerRoadmapData = finalData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalData));
    return finalData;
  }

  function loadRoadmapData() {
    if (window.BuySoonerRoadmapData) return normaliseRoadmapData(window.BuySoonerRoadmapData);

    try {
      const data = normaliseRoadmapData(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));
      if (data) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    } catch (_) {
      return null;
    }
  }

  function captureAndOpenRoadmap() {
    const data = saveRoadmapData();
    console.log("BuySoonerRoadmapData", data);
    window.location.href = "roadmap.html";
  }

  function captureAndPreview() {
    const data = saveRoadmapData();
    console.log("BuySoonerRoadmapData", data);
    alert(
      "Roadmap data captured. Open the browser console or localStorage.BuySoonerRoadmapData to inspect it."
    );
    return data;
  }

  window.BSRoadmap = {
    collect: collectRoadmapData,
    derive: calculateRoadmapDerived,
    save: saveRoadmapData,
    load: loadRoadmapData,
    captureAndOpenRoadmap,
    captureAndPreview,
    money
  };
})();
