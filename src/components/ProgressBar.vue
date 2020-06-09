<template>
  <div class="progress-bar">
    <span>
      <slot></slot>
    </span>
    <div class="progress" :style="'width: ' + percent"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ["percent"]
};
</script>

<style lang="scss">
/*Base Color Scheme*/
$darker: #0f292f;
$dark: #026670;
$viridian: #14a098;
$mint: #9fedd7;
$sand: #fef9c7;
$lemon: #fce181;
$steel: #edeae5;
$steel-2: #cccccc;
$telemagenta: #cb2d6f;
$purple: #501f3a;

.progress-bar {
  border: solid $steel 2px;
  background-color: red;
  width: 100%;
  height: 34px;
  border-radius: 4px;
  position: relative;
  margin-bottom: 10px;
  box-sizing: border-box;
  span {
    position: absolute;
    right: 0;
    left: 0;
    top: 5px;
    font-weight: 700;
  }
}
.progress {
  height: 30px;
  background-color: green;
}
</style>
