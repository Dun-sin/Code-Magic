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
      (outputElement.children[0] as HTMLElement).style.backgroundImage
    };
    background-clip: 'text';
    -webkit-background-clip: 'text';
    -webkit-text-fill-color: 'transparent';
      }
      `;

      break;
    case 'gradient-border':
      element = outputElement.style;
      codeToCopy = `
        div {
          border: ${element.border},
          border-width: ${element.borderWidth},
          border-image-slice: ${element.borderImageSlice},
          border-image-source: ${element.borderImageSource},
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
  }

  copy(codeToCopy);
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
  <HTMLElement>document.querySelector('.side-results');

export const getCopyCodeButton = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-download = ${attribute}-code]`);

export const getPNGButton = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-download=${attribute}-PNG]`);

export const getSVGButton = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-download=${attribute}-svg]`);

export const getResultButton = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-button = ${attribute}]`);

export const getColorInput1 = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-color1`);

export const getColorInput2 = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-color2`);

export const getOutput = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-result = ${attribute}] > .output`);

export const getRange = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-degree`);

export const getInputText = (attribute: string) =>
  <HTMLInputElement>document.getElementById(`${attribute}-text`);

export const getCheckbox = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-radius`);

export const getRadiusInput = (attribute: string) =>
  <HTMLInputElement>document.getElementById(`${attribute}-input`);

export const showRadius = (attribute: string): void =>
  document
    .querySelectorAll<HTMLElement>(`#${attribute}-input`)[0]
    .style.setProperty('display', 'inline');

export const hideRadius = (attribute: string): void =>
  document
    .querySelectorAll<HTMLElement>(`#${attribute}-input`)[0]
    .style.setProperty('display', 'none');

export const getInputSpinner = (attribute: string) =>
  <HTMLInputElement>document.getElementById(`${attribute}-duration`);

export const getRadioButtonSet = (attribute: string) =>
  <NodeListOf<HTMLInputElement>>(
    document.querySelectorAll(`[name = ${attribute}-radio]`)
  );

export const getStyleSheet = () => {
  const stylesheet = Array.from(document.styleSheets).filter(
    (styleSheet) =>
      !styleSheet.href || styleSheet.href.startsWith(location.origin)
  );
  return <CSSStyleSheet>stylesheet[0];
};

/* ||||  CONSIDER RENAMING getOutput above TO getGradientBorder ||||
 * (for example) export const getGradientBorder = (attribute: string): HTMLElement =>
 * <HTMLElement>document.querySelector(`${attribute}`);
 */

function createDownloadLink(fileName: string, url: string) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  return link;
}
