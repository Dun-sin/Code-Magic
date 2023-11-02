import {
  getAllFields,
  getDegreeSpanElement,
  getInputSpinner,
  getOutput,
  getPreviewSlider,
  getRadioButtonSet,
  getRange,
  getResetButton,
  getResultPage,
  getStyleSheet,
} from '../lib/getElements';
import {
  setGradientDegreeValue,
  slideIn,
  stateManager,
} from '../lib/packages/utils';

let initial_length = 0;
// let rule_added = false;
let isAnimationSliderOpen = false;
let css = '';
let tailwindCss = '';

type Values = {
  type: string;
  degree: string;
  duration: string;
};

const attribute = 'animation';

const getOutputElement = getOutput(attribute);
const getDegreeElement = getRange(attribute);
const getRadioButtonSetElement = getRadioButtonSet(attribute);

const preview = getPreviewSlider(attribute);

// closes css and tailwind dropdown on outside click

initialConfiguration(getOutputElement);

export function animationGenerator(type: 'newResults' | 'oldResults' | null) {
  if (type === null) return;

  const duration = getInputSpinner(attribute);

  const Stylesheet = getStyleSheet();
  const resultPage = getResultPage();

  resultPage.style.display = 'flex';

  initial_length = Stylesheet.cssRules.length - 1;

  if (getOutputElement === null || type === 'oldResults') return;

  let i = 0;

  for (i = 0; i < getRadioButtonSetElement.length; i++)
    if (getRadioButtonSetElement[i].checked) break;

  const values: Values = {
    type: getRadioButtonSetElement[i].value,
    degree: getDegreeElement.value,
    duration: duration.value,
  };

  manageAnimation(values, getOutputElement, Stylesheet);
  stateManager.setState('animation-code', css);
  manageTailwindAnimation(values);
  stateManager.setState('animation-tailwind', tailwindCss);
}

// configuring animation preview
export function displayAnimationPreview() {
  slideIn(preview, isAnimationSliderOpen);
  isAnimationSliderOpen = true;

  if (preview.getAttribute('data-running') !== 'true') {
    const duration = getInputSpinner(attribute);

    const Stylesheet = getStyleSheet();

    let i = 0;

    for (i = 0; i < getRadioButtonSetElement.length; i++)
      if (getRadioButtonSetElement[i].checked) break;

    const values: Values = {
      type: getRadioButtonSetElement[i].value,
      degree: getDegreeElement.value,
      duration: duration.value,
    };

    // only updating preview animation if no current animation is running
    preview.onanimationend = () => {
      preview.setAttribute('data-running', 'false');
      preview.style.animation = '';
      Stylesheet.deleteRule(initial_length + 1);
    };

    preview.setAttribute('data-running', 'true');
    manageAnimation(values, preview, Stylesheet);
  }
}

/**
 * sets the animation to the output element
 *
 * @param values object that contains all values entered by users
 * @param getOutputElement output element to display result
 * @param stylesheet css stylesheet
 */
