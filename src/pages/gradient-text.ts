import {
  getAllInputElements,
  getInputText,
  getOutput,
  getRange,
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

const attribute = 'gradient-text';

let gradientTextInputs = getAllInputElements(attribute);

const getDegreeElement = getRange(attribute);
const resetButton = getResetButton(attribute);

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

  if (outputElement.childElementCount >= 1) {
    outputElement.innerHTML = '';
    outputElement.appendChild(createTextElement());
  } else {
    outputElement.appendChild(createTextElement());
  }
}

export function addGradientTextListener() {
  whatColorButtonShouldShow(attribute);
  inputEventListner();

  setGradientDegreeValue(getDegreeElement);
}

export function addOrRemoveGradientText(action: string) {
  if (action === 'addColor') {
    addNewColorPicker(attribute);
  } else if (action === 'removeColor') {
    removeColorPicker(attribute);
  }
  addEventListenerToTheNewColorPicker();
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
export function resetGradientTextValues() {
  const colorInput: HTMLInputElement[] = [...new Set([])];

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
getValues();
