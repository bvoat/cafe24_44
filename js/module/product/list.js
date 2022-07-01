/* category description 추가 */

//title 전체 변수화
const category_title = document.querySelector("#productListTitle");
//h1에서 data category 받아오기
const category = document.querySelector(".category_title").dataset.main;
console.log('category: ', category);
// 멘트 객체
const description = {
  패션: "책임 있는 소비와 생산, 지속 가능한 패션 어때요?",
  식품: "공장식 축산업 문제, 기후 위기 해결에 투표하세요.",
  뷰티: "식물성으로 만든 순하디 순한 비건 뷰티로 갈아탈 때",
  리빙: "오히려 좋아, 오히려 편해! 친환경 리빙 가보자고!",
  All: "발견해요, 가치있게 대체할 것"
};

//카테고리 별로 h2 변경
const makeHeadingTwo = (category, description) => {
  if(category != undefined){
    let find = description[category];
    category_title.insertAdjacentHTML('beforeend',`<h2>${find}</h2>`)
    if(category == 'All'){
      category.innerHTML="가치소비 전체보기";
    }
  } else {
    category_title.insertAdjacentHTML('beforeend',`<h2>${description['All']}</h2>`)
  }
};
window.addEventListener("DOMContentLoaded",makeHeadingTwo(category, description)
)
/* category description 추가 */

/* 하위 카테고리 슬라이드 */
var swiper = new Swiper(".subCategorySwiper", {
  slidesPerView: 6,
  spaceBetween: 16,
});

/* 하위 카테고리 슬라이드 */

/* 할인 가격 있으면 정가 class 추가 */

//price 중에 sale_price 있으면 정가에 스타일 처리
//sale_price에 '원' 빠진 경우 span 만들어서 원 글자 삽입
const customPriceListMoreview = (priceWrapNode) => {
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
