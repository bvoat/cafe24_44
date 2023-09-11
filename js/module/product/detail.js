/* ------------------------------------------------------------------------------------ */
/* bvt */

//thumbnail 즉시 슬라이드화
const thumbnail_list = document.querySelector(".thumb").children;
[...thumbnail_list].forEach(li => {
  li.classList.add("main_thumb", "img_wrap", "swiper-slide");
  li.style="display: inline-block";
})

//thumbnail 스와이퍼
var swiper = new Swiper(".product_thumnail_wrap", {
  spaceBetween: 8,
  slidesPerView: "1",
  pagination: {
      el: ".swiper-pagination-thumb",
      clickable: true,
      type: "fraction",
  },
})

// relation list 스와이퍼
var swiper = new Swiper(".product_relation_list", {
  spaceBetween: 8,
  slidesPerView: "3",
  pagination: {
      el: ".list_item_progress",
      type: "progressbar",
  },
});


//크루 등급 마일리지 2배 변환
const crewValueControl = (multiple) => {
  const voterValue = document.querySelector(".voter_value");
  const crewValue = document.querySelector(".crew_value");
  voterValue ? (crewValue.innerHTML = voterValue.innerHTML * multiple) : null;
};

// 하단 메뉴 탭 상단 붙이기
window.addEventListener("scroll", ()=>{
  const detailMenu = document.querySelector(".detail_tab_wrap");
  const headerWrap = document.querySelector("#header_wrap");
  if(window.scrollY > 1022 ){
    detailMenu.classList.add("active");
    headerWrap.classList.remove("gradient");
  } else {
    detailMenu.classList.remove("active");
    headerWrap.classList.add("gradient");
  }
})

//탭 클릭 이동

const tabClickMove = () => {
  const tab_arr = document.querySelectorAll(".tab_button");
  tab_arr.forEach(button => {
    button.addEventListener("click", (btn) => {
      tab_arr.forEach(btn=>{
        btn.classList.remove("active");
      })
      btn.currentTarget.classList.add("active")
      const hash_id= document.querySelector(`#${btn.currentTarget.dataset.id}`);
      const hash_position = Number(window.pageYOffset + hash_id.getBoundingClientRect().top);
      window.scroll(0, hash_position - 123)
    })
  })
}





//Q&A heading 컨트롤
const qnaControl = () => {
  const dataCheck = document.querySelectorAll(".noAccess");
  const tabHeading = document.querySelectorAll(".tab3_heading");
  if (dataCheck.length != 0) {
    if (dataCheck[0].classList.value.includes("displaynone")) {
      tabHeading.forEach((node) => {
        node.classList.add("displaynone");
      });
    }
  }
};


//선물하기 / 구매하기 클릭
const purchase_button = document.querySelectorAll(".purchase_button");

Array.from(purchase_button).forEach((btn)=>{

  btn.addEventListener("click",(e)=>{
    e.preventDefault();

    const buyScreen = document.getElementById("buyScreen");
    classToggle(buyScreen, "displaynone");

    
    const btn_cart = document.querySelector(".btn_cart");
    const btn_buy  = document.querySelector(".btn_buy");
    const btn_gift = document.querySelectorAll(".btn_gift");


    const type = e.currentTarget.dataset.type;
    console.log('type: ', type);

      if(type == "buy"){
        btn_cart.classList.remove("displaynone");
        btn_buy.classList.remove("displaynone");
          [...btn_gift].forEach(btn => {btn.classList.add("displaynone");})

      } else if (type == "gift"){
        btn_cart.classList.add("displaynone");
        btn_buy.classList.add("displaynone");
          [...btn_gift][1].classList.remove("displaynone");
          [...btn_gift][1].classList.add("blue");

      }

  })
})
const buy_screen_title = document.querySelector(".buy_screen_title");

buy_screen_title.addEventListener("click", ()=>{
  classToggle(buyScreen, "displaynone");
})

/* 가격 -> 스탬프 */
//스탬프 갯수 변수 할당
const createStampPcsFromPrice = (price) => {
  return new Promise((resolve, reject) => {
    let floatPrice;
    if (price < 0.5) {
      floatPrice = 0;
    } else if (0.5 <= price && price < 1) {
      floatPrice = 0.5;
    } else if (1 <= price && price < 5) {
      let halfFloat = Math.floor(price) + 0.5;
      price < halfFloat
        ? (floatPrice = halfFloat - 0.5)
        : (floatPrice = halfFloat);
    } else if (5 <= price) {
      floatPrice = 5;
    }
    resolve(floatPrice);
  });
};
//스탬프 갯수 DOM 출력
const displayStampTxt = (productStamp) => {
  //스탬프 숫자 표시
  const stampPcs = document.querySelector(".stamp_pcs");
  productStamp > 0
    ? (stampPcs.innerHTML = `${productStamp}개`)
    : (stampPcs.innerHTML = "0개");
};
//스탬프 이미지 DOM 출력
const displayStampImg = (productStamp) => {
  //스탬프 표시
  let stampList = document.querySelectorAll(".stamp_node");
  //스탬프 이미지 표시
  let i = 0;
  if (Number.isInteger(productStamp)) {
    while (i < productStamp) {
      stampList[i].classList.add("whole_stamp");
      i++;
    }
  } else if (!Number.isInteger(productStamp)) {
    while (i < productStamp) {
      stampList[i].classList.add("whole_stamp");
      i++;
    }
    stampList[Math.floor(productStamp)].classList.add("half_stamp");
  }
};
//스탬프 promise 진행
const createStamp = (createStampPcsFromPrice) => {
  let final_price = parseInt(document.querySelector(".finalprice").dataset.price);
  console.log('final_price: ', final_price);

  if (final_price < 1000) {
    final_price = final_price / 10000;
    console.log('final_price1: ', final_price);
    //스탬프 총 갯수 변수에 할당
    createStampPcsFromPrice(final_price)
      .then((res) => {
        console.log("stamp", res, "개");
        displayStampImg(res);
        displayStampTxt(res);
      })
      .catch((reject) => {
        console.log("스탬프 에러", reject);
        displayStampImg(0);
        displayStampTxt(0);
      });
  } else {
    final_price = final_price / 10000;
    console.log('final_price2: ', final_price);
    //스탬프 총 갯수 변수에 할당
    createStampPcsFromPrice(final_price)
      .then((res) => {
        console.log("stamp", res, "개");
        displayStampImg(res);
        displayStampTxt(res);
      })
      .catch((reject) => {
        console.log("스탬프 에러", reject);
        displayStampImg(0);
        displayStampTxt(0);
      });
  }
};

