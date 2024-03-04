import { initialCards } from './cards';
import { createCard, cardRemove, cardLike } from "../components/card";
import { openModal, closeModal } from "../components/modal";


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = createCard(
    cardTemplate,
    item,
    {
      onLikeClick: cardLike,
      onRemoveClick: cardRemove,
      onImageClick: openFullImage,
    }
  );
  cardList.append(card);
});

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileEdit = document.querySelector('.popup_type_edit');
const buttonNewCard = document.querySelector('.profile__add-button')
const newCard = document.querySelector('.popup_type_new-card');
const openImage = document.querySelector('.popup_type_image');
const popupsClose = document.querySelectorAll('.popup__close')

//Плавное открытие и закрытие попапов
profileEdit.classList.add('popup_is-animated');
openImage.classList.add('popup_is-animated')
newCard.classList.add('popup_is-animated')

//Открытие и закрытие модального окна
buttonProfileEdit.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEdit);
});

buttonNewCard.addEventListener('click', function () {
  openModal(newCard)
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
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEdit);
}

formEditProfile.addEventListener('submit', handleSubmitEditProfile);

//Добавление карточки
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

function handleAddCardSubmit(event) {
  event.preventDefault();
  const cardElement = createCard(
    cardTemplate,
    {
      name: placeInput.value,
      link: linkInput.value,
    },
    {
      onLikeClick: cardLike,
      onRemoveClick: cardRemove,
      onImageClick: openFullImage,
    }
  );
  cardList.prepend(cardElement);
  addCardForm.reset();
  closeModal(newCard)
}

addCardForm.addEventListener('submit', handleAddCardSubmit)

//Открытие попапа с картинкой
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openFullImage(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
  openModal(openImage);
}
