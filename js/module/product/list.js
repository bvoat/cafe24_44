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
const param = getUrlParams("parent_cate_no") ? getUrlParams("parent_cate_no") : getUrlParams("cate_no");
const sub_param = getUrlParams("cate_no");
console.log('sub_param: ', sub_param);

fetch(`/exec/front/Product/SubCategory`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((cateArray) => {
    cateArray
    .forEach((cate)=>{
      cate.parent_cate_no == param ? sub_category.push(cate) : '';
    });
  })
  .then(()=>{
    //parent_cate_no로 카테고리 받았는데 length 가 0이면 카테고리 target 삭제
    if(sub_category.length == 0){
      targetUl.parentNode.classList.add("displaynone");
      return false;
    }

    sub_category
    .reverse()
    .forEach(element => {
      targetUl.insertAdjacentHTML(`afterbegin`, `
      <li class="swiper-slide subcategory_list ${element.cate_no == sub_param ? 'active' : 'null'}">
          <a href="/product/list.html${element.param}&parent_cate_no=${param}">
          <span class="">${element.name}</span>
          </a>
      </li>`);
    });

    /* 하위 카테고리 슬라이드 */
    var subSwiper = new Swiper("#subCategorySwiper", {
      slidesPerView: "auto",
      spaceBetween: 23,
    });
  })