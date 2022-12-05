import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timer:{},
    presets: {
      //name: [pomme, short, long]
      classic: [25 * 60, 5 * 60, 15 * 60],
      medium: [40 * 60, 8 * 60, 20 * 60],
      extended: [60 * 60, 10 * 60, 25 * 60],
      custom: [15 * 60, 5 * 60, 15 * 60],
    },
    temporaryPreset: [15 * 60, 5 * 60, 15 * 60],
  }),
})
