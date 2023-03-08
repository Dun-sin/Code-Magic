import {
  getRadiusInput,
  getCheckbox,
  getCopyCodeButton,
  getColorInput1,
  getColorInput2,
  getAllInputElements,
  getAllFields,
  getResetButton
} from '../lib/getElements';
import {copyCodeToClipboard, showPopup} from '../lib/packages';

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

  if (getCheckbox(range).checked) {
    getRadiusInput(range).value = getBorderRadiusInput.value;
  } else {
    getRadiusInput(range).value = '10';
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
  copyCodeToClipboard(attribute, previewElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

export const rangeGenerator = () => {
  const getCodeButton = getCopyCodeButton(attribute);

  const getTrackColor = getColorInput1(attribute);
  const getThumbColor = getColorInput2(attribute);

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

  trackCheckBox.addEventListener('input', () => {
    setBorderRadiusValue('track');
    getTrackRadius.style.display = trackCheckBox.checked ? 'inline' : 'none';
  });
  thumbCheckBox.addEventListener('input', () => {
    setBorderRadiusValue('thumb');
    getThumbRadius.style.display = thumbCheckBox.checked ? 'inline' : 'none';
  });

  getCodeButton.addEventListener('click', copyHandler);
};


function resetValues() {
  const { inputs } = getAllFields(attribute);

  getResetButton(attribute).addEventListener("click", () => {

    inputs.forEach(input => {
      input.value = input.defaultValue;
      input.checked = input.defaultChecked;
    });

   (document.querySelector('[data-content="input-range"] #thumb-height-label') as HTMLElement).innerHTML = "";
   (document.querySelector('[data-content="input-range"] #track-height-label') as HTMLElement).innerHTML = "";
   (document.querySelector('[data-content="input-range"] #thumb-width-label') as HTMLElement).innerHTML = "";
   (document.querySelector('[data-content="input-range"] #track-width-label') as HTMLElement).innerHTML = "";

    getResetButton(attribute).classList.remove("reset-show");
  })
}

// get values from all targets to get notified when values change.

function getValues() {

  const { inputs } = getAllFields(attribute);

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      getResetButton(attribute).classList.add("reset-show");
      resetValues();
    })
  })
}
getValues();