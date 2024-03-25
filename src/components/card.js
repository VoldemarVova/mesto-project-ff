import {deleteCard, dislikeCard, likeCard} from "../scripts/api";

/**
 * Создания карточки
 * @param template HTMLTemplateElement
 * @param data
 * @param options {{
 *   hasRemoveButton: boolean,
 *   hasLike: boolean,
 *   onLikeClick: (event: MouseEvent<HTMLButtonElement>, context: { cardElement: HTMLDivElement, data: { _id: string } }) => void
 *   onRemoveClick: (event: MouseEvent<HTMLButtonElement>, context: { cardElement: HTMLDivElement, data: { _id: string } }) => void
 *   onImageClick: (event: MouseEvent<HTMLButtonElement>, context: { cardElement: HTMLDivElement, data: { _id: string } }) => void
 * }}
 * @return {HTMLDivElement}
 */
function createCard(template, data, options = {}) {
  const {
    hasRemoveButton,
    hasLike,
    onLikeClick,
    onRemoveClick,
    onImageClick,
  } = options;

  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const imageElement = cardElement.querySelector('.card__image');

  const { link, name, likes } = data;
  imageElement.src = link;
  imageElement.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  likeButton.textContent = likes.length;

  if (hasLike) {
    likeButton.classList.add('card__like-button_is-active');
  }
  if (!hasRemoveButton) {
    deleteButton.remove();
  }

  if (hasRemoveButton && deleteButton && onRemoveClick) {
    deleteButton.addEventListener('click', (event) => onRemoveClick(event, { cardElement, data }));
  }
  if (likeButton && onLikeClick) {
    likeButton.addEventListener('click', (event) => onLikeClick(event, { cardElement, data }));
  }
  if (imageElement && onImageClick) {
    imageElement.addEventListener('click', (event) => onImageClick(event, { cardElement, data }));
  }

  return cardElement;
}

/**
 * Удаление карточки из списка
 * @param event
 * @param context
 */
function removeCard(event, context) {
  const { cardElement } = context;
  cardElement.remove();
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
      .catch((error) => {
        console.log(error.message);
      })
  }
  else {
    likeCard(data._id)
      .then((updatedData) => {
        likeButton.textContent = updatedData.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch((error) => {
        console.log(error.message);
      })
  }
}

/**
 * @param event {MouseEvent<HTMLButtonElement>}
 * @param context {{
 *   cardElement: HTMLDivElement,
 *   data: { _id: string },
 * }}
 */
const handleCardRemove = (event, context) => {
  deleteCard(context.data._id)
    .then(() => {
    removeCard(event, context);
  })
    .catch((error) => {
    console.log(error.message);
  })
}

export { createCard, removeCard, handleCardLike, handleCardRemove };
