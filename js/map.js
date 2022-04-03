import {createPopup} from './similar-ads.js';
import {getAds} from './api.js';
import {toggleFormDisabled, toggleMapFiltersDisabled} from './form-switcher.js';
import {debounce, showAlert} from './util.js';
import {checkAllFilters} from './filter.js';

const COUNT_OF_ADS = 10;
const MAP_ZOOM = 13;

const MAIN_LOCATION = {
  lat: 35.675178,
  lng: 139.748876,
};

const NUMBER_AFTER_POINT = 5;

const mainPinLocation = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const similarPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const getLocationToString = (obj, number) => {
  let {lat, lng} = obj;
  lat = Number(lat.toFixed(number));
  lng = Number(lng.toFixed(number));
  return `${lat}, ${lng}`;
};

toggleFormDisabled(true);
toggleMapFiltersDisabled(true);

const map = L.map('map-canvas')
  .on('load', () => {
    toggleFormDisabled(false); // открытие - показ формы
  })
  .setView(MAIN_LOCATION, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавление главной метки на карту
const mainPinMarker = L.marker(
  MAIN_LOCATION,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);
mainPinLocation.value = getLocationToString(mainPinMarker.getLatLng(), NUMBER_AFTER_POINT);

mainPinMarker.on('moveend', (evt) => {
  mainPinLocation.value = getLocationToString(evt.target.getLatLng(), NUMBER_AFTER_POINT);
});


const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: similarPinIcon,
    }
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createPopup(ad));
};

const resetMainPin = () => {
  mainPinMarker.setLatLng(MAIN_LOCATION);
  map.setView(MAIN_LOCATION, MAP_ZOOM);
  map.closePopup();
};

let allAds = getAds();

(async function () {
  allAds = await getAds();
  allAds.slice(0, COUNT_OF_ADS).forEach((ad) => {
    createMarker(ad);
    toggleMapFiltersDisabled(false);
  });
})();


const filterForm = document.querySelector('.map__filters');

const filterAd = () => {
  markerGroup.clearLayers();

  const filteredAds = allAds.filter((ad) => checkAllFilters(ad));

  filteredAds.slice(0, COUNT_OF_ADS).forEach((ad) => {
    createMarker(ad);
  });

  if (filteredAds.length <= 0) {showAlert('Не удалось найти подходящие объявления');}
};

filterForm.addEventListener('change', debounce(filterAd));

export {resetMainPin, MAIN_LOCATION, getLocationToString, mainPinLocation, filterAd};
