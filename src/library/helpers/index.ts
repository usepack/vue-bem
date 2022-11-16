export function getClassName (
  block: string,
  element?: string,
  modifier?: string,
  modifierSeparator = '--'
): string {
  let className = `${block}`;

  if (element) {
    className += `__${element}`;
  }

  if (modifier) {
    className += `${modifierSeparator}${modifier}`;
  }

  return className;
}
