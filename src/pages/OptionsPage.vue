<template>
  <q-page padding>
    <q-slider
      class="q-mt-xl"
      v-model="firstModel"
      color="orange"
      markers
      :min="0"
      :max="120"
      marker-labels
    >
      <template v-slot:marker-label-group="{ markerList }">
        <div
          v-for="val in 4"
          :key="val"
          class="cursor-pointer"
          :class="markerList[val].classes"
          :style="markerList[val].style"
          @click="firstModel = val"
        >{{ val }}</div>
      </template>
    </q-slider>

  </q-page>
</template>

<script>
import {ref} from "vue";

export default {
  setup() {
    return {
      firstModel: ref(2),
    }
  }

}
</script>
