import * as utils from '../lib/general';

type Values = {
  firstColor: string;
  secondColor: string;
  degree: string;
};

export function gradientBorderGenerator(): void {
  const attribute = 'gradient-border';
  const color1 = utils.getColorInput1(attribute);
  const color2 = utils.getColorInput2(attribute);
  const getOutputElement = utils.getOutput(attribute);
  const getRangeElement = utils.getRange(attribute);

  const values = {
    firstColor: color1.value,
    secondColor: color2.value,
    degree: getRangeElement.value,
  };
  getGradientBorderResult(attribute, values, getOutputElement);
}

function getGradientBorderResult(
  attribute: string,
  values: Values,
  outputElement: HTMLElement
): void {
  outputElement.style.border = 'solid';
  outputElement.style.borderWidth = '5px';
  outputElement.style.borderImageSlice = '1';
  outputElement.style.borderImageSource = `linear-gradient(${values.degree}deg, ${values.firstColor}, ${values.secondColor})`;

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
