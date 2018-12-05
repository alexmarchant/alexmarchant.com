<template>
  <div class="console" @click="$refs.input.focus()">
    <div
      v-for="(rowHtml, index) in terminal.output"
      :key="index"
      class="row"
      v-html="rowHtml"
    />
    <div class="row input-row">
      &gt;&nbsp;
      <input
        type="text"
        ref="input"
        v-model="terminal.input"
        @keyup.enter="terminal.execute()"
        @keyup.arrow-up="arrowUp"
        @keyup.arrow-down="arrowDown"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Terminal from '../lib/Terminal'

@Component
export default class Console extends Vue {
  terminal = new Terminal()

  arrowUp (event: KeyboardEvent) {
    event.preventDefault()
    this.terminal.loadPreviousCommand()
  }

  arrowDown (event: KeyboardEvent) {
    event.preventDefault()
    this.terminal.loadNextCommand()
  }

  mounted () {
    this.terminal.input = 'cat work.html'
    this.terminal.execute()
  }
}
</script>

<style lang="scss">
.console a {
  color: var(--blue);
  text-decoration: none;
}

.console pre {
  margin: 0;
  font-family: inherit;
}
</style>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

.console {
  --green: #b2df53;
  --blue: #82d7ec;
  --grey: #222222;
  --off-white: #cfcfc1;

  font-family: 'Roboto Mono', monospace;
  background-color: var(--grey);
  color: var(--off-white);
  font-size: 12px;
  height: 100vh;
  overflow: hidden;
  line-height: 1.4;
  cursor: text;
  padding: 0.5em;
}

input {
  background: transparent;
  border: 0;
  color: var(--off-white);
  line-height: 1.4;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  padding: 0;
  width: 100%;
}

input::before {
  content: '>';
  color: var(--off-white);
}

input:focus {
  outline: none;
}

.row {
  margin: 3px 0;
}

.input-row {
  display: flex;
}

.indent {
  margin-left: 1.5em;
}

.green-background {
  background-color: var(--green);
  color: var(--grey);
  text-transform: uppercase;
  padding: .1em .5em;
}

.green-text {
  color: var(--green);
}
</style>
