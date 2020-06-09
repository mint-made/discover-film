<template>
  <div class="max-width-1000 container bg-dark text-steel shadow">
    <div class="container bg-darker mb-20">
      <h2>Welcome to Search Discover Watch!</h2>
      <h3>We save you time, helping you find films to watch.</h3>
    </div>
    <div class="container bg-darker mb-20">
      <h3>Start by selecting the genres of films you would like to watch.</h3>

      <span
        v-for="genre in API.genres"
        v-bind:key="genre.id"
        v-bind:class="{ active: genre.isActive }"
        class="pill toggle-pill"
        @click="toggleGenreSearch(genre)"
        >{{ genre.name }}</span
      >
    </div>
    <div class="container bg-darker">
      <h3>Next select the year ranges</h3>
      <span
        v-for="year in API.years"
        v-bind:key="year.id"
        v-bind:class="{ active: year.isActive }"
        class="pill toggle-pill"
        @click="toggleYearSearch(year)"
        >{{ year.name }}</span
      >
      <div>
        <button @click="initSearch" class="btn btn-x btn-padding mt-20 mb-20">
          Generate Suggestions
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Search",
  computed: {
    ...mapState(["API"])
  },
  methods: {
    ...mapActions({
      toggleGenreSearch: "toggleGenreSearch",
      toggleYearSearch: "toggleYearSearch",
      discoverGet: "discoverGet"
    }),
    initSearch() {
      this.$router.push({
        name: "Discover"
      });
      this.discoverGet();
    }
  }
};
</script>

<style lang="scss">
/*Colors*/
$darker: #153c44;
$dark: #026670;
$viridian: #14a098;
$mint: #9fedd7;
$sand: #fef9c7;
$lemon: #fce181;
$steel: #edeae5;
$steel-2: #cccccc;
$telemagenta: #cb2d6f;
$purple: #501f3a;
$green: rgb(0, 173, 0);

.toggle-pill {
  background-color: purple;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
span.active {
  background-color: $green;
}
</style>
