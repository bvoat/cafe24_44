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

/**
 * 로그인 유저 프로필 이미지 파일 셋팅
 */
 const settingUserImage = () => {
    fetch(`https://${api_domain}.shop/member/profile?member_id=${login_userId}`, {
		method: "GET",
	})
	.then((response) => response.json())
    .then((response)=>{
        console.log('response: ', response);
        if(response.success){
            const profile_image = response.data.profile_image;
            document.querySelector(".login_user_image").setAttribute("src",profile_image);
        }else{
            return false;
        }
    })
}
window.addEventListener("DOMContentLoaded",settingUserImage())

//bvtBottom 감춤
window.addEventListener("load", ()=>{
    document.querySelector("#bvtBottom").setAttribute("class", "displaynone");
})

//글 작성 id
let admin_id;
//글 seq
const origin_seq = getUrlParams('seq');

//최초 url
const url = new URL(window.location.href).searchParams;


//s3
const s3url = 'https://s3.ap-northeast-2.amazonaws.com/community.bvoat.com';
 /**
     * DOM 생성 함수 - 리뷰
    */
    const makeDOMforView = (data) => {
        data.forEach((obj) => {            
            console.log('obj: ', obj);
            admin_id = obj.member_id;
            let data = {
                cmt_num : obj.cmt,
                likes_num : obj.likes,
                seq : obj.seq,
                member_id : obj.member_id ? obj.member_id : '',
                nickname : obj.nickname ? obj.nickname : '익명',
                level : obj.level == null ? '' : obj.level == "1" ? 'normal' : 'crew',
                profile : obj.member_id == '네이버 페이 구매자' ? '#' : `/reviews/profile.html?member_id=${obj.member_id}`,
                profile_image : obj.profile_image ? obj.profile_image : 'https://bvoat.shop/images/new_img/ico__11.png',
                cmt_like : obj.is_liked == 1 ? 'active' : 'no_active',
                list_image : obj.list_image,
                img_list : obj.imgs,
                multi_image :obj.imgs.length > 1 ? 'multi' : '',
                rate : obj.rate ? obj.rate : '5.0',
                content : obj.content ? obj.content : '비어 있는 리뷰입니다.',
                write_date_tmp : obj.write_date_tmp ? obj.write_date_tmp : '',
                product_name : obj.product_name ? obj.product_name : '',
                product_no : obj.product_no ? obj.product_no : '',
                product_price : obj.product_price ? obj.product_price : '',
                admin : obj.member_id != login_userId ? 'no_admin' : '',
                isFollowing: obj.is_following ? obj.is_following === 1 ? "following" : "follow" : "follow",
                is_me : obj.member_id == login_userId || obj.nickname.includes("네이버") ? 'displaynone' : '',
                btn_text: obj.is_following ? obj.is_following === 1 ? "팔로잉" : "팔로우" : "팔로우",
            };

            console.log("데이터: ", obj.is_liked, "like status", data.cmt_like);
            console.log("img_list", data.img_list)
            //DOM 추가
            document.querySelector(".reviews_view")
                .insertAdjacentHTML("beforeend",
                    `
                    <div class="reviews_item">
                        <ul class="userinfo_wrap">
                            <li class="userimg"><a href="${data.profile}" class="userimg_wrap"><img src="${data.profile_image}" onerror="this.src='https://bvoat.shop/images/new_img/ico__11.png'"></a></li>
                            <li class="usernickname"><a href="${data.profile}">${data.nickname}</a></li>
                            <li class="userlevel ${data.level}"></li>
                            <li class="userfollow">
                                <button class="follow_btn ${data.isFollowing} ${data.is_me}" data-status="${data.isFollowing}" data-target="${data.member_id}">${data.btn_text}</button>
                            </li>
                        </ul>
                        <div class="reviews_wrap">
                            <div class="reviews_thumb_box">
                                <div class="reviews_thumb ${data.multi_image} ">
                                    <ul class="thumb swiper-wrapper">
                                    </ul>
                                    <div class="swiper-pagination"></div>
                                    <em class="reviews_rate">
                                        <span>${data.rate}</span>
                                    </em>
                                </div>
                            </div>
                            <div class="reviews_content">
                                <p class="content">${data.content}</p>
                                <p class="content_date">${data.write_date_tmp}</p>
                            </div>
                            <div class="reviews_product">
                                <button title="상품 정보" target="_blank" onclick="clickReviewProduct(${data.product_no})">
                                    <ul>
                                        <li class="prd_thumb thumb">
                                            <span class="img_wrap"><img src="${data.list_image}" alt="이미지" title="상품 이미지"></span>
                                        </li>
                                        <li class="prd_info">
                                            <p title="상품 이름">${data.product_name}</p>
                                            <p title="상품 가격">${data.product_price}</p>
                                        </li>    
                                    </ul>
                                </button>    
                            </div>
                        </div>
                        <ul class="reviews_reaction_box">
                            <li class="reviews_reaction">
                                <button class="reviews_likes ${data.cmt_like}" data-seq="${data.seq}" onclick="reviewsLikesButtons(event)"> 도움이 돼요 <span class="reviews_likes_num_${data.seq}">${data.likes_num}</span></button>
                            </li>
                            <li class="reviews_control">
                                <div class="reviews_share">
                                    <button class="share_text_btn share_text_btn_${data.seq}"  data-seq="${data.seq}"title="공유하기"  data-status="seq" onclick="sharingLinkText(event)"></button>
                                </div>
                                <div class="reviews_admin ${data.admin}">
                                    <p id="reviewsAdminModal_${data.seq}" class="admin_modal displaynone" data-seq="${data.seq}">
                                        <button class="modify" data-seq="${data.seq}" title="수정하기" type="button" onclick="modifyReviewData(${data.seq})">수정하기</button>
                                        <button class="delete" data-seq="${data.seq}" title="삭제하기"  type="button" onclick="deleteReviewData(${data.seq})">삭제하기</button>
                                    </p>
                                    <button class="admin_btn" title="수정/삭제" data-seq="${data.seq}" data-type="reviews" onclick="createAdminModal(event)"></button>
                                </div>
                            </li>
                        </ul>
                    </div>  
                </li>`);


            //이미지 삽입
            if(data.img_list.length != 0){
                data.img_list.forEach((img)=>{
                if(img.storage_div === 's3'){
                    document.querySelector(".thumb").insertAdjacentHTML("beforeend", `<li class="img_wrap swiper-slide"><img src="${s3url}/${img.img_dir}/${img.img_name}" onerror="this.src='${data.list_image}'" /></li>`);
                }else{
                    document.querySelector(".thumb").insertAdjacentHTML("beforeend", `<li class="img_wrap swiper-slide"><img src="${img.img_dir}" onerror="this.src='${data.list_image}'" /></li>`);
                }
            })
            }else{
                document.querySelector(".thumb").insertAdjacentHTML("beforeend", `<li class="img_wrap swiper-slide"><img src="${data.list_image}" /></li>`);
            }
        });
    };

    /**
     * DOM 생성 함수 - 리뷰 댓글
    */

    const makeDOMforComment = (data) => {
        let cmt_num = data.length;

        //DOM 추가 (댓글 정보)
        document.querySelector(".comment_info")
        .insertAdjacentHTML("beforeend", `
            <p class="reviews_comment_num">댓글 ${cmt_num}개</p>
        `);
        data.forEach((data)=>{
            let cmt = {
                bh_seq : data.bh_seq,
                seq : data.seq,
                member_id : data.member_id,
                level : data.level,
                nickname : data.nickname ? data.nickname : '익명',
                member_id : data.member_id ? data.member_id : '',
                profile_image : data.profile_image ? data.profile_image : 'https://bvoat.shop/images/new_img/ico__11.png',
                content : data.content ? data.content : '댓글 내용이 없습니다.',
                child : data.child_comment ? data.child_comment : null,
                write_date_tmp : data.write_date_tmp ? data.write_date_tmp : '',
                admin : login_userId != null ? login_userId == data.member_id ? '' : 'no_admin' : 'no_admin'
            }

            //DOM 추가 (댓글)
            document.querySelector(".comment_list")
                .insertAdjacentHTML("beforeend", `
                <li id="comment_${cmt.seq}" class="cmt_item parent" data-seq="${cmt.seq}">
                    <div class="user_wrap"><span class="comment_user"><div class="cmt_userimg"><a href="/reviews/profile.html?member_id=${cmt.member_id}" class="cmt_userimg_wrap"><img src="${cmt.profile_image}" onerror="this.src='https://bvoat.shop/images/new_img/ico__11.png'"></div>${cmt.nickname}<span class="${cmt.level}"></span></a></span>
                    <span class="comment_admin">
                        <div id="commentAdminModal_${cmt.seq}" class="admin_modal displaynone" data-seq="${cmt.seq}">
                            <button class="edit" title="수정하기" type="button" data-seq="${cmt.seq}"
                            data-type="comment" data-cmttype="modify" onclick="editComment(event)">수정하기</button>
                            <button class="delete" title="삭제하기" type="button" data-seq="${cmt.seq}" onclick="deleteCommentData(${cmt.seq}, '${cmt.member_id}')">삭제하기</button>
                        </div>
                        <button class="admin_btn cmt_admin_btn ${cmt.admin}" data-seq="${cmt.seq}" data-type="comment"  type="button" title="댓글 수정/삭제" onclick="createAdminModal(event)"></button>
                    </span>
                    </div>
                    <div class="content_box"><p id="commentContent_${cmt.seq}" class="cmt_content" data-parentseq="${cmt.seq}">${cmt.content}</p>
                    </div>
                    <button class="cmt_modify_submit_btn displaynone" type="button" data-parentseq="${cmt.seq}" data-origin="${cmt.bh_seq}" title="수정한 댓글 게시하기">게시</button>
                    <div class="cmt_item_reaction">
                        <span class="cmt_date">${cmt.write_date_tmp}</span>
                        <button class="cmt_recomment_btn" data-parentseq="${cmt.seq}" data-origin="${cmt.bh_seq}" onclick="typeSettingChildComment(event)">답글달기</button>
                    </div>
                </li>
                `)

            //DOM 추가 (대댓글)
            if(cmt.child != null){
                let child_data = [...cmt.child];
                child_data.forEach((data)=>{
                    console.log('child data: ', data);
                    let child = {
                        bh_seq : data.bh_seq,
                        seq : data.seq,
                        member_id : data.member_id,
                        level : data.level,
                        nickname : data.nickname ? data.nickname : '익명',
                        member_id : data.member_id ? data.member_id : '',
                        profile_image : data.profile_image ? data.profile_image : '',
                        content : data.content ? data.content : '댓글 내용이 없습니다.',
                        child : data.child_comment ? data.child_comment : null,
                        write_date_tmp : data.write_date_tmp ? data.write_date_tmp : '',
                        admin : login_userId != null ? login_userId == data.member_id ? '' : 'no_admin' : 'no_admin'
                    }
        
                    document.querySelector(`#comment_${cmt.seq}`)
                    .insertAdjacentHTML("afterend", `<li id="child_${child.seq}" class="child_cmt cmt_item" data-origin="${child.bh_seq}" data-parentseq="${child.parent_comment_seq}">
                    <div class="child_user_wrap"><span class="comment_user"><div class="cmt_userimg"><a href="/reviews/profile.html?member_id=${child.member_id}" class="cmt_userimg_wrap"><img src="${child.profile_image}" onerror="this.src='https://bvoat.shop/images/new_img/ico__11.png'"></div>${child.nickname}<span class="${child.level}"></span></a></span>
                    <span class="comment_admin">
                        <div id="childAdminModal_${child.seq}" class="admin_modal displaynone" data-parentseq="${child.seq}">
                            <button class="edit" type="button" title="수정하기" data-type="child" data-origin="${child.bh_seq}"  data-seq="${child.seq}" data-cmttype="modify" onclick="editComment(event)">수정하기</button>
                            <button class="delete" type="button" title="삭제하기" data-type="child" data-origin="${child.bh_seq}"  data-seq="${child.seq}" onclick="deleteCommentData(${child.seq}, '${child.member_id}')">삭제하기</button>
                        </div>
                        <button class="admin_btn cmt_admin_btn ${child.admin}" data-seq="${child.seq}" data-type="child"  type="button" title="댓글 수정/삭제" onclick="createAdminModal(event)"></button>
                    </span>
                    </div>
                    <div class="content_box"><p id="childContent_${child.seq}" class="cmt_content" data-parentseq="${child.seq}">${child.content}</p>
                    </div>
                    <button class="cmt_modify_submit_btn displaynone" type="button" data-parentseq="${child.seq}" data-origin="${child.seq}" title="수정한 댓글 게시하기">게시</button>
                    <div class="cmt_item_reaction">
                        <span class="cmt_date">${child.write_date_tmp}</span>
                    </div>
                </li>`)
                })
            }
        })


    }
    
    /**
     * 최초 데이터 수신
    */
     function getBeginningReviewData  (url) {
        let reviewsData;
        const seq = url.get('seq');
        //로딩 스피너 시작
        loading(true);

        fetch(`https://${api_domain}.shop/reviews/data?seq=${seq}&login_id=${login_userId}`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {
            //로딩 스피너 종료
            loading(false);
            reviewsData = response.data;
            //삭제된 리뷰 체크 
            if(reviewsData[0].write_date == null){
                alert("삭제된 리뷰입니다.")
                location.href="/reviews/feed.html"
                return false;
            }
            //리뷰 DOM 생성
            makeDOMforView(reviewsData);
        })
        .then((response)=>{ 
            //슬라이더 init
            var thumbnailSwiper = new Swiper(".reviews_thumb", {
                pagination: {
                el: ".swiper-pagination",
                },
            })
        })
        .then((response)=>{
            //댓글 생성
            let commentData = reviewsData[0].comment;
            makeDOMforComment(commentData);
        })
        .then(()=>{
            //내가 쓴 글, 댓글 아닐 경우 admin_btn 삭제
            let no_admin = document.querySelectorAll(".no_admin");
            if(no_admin.length > 0){
                [...no_admin].forEach((btn)=>{
                    btn.remove();
                })
            }
            //팔로우 기능 활성화
            clickFollowButton();
        })
    }
    window.addEventListener("load", getBeginningReviewData(url));

