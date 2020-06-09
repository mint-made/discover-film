<template>
  <div class="container bg-dark card-grid shadow mb-20 max-width-1000">
    <movie-card
      v-for="movie in data.searchResults"
      v-bind:key="movie.id"
      v-bind:movie="movie"
    ></movie-card>
  </div>
</template>
<script>
import MovieCard from "../components/MovieCard.vue";
import { mapState } from "vuex";
export default {
  name: "Discover",
  components: { MovieCard },
  computed: {
    ...mapState(["data"])
  }
};
</script>
