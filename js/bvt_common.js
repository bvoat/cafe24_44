/* 비보트에서 공통으로 사용하는 함수 모음 */

/*
 * 함수 외부에 DOM 관련 변수 선언 금지
 * layout.html에 script 태그로 삽입
 */

//path 체크
console.log("path_name", window.location.href);
//환경변수 세팅
let api_domain;
const cafe_host = window.location.host;
const live_arr = [
  "bvoat.com",
  "m.bvoat.com",
  "mobile21",
  "skin38",
  "mobile10",
  "skin21",
];
const test_arr = ["skin44", "mobile9"];
//테스트용 스킨이 아니면 실서버 도메인이 api_domain에 부여됨
test_arr.forEach((path) => {
  cafe_host.includes(path)
    ? (api_domain = "bvoat-test")
    : (api_domain = "bvoat");
});

//클래스 토글
// 클래스가 들어갔다 나갔다 할 node를 element에, 클래스 이름을 className에 전달
function classToggle (element, className) {
  element.classList.toggle(className);
}

//모달 생성 함수 
//모달 필요 시 제목, 설명, ok버튼, no버튼, 각각의 실행 함수 전달
//dialog가 웹뷰 환경에서 정상적으로 동작하지 않아 HTML 모달로 실행
function createdModal (heading, text, okmsg, nomsg, okfunc, nofunc) {
  let modal_form = `
  <section id="bvtCommonModal">
      <div id="bvtCommonForm" method="dialog">
          <h1 class="bvt_modal_title">${heading}</h1>
          <p class="bvt_modal_text">${text}</p>        
          <div class="bvt_modal_btn">
              <button class="ok_btn" data-msg="true">${okmsg}</button>
              <button class="no_btn" data-msg="false">${nomsg}</button>
          </div>
      </div>
  </section>
  `;
//화면 상단에 전달
document.querySelector("#bvtContainer").insertAdjacentHTML("afterbegin", modal_form);
// 버튼 클릭 시 발생할 이벤트 수신
document.querySelector(".ok_btn").addEventListener("click", okfunc);
document.querySelector(".no_btn").addEventListener("click", nofunc);
}


//가격 감시 함수
function monitoringPrice () {
  const price_content = document.querySelectorAll(".price_wrap");

  price_content.forEach((price)=>{
    let discount = price.children[0];
    let display_product = price.children[1];
    console.log('display_product: ', display_product);
    let display_discount = price.children[2];
    console.log('display_discount: ', display_discount);
    // let product_name = price.previousElementSibling;

    //소비자가(할인가)가 내부에 가격이 있고 판매가에도 가격이 있고 소비자가의 숫자가 0이 아니면 (할인 중)
    if(display_discount.hasChildNodes()  && display_product.hasChildNodes() && parseInt(display_discount.dataset.price)!= '0'){
      //판매가에 strike_price class 붙이고
      display_product.classList.add("strike_price");
      //소비자가에 onpromotion class 붙이고
      display_discount.classList.add("onpromotion");
      //소비자가에 finalprice class 붙이기
      display_discount.classList.add("finalprice");

      //할인된 가격 계산
      let discount_num = display_product.dataset.price-display_discount.dataset.price;
      //할인율 계산
      let percentage = Math.floor(discount_num / display_product.dataset.price * 100);
      //할인율 넣고 할인 부분 보이게 하기
      discount.insertAdjacentText("beforeend", `${percentage}%`);
      discount.classList.remove("displaynone");
      
      //소비자가는 없고 판매가에 가격이 있고 소비자가의 가격이 0이면 (할인 안함)
    }else if(!display_discount.hasChildNodes() && display_product.hasChildNodes() || parseInt(display_discount.dataset.price) == 0 || display_discount.dataset.price == ""){
      //소비자가에 "원" 표시되지 않도록 삭제
      display_discount.classList.add("displaynone");
      
      //판매가에 finalprice class 붙이기
      display_product.classList.add("finalprice");
    }
  });
}

window.addEventListener("DOMContentLoaded", ()=>{monitoringPrice()})





//상단바 컨트롤
/* nav 컨트롤 스크립트 */
const controlTabNav = (page_path) => {
  // nav 전체
  console.log("page_path",page_path);
  const top_nav = document.querySelector("#top_nav");
  const default_nav = document.querySelector(".default_top_nav");
  const comm_nav = document.querySelector(".community_top_nav");
  //제외할 대표 path 단어
  const expect_array = ['myshop/index', 'join', 'modify', 'detail', 'basket'];
  //커뮤니티용 path 단어
  const community_array = ['community', 'buy_records'];
  //nav용 path 단어
  const nav = ['crew', 'index', 'funding']
  //디폴트 메뉴 사라지게
  expect_array.forEach((path)=>{
    page_path.includes(path) ? default_nav.classList.add("displaynone") : null;
  })
  community_array.forEach((path)=>{
    if(page_path.includes(path)) {
      default_nav.classList.add("displaynone");
      comm_nav.classList.remove("displaynone");
      document.querySelector(`#${path}`).classList.add("top_nav_active");
    }
  });

}
window.addEventListener("DOMContentLoaded", ()=>{controlTabNav(window.location.href)})