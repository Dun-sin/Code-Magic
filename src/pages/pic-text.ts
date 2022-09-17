import * as utils from '../lib/general';

import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';

// File Pond Plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

let imageSRC: string;

/**
 * @function picTextGenerator
 * @summary function for all the functions of the pic-text generator
 * @param attribute - The attribute name of the generator element
 * @return {void} Nothing
 */
export function picTextGenerator(): void {
  const attribute = 'pic-text';
  getImageFile(attribute);
  const getTextInputElement = <HTMLInputElement>(
    document.getElementById(`${attribute}-text`)
  );

  const getOutputElement = utils.getOutput(attribute);

  utils.countForText(getTextInputElement);
  getPicTextResult(attribute, getOutputElement, getTextInputElement.value);
}

/**
 * @function getPicTextResult
 * @summary Sets the image and the text(if any) to the output element
 * @param attribute - The attribute name of the generator element
 * @param outputNode - The output element to display
 * @param text - The text to display on the image
 * @return {void} nothing
 */
function getPicTextResult(
  attribute: string,
  outputNode: HTMLElement,
  text: string
): void {
  let imageText = `################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################`;

  const getImageButtonElement = <HTMLInputElement>(
    document.querySelector(`[data-button = ${attribute}]`)
  );
  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  const getPNGButtonElement = utils.getPNGButton(attribute);
  const getSVGButtonElement = utils.getSVGButton(attribute);

  if (outputNode === null) {
    return;
  }

  getImageButtonElement.addEventListener('click', (): void => {
    setOnClick();
  });
  getPNGButtonElement.addEventListener('click', () => {
    utils.downloadPNG(attribute, outputNode);
  });
  getSVGButtonElement.addEventListener('click', () => {
    utils.downloadSVG(attribute, outputNode);
  });
  getCodeButtonElement.addEventListener('click', () => {
    utils.copyCodeToClipboard(attribute, outputNode);
    utils.showPopup(
      'Code Copied',
      'Code has been successfully copied to clipboard',
      'success'
    );
  });

  function setOnClick() {
    outputNode.style.background = `url(${imageSRC}) center no-repeat`;
    outputNode.style.backgroundSize = 'var(--output-width)';
    outputNode.style.backgroundClip = 'text';
    outputNode.style.webkitBackgroundClip = 'text';
    outputNode.style.webkitTextFillColor = 'rgba(255, 255, 255, 0.1)';
    if (text !== '') {
      imageText = text;
    }
    outputNode.innerText = imageText;
  }
}

/**
 * @function getImageFile
 * @summary Gets the image file and set the image to the imageSRC
 * @param attribute {string} The attribute name of the generator element
 * @return {void} nothing
 */
export function getImageFile(attribute: string): void {
  const getImageEntryElement = <HTMLInputElement>(
    document.getElementById(`${attribute}-file`)
  );

  FilePond.create(getImageEntryElement, {
    imagePreviewMaxHeight: 200,

    onpreparefile: (fileItem, output): void => {
      // create a new image object
      const img = new Image();

      // set the image source to the output of the Image Transform plugin
      img.src = URL.createObjectURL(output);
      imageSRC = img.src;
      console.log(fileItem);
    },
  });
}
