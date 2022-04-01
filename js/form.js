import {pristine} from'./form-validator.js';
import './slider.js';
import {MAIN_LOCATION, getLocationToString, resetMainPin, filterAd} from './map.js';
import {sendData} from './api.js';

const adForm = document.querySelector('.ad-form');
const mainPinLocation = document.querySelector('#address');
const resetFormButton = document.querySelector('.ad-form__reset');
const sendButton = document.querySelector('.ad-form__submit');
const filterForm = document.querySelector('.map__filters');

const resetForm = (evt) => {
  evt.preventDefault();
  pristine.reset();
  adForm.reset();
  filterForm.reset();
  filterAd();
  mainPinLocation.value = getLocationToString(MAIN_LOCATION, 5);
  resetMainPin();
};

resetFormButton.addEventListener('click', resetForm);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    sendData(new FormData(evt.target));
    sendButton.disabled = true;
    resetForm(evt);
  }
});
