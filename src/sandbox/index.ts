import { createApp } from 'vue';
import App from './App.vue';
import { createBem } from '@/index';

createApp(App).use(createBem({
  hyphenate: true,
  modifierSeparator: '--',
  transformComponentName (name: string): string {
    return name.replace(/^V/, '');
  }
})).mount('#app');
