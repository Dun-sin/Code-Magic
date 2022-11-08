import * as utils from '../lib/general';

type Values = {
  firstColor: string;
  secondColor: string;
  degree: string;
};

const attribute = 'gradient-text';

const gradientTextInputs = utils.getAllInputElements(attribute);
const textPreview = utils.gradientPreview(attribute);
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

function pngDownloadHandler() {
  const outputElement = utils.getOutput(attribute);
  utils.downloadPNG(attribute, outputElement);
}

function svgDownloadHanlder() {
  const outputElement = utils.getOutput(attribute);
  utils.downloadSVG(attribute, outputElement);
}

export function gradientTextGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getInputElement = utils.getInputText(attribute);

  if (getInputElement.value.length === 0) {
    utils.triggerEmptyAnimation(getInputElement);
    return;
  }

  const getOutputElement = utils.getOutput(attribute);
  const resultPage = utils.getResultPage();

  resultPage.style.display = 'flex';
  if (getOutputElement === null || type === 'oldResults') return;
  getOutputElement.style.display = 'grid';
  getOutputElement.style.placeItems = 'center';

  const values = {
    firstColor: getFirstColor.value,
    secondColor: getSecondColor.value,
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
    wordElement.style.background = `linear-gradient(${values.degree}deg, ${values.firstColor}, ${values.secondColor})`;
    wordElement.style.backgroundClip = 'text';
    wordElement.style.webkitBackgroundClip = 'text';
    wordElement.style.webkitTextFillColor = 'transparent';

    return wordElement;
  };

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  const getPNGButtonElement = utils.getPNGButton(attribute);
  const getSVGButtonElement = utils.getSVGButton(attribute);

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
  gradientTextInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>
      utils.createGradientPreview(
        getFirstColor,
        getSecondColor,
        getDegreeElement,
        textPreview
      )
    );
  });

  utils.setGradientDegreeValue(getDegreeElement);
}
