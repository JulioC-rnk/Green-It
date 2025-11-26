const toggle = document.querySelector('.toggle');
const cardInner = document.querySelector('.flip-card__inner');
const cardSide = document.querySelector('.card-side');

toggle.addEventListener('change', () => {
  const isChecked = toggle.checked;

  // Aplica o flip visual
  cardInner.style.transform = isChecked ? 'rotateY(180deg)' : 'rotateY(0deg)';

  // Atualiza sublinhado
  if (isChecked) {
    cardSide.classList.add('signup-active');
    cardSide.classList.remove('login-active');
  } else {
    cardSide.classList.add('login-active');
    cardSide.classList.remove('signup-active');
  }

  // Controle de interação
  if (isChecked) {
    cardInner.classList.add('back-active');
    cardInner.classList.remove('front-active');

    cardSide.classList.add('signup-active');
    cardSide.classList.remove('login-active');
  } else {
    cardInner.classList.add('front-active');
    cardInner.classList.remove('back-active');

    cardSide.classList.add('login-active');
    cardSide.classList.remove('signup-active');
  }
});



