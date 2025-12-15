// const burger = document.querySelector(".burger");
// const nav = document.querySelector("nav");

// burger.addEventListener("click", burgerClick);
// function burgerClick() {
//   burger.classList.toggle("active");
//   nav.classList.toggle("active");
// }
const burger = document.querySelector(".burger");
const nav = document.querySelector(".main-nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});
