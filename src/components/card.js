// @todo: Функция создания карточки
function createCard(template, data, handlers = {}) {
  const { onLikeClick, onRemoveClick, onImageClick } = handlers;

  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const imageElement = cardElement.querySelector('.card__image');

  const { link, name } = data;

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  if (likeButton && onLikeClick) {
    likeButton.addEventListener('click', (event) => onLikeClick(event, { cardElement, data }));
  }

  if (deleteButton && onRemoveClick) {
    deleteButton.addEventListener('click', (event) => onRemoveClick(event, { cardElement, data }));
  }

  if (imageElement && onImageClick) {
    imageElement.addEventListener('click', (event) => onImageClick(event, { cardElement, data }));
  }

  return cardElement;
}

function cardRemove(event, context) {
  const { cardElement } = context;
  cardElement.remove();
}

function cardLike(event) {
  event.currentTarget.classList.toggle('card__like-button_is-active');
}

export { createCard, cardRemove, cardLike };
