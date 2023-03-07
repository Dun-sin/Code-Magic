import {
  getNewColorButton,
  getAllInputElements,
  getRange,
  getOutput,
  getCopyCodeButton,
  getResultPage,
  getRemoveNewColorButton,
  getAllFields
} from '../lib/getElements';
import {
  copyCodeToClipboard,
  showPopup,
  whatColorButtonShouldShow,
  addNewColorPicker,
  removeColorPicker,
  setGradientDegreeValue,
  createGradientPreview,
  getColorsValue,
} from '../lib/packages';

type Values = {
  degree: string;
};

const attribute = 'gradient-background';

const getNewColorButtonElement = getNewColorButton(attribute);
const getRemoveColorButtonElement = getRemoveNewColorButton(attribute);

let gradientBackgroundInputs = getAllInputElements('gradient-background');

const getDegreeElement = getRange(attribute);

function copyHandler() {
  const outputElement = getOutput(attribute);
  copyCodeToClipboard(attribute, outputElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
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
  getCodeButtonElement.addEventListener('click', copyHandler);
}

export function gradientBackgroundGenerator(
  type: 'newResults' | 'oldResults' | null
) {
  if (type === null) return;

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

function addEventListenerToTheNewColorPicker() {
  gradientBackgroundInputs = getAllInputElements(attribute);
  inputEventListner();
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
  const { inputs } = getAllFields(attribute);
  const resetBtn = document.querySelector("[data-reset='gradient-background']") as HTMLButtonElement;

  resetBtn.addEventListener("click", () => {

    inputs.forEach(input => {
      input.value = input.defaultValue;
    });

  

    (document.querySelector("[data-content='gradient-background'] .unit-display") as HTMLSpanElement).innerHTML = "deg";
    resetBtn.classList.remove("reset-show");
  })

}

// get values from all targets to get notified when values change.

function getValues() {

  const resetBtn = document.querySelector("[data-reset='gradient-background']") as HTMLButtonElement;

  const { inputs }  = getAllFields(attribute);


  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (input.value !== "") {
        resetBtn.classList.add("reset-show");
        resetValues();
      }
    })
  })
}
getValues();