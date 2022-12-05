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
    },
    modelValue: {
      type: Boolean
    }
  }
)
const emits = defineEmits(['update:buttonTrigger'])

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
