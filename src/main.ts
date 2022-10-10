// Generator Modules
import {picTextGenerator} from './pages/pic-text';
import {gradientTextGenerator} from './pages/gradient-text';
import {gradientBorderGenerator} from './pages/gradient-border';
import {gradientBackgroundGenerator} from './pages/gradient-background';
import {animationGenerator} from './pages/animation';
import {borderRadiusGenerator} from './pages/border-radius';
import {boxShadowGenerator} from './pages/box-shadow';

// Utils
import {
  createGradientPreview,
  gradientElementInputs,
  gradientPreview,
  getColorInput1,
  getColorInput2,
  getRange,
  getCheckbox,
  getRadiusInput,
} from './lib/general';

// Packages
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

const navBarSlideIn = [
  {left: '-50%', opacity: '0'},
  {left: '0%', opacity: '1'},
];

const navBarSlideOut = [
  {left: '0%', opacity: '1'},
  {left: '-50%', opacity: '0'},
];

const navBarAnimationOptions = {
  duration: 300,
  iterations: 1,
  easing: 'ease',
};

// Elements
const generators = document.querySelectorAll('[data-gen]');
const sidebar = document.querySelector('.side-results') as HTMLElement;
const getHeaderText = document.getElementById('head');
const getResults = document.querySelectorAll('[data-button]');
const getHomePage = document.getElementById('home-page');
const getGeneratorSection = document.getElementById('generator');
const results = document.querySelectorAll('[data-result]');
const closeBar = document.getElementById('close-side-bar');
const getImageEntryElement = document.getElementById(
  `pic-text-file`
) as HTMLInputElement;
const navBar = document.querySelector('#nav');
const menuIcon = document.querySelector('#menu-icon');

//gradient text color elements
const gradientTextInputs = gradientElementInputs('gradient-text');
const textPreview = gradientPreview('gradient-text');
const gradientTextColor1 = getColorInput1('gradient-text');
const gradientTextColor2 = getColorInput2('gradient-text');
const gradientTextDegree = getRange('gradient-text');

//gradient border color element
const gradientBorderInputs = gradientElementInputs('gradient-border');
const borderPreview = gradientPreview('gradient-border');
const gradientBorderColor1 = getColorInput1('gradient-border');
const gradientBorderColor2 = getColorInput2('gradient-border');
const gradientBorderDegree = getRange('gradient-border');

const gradientBorderRadius = getCheckbox('gradient-border');
const gradientBorderInput = getRadiusInput('gradient-border');

//gradient background color elements
const gradientBackgroundInputs = gradientElementInputs('gradient-background');
const backgroundPreview = gradientPreview('gradient-background');
const gradientBackgroundColor1 = getColorInput1('gradient-background');
const gradientBackgroundColor2 = getColorInput2('gradient-background');
const gradientBackgroundDegree = getRange('gradient-background');

// get all range inputs
const gradientRangeInputs = document.querySelectorAll('.degree-range');

// get title display element for animation
const titleDisplayElement = <HTMLElement>(
  document.querySelector('.title-display')
);

// border radius elements

const borderRadiusInputs = document.querySelectorAll('.border-radius-inputs');
const borderTop = <HTMLInputElement>(
  document.querySelector('#border-radius-top')
);
const borderLeft = <HTMLInputElement>(
  document.querySelector('#border-radius-left')
);
const borderBottom = <HTMLInputElement>(
  document.querySelector('#border-radius-bottom')
);
const borderRight = <HTMLInputElement>(
  document.querySelector('#border-radius-right')
);

const borderRadiusPreview = <HTMLElement>(
  document.querySelector('.border-radius-preview-box > .preview')
);

menuIcon?.addEventListener('click', () => {
  if (navBar?.classList.contains('closed-nav')) {
    navBar?.animate(navBarSlideIn, navBarAnimationOptions);
    navBar?.classList.remove('closed-nav');
    menuIcon?.setAttribute('icon', 'ci:close-big');
  } else {
    navBar?.animate(navBarSlideOut, navBarAnimationOptions);
    navBar?.classList.add('closed-nav');
    menuIcon?.setAttribute('icon', 'dashicons:menu-alt');
  }
});

