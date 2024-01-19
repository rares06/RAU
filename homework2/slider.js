let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slides img').length;
const slideWidth = document.querySelector('.slides img').clientWidth;

function showSlide(index) {
  const slides = document.querySelector('.slides');

  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  const translateValue = -currentSlide * slideWidth + 'px';
  slides.style.transform = `translateX(${translateValue})`;
}

function changeSlide(direction) {
  currentSlide += direction;
  showSlide(currentSlide);
}

function autoChangeSlide() {
  changeSlide(1);
}

setInterval(autoChangeSlide, 3000);

document.getElementById('prevBtn').addEventListener('click', function () {
  changeSlide(-1);
});

document.getElementById('nextBtn').addEventListener('click', function () {
  changeSlide(1);
});

showSlide(currentSlide);
