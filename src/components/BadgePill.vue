<template>
  <span
    class="pill"
    v-bind:style="{ backgroundColor: background, color: color, fontSize: size }"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "BadgePill",
  props: ["color", "background", "size"]
};
</script>
