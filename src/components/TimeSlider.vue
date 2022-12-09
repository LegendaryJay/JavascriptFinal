<template>
<q-card class="q-my-md q-px-xl q-px-xl">
  <div class="text-weight-bold">{{title}}</div>
  <div>{{minutesToHours(inputVal)}}</div>
  <q-slider
    v-model="inputVal"
    :color="color"
    :markers="markerSteps"
    snap
    :min="1"
    :max="maxMinutes"
    track-size="10px"
    marker-labels
  >
    <template #marker-label-group="{ markerList }">
      <div
        v-for="val in (Math.floor(maxMinutes / markerSteps))"
        :key="val"
        class="cursor-pointer"
        :class="markerList[val].classes"
        :style="markerList[val].style"
        @click="inputVal.value = val * markerSteps"
      >
        {{ minutesToHours(val * markerSteps) }}
      </div>
    </template>
  </q-slider>
</q-card>
</template>

<script setup>

import {computed} from "vue";

const props = defineProps(
  {
    modelValue: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    markerSteps: {
      type: Number,
      default: 15
    },
    maxMinutes: {
      type: Number,
      default: 120
    },
    color: {
      type: String,
      default: "orange"
    }
  }
)

let emits = defineEmits(['update:modelValue'])

let inputVal = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})


function minutesToHours(number) {
  let hours = Math.floor(number / 60)
  let minutes = number % 60
  let minuteString = minutes ? minutes + " min" : ""
  let hourString = hours ? (hours + "hrs ") : ""

  return (hourString ?? "") + (minuteString ?? "")
}

// let label = computed(() => {
//   return minutesToHours(inputVal.value)
// })

</script>
