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
        background: ${(outputElement.children[0] as HTMLElement).style.background};
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
      console.log("element: ", element)
      codeToCopy = `
        div {
          height: '300px';
          width: '300px';
          box-shadow: ${element.boxShadow};
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
  document.querySelector('.side-results') as HTMLElement;

export const getCopyCodeButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-download = ${attribute}-code]`) as HTMLElement;

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

export const gradientElementInputs = (attribute: string): NodeList =>
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

export const showRadius = (attribute: string): void =>
  (
    document.querySelectorAll(`#${attribute}-input`) as NodeListOf<HTMLElement>
  )[0].style.setProperty('display', 'inline');

export const hideRadius = (attribute: string): void =>
  (
    document.querySelectorAll(`#${attribute}-input`) as NodeListOf<HTMLElement>
  )[0].style.setProperty('display', 'none');

export const getInputSpinner = (attribute: string) =>
  document.getElementById(`${attribute}-duration`) as HTMLInputElement;

export const getRadioButtonSet = (attribute: string) =>
  document.querySelectorAll(
    `[name = ${attribute}-radio]`
  ) as NodeListOf<HTMLInputElement>;

export const getBorderTop = (attribute: string) =>
  <HTMLInputElement>document.getElementById(`${attribute}-top`);

export const getBorderRight = (attribute: string) =>
  <HTMLInputElement>document.getElementById(`${attribute}-right`);

export const getBorderBottom = (attribute: string) =>
  <HTMLInputElement>document.getElementById(`${attribute}-bottom`);

export const getBorderLeft = (attribute: string) =>
  <HTMLInputElement>document.getElementById(`${attribute}-left`);

export const getStyleSheet = () => {
  const stylesheet = Array.from(document.styleSheets).filter(
    (styleSheet) =>
      !styleSheet.href || styleSheet.href.startsWith(location.origin)
  );
  return <CSSStyleSheet>stylesheet[0];
};

export const getBoxShadowHorizontalOffset = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-h-offset`);

export const getBoxShadowVerticalOffset = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-v-offset`);

export const getBoxShadowBlur = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-blur`);

export const getBoxShadowSpread = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-spread`);

export const getBoxShadowColor = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-color`);

function createDownloadLink(fileName: string, url: string) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  return link;
}