function manageAnimation(
  values: Values,
  getOutputElement: HTMLElement,
  stylesheet: CSSStyleSheet
) {
  // if (rule_added) {
  //   stylesheet.deleteRule(initial_length + 1);
  //   rule_added = false;
  // }
  if (values.type === 'fade') {
    css =
      `/*Copy and paste keyframe into your css file, and apply the animation property in the element of your choice*/\n` +
      `@keyframes flickerAnimation { \n` +
      `0%   { opacity:${values.degree}; }\n` +
      `50%  { opacity:0; }\n` +
      `100% { opacity:${values.degree}; }\n` +
      `}\n` +
      `animation: flickerAnimation ${values.duration}s infinite;`;
    stylesheet.insertRule(
      `@keyframes flickerAnimation { \n` +
        `0%   { opacity:${values.degree}; }\n` +
        `50%  { opacity:0; }\n` +
        `100% { opacity:${values.degree}; }\n` +
        `}`,
      initial_length + 1
    );

    getOutputElement.style.animation = `flickerAnimation ease-in`;
    getOutputElement.style.animationDuration = `${values.duration}s`;
  } else if (values.type === 'skew') {
    css =
      `/*Copy and paste keyframe into your css file, and apply the animation property in the element of your choice*/\n` +
      `@keyframes skewAnimation { \n` +
      `0%   { transform:skew(${values.degree}deg); }\n` +
      `50%  { transform:skew(0deg); }\n` +
      `100% { transform:skew(${values.degree}deg); }\n` +
      `}\n` +
      `animation:skewAnimation ${values.duration}s infinite;`;

    stylesheet.insertRule(
      `@keyframes skewAnimation { \n` +
        `0%   { transform:skew(${values.degree}deg); }\n` +
        `50%  { transform:skew(0deg); }\n` +
        `100% { transform:skew(${values.degree}deg); }\n` +
        `}`,
      initial_length + 1
    );

    getOutputElement.style.animation = `skewAnimation ease-in`;
    getOutputElement.style.animationDuration = `${values.duration}s`;
    // rule_added = true;
  } else if (values.type === 'flip') {
    css =
      `/*Copy and paste keyframe into your css file, and apply the animation property in the element of your choice*/\n` +
      `@keyframes turnaround { \n` +
      `0%   { transform:rotateY(${values.degree}deg); }\n` +
      `50%  { transform:rotateY(0deg); }\n` +
      `100% { transform:rotateY(${values.degree}deg); }\n` +
      `}\n` +
      `animate: turnaround ${values.duration}s infinite`;

    stylesheet.insertRule(
      `@keyframes turnaround { \n` +
        `0%   { transform:rotateY(${values.degree}deg); }\n` +
        `50%  { transform:rotateY(0deg); }\n` +
        `100% { transform:rotateY(${values.degree}deg); }\n` +
        `}`,
      initial_length + 1
    );

    getOutputElement.style.animation = `turnaround ease-in`;
    getOutputElement.style.animationDuration = `${values.duration}s`;

    // rule_added = true;
  } else if (values.type === 'rotate') {
    css =
      `/*Copy and paste keyframe into your css file, and apply the animation property in the element of your choice*/\n` +
      `@keyframes rotate { \n` +
      `0%   { transform:rotate(0deg); }\n` +
      `100% { transform:rotate(${values.degree}deg); }\n` +
      `}\n` +
      `animate: rotate ${values.duration}s infinite`;

    stylesheet.insertRule(
      `@keyframes rotate { \n` +
        `0%   { transform:rotate(0deg); }\n` +
        `100% { transform:rotate(${values.degree}deg); }\n` +
        `}`,
      initial_length + 1
    );

    getOutputElement.style.animation = `rotate ease-in`;
    getOutputElement.style.animationDuration = `${values.duration}s`;
  }
}

/**
 * sets the inital configuration of the elements
 *
 * @param elements radio elements
 * @param getDegreeElement degree element
 * @param getOutputElement output element to display result
 */
function initialConfiguration(getOutputElement: HTMLElement): void {
  if (getOutputElement === null) return;
  getOutputElement.style.display = 'flex';
  getOutputElement.style.justifyContent = 'center';
  getOutputElement.style.alignItems = 'center';
  getOutputElement.style.fontSize = '1.1em';
  getOutputElement.style.fontWeight = '700';
  getOutputElement.innerText = 'Lorem Ipsum';
}

export function addAnimationListener() {
  setGradientDegreeValue(getDegreeElement);
}

export function resetAnimationValues() {
  const {inputs} = getAllFields(attribute);

  inputs.forEach((input) => {
    input.value = input.defaultValue;
    input.checked = input.defaultChecked;
  });

  getDegreeSpanElement(attribute).innerHTML = 'deg';
  getResetButton(attribute).classList.remove('reset-show');
}

// get values from all targets to get notified when values change.

function getValues() {
  const {inputs} = getAllFields(attribute);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (
        inputs[4].value !== inputs[4].defaultValue ||
        input.checked !== input.defaultChecked ||
        inputs[5].value !== inputs[5].defaultValue
      ) {
        getResetButton(attribute).classList.add('reset-show');
      }
    });
  });
}
getValues();

// Function to get tailwind styles for animation
function manageTailwindAnimation(values: Values) {
  // if (rule_added) {
  //   stylesheet.deleteRule(initial_length + 1);
  //   rule_added = false;
  // }
  if (values.type === 'fade') {
    tailwindCss = ``;
  } else if (values.type === 'skew') {
    tailwindCss = ``;
    // rule_added = true;
  } else if (values.type === 'flip') {
    tailwindCss = ``;
    // rule_added = true;
  } else if (values.type === 'rotate') {
    tailwindCss = ``;
  }
}
