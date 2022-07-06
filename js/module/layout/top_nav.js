
  // swiper
  var swiper = new Swiper('.top_nav_swiper', {
    slidesPerView: 7,
    spaceBetween: 15,
    direction: "horizontal",
  });
  
/* nav 컨트롤 스크립트 */
  const controlTabNav = () => {
    // nav 전체
    const page_path = window.location.href;
    const top_nav = document.querySelector("#top_nav");
    const default_nav = document.querySelector(".default_top_nav");
    const comm_nav = document.querySelector(".community_top_nav");
    const expect_array = ['myshop/index', 'join', 'modify', 'detail', 'basket'];
    const community_array = ['community', 'buy_records'];

    expect_array.forEach((path)=>{
      if(page_path.includes(path)) {
        top_nav.classList.add("displaynone");
      };
    })

    community_array.forEach((path)=>{
      if(page_path.includes(path)) {
        default_nav.classList.add("displaynone");
        comm_nav.classList.remove("displaynone");
      }
    });

    page_path.includes('community') ? document.querySelector('.community').classList.add("top_nav_active") : page_path.includes('buy_records') ? document.querySelector(".buyrecords").classList.add("top_nav_active") : page_path.includes('crew') ? document.querySelector(".crew").classList.add("top_nav_active") : page_path.includes('cate_no=102') ? document.querySelector("#cate102").classList.add("top_nav_active") : page_path.includes('cate_no=105') ? document.querySelector("#cate105").classList.add("top_nav_active") : page_path.includes('cate_no=146') ? document.querySelector("#cate146").classList.add("top_nav_active") : page_path.includes('cate_no=116') ? document.querySelector("#cate116").classList.add("top_nav_active") : page_path.includes('cate_no=207') ? document.querySelector("#cate207").classList.add("top_nav_active") : page_path.includes('funding') ? document.querySelector(".funding").classList.add("top_nav_active") : document.querySelector(".store").classList.add("top_nav_active")
  }

  //함수 실행
  if (document.readyState == 'loading') {
    // 아직 로딩 중이므로 이벤트를 기다립니다.
    document.addEventListener('DOMContentLoaded', controlTabNav());
  } else {
    // DOM이 완성되었습니다!
    controlTabNav();
  }
  