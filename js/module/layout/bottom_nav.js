  
  
      let page_path = window.location.pathname;

      const bottom_menu = document.querySelectorAll(".bottom_menu");
      console.log("path", page_path)
  
      const bottomControl = () => {
      page_path === "/" ? 
      (document.documentElement.style.setProperty("--store", `url("../../images/icon/icon-store.png")`),
      document.documentElement.style.setProperty("--text-color-store", `#022CFF`)
      ) : 
      page_path === "/myshop/community/community_list.html" ? 
      (document.documentElement.style.setProperty("--feed", `url("../../images/icon/icon-feed.png")`),
      document.documentElement.style.setProperty("--text-color-feed", `#022CFF`)
      ) : 
      page_path === "/myshop/wish_list.html" ? 
      (document.documentElement.style.setProperty("--like", `url("../../images/icon/icon-like.png")`),
      document.documentElement.style.setProperty("--text-color-like", `#022CFF`)
      ) : 
      page_path === "/product/cat.html" ? 
      (document.documentElement.style.setProperty("--category", `url("../../images/icon/icon-category.png")`),
      document.documentElement.style.setProperty("--text-color-category", `#022CFF`)) : 
      page_path.includes('member') ? 
      (document.documentElement.style.setProperty("--user", `url("../../images/icon/icon-user.png")`),
      document.documentElement.style.setProperty("--text-color-user", `#022CFF`)) : 
      null;
      }
  
  
  
  //함수 실행
  if (document.readyState == 'loading') {
    // 아직 로딩 중이므로 이벤트를 기다립니다.
    document.addEventListener('DOMContentLoaded', bottomControl);
  } else {
    // DOM이 완성되었습니다!
    bottomControl();
  }
  