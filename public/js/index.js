/************** 글로벌설정 ***************/
var auth = firebase.auth();
var db = firebase.database();
var user = null;
var ref = null;
var google = new firebase.auth.GoogleAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();



/************** 사용자함수 ***************/
function dbInit() {
	db.ref('root/todo/'+user.uid).on('child_added', onAdd);
	db.ref('root/todo/'+user.uid).on('child_removed', onRev);
	db.ref('root/todo/'+user.uid).on('child_changed', onChg);
}


/************** 이벤트콜백 ***************/
var timeout;
function onCheck(el, chk) {
	$(el).siblings('i').addClass('active');
	$(el).removeClass('active');
	if(chk) {
		timeout = setTimeout(function(){ 
			$(el).parent().css('opacity', 0);
			setTimeout(function(){
				var data = { checked: true };
				$(el).parent().remove();
				db.ref('root/todo/'+user.uid+'/'+$(el).parent().attr('id')).update(data)
			}, 750) 
		}, 3000);
	}
	else {
		clearTimeout(timeout);
	}
}

function onDoneClick() {
	$('.bt-done').toggleClass('active');
	var ref = db.ref('root/todo/'+user.uid);
	if( $('.bt-done').hasClass('active') ) { //감추기
		ref.orderByChild('checked').equalTo(false).once('value').then(onGetData);
	}
	else {	//보이기
		ref.once('value').then(onGetData);
	}
}

function onGetData(r) {
	for(var i in r.val()){
		console.log(r.val()[i].task);
	}
}

function onSubmit(f) {
	var data = {
		task: f.task.value,
		createdAt: new Date().getTime(),
		checked: false,
	}
	if(f.task.value !== '') db.ref('root/todo/'+user.uid).push(data);
	return false;
}

function onAdd(r) {
	// console.log(r.key);
	// console.log(r.val());
	if(!r.val().checked) {
		var html  = '<li id="'+r.key+'">';
		html += '	<i class="active far fa-circle" onclick="onCheck(this, true);"></i>';
		html += '	<i class="far fa-check-circle" onclick="onCheck(this, false);"></i>';
		html += '	<span>'+r.val().task+'</span>';
		html += '</li>';
		var $li = $(html).prependTo($(".list-wrap"));
		$li.css("opacity");
		$li.css("opacity", 1);
	}

	// $(".add-wrap")[0].reset();
	document.querySelector(".add-wrap").reset();
}

function onRev(r) {
	console.log(r.val());
}

function onChg(r) {
	
}


function onAuthChg(r) {
	user = r;
	if(r) {
		$('.sign-wrap .icon img').attr('src', user.photoURL);
		$('.sign-wrap .email').html(user.email);
		$('.modal-wrapper.auth-wrapper').hide();
		$('.sign-wrap').show();
		dbInit();
	}
	else {
		$('.sign-wrap .icon img').attr('src', 'https://via.placeholder.com/36');
		$('.sign-wrap .email').html('');
		$('.modal-wrapper.auth-wrapper').show();
		$('.sign-wrap').hide();
	}
}

function onGoogleLogin() {
	auth.signInWithPopup(google);
}

function onLogout() {
	auth.signOut();
}




/************** 이벤트등록 ***************/
auth.languageCode = 'ko';
auth.onAuthStateChanged(onAuthChg);

$('#btGoogleLogin').click(onGoogleLogin);
$('#btLogout').click(onLogout);