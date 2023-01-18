/* 비보트에서 공통으로 사용하는 함수 모음 */

/*
 * 함수 외부에 DOM 관련 변수 선언 금지
 * layout.html에 script 태그로 삽입
 */
 
/* 환경변수 확인 */
//환경변수 세팅
let api_domain;
let now_cafe_href = window.location.href;
if (
  now_cafe_href.includes("skin-skin44") ||
  now_cafe_href.includes("skin-mobile9")
) {
  api_domain = "bvoat-test";
} else {
  api_domain = "bvoat";
}
console.log("api_domain: ", api_domain);
/* 환경변수 확인 */

/**
 * url parameter 가져오는 함수 
 * @param {location.search} search 
 * @param {parameter} param 
 */
function getUrlParams(param){
  return new URLSearchParams(location.search).get(param);
}


/**
 * 브랜드, 요약 설명 감시 함수 
*/
function monitoringDesc(){
  let brand = document.querySelectorAll(".brand");
  let summary = document.querySelectorAll(".summary");
  brand.forEach((el)=>{ el.style.fontSize = "10px"});
  summary.forEach((el)=>{ el.style.fontSize = "11.5px"});
  console.log("monitoring desc")
} 

function monitoringPrice() {
  console.log("price monitoring");
  const priceWrap = document.querySelectorAll(".price_wrap");
  priceWrap.forEach((price)=>{
    const fixedPrice = price.children[0];
    const fixedPriceNum = Number((fixedPrice.dataset.price).replace(/,/g,""));
    const realPrice = price.children[1];
    const realPriceNum = Number((realPrice.dataset.price).replace(/,/g,""));
    const discount = price.children[2];

  //소비자가가 입력된 경우 체크
  //소비자가 없으면 0으로 표시
  if(fixedPriceNum != 0){
    //소비자가와 판매가가 같으면 할인 없음
    if(fixedPriceNum == realPriceNum){
      //할인이 없기 때문에 1개의 가격만 노출하면 되나
      //소비자가가 없는 경우가 있기 때문에 판매가를 노출하고 소비자가를 감춤
      fixedPrice.classList.add("displaynone");
      //판매가에 finalprice 클래스 삽입
      realPrice.classList.add("finalprice")
    }
    //소비자가가 판매가보다 크면 할인 있음
    if(fixedPriceNum > realPriceNum){
      //할인이 있는 경우 소비자가에 strike 처리
      fixedPrice.classList.add("strike_price");
      //판매가에 finalprice 클래스 삽입
      realPrice.classList.add("finalprice");
      //할인율 계산하여 discount에 삽입
        //할인된 가격 계산
        let discount_num = fixedPriceNum - realPriceNum;
        //할인율 계산
        let percentage = Math.floor(
          (discount_num / fixedPriceNum) * 100
        );
        discount.innerHTML = `${percentage}%`;
    }
  }else{
    //소비자가가 0이면 할인 없음
    //할인이 없기 때문에 1개의 가격만 노출하면 되나
    //소비자가가 없는 경우가 있기 때문에 판매가를 노출하고 소비자가를 감춤
    fixedPrice.classList.add("displaynone");
    //판매가에 finalprice 클래스 삽입
    realPrice.classList.add("finalprice")
  }
  })


}
window.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".price_wrap")) {
    setTimeout(monitoringPrice,900)
    // setTimeout(monitoringDesc,900)
  } else {
    setTimeout(monitoringPrice,1200)
    // setTimeout(monitoringDesc,1200)
  }
});

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
/* 모달 생성 함수 */

//더보기 시 실행
const checkMoreView = () => {
  let btn = document.querySelectorAll(".moreview_btn");
  Array.from(btn).forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        monitoringPrice();
      }, 1000);
    });
  });
};

window.addEventListener("load", () => {
  checkMoreView();
});

