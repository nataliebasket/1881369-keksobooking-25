import {createPopup} from './similar-ads.js';
import {getInactiveFormsStatus, getActiveFormsStatus} from './form.js';
import {createAds} from './data.js';

const COUNT_OF_ADS = 10;
const similarAds = createAds(COUNT_OF_ADS);

getInactiveFormsStatus();

setTimeout(getActiveFormsStatus, 2000);

document.querySelector('#map-canvas').append(createPopup(similarAds[0]));
