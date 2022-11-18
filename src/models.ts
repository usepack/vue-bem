export interface BemOptions {
  hyphenate?: boolean;
  modifierSeparator?: string;
  transformComponentName?: (name: string) => string;
}

export type BemModifier = string | string[] | Record<string, string | number | boolean>;

export interface BemItem {
  b?: string;
  e?: string;
  m?: BemModifier;
}
