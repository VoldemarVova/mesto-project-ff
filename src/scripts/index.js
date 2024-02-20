import { initialCards } from './cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(template, data, onRemoveClick) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const { link, name } = data;

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', () => onRemoveClick(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function cardDelete(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  const card = createCard(
    cardTemplate,
    item,
    cardDelete,
  );
  cardList.append(card);
});
