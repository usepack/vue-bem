<template>
  <main :class="$bem({})">
    <div
      v-for="modifier in modifiers"
      :key="modifier.name"
      :class="$bem({e: 'checkbox'})"
    >
      <template v-if="modifier.type === 'select'">
        <label
          :for="modifier.name"
          :class="$bem({e: 'checkbox-label'})"
        >
          {{ modifier.label }}:
          <select
            v-model="modifier.value"
            :name="modifier.name"
            :class="$bem({e: 'select'})"
          >
            <option value="black">
              black
            </option>
            <option value="lightskyblue">
              lightskyblue
            </option>
          </select>
        </label>
      </template>
      <template v-else>
        <input
          v-model="modifier.value"
          type="checkbox"
          :name="modifier.name"
          :class="$bem({e: 'checkbox-input'})"
        >
        <label
          :for="modifier.name"
          :class="$bem({e: 'checkbox-label'})"
        >
          {{ modifier.label }}
        </label>
      </template>
    </div>
    <Post :class="$bem({e: 'post', m: selectedModifiers})" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Post from './components/Post.vue';
import { BemModifier } from '@/models';

export default defineComponent({
  name: 'VApp',
  components: {
    Post
  },
  data () {
    return {
      modifiers: [
        {
          name: 'highlighted',
          value: false,
          label: 'Highlighted'
        },
        {
          name: 'bordered',
          value: false,
          label: 'Boredered'
        },
        {
          name: 'color',
          value: 'black',
          label: 'Color',
          type: 'select',
          options: ['black', 'lightskyblue']
        }
      ]
    };
  },
  computed: {
    selectedModifiers (): BemModifier {
      return this.modifiers
        .filter(mod => mod.value)
        .reduce<Record<string, string | number | boolean>>((obj, mod) => {
          obj[mod.name] = mod.value;
          return obj;
        }, {});
    }
  }
});
</script>

<style lang="scss">
.app {
  &__post {
    &--highlighted {
      background-color: #ff0;
    }
    &--bordered {
      border: 1px solid #ccc;
    }
    &--color {
      &--black {
        color: black;
      }
      &--lightskyblue {
        color: lightskyblue;
      }
    }
  }
}
</style>
