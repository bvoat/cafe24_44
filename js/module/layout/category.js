// 인기 검색어 슬라이더
var hotSwiper = new Swiper(".search_hot", {
  slidesPerView: "auto",
  spaceBetween: 6,
});

let methods = {
  categoryObj: {},
  productCategoryArray: [],
  tagCategoryArray: [],
  createdCategoryObj: function () {
    //category JSON 서버 통신
    fetch(`/exec/front/Product/SubCategory`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === null || data === "undefined") return false;
        for (let idx = 0; idx < data.length; idx++) {
          let parentCategoryNo = data[idx].parent_cate_no;
          if (!methods.categoryObj[parentCategoryNo]) {
            methods.categoryObj[parentCategoryNo] = [];
          }
          methods.categoryObj[parentCategoryNo].push(data[idx]);
        }
      })
      .then(() => {
        /* 최상위 대 카테고리 생성 */
        //createdCategoryObjResult 객체의 1번 key value 가져와서 parentCategoryArray로 생성
        const parentCategoryArray = methods.categoryObj[1];
        //parentCategoryArray로 반복하여 productCategoryArray,tagCategoryArray 배열에 각각 push (207은 All카테고리 570은 패션 카테고리 번호로 상품별과 가치태그 카테고리 구분점으로 지정)
        parentCategoryArray.forEach((parent) => {
          if (207 < parent.cate_no && parent.cate_no < 570) {
            console.log("tag", parent.cate_no);
            methods.tagCategoryArray.push(parent);
          } 
          else if (parent.cate_no >= 570) {
            methods.productCategoryArray.push(parent);
          }
        });
        //상품별 카테고리 대 카테고리 li 생성
        methods.productCategoryArray.forEach((productcategory) => {
          document
            .querySelector("#categoryOfProductList")
            .insertAdjacentHTML(
              "beforeend",
              `<li class="parent_category_${
                productcategory.cate_no
              }" data-cateno="${productcategory.cate_no}">${productcategory.name}</li>`
            );
        });

        //가치태그 카테고리 대 카테고리 li 생성
        methods.tagCategoryArray.forEach((tagcategory) => {
          document
            .querySelector("#categoryOfTagList")
            .insertAdjacentHTML(
              "beforeend",
              `<li class="parent_category_${
                tagcategory.cate_no
              }" data-cateno="${tagcategory.cate_no}"><span>${tagcategory.name}</span><a href="/${
                tagcategory.design_page_url + tagcategory.param
              }" title="${tagcategory.name}"></a></li>`
            );
        });
      })
      .then(() => {
        // 상품별 카테고리 > 개별 중 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfProduct']>li[class^='parent_category']"
          ),
        ].forEach((parent) => {
          let middleCategory = methods.createdMidCategoryNode(
            parent.dataset.cateno,
            "category_product",
            "no-swiper"
          );
          parent.insertAdjacentHTML("afterend", middleCategory);
        });
        // 상품별 카테고리 > 개별 중 카테고리 > 개별 소 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfProduct']>li[class^='middle_main_category']>ul>li[class^='middle_category']"
          ),
        ].forEach((middle) => {
          let smallCategory = methods.createdProductSmallCategoryNode(
            middle.dataset.cateno
          );
          middle.insertAdjacentHTML("beforeend", smallCategory);
        });
        // 가치태그 카테고리 > 개별 중 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfTag']>li[class^='parent_category']"
          ),
        ].forEach((parent) => {
          let middleCategory = methods.createdMidCategoryNode(
            parent.dataset.cateno,
            "category_tag",
            "swiper-wrapper middle_main_category_list"
          );
          parent.insertAdjacentHTML("afterend", middleCategory);
        });
        // 가치태그 카테고리 > 개별 중 카테고리 > 개별 소 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfTag']>li[class^='middle_main_category']>ul>li[class^='middle_category']"
          ),
        ].forEach((middle) => {
          let smallCategory = methods.createdProductSmallCategoryNode(
            middle.dataset.cateno
          );
          middle.parentNode.insertAdjacentHTML("afterend", smallCategory);
        });
      })
      .then(() => {
        // 가치태그 카테고리 중 슬라이더
        var categoryTagSwiper = new Swiper(".category_tag", {
          slidesPerView: "auto",
          spaceBetween: 6,
        });
      });
    return methods.categoryObj;
  },
  createdMidCategoryNode: function (
    parentCategoryNo,
    categoryType,
    boolSwiper
  ) {
    //상품별 카테고리 중 카테고리 생성
    if (
      methods.categoryObj[parentCategoryNo] == undefined ||
      methods.categoryObj[parentCategoryNo].length === 0
    ) {
      return "";
    }
    //node 리스트의 ul 열기
    let categoryListNodeArray = [
      `<li class="middle_main_category_${parentCategoryNo} ${categoryType}"><ul class="${boolSwiper}">`,
    ];
    //node 리스트의 li 반복 생성
    methods.categoryObj[parentCategoryNo].forEach((el) => {
      categoryListNodeArray.push(`
            <li class="middle_category_${
              el.cate_no
            } swiper-slide" data-cateno="${el.cate_no}">
                <div class="category_link_wrap">
                    <span class="${`catemiddle${el.cate_no}icon product_cate_icon`}"></span>
                    ${el.name}
                    <span class="product_cate_arrow"></span>
                </div>
            </li>`);
    });
    //node 리스트의 ul 닫기
    categoryListNodeArray.push(`</ul></li>`);
    //최종 태그 리턴
    return categoryListNodeArray.join("");
  },
  createdProductSmallCategoryNode: function (midCategoryNo) {
    //상품별 카테고리 중 카테고리 생성
    if (
      methods.categoryObj[midCategoryNo] == undefined ||
      methods.categoryObj[midCategoryNo].length === 0
    ) {
      return "";
    }
    //node 리스트의 ul 열기
    let categoryListNodeArray = [
      `<ul class="small_main_category_${midCategoryNo} displaynone small_main">`,
    ];
    //node 리스트의 li 반복 생성
    methods.categoryObj[midCategoryNo].forEach((el) => {
      categoryListNodeArray.push(`
            <li class="small_category_${el.cate_no}" data-cateno="${el.cate_no}">
                <div class="category_link_wrap">
                    <a href="/${el.design_page_url}${el.param}">
                    ${el.name}
                    </a>
                </div>
            </li>`);
    });
    //node 리스트의 ul 닫기
    categoryListNodeArray.push(`</ul>`);
    //최종 태그 리턴
    return categoryListNodeArray.join("");
  },
};

