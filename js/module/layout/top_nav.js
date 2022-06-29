
  // swiper
  var swiper = new Swiper('.swiper', {
      slidesPerView: 6,
      direction: "horizontal",
    });
  
  //top_nav 감춤 스크립트
  const controlHideTabNav = () => {
    // console.log("page_path",page_path)
    const topNav = document.querySelector("#top_nav");
    const contents = document.getElementById("bvtContents");
    const exceptPath = ['myshop', 'join', 'modify', 'detail', 'basket'];

    exceptPath.forEach((dir)=>{
      if(window.location.pathname.includes(dir)) {
        topNav.classList.add("displaynone");
      };
    })
  }

  //함수 실행
  if (document.readyState == 'loading') {
    // 아직 로딩 중이므로 이벤트를 기다립니다.
    document.addEventListener('DOMContentLoaded', controlHideTabNav());
  } else {
    // DOM이 완성되었습니다!
    controlHideTabNav();
  }
  