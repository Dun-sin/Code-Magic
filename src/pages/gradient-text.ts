import {
  getAllInputElements,
  getCopyCodeButton,
  getInputText,
  getNewColorButton,
  getOutput,
  getPNGButton,
  getRange,
  getRemoveNewColorButton,
  getResultPage,
  getSVGButton,
  getResetButton,
  getDegreeSpanElement,
  getGradientPreview,
  getTailwindButton,
  getCssOrTailwindButton,
  getCssOrTailwindDropdown,
  getPngOrSvgButton,
  getPngOrSvgDropdown,
  getOpenSideBarButton,
} from '../lib/getElements';
import {
  copyCSSCodeToClipboard,
  showPopup,
  downloadPNG,
  downloadSVG,
  triggerEmptyAnimation,
  whatColorButtonShouldShow,
  addNewColorPicker,
  removeColorPicker,
  setGradientDegreeValue,
  createGradientPreview,
  getColorsValue,
  copyTailwindCodeToClipboard,
  closeDropdown,
} from '../lib/packages/utils';

type Values = {
  degree: string;
};

const attribute = 'gradient-text';

let gradientTextInputs = getAllInputElements(attribute);

const getNewColorButtonElement = getNewColorButton(attribute);
const getRemoveColorButtonElement = getRemoveNewColorButton(attribute);

const getDegreeElement = getRange(attribute);
const resetButton = getResetButton(attribute);
const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const getPngOrSvgDropdownElement = getPngOrSvgDropdown(attribute);
const showCopyClass = 'show-css-tailwind';
const showPngOrSvgClass = 'show-png-svg';

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

export function gradientTextGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getInputElement = getInputText(attribute);

  if (getInputElement.value.length === 0) {
    getOpenSideBarButton().style.display = 'none';
    triggerEmptyAnimation(getInputElement);
    return;
  }

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage();

  resultPage.style.display = 'flex';
  if (getOutputElement === null || type === 'oldResults') return;
  getOutputElement.style.display = 'grid';
  getOutputElement.style.placeItems = 'center';

  const values = {
    degree: getDegreeElement.value,
  };

  getGradientTextResult(
    attribute,
    getInputElement.value,
    values,
    getOutputElement
  );
}

/**
 * creates the text, adds styling and shows the new text
 *
 * @param text Text to add the gradient
 * @param outputElement  Elements that shows the result
 * @param values object of all values inputted by user
 * @param outputElement Output element for displaying the result
 */
function getGradientTextResult(
  attribute: string,
  text: string,
  values: Values,
  outputElement: HTMLElement
): void {
  const createTextElement = () => {
    const wordElement = document.createElement('p');
    wordElement.innerText = text;
    wordElement.style.fontSize = '2rem';
    wordElement.style.background = `linear-gradient(${
      values.degree
    }deg, ${getColorsValue(attribute).join(', ')})`;
    wordElement.style.backgroundClip = 'text';
    wordElement.style.webkitBackgroundClip = 'text';
    wordElement.style.webkitTextFillColor = 'transparent';

    return wordElement;
  };

  const getCodeButtonElement = getCopyCodeButton(attribute);
  const getPNGButtonElement = getPNGButton(attribute);
  const getSVGButtonElement = getSVGButton(attribute);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);
  const getPngOrSvgButtonElement = getPngOrSvgButton(attribute);

  if (outputElement.childElementCount >= 1) {
    outputElement.innerHTML = '';
    outputElement.appendChild(createTextElement());
  } else {
    outputElement.appendChild(createTextElement());
  }

  getPNGButtonElement.addEventListener('click', pngDownloadHandler);

  getSVGButtonElement.addEventListener('click', svgDownloadHanlder);

  getCodeButtonElement.addEventListener('click', copyHandler);

  getTailwindCodeButtonElement.addEventListener('click', tailwindHandler);

  getCssOrTailwindButtonElement.addEventListener('click', getCssOrTailwind);

  getPngOrSvgButtonElement.addEventListener('click', getPngOrSvg);
}

export function addGradientTextListener() {
  whatColorButtonShouldShow(attribute);

  getNewColorButtonElement.addEventListener('click', () => {
    addNewColorPicker(attribute);
    addEventListenerToTheNewColorPicker();
  });

  getRemoveColorButtonElement.addEventListener('click', () => {
    removeColorPicker(attribute);
    addEventListenerToTheNewColorPicker();
  });

  inputEventListner();

  setGradientDegreeValue(getDegreeElement);
}

function addEventListenerToTheNewColorPicker() {
  gradientTextInputs = getAllInputElements(attribute);
  inputEventListner();
  if (resetButton.classList.contains('reset-show')) return;
  resetButton.classList.add('reset-show');
}

function inputEventListner() {
  gradientTextInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      createGradientPreview(getDegreeElement, attribute);
    });
  });
}

// reset the values of all target fields
function resetValues() {
  const colorInput: HTMLInputElement[] = [...new Set([])];

  resetButton.addEventListener('click', () => {
    resetButton.classList.remove('reset-show');
    getDegreeSpanElement(attribute).innerHTML = 'deg';

    getGradientPreview(attribute).style.background = '';

    gradientTextInputs.forEach((input) => {
      input.value = input.defaultValue;

      if (input.id.includes('color')) {
        colorInput.push(input);
      }
    });

    if (colorInput.length > 2) {
      for (let i = 2; i < colorInput.length; i++) {
        removeColorPicker(attribute);
      }
    }
  });
}

// get values from all targets to get notified when values change.

function getValues() {
  gradientTextInputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.nodeName === 'TEXTAREA') {
        if (input.value === '') return;
      }

      if (resetButton.classList.contains('reset-show')) return;
      resetButton.classList.add('reset-show');
    });
  });
}
resetValues();
getValues();

// Tailwind codecopy handler
function tailwindHandler() {
  const outputElement = getOutput(attribute);
  copyTailwindCodeToClipboard(attribute, outputElement);
  showPopup(
    'Tailwind Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}
