

//모드 초기화
let mode;
//페이지 초기화
let page;
//옵저버 붙이기
let lastItem;
//리뷰 리스트 node
let reviewList = document.querySelector("#reviewsWritableList");

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

//loading spinner 설정
const loading = (condition) => {
	const spinner = document.querySelector(".spinner");
	condition ? spinner.classList.remove("displaynone") : spinner.classList.add("displaynone");
}

/** */
function makeDOMforWritableList(data) {

	data.forEach(data => {
		let seq = data.seq;
		let order_date = data.order_date_format;
		let mileage_by_level = data.level === 8 ? '1,000' : '200';
		let list_image = data.list_image ? data.list_image : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%86%EC%9D%8C-%ED%8F%AC%EB%9F%BC-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%B0%8F-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9A%A9-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C%EC%9E%90.jpg?ver=6';
		let prd_no = data.product_no;
		let prd_name = data.product_name;
		let prd_price = data.product_price;
		let prd_option = data.option_value;
		let option_over = data.option_value.length > 29 ? 'more' : '';
		let member_id = data.member_id ? data.member_id : '';


		//DOM 추가
		document.querySelector("#reviewsWritableList")
			.insertAdjacentHTML("beforeend",
				`<li id="writable_item_${seq}" class="reviews_writable_item" data-seq=${seq}>
                <div class="reviews_purchase_data">
                <p class="date">${order_date}</p>
                    <p class="mileage">마일리지 최대 <span class="mileage_by_level">${mileage_by_level}점</span></p>
                </div>
                <!-- 리뷰할 상품 정보 -->
                <section class="reviews_product">
                    <h1 class="displaynone">상품 리뷰하기</h1>
                        <div class="product_thumb thumb">
                            <a href="/product/detail.html?product_no=${prd_no}" title="${prd_name}">
                                <img src="${list_image}" alt="${prd_name}">
                            </a>
                        </div>
                    <ul class="product_info">
                        <li class="product_name" title="상품명">${prd_name}</li>
                        <li class="product_option ${option_over}" title="옵션"><span class="option_${seq} option ${option_over}">${prd_option}</span><button class="option_more" data-seq="${seq}" onclick="moreBtn(event)">더보기</button></li>
                        <li class="product_price" title="상품가">${prd_price}원</li>
                    </ul>
                </section>
                <!-- 리뷰할 상품 정보 -->
                <a class="review_write_link" href="/reviews/write.html?mode=create&seq=${seq}&member_id=${member_id}" data-seq=${seq}>✍️ 리뷰 기록하기</a>
            </li>`);
	});
}

let member_id;
/**
 * 최초 데이터 수신
*/
function getWriteData() {
	//URL에서 member_id 받기 
	member_id = !getUrlParams('member_id') ? document.querySelector("#member_id").value : getUrlParams('member_id');
	console.log('member_id: ', member_id);

	//본인 확인
	if(login_userId != member_id){
		alert("본인의 리뷰만 작성할 수 있어요 :)");
		history.back();
	}


	let unwrittenReviewsData;
	page = 1;
	//로딩 스피너 시작
	loading(true);
	fetch(`https://${api_domain}.shop/reviews/data?page=${page}&member_id=${member_id}&mode=ajax&div=not_write`, {

		method: "GET",
	})
		.then((response) => response.json())
		.then((response) => {
			console.log('response: ', response);
			unwrittenReviewsData = response.data;
			//로딩 스피너 종료
			loading(false);
			if (unwrittenReviewsData.length != 0) {
				makeDOMforWritableList(unwrittenReviewsData);
			} else {
				document.querySelector("#reviewsWritableListBox").insertAdjacentHTML("beforeend", `
                <div id="reviewsEmpty">
                    <h2 class="reviews_empty">게시물 없음</h2>
                    <p>아직 작성할 리뷰가 없어요 🥲</p>
                </div>
                `)
                return false;
			}
		})
		.then((response) => {
            if(unwrittenReviewsData.length == 0){
                document.querySelector("#reviewsWritableListBox").insertAdjacentHTML("beforeend", `
                <div id="reviewsEmpty">
                    
                </div>
                `)
                return false;
            }else if(unwrittenReviewsData.length > 0){
                let reviewListItems = reviewList.children;
                lastItem = reviewListItems[reviewListItems.length - 1];
                //최초 옵저버 시작
                intersectionObserver.observe(lastItem);
                page++;
            }
        })
}



    // fetch 보내기 전 작업 (unobserve)
    async function unobserveInfinityScroll(page) {
        // 통신 시작할 때 관찰 끄기
        await intersectionObserver.unobserve(lastItem);
        await loadMoreItem(page);
        return new Promise((resolve, reject) => {
             resolve(console.log("** 불러오기 sucess"));
        });
    };



    /**
     * 추가 데이터 수신
    */
	 async function loadMoreItem (page) {
        let unwrittenReviewsData;
        console.log('page: ', page);
        //로딩 스피너 시작
        loading(true);
        try {
            await fetch(`https://${api_domain}.shop/reviews/data?page=${page}&member_id=${member_id}&mode=ajax&div=not_write`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then((response) => {
                    //성공하면
                    //로딩 스피너 종료
                    loading(false);
                    unwrittenReviewsData = response.data;
                    if(unwrittenReviewsData.length === 0){
                        console.log('추가되는 리뷰 없음');
                        return false;
                    }else if(unwrittenReviewsData.length > 0){
                        makeDOMforWritableList(unwrittenReviewsData, member_id);
                        intersectionObserver.disconnect(lastItem);
                    }
                })
                .then(() => {
                    if(unwrittenReviewsData.length === 0){
                        console.log('추가되는 리뷰 없음');
                        return false;
                    }else if(unwrittenReviewsData.length > 0){
                        //페이지 1올리기
                        page++;
                        //감시하는 node 수정
                        reviewListItems = reviewList.children;
                        lastItem = reviewListItems[reviewListItems.length - 3];
                        //옵저버 재시작
                        intersectionObserver.observe(lastItem);
                    }
                })
        } catch (error) {
            console.log('error:', error);
            //에러인 경우 다시 시도;
            loadMoreItem(page)
        }
    }


//데이터 가져오는 함수 실행
//member_id 받아오는 건 때문에 settimeout 실행
window.addEventListener("load", ()=>{
	setTimeout(()=>{
		getWriteData()
	},600)
});


const moreBtn = (event) => {
	const seq = event.currentTarget.dataset.seq;
	event.currentTarget.classList.toggle("open");
	document.querySelector(`.option_${seq}`).classList.toggle("open")
}