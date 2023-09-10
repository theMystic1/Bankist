'use strict';

const welcome = document.querySelector('.login-welcome');

const loginInputUser = document.querySelector('.login--username');
const loginInputPin = document.querySelector('.login--password');
const app = document.querySelector('.main--app');
const date = document.querySelector('.current--date');
const totalBalance = document.querySelector('.balance');
const containerMovements = document.querySelector('.movements');
const withdrawal = document.querySelector('.movements-type-withdrawal');
const withdrawalValue = document.querySelector(
  '.movements-type-withdrawal-value'
);
const deposit = document.querySelector('.movements-type-deposit');
const depositValue = document.querySelector('.movements-type-deposit-value');

// sort detals--totals
const totalDeposits = document.querySelector('.total-input');
const totalWithdrawal = document.querySelector('.total-output');
const interestsTotal = document.querySelector('.total-int');

// btns
const btnSort = document.querySelector('.btn--sort');
const loginBtn = document.querySelector('.login--btn');
//label btns
const labelTrfBtn = document.querySelector('.transfer--btn');
const labelLoanBtn = document.querySelector('.loan--btn');
const labelCloseBtn = document.querySelector('.close-btn');

//label inputs
const inputTrfName = document.querySelector('.user_trf-name-input');
const inputTrfAmt = document.querySelector('.trf--amt');
const inputLoanInput = document.querySelector('.loan--input');
const inputCloseName = document.querySelector('.user-name-close');
const inputClosePin = document.querySelector('.close-acct');

//timer
// const timer = document.querySelector('.timer--count');
const labelTimer = document.querySelector('.time');

// ACCOUNTS
const account1 = {
  owner: 'Lucky Ugochukwu',
  movements: [900, 600, -200, -1000, 22000, -300, -45, 700],
  pin: 1212,
  interestRate: 1.2,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-08-08T23:36:17.929Z',
    '2023-08-10T17:01:17.194Z',
    '2023-08-09T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-GB', // de-DE
};
const account2 = {
  owner: 'Joseph Chinedu',
  movements: [91000, -600, 100, -1000, 100, -300, -450, 77],
  pin: 1111,
  interestRate: 1.7,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-08-02T17:01:17.194Z',
    '2023-08-06T23:36:17.929Z',
    '2023-08-07T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB', // de-DE
};
const account3 = {
  owner: 'Udoka James',
  movements: [8000, -400, 800, -3000, 2200, -300, 900, -90],
  pin: 1234,
  interestRate: 1,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-08-02T17:01:17.194Z',
    '2023-08-06T23:36:17.929Z',
    '2023-08-07T10:51:36.790Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP', // de-DE
};
const account4 = {
  owner: 'Mmesoma Miracle Chukwujekwu',
  movements: [40, 600, -200, -1000, 6000, -3000, -450, 900],
  pin: 4444,
  interestRate: 1.5,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-08-02T17:01:17.194Z',
    '2023-08-06T23:36:17.929Z',
    '2023-08-07T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account5 = {
  owner: 'Chinenye Best',
  movements: [300, 700, -200, 1000, 4200, -800, 60, -2000],
  pin: 5555,
  interestRate: 1.2,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-08-02T17:01:17.194Z',
    '2023-08-06T23:36:17.929Z',
    '2023-08-07T10:51:36.790Z',
  ],
  currency: 'KWR',
  locale: 'ko-KR', // de-DE
};

const accounts = [account1, account2, account3, account4, account5];

const formattedDAte = function (dates, locale) {
  const days = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = days(new Date(), dates);
  console.log(days(new Date(), dates));
  if (daysPassed === 0) return 'TODAY';
  if (daysPassed === 1) return 'YESTERDAY';
  if (daysPassed <= 7) {
    return `${daysPassed} DAYS AGO`;
  } else {
    return new Intl.DateTimeFormat(locale).format(dates);
  }
};

const formattedNum = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const day = new Date(acc.movementsDates[i]);
    const dateMov = formattedDAte(day, acc.locale);
    const curFormatted = formattedNum(mov, acc.locale, acc.currency);
    console.log(mov, acc.locale, acc.currency);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // console.log(type);
    const html = `
    <div class="movements--details movement">
     <div class="movements-type movements-type-${type}">
       ${i + 1} ${type}
     </div>
     <div class="movements__date">${dateMov}</div>
    <div class="movements-value   movements-type-withdrawal-value">
      ${curFormatted}
    </div>
  </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur);

  totalBalance.textContent = formattedNum(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySum = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  totalDeposits.textContent = formattedNum(deposits, acc.locale, acc.currency);

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  totalWithdrawal.textContent = formattedNum(
    withdrawals,
    acc.locale,
    acc.currency
  );

  const interests = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .reduce((acc, mov) => acc + mov);
  console.log(interests);
  interestsTotal.textContent = formattedNum(
    interests,
    acc.locale,
    acc.currency
  );
};

const userName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(mov => mov[0])
      .join('');
  });
};
console.log(accounts);
userName(accounts);

const displayUI = function (acc) {
  // display balance
  calcDisplayBalance(acc);
  //displaymovements
  displayMovements(acc);
  //display summary
  calcDisplaySum(acc);
};

const timeCountDown = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      app.style.opacity = '0';
      welcome.textContent = 'Login to get started';
    }
    time--;
  };

  let time = 600;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let currentAccount, timer;
//login
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.userName === loginInputUser.value);
  console.log(currentAccount);
  if (currentAccount && currentAccount?.pin === Number(loginInputPin.value)) {
    //clear the input box
    loginInputUser.value = loginInputPin.value = '';
    loginInputPin.blur();
    //display ui
    app.style.opacity = '100';
    //display welcome message
    welcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;

    //date

    const curDate = new Date();

    const option = {
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'short',
      month: 'short',
      year: 'numeric',
    };

    const dateF = new Intl.DateTimeFormat(currentAccount.locale, option).format(
      curDate
    );

    if (timer) clearInterval(timer);
    timer = timeCountDown();

    // display/ update UI
    displayUI(currentAccount);
    date.textContent = `As of, ${dateF}`;
  }
});
// console.log(accounts);

labelTrfBtn.addEventListener('click', function (e) {
  const amount = Number(inputTrfAmt.value);
  const receiverAcc = accounts.find(acc => acc.userName === inputTrfName.value);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    //adding movements
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // display/ update UI
    displayUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = timeCountDown();

    //REMOVE CURSORS

    inputTrfName.value = inputTrfAmt.value = '';
    inputTrfAmt.blur();
  }
});

labelLoanBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanInput.value);

  if (
    loanAmount > 0 &&
    loanAmount >= currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      displayUI(currentAccount);

      //reset timer
      clearInterval(timer);
      timer = timeCountDown();
    }, 3000);

    // receiverAcc.movementsDates.push(new Date().toISOString());
    inputLoanInput.value = '';
  }
});

labelCloseBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const user = inputCloseName.value;
  const pin = inputClosePin.value;
  if (user === currentAccount.userName && pin === currentAccount.pin) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    accounts.splice(index, 1);

    app.style.opacity = '0';
    inputCloseName.value = inputClosePin.value = '';
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
