import * as utils from '../lib/general';

/**
 * @param image - image inputed string
 * @param imageHeight - image height number
 */
export function picTextGenerator(image: string, imageHeight: number): void {
  const attribute = 'pic-text';
  const outputNode = utils.getOutput(attribute);

  // The value 19 is the result I got by dividing the height of the image by
  // the number of lines of text necessary to cover its full height.
  // Probably based on font size ... I'm wondering if it will work everywhere though.
  // It's a lame solution, we have to find a better way in the future.
  const imageText = '###########################'.repeat(
    Math.ceil(imageHeight / 19)
  );

  outputNode.style.background = `url(${image}) center no-repeat`;
  outputNode.style.width = 'var(--output-width)';
  outputNode.style.height = `${imageHeight}px`;
  outputNode.style.backgroundSize = 'var(--output-width)';
  outputNode.style.backgroundClip = 'text';
  outputNode.style.webkitBackgroundClip = 'text';
  outputNode.style.webkitTextFillColor = 'rgba(255, 255, 255, 0.1)';
  outputNode.innerText = imageText;
  getPicTextResult(attribute, outputNode);
}

// function to disable the get result button once page loads
function disableImgResultBtn() {
  const getPicResultBtn = document.querySelector(
    '[data-button="pic-text"]'
  ) as HTMLButtonElement;

  getPicResultBtn.style.pointerEvents = 'none';
}

// disable function instantiation
disableImgResultBtn();

/**
 * Sets the image and the text(if any) to the output element
 *
 * @param attribute - The attribute name of the generator element
 * @param outputNode - The output element to display
 */
function getPicTextResult(attribute: string, outputNode: HTMLElement): void {
  if (outputNode === null) {
    return;
  }

  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  const getPNGButtonElement = utils.getPNGButton(attribute);
  const getSVGButtonElement = utils.getSVGButton(attribute);

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
}
