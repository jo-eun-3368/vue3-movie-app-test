<template>
  <div class="container">
    <div :class="{'no-result':!movies.length} " class="inner">
      <Loader v-if="loading"/>
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <div
        v-else
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" />
<!--        movie라는 props로 :Item컴포넌트에 전달-->
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
import Loader from "~/components/Loader";
import { mapState } from 'vuex';
export default {
  components:{
    Loader,
    MovieItem
  },
  //계산된 데이터를 불러오는 값 computed => vuex로 만들어진 데이터를 store 에서 불어와준다.
  computed:{
    ...mapState('movie',[
        'movies',
        'message',
        'loading'
    ]),
   /* movies(){
      return this.$store.state.movie.movies
    },
    message(){
      return this.$store.state.movie.message
    },
    loading(){
      return this.$store.state.movie.loading
    }*/
  }
}
</script>

<style lang="scss" scoped>

.container{
  margin-top: 30px;
  .inner{
    background-color: $gray-200;
    padding: 10px 0;
    border-right: 4px;
    text-align: center;
    &.no-result{
      padding:70px 0;
    }
  }
  .message{
    color: $gray-400;
    font-size: 20px;
  }
  .movies{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>