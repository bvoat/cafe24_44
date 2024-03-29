
//실시간 상품 구매자 불러오기
 const reciveRealtimeOrder = () => {    
    fetch(`https://${api_domain}.shop/banner/recent-purchases`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.success){
            const productList = document.querySelectorAll(".realtime_order_list>ul>li");
            console.log('productList: ', productList);
            [...productList].forEach((product)=>{
                console.log('product: ', product);
                response.data.forEach((data)=>{
                    
                    if(product.dataset.productno == data.product_no){
                        console.log("matching", product.dataset.productno, data.product_no, data.masking_name)
                        product.insertAdjacentHTML("beforeend", `<div class="purchaser">보터<span class="voter_name">${data.masking_name}</span>님</div>`)
                    }
                });

            })
        }else{
            // console.log("response", response)
            product.insertAdjacentHTML("beforeend", `<div class="purchaser">보터<span class="voter_name">익명</span>님</div>`)
        }
    })
    .catch((error) => {
        console.error('실패:', error);
    });     
}
window.addEventListener("DOMContentLoaded", reciveRealtimeOrder)