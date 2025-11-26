let animationFrameId;

const steps = document.querySelectorAll('.step');
const indicators = document.querySelectorAll('.circle-progress');
const worms = document.querySelectorAll('.worm');

let currentStep = 0;
let progress = 0;
const duration = 5000; // tempo total por etapa (ms)
const fps = 60;

function initializePaths() {
  worms.forEach(worm => {
    const length = worm.getTotalLength();
    worm.style.strokeDasharray = length;
    worm.style.strokeDashoffset = length;
    worm.dataset.length = length;
  });
}

function showStep(index) {
  steps.forEach((step, i) => step.classList.toggle('active', i === index));
  indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
  currentStep = index;
  resetWorm();
}

function resetWorm() {
  worms.forEach((worm, index) => {
    const length = +worm.dataset.length || 100;
    worm.style.transition = 'none';
    worm.style.strokeDashoffset = length;
    worm.style.opacity = index === currentStep ? 1 : 0;

    const durationSeconds = duration / 1000;
    setTimeout(() => {
      worm.style.transition = `stroke-dashoffset ${durationSeconds}s linear, opacity 0.3s ease`;
    }, 20);
  });

  progress = 0;
}

function animateWorm() {
  const worm = worms[currentStep];
  const length = +worm.dataset.length || 100;

  progress += length / (duration / (1000 / fps));

  if (progress >= length - 0.1) {
    worm.style.strokeDashoffset = 0;
    cancelAnimationFrame(animationFrameId);
    nextStep();
  } else {
    worm.style.strokeDashoffset = Math.max(length - progress, 0);
    animationFrameId = requestAnimationFrame(animateWorm);
  }
}

function startTimer() {
  cancelAnimationFrame(animationFrameId);
  resetWorm();
  animationFrameId = requestAnimationFrame(animateWorm);
}

function nextStep() {
  const next = (currentStep + 1) % steps.length;
  showStep(next);
  startTimer();
}

// Inicia tudo após renderizar
document.addEventListener('DOMContentLoaded', () => {
  initializePaths();
  showStep(0);
  startTimer();
});

// Clique nos círculos
indicators.forEach((circle, index) => {
  circle.addEventListener('click', () => {
    showStep(index);
    startTimer();
  });
});
