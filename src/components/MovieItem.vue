<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{backgroundImage:`url(${movie.Poster})`}"
    class="movie">
    <Loader
      v-if="imageLoading"
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from "~/components/Loader";


export default {
  components:{
    Loader
  },
  props:{
    //movieList의 movie의 props 데이터를 받아준다.
    movie:{
      type:Object,
      default:()=>({}) //기본값은 빈 객체로 받아들이겠다 - 기본적으로 객체데이터는 가변할 수 있기때문에 함수로 만들어서 객체데이터로 반환해야 한다.
    }
  },
  data(){
    return{
      imageLoading: true //이미지가 로딩되고 있다는것이 true로 설정되어있음
    }
  },
  /*mounted - html 요소가 연결이 끝난경우 실행
  * create - 기본요소 연결이 끝난경우 실행 */
  mounted() {
    //html연결이 끝난 후 실행
    this.init()
  },
  methods:{
    async init(){ //비동기로 동작해야 하기 때문에 async await
      const poster = this.movie.Poster //값이 여러번 들어가기 때문에 간결한 문장으로 대체하기 위한 선언
      if(!poster || poster === 'N/A'){
        this.imageLoading = false
      }else {
        await this.$loadImage(poster) //loadImage.js 에서 poster을 넣어 사용
        this.imageLoading = false //이미지 로딩이 끝난경우 로딩화면을 종료시켜준다.
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.movie{
  $width:200px;
  width: $width;
  height: $width * 3/2;
  margin : 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover::after{
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info{
    background-color: rgba($black,.3);
    width: 100%;
    padding:14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0; 
    backdrop-filter: blur(10px);
    .year{
      color: $primary;
    }
    .title{
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;;
    }
  }
}

</style>