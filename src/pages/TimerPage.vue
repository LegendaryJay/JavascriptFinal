<template>
  <q-page padding>
    <div
      class="q-pa-md flex flex-center column"
    >
      <q-btn-group class="col-1" push>
        <q-btn push label="Work" icon="work_outline" @click="() => setTimer(0)"></q-btn>
        <q-btn push label="Short Break" icon="emoji_food_beverage" @click="() => setTimer(1)"></q-btn>
        <q-btn push label="Long Break" icon="beach_access" @click="() => setTimer(2)"></q-btn>
      </q-btn-group>
      <TimerComponent
        :maxTime="maxTime"
      />
    </div>
  </q-page>
</template>

<script>

import {reactive, ref} from "vue";
import TimerComponent from "components/timerComponent.vue";
import {useTimerStore} from "stores/timer";
import {userLogging, UserRepository} from "src/model/UserRepository";

export default {
  components: {TimerComponent},

  // name: 'PageName',
  props: {
    taskId: {
      type: String,
      default: "",
    }
  },
  data(props) {
    let task = reactive({});
    let maxTime = ref(0)
    let preset = reactive(useTimerStore().presets.classic);

    function setTimer(mode = 0) {
      maxTime.value = preset[mode]
    }

    userLogging.onUpdate(() => {
      let newPreset;
      UserRepository.onUserDataSnapshot((snap) => {
        newPreset = snap.data()?.options?.preset
        if (newPreset) {
          Object.assign(preset, newPreset)
        }
        Object.assign(task, snap.data()?.tasks?.[props?.taskId] )
      })
    })

    setTimer(0)
    return {
      setTimer,
      maxTime,
      preset,
      task,
    }
  }

}
</script>
