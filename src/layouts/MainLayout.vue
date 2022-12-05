<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated className="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-avatar>
            <q-img
              src="~assets/pomme.png"
              spinner-color="white"
              style="height: 30px; max-width: 30px"
            />
          </q-avatar>
          <text v-if="$q.platform.is.desktop"> Pomme App -</text>
          {{ $route.meta.title }}
        </q-toolbar-title>
        <div v-if="!useUserStore().isLoggedIn" :key="updateVal">
          <q-btn flat @click="loginButton = true; newUser = true;">Sign up</q-btn>
          <q-btn @click="loginButton = true; newUser = false;">Log In</q-btn>
          <simple-popup-component
            v-model="loginButton"
            :title="newUser ? 'Sign Up' : 'Log In'"
          >
            <login-component
            :is-new-user="newUser"
            />
            <template v-slot:button>&#8203;</template>
          </simple-popup-component>
        </div>
        <div v-else :key="updateVal + 1">
          <q-btn flat @click=" () => { userLogging.logOut(); loginButton = false}">Log Out</q-btn>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above

      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item>
            <q-item-section
              avatar
            >
              <q-icon>
                <img src="~assets/pomme.png" alt="apple"/>
              </q-icon>
            </q-item-section>

            <q-item-section>
              <q-item-label> Pomme</q-item-label>
            </q-item-section>

          </q-item>
          <EssentialLink
            v-for="(nav, index) in navbars"
            :key="index"
            :title="nav.title"
            :icon="nav.icon"
            :link="nav.link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer elevated className="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import {ref} from 'vue'
import EssentialLink from "components/EssentialLink.vue";
import SimplePopupComponent from "components/SimplePopupComponent.vue";
import LoginComponent from "components/LoginComponent.vue";
import {userLogging} from "src/model/UserRepository";
import {useUserStore} from "stores/User";

export default {
  components: {EssentialLink, SimplePopupComponent, LoginComponent},
  setup() {
    const getImageUrl = () => {
      return new URL(`../../assets/pomme.png`, import.meta.url).href
    }
    const leftDrawerOpen = ref(false)

    let updateVal = ref(0)
    useUserStore().$subscribe(() => {
      updateVal.value += 1
      }
    )
    return {
      navbars: [
        {
          title: "Timer",
          link: {name: "timer"},
          icon: "timer",
        },
        {
          title: "Tasks",
          link: {name: "tasks"},
          icon: "task_alt",
        },
        {
          title: "Planner",
          link: {name: "planner"},
          icon: "calendar_today",
        },
        {
          title: "Awards",
          link: {name: "awards"},
          icon: "stars",
        },
        {
          title: "Options",
          link: {name: "options"},
          icon: "tune",
        },
      ],
      newUser: ref(false),
      loginButton: ref(false),
      leftDrawerOpen,
      getImageUrl,
      drawer: ref(false),
      miniState: ref(true),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      userLogging,
      updateVal,
      useUserStore
    }
  }
}
</script>
