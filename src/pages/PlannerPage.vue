<template>
  <q-page padding>

    <div
      class="q-mt-lg"
      style="max-width: 500px"

      v-for="(task, index) in orderedTasks"
      :key="index"
      :id="index"
    >
        {{task.dateText}}
      <q-card
        :style="'background-color:' + (task?.hex ?? '#FFF') + '; color:' + (task?.isDark ? '#FFF' : '#000') + ';' "
      >
        <q-card-section class="flex justify-between">
          <h3 class="col-9">{{ task.name }}</h3>
          <h4 class="col-3">
            {{task?.pommesNeeded}} <icon-component/>
          </h4>
        </q-card-section>
        <q-card-section class="flex-center justify-center">
          <text class="col">
            Things
          </text>
        </q-card-section>


      </q-card>
    </div>

  </q-page>
</template>

<script setup>
import {UserRepository} from "src/model/UserRepository";
import {computed, onMounted, reactive} from "vue";
import {Subtask, Task} from "src/model/Task";
import iconComponent from "components/iconComponent.vue";

let tasks = reactive({})
onMounted(() =>
  UserRepository.onUserDataSnapshot(
    (snapshot) => {
      const tempTasks = snapshot.data()?.tasks ?? {}
      Object.assign(tasks, tempTasks)
      console.log("raw", tempTasks)
      console.log("final", tasks)


      let task = new Task()
      task.id = "bc1fd6ab-71d1-4522-93bd-d4650b9aa367"
      task.name = "This is a task!!"
      task.dueDate = Date.parse('12/20/2022')
      let subtask = new Subtask()
      subtask.id = "8d5f3cff-4c62-499c-a5d7-cae672b6cf3c"
      subtask.name = "This is a subtask"
      subtask.pommesNeeded = 3
      task.subtasks[subtask.id] = subtask

      tasks[task.id] = task

      task = new Task();
      task.id = "2a6b29d3-2716-4260-af57-c65148065fa1"
      task.name = "Task #2"
      task.dueDate = Date.parse('12/6/2022')
      subtask = new Subtask()
      subtask.id = "6b7d4a14-032e-4aaf-ac61-05b90f1dc618"
      subtask.name = "This is a subtask"
      subtask.pommesNeeded = 8
      task.subtasks[subtask.id] = subtask
      subtask = new Subtask()
      subtask.name = "This is a 2nd subtask"
      subtask.pommesNeeded = 2
      task.subtasks[subtask.id] = subtask

      tasks[task.id] = task

      task = new Task();
      task.id = "c272e042-0c6a-47b2-b320-c7414ca371bc"
      task.name = "Task #3"
      task.dueDate = Date.parse('12/3/2022')

      tasks[task.id] = task

      console.log(tasks)
    }
  )
)

function readableTime(date) {
  const relativeDays = Math.ceil((date - Date.now()) / (1000 * 3600 * 24));
  let positiveRelativeDays = Math.abs(relativeDays)
  let depth;
  let result
  const isPast = Math.sign(relativeDays) === -1

  if (positiveRelativeDays > 6) {
    result = (isPast ? "" : "in ") + positiveRelativeDays + " days" + (isPast ? " ago" : "")
    depth = 2
  } else if (positiveRelativeDays > 1) {
    depth = 1
    result = (isPast ? "Last " : "") + (new Date(date)).toLocaleDateString('en-US', {
      weekday: 'long',
    }),
    console.log(isPast, positiveRelativeDays, relativeDays)
  } else {
    depth = 0
    switch (relativeDays) {
      case 0:
        result = "Today"
        break
      case 1:
        result = "Tomorrow"
        break
      case -1:
        result = "Yesterday"
        break
      default:
        break
    }
  }
  if (isPast) {
    depth = -1
  }

  return {
    text: result,
    depth,
    relativeDays,
  }
}

let orderedTasks = computed(() => {
  let moddedTasks = Object.values(tasks) ?? [];

  moddedTasks.forEach(x => {
    let temp = readableTime(x.dueDate);
    x.dateText = temp.text;
    x.dateDepth = temp.depth;
    x.relativeDays = temp.relativeDays;

    let subtasks = (Object.values(x?.subtasks) ?? [])
    x.pommesNeeded = subtasks.reduce((add, x)=> add + (x?.pommesNeeded ?? 0),0)
    console.log("this Task", x.pommesNeeded)
  });

  return moddedTasks.sort((a, b) => a.relativeDays - b.relativeDays).sort((a,b) => a.dateDepth - b.dateDepth);
})

</script>

<style lang="scss">

</style>
