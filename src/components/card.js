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

//Лайк карточки
const cardList = document.querySelector('.places__list');
function handelLike(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

cardList.addEventListener('click', handelLike);


export {createCard, cardDelete, handelLike}
