import * as utils from '../lib/general';

/**
 * @param image - image inputed string
 */
export function picTextGenerator(image: string): void {
  const attribute = 'pic-text';
  const outputNode = utils.getOutput(attribute);

  let imageText = `################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################`;

  outputNode.style.background = `url(${image}) center no-repeat`;
  outputNode.style.width = 'var(--output-width)';
  outputNode.style.backgroundSize = 'var(--output-width)';
  outputNode.style.backgroundClip = 'text';
  outputNode.style.webkitBackgroundClip = 'text';
  outputNode.style.webkitTextFillColor = 'rgba(255, 255, 255, 0.1)';
  outputNode.innerText = imageText;
  getPicTextResult(attribute, outputNode);
}

/**
 * Sets the image and the text(if any) to the output element
 *
 * @param attribute - The attribute name of the generator element
 * @param outputNode - The output element to display
 */
function getPicTextResult(attribute: string, outputNode: HTMLElement): void {
  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  const getPNGButtonElement = utils.getPNGButton(attribute);
  const getSVGButtonElement = utils.getSVGButton(attribute);

  if (outputNode === null) {
    return;
  }

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