/* 상세 보기 개별 기능 시작 */

/**
 * 게시글 수정 이동
 * @param {수정 게시물 seq} seq 
 */
const modifyReviewData = (seq) => {
    //로그인 검사
    if (!sessionCheck("member_1")) {
        //미로그인 상태
        loginCheck("member_1", `${location.pathname}${location.search}`);
        return false;
    }
    if(sessionCheck("member_1") && admin_id === login_userId){
        location.href = `http://skin-skin44.bvoatofficial.cafe24.com/reviews/write.html?mode=modify&seq=${seq}&member_id=${login_userId}&div=modify`
    }else if(admin_id != login_userId){
        //어드민이 아님
        alert("본인의 리뷰만 수정할 수 있습니다.");
        return false;
    }else{
        alert("정보를 다시 확인해주세요.");
        console.error(error);
        console.log("오류 확인")
    }
}

/**
 * 게시글 삭제
 * @param {삭제 게시물 seq} seq 
 */
const deleteReviewData = async (seq) =>{

    //로그인 검사
    if (!sessionCheck("member_1")) {
        //미로그인 상태
        loginCheck("member_1", `${location.pathname}${location.search}`);
        return false;
    }

    if(sessionCheck("member_1") && admin_id === login_userId){
        let admin_confirm = confirm("정말 삭제하시겠어요?");
        if(!admin_confirm){
            alert("취소했습니다.")
            return false;
        }else{
            await runReviewDelete(seq);
            return false;
        }
    }else if(admin_id != login_userId){
        //어드민이 아님
        alert("본인의 리뷰만 삭제할 수 있습니다.");
        return false;
    }else{
        alert("정보를 다시 확인해주세요.");
        console.error(error);
        console.log("오류 확인")
    }
    
}
const runReviewDelete = (seq) => {
    let body_data = {
        member_id: login_userId,
        seq: seq
    }
    try {
        fetch(`https://${api_domain}.shop/reviews/content`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body_data)
        })
        .then((response) => response.json())
        .then((response)=>{
            response.success ? location.href = '/reviews/feed.html' : console.log("삭제 오류입니다. 관리자에게 문의해주세요.")
            console.log(response);
            return true;
        })
    } catch (error) {
        console.log("삭제 오류입니다. 관리자에게 문의해주세요.");
        return false;
    }
}

