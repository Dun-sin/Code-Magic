import {
  getAllFields,
  getCopyCodeButton,
  getGridFields,
  getGridPreview,
  getNumberOfColumns,
  getNumberOfRows,
  getOutput,
  getResetButton,
  getTailwindButton,
} from '../lib/getElements';
import {
  copyCSSCodeToClipboard,
  copyTailwindCodeToClipboard,
  showPopup,
} from '../lib/packages';

const attribute = 'grid-generators';

export function gridGenerator(): void {
  const noOfColumns = getNumberOfColumns(attribute);
  const noOfRows = getNumberOfRows(attribute);

  const preview = getGridPreview(attribute);

  const allGridInputs = [noOfColumns, noOfRows];

  const allGridInputFields = getGridFields(attribute, ['rows', 'columns']);

  const getGridColValue = () => `repeat(${parseInt(noOfColumns.value)}, 1fr)`;
  const getGridRowValue = () => `repeat(${parseInt(noOfRows.value)}, 1fr)`;
  preview.style.display = 'grid';
  preview.style.gridTemplateColumns = getGridColValue();
  preview.style.gridTemplateRows = getGridRowValue();

  allGridInputs.forEach((input, index) => {
    if (index < 4) {
      allGridInputFields[index].textContent = `${input.value}px`;
    }
    input.addEventListener('input', () => {
      preview.style.display = 'grid';
      preview.style.gridTemplateColumns = getGridColValue();
      preview.style.gridTemplateRows = getGridRowValue();
      updatePreviewElement();
    });
  });

  const getCSSCodeButtonElement = getCopyCodeButton(attribute);
  getCSSCodeButtonElement.addEventListener('click', copyCSSHandler);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  getTailwindCodeButtonElement.addEventListener('click', copyTailwindHandler);
}

function copyTailwindHandler() {
  const outputElement: HTMLElement = getOutput(attribute);
  copyTailwindCodeToClipboard(attribute, outputElement);
  showPopup(
    'Tailwind Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

function copyCSSHandler() {
  const outputElement = getGridPreview(attribute);
  copyCSSCodeToClipboard(attribute, outputElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

function resetValues() {
  const {inputs} = getAllFields(attribute);

  getResetButton(attribute).addEventListener('click', () => {
    inputs.forEach((input) => {
      input.value = input.defaultValue;
    });
    updatePreviewElement();
    getResetButton(attribute).classList.remove('reset-show');
  });
}

function getValues() {
  const {inputs} = getAllFields(attribute);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      resetValues();
    });
  });
}

getValues();

function updatePreviewElement() {
  const preview = getGridPreview(attribute);
  preview.innerHTML = '';
  const noOfColumns = getNumberOfColumns(attribute).value;
  const noOfRows = getNumberOfRows(attribute).value;
  const rows = parseInt(noOfRows !== '' ? noOfRows : '0');
  const columns = parseInt(noOfColumns !== '' ? noOfColumns : '0');
  if (rows > columns) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const child = document.createElement('div');
        child.style.border = '1px solid white';
        preview.appendChild(child);
      }
    }
  } else {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const child = document.createElement('div');
        child.style.border = '1px solid white';
        preview.appendChild(child);
      }
    }
  }
}
