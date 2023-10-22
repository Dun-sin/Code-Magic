// Includes all functions that the utils functions use

import copy from 'copy-to-clipboard';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Eggy} from '@s-r0/eggy-js';
import {
  getColumnGap,
  getNumberOfColumns,
  getNumberOfRows,
  getRowGap,
} from '../getElements';

export function createDownloadLink(fileName: string, url: string) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  return link;
}

/**
 * what should copy when the copy css button is clicked
 *
 * @param attribute attribute of the clicked generator
 * @param outputElement output element to display result
 */
export const actOnGenerator = (
  attribute: string,
  outputElement: HTMLElement
) => {
  let codeToCopy = '';
  let element;

  switch (attribute) {
    case 'pic-text':
      codeToCopy = `
    div {
      background-position: ${outputElement.style.backgroundPosition};
      background-size: ${outputElement.style.backgroundSize};
      background-repeat: ${outputElement.style.backgroundRepeat};
      background-clip: ${outputElement.style.backgroundClip};
      -webkit-background-clip: ${outputElement.style.webkitBackgroundClip};
      -webkit-text-fill-color: ${outputElement.style.webkitTextFillColor};
    }
  `;
      break;
    case 'gradient-text':
      codeToCopy = `
      p{	
        font-size: ${(outputElement.children[0] as HTMLElement).style.fontSize};
        background: ${
          (outputElement.children[0] as HTMLElement).style.background
        };
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      `;

      break;
    case 'gradient-border':
      element = outputElement.style;
      const content = window.getComputedStyle(outputElement, '::before');

      codeToCopy = `
        div {
          position: relative;
        }

        div::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background: ${content.background};
          background-clip: 'border-box';
          ${
            content.borderRadius !== '0px'
              ? `border-radius: ${content.borderRadius};`
              : ''
          }
        }
      `;
      break;
    case 'gradient-background':
      element = outputElement.style;
      codeToCopy = `
        div {
          height: 100px;
          width: 100px;
          background: ${element.backgroundImage};
        }
      `;
      break;
    case 'border-radius':
      element = outputElement.style;
      codeToCopy = `
          border-radius: ${element.borderRadius};
      `;
      break;
    case 'box-shadow':
      element = outputElement.style;
      codeToCopy = `
        div {
          height: 300px;
          width: 300px;
          box-shadow: ${element.boxShadow};
        }
      `;
      break;
    case 'text-shadow':
      element = outputElement.style;
      codeToCopy = `
        div {
          text-shadow: ${element.textShadow};
        }
      `;
      break;
    case 'input-range':
      element = outputElement.style;
      codeToCopy = `
      input[type='range'] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;
        width: ${element.getPropertyValue('--preview-track-width')};
      }

      input[type='range']::-webkit-slider-runnable-track {
        background-color: ${element.getPropertyValue('--preview-track-color')};
        height: ${element.getPropertyValue('--preview-track-height')};
        width: 100%;
        border-radius: ${element.getPropertyValue('--preview-track-radius')};
      }

      input[type='range']::-moz-range-track {
        background-color: ${element.getPropertyValue('--preview-track-color')};
        height: ${element.getPropertyValue('--preview-track-height')};
        width: 100%;
        border-radius: ${element.getPropertyValue('--preview-track-radius')};
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: ${element.getPropertyValue('--preview-thumb-color')};
        height: ${element.getPropertyValue('--preview-thumb-height')};
        width: ${element.getPropertyValue('--preview-thumb-width')};
        margin-top: -3.2px;
        border-radius: ${element.getPropertyValue('--preview-thumb-radius')};
      }

      input[type='range']::-moz-range-thumb {
        border: none;
        background-color: ${element.getPropertyValue('--preview-thumb-color')};
        height: ${element.getPropertyValue('--preview-thumb-height')};
        width: ${element.getPropertyValue('--preview-thumb-width')};
        border-radius: ${element.getPropertyValue('--preview-thumb-radius')};
      }

      input[type='range']:focus {
        outline: none;
      }
      `;
      break;
    case 'grid-generators':
      element = outputElement.style;
      codeToCopy = `
      div {
      height: 300px;
      width: 300px;
      display:${element.display},
      grid-template-rows:${element.gridTemplateRows},
      grid-template-columns:${element.gridTemplateColumns},
      row-gap:${element.rowGap},
      column-gap:${element.columnGap}
    }
    `;
      break;
    default:
      codeToCopy = `
          Couldn't copy, please try again :(
        `;
  }

  try {
    copy(codeToCopy);
  } catch {
    Eggy({
      title: `Whoops`,
      message: `Can't copy, try again`,
      type: 'error',
    });
  }
};

