import copy from 'copy-to-clipboard';
import {
  getCopyCodeButton,
  getOutput,
  getPreviewSlider,
  getRadioButtonSet,
  getRange,
  getResultPage,
} from '../lib/getElements';
import {showPopup, slideIn} from '../lib/packages';

type Values = {
  type: string;
  degree: string;
};

const attribute = 'transform';

const transformExports = {
  scale: 0,
  skew: '',
  rotate: '',
  translateX: '',
  translateY: '',
};

let css = '';
let isSliderOpen = false;

const preview = getPreviewSlider(attribute);
const getDegreeElement = getRange(attribute);
const getRadioButtonSetElement = getRadioButtonSet(attribute);

export function addTransformListener(): void {
  // Listen for radio button changes
  getRadioButtonSetElement.forEach((option) => {
    option.addEventListener('change', () => {
      // resets input element value when radio button changes
      getDegreeElement.valueAsNumber = 1;

      // Update preview with default value for selected option
      updatePreviewAndRange(option.value, getDegreeElement.valueAsNumber);
    });
  });

  // Listen for range input changes
  getDegreeElement.addEventListener('input', () => {
    let i = 0;
    for (i = 0; i < getRadioButtonSetElement.length; i++)
      if (getRadioButtonSetElement[i].checked) break;

    const type = getRadioButtonSetElement[i].value;
    if (type === '') return;

    slideIn(preview, isSliderOpen);
    isSliderOpen = true;
    // Update preview with current value for selected option
    const selectedOption = document.querySelector(
      'input[name="transform-radio"]:checked'
    ) as HTMLInputElement;
    updatePreviewAndRange(selectedOption.value, getDegreeElement.valueAsNumber);
  });
}

function updatePreviewAndRange(type: string, value: number) {
  const unitDisplayElement = document.querySelector(
    '.unit-display.transform'
  ) as HTMLElement;

  const titleDisplayElement = document.querySelector(
    '.title-display.transform'
  ) as HTMLElement;

  switch (type) {
    case 'scale':
      preview.style.transform = `scale(${value})`;
      transformExports.scale = value;
      getDegreeElement.min = '.1';
      getDegreeElement.max = '2';
      getDegreeElement.step = '.1';
      unitDisplayElement.innerText = `${value}`;
      titleDisplayElement.innerText = 'Size';
      break;
    case 'skew':
      preview.style.transform = `skew(${value}deg)`;
      transformExports.skew = value.toString();
      getDegreeElement.min = '-180';
      getDegreeElement.max = '180';
      getDegreeElement.step = '1';
      unitDisplayElement.innerText = `${value}deg`;
      titleDisplayElement.innerText = 'Degree';
      break;
    case 'translateX':
      preview.style.transform = `translateX(${value}px)`;
      transformExports.translateX = value.toString();
      getDegreeElement.min = '-100';
      getDegreeElement.max = '100';
      getDegreeElement.step = '1';
      unitDisplayElement.innerText = `${value}px`;
      titleDisplayElement.innerText = 'Position';
      break;
    case 'translateY':
      preview.style.transform = `translateY(${value}px)`;
      transformExports.translateY = value.toString();
      getDegreeElement.min = '-100';
      getDegreeElement.max = '100';
      getDegreeElement.step = '1';
      unitDisplayElement.innerText = `${value}px`;
      titleDisplayElement.innerText = 'Position';
      break;
    case 'rotate':
      preview.style.transform = `rotate(${value}deg)`;
      transformExports.rotate = value.toString();
      getDegreeElement.min = '0';
      getDegreeElement.max = '360';
      getDegreeElement.step = '1';
      unitDisplayElement.innerText = `${value}deg`;
      titleDisplayElement.innerText = 'Degrees';
      break;
    default:
      break;
  }
}

export function transformGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage();

  resultPage.style.display = 'flex';
  if (getOutputElement === null || type === 'oldResults') return;

  getTransformResult(getOutputElement);
}

function getTransformResult(outputElement: HTMLElement): void {
  const createTransformElement = (): void => {
    outputElement.style.width = '200px';
    outputElement.style.height = '200px';
  };
  createTransformElement();

  let i = 0;

  for (i = 0; i < getRadioButtonSetElement.length; i++)
    if (getRadioButtonSetElement[i].checked) break;

  const values: Values = {
    type: getRadioButtonSetElement[i].value,
    degree: getDegreeElement.value,
  };

  manageTransform(values, outputElement);

  const getCodeButtonElement = getCopyCodeButton(attribute);
  getCodeButtonElement.style.zIndex = '100';
  getCodeButtonElement.addEventListener('click', () => {
    copy(css);
    showPopup(
      'Code Copied',
      'Code has been successfully copied to clipboard',
      'success'
    );
  });
}

function manageTransform(values: Values, getOutputElement: HTMLElement) {
  switch (values.type) {
    case 'scale':
      css = `
      transform: scale(${values.degree});
      -webkit-transform: scale(${values.degree});
      -moz-transform: scale(${values.degree});`;
      getOutputElement.style.transform = `scale(${values.degree})`;
      break;
    case 'skew':
      css = `
      transform: skew(${values.degree}deg);
      -webkit-transform: skew(${values.degree}deg);
      -moz-transform: skew(${values.degree}deg);`;
      getOutputElement.style.transform = `skew(${values.degree}deg)`;
      break;
    case 'translateX':
      css = `
      transform: translateX(${values.degree}px);
      -webkit-transform: translateX(${values.degree}px);
      -moz-transform: translateX(${values.degree}px);`;
      getOutputElement.style.transform = `translateX(${values.degree}px)`;
      break;
    case 'translateY':
      css = `
      transform: translateY(${values.degree}px);
      -webkit-transform: translateY(${values.degree}px);
      -moz-transform: translateY(${values.degree}px);`;
      getOutputElement.style.transform = `translateY(${values.degree}px)`;
      break;
    case 'rotate':
      css = `
      transform: rotate(${values.degree}deg);
      -webkit-transform: rotate(${values.degree}deg);
      -moz-transform: rotate(${values.degree}deg);`;
      getOutputElement.style.transform = `rotate(${values.degree}deg)`;
      break;
    default:
      break;
  }
}
