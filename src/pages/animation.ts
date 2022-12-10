import copy from 'copy-to-clipboard';
import {
  getCopyCodeButton,
  getOutput,
  getRange,
  getInputSpinner,
  getStyleSheet,
  getResultPage,
  getRadioButtonSet,
} from '../lib/getElements';
import {showPopup, setGradientDegreeValue} from '../lib/packages';

let initial_length = 0;
// let rule_added = false;
let css = '';

type Values = {
  type: string;
  degree: string;
  duration: string;
};

const attribute = 'animation';
const getCodeButtonElement = getCopyCodeButton(attribute);

const getOutputElement = getOutput(attribute);
const getDegreeElement = getRange(attribute);
const getRadioButtonSetElement = getRadioButtonSet(attribute);

initialConfiguration(
  getRadioButtonSetElement,
  getDegreeElement,
  getOutputElement
);

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

  getCodeButtonElement.addEventListener('click', () => {
    copy(css);
    showPopup(
      'Code Copied',
      'Code has been successfully copied to clipboard',
      'success'
    );
  });
  manageAnimation(values, getOutputElement, Stylesheet);
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
function initialConfiguration(
  elements: NodeListOf<HTMLInputElement>,
  getDegreeElement: HTMLInputElement,
  getOutputElement: HTMLElement
): void {
  if (getOutputElement === null) return;
  getOutputElement.style.display = 'flex';
  getOutputElement.style.justifyContent = 'center';
  getOutputElement.style.alignItems = 'center';
  getOutputElement.style.fontSize = '1.1em';
  getOutputElement.style.fontWeight = '700';

  getOutputElement.innerText = 'Lorem Ipsum';

  // get the unit display element for animator
  const unitDisplayElement = document.querySelector(
    '.unit-display.animation'
  ) as HTMLElement;

  const titleDisplayElement = document.querySelector(
    '.title-display'
  ) as HTMLElement;

  elements.forEach((el) =>
    el.addEventListener('click', () => {
      const type = el.value;
      if (type === 'skew' || type === 'flip') {
        getDegreeElement.min = '-90';
        getDegreeElement.max = '90';
        getDegreeElement.step = '1';
        getDegreeElement.value = '50';
        unitDisplayElement.innerText = `${getDegreeElement.value}deg`;
        titleDisplayElement.innerText = 'Angle';
      } else if (type === 'rotate') {
        getDegreeElement.min = '0';
        getDegreeElement.max = '360';
        getDegreeElement.step = '1';
        getDegreeElement.value = '45';
        unitDisplayElement.innerText = `${getDegreeElement.value}deg`;
        titleDisplayElement.innerText = 'Degrees';
      } else {
        getDegreeElement.min = '0';
        getDegreeElement.max = '1';
        getDegreeElement.step = '.1';
        getDegreeElement.value = '.5';
        unitDisplayElement.innerText = `${getDegreeElement.value}`;
        titleDisplayElement.innerText = 'Opacity';
      }
    })
  );
}

export function addAnimationListener() {
  setGradientDegreeValue(getDegreeElement);
}
