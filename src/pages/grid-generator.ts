import {
  getAllFields,
  getGridFields,
  getGridPreview,
  getNumberOfColumns,
  getNumberOfRows,
  getResetButton,
  getRowGap,
  getColumnGap,
} from '../lib/getElements';
import {showPopup} from '../lib/packages/utils';

const attribute = 'grid-generators';

function areInputsValid() {
  const noOfColumns = getNumberOfColumns(attribute);
  const noOfRows = getNumberOfRows(attribute);

  const isColumnInputValid =
    noOfColumns.value.length > 0
      ? parseInt(noOfColumns.value) >= 1 && parseInt(noOfColumns.value) <= 100
      : true;
  const isRowInputValid =
    noOfRows.value.length > 0
      ? parseInt(noOfRows.value) >= 1 && parseInt(noOfRows.value) <= 100
      : true;

  if (isColumnInputValid && isRowInputValid) return true;

  showPopup(
    'Limit Exceeded',
    'The input value should be within 1 and 100.',
    'error'
  );

  return false;
}

export function gridGenerator(): void {
  const noOfColumns = getNumberOfColumns(attribute);
  const noOfRows = getNumberOfRows(attribute);
  const rowGapValue = getRowGap(attribute);
  const columnGapValue = getColumnGap(attribute);
  const preview = getGridPreview(attribute);

  const allGridInputs = [noOfColumns, noOfRows, rowGapValue, columnGapValue];

  const allGridInputFields = getGridFields(attribute, [
    'rows',
    'columns',
    'row-gaps',
    'column-gaps',
  ]);

  const getGridColValue = () => `repeat(${parseInt(noOfColumns.value)}, 1fr)`;
  const getGridRowValue = () => `repeat(${parseInt(noOfRows.value)}, 1fr)`;
  const getGridColGapValue = () => `${parseInt(columnGapValue.value)}px`;
  const getGridRowGapValue = () => `${parseInt(rowGapValue.value)}px`;

  allGridInputs.forEach((input, index) => {
    if (index < 4) {
      allGridInputFields[index].textContent = `${input.value}px`;
    }

    input.addEventListener('input', () => {
      if (areInputsValid() === false) return;
      preview.style.display = 'grid';
      preview.style.gridTemplateColumns = getGridColValue();
      preview.style.gridTemplateRows = getGridRowValue();
      preview.style.rowGap = getGridRowGapValue();
      preview.style.columnGap = getGridColGapValue();
      updatePreviewElement();
    });
  });
}

export function doGridInputExist() {
  const noOfColumns = getNumberOfColumns(attribute);
  const noOfRows = getNumberOfRows(attribute);

  if (!noOfColumns.value || !noOfRows.value) {
    showPopup("Couldn't Copy Code", 'Some input value may be missing', 'error');
    return false;
  }

  return true;
}

export function resetGridGeneratorValues() {
  const {inputs} = getAllFields(attribute);
  const preview = getGridPreview(attribute);

  inputs.forEach((input) => {
    input.value = input.defaultValue;
  });
  updatePreviewElement();
  preview.setAttribute('style', '');
  getResetButton(attribute).classList.remove('reset-show');
}

function getValues() {
  const {inputs} = getAllFields(attribute);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      getResetButton(attribute).classList.add('reset-show');
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
