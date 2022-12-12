<template>
  <div
    class="q-pa-md flex flex-center column"
  >
    <q-circular-progress
      @click="playAction()"
      reverse
      :value='percent'
      show-value
      track-color="grey-3"
      color="orange"
      size=""
      class="col q-ma-md"
    >

      <div class="column justify-center">
        <h1 class="col" id="displayTime" style="font-family: helvetica,serif; font-weight: bold;">
          {{ displayTime }}</h1>
        <div class="row justify-center col-1">
          <q-icon v-if="!showPlay.value" fab size="xl" :name="playIcon" color="accent"/>
        </div>

      </div>
    </q-circular-progress>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {useTimerStore} from "stores/timer";

let props = defineProps({
    maxTime: {
      type: Number,
      required: true,
    },
  }
)


// name: 'ComponentName',

watch(() => props.maxTime, () => {
    createTimer()
    console.log("timer updated")
  }
)


let timer = useTimerStore().timer
let percent = ref(100);

let hoursLeft = ref(0);
let minutesLeft = ref(0);
let secondsLeft = ref(0);

function twoDigit(number) {
  return number.toString().padStart(2, "0")
}

let displayTime = computed(() => {
  let hours = hoursLeft.value ? twoDigit(hoursLeft.value) + ":" : ""
  return `${hours}${twoDigit(minutesLeft.value)}:${twoDigit(secondsLeft.value)}`
})

function updateClock() {
  let timeLeft = timer.getTime()

  secondsLeft.value = timeLeft.seconds
  minutesLeft.value = timeLeft.minutes
  hoursLeft.value = timeLeft.hours

  percent.value = timer.getPercent()
}

let showPlay = ref(true);

const playAction = () => {
  showPlay.value ? timer.start() : timer.pause();
  showPlay.value = !showPlay.value;
}
let playIcon = computed(() => showPlay.value ? "play_arrow" : "pause")


const secondsToTime = function (seconds) {
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  return {
    hours,
    minutes: minutes % 60,
    seconds: seconds % 60

  }
}

function CountdownTimer(maxTimerLength, render, onTimeOut) {
  let timerLength = maxTimerLength * 60;
  let seconds;
  let interval

  this.lock = false


  const tick = () => {
    seconds -= 1;
    render(this)
    if (seconds === 0) {
      onTimeOut()
      this.pause()
    }
  }

  this.reset = () => {
    this.pause()
    seconds = timerLength;
  }

  this.pause = function () {
    this.lock = false
    clearInterval(interval)
  }

  this.start =function () {
    this.lock = true
    clearInterval(interval)
    interval = setInterval(tick, 1000)
    seconds += 1
    tick()
  }

  this.getTime = () => secondsToTime(seconds)
  this.getPercent = () => (100 * seconds / timerLength)
  this.reset();
}

function createTimer() {
  Object.assign(timer, new CountdownTimer(
    props.maxTime,
    () => updateClock(),
    () => console.log("Alert!")
  ))
  showPlay.value = true;
  updateClock()
}

createTimer(0);
</script>
