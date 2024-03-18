const configApi  = {
  url : 'https://mesto.nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '068bc2e7-aab7-4445-854c-1c5632721607',
    'Content-Type': 'application/json'
  }
}

/**
 * Проверка на корректность
 * @param res
 * @return {Promise<never>|*}
 */
const renderResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

/**
 * Вывод ошибки в консоль
 * @param err
 */
const renderError = (err) => {
  console.error('Ошибка:', err);
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
    .catch(renderError);
}

/**
 * Обновление информации о пользователе
 * @param name
 * @param about
 * @return {Promise<T | void>}
 */
const patchProfileInfo = (name, about) => {
  return fetch(`${configApi.url}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then(renderResult)
    .catch(renderError)
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
    .catch(renderError)
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
    .catch(renderError);
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
    .catch(renderError);
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
    .catch(renderError);
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
    .catch(renderError);
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
}
