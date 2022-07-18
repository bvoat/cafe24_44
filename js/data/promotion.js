//프로모션 parameter 받기
let promo = new URLSearchParams(window.location.search).get("promo");
let node;
//프로모션 parameter가 있으면
if(promo !== null){
    //세션에 1회 저장
    sessionStorage.setItem("promo", promo);
    //parameter로 받은 배열 돌면서 배열 순으로 node를 가지고 와서
    //해당 #indexProductBvt section의 style의 order 변경
    for (const [index, no] of JSON.parse(promo).entries()) {
        node = document.getElementById(`indexProductBvt${no}`)
        node.style.order = index+1;
    }
}else if(sessionStorage.getItem("promo")){
    //parameter에는 없으나 session에 promo 배열 저장되어 있으면
    //동일 작업 진행
    console.log('sessionStorage.getItem("promo"): ', JSON.parse(sessionStorage.getItem("promo")));
    JSON.parse(sessionStorage.getItem("promo")).forEach((no, index)=> {
        node = document.getElementById(`indexProductBvt${no}`)
        node.style.order = index+1;
    });
}else{
    null;
}