function convertLinearGradientToTailwind(gradient: string): string {
  const angle = extractDegreeFromGradient(gradient);
  const direction = getTailwindDirectionClass(angle);
  const rbgColors = extractRGBColorsFromGradient(gradient);
  const gradientClass = generateTailwindClasses(rbgColors);

  return `bg-gradient-${direction} ${gradientClass}`;

  function extractDegreeFromGradient(gradient: string): number {
    const regex = /linear-gradient\((\d+)deg/;
    const match = gradient.match(regex);

    if (match) {
      const degree = parseInt(match[1]);
      return degree;
    }

    return 0;
  }

  function getTailwindDirectionClass(angle: number) {
    const gradientDirections = [
      {angle: 0, class: 'to-r'},
      {angle: 45, class: 'to-tr'},
      {angle: 90, class: 'to-t'},
      {angle: 135, class: 'to-tl'},
      {angle: 180, class: 'to-l'},
      {angle: 225, class: 'to-bl'},
      {angle: 270, class: 'to-b'},
      {angle: 315, class: 'to-br'},
    ];

    const closest = gradientDirections.reduce((prev, curr) => {
      return Math.abs(curr.angle - angle) < Math.abs(prev.angle - angle)
        ? curr
        : prev;
    });
    return closest.class;
  }

  function rgbToHex(rgb: string): string {
    const regex = /rgb\((\d+), (\d+), (\d+)\)/;
    const match = rgb.match(regex);

    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }

    return '';
  }

  function extractRGBColorsFromGradient(gradient: string): string[] {
    const regex = /rgb\(\d+, \d+, \d+\)/g;
    const matches = gradient.match(regex);

    if (matches) {
      return matches.map((rgb) => rgbToHex(rgb));
    }

    return [];
  }

  function generateTailwindClasses(colors: string[]): string {
    if (colors.length === 2) {
      return `from-[${colors[0]}] to-[${colors[1]}]`;
    } else if (colors.length === 3) {
      return `from-[${colors[0]}] via-[${colors[1]}] to-[${colors[2]}]`;
    } else if (colors.length === 4) {
      return `from-[${colors[0]}] via-[${colors[1]}] via-[${colors[2]}] to-[${colors[3]}]`;
    }

    return '';
  }
}

function convertInputRangeStylesToTailwind(element: CSSStyleDeclaration) {
  const tailwindClasses = [];

  tailwindClasses.push(`appearance-none`);

  // Track height
  if (element.getPropertyValue('--preview-track-height')) {
    const trackHeight = element.getPropertyValue('--preview-track-height');

    tailwindClasses.push(
      `[&::-webkit-slider-runnable-track]:h-[${trackHeight}] h-[${trackHeight}]`
    );
  }

  // Track width
  if (element.getPropertyValue('--preview-track-width')) {
    const trackWidth = element.getPropertyValue('--preview-track-width');

    tailwindClasses.push(
      `[&::-webkit-slider-runnable-track]:w-[${trackWidth}] w-[${trackWidth}]`
    );
  }

  // Track radius
  if (element.getPropertyValue('--preview-track-radius')) {
    const trackRadius = element.getPropertyValue('--preview-track-radius');

    tailwindClasses.push(
      `[&::-webkit-slider-runnable-track]:rounded-[${trackRadius}] rounded-[${trackRadius}]`
    );
  }

  // Thumb height
  if (element.getPropertyValue('--preview-thumb-height')) {
    const thumbHeight = element.getPropertyValue('--preview-thumb-height');

    tailwindClasses.push(
      `[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:mt-[-3.2px] [&::-webkit-slider-thumb]:h-[${thumbHeight}] [&::-moz-range-thumb]:h-[${thumbHeight}]`
    );
  }

  // Thumb width
  if (element.getPropertyValue('--preview-thumb-width')) {
    const thumbWidth = element.getPropertyValue('--preview-thumb-width');

    tailwindClasses.push(
      `[&::-webkit-slider-thumb]:w-[${thumbWidth}] [&::-moz-range-thumb]:w-[${thumbWidth}]`
    );
  }

  // Thumb radius
  if (element.getPropertyValue('--preview-thumb-radius')) {
    const thumbRadius = element.getPropertyValue('--preview-thumb-radius');

    tailwindClasses.push(
      `[&::-webkit-slider-thumb]:rounded-[${thumbRadius}] [&::-moz-range-thumb]:rounded-[${thumbRadius}]`
    );
  }

  // Thumb color
  if (element.getPropertyValue('--preview-thumb-color')) {
    const thumbColor = element.getPropertyValue('--preview-thumb-color');

    tailwindClasses.push(
      `[&::-webkit-slider-thumb]:bg-[${thumbColor}] [&::-moz-range-thumb]:bg-[${thumbColor}]`
    );
  }

  // Track color
  if (element.getPropertyValue('--preview-track-color')) {
    const trackColor = element.getPropertyValue('--preview-track-color');

    tailwindClasses.push(
      `[&::-webkit-slider-runnable-track]:bg-[${trackColor}] bg-[${trackColor}]`
    );
  }

  return tailwindClasses.join(' ');
}

