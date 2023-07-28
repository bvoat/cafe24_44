      let page_path = window.location.pathname;
      const exclude_path = ["join.html", "product/detail.html"];

      //bottom nav 아이콘 변경 함수
      const bottomIconControl = () => {
        if(page_path.includes("community") || page_path.includes("reviews")|| page_path.includes("crewinfo.html")){
          document.querySelector(".bottom_feed").classList.add("bottomactive");
        } else if (page_path.includes("product/category")){
          document.querySelector(".bottom_category").classList.add("bottomactive")
        } else if (page_path === '/' || page_path.includes("product/list") || page_path.includes("product/detail")){
          document.querySelector(".bottom_store").classList.add("bottomactive")
        } else if (page_path.includes("/order/basket")){
          document.querySelector(".bottom_cart").classList.add("bottomactive")
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
    bottomIconControl();
    bottomHideControl(exclude_path, page_path);
  
  