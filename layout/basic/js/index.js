/**
 * 스와이퍼
 */
//추천 상품 : 가치소비 입문 어때요? 스와이퍼
var recommendSwiper = new Swiper(".listmain_recommend", {
  spaceBetween: 11,
  slidesPerView: 3,
  slidesPerGroup: 3,
  slidesPerColumn: 2,
  slidesPerColumnFill: "row",
  normalizeSlideIndex: true,
  pagination: {
    el: ".swiper-pagination-fraction",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-pagination-clickable",
    prevEl: ".clickable",
  },
});
recommendSwiper.on("click", function () {
  console.log("isEnd", recommendSwiper.isEnd);
  console.log("index", recommendSwiper.previousIndex);
  [...document.querySelectorAll(".brand")].forEach((el) => {
    el.style.fontSize = "10px !important";
    console.log(el.style.fontSize);
  });
});
//주간 상품 : Weekly Special 스와이퍼
var weeklySwiper = new Swiper(".listmain_weekly", {
  spaceBetween: 12,
  slidesPerView: "auto",
  slidesPerColumn: 1,
  slidesPerColumnFill: "row",
  pagination: {
    el: ".list_item_progress",
    type: "progressbar",
  },
});
//트렌드 스토리 : Trend Story 스와이퍼
var trendSwiper = new Swiper(".listmain_trend", {
  spaceBetween: 20,
  spaceBetween: 11,
  slidesPerView: "auto",
  slidesPerColumnFill: "row",
  rewind: true,
  pagination: {
    el: ".swiper-pagination-fraction-noclick",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-pagination-clickable",
  },
});
//엠디 상품 : MD' Pick 스와이퍼
var MDpickSwiper = new Swiper(".listmain_md", {
  spaceBetween: 20,
  slidesPerView: 1.5,
  slidesPerColumn: 1,
  slidesPerColumnFill: "row",
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  pagination: {
    el: ".list_item_progress",
    type: "progressbar",
  },
});
//엠디 상품 : MD' Pick 상단 탭 마우스 휠 스와이퍼
var MDPickTabSwiper = new Swiper(".listmain_md_tab_wrap", {
  spaceBetween: 11,
  slidesPerView: "auto",
  slidesPerColumn: 1,
  slidesPerColumnFill: "row",
  mousewheel: true,
});
//실시간 구매 : 방금 구매한 스와이퍼
var realTimeSwiper = new Swiper(".realtime_order_list", {
  spaceBetween: 13,
  slidesPerView: 2.205,
  slidesPerColumn: 1,
  slidesPerColumnFill: "row",
  pagination: {
    el: ".list_item_progress",
    clickable: true,
    type: "progressbar",
  },
});
/**
 * 탭 형식으로 메인진열 교체
 *
 */
const listmainTab = () => {
  //node 배열
  let md_pick_btn = document.querySelectorAll(".md_pick_btn");
  let md_pick_listmain = document.querySelectorAll(".listmain_md");
  //button에서 index 얻기
  md_pick_btn.forEach((btns, i) => {
    btns.addEventListener("click", (el) => {
      //active 될 node index
      let tab_index = i;
      listmainMDTabActive(tab_index);
    });
  });
  //class 교체
  const listmainMDTabActive = (index) => {
    //button active
    md_pick_btn.forEach((btn, order) => {
      if (order == index) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    //listmain active
    md_pick_listmain.forEach((listmain, order) => {
      if (order == index) {
        listmain.classList.add("active");
      } else {
        listmain.classList.remove("active");
      }
      monitoringDesc();
    });
  };
};

/**
 * 최종 함수 실행
 */
window.addEventListener("DOMContentLoaded", () => {
  listmainTab();
});
