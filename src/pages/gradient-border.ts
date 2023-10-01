import {
  getNewColorButton,
  getRemoveNewColorButton,
  getRadiusInput,
  getCheckbox,
  getOutput,
  getRange,
  getAllInputElements,
  getResultPage,
  getCopyCodeButton,
  getResetButton,
  getDegreeSpanElement,
  getGradientPreview,
  getTailwindButton,
  getCssOrTailwindButton,
  getCssOrTailwindDropdown,
  getResultButton,
} from '../lib/getElements';
import {
  triggerEmptyAnimation,
  copyCSSCodeToClipboard,
  showPopup,
  addRule,
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
  radius: string;
};

const attribute = 'gradient-border';

const getNewColorButtonElement = getNewColorButton(attribute);
const getRemoveColorButtonElement = getRemoveNewColorButton(attribute);

const getBorderRadiusInput = getRadiusInput(attribute);
const toggleRadiusInputForGradientBorder = getCheckbox(attribute);

const getDegreeElement = getRange(attribute);
const resetButton = getResetButton(attribute);
const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const showCopyClass = 'show-css-tailwind';

let gradientBorderInputs = getAllInputElements('gradient-border');

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

/**
 * sets the result to the output element
 *
 * @param attribute attribute name of the generator
 * @param values values entered by users
 * @param outputElement output element to display result
 */
function getGradientBorderResult(
  attribute: string,
  values: Values,
  outputElement: HTMLElement
): void {
  addRule('.gradient-border::before', {
    background: `linear-gradient(${values.degree}deg, ${getColorsValue(
      attribute
    ).join(', ')})`,
    'background-clip': 'border-box',
    'border-radius': `${values.radius}px`,
  });

  outputElement.style.backgroundColor = 'transparent';
  outputElement.style.visibility = 'visible';

  const getCodeButtonElement = getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  getTailwindCodeButtonElement.addEventListener('click', tailwindHandler);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);
  getCssOrTailwindButtonElement.addEventListener('click', getCssOrTailwind);
}

export function gradientBorderGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const resultBtn = getResultButton(attribute);

  const item1 = gradientBorderInputs[0];
  const val1 = item1.value.length;

  const item2 = gradientBorderInputs[1];
  const val2 = item2.value.length;

  //Show error if input values are empty
  if ((resultBtn && val1 < 1) || val2 < 1) {
    gradientBorderInputs.forEach((e) => {
      if (e.value.length === 0) {
        triggerEmptyAnimation(e);
      }
      resultBtn.style.backgroundColor = 'grey';
    });
    return;
  } else {
    if (resultBtn) {
      resultBtn.style.backgroundColor = 'blue';
    }
  }

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage();

  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;

  if (!toggleRadiusInputForGradientBorder.checked) {
    getBorderRadiusInput.value = '0';
  }

  const values: Values = {
    degree: getDegreeElement.value,
    radius: getBorderRadiusInput.value,
  };
  getGradientBorderResult(attribute, values, getOutputElement);
}

export function addGradientBorderListener() {
  whatColorButtonShouldShow(attribute);
  toggleRadiusInputForGradientBorder.addEventListener('input', function () {
    getBorderRadiusInput.style.display = this.checked ? 'inline' : 'none';
  });

  getNewColorButtonElement.addEventListener('click', () => {
    addNewColorPicker(attribute);
    addEventListenerToTheNewColorPicker();
  });

  getRemoveColorButtonElement.addEventListener('click', () => {
    removeColorPicker(attribute);
    addEventListenerToTheNewColorPicker();
  });

  addEventListenerToTheNewColorPicker();

  setGradientDegreeValue(getDegreeElement);
}

function addEventListenerToTheNewColorPicker() {
  gradientBorderInputs = getAllInputElements(attribute);
  inputEventListner();
  if (resetButton.classList.contains('reset-show')) return;
  resetButton.classList.add('reset-show');
}

function inputEventListner() {
  //set gradient border preview
  gradientBorderInputs.forEach((input) => {
    input.addEventListener('input', () => {
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

    gradientBorderInputs.forEach((input) => {
      input.checked = false;
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
  gradientBorderInputs.forEach((input) => {
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
  copyTailwindCodeToClipboard(attribute);
  showPopup(
    'Tailwind Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}
