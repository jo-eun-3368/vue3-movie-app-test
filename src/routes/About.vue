<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from "~/components/Loader";
import { mapState } from "vuex"

export default {
  components:{
    Loader
  },
  data(){
    return {
      imageLoading:true
    }
  },
  //계산된 데이터를 정의해줌 - computed - 상태에 접근해 데이터를 가져온다.(state)안에 about를 가져오며 index.js에 about으로 선언되어있기때문에 연결되어 사용이 가능하다.
  computed:{
    ...mapState('about', [
        'image',
        'name',
        'email',
        'blog',
        'phone'
    ]),
    //전개 연산자 'about'안에 들어있는 []객체

    //vue helper를 사용
    /*image(){
      return this.$store.state.about.image
    },
    name(){
      return this.$store.state.about.name
    },
    email(){
      return this.$store.state.about.email
    },
    blog(){
      return this.$store.state.about.blog
    },
    phone(){
      return this.$store.state.about.phone
    }*/
  },
  mounted() {
    this.init()
    //라이프사이클에서는 비동기함수를 사용할 수 없다 때문에 methods안에 async를 넣어주든지 해서 미리 데이터를 비동기로 만든 후 넣어주어야 한다.
  },
  methods:{
    async init(){
      await this.$loadImage(this.image)
      this.imageLoading=false
    }
  }
}
</script>


<style lang="scss" scoped>
.about{
  text-align: center;
  .photo{
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img{
      width: 100%;
    }
  }
  .name{
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }

}
</style>