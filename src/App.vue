<template>
  <terminal />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Terminal from './components/Terminal.vue'

@Component({
  components: {
    Terminal
  }
})
export default class App extends Vue {}
</script>

<style land="scss">
html, body {
  margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
</style>
