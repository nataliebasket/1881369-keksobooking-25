
import {toggleFormDisabled} from './form-switcher.js';
import {createAds} from './data.js';
import {createPopup} from './similar-ads.js';

const mainPinLocation = document.querySelector('#address');

const COUNT_OF_ADS = 10;


const loadMap = () => {

  const map = L.map('map-canvas')
    .on('load', () => {
      toggleFormDisabled(false);
    })
    .setView({
      lat: 35.6895,
      lng: 139.692,
    }, 11);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.692,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    mainPinLocation.value = evt.target.getLatLng();
  });

  const iconOverPoints = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });


  const overPoints = createAds(COUNT_OF_ADS);
  const markerGroup = L.layerGroup().addTo(map);

  const createMarker = (ad) => {
    const marker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon: iconOverPoints,
      }
    );
    marker
      .addTo(markerGroup)
      .bindPopup(createPopup(ad));
  };

  overPoints.forEach((ad) => {
    createMarker(ad);
  });

  //markerGroup.clearLayers();

};

export {loadMap};
