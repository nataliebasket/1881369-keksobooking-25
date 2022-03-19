import {loadMap} from './map.js';
import {validateAdForm} from './form-validator.js';
//import {createPopup} from './similar-ads.js';
import {toggleFormDisabled} from './form-switcher.js';
//import {createAds} from './data.js';
import './form-validator.js';


toggleFormDisabled(true);
setTimeout(loadMap, 1000);

//document.querySelector('#map-canvas').append(createPopup(similarAds[0]));

//toggleFormDisabled(false);

validateAdForm();
