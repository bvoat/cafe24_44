
/* nav 컨트롤 스크립트 */
//상단바 컨트롤
function controlTopNav(page_path) {
  // nav 전체
  const back_btn = document.querySelector(".back_btn");
  const default_nav = document.querySelector(".default_top_nav");
  const comm_nav = document.querySelector(".community_top_nav");
  //제외할 path
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
  const community_array = ["community", "buy_records"];
  //뒤로가기 path
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
  ];

  //디폴트 메뉴 사라지게
  expect_array.forEach((path) => {
    page_path.includes(path) ? default_nav.classList.add("displaynone") : null;
  });

  //커뮤니티 하단바로
  community_array.forEach((path) => {
    if (page_path.includes(path)) {
      default_nav.classList.add("displaynone");
      comm_nav.classList.remove("displaynone");
      document.querySelector(`#${path}_nav`).classList.add("top_nav_active");
    }
  });

  //뒤로가기 표시
  back_array.forEach((path) => {
    if (page_path.includes(path)) {
      back_btn.classList.remove("visiblehidden");
    }
  });
}
function controlTopNavActive(page_path){
    //active 표시
    if(page_path.includes("product/list.html")){
      const name = document.querySelector("#topNavControl").name;
      document.querySelector(`#cate${name}`).classList.add("top_nav_active")
    } else if (page_path.includes("crew/crew.html")){
      document.querySelector("#crew").classList.add("top_nav_active")
    }else if (page_path.includes("funding")){
      document.querySelector("#funding").classList.add("top_nav_active")
    }else{
      document.querySelector("#index").classList.add("top_nav_active")
    }
}
window.addEventListener("load", () => {
  controlTopNav(window.location.href);
  controlTopNavActive(window.location.href);
});
/* nav 컨트롤 스크립트 */
  // swiper
  var swiper = new Swiper('.top_nav_swiper', {
    slidesPerView: 5,
    spaceBetween: 25,
    direction: "horizontal",
  });
  

