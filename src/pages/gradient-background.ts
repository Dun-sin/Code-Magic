import * as utils from '../lib/general';

type Values = {
  firstColor: string;
  secondColor: string;
  degree: string;
};

export function gradientBackgroundGenerator() {
  const attribute = 'gradient-background';
  // Inputs
  const color1 = utils.getColorInput1(attribute);
  const color2 = utils.getColorInput2(attribute);
  const getDegreeElement = utils.getRange(attribute);

  const getOutputElement = utils.getOutput(attribute);

  const values: Values = {
    firstColor: color1.value,
    secondColor: color2.value,
    degree: getDegreeElement.value,
  };
  getGradientBackgroundResult(attribute, values, getOutputElement);
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
  outputElement.style.background = `linear-gradient(${values.degree}deg, ${values.firstColor}, ${values.secondColor})`;

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', () => {
    utils.copyCodeToClipboard(attribute, outputElement);
    utils.showPopup(
      'Code Copied',
      'Code has been successfully copied to clipboard',
      'success'
    );
  });
}
