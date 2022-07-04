/* ------------------------------------------------------------------------------------ */
/* bvt */
// 소비기록 수신
const buy_record_frame = document.querySelector("#buy_records_detail > iframe");
if(buy_record_frame != null){
    buy_record_frame.setAttribute("src", `https://${api_domain}.shop/buy_records?product_no={$product_no}`)
}
//가치소비기록 iframe 높이 조절
const computedHeight = (idx) => {
    const detailBottomWrap = document.getElementById("productDetailBottom");
    const detailBottomContent = document.getElementById("detail_swiper_wrap");
    const tabContent = document.getElementById(`tab${idx}`);
    //함수 실행
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            let firstTab = getComputedStyle(detailBottomContent);
            const firstControlContentWrapHeight = (firstTab) => {
                detailBottomWrap.style.height = firstTab.height;
                detailBottomContent.style.height = firstTab.height;
                tabContent.style.height = firstTab.height;
            }
            firstControlContentWrapHeight();
        });
    } else {
        let tab = getComputedStyle(tabContent);
        const controlContentWrapHeight = () => {
            detailBottomWrap.style.height = tab.height;
            detailBottomContent.style.height = tab.height;
            tabContent.style.height = tab.height;
        }
        controlContentWrapHeight();
    }
}
//상품 상세 하단 페이지 탭 슬라이더
//node 값 받아서 Array
const tab = [...document.querySelectorAll(".tab")];
const tab_txt = tab.map(node => node.innerHTML);
const tab_hash = tab.map(node => node.dataset.hash);
var swiper = new Swiper("#productDetailBottom", {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 22,
    loop: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    edgeSwipeDetection: true,
    hashNavigation: {
        replaceState: true,
    },
    pagination: {
        el: ".detail_tab_wrap",
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="tab_custom swiper-pagination-bullet tab${index+1}" tabindex="${index}" role="button" aria-label=${tab_txt[index]} data-hash=${tab_hash[index]}> ${tab_txt[index]} </span> `;
        },
    },
    on: {
        slideChangeTransitionEnd: function change() {
            computedHeight(swiper.realIndex);

        }

    },
});


//슬라이더 이외 함수 시작

//Q&A heading 컨트롤
const qnaControl = () => {
    const dataCheck = document.querySelectorAll(".noAccess");
    const tabHeading = document.querySelectorAll(".tab3_heading");
    if (dataCheck.length != 0) {
        if (dataCheck[0].classList.value.includes("displaynone")) {
            tabHeading.forEach((node) => { node.classList.add("displaynone") })
        }
    }
}

//소비기록 컨트롤
const buyRecordFrameControl = () => {    // 가치소비기록 iframe 높이 조절
    let bh_frame = document.querySelectorAll("#buy_record_frame");
    let bh_detail = document.querySelectorAll("#buy_records_detail");

    window.addEventListener("message", function (e) {
        let message = e.data;
        if (message && message.height) {
            bh_frame.forEach((node) => {
                node.style.height = message.height + 10 + 'px';
            })
            bh_detail.forEach((node) => {
                node.style.height = message.height + 10 + 'px';
            })
            //iframe 높이 조절
        }
    });
    // 스크롤 하단까지 갔을때 iframe 에 전달
    var loading = false;
    let sObj = {};
    let b_p = 0;
    let st = 0;
    // var iframe_content = document.getElementById('buy_record_frame').contentWindow;
    window.scroll(function () {
        // if ($("div.tab1 .swiper-slide-duplicate-active").length > 0) {
        st = window.scrollTop();
        if (b_p < st) {
            if (st + 200 >= document.height() - window.height()) {
                //    if(!loading) 
                {
                    sObj.more = true;
                    loading = true;
                    bh_frame.postMessage(sObj, '*');

                }
            }
        }
        b_p = st;
        // }
    });
}

//크루 등급 마일리지 2배 변환
const crewValueControl = (multiple) => {
    const voterValue = document.querySelector(".voter_value");
    const crewValue = document.querySelector(".crew_value");
    voterValue ? crewValue.innerHTML = (voterValue.innerHTML * multiple) : null;
}

//공유 이벤트
const goShrBtn = (type, _url) => {
    if (type == "link") {
        if (navigator.share) {
            navigator.share({
                title: `[비보트]` + document.getElementsByClassName("product_name").innerText,
                text: document.getElementsByClassName("product_name").innerText,
                url: _url + '/?utm_source=webshareapi&utm_medium=link&utm_campaign=sharebylink&utm_content=funding_link',
            })
        }
    }
    else if (type == "kakao") {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: document.getElementsByClassName("product_name").innerText,
                description: document.getElementsByClassName("product_name").innerText,
                imageUrl:
                    'https://bvoatofficial.cafe24.com/web/upload/share-image-1-7415ca0886cec14f1fbbe5c28cbccec1.png',
                link: {
                    mobileWebUrl: _url + '/?utm_source=kakaotalk&utm_medium=sharelink&utm_campaign=sharebykakao',
                    webUrl: _url + '/?utm_source=kakaotalk&utm_medium=sharelink&utm_campaign=sharebykakao',
                },
            },
            buttons: [
                {
                    title: '바로가기',
                    link: {
                        mobileWebUrl: _url + '/?utm_source=kakaotalk&utm_medium=sharelink&utm_campaign=sharebykakao',
                        webUrl: _url + '/?utm_source=kakaotalk&utm_medium=sharelink&utm_campaign=sharebykakao',
                    },
                },
            ],
        })
    }
}
const shareBtn = document.querySelector("#shareBtn");

//선물하기 / 구매하기 클릭
const toggleBuyScreen = (type) => {
    const buyScreen = document.getElementById("buyScreen");
    const buyScreenBox = document.getElementById("buy_screen_box");
    const bodyCont = document.querySelector("body");
    const headerCont = document.querySelector("#header");
    buyScreen.classList.toggle("displaynone");
    buyScreenBox.classList.toggle("displaynone");
    buyScreenBox.classList.toggle("screen_on");
    //추가 스타일 처리
    bodyCont.classList.toggle("overhidden");
    headerCont.classList.toggle("zindexzero");
}

/* 가격 할인가 확인 표시 */
const priceArr = document.querySelectorAll(".price");
const salePrice = document.querySelector(".display_discount > span > span");
const productPrice = document.querySelector(".display_product");
console.log('salePrice: ', salePrice, 'productPrice', productPrice);
/* 가격 -> 스탬프 */
//스탬프 갯수 변수 할당
const createStampPcsFromPrice = (price) => {
    return new Promise((resolve, reject)=>{
        let floatPrice;
        if(price < 0.5){
            floatPrice = 0;
        } else if( 0.5 < price && price < 1){
            floatPrice = 0.5;
        } else if (1 <= price && price < 5){
        let halfFloat = Math.floor(price) + 0.5;
        price < halfFloat ? floatPrice = halfFloat - 0.5 : floatPrice = halfFloat;
        } else if (5 < price){
            floatPrice = 5;
        }
        resolve(floatPrice);
    })
}
//스탬프 갯수 DOM 출력
const displayStampTxt = (productStamp) => {
        //스탬프 숫자 표시
        const stampPcs = document.querySelector(".stamp_pcs");
        productStamp > 0 ? stampPcs.innerHTML=`${productStamp}개` : stampPcs.innerHTML="0개"
}
//스탬프 이미지 DOM 출력 
const displayStampImg = (productStamp) => {
        //스탬프 표시
        let stampList = document.querySelectorAll(".stamp_node");
        //스탬프 이미지 표시
        let i = 0;
        if(Number.isInteger(productStamp)){
            while(i < productStamp){
                stampList[i].classList.add("whole_stamp");
                i++;
            }
        }else if(!Number.isInteger(productStamp)){
            while(i < productStamp){
                stampList[i].classList.add("whole_stamp");
                i++;
            }
            stampList[Math.floor(productStamp)].classList.add("half_stamp");
        }
}
//스탬프 promise 진행
const createStamp = (salePrice,productPrice,createStampPcsFromPrice) => {
// console.log("salePrice",salePrice,"productPrice",productPrice);
    if(salePrice != null && productPrice != null){
       console.log("sale",parseFloat(salePrice.textContent)/1000)
        //스탬프 총 갯수 변수에 할당
        // createStampPcsFromPrice(parseFloat(salePrice.textContent)/1000)
        // .then((res)=>{
        //     console.log("stamp", res, "개")
        //     displayStampImg(res);
        //     displayStampTxt(res);
        // })
        // .catch((reject)=>{
        //     console.log("스탬프 에러", reject);
        //     displayStampImg(0);
        //     displayStampTxt(0);
        // })
    } else {
       console.log("productPrice",parseFloat(productPrice.textContent)/1000)

        //스탬프 총 갯수 변수에 할당
        // createStampPcsFromPrice(parseFloat(productPrice.textContent)/1000)
        // .then((res)=>{
        //     console.log("stamp", res, "개")
        //     displayStampImg(res);
        //     displayStampTxt(res);
        // })
        // .catch((reject)=>{
        //     console.log("스탬프 에러", reject);
        //     displayStampImg(0);
        //     displayStampTxt(0);
        // })

    }
}

/* 가치태그 수신 */
let prd_no = new URLSearchParams(location.search).get("product_no");

const reciveTagDetail = (prd_no) => {
    fetch(`https://${api_domain}.shop/products/tagdetail?no=${prd_no}`, {
    method: 'GET', // 또는 'PUT'
    headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => response.json())
    .then((data) => {
        data.forEach((tag)=>{
            document.querySelector("#tag-box").insertAdjacentHTML("beforeend", `<div>${tag.emoji} ${tag.tag_name}</div>`)
        })
    })
    .catch((error) => {
    console.error('실패:', error);
    });        
}



/* 최종 함수 실행 */
//소비기록 컨트롤
buyRecordFrameControl();
//크루 등급 마일리지 2배 변환
crewValueControl(2);
//공유 이벤트 클릭
shareBtn.addEventListener("click", e => {
    const url = window.location.href;
    goShrBtn(`link`, url)
})
//Q&A heading 컨트롤
qnaControl();
//스탬프 만들기
createStamp(salePrice,productPrice,createStampPcsFromPrice);
//가치태그 수신
reciveTagDetail(prd_no)

/* cafe24 default */
// Tab event
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

// $(function() {

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