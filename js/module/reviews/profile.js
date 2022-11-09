/**
 * loading spinner 설정
 * @param {boolean} condition 
 */
 const loading = (condition) => {
	const spinner = document.querySelectorAll(".spinner");
	condition ? spinner.forEach((spinner)=>{
		spinner.classList.remove("displaynone")
	}) : spinner.forEach((spinner)=>{
		spinner.classList.add("displaynone")
	});
}
//1. URL에서 member_id 받기 
let member_id = getUrlParams('member_id');

//1-1. 상태 값 초기화
let compareID;


/**
 * 세션 있는지 반환 받아서 compareID 할당
 */
function assignMemberID(member_id) {		
	//2. 세션 있는지 확인하기
	// console.log("로그인 세션 있나요?" , sessionCheck("member_1"));
	if (sessionCheck("member_1")) {
		//2-1. 세션 있으면
		//세션 member_id와 url member_id 비교하기
		let getSessionID = JSON.parse(sessionStorage.getItem("member_1")).data.member_id;
		//2-1-1. 세션 member_id와 url member_id가 같다면
		//2-1-1-1. compareID true -> 내 정보 보기
		//2-1-2. 세션 member_id와 url member_id가 다르다면
		//2-1-2-1. compareID false -> 상대방 정보 보기
		if (String(getSessionID) === String(member_id)) {
			compareID = true
		}
		else {
			compareID = false;
		}

	} else {
		//2-2. 세션 없으면 
		//compareID = false
		compareID = false;
	}
	getBeginningReviewData(member_id);
}

// 마지막 자식요소에 옵저버 붙이기
let reviewList = document.querySelector('.reviews_id_list');
let lastItem;
//페이지 초기화
let page;

/**
 * intersectionObserver 옵저버 객체
 */
const intersectionObserver = new IntersectionObserver(async (entries, observer) => {
	console.log("현재 페이지", page);
	// 마지막 요소가 다 보여진게 아니라면 return
	if (!entries[0].isIntersecting) return;
	await unobserveInfinityScroll(page);
	await page++;
}, {
	threshold: 0.1
});

/**
 * DOM 생성 함수
*/
const makeDOMuserProfile = (data) => {
	console.log('data: ', data);
	let nickname = data.nickname ? data.nickname : '익명';
	let userlevel = data.level == null ? '' : data.level == "1" ? 'normal' : 'crew';
	let userWriteTotal = data.total ? data.total : '';
	let userNotWriteTotal = data.cnt_not_write ? data.cnt_not_write : '';
	if (compareID) {
		//내 프로필 뷰
		//리뷰 쓰기 + 프로필 뷰
		document.querySelector(".user_reaction").insertAdjacentHTML("afterbegin", `
		<a class="write_reviews" href="/myshop/reviews/list_my.html?div=not_write">리뷰 쓰기(<span class="write_reviews_num"></span>)
		<a class="modify_profile" href="/member/modify.html">프로필 편집</a>
		`);
		//정보 삽입
		//별명
		document.querySelector("#reviewsProfileTitle .usernickname").insertAdjacentText("beforeend", nickname);
		//등급
		document.querySelector("#reviewsProfileTitle .userlevel").classList.add(userlevel);
		//리뷰 갯수
		document.querySelector(".reviews_num>span").insertAdjacentText("beforeend", userWriteTotal);
		//안 쓴 리뷰 갯수
		document.querySelector(".write_reviews_num").insertAdjacentText("beforeend", userNotWriteTotal);

	} else if (!compareID) {
		//상대방 프로필 뷰
		//팔로우
		document.querySelector(".user_reaction").insertAdjacentHTML("afterbegin", `
		<a class="follow_action">팔로우</a>`);
		//정보 삽입
		//별명
		document.querySelector("#reviewsProfileTitle .usernickname").insertAdjacentText("beforeend", nickname);
		//등급
		document.querySelector("#reviewsProfileTitle .userlevel").classList.add(userlevel);
		//리뷰 갯수
		document.querySelector(".reviews_num>span").insertAdjacentText("beforeend", userWriteTotal);
	}

}

