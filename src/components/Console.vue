<template>
  <div class="console">
    <div class="row">
      Last login: Tue Dec  4 20:49:50 on ttys008
    </div>
    <div class="row">
      &gt; ./alex_marchant_resume.sh
    </div>
    <div class="row">Loading...</div>
    <div class="row">
      <span class="green-background">Done</span>
      <span class="green-text"> Loaded successfully in 8ms</span>
    </div>
    <div class="row">&nbsp;</div>
    <div class="indent">
      <div class="row">
        Current role:
      </div>
      <div class="row">
        - fullstack dev @ alpha: <a href="https://alphahq.com" target="_blank">https://alphahq.com</a>
      </div>
      <div class="row">&nbsp;</div>
      <div class="row">
        Previous:
      </div>
      <div class="row">
        - photoism: <a href="https://www.mastinlabs.com/photoism" target="_blank">https://www.mastinlabs.com/photoism</a>
      </div>
      <div class="row">
        - mastin labs: <a href="https://www.mastinlabs.com" target="_blank">https://www.mastinlabs.com</a>
      </div>
      <div class="row">
        - plug: <a href="https://www.plugformac.com" target="_blank">https://www.plugformac.com</a>
      </div>
      <div class="row">
        - tiled: <a href="https://www.tiled.co" target="_blank">https://www.tiled.co</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

a {
  color: var(--blue);
  text-decoration: none;
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
}

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
}

.row {
  margin: 3px 0;
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
