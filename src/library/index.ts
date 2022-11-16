import { App } from 'vue';
import { BemOptions, BemItem } from '@/models';
import { getClassName } from './helpers';

export function install (Vue: App, { hyphenate }: BemOptions): void {
  Vue.mixin({
    name: 'BemMixin',
    data () {
      return {
        bemMixinBlockName: ''
      };
    },
    methods: {
      $bem ({ b, e, m }: BemItem): string[] {
        const pascalToKebabCase = (s: string) => s
          .replace(/([A-Z])([A-Z])/g, '$1-$2')
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/[\s_]+/g, '-')
          .toLowerCase();

        if (b) {
          this.bemMixinBlockName = b;
        }

        const n = this.$options.name;
        const block: string = this.bemMixinBlockName || (hyphenate ? pascalToKebabCase(n) : n);
        const modifiers: string[] = m ? (typeof m === 'string' ? [m] : (Array.isArray(m) ? m : Object.keys(m).filter(key => m[key]))) : [];
        const elementClass = getClassName(block, e);
        const modifiersClasses = modifiers.map(m => getClassName(block, e, m));
        return [elementClass, ...modifiersClasses];
      }
    }
  });
}
