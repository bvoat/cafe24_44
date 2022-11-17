
//접속 시 로그인 검사
if (!sessionCheck("member_1")) {
	//미로그인 상태
	loginCheck("member_1");
}

//loading spinner 설정
const loading = (condition) => {
	const spinner = document.querySelector(".spinner");
	condition ? spinner.classList.remove("displaynone") : spinner.classList.add("displaynone");
}
/** */
function makeDOMforWritableList(data) {
	data.forEach(data => {
		let seq = data.seq;
		console.log('seq: ', seq);
		let order_date = data.order_date_format;
		let mileage_by_level = data.level === 8 ? '1,000' : '200';
		let list_image = data.list_image ? data.list_image : 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%86%EC%9D%8C-%ED%8F%AC%EB%9F%BC-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%B0%8F-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9A%A9-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C%EC%9E%90.jpg?ver=6';
		let prd_no = data.product_no;
		let prd_name = data.product_name;
		let prd_price = data.product_price;
		let prd_option = data.option_value;
		console.log('prd_option: ', prd_option);
		let option_over = data.option_value.length > 29 ? 'more' : '';
		let member_id = data.member_id ? data.member_id : '';


		//DOM 추가
		document.querySelector("#reviewsWritableList")
			.insertAdjacentHTML("afterbegin",
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
/**
 * 최초 데이터 수신
*/
function getWriteData() {
	let unwrittenReviewsData;
	//로딩 스피너 시작
	loading(true);
	console.log('login_userId: ', login_userId);
	fetch(`https://${api_domain}.shop/reviews/data?member_id=${login_userId}&div=not_write`, {

		method: "GET",
	})
		.then((response) => response.json())
		.then((response) => {
			unwrittenReviewsData = response.data;
			console.log('unwrittenReviewsData: ', unwrittenReviewsData);
			//로딩 스피너 종료
			loading(false);
			if (unwrittenReviewsData.length != 0) {
				makeDOMforWritableList(unwrittenReviewsData);
			} else {
				document.querySelector("#reviewsWritableListBox").insertAdjacentHTML("afterbegin", `
                <div id="reviewsEmpty">
                    <h2 class="reviews_empty">게시물 없음</h2>
                    <p>아직 작성한 리뷰가 없어요</p>
                </div>
                `)
			}
		})
}

window.addEventListener("load", getWriteData);


const moreBtn = (event) => {
	const seq = event.currentTarget.dataset.seq;
	event.currentTarget.classList.toggle("open");
	document.querySelector(`.option_${seq}`).classList.toggle("open")
}