import * as utils from '../lib/general';

type Values = {
  BorderTop: string;
  borderLeft: string;
  borderRight: string;
  borderBottom: string;
};

const attribute = 'border-radius';
function copyHandler() {
  const outputElement = utils.getOutput(attribute);
  utils.copyCodeToClipboard(attribute, outputElement);
  utils.showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

export function borderRadiusGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getOutputElement = utils.getOutput(attribute);
  const resultPage = utils.getResultPage();

  resultPage.style.display = 'flex';
  if (getOutputElement === null || type === 'oldResults') return;
  getOutputElement.style.display = 'grid';
  getOutputElement.style.placeItems = 'center';

  const borderTop = utils.getBorderTop(attribute);
  const borderRight = utils.getBorderRight(attribute);
  const borderLeft = utils.getBorderLeft(attribute);
  const borderBottom = utils.getBorderBottom(attribute);

  const values = {
    BorderTop: borderTop.value,
    borderLeft: borderLeft.value,
    borderRight: borderRight.value,
    borderBottom: borderBottom.value,
  };

  getBorderRadiusResult(attribute, values, getOutputElement);
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

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
}
