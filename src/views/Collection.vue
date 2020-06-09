<template>
  <div class="max-width-1000">
    <div class="container bg-dark search mb-20 shadow">
      <div class="collection-search">
        <h2>Search</h2>
        <input
          type="text"
          v-model="search.query"
          v-on:keyup.enter="searchMovies(search)"
        />
        <button v-on:click="searchMovies(search)">Search</button>
      </div>
      <div class="collection-sort">
        <h2>Filter</h2>
        <form>
          <select>
            <option>Show All Genres</option>
            <option
              v-for="genre in API.genres"
              :key="genre.name"
              @click="filterGenre(genre.id)"
              >{{ genre.name }}</option
            >
          </select>
        </form>
      </div>
    </div>
    <div class="container bg-dark card-grid shadow">
      <movie-card
        v-for="movie in filteredMovies"
        v-bind:key="movie.title"
        v-bind:movie="movie"
      ></movie-card>
    </div>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Collection",
  components: { MovieCard },
  data() {
    return {
      search: {
        query: ""
      },
      filteredMovies: "",
      filter: {
        genre: {
          active: false,
          id: null
        }
      }
    };
  },
  computed: {
    ...mapState(["movies", "API", "dataFromAPI"]),
    ...mapGetters(["filterGenres"])
  },
  methods: {
    ...mapActions({
      searchMovies: "searchMovies"
    }),
    filterGenre(genreID) {
      this.filteredMovies = this.filterGenres(genreID);
    }
  },
  created() {
    this.filteredMovies = this.movies;
  }
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

.search {
  display: flex;
  justify-content: space-around;
  color: $steel;
  h2 {
    margin-bottom: 15px;
    margin-top: 0px;
  }
  div {
    width: 50%;
    background-color: $darker;
    border-radius: 10px;
    padding: 10px;
  }
  .collection-sort {
    margin-left: 5px;
  }
  .collection-search {
    margin-right: 5px;
  }
}
</style>