/* 0. 통신 실행 / ul 아래 대, 중, 소 카테고리 생성 */
const createdCategoryObjResult = methods.createdCategoryObj();

// window.addEventListener("load", ()=>{
//     const first = document.querySelector(".middle_category_142");
//     first.classList.add("sub_active");
//     first.childNodes[3].classList.remove("displaynone")
// })

/* 클릭 이벤트 */
window.addEventListener("load", () => {
  // 상품별 카테고리 > 중 카테고리 클릭 시 소 카테고리 보이기
  let productMidCategory = document.querySelectorAll(
    "ul[id^='categoryOfProduct'] li[class^='middle_category']"
  );
  productMidCategory.forEach((mid) => {
    // 개별 카테고리에서 클릭 영역인 div.category_link_wrap만 클릭 이벤트 줌 (나머지 영역 제외)
    mid.childNodes[1].addEventListener("click", (e) => {
      // div.category_link_wrap 의 parent인 전체 li를 잡고 (parent) 거기에 소 카테고리 있는지 확인
      if (e.currentTarget.parentNode.childNodes[3]) {
        //소 카테고리 보이기
        e.currentTarget.parentNode.childNodes[3].classList.toggle("displaynone");
        //전체 li에 subactive 넣어서 CSS 수정
        e.currentTarget.parentNode.classList.toggle("sub_active");
      }
    });
  });

  // 가치태그 카테고리 > 중 카테고리 클릭 시 소 카테고리 보이기
  let tagMidCategory = document.querySelectorAll(
    "ul[id^='categoryOfTag'] li[class^='middle_category']"
  );
  tagMidCategory.forEach((mid) => {
    mid.addEventListener("click", (e) => {
      /* 소 카테고리가 있는 경우 */
      if (
        document.querySelector(
          `.small_main_category_${e.currentTarget.dataset.cateno}`
        ) != null
      ) {
        /* sub active 관련 */
        //active 클래스 추가
        e.currentTarget.classList.toggle("sub_active");

        // 나머지 active 클래스 돌면서 삭제
        //지금 클릭한 target인 middle_category_cateno 의 형제를 구하고 parent.child
        //형제를 돌면서
        Array.from(e.currentTarget.parentNode.childNodes).forEach((ul) => {
          //만약 지금 ul이 target이 아닌 경우 && class 리스트 있는 경우
          if (ul != e.currentTarget && ul.classList) {
            //sub active 클래스 삭제
            ul.classList.remove("sub_active");
          }
          return false;
        });

        /* 소 카테고리 관련 */

        //소 카테고리에 displaynone 토글 시킴
        document
          .querySelector(
            `.small_main_category_${e.currentTarget.dataset.cateno}`
          )
          .classList.toggle("displaynone");

        //나머지 small 닫기
        //지금 클릭한 middle의 target인 small_main_category_cateno 의 형제를 구하고 parent.child
        //형제를 돌면서
        Array.from(
          document.querySelector(
            `.small_main_category_${e.currentTarget.dataset.cateno}`
          ).parentNode.childNodes
        ).forEach((ul) => {
          //만약 형제들의 class list에 small_main 이 있으면 (소 카테고리면)
          if (ul && [...ul.classList].includes("small_main")) {
            //만약 해당 형제가 아까 클릭해서 target한 small_main_category와 같지 않은 것들은
            if (
              ul !==
              document.querySelector(
                `.small_main_category_${e.currentTarget.dataset.cateno}`
              )
            ) {
              //안 보이게 (기존에 열려있던 것들을 닫기 위함)
              ul.classList.add("displaynone");
            }
          } else {
            //small_main_category가 아님
            return;
          }
          return false;
        });
      }
      return false;
    });
  });
});


/* 인증별 카테고리 별도 링크 작업 */
window.addEventListener("load", ()=>{
  if(document.querySelector(".middle_main_category_533")){
    document.querySelectorAll(".middle_main_category_533 > .middle_main_category_list >li").forEach((assign)=>{
      assign.addEventListener("click", ()=>{
        window.location = `/product/list.html?cate_no=${assign.dataset.cateno}`
      })
    })
  }
})