/**
 * 안 쓴 리뷰 표시 (나도 리뷰 작성하기))
 */
const loadMyReviewData = () => {
    //로그인 한 사람은 표시하기 (로그인 안하면 표시 안됨)
    if(login_userId) document.querySelector(".write_move").classList.remove("displaynone");
    document.querySelector(".write_move_btn").setAttribute("href", `/reviews/writable.html?div=not_write&member_id=${login_userId}`)

    try {
        fetch(`https://${api_domain}.shop/reviews/data?member_id=${login_userId}&div=not_write`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response)=>{
            let writable_num = response.cnt_not_write ? response.cnt_not_write : '0';
            document.querySelector(".write_move_btn > span").innerHTML = writable_num;
            return true;
        })
    } catch (error) {
        return false;
    }
}
window.addEventListener("load", loadMyReviewData);
/* 상세 보기 개별 기능 끝 */

/* 댓글 개별 기능 시작 */

//댓글 영역
const cmtTextArea = document.querySelector("#cmtTextArea");
//'게시'버튼 
const cmtTextSubmitBtn = document.querySelector(".cmt_create_btn");



/**
 * (댓글, 대댓글 공통) 댓글 작성 시 세션에 저장(뒤로가기 했을 때 다시 불러오기 대비)
 * 댓글 작성 시 height 조절하고 최대 rows 5 높이 넘지 않음
 */
