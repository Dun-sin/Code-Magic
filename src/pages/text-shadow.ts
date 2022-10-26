import * as utils from '../lib/general';

type Values = {
  hOffset: string;
  vOffset: string;
  blur: string;
  color: string;
  text: string;
};

const attribute = 'text-shadow';

export function textShadowGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getInputElement = utils.getInputText(attribute);

  const horizontalOffset = utils.getShadowHorizontalOffset(attribute);
  const verticalOffset = utils.getShadowVerticalOffset(attribute);
  const blur = utils.getShadowBlur(attribute);
  const color = utils.getShadowColor(attribute);
  const getOutputElement = utils.getOutput(attribute);
  const resultPage = utils.getResultPage();

  if (getInputElement.value.length === 0) {
    utils.triggerEmptyAnimation(getInputElement);
    return;
  }
  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;

  const values: Values = {
    hOffset: horizontalOffset.value,
    vOffset: verticalOffset.value,
    blur: blur.value,
    color: color.value,
    text: getInputElement.value,
  };

  getTextShadowResult(values, getOutputElement);
}

/**
 * sets the result to the output element
 *
 * @param values values entered by users
 * @param outputElement output element to display result
 */
function getTextShadowResult(values: Values, outputElement: HTMLElement): void {
  const createTextShadowElement = (
    textShadowElement: HTMLElement,
    values: Values
  ) => {
    textShadowElement.innerText = values.text;
    textShadowElement.style.textShadow = `${values.hOffset}px ${values.vOffset}px ${values.blur}px ${values.color}`;
  };
  createTextShadowElement(outputElement, values);

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

export function addTextShadowListener(): void {
  const horizontalOffset = utils.getShadowHorizontalOffset(attribute);
  const verticalOffset = utils.getShadowVerticalOffset(attribute);
  const blur = utils.getShadowBlur(attribute);
  const color = utils.getShadowColor(attribute);

  const allTextShadowInputs = [horizontalOffset, verticalOffset, blur, color];
  const allTextShadowInputsFields = utils.getShadowFields(attribute, [
    'h-offset',
    'v-offset',
    'blur',
  ]);

  allTextShadowInputs.forEach((input, idx) => {
    // default
    if (idx < 3) {
      allTextShadowInputsFields[idx].textContent = `${input.value}px`;
    }
    input.addEventListener('input', () => {
      if (idx < 3) {
        allTextShadowInputsFields[idx].textContent = `${input.value}px`;
      }
    });
  });
}
