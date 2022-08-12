import domtoimage from "dom-to-image";
import copy from "copy-to-clipboard";
// @ts-ignore
import { Eggy } from '@s-r0/eggy-js';

/**
 * @function copyCodeToClipboard
 * @summary Allows you to copy to clipboard
 * @param {string} attribute - The attribute name of the generator element
 * @param {HTMLElement} outputElement - Element to copy the element from
 * @return {void} Nothing
 */
export function copyCodeToClipboard(
  attribute: string,
  outputElement: HTMLElement
): void {
  const copyCodeButton = <HTMLElement>(
    document.querySelector(`[data-download=${attribute}-code]`)
  );
  copyCodeButton.addEventListener("click", (): void => {
    actOnGenerator();
  });

  function actOnGenerator() {
    let codeToCopy: string = "";
    let element;
    switch (attribute) {
      case "pic-text":
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
      case "gradient-text":
        codeToCopy = `
        p{	
          font-size: ${
            (outputElement.children[0] as HTMLElement).style.fontSize
          };
		  background: ${
        (outputElement.children[0] as HTMLElement).style.backgroundImage
      };
		  background-clip: 'text';
		  -webkit-background-clip: 'text';
		  -webkit-text-fill-color: 'transparent';
        }
        `;

        break;
      case "gradient-border":
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
      case "gradient-background":
        element = outputElement.style;
        codeToCopy = `
          div {
            height: 100px;
            width: 100px;
            background: ${element.backgroundImage};
          }
        `;
    }

    copy(codeToCopy);
  }
}

/**
 * @function countForText
 * @summary Counts the number of text in the input element
 * @param inputElement {HTMLInputElement} - The input element that holds the text
 * @return {void} Nothing
 */
export function countForText(inputElement: HTMLInputElement): void {
  const countElement = <HTMLElement>document.querySelector(".count > span");
  inputElement.addEventListener("keydown", (): void => {
    countElement.innerText = `${inputElement.value.length + 1}`;
  });
}

/**
 * @function downloadPNG
 * @summary Download the element in image type extension of png
 * @param outputImage {HTMLElement} - element to convert to an image
 * @return {void} Nothing
 */
export function downloadPNG(attribute: string, outputImage: HTMLElement): void {
  domtoimage.toPng(outputImage, { quality: 0.95 }).then((dataUrl) => {
    const link = createDownloadLink(`${attribute}.png`, dataUrl);
    link.click();
  });
}

/**
 * @function downloadSVG
 * @summary Download the element in image type extension of svg
 * @param outputImage {HTMLElement} - element to convert to an svg
 * @return {void} Nothing
 */
export function downloadSVG(attribute: string, outputImage: HTMLElement): void {
  domtoimage.toSvg(outputImage).then((dataUrl) => {
    const link = createDownloadLink(`${attribute}.svg`, dataUrl);
    link.click();
  });
}

/**
 * @function showPopup
 * @summary Show the popup on a page
 * @param title - Main Text
 * @param message - Secondary Text
 * @param type - To specify the type of a popup, Like: success, warning, info, error, 
 * @return {void} Nothing
 */

export function showPopup(title: string, message: string, type: string): void{
  Eggy({
    title:  title,
    message:  message,
    type:  type
  })
}

export function triggerEmptyAnimation(inputElement: HTMLInputElement): void {
  inputElement.style.borderColor = "red";
  inputElement.animate(
    [
      { transform: "translate(10px, 0)" },
      { transform: "translate(-10px, 0)" },
      { transform: "translate(0, 0)" },
    ],
    { duration: 300 }
  );

  setTimeout(() => {
    inputElement.style.borderColor = "white";
  }, 1000);
}

/**
 * @function getCopyCodeButton
 * @summary Get the button element for copying code to clipboard
 * @param attribute {string} - The attribute name of the generator element
 * @return {HTMLElement} The type of the button Element
 */
export const getCopyCodeButton = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-download = ${attribute}-code]`);

/**
 * @function getPNGButton
 * @summary Get the button element for downloading in image form
 * @param attribute {string} - The attribute name of the generator element
 * @return {HTMLElement} The type of the button Element
 */
export const getPNGButton = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-download=${attribute}-PNG]`);

/**
 * @function getSVGButton
 * @summary Get the button element for downloading in svg format
 * @param attribute {string} - The attribute name of the generator element
 * @return {HTMLElement} The type of the button Element
 */
export const getSVGButton = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-download=${attribute}-svg]`);

export const getResultButton = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-button = ${attribute}]`);

export const getColorInput1 = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-color1`);

export const getColorInput2 = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-color2`);

export const getOutput = (attribute: string): HTMLElement =>
  <HTMLElement>document.querySelector(`[data-modal = ${attribute}] .output`);

export const getRange = (attribute: string): HTMLInputElement =>
  <HTMLInputElement>document.getElementById(`${attribute}-degree`);

export const getInputText = (attribute: string) =>
  <HTMLInputElement>document.getElementById(`${attribute}-text`);

function createDownloadLink(fileName: string, url: string) {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  return link;
}
