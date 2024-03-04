//Закрытие попапа кликом на оверлей и esc

function closePopupByOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget)
  }
}

function closePopupByEsc(event) {
  if (event.key !== 'Escape') {
    return;
  }
  const openPopup = document.querySelector('.popup_is-opened');
  if (openPopup) {
    closeModal(openPopup);
  }
}

function openModal (element) {
  element.classList.add('popup_is-opened')
  element.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

function closeModal (element) {
  element.classList.remove('popup_is-opened')
  element.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
}

export { openModal, closeModal }
