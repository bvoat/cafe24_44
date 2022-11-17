let param = getUrlParams('mode');
let member_id = getUrlParams('member_id');

console.log('param: ', param);

//url parameter의 div가 follow이면 팔로우 보기 following이면 팔로잉 보기
//userfollow 부분에서 session의 id (login_userId)로 저 사람을 봤을 때 내가 팔로잉 한건지 아닌지를 확인해야 하는데?
//레벨
/*

{ 
	member_id : '',
	level: '',
	is_following: '',
}

*/
//

/**
 * 최초 데이터 수신
*/
function getFollowData() {
	let followData;
	fetch(`https://${api_domain}.shop/member/${param}/${member_id}`, {
		method: "GET",
	})
	.then((response) => response.json())
	.then((response)=>{
		console.log(response);
		followData=response.data;
		console.log('followData: ', followData);
		followData.forEach(data => {

			let user = {
				member_id: data.member_id ? data.member_id : "익명",
				level: data.level ? data.level === "1" ? "normal" : "crew" : "normal",
				isFollowing: data.is_following ? data.is_following === "1" ? "following" : "follow" : "follow",
				btn_text: data.is_following ? data.is_following === "1" ? "팔로잉" : "팔로우" : "팔로우",
			}


			document.querySelector("#reviewsUserFollowList").insertAdjacentHTML("afterbegin", `
			<li class="user_item">
				<ul class="user_box">
					<li class="userimg"><img src="https://bvoat.shop/images/new_img/ico__11.png"></li>
					<li class="userinfo">
						<p class="usernickname ${user.level}">${user.member_id}</p>
					</li>
					<li class="userfollow">
						<button class="follow_btn ${user.isFollowing}">${user.btn_text}</button>
					</li>
				</ul>
			</li>
			`)
		});
	})
}

window.addEventListener("load", getFollowData)