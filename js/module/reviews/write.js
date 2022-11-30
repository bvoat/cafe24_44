//url 정보
const searchParams = window.location.search;
const params_seq = getUrlParams("seq");
const params_id = getUrlParams("member_id");
const params_mode = getUrlParams("mode");


//s3
const s3url = "https://s3.ap-northeast-2.amazonaws.com/community.bvoat.com";
//정보 객체 생성
let review_data = {
	//url 정보
	"url" : {
		"seq" : params_seq,

	},
	//유저
	"user" : {
		"nick_name": login_userNickname,
		"member_id": login_userId,
		"member_name": login_userName,
		"level": login_userLevel,
		"email": login_userEmail,
	},
	//상품
	"product": {
		"name": "",
		"no": "",
		"price": "",
		"option": "",
		"img": ""
	},
	//리뷰
	"reviews":{
		"content": "",
		"rate": "",
		"write_date": "",
		"write_date_tmp": "",
		"imgs": [],
	}
};


let filesArray = [];
let filesOrder = [];
let deleteArray = [];


/**
 * 최초 데이터 수신
*/
function getWriteData(params) {
	let reviewsData;
	fetch(`https://${api_domain}.shop/reviews/data${params}`, {
		method: "GET",
	})
	.then((response) => response.json())
	.then((response) => {
		reviewsData = response.data;
		//데이터 할당
		//상품 정보
		review_data.product.name = reviewsData[0].product_name;
		review_data.product.no = reviewsData[0].product_no;
		review_data.product.price = reviewsData[0].product_price;
		review_data.product.option = reviewsData[0].option_value;
		review_data.product.img = reviewsData[0].list_image;
		//리뷰 정보
		if(params_mode == 'modify'){
			review_data.reviews.content = reviewsData[0].content;
			review_data.reviews.rate = reviewsData[0].rate;
			review_data.reviews.write_date = reviewsData[0].write_date;
			review_data.reviews.write_date_tmp = reviewsData[0].write_date_tmp;
			review_data.reviews.imgs = reviewsData[0].imgs
		}
	})
	.then((response)=>{
		//상품 정보 삽입
		document.querySelector("#reviewsWriteProduct").insertAdjacentHTML("beforeend", `
			<button onclick="clickReviewProduct(${review_data.product.no})">
				<div class="product_thumb thumb">
					<div class="img_wrap" title="상품 이미지">
						<img src="${review_data.product.img}" alt="${review_data.product.name}">
					</div>
				</div>
				<ul class="product_info">
					<li class="product_name" title="상품명">${review_data.product.name}</li>
					<li class="product_option" title="옵션">${review_data.product.option}</li>
					<li class="product_price" title="상품가">${review_data.product.price}원</li>
				</ul>
			</button>
		`)

		//input 삽입
		document.querySelector("#seq").value = review_data.url.seq;
		document.querySelector("#nick_name").value = review_data.user.nick_name;
		document.querySelector("#member_id").value = review_data.user.member_id;
		document.querySelector("#member_name").value = review_data.user.member_name;
		document.querySelector("#level").value = review_data.user.level;
		document.querySelector("#email").value = review_data.user.email;



		if(params_mode == 'modify'){
			document.querySelector(".review_write_box").innerText = review_data.reviews.content;
			//숫자 표시
			document.querySelector(".text_num").innerHTML = review_data.reviews.content.length;
			document.querySelector("#rate").value = review_data.reviews.rate;
			document.querySelector(`.star span`).style.width = `${review_data.reviews.rate * 2 * 10}%`;
			document.querySelector(".rate_star").dataset.value = review_data.reviews.rate;
			
			console.log("review_data.reviews.imgs", review_data.reviews.imgs)
			//이미지가 있는 경우에 이미지 삽입
			if([...review_data.reviews.imgs].length > 0){
				[...review_data.reviews.imgs].forEach((image, index) => {
					console.log('image: ', image, index);
					let img_url = image.storage_div == 'cafe24' ? `${image.img_dir}/${image.img_name}` : `${s3url}/${image.img_dir}/${image.img_name}`;
					document.querySelector("#appendedArea").insertAdjacentHTML(`beforeend`, `<li id="image_${image.seq}" class="appended_item thumb" data-seq="${image.seq}" data-saved=true data-name="${image.img_name}" style="background: url(${img_url}) no-repeat center; background-size: cover;" draggable="true">
					<button class="img_del_btn" title="이미지 삭제"  data-saved=true data-seq="${image.seq}" type="button"  onclick="removeAttachedImage(event)"></button>
					</li>`
					)
				});
			}
		}
	})
}
window.addEventListener("load", ()=>{
	//접속 시 자격 체크
	//로그인 검사는 모듈로 대체
	if(params_id != document.getElementById("login_id").value){
		alert("본인의 리뷰만 작성할 수 있습니다.");
		location.href = "/reviews/feed.html";
	}
	
	setTimeout(getWriteData(searchParams), 1100);
});

