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

const NUMBER_ADS = 10;
const ADS_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN = ['12:00', '13:00', '14:00'];
const CHECK_OUT = ['12:00', '13:00', '14:00'];
const ADS_TITLES = [
  'Просторное помещение',
  'Тихое, уютное место для двоих',
  'Светлое, просторное место',
  'Всё по фен шую, как вы ждали',
  'Вам захочется приехать ещё раз'
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

const createAutor = (avatarNumber) => ({
  avatar: `img/avatars/user${avatarNumber}.png`,
});

const createRandomArray = (values) => {
  const features = new Array(getRandomPositiveInteger(1, values.length));
  for (let i = 0; i < features.length; i++) {features[i] = values[i];}
  return features;
};

const createOffer = () => ({
  title: getRandomArrayElement(ADS_TITLES),
  adress: this.loc,
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

const createLocation = () => ({
  lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
  lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
});

const createAd = (avatarNumber) => ({
  author: createAutor(avatarNumber),
  location: createLocation(),
  loc: this.location.lat,
  offer: createOffer(),
});

const createAds = () => {
  const massiveObjects = [];
  for (let i = 1; i <= NUMBER_ADS; i++) {
    const avatarNumber = (i < 10) ? `0${i}` : `${i}`;
    massiveObjects.push(createAd(avatarNumber));
  }
  return massiveObjects;
};

createAds();

// console.log (createAds[2].location.lat);
console.log(createAds()[2].loc);
