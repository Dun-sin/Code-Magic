import {
  closeDropdown,
  copyCSSCodeToClipboard,
  copyTailwindCodeToClipboard,
  downloadPNG,
  downloadSVG,
  showPopup,
  slideIn,
  triggerEmptyAnimation,
} from '../lib/packages/utils';
import {deleteQueryParam, setQueryParam} from '../lib/packages/helpers';
import {
  getAllFields,
  getCopyCodeButton,
  getCssOrTailwindButton,
  getCssOrTailwindDropdown,
  getInputText,
  getOpenSideBarButton,
  getOutput,
  getPNGButton,
  getPngOrSvgButton,
  getPngOrSvgDropdown,
  getPreviewSlider,
  getResetButton,
  getResultPage,
  getSVGButton,
  getShadowBlur,
  getShadowColor,
  getShadowFields,
  getShadowHorizontalOffset,
  getShadowVerticalOffset,
  getTailwindButton,
} from '../lib/getElements';

type Values = {
  hOffset: string;
  vOffset: string;
  blur: string;
  color: string;
  text: string;
};

let isSliderOpen = false;
const attribute = 'text-shadow';
const showCopyClass = 'show-css-tailwind';
const showPngOrSvgClass = 'show-png-svg';

const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const getPngOrSvgDropdownElement = getPngOrSvgDropdown(attribute);
const horizontalOffset = getShadowHorizontalOffset(attribute);
const verticalOffset = getShadowVerticalOffset(attribute);
const blur = getShadowBlur(attribute);
const color = getShadowColor(attribute);
const preview = getPreviewSlider(attribute);
const getInputElement = getInputText(attribute);

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

function getPngOrSvg(e?: MouseEvent) {
  e?.stopPropagation();
  getPngOrSvgDropdownElement.classList.toggle(showPngOrSvgClass);
}

// closes css and tailwind dropdown on outside click
closeDropdown(getCssOrTailwind, getCssOrTailwindDropdownElement, showCopyClass);

// closes png and css dropdown outside click
closeDropdown(getPngOrSvg, getPngOrSvgDropdownElement, showPngOrSvgClass);

function pngDownloadHandler() {
  const outputElement = getOutput(attribute);
  downloadPNG(attribute, outputElement);
}

function svgDownloadHanlder() {
  const outputElement = getOutput(attribute);
  downloadSVG(attribute, outputElement);
}

export function textShadowGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage();

  if (getInputElement.value.length === 0) {
    getOpenSideBarButton().style.display = 'none';
    triggerEmptyAnimation(getInputElement);
    return;
  }
  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;

  const values: Values = {
    hOffset: horizontalOffset.value,
    vOffset: verticalOffset.value,
    blur: blur.value,
    color: color.value,
    text: getInputElement.value,
  };

  getTextShadowResult(values, getOutputElement);
}

/**
 * sets the result to the output element
 *
 * @param values values entered by users
 * @param outputElement output element to display result
 */
function getTextShadowResult(values: Values, outputElement: HTMLElement): void {
  const createTextShadowElement = (
    textShadowElement: HTMLElement,
    values: Values
  ) => {
    textShadowElement.innerText = values.text;
    textShadowElement.style.textShadow = `${values.hOffset}px ${values.vOffset}px ${values.blur}px ${values.color}`;
  };
  createTextShadowElement(outputElement, values);

  const getCodeButtonElement = getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  getTailwindCodeButtonElement.addEventListener('click', tailwindHandler);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);
  getCssOrTailwindButtonElement.addEventListener('click', getCssOrTailwind);
  const getPngOrSvgButtonElement = getPngOrSvgButton(attribute);
  getPngOrSvgButtonElement.addEventListener('click', getPngOrSvg);
}

