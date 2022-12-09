<template>
  <q-page padding>
    <time-slider
      v-model="pommeDummy"
      title="Pomme Length:"
    />
    <time-slider
      v-model="shortDummy"
      title="Short Break Length:"
    />
    <time-slider
      v-model="longDummy"
      title="Long Break Length:"
    />
    <q-btn-dropdown color="primary" :label="dropDownLabel">
      <q-list
        v-for="(preset, index) in presets"
        :key="index"
        @click="() => selectPreset(preset[0] ,preset[1])"
      >
        <q-item
          v-close-popup
          clickable
        >
          {{ capitalizeFirstLetter(preset[0]) }}
          <q-item-section>
            <q-item-label>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <div class="q-my-md">
      <q-btn @click="save"> Save </q-btn>
    </div>

  </q-page>
</template>

<script setup>
import {computed, reactive} from "vue";
import TimeSlider from "components/TimeSlider.vue"
import {useTimerStore} from "stores/timer";
import {userLogging, UserRepository} from "src/model/UserRepository";
import {Options} from "src/model/Options";


const store = useTimerStore()
let presets = Object.entries(store.presets)
let userOptions = reactive({});

const newOptions = new Options()
newOptions.presetName = presets[0][0]
newOptions.preset = presets[0][1]
console.log(newOptions)

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let unsubscribe = () => {
};

userLogging.onUpdate((user) => {
  unsubscribe()
  if (user) {
    unsubscribe = UserRepository.onUserDataSnapshot((snap) => {
        let data = snap?.data()
        Object.assign(userOptions, data?.options ?? null)
        if (!userOptions || (!userOptions?.preset && !userOptions.presetName)) {
          console.log("Options missing")
          UserRepository.updateCurrentUserData('options', {...newOptions})
        } else {
          console.log(userOptions)
        }
      }
    )
  } else {
    Object.assign(userOptions, {...newOptions})
  }
})

function selectPreset(name, value) {
  userOptions.presetName = name
  userOptions.preset = value
}

let pommeDummy = computed({
  get() {
    return userOptions?.preset?.[0] ?? 0
  },
  set(value) {
    userOptions.presetName = "custom"
    userOptions.preset[0] = value

  }
})
let shortDummy = computed({
  get() {
    return userOptions?.preset?.[1] ?? 0
  },
  set(value) {
    userOptions.presetName = "custom"
    userOptions.preset[1] = value
  }
})
let longDummy = computed({
  get() {
    return userOptions?.preset?.[2] ?? 0
  },
  set(value) {
    userOptions.presetName = "custom"
    userOptions.preset[2] = value
  }
})

let dropDownLabel = computed(() => userOptions?.presetName ?? "custom")

function save(){
  UserRepository.updateCurrentUserData('options', userOptions)
}


</script>
