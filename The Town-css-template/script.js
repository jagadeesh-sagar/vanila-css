"use strict";

const section1 = document.querySelector("#section--1");
const header = document.querySelector(".hero-section");
const nav = document.querySelector(".header");
const navLink = document.querySelectorAll(".main-nav-link");
const logo = document.querySelector(".logo");

document.querySelector(".down-arrow").addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".main-nav").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("main-nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// sticky navigation

const stickyNav = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });
};
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
// const navHeight = 90;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allsections = ["section--1", "section--2", "section--3"];

const removeActiveClass = () => {
  document.querySelectorAll(".main-nav-link").forEach((link) => {
    link.classList.remove("active");
  });
};

const sectionActivationObserver = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      removeActiveClass();
      const sectionId = entry.target.getAttribute("id");
      const activeLink = document.querySelector(
        `.main-nav-link[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};

const sectionObserver = new IntersectionObserver(sectionActivationObserver, {
  root: null,
  threshold: 0.25,
});

allsections.forEach((sectionId) => {
  const section = document.querySelector(`#${sectionId}`); // Select the element
  if (section) {
    sectionObserver.observe(section);
  } else {
    console.warn(`Section with class ${sectionId} not found.`);
  }
});

// slider

const sildes = document.querySelector(".images-container");
const dots = document.querySelector(".dots");
const slide = document.querySelectorAll(".image-container");
const maxSlide = slide.length;

const nextSlides = function (slider) {
  slide.forEach((s, i) => {
    s.style.transform = `translateX(-${105 * slider}%)`;
  });
};

const createDots = function (i) {
  dots.insertAdjacentHTML(
    "beforeend",
    `<button class= "dots__dot " data-slide="${i}" ></button>`
  );
};

for (let i = 0; i < maxSlide / 2; i++) {
  createDots(i);
}

const activateDots = function (i) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dots) => dots.classList.remove("dots__dot--active"));
  document
    .querySelectorAll(`.dots__dot[data-slide="${i}"]`)
    .forEach((dots) => dots.classList.add("dots__dot--active"));
};

activateDots(0);

dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = Number(e.target.dataset.slide);
    console.log(slide);
    activateDots(slide);
    nextSlides(slide);
  }
});
