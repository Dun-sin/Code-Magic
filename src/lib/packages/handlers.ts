import {resetAnimationValues} from '../../pages/animation';
import {resetBorderRadiusValues} from '../../pages/border-radius';
import {resetBoxShadowValues} from '../../pages/box-shadow';
import {
  addOrRemoveGradientBackgroundColor,
  resetGradientBackgroundValues,
} from '../../pages/gradient-background';
import {
  addOrRemoveGradientBorder,
  resetGradientBorderValues,
} from '../../pages/gradient-border';
import {
  addOrRemoveGradientText,
  resetGradientTextValues,
} from '../../pages/gradient-text';
import {resetGridGeneratorValues} from '../../pages/grid-generator';
import {resetInputRangeValues} from '../../pages/input-range';
import {resetTextShadowValues} from '../../pages/text-shadow';
import {resetTransformValues} from '../../pages/transform';
import {
  getCssOrTailwindDropdown,
  getOutput,
  getPngOrSvgDropdown,
  getRange,
} from '../getElements';
import {DataGeneratorValues, DataGenerators} from '../models/types';
import {
  copyHandler,
  downloadPNG,
  downloadSVG,
  getGeneratorType,
  stateManager,
  tailwindHandler,
} from './utils';

export function resetHandler(genType: string) {
  if (genType === DataGenerators.Transform) {
    resetTransformValues();
  } else if (genType === DataGenerators.Animation) {
    resetAnimationValues();
  } else if (genType === DataGenerators.BorderRadius) {
    resetBorderRadiusValues();
  } else if (genType === DataGenerators.GradientBorder) {
    resetGradientBorderValues();
  } else if (genType === DataGenerators.InputRange) {
    resetInputRangeValues();
  } else if (genType === DataGenerators.GridGenerators) {
    resetGridGeneratorValues();
  } else if (genType === DataGenerators.BoxShadow) {
    resetBoxShadowValues();
  } else if (genType === DataGenerators.TextShadow) {
    resetTextShadowValues();
  } else if (genType === DataGenerators.Gradient) {
    resetGradientTextValues();
  } else if (genType === DataGenerators.GradientBackground) {
    resetGradientBackgroundValues();
  }
}

export function pngDownloadHandler(attribute: string) {
  const outputElement = getOutput(attribute);
  downloadPNG(attribute, outputElement);
}

export function svgDownloadHanlder(attribute: string) {
  const outputElement = getOutput(attribute);
  downloadSVG(attribute, outputElement);
}

export function addOrRemoveColorHandler(type: string, action: string) {
  if (type === DataGenerators.GradientBackground) {
    addOrRemoveGradientBackgroundColor(action);
  } else if (type === DataGenerators.Gradient) {
    addOrRemoveGradientText(action);
  } else if (type === DataGenerators.GradientBorder) {
    addOrRemoveGradientBorder(action);
  }
}

export function animationRadioBtnHandler(element: HTMLInputElement) {
  const getDegreeElement = getRange('animation');
  // get the unit display element for animator
  const unitDisplayElement = document.querySelector(
    '.unit-display.animation'
  ) as HTMLElement;

  const titleDisplayElement = document.querySelector(
    '.title-display'
  ) as HTMLElement;

  const type = element.value;
  if (['skew', 'flip'].includes(type)) {
    getDegreeElement.min = '-90';
    getDegreeElement.max = '90';
    getDegreeElement.step = '1';
    getDegreeElement.value = '50';
    unitDisplayElement.innerText = `${getDegreeElement.value}deg`;
    titleDisplayElement.innerText = 'Angle';
  } else if (type === 'rotate') {
    getDegreeElement.min = '0';
    getDegreeElement.max = '360';
    getDegreeElement.step = '1';
    getDegreeElement.value = '45';
    unitDisplayElement.innerText = `${getDegreeElement.value}deg`;
    titleDisplayElement.innerText = 'Degrees';
  } else {
    getDegreeElement.min = '0';
    getDegreeElement.max = '1';
    getDegreeElement.step = '.1';
    getDegreeElement.value = '.5';
    unitDisplayElement.innerText = `${getDegreeElement.value}`;
    titleDisplayElement.innerText = 'Opacity';
  }
}

export function toggleCopyHandler(cssTailWindAttr: string) {
  const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(
    getGeneratorType(cssTailWindAttr)
  );
  stateManager.setState(
    'active-copy-dropdown',
    getCssOrTailwindDropdownElement
  );
  const showCopyClass = 'show-css-tailwind';
  getCssOrTailwindDropdownElement.classList.toggle(showCopyClass);
}

export function getCodeHandler(codeType: string) {
  const genType: DataGeneratorValues = getGeneratorType(codeType);
  if (codeType.endsWith('code')) {
    copyHandler(genType);
  } else if (codeType.endsWith('tailwind')) {
    tailwindHandler(genType);
  }
}

export function toggleDownloadHandler(pngSvgAttr: string) {
  const showPngOrSvgClass = 'show-png-svg';
  const getPngOrSvgDropdownElement = getPngOrSvgDropdown(
    getGeneratorType(pngSvgAttr)
  );
  getPngOrSvgDropdownElement.classList.toggle(showPngOrSvgClass);
  stateManager.setState('active-download-dropdown', getPngOrSvgDropdownElement);
}

export function toggleImgDownloadHandler(imgType: string) {
  const genType = getGeneratorType(imgType);
  if (imgType.endsWith('PNG')) {
    pngDownloadHandler(genType);
  } else if (imgType.endsWith('svg')) {
    svgDownloadHanlder(genType);
  }
}
