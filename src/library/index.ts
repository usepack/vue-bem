import { App } from 'vue';
import { BemOptions, BemItem } from '@/models';
import { getClassName } from './helpers';

export function install (Vue: App, { hyphenate, modifierSeparator }: BemOptions): void {
  Vue.mixin({
    name: 'BemMixin',
    data () {
      return {
        bemMixinBlockName: ''
      };
    },
    methods: {
      $bem ({ b, e, m }: BemItem): string[] {
        const toKebabCase = (s: string) => s
          .replace(/([A-Z])([A-Z])/g, '$1-$2')
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/[\s_]+/g, '-')
          .toLowerCase();

        if (b) {
          this.bemMixinBlockName = b;
        }

        const n = this.$options.name;
        const block: string = this.bemMixinBlockName || (hyphenate ? toKebabCase(n) : n);

        let modifiers: [string, string | boolean][] = [];
        if (typeof m === 'string') {
          modifiers = [[toKebabCase(m), true]];
        } else if (Array.isArray(m)) {
          modifiers = m.map(key => [toKebabCase(key), true]);
        } else if (typeof m === 'object' && m != null) {
          modifiers = Object.keys(m)
            .filter(key => m[key])
            .map(key => {
              const value = m[key];
              if (typeof value === 'number') {
                return [toKebabCase(key), value.toString()];
              }
              return [toKebabCase(key), value];
            });
        }

        const elementClass = getClassName(block, e);
        const modifiersClasses = modifiers.map(([key, value]) => getClassName(block, e, key, value, modifierSeparator));
        return [elementClass, ...modifiersClasses];
      }
    }
  });
}
