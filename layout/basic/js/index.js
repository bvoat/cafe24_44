
/**
 * 날짜 계산
 */
const calculationDate = () => {
  //카페24에서 받은 마감 date
  const promoEndArray = document.querySelectorAll(".promotion_end");
  //표시할 node
  const promoDateAreaArray = document.querySelectorAll(".promotion_date");
  
  promoEndArray.forEach((endDate, i)=>{
    //Safari, iOS 대응 위한 Date 가공 (yyyy-mm-ddT00:00)
    const rawCafe24Date = endDate.value.split(" ");
    const endDay = rawCafe24Date[0]+"T"+rawCafe24Date[1];
    const today = new Date();
    const target = new Date(endDay);
    const gap = target - today;
    const diffDay = String(Math.floor(gap / (1000*60*60*24))).padStart(2,"");
    const diffHour = String( Math.floor((gap / (1000*60*60)) % 24)).padStart(2,"0");
    const diffMin = String(Math.floor((gap / (1000*60)) % 60)).padStart(2,"0");
    const diffSec = String(Math.floor(gap / 1000 % 60)).padStart(2,"0");
    if(target != 'Invalid Date'){
      if (gap <= 0) {
        promoDateAreaArray[i].innerText = "마감";
      } else {
        // promoDateAreaArray[i].innerText = `${diffDay}일 ${diffHour}:${diffMin}:${diffSec}`;
        promoDateAreaArray[i].innerText = `${diffDay}일 남았어요!`;
      }
    } else {
      promoDateAreaArray[i].innerText = "";
      clearInterval(promotionTimer)
    }
  })
};
let promotionTimer = setInterval(calculationDate, 64000);

/**
 * 회원 수 불러오기
 */
const receiveMemberCount = () => {    
  fetch(`https://${api_domain}.shop/banner/joinbanner`, {
  method: 'GET', // 또는 'PUT'
  headers: {
      'Content-Type': 'application/json',
  },
  })
  .then((response) => response.json())
  .then((response) => {
      if(response.success){             
          const memberCount = document.querySelector(".membercnt");
          numberCounting(memberCount, response.data)
      }
    })
  .catch((error) => {
      console.error('실패:', error);
  });     
}

window.addEventListener("DOMContentLoaded",calculationDate());
window.addEventListener("DOMContentLoaded", receiveMemberCount());