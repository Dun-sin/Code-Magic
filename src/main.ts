// Generator Modules
import {picTextGenerator} from './pages/pic-text';
import {gradientTextGenerator} from './pages/gradient-text';
import {gradientBorderGenerator} from './pages/gradient-border';
import {gradientBackgroundGenerator} from './pages/gradient-background';
import {animationGenerator} from './pages/animation';
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
const FINAL_WIDTH = 300;
let attributeValue: string | null = null;
let imageSRC: string;
let imageHeight: number;
const sideBarSlide = [
  {left: '30%', opacity: '0'},
  {left: '0%', opacity: '1'},
];
const sideBarSlideOut = [
  {left: '0%', opacity: '1'},
  {left: '30%', opacity: '0'},
];

const sideBarTiming = {
  duration: 450,
  iterations: 1,
  easing: 'ease',
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

//gradient text color elements
const gradientTextInputs = document.querySelectorAll('.gradient-text-inputs');
const textPreview = <HTMLElement>(
  document.querySelector('#gradient-text-color-preview')
);
const gradientTextColor1 = <HTMLInputElement>(
  document.querySelector('#gradient-text-color1')
);
const gradientTextColor2 = <HTMLInputElement>(
  document.querySelector('#gradient-text-color2')
);
const gradientTextDegree = <HTMLInputElement>(
  document.querySelector('#gradient-text-degree')
);

//gradient border color element
const gradientBorderInputs = document.querySelectorAll(
  '.gradient-border-inputs'
);
const borderPreview = <HTMLElement>(
  document.querySelector('#gradient-border-color-preview')
);
const gradientBorderColor1 = <HTMLInputElement>(
  document.querySelector('#gradient-border-color1')
);
const gradientBorderColor2 = <HTMLInputElement>(
  document.querySelector('#gradient-border-color2')
);
const gradientBorderDegree = <HTMLInputElement>(
  document.querySelector('#gradient-border-degree')
);

//gradient background color elements
const gradientBackgroundInputs = document.querySelectorAll(
  '.gradient-background-inputs'
);
const backgroundPreview = <HTMLElement>(
  document.querySelector('#gradient-background-color-preview')
);
const gradientBackgroundColor1 = <HTMLInputElement>(
  document.querySelector('#gradient-background-color1')
);
const gradientBackgroundColor2 = <HTMLInputElement>(
  document.querySelector('#gradient-background-color2')
);
const gradientBackgroundDegree = <HTMLInputElement>(
  document.querySelector('#gradient-background-degree')
);

// get all range inputs
const gradientRangeInputs = document.querySelectorAll('.degree-range');

// get title display element for animation
const titleDisplayElement = <HTMLElement>(
  document.querySelector('.title-display')
);

menuIcon?.addEventListener('click', () => {
  if (navBar?.classList.contains('closed-nav')) {
    navBar?.classList.remove('closed-nav');
    menuIcon?.setAttribute('icon', 'ci:close-big');
  } else {
    navBar?.classList.add('closed-nav');
    menuIcon?.setAttribute('icon', 'dashicons:menu-alt');
  }
});

const menu = <HTMLElement>document.querySelector('.menu');
const body = <HTMLElement>document.querySelector('body');

if (getComputedStyle(menu).display == 'block') {
  body.onclick = (e) => {
    if (e.target !== navBar) {
      if (e.target !== menuIcon) {
        navBar?.classList.add('closed-nav');
        menuIcon?.setAttribute('icon', 'dashicons:menu-alt');
      }
    }
  };
}

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

    // Dirty trick to get the final visible height of the picture
    // Based on the knowledge the width will be 300px
    img.onload = () => {
      imageHeight = Math.floor(
        img.naturalHeight / (img.naturalWidth / FINAL_WIDTH)
      );
    };

    // set the image source to the output of the Image Transform plugin
    img.src = URL.createObjectURL(output);
    imageSRC = img.src;

    // function to enable the get result button once image uploaded
    function enableImgResultBtn() {
      const getPicResultBtn = document.querySelector(
        '[data-button="pic-text"]'
      ) as HTMLButtonElement;

      getPicResultBtn.style.pointerEvents = '';
    }

    enableImgResultBtn();

    // disable btn also when close btn clicked on image display
    const closeBtn = document.querySelector(
      '.filepond--action-remove-item'
    ) as HTMLButtonElement;

    closeBtn.addEventListener('click', function () {
      const getPicResultBtn = document.querySelector(
        '[data-button="pic-text"]'
      ) as HTMLButtonElement;

      getPicResultBtn.style.pointerEvents = 'none';
    });

    console.log(fileItem);
  },
});

