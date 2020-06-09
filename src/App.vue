<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Search</router-link>
      <router-link to="/Discover">Discover</router-link>
      <router-link to="/Watch">Watch</router-link>
    </div>
    <div class="router-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
/*Base Color Scheme*/
$navDarker: #0f292f;
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

* {
  box-sizing: border-box;
}
body {
  margin: 0px;
  background-color: $viridian;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 59px;
  #nav {
    padding: 15px 15px;
    background-color: $navDarker;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
    a {
      font-weight: bold;
      color: $steel;
      text-decoration: none;
      padding: 15px;
      &:hover {
        background-color: $dark;
      }
      &.router-link-exact-active {
        background-color: $viridian;
      }
    }
  }
  .router-container {
    margin: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
}

/***Global Styles***/
/*Classes*/
.max-width-1000 {
  max-width: 1000px;
  width: 100%;
}
.container {
  padding: 10px;
  border-radius: 10px;
}
.mb-20 {
  margin-bottom: 20px;
}
.mt-20 {
  margin-top: 20px;
}
.shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.shadow-bright {
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
}
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
}
.border-radius {
  border-radius: 10px;
}
.pill {
  padding-right: 0.6em;
  padding-left: 0.6em;
  font-weight: 700;
  border-radius: 10rem;
  margin: 2px;
  display: inline-block;
}
.btn {
  display: inline-block;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 2px solid black;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-x {
  background-color: $darker;
  border-color: $green;
  color: $green;
  &:hover {
    background-color: $green;
    color: $steel;
  }
}
.btn-padding {
  padding: 0.375rem 0.75rem;
}
.bg-darker {
  background-color: $darker;
}
.bg-dark {
  background-color: $dark;
}
.bg-viridian {
  background-color: $viridian;
}
.bg-mint {
  background-color: $mint;
}
.text-steel {
  color: $steel;
}

/*Media Queries */
@media only screen and (max-width: 860px) {
  .card-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media only screen and (max-width: 650px) {
  .card-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media only screen and (max-width: 440px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
