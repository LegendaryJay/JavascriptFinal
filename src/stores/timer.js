import { defineStore } from "pinia";

export const useTimerStore = defineStore("timer", {
  state: () => ({
    timer: {},
    presets: {
      //name: [pomme, short, long]
      classic: [25, 5, 15],
      medium: [40, 8, 20],
      extended: [60, 10, 25],
    },
  }),
});
