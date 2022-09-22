import * as utils from '../lib/general';
import copy from 'copy-to-clipboard';

let initial_length = 0;
let rule_added = false;
let css = '';

type Values = {
  type: string;
  degree: string;
  duration: string;
};

export function animationGenerator() {
  const attribute = 'animation';
  const DegreeElement = utils.getRange(attribute);
  const duration = utils.getInputSpinner(attribute);
  const radio_button_set = utils.getRadioButtonSet(attribute);

  const OutputElement = utils.getOutput(attribute);

  const Stylesheet = utils.getStyleSheet();
  const getCodeButtonElement = utils.getCopyCodeButton(attribute);
  initial_length = Stylesheet.cssRules.length - 1;

  initialConfiguration(radio_button_set, DegreeElement, OutputElement);

  if (OutputElement === null) return;

  let i = 0;

  for (i = 0; i < radio_button_set.length; i++)
    if (radio_button_set[i].checked) break;

  const values: Values = {
    type: radio_button_set[i].value,
    degree: DegreeElement.value,
    duration: duration.value,
  };
  manageAnimation(values, OutputElement, Stylesheet);

  getCodeButtonElement.addEventListener('click', () => {
    copy(css);
    utils.showPopup(
      'Code Copied',
      'Code has been successfully copied to clipboard',
      'success'
    );
  });
}

/**
 * sets the animation to the output element
 *
 * @param values object that contains all values entered by users
 * @param OutputElement output element to display result
 * @param stylesheet css stylesheet
 */
function manageAnimation(
  values: Values,
  OutputElement: HTMLElement,
  stylesheet: CSSStyleSheet
) {
  if (rule_added) {
    stylesheet.deleteRule(initial_length + 1);
    rule_added = false;
  }
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

    OutputElement.style.animation = `flickerAnimation ease-in`;
    OutputElement.style.animationDuration = `${values.duration}s`;
    rule_added = true;
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

    OutputElement.style.animation = `skewAnimation ease-in`;
    OutputElement.style.animationDuration = `${values.duration}s`;
    rule_added = true;
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

    OutputElement.style.animation = `turnaround ease-in`;
    OutputElement.style.animationDuration = `${values.duration}s`;

    rule_added = true;
  }
}

/**
 * sets the inital configuration of the elements
 *
 * @param elements radio elements
 * @param DegreeElement degree element
 * @param OutputElement output element to display result
 */
function initialConfiguration(
  elements: NodeListOf<HTMLInputElement>,
  DegreeElement: HTMLInputElement,
  OutputElement: HTMLElement
): void {
  if (OutputElement === null) return;
  OutputElement.style.display = 'flex';
  OutputElement.style.justifyContent = 'center';
  OutputElement.style.alignItems = 'center';
  OutputElement.style.fontSize = '1.1em';
  OutputElement.style.fontWeight = '700';

  OutputElement.innerText = 'Lorem Ipsum';

  elements.forEach((el) =>
    el.addEventListener('click', () => {
      const type = el.value;
      if (type === 'skew' || type === 'flip') {
        DegreeElement.min = '-90';
        DegreeElement.max = '90';
        DegreeElement.step = '1';
        DegreeElement.value = '50';
      } else {
        DegreeElement.min = '0';
        DegreeElement.max = '1';
        DegreeElement.step = '.1';
        DegreeElement.value = '.5';
      }
    })
  );
}
