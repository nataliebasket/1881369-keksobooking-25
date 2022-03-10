import {createAds} from './data.js';

const COUNT_OF_ADS = 10;

const ADS_TYPE_CAPTIONS = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarListElement = document.querySelector('#map-canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = createAds(COUNT_OF_ADS);

const createPhotoElements = (photoArray, parentElement) => {
  photoArray.forEach((photo) => {
    const photoTemplate = parentElement.children[0].cloneNode(true);
    photoTemplate.src = photo;
    parentElement.append(photoTemplate);
  });
  parentElement.children[0].remove();
};

const createFeatureElements = (list, featuresArray, nameClass) => {
  list.forEach((listItem) => {
    const isExists = featuresArray.some((userFeature) =>
      listItem.classList.contains(`${nameClass}${userFeature}`),
    );
    if (!isExists) {listItem.remove();}
  });
};

const checkAvailableData = (data, element) => {
  if (!data) {
    element.hidden = true;
  }
};

const createPopup = (ad) => {
  const adElement = similarAdTemplate.cloneNode(true);

  const adTitle = adElement.querySelector('.popup__title');
  const adAddress = adElement.querySelector('.popup__text--address');
  const adPrice = adElement.querySelector('.popup__text--price');
  const adType = adElement.querySelector('.popup__type');
  const adCapacity = adElement.querySelector('.popup__text--capacity');
  const adTime = adElement.querySelector('.popup__text--time');
  const adDescription = adElement.querySelector('.popup__description');
  const adAvatar = adElement.querySelector('.popup__avatar');
  const adFeatures = adElement.querySelectorAll('.popup__features');
  const featuresList = adElement.querySelectorAll('.popup__feature');
  const adPhotos = adElement.querySelector('.popup__photos');

  adTitle.textContent = ad.offer.title;
  adAddress.textContent = ad.offer.address;
  adPrice.textContent = `${ad.offer.price} ₽/ночь`;
  adType.textContent = ADS_TYPE_CAPTIONS[ad.offer.type];
  adCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  adTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  adDescription.textContent = ad.offer.description;
  adAvatar.src = ad.author.avatar;

  checkAvailableData(ad.offer.title, adTitle);
  checkAvailableData(ad.offer.address, adAddress);
  checkAvailableData(ad.offer.price, adPrice);
  checkAvailableData(ad.offer.type, adType);
  checkAvailableData(ad.offer.rooms, adCapacity);
  checkAvailableData(ad.offer.checkin, adTime);
  checkAvailableData(ad.offer.description, adDescription);
  checkAvailableData(ad.author.avatar, adAvatar);
  checkAvailableData(ad.offer.features, adFeatures);
  checkAvailableData(ad.offer.photos, adPhotos);

  createFeatureElements(featuresList, ad.offer.features, 'popup__feature--');
  createPhotoElements(ad.offer.photos, adPhotos);

  return adElement;
};

similarListElement.append(createPopup(similarAds[0]));
