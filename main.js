(()=>{"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var t={url:"https://mesto.nomoreparties.co/v1/wff-cohort-9",headers:{authorization:"068bc2e7-aab7-4445-854c-1c5632721607","Content-Type":"application/json"}},n=function(e){return e.ok?e.json():Promise.reject(new Error("Ошибка: ".concat(e.status)))};function r(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.hasRemoveButton,o=n.hasLike,c=n.onLikeClick,a=n.onRemoveClick,i=n.onImageClick,u=e.querySelector(".card").cloneNode(!0),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__like-button"),d=u.querySelector(".card__image"),p=t.link,f=t.name,m=t.likes;return d.src=p,d.alt=f,u.querySelector(".card__title").textContent=f,s.textContent=m.length,o&&s.classList.add("card__like-button_is-active"),r||l.remove(),r&&l&&a&&l.addEventListener("click",(function(e){return a(e,{cardElement:u,data:t})})),s&&c&&s.addEventListener("click",(function(e){return c(e,{cardElement:u,data:t})})),d&&i&&d.addEventListener("click",(function(e){return i(e,{cardElement:u,data:t})})),u}var o=function(e,r){var o,c=r.cardElement,a=r.data,i=c.querySelector(".card__like-button");i.classList.contains("card__like-button_is-active")?(o=a._id,fetch("".concat(t.url,"/cards/likes/").concat(o),{method:"DELETE",headers:t.headers}).then(n)).then((function(e){i.textContent=e.likes.length,i.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e.message)})):function(e){return fetch("".concat(t.url,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then(n)}(a._id).then((function(e){i.textContent=e.likes.length,i.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e.message)}))},c=function(e,r){var o;(o=r.data._id,fetch("".concat(t.url,"/cards/").concat(o),{method:"DELETE",headers:t.headers}).then(n)).then((function(){!function(e,t){t.cardElement.remove()}(0,r)})).catch((function(e){console.log(e.message)}))};function a(e){e.target===e.currentTarget&&l(e.currentTarget)}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&l(t)}}function u(e){e.classList.add("popup_is-opened"),e.addEventListener("click",a),document.addEventListener("keydown",i)}function l(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",a),document.removeEventListener("keydown",i)}function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var p={config:{}},f=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(p.config.inputErrorClass),n.classList.remove(p.config.errorClass),n.textContent=""},m=function(e){if(e){var t=Boolean(e.querySelector(".".concat(p.config.inputErrorClass))),n=e.querySelector(p.config.submitButtonSelector),r=Array.from(e.querySelectorAll("input")).some((function(e){return!e.value.trim()}));n.disabled=t||r}};function y(e){e&&(Array.from(e.querySelectorAll(".".concat(p.config.inputErrorClass))).forEach((function(t){f(e,t)})),m(e))}var v=function(e){p.config=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){var r,o,c,a;r=e,o=t,c=n[t],a=function(e,t){if("object"!=s(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==s(a)?a:String(a))in r?Object.defineProperty(r,o,{value:c,enumerable:!0,configurable:!0,writable:!0}):r[o]=c})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e),Array.from(document.querySelectorAll(p.config.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(p.config.inputSelector));m(e),t.forEach((function(t){t.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage||""):t.setCustomValidity(""),t.validity.valid?f(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(p.config.inputErrorClass),r.classList.add(p.config.errorClass),r.textContent=n}(e,t,t.validationMessage)})(e,t),m(e)}))}))}(e)}))},_=document.querySelector("#card-template").content,h=document.querySelector(".places__list"),b=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__add-button"),E=document.querySelector(".popup_type_new-card"),C=document.querySelector(".popup_type_image"),k=document.querySelectorAll(".popup__close"),L=document.querySelector(".profile__image"),q=document.querySelector(".popup_type_edit_avatar"),O=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),j=document.querySelector(".popup__input_type_name"),w=document.querySelector(".popup__input_type_description"),A=document.querySelector(".profile__image"),P=document.querySelector(".popup__image"),T=document.querySelector(".popup__caption"),I=document.forms["edit-profile"],D=document.forms.avatar,B=D.querySelector("#new-place-avatar"),R=document.querySelector(".popup_type_delete_card"),M=document.forms["new-place"],N=M.querySelector(".popup__input_type_card-name"),J=M.querySelector(".popup__input_type_url");function G(e){e.preventDefault();var r,o,c=e.submitter,a=c.textContent;c.textContent="Сохранение...",(r=j.value,o=w.value,fetch("".concat(t.url,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:o})}).then(n)).then((function(e){O.textContent=e.name,x.textContent=e.about,l(g)})).catch((function(e){console.log(e.message)})).finally((function(){c.textContent=a}))}function H(e){e.preventDefault();var r,o=e.submitter,c=o.textContent;o.textContent="Сохранение...",(r=B.value,fetch("".concat(t.url,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then(n)).then((function(e){A.style.backgroundImage="url(".concat(e.avatar,")"),l(q)})).catch((function(e){console.log(e.message)})).finally((function(){o.textContent=c}))}function U(e,t){t.data._id&&(u(R),R.addEventListener("submit",(function n(){c(e,t),l(R),R.removeEventListener("submit",n)})))}function V(e){P.src=e.target.src,P.alt=e.target.alt,T.textContent=e.target.alt,u(C)}function z(e){e.preventDefault();var c,a,i=e.submitter,u=i.textContent;i.textContent="Сохранение...",(c=N.value,a=J.value,fetch("".concat(t.url,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:c,link:a})}).then(n)).then((function(e){var t=r(_,e,{onLikeClick:o,onRemoveClick:U,onImageClick:V,hasRemoveButton:!0});h.prepend(t),M.reset(),l(E)})).catch((function(e){console.log(e.message)})).finally((function(){i.textContent=u}))}g.classList.add("popup_is-animated"),C.classList.add("popup_is-animated"),E.classList.add("popup_is-animated"),q.classList.add("popup_is-animated"),R.classList.add("popup_is-animated"),L.addEventListener("click",(function(){D.reset(),y(q),u(q)})),b.addEventListener("click",(function(){j.value=O.textContent,w.value=x.textContent,y(g),u(g)})),S.addEventListener("click",(function(){M.reset(),y(E),u(E)})),k.forEach((function(e){var t=e.closest(".popup");t&&e.addEventListener("click",(function(){l(t)}))})),document.addEventListener("DOMContentLoaded",(function(){D.addEventListener("submit",H),I.addEventListener("submit",G),M.addEventListener("submit",z),v({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),Promise.all([fetch("".concat(t.url,"/users/me"),{method:"GET",headers:t.headers}).then(n),fetch("".concat(t.url,"/cards"),{method:"GET",headers:t.headers}).then(n)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(n,r)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());return{profileInfo:o[0],cardsInfo:o[1]}})).then((function(e){var t=e.profileInfo,n=e.cardsInfo;L.style.backgroundImage="url(".concat(t.avatar,")"),O.textContent=t.name,x.textContent=t.about,n.forEach((function(e){var n=r(_,e,{onLikeClick:o,onRemoveClick:U,onImageClick:V,hasRemoveButton:t._id===e.owner._id,hasLike:e.likes.some((function(e){return e._id===t._id}))});h.append(n)}))})).catch((function(e){console.log(e.message)}))}))})();