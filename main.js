(()=>{"use strict";function e(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=r.onLikeClick,n=r.onRemoveClick,c=r.onImageClick,i=e.querySelector(".card").cloneNode(!0),a=i.querySelector(".card__delete-button"),u=i.querySelector(".card__like-button"),l=i.querySelector(".card__image"),p=t.link,s=t.name;return i.querySelector(".card__image").src=p,i.querySelector(".card__image").alt=s,i.querySelector(".card__title").textContent=s,u&&o&&u.addEventListener("click",(function(e){return o(e,{cardElement:i,data:t})})),a&&n&&a.addEventListener("click",(function(e){return n(e,{cardElement:i,data:t})})),l&&c&&l.addEventListener("click",(function(e){return c(e,{cardElement:i,data:t})})),i}function t(e,t){t.cardElement.remove()}function r(e){e.currentTarget.classList.toggle("card__like-button_is-active")}function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}var c={config:{}},i=(document.querySelector(".popup__form"),function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage||""):t.setCustomValidity(""),t.validity.valid?function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(c.config.inputErrorClass),r.classList.remove(c.config.errorClass),r.textContent=""}(e,t):function(e,t,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(c.config.inputErrorClass),o.classList.add(c.config.errorClass),o.textContent=r}(e,t,t.validationMessage)}),a=function(e){var t=Boolean(e.querySelector(".".concat(c.config.inputErrorClass)));e.querySelector(c.config.submitButtonSelector).disabled=t};function u(e){e.target===e.currentTarget&&s(e.currentTarget)}function l(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&s(t)}}function p(e){var t=e.querySelector(".popup__form");!function(e){console.log("`.${validation.config.errorClass}`",".".concat(c.config.errorClass));var t=Array.from(e.querySelectorAll(".".concat(c.config.errorClass)));console.log("errorMessageElements",t),t.forEach((function(e){e.textContent="",e.classList.remove(c.config.errorClass)}));var r=Array.from(e.querySelectorAll(".".concat(c.config.inputErrorClass)));console.log("inputElements",r),r.forEach((function(e){e.classList.remove(c.config.inputErrorClass)}))}(t),a(t),e.classList.add("popup_is-opened"),e.addEventListener("click",u),document.addEventListener("keydown",l)}function s(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",u),document.removeEventListener("keydown",l)}var d=document.querySelector("#card-template").content,m=document.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var n=e(d,o,{onLikeClick:r,onRemoveClick:t,onImageClick:P});m.append(n)}));var f=document.querySelector(".profile__edit-button"),y=document.querySelector(".popup_type_edit"),_=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_image"),S=document.querySelectorAll(".popup__close");y.classList.add("popup_is-animated"),g.classList.add("popup_is-animated"),v.classList.add("popup_is-animated"),f.addEventListener("click",(function(){E.value=k.textContent,C.value=q.textContent,p(y)})),_.addEventListener("click",(function(){L.reset(),p(v)})),S.forEach((function(e){var t=e.closest(".popup");t&&e.addEventListener("click",(function(){s(t)}))}));var b=document.querySelector('.popup__form[name="edit-profile"]'),k=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),E=document.querySelector(".popup__input_type_name"),C=document.querySelector(".popup__input_type_description");b.addEventListener("submit",(function(e){e.preventDefault(),k.textContent=E.value,q.textContent=C.value,s(y)}));var L=document.querySelector('.popup__form[name="new-place"]'),h=document.querySelector(".popup__input_type_card-name"),j=document.querySelector(".popup__input_type_url");L.addEventListener("submit",(function(o){o.preventDefault();var n=e(d,{name:h.value,link:j.value},{onLikeClick:r,onRemoveClick:t,onImageClick:P});m.prepend(n),L.reset(),s(v)}));var O,x=document.querySelector(".popup__image"),w=document.querySelector(".popup__caption");function P(e){x.src=e.target.src,x.alt=e.target.alt,w.textContent=e.target.alt,p(g)}O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},c.config=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){var n,c,i,a;n=e,c=t,i=r[t],a=function(e,t){if("object"!=o(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(c),(c="symbol"==o(a)?a:String(a))in n?Object.defineProperty(n,c,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[c]=i})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},O),Array.from(document.querySelectorAll(c.config.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(c.config.inputSelector));e.querySelector(c.config.submitButtonSelector),a(e),t.forEach((function(t){t.addEventListener("input",(function(){i(e,t),a(e)}))}))}(e)}))})();