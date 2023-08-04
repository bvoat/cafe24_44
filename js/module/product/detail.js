/* ------------------------------------------------------------------------------------ */
/* bvt */

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


//상품 상세 하단 페이지 탭 슬라이더
//node 값 받아서 Array
const tab = [...document.querySelectorAll(".tab")];
const tab_txt = tab.map((node) => node.innerHTML);
const tab_hash = tab.map((node) => node.dataset.hash);
var detailTabSwiper = new Swiper("#productDetailBottom", {
  autoHeight: true,
  observer: true,
  observeParents: true,
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 22,
  edgeSwipeThreshold: 25,
  // loop: true,
  lazy: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  edgeSwipeDetection: true,
  allowTouchMove: false,
  hashNavigation: {
    replaceState: true,
  },
  pagination: {
    el: ".detail_tab_wrap",
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="tab_custom swiper-pagination-bullet tab${
        index + 1
      }" tabindex="${index}" role="button" aria-label=${
        tab_txt[index]
      } data-hash=${tab_hash[index]}> ${tab_txt[index]} </span> `;
    },
  },
});
//최초 탭 높이 조절 

window.addEventListener("load", ()=>{
  const productDetailBottom = document.getElementById("productDetailBottom");
  const detail_swiper_wrap = document.getElementById("detail_swiper_wrap");
  if(productDetailBottom){
    let firstTab = getComputedStyle(productDetailBottom);
    const firstControlContentWrapHeight = (firstTab) => {
      productDetailBottom.style.height = (firstTab.height + 100 + 'px');
      detail_swiper_wrap.style.height = (firstTab.height + 100 + 'px');
    };
    firstControlContentWrapHeight(firstTab);
  }
})
//하단 메뉴 탭 상단 붙이기
window.addEventListener("scroll", ()=>{
  const detailMenu = document.querySelector(".detail_tab_wrap");
  console.log("window.scrollY", window.scrollY)
  if(window.scrollY > 1019 ){
    detailMenu.classList.add("active");
  } else {
    detailMenu.classList.remove("active");
  }
})

//슬라이더 이외 함수 시작

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

//크루 등급 마일리지 2배 변환
const crewValueControl = (multiple) => {
  const voterValue = document.querySelector(".voter_value");
  const crewValue = document.querySelector(".crew_value");
  voterValue ? (crewValue.innerHTML = voterValue.innerHTML * multiple) : null;
};


//선물하기 / 구매하기 클릭
const purchase_button = document.querySelectorAll(".purchase_button")
Array.from(purchase_button).forEach((btn)=>{
  btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let type = e.currentTarget.dataset.type;
    console.log('type: ', type);
    const buyScreen = document.getElementById("buyScreen");
    classToggle(buyScreen, "displaynone");
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
 
/* 최종 함수 실행 */
//리뷰 컨트롤
//buyRecordFrameControl();
//크루 등급 마일리지 2배 변환
crewValueControl(2);
//공유 이벤트 클릭

//Q&A heading 컨트롤
qnaControl();
//스탬프 만들기
//bvt_common.js 파일에서 가격 정보 받아온 후 실행해야 함
window.addEventListener("load", ()=>{
  if(document.querySelector(".finalprice")){
    setTimeout(()=>{createStamp(createStampPcsFromPrice)}, 500)
  }else{
    setTimeout(()=>{createStamp(createStampPcsFromPrice)}, 1200)
  }
})
//가치태그 수신
reciveTagDetail(prd_no);

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

(function($) {

function removePagingArea(oTarget)
{
    if ($(oTarget).length < 1 && (oTarget != '#prdReview' || oTarget != '#prdQna')) return;

    if ($(oTarget).css('display') == 'block') {
        if (oTarget == '#prdReview') {
            //var record = $('#prdReview .xans-record-', '.xans-product-review').first();
            var record = $('.xans-record-', '.xans-product-review').first();
            if (record.length < 1 || record.is(':not(:visible)')) {
                $('.xans-product-reviewpaging').remove();
             }
         } else if (oTarget == '#prdQnA') {
             //var record = $('#prdQnA .xans-record-', 'xans-product-qna').first();
             var record = $('.xans-record-', '.xans-product-qna').first();
             if (record.length < 1 || record.is(':not(:visible)')) {
                 $('.xans-product-qnapaging').remove();
             }
         }
     }
}

    $('#actionCartClone, #actionWishClone, #actionBuyClone, #actionWishSoldoutClone').off().on('click', function() {
        try {
            var id = $(this).attr('id').replace(/Clone/g, '');
            if (typeof(id) !== 'undefined') $('#' + id).trigger('click');
            else return false;
        } catch(e) {
            return false;
        }
    });

    function productDetailOrigin(){
        var imgChk = $('#prdDetailContent').find('img').length;
        if(imgChk <= 0){
            $('#prdDetailBtn').remove();
        }
    }
    productDetailOrigin();

    // Add Image
    var oTarget = $('.xans-product-mobileimage ul li');
    var oAppend = oTarget.first().children('p').clone();

    oTarget.slice(1).each(function() {
        var listHtml = $(this).html();
        $(this).children().wrap(function() {
            return '<p class="thumbnail">' + oAppend.html() + listHtml + '</p>';
        });

        $(this).children('p').children('img').first().remove();
    });
});


   //thumnail 한 개만 남기기
    const thumnailChange = () => {
   const thumbnail = document.querySelectorAll(".thumbnail");
        thumbnail.forEach(box => {
            const imgTagCount = box.childElementCount;
            if(parseInt(imgTagCount) === 2){
                const product_img = box.children[0];
                product_img.remove();
            }
        })
    };
 //username 네이버 페이 구매자 면 익명의 보터로 변경
    const userNameChange = () => {
 const username = document.querySelectorAll(".user_name");
        username.forEach(name => {
            name.innerHTML == '네이버 페이 구매자' || name.innerHTML == '비보트' ? name.innerHTML = '익명의 보터' : null;
        })
    };
    window.addEventListener("load", ()=>{
        thumnailChange();
        userNameChange();
    })

/* aos 초기화 */
AOS.init();