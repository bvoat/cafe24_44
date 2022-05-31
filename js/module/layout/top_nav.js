

// const controlCategoryName = () => {
//     const category = document.querySelectorAll(".top_nav_category_link");
//     console.log(category);
//     const korCategory = ["패션", "식품", "리빙", "뷰티"];
//     const arrCategory = [...category];
//     arrCategory.map((node, i)=>{
//       node.innerHTML=korCategory[i]
//     })
//   }
  
  
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
  