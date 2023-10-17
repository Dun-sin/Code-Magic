import {
  getInputButton,
  getRadiusInput,
  getCheckbox,
  getCopyCodeButton,
  getColorInput1,
  getColorInput2,
  getAllInputElements,
  getAllFields,
  getResetButton,
  getTailwindButton,
  getCssOrTailwindButton,
  getCssOrTailwindDropdown,
} from '../lib/getElements';
import {
  copyCSSCodeToClipboard,
  copyTailwindCodeToClipboard,
  showPopup,
  closeDropdown,
} from '../lib/packages/utils';

type RangeType = 'track' | 'thumb';
type RangeValues = {
  height: string;
  width: string;
  radius: string | number;
  color: string;
};
type Values = {
  thumb: RangeValues;
  track: RangeValues;
};

const attribute = 'input-range';
const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const showCopyClass = 'show-css-tailwind';

function setLabelValue() {
  const getThumbHeightLabel = document.getElementById(
    'thumb-height-label'
  ) as HTMLElement;
  const getThumbHeightElement = document.getElementById(
    'thumb-height'
  ) as HTMLInputElement;

  const getThumbWidthLabel = document.getElementById(
    'thumb-width-label'
  ) as HTMLElement;
  const getThumbWidthElement = document.getElementById(
    'thumb-width'
  ) as HTMLInputElement;

  const getTrackHeightLabel = document.getElementById(
    'track-height-label'
  ) as HTMLElement;
  const getTrackHeightElement = document.getElementById(
    'track-height'
  ) as HTMLInputElement;

  const getTrackWidthLabel = document.getElementById(
    'track-width-label'
  ) as HTMLElement;
  const getTrackWidthElement = document.getElementById(
    'track-width'
  ) as HTMLInputElement;

  getThumbHeightLabel.innerText = `${getThumbHeightElement.value}px`;

  getThumbWidthLabel.innerText = `${getThumbWidthElement.value}px`;

  getTrackHeightLabel.innerText = `${getTrackHeightElement.value}px`;

  getTrackWidthLabel.innerText = `${getTrackWidthElement.value}px`;
}

function setBorderRadiusValue(element: RangeType) {
  const range = `${attribute}-${element}`;
  const getBorderRadiusInput = getRadiusInput(range);
  const checkbox = getCheckbox(range);

  if (checkbox.checked) {
    getBorderRadiusInput.value = '10';
  } else {
    getBorderRadiusInput.value = ' ';
  }
}

function setPreview(values: Values): void {
  const previewElement = document.getElementById(
    'preview-range'
  ) as HTMLInputElement;

  const thumbValues = values.thumb;
  const trackValues = values.track;

  // set track styles
  previewElement.style.setProperty(
    '--preview-track-height',
    `${trackValues.height}px`
  );
  previewElement.style.setProperty(
    '--preview-track-width',
    `${trackValues.width}px`
  );
  previewElement.style.setProperty('--preview-track-color', trackValues.color);
  previewElement.style.setProperty(
    '--preview-track-radius',
    `${trackValues.radius}px`
  );

  // set thumb styles
  previewElement.style.setProperty(
    '--preview-thumb-height',
    `${thumbValues.height}px`
  );

  previewElement.style.setProperty(
    '--preview-thumb-width',
    `${thumbValues.width}px`
  );
  previewElement.style.setProperty('--preview-thumb-color', thumbValues.color);
  previewElement.style.setProperty(
    '--preview-thumb-radius',
    `${thumbValues.radius}px`
  );
}

