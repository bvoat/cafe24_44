// 관심 상품 전체 선택

const select_all = document.querySelector("#product_select_all");
const checkbox_wish = document.querySelectorAll("input[id^='wish_idx_']")
const selectAllBtn = () => {
    checkbox_wish.forEach((node)=>{
        node.toggleAttribute('checked')
    })
}
select_all.addEventListener("click", selectAllBtn)
