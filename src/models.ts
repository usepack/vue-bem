export interface BemOptions {
  hyphenate?: boolean;
  modifierSeparator?: string;
}

export interface BemItem {
  b?: string;
  e?: string;
  m?: string | string[] | {[key in string]: boolean};
}
