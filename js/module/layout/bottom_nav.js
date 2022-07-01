      let page_path = window.location.pathname;
      const exclude_path = ["join.html", "detail"];

      //bottom nav 아이콘 변경 함수
      const bottomIconControl = () => {
        console.log('page_path: ', page_path);
        if(page_path.includes("community") || page_path.includes("buy_records")){
          document.querySelector(".bottom_feed").classList.add("bottomactive");
        } else if (page_path.includes("product/category")){
          document.querySelector(".bottom_category").classList.add("bottomactive")
        } else if (page_path === '/' || page_path.includes("product/list") || page_path.includes("product/detail")){
          document.querySelector(".bottom_store").classList.add("bottomactive")
        } else if (page_path.includes("myshop/wish_list")){
          document.querySelector(".bottom_like").classList.add("bottomactive")
        } else if (page_path.includes("join") || page_path.includes("myshop/index") || page_path.includes("login")){
          document.querySelector(".bottom_user").classList.add("bottomactive")
        } else {
          document.querySelector(".bottom_store").classList.add("bottomactive")
        }
      }
      
      //bottom nav 숨김 함수 
      const bottomHideControl = (_pathArr, _path) => {
        _pathArr.map((path)=>{
          _path.includes(path)? document.querySelector("#bvtBottom").classList.add("displaynone") : null
        });
      }
      
  
  //함수 실행
  if (document.readyState == 'loading') {
    // 아직 로딩 중이므로 이벤트를 기다립니다.
    document.addEventListener('DOMContentLoaded', bottomIconControl());
    document.addEventListener('DOMContentLoaded', bottomHideControl(exclude_path, page_path))
  } else {
    // DOM이 완성되었습니다!
    bottomIconControl();
    bottomHideControl(exclude_path, page_path);
  }
  