const observeCommentText = (event) => {
    sessionStorage.setItem("comment", event.currentTarget.value);
    cmtTextArea.style.height = '1rem';
    cmtTextArea.style.height = (event.currentTarget.scrollHeight) + 'px';
}

/**
 * (대댓글) 대댓글 쓰기 위해 '답글달기' 클릭 시
 * @param {event} event 
 */
const typeSettingChildComment = (event) => {
    const target = event.currentTarget;
    cmtTextSubmitBtn.setAttribute("data-cmttype", "child");
    cmtTextSubmitBtn.setAttribute("data-origin", target.dataset.origin);
    cmtTextSubmitBtn.setAttribute("data-parentseq", target.dataset.parentseq);
    //수정하기 포커싱
    cmtTextArea.focus();
}

/**
 * (댓글, 대댓글 공통) 댓글, 대댓글 전송 이벤트 개별 설정
 */
const sendEvent = {
    comment : function (cmtText, origin_seq) {
        let body_data = {
            bh_seq: parseInt(origin_seq),
            member_id: login_userId,
            content: cmtText
        }
        try {
            fetch(`https://${api_domain}.shop/reviews/comment`, {
                method: "POST",    
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body_data)
            })
            .then((response) => response.json())
            .then((response) => {
                cmtTextSubmitBtn.setAttribute("disabled", true)
                response.success ? location.reload() : alert("댓글 등록에 실패했습니다. 다시 한 번 시도해주세요.");
                return true;
            })
        } catch (error) {
            console.error("error", error)
            alert("댓글 등록에 실패했습니다. 관리자에게 문의해주세요.");
            return false;
        }
    },
    childComment: function (childText, origin_seq, parent) {
        let body_data = {
            bh_seq: parseInt(origin_seq),
            parent_comment_seq: parent,
            member_id: login_userId,
            content: childText
        }
        try {
            fetch(`https://${api_domain}.shop/reviews/comment`, {
                method: "POST",    
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body_data)
            })
            .then((response) => response.json())
            .then((response) => {
                cmtTextSubmitBtn.setAttribute("disabled", true)
                response.success ? location.reload() : alert("댓글 등록에 실패했습니다. 다시 한 번 시도해주세요.");
                return true;
            })
        } catch (error) {
            console.error("error", error)
            alert("댓글 등록에 실패했습니다. 관리자에게 문의해주세요.");
            return false;
        }
    },
    modifyComment : function (editText, target) {
        let body_data = {
            seq: parseInt(target),
            member_id: login_userId,
            content: editText
        }
        console.log(JSON.stringify(body_data));
        try {
            fetch(`https://${api_domain}.shop/reviews/comment`, {
                method: "PUT",    
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body_data)
            })
            .then((response) => response.json())
            .then((response) => {
                console.log('response: ', response);
                cmtTextSubmitBtn.setAttribute("disabled", true)
                response.success ? location.reload() : alert("댓글 수정에 실패했습니다. 다시 한 번 시도해주세요.");
                return true;
            })
        } catch (error) {
            console.error("error", error)
            alert("댓글 수정에 실패했습니다. 관리자에게 문의해주세요.");
            return false;
        }
    },
}


