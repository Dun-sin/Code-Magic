import * as utils from '../lib/general';

type Values = {
  firstColor: string;
  secondColor: string;
  degree: string;
  radius: string;
};

const attribute = 'gradient-border';
const getBorderRadiusInput = utils.getRadiusInput(attribute);
const toggleRadiusInputForGradientBorder = utils.getCheckbox(attribute);
const getOutputElement = utils.getOutput(attribute);

const color1 = utils.getColorInput1(attribute);
const color2 = utils.getColorInput2(attribute);
const getDegreeElement = utils.getRange(attribute);

const gradientBorderInputs = utils.getAllInputElements('gradient-border');
const borderPreview = utils.gradientPreview('gradient-border');

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
  outputElement.style.setProperty(
    `--${attribute}-color-1`,
    `${values.firstColor}`
  );
  outputElement.style.setProperty(
    `--${attribute}-color-2`,
    `${values.secondColor}`
  );
  outputElement.style.setProperty(
    `--${attribute}-degree`,
    `${values.degree}deg`
  );

  outputElement.style.setProperty(
    `--${attribute}-radius`,
    `${values.radius}px`
  );

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

  if (color1.value == '' || color2.value == '') {
    if (color1.value == '') utils.triggerEmptyAnimation(color1);
    if (color2.value == '') utils.triggerEmptyAnimation(color2);
    return;
  }

  if (toggleRadiusInputForGradientBorder.checked) {
    getBorderRadiusInput.value = getBorderRadiusInput.value;
  } else {
    getBorderRadiusInput.value = '0';
  }

  const values: Values = {
    firstColor: color1.value,
    secondColor: color2.value,
    degree: getDegreeElement.value,
    radius: getBorderRadiusInput.value,
  };
  getGradientBorderResult(attribute, values, getOutputElement);
}

export function addGradientBorderListener() {
  toggleRadiusInputForGradientBorder.addEventListener('input', function () {
    getBorderRadiusInput.style.display = this.checked ? 'inline' : 'none';
  });

  //set gradient border preview
  gradientBorderInputs.forEach((input) => {
    input.addEventListener('input', () => {
      utils.createGradientPreview(
        color1,
        color2,
        getDegreeElement,
        borderPreview
      );
    });
  });

  utils.setGradientDegreeValue(getDegreeElement);
}
