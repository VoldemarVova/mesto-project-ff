function openModal (evt) {
  evt.classList.add('popup_is-opened')
}

function closeModal (evt) {
  evt.classList.remove('popup_is-opened')
}

//Закрытие попапа кликом на оверлей и esc
const popups = document.querySelectorAll('.popup')
popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target === popup) {
      closeModal(popup)
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal(popup)
    }
  });
});

export { openModal, closeModal }
