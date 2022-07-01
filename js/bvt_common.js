/* 비보트에서 공통으로 사용하는 함수 모음 */

/*
* DOM 관련 변수 선언 금지
* layout.html에 script 태그로 삽입
*/
//path 체크
console.log('path_name', window.location.href);
//환경변수 세팅
let api_domain;
const cafe_host = window.location.host;
const live_arr = ["bvoat.com", "m.bvoat.com", "mobile21", "skin38", "mobile10", "skin21"];
const test_arr = ["skin44", "mobile9"];

live_arr.forEach((path)=>{
    cafe_host.includes(path) ? api_domain = "bvoat" : api_domain = "bvoat-test";
})

//.pricenonsale in common.css
//list.js에 더보기에 적용하는 customPrice 함수 있음
//detail.js에 적용하는 customPrice 함수 있음
const customPrice = (priceList) => {
    priceList.forEach((node) => {
        //node 두 개의 children 모두 존재하면 정가(오른쪽1)에 pricenonsale 클래스 추가 아니면 sale_price(왼쪽0) displaynone
            if(node.children[0].hasChildNodes() && node.children[1].hasChildNodes()) {
            node.children[1].classList.add("pricenonsale");
            } else {
                node.children[0].classList.add("displaynone");
            }
            // console.log("node", node);
            // console.log("node.chidren[0]", node.children[0].hasChildNodes());
            // console.log("node.chidren[1]", node.children[1].hasChildNodes());
    });
}
const priceNonSaleStyle = (customPrice) => {
    const price_wrap_node = document.querySelectorAll(".price_wrap");
    if(price_wrap_node != null){
        customPrice(price_wrap_node) 
    }
}
//함수 실행
setTimeout(() => {priceNonSaleStyle(customPrice)}, 1000)
/* 가격 할인율 표시 */




//클래스 토글
const classToggle = (element, className) => {
    element.classList.toggle(className)
}

//모달 생성
const createdModal = (heading, text, okmsg, nomsg, okfunc, nofunc) => {
    let modal_form = `
    <section id="bvtCommonModal" >
        <div id="bvtCommonForm" method="dialog">
            <h1 class="bvt_modal_title">${heading}</h1>
            <p class="bvt_modal_text">${text}</p>        
            <div class="bvt_modal_btn">
                <button class="ok_btn" data-msg="true">${okmsg}</button>
                <button class="no_btn" data-msg="false">${nomsg}</button>
            </div>
        </div>
    </section>
    `
    document.querySelector('#bvtContainer').insertAdjacentHTML("afterbegin", modal_form)
    // 버튼 클릭 시 발생할 이벤트 수신
    document.querySelector(".ok_btn").addEventListener("click", okfunc)
    document.querySelector(".no_btn").addEventListener("click", nofunc)
}
