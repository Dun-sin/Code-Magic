import {
  getCopyCodeButton,
  getOutput,
  getResultPage,
  getTransformItemValue,
  getTransformRotate,
  getTransformScale,
  getTransformSkew,
  getTransformTranslateX,
  getTransformTranslateY,
} from '../lib/getElements';
import {copyCodeToClipboard, showPopup} from '../lib/packages';

type TransformValues = {
  scale: string;
  rotate: string;
  skew: string;
  translateX: string;
  translateY: string;
};

const attribute = 'transform';

const transformExports = {
  scale: 0,
  skew: '',
  rotate: '',
  translateX: '',
  translateY: '',
};

const transformPreview = document.querySelector(
  '.transform-preview'
) as HTMLElement;
const scaleInput = getTransformScale(attribute);
const rotateInput = getTransformRotate(attribute);
const skewInput = getTransformSkew(attribute);
const translateXInput = getTransformTranslateX(attribute);
const translateYInput = getTransformTranslateY(attribute);
const inputs = [
  scaleInput,
  skewInput,
  rotateInput,
  translateXInput,
  translateYInput,
];

// gets element holding value of each transform item
const scaleValue = getTransformItemValue('scale');
const rotateValue = getTransformItemValue('rotate');
const skewValue = getTransformItemValue('skew');
const translateXValue = getTransformItemValue('translateX');
const translateYValue = getTransformItemValue('translateY');

function copyHandler() {
  const outputElement = getOutput(attribute);
  copyCodeToClipboard(attribute, outputElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

export function addTransformListener(): void {
  const transformGenerator = (): void => {
    const scale = parseFloat(scaleInput.value) / 50;
    const skew = skewInput.value + 'deg';
    const rotate = rotateInput.value + 'deg';
    const translateX = translateXInput.value + 'px';
    const translateY = translateYInput.value + 'px';
    transformPreview.style.transform = `scale(${scale}) skew(${skew}) rotate(${rotate}) translate(${translateX}, ${translateY})`;

    scaleValue.innerText = (scale * 50).toString();
    skewValue.innerText = skew;
    rotateValue.innerText = rotate;
    translateXValue.innerText = translateX;
    translateYValue.innerText = translateY;

    transformExports.scale = scale;
    transformExports.skew = skew;
    transformExports.rotate = rotate;
    transformExports.translateX = translateX;
    transformExports.translateY = translateY;
  };

  inputs.forEach((input) => {
    input.addEventListener('input', transformGenerator);
  });
}

export function transformGenerator(
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const getOutputElement = getOutput(attribute);
  const resultPage = getResultPage(); //page to hold result

  resultPage.style.display = 'flex';
  if (getOutputElement === null || type === 'oldResults') return;

  const values = {
    scale: scaleInput.value,
    rotate: rotateInput.value,
    skew: skewInput.value,
    translateX: translateXInput.value,
    translateY: translateYInput.value,
  };

  getTransformResult(values, getOutputElement);
}

function getTransformResult(
  values: TransformValues,
  outputElement: HTMLElement
): void {
  const createTransformElement = (): void => {
    const scale = parseFloat(values.scale) / 50;
    outputElement.style.width = '250px';
    outputElement.style.height = '250px';
    outputElement.style.transform = `scale(${scale}) skew(${values.skew}deg) rotate(${values.rotate}deg) translate(${values.translateX}px, ${values.translateY}px)`;
  };
  createTransformElement();

  const getCodeButtonElement = getCopyCodeButton(attribute);
  getCodeButtonElement.addEventListener('click', copyHandler);
}

export {transformExports};
