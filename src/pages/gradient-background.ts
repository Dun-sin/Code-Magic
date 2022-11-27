import * as utils from '../lib/general';

type Values = {
  degree: string;
};

const attribute = 'gradient-background';

const getNewColorButton = utils.getNewColorButton(attribute);
const getRemoveColorButton = utils.removeNewColorButton(attribute);

let gradientBackgroundInputs = utils.getAllInputElements('gradient-background');

const getDegreeElement = utils.getRange(attribute);

function copyHandler() {
  const outputElement = utils.getOutput(attribute);
  utils.copyCodeToClipboard(attribute, outputElement);
  utils.showPopup(
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
  outputElement.style.background = `linear-gradient(${values.degree}deg, ${utils
    .getColorsValue(attribute)
    .join(', ')})`;

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
}

export function gradientBackgroundGenerator(
  type: 'newResults' | 'oldResults' | null
) {
  if (type === null) return;

  const getOutputElement = utils.getOutput(attribute);
  const resultPage = utils.getResultPage();

  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;

  const values: Values = {
    degree: getDegreeElement.value,
  };
  getGradientBackgroundResult(attribute, values, getOutputElement);
}

export function addGradientBackgroundListener() {
  utils.whatColorButtonShouldShow(attribute);
  getNewColorButton.addEventListener('click', () => {
    utils.addNewColorPicker(attribute);
    addEventListenerToTheNewColorPicker();
  });

  getRemoveColorButton.addEventListener('click', () => {
    utils.removeColorPicker(attribute);
    addEventListenerToTheNewColorPicker();
  });

  inputEventListner();

  utils.setGradientDegreeValue(getDegreeElement);
}

function addEventListenerToTheNewColorPicker() {
  gradientBackgroundInputs = utils.getAllInputElements(attribute);
  inputEventListner();
}

function inputEventListner() {
  gradientBackgroundInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      utils.createGradientPreview(getDegreeElement, attribute);
    });
  });
}
