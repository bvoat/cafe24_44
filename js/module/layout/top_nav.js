
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
  
  //함수 실행
  if (document.readyState == 'loading') {
    // 아직 로딩 중이므로 이벤트를 기다립니다.
    // document.addEventListener('DOMContentLoaded', controlCategoryName);
  } else {
    // DOM이 완성되었습니다!
    // controlCategoryName();
  }
  