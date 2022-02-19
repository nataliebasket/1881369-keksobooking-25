const getRandomInt = (firstValue, secondValue) => {
  firstValue = Math.ceil(firstValue);
  secondValue = Math.floor(secondValue);
  if (firstValue < 0 || secondValue < 0 || (secondValue - firstValue) < 0) {return null;}
  return Math.floor(Math.random() * (secondValue - firstValue + 1)) + firstValue;
};

getRandomInt(1, 1);

const getRandomGeo = (firstValue, secondValue, num) => {
  if (firstValue < 0 || secondValue < 0 || (secondValue - firstValue) < 0) {return null;}
  if (firstValue.toFixed(num) === secondValue.toFixed(num)) {return firstValue.toFixed(num);}
  return ((Math.random() * (secondValue - firstValue)) + firstValue).toFixed(num);
};

getRandomGeo(1, 4, 4);
