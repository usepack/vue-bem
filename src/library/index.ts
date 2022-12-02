import { App } from 'vue';
import { BemOptions, BemItem } from '@/models';
import { getClassName } from './helpers';

export function install (Vue: App, options: BemOptions): void {
  Vue.mixin({
    name: 'BemMixin',
    methods: {
      $bem (bem?: BemItem): string[] {
        const { b, e, m } = bem || {};

        const toKebabCase = (s: string) => s
          .replace(/([A-Z])([A-Z])/g, '$1-$2')
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/[\s_]+/g, '-')
          .toLowerCase();

        let n = this.$options.name;

        if (options.transformComponentName) {
          n = options.transformComponentName(n);
        }

        const block: string = b || (options.hyphenate ? toKebabCase(n) : n);

        let modifiers: [string, string | boolean][] = [];
        if (typeof m === 'string') {
          modifiers = [[m, true]];
        } else if (Array.isArray(m)) {
          modifiers = m.map(key => [key, true]);
        } else if (typeof m === 'object' && m != null) {
          modifiers = Object.keys(m)
            .filter(key => m[key])
            .map(key => {
              const value = m[key];
              if (typeof value === 'number') {
                return [key, value.toString()];
              }
              return [key, value];
            });
        }

        const elementClass = getClassName(block, e);
        const modifiersClasses = modifiers.map(([key, value]) => getClassName(block, e, key, value, options.modifierSeparator));
        return [elementClass, ...modifiersClasses];
      }
    }
  });
}
