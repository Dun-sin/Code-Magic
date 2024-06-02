import copy from 'copy-to-clipboard';

import {
  getAllColorInput,
  getCopyCodeButton,
  getCssOrTailwindButton,
  getCssOrTailwindDropdown,
} from '../lib/getElements';
import {closeDropdown, showPopup} from '../lib/packages/utils';

type Values = {
  trackColor: string;
  thumbColor: string;
  hoverColor: string;
  width: string;
};

const attribute = 'scroll';
const getCssOrTailwindDropdownElement = getCssOrTailwindDropdown(attribute);
const showCopyClass = 'show-css-tailwind';

function getCssOrTailwind(e?: MouseEvent): void {
  e?.stopPropagation();
  getCssOrTailwindDropdownElement.classList.toggle(showCopyClass);
}

// closes css and tailwind dropdown on outside click
closeDropdown(getCssOrTailwind, getCssOrTailwindDropdownElement, showCopyClass);

function doInputsExist() {
  const [trackColor, thumbColor, hoverColor] = Array.from(
    getAllColorInput(attribute)
  );
  const width = document.querySelector('#scroll-width') as HTMLInputElement;

  const isColorFilled =
    trackColor.value && thumbColor.value && hoverColor.value;

  if (isColorFilled && width.value) return true;

  showPopup("Couldn't Copy Code", 'Some input value may be missing', 'error');
  return false;
}

function copyHandler(values: Values) {
  if (doInputsExist() === false) return;

  copy(`
    /* width */
    ::-webkit-scrollbar {
      width: ${values.width}px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px ${values.trackColor};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${values.thumbColor};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${values.hoverColor};
    }
  `);

  showPopup(
    'Code Copied',
    'Code has been successfully copied to clipboard',
    'success'
  );
}

export function scrollGenerator() {
  const [trackColor, thumbColor, hoverColor] = Array.from(
    getAllColorInput(attribute)
  );
  const width = document.querySelector('#scroll-width') as HTMLInputElement;

  const getCodeButton = getCopyCodeButton(attribute);
  const getCssOrTailwindButtonElement = getCssOrTailwindButton(attribute);

  getCodeButton?.addEventListener('click', () =>
    copyHandler({
      trackColor: trackColor.value,
      thumbColor: thumbColor.value,
      hoverColor: hoverColor.value,
      width: width.value,
    })
  );
  getCssOrTailwindButtonElement?.addEventListener('click', getCssOrTailwind);
}
