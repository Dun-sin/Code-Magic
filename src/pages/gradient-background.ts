import {
  getAllInputElements,
  getRange,
  getOutput,
  getResultPage,
  getResetButton,
  getDegreeSpanElement,
  getGradientPreview,
  getOpenSideBarButton,
} from '../lib/getElements';
import {
  triggerEmptyAnimation,
  whatColorButtonShouldShow,
  addNewColorPicker,
  removeColorPicker,
  setGradientDegreeValue,
  createGradientPreview,
  getColorsValue,
} from '../lib/packages/utils';

type Values = {
  degree: string;
};

const attribute = 'gradient-background';

const getResultBtn = document.getElementById('getResultBtn');
let gradientBackgroundInputs = getAllInputElements('gradient-background');

const getDegreeElement = getRange(attribute);
const resetButton = getResetButton(attribute);

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
  inputEventListner();

  setGradientDegreeValue(getDegreeElement);
}

export function addOrRemoveGradientBackgroundColor(action: string) {
  if (action === 'addColor') {
    addNewColorPicker(attribute);
  } else if (action === 'removeColor') {
    removeColorPicker(attribute);
  }
  addEventListenerToTheNewColorPicker();
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
export function resetGradientBackgroundValues() {
  const colorInput: HTMLInputElement[] = [...new Set([])];

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

getValues();
