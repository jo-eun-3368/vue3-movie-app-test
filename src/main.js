import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store/index.js'
import loadImage from "~/plugins/loadImage";

/*
import devtools from '@vue/devtools'

if (process.env.NODE_ENV === 'development') {
    devtools.connect(/!* host, port *!/)
}*/

createApp(App)
    //use 메소드는 라이브러리나 플러그인들을 지정하는 메소드이다
    .use(router) //$route, $router
    .use(store) //$store =>모두 this를 넣어서 사용가능
    .use(loadImage) //loadImage
    .mount('#app')
    //.use(devtools)