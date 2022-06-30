
  // swiper
  var swiper = new Swiper('.top_nav_swiper', {
      slidesPerView:6,
      direction: "horizontal",
    });
  
/* nav 컨트롤 스크립트 */
  const controlTabNav = () => {
    // nav 전체
    const page_path = window.location.pathname;
    console.log('page_path: ', page_path);
    const top_nav = document.querySelector("#top_nav");
    const default_nav = document.querySelector(".default_top_nav");
    const comm_nav = document.querySelector(".community_top_nav");
    const expect_array = ['myshop', 'join', 'modify', 'detail', 'basket'];

    expect_array.forEach((path)=>{
      if(page_path.includes(path)) {
        // top_nav.classList.add("displaynone");
      };
    })
  }

  //함수 실행
  if (document.readyState == 'loading') {
    // 아직 로딩 중이므로 이벤트를 기다립니다.
    document.addEventListener('DOMContentLoaded', controlTabNav());
  } else {
    // DOM이 완성되었습니다!
    controlTabNav();
  }
  