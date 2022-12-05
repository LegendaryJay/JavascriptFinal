<template>
  <q-form class="q-ma-md">
    <q-input class="q-mb-sm" filled v-model="displayName" label="Display Name"
             v-if="isNewUser"></q-input>
    <q-input class="q-mb-sm" filled v-model="username" label="Email"></q-input>
    <q-input class="q-mb-sm" label="Password" v-model="password" filled :type="isPwd ? 'password' : 'text'">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        ></q-icon>
      </template>
    </q-input>
    <q-btn @click.prevent="buttonAction" class="bg-primary text-white full-width">{{ isNewUser ? "Sign Up" : "Log In" }}</q-btn>
  </q-form>
</template>

<script>
import {ref} from "vue";
import {userLogging} from "src/model/UserRepository";


export default {
  props: {
    isNewUser: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let displayName = ref("")
    let username = ref("")
    let password = ref("")
    let buttonAction = () => props.isNewUser ?
      userLogging.createUser(username.value, password.value, displayName.value) :
      userLogging.login(username.value, password.value)

    return {
      displayName,
      username,
      password,
      isPwd: ref(true),
      buttonAction,
    }
  },
  // name: 'PageName',
}
</script>
