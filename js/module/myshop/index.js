
/* 등급 크루인 경우 */
const voter_level = document.querySelector("#level_name");
let voter_identity = document.querySelector("#member_id").value;

/*  stamp 수신 */
//스탬프 이미지 DOM 출력 
const displayStampImg = (stamp) => {
	console.log('stamp: ', stamp);
        //스탬프 표시
        let stampList = document.querySelectorAll(".stamp_node");
        //스탬프 이미지 표시
        let i = 0;
        if(Number.isInteger(stamp)){
            while(i < stamp){
                stampList[i].classList.add("whole_stamp");
                i++;
            }
        }else if(!Number.isInteger(stamp)){
            while(i < stamp){
                stampList[i].classList.add("whole_stamp");
                i++;
            }
            stampList[Math.floor(stamp)].classList.add("half_stamp");
        }
}

let stamp_node = document.querySelector(".my_stamp_pcs");

const reciveVoterStamp = (voter_level, voterID, displayStampImg) => {
    console.log('voter_level: ', voter_level);
    if(voter_identity != null && voter_level != null){
        if(voter_level.value == "일반 보터"){    
            console.log('일반 보터');      
            fetch(`https://${api_domain}.shop/stamp?id=${voterID}`, {
            method: 'GET', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((response) => response.json())
            .then((res) => {
				console.log('res: ', res);
                if(res.success){
                    let stamp_num = res.data.stamp;
                    console.log('stamp_num: ', stamp_num);
                    displayStampImg(stamp_num)
                }
            })
            .catch((error) => {
            console.error('실패:', error);
            });     
        } 
        else if(voter_level.value == "비보트 크루") {
            console.log('비보트 크루 입니다');
            stamp_num = 5;
            console.log('stamp_num: ', stamp_num);
            displayStampImg(stamp_num);
        }
    }   
    return false;
}


/* 리뷰 갯수, 프로필 수신 */
const reviews_num = document.querySelector(".reviews_num");

//리뷰 갯수 수신 중단
//카페24에서 받아 오는 것으로 변경 230614
// const reciveNotWriteBuyRecords = (voter_identity) => {
//     if(voter_identity != null){
//         fetch(`https://${api_domain}.shop/reviews/data?div=not_write_cnt&member_id=${voter_identity}`, {
//         method: 'GET', // 또는 'PUT'
//         })
//         .then((response) => response.json())
//         .then((response) => {
//             console.log("response", response);
//             if(response || response.cnt_not_write){
//                 const cnt_not_write = response.cnt_not_write ? response.cnt_not_write : '0';
//                 reviews_num.insertAdjacentText("beforeend", cnt_not_write);
//             } else {
//                 reviews_num.insertAdjacentText("beforeend", "0");
//             }
//         })
//         .catch((error) => {
//         console.error('실패:', error);
//         });    
//     }
// }
const settingUserImage = () => {
    fetch(`https://${api_domain}.shop/member/profile?member_id=${voter_identity}`, {
    method: 'GET', // 또는 'PUT'
    })
    .then((response) => response.json())
    .then((response) => {
        const profile_image = response.data.profile_image;
        console.log('profile_image: ', profile_image);
        document.querySelector(".myinfo_img img").setAttribute("src", profile_image);
    })
    .catch((error) => {
    console.error('실패:', error);
    });    
}



/* 최종 함수 실행 */

//스탬프 출력
reciveVoterStamp(voter_level, voter_identity,displayStampImg);
//리뷰 숫자 표시
let not_write_cnt = reciveNotWriteBuyRecords(voter_identity)
//이미지 수신
window.addEventListener("load", settingUserImage);