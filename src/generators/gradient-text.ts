import * as utils from '../general';

type Values = {
  firstColor: string;
  secondColor: string;
  degree: string;
};

/**
 * @function gradientTextGenerator
 * @summary handles functionality of the gradient text generator
 * @return {void} Nothing
 */
export function gradientTextGenerator(): void {
  const attribute = 'gradient-text';
  const getInputElement = utils.getInputText(attribute);
  const getOutputElement = utils.getOutput(attribute);
  getOutputElement.style.display = 'grid';
  getOutputElement.style.height = 'fit-content';
  getOutputElement.style.placeItems = 'center';

  const getTextButtonElement = utils.getResultButton(attribute);
  const getFirstColor = utils.getColorInput1(attribute);
  const getSecondColor = utils.getColorInput2(attribute);
  const getRangeElement = utils.getRange(attribute);

  getTextButtonElement?.addEventListener('click', () => {
    onClickButton();
  });

  document?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      onClickButton();
    }
  });

  function onClickButton() {
    if (getInputElement.value.length === 0) {
      utils.triggerEmptyAnimation(getInputElement);
      return;
    }

    const values = {
      firstColor: getFirstColor.value,
      secondColor: getSecondColor.value,
      degree: getRangeElement.value,
    };

    getGradientTextResult(
      attribute,
      getInputElement.value,
      values,
      getOutputElement
    );
    // getInputElement.value = '';
  }
}

/**
 * @function getGradientTextResult
 * @summary creates the text, adds styling and shows the new text
 * @param {string} text - Text to add the gradient
 * @param {HTMLElement} outputElement - Elements that shows the result
 * @return {void} nothing
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
    outputElement.appendChild(wordElement);
  };

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  const getPNGButtonElement = utils.getPNGButton(attribute);
  const getSVGButtonElement = utils.getSVGButton(attribute);

  if (outputElement.childElementCount >= 1) {
    outputElement.innerHTML = '';
    createTextElement();
  } else {
    createTextElement();
  }

  getPNGButtonElement.addEventListener('click', () => {
    utils.downloadPNG(attribute, outputElement);
  });

  getSVGButtonElement.addEventListener('click', () => {
    utils.downloadSVG(attribute, outputElement);
  });

  getCodeButtonElement.addEventListener('click', () => {
    utils.copyCodeToClipboard(attribute, outputElement);
    utils.showPopup(
      'Code Copied',
      'Code has been successfully copied to clipboard',
      'success'
    );
  });
}
