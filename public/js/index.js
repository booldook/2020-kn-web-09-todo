/************** 글로벌설정 ***************/
var auth = firebase.auth();
var db = firebase.database();
var user = null;
var google = new firebase.auth.GoogleAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();

/************** 이벤트등록 ***************/
auth.languageCode = 'ko';
auth.onAuthStateChanged(onAuthChg);

$('#btGoogleLogin').click(onGoogleLogin);
$('#btLogout').click(onLogout);


/************** 이벤트콜백 ***************/
function onAuthChg(r) {
	if(r) {
		user = r;
		$('.sign-wrap .icon img').attr('src', user.photoURL);
		$('.sign-wrap .email').html(user.email);
		$('.modal-wrapper.auth-wrapper').hide();
		$('#btLogout').show();
	}
	else {
		user = null;
		$('.sign-wrap .icon img').attr('src', 'https://via.placeholder.com/36');
		$('.sign-wrap .email').html('');
		$('.modal-wrapper.auth-wrapper').show();
		$('#btLogout').hide();
	}
}

function onGoogleLogin() {
	auth.signInWithPopup(google);
}

function onLogout() {
	auth.signOut();
}

/************** 사용자함수 ***************/
