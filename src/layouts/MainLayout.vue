<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <q-avatar>
            <icon-component/>
          </q-avatar>
          <text
            v-if="$q.platform.is.desktop"
          >
            Pomme App -
          </text>
          {{ $route.meta.title }}
        </q-toolbar-title>
        <div v-if="!isLoggedIn">
          <q-btn
            flat
            @click="loginButton = true; newUser = true;"
          >
            Sign up
          </q-btn>
          <q-btn
            @click="loginButton = true; newUser = false;"
          >
            Log In
          </q-btn>
          <simple-popup-component
            v-model="loginButton"
            :title="newUser ? 'Sign Up' : 'Log In'"
          >
            <login-component
              :is-new-user="newUser"
            />
            <template #button>
              &#8203;
            </template>
          </simple-popup-component>
        </div>
        <div v-else>
          <q-btn
            flat
            @click=" () => { userLogging.logOut(); loginButton.value = false}"
          >
            Log Out
          </q-btn>
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
      <q-scroll-area
        class="fit"
        :horizontal-thumb-style="{ opacity: 0 }"
      >
        <q-list padding>
          <q-item>
            <q-item-section
              avatar
            >
              <icon-component/>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Pomme
              </q-item-label>
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
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="logo"/>
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
import iconComponent from "components/iconComponent.vue";
import {userLogging} from "src/model/UserRepository";

export default {
  components: {EssentialLink, SimplePopupComponent, LoginComponent, iconComponent},
  setup() {
    const getImageUrl = () => {
      return new URL(`~assets/pomme.png`, import.meta.url).href
    }
    const leftDrawerOpen = ref(false)

    let isLoggedIn = ref(false)
    let displayName = ref("")
    userLogging.onUpdate(
      (user) => {
        isLoggedIn.value = !!user;
        displayName.value = user?.displayName
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
          title: "Planner",
          link: {name: "planner"},
          icon: "calendar_today",
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
      isLoggedIn,
    }
  }
}
</script>