const makeDOMforFeed = (data) => {
	data.forEach((data) => {
		let seq = data.seq;
		let nickname = data.nickname ? data.nickname : '익명';
		let userlevel = data.level == null ? '' : data.level == "1" ? 'normal' : 'crew';
		let list_image = data.list_image;
		let multi_image = data.imgs.length > 1 ? 'multi' : '';
		let firstImgdir = data.imgs.length != 0 ? data.imgs[0].img_dir : '';
		let firstImgname = data.imgs.length != 0 ? data.imgs[0].img_name : '';
		let firstImgUrl = `https://s3.ap-northeast-2.amazonaws.com/community.bvoat.com/${firstImgdir}/${firstImgname}`
		let rate = data.rate ? data.rate : '5.0';


		//DOM 추가
		document.querySelector(".reviews_id_list")
			.insertAdjacentHTML("beforeend",
				`
			<li class="reviews_item">
				<div class="reviews_wrap">
					<div class="reviews_thumb_box thumb">
						<a class="reviews_thumb ${multi_image}" href="/reviews/views.html?seq=${seq}">
							<img src="${firstImgUrl}" onerror="this.src='${list_image}';"><em class="reviews_rate">
								<span>${rate}</span>
							</em></a>
					</div>
				</div>
			</li>`);
	});
}

/**
 * 최초 데이터 수신
*/
function getBeginningReviewData(member_id) {
	let reviewsData;
	let profileData;
	page = 1;
	console.log('최초 페이지 page: ', page);
	console.log('받아올 아이디', member_id)
	//로딩 스피너 시작
	loading(true);
	fetch(`https://${api_domain}.shop/reviews/data?member_id=${member_id}&page=${page}`, {
		method: "GET",
	})
		.then((response) => response.json())
		.then((response) => {
			//로딩 스피너 종료
			loading(false);
			reviewsData = response.data;
			profileData = response;
			console.log('reviewsData: ', reviewsData);
			console.log("최초 데이터 수신 length : ",reviewsData.length);
			//response의 data length가 0이 아니면 DOM생성 실행
			if(reviewsData.length != 0){
				makeDOMuserProfile(profileData);
				makeDOMforFeed(reviewsData);				
			} else {
				intersectionObserver.disconnect(lastItem);
				return false;
			}
		})
		.then(() => {
			if(reviewsData.length != 0){
				let reviewListItems = reviewList.children;
				lastItem = reviewListItems[reviewListItems.length - 3];
				//최초 옵저버 시작
				intersectionObserver.observe(lastItem);
				page++;
			}else{
				intersectionObserver.disconnect(lastItem);
			}
		})
}

// fetch 보내기 전 작업 (unobserve)
async function unobserveInfinityScroll(page) {
	// 통신 시작할 때 관찰 끄기
	console.log("추가 아이템 부르는 페이지 ", page);
	await intersectionObserver.unobserve(lastItem);
	await loadMoreItem(page, member_id);
};


/**
 * 추가 데이터 수신
*/
async function loadMoreItem(page, member_id) {
	let reviewsData;
	//로딩 스피너 시작
	loading(true);
	try {
		await fetch(`https://${api_domain}.shop/reviews/data?member_id=${member_id}&page=${page}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((response) => {
				//성공하면
				//로딩 스피너 종료
				loading(false);
				reviewsData = response.data;
				console.log("추가 데이터 수신 length : ",reviewsData.length);
				if(reviewsData.length != 0){
					makeDOMforFeed(reviewsData);
					intersectionObserver.disconnect(lastItem);
				} else {
					intersectionObserver.disconnect(lastItem);
					return false;
				}
			})
			.then((response) => {
				if(reviewsData.length != 0){
				//페이지 1올리기
				page++;
				//감시하는 node 수정
				reviewListItems = reviewList.children;
				lastItem = reviewListItems[reviewListItems.length - 3];
				console.log('추가 데이터의 lastItem: ', lastItem);
				//옵저버 재시작
				intersectionObserver.observe(lastItem);
				}
			})
	} catch (error) {
		console.log('error:', error);
		//에러인 경우 다시 시도;
		intersectionObserver.disconnect(lastItem);
		loadMoreItem(page, member_id);
	}
}
//member_id 할당부터 시작
window.addEventListener("load", assignMemberID(member_id));

