const configApi  = {
  url : 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '068bc2e7-aab7-4445-854c-1c5632721607',
    'Content-Type': 'application/json'
  }
}

/**
 * @param res
 * @return {Promise<never>|*}
 */
const renderResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

/**
 * Загрузка информации о пользователе с сервера
 * @return {Promise<{
 *   _id: string,
 *   name: string,
 *   avatar: string,
 *   cohort: string,
 * }>}
 */
const getProfileInfo = () => {
  return fetch(`${configApi.url}/users/me`, {
    method: "GET",
    headers: configApi.headers,
  })
    .then(renderResult)
}

/**
 * @param name
 * @param about
 * @return {Promise<Response>}
 */
const patchProfileInfo = (name, about) => {
  return fetch(`${configApi.url}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(renderResult)
}

/**
 * Обновление аватарки
 * @param avatar
 * @return {Promise<T | void>}
 */
const patchAvatar = (avatar) => {
  return fetch(`${configApi.url}/users/me/avatar`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      avatar,
    }),
  })
    .then(renderResult)
}

/**
 * Добавление новой карточки на
 * @param name
 * @param link
 * @return {Promise<T | void>}
 */
const postAddCard = (name, link) => {
  return fetch(`${configApi.url}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then(renderResult)
}

/**
 * Загрузка карточек с сервера
 * @return {Promise<{
 *   _id: string,
 *   name: string,
 *   link: string,
 *   likes: { _id: string },
 * }[]>}
 */
const getCards = () => {
  return fetch(`${configApi.url}/cards`, {
    method: "GET",
    headers: configApi.headers,
  })
    .then(renderResult)
}

/**
 * Удаление карточки с сервера
 * @param cardId {string}
 * @return {Promise<T | void>}
 */
const deleteCard = (cardId) => {
  return fetch(`${configApi.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: configApi.headers,
  })
    .then(renderResult)
}

/**
 * Лайк карточки
 * @param cardId {string}
 * @return {Promise<T | void>}
 */
const likeCard = (cardId) => {
  return fetch(`${configApi.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: configApi.headers,
  })
    .then(renderResult)
}

/**
 * Дизлайк карточки
 * @param cardId {string}
 * @return {Promise<T | void>}
 */
const dislikeCard = (cardId) => {
  return fetch(`${configApi.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: configApi.headers,
  })
    .then(renderResult)
}


/**
 * Первичная загрузка данных о профиле и списка карточек
 * @return {Promise<{
 *   profileInfo: {
 *     _id: string,
 *     name: string,
 *     about: string,
 *     avatar: string,
 *     cohort: string,
 *     likes: string,
 *   },
 *   cardsInfo: {
 *     _id: string,
 *     name: string,
 *     link: string,
 *     likes: { _id: string }[]
 *     owner: {
 *       _id: string,
 *       name: string,
 *       about: string,
 *       avatar: string,
 *       cohort: string,
 *     }
 *   }[]
 * }>}
 */
const getInitialData = () => Promise.all([getProfileInfo(), getCards()])
  .then(([profileInfo, cardsInfo]) => ({
    profileInfo,
    cardsInfo,
  }));

export {
  getProfileInfo,
  getCards,
  patchProfileInfo,
  postAddCard,
  getInitialData,
  deleteCard,
  likeCard,
  dislikeCard,
  patchAvatar,
}
