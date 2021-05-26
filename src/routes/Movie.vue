<template>
  <div class="container">
    <!--로딩요소를 넣어주기 위해 v-if를 활용한다.-->
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <loader
        :size="3"
        :z-index="9"
        fixed/>
    </template>
    <!--loading 데이터가 false일때 출력되도록 한다-->
    <div v-else class="movie-details">
      <div
        :style="{ backgroundImage : `url(${requestDiffSizeImage(theMovie.Poster)})`}"
        class="poster">
        <Loader
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Release }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{Source: name, Value: score} in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "~/components/Loader";


export default {
  components: {Loader},
  data(){
    return{
      imageLoading: true
    }
  },
  computed:{ //계산되어져 있는 데이터를 불러오는 역할 = computed
    theMovie(){
      return this.$store.state.movie.theMovie
    },
    loading(){
      return this.$store.state.movie.loading
    }
  },
  created() {
    // console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId',{
      // movie/tt1275555 route의 주소 정보에 접근할 수 있다.
      id: this.$route.params.id
    })
  },
  methods:{
    //사이즈 변경 로직 및 이미지가 로드되지 않을경우 예외처리하기
    requestDiffSizeImage(url, size = 700){
      if(!url || url === 'N/A'){
        this.imageLoading = false
        return '' //아래쪽 로직을 실행하지 않도록 한다.(문자데이터 반환을 위해 아무것도 표시되지 않도록 표현)
        //url 부분이 존재하지 않거나 또는 'N/A'와 포스터값이 같은 경우 (N/A는 포스터 번호)
      }
      const src = url.replace('SX300',`SX${size}`) //300을 700으로 변경한다는 뜼 (문자를 바꿔서 전송)
      this.$loadImage(src)
      .then(()=>{
        this.imageLoading = false
      })
      return src
    }
  }
}
</script>

<style lang="scss" scoped>

.container{
  padding-top: 40px;
}
.skeletons{
  display: flex;
  .poster{
    flex-shrink: 0;  //감소하지 않겠다는
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
  }
  .specs{
    flex-grow: 1; //증가너비를 최대한 사용할 수 있도록
  }
  .skeleton{
    border-radius: 10px;
    background-color: $gray-200;
    &.title{
      width: 80%;
      height: 70px;
    }
    &.spec{
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot{
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc{
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details{
  display: flex;
  color: $gray-600;
  .poster{
    flex-shrink: 0;
    width: 500px;
    height: 500px*3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .specs{
    flex-grow: 1; //증가너비 설정
    .title{
      color: $black;
      font-family: "Oswald",sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels{
      color: $primary;
      span{
        &::after{
          content: "\00b7"; //content에 특수문자를 사용할때
          margin:0 6px;
        }
        &:last-child::after{
          display: none;
        }
      }
    }
    .plot{
      margin-top: 20px;
    }
    .ratings{
      .rating-wrap{
        display: flex;
        .rating{
          display: flex;
          margin-right: 32px;
          align-items: center;
          img{
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3{
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
  @include media-breakpoint-down(xl){
    .poster{
      width: 300px;
      height: 300px * 3/2;
      margin-right: 40px;
    }
  }
  @include media-breakpoint-down(lg){
    display: block;
    .poster{
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md){
    .specs{
      .title{
        font-size: 50px;
      }
      .ratings{
        .rating-wrap{
          display: block;
          .rating{
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
