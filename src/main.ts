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
import {
  getGeneratorsElement,
  getOpenSideBarButton,
  getResultPage,
} from './lib/getElements';

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

const generators = getGeneratorsElement();
const sidebar = getResultPage();
const openSidePanelButton = getOpenSideBarButton();

const getHeaderText = document.getElementById('head');
const getResultsButton = document.querySelectorAll('[data-button]');
const getHomePage = document.getElementById('home-page');
const getGeneratorSection = document.getElementById('generator');
const getOpenPreviousResult = document.querySelector(
  '.open > p'
) as HTMLElement;
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
 * @param attribute The attribute name of the generator element
 * @param type type of result to get back
 */
function generatorsFunction(attribute: string, type: openResults): void {
  // function to call based on generator
  attribute === 'pic-text' && picTextGenerator(imageSRC, imageHeight, type);
  attribute === 'gradient-text' && gradientTextGenerator(type);
  attribute === 'gradient-border' && gradientBorderGenerator(type);
  attribute === 'gradient-background' && gradientBackgroundGenerator(type);
  attribute === 'animation' && animationGenerator(type);
  attribute === 'border-radius' && borderRadiusGenerator(type);
  attribute === 'box-shadow' && boxShadowGenerator(type);
  attribute === 'text-shadow' && textShadowGenerator(type);
}

/**
 * use to toggle visibility of content in generators
 *
 * @param attribute The attribute name of the generator element
 * @param display display type
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
    console.log(item);
  });

  generators.forEach((item) => {
    const generatorNav = <HTMLElement>item;
    generatorNav.style.border = 'none';
    generatorNav.style.background = 'none';
    console.log(item.style.visibility);
  });

  showGen.style.display = `${display}`;
  highLightGen.style.background = `linear-gradient(80deg,var(--primary-color), var(--secondary-color))`;
  highLightGen.style.border = '1px solid var(--tertiary-color)';
  highLightGen.style.visibility = 'visible';

  // function to call based on generator
  attribute === 'input-range' && rangeGenerator();
  attribute === 'gradient-border' && addGradientBorderListener();
  attribute === 'gradient-text' && addGradientTextListener();
  attribute === 'border-radius' && addBorderRadiusListener();
  attribute === 'text-shadow' && addTextShadowListener();
  attribute === 'box-shadow' && addBoxShadowListener();
  attribute === 'gradient-background' && addGradientBackgroundListener();
  attribute === 'animation' && addAnimationListener();
}

/**
 * Which generator result should show
 *
 * @param attribute The attribute name of the generator element
 * @param type type of result to get back
 */
function showResult(attribute: string | null, type: openResults): void {
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

/**
 * Control Visibility of the Navigation Bar
 *
 * @param state state of visibility
 */
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

function showOpenPreviousResultText() {
  getOpenPreviousResult.style.display = 'block';
  getOpenPreviousResult.style.animationName = 'showOpenPreviousResultText';
  getOpenPreviousResult.style.animationDuration = '1500ms';
  getOpenPreviousResult.style.animationTimingFunction = 'ease-in';
  getOpenPreviousResult.style.animationFillMode = 'backwards';
}

// clicking outside the nav bar should close the nav abr
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

// clicking on the menu icon should close the nav bar
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

// clicking on the get result icon should show the old results
openSidePanelButton?.addEventListener('click', () => {
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

  setTimeout(() => {
    showOpenPreviousResultText();
  }, 200);
});

// adds event listner for which generator should show
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

//  event listener for get result button
getResultsButton.forEach((getResult) => {
  getResult?.addEventListener('click', () => {
    openSidePanelButton.style.display = 'flex';

    showResult(getResult.getAttribute('data-button'), 'newResults');
    sidebar.animate(sideBarSlide, sideBarTiming);
    sidebar.style.left = '0%';
  });
});

showResult(null, null);