export function addTextShadowListener(): void {
  const horizontalOffset = getShadowHorizontalOffset(attribute);
  const verticalOffset = getShadowVerticalOffset(attribute);
  const blur = getShadowBlur(attribute);
  const color = getShadowColor(attribute);

  const getInputElement = getInputText(attribute);
  const getPNGButtonElement = getPNGButton(attribute);
  const getSVGButtonElement = getSVGButton(attribute);

  const allTextShadowInputs = [horizontalOffset, verticalOffset, blur, color];
  const allTextShadowInputsFields = getShadowFields(attribute, [
    'h-offset',
    'v-offset',
    'blur',
    'text',
  ]);

  const getShadowValue = () =>
    `${horizontalOffset.value}px ${verticalOffset.value}px ${blur.value}px ${color.value}`;

  preview.style.textShadow = getShadowValue();

  allTextShadowInputs.forEach((input, idx) => {
    // default
    if (idx < 3) {
      allTextShadowInputsFields[idx].textContent = `${input.value}px`;
    }

    getInputElement.addEventListener('input', () => {
      preview.innerText = getInputElement.value;
      preview.style.textShadow = getShadowValue();
    });

    input.addEventListener('input', () => {
      if (getInputElement.value === '') return;
      preview.innerText = getInputElement.value;
      slideIn(preview, isSliderOpen);

      isSliderOpen = true;

      if (idx < 3) {
        allTextShadowInputsFields[idx].textContent = `${input.value}px`;
      }

      setQueryParam('values', getShadowValue().trim().replaceAll(' ', ''));
      preview.style.textShadow = getShadowValue();
    });

    getPNGButtonElement.addEventListener('click', pngDownloadHandler);

    getSVGButtonElement.addEventListener('click', svgDownloadHanlder);
  });
}

// reset the values of all target fields

function resetValues() {
  const {inputs, textarea} = getAllFields(attribute);

  getResetButton(attribute).addEventListener('click', () => {
    inputs.forEach((input) => {
      input.value = input.defaultValue;
    });

    textarea.value = textarea.defaultValue;

    document.querySelector(
      "[data-content='text-shadow'] #text-shadow-h-offset-field"
    )!.innerHTML = '2px';
    document.querySelector(
      "[data-content='text-shadow'] #text-shadow-v-offset-field"
    )!.innerHTML = '2px';
    document.querySelector(
      "[data-content='text-shadow'] #text-shadow-blur-field"
    )!.innerHTML = '4px';

    getResetButton(attribute).classList.remove('reset-show');

    deleteQueryParam('values');
  });
}

// get values from all targets to get notified when values change.

function getValues() {
  const {inputs, textarea} = getAllFields(attribute);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value !== '' || input.value !== input.defaultValue) {
        getResetButton(attribute).classList.add('reset-show');
        resetValues();
      }
    });
  });

  textarea.addEventListener('input', () => {
    if (textarea.value !== '') {
      resetValues();
      getResetButton(attribute).classList.add('reset-show');
    }
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

export const applyTextShadowValues = (values: string) => {
  values = values.replaceAll('px', ' ');
  const [horizontalOffsetValue, verticalOffsetValue, blurValue, colorValue] =
    values.split(' ');

  const textValue = 'hello';

  getInputElement.value = textValue;
  preview.innerText = textValue;

  document.querySelector(
    "[data-content='text-shadow'] #text-shadow-h-offset-field"
  )!.innerHTML = horizontalOffsetValue + 'px';
  document.querySelector(
    "[data-content='text-shadow'] #text-shadow-v-offset-field"
  )!.innerHTML = verticalOffsetValue + 'px';
  document.querySelector(
    "[data-content='text-shadow'] #text-shadow-blur-field"
  )!.innerHTML = blurValue + 'px';

  horizontalOffset.value = horizontalOffsetValue;
  verticalOffset.value = verticalOffsetValue;
  blur.value = blurValue;
  color.value = colorValue;

  slideIn(preview, isSliderOpen);

  isSliderOpen = true;

  console.log({values});

  preview.style.textShadow = values.replaceAll(' ', 'px ');
};
