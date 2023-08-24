
/**
 * SwiperJS
 */
// 1줄
var swiper = new Swiper(".list1line", {
  slidesPerView: 2.323,
  spaceBetween: 5.9,
  //displaynone 이슈
  observer: true,
  observeParents: true,      
});


// 3x2줄
var swiper = new Swiper(".list3x2list", {
  slidesPerView: 3,
  slidesPerColumn: 2,
  slidesPerGroup: 6,
  slidesPerColumnFill: 'row',
  spaceBetween: 4.6,
    pagination: {
      el: ".swiper-pagination-best",
      type: "fraction",
    },
    on: {
      init: function(sw){
        document.addEventListener("DOMContentLoaded", ()=>{
          var current = document.querySelector(".swiper-pagination-best>.swiper-pagination-current");
          var total = document.querySelector(".swiper-pagination-best>.swiper-pagination-total");
          current.innerHTML = "1";
          total.innerHTML = "2";
        })
      }
    },
});

//tab 메뉴
var swiper = new Swiper(".list_content_tap", {
  slidesPerView: "auto",
  spaceBetween: 8,
})

// 1줄 tab
var swiper = new Swiper(".list1linetab", {
  slidesPerView: 2.323,
  spaceBetween: 5.9,
  //displaynone 이슈
  observer: true,
  observeParents: true,      
  observeSlideChildren: true,
});


// 3x2줄 tab
var swiper = new Swiper(".tab2-1", {
  slidesPerView: 3,
  slidesPerColumn: 2,
  slidesPerGroup: 6,
  slidesPerColumnFill: 'row',
  spaceBetween: 4.6,
    //displaynone 이슈
    observer: true,
    observeParents: true, 
    observeSlideChildren: true,
    pagination: {
      el: ".swiper-pagination-tab2-1",
      type: "fraction",
    },
});
var swiper = new Swiper(".tab2-2", {
  slidesPerView: 3,
  slidesPerColumn: 2,
  slidesPerGroup: 6,
  slidesPerColumnFill: 'row',
  spaceBetween: 4.6,
    //displaynone 이슈
    observer: true,
    observeParents: true, 
    observeSlideChildren: true,
    pagination: {
      el: ".swiper-pagination-tab2-2",
      type: "fraction",
    },
});
var swiper = new Swiper(".tab2-3", {
  slidesPerView: 3,
  slidesPerColumn: 2,
  slidesPerGroup: 6,
  slidesPerColumnFill: 'row',
  spaceBetween: 4.6,
    //displaynone 이슈
    observer: true,
    observeParents: true, 
    observeSlideChildren: true,
    pagination: {
      el: ".swiper-pagination-tab2-3",
      type: "fraction",
    },
});
var swiper = new Swiper(".tab2-4", {
  slidesPerView: 3,
  slidesPerColumn: 2,
  slidesPerGroup: 6,
  slidesPerColumnFill: 'row',
  spaceBetween: 4.6,
    //displaynone 이슈
    observer: true,
    observeParents: true, 
    observeSlideChildren: true,
    pagination: {
      el: ".swiper-pagination-tab2-4",
      type: "fraction",
    },
});



//배너-브랜드
var swiper = new Swiper(".only3", {
  slidesPerView: 1,
  spaceBetween: 9,
  centeredSlides: true,
      //displaynone 이슈
      observer: true,
      observeParents: true, 
      observeSlideChildren: true,
      pagination: {
        el: ".swiper-pagination-brand",
        type: "fraction",
      },
});
var swiper = new Swiper(".only3item", {
  slidesPerView: 3,
  spaceBetween: 4.6,
});

var swiper = new Swiper(".index_banner_bottom", {
slidesPerView: 1.25,
spaceBetween: 8.1,
centeredSlides: true,
// pagination: {
//   el: ".banner_item_bullet_bottom",
// },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
});

/**
 * Tab 1,2
 */

const listmainTab1 = () => {
  //node 배열
  let tab1btn = document.querySelectorAll(".tab1");
  let tab1listmain = document.querySelectorAll(".tabmain1");
  //button에서 index 얻기
  tab1btn.forEach((btns, i) => {
      btns.addEventListener("click", (el) => {
          //active 될 node index
          let tab_index = i;
          listmainTabActive(tab_index);
      })
  });
  // class 교체
  const listmainTabActive = (index) => {
      //button active
      tab1btn.forEach((btn, order) => {
          console.log('btn: ', btn);
          if (order == index) {
              btn.parentElement.classList.add("active");
          } else {
              btn.parentElement.classList.remove("active");
          }
      });

      // listmain active
      tab1listmain.forEach((listmain, order) => {

          if (order == index) {
              listmain.classList.add("active");
              listmain.classList.remove("displaynone");
          } else {
              listmain.classList.remove("active");
              listmain.classList.add("displaynone");
          }
      });
  }
}
const listmainTab2 = () => {
  //node 배열
  let tab2btn = document.querySelectorAll(".tab2");
  let tab2listmain = document.querySelectorAll(".tabmain2");
  //button에서 index 얻기
  tab2btn.forEach((btns, i) => {
      btns.addEventListener("click", (el) => {
          //active 될 node index
          let tab_index = i;
          listmainTabActive(tab_index);
      })
  });
  // class 교체
  const listmainTabActive = (index) => {
      //button active
      tab2btn.forEach((btn, order) => {
          if (order == index) {
              btn.parentElement.classList.add("active");
          } else {
              btn.parentElement.classList.remove("active");
          }
      });

      // listmain active
      tab2listmain.forEach((listmain, order) => {

          if (order == index) {
              listmain.classList.add("active");
              listmain.classList.remove("displaynone");
          } else {
              listmain.classList.remove("active");
              listmain.classList.add("displaynone");
          }
      });
  }
}


/**
 * 회원 수 불러오기
 */
const receiveMemberCount = () => {    
  fetch(`https://${api_domain}.shop/banner/joinbanner`, {
  method: 'GET', // 또는 'PUT'
  headers: {
      'Content-Type': 'application/json',
  },
  })
  .then((response) => response.json())
  .then((response) => {
      if(response.success){             
        
        /**
         * 숫자 카운트
         * @param {숫자 넣을 node} $counter 
         * @param {최대치} max 
         */
        function numberCounting($counter, max) {
          let now = max;

          const handle = setInterval(() => {
              const gap = Math.ceil(max - now);
              const number = gap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              $counter.innerHTML = number;

              // 목표에 도달하면 정지
              if (now < 1) {
              clearInterval(handle);
              }

              // 적용될 수치, 점점 줄어듬
              const step = now / 3;
              now -= step;
          }, 40);
        }
          const memberCount = document.querySelector(".membercnt");
          numberCounting(memberCount, response.data)
      }
    })
  .catch((error) => {
      console.error('실패:', error);
  });     
}


//인기 순위
const rankNumbering = () => {
  const numbering = [1, 2, 3, 7, 8, 9, 4, 5, 6, 10, 11, 12]
  const list = document.querySelectorAll(".list3x2list > ul > li")

  list.forEach(li => {
    const newDiv = document.createElement( 'div' )
    newDiv.classList.add("numbering")
    li.appendChild(newDiv);
  });
  document.querySelectorAll(".numbering").forEach((li,i) => {
    li.innerHTML = numbering[i];
  })
}


/**
* 최종 함수 실행
*/

  listmainTab1();
  listmainTab2();
  rankNumbering();
  receiveMemberCount();