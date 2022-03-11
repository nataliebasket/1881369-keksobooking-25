import {createPopup} from './similar-ads.js';
import {toggleFormDisabled} from './form.js';
import {createAds} from './data.js';

const COUNT_OF_ADS = 10;
const similarAds = createAds(COUNT_OF_ADS);

toggleFormDisabled(true);

document.querySelector('#map-canvas').append(createPopup(similarAds[0]));
