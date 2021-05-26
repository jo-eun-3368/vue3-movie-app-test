export default {

    //플러그인 사용
    //$이 붙어있는경우 플러그인을 사용한다는 뚯
    install(app){
        app.config.globalProperties.$loadImage=(src)=>{
            return new Promise((resolve)=>{ //resolve,reject 사용가능
                const img = document.createElement('img') //'img'라는 파일을 생성해주는 로직을 img로 정의해 넣는다.
                img.src = src //이미지의 소스는 src로 넣어준다.

                //약속의 실행로직\
                img.addEventListener('load',()=>{
                    //이벤트 추가= load가 완료될 경우 비동기로 resolve 실행해준다.
                    resolve()
                })
            }) // 비동기 처리 반환
        }
    }
}