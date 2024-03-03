import { initialCards } from './cards';
import { createCard, cardDelete, handelLike} from "../components/card";
import { openModal, closeModal } from "../components/modal";


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  const card = createCard(
    cardTemplate,
    item,
    cardDelete,
    handelLike,
    openFullImage,
  );
  cardList.append(card);
});

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileEdit = document.querySelector('.popup_type_edit');
const buttonNewCard = document.querySelector('.profile__add-button')
const newCard = document.querySelector('.popup_type_new-card');
// const cardOpenImage = document.querySelector('.places__list');
const openImage = document.querySelector('.popup_type_image');
const popupClose = document.querySelectorAll('.popup__close')

//Плавное открытие и закрытие попапов
profileEdit.classList.add('popup_is-animated');
openImage.classList.add('popup_is-animated')
newCard.classList.add('popup_is-animated')

//Открытие и закрытие модального окна
buttonProfileEdit.addEventListener('click', function () {
  openModal(profileEdit);
});

buttonNewCard.addEventListener('click', function () {
  openModal(newCard)
})

// cardOpenImage.addEventListener('click', function (evt){
//   if (!evt.target.classList.contains('card__image')) {
//     return;
//   }
//   openImage.classList.add('popup_is-opened');
// });

popupClose.forEach(popupClose => {
  popupClose.addEventListener('click', function () {
    closeModal(profileEdit)
    closeModal(newCard)
    closeModal(openImage)
  });
});

//Редактирование имени и информации о себе
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

buttonProfileEdit.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEdit);
  // console.log(handleFormSubmit)
}

formElement.addEventListener('submit', handleFormSubmit);

//Добавление карточки
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard(cardTemplate, {name: placeInput.value, link: linkInput.value}, cardDelete);
  cardList.prepend(cardElement);
  addCardForm.reset();
  closeModal(newCard)
}

addCardForm.addEventListener('submit', handleAddCardSubmit)

//Открытие попапа с картинкой
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openFullImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(openImage);
}

cardList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__image')) {
    openFullImage(evt);
  }
});