/* 쓰기 기능 시작 */

/**
 * 뒤로가기 할 때 모달
 */

// window.addEventListener('beforeunload', (event) => {
// 	// 표준에 따라 기본 동작 방지
// 	event.preventDefault();
// 	// Chrome에서는 returnValue 설정이 필요함
// 	event.returnValue = '';
// 	// //화면 상단에 모달 생성
// 		// document
// 		// .querySelector("#bvtContainer")
// 		// .insertAdjacentHTML("afterbegin", `
// 		// <section id="bvtCommonModal">
// 		// <div id="bvtReviewForm" method="dialog">
// 		// 	<h2 class="review_form_title">정말로 나가실 건가요?</h2>
// 		// 	<p>입력한 정보들은 저장되지 않습니다.
// 		// 	</p>
// 		// 	<button class="ok_btn">계속 진행하기</button>
// 		// 	<button class="no_btn">나가기</button>
// 		// </div>
// 		// </section>`)
//   });

/**
 * 별점 클릭 시 input#rate에 입력
 */
let rate;
let rate_input = document.querySelector("#rate");
const drawStar = (target) => {
	rate = target.value;
    document.querySelector(`.star span`).style.width = `${rate * 10}%`;
	target.dataset.value=target.value / 2;
	rate_input.value=target.value / 2;
}

/**
 * textarea length 1000자 제한
 * content 내용 세션 저장
 */
const settingTextarea = (event) => {
    sessionStorage.setItem("content", event.currentTarget.value);
	//숫자 제한 (textarea 내 maxlength로도 1000자 제한)
	if(event.target.value.length > 1000){
		return false;
	}else{
		//숫자 표시
		document.querySelector(".text_num").innerHTML = event.target.value.length;
	};
};

/**
 * 버튼 클릭 시 file 동작
 */
const clickAttachFileButton = () => {
	if(document.getElementById('appendedArea').children.length >= 4) {
		alert("사진은 4장까지 추가 가능합니다.")
		return false;
	}
	document.getElementById("attach_image").click();
};


const createIndexAttachedImage = (attachedimage) => {
	//이미지에 번호 추가
	[...attachedimage].forEach((el, index)=>{
		el.setAttribute("data-order", index);
	})
}

/**
 * file 첨부 시 
 * @param {첨부한 이미지} input 
 */
const attachImage = (file) => {

	let imageValid = true;
	const maxSize = 5 * 1024 * 1024;
	//용량 체크
	[...file.files].forEach((image)=>{
		if(image.size > maxSize){
			alert("5MB 이상의 이미지는 첨부할 수 없어요 🥲");
			// file.files('');
			imageValid = false;
			return false;
		};
	})
	//이미지 갯수 검증
	if(document.getElementById('appendedArea').children.length+file.files.length > 4) {
		alert("사진은 4장까지만 추가 가능합니다.");
		imageValid = false;
		return false;
	}
	
	if(imageValid){
	[...file.files].forEach((image, i)=>{
		if(i > 3) return false;
		document.getElementById("appendedArea").insertAdjacentHTML("beforeend", `<li id="image_${image.lastModified}" class="appended_item thumb" data-seq="${image.lastModified}" data-saved=false data-name="${image.name}" style="background: url(${URL.createObjectURL(image)}) no-repeat center; background-size: cover;" draggable="true">
		<button class="img_del_btn" title="이미지 삭제" data-seq="${image.lastModified}" type="button" onclick="removeAttachedImage(event)"></button>
		</li>`)
	});
	
	//이미지 Array에 추가
	[...file.files].forEach((file, i)=>{
		if(i > 3) return false;
		filesArray.push(file)
	});}
};

const removeAttachedImage = (event) => {
	const target = event.currentTarget;
	//file.lastModified 로 formData 삭제
	const removeTargetSeq = target.dataset.seq;
	filesArray = filesArray.filter(file => file.lastModified != removeTargetSeq);
	
	// deleteArr에 seq 삽입
	target.dataset.saved ? deleteArray.push(`${removeTargetSeq}`) : null;
	// file.lastModified -> id 변환해 li 삭제
	document.getElementById(`image_${removeTargetSeq}`).remove();
}

