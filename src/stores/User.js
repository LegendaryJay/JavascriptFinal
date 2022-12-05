import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    userData: {},
    isLoggedIn: false,
  }),
  actions: {
    setUser(user, userdata) {
      this.user = user ?? {};
      this.userData = userdata ?? {};
      this.isLoggedIn = Object.keys(user ?? {}).length !== 0;
    },
  },
});
