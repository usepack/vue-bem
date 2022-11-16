export function getClassName (
  block: string,
  element?: string,
  modifierKey?: string,
  modifierValue?: string | boolean | number,
  modifierSeparator = '--'
): string {
  let className = `${block}`;

  if (element) {
    className += `__${element}`;
  }

  if (modifierKey && modifierValue !== false) {
    className += `${modifierSeparator}${modifierKey}`;

    if (typeof modifierValue === 'string' && modifierValue) {
      className += `${modifierSeparator}${modifierValue}`;
    }
  }

  return className;
}
