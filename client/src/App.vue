<template>
  <div id="app">
    <pp-header></pp-header>
  <router-view/>
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

export default {
  name: 'App',
  components: {
      ppHeader: Header
  }
}
</script>

<style>

html {
  background-color: #F8F9FA;
}

#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar-expand-lg .navbar-collapse {
 display:inline-block;
    float: none;
    text-align: center;
}
</style>
