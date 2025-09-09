document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__container');
  const items = menu.querySelectorAll('.header__item, .header__btn');
  const overlay = document.querySelector('.main__overlay');

  const modalButtons = document.querySelectorAll('.header__btn, .hero__btn');
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.modal__overlay');
  const modalClose = document.querySelector('.modal__close');

  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    burger.setAttribute('aria-expanded', menu.classList.contains('active'));
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('active');
      overlay.classList.remove('active')
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  overlay.addEventListener('click', () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  });

  modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
      modalOverlay.classList.add('active');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

});


