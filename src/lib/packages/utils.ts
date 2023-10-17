import DomToImage from 'dom-to-image';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Eggy} from '@s-r0/eggy-js';
import {
  getGradientPreview,
  getNewColorButton,
  getParentElementOfColors,
  getRemoveNewColorButton,
  getAllColorInput,
} from '../getElements';

import {
  createDownloadLink,
  actOnGenerator,
  actOnTailwindGenerator,
} from './helpers';

export const setGradientDegreeValue = (degreeElement: HTMLElement): void =>
  degreeElement.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    const unitDisplayElement = target.parentElement?.querySelector(
      '.unit-display'
    ) as HTMLElement;

    // change the unit for opacity
    const unit = unitDisplayElement.innerText.toLowerCase().includes('opacity')
      ? ''
      : 'deg';
    unitDisplayElement.innerText = `${target.value}${unit}`;
  });

export function slideIn(slider: HTMLElement, isOpen: boolean) {
  if (isOpen) return;

  const slideIn = [{left: '-300px'}, {left: '-10px'}];
  const slideInTiming = {
    duration: 500,
    iterations: 1,
    fill: 'both' as FillMode,
  };

  slider.animate(slideIn, slideInTiming);
}

export const createGradientPreview = (
  range: HTMLInputElement,
  attribute: string
) => {
  const fill = range?.value;
  getGradientPreview(
    attribute
  ).style.background = `linear-gradient(${fill}deg, ${getColorsValue(
    attribute
  ).join(', ')})`;
};

/**
 * Allows you to copy CSS code to clipboard
 *
 * @param attribute The attribute name of the generator element
 * @param outputElement output element to display result
 */
export function copyCSSCodeToClipboard(
  attribute: string,
  outputElement: HTMLElement
): void {
  actOnGenerator(attribute, outputElement);
}

/**
 * Allows you to copy Tailwind code to clipboard
 *
 * @param attribute The attribute name of the generator element
 * @param outputElement output element to display result
 */
export function copyTailwindCodeToClipboard(
  attribute: string,
  outputElement?: HTMLElement | null
): void {
  if (outputElement) actOnTailwindGenerator(attribute, outputElement);
  else console.log("Can't generate tailwind code");
}

export const addRule = (function (style) {
  const sheet = document.head.appendChild(style).sheet;
  return function (selector: string, css: {[x: string]: string}) {
    const propText =
      typeof css === 'string'
        ? css
        : Object.keys(css)
            .map(function (p) {
              return p + ':' + (p === 'content' ? "'" + css[p] + "'" : css[p]);
            })
            .join(';');
    sheet?.insertRule(selector + '{' + propText + '}', sheet.cssRules.length);
  };
})(document.createElement('style'));

export function downloadPNG(attribute: string, outputImage: HTMLElement): void {
  DomToImage.toPng(outputImage, {quality: 1}).then((dataUrl) => {
    const link = createDownloadLink(`${attribute}.png`, dataUrl);
    link.click();
  });
}

export function downloadSVG(attribute: string, outputImage: HTMLElement): void {
  DomToImage.toSvg(outputImage).then((dataUrl) => {
    const link = createDownloadLink(`${attribute}.svg`, dataUrl);
    link.click();
  });
}

/**
 * Show the popup on a page
 *
 * @param title - Main Text
 * @param message - Secondary Text
 * @param type - To specify the type of a popup, Like: success, warning, info, error,
 */

export function showPopup(title: string, message: string, type: string): void {
  Eggy({
    title,
    message,
    type,
  });
}

export function triggerEmptyAnimation(inputElement: HTMLInputElement): void {
  inputElement.style.borderColor = 'red';
  inputElement.animate(
    [
      {transform: 'translate(10px, 0)'},
      {transform: 'translate(-10px, 0)'},
      {transform: 'translate(0, 0)'},
    ],
    {duration: 300}
  );

  setTimeout(() => {
    inputElement.style.borderColor = 'white';
  }, 1000);
}

export function addNewColorPicker(attribute: string): void {
  const getParentElementToAddTo = getParentElementOfColors(attribute);
  const numberOfChildren = getParentElementToAddTo?.childElementCount;

  if (numberOfChildren === undefined || numberOfChildren === 4) return;

  const colorNumber = numberOfChildren + 1;

  getParentElementToAddTo?.appendChild(createLabelForNewColor());
  whatColorButtonShouldShow(attribute);

  // create label element
  function createLabelForNewColor(): Node {
    const labelWrapperForColor = document.createElement('label');
    labelWrapperForColor.setAttribute('for', 'color');
    labelWrapperForColor.className = 'color';

    labelWrapperForColor.appendChild(createNewColor());

    return labelWrapperForColor;
  }

  // create color pickter
  function createNewColor(): Node {
    const newColorCreated = document.createElement('input');
    newColorCreated.setAttribute('type', 'text');
    newColorCreated.setAttribute('data-coloris', '');
    newColorCreated.placeholder = 'Tap to pick a color';
    newColorCreated.id = `${attribute}-color${colorNumber}`;
    newColorCreated.className = `${attribute}-inputs`;

    return newColorCreated;
  }
}

export function getColorsValue(attribute: string): Array<string> {
  const colorValues: string[] = [];

  const colorInput = getAllColorInput(attribute);

  colorInput.forEach((value) => {
    const colorValue = value as HTMLInputElement;
    colorValues.push(colorValue.value);
  });

  return colorValues;
}

export function removeColorPicker(attribute: string): void {
  const getParentElementToRemoveFrom = getParentElementOfColors(attribute);
  const numberOfChildren = getParentElementToRemoveFrom?.childElementCount;

  if (numberOfChildren === undefined || numberOfChildren === 2) return;
  getParentElementToRemoveFrom?.lastChild?.remove();

  whatColorButtonShouldShow(attribute);
}

export const whatColorButtonShouldShow = (attribute: string): void => {
  const getNumberOfChildren =
    getParentElementOfColors(attribute).childElementCount;

  // display add new color button
  if (getNumberOfChildren === 2 || getNumberOfChildren !== 4) {
    getNewColorButton(attribute).style.display = 'flex';
  } else {
    getNewColorButton(attribute).style.display = 'none';
  }

  // display remove color button
  if (getNumberOfChildren > 2) {
    getRemoveNewColorButton(attribute).style.display = 'flex';
  } else {
    getRemoveNewColorButton(attribute).style.display = 'none';
  }
};

// close dropdown on outside click
export function closeDropdown(
  toggleFunction: () => void,
  dropdown: HTMLElement,
  classToToggle: string
): void {
  document.documentElement.addEventListener('click', function () {
    if (dropdown.classList.contains(classToToggle)) {
      toggleFunction();
    }
  });
}
