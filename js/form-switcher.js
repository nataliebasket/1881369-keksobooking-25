const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');
const mapFilterSelects = mapFilter.querySelectorAll('select');

const toggleFormDisabled = (isDisabled) => {
  adForm.classList.toggle('ad-form--disabled', isDisabled);
  adFormFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });
};

const toggleMapFiltersDisabled = (isDisabled) => {
  mapFilter.classList.toggle('map__filters--disabled', isDisabled);
  mapFilterSelects.forEach((item) => {
    item.disabled = isDisabled;
  });
  mapFilterFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });
};

export {toggleFormDisabled, toggleMapFiltersDisabled};
