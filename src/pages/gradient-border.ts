import * as utils from '../lib/general';

type Values = {
  degree: string;
  radius: string;
};

const attribute = 'gradient-border';

const getNewColorButton = utils.getNewColorButton(attribute);
const getRemoveColorButton = utils.removeNewColorButton(attribute);

const getBorderRadiusInput = utils.getRadiusInput(attribute);
const toggleRadiusInputForGradientBorder = utils.getCheckbox(attribute);
const getOutputElement = utils.getOutput(attribute);

const getDegreeElement = utils.getRange(attribute);

let gradientBorderInputs = utils.getAllInputElements('gradient-border');

const resultPage = utils.getResultPage();

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
 * @param values values entered by users
 * @param outputElement output element to display result
 */
function getGradientBorderResult(
  attribute: string,
  values: Values,
  outputElement: HTMLElement
): void {
  utils.addRule('.gradient-border::before', {
    background: `linear-gradient(${values.degree}deg, ${utils
      .getColorsValue(attribute)
      .join(', ')})`,
    'background-clip': 'border-box',
    'border-radius': `${values.radius}px`,
  });

  outputElement.style.backgroundColor = 'transparent';
  outputElement.style.visibility = 'visible';

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
}

export function gradientBorderGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;
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
  utils.whatColorButtonShouldShow(attribute);
  toggleRadiusInputForGradientBorder.addEventListener('input', function () {
    getBorderRadiusInput.style.display = this.checked ? 'inline' : 'none';
  });

  getNewColorButton.addEventListener('click', () => {
    utils.addNewColorPicker(attribute);
    addEventListenerToTheNewColorPicker();
  });

  getRemoveColorButton.addEventListener('click', () => {
    utils.removeColorPicker(attribute);
    addEventListenerToTheNewColorPicker();
  });

  addEventListenerToTheNewColorPicker();

  utils.setGradientDegreeValue(getDegreeElement);
}

function addEventListenerToTheNewColorPicker() {
  gradientBorderInputs = utils.getAllInputElements(attribute);
  inputEventListner();
}

function inputEventListner() {
  //set gradient border preview
  gradientBorderInputs.forEach((input) => {
    input.addEventListener('input', () => {
      utils.createGradientPreview(getDegreeElement, attribute);
    });
  });
}
