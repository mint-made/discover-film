<template>
  <div class="max-width-1000">
    <div class="container bg-dark card-grid shadow">
      <movie-card
        v-for="movie in data.watchList"
        v-bind:key="movie.title"
        v-bind:movie="movie"
      ></movie-card>
    </div>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import { mapState } from "vuex";
export default {
  name: "watch",
  components: { MovieCard },
  computed: {
    ...mapState(["data"])
  }
};
</script>

<style></style>
