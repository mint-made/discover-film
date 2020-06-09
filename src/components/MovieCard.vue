<template>
  <div class="card border-radius shadow">
    <div class="card-image" v-on:click="renderInfoPage(movie.id)">
      <img :src="API.base.img.w342 + movie.poster_path" alt="Movie Poster" />
    </div>
    <div class="card-content">
      <h3>
        {{ movie.title }}
        <i>({{ movie.release_date.substring(0, 4) }})</i>
      </h3>
      <div>
        <badge-pill
          v-for="genre in getGenres(movie.id)"
          :key="genre.id"
          background="purple"
          size="12px"
          >{{ genre.name }}</badge-pill
        >
      </div>
      <div>
        <badge-pill
          v-if="inWatchList(movie.id)"
          class="watchlist"
          background="rgb(0, 173, 0)"
          size="12px"
          @click.native="toggleWatchList(movie.id)"
          >Watchlist &#10004;</badge-pill
        >
        <badge-pill
          v-if="!inWatchList(movie.id)"
          class="watchlist"
          background="red"
          size="12px"
          @click.native="toggleWatchList(movie.id)"
          >Watchlist &#10008;</badge-pill
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BadgePill from "../components/BadgePill.vue";
export default {
  name: "MovieCard",
  props: ["movie"],
  components: { BadgePill },
  methods: {
    ...mapActions({
      toggleWatchList: "toggleWatchList"
    }),
    renderInfoPage(id) {
      console.log(id);
      this.$router.push({
        name: "Info",
        params: { id: id }
      });
    },
    addToWatchlist() {
      console.log("click");
    },
    inWatchList(id) {
      if (this.watchListIds.includes(id)) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapState(["API", "data"]),
    ...mapGetters(["getGenres", "watchListIds"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/*Base Color Scheme*/
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

.card {
  .card-image {
    &:hover {
      cursor: pointer;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      opacity: 0.8;
    }
    height: 70%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px 10px 0px 0px;
    }
  }
  .card-content {
    padding: 2px 4px;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: $darker;
    border-radius: 0px 0px 10px 10px;
    color: $steel;
    h3 {
      margin: 3px;
    }
    i {
      font-weight: 400;
    }
  }
}
span.watchlist {
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