/* nav 컨트롤 스크립트 */
//상단바 컨트롤
function controlTopNav(page_path) {
  // nav 전체
  const back_btn = document.querySelector(".back_btn");
  const default_nav = document.querySelector(".default_top_nav");
  const comm_nav = document.querySelector(".community_top_nav");
  //상단바 (탑메뉴) 사라지게 할 path
  const expect_array = [
    "order/basket",
    "order/orderform",
    "product/detail",
    "product/category",
    "myshop/wish_list",
    "member/login",
    "myshop/index",
    "member/modify",
  ];
  //커뮤니티용 path
  const community_array = ["community", "buy_records", "crewinfo", "reviews"];
  //뒤로가기 있어야 하는 path
  const back_array = [
    "product/detail",
    "order/basket",
    "order/orderform",
    "community_view",
    "community_write",
    "buy_records/view.html",
    "buy_records/write.html",
    "order/basket",
    "id/find_id",
    "passwd/find_passwd_info",
    "member/login",
    "member/modify",
    "list.html?cate_no=766",
    "list.html?cate_no=763",
    "list.html?cate_no=767",
    "list.html?cate_no=764"
  ];

  //상단바 (탑메뉴) 사라지게 하기
  expect_array.forEach((path) => {
    page_path.includes(path) ? default_nav.classList.add("displaynone") : null;
  });
  //커뮤니티 하단바로 변경하기
  community_array.forEach((path) => {
    if (page_path.includes(path)) {
      console.log('path: ', path);
      default_nav.classList.add("displaynone");
      comm_nav.classList.remove("displaynone");
      // document.querySelector(`#${path}_nav`).classList.add("top_nav_active");
      document.querySelector(`.${path}_nav`).classList.add("top_nav_active");
    }
  });

  //뒤로가기 표시 하기
  back_array.forEach((path) => {
    if (page_path.includes(path)) {
      back_btn.classList.remove("visiblehidden");
    }
  });
}
//상단바 active 표시
function controlTopNavActive(page_path) {
  console.log('page_path: ', page_path);
  //path가 상품 관련일 때
  if (page_path.includes("/product/list.html")) {
    //상품 관련 -> 비보트 추천 에 active
    document.querySelector("#index").classList.add("top_nav_active");
    //path가 방금 샀어요면
  } else if(page_path.includes("/product/realtime.html")){
    //상품 관련 -> 비보트 추천 에 active
    document.querySelector("#prd").classList.add("top_nav_active");
    //path가 크루면
  } else if (page_path.includes("crew/crew.html") || page_path.includes("crew/crewinfo.html")) {
    //크루에 active 
    document.querySelector("#crew").classList.add("top_nav_active");
    //path가 비보트 소개면
  } else if (page_path.includes("introduce")) {
    //비보트 소개에 active
    document.querySelector("#intro").classList.add("top_nav_active");
    //아무것도 확인되지 않으면
  } else {
    //비보트 추천에 active
    document.querySelector("#index").classList.add("top_nav_active");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  //top nav 숨기기 함수
  controlTopNav(window.location.href);
  //top nav active 함수 
  controlTopNavActive(window.location.href);
});
/* nav 컨트롤 스크립트 */ 

/* 아이폰 스크롤 시 튕김 현상 prevent */
// disable touchmove event when height is smaller than screen height
window.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
    },
    false
  );
});
/* 아이폰 스크롤 시 튕김 현상 prevent */

/* clipboardJS */
const clipboardCopy = (element, txt, ok, no) => {
  console.log('txt: ', txt);
  let clipboardinit = new ClipboardJS(`${element}`, { text: () => txt });
  clipboardinit.on("success", (e) => {
    console.log("Action:", e.action);
    ok();
    e.clearSelection();
    clipboardinit.destroy();
  });
  clipboardinit.on("error", function (e) {
    console.error("Action:", e.action);
    no();
    clipboardinit.destroy();
  });
};
/* clipboardJS */

/* 공유 기능 + 모달 */

window.addEventListener("load", () => {
  let shareBtn = document.querySelectorAll(".share_btn");
  console.log('shareBtn: ', shareBtn);
  if (shareBtn) {
    [...shareBtn].forEach((btn)=>{
      btn.addEventListener("click", (event) => {
        createSharingModal(event);
      });
    })
  }
});

/**
 * 공유 모달 폼 생성
 * @param {이벤트} e 
 */
const createSharingModal = (e) => {
  let modal_form = `
  <section id="bvtCommonModal">
      <div id="bvtCommonShareForm" method="dialog">
          <h1 class="bvt_modal_title">친구에게 공유하기</h1>    
          <div class="bvt_modal_btn">
              <button class="facebook_share share_action" data-type="facebook" title="페이스북으로 공유하기"><span>페이스북</span></button>
              <button class="kakaotalk_share share_action" data-type="kakao" title="카카오톡으로 공유하기"><span>카카오톡</span></button>
              <button class="link_copy share_action" data-type="clipboard" title="상품 링크 클립보드로 복사하기"><span>링크복사</span></button>
          </div>
      </div>
      <button class="share_close_btn">닫기</button>
  </section>
  `;
  //화면 상단에 전달
  document
    .querySelector("#bvtContainer")
    .insertAdjacentHTML("afterbegin", modal_form);
  //버튼별 액션
  [...document.querySelectorAll(".share_action")].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let share_type = e.currentTarget.dataset.type;
      bvoatShare(share_type, window.location.href)
    });
  });
  //닫기 버튼 클릭
  document.querySelector(".share_close_btn").addEventListener("click", () => {
    document.querySelector("#bvtCommonModal").remove();
  });
};

