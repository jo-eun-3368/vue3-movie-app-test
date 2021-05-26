/* 기본 요소의 상태를 설정
* mutations 통해 업데이트 설정 및 정보를 배포
* mutations 안에 resetMovies 을 통해 movie 의 새로운 배열을 초기화 시켜준다
* actions 은 비동기로 처리되며
* -- searchMovies 를 통해 사용자의 검색 버블링을 막아주고 검색 전 환경을 구성해준다.
* -- try,catch,finally 를 통해 페이지수 제어, 표현되는 객체수 제어 및 중복된 요소를 제거해준다.
* -- searchMovieWithId 를 통해 _fetchMovie함수에서 API 데이터를 받아와 검색 결과가 없을 경우 error를 설정해주고 객체 데이터 안에 erro 요소가 있을 경우에는 실행시키지 않도록 제어를 해준다.
* */

import axios from "axios";
import _uniqBy from 'lodash/uniqBy';


/*해당 컴포넌트에서만 같이 사용하는 데이터*/
const _defaultMessge='Search for the movie title!'

export default {
    //module 에서 명시적으로 사용가능하다. 모듈이 독립적이거나 재사용되기를 원할 경우 true로 설정
     namespaced: true,

    //기본! 상태요소 데이터
    state: ()=> ({
        movies:[],
        message:_defaultMessge,
        loading: false,
        theMovie:{}
    }),

    //computed! 데이터를 새로운 개념으로 만들어낼때 사용 => state를 연결해서 활용
    getters: {},

    mutations: {
        updateState(state, payload){
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
          /*state.movie=payload.movie
          //state 데이터갱신로직
          //object.keys는 객체데이터의 속성을 반환시켜서 배열함수로 만들어준다 ['movies','message','loading']
          /*state.message=payload.message*/
        },
        resetMovies(state){
            state.movies = []  //새로운 배열로 초기화
            state.message=_defaultMessge
            state.loading=false
        }
    },

    //mutations 이외의 나머지 요소를 활용 비동기로 처리된다.
    actions:{
         async searchMovies({ state, commit },payload){
             if(state.loading){
                 return
             } //사용자가 여러번 서칭 할경우 버블링을 막아주는 동작 return을 사용하여 가능하다

             commit('updateState',{
                 //payload로 데이터가 들어감
                 message:'', //검색전의 메세지를 계속 초기화
                 loading: true
             })

             try{
                 const res = await _fetchMovie({
                     ...payload,
                     page: 1
                 })
                 const { Search, totalResults } = res.data

                 commit('updateState', {
                     movies:_uniqBy(Search, 'imdbID'),
                 })

                 const total=parseInt(totalResults, 10) //결과값이 10개만 표현되도록(전역숫자데이터)
                 const pageLength = Math.ceil(total/10) //한 페이지당 10개의 정보가 검색되도(올림처리)

                 //추가옵션요청 전송 !
                 if(pageLength>1){
                     for(let page = 2; page <= pageLength; page +=1){
                         if(page>(payload.number/10)) break
                         const res = await _fetchMovie({
                             ...payload,
                             page
                         })
                         const { Search } = res.data
                         commit('updateState',{
                             movies:[
                                 ...state.movies,
                                 ..._uniqBy(Search,'imdbID')
                             ] //movie의 내용을 전개 연산자 ...을 통해 배열시켜서 새로운 데이터가 들어올때마다 할당시켜준다.
                         })
                     }
                 }
             } catch (message){
                 commit('updateState',{
                     movies: [], //검색된 내용이 있는데 에러가 실행되는경우 에러메세지를 띄어주겟다는 뜻
                     message:'',
                 })
             } finally {
                 commit('updateState',{
                     loading: false
                 })
             }
         },
        async searchMovieWithId({ state, commit }, payload){
             if(state.loading) return

             commit('updateState',{
                 theMovie:{}, //기존 영화목록이 잠깐이라도 실행되는것을 방지 => 초기값을 넣어줌
                 loading: true
             })

             try{
                 const res = await _fetchMovie(payload)
                 // console.log(res.data)
                 commit('updateState',{
                     theMovie: res.data
                 })
             } catch(error){
                 commit('updateState',{
                     theMovie:{}
                 })
             } finally{
                 commit('updateState',{
                     loading: false //초기값 넣어주기
                 })
             }
        }
    },
}

//_는 현재 프로젝트에서만 사용한다는
function _fetchMovie(payload){
    const { title, type, year, page, id } = payload
    const OMDb_API_KEY = '7035c60c'
    const url = id ? `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&i=${id}` : `https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    //fetchMovie가 비동기로 실행될 수 있도
    return new Promise((resolve,reject)=>{
        axios.get(url)
            .then((res)=>{

                if(res.data.Error){
                    reject(res.data.Error) //Error가 속성으로 있는 경우 실행시키지 않도록
                }
                resolve(res)
            })
            .catch(err =>{
                reject(err.message)
            }) //목록을 가져올때 문제가 발생하면 나타내준다.
    })
}