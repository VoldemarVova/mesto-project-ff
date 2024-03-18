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
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
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
function cardRemove(event, context) {
  const { cardElement } = context;
  cardElement.remove();
}

function cardLike(event) {
  event.currentTarget.classList.toggle('card__like-button_is-active');
}

export { createCard, cardRemove, cardLike };
