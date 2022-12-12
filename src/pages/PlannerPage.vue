<template>
  <q-page padding>
    <planner-task
      v-for="(task, index) in orderedTasks"
      class="q-my-auto q-py-auto"
      style="max-width: 500px"
      :key="index"
      :task="task"
    />
    <div class="">
      <q-btn
        fab-mini
        style="max-width: 500px"
        class="bg-primary text-white"
        icon="add"
      />
    </div>


  </q-page>
</template>

<script setup>
import {userLogging, UserRepository} from "src/model/UserRepository";
import {computed, reactive} from "vue";
import PlannerTask from "components/PlannerTask.vue";

//@click="$router.push('edit-task/' + task?.id)"

let tasks = reactive({})

let update = () => {};
let updateContents = function (){
  update()
  update = UserRepository.onUserDataSnapshot(
    (snapshot) => {
      Object.assign(tasks, snapshot.data()?.tasks ?? {})
    }
  )
}
userLogging.onUpdate(updateContents

)
function readableTime(date) {
  const relativeDays =
    Math.ceil(
      ((new Date(date)) - Date.now()) / (1000 * 3600 * 24));
  console.log(date)

  let positiveRelativeDays = Math.abs(relativeDays)
  let depth;
  let result = "";
  const isPast = Math.sign(relativeDays) === -1;

  if (positiveRelativeDays > 6) {
    result = (isPast ? "" : "in ") + positiveRelativeDays + " days" + (isPast ? " ago" : "")
    depth = 1
  } else if (positiveRelativeDays > 1) {
    depth = 0
    result = (isPast ? "Last " : "") + (new Date(date)).toLocaleDateString('en-US', {
      weekday: 'long',
    })
    console.log(isPast, positiveRelativeDays, relativeDays)
  } else {
    depth = 0
    switch (relativeDays) {
      case -0:
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
  result = "Due " + result

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
    x.pommesNeeded = subtasks.reduce((add, x) => add + (x?.pommesNeeded ?? 0), 0)
  });
  moddedTasks.sort((a, b) => a.relativeDays - b.relativeDays).sort((a, b) => a.dateDepth - b.dateDepth);

  let lastMode = moddedTasks?.[0]?.dateDepth
  for (const task of moddedTasks) {
    if (lastMode !== task.dateDepth && task.dateDepth === 1) {
      task.separate = true
      lastMode = task.dateDepth
    }
  }
  return moddedTasks
})

</script>

<style lang="scss">

</style>