/* 가치태그 수신 */

let prd_no = new URLSearchParams(location.search).get("product_no");

const reciveTagDetail = (prd_no) => {
  fetch(`https://${api_domain}.shop/products/tagdetail?no=${prd_no}`, {
    method: "GET", // 또는 'PUT'
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      try{
        console.log('data: ', response);
        if(response.status == 200 && response.success){
          response.data.forEach((category) => {
              document
              .querySelector("#categoryTagBox")
              .insertAdjacentHTML(
                "beforeend",
                `<li class="cate_item"><a href="/product/list.html?cate_no=${category.category_no}#${category.category_name}">${category.category_name}</a></li>`
              );
            
          });
        }else{
          console.log("error : ", response.status, response.message);
        }
      } catch(error) {
        console.log("error : ", error,  response.status, response.message);
      }
      return false;
    })
    .catch((error) => {
      console.error("실패:", error);
    });
};

//리뷰 숫자 계산
const review_item_length = document.querySelectorAll(".review_item").length;
const review_num = document.querySelector(".review_num");

const review_num_insert = (review_item_length) => {
  review_num.innerHTML = review_item_length;
}

//user_name 수정
const user_name_arr = document.querySelectorAll(".user_name");
user_name_arr.forEach(name => name.innerHTML == "비보트" ? name.innerHTML = "비보트 보터" : name.innerHTML == "네이버 페이 구매자" ? name.innerHTML = "비보트 보터" : null);
 

/* 최종 함수 실행 */


window.addEventListener("DOMContentLoaded", ()=>{
  
  tabClickMove();

  //가치태그 수신
  reciveTagDetail(prd_no);


  //스탬프 만들기
  //bvt_common.js 파일에서 가격 정보 받아온 후 실행해야 함

    if(document.querySelector(".finalprice")){
      setTimeout(()=>{createStamp(createStampPcsFromPrice)}, 500)
    }else{
      setTimeout(()=>{createStamp(createStampPcsFromPrice)}, 1000)
    }


  //크루 등급 마일리지 2배 변환
  crewValueControl(2);

  //Q&A heading 컨트롤
  qnaControl();

 //review_item_length 삽입
 review_num_insert(review_item_length);
 

})


// /* cafe24 default */
// // Tab event
// $('#tabProduct a').on('click', function(e){
//     var oTarget = $(this).attr('href');
//     $(this).parent('li').addClass('selected').siblings().removeClass('selected');

//     $('#tabProduct a').each(function(){
//         var oSiblings = $(this).attr('href');
//         if (oTarget != oSiblings) {
//             $(oSiblings).hide();
//         } else {
//             $(oTarget).show();
//         }
//     });
//     removePagingArea(oTarget);
// });

// (function($) {

// function removePagingArea(oTarget)
// {
//     if ($(oTarget).length < 1 && (oTarget != '#prdReview' || oTarget != '#prdQna')) return;

//     if ($(oTarget).css('display') == 'block') {
//         if (oTarget == '#prdReview') {
//             //var record = $('#prdReview .xans-record-', '.xans-product-review').first();
//             var record = $('.xans-record-', '.xans-product-review').first();
//             if (record.length < 1 || record.is(':not(:visible)')) {
//                 $('.xans-product-reviewpaging').remove();
//              }
//          } else if (oTarget == '#prdQnA') {
//              //var record = $('#prdQnA .xans-record-', 'xans-product-qna').first();
//              var record = $('.xans-record-', '.xans-product-qna').first();
//              if (record.length < 1 || record.is(':not(:visible)')) {
//                  $('.xans-product-qnapaging').remove();
//              }
//          }
//      }
// }

//     $('#actionCartClone, #actionWishClone, #actionBuyClone, #actionWishSoldoutClone').off().on('click', function() {
//         try {
//             var id = $(this).attr('id').replace(/Clone/g, '');
//             if (typeof(id) !== 'undefined') $('#' + id).trigger('click');
//             else return false;
//         } catch(e) {
//             return false;
//         }
//     });

//     function productDetailOrigin(){
//         var imgChk = $('#prdDetailContent').find('img').length;
//         if(imgChk <= 0){
//             $('#prdDetailBtn').remove();
//         }
//     }
//     productDetailOrigin();

//     // Add Image
//     var oTarget = $('.xans-product-mobileimage ul li');
//     var oAppend = oTarget.first().children('p').clone();

//     oTarget.slice(1).each(function() {
//         var listHtml = $(this).html();
//         $(this).children().wrap(function() {
//             return '<p class="thumbnail">' + oAppend.html() + listHtml + '</p>';
//         });

//         $(this).children('p').children('img').first().remove();
//     });
// });

