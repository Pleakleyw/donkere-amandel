// script/script-hero.js

let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let interval = setInterval(nextSlide, 5000); // auto rotación

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Botones
document.querySelector('.next-slide').addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

document.querySelector('.prev-slide').addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

// Reiniciar intervalo después de clic manual
function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
}
