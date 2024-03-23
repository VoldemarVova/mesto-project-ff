import {createCard, cardRemove } from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { enableValidation } from "../components/validate";
import { patchProfileInfo, postAddCard, getInitialData, deleteCard, likeCard, dislikeCard, patchAvatar } from './api';
import {data} from "autoprefixer";

/**
 * @return {{
 *   formElement: HTMLFormElement,
 *   name: string,
 *   link: string,
 * }}
 */
const getAddCardForm = () => {
  const formElement = document.querySelector('.popup__form[name="new-place"]');
  const nameInput = formElement.querySelector('.popup__input_type_card-name');
  const linkInput = formElement.querySelector('.popup__input_type_url');
  return {
    formElement,
    name: nameInput.value,
    link: linkInput.value,
  };
}

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileEdit = document.querySelector('.popup_type_edit');
const buttonNewCard = document.querySelector('.profile__add-button')
const newCard = document.querySelector('.popup_type_new-card');
const openImage = document.querySelector('.popup_type_image');
const popupsClose = document.querySelectorAll('.popup__close')
const buttonAvatar = document.querySelector('.profile__image');
const avatarEdit = document.querySelector('.popup_type_edit_avatar');

//Плавное открытие и закрытие попапов
profileEdit.classList.add('popup_is-animated');
openImage.classList.add('popup_is-animated')
newCard.classList.add('popup_is-animated')
avatarEdit.classList.add('popup_is-animated')

//Открытие и закрытие модального окна
buttonAvatar.addEventListener('click', function () {
  avatarLinkInput.value = '';
  openModal(avatarEdit);
});

buttonProfileEdit.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEdit);
});

buttonNewCard.addEventListener('click', function () {
  getAddCardForm().formElement.reset();
  openModal(newCard);
})

popupsClose.forEach((popupClose) => {
  const popup = popupClose.closest('.popup');
  if (!popup) {
    return;
  }
  popupClose.addEventListener('click', function () {
    closeModal(popup);
  });
});

//Редактирование имени и информации о себе
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');


function handleSubmitEditProfile(event) {
  event.preventDefault();
  const saveButton = event.target.querySelector('.popup__button');
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value;
  patchProfileInfo(nameInput.value, descriptionInput.value)
    .then((profileInfo) => {
      nameInput.value = profileInfo.name;
      descriptionInput.value = profileInfo.about;
      closeModal(profileEdit);
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

formEditProfile.addEventListener('submit', handleSubmitEditProfile);

//Редактирование аватарки
const avatarForm = document.querySelector('.popup__form[name="avatar"]');
const avatarLinkInput = avatarForm.querySelector("#new-place-avatar");
const avatarImage = document.querySelector('.profile__image');
function handleAvatarSubmit(event) {
  event.preventDefault();
  const saveButton = event.target.querySelector('.popup__button');
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  patchAvatar(avatarLinkInput.value)
    .then((profileInfo) => {
      avatarImage.style.backgroundImage = `url(${profileInfo.avatar})`;
      closeModal(avatarEdit);
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

avatarForm.addEventListener('submit', handleAvatarSubmit);

/**
 * @param event {MouseEvent<HTMLButtonElement>}
 * @param context {{
 *   cardElement: HTMLDivElement,
 *   data: { _id: string },
 * }}
 */
const handleCardRemove = (event, context) => {
  deleteCard(context.data._id).then(() => {
    cardRemove(event, context);
  });
}

/**
 * @param event {MouseEvent<HTMLButtonElement>}
 * @param context {{
 *   cardElement: HTMLDivElement,
 *   data: { _id: string, likes: { _id: string }[] },
 * }}
 */
const handleCardLike = (event, context) => {
  const { cardElement, data } = context;
  const likeButton = cardElement.querySelector('.card__like-button');

  if (likeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard(data._id)
    .then((updatedData) => {
      likeButton.textContent = updatedData.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
  }
  else {
    likeCard(data._id)
      .then((updatedData) => {
        likeButton.textContent = updatedData.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
  }
}

//Открытие попапа с картинкой
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openFullImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
  openModal(openImage);
}

function handleAddCardSubmit(event) {
  event.preventDefault();
  const saveButton = event.target.querySelector('.popup__button');
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';
  const { name, link } = getAddCardForm();
  postAddCard(name, link)
    .then((data) => {
      const cardElement = createCard(
        cardTemplate,
        data,
        {
          onLikeClick: handleCardLike,
          onRemoveClick: handleCardRemove,
          onImageClick: openFullImage,
          hasRemoveButton: true,
        }
      );
      saveButton.textContent = originalText;
      cardList.prepend(cardElement);
      getAddCardForm().formElement.reset();
      closeModal(newCard)
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  getAddCardForm().formElement.addEventListener('submit', handleAddCardSubmit);

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

  getInitialData().then(({ profileInfo, cardsInfo }) => {
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
          onImageClick: openFullImage,
          hasRemoveButton: profileInfo._id === item.owner._id,
          hasLike: item.likes.some((like) => like._id === profileInfo._id),
        }
      );
      cardList.append(card);
    });
  });
});
