/* 비보트에서 공통으로 사용하는 함수 모음 */

/*
* 변수 선언 금지
* layout.html에 script 태그로 삽입

*/

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
    document.querySelector(".ok_btn").addEventListener("click", okfunc)
    document.querySelector(".no_btn").addEventListener("click", nofunc)
}

//가격 할인율 표시
//.pricenonsale in common.css

const customPrice = (priceList) => {
    priceList.forEach((node) => {
        console.log('node: ', node);
        //node 두 개의 children 모두 존재하면 정가(오른쪽1)에 pricenonsale 클래스 추가 아니면 sale_price(왼쪽0) displaynone
            if(node.children[0].dataset.price && node.children[1].dataset.price) {
            node.children[1].classList.add("pricenonsale");
            } else {
                node.children[0].classList.add("displaynone");
            }
          
    });

}


const priceNonSaleStyle = (customPrice) => {

const price_wrap_node = document.querySelectorAll(".price_wrap");
customPrice(price_wrap_node) 


}
//함수 실행

setTimeout(() => {priceNonSaleStyle(customPrice)}, 800)