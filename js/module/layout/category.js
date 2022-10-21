

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
          if (i > 1 && i < 8) {
            methods.productCategoryArray.push(parent);
          } 
          else if (i >= 8 && i <= 12) {
            methods.tagCategoryArray.push(parent);
          } else if (i === 1){
            methods.recommendedCategory.push(parent);
          }

          return false;
        });
        
        console.log("categoryObj", methods.categoryObj)
        console.log("productCategoryArray", methods.productCategoryArray)
        console.log("tagCategoryArray", methods.tagCategoryArray)
        console.log("recommendCategory", methods.recommendedCategory);
        
        //추천 카테고리 - 대 카테고리 li 생성
        methods.recommendedCategory.forEach((recommended) => {
          console.log('recommended: ', recommended);
          document
            .querySelector("#categoryOfRecommendedList")
            .insertAdjacentHTML(
              "beforeend",
              `<li class="parent_category_${
                recommended.cate_no
              }" data-cateno="${recommended.cate_no}"><span>${recommended.name}</span><a href="/${
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
              }" data-cateno="${productcategory.cate_no}">${productcategory.name}</li>`
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
              }" data-cateno="${tagcategory.cate_no}"><span>${tagcategory.name}</span><a href="/${
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
          let middleCategory = methods.createdMidCategoryNode(parent.dataset.cateno, 'onerow');
          parent.insertAdjacentHTML("afterend", middleCategory);
        });
        // 상품별 카테고리 > 개별 중 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfProduct']>li[class^='parent_category']"
          ),
        ].forEach((parent) => {
          let row = parent.dataset.cateno == 574 ? 'onerow' : 'tworow';
          console.log('row: ', row);
          let middleCategory = methods.createdMidCategoryNode(parent.dataset.cateno, row);
          parent.insertAdjacentHTML("afterend", middleCategory);
        });
        // 가치태그 카테고리 > 개별 중 카테고리 생성
        [
          ...document.querySelectorAll(
            "ul[id^='categoryOfTag']>li[class^='parent_category']"
          ),
        ].forEach((parent) => {
            let row = 'tworow';
          let middleCategory = methods.createdMidCategoryNode(parent.dataset.cateno, row);
          parent.insertAdjacentHTML("afterend", middleCategory);
        });
      })
      .then(()=>{
        // 1줄 슬라이더 공통
        var onerowSwiper = new Swiper(".onerow", {
            spaceBetween: 12,
            slidesPerView: 3.2,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'row',
            pagination: {
                el: ".progressbar",
                clickable: true,
                type: "progressbar",
            },
        });
        // 2줄 슬라이더 공통
        var tworowSwiper = new Swiper(".tworow", {
            spaceBetween: 12,
            slidesPerView: 3.2,
            slidesPerColumn: 2,
            slidesPerColumnFill: 'row',
            pagination: {
                el: ".progressbar",
                clickable: true,
                type: "progressbar",
            }
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
  createdMidCategoryNode: function (parentCategoryNo, sliderType) {
    console.log('sliderType: ', sliderType);
    //상품별 카테고리 중 카테고리 생성
    if (
      methods.categoryObj[parentCategoryNo] == undefined ||
      methods.categoryObj[parentCategoryNo].length === 0
    ) {
      return "";
    }
    //node 리스트의 ul 열기
    let categoryListNodeArray = [
      `<li class="middle_main_category_${parentCategoryNo} ${sliderType}"><ul class="swiper-wrapper">`,
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
