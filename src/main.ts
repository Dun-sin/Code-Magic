// Generator Modules
import {picTextGenerator} from './pages/pic-text';
import {gradientTextGenerator} from './pages/gradient-text';
import {gradientBorderGenerator} from './pages/gradient-border';
import {gradientBackgroundGenerator} from './pages/gradient-background';
import {animationGenerator} from './pages/animation';

// import * as FilePond from 'filepond';
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

/**
 * All Variables
 */
let attributeValue: string | null = null;
let imageSRC = '';
const sideBarSlide = [{left: '100%'}, {left: '0%'}];

const sideBarTiming = {
  duration: 500,
  iterations: 1,
  easing: 'ease-in',
};

// Elements
const generators = document.querySelectorAll('[data-gen]');
const sidebar = <HTMLElement>document.querySelector('.side-results');
const getResults = document.querySelectorAll('[data-button]');
const results = document.querySelectorAll('[data-result]');
const closeBar = document.getElementById('close-side-bar');
const getImageEntryElement = <HTMLInputElement>(
  document.getElementById(`pic-text-file`)
);
const navBar = document.querySelector('#nav');
const menuIcon = document.querySelector('#menu-icon');

menuIcon?.addEventListener('click', () => {
  if (navBar?.classList.contains('closed-nav')) {
    navBar?.classList.remove('closed-nav');
    menuIcon?.setAttribute('icon', 'ci:close-big');
  } else {
    navBar?.classList.add('closed-nav');
    menuIcon?.setAttribute('icon', 'dashicons:menu-alt');
  }
});

for (let i = 0; i < generators.length; i++) {
  generators[i].addEventListener('click', () => {
    navBar?.classList.add('closed-nav');
    menuIcon?.setAttribute('icon', 'dashicons:menu-alt');
  });
}

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

/**
 * All types
 */
type Display = 'grid' | 'flex' | 'none';

/**
 * @function generatorsFunction
 * @summary a function with the collection of functions for generators
 * @param {string} attribute - The attribute name of the generator element
 */
function generatorsFunction(attribute: string): void {
  switch (attribute) {
    case 'pic-text':
      picTextGenerator(imageSRC);
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
 * @function showContent
 * @summary use to toggle visibilty of content in generators
 * @param {string} attribute - The attribute name of the generator element
 * @param {Display} display - display type
 * @return {void} Nothing
 */
function showContent(attribute: string, display: Display): void {
  const generators = document.querySelectorAll(`[data-content]`);

  generators.forEach((item) => {
    const element = <HTMLElement>item;
    if (element.getAttribute('data-content') === attribute) {
      element.style.display = `${display}`;
    } else {
      element.style.display = 'none';
    }
  });
}

function showResult(attribute: string | null) {
  results.forEach((item) => {
    const element = <HTMLElement>item;
    if (element.getAttribute('data-result') === attribute) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
  if (attribute === null) return;
  generatorsFunction(attribute);
}

// function fixPicTextFile() {
//   const getImageEntryElement = <HTMLInputElement>(
//     document.getElementById(`pic-text-file`)
//   );
//   getImageEntryElement.setAttribute('value', '');
//   getImageEntryElement.setAttribute('src', '');
//   FilePond.destroy(getImageEntryElement);

//   if (attributeValue === null) return;
//   removeOrAddGeneratorContent(attributeValue, 'none');
// }

// adding an event listeners to all generators card

generators.forEach((generator) => {
  generator?.addEventListener('click', (): void => {
    sidebar.style.left = '100%';
    const checking = generator.getAttribute('data-gen');
    if (checking === null) return;

    attributeValue = checking;
    showContent(attributeValue, 'flex');
  });
});

getResults.forEach((getResult) => {
  getResult?.addEventListener('click', () => {
    showResult(getResult.getAttribute('data-button'));
    sidebar.animate(sideBarSlide, sideBarTiming);
    sidebar.style.left = '0%';
  });
});
showResult(null);

closeBar?.addEventListener('click', () => {
  const sideBarSlide = [{left: '0%'}, {left: '100%'}];
  sidebar.animate(sideBarSlide, sideBarTiming);
  sidebar.style.left = '100%';
  showResult(null);
});
