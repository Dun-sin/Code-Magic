// Generator Modules
import { picTextGenerator } from './generators/pic-text';
import { gradientTextGenerator } from './generators/gradient-text';
import { gradientBorderGenerator } from './generators/gradient-border';
import { gradientBackgroundGenerator } from './generators/gradient-background';
import { animationGenerator } from './generators/animation';

import * as FilePond from 'filepond';

/**
 * All Variables
 */
let attributeValue: string | null = null;
let isOpen = false;
// Elements
const generators = document.querySelectorAll('[data-gen]');
const closeModalElement = document.getElementById('close-modal');
const modalContainerElement = <HTMLElement>(
  document.querySelector('.modal-container')
);

/**
 * All types
 */
type Display = 'grid' | 'flex' | 'none';

/**
 * @function checkingIfGeneratorExists
 * @summary Check if the attribute value exists
 * @param {string | null} attribute - The attribute name of the generator element
 * @return {void} nothing
 */
function checkingIfGeneratorExists(attribute: string | null): void {
  if (attribute === null) return;

  changeHeaderText(attribute);
  generatorsFunction(attribute);
}

/**
 * @function changeHeaderText
 * @summary Change the header text of the generator based on the attribute value
 * @param {string} attribute - The attribute name of the generator element
 * @return {void} nothing
 */
function changeHeaderText(attribute: string): void {
  const modalHeaderTextElement = <HTMLElement>(
    document.getElementById('heading-text-modal')
  );

  attribute = attribute.charAt(0).toUpperCase() + attribute.slice(1);
  modalHeaderTextElement.innerText = `${attribute} Generator`;
}

/**
 * @function isVisible
 * @summary uses the value of isOpen to change the visibility of the modal
 * @param isOpen {boolean} - the variable for if the modal is open or closed
 * @return {void} nothing
 */
function isVisible(isOpen: boolean): void {
  if (isOpen) {
    modalContainerElement.style.display = 'grid';
  } else {
    modalContainerElement.style.display = 'none';
  }
}

/**
 * @function generatorsFunction
 * @summary a function with the collection of functions for generators
 * @param {string} attribute - The attribute name of the generator element
 */
function generatorsFunction(attribute: string): void {
  removeOrAddGeneratorContent(attribute, 'flex');
  switch (attribute) {
    case 'pic-text':
      picTextGenerator();
      break;
    case 'gradient-text':
      gradientTextGenerator();
      break;
    case 'gradient-border':
      gradientBorderGenerator();
      break;
    case 'gradient-background':
      gradientBackgroundGenerator();
      break;
    case 'animation':
      animationGenerator();
      break;

  }
}

/**
 * @function removeOrAddGeneratorContent
 * @summary use to toggle visibilty of content in generators
 * @param {string} attribute - The attribute name of the generator element
 * @param {Display} display - display type
 * @return {void} Nothing
 */
function removeOrAddGeneratorContent(
  attribute: string,
  display: Display
): void {
  const generator = <HTMLElement>(
    document.querySelector(`[data-modal = ${attribute}]`)
  );
  generator.style.display = `${display}`;
}

function closeModalFunction() {
  isOpen = false;

  isVisible(isOpen);

  const getImageEntryElement = <HTMLInputElement>(
    document.getElementById(`pic-text-file`)
  );
  getImageEntryElement.setAttribute('value', '');
  getImageEntryElement.setAttribute('src', '');
  FilePond.destroy(getImageEntryElement);

  if (attributeValue === null) return;
  removeOrAddGeneratorContent(attributeValue, 'none');
}

// Close button for modals
closeModalElement?.addEventListener('click', (): void => {
  closeModalFunction();
});

document?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModalFunction();
  }
});

// adding an event listeners to all generators card
generators.forEach((generator) => {
  generator?.addEventListener('click', (): void => {
    isOpen = true;
    isVisible(isOpen);
    const checking = generator.getAttribute('data-gen');
    if (checking === null) return;

    attributeValue = checking;
    checkingIfGeneratorExists(attributeValue);
  });
});

// closing modal when user clicks outside
document.addEventListener('click', function (event) {
  if (event.target === null) return;
  const element = <HTMLElement>event.target;
  if (element.matches('.modal-container')) {
    closeModalFunction();
  }
});
