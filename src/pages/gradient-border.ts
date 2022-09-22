import * as utils from '../lib/general';

type Values = {
  firstColor: string;
  secondColor: string;
  degree: string;
  radius: string;
};

export function gradientBorderGenerator(): void {
  const attribute = 'gradient-border';
  const color1 = utils.getColorInput1(attribute);
  const color2 = utils.getColorInput2(attribute);
  const getOutputElement = utils.getOutput(attribute);
  const getRangeElement = utils.getRange(attribute);
  const getCheckboxElement = utils.getCheckbox(attribute);
  const getBorderRadiusInput = utils.getRadiusInput(attribute);
  const showRadiusInput = utils.showRadius;
  const hideRadiusInput = utils.hideRadius;

  getCheckboxElement.addEventListener('change', (e: Event): void => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      showRadiusInput(attribute);
    } else {
      hideRadiusInput(attribute);
    }
  });

  const values: Values = {
    firstColor: color1.value,
    secondColor: color2.value,
    degree: getRangeElement.value,
    radius: getBorderRadiusInput.value,
  };
  getGradientBorderResult(attribute, values, getOutputElement);
}

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
  utils.getCheckbox(attribute).checked = false;

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
