// const getRandomInt = (firstValue, secondValue) => {
//   firstValue = Math.ceil(firstValue);
//   secondValue = Math.floor(secondValue);
//   if (firstValue < 0 || secondValue < 0 || (secondValue - firstValue) < 0) {return null;}
//   return Math.floor(Math.random() * (secondValue - firstValue + 1)) + firstValue;
// };
// const getRandomGeo = (firstValue, secondValue, num) => {
//   if (firstValue < 0 || secondValue < 0 || (secondValue - firstValue) < 0) {return null;}
//   if (firstValue.toFixed(num) === secondValue.toFixed(num)) {return firstValue.toFixed(num);}
//   return ((Math.random() * (secondValue - firstValue)) + firstValue).toFixed(num);
// };

const ADS_NUMBERS = 10;
const ADS_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN = ['12:00', '13:00', '14:00'];
const CHECK_OUT = ['12:00', '13:00', '14:00'];
const ADS_TITLES = [
  'Просторное помещение',
  'Тихое, уютное место для двоих',
  'Светлое, просторное место',
  'Всё по фен шую, как вы ждали',
  'Вам захочется приехать сюда ещё раз'
];
const ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'];
const ADS_DISCRIPTION = [
  'Все окна на север',
  'Тихие соседи',
  'Южная сторона',
  'Панорамные окна'
];
const ADS_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createRandomArray = (values) => {
  const features = new Array(getRandomPositiveInteger(1, values.length));
  for (let i = 0; i < features.length; i++) {features[i] = values[i];}
  return features;
};

const createAutor = (avatarNumber) => ({
  avatar: `img/avatars/user${avatarNumber}.png`,
});

const createOffer = (lat, lng) => ({
  title: getRandomArrayElement(ADS_TITLES),
  address: `${lat} ${lng}`,
  price: getRandomPositiveInteger(1000, 5000),
  type: getRandomArrayElement(ADS_TYPES),
  rooms: getRandomPositiveInteger(1, 5),
  guests: getRandomPositiveInteger(1, 10),
  checkin: getRandomArrayElement(CHECK_IN),
  checkout: getRandomArrayElement(CHECK_OUT),
  features: createRandomArray(ADS_FEATURES),
  description: getRandomArrayElement(ADS_DISCRIPTION),
  photos: createRandomArray(ADS_PHOTOS),
});

const createLocation = (lat, lng) => ({
  lat,
  lng,
});

const createAd = (avatarNumber) => {
  const lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  return {
    author: createAutor(avatarNumber),
    location: createLocation(lat, lng),
    offer: createOffer(lat, lng),
  };
};

const createAds = () => {
  const massiveAds = [];
  for (let i = 1; i <= ADS_NUMBERS; i++) {
    const avatarNumber = (i < 10) ? `0${i}` : `${i}`;
    massiveAds.push(createAd(avatarNumber));
  }
  return massiveAds;
};

createAds();