/**
 * 
 * @param {텍스트, 카카오톡, 페이스북 data-type} type 
 * @param {location.href} _url 
 */
const bvoatShare = (type, _url) => {
  console.log('type: ', type);
  if (type === "clipboard") {
    console.log("clipboard")
    const ifsuccess = () => {
      // alert("URL 복사가 완료 되었습니다.");
      let okmsg = `<div class="share_link_ok_msg">URL 복사가 완료되었습니다.</div>`
      document.querySelector("#bvtContainer").insertAdjacentHTML("beforeend",okmsg);
      document.querySelector("#bvtCommonModal").remove();
      //사라지는 애니메이션 all 0.5s ease-in-out;
      setTimeout(()=>{
        document.querySelector(".share_link_ok_msg").classList.add("disappear");
        //완전 node 삭제
        setTimeout(()=>{document.querySelector(".share_link_ok_msg").remove();}, 1101)
      }, 600)
    };
    const iferror = () => {
      alert("복사 실패😢 다시 한 번 시도해주세요");
    };
    clipboardCopy(".link_copy", _url, ifsuccess, iferror);
  } else if (type == "kakao") {
    let share_title = document.querySelector("meta[property=\'og:title\']").getAttribute("content");
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${share_title}`,
        description: `${share_title}`,
        imageUrl:
          "https://bvoat.com/web/upload/share-image-1-7415ca0886cec14f1fbbe5c28cbccec1.png",
        link: {
          mobileWebUrl:
            _url +
            "/?utm_source=kakaotalk&utm_medium=sharelink&utm_campaign=sharebykakao",
          webUrl:
            _url +
            "/?utm_source=kakaotalk&utm_medium=sharelink&utm_campaign=sharebykakao",
        },
      },
      buttons: [
        {
          title: "바로가기",
          link: {
            mobileWebUrl:
              _url +
              "/?utm_source=kakaotalk&utm_medium=sharelink&utm_campaign=sharebykakao",
            webUrl:
              _url +
              "/?utm_source=kakaotalk&utm_medium=sharelink&utm_campaign=sharebykakao",
          },
        },
      ],
    });
  } else if (type == "facebook") {
    window.open(`http://www.facebook.com/sharer.php?u=${_url}`)
  }
};

/* 공유 기능 + 모달 */


/**
 * 숫자 카운트
 * @param {숫자 넣을 node} $counter 
 * @param {최대치} max 
 */
 function numberCounting($counter, max) {
  let now = max;

  const handle = setInterval(() => {
      const gap = Math.ceil(max - now);
      const number = gap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      $counter.innerHTML = number;

      // 목표에 도달하면 정지
      if (now < 1) {
      clearInterval(handle);
      }

      // 적용될 수치, 점점 줄어듬
      const step = now / 10;
      now -= step;
  }, 40);
}
/* 클래스 토글 */
// 클래스가 들어갔다 나갔다 할 node를 element에, 클래스 이름을 className에 전달
function classToggle(element, className) {
  element.classList.toggle(className);
}
/* 클래스 토글 */
	
/**
 * 로컬에서 가져옴
 * @param {*} key 
 * @param {*} reverse 
 * @returns 
 */
function getArraylocal(key, reverse) {
	let str = localStorage.getItem(key);
	let obj = {};
	try {
		obj = JSON.parse(str);
	} catch {
		obj = {};
	}
	if (!obj) {
		obj = {};
		obj[key] = [];
	}
	return reverse ? obj[key].reverse() : obj[key];
}
/**
 * 로컬에 저장
 * @param {*} key 
 * @param {*} value 
 * @param {*} limitMax 
 */
function setArraylocal(key, value, limitMax) {
  var str = localStorage.getItem(key);
  var obj = {};
  try {
      obj = JSON.parse(str);
  } catch {
      obj = {};
  }
  if (!obj) {
      obj = {};
      obj[key] = [];
  }
  obj[key].push(value);
  if (limitMax && limitMax < obj[key].length) {
      let tempList = [];
      for (let i = obj[key].length - limitMax; i < obj[key].length; i++) {
          tempList.push(obj[key][i]);
      }
      obj[key] = tempList;
  }
  localStorage.setItem(key, JSON.stringify(obj));
}
