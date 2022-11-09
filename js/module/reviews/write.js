//세션에서 id 받아오기
const session_member = JSON.parse(sessionStorage.getItem("member_1"))
const session_id = session_member.data.member_id;
const session_nick = session_member.data.nick_name;

//url 정보
const searchParams = window.location.search;
const params_seq = getUrlParams("seq");
const params_id = getUrlParams("member_id");
const params_div = getUrlParams("div");
//s3
const s3url = 'https://s3.ap-northeast-2.amazonaws.com/community.bvoat.com';
//정보 객체 생성
let review_data = {
	//url 정보
	"url" : {
		"seq" : params_seq,

	},
	//유저
	"user" : {
		"name": "",
		"member_id": "",
		"level": "",
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
		console.log('reviewsData: ', reviewsData);
		//데이터 할당
		//상품 정보
		review_data.product.name = reviewsData[0].product_name;
		review_data.product.no = reviewsData[0].product_no;
		review_data.product.price = reviewsData[0].product_price;
		review_data.product.option = reviewsData[0].option_value;
		review_data.product.img = reviewsData[0].list_image;
		//유저 정보
		review_data.user.name = reviewsData[0].nickname;
		review_data.user.member_id = reviewsData[0].member_id;
		review_data.user.level = reviewsData[0].level;
		//리뷰 정보
		if(params_div == 'modify'){
			review_data.reviews.content = reviewsData[0].content;
			review_data.reviews.rate = reviewsData[0].rate;
			review_data.reviews.write_date = reviewsData[0].write_date;
			review_data.reviews.write_date_tmp = reviewsData[0].write_date_tmp;
			review_data.reviews.imgs = reviewsData[0].imgs
		}

	})
	.then((response)=>{
		//상품 정보 삽입
		document.querySelector(".img_wrap").insertAdjacentHTML("afterbegin",`<img src="${review_data.product.img}" alt="${review_data.product.name}">`)
		document.querySelector(".product_name").insertAdjacentText("afterbegin", review_data.product.name);
		document.querySelector(".product_option").insertAdjacentText("afterbegin", review_data.product.option);
		document.querySelector(".product_price").insertAdjacentText("afterbegin", review_data.product.price + '원');
		//input 삽입
		document.querySelector("#seq").value = review_data.url.seq;
		document.querySelector("#nickname").value = review_data.user.nickname;
		document.querySelector("#writerId").value = review_data.user.member_id;
		document.querySelector("#level").value = review_data.user.level;

		if(params_div == 'modify'){
			document.querySelector(".review_write_box").innerHTML = review_data.reviews.content;
			//rateit에 value 설정 위해 제이쿼리 사용
			$('#rateit').rateit("value", review_data.reviews.rate);
			//이미지가 있는 경우에 이미지 삽입
			if([...review_data.reviews.imgs].length > 0){
				[...review_data.reviews.imgs].forEach((image, index) => {
					let img_url = image.storage_div == 'cafe24' ? `${image.img_dir}/${image.img_name}` : `${s3url}/${image.img_dir}/${image.img_name}`;
	
					document.querySelector("#appendedArea").insertAdjacentHTML(`afterbegin`, `<li id="appended_img_${image.lastModified}" class="appended_item thumb" data-seq="${image.lastModified}" >
					<div class="appended_wrap img_wrap"><img src="${img_url}"></div>
					<button class="img_del_btn" title="${index}번 이미지 삭제" data-seq="${image.lastModified}" data-index="${index}" type="button" onclick="appendedPhotoDelete(event)"></button>
					</li>`)
				});
			}
			
		}
	})
}
window.addEventListener("load", getWriteData(searchParams));


/* 쓰기 기능 시작 */
/**
 * 버튼 클릭 시 file 동작
 */
const addPhotoButtonClick = () => {
	document.getElementById("appendedImgs").click();
}
/**
 * file 첨부 시 
 * @param {첨부한 이미지} input 
 */

//이미지 리스트 초기화
let images;

const previewAppendedPhoto = (input) => {
	images = input.files;	//선택된 파일 가져오기

	[...images].forEach((image, index)=>{
		document.getElementById("appendedArea").insertAdjacentHTML("beforeend", `
		<li id="appended_img_${image.lastModified}" class="appended_item thumb" data-seq="${image.lastModified}" >
		<div class="appended_wrap img_wrap"><img src="${URL.createObjectURL(image)}"></div>
		<button class="img_del_btn" title="${index}번 이미지 삭제" data-seq="${image.lastModified}" data-index="${index}" type="button" onclick="appendedPhotoDelete(event)"></button>
	</li>`)
	})
}

const appendedPhotoDelete = (event) => {

	//file.lastModified 로 formData 삭제
	const target = event.currentTarget;
	const removeTargetSeq = target.dataset.seq;
	const images = document.getElementById("appendedImgs").files;
	const data = new DataTransfer();

	 [...images]
	 .filter(file => file.lastModified != removeTargetSeq)
	 .forEach((file)=>{
		data.items.add(file);

	 });
	document.getElementById("appendedImgs").files = data.files;

	// //file.lastModified -> id 변환해 li 삭제
	document.getElementById(`appended_img_${removeTargetSeq}`).remove();
}

/* 쓰기 기능 끝 */