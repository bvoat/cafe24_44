
    //가치태그 베스트 카테고리 불러오기
    const reciveTagBest = () => {    
        fetch(`https://${api_domain}.shop/banner/category/ranking`, {
        method: 'GET', // 또는 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.success){
                const tag_title = document.querySelectorAll(".tag_title")
                const cate_item = document.querySelectorAll(".cate_item");
                const purchasers_num = document.querySelectorAll(".purchasers_num")
                response.data.map((rank, i)=>{
                    tag_title[i].insertAdjacentHTML("afterbegin", 
                    `${rank.middle_category_name}
                    <a class="move_arrow" href="/product/list.html?cate_no=${rank.middle_category_no}#${rank.middle_category_name}" title="${rank.middle_category_name}"></a>`);

                    cate_item[i].insertAdjacentHTML("afterbegin", `<a href="/product/list.html?cate_no=${rank.small_category_no}#${rank.small_category_name}">${rank.small_category_name}</a>`);

                    purchasers_num[i].setAttribute("data-num-ani-end", `${rank.salesvolume}`);
                    purchasers_num[i].setAttribute("data-num-ani-stride", '1')

                })
            }
        })
        .then(()=>{
            NumAni__start('.purchasers_num');
        })
        .catch((error) => {
            console.error('실패:', error);
        });     
    }
    window.addEventListener("load", reciveTagBest)


    /* 주간 베스트 더보기 클릭 */
    // 더보기 버튼
    const total_moreview = document.querySelector("#weekTotalBestListContents > .paginate_moreview > .moreview_btn")
    const totalBestShow = () => {
        // displaynone 상태의 list_item을 display flex로 변경
        [...document.querySelectorAll(".weekbest > ul > .list_item")].forEach((el) => {
            el.style.display = "flex"
        })
        // 더보기 버튼 삭제
        document.querySelector("#weekTotalBestListContents > .paginate_moreview").classList.add("displaynone");
    }
    total_moreview.addEventListener("click", totalBestShow);
    /* 주간 베스트 더보기 클릭 */

    /* 가치태그 베스트 더보기 상품 갯수 확인 */
    // 가치태그 베스트의 경우 20개 이하로 떨어질 경우 더보기 삭제
    [...document.querySelectorAll(".weektag")].forEach((el) => {
        // 각 weektag 내에 list_item의 갯수가 4개 이하면 더보기 삭제
        if([...el.children[1].children].length < 4){
            el.children[3].remove();
        }
    })

    /* 가치태그 베스트 더보기 클릭 */
    // 더보기 버튼
    //display none인 값 모을 배열
    let none_arr = [];
    
    [...document.querySelectorAll(".weektag > .paginate_moreview > .moreview_btn")].forEach((el) => {
        el.addEventListener("click", (e) => {
            //display none이 있는 상태에서의 이벤트
            console.log("가치태그"+e.currentTarget.dataset.rank+"번");
            // console.log(document.querySelectorAll(`#tagRank${e.currentTarget.dataset.rank}`));
            //클릭한 버튼의 상품 리스트 clickTagListItem 만들기
            const clickTagListItem = document.querySelectorAll(`#tagRank${e.currentTarget.dataset.rank} > ul > li`);
            //더보기 끝났는지 체크 (item 중 display none인게 있는지 검사)
            if ([...clickTagListItem].filter((item) => { return window.getComputedStyle(item).display === 'none' }).length != 0) {
                //clickTagListItem 중 display가 none인 것 찾아서 4개 바꾸기
                clickTagListItem.forEach((item) => {
                    if (window.getComputedStyle(item).display === 'none') {
                        none_arr.push(item)
                    }
                })
                if(none_arr.length > 4){
                    //index 0-3까지 4개의 상품 list flex로 변경
                    for (let i = 0; i < 4; i++) {
                        none_arr[i].style.display = "flex";
                    }
                    //display none 값 가진 배열 초기화
                    none_arr = [];
                } else if(none_arr.length < 4){
                    //none_arr에 들어간 상품이 4개 이하면 전체 보이고 length 0 만들어서 접기로 변화
                    none_arr.forEach((none_arr)=>{
                        none_arr.style.display = "flex";
                    })
                }
            } else {
                //display none이 남지 않은 접기 상태에서의 이벤트
                // 스크롤 올리기
                window.scrollTo({
                    behavior: 'smooth',
                    left: 0,
                    top: document.getElementById(`tagRank${e.currentTarget.dataset.rank}`).offsetTop - 110
                });
                // 다시 글자 & SVG 변경 (접기 -> 더 보기)
                [...e.currentTarget.childNodes].forEach((node) => { node.remove() })
                e.currentTarget.insertAdjacentHTML("beforeend", `
                더 보기
                        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.932318 1.28394L0.849762 1.35984L0.93459 1.4332L7.93459 7.48629L8 7.54285L8.06541 7.48629L15.0654 1.4332L15.1502 1.35985L15.0677 1.28394L14.6788 0.926387L14.6133 0.866144L14.5459 0.924238L8.00001 6.56353L1.45417 0.924237L1.38674 0.866145L1.32122 0.926385L0.932318 1.28394Z"
                                fill="#4B4B4B" stroke="#4B4B4B" stroke-width="0.2" />
                        </svg>
                `)
                // 4개 남기고 다 display none 상태로 변경
                for (i = 4; i < 20; i++) {
                    clickTagListItem[i].style.display = "none";
                }
            }
            //마지막 4개 내려올 때 버튼 내용 변경 (더 보기 -> 접기)
            if ([...clickTagListItem].filter((item) => { return window.getComputedStyle(item).display === 'none' }).length == 0) {
                //글자 & SVG 변경
                [...e.currentTarget.childNodes].forEach((node) => { node.remove() })
                e.currentTarget.insertAdjacentHTML("beforeend", `
                접기
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0677 7.12719L15.1502 7.05129L15.0654 6.97793L8.06541 0.924843L8 0.868282L7.93459 0.924843L0.934591 6.97793L0.849764 7.05129L0.932316 7.12719L1.32119 7.48475L1.38672 7.54499L1.45415 7.48689L7.99999 1.8476L14.5458 7.4869L14.6133 7.54499L14.6788 7.48475L15.0677 7.12719Z" fill="#4B4B4B" stroke="#4B4B4B" stroke-width="0.2"/>
                </svg>
                `)
            }

        })
    })
