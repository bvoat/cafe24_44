

/* 슬라이더 */
  var swiper = new Swiper(".crew_method_img_wrap", {
    slidesPerView: 2.1,
    spaceBetween: 10,
  });



const crew_link_copy = document.querySelector(".crew_link_copy");
const crew_link_share = document.querySelector(".crew_link_share");
const voter_id = document.querySelector("#recoIdCheck");

/**
 * 추천인 링크 복사하기
 * @param {event} e 
 * @returns 
 */
const copyBtnClick = (e) => {
  console.log('e: ', e);
  e.preventDefault();
  if (voter_id == null) {
    alert("공유를 위해서는 로그인이 필요해요");
    window.location = "/member/login.html?returnUrl=member/crew/crew.html";
    return false;
  } else if (voter_id != null) {
    let copy_text = `🤗 물건도 브랜드도 착해야 산다!
가치소비가 쉬워지는 곳, 비보트로 초대합니다.

친구가 공유한 전용 링크로 가입하면
마일리지 무제한 2배 적립에 할인, 무료배송 쿠폰과
전용 뱃지 노출까지 되는 크루 등급으로 시작할 수 있어요.

크루 혜택 확인하기
> https://bvoat.com/member/crew/crew.html

친구 초대 전용 가입 링크
>${voter_id.value}
(추천인 코드 : ${voter_id.dataset.id})`;

  const ifsuccess = () => {
    alert("복사 성공! 초대 링크를 친구에게 공유해보세요");
  };
  const iferror = () => {
    alert("복사 실패😢 다시 한 번 시도해주세요");
  };
  clipboardCopy('.crew_link_copy', copy_text, ifsuccess, iferror);
  }
};

/**
 * 공유하기 클릭
 * @param {event} e 
 * @returns 
 */

const shareBtnClick = (e) => {
  e.preventDefault();
  if (voter_id == null) {
    alert("공유를 위해서는 로그인이 필요해요");
    window.location = "/member/login.html?returnUrl=member/crew/crew.html";
    return false;
  } else if (voter_id != null) {
    let copy_text = `🤗 물건도 브랜드도 착해야 산다!
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
    if (navigator.userAgent.toLocaleLowerCase().indexOf("android") > -1) {
      console.log("안드로이드");
      window.AndroidShareHandler.share(copy_text);
      return false;
    } else if (navigator.userAgent.toLocaleLowerCase().indexOf("mac") > -1) {
      alert("지원하지 않는 브라우저입니다 😢 상단의 링크 복사를 이용해주세요!");
      return false;
    } else {
      if (navigator.share) {
        navigator
          .share({
            title: "비보트로 초대합니다.",
            text: copy_text,
          })
          .then((response) => {
            console.log("공유 성공!", response);
            return false;
          })
          .catch((error) => console.log("Error sharing", error));
      }
    }
    return false;
  }
};
crew_link_copy.addEventListener("click", (e) => {
  copyBtnClick(e);
});
crew_link_share.addEventListener("click", (e) => {
  shareBtnClick(e);
});


const crew_Form = document.querySelector("#crewUrlForm");
