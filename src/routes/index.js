//페이지 옵션 구성 router를 통해 plugin처럼 활용을 한다

import {createRouter, createWebHashHistory} from "vue-router";
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'


export default createRouter({


    history: createWebHashHistory(),


    scrollBehavior(){
        return { top: 0 }
    },

    //페이지 경로설정
    routes:[
        {
            path:'/',
            component:Home
        },
        {
            path:'/movie/:id',
            component:Movie
        },
        {
            path:'/about',
            component:About
        },
        {
            path:'/:NotFound(.*)',
            component:NotFound
        },
    ]
})


//동적세그먼트는 콜론으로 시작한다. 라우트가 일치하면 세그먼트의 값은 모든 컴포넌트에서 $route.params로 표시된다.
//NotFound를 위한 로직 최대한 많은 요소와 일치시켜 NotFound를 표현해준다.