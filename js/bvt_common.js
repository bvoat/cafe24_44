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
    // 1. 주기적으로 감지할 대상 요소 선정
  const target = document.querySelector('#bvtContents');
  
  // 2. 옵저버 콜백 생성
  const callback = (mutationList, observer) => {
    console.log(mutationList);
  };
  
  // 3. 옵저버 인스턴스 생성
  const observer = new MutationObserver(callback); // 타겟에 변화가 일어나면 콜백함수를 실행하게 된다.
  
  // 4. DOM의 어떤 부분을 감시할지를 옵션 설정
  const config = { 
      attributes: true, // 속성 변화 할때 감지
      childList: true, // 자식노드 추가/제거 감지
      // characterData: true // 데이터 변경전 내용 기록
  };
  
  // 5. 감지 시작
  observer.observe(target, config);
  
  // 6. 감지 중지
  observer.disconnect();
}
window.addEventListener("DOMContentLoaded", ()=>{monitoringPrice()})