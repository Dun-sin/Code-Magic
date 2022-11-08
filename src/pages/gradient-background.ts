import * as utils from '../lib/general';

type Values = {
  firstColor: string;
  secondColor: string;
  degree: string;
};

const attribute = 'gradient-background';

const gradientBackgroundInputs = utils.getAllInputElements(
  'gradient-background'
);

const backgroundPreview = utils.gradientPreview('gradient-background');
const getFirstColor = utils.getColorInput1(attribute);
const getSecondColor = utils.getColorInput2(attribute);
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
  outputElement.style.background = `linear-gradient(${values.degree}deg, ${values.firstColor}, ${values.secondColor})`;

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
}

export function gradientBackgroundGenerator(
  type: 'newResults' | 'oldResults' | null
) {
  if (type === null) return;

  const getOutputElement = utils.getOutput(attribute);

  if (getFirstColor.value == '' || getSecondColor.value == '') {
    getFirstColor.value == '' && utils.triggerEmptyAnimation(getFirstColor);
    getSecondColor.value == '' && utils.triggerEmptyAnimation(getSecondColor);
    return;
  }
  const resultPage = utils.getResultPage();

  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;

  const values: Values = {
    firstColor: getFirstColor.value,
    secondColor: getSecondColor.value,
    degree: getDegreeElement.value,
  };
  getGradientBackgroundResult(attribute, values, getOutputElement);
}

export function addGradientBackgroundListener() {
  gradientBackgroundInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      utils.createGradientPreview(
        getFirstColor,
        getSecondColor,
        getDegreeElement,
        backgroundPreview
      );
    });
  });

  utils.setGradientDegreeValue(getDegreeElement);
}