function copyHandler() {
  const previewElement = document.getElementById(
    'preview-range'
  ) as HTMLInputElement;
  copyCSSCodeToClipboard(attribute, previewElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}
function getCssOrTailwind(e?: MouseEvent): void {
  e?.stopPropagation();
  getCssOrTailwindDropdownElement.classList.toggle(showCopyClass);
}

// closes css and tailwind dropdown on outside click
closeDropdown(getCssOrTailwind, getCssOrTailwindDropdownElement, showCopyClass);

export const rangeGenerator = () => {
  const getCodeButton = getCopyCodeButton(attribute);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  const getTrackColor = getColorInput1(attribute);
  const getThumbColor = getColorInput2(attribute);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);

  const getTrackHeightElement = document.getElementById(
    'track-height'
  ) as HTMLInputElement;
  const getThumbHeightElement = document.getElementById(
    'thumb-height'
  ) as HTMLInputElement;
  const getTrackWidthElement = document.getElementById(
    'track-width'
  ) as HTMLInputElement;
  const getThumbWidthElement = document.getElementById(
    'thumb-width'
  ) as HTMLInputElement;

  const trackCheckBox = getCheckbox(`${attribute}-track`);
  const thumbCheckBox = getCheckbox(`${attribute}-thumb`);
  const getTrackRadius = getRadiusInput(`${attribute}-track`);
  const getThumbRadius = getRadiusInput(`${attribute}-thumb`);
  const inputPlusThumbButton = getInputButton(`${attribute}-plus-thumb`);
  const inputMinusThumbButton = getInputButton(`${attribute}-minus-thumb`);
  const inputPlusTrackButton = getInputButton(`${attribute}-plus-track`);
  const inputMinusTrackButton = getInputButton(`${attribute}-minus-track`);
  const allRangeInputElements = getAllInputElements(attribute);

  allRangeInputElements.forEach((item) => {
    item.addEventListener('input', () => {
      setPreview({
        thumb: {
          height: getThumbHeightElement.value,
          width: getThumbWidthElement.value,
          radius: thumbCheckBox.checked ? getThumbRadius.value : 0,
          color: getThumbColor.value,
        },
        track: {
          height: getTrackHeightElement.value,
          width: getTrackWidthElement.value,
          radius: trackCheckBox.checked ? getTrackRadius.value : 0,
          color: getTrackColor.value,
        },
      });
      setLabelValue();
    });
  });

  const setBorderRadiusValueMinus = (element: RangeType) => {
    const range = `${attribute}-${element}`;
    const getBorderRadiusInput = getRadiusInput(range);
    getBorderRadiusInput.value = (
      getBorderRadiusInput.valueAsNumber - 1
    ).toString();
  };
  const setBorderRadiusValuePlus = (element: RangeType) => {
    const range = `${attribute}-${element}`;
    const getBorderRadiusInput = getRadiusInput(range);
    getBorderRadiusInput.value = (
      getBorderRadiusInput.valueAsNumber + 1
    ).toString();
  };
  inputMinusThumbButton.addEventListener('click', () => {
    setBorderRadiusValueMinus('thumb');
  });
  inputMinusTrackButton.addEventListener('click', () => {
    setBorderRadiusValueMinus('track');
  });
  inputPlusThumbButton.addEventListener('click', () => {
    setBorderRadiusValuePlus('thumb');
  });
  inputPlusTrackButton.addEventListener('click', () => {
    setBorderRadiusValuePlus('track');
  });

  trackCheckBox.addEventListener('input', () => {
    setBorderRadiusValue('track');
    if (getTrackRadius && inputPlusTrackButton && inputMinusTrackButton) {
      const displayStyle = trackCheckBox.checked ? 'inline' : 'none';

      getTrackRadius.style.display = displayStyle;
      inputPlusTrackButton.style.display = displayStyle;
      inputMinusTrackButton.style.display = displayStyle;
    }
  });

  thumbCheckBox.addEventListener('input', () => {
    setBorderRadiusValue('thumb');
    if (getThumbRadius && inputPlusThumbButton && inputMinusThumbButton) {
      const displayStyle = thumbCheckBox.checked ? 'inline' : 'none';

      getThumbRadius.style.display = displayStyle;
      inputPlusThumbButton.style.display = displayStyle;
      inputMinusThumbButton.style.display = displayStyle;
    }
  });

  getCodeButton.addEventListener('click', copyHandler);
  getTailwindCodeButtonElement.addEventListener('click', tailwindHandler);
  getCssOrTailwindButtonElement.addEventListener('click', getCssOrTailwind);
};

function resetValues() {
  const {inputs} = getAllFields(attribute);

  getResetButton(attribute).addEventListener('click', () => {
    inputs.forEach((input) => {
      input.value = input.defaultValue;
      input.checked = input.defaultChecked;
    });

    (
      document.querySelector(
        '[data-content="input-range"] #thumb-height-label'
      ) as HTMLElement
    ).innerHTML = '';
    (
      document.querySelector(
        '[data-content="input-range"] #track-height-label'
      ) as HTMLElement
    ).innerHTML = '';
    (
      document.querySelector(
        '[data-content="input-range"] #thumb-width-label'
      ) as HTMLElement
    ).innerHTML = '';
    (
      document.querySelector(
        '[data-content="input-range"] #track-width-label'
      ) as HTMLElement
    ).innerHTML = '';

    getResetButton(attribute).classList.remove('reset-show');
  });
}

// get values from all targets to get notified when values change.

function getValues() {
  const {inputs} = getAllFields(attribute);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      getResetButton(attribute).classList.add('reset-show');
      resetValues();
    });
  });
}
getValues();

// Tailwind codecopy handler
function tailwindHandler() {
  const element = document.querySelector('#preview-range') as HTMLInputElement;
  copyTailwindCodeToClipboard(attribute, element);
  showPopup(
    'Tailwind Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}
