
/* 리뷰 공통 이벤트 모듈 */

/**
 * 좋아요 클릭 이벤트
 * @param {event} event 
 * @returns 
 */
const reviewsLikesButtons = (event) => {

    let loginCheckReturnValue = loginCheck("member_1", window.location.pathname);

    if(loginCheckReturnValue[0]){
        let current = {
            btn : event.currentTarget, 
            num : document.querySelector(`.reviews_likes_num_${ event.currentTarget.dataset.seq}`), 
            seq : event.currentTarget.dataset.seq,
            id : loginCheckReturnValue[1],
        };

        if (getArraylocal("likes").findIndex(likesSeq => likesSeq == current.seq) > -1) {
            alert("이미 응원하신 리뷰입니다.");
            return false;
            //좋아요 삭제
        }

        fetch(`https://${api_domain}.shop/buy_records/like?seq=${current.seq}&my_id=${current.id}`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response)=>{
             //response가 success면
             if(response.success){
                current.num.innerHTML = parseInt(current.num.textContent)+1;
                setArraylocal("likes", current.seq);
                current.btn.classList.add("active");
             }
        })
        .then(()=>{
            console.log(getArraylocal("likes"));
        })

    }else{
        console.log("loginCheckReturnValue", loginCheckReturnValue)
    }
}


/**
 * 공유 버튼 클릭 - url text 복사
 * @param {이벤트} e 
 */
 const sharingLinkText = (e) => {
    const targetShareBtn = e.currentTarget;
    const _url = `${location.origin}/reviews/views.html?seq=${targetShareBtn.dataset.seq}`;

    const ifsuccess = () => {
        //완료 모달 띄우기
        let okmsg = `<p class="reviews_share_modal">복사 완료! 다른 곳에 공유해볼까요? :)</p>`
        document.querySelector("#bvtContents").insertAdjacentHTML("beforeend",okmsg);
        //사라지는 애니메이션 all 0.5s ease-in-out;
        // setTimeout(()=>{
        //     document.querySelector(".reviews_share_modal").classList.add("disappear");
        //     //완전 node 삭제
        //     setTimeout(()=>{document.querySelector(".reviews_share_modal").remove();}, 1201)
        // }, 800)
    }
    const iferror = () => {
        //에러 모달 띄우기
        let nomsg = `<p class="reviews_share_modal">복사 실패! 상단 URL을 복사해주세요.</p>`
        targetShareBtn.insertAdjacentHTML("afterbegin",nomsg);
        //사라지는 애니메이션 all 0.5s ease-in-out;
        setTimeout(()=>{
            document.querySelector(".reviews_share_modal").classList.add("disappear");
            //완전 node 삭제
            setTimeout(()=>{document.querySelector(".reviews_share_modal").remove();}, 800)
        }, 500)
    }
    clipboardCopy(`.share_text_btn`, _url, ifsuccess, iferror)
}

/* 글 관리 모달 생성 */

const createAdminModal = (event) => {
	console.log('event: ', event);
	let current = {
		modal: document.querySelector(`#admin_modal_${event.currentTarget.dataset.seq}`),
		node: event.currentTarget,
		seq: event.currentTarget.dataset.seq
	}
	classToggle(current.modal, 'displaynone');

	//외부 영역 클릭하면 모달 닫기
	document.addEventListener("click", (event)=>{
		let path = event.composedPath();
		!path.includes(current.modal) && !path.includes(current.node) ? current.modal.classList.add("displaynone") : null;
	})
}

/**
 * 세션 있는지 여부 체크
 * @param {세션에서 찾을 item key} checkitem 
 * @returns boolean 값
 */
 function sessionCheck(checkitem) {
	if(sessionStorage.getItem(checkitem) == null){
	  return false
	}else{
	  return true;
	}
  }



/**
 * 세션 체크하여 로그인 했는지 확인
 * @param {세션에서 찾을 item key} checkitem 
 * @param {로그인 후 되돌아갈 URL(location.pathname)} returnUrl 
 */
function loginCheck(checkitem, returnUrl) {
	//로그인 여부 감지
	  //세션에 member_1 이 null이 아니면 로그인 상태
	  if(sessionStorage.getItem(checkitem) != null){
	  let returnValue = [true, JSON.parse(sessionStorage.getItem(checkitem)).data.member_id];
	  return returnValue;
	  //null이면 로그인 안된 상태
	  }else if(sessionStorage.getItem(checkitem) == null){
		  alert("먼저 로그인 해주세요.");
		  location.href= `/member/login.html?returnUrl=${returnUrl}`;
	  return false;
	  }else{
		  alert("에러입니다. 확인해주세요.");
		  location.href= "/error.html";
	  return false;
	  }
  }
  