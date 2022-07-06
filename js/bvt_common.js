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

test_arr.forEach((path)=>{
    cafe_host.includes(path) ? api_domain = "bvoat-test" : api_domain = "bvoat";
})

//.pricenonsale in common.css
// //list.js에 더보기에 적용하는 customPrice 함수 있음
// const customPrice = (priceList) => {
//     priceList.forEach((node) => {
//         //node 두 개의 children 모두 존재하면 정가(오른쪽1)에 pricenonsale 클래스 추가 아니면 sale_price(왼쪽0) displaynone
//             if(node.children[0].hasChildNodes() && node.children[1].hasChildNodes()) {
//             node.children[1].classList.add("pricenonsale");
//             } else {
//                 node.children[0].classList.add("displaynone");
//             }
//             // console.log("node", node);
//     });
// }
// const priceNonSaleStyle = (customPrice) => {

//     const price_wrap_node = document.querySelectorAll(".price_wrap");
//     if(price_wrap_node != null){
//         customPrice(price_wrap_node) 
//     }
// }
// //함수 실행
// setTimeout(() => {priceNonSaleStyle(customPrice)}, 1000)
// /* 가격 할인율 표시 */


/* 할인 가격 있으면 정가 class 추가 */

//price 중에 sale_price 있으면 정가에 스타일 처리
//sale_price에 '원' 빠진 경우 span 만들어서 원 글자 삽입
const customPriceListMoreview = (priceWrapNode) => {
    console.log("pricewrap", priceWrapNode);
    priceWrapNode.forEach((node) => {
      //node 두 개의 children 모두 존재하면 정가(오른쪽1)에 pricenonsale 클래스 추가 아니면 sale_price(왼쪽0) displaynone
      if(node.children[0].hasChildNodes() && node.children[1].hasChildNodes()) {
        node.children[1].classList.add("pricenonsale");
        } else {
            node.children[0].classList.add("displaynone");
        }
    });
  };
  
  const moreViewClick = (customPriceListMoreview) => {
    //DOM 변화 감시하다가 변화 있으면 적용
    const priceWrapNode = document.querySelectorAll(".price_wrap");
    customPriceListMoreview(priceWrapNode);
  };
  
  //최초 DOM 로딩 시 실행
  moreViewClick(customPriceListMoreview);
  
  //감시 할 DOM Node
  let target = document.querySelector(".product_listnormal_list_wrap");
  //감시 객체
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // console.log(mutation);
      //mutations 변화 시 실행
      moreViewClick(customPriceListMoreview);
    });
  });
  
  // 3. 옵션 설정
  let config = {
    attributes: true,
    childList: true,
    characterData: true,
  };
  
  // 4. 실행
  observer.observe(target, config);
  
  /* 할인 가격 있으면 정가 class 추가 */
  
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
    document.querySelector(".ok_btn").addEventListener("click", okfunc);
    document.querySelector(".no_btn").addEventListener("click", nofunc);
}
