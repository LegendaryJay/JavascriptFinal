<template>
  <q-page padding>
    <div
      class="bg-blue-1"
      v-for="(task, index) in tasks"
      :key="index"

    >
      {{task.name}}
    </div>
  </q-page>
</template>

<script setup>
import {UserRepository} from "src/model/UserRepository";
import {onMounted, reactive} from "vue";

let tasks = reactive({})
onMounted(() =>
  UserRepository.onUserDataSnapshot(
    (snapshot) => {
      const tempTasks = snapshot.data()?.tasks ?? {}
      Object.assign(tasks, tempTasks)
      console.log("final", tasks)
      console.log("raw", tempTasks)
    }
  )
)


</script>
