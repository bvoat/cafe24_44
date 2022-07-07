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
window.addEventListener("DOMContentLoaded",makeHeadingTwo(category, description))
/* category description 추가 */
/* 추천 카테고리 슬라이드 */
var swiper = new Swiper("#productListrecommendList", {
  slidesPerView: 2,
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