import {pristine} from'./form-validator.js';
import './slider.js';
import {MAIN_LOCATION, getLocationToString, resetMainPin, filterAd} from './map.js';
import {sendData} from './api.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const mainPinLocation = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const sendButton = document.querySelector('.ad-form__submit');
const filterForm = document.querySelector('.map__filters');

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const resetAllPhoto = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  if (document.querySelector('.ad-form__photo img')) {
    document.querySelector('.ad-form__photo img').remove();
  }
};

const resetForm = (evt) => {
  evt.preventDefault();
  pristine.reset();
  adForm.reset();
  filterForm.reset();
  filterAd();
  resetAllPhoto();
  mainPinLocation.value = getLocationToString(MAIN_LOCATION, 5);
  resetMainPin();
};

resetButton.addEventListener('click', resetForm);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    sendData(new FormData(evt.target));
    sendButton.disabled = true;
    resetForm(evt);
  }
});


avatarChooser.addEventListener('change', () => {
  const avatar = avatarChooser.files[0];
  const fileName = avatar.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
});

photoChooser.addEventListener('change', () => {
  const photo = photoChooser.files[0];
  const photoName = photo.name.toLowerCase();
  const exist = document.querySelector('.ad-form__photo img');
  const photoElement = document.createElement('img');
  photoElement.style.width = '70px';
  photoElement.style.height = '70px';
  const matches = FILE_TYPES.some((it) => photoName.endsWith(it));
  if (matches) {
    if (exist) {
      exist.src = URL.createObjectURL(photo);
    } else {
      photoElement.src = URL.createObjectURL(photo);
      photoPreview.appendChild(photoElement);
    }
  }
});
