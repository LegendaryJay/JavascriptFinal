<template>
  <q-item
    v-ripple
    clickable
    @click="() => clickAction(subtask)"
  >
    <q-item-section>
      {{ subtask.name }}
    </q-item-section>
    <q-item-section side top>
      <div>
        <icon-component
          v-for="count in (subtask?.pommesNeeded ?? 0) "
          :key="count"
          :size="subtask?.pommesNeeded > 5? 'sm' : 'md'"
        />
      </div>
    </q-item-section >

  </q-item>
</template>

<script setup>

import IconComponent from "components/iconComponent.vue";

defineProps(
  {
    subtask: {
      type: Object,
      required: true
    },
    clickAction: {
      type: Function,
      default: ()=>{}
    }
  }
)

</script>
