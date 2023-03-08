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
  getAllFields,
  getResetButton,
  getDegreeSpanElement
} from '../lib/getElements';
import {
  copyCodeToClipboard,
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
} from '../lib/packages';

type Values = {
  degree: string;
};

const attribute = 'gradient-text';

let gradientTextInputs = getAllInputElements(attribute);

const getNewColorButtonElement = getNewColorButton(attribute);
const getRemoveColorButtonElement = getRemoveNewColorButton(attribute);

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

  if (outputElement.childElementCount >= 1) {
    outputElement.innerHTML = '';
    outputElement.appendChild(createTextElement());
  } else {
    outputElement.appendChild(createTextElement());
  }

  getPNGButtonElement.addEventListener('click', pngDownloadHandler);

  getSVGButtonElement.addEventListener('click', svgDownloadHanlder);

  getCodeButtonElement.addEventListener('click', copyHandler);
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
  const { inputs, textarea } = getAllFields(attribute);

  getResetButton(attribute).addEventListener("click", () => {
    inputs.forEach(input => {
      input.value = input.defaultValue;
    })

    textarea.value = textarea.defaultValue;

    getDegreeSpanElement(attribute).innerHTML = "deg";
    getResetButton(attribute).classList.remove("reset-show");
  })

}

// get values from all targets to get notified when values change.

function getValues() {

  const { inputs, textarea } = getAllFields(attribute);


  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (input.value !== "") {
        getResetButton(attribute).classList.add("reset-show");
        resetValues();
      }
    })
  })

  textarea.addEventListener("input", () => {
    if (textarea.value !== "") {
      resetValues()
      getResetButton(attribute).classList.add("reset-show");
    }
  })
}
getValues();