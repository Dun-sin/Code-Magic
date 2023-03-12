import DomToImage from 'dom-to-image';
import copy from 'copy-to-clipboard';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Eggy} from '@s-r0/eggy-js';
import {
  getGradientPreview,
  getNewColorButton,
  getParentElementOfColors,
  getRemoveNewColorButton,
  getAllColorInput,
} from './getElements';

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

function createDownloadLink(fileName: string, url: string) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  return link;
}

/**
 * Allows you to copy to clipboard
 *
 * @param attribute The attribute name of the generator element
 * @param outputElement output element to display result
 */
export function copyCodeToClipboard(
  attribute: string,
  outputElement: HTMLElement
): void {
  actOnGenerator(attribute, outputElement);
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

/**
 * what should copy when the copy css button is clicked
 *
 * @param attribute attribute of the clicked generator
 * @param outputElement output element to display result
 */
const actOnGenerator = (attribute: string, outputElement: HTMLElement) => {
  let codeToCopy = '';
  let element;

  switch (attribute) {
    case 'pic-text':
      codeToCopy = `
    div {
      background-position: ${outputElement.style.backgroundPosition};
      background-size: ${outputElement.style.backgroundSize};
      background-repeat: ${outputElement.style.backgroundRepeat};
      background-clip: ${outputElement.style.backgroundClip};
      -webkit-background-clip: ${outputElement.style.webkitBackgroundClip};
      -webkit-text-fill-color: ${outputElement.style.webkitTextFillColor};
    }
  `;
      break;
    case 'gradient-text':
      codeToCopy = `
      p{	
        font-size: ${(outputElement.children[0] as HTMLElement).style.fontSize};
        background: ${
          (outputElement.children[0] as HTMLElement).style.background
        };
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      `;

      break;
    case 'gradient-border':
      element = outputElement.style;
      const content = window.getComputedStyle(outputElement, '::before');

      codeToCopy = `
        div {
          position: relative;
        }

        div::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background: ${content.background};
          background-clip: 'border-box';
          ${
            content.borderRadius !== '0px'
              ? `border-radius: ${content.borderRadius};`
              : ''
          }
        }
      `;
      break;
    case 'gradient-background':
      element = outputElement.style;
      codeToCopy = `
        div {
          height: 100px;
          width: 100px;
          background: ${element.backgroundImage};
        }
      `;
      break;
    case 'border-radius':
      element = outputElement.style;
      codeToCopy = `
          border-radius: ${element.borderRadius};
      `;
      break;
    case 'box-shadow':
      element = outputElement.style;
      codeToCopy = `
        div {
          height: 300px;
          width: 300px;
          box-shadow: ${element.boxShadow};
        }
      `;
      break;
    case 'text-shadow':
      element = outputElement.style;
      codeToCopy = `
        div {
          text-shadow: ${element.textShadow};
        }
      `;
      break;
    case 'input-range':
      element = outputElement.style;
      codeToCopy = `
      input[type='range'] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;
        width: ${element.getPropertyValue('--preview-track-width')};
      }

      input[type='range']::-webkit-slider-runnable-track {
        background-color: ${element.getPropertyValue('--preview-track-color')};
        height: ${element.getPropertyValue('--preview-track-height')};
        width: 100%;
        border-radius: ${element.getPropertyValue('--preview-track-radius')};
      }

      input[type='range']::-moz-range-track {
        background-color: ${element.getPropertyValue('--preview-track-color')};
        height: ${element.getPropertyValue('--preview-track-height')};
        width: 100%;
        border-radius: ${element.getPropertyValue('--preview-track-radius')};
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: ${element.getPropertyValue('--preview-thumb-color')};
        height: ${element.getPropertyValue('--preview-thumb-height')};
        width: ${element.getPropertyValue('--preview-thumb-width')};
        margin-top: -3.2px;
        border-radius: ${element.getPropertyValue('--preview-thumb-radius')};
      }

      input[type='range']::-moz-range-thumb {
        border: none;
        background-color: ${element.getPropertyValue('--preview-thumb-color')};
        height: ${element.getPropertyValue('--preview-thumb-height')};
        width: ${element.getPropertyValue('--preview-thumb-width')};
        border-radius: ${element.getPropertyValue('--preview-thumb-radius')};
      }

      input[type='range']:focus {
        outline: none;
      }
      `;
      break;
    default:
      codeToCopy = `
          Couldn't copy, please try again :(
        `;
  }

  try {
    copy(codeToCopy);
  } catch {
    Eggy({
      title: `Whoops`,
      message: `Can't copy, try again`,
      type: 'error',
    });
  }
};

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
