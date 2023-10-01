import {
  getNewColorButton,
  getAllInputElements,
  getRange,
  getOutput,
  getCopyCodeButton,
  getResultPage,
  getRemoveNewColorButton,
  getResetButton,
  getDegreeSpanElement,
  getGradientPreview,
  getCssOrTailwindDropdown,
  getTailwindButton,
  getCssOrTailwindButton,
  getOpenSideBarButton,
} from '../lib/getElements';
import {
  triggerEmptyAnimation,
  copyCSSCodeToClipboard,
  showPopup,
  whatColorButtonShouldShow,
  addNewColorPicker,
  removeColorPicker,
  setGradientDegreeValue,
  createGradientPreview,
  getColorsValue,
  closeDropdown,
  copyTailwindCodeToClipboard,
} from '../lib/packages/utils';

type Values = {
  degree: string;
};

const attribute = 'gradient-background';

const getNewColorButtonElement = getNewColorButton(attribute);
const getRemoveColorButtonElement = getRemoveNewColorButton(attribute);
const getResultBtn = document.getElementById('getResultBtn');
let gradientBackgroundInputs = getAllInputElements('gradient-background');

const getDegreeElement = getRange(attribute);
const resetButton = getResetButton(attribute);
const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const showCopyClass = 'show-css-tailwind';

export function gradientBackgroundGenerator(
  type: 'newResults' | 'oldResults' | null
) {
  if (type === null) return;
  // Show error when the colors are not entered.
  var element = gradientBackgroundInputs[0];
  var value = element.value;
  if (value.length < 3) {
    gradientBackgroundInputs.forEach((ele) => {
      if (getResultBtn) {
        getResultBtn.style.backgroundColor = 'grey';
      }
      getOpenSideBarButton().style.display = 'none';
      triggerEmptyAnimation(ele);
    });
    return;
  } else {
    if (getResultBtn) {
      getResultBtn.style.backgroundColor = 'blue';
    }
  }

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage();

  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;

  const values: Values = {
    degree: getDegreeElement.value,
  };
  getGradientBackgroundResult(attribute, values, getOutputElement);
}

export function addGradientBackgroundListener() {
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

/**
 * sets the result to the output element
 *
 * @param attribute attribute name of the generator
 * @param values object that contains all values entered by users
 * @param outputElement output element to display result
 */
function getGradientBackgroundResult(
  attribute: string,
  values: Values,
  outputElement: HTMLElement
): void {
  outputElement.style.background = `linear-gradient(${
    values.degree
  }deg, ${getColorsValue(attribute).join(', ')})`;

  const getCodeButtonElement = getCopyCodeButton(attribute);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);

  getCodeButtonElement.addEventListener('click', copyHandler);
  getTailwindCodeButtonElement.addEventListener('click', tailwindHandler);

  getCssOrTailwindButtonElement.addEventListener('click', getCssOrTailwind);
}

function addEventListenerToTheNewColorPicker() {
  gradientBackgroundInputs = getAllInputElements(attribute);
  inputEventListner();
  if (resetButton.classList.contains('reset-show')) return;
  resetButton.classList.add('reset-show');
}

function inputEventListner() {
  gradientBackgroundInputs.forEach((inputElement) => {
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

    gradientBackgroundInputs.forEach((input) => {
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
  gradientBackgroundInputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value === '') return;

      if (resetButton.classList.contains('reset-show')) return;
      resetButton.classList.add('reset-show');
    });
  });
}

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

closeDropdown(getCssOrTailwind, getCssOrTailwindDropdownElement, showCopyClass);

resetValues();
getValues();
