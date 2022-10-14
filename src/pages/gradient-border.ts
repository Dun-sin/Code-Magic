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
  const resultPage = utils.getResultPage();

  if (color1.value == '' || color2.value == '') {
    if (color1.value == '') utils.triggerEmptyAnimation(color1);
    if (color2.value == '') utils.triggerEmptyAnimation(color2);
    return;
  }

  resultPage.style.display = 'flex';

  getCheckboxElement.addEventListener('change', (e: Event): void => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      showRadiusInput(attribute);
    } else {
      hideRadiusInput(attribute);
    }
  });

  utils.getCheckbox(attribute).addEventListener('change', () => {
    if (utils.getCheckbox(attribute).checked) {
      utils.getRadiusInput(attribute).value = getBorderRadiusInput.value;
    } else {
      utils.getRadiusInput(attribute).value = '0';
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

  utils.getCheckbox(attribute).checked = false;
  utils.hideRadius(attribute);
  utils.getRadiusInput(attribute).value = '0';

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
