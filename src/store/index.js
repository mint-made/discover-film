import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: {
      key: "api_key=b956dbbe760427382db31b3c104dff50",
      baseURL: "https://api.themoviedb.org/3/",
      genres: [
        {
          id: 12,
          name: "Adventure",
          isActive: false
        },
        {
          id: 14,
          name: "Fantasy",
          isActive: false
        },
        {
          id: 16,
          name: "Animation",
          isActive: false
        },
        {
          id: 18,
          name: "Drama",
          isActive: false
        },
        {
          id: 27,
          name: "Horror",
          isActive: false
        },
        {
          id: 28,
          name: "Action",
          isActive: false
        },
        {
          id: 35,
          name: "Comedy",
          isActive: false
        },
        {
          id: 36,
          name: "History",
          isActive: false
        },
        {
          id: 37,
          name: "Western",
          isActive: false
        },
        {
          id: 53,
          name: "Thriller",
          isActive: false
        },
        {
          id: 80,
          name: "Crime",
          isActive: false
        },
        {
          id: 99,
          name: "Documentary",
          isActive: false
        },
        {
          id: 878,
          name: "Science Fiction",
          isActive: false
        },
        {
          id: 9648,
          name: "Mystery",
          isActive: false
        },
        {
          id: 10402,
          name: "Music",
          isActive: false
        },
        {
          id: 10749,
          name: "Romance",
          isActive: false
        },
        {
          id: 10751,
          name: "Family",
          isActive: false
        },
        {
          id: 10752,
          name: "War",
          isActive: false
        },
        {
          id: 10770,
          name: "TV Movie",
          isActive: false
        }
      ],
      years: [
        {
          name: "1950s",
          id: 1,
          isActive: false,
          startYear: "1950-01-01",
          endYear: "1959-01-01"
        },
        {
          name: "1960s",
          id: 2,
          isActive: false,
          startYear: "1960-01-01",
          endYear: "1969-01-01"
        },
        {
          name: "1970s",
          id: 3,
          isActive: false,
          startYear: "1970-01-01",
          endYear: "1979-01-01"
        },
        {
          name: "1980s",
          id: 4,
          isActive: false,
          startYear: "1980-01-01",
          endYear: "1989-01-01"
        },
        {
          name: "1990s",
          id: 5,
          isActive: false,
          startYear: "1990-01-01",
          endYear: "1999-01-01"
        },
        {
          name: "2000s",
          id: 6,
          isActive: false,
          startYear: "2000-01-01",
          endYear: "2009-01-01"
        },
        {
          name: "2010s",
          id: 7,
          isActive: false,
          startYear: "2010-01-01",
          endYear: "2019-01-01"
        },
        {
          name: "2020",
          id: 10,
          isActive: false,
          startYear: "2020-01-01",
          endYear: "2020-01-01"
        }
      ],
      base: {
        img: {
          w154: "https://image.tmdb.org/t/p/w154",
          w185: "https://image.tmdb.org/t/p/w185",
          w342: "https://image.tmdb.org/t/p/w342",
          w500: "https://image.tmdb.org/t/p/w500"
        },
        yt: "https://www.youtube.com/embed/"
      }
    },
    discover: [],
    dataFromAPI: "",
    data: {
      searchResults: [],
      detailsResults: [],
      watchList: []
    }
  },
  mutations: {
    SAVE_DATA(state, dataObj) {
      /* dataObj: {data: data to be saved, key: key of location it is to be saved to} */
      if (dataObj.data.length > 1) {
        dataObj.data.forEach(item => state.data[dataObj.key].push(item));
      } else if (dataObj.data.length === 1) {
        state.data[dataObj.key].push(dataObj.data);
      }
    },
    CLEAR_DATA(state, key) {
      //key is the location that data is to be cleared e.g. state.data.searchResults
      state.data[key].length = 0;
    },
    ADD_DATA(state, data) {
      const movie = state.movies.find(movie => movie.id == data.id);
      movie[data.type] = data.results;
    },
    MODIFY_PICK_DATA(state, data) {
      /*receives data object: {
        type: type of data to be changed
        id: "id of data to be changed",
        property: "property to be changed",
        value: "value it is to be changed to"  
      }*/
      let selectedData = state.API[data.type].find(item => item.id === data.id);
      selectedData[data.property] = data.value;
    },
    ADD_WATCHLIST(state, id) {
      console.log("added to watchlist");
      const newFilm = state.data.searchResults.find(film => film.id === id);
      state.data.watchList.push(newFilm);
    },
    REMOVE_WATCHLIST(state, id) {
      console.log("remove from watchlist");
      state.data.watchList = state.data.watchList.filter(
        film => film.id !== id
      );
    }
  },
  getters: {
    getGenres: state => id => {
      //Returns an array of the genre names for the given id
      let movie = state.data.searchResults.find(
        movie => movie.id === Number(id)
      );
      if (!movie) {
        movie = state.data.watchList.find(movie => movie.id === Number(id));
      }
      const genres = [];
      movie.genre_ids.forEach(id => {
        genres.push(state.API.genres.find(genre => genre.id === id));
      });
      //console.log("genres: ", genres);
      return genres;
    },
    filterGenres: state => genreID => {
      return state.movies.filter(movie => movie.genre_ids.includes(genreID));
    },
    watchListIds: state => {
      const idArray = [];
      state.data.watchList.forEach(film => idArray.push(film.id));
      return idArray;
    }
  },
  actions: {
    discoverGet({ commit, state }) {
      const activeGenres = state.API.genres.filter(
        genre => genre.isActive === true
      );
      const activeYears = state.API.years.filter(
        year => year.isActive === true
      );
      if (activeYears.length > 0 && activeGenres.length > 0) {
        commit("CLEAR_DATA", "searchResults");
        let genreQueryString = [];
        activeGenres.forEach(genre => {
          genreQueryString.push(genre.id);
        });
        genreQueryString = genreQueryString.join("%2C%20");
        activeYears.forEach(year => {
          let request = `${state.API.baseURL}discover/movie?${state.API.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${year.startYear}&primary_release_date.lte=${year.endYear}&with_genres=${genreQueryString}`;
          fetch(request)
            .then(response => response.json())
            .then(data => {
              commit("SAVE_DATA", {
                data: data.results,
                key: "searchResults"
              });
            });
        });
      } else {
        alert("Select at least one genre and one year range");
      }
    },
    searchMovies({ commit, state }, search) {
      console.log(search.query);
      const request = `${state.API.baseURL}search/movie?${state.API.key}&query=${search.query}&page=1`;
      console.log(request);
      fetch(request)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          commit("SAVE_REQUEST", data.results);
        });
    },
    movieDetailsGet({ commit, state }, param) {
      //param is an object with @param = type & id
      console.log(param);
      const request = `${state.API.baseURL}movie/${param.id}/${param.type}?${state.API.key}`;
      fetch(request)
        .then(response => response.json())
        .then(data => {
          console.log(2);
          const formatedData = {
            type: param.type,
            id: param.id,
            results: data.results
          };
          commit("ADD_DATA", formatedData);
        });
    },
    toggleGenreSearch({ commit }, param) {
      const data = {
        type: "genres",
        id: param.id,
        property: "isActive",
        value: !param.isActive
      };
      commit("MODIFY_PICK_DATA", data);
    },
    toggleYearSearch({ commit }, param) {
      const data = {
        type: "years",
        id: param.id,
        property: "isActive",
        value: !param.isActive
      };
      commit("MODIFY_PICK_DATA", data);
    },
    toggleWatchList({ commit, state }, id) {
      const watchListIdArray = [];
      state.data.watchList.forEach(film => watchListIdArray.push(film.id));
      if (watchListIdArray.includes(id)) {
        commit("REMOVE_WATCHLIST", id);
      } else {
        commit("ADD_WATCHLIST", id);
      }
    }
  },
  modules: {}
});
