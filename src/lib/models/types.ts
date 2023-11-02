export const StyleType = {
  Transform: 'transform',
  PicText: 'pic-text',
  Gradient: 'gradient-text',
  GradientBorder: 'gradient-border',
  GradientBackground: 'gradient-background',
  Animation: 'animation',
  BorderRadius: 'border-radius',
  BoxShadow: 'box-shadow',
  TextShadow: 'text-shadow',
} as const;

export const DataGenerators = {
  ...StyleType,
  InputRange: 'input-range',
  GridGenerators: 'grid-generators',
} as const;

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export type DataGeneratorValues =
  typeof DataGenerators[keyof typeof DataGenerators];
