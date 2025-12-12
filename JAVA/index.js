const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".carousel-btn--next");
const prevBtn = document.querySelector(".carousel-btn--prev");
const dotsNav = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDots) => {
  currentDot.classList.remove("current-slide");
  targetDots.classList.add("current-slide");
};

const goToNextSlide = () => {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");

  let nextSlide = currentSlide.nextElementSibling;
  let nextDot = currentDot.nextElementSibling;

  if (!nextSlide) {
    nextSlide = slides[0];
    nextDot = dots[0];
  }

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
};

const goToPrevSlide = () => {
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");

  let prevSlide = currentSlide.previousElementSibling;
  let prevDot = currentDot.previousElementSibling;

  if (!prevSlide) {
    prevSlide = slides[slides.length - 1];
    prevDot = dots[dots.length - 1];
  }

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
};

let autoPlayInterval;

const startAutoPlay = () => {
  autoPlayInterval = setInterval(goToNextSlide, 4000);
};

const stopAutoPlay = () => {
  clearInterval(autoPlayInterval);
};

startAutoPlay();

const pauseAutoPlayTemporarily = () => {
  stopAutoPlay();

  setTimeout(startAutoPlay, 5000);
};

nextBtn.addEventListener("click", (e) => {
  goToNextSlide();
  pauseAutoPlayTemporarily();
});

prevBtn.addEventListener("click", (e) => {
  goToPrevSlide();
  pauseAutoPlayTemporarily();
});

dotsNav.addEventListener("click", (e) => {
  const targetDots = e.target.closest("button");

  if (!targetDots) return;
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDots);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDots);
  pauseAutoPlayTemporarily();
});

const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);
