//about요소에 관련된 정보를 보관해놓는다.

export default {
    namespaced: true,
    //데이터의 불편성 = state가 고유해 질수 있기 위해 반환로직을 사용 ()=>
    state:()=>({
        name:'HEROPY',
        email: 'thesecon@gmail.com',
        blog: 'dddd',
        phone:'01033682084',
        image: 'https://heropy.blog/css/images/logo.png'
    })
}