import {
  closeDropdown,
  copyCSSCodeToClipboard,
  copyTailwindCodeToClipboard,
  showPopup,
  slideIn,
} from '../lib/packages/utils';
import {deleteQueryParam, setQueryParam} from '../lib/packages/helpers';
import {
  getAllFields,
  getAllInputElements,
  getCopyCodeButton,
  getCssOrTailwindButton,
  getCssOrTailwindDropdown,
  getOpenSideBarButton,
  getOutput,
  getPreviewSlider,
  getResetButton,
  getResultPage,
  getShadowBlur,
  getShadowColor,
  getShadowFields,
  getShadowHorizontalOffset,
  getShadowSpread,
  getShadowVerticalOffset,
  getTailwindButton,
} from '../lib/getElements';

type Values = {
  hOffset: string;
  vOffset: string;
  blur: string;
  spread: string;
  color: string;
};

const attribute = 'box-shadow';
let isSliderOpen = false;
const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const showCopyClass = 'show-css-tailwind';
const boxshadowInputs = getAllInputElements(attribute);
const preview = getPreviewSlider(attribute);
const horizontalOffset = getShadowHorizontalOffset(attribute);
const verticalOffset = getShadowVerticalOffset(attribute);
const blur = getShadowBlur(attribute);
const spread = getShadowSpread(attribute);
const color = getShadowColor(attribute);

function copyHandler() {
  const outputElement = getOutput(attribute);
  copyCSSCodeToClipboard(attribute, outputElement);
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

export function boxShadowGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage();

  const element = boxshadowInputs[0];
  const value = element.value;

  if (value.length < 3) {
    getOpenSideBarButton().style.display = 'none';
  } else {
    getOpenSideBarButton().style.display = 'flex';
    resultPage.style.display = 'flex';
  }

  if (type === 'oldResults') return;

  const values: Values = {
    hOffset: horizontalOffset.value,
    vOffset: verticalOffset.value,
    blur: blur.value,
    spread: spread.value,
    color: color.value,
  };

  getBoxShadowResult(values, getOutputElement);
}

/**
 * sets the result to the output element
 *
 * @param attribute attribute name of the generator
 * @param values values entered by users
 * @param outputElement output element to display result
 */
function getBoxShadowResult(values: Values, outputElement: HTMLElement): void {
  const createBoxShadowElement = (
    boxShadowElement: HTMLElement,
    values: Values
  ) => {
    boxShadowElement.style.height = '300px';
    boxShadowElement.style.width = '300px';
    boxShadowElement.style.background = 'transparent';
    boxShadowElement.style.boxShadow = `${values.hOffset}px ${values.vOffset}px ${values.blur}px ${values.spread}px ${values.color}`;
  };
  createBoxShadowElement(outputElement, values);

  const getCodeButtonElement = getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  getTailwindCodeButtonElement.addEventListener('click', tailwindHandler);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);
  getCssOrTailwindButtonElement.addEventListener('click', getCssOrTailwind);
}

export function addBoxShadowListener(): void {
  const allBoxShadowInputs = [
    horizontalOffset,
    verticalOffset,
    blur,
    spread,
    color,
  ];
  const allBoxShadowInputsFields = getShadowFields(attribute, [
    'h-offset',
    'v-offset',
    'blur',
    'spread',
  ]);

  const getShadowValue = () =>
    `${horizontalOffset.value}px ${verticalOffset.value}px ${blur.value}px ${spread.value}px ${color.value}`;
  preview.style.boxShadow = getShadowValue();

  allBoxShadowInputs.forEach((input, index) => {
    // default
    if (index < 4) {
      allBoxShadowInputsFields[index].textContent = `${input.value}px`;
    }
    input.addEventListener('input', () => {
      slideIn(preview, isSliderOpen);

      isSliderOpen = true;
      if (index < 4) {
        allBoxShadowInputsFields[index].textContent = `${input.value}px`;
      }
      setQueryParam('values', getShadowValue().trim().replaceAll(' ', ''));
      preview.style.boxShadow = getShadowValue();
    });
  });
}

// reset the values of all target fields

function resetValues() {
  const {inputs} = getAllFields(attribute);

  getResetButton(attribute).addEventListener('click', () => {
    inputs.forEach((input) => {
      input.value = input.defaultValue;
    });

    document.querySelector(
      "[data-content='box-shadow'] #box-shadow-h-offset-field"
    )!.innerHTML = '5px';
    document.querySelector(
      "[data-content='box-shadow'] #box-shadow-v-offset-field"
    )!.innerHTML = '10px';
    document.querySelector(
      "[data-content='box-shadow'] #box-shadow-blur-field"
    )!.innerHTML = '18px';
    document.querySelector(
      "[data-content='box-shadow'] #box-shadow-spread-field"
    )!.innerHTML = '5px';

    getResetButton(attribute).classList.remove('reset-show');
  });

  deleteQueryParam('values');
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
  const outputElement: HTMLElement = getOutput(attribute);
  copyTailwindCodeToClipboard(attribute, outputElement);
  showPopup(
    'Tailwind Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

export const applyBoxShadowValues = (values: string) => {
  values = values.replaceAll('px', ' ');
  const [
    horizontalOffsetValue,
    verticalOffsetValue,
    blurValue,
    spreadValue,
    colorValue,
  ] = values.split(' ');

  horizontalOffset.value = horizontalOffsetValue;
  verticalOffset.value = verticalOffsetValue;
  blur.value = blurValue;
  spread.value = spreadValue;
  color.value = colorValue;

  document.querySelector(
    "[data-content='box-shadow'] #box-shadow-h-offset-field"
  )!.innerHTML = horizontalOffsetValue + 'px';
  document.querySelector(
    "[data-content='box-shadow'] #box-shadow-v-offset-field"
  )!.innerHTML = verticalOffsetValue + 'px';
  document.querySelector(
    "[data-content='box-shadow'] #box-shadow-blur-field"
  )!.innerHTML = blurValue + 'px';
  document.querySelector(
    "[data-content='box-shadow'] #box-shadow-spread-field"
  )!.innerHTML = spreadValue + 'px';

  slideIn(preview, isSliderOpen);

  isSliderOpen = true;

  preview.style.boxShadow = values.replaceAll(' ', 'px ');
};
