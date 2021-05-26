<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
<!--        nav요소의 path를 반환 isMatch Methods가 true일 경우 활성화 => 다른요소에 path가 없기 때문에 return으로 반환해주어 false를 반환해준다.-->
        <RouterLink
          :to="nav.href"
          :class="{active:isMatch(nav.path)}"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div class="user" @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
import { mapState } from 'vuex';
export default {
  components:{
    Logo
  },
  data(){
    return{
      navigations:[
        {
          name:'Search',
          href:'/'
        },
        {
          name:'Movie',
          href:'/movie',
          //아이템을 클릭할경우 active가 활성화되어 movie메뉴가 활성화되도록 해준다.
          path: /^\/movie/ //속성값을 이용한다. -> 경로를 의미'/movie'
        },
        {
          name:'About',
          href:'/about'
        },
      ]

    }
  },
  computed:{ //여기서의 데이터는 this.로 사용

    ...mapState('about',[
       'image',
       'name'
    ]),

    ...mapState('movie',[
        'movies', // 다른 상태를 가지고오는것도 가능하다.
    ])

   /* image(){
      return this.$store.state.about.image
    },
    name(){
      return this.$store.state.about.name
    }*/
  },
  methods:{
    isMatch(path){
      if(!path) return false //만약에 path가 없는 경우에는 그냥 반환
      //console.log(this.$route)
      return path.test(this.$route.fullPath) // 있는경우는 정규표현식과 일치하는지 확인하고 true와 false로 나눈다.
    },
    toAbout(){
      this.$router.push('/bout')
    }
  }
}
</script>

<style lang="scss" scoped>

header{
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo{
    margin-right: 40px;
  }
  .user{
    width: 40px;
    height: 40px;
    padding:6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    &:hover{
      background-color: darken($gray-200,10%);
    }
    img{
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm){
    .nav{
      display: none;
    }
  }
}
</style>