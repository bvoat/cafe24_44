let param = getUrlParams('mode');
let member_id = getUrlParams('member_id');

console.log('mode: ', param);

/**
 * 최초 데이터 수신
*/
let followData;

function getFollowData() {
	fetch(`https://${api_domain}.shop/member/${param}?login_id=${login_userId}&member_id=${member_id}`, {
		method: "GET",
	})
	.then((response) => response.json())
	.then((response)=>{
		followData=response.data;
		console.log('followData: ', followData);
		if(followData.length > 0){
		followData.forEach((data,index) => {
			let user = {
				index: index,
				member_id: data.member_id ? data.member_id : "익명",
				nickname: data.nickname ? data.nickname : "익명",
				profile_image: data.profile_image ? data.profile_image : "https://bvoat.shop/images/new_img/ico__11.png",
				level: data.level ? data.level === "1" ? "normal" : "crew" : "normal",
				isFollowing: data.is_following ? data.is_following === 1 ? "following" : "follow" : "follow",
				btn_text: data.is_following ? data.is_following === 1 ? "팔로잉" : "팔로우" : "팔로우",
				is_me: data.member_id == login_userId ? "displaynone" : '',
			}
			document.querySelector("#reviewsUserFollowList").insertAdjacentHTML("beforeend", `
			<li class="user_item">
				<ul class="user_box">
					<li class="userimg"><a href="/reviews/profile.html?member_id=${user.member_id}"><div class="userimg_wrap"><img src="${user.profile_image}" onerror="this.src='https://bvoat.shop/images/new_img/ico__11.png'"></div></a></li>
					<li class="userinfo">
						<a href="/reviews/profile.html?member_id=${user.member_id}"><p class="usernickname ${user.level}">${user.nickname}</p></a>
					</li>
					<li class="userfollow">
						<button class="follow_btn ${user.isFollowing} ${user.is_me}" data-index="${user.index}" data-status="${user.isFollowing}" data-target="${user.member_id}">${user.btn_text}</button>
					</li>
				</ul>
			</li>
			`)
		});} 
		else{
			let text = param == 'follower' ? '팔로워' : '팔로잉';
			let sentence = param == 'follower' ? '팔로워가 없어요 🥲' : '팔로잉 한 사람이 없어요 🥲';
			document.querySelector("#reviewsUserFollowListBox").insertAdjacentHTML("afterbegin", `
			<div id="reviewsEmpty">
				<h2 class="reviews_empty">${text} 없음</h2>
				<p>아직 ${sentence}</p>
			</div>
			`)
		}
	})
	.then((response)=>{
		clickFollowButton();
	})
}

window.addEventListener("load", getFollowData);
