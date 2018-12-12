<template>
  <div class="console" @click="$refs.input.focus()">
    <div
      v-for="(rowHtml, index) in shell.output"
      :key="index"
      class="row"
      v-html="rowHtml"
    />
    <div class="row input-row">
      &gt;&nbsp;
      <input
        type="text"
        ref="input"
        spellcheck="false"
        v-model="shell.input"
        @keyup.enter="shell.execute()"
        @keyup.arrow-up="arrowUp"
        @keyup.arrow-down="arrowDown"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { format } from 'date-fns'
import Shell from '../lib/Shell'

@Component
export default class Terminal extends Vue {
  shell = new Shell()

  arrowUp (event: KeyboardEvent) {
    event.preventDefault()
    this.shell.loadPreviousCommand()
  }

  arrowDown (event: KeyboardEvent) {
    event.preventDefault()
    this.shell.loadNextCommand()
  }

  mounted () {
    (this.$refs.input as HTMLInputElement).focus()

    const formattedDate = format(new Date(), 'ddd MMM D HH:mm:ss')
    this.shell.print(`Last login: ${formattedDate} on ttys008`)
    this.shell.input = 'cat contact.html'
    this.shell.execute()
    this.shell.input = 'cat work.html'
    this.shell.execute()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

html, body {
  height: 100%;
}

body {
  --green: #b2df53;
  --blue: #82d7ec;
  --grey: #222222;
  --off-white: #cfcfc1;

  background-color: var(--grey);
}

.console a {
  color: var(--blue);
  text-decoration: none;
}

.console pre {
  margin: 0;
  font-family: inherit;
}

.console ul {
  margin: 0;
  padding-left: 1.5em;
  list-style-type: none;
}

.console .green-background {
  background-color: var(--green);
  color: var(--grey);
  text-transform: uppercase;
  padding: 0 .5em;
  padding-bottom: .17em;
  margin-bottom: .17em;
  display: inline-block;
}

.console .green-text {
  color: var(--green);
}
</style>

<style scoped lang="scss">
.console {
  font-family: 'Roboto Mono', monospace;
  color: var(--off-white);
  font-size: 12px;
  min-height: 100%;
  overflow: hidden;
  line-height: 1.4;
  cursor: text;
  padding: 0.5em;
  position: absolute;
  width: 100%;
  bottom: 0;
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
</style>
