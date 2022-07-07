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
    let custom_price = price.children[0];
    let fixed_price = price.children[1];

    //소비자가(할인가)가 내부에 가격이 있고 판매가에도 가격이 있고 소비자가의 숫자가 0이 아니면 (할인 중)
    if(custom_price.hasChildNodes()  && fixed_price.hasChildNodes() && custom_price.dataset.price != '0'){
      //판매가에 onpromotion class 붙이고
      fixed_price.classList.add("onpromotion");
      let discount = fixed_price.dataset.price-custom_price.dataset.price;
      //할인율 계산
      let percentage = discount / fixed_price.dataset.price * 100;
      console.log('percentage: ', percentage, "할인중");
      //소비자가는 없고 판매가에 가격이 있고 소비자가의 가격이 0이면 (할인 안함)
    }else if(!custom_price.hasChildNodes() && fixed_price.hasChildNodes() || custom_price.dataset.price == 0){
      //소비자가에 "원" 표시되지 않도록 삭제
      custom_price.classList.add("displaynone");
    }
    
  })
}
window.addEventListener("DOMContentLoaded", ()=>{monitoringPrice()})

