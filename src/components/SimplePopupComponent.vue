<template>
  <div>
    <q-dialog
      v-model="fakeButton"
      :key="fakeButton"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <slot/>
        <slot name="button">
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Close" v-close-popup></q-btn>
            <q-btn v-if="buttonAction" color="primary" :label="buttonTitle ?? 'Button'" v-close-popup @click="buttonAction"/>
          </q-card-actions>
        </slot>
      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>

import {computed} from "vue";

const props = defineProps(
  {
    title: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    buttonAction: {
      type: Function,
      default: () => {}
    },
    buttonTitle: {
      type: String,
      default: ""
    },
  }
)
const emits = defineEmits(['update:modelValue'])

let fakeButton = computed(
  {
    get() {
      return props.modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    }
  }
)


</script>
