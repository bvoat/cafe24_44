/* 비보트에서 공통으로 사용하는 함수 모음 */

/*
 * 함수 외부에 DOM 관련 변수 선언 금지
 * layout.html에 script 태그로 삽입
 */


/* 환경변수 확인 */
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

/* 클래스 토글 */
// 클래스가 들어갔다 나갔다 할 node를 element에, 클래스 이름을 className에 전달
function classToggle(element, className) {
  element.classList.toggle(className);
}

/* 모달 생성 함수 */
//모달 필요 시 제목, 설명, ok버튼, no버튼, 각각의 실행 함수 전달
//dialog가 웹뷰 환경에서 정상적으로 동작하지 않아 HTML 모달로 실행
function createdModal(heading, text, okmsg, nomsg, okfunc, nofunc) {
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
  document
    .querySelector("#bvtContainer")
    .insertAdjacentHTML("afterbegin", modal_form);
  // 버튼 클릭 시 발생할 이벤트 수신
  document.querySelector(".ok_btn").addEventListener("click", okfunc);
  document.querySelector(".no_btn").addEventListener("click", nofunc);
}

/* 가격 감시 함수 */
function monitoringPrice() {
  console.log("price monitoring");
  const price_content = document.querySelectorAll(".price_wrap");
  price_content.forEach((price) => {
    //변경 여부를 discount에 저장
    let discount = price.children[0];
    //공급가 = 정가 = '소비자가'
    let fixprice = price.children[1];
    let fixprice_data = fixprice.dataset.price;
    //실 판매가 = 할인가 = '판매가'
    let realprice = price.children[2];
    let realprice_data = realprice.dataset.price;

    /* 이미 변경된 경우를 체크 */
    //변경 안 되었으면 실행 if
    if (!discount.classList.contains("price_check")) {
      //소비자가(정가) 데이터가 있고
      //판매가(할인가) 데이터가 있고
      //소비자가의 숫자가 0이 아니어야 하고
      //소비자가랑 판매가가 같지 않으면
      //할인 중
      if (
        fixprice_data &&
        realprice_data &&
        parseInt(fixprice_data) != "0" &&
        parseInt(fixprice_data) != parseInt(realprice_data)
      ) {
        //소비자가(정가)에 strike_price class 붙이고
        fixprice.classList.add("strike_price");
        //판매가(할인가)에 onpromotion class 붙이고
        realprice.classList.add("onpromotion");
        //판매가(할인가)에 finalprice class 붙이기
        realprice.classList.add("finalprice");

        //할인된 가격 계산
        let discount_num = parseInt(fixprice_data) - parseInt(realprice_data);
        //할인율 계산
        let percentage = Math.floor(
          (discount_num / parseInt(fixprice_data)) * 100
        );
        //할인율 넣고 할인 부분 보이게 하기
        discount.insertAdjacentText("beforeend", `${percentage}%`);
        discount.classList.remove("displaynone");

        //가격 체크 여부 저장
        discount.classList.add("price_check");

        //소비자가(정가)는 없고 판매가(실판매가)에 가격이 있어야 하고
        //소비자가(정가)의 가격이 0이거나
        //소비자가(정가)의 가격이 비어있거나
        //소비자가(정가)와 판매가(실판매가)가 같으면
        // 할인 안함 else if
      } else if (
        (!fixprice_data && realprice_data) ||
        parseInt(fixprice_data) == 0 ||
        fixprice_data == "" ||
        parseInt(fixprice_data) == parseInt(realprice_data)
      ) {
        //소비자가에 "원" 표시되지 않도록 삭제
        fixprice.classList.add("displaynone");

        //판매가에 finalprice class 붙이기
        realprice.classList.add("finalprice");

        //가격 체크 여부 저장
        discount.classList.add("price_check");
      }
    } else {
      null;
    }
  });
}
window.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".price_wrap")) {
    monitoringPrice();
  }
});

const checkMoreView = () => {
  let btn = document.querySelectorAll(".moreview_btn");
  Array.from(btn).forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        monitoringPrice();
      }, 400);
    });
  });
};

window.addEventListener("load", () => {
  checkMoreView();
});
//상단바 컨트롤
/* nav 컨트롤 스크립트 */
function controlTabNav (page_path) {
  // nav 전체
  const back_btn = document.querySelector(".back_btn");
  const default_nav = document.querySelector(".default_top_nav");
  const comm_nav = document.querySelector(".community_top_nav");
  //제외할 path
  const expect_array = ["order/basket","order/orderform", "product/detail","/product/category","/myshop/wish_list","/member/login","/myshop/index", "member/modify"];
  //커뮤니티용 path
  const community_array = ["community", "buy_records"];
  //뒤로가기 path
  const back_array = ["product/detail", "order/basket", "order/orderform", "community/community_view", "community/community_write", "/buy_records/view.html", "/buy_records/write.html", "order/basket", "id/find_id", "passwd/find_passwd_info", "member/login", "member/modify"];

  //디폴트 메뉴 사라지게
  expect_array.forEach((path) => {
    page_path.includes(path) ? default_nav.classList.add("displaynone") : null;
  });
  community_array.forEach((path) => {
    if (page_path.includes(path)) {
      default_nav.classList.add("displaynone");
      comm_nav.classList.remove("displaynone");
      document.querySelector(`#${path}_nav`).classList.add("top_nav_active");
    }
  });
  back_array.forEach((path)=>{
    if (page_path.includes(path)) {
      back_btn.classList.remove("visiblehidden");
    }
  })
};
window.addEventListener("DOMContentLoaded", () => {
  controlTabNav(window.location.href);
});

