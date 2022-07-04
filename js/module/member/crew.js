/* 슬라이더 */
var swiper = new Swiper(".crew_benefit_img_wrap", {
  slidesPerView: "auto",
  spaceBetween: 8,
  freeMode: true,
  loop: true,
  speed: 1600,
  autoplay: {
    enabled: true,
    delay: 1,
    disableOnInteraction: false,
    autoplayDisableOnInteraction: false,
  },
});
var swiper = new Swiper(".crew_method_img_wrap", {
  slidesPerView: "auto",
  spaceBetween: 10,
});
/* aos 초기화 */
AOS.init();

/* 부드럽게 이동 */

const moveLevelUp = document.querySelector("#moveLevelUp");
const moveTop = document.querySelector("#moveTop");
const crewLevelUp = document.querySelector("#crewLevelUp");

const smoothScroll = (element, target) => {
  if (target == "top") {
    target = element.offsetTop;
  } else {
    target = element.offsetHeight;
  }
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: target,
  });
};

moveTop.addEventListener("click", () => {
  smoothScroll(document.querySelector("body"), "top");
});
moveLevelUp.addEventListener("click", () => {
  smoothScroll(crewLevelUp, "top");
});

/* 추천인 링크 */

const crew_link_copy = document.querySelector(".crew_link_copy");
const crew_link_share = document.querySelector(".crew_link_share");
const voter_id = document.querySelector("#recoIdCheck");
console.log('voter_id: ', voter_id);


const copyBtnClick = () => {
  if (voter_id == null) {
    alert("링크 복사를 위해서는 로그인이 필요해요 🤗");
    window.location = "/member/login.html?returnUrl=member/crew/crew.html";
    return false;
  } else if (voter_id != null) {
    let copy_text = `
        🤗 물건도 브랜드도 착해야 산다!
        가치소비가 쉬워지는 곳, 비보트로 초대합니다.
    
        친구가 공유한 전용 링크로 가입하면
        마일리지 무제한 2배 적립에 할인, 무료배송 쿠폰과
        전용 뱃지 노출까지 되는 크루 등급으로 시작할 수 있어요.
    
        크루 혜택 확인하기
        > https://bvoat.com/member/crew/crew.html
    
        친구 초대 전용 가입 링크
        >${voter_id.value}
        (추천인 코드 : ${voter_id.dataset.id})
        `;
    console.log("copy_text", copy_text, "voter_id", voter_id);
    window.navigator.clipboard.writeText(copy_text).then(() => {
      alert("복사 성공! 초대 링크를 친구에게 공유해보세요");
    });
    return false;
  }
};
const shareBtnClick = () => {
  if (voter_id == null) {
    alert("공유를 위해서는 로그인이 필요해요 🤗");
    window.location = "/member/login.html?returnUrl=member/crew/crew.html";
    return false;
  } else if (voter_id != null) {
    let copy_text = `
        🤗 물건도 브랜드도 착해야 산다!
        가치소비가 쉬워지는 곳, 비보트로 초대합니다.
    
        친구가 공유한 전용 링크로 가입하면
        마일리지 무제한 2배 적립에 할인, 무료배송 쿠폰과
        전용 뱃지 노출까지 되는 크루 등급으로 시작할 수 있어요.
    
        크루 혜택 확인하기
        > https://bvoat.com/member/crew/crew.html
    
        친구 초대 전용 가입 링크
        >${voter_id.value}
        (추천인 코드 : ${voter_id.dataset.id})
        `;
    console.log("copy_text", copy_text);
    if (navigator.share) {
      navigator
        .share({
          title: "비보트 크루 멤버십 초대",
          text: copy_text,
        })
        .then(() => {
        console.log("공유 성공!");
        return false;
        })
        .catch((error)=>{
            console.log(error);
            return false;
        });
      return false;
    }
  }
};
crew_link_copy.addEventListener("click", () => {
  copyBtnClick();
});
crew_link_share.addEventListener("click", () => {
  shareBtnClick();
});

/* url 제출 함수 */
//btn addEvent
const crew_Form = document.querySelector("#crewUrlForm");
//fetch 통신 함수
const postURLAsJson = (formData) => {
  fetch(`https://${api_domain}.shop/sns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  }).then((response) => {
    if (response.status === 500) {
      alert("😢 서버 오류입니다. 비보트에게 알려주세요!");
      ChannelIO("show");
      return false;
    } else if (response.status === 409) {
      alert("이미 등록하신 URL 입니다 👍");
      return false;
    } else if (response.status === 201) {
      const okSns = (e) => {
        console.log("ok", e.currentTarget.dataset.msg);
        if (e.currentTarget.dataset.msg) {
          const receivingOk = (id, state) => {
            $.ajax({
                type: 'POST',
                url: `https://${api_domain}.shop/customerinfo/receiving`,
                data:{
                    id: id,
                    state: state
                },
                success: function(response){
                    if(response.status == 200){
                        document.querySelector("#bvtCommonModal").remove();
                        return false;
                      } else {
                        let sns_confirm = confirm(
                          "😢 마케팅 수신 동의에 오류가 발생했어요! 비보트에게 알려주세요!"
                        );
                        if (sns_confirm) {
                          document.querySelector("#bvtCommonModal").remove();
                          ChannelIO("show");
                          return false;
                        } else {
                          document.querySelector("#bvtCommonModal").remove();
                          return false;
                        }
                    }
                },
                error: function(error){
                    let sns_confirm = confirm(
                        "😢 마케팅 수신 동의에 오류가 발생했어요! 비보트에게 알려주세요!"
                      );
                      if (sns_confirm) {
                        document.querySelector("#bvtCommonModal").remove();
                        ChannelIO("show");
                        return false;
                      } else {
                        document.querySelector("#bvtCommonModal").remove();
                        return false;
                      }
                }
            })

          };
          let receiving_result = receivingOk(voter_id.dataset.id, "T");
          console.log("receiving_result: ", receiving_result);
        } else {
          document.querySelector("#bvtCommonModal").remove();
        }
      };
      const noSns = () => {
        document.querySelector("#bvtCommonModal").remove();
      };
      createdModal(
        `신청이 완료되었습니다!<br>크루가 되면 알려드릴까요?`,
        `크루 등업은 게시글 확인 후 최대 24시간 이내 승인되며,<br>'네' 선택 시 마케팅 수신이 동의됩니다.`,
        `네`,
        `아뇨, 괜찮아요`,
        okSns,
        noSns
      );
    }
    return false;
  });
};
//submit 함수
const snsURLSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;  
  //로그인 체크
  if (voter_id == null) {
    // 모듈 통한 로그인 확인
    console.log("Login Status", voter_id.dataset.id);
    alert("가입 신청을 위해서는 로그인이 필요해요 🤗");
    window.location = "/member/login.html?returnUrl=member/crew/crew.html";
    return false;
  } else if(voter_id != null) {
    const tag_url = document.querySelector("#tag_url");
    const member_id = document.querySelector("#member_id");
    // 모듈 통한 로그인 확인
    console.log("Login Status", member_id);
    //url 정규식 검사
    if (tag_url.value == "") {
      alert("URL을 입력해주세요.");
      tag_url.focus();
      return false;
    } else {
      console.log("form: ", form);
      const form_data = new FormData(form);
      const plainFormData = JSON.stringify(
        Object.fromEntries(form_data.entries())
      );
      const responseData = await postURLAsJson(plainFormData);
      console.log({ responseData });
    }
  }
};
//submit 될 때 함수 실행
crew_Form.addEventListener("submit", (e) => {
  snsURLSubmit(e);
});
