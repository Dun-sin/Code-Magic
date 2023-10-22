export const getGeneratorsElement = (): NodeListOf<HTMLDivElement> =>
  document.querySelectorAll('[data-gen]') as NodeListOf<HTMLDivElement>;

export const getOpenSideBarButton = (): HTMLElement =>
  document.querySelector('.open-sidebar') as HTMLElement;

export const getResultPage = (): HTMLElement =>
  document.querySelector('.side-results') as HTMLElement;

export const getCssOrTailwindButton = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-css-tailwind=${attribute}-code]`
  ) as HTMLElement;

export const getCssOrTailwindDropdown = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-dropdown=${attribute}-dropdown2]`
  ) as HTMLElement;

export const getPngOrSvgButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-png-svg=${attribute}-image]`) as HTMLElement;

export const getPngOrSvgDropdown = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-dropdown=${attribute}-dropdown1]`
  ) as HTMLElement;

export const getCopyCodeButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-download=${attribute}-code]`) as HTMLElement;

export const getTailwindButton = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-download=${attribute}-tailwind]`
  ) as HTMLElement;

export const getPNGButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-download=${attribute}-PNG]`) as HTMLElement;

export const getSVGButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-download=${attribute}-svg]`) as HTMLElement;

export const getResultButton = (attribute: string): HTMLElement =>
  document.querySelector(`[data-button = ${attribute}]`) as HTMLElement;

export const getColorInput1 = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-color1`) as HTMLInputElement;

export const getColorInput2 = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-color2`) as HTMLInputElement;

export const getAllColorInput = (
  attribute: string
): NodeListOf<HTMLInputElement> =>
  document.querySelectorAll(`[data-content=${attribute}] .color input`);

export const getAllInputElements = (
  attribute: string
): NodeListOf<HTMLInputElement> =>
  document.querySelectorAll(`.${attribute}-inputs`);

export const getGradientPreview = (attribute: string): HTMLElement =>
  document.querySelector(`#${attribute}-color-preview`) as HTMLElement;

export const getOutput = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-result = ${attribute}] > .output`
  ) as HTMLElement;

export const getRange = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-degree`) as HTMLInputElement;

export const getInputText = (attribute: string) =>
  document.getElementById(`${attribute}-text`) as HTMLInputElement;

export const getCheckbox = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-radius`) as HTMLInputElement;

export const getRadiusInput = (attribute: string) =>
  document.getElementById(`${attribute}-input`) as HTMLInputElement;

export const getInputSpinner = (attribute: string) =>
  document.getElementById(`${attribute}-duration`) as HTMLInputElement;

export const getRadioButtonSet = (attribute: string) =>
  document.querySelectorAll(
    `[name = ${attribute}-radio]`
  ) as NodeListOf<HTMLInputElement>;

export const getBorderTop = (attribute: string) =>
  document.getElementById(`${attribute}-top`) as HTMLInputElement;

export const getBorderRight = (attribute: string) =>
  document.getElementById(`${attribute}-right`) as HTMLInputElement;

export const getBorderBottom = (attribute: string) =>
  document.getElementById(`${attribute}-bottom`) as HTMLInputElement;

export const getBorderLeft = (attribute: string) =>
  document.getElementById(`${attribute}-left`) as HTMLInputElement;

export const getStyleSheet = () => {
  const stylesheet = Array.from(document.styleSheets).filter(
    (styleSheet) =>
      !styleSheet.href || styleSheet.href.startsWith(location.origin)
  );
  return stylesheet[0] as CSSStyleSheet;
};

export const getShadowHorizontalOffset = (
  attribute: string
): HTMLInputElement =>
  document.getElementById(`${attribute}-h-offset`) as HTMLInputElement;

export const getShadowVerticalOffset = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-v-offset`) as HTMLInputElement;

export const getShadowBlur = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-blur`) as HTMLInputElement;

export const getShadowSpread = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-spread`) as HTMLInputElement;

export const getShadowColor = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-color`) as HTMLInputElement;

export const getShadowPreview = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-preview`) as HTMLInputElement;

export const getParentElementOfColors = (attribute: string): HTMLElement =>
  document.querySelector(`[data-content=${attribute}] .colors`) as HTMLElement;

export const getNewColorButton = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-content=${attribute}] .addNewColor`
  ) as HTMLElement;

export const getRemoveNewColorButton = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-content=${attribute}] .removeNewColor`
  ) as HTMLElement;

export const getShadowFields = (
  attribute: string,
  types: string[]
): HTMLSpanElement[] =>
  types.reduce(
    (acc, type) => [
      ...acc,
      document.getElementById(`${attribute}-${type}-field`) as HTMLInputElement,
    ],
    []
  );

export const getPreviewSlider = (attribute: string): HTMLElement =>
  document.querySelector(
    `[data-content=${attribute}] .preview-slider`
  ) as HTMLElement;

export const getAllFields = (attribute: string) => {
  const inputs = document.querySelectorAll(
    `[data-content=${attribute}] input`
  ) as NodeListOf<HTMLInputElement>;
  const textarea = document.querySelector(
    `[data-content='${attribute}'] textarea`
  ) as HTMLTextAreaElement;

  return {
    inputs,
    textarea,
  };
};

export const getResetButton = (attribute: string) =>
  document.querySelector(`[data-reset=${attribute}]`) as HTMLButtonElement;

export const getDegreeSpanElement = (attribute: string) =>
  document.querySelector(
    `[data-content=${attribute}] .unit-display`
  ) as HTMLSpanElement;

export const getNumberOfColumns = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-columns`) as HTMLInputElement;

export const getNumberOfRows = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-rows`) as HTMLInputElement;

export const getRowGap = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-row-gaps`) as HTMLInputElement;

export const getColumnGap = (attribute: string): HTMLInputElement =>
  document.getElementById(`${attribute}-column-gaps`) as HTMLInputElement;

export const getGridFields = (
  attribute: string,
  types: string[]
): HTMLSpanElement[] =>
  types.reduce(
    (acc, type) => [
      ...acc,
      document.getElementById(`${attribute}-${type}`) as HTMLInputElement,
    ],
    []
  );

export const getGridPreview = (attribute: string): HTMLElement =>
  document.getElementById(`${attribute}-preview`) as HTMLElement;
