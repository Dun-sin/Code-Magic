import {
  getOutput,
  getShadowHorizontalOffset,
  getShadowVerticalOffset,
  getShadowBlur,
  getShadowSpread,
  getShadowColor,
  getResultPage,
  getCopyCodeButton,
  getPreviewSlider,
  getShadowFields,
} from '../lib/getElements';
import {copyCodeToClipboard, showPopup, slideIn} from '../lib/packages';

type Values = {
  hOffset: string;
  vOffset: string;
  blur: string;
  spread: string;
  color: string;
};

const attribute = 'box-shadow';
let isSliderOpen = false;

function copyHandler() {
  const outputElement = getOutput(attribute);
  copyCodeToClipboard(attribute, outputElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

export function boxShadowGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const horizontalOffset = getShadowHorizontalOffset(attribute);
  const verticalOffset = getShadowVerticalOffset(attribute);
  const blur = getShadowBlur(attribute);
  const spread = getShadowSpread(attribute);
  const color = getShadowColor(attribute);
  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage();

  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;

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

  const getCodeButtonElement = getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
}

export function addBoxShadowListener(): void {
  const horizontalOffset = getShadowHorizontalOffset(attribute);
  const verticalOffset = getShadowVerticalOffset(attribute);
  const blur = getShadowBlur(attribute);
  const spread = getShadowSpread(attribute);
  const color = getShadowColor(attribute);

  const preview = getPreviewSlider(attribute);

  const allBoxShadowInputs = [
    horizontalOffset,
    verticalOffset,
    blur,
    spread,
    color,
  ];
  const allBoxShadowInputsFields = getShadowFields(attribute, [
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
      if (color.value === '') return;
      slideIn(preview, isSliderOpen);

      isSliderOpen = true;
      if (idx < 4) {
        allBoxShadowInputsFields[idx].textContent = `${input.value}px`;
      }
      preview.style.boxShadow = getShadowValue();
    });
  });
}
