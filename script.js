const toggleMenu = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const content = document.querySelector(".content");
const bars = document.querySelectorAll(".bar");
const menuItems = document.querySelectorAll(".menu-items .item");

toggleMenu.addEventListener("click", () => {
  sideMenu.classList.toggle("resize");
  content.classList.toggle("resize");
  toggleMenu.classList.toggle("active");

  bars.forEach((bar) => {
    bar.classList.add("anim-bar");
    setTimeout(() => {
      bar.classList.remove("anim-bar");
    }, 1000);
  });
});
setTimeout(() => {
  sideMenu.classList.add("resize");
  content.classList.add("resize");
  toggleMenu.classList.add("active");
  bar.classList.add("anim-bar");
}, 1000);

menuItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior

    menuItems.forEach(function (item) {
      item.classList.remove("active");
    });

    this.classList.add("active");
  });
});

// personal loan emi calculaotor

const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");
const processingFeeInput = document.querySelector(".processing-fee");
const downPaymentInput = document.querySelector(".down-payment");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");
const totalDownPaymentValue = document.querySelector(".total-down-payment .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let newAmount = 0;
for (let i = 0; i < 1; i++) {
  newAmount = loanAmount;
}
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);
let processingFee = parseFloat(processingFeeInput.value);
let downPayment = parseFloat(downPaymentInput.value);

let interest = interestRate / 12 / 100;
let processFee = processingFee / 100;

let myChart;

const checkValues = () => {
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;
  let processingFeeValue = processingFeeInput.value;
  let downPaymentValue = downPaymentInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "20000";
  }

  if ((!loanTenureValue.match(regexNumber)) || (loanTenureValue > 360)) {
    loanTenureInput.value = "180";
  }

  if ((!downPaymentValue.match(regexNumber)) || (downPaymentValue > newAmount)) {
    downPaymentInput.value = "2000";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "7.5";
  }
  if (!processingFeeValue.match(regexDecimalNumber)) {
    processingFeeInput.value = "1.2";
  }
};

const displayChart = (totalInterestPayableValue, processingFees) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount", "Processing Fees"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount, processingFees],
          backgroundColor: ["#e63946", "#050A30", "#ff7415"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue, processingFees) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.data.datasets[0].data[2] = processingFees;
  myChart.update();
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  processingFee = parseFloat(processingFeeInput.value);
  downPayment = parseFloat(downPaymentInput.value);
  interest = interestRate / 12 / 100;
  processFee = processingFee / 100;
};

const calculateEMI = () => {
  checkValues();
  refreshInputValues();
  loanAmount = loanAmount - downPayment;
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));

  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.ceil(emi);

  let processingFees = Math.ceil(loanAmount * processFee);

  let totalDownPay = Math.ceil(downPayment + processingFees);
  totalDownPaymentValue.innerHTML = totalDownPay;

  let totalAmount = Math.ceil(loanTenure * emi);
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.ceil(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if (myChart) {
    updateChart(totalInterestPayable, processingFees);
  } else {
    displayChart(totalInterestPayable, processingFees);
  }
};

const init = () => {
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);


// counter section

var swiper = new swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});


// profile card slider 

