import {
  getBorderTop,
  getBorderRight,
  getBorderLeft,
  getBorderBottom,
  getOutput,
  getCopyCodeButton,
  getResultPage,
} from '../lib/getElements';
import {copyCodeToClipboard, showPopup} from '../lib/packages';

type Values = {
  BorderTop: string;
  borderLeft: string;
  borderRight: string;
  borderBottom: string;
};

const attribute = 'border-radius';

const borderRadiusInputs = document.querySelectorAll('.border-radius-inputs');
const borderTop = getBorderTop(attribute);
const borderRight = getBorderRight(attribute);
const borderLeft = getBorderLeft(attribute);
const borderBottom = getBorderBottom(attribute);

const borderRadiusPreview = document.querySelector(
  '.border-radius-preview-box > .preview'
) as HTMLElement;

function copyHandler() {
  const outputElement = getOutput(attribute);
  copyCodeToClipboard(attribute, outputElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

function getBorderRadiusResult(
  attribute: string,
  values: Values,
  outputElement: HTMLElement
): void {
  outputElement.style.width = '250px';
  outputElement.style.height = '250px';
  outputElement.style.borderRadius = `${values.BorderTop}% ${
    100 - Number(values.BorderTop)
  }%
  ${values.borderBottom}% ${100 - Number(values.borderBottom)}% /
  ${values.borderLeft}% ${values.borderRight}%
  ${100 - Number(values.borderRight)}% ${100 - Number(values.borderLeft)}%`;

  const getCodeButtonElement = getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
}

export function borderRadiusGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage(); //page to hold result

  resultPage.style.display = 'flex';
  if (getOutputElement === null || type === 'oldResults') return;
  getOutputElement.style.display = 'grid';
  getOutputElement.style.placeItems = 'center';

  const values = {
    BorderTop: borderTop.value,
    borderLeft: borderLeft.value,
    borderRight: borderRight.value,
    borderBottom: borderBottom.value,
  };

  getBorderRadiusResult(attribute, values, getOutputElement);
}

export function addBorderRadiusListener() {
  const borderRadiusGenerator = (
    borderTop: HTMLInputElement,
    borderLeft: HTMLInputElement,
    borderBottom: HTMLInputElement,
    borderRight: HTMLInputElement,
    borderRadiusPreview: HTMLElement
  ) => {
    borderRadiusPreview.style.borderRadius = `
    ${borderTop.value}% ${100 - Number(borderTop.value)}%
    ${borderBottom.value}% ${100 - Number(borderBottom.value)}% /
    ${borderLeft.value}% ${borderRight.value}%
    ${100 - Number(borderRight.value)}% ${100 - Number(borderLeft.value)}%`;
  };

  borderRadiusInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>
      borderRadiusGenerator(
        borderTop,
        borderLeft,
        borderBottom,
        borderRight,
        borderRadiusPreview
      )
    );
  });
}
