/* 휴대전화 입력 4자리 포커스 이동*/

const mobile_left = document.querySelector("#mobile2");
const mobile_right = document.querySelector("#mobile3");

mobile_left.addEventListener("keyup", (e) => {
    e.currentTarget.value.length === 4 ? mobile_right.focus() : null;
})

/* 추천인 수정 제한 조건 30일*/
//세션 확인
let join_day = new Date(JSON.parse(sessionStorage.getItem("member_1")).data.created_date);
let today = new Date();
const current_date = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
let diff_date = parseInt((today - join_day) / current_date)
console.log("가입한지 " + diff_date + " 일")

const recommend = document.querySelector("#reco_id");

//가입한지 30일 지나거나 이미 정보가 있으면 추천인 readonly
const recommendControl = (type) => {
    let sentence = {
        "notnull": "추천인을 이미 입력하셨습니다 😄",
        "overdate": "추천인은 가입일 이후 30일 동안 입력할 수 있습니다 😅"
    }
    recommend.setAttribute("readonly", true)
    recommend.parentNode.insertAdjacentHTML('afterend', `<p class="input_info_txt">${sentence[type]}</p>`)
    recommend.style.background = "repeating-linear-gradient(45deg, #00000015, #00000015 10px, #00000001 0, #00000001 20px)";
    recommend.style.cursor = "not-allowed";
}

document.addEventListener("DOMContentLoaded", () => {
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
    node.innerHTML = "받아볼래요";
}