//(댓글, 대댓글 공통) '게시' 버튼 클릭 시 데이터 전송 
cmtTextSubmitBtn.addEventListener("click", async (event)=>{

    //로그인 검사
    if (!sessionCheck("member_1")) {
        //미로그인 상태
        loginCheck("member_1", `${location.pathname}${location.search}`);
        return false;
    }
    //유효성 검사
    if(cmtTextArea.value == '' || cmtTextArea.value == null){
        alert("댓글을 입력해주세요.")
        cmtTextArea.focus();
        return false;
    }

    //댓글 / 대댓글 타입
    let cmttype = event.currentTarget.dataset.cmttype;
    console.log('cmttype: ', cmttype);
    if(cmttype === "comment"){
        //댓글 작성
        await sendEvent.comment(cmtTextArea.value, origin_seq);
        return false;
    }else if(cmttype === "child"){
        //대댓글 작성
        const parent_seq = event.currentTarget.dataset.parentseq;
        await sendEvent.childComment(cmtTextArea.value, origin_seq, parent_seq);
        return false;
    }else if(cmttype === "modify"){
        //댓글, 대댓글 수정
        const target_seq = event.currentTarget.dataset.seq;
        await sendEvent.modifyComment(cmtTextArea.value, target_seq);
        return false;
    }
   
})

