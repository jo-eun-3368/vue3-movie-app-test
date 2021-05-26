<template>
  <div class="container">
    <input
      class="form-control"
      v-model="title"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    <div class="selects">
      <!--v-model 통해 filter의 name의 데이터에 접금이 가능하다. $data는 데이터에 접근할 수 있도록 해주는 vue 기능이다-->
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">

        <option
          v-if="filter.name==='year'"
          value="">
          All Years
        </option>

        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>

      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      검색
    </button>
  </div>
</template>

<script>

export default {

  data(){
    return{
      title:'',
      type:'movie',
      number:10,
      year:'',
      filters:[ //배열데이터
        {
          name:'type',
          items:['movie','series','episode']
        },
        {
          name:'number',
          items: [10,20,30] //페이지 수를 제한할 수 있음
        },
        {
          name: 'year',
          items: (()=>{ //즉시실행함수 로직
            const years=[]
            const thisYear=new Date().getFullYear() //오늘의 날짜를 찾아주는 로직
            for(let i=thisYear; i>=1985;i -= 1){
              years.push(i)  //계속해서 반환
            }
            return years;
          })()
          // 자동으로 배열데이터 만들기 = 즉시실행 함수 = 함수가 선언됨과 동시에 호출이 필요없이 실행하는 함수
        }
      ]
    }
  },
  methods:{
     async apply(){
       //검색메소드 설정 = 스토어에 dispatch(vuex의 actions를 실행하기위한)라는 매개변수를 써서 searchMovie를 실행시킨다 (Movie.js의 payload라는 이름으로 데이터를 건넨)
       //객체데이터 payload로 movie.js에 전달됨
       this.$store.dispatch('movie/searchMovies',{
          title:this.title,
          type:this.type,
          number:this.number,
          year:this.year
        })
    }
  },
}
</script>

<style lang="scss" scoped>

.container{
  >*{
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }
  display: flex;
  .selects{
    display: flex;
    select{
      width: 120px;
      margin-right: 10px;
      &:last-child{
        margin-right: 0px
      }
    }
  }
  .btn{
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink:0; //절대 감소하지 않도록 (지정된 너비보다 줄어드는 것을 방지)
  }

  @include media-breakpoint-down(lg){
    /*라지사이즈보다 작은경우 */
    display: block;
    input{
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects{
      margin-right: 0;
      margin-bottom: 10px;
      select{
        width: 100%;
      }
    }
    .btn{
      width: 100%;
    }
  }
}

</style>