/**
 * All types
 */
type Display = 'grid' | 'flex' | 'none';

/**
 * sets which generator to call
 *
 * @param attribute - The attribute name of the generator element
 */
function generatorsFunction(attribute: string): void {
  switch (attribute) {
    case 'pic-text':
      picTextGenerator(imageSRC, imageHeight);
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
 * use to toggle visibility of content in generators
 *
 * @param attribute  The attribute name of the generator element
 * @param display  display type
 */
function showContent(attribute: string, display: Display): void {
  const generators = document.querySelectorAll(`[data-content]`);
  const generatorsNav = document.querySelectorAll(`[data-gen]`);
  const showGen = <HTMLElement>(
    document.querySelector(`[data-content=${attribute}]`)
  );
  const highLightGen = <HTMLElement>(
    document.querySelector(`[data-gen=${attribute}]`)
  );

  generators.forEach((item) => {
    const element = <HTMLElement>item;
    element.style.display = 'none';
  });
  generatorsNav.forEach((item) => {
    const generatorNav = <HTMLElement>item;
    generatorNav.style.border = 'none';
    generatorNav.style.background = 'none';
  });

  showGen.style.display = `${display}`;
  highLightGen.style.background = `linear-gradient(80deg,var(--primary-color), var(--secondary-color))`;
  highLightGen.style.border = '1px solid var(--tertiary-color)';
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

// add event listener to generator icons

generators.forEach((generator) => {
  generator?.addEventListener('click', (): void => {
    const checking = generator.getAttribute('data-gen');
    if (checking === 'gradient-border') {
      generatorsFunction(checking);
    } else if (checking === null) {
      return;
    }
    sidebar.style.display = 'none';
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

// onClick event listener for the closebar icon
closeBar?.addEventListener('click', () => {
  sidebar.animate(sideBarSlideOut, sideBarTiming);
  sidebar.style.left = '100%';
  showResult(null);
  setTimeout(() => {
    sidebar.style.display = 'none';
  }, 600);
});

// display current gradient value for all range inputs
const displayGradientValue = (gradientElement: HTMLInputElement) => {
  gradientElement.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    const unitDisplayElement = <HTMLElement>(
      target.parentElement?.querySelector('.unit-display')
    );

    // change the unit for opacity
    const unit = titleDisplayElement.innerText.toLowerCase().includes('opacity')
      ? ''
      : 'deg';
    unitDisplayElement.innerText = `${target.value}${unit}`;
  });
};

gradientRangeInputs.forEach((gradientRangeInput: HTMLInputElement) => {
  displayGradientValue(gradientRangeInput);
});

for (let i = 0; i < gradientBackgroundInputs.length; i++) {
  gradientBackgroundInputs[i].addEventListener('input', () =>
    createGradientPreview(
      gradientBackgroundColor1,
      gradientBackgroundColor2,
      gradientBackgroundDegree,
      backgroundPreview
    )
  );
}

//set gradient border preview
for (let i = 0; i < gradientBorderInputs.length; i++) {
  gradientBorderInputs[i].addEventListener('input', () =>
    createGradientPreview(
      gradientBorderColor1,
      gradientBorderColor2,
      gradientBorderDegree,
      borderPreview
    )
  );
}

//set gradient text preview
for (let i = 0; i < gradientTextInputs.length; i++) {
  gradientTextInputs[i].addEventListener('input', () =>
    createGradientPreview(
      gradientTextColor1,
      gradientTextColor2,
      gradientTextDegree,
      textPreview
    )
  );
}

//create gradient preview
const createGradientPreview = (
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
