import { createCard, handleCardLike, handleCardRemove } from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { clearValidation, enableValidation } from "../components/validate";
import { patchProfileInfo, postAddCard, getInitialData, patchAvatar } from './api';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileEdit = document.querySelector('.popup_type_edit');
const buttonNewCard = document.querySelector('.profile__add-button')
const newCard = document.querySelector('.popup_type_new-card');
const openImage = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close')
const buttonAvatar = document.querySelector('.profile__image');
const avatarEdit = document.querySelector('.popup_type_edit_avatar');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const typeNameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const avatarImage = document.querySelector('.profile__image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const formEditProfile = document.forms['edit-profile'];
const avatarForm = document.forms['avatar'];
const avatarLinkInput = avatarForm.querySelector("#new-place-avatar");
/**
 * @type HTMLFormElement
 */
const formNewPlace = document.forms['new-place'];
/**
 * @type {HTMLInputElement}
 */
const nameInput = formNewPlace.querySelector('.popup__input_type_card-name');
/**
 * @type {HTMLInputElement}
 */
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

//Плавное открытие и закрытие попапов
profileEdit.classList.add('popup_is-animated');
openImage.classList.add('popup_is-animated')
newCard.classList.add('popup_is-animated')
avatarEdit.classList.add('popup_is-animated')

//Открытие и закрытие модального окна
buttonAvatar.addEventListener('click', function () {
  avatarForm.reset();
  clearValidation(avatarEdit);
  openModal(avatarEdit);
});

buttonProfileEdit.addEventListener('click', function () {
  typeNameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(profileEdit);
  openModal(profileEdit);
});

buttonNewCard.addEventListener('click', function () {
  formNewPlace.reset();
  clearValidation(newCard);
  openModal(newCard);
})

closeButtons.forEach((popupClose) => {
  const popup = popupClose.closest('.popup');
  if (!popup) {
    return;
  }
  popupClose.addEventListener('click', function () {
    closeModal(popup);
  });
});

/**
 * Редактирование имени и информации о себе
 * @param event
 */
function handleSubmitEditProfile(event) {
  event.preventDefault();
  const saveButton = event.submitter;
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  patchProfileInfo(typeNameInput.value, descriptionInput.value)
    .then((profileInfo) => {
      profileTitle.textContent = profileInfo.name;
      profileDescription.textContent = profileInfo.about;
      closeModal(profileEdit);
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

/**
 * Редактирование аватарки
 * @param event
 */
function handleAvatarSubmit(event) {
  event.preventDefault();
  const saveButton = event.submitter;
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  patchAvatar(avatarLinkInput.value)
    .then((profileInfo) => {
      avatarImage.style.backgroundImage = `url(${profileInfo.avatar})`;
      closeModal(avatarEdit);
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

/**
 * Открытие попапа с картинкой
 * @param event
 */
function handleOpenFullImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
  openModal(openImage);
}

/**
 * Добавлнеие новой карточки
 * @param event
 */
function handleAddCardSubmit(event) {
  event.preventDefault();
  const saveButton = event.submitter;
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  const name = nameInput.value;
  const link = linkInput.value;
  postAddCard(name, link)
    .then((data) => {
      const cardElement = createCard(
        cardTemplate,
        data,
        {
          onLikeClick: handleCardLike,
          onRemoveClick: handleCardRemove,
          onImageClick: handleOpenFullImage,
          hasRemoveButton: true,
        }
      );
      cardList.prepend(cardElement);
      formNewPlace.reset();
      closeModal(newCard)
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  avatarForm.addEventListener('submit', handleAvatarSubmit);
  formEditProfile.addEventListener('submit', handleSubmitEditProfile);
  formNewPlace.addEventListener('submit', handleAddCardSubmit);

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

  getInitialData()
    .then(({ profileInfo, cardsInfo }) => {
      buttonAvatar.style.backgroundImage = `url(${profileInfo.avatar})`;
      profileTitle.textContent = profileInfo.name;
      profileDescription.textContent = profileInfo.about;

      cardsInfo.forEach((item) => {
        const card = createCard(
          cardTemplate,
          item,
          {
            onLikeClick: handleCardLike,
            onRemoveClick: handleCardRemove,
            onImageClick: handleOpenFullImage,
            hasRemoveButton: profileInfo._id === item.owner._id,
            hasLike: item.likes.some((like) => like._id === profileInfo._id),
          });
        cardList.append(card);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});