function convertGridSylesToTailwind(attribute: string) {
  let result = 'grid';
  const noOfColumns = getNumberOfColumns(attribute).value;
  const noOfRows = getNumberOfRows(attribute).value;
  const columnGapValue = getColumnGap(attribute).value;
  const rowGapValue = getRowGap(attribute).value;
  const rows = parseInt(noOfRows !== '' ? noOfRows : '0');
  const columns = parseInt(noOfColumns !== '' ? noOfColumns : '0');
  const rowGap = parseInt(rowGapValue !== '' ? rowGapValue : '0');
  const columnGap = parseInt(columnGapValue !== '' ? columnGapValue : '0');
  if (rows > 0 || columns > 0 || rowGap > 0 || columnGap > 0) {
    result = `${result} grid-rows-${rows} grid-cols-${columns} gap-x-${rowGap} gap-y-${columnGap}`;
  } else {
    result = `${result} gap-x-0 gap-y-0`;
  }
  return result;
}

/**
 * what should copy when the copy Tailwind button is clicked
 *
 * @param attribute attribute of the clicked generator
 * @param outputElement output element to display result
 */
export const actOnTailwindGenerator = (
  attribute: string,
  outputElement: HTMLElement
) => {
  let element = outputElement.style;
  let codeToCopy = '';
  switch (attribute) {
    case 'pic-text':
      codeToCopy = ``;
      break;
    case 'gradient-text':
      const output = outputElement.children[0] as HTMLElement;

      codeToCopy = `text-[${
        output.style.fontSize
      }] ${convertLinearGradientToTailwind(
        output.style.backgroundImage
      )} text-transparent bg-clip-text`;
      break;
    case 'gradient-border':
      codeToCopy = ``;
      break;
    case 'gradient-background':
      codeToCopy = `${convertLinearGradientToTailwind(
        element.backgroundImage
      )}`;
      break;
    case 'border-radius':
      codeToCopy = `bg-[${element.borderRadius.replace(/ /g, '_')}]`;
      break;
    case 'box-shadow':
      codeToCopy = `shadow-[${element.boxShadow.replace(/ /g, '_')}]`;
      break;
    case 'text-shadow':
      codeToCopy = `[text-shadow:${element.textShadow.replace(/[\s,]/g, '_')}]`;
      break;
    case 'input-range':
      codeToCopy = `${convertInputRangeStylesToTailwind(element)}`;
      break;
    case 'grid-generators':
      codeToCopy = `${convertGridSylesToTailwind(attribute)}`;
      break;
    default:
      codeToCopy = `
          Couldn't copy, please try again :(
        `;
  }

  try {
    copy(codeToCopy);
  } catch {
    Eggy({
      title: `Whoops`,
      message: `Can't copy, try again`,
      type: 'error',
    });
  }
};
