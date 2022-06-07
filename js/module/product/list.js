/* category description 추가 */

//title 전체 변수화
const category_title = document.querySelector(".product_category_title");
//h1에서 data category 받아오기
const category = document.querySelector(".product_category_title > h1").dataset.category;
//h2 생성
let heading_two = document.createElement("h2");
// 멘트 객체
const description = {
    "패션" : "책임 있는 소비와 생산, 지속 가능한 패션 어때요?",
    "식품" : "공장식 축산업 문제, 기후 위기 해결에 투표하세요.",
    "뷰티" : "식물성으로 만든 순하디 순한 비건 뷰티로 갈아탈 때",
    "리빙" : "오히려 좋아, 오히려 편해! 친환경 리빙 가보자고!"
}

//카테고리 별로 h2 변경
const makeHeadingTwo = (category, description) => {
    let find = description[category];
    let heading_description = document.createTextNode(find)
    heading_two.appendChild(heading_description);
    category_title.appendChild(heading_two);
}

  /* category description 추가 */

  /* 하위 카테고리 슬라이드 */
  var swiper = new Swiper(".subCategorySwiper", {
    slidesPerView:6,
    spaceBetween: 16,
  });

  /* 하위 카테고리 슬라이드 */


  //함수 실행
  if (document.readyState == 'loading') {
    // 아직 로딩 중이므로 이벤트를 기다립니다.
    document.addEventListener('DOMContentLoaded', makeHeadingTwo(category, description));
  } else {
    // DOM이 완성되었습니다!
    makeHeadingTwo(category, description);
  }