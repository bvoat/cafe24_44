// const userImgPreview = document.querySelector(".user_img");

/* 휴대전화 입력 4자리 포커스 이동*/
const mobile_left = document.querySelector("#mobile2");
const mobile_right = document.querySelector("#mobile3");

mobile_left.addEventListener("keyup", (e) => {
    e.currentTarget.value.length === 4 ? mobile_right.focus() : null;
})

/* 추천인 수정 제한 조건 30일*/
let recommend;

//가입한지 30일 지나거나 이미 정보가 있으면 추천인 readonly
const recommendControl = (type) => {
    let sentence = {
        "notnull": "추천인을 이미 입력하셨습니다 😄",
        "overdate": "추천인은 가입일 이후 30일 동안 입력할 수 있습니다 😅"
    }
    recommend.setAttribute("readonly", true);
    recommend.setAttribute("placeholder", sentence[type]);
    recommend.setAttribute("value", "");
    recommend.style.cursor = "not-allowed";
}

window.addEventListener("load", () => {
    //세션 확인
    let join_day = new Date(JSON.parse(sessionStorage.getItem("member_1")).data.created_date);
    let today = new Date();
    const current_date = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
    let diff_date = parseInt((today - join_day) / current_date)
    console.log("가입한지 " + diff_date + " 일")

    recommend = document.querySelector("#reco_id");

    if (recommend.value !== '') {
        console.log('추천인 입력', recommend.value);
        recommendControl('notnull');
        return false;
    } else if (diff_date > 30) { 
        console.log('30일 지남', diff_date);
        recommendControl('overdate');
        return false;
     } else { 
        null;
    };
})

/* 비밀번호 입력 확인 */
const pwd = document.querySelector("#passwd");
const pwd_check = document.querySelector("#user_passwd_confirm");
const submit_btn = document.querySelector(".modify_btn");

submit_btn.addEventListener("click", (e) => {
    e.preventDefault();
    if(pwd.value != undefined && pwd.value.length != 0 &&
    pwd_check.value != undefined && pwd.value.length != 0){
        memberEditAction();
    } else {
        alert("회원 정보를 수정하시려면 비밀번호를 입력해주세요.");
        pwd.focus();
        return false;
    }
})


/* SMS 수신여부 label 변경 */
const label_arr = [document.querySelector("label[for='is_sms0']"), document.querySelector("label[for='is_news_mail0']")]
for (const node of label_arr) {
    node.innerHTML = "받아볼래요!";
}

/**
 * 로그인 유저 프로필 이미지 파일 셋팅
 */
// const settingUserImage = () => {
//     const user = document.getElementById("member_id").value;
//     fetch(`https://${api_domain}.shop/member/profile?member_id=${user}`, {
// 		method: "GET",
// 	})
// 	.then((response) => response.json())
//     .then((response) => {
//         console.log('response: ', response);
//         if(response.success){
//             const profile_image = response.data.profile_image;
//             userImgPreview.setAttribute("src", `${profile_image}`);
//         }else{
//             return false;
//         }
//     })
// }

/**
 * 이미지 파일 저장
 */

// function previewUserImage(input) {
//     if(input.files[0].size > (5 * 1024 * 1024)){
//         alert("5MB 이상의 이미지는 첨부할 수 없어요 🥲");
//         return false;
//     }

//     //선택된 파일 가져오기
//     const image = input.files[0];
//     const user = document.getElementById("member_id").value;

//   	//새로운 이미지로 src 변환
//     userImgPreview.setAttribute("src",URL.createObjectURL(image));

//     //formData 생성
//     let formData = new FormData();

//     formData.append("user_image", image);
//     formData.append("member_id", user);

//     fetch(`https://${api_domain}.shop/member/profile`, {
//         method: "POST",
//         body: formData,
//     })
// 	.then((response) => response.json())
//     .then((response)=>{
//         console.log('response: ', response);
//         if(response.error){
//             alert("이미지 업로드에 오류가 있어요 🥲 다시 한 번 시도해 주세요.")
//         }
//     })
// };

/* 최종 함수 실행 */
//이미지 수신
// window.addEventListener("load", settingUserImage);