/* 이미지 드래그 순서 변경 */

// 1. 대상 선정
const appendedArea = document.getElementById("appendedArea");

// 2. 옵저버 인스턴스 생성
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
	dragAppendedImage(mutation.addedNodes[0])
  });    
});

// 3. 실행
observer.observe(appendedArea, {
	characterData: true,
    childList: true,
});

let currentItemIndex;
let currentItem;

// 4. 콜백 함수
/**
 * 이미지 드래그 이벤트
 * @param {mutation.addedNodes[1]} node 
 */
const dragAppendedImage = (node) => {
	if(node){node.addEventListener("dragstart", (event)=>{
		currentItem = event.currentTarget;
		const listArr = [...appendedArea.children];
		currentItemIndex = listArr.indexOf(currentItem);
	});
	node.addEventListener("dragend", (event)=>{
		event.preventDefault();
	});
	node.addEventListener('dragover', (event) => {
		event.preventDefault();
		const currentDropItem = event.currentTarget;
		currentDropItem.classList.add("dropped");
	});
	node.addEventListener('dragleave', (event) => {
		event.preventDefault();
		const currentDropItem = event.currentTarget;
		currentDropItem.classList.remove("dropped");
	});
	node.addEventListener('drop', (event) => {
		//드롭되는 아이템
		const currentDropItem = event.currentTarget;
		const listArr = [...appendedArea.children];
		const dropItemIndex = listArr.indexOf(currentDropItem);
		
		if(currentItemIndex < dropItemIndex){
			currentDropItem.after(currentItem);
		}else{
			currentDropItem.before(currentItem);
		}
		currentDropItem.classList.remove("dropped");
	});}
}


/**
 * 리뷰 등록
 * @param {이벤트} event 
 */

async function registerReview (event) {
	 /* 전송 이벤트 중지 */
	event.preventDefault();
	/* 이미지 order 설정 */
	const appended_image = appendedArea.childNodes;
	createIndexAttachedImage(appended_image);

	//별점 검사
	if(document.getElementById("rate").value == ''){
		alert("구매하신 상품 별점을 알려주세요 :)")
		return false;
	}
	if(document.getElementById("content").value == ''){
		alert("구매하신 상품에 대한 의견을 작성해주세요 :)")
		return false;
	}
	//이미지 없으면 alert
	if(appended_image.length < 1){
		alert("이미지를 추가해주세요 :)")
		return false;
	}

	/* 보낼 정보 */
	let data = {
		'rate': document.getElementById("rate").value,
		'content': document.getElementById("content").value,
		'seq': review_data.url.seq,
		'member_id': review_data.user.member_id,
		'member_name': review_data.user.member_name,
		'nick_name': review_data.user.nick_name,
		'email': review_data.user.email,
		'level': review_data.user.level
	};


	/* 최종 formData */
	let formData = new FormData(); 

	if(appended_image.length > 0){

	// imageOrderArray formdata로 전달
	appended_image.forEach((image) => {
		let img_order = image.dataset.order; 
		let img_name = image.dataset.name;
		let img_saved = image.dataset.saved === 'true' ? true : false;
		formData.append('imageOrderArray[]', JSON.stringify({'name': img_name, 'order': img_order, 'isSaved': img_saved}));
		
	});

	//첨부 이미지 formdata로 전달
	filesArray.forEach((file)=>{
		formData.append("images", file)
	})

	//삭제 seq formdata로 전달
	deleteArray.forEach((seq)=>{
		formData.append("deleteArray", seq);
	})

	//글 데이터 formdata로 전달
	formData.append('data', JSON.stringify(data)); 


	//API 전달
	await fetch(`https://${api_domain}.shop/reviews/content`, {
		method: "POST",
		body: formData
	})
	.then((response) => response.json())
	.then((response) => {
		console.log("response", response);
		response.success == true ? location.href=`/reviews/profile.html?member_id=${data.member_id}` : alert("리뷰 저장 에러입니다. 다시 시도해주세요 :) ")
		// response.success ? location.href=`/reviews/views.html?seq=${response.data.seq}` : alert("리뷰 저장 에러입니다. 다시 시도해주세요 :)")
	})
	.then((error)=>{
		console.log(error);
		return false;
	});
	}

}

document.querySelector('#reviewSubmit').addEventListener('click', registerReview);





/* 쓰기 기능 끝 */