
/* 리뷰 공통 이벤트 모듈 */
//세션에서 id 받아오기
const login_userinfo = JSON.parse(sessionStorage.getItem("member_1"));
const login_userId = login_userinfo != null ? login_userinfo.data.member_id : null;
const login_userNickname = login_userinfo != null ? login_userinfo.data.nick_name : null;
const login_userName = login_userinfo != null ? login_userinfo.data.name : null;
const login_userLevel = login_userinfo != null ? login_userinfo.data.group_no : null;
const login_userEmail = login_userinfo != null ? login_userinfo.data.email : null;

/**
 * 좋아요 클릭 이벤트
 * @param {event} event 
 * @returns 
 */
const reviewsLikesButtons = (event) => {

    //로그인 검사
    if (!sessionCheck("member_1")) {
        //미로그인 상태
        loginCheck("member_1", `${location.pathname}${location.search}`);
        return false;
    }

    let current = {
        btn : event.currentTarget, 
        node : document.querySelector(`.reviews_likes_num_${ event.currentTarget.dataset.seq}`),
        value : parseInt(document.querySelector(`.reviews_likes_num_${ event.currentTarget.dataset.seq}`).innerHTML),
        seq : event.currentTarget.dataset.seq,
        id: login_userId
    };
    try {
        fetch(`https://${api_domain}.shop/reviews/like?seq=${current.seq}&my_id=${current.id}`, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((response)=>{
            let status = response.status;
            if(response.success && response){
                if(status === 201){
                    // "좋아요가 정상 처리되었습니다."
                    console.log('status: ', status, response.message);
                    current.node.innerHTML = (current.value)+1;
                    current.btn.classList.add("active");

                }else{
                    console.log('status: ', status, response.message);
                    //"좋아요가 정상적으로 취소되었습니다."
                    current.node.innerHTML = (current.value)-1;
                    current.btn.classList.remove("active");
                }
            }else{
                console.log("오류가 발생했습니다.", response);
                alert("오류가 발생했습니다.");
            }
        })
        .error((jqXHR)=>{
            console.log(jqXHR);
            alert("오류가 발생했습니다.");
        })
    } catch (error) {
        
    }
    

}


/**
 * 공유 버튼 클릭 - url text 복사
 * @param {이벤트} e 
 */
 const sharingLinkText = (e) => {
    const targetShareBtn = e.currentTarget;
    const targetStatus = targetShareBtn.dataset.status;
    console.log('targetStatus: ', targetStatus);
    let _url;

    if(targetStatus == 'seq'){
        const seq = targetShareBtn.dataset.seq
        _url = `${location.origin}/reviews/views.html?seq=${seq}`;

    }else{
        _url = `${location.href}`;
    }
    

    const ifsuccess = () => {
        //완료 모달 띄우기
        let okmsg = `<p class="reviews_share_modal">복사 완료! 다른 곳에 공유해볼까요? :)</p>`
        document.querySelector("#bvtContents").insertAdjacentHTML("beforeend",okmsg);
        // 사라지는 애니메이션 all 0.5s ease-in-out;
        setTimeout(()=>{
            document.querySelector(".reviews_share_modal").classList.add("disappear");
            //완전 node 삭제
            setTimeout(()=>{document.querySelector(".reviews_share_modal").remove();}, 1301)
        }, 1000)
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
        }, 800)
    }
    clipboardCopy(`.share_text_btn`, _url, ifsuccess, iferror)
}

/* 글 관리 모달 생성 */

const createAdminModal = (event) => {
	let current = {
		modal: document.querySelector(`#${event.currentTarget.dataset.type}AdminModal_${event.currentTarget.dataset.seq}`),
		node: event.currentTarget,
		seq: event.currentTarget.dataset.seq,
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


/* 팔로우 기능 */
const clickFollowButton = () => {

	let followBtn = document.querySelectorAll(".follow_btn");

	followBtn.forEach((target)=>{
		target.addEventListener("click", (event)=>{
			event.stopPropagation();
            console.log('login_userId: ', login_userId);
			if(login_userId == null || login_userId == undefined){
				alert("로그인 후에 이용해주세요 :)")
				return false;
			}

            if(event.currentTarget.dataset.target.includes("네이버")){
                alert("네이버 페이 구매자 입니다 :)")
            }

			let target = event.currentTarget;
            console.log('target: ', target);
			let target_userId = target.dataset.target;
			if(target_userId == login_userId){
				return false;
			}

			let body_data = {
				login_id: login_userId,
				member_id: target_userId
			}

			fetch(`https://${api_domain}.shop/member/follow`, {
				method: "POST",
				body: JSON.stringify(body_data),
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => response.json())
			.then((response)=>{
				console.log("response", response.message);
                if(response.success){
                    target.classList.contains("follow") ? target.classList.replace("follow", "following") : target.classList.replace("following", "follow");
				target.innerHTML.includes("팔로우") ? target.innerText = "팔로잉" : target.innerText = "팔로우";
                }else{
                    alert("팔로우 오류입니다! 다시 시도해주세요.")
                    console.log("response.message", response)
                }
			})
		})
	})
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
  

  /**
 * 상품 클릭 시 품절 여부 체크하여 모달 생성
 * @param {상품번호} prd_no 
 */
const clickReviewProduct = (prd_no) => {
    try {
        fetch(`https://${api_domain}.shop/products/selling-status?product_no=${prd_no}`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response)=>{
            console.log(response);
            if(response.data['sellingStatus'] === 'T'){
                location.href = `/product/detail.html?product_no=${prd_no}`;
            }else{
                //화면 상단에 모달 생성
                document
                .querySelector("#bvtContainer")
                .insertAdjacentHTML("afterbegin", `
                <section id="bvtCommonModal">
                <div id="bvtReviewForm" method="dialog">
                    <h2 class="review_form_title">상품 품절 안내</h2>
                    <p>해당 상품은 현재 품절 되었어요🥺<br>다른 상품 구경하러 갈까요?
                    </p>
                    <button class="ok_btn">네,  구경할래요</button>
                    <button class="no_btn">아니오, 괜찮습니다.</button>
                </div>
                </section>
                `);
            }
            document.querySelector(".ok_btn").addEventListener("click", ()=>{
                location.href = "/product/category.html";
            })
            document.querySelector(".no_btn").addEventListener("click", ()=>{
                document.querySelector("#bvtCommonModal").remove();
            })
            return true;
        })
    } catch (error) {
        console.log("error", error);
        return false;
    }
}