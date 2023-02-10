const categorySummary = {
  "🌱 비건": "동물을 성분과 소재로 사용하지 않았어요",
  "🌳 친환경": "환경에 주는 영향을 최소화 했어요",
  "🌏 사회가치": "구매가 사회에 선한 영향력을 줘요",
  "🌿 패션": "비건 가죽 · 업사이클링 · 리사이클",
  "☘️ 패션 잡화": "비건 가죽 · 업사이클 · 리사이클 · 기부 후원",
  "🐰 뷰티": "순식물성 비건 뷰티 · 천연, 유기농 · 크루얼티프리",
  "🍊 푸드": "순식물성 비건 푸드 · 대체 식품 · 유기농 재배",
  "🏡 홈 · 리빙" : "제로/레스웨이스트 · 자연유래 · 생분해/다회용"
};

let methods = {
  categoryObj: {},
  //추천 카테고리
  recommendedCategory: [],
  //상품 대 카테고리
  productCategoryArray: [],
  //가치태그 대 카테고리
  tagCategoryArray: [],
  createdCategoryObj: function () {
    //category JSON 서버 통신
    fetch(`/exec/front/Product/SubCategory`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data);
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
        //parentCategoryArray로 반복하여 productCategoryArray,tagCategoryArray 배열에 각각 push
        parentCategoryArray.forEach((parent, i) => {
          if (i > 1 && i < 7) {
            methods.productCategoryArray.push(parent);
          } 
          else if (i >= 7 && i <= 9) {
            methods.tagCategoryArray.push(parent);
          } else if (i === 1){
            methods.recommendedCategory.push(parent);
          }
          return false;
        });

        
        //추천 카테고리 - 대 카테고리 li 생성
        methods.recommendedCategory.forEach((recommended) => {
          document
            .querySelector("#categoryOfRecommendedList")
            .insertAdjacentHTML(
              "beforeend",
              `<li class="parent_category_${
                recommended.cate_no
              }" data-cateno="${recommended.cate_no}"><span>${recommended.name}</span><span class="category_summary">${categorySummary[recommended.name] != undefined ? categorySummary[recommended.name] : ''} </span><a href="/${
                recommended.design_page_url + recommended.param
              }#${recommended.name}" title="${recommended.name}"></a></li>`
            );
        });

        //상품별 카테고리 - 대 카테고리 li 생성
        methods.productCategoryArray.forEach((productcategory) => {
          document
            .querySelector("#categoryOfProductList")
            .insertAdjacentHTML(
              "beforeend",
              `<li class="parent_category_${
                productcategory.cate_no
              }" data-cateno="${productcategory.cate_no}">${productcategory.name} <span class="category_summary">${categorySummary[productcategory.name] != undefined ? categorySummary[productcategory.name] : ''} </span> </li> `
            );
        });

        //가치태그 카테고리 - 대 카테고리 li 생성
        methods.tagCategoryArray.forEach((tagcategory) => {
          document
            .querySelector("#categoryOfTagList")
            .insertAdjacentHTML(
              "beforeend",
              `<li class="parent_category_${
                tagcategory.cate_no
              }" data-cateno="${tagcategory.cate_no}"><span>${tagcategory.name}</span> <span class="category_summary">${categorySummary[tagcategory.name] != undefined ? categorySummary[tagcategory.name] : ''} </span> <a href="/${
                tagcategory.design_page_url + tagcategory.param
              }#${tagcategory.name}" title="${tagcategory.name}"></a></li>`
            );
        });

      })
      .then(() => {
        //추천 카테고리 > 개별 중 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfRecommended']>li[class^='parent_category']"
          ),
        ].forEach((parent) => {
          let middleCategory = methods.createdMidCategoryNode(parent.dataset.cateno, 'recommend', 'slide');
          parent.insertAdjacentHTML("afterend", middleCategory);
        });
        // 가치태그 카테고리 > 개별 중 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfTag']>li[class^='parent_category']"
          ),
        ].forEach((parent) => {
          let middleCategory = methods.createdMidCategoryNode(parent.dataset.cateno, 'product-tag', 'slide');
          parent.insertAdjacentHTML("afterend", middleCategory);
        });
        // 상품별 카테고리 > 개별 중 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfProduct']>li[class^='parent_category']"
          ),
        ].forEach((parent) => {
          let middleCategory = methods.createdMidCategoryNode(parent.dataset.cateno, "product-item");
          parent.insertAdjacentHTML("afterend", middleCategory);
        });
      })
      .then(()=>{
        // 추천 슬라이더
        var recommendSwiper = new Swiper(".recommend", {
            spaceBetween: 7.2,
            slidesPerView: "auto",
        });
        // 가치태그 슬라이더
        var tagSwiper = new Swiper(".product-tag", {
          spaceBetween: 7.2,
          slidesPerView: "auto",
        });
        //상품 슬라이더
        var itemSwiper = new Swiper(".product-item", {
          spaceBetween: 7.2,
          slidesPerView: "auto",
        });
      })
    return methods.categoryObj;
  },


   
  /**
   * 상품별 카테고리 - 중 카테고리 생성
   * @param {부모 카테고리 번호} parentCategoryNo
   * @param {슬라이더 row} sliderType
   * @returns 
   */
  createdMidCategoryNode: function (parentCategoryNo, swiperClass, swiperType) {

    const type = swiperType === 'slide' ? 'swiper-wrapper' : 'no-swiper';

    //상품별 카테고리 중 카테고리 생성
    if (
      methods.categoryObj[parentCategoryNo] == undefined ||
      methods.categoryObj[parentCategoryNo].length === 0
    ) {
      return "";
    }
    //node 리스트의 ul 열기
    let categoryListNodeArray = [
      `<li class="middle_main_category_${parentCategoryNo} ${swiperClass}"><ul class="${type}">`,
    ];
    //node 리스트의 li 반복 생성
    methods.categoryObj[parentCategoryNo].forEach((el) => {
      categoryListNodeArray.push(`
            <li class="middle_category_${el.cate_no} middle_item swiper-slide" data-cateno="${el.cate_no}">
                <a href="/${el.design_page_url}${el.param}" title="${el.name}">
                <div class="category_img thumb">
                    <div class="img_wrap">
                        <img src="/bvtIMG/category/${el.cate_no}.png" alt="${el.name}" onerror=this.src='/bvtIMG/category/onerror.png'>
                    </div>
                </div>
                <div class="category_name">
                    ${el.name}
                </div>
                </a>
            </li>`);
    });
    //node 리스트의 ul 닫기
    categoryListNodeArray.push(`
    </ul>
    <div class="progressbar swiper-pagination"></div>
    </li>
    `);
    //최종 태그 리턴
    return categoryListNodeArray.join("");
  },
};

/* 0. 통신 실행 / ul 아래 대, 중, 소 카테고리 생성 */
methods.createdCategoryObj();
