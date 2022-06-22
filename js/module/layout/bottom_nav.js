  
  
      let page_path = window.location.pathname;
      const bottom_menu = document.querySelectorAll(".bottom_menu");
      const exclude_path = ["join.html"];

      //bottom nav 아이콘 변경 함수
      const bottomIconControl = () => {
      page_path === "/" || page_path.includes("list") || page_path.includes("detail") ? 
      (document.documentElement.style.setProperty("--store", `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25.878' height='25.878'%3E%3Cpath d='M12.939 0a12.939 12.939 0 1 0 12.939 12.939A12.954 12.954 0 0 0 12.939 0ZM23.2 11.645h-3.576a18.982 18.982 0 0 0-2.319-8.078 10.369 10.369 0 0 1 5.9 8.078Zm-9.575-9.023a16.807 16.807 0 0 1 3.4 9.023H9.1a16.51 16.51 0 0 1 3.171-9.024c.223-.013.445-.034.671-.034s.458.021.686.035Zm-4.971.906a19.6 19.6 0 0 0-2.145 8.117H2.678a10.369 10.369 0 0 1 5.976-8.116ZM2.678 14.233h3.848a20.28 20.28 0 0 0 2.013 8.061 10.364 10.364 0 0 1-5.861-8.061Zm9.551 9.023a15.486 15.486 0 0 1-3.117-9.023h7.91a15.784 15.784 0 0 1-3.368 9.021c-.235.016-.471.036-.713.036s-.474-.021-.712-.035Zm5.19-1a19.86 19.86 0 0 0 2.188-8.023H23.2a10.358 10.358 0 0 1-5.781 8.024Z' fill='%23022cff'/%3E%3C/svg%3E")`),
      document.documentElement.style.setProperty("--text-color-store", `#022CFF`)
      ) : 
      page_path.includes("community") || page_path.includes("buy_records") ? 
      (document.documentElement.style.setProperty("--feed", `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cg data-name='Q3 icons'%3E%3Cg data-name='그룹 2021' fill='%23022cff'%3E%3Cpath data-name='패스 1738' d='M10.4 0H1.3A1.3 1.3 0 0 0 0 1.3v9.1a1.3 1.3 0 0 0 1.3 1.3h9.1a1.3 1.3 0 0 0 1.3-1.3V1.3A1.3 1.3 0 0 0 10.4 0ZM9.1 9.1H2.6V2.6h6.5Z'/%3E%3Cpath data-name='패스 1739' d='M24.7 0h-9.1a1.3 1.3 0 0 0-1.3 1.3v9.1a1.3 1.3 0 0 0 1.3 1.3h9.1a1.3 1.3 0 0 0 1.3-1.3V1.3A1.3 1.3 0 0 0 24.7 0Zm-1.3 9.1h-6.5V2.6h6.5Z'/%3E%3Cpath data-name='패스 1740' d='M10.4 14.3H1.3A1.3 1.3 0 0 0 0 15.6v9.1A1.3 1.3 0 0 0 1.3 26h9.1a1.3 1.3 0 0 0 1.3-1.3v-9.1a1.3 1.3 0 0 0-1.3-1.3Zm-1.3 9.1H2.6v-6.5h6.5Z'/%3E%3Cpath data-name='패스 1741' d='M24.7 14.3h-9.1a1.3 1.3 0 0 0-1.3 1.3v9.1a1.3 1.3 0 0 0 1.3 1.3h9.1a1.3 1.3 0 0 0 1.3-1.3v-9.1a1.3 1.3 0 0 0-1.3-1.3Zm-1.3 9.1h-6.5v-6.5h6.5Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`),
      document.documentElement.style.setProperty("--text-color-feed", `#022CFF`)
      ) : 
      page_path === "/myshop/wish_list.html" ? 
      (document.documentElement.style.setProperty("--like", `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='27.241' height='25.879'%3E%3Cpath d='M27.241 4.086A4.091 4.091 0 0 0 23.154 0H4.086A4.091 4.091 0 0 0 0 4.086v3.856a5.8 5.8 0 0 0 1.362 3.74v11.473a2.726 2.726 0 0 0 2.724 2.724h19.068a2.726 2.726 0 0 0 2.724-2.724V11.681a5.8 5.8 0 0 0 1.362-3.74Zm-2.724 0v3.856a2.886 2.886 0 0 1-2.576 2.951h-.148a2.726 2.726 0 0 1-2.724-2.724V2.724h4.086a1.363 1.363 0 0 1 1.362 1.362ZM10.9 2.724h5.448v5.448a2.724 2.724 0 1 1-5.448 0ZM2.724 4.086a1.363 1.363 0 0 1 1.362-1.362h4.086v5.448A2.726 2.726 0 0 1 5.448 10.9h-.149a2.883 2.883 0 0 1-2.575-2.949ZM10.9 23.155v-4.087h5.448v4.086Zm8.172 0v-4.087a2.726 2.726 0 0 0-2.724-2.724H10.9a2.726 2.726 0 0 0-2.724 2.724v4.086h-4.09v-9.713a5.243 5.243 0 0 0 1.072.171 5.432 5.432 0 0 0 4.376-1.84 5.442 5.442 0 0 0 8.172 0 5.432 5.432 0 0 0 4.376 1.84 5.223 5.223 0 0 0 1.072-.171v9.713Z' fill='%23022cff'/%3E%3C/svg%3E")`),
      document.documentElement.style.setProperty("--text-color-like", `#022CFF`)
      ) : 
      page_path === "/product/cat.html" ? 
      (document.documentElement.style.setProperty("--category", `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28.575' height='26'%3E%3Cpath data-name='패스 1743' d='M7.991 0H8.8c.035.007.067.018.1.025.6.1 1.213.166 1.8.3a6.757 6.757 0 0 1 2.154.934c.555.357 1.075.775 1.624 1.171.205-.205.446-.446.686-.69a1.055 1.055 0 0 1 .131-.12A8.1 8.1 0 0 1 19.271.081a8.578 8.578 0 0 1 2.444.092 8.8 8.8 0 0 1 1.91.594 8.327 8.327 0 0 1 2.321 1.51 8.171 8.171 0 0 1 1.613 2.08 8.285 8.285 0 0 1 .87 2.48c.057.3.092.6.134.906V8.91c-.007.039-.021.078-.025.117a8.3 8.3 0 0 1-.5 2.246 7.812 7.812 0 0 1-1.765 2.812q-5.831 5.863-11.684 11.7a2.12 2.12 0 0 1-.311.216h-.071a1.8 1.8 0 0 1-.311-.216Q8.3 20.176 2.692 14.564a9.637 9.637 0 0 1-1.5-1.882A8.191 8.191 0 0 1 .1 9.526C.05 9.147.033 8.765 0 8.383v-.035c.007-.088.014-.173.025-.262.081-.587.12-1.185.251-1.762a7.7 7.7 0 0 1 1.461-3.039 8.48 8.48 0 0 1 1.889-1.808A8.356 8.356 0 0 1 7.574.044c.138-.012.279-.03.417-.044Zm4.9 20.8V5.204a.3.3 0 0 0-.046-.191c-.195-.205-.4-.4-.6-.594a4.99 4.99 0 0 0-1.97-1.2 5.48 5.48 0 0 0-5.586 1.238 5.441 5.441 0 0 0-1.178 6.5 8.346 8.346 0 0 0 1.772 2.193c.11.106.233.2.34.308.577.584 1.146 1.167 1.723 1.751q1.831 1.857 3.668 3.707c.613.618 1.229 1.23 1.88 1.884Zm8.143-5.391c.47-.46.92-.895 1.365-1.33.113-.11.226-.226.34-.336.584-.573 1.2-1.114 1.74-1.726a5.283 5.283 0 0 0 1.305-2.876 5.543 5.543 0 0 0-3.375-5.812 5.3 5.3 0 0 0-3.318-.311 6.089 6.089 0 0 0-3.2 1.875.6.6 0 0 0-.177.325 637.877 637.877 0 0 0 0 5.869.254.254 0 0 0 .085.17c.187.163.379.315.573.467.555.435 1.111.863 1.663 1.3q1.167.923 2.331 1.847c.225.174.441.354.671.538Zm-5.306-1.065v6.449c1.185-1.21 2.345-2.395 3.495-3.566-1.168-.969-2.323-1.921-3.492-2.883Z' fill='%23022cff'/%3E%3C/svg%3E")`),
      document.documentElement.style.setProperty("--text-color-category", `#022CFF`)) : 
      page_path.includes('member') ? 
      (document.documentElement.style.setProperty("--user", `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24.517' height='25.879'%3E%3Cpath data-name='패스 1723' d='M16.344 6.81a4.086 4.086 0 1 1-4.086-4.086 4.086 4.086 0 0 1 4.086 4.086Z' fill='none'/%3E%3Cpath data-name='패스 1724' d='M12.258 0a6.81 6.81 0 1 0 6.81 6.81A6.818 6.818 0 0 0 12.258 0Zm0 10.9a4.086 4.086 0 1 1 4.086-4.09 4.091 4.091 0 0 1-4.086 4.09Zm12.259 14.979v-1.362a9.547 9.547 0 0 0-9.534-9.534H9.534A9.546 9.546 0 0 0 0 24.517v1.362h2.724v-1.362a6.817 6.817 0 0 1 6.81-6.81h5.448a6.817 6.817 0 0 1 6.81 6.81v1.362Z' fill='%23022cff'/%3E%3C/svg%3E")`),
      document.documentElement.style.setProperty("--text-color-user", `#022CFF`)) : 
      null;
      }
      
      //bottom nav 숨김 함수 
      const bottomHideControl = (_pathArr, _path) => {
        _pathArr.map((path)=>{
          _path.includes(path)? document.querySelector("#bottom").classList.add("displaynone") : null
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
  