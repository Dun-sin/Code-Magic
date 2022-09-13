import * as utils from '../general';

type Values = {
  firstColor: string;
  secondColor: string;
  degree: string;
};

export function gradientBorderGenerator(): void {
  const attribute = 'gradient-border';
  const color1 = utils.getColorInput1(attribute);
  const color2 = utils.getColorInput2(attribute);
  const getResultButtonElement = utils.getResultButton(attribute);
  const getOutputElement = utils.getOutput(attribute);
  const getRangeElement = utils.getRange(attribute);
  const getCheckboxElement = utils.getCheckbox(attribute);
  const activateRadius = utils.activeRadius;
  const deactivateRadius = utils.InactiveRadius;

  getResultButtonElement.addEventListener('click', () => {
    onClickButton();
  });

  getCheckboxElement.addEventListener('change', (e: Event): void => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      activateRadius(attribute);
    } else {
      deactivateRadius(attribute);
    }
  });

  document?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      onClickButton();
    }
  });

  function onClickButton() {
    const values: Values = {
      firstColor: color1.value,
      secondColor: color2.value,
      degree: getRangeElement.value,
    };
    getGradientBorderResult(attribute, values, getOutputElement);
  }
}

function getGradientBorderResult(
  attribute: string,
  values: Values,
  outputElement: HTMLElement
): void {
  outputElement.style.setProperty(`--${attribute}-color-1`, `${values.firstColor}`);
  outputElement.style.setProperty(`--${attribute}-color-2`, `${values.secondColor}`);
  outputElement.style.setProperty(`--${attribute}-degree`, `${values.degree}deg`);
  outputElement.style.visibility = 'visible';
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
