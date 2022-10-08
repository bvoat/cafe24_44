
/**
 * 날짜 계산
 */
const calculationDate = () => {
  const promoEndArray = document.querySelectorAll(".promotion_end");
  const promotionDateArray = document.querySelectorAll(".promotion_date");
  
  promoEndArray.forEach((endDate, i)=>{
    const today = new Date();
    const target = new Date(endDate.value);
    const gap = target - today;
    const diffDay = String(Math.floor(gap / (1000*60*60*24))).padStart(2,"0");
    const diffHour = String( Math.floor((gap / (1000*60*60)) % 24)).padStart(2,"0");
    const diffMin = String(Math.floor((gap / (1000*60)) % 60)).padStart(2,"0");
    const diffSec = String(Math.floor(gap / 1000 % 60)).padStart(2,"0");
    if(target != 'Invalid Date'){
      if (gap <= 0) {
        promotionDateArray[i].innerText = "마감";
      } else {
        promotionDateArray[i].innerText = `${diffDay}일 ${diffHour}:${diffMin}:${diffSec}`;
      }
    } else {
      promotionDateArray[i].innerText = "마감";
      clearInterval(timeChecking)
    }
  })
};
let timeChecking = setInterval(calculationDate, 1000);

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