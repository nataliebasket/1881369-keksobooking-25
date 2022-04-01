import {openSuccessSendMessage, openErrorSendMessage} from './errors.js';
import {showAlert} from './util.js';

const ServerUrl = {
  GET_URL: 'https://25.javascript.pages.academy/keksobooking/data',
  POST_URL: 'https://25.javascript.pages.academy/keksobooking',
};

const getAds = async () => {
  let response;
  try {
    response = await fetch(
      ServerUrl.GET_URL,
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    );
  }
  catch (err) {
    showAlert('Не удалось получить данные с сервера :(');
    return [];
  }

  const allAds = await response.json();
  return allAds;
};

const sendData = (body) => {
  fetch(
    ServerUrl.POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        openSuccessSendMessage();
      } else {
        openErrorSendMessage();
      }
    })
    .catch(() => {
      openErrorSendMessage();
    });
};

export {getAds, sendData};
