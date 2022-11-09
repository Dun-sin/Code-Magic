// Generator Modules
import {picTextGenerator} from './pages/pic-text';
import {
  addGradientTextListener,
  gradientTextGenerator,
} from './pages/gradient-text';
import {
  gradientBorderGenerator,
  addGradientBorderListener,
} from './pages/gradient-border';
import {
  addGradientBackgroundListener,
  gradientBackgroundGenerator,
} from './pages/gradient-background';
import {addAnimationListener, animationGenerator} from './pages/animation';
import {
  addBorderRadiusListener,
  borderRadiusGenerator,
} from './pages/border-radius';
import {boxShadowGenerator, addBoxShadowListener} from './pages/box-shadow';
import {addTextShadowListener, textShadowGenerator} from './pages/text-shadow';
import {rangeGenerator} from './pages/input-range';

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
 * All types
 */
type Display = 'grid' | 'flex' | 'none';
type openResults = 'newResults' | 'oldResults' | null;

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
const getResultsButton = document.querySelectorAll('[data-button]');
const getResultIcon = document.querySelector('.open-sidebar');
const getHomePage = document.getElementById('home-page');
const getGeneratorSection = document.getElementById('generator');
const results = document.querySelectorAll('[data-result]');
const closeBar = document.getElementById('close-side-bar');
const getImageEntryElement = document.getElementById(
  `pic-text-file`
) as HTMLInputElement;
const navBar = document.querySelector('#nav');
const menuIcon = document.querySelector('#menu-icon');
const downloadButtons = document.querySelectorAll(
  '.image-download'
) as NodeListOf<HTMLElement>;

// get the element with data-button="open-side-panel" attribute and make it hidden
const openSidePanelButton = document.getElementsByClassName(
  'open-sidebar'
)[0] as HTMLElement;

if (openSidePanelButton) {
  openSidePanelButton.style.display = 'none';
}

