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

//bvtBottom 감춤
window.addEventListener("load", ()=>{
    document.querySelector("#bvtBottom").setAttribute("class", "displaynone");
})

//글 작성 id
let admin_id;
//글 seq
const seq = getUrlParams('seq');

//세션에서 id 받아오기
const login_userinfo = JSON.parse(sessionStorage.getItem("member_1"))
console.log('login_userinfo: ', login_userinfo);
const login_userId = login_userinfo != null ? login_userinfo.data.member_id : null;
const login_userNickname = login_userinfo != null ? login_userinfo.data.nick_name : null;

//최초 url
const url = new URL(window.location.href).searchParams;


//s3
const s3url = 'https://s3.ap-northeast-2.amazonaws.com/community.bvoat.com';
 /**
     * DOM 생성 함수 - 리뷰
    */
    const makeDOMforView = (data) => {
        data.forEach((obj) => {
            admin_id = obj.member_id;
            let data = {
                cmt_num : obj.cmt,
                likes_num : obj.likes,
                seq : obj.seq,
                nickname : obj.nickname ? obj.nickname : '익명',
                level : obj.level == null ? '' : obj.level == "1" ? 'normal' : 'crew',
                list_image : obj.list_image,
                img_list : obj.imgs,
                multi_image :obj.imgs.length > 1 ? 'multi' : '',
                rate : obj.rate ? obj.rate : '5.0',
                content : obj.content ? obj.content : '비어 있는 리뷰입니다.',
                write_date_tmp : obj.write_date_tmp ? obj.write_date_tmp : '',
                product_name : obj.product_name ? obj.product_name : '',
                product_no : obj.product_no ? obj.product_no : '',
                product_price : obj.product_price ? obj.product_price : '',
                admin : obj.member_id != login_userId ? 'displaynone' : ''
            };

            //DOM 추가
            document.querySelector(".reviews_view")
                .insertAdjacentHTML("beforeend",
                    `
                    <div class="reviews_item">
                        <ul class="userinfo_wrap">
                            <li class="userimg"><img src="https://bvoat.shop/images/new_img/ico__11.png"></li>
                            <li class="usernickname">${data.nickname}</li>
                            <li class="userlevel ${data.level}"></li>
                            <li class="userfollow"><button onclick="#">+ 팔로우</button></li>
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
                                <a href="/product/detail.html?product_no=${data.product_no}" title="상품 정보" target="_blank">
                                    <ul>
                                        <li class="prd_thumb thumb">
                                            <span class="img_wrap"><img src="${data.list_image}" alt="이미지" title="상품 이미지"></span>
                                        </li>
                                        <li class="prd_info">
                                            <p title="상품 이름">${data.product_name}</p>
                                            <p title="상품 가격">${data.product_price}</p>
                                        </li>    
                                    </ul>
                                </a>    
                            </div>
                        </div>
                        <ul class="reviews_reaction_box">
                            <li class="reviews_reaction">
                                <button class="reviews_likes " data-seq="${data.seq}" onclick="reviewsLikesButtons(event)"> 도움이 돼요 <span class="reviews_likes_num_${data.seq}">${data.likes_num}</span></button>
                            </li>
                            <li class="reviews_control">
                                <div class="reviews_share">
                                    <button class="share_text_btn share_text_btn_${data.seq}"  data-seq="${data.seq}"title="공유하기" onclick="sharingLinkText(event)"></button>
                                </div>
                                <div class="reviews_admin">
                                    <p id="admin_modal_${data.seq}" class="admin_modal displaynone" data-seq="${data.seq}">
                                        <button class="modify" data-seq="${data.seq}" title="수정하기" onclick="reviewDataModify(${data.seq})">수정하기</button>
                                        <button class="delete" data-seq="${data.seq}" title="삭제하기" onclick="reviewsDataDelete(${data.seq})">삭제하기</button>
                                    </p>
                                    <button class="admin_btn" title="수정/삭제" data-seq="${data.seq}" onclick="createAdminModal(event)"></button>
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
        console.log('comment data: ', data);
        let cmt_num = data.length;

        //DOM 추가 (댓글 정보)
        document.querySelector(".reviews_comment_info")
        .insertAdjacentHTML("beforeend", `
            <p class="reviews_comment_num">댓글 ${cmt_num}개</p>
        `);
        console.log('cmt_num: ', cmt_num);
        data.forEach((data)=>{
            let origin_seq = data.bh_seq;
            let cmt_seq = data.seq;
            let cmt_user = data.member_id;
            let cmt_userlevel = data.level;
            let cmt_nickname = data.nickname;
            let cmt_content = data.content;

            //DOM 추가 (댓글)
            document.querySelector(".reviews_comment_list")
                .insertAdjacentHTML("beforeend", `
                <li id="cmt_${cmt_seq}" class="cmt_item" data-origin="${origin_seq}">
                    <form>
                        <fieldset>
                            <legend><span class="reviews_comment_user"><img class="cmt_userimg" src="https://bvoat.shop/images/new_img/ico__11.png">${cmt_nickname}<span class="${cmt_userlevel}"></span></span>
                            <span class="reviews_comment_admin">
                                <div class="cmt_admin_modal displaynone" data-cmtseq=${cmt_seq}>
                                    <button class="edit" data-cmtseq=${cmt_seq}>수정하기</button>
                                    <button class="delete" data-cmtseq=${cmt_seq}>삭제하기</button>
                                </div>
                                <button class="cmt_admin_btn" data-cmtseq=${cmt_seq} type="button" title="댓글 수정/삭제"></button>
                            </span>
                            </legend>
                            <div class="cmt_content_box"><textarea class="cmt_content" data-cmtseq=${cmt_seq} placeholder="리뷰에 대한 댓글을 남겨주세요." readonly>${cmt_content}</textarea>
                            </div>
                            <button class="cmt_modify_submit_btn displaynone" type="button" data-cmtseq=${cmt_seq} data-origin="${origin_seq}" title="수정한 댓글 게시하기">게시</button>
                        </fieldset>
                    </form>
                    <div class="cmt_item_reaction">
                        <span class="cmt_date">1시간 전</span>
                        <button class="cmt_recomment_btn">답글달기</button>
                    </div>
                </li>
                `)
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

        fetch(`https://${api_domain}.shop/buy_records/data?seq=${seq}`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {
            //로딩 스피너 종료
            loading(false);
            reviewsData = response.data;
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
            console.log('commentData: ', commentData);
            makeDOMforComment(commentData);

        })
    }
    window.addEventListener("load", getBeginningReviewData(url));

/* 상세 보기 개별 기능 시작 */

/**
 * 게시글 수정 이동
 * @param {수정 게시물 seq} seq 
 */
const reviewDataModify = (seq) => {
    if(sessionCheck("member_1") && admin_id === login_userId){
        location.href = `http://skin-skin44.bvoatofficial.cafe24.com/reviews/write.html?mode=modify&seq=${seq}&member_id=${login_userId}&div=modify`
    }else if (!sessionCheck("member_1")) {
        //미로그인 상태
        loginCheck("member_1", `${location.pathname}${location.search}`);
        return false;
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
const reviewsDataDelete = async (seq) =>{
    if(sessionCheck("member_1") && admin_id === login_userId){
        let admin_confirm = confirm("정말 삭제하시겠어요?");
        if(!admin_confirm){
            alert("취소했습니다.")
            return false;
        }else{
            alert("삭제하겠습니다.",sessionCheck("member_1"))
            const deleteResult = await runDelete(seq, login_userId);
            console.log('deleteResult: ', deleteResult);
        }
        return false;
    }else if (!sessionCheck("member_1")) {
        //미로그인 상태
        loginCheck("member_1", `${location.pathname}${location.search}`);
        return false;
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
const runDelete = (seq) => {
    console.log('삭제 실행!!!!');
    // try {
    //     fetch(`https://${api_domain}.shop/buy_records/delete_comment?seq=${seq}`, {
    //     method: "GET",
    //     })
    //     .then((response) => response.json())
    //     .then((response)=>{
    //         console.log(response);
    //         return true;
    //     })
    // } catch (error) {
    //     return false;
    // }
}
/* 상세 보기 개별 기능 끝 */

/* 댓글 개별 기능 시작 */

//댓글 영역
const cmtTextArea = document.querySelector("#cmtTextArea");
//버튼 
const cmtTextSubmitBtn = document.querySelector(".cmt_create_btn");

/**
 * 댓글 작성 시 세션에 저장(뒤로가기 했을 때 다시 불러오기 대비)
 * 댓글 작성 시 height 조절하고 최대 rows 5 높이 넘지 않음
 */
const cmtTextChangeObserve = (event) => {
    sessionStorage.setItem("comment", event.currentTarget.value);
    cmtTextArea.style.height = '1rem';
    cmtTextArea.style.height = (event.currentTarget.scrollHeight) + 'px';
}

//게시 버튼 클릭 시 데이터 전송
cmtTextSubmitBtn.addEventListener("click", async ()=>{
    if(cmtTextArea.value == '' || cmtTextArea.value == null){
        alert("댓글을 입력해주세요.")
        cmtTextArea.focus();
        return false;
    }

    await sendComment(cmtTextArea.value, seq);
})
const sendComment = (cmtText, seq) => {
    console.log('cmtText: ', seq,cmtText,login_userId);
    try {
        fetch(`https://${api_domain}.shop/buy_records/save_comment?bh_seq=${seq}&member_id=${login_userId}&content=${cmtText}`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {
            console.log("response",response);
            location.reload();
            return true;
        })
    } catch (error) {
        console.error("error", error)
        alert("댓글 등록에 실패했습니다.");
        return false;
    }
}
/* 댓글 개별 기능 끝 */