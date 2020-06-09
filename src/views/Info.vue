<template>
  <div class="max-width-1000 container infopage-grid bg-dark shadow">
    <div class="image-container">
      <img class="border-radius" :src="imageURL" alt />
    </div>
    <div class="description-container center-content bg-darker text-steel">
      <h1>{{ selectedMovie.title }}</h1>
      <p>{{ selectedMovie.overview }}</p>
    </div>
    <div class="info-container center-content bg-darker text-steel">
      <h3>
        Release |
        <i>{{ formatedDate }}</i>
      </h3>
      <progress-bar :percent="selectedMovie.vote_average * 10 + '%;'"
        >Avg Review: {{ selectedMovie.vote_average }}</progress-bar
      >
      <progress-bar :percent="popularityPercent"
        >Popularity: {{ selectedMovie.popularity }}</progress-bar
      >
      <badge-pill
        v-for="genre in getGenres(selectedMovie.id)"
        v-bind:key="genre.id"
        background="purple"
        >{{ genre.name }}</badge-pill
      >
    </div>
    <div class="trailer-container">
      <iframe
        id="ytplayer"
        type="text/html"
        class="border-radius"
        :src="videoURL"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BadgePill from "../components/BadgePill.vue";
import ProgressBar from "../components/ProgressBar.vue";
export default {
  name: "Info",
  props: ["id"],
  components: { BadgePill, ProgressBar },
  methods: {
    ...mapActions({
      movieDetailsGet: "movieDetailsGet"
    }),
    findMovie(id) {
      let infoData = this.data.searchResults.find(
        movie => movie.id === Number(id)
      );
      if (!infoData) {
        infoData = this.data.watchList.find(movie => movie.id === Number(id));
      }
      return infoData;
    },
    getVideo() {
      fetch(`${this.API.baseURL}movie/${this.id}/videos?${this.API.key}`)
        .then(response => response.json())
        .then(data => {
          const trailer = data.results.find(
            trailer => trailer.site === "YouTube"
          );
          this.selectedMovie.videos = trailer.key;
        });
    }
  },
  computed: {
    ...mapState(["data", "API"]),
    ...mapGetters(["getGenres"]),
    imageURL() {
      return this.API.base.img.w500 + this.selectedMovie.poster_path;
    },
    videoURL() {
      return this.API.base.yt + this.selectedMovie.videos;
    },
    popularityPercent() {
      let popularity = Math.log2(this.selectedMovie.popularity) * 10;
      if (popularity > 100) {
        popularity = 100;
      }
      if (popularity < 0) {
        popularity = 0;
      }
      return popularity + "%";
    },
    formatedDate() {
      const monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const month = Number(this.selectedMovie.release_date.substring(5, 7));
      const year = this.selectedMovie.release_date.substring(0, 4);
      return monthArray[month - 1] + " " + year;
    }
  },
  created() {
    this.selectedMovie = this.findMovie(this.id);
    this.getVideo();
  }
};
</script>

<style scoped lang="scss">
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

//Outer container
.infopage-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
}
//Inner Containers
.image-container {
  grid-area: 1 / 1 / 4 / 3;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.trailer-container {
  grid-area: 3 / 3 / 6 / 6;
  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
}
.description-container {
  grid-area: 1 / 3 / 3 / 6;
  padding: 10px;
  border-radius: 10px;
  h1 {
    border-bottom: solid $steel 3px;
  }
  i {
    font-weight: 400;
  }
}
.info-container {
  grid-area: 4 / 1 / 6 / 3;
  padding: 10px;
  border-radius: 10px;
}
</style>
