/************ 글로벌변수 **************/
var auth = firebase.auth();
var db = firebase.database();
var google = new firebase.auth.GoogleAuthProvider();
var user = null;
var ref = null;



/************ 사용자등록 **************/
function dbInit() {
	db.ref('root/todo/'+user.uid).on('child_added', onAdd);
	db.ref('root/todo/'+user.uid).on('child_removed', onRev);
	db.ref('root/todo/'+user.uid).on('child_changed', onChg);
}


/************ 이벤트 콜백 **************/
function onAdd(r) {

}

function onRev(r) {

}

function onChg(r) {
	
}


function onAuthChg(r) {
	if(r) {	// 로그인 되었다면..
		user = r;
		$('.auth-wrapper.modal-wrapper').hide();
		dbInit();
	}
	else {	// 로그아웃 되었다면...
		user = null;
		$('.auth-wrapper.modal-wrapper').show();
	}
}

function onLogin() {
	auth.signInWithPopup(google);
}

function onLogout() {
	auth.signOut();
}



/************ 이벤트등록 **************/
auth.onAuthStateChanged(onAuthChg);	// Watcher: 로그인상태 감시자
$('#btGoogleLogin').click(onLogin);
$('#btLogout').click(onLogout);
