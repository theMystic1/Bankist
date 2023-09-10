'use strict';

//selecting elements
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal');
const scrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const navLists = document.querySelector('.lists');
const navLink = document.querySelectorAll('.nav__links');
const nav = document.querySelector('.nav--bar');
const btnOpsContainer = document.querySelector('.buttons--operation');
const opsBtn = document.querySelectorAll('.btn--operations');
const opContents = document.querySelectorAll('.operation--desc');

// mediaQUERIES

const openMenuBtn = document.querySelector('.menu-icon');

const menuBtn = document.querySelector('.display-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const sideBar = document.querySelector('.infoNav');
const logo = document.querySelector('.logo--name');

// modal window
const showModal = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
  if (sideBar.classList.contains('open-side-bar'))
    sideBar.classList.remove('open-side-bar');
};
const closeModal = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    showModal();
  });
});

btnCloseModal.addEventListener('click', function (e) {
  e.preventDefault();
  closeModal();
});
overlay.addEventListener('click', function (e) {
  e.preventDefault();
  closeModal();
});

// scrolling

scrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigations
// 1. addEventListener to the parent element
//2. determine the clicked elelment using e.target
navLists.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// getAttribute;

// tabbed component

btnOpsContainer.addEventListener('click', function (e) {
  const clickedBtn = e.target.closest('.btn--operations');

  if (!clickedBtn) return;

  // remove btn from other btns and page contents
  opsBtn.forEach(btn => btn.classList.remove('btn-active'));
  opContents.forEach(op => op.classList.remove('operations--content--active'));

  // add active btn
  clickedBtn.classList.add('btn-active');

  // add active operations
  //lets dynamically select the  btns to display its content

  document
    .querySelector(`.operation--${clickedBtn.dataset.tab}`)
    .classList.add('operations--content--active');
  console.log(clickedBtn.dataset.tab);
});

//fade in animation

const handlerOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav--bar').querySelectorAll('.nav__link');
    const logo = link.closest('.nav--bar').querySelector('img');

    siblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handlerOver.bind(0.5));
nav.addEventListener('mouseout', handlerOver.bind(1));

// adding the sticky nav
// const initCoords = section1.getBoundingClientRect();
// // console.log(initCoords);

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initCoords.top) nav.classList.add('nav--sticky');
//   else nav.classList.remove('nav--sticky');
// });

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const headerCallBack = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) nav.classList.add('nav--sticky');
    else nav.classList.remove('nav--sticky');
  });
};
const headerOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(headerCallBack, headerOption);

headerObserver.observe(header);

//creating the slide in sections

const sections = document.querySelectorAll('.section');
// console.log(sections);

const sectionCallBack = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObs = new IntersectionObserver(sectionCallBack, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObs.observe(section);
});

// creating the lazy loading image effect

//this to select only the imgs with the attributes wgich is only found in thus section
const targetImg = document.querySelectorAll('img[data-src]');

const obsCallBack = function (entries, observer) {
  entries.forEach(entry => {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
  });
};

const imgObserver = new IntersectionObserver(obsCallBack, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

targetImg.forEach(img => imgObserver.observe(img));

//  slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `
    <button class="dots__dot" data-slide="${i}"></button>
    `
    );
  });
};

createDots();

const activateDots = function (slide) {
  document.querySelectorAll('.dots__dot').forEach((dot, i) => {
    dot.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateDots(0);

let curSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translatex(${100 * (i - slide)}%)`;
    // slide.classList.add(`slide--${i + 1}`);
  });
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDots(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide;
  else curSlide--;

  goToSlide(curSlide);
  activateDots(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;

    goToSlide(slide);
    activateDots(slide);
  }
});

//MEDIA QUERIES
// SIDE-BAR

openMenuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('hide-menu');
  closeMenuBtn.classList.toggle('hide-menu');
  sideBar.classList.toggle('open-side-bar');
  overlay.classList.toggle('hidden');
  console.log('kilode');
  logo.classList.toggle('hidden');
});

overlay.addEventListener('click', function () {
  menuBtn.classList.remove('hide-menu');
  closeMenuBtn.classList.add('hide-menu');
  sideBar.classList.remove('open-side-bar');
  overlay.classList.add('hidden');
  logo.classList.remove('hidden');
});
