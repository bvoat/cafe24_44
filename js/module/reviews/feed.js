
/* 불러오기 기능 시작  */

/**
 * loading spinner 설정
 * @param {boolean} condition 
 */
 const loading = (condition) => {
	const spinner = document.querySelectorAll(".spinner");
	condition ? spinner.forEach((spinner)=>{
		spinner.classList.remove("displaynone");
	}) : spinner.forEach((spinner)=>{
		spinner.classList.add("displaynone");
	});
}

	
	/* detail에서는 페이지가 2개가 되기 때문에 querySelectorAll 사용하여 반복문으로 적용 */

    //데이터 불러올 url 초기화
    //모드 초기화
    let fetchURL;
    let mode;
    //페이지 초기화
    let page;
    //리뷰 리스트
    let reviewList = document.querySelector('.reviews_feed_list');
    console.log('reviewList: ', reviewList);
    //옵저버 붙이기
    let lastItem;
    //리뷰피드인지 상품인지 확인
    let productNo = getUrlParams('product_no');
    //s3
    const s3url = 'https://s3.ap-northeast-2.amazonaws.com/community.bvoat.com';

    //mode 및 fetchURL 설정
    if(productNo == null){
        fetchURL = `https://${api_domain}.shop/reviews/data?`;
        mode = 'feed';
    } else {
        fetchURL = `https://${api_domain}.shop/reviews/data?product_no=${productNo}`;
        mode = 'detail';
    }

    //로그인 한 유저 id
    let login_member;
    if(sessionStorage.getItem("member_1") != null){
        login_member = JSON.parse(sessionStorage.getItem("member_1")).data.member_id;
    }


    //옵저버
    const intersectionObserver = new IntersectionObserver(async (entries, observer) => {
        console.log("현재 페이지", page);
        // 마지막 요소가 다 보여진게 아니라면 return
        if (!entries[0].isIntersecting) return;
        await unobserveInfinityScroll(page);
        await page++;
    }, {
        threshold: 0.2
    });

    /**
     * DOM 생성 함수
    */
    const makeDOMforFeed = (reviews) => {
        
        reviews.forEach((obj) => {
            console.log('obj: ', obj);
            const data = {
                cmt_num : obj.cmt,
                likes_num : obj.likes,
                seq : obj.seq,
                nickname : obj.nickname ? obj.nickname : '익명',
                id : obj.member_id == '네이버 페이 구매자' ? obj.member_id : '',
                profile : obj.member_id == '네이버 페이 구매자' ? '#' : `/reviews/profile.html?member_id=&${this.id}`,
                cmt_like : obj.is_liked ? 'active' : '',
                level : obj.level == null ? '' : obj.level == "1" ? 'normal' : 'crew',
                multi_image : obj.imgs.length > 1 ? 'multi' : '',
                list_image : obj.list_image ? obj.list_image : '',
                img_url : obj.imgs.length > 0 ? obj.imgs[0].storage_div == 'cafe24' ? `${obj.imgs[0].img_dir}/${obj.imgs[0].img_name}` : `${s3url}/${obj.imgs[0].img_dir}/${obj.imgs[0].img_name}` : obj.list_image,
                productno : obj.product_name ? obj.product_name : '구매 상품',
                rate : obj.rate ? obj.rate : '5.0',
                content : obj.content ? obj.content : '비어 있는 리뷰입니다.',
            }
            //DOM 추가
            reviewList
            .insertAdjacentHTML("beforeend",
                    `<li id="item_${data.seq}" class="reviews_item">
                    <ul class="userinfo_wrap">
                        <li class="userimg"><a href="${data.profile}" onclick="sessionInitClickPosition()"><img src="https://bvoat.shop/images/new_img/ico__11.png"></a></li>
                        <li class="usernickname ${data.level}"><a href="${data.profile}" onclick="sessionInitClickPosition()">${data.nickname}</a></li>
                    </ul>
                    <div class="reviews_wrap">
                        <div class="reviews_thumb_box thumb">
                            <a class="reviews_thumb ${data.multi_image}" href="/reviews/views.html?seq=${data.seq}" onclick="sessionInitClickPosition()">
                                <img src="${data.img_url}" alt="${data.productno}" onerror="this.src='${data.list_image}';"><em class="reviews_rate">
                                    <span>${data.rate}</span>
                                </em></a>
                            <ul class="reviews_reaction_box">
                                <li class="reviews_reaction">
                                    <button class="reviews_likes ${data.cmt_like}" data-seq=${data.seq} onclick="reviewsLikesButtons(event)"><span class="reviews_likes_num_${data.seq}">${data.likes_num}</span></button>
                                    <a class="reviews_cmt"  data-seq=${data.seq} title="댓글 ${data.cmt_num}개 보기" href="/reviews/views.html?seq=${data.seq}#reviewsComment" onclick="sessionInitClickPosition()"></a>
                                </li>
                                <li class="reviews_share"><button class="share_text_btn share_text_btn_${data.seq}" data-seq=${data.seq} title="공유하기" onclick="sharingLinkText(event)"></button></li>
                            </ul>
                        </div>
                        <div class="reviews_content">
                            <a href="/reviews/views.html?seq=${data.seq}" onclick="sessionInitClickPosition()">
                            <p class="content">${data.content}</p>
                            </a>
                        </div>
                    </div>
                </li>`);
           
            

        });
    }

    /**
     * 최초 데이터 수신
    */
    function getBeginningReviewData() {
        let initialReviewsData;
        page = 1;
        console.log('최초 페이지 page: ', page);
        //로딩 스피너 시작
        loading(true);
        fetch(`${fetchURL}page=${page}&mode=ajax&member_id=${login_userId}&div=all`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {
            //로딩 스피너 종료
            loading(false);
            initialReviewsData = response.data;
            //만약 reviewsData의 length가 0이면 return false
            if(initialReviewsData.length == 0){
                console.log('리뷰 없음');
                return false;
            }else if(initialReviewsData.length > 0){
                console.log('리뷰 있음');
                makeDOMforFeed(initialReviewsData);
            }
        })
        .then((response) => {
            if(initialReviewsData.length == 0){
                console.log('리뷰 없음');
                return false;
            }else if(initialReviewsData.length > 0){
                let reviewListItems = reviewList.children;
                lastItem = reviewListItems[reviewListItems.length - 3];
                //최초 옵저버 시작
                intersectionObserver.observe(lastItem);
                page++;

                if(mode == 'detail'){
                    detailTabSwiper.updateAutoHeight(10);
                    detailTabSwiper.updateSize();
                }
            }
        })
    }


    // fetch 보내기 전 작업 (unobserve)
    async function unobserveInfinityScroll(page) {
        // 통신 시작할 때 관찰 끄기
        await intersectionObserver.unobserve(lastItem);
        await loadMoreItem(page);
        return new Promise((resolve, reject) => {
             resolve("success");
        });
    };


    /**
     * 추가 데이터 수신
    */
    async function loadMoreItem (page) {
        let additionalReviewsData;
        console.log('page: ', page);
        //로딩 스피너 시작
        loading(true);
        try {
            await fetch(`${fetchURL}&page=${page}&mode=ajax`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((response) => {
                    //성공하면
                    //로딩 스피너 종료
                    loading(false);
                    additionalReviewsData = response.data;
                    if(additionalReviewsData.length === 0){
                        console.log('추가되는 리뷰 없음');
                        return false;
                    }else if(additionalReviewsData.length > 0){
                        makeDOMforFeed(additionalReviewsData);
                        intersectionObserver.disconnect(lastItem);
                    }
                })
                .then(() => {
                    if(additionalReviewsData.length === 0){
                        console.log('추가되는 리뷰 없음');
                        return false;
                    }else if(additionalReviewsData.length > 0){
                        //페이지 1올리기
                        page++;
                        //감시하는 node 수정
                        reviewListItems = reviewList.children;
                        lastItem = reviewListItems[reviewListItems.length - 3];
                        //옵저버 재시작
                        intersectionObserver.observe(lastItem);
                        if(mode == 'detail'){
                            detailTabSwiper.updateAutoHeight(10);
                            detailTabSwiper.updateSize();
                        }
                    }
                })
        } catch (error) {
            console.log('error:', error);
            //에러인 경우 다시 시도;
            loadMoreItem(page)
        }
    }
    window.addEventListener("load", getBeginningReviewData());

/* 불러오기 기능 끝  */


/* 게시글 개별 기능 시작  */


/* 게시글 개별 기능 끝  */


/* 피드 공통 기능 시작 */

/**
 * 클릭한 아이템 위치 값 저장 - Feed에서만 사용
 */
function sessionInitClickPosition () {
    const top = window.pageYOffset;
    //세션에 top 이 있는지 확인
    if(sessionStorage.getItem("top") && sessionStorage.getItem("page")){
        //기존 위치,페이지 삭제하고
        sessionStorage.removeItem("top");
        sessionStorage.removeItem("page");
        //새로 저장
        sessionStorage.setItem("top", top);
        sessionStorage.setItem("page", page);
    }else{
        //새로 저장
        sessionStorage.setItem("top", top);
        sessionStorage.setItem("page", page);
    }
}

/**
 * 뒤로가기 시 위치 설정
 * @param {callback function} _callback 
 */

const scrollingToClickItem = (top) => {
    if (history.scrollRestoration) {
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

async function asyncScrollTop(page){
    //page 1은 이미 로딩 됨
    let i = 2;
    let rewind_num = page;
    while(i < rewind_num){
        await unobserveInfinityScroll(i);
        i++;
    }

    await scrollingToClickItem(sessionStorage.getItem("top"));
}


window.addEventListener("pageshow",(event)=>{
    //safari || chrome
    if(event.persisted || (window.performance && window.performance.navigation.type == 2)){
        sessionStorage.getItem("page") ? asyncScrollTop(sessionStorage.getItem("page")) : null;
    }
    return false;
});

/* 피드 공통 기능 끝 */

