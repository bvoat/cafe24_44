/* category description 추가 */

//title 전체 변수화
const category_title = document.querySelector("#productListTitle");
//h1에서 data category 받아오기
const category = document.querySelector(".category_title").dataset.main.replace(/(\s*)/g,'');
//멘트 객체
const description = {
  패션: "책임 있는 소비와 생산, 지속 가능한 패션 어때요?",
  라이프: "비보트에서 엄선한 가치소비 제품들을 만나보세요",
  식품: "공장식 축산업 문제, 기후 위기 해결에 투표하세요.",
  뷰티: "식물성으로 만든 순하디 순한 비건 뷰티로 갈아탈 때",
  리빙: "오히려 좋아, 오히려 편해! 친환경 리빙 가보자고!",
  ALL: "발견해요, 가치있게 대체할 것",
  default: "비보트에서 엄선한 가치소비 제품들을 만나보세요."
};

//카테고리 별로 h2 변경
const makeHeadingTwo = (category, description) => {
  if(category != undefined){
    if(category == 'All'){
      //ALL 전체보기일 때
      category.innerHTML="가치소비 전체보기";
      category_title.insertAdjacentHTML('beforeend',`<h2>${description['default']}</h2>`);
    } else if(category == '가치별 카테고리'){
      //~별 이 붙은 가치별 카테고리일 때
      category_title.insertAdjacentHTML('beforeend',`<h2>${description['All']}</h2>`);
    } else if(category == '지금할인중' || category == '무료배송' || category == '제로웨이스트' || category == '선물추천') {
      //메인 메뉴 카테고리일 때
      document.querySelector(".category_title").classList.add("displaynone");
      document.querySelector("#subCategorySwiper").classList.add("displaynone");
    } else if (category == '패션' || category == '라이프' ) {
      //대 카테고리가 패션, 라이프인 경우
      category_title.insertAdjacentHTML('beforeend',`<h2>${description[category]}</h2>`)
    } else {
      //그 외 경우
      category_title.insertAdjacentHTML('beforeend',`<h2>${description['default']}</h2>`)
    } 
      //undefined인 경우
  } else {
    category_title.insertAdjacentHTML('beforeend',`<h2>${description['default']}</h2>`)
  }
};
window.addEventListener("DOMContentLoaded",makeHeadingTwo(category, description))
/* category description 추가 */
/* 추천 카테고리 슬라이드 */
var swiper = new Swiper("#productListrecommendList", {
  slidesPerView: "auto",
  spaceBetween: 14,
  pagination: {
    el: ".product_list_pagination",
    clickable: true,
    type: "progressbar",
  },
});
/* 추천 카테고리 슬라이드 */
/* 하위 카테고리 슬라이드 */
var swiper = new Swiper("#subCategorySwiper", {
  slidesPerView: 5,
  spaceBetween: 15,
});
/* 하위 카테고리 슬라이드 */
/* 하위 카테고리 숨김*/
window.addEventListener("DOMContentLoaded", ()=>{
  document.querySelector(".subcategory>li") == null ? document.querySelector("#subCategorySwiper").classList.add("displaynone") : null;
})
/* 하위 카테고리 숨김 */
/* 하위 카테고리 뒤로가기 표시 */
window.addEventListener("load", ()=>{
  const parent = document.querySelector("#topNavControl").dataset.parent;
  let params = document.location.search;
  parent != params ? document.querySelector(".back_btn").classList.remove("visiblehidden") : null;
})
/* 하위 카테고리 뒤로가기 표시 */
/* 하위 카테고리 active 표시 */

const subCateActive = (url) => {
  //hash
  const cate_hash = decodeURI(url.split('#')[1]);
  const active_cate = document.querySelector(`.subcategory_list > a[title='${cate_hash}']`)
  if(active_cate){
    active_cate.parentNode.classList.add("subcate_active")
  } else {
    document.querySelector(`.subcategory_list > a[title='전체보기']`).parentNode.classList.add("subcate_active");
  }
}

window.addEventListener("DOMContentLoaded", subCateActive(window.location.hash))
/* 하위 카테고리 active 표시 */
