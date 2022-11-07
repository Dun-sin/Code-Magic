import domtoimage from 'dom-to-image';
import copy from 'copy-to-clipboard';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Eggy} from '@s-r0/eggy-js';

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

/**
 * what should copy when the copy css button is clicked
 *
 * @param attribute attribute of the clicked generator
 * @param outputElement output element to display result
 */
function actOnGenerator(attribute: string, outputElement: HTMLElement) {
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
      codeToCopy = `
        div {
          border-width:8px;
          border-style:solid;
          border-radius:${element.getPropertyValue(`--${attribute}-radius`)};
          border-image:linear-gradient(${element.getPropertyValue(
            `--${attribute}-degree`
          )}, ${element.getPropertyValue(
        `--${attribute}-color-1`
      )}, ${element.getPropertyValue(`--${attribute}-color-2`)}) 1;
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
}

export function downloadPNG(attribute: string, outputImage: HTMLElement): void {
  domtoimage.toPng(outputImage, {quality: 0.95}).then((dataUrl) => {
    const link = createDownloadLink(`${attribute}.png`, dataUrl);
    link.click();
  });
}

export function downloadSVG(attribute: string, outputImage: HTMLElement): void {
  domtoimage.toSvg(outputImage).then((dataUrl) => {
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
    title: title,
    message: message,
    type: type,
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

export const getResultPage = (): HTMLElement =>
  document.querySelector('.side-results') as HTMLElement;

export const getCopyCodeButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-download=${attribute}-code]`) as HTMLElement;

export const getPNGButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-download=${attribute}-PNG]`) as HTMLElement;

export const getSVGButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-download=${attribute}-svg]`) as HTMLElement;

export const getResultButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-button = ${attribute}]`) as HTMLElement;

export const getColorInput1 = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-color1`) as HTMLInputElement;

export const getColorInput2 = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-color2`) as HTMLInputElement;

export const getAllInputElements = (attribute: string): NodeList =>
  document.querySelectorAll(`.${attribute}-inputs`);

export const gradientPreview = (attribute: string): HTMLElement =>
  document.querySelector(`#${attribute}-color-preview`) as HTMLElement;

export const createGradientPreview = (
  color1: HTMLInputElement,
  color2: HTMLInputElement,
  range: HTMLInputElement,
  preview: HTMLElement
) => {
  const colorFrom = color1?.value;
  const colorTo = color2?.value;
  const fill = range?.value;
  preview.style.background = `linear-gradient(${fill}deg, ${colorFrom}, ${colorTo})`;
};

export const getOutput = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-result = ${attribute}] > .output`
  ) as HTMLElement;

export const getRange = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-degree`) as HTMLInputElement;

export const getInputText = (attribute: string) =>
  document.getElementById(`${attribute}-text`) as HTMLInputElement;

export const getCheckbox = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-radius`) as HTMLInputElement;

export const getRadiusInput = (attribute: string) =>
  document.getElementById(`${attribute}-input`) as HTMLInputElement;

export const getInputSpinner = (attribute: string) =>
  document.getElementById(`${attribute}-duration`) as HTMLInputElement;

export const getRadioButtonSet = (attribute: string) =>
  document.querySelectorAll(
    `[name = ${attribute}-radio]`
  ) as NodeListOf<HTMLInputElement>;

export const getBorderTop = (attribute: string) =>
  document.getElementById(`${attribute}-top`) as HTMLInputElement;

export const getBorderRight = (attribute: string) =>
  document.getElementById(`${attribute}-right`) as HTMLInputElement;

export const getBorderBottom = (attribute: string) =>
  document.getElementById(`${attribute}-bottom`) as HTMLInputElement;

export const getBorderLeft = (attribute: string) =>
  document.getElementById(`${attribute}-left`) as HTMLInputElement;

export const getStyleSheet = () => {
  const stylesheet = Array.from(document.styleSheets).filter(
    (styleSheet) =>
      !styleSheet.href || styleSheet.href.startsWith(location.origin)
  );
  return stylesheet[0] as CSSStyleSheet;
};

export const getShadowHorizontalOffset = (
  attribute: string
): HTMLInputElement =>
  document.getElementById(`${attribute}-h-offset`) as HTMLInputElement;

export const getShadowVerticalOffset = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-v-offset`) as HTMLInputElement;

export const getShadowBlur = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-blur`) as HTMLInputElement;

export const getShadowSpread = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-spread`) as HTMLInputElement;

export const getShadowColor = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-color`) as HTMLInputElement;

export const getShadowPreview = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-preview`) as HTMLInputElement;

export const getShadowFields = (
  attribute: string,
  types: string[]
): HTMLSpanElement[] =>
  types.reduce(
    (acc, type) => [
      ...acc,
      document.getElementById(`${attribute}-${type}-field`) as HTMLInputElement,
    ],
    []
  );

export const getPreviewSlider = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-content=${attribute}] .preview-slider`
  ) as HTMLElement;

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

function createDownloadLink(fileName: string, url: string) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  return link;
}
