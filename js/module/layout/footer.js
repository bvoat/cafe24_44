const summary = document.querySelector(".summary_marker_off");
const details = document.querySelector(".company_info");

details.addEventListener("toggle", (e)=>{
    details.open ? summary.setAttribute("class", "summary_marker_on") : summary.setAttribute("class", "summary_marker_off");
})