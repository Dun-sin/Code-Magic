import {
  getOutput,
  getResultPage,
  getCopyCodeButton,
  getPNGButton,
  getSVGButton,
  getTailwindButton,
  getCssOrTailwindButton,
  getCssOrTailwindDropdown,
  getPngOrSvgButton,
  getPngOrSvgDropdown,
} from '../lib/getElements';
import {
  copyCSSCodeToClipboard,
  showPopup,
  downloadPNG,
  downloadSVG,
  copyTailwindCodeToClipboard,
  closeDropdown,
} from '../lib/packages/utils';

const attribute = 'pic-text';
const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const getPngOrSvgDropdownElement = getPngOrSvgDropdown(attribute);
const showCopyClass = 'show-css-tailwind';
const showPngOrSvgClass = 'show-png-svg';

function copyHandler() {
  const outputElement = getOutput(attribute);
  copyCSSCodeToClipboard(attribute, outputElement);
  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

function getCssOrTailwind(e?: MouseEvent): void {
  e?.stopPropagation();
  getCssOrTailwindDropdownElement.classList.toggle(showCopyClass);
}

function getPngOrSvg(e?: MouseEvent) {
  e?.stopPropagation();
  getPngOrSvgDropdownElement.classList.toggle(showPngOrSvgClass);
}

// closes css and tailwind dropdown on outside click
closeDropdown(getCssOrTailwind, getCssOrTailwindDropdownElement, showCopyClass);

// closes png and css dropdown outside click
closeDropdown(getPngOrSvg, getPngOrSvgDropdownElement, showPngOrSvgClass);

function pngDownloadHandler() {
  const outputElement = getOutput(attribute);
  downloadPNG(attribute, outputElement);
}

function svgDownloadHanlder() {
  const outputElement = getOutput(attribute);
  downloadSVG(attribute, outputElement);
}

/**
 * @param image - image inputed string
 * @param imageHeight - image height number
 */
export function picTextGenerator(
  image: string,
  imageHeight: number,
  type: 'newResults' | 'oldResults' | null
): void {
  if (type === null) return;

  const outputNode = getOutput(attribute);
  const resultPage = getResultPage();

  // The value 19 is the result I got by dividing the height of the image by
  // the number of lines of text necessary to cover its full height.
  // Probably based on font size ... I'm wondering if it will work everywhere though.
  // It's a lame solution, we have to find a better way in the future.
  const imageText = '###########################'.repeat(
    Math.ceil(imageHeight / 19)
  );

  resultPage.style.display = 'flex';
  if (type === 'oldResults') return;
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

  const getCodeButtonElement = getCopyCodeButton(attribute);
  const getPNGButtonElement = getPNGButton(attribute);
  const getSVGButtonElement = getSVGButton(attribute);
  const getTailwindCodeButtonElement = getTailwindButton(attribute);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);
  const getPngOrSvgButtonElement = getPngOrSvgButton(attribute);

  getPNGButtonElement.addEventListener('click', pngDownloadHandler);
  getSVGButtonElement.addEventListener('click', svgDownloadHanlder);
  getCodeButtonElement.addEventListener('click', copyHandler);
  getTailwindCodeButtonElement.addEventListener('click', tailwindHandler);
  getCssOrTailwindButtonElement.addEventListener('click', getCssOrTailwind);
  getPngOrSvgButtonElement.addEventListener('click', getPngOrSvg);
}

// Tailwind codecopy handler
function tailwindHandler() {
  copyTailwindCodeToClipboard(attribute);
  showPopup(
    'Tailwind Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}
