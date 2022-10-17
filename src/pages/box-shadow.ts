import * as utils from '../lib/general';

type Values = {
  hOffset: string;
  vOffset: string;
  blur: string;
  spread: string;
  color: string;
};

const attribute = 'box-shadow';

export function boxShadowGenerator(): void {
  const horizontalOffset = utils.getShadowHorizontalOffset(attribute);
  const verticalOffset = utils.getShadowVerticalOffset(attribute);
  const blur = utils.getShadowBlur(attribute);
  const spread = utils.getShadowSpread(attribute);
  const color = utils.getShadowColor(attribute);
  const getOutputElement = utils.getOutput(attribute);
  const resultPage = utils.getResultPage();

  resultPage.style.display = 'flex';

  const values: Values = {
    hOffset: horizontalOffset.value,
    vOffset: verticalOffset.value,
    blur: blur.value,
    spread: spread.value,
    color: color.value,
  };

  getBoxShadowResult(values, getOutputElement);
}

/**
 * sets the result to the output element
 *
 * @param attribute attribute name of the generator
 * @param values values entered by users
 * @param outputElement output element to display result
 */
function getBoxShadowResult(values: Values, outputElement: HTMLElement): void {
  const createBoxShadowElement = (
    boxShadowElement: HTMLElement,
    values: Values
  ) => {
    boxShadowElement.style.height = '300px';
    boxShadowElement.style.width = '300px';
    boxShadowElement.style.background = 'transparent';
    boxShadowElement.style.boxShadow = `${values.hOffset}px ${values.vOffset}px ${values.blur}px ${values.spread}px ${values.color}`;
  };
  createBoxShadowElement(outputElement, values);

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

export function addBoxShadowListener(): void {
  const horizontalOffset = utils.getShadowHorizontalOffset(attribute);
  const verticalOffset = utils.getShadowVerticalOffset(attribute);
  const blur = utils.getShadowBlur(attribute);
  const spread = utils.getShadowSpread(attribute);
  const color = utils.getShadowColor(attribute);

  const preview = utils.getShadowPreview(attribute);

  const allBoxShadowInputs = [
    horizontalOffset,
    verticalOffset,
    blur,
    spread,
    color,
  ];
  const allBoxShadowInputsFields = utils.getShadowFields(attribute, [
    'h-offset',
    'v-offset',
    'blur',
    'spread',
  ]);

  const getShadowValue = () =>
    `${horizontalOffset.value}px ${verticalOffset.value}px ${blur.value}px ${spread.value}px ${color.value}`;
  preview.style.boxShadow = getShadowValue();

  allBoxShadowInputs.forEach((input, idx) => {
    // default
    if (idx < 4) {
      allBoxShadowInputsFields[idx].textContent = `${input.value}px`;
    }
    input.addEventListener('input', () => {
      if (idx < 4) {
        allBoxShadowInputsFields[idx].textContent = `${input.value}px`;
      }
      preview.style.boxShadow = getShadowValue();
    });
  });
}
