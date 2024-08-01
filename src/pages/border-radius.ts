import {
  closeDropdown,
  copyCSSCodeToClipboard,
  copyTailwindCodeToClipboard,
  showPopup,
} from '../lib/packages/utils';
import {deleteQueryParam, setQueryParam} from '../lib/packages/helpers';
import {
  getAllFields,
  getBorderBottom,
  getBorderLeft,
  getBorderRight,
  getBorderTop,
  getCopyCodeButton,
  getCssOrTailwindButton,
  getCssOrTailwindDropdown,
  getOutput,
  getResetButton,
  getResultPage,
  getTailwindButton,
} from '../lib/getElements';

type Values = {
  borderTop: string;
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
const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const showCopyClass = 'show-css-tailwind';

const borderRadiusPreview = document.querySelector(
  '.border-radius-preview-box > .preview'
) as HTMLElement;

function copyHandler() {
  const outputElement = getOutput(attribute);
  copyCSSCodeToClipboard(attribute, outputElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

function getCssOrTailwind(e?: MouseEvent): void {
  e?.stopPropagation();
  getCssOrTailwindDropdownElement.classList.toggle(showCopyClass);
}

// closes css and tailwind dropdown on outside click
closeDropdown(getCssOrTailwind, getCssOrTailwindDropdownElement, showCopyClass);

function getBorderRadiusResult(
  attribute: string,
  values: Values,
  outputElement: HTMLElement
): void {
  outputElement.style.width = '250px';
  outputElement.style.height = '250px';
  outputElement.style.borderRadius = `${values.borderTop}% ${
    100 - Number(values.borderTop)
  }%
  ${values.borderBottom}% ${100 - Number(values.borderBottom)}% /
  ${values.borderLeft}% ${values.borderRight}%
  ${100 - Number(values.borderRight)}% ${100 - Number(values.borderLeft)}%`;

  const getCodeButtonElement = getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  getTailwindCodeButtonElement.addEventListener('click', tailwindHandler);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);
  getCssOrTailwindButtonElement.addEventListener('click', getCssOrTailwind);
}

export function borderRadiusGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage();

  resultPage.style.display = 'flex';
  if (getOutputElement === null || type === 'oldResults') return;
  getOutputElement.style.display = 'grid';
  getOutputElement.style.placeItems = 'center';

  const values = {
    borderTop: borderTop.value,
    borderLeft: borderLeft.value,
    borderRight: borderRight.value,
    borderBottom: borderBottom.value,
  };

  getBorderRadiusResult(attribute, values, getOutputElement);
}

export function addBorderRadiusListener() {
  const setBorderRadiusPreview = (
    borderTop: HTMLInputElement,
    borderBottom: HTMLInputElement,
    borderLeft: HTMLInputElement,
    borderRight: HTMLInputElement
  ) => {
    borderRadiusPreview.style.borderRadius = `
    ${borderTop.value}% ${100 - Number(borderTop.value)}%
    ${borderBottom.value}% ${100 - Number(borderBottom.value)}% /
    ${borderLeft.value}% ${borderRight.value}%
    ${100 - Number(borderRight.value)}% ${100 - Number(borderLeft.value)}%`;
  };

  borderRadiusInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      const values = {
        borderTop: borderTop.value,
        borderLeft: borderLeft.value,
        borderRight: borderRight.value,
        borderBottom: borderBottom.value,
      };
      setBorderRadiusPreview(borderTop, borderBottom, borderLeft, borderRight);

      setQueryParam('values', JSON.stringify(values));
    });
  });
}

// reset the values of all target fields
function resetValues() {
  const {inputs} = getAllFields(attribute);

  getResetButton(attribute).addEventListener('click', () => {
    inputs.forEach((input) => {
      input.value = input.defaultValue;
    });

    borderRadiusPreview.style.borderRadius = '0';

    getResetButton(attribute).classList.remove('reset-show');
  });

  deleteQueryParam('values');
}

// get values from all targets to get notified when values change.
function getValues() {
  const {inputs} = getAllFields(attribute);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      getResetButton(attribute).classList.add('reset-show');
      resetValues();
    });
  });
}
getValues();

// Tailwind codecopy handler
function tailwindHandler() {
  const outputElement = getOutput(attribute);
  copyTailwindCodeToClipboard(attribute, outputElement);
  showPopup(
    'Tailwind Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

export const applyBorderRadiusValues = (values: Values) => {
  borderTop.value = values.borderTop;
  borderLeft.value = values.borderLeft;
  borderRight.value = values.borderRight;
  borderBottom.value = values.borderBottom;

  borderRadiusPreview.style.borderRadius = `
    ${borderTop.value}% ${100 - Number(borderTop.value)}%
    ${borderBottom.value}% ${100 - Number(borderBottom.value)}% /
    ${borderLeft.value}% ${borderRight.value}%
    ${100 - Number(borderRight.value)}% ${100 - Number(borderLeft.value)}%`;
};