const menu = document.querySelector('.menu') as HTMLElement;
const body = document.querySelector('body') as HTMLElement;

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
    if (!navBar?.classList.contains('closed-nav')) {
      navBar?.animate(navBarSlideOut, navBarAnimationOptions);
    }
    navBar?.classList.add('closed-nav');
    menuIcon?.setAttribute('icon', 'dashicons:menu-alt');
  });
}

FilePond.create(getImageEntryElement, {
  imagePreviewMaxHeight: 200,

  labelIdle:
    window.innerWidth < 768
      ? '<span class="filepond--label-action">Browse</span>'
      : 'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',

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
    case 'border-radius':
      borderRadiusGenerator();
      break;
    case 'box-shadow':
      boxShadowGenerator();
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
  const showGen = document.querySelector(
    `[data-content=${attribute}]`
  ) as HTMLElement;
  const highLightGen = document.querySelector(
    `[data-gen=${attribute}]`
  ) as HTMLElement;

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

//event listener to clear styling on generator tabs when "Code magic is clicked"
document.getElementById('head')?.addEventListener('click', () => {
  const generatorsNav = document.querySelectorAll(`[data-gen]`);
  generatorsNav.forEach((item) => {
    const generatorNav = <HTMLElement>item;
    generatorNav.style.border = 'none';
    generatorNav.style.background = 'none';
  });
});

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

getHeaderText?.addEventListener('click', () => {
  if (getHomePage === null || getGeneratorSection === null) return;
  getHomePage.style.display = 'flex';
  getGeneratorSection.style.display = 'none';
});

generators.forEach((generator) => {
  generator?.addEventListener('click', (): void => {
    const checking = generator.getAttribute('data-gen');

    if (
      checking === null ||
      getHomePage === null ||
      getGeneratorSection === null
    )
      return;
    sidebar.style.display = 'none';
    attributeValue = checking;
    getHomePage.style.display = 'none';
    getGeneratorSection.style.display = 'flex';
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
  gradientBackgroundInputs[i].addEventListener('change', () =>
    createGradientPreview(
      gradientBackgroundColor1,
      gradientBackgroundColor2,
      gradientBackgroundDegree,
      backgroundPreview
    )
  );
}

// on change event handler for border radius generator range inputs

for (let i = 0; i < borderRadiusInputs.length; i++) {
  borderRadiusInputs[i].addEventListener('change', () =>
    BorderRadiusGenerator(
      borderTop,
      borderLeft,
      borderBottom,
      borderRight,
      borderRadiusPreview
    )
  );
}

//set gradient border preview
for (let i = 0; i < gradientBorderInputs.length; i++) {
  gradientBorderInputs[i].addEventListener('change', () =>
    createGradientPreview(
      gradientBorderColor1,
      gradientBorderColor2,
      gradientBorderDegree,
      borderPreview
    )
  );
}

for (let i = 0; i < gradientTextInputs.length; i++) {
  gradientTextInputs[i].addEventListener('change', () =>
    createGradientPreview(
      gradientTextColor1,
      gradientTextColor2,
      gradientTextDegree,
      textPreview
    )
  );
}

// border radius generator preview

const BorderRadiusGenerator = (
  borderTop: HTMLInputElement,
  borderLeft: HTMLInputElement,
  borderBottom: HTMLInputElement,
  borderRight: HTMLInputElement,
  borderRadiusPreview: HTMLElement
) => {
  borderRadiusPreview.style.borderRadius = `
    ${borderTop.value}% ${100 - Number(borderTop.value)}%
    ${borderBottom.value}% ${100 - Number(borderBottom.value)}% /
    ${borderLeft.value}% ${borderRight.value}%
    ${100 - Number(borderRight.value)}% ${100 - Number(borderLeft.value)}%`;
};

//Toggle gradient border radius input display
gradientBorderRadius.addEventListener('change', function () {
  gradientBorderInput.style.display = this.checked ? 'inline' : 'none';
});