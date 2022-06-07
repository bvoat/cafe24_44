
    const wrap = document.querySelectorAll(".price_wrap");
    const price_wrap = [...wrap];

    //price 중에 sale_price 있으면 정가에 스타일 처리
    //sale_price에 '원' 빠진 경우 span 만들어서 원 글자 삽입
    price_wrap.forEach((node)=>{

        if(node.children[1].innerHTML != ""){
            const make_span = document.createElement("span");
            const make_won = document.createTextNode("원");
            make_span.appendChild(make_won);

            node.children[0].classList.add("out_focus");
            node.children[1].appendChild(make_span);
        }else{null}
    })
    
 