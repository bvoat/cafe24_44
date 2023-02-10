/* category description 추가 */


/* 추천 카테고리 슬라이드 */
var recommendListSwiper = new Swiper("#productListrecommendList", {
  slidesPerView: "2.233", //2개 + a 보이기
  spaceBetween: 14,
});
/* 추천 카테고리 슬라이드 */

//category JSON 서버 통신
let sub_category = [];
const targetUl = document.querySelector(".menuCategory");
const parent_param = getUrlParams("parent_cate_no") ? getUrlParams("parent_cate_no") : getUrlParams("cate_no");
console.log('parent_param: ', parent_param);
const category_param = getUrlParams("cate_no");
console.log('sub_param: ', category_param);

fetch(`/exec/front/Product/SubCategory`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((cateArray) => {
    cateArray
    .forEach((cate)=>{
      //ALL 카테고리 대신 중 카테고리를 소 카테고리 배열에 포함
      cate.parent_cate_no == parent_param || cate.cate_no == parent_param  ? sub_category.push(cate) : '';
    });
  })
  .then(()=>{
    //parent_cate_no로 카테고리 받았는데 length 가 0이면 카테고리 target 삭제
    if(sub_category.length == 0){
      targetUl.parentNode.classList.add("displaynone");
      return false;
    }

    sub_category
    .forEach(element => {
      targetUl.insertAdjacentHTML(`afterbegin`, `
      <li class="swiper-slide subcategory_list ${element.cate_no == category_param ? 'active' : 'null'} category_${element.name}" data-category="category_${element.name}">
          <a href="/product/list.html${element.param}&parent_cate_no=${parent_param}">
          <span class="">${element.cate_no == parent_param ? '전체' : element.name}</span>
          </a>
      </li>`);
    });

    /* 하위 카테고리 슬라이드 */
    var subSwiper = new Swiper("#subCategorySwiper", {
      slidesPerView: "auto",
      spaceBetween: 23,
    });
  })
  .then(()=>{
    //최초 카테고리 진입 시 parent_param과 category_param이 같으면 all 카테고리에 active 실행
    // if(category_param == parent_param){
    //   document.querySelector(".category_ALL").classList.add("active");
    // }
  })