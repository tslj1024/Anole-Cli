<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import apis from './api'
import useStore from './stores'
import { COLORS } from './components/blurry-gradient/colors'

import BlurryGradient from './components/blurry-gradient/BlurryGradient.vue'
// import { storeToRefs } from 'pinia'
const { counter } = useStore()
// const { count } = storeToRefs(counter)
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: -1;
      top: 0px;
      left: 0px;
      background: #292a2d; /* #292a2d #181818 */
    "
  >
    <BlurryGradient
      :colors="[...COLORS.PURPLE, ...COLORS.BLUE, ...COLORS.RED]"
      :blur="'200px'"
      :itemNumber="20"
    />
  </div>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/glass">Glass</RouterLink>
        <button
          @click="
            async () => {
              const { data, response } = await apis.get['/test']({
                args: {
                  asc: '123',
                  asx: '456',
                },
              })
              console.log(data)
              // const { data1, response1 } = await apis.get['/allUrl']({})
              // console.log(data1)
            }
          "
        >
          Send
        </button>
        <p>{{ counter.doubleCount }}</p>
        <button @click="counter.increment">count++</button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
