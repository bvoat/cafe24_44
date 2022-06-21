
  // swiper
  var swiper = new Swiper('.swiper', {
      slidesPerView: 6,
      direction: "horizontal",
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
      },
    });
  
  //top_nav 감춤 스크립트
  const controlHideTabNav = () => {
    // console.log("page_path",page_path)
    const topNav = document.querySelector("#top_nav");
    const exceptPath = ['myshop', 'member', 'detail'];
    exceptPath.forEach((dir)=>{
      window.location.pathname.includes(dir) ? topNav.classList.add("displaynone") : null;
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
  