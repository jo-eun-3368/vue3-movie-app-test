<template>
  <Headline />
  <Search />
  <MovieList />
</template>
<script>
import Headline from '~/components/Headline'
import Search from "~/components/Search";
import MovieList from "~/components/MovieList";

export default {
  components:{
    Headline,
    Search,
    MovieList
  },
  created() {
    this.$store.commit('movie/resetMovies')
    //Home 컴포넌트가 생성된 직후에 store안에 movie.js의 resetMovie를 실행시켜준다. (mutations)
  }
}
</script>