/**
 * (댓글, 대댓글 공통) 수정하기 클릭 시
 * @param {event} event 
 */
const editComment = (event) => {
    //'게시' 버튼에 데이터 셋팅
    const target = {
        type : event.currentTarget.dataset.type,
        seq : event.currentTarget.dataset.seq,
        cmttype : event.currentTarget.dataset.cmttype,
    }
    
    //내용
    cmtTextArea.value = document.querySelector(`#${target.type}Content_${target.seq}`).innerHTML;
    //코멘트 타입
    cmtTextSubmitBtn.setAttribute("data-cmttype", target.cmttype);
    //seq
    cmtTextSubmitBtn.setAttribute("data-seq", target.seq);

    //모달 닫기
    document.querySelector(`#${target.type}AdminModal_${target.seq}`).classList.add("displaynone");
    
    //수정하기 포커싱
    cmtTextArea.focus();
}

/**
 * 댓글 삭제
 * @param {삭제 댓글 seq} seq 
 */
 const deleteCommentData = async (seq, id) =>{
    console.log('seq: ', seq, 'id', id);

    //로그인 검사
    if (!sessionCheck("member_1")) {
        //미로그인 상태
        loginCheck("member_1", `${location.pathname}${location.search}`);
        return false;
    }
    
    if(sessionCheck("member_1") && id === login_userId){
        let admin_confirm = confirm("정말 삭제하시겠어요?");
        if(!admin_confirm){
            alert("취소했습니다.")
            return false;
        }else{
            await runCommentDelete(seq);
            return false;
        }
    }else if(id != login_userId){
        //어드민이 아님
        alert("본인의 리뷰만 삭제할 수 있습니다.");
        return false;
    }else{
        alert("정보를 다시 확인해주세요.");
        console.error(error);
        console.log("오류 확인")
    }
    
}
const runCommentDelete = (seq) => {
    let body_data = {
        seq : seq
    }
    try {
        fetch(`https://${api_domain}.shop/reviews/comment`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(body_data)
        })
        .then((response) => response.json())
        .then((response)=>{
            if(response.success){
                response.success ? location.reload() : cmtTextSubmitBtn.setAttribute("disabled", true);
                return true;
            }
        })
    } catch (error) {
        return false;
    }
}
/* 댓글 개별 기능 끝 */