if (!navigator.userAgent.match(/firefox|fxios/i)) {
  downloadButtons.forEach((item) => (item.style.display = 'none'));
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
 * sets which generator to call
 *
 * @param attribute - The attribute name of the generator element
 */
function generatorsFunction(attribute: string, type: openResults): void {
  switch (attribute) {
    case 'pic-text':
      picTextGenerator(imageSRC, imageHeight, type);
      break;
    case 'gradient-text':
      gradientTextGenerator(type);
      break;
    case 'gradient-border':
      gradientBorderGenerator(type);
      break;
    case 'gradient-background':
      gradientBackgroundGenerator(type);
      break;
    case 'animation':
      animationGenerator(type);
      break;
    case 'border-radius':
      borderRadiusGenerator(type);
      break;
    case 'box-shadow':
      boxShadowGenerator(type);
      break;
    case 'text-shadow':
      textShadowGenerator(type);
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
  const generatorsContent = document.querySelectorAll(`[data-content]`);
  const showGen = document.querySelector(
    `[data-content=${attribute}]`
  ) as HTMLElement;
  const highLightGen = document.querySelector(
    `[data-gen=${attribute}]`
  ) as HTMLElement;

  generatorsContent.forEach((item) => {
    const element = <HTMLElement>item;
    element.style.display = 'none';
  });
  generators.forEach((item) => {
    const generatorNav = <HTMLElement>item;
    generatorNav.style.border = 'none';
    generatorNav.style.background = 'none';
  });

  showGen.style.display = `${display}`;
  highLightGen.style.background = `linear-gradient(80deg,var(--primary-color), var(--secondary-color))`;
  highLightGen.style.border = '1px solid var(--tertiary-color)';

  switch (attribute) {
    case 'input-range':
      rangeGenerator();
      break;
    case 'gradient-border':
      addGradientBorderListener();
      break;
    case 'gradient-text':
      addGradientTextListener();
      break;
    case 'border-radius':
      addBorderRadiusListener();
      break;
    case 'text-shadow':
      addTextShadowListener();
      break;
    case 'box-shadow':
      addBoxShadowListener();
      break;
    case 'gradient-background':
      addGradientBackgroundListener();
      break;
    case 'animation':
      addAnimationListener();
      break;
  }
}

function showResult(attribute: string | null, type: openResults) {
  results.forEach((item) => {
    const element = <HTMLElement>item;
    if (element.getAttribute('data-result') === attribute) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
  if (attribute === null || type === null) return;

  generatorsFunction(attribute, type);
}

function openOrCloseNavigationBar(state: 'open' | 'close') {
  if (state === 'open') {
    navBar?.animate(navBarSlideIn, navBarAnimationOptions);
    navBar?.classList.remove('closed-nav');
    menuIcon?.setAttribute('icon', 'ci:close-big');
  } else if (state === 'close') {
    navBar?.animate(navBarSlideOut, navBarAnimationOptions);
    navBar?.classList.add('closed-nav');
    menuIcon?.setAttribute('icon', 'dashicons:menu-alt');
  }
}

document.addEventListener('click', (e: Event) => {
  const event = e.target as HTMLElement;

  const areasNotAllowedToCloseNavigationBar = {
    isNotNavigationBar: !event.matches('nav'),
    isNotDropDownLabel: !event.matches('.dropdown'),
    isNotMenuIcon: !event.matches('#menu-icon'),
    isParentNotDropDownLabel:
      !event.parentElement?.parentElement?.matches('.dropdown'),
    doesNotHaveAClosedClass: !navBar?.classList.contains('closed-nav'),
    isNotFooter: !event.matches('footer'),
  };

  const isAllValidationTrue = Object.values(
    areasNotAllowedToCloseNavigationBar
  ).every((value) => value === true);

  if (isAllValidationTrue) {
    openOrCloseNavigationBar('close');
  }
});

menuIcon?.addEventListener('click', () => {
  if (navBar?.classList.contains('closed-nav')) {
    openOrCloseNavigationBar('open');
  } else {
    openOrCloseNavigationBar('close');
  }
});

//event listener to clear styling on generator tabs when "Code magic is clicked"
getHeaderText?.addEventListener('click', () => {
  if (getHomePage === null || getGeneratorSection === null) return;
  generators.forEach((item) => {
    const generatorNav = <HTMLElement>item;
    generatorNav.style.border = 'none';
    generatorNav.style.background = 'none';
  });
  getHomePage.style.display = 'flex';
  getGeneratorSection.style.display = 'none';
});

getResultIcon?.addEventListener('click', () => {
  showResult(attributeValue, 'oldResults');
  sidebar.animate(sideBarSlide, sideBarTiming);
  sidebar.style.left = '0%';
});

// onClick event listener for the closebar icon
closeBar?.addEventListener('click', () => {
  sidebar.animate(sideBarSlideOut, sideBarTiming);
  sidebar.style.left = '100%';
  showResult(null, null);
  setTimeout(() => {
    sidebar.style.display = 'none';
  }, 600);
});

generators.forEach((generator) => {
  generator?.addEventListener('click', (): void => {
    const checking = generator.getAttribute('data-gen');
    openSidePanelButton.style.display = 'none';
    if (
      checking === null ||
      getHomePage === null ||
      getGeneratorSection === null
    )
      return;

    !navBar?.classList.contains('closed-nav') &&
      openOrCloseNavigationBar('close');

    sidebar.style.display = 'none';
    attributeValue = checking;
    getHomePage.style.display = 'none';
    getGeneratorSection.style.display = 'flex';
    showContent(attributeValue, 'flex');
  });
});

getResultsButton.forEach((getResult) => {
  getResult?.addEventListener('click', () => {
    openSidePanelButton.style.display = 'block';

    showResult(getResult.getAttribute('data-button'), 'newResults');
    sidebar.animate(sideBarSlide, sideBarTiming);
    sidebar.style.left = '0%';
  });
});

showResult(null, null);
