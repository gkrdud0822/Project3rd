/**
 * login.jsp, join_membership.jsp,find_id,find_pass의 자바스크립트 기능들이 있습니다
 */
var sel_file; // 이미지 미리보기 변수

/*정규식*/

var regExpPws = RegExp(/^(?=.*\s{1,50})/);
var regExpPw = RegExp(/^(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()\-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/);//비번
var getCheck= RegExp(/^[a-zA-Z0-9]{6,12}$/); 			//아이디
var getyear= RegExp(/^[0-9]{4}$/); 						//년
var getmonth_date= RegExp(/^[0-9]{1,2}$/); 				//월,일
var tel_first = RegExp(/^[0-9]{3}$/); 					//폰번호 3
var tel_second = RegExp(/^[0-9]{3,4}$/); 				//폰번호 3,4
var tel_third = RegExp(/^[0-9]{4}$/); 					//폰번호 4
var getName= RegExp(/^[가-힣]+$/);						//이름
var emailCheck = RegExp(/^[A-Za-z0-9_\.\-]{5,14}$/);	//이메일

getCategorySelect();//카테고리선택란에 카테고리 넣기(하단에 메서드 존재)

/*카테고리선택창의 카테고리 불러오기*/
function getCategorySelect(){
	  $.getJSON("/jamong.com/category_load/",function(data){
		  var str="";
		  $(data).each(function(){//each는 jQuery에서 반복함수
			  str+='<li class="join_membership_category-item">'
			  +'<span class="join_membership_category-span">'+this.cat_name+'</span>'
			  +'<input type="hidden" value="'+this.cat_name+'"/>'
			  +'</li>'
		  });
		  if ($("#join_membership_category-list").length > 0 ) {//해당 구역이 존재하면
			  $('#join_membership_category-list').html(str);	//ul내부에 each내용을 넣어준다
		  }
	  });
}

/*로그인창에서 로그인 버튼 클릭시 */
function loginOk() {
	var login_id = $('#login_id').val();
	var login_pwd = $('#login_pwd').val();

	$('.login_error').text('');//에러택스트 초기화

	//아이디 공백 검증
	if ($.trim($('#login_id').val()) == "") {
		$('#login_id_error').text('아이디를 입력해주세요!');
		$("#login_id").val("").focus();
		return false;
	}

	//비밀번호 공백 검증
	if ($.trim($('#login_pwd').val())=="") {
		$('#login_pwd_error').text('비밀번호를 입력해주세요!');
		$("#login_pwd").val("").focus();
		return false;
	}
}

$(document).ready(function(){
	
	/*엔터로 로그인진행*/
	$('#login_id').on("keyup keydown", function(key) {
		if (key.keyCode == 13) {
			$("#login_pwd").focus();
		}
		 if(key.type === 'keydown'){
	          if(key.keyCode == 32) {
	             return false;
	          }
	      }
	});
	
	$("#login_pwd").on("keyup keydown", function(key){
		 if(key.type === 'keydown'){
	          if(key.keyCode == 32) {
	             return false;
	          }
	      }
	});

	/*	회원가입 기본정보 기입란 다음버튼 클릭시 유효성검증	*/
	
	$("#join_membership_next_btn").click(function() {
		if($('join_membership_email_flag').val()==1){
			return false;
		}
		$('.join_membership_error').text('');//에러택스트
	

		if ($.trim($('#join_membership_id').val()) == "") {//기본 텍스트
			$('#join_membership_error_id').text('아이디를 입력해주세요!');//에러택스트
			$("#join_membership_id").val("").focus();		
			return false;
		}
	
		if($.trim($("#join_membership_id").val()).length<6 || $.trim($("#join_membership_id").val()).length>12){ //아이디 정규식
			$('#join_membership_error_id').text('6자 이상,12자 이하로 설정해주세요!');
			$("#join_membership_id").focus(); 
			return false; 
		}
		
		if(!getCheck.test($("#join_membership_id").val())){ //아이디 정규식
			$('#join_membership_error_id').text('영문와 숫자만 사용 가능합니다.');
			$("#join_membership_id").focus(); 
			return false; 
		}
	
		if ($.trim($('#join_membership_pass').val())=="") {
			$('#join_membership_error_pass').text('비밀번호를 입력해주세요!');
			$("#join_membership_pass").val("").focus();
			return false;
		}
		if($.trim($('#join_membership_pass').val()).length<8 || $.trim($('#join_membership_pass').val()).length>50){
			$('#join_membership_error_pass').text('8자이상으로 설정해주세요!');
			$("#join_membership_pass_check").val("")
			$("#join_membership_pass").val("").focus();
			return false;
		}
	
		if ($.trim($('#join_membership_pass_check').val())=="") {
			$('#join_membership_error_pass_check').text('비밀번호 확인을 입력해주세요!');
			$("#join_membership_pass_check").val("").focus();
			return false;
		}
	
		
		//비밀번호 정규식 = 영문,숫자,특수문자의 조합

		if(!regExpPw.test($("#join_membership_pass").val()) || regExpPws.test($("#join_membership_pass").val())){ 
			$('#join_membership_error_pass').text('영문,숫자,특수문자의 조합으로 입력해주세요!');
			$("#join_membership_pass_check").val("")
			$("#join_membership_pass").val("").focus();
			return false; 
		}
	
		//비번 비번확인이 같은지 확인
		if($("#join_membership_pass_check").val() != $('#join_membership_pass').val()){
			$('#join_membership_error_pass_check').text('비밀번호가 같지 않습니다!');
			$("#join_membership_pass_check").val("");
			$("#join_membership_pass").val("").focus();
			return false;
		}
	
		//아이디와 비밀번호가 같을때 
		if($("#join_membership_id").val() == $("#join_membership_pass").val()){ 
			$('#join_membership_error_pass').text('아이디와 비밀번호가 같습니다');
			$("#join_membership_pass_check").val("");
			$("#join_membership_pass").val("").focus(); 
			return false; 
		}
	

		if ($.trim($('#join_membership_name').val())=="") {
			$('#join_membership_error_name').text('이름을 입력해주세요!');
			$("#join_membership_name").val("").focus();
			return false;
		}
	
		if (!getName.test($('#join_membership_name').val())) {//이름 정규식
			$('#join_membership_error_name').text('이름을 입력해주세요!');
			$("#join_membership_name").val("").focus();
			return false;
		}
	
		//년 공백
		if ($.trim($('#join_membership_birth_year').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			$("#join_membership_birth_year").focus();
			return false;
		}
		
		//년 정규식
		if(!getyear.test($('#join_membership_birth_year').val())){
			$('#join_membership_error_birth').text('년을 입력해주세요!');
			$("#join_membership_birth_year").val("").focus();
			return false;
		}
		
		//년 1900 ~ 2020사이 체크
		if ($.trim($('#join_membership_birth_year').val())>2020 || $.trim($('#join_membership_birth_year').val())<1900) {
			$('#join_membership_error_birth').text('유효한 년도를 입력해 주세요!');
			$("#join_membership_birth_year").val("").focus();
			return false;
		}
		
		
		//월 공백
		if ($.trim($('#join_membership_birth_month').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			$("#join_membership_birth_month").focus();
			return false;
		}
		
		//월 정규식
		if(!getmonth_date.test($('#join_membership_birth_month').val())){
			$('#join_membership_error_birth').text('월을 입력해주세요!');
			$("#join_membership_birth_month").val("").focus();
			return false;
		}
		
		//월 1 ~ 12사이 체크
		if ($.trim($('#join_membership_birth_month').val())>12 || $.trim($('#join_membership_birth_month').val())<1) {
			$('#join_membership_error_birth').text('유효한 월을 입력해 주세요!');
			$("#join_membership_birth_month").val("").focus();
			return false;
		}
		
		//일 정규식
		if ($.trim($('#join_membership_birth_date').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			$("#join_membership_birth_date").focus();
			return false;
		}
		
		//일 정규식
		if(!getmonth_date.test($('#join_membership_birth_date').val())){
			$('#join_membership_error_birth').text('일을 입력해주세요!');
			$("#join_membership_birth_date").val("").focus();
			return false;
		}
		
		//일 1 ~ 30사이 체크
		if ($.trim($('#join_membership_birth_date').val())>31 || $.trim($('#join_membership_birth_date').val())<1) {
			$('#join_membership_error_birth').text('유효한 일을 입력해 주세요!');
			$("#join_membership_birth_date").val("").focus();
			return false;
		}
		
		if ($.trim($('#join_membership_select_gender option:selected').val())=='성별') {
			$('#join_membership_error_birth').text('성별을 선택해 주세요!');
			$("#join_membership_select_gender").focus();
			return false;
		}
			
		if ($.trim($('#join_membership_email').val())=="") {
			$('#join_membership_error_email_domain').text('이메일을 입력해주세요!');
			$("#join_membership_email").val("").focus();
			return false;
		}
		
		if ($.trim($('#join_membership_email_datalist').val())=="") {
			$('#join_membership_error_email_domain').text('도메인을 입력해주세요!');
			$("#join_membership_email_datalist").val("").focus();
			return false;
		}
		
		//이메일 도메인 정규식
		if (!emailCheck.test($('#join_membership_email_datalist').val())) {
			$('#join_membership_error_email_domain').text('도메인을 입력해주세요!');
			$("#join_membership_email_datalist").val("").focus();
			return false;
		}

		//핸드폰 정규식
		if ($.trim($('#join_membership_tel1').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			$("#join_membership_tel1").focus();
			return false;
		}
		if(!tel_first.test($('#join_membership_tel1').val())){
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		}
		
		if ($.trim($('#join_membership_tel2').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			$("#join_membership_tel2").focus();
			return false;
		}
		if (!tel_second.test($('#join_membership_tel2').val())) {
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		}
		
		if ($.trim($('#join_membership_tel3').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			$("#join_membership_tel3").focus();
			return false;
		}
		if (!tel_third.test($('#join_membership_tel3').val())) {
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		}
		
		if($('#join_membership_check').is(":checked") == false){
			$('#join_membership_policy_error').text('개인정보처리 방침에 동의해 주세요.');
			$('#join_membership_check').focus();
			return false;
		}
		
		if($.trim($('#join_membership_birth_month').val()).length==1){
			var birth_month = $('#join_membership_birth_month').val();
			$('#join_membership_birth_month').val("0"+birth_month);
		}
		
		if($.trim($('#join_membership_birth_date').val()).length==1){
			var birth_date = $('#join_membership_birth_date').val();
			$('#join_membership_birth_date').val("0"+birth_date);
			
		}
		
		//기본정보 -> 프로필
		if($("#join_membership_page2").css("display") == "none"){
			$("#join_membership_page1").hide();
			$("#join_membership_sequence_list1").removeClass('membership_step');
			$("#join_membership_sequence_list1").addClass('membership_complete');
			$("#join_membership_page2").show();
			$("#join_membership_sequence_list2").addClass('membership_step');
		}
	});
	
	//생년월일,전화번호 숫자만 받도록
	$(".numberOnly").on("focus", function() {//포커스되었을때
	    var x = $(this).val();
	    $(this).val(x);
	}).on("focusout", function() {//포커스에서 나갔을 때
	    var x = $(this).val();		//값을 받아오고
	    if(x && x.length > 0) {		//내용물이 입력되었다면
	        if(!$.isNumeric(x)) {	//숫자가 아니라면
	            x = x.replace(/[^0-9]/g,"");	//숫자가 아닌존재들을 지움
	        }
	    }
	}).on("keyup", function() {//숫자가 눌렸을 때
		$(this).val($(this).val().replace(/[^0-9]/g,""));//숫자가 아닌존재들을 지움
	});
	
	/*page2 버튼*/
	//프로필 -> 기본정보 : 이전으로
	$("#join_membership_before_btn2").click(function() {
		if($("#join_membership_page1").css ("display") == "none"){
			$("#join_membership_page2").hide();
			$("#join_membership_sequence_list2").removeClass('membership_step');
			$("#join_membership_page1").show();
			$("#join_membership_sequence_list1").removeClass('membership_complete');
			$("#join_membership_sequence_list1").addClass('membership_step');
		}
	});
	
	//프로필 -> 카테고리 : 다음으로
	$("#join_membership_next_btn2").click(function() {
		var nickname = $("#join_membership_profile_editor").val();		
		$.ajax({
	        type:"POST",
	        url:"join_membership_idcheck", 
	        data: {"id":nickname},  			//좌측 id 피라미터 이름에 우측 $mem_id변수값을 저장
	        datatype:"int",					//서버의 실행된 결과값을 사용자로 받아오는 방법
	        success: function (data) {		//아작스로 받아오는것이 성공했을경우 서버 데이터를 data변수에 저장
	      	  if(data==1){	//중복 아이디가 있다면
	      		$('#join_membership_profile_editor_error').text('중복된 작가명 입니다!');
	      		$('#join_membership_next_btn2').attr("disabled",true);
	          	return false;
	      	  }else if(data==2){
	      		$('#join_membership_next_btn2').attr("disabled",false);
	      	  }
	        },
	    	  error:function(){//비동기식 아작스로 서버디비 데이터를 못가져와서 에러가 발생했을 때 호출되는 함수이다.
	    		  alert("data error");
	    	  }
	      });
		$('#join_membership_profile_editor_error').text('');
		if($("#join_membership_page3").css ("display") == "none"){
			$("#join_membership_page2").hide();
			$("#join_membership_sequence_list2").removeClass('membership_step');
			$("#join_membership_sequence_list2").addClass('membership_complete');
			$("#join_membership_page3").show();
			$("#join_membership_sequence_list3").addClass('membership_step');
		}
	});
	
	/*page3 버튼*/
	//카테고리 -> 프로필 : 이전으로
	$("#join_membership_before_btn3").click(function() {
		if($("#join_membership_page2").css ("display") == "none"){
			$("#join_membership_page3").hide();
			$("#join_membership_sequence_list3").removeClass('membership_step');
			$("#join_membership_page2").show();
			$("#join_membership_sequence_list2").removeClass('membership_complete');
			$("#join_membership_sequence_list2").addClass('membership_step');
		}
	});
	
	/*input 포커스아웃 혹은 글씨 쓸때마다 유효성검사 시키기*/
	/*아이디 유효성검사 & 중복검사*/
	$("#join_membership_id").on("focusout", function() {//포커스가 나갈때
		var id = $(this).val();
		if ($.trim($('#join_membership_id').val()) == "") {//기본 텍스트
			$('#join_membership_error_id').text('아이디를 입력해주세요!');//에러택스트
			return false;
		}
	
		if($.trim($("#join_membership_id").val()).length<6 || $.trim($("#join_membership_id").val()).length>12){ //아이디 정규식
			$('#join_membership_error_id').text('6자 이상,12자 이하로 설정해주세요!');
			return false; 
		}
		
		if(!getCheck.test($("#join_membership_id").val())){ //아이디 정규식
			$('#join_membership_error_id').text('영문와 숫자만 사용 가능합니다.');
			return false; 
		}
		
		$.ajax({
	        type:"POST",
	        url:"join_membership_idcheck", 
	        data: {"id":id},  			//좌측 id 피라미터 이름에 우측 $mem_id변수값을 저장
	        datatype:"int",					//서버의 실행된 결과값을 사용자로 받아오는 방법
	        success: function (data) {		//아작스로 받아오는것이 성공했을경우 서버 데이터를 data변수에 저장
	      	  if(data==1){	//중복 아이디가 있다면
	      		$('#join_membership_error_id').text('중복아이디 입니다!');
	      		$('#join_membership_next_btn').attr("disabled",true);
	          	return false;
	      	  }else if(data==2){
	      		$('#join_membership_next_btn').attr("disabled",false);
	      	  }
	        },
	    	  error:function(){//비동기식 아작스로 서버디비 데이터를 못가져와서 에러가 발생했을 때 호출되는 함수이다.
	    		  alert("data error");
	    	  }
	      });
		
	}).on("keyup", function(key) {//타이핑 할때
		var id = $(this).val();
		if ($.trim($('#join_membership_id').val()) == "") {//기본 텍스트
			$('#join_membership_error_id').text('아이디를 입력해주세요!');//에러택스트
			return false;
		}
	
		if($.trim($("#join_membership_id").val()).length<6 || $.trim($("#join_membership_id").val()).length>12){ //아이디 정규식
			$('#join_membership_error_id').text('6자 이상,12자 이하로 설정해주세요!');
			return false; 
		}
		
		if(!getCheck.test($("#join_membership_id").val())){ //아이디 정규식
			$('#join_membership_error_id').text('영문와 숫자만 사용 가능합니다.');
			return false; 
		}
		
		$.ajax({
	        type:"POST",
	        url:"join_membership_idcheck", 
	        data: {"id":id},  				//좌측 id 피라미터 이름에 우측 $mem_id변수값을 저장
	        datatype:"int",					//서버의 실행된 결과값을 사용자로 받아오는 방법
	        success: function (data) {		//아작스로 받아오는것이 성공했을경우 서버 데이터를 data변수에 저장
	      	  if(data==1){	//중복 아이디가 있다면
	      		$('#join_membership_error_id').text('중복아이디 입니다!');
	      		$('#join_membership_next_btn').attr("disabled",true);
	          	return false;
	      	  }else if(data==2){
	      		$('#join_membership_next_btn').attr("disabled",false);
	      	  }
	        },
	    	  error:function(){//비동기식 아작스로 서버디비 데이터를 못가져와서 에러가 발생했을 때 호출되는 함수이다.
	    		  alert("data error");
	    	  }
	      });
		
		$('#join_membership_error_id').text('');
		
		if (key.keyCode == 13) {
			$("#join_membership_pass").focus();
		}
	});
	
	/*비밀번호 검사*/
	$("#join_membership_pass").on("focusout keydown", function(e) {
		
	    if(e.type === 'focusout'){
		if ($.trim($('#join_membership_pass').val())=="") {
			$('#join_membership_error_pass').text('비밀번호를 입력해주세요!');
			return false;
		}
		if($.trim($('#join_membership_pass').val()).length<8 || $.trim($('#join_membership_pass').val()).length>50){
			$('#join_membership_error_pass').text('8자이상으로 설정해주세요!');
			return false;
		}
		if(!regExpPw.test($("#join_membership_pass").val()) || regExpPws.test($("#join_membership_pass").val())){ 
			$('#join_membership_error_pass').text('영문,숫자,특수문자의 조합으로 입력해주세요!');
			return false; 
		}
		if($("#join_membership_id").val() == $("#join_membership_pass").val()){ 
			$('#join_membership_error_pass').text('아이디와 비밀번호가 같습니다');
			return false; 
		}
	   }
	    if(e.type === 'keydown'){
	         if(e.keyCode == 32) {
	            return false;
	         }
	      }
		$('#join_membership_error_pass').text('');
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_pass').val())=="") {
			$('#join_membership_error_pass').text('비밀번호를 입력해주세요!');
			return false;
		}
		if($.trim($('#join_membership_pass').val()).length<8 || $.trim($('#join_membership_pass').val()).length>50){
			$('#join_membership_error_pass').text('8자이상으로 설정해주세요!');
			return false;
		}

		if(!regExpPw.test($("#join_membership_pass").val()) || regExpPws.test($("#join_membership_pass").val())){ 
			$('#join_membership_error_pass').text('영문,숫자,특수문자의 조합으로 입력해주세요!');
			return false; 
		}
		if($("#join_membership_id").val() == $("#join_membership_pass").val()){ 
			$('#join_membership_error_pass').text('아이디와 비밀번호가 같습니다');
			return false; 
		}
		$('#join_membership_error_pass').text('');
		
		if (key.keyCode == 13) {
			$("#join_membership_pass_check").focus();
		}
	});
	
	/*비밀번호 확인 유효성 검증*/
	$("#join_membership_pass_check").on("focusout keydown", function(e) {
		
	   if(e.type === 'focusout'){
		if ($.trim($('#join_membership_pass_check').val())=="") {
			$('#join_membership_error_pass_check').text('비밀번호 확인을 입력해주세요!');
			return false;
		}
		if($.trim($('#join_membership_pass_check').val()) != $.trim($('#join_membership_pass').val())){
			$('#join_membership_error_pass_check').text('비밀번호가 같지 않습니다!');
			return false;
		}
	   }
	    if(e.type === 'keydown'){
	         if(e.keyCode == 32) {
	            return false;
	         }
	      }
		$('#join_membership_error_pass_check').text('');
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_pass_check').val())=="") {
			$('#join_membership_error_pass_check').text('비밀번호 확인을 입력해주세요!');
			return false;
		}
		if($.trim($('#join_membership_pass_check').val()) != $.trim($('#join_membership_pass').val())){
			$('#join_membership_error_pass_check').text('비밀번호가 같지 않습니다!');
			return false;
		}
		$('#join_membership_error_pass_check').text('');
		if (key.keyCode == 13) {
			$('#join_membership_name').focus();
		}
	});
	
	/*이름 유효성 검증*/
	$('#join_membership_name').on("focusout", function() {
		if ($.trim($('#join_membership_name').val())=="") {
			$('#join_membership_error_name').text('이름을 입력해주세요!');
			return false;
		}
	
		if (!getName.test($('#join_membership_name').val())) {//이름 정규식
			$('#join_membership_error_name').text('이름을 입력해주세요!');
			return false;
		}
		$('#join_membership_error_name').text('');
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_name').val())=="") {
			$('#join_membership_error_name').text('이름을 입력해주세요!');
			return false;
		}
	
		if (!getName.test($('#join_membership_name').val())) {//이름 정규식
			$('#join_membership_error_name').text('이름을 입력해주세요!');
			return false;
		}
		$('#join_membership_error_name').text('');
		if (key.keyCode == 13) {
			$('#join_membership_birth_year').focus();
		}
	});
	
	/*생년월일 : 년 유효성 검증*/
	$('#join_membership_birth_year').on("focusout", function() {
		if ($.trim($('#join_membership_birth_year').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			return false;
		}
		
		if(!getyear.test($.trim($('#join_membership_birth_year').val()))){
			$('#join_membership_error_birth').text('년을 입력해주세요!');
			return false;
		}
		if ($.trim($('#join_membership_birth_year').val())>2020 || $.trim($('#join_membership_birth_year').val())<1900) {
			$('#join_membership_error_birth').text('유효한 년도를 입력해 주세요!');
			return false;
		}
		$('#join_membership_error_birth').text('');
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_birth_year').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			return false;
		}
		
		if(!getyear.test($.trim($('#join_membership_birth_year').val()))){
			$('#join_membership_error_birth').text('년을 입력해주세요!');
			return false;
		}
		if ($.trim($('#join_membership_birth_year').val())>2020 || $.trim($('#join_membership_birth_year').val())<1900) {
			$('#join_membership_error_birth').text('유효한 년도를 입력해 주세요!');
			return false;
		}
		$('#join_membership_error_birth').text('');
		if (key.keyCode == 13) {
			$('#join_membership_birth_month').focus();
		}
	});
	
	/*생년월일 : 월 유효성검증*/
	$('#join_membership_birth_month').on("focusout", function() {
		if ($.trim($('#join_membership_birth_month').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			return false;
		}
		
		if(!getmonth_date.test($('#join_membership_birth_month').val())){
			$('#join_membership_error_birth').text('월을 입력해주세요!');
			return false;
		}
		
		if($.trim($('#join_membership_birth_month').val())>12 || $.trim($('#join_membership_birth_month').val())<1) {
			$('#join_membership_error_birth').text('유효한 월을 입력해 주세요!');
			return false;
		}
		$('#join_membership_error_birth').text('');
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_birth_month').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			return false;
		}
		
		if(!getmonth_date.test($('#join_membership_birth_month').val())){
			$('#join_membership_error_birth').text('월을 입력해주세요!');
			return false;
		}
		
		if ($.trim($('#join_membership_birth_month').val())>12 || $.trim($('#join_membership_birth_month').val())<1) {
			$('#join_membership_error_birth').text('유효한 월을 입력해 주세요!');
			return false;
		}
		$('#join_membership_error_birth').text('');
		if (key.keyCode == 13) {
			$('#join_membership_birth_date').focus();
		}
	}).on("focus",function(){
		if ($.trim($('#join_membership_birth_year').val())>2020 || $.trim($('#join_membership_birth_year').val())<1900) {
			$('#join_membership_error_birth').text('유효한 년도를 입력해 주세요!');
			$('#join_membership_birth_year').focus();
			return false;
		}
	});
	
	/*생년월일 : 일 유효성 검증*/
	$('#join_membership_birth_date').on("focusout", function() {
		if ($.trim($('#join_membership_birth_date').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			return false;
		}
		
		if(!getmonth_date.test($('#join_membership_birth_date').val())){
			$('#join_membership_error_birth').text('일을 입력해주세요!');
			return false;
		}
		
		if ($.trim($('#join_membership_birth_date').val())>31 || $.trim($('#join_membership_birth_date').val())<1) {
			$('#join_membership_error_birth').text('유효한 일을 입력해 주세요!');
			return false;
		}
		$('#join_membership_error_birth').text('');
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_birth_date').val())=="") {
			$('#join_membership_error_birth').text('생년월일을 입력해 주세요!');
			return false;
		}
		
		if(!getmonth_date.test($('#join_membership_birth_date').val())){
			$('#join_membership_error_birth').text('일을 입력해주세요!');
			return false;
		}
		
		if ($.trim($('#join_membership_birth_date').val())>31 || $.trim($('#join_membership_birth_date').val())<1) {
			$('#join_membership_error_birth').text('유효한 일을 입력해 주세요!');
			return false;
		}
		$('#join_membership_error_birth').text('');
		if (key.keyCode == 13) {
			$('#join_membership_select_gender').focus();
		}
	}).on("focus",function(){
		if ($.trim($('#join_membership_birth_month').val())>12 || $.trim($('#join_membership_birth_month').val())<1) {
			$('#join_membership_error_birth').text('유효한 월을 입력해 주세요!');
			$('#join_membership_birth_month').focus();
			return false;
		}
		if($.trim($('#join_membership_birth_month').val()).length==1){
			var birth_month = $('#join_membership_birth_month').val();
			$('#join_membership_birth_month').val("0"+birth_month);
			return false;
		}
	});
	
	/*성별 유효성 검증*/
	$('#join_membership_select_gender').on("focus", function() {
		if($.trim($('#join_membership_birth_date').val()).length==1){
			var birth_date = $('#join_membership_birth_date').val();
			$('#join_membership_birth_date').val("0"+birth_date);
			return false;
		}
		if ($.trim($('#join_membership_select_gender option:selected').val())=='성별') {
			$('#join_membership_error_birth').text('성별을 선택해 주세요!');
			return false;
		}
		$('#join_membership_error_birth').text('');
	}).on("focusout", function() {
		if ($.trim($('#join_membership_select_gender option:selected').val())=='성별') {
			$('#join_membership_error_birth').text('성별을 선택해 주세요!');
			return false;
		}
		$('#join_membership_error_birth').text('');
	}).on("keyup", function(key) {
		if (key.keyCode == 13) {
			$('#join_membership_tel1').focus();
		}
	});
	
	/*핸드폰 번호1*/
	$('#join_membership_tel1').on("focusout", function() {
		if ($.trim($('#join_membership_tel1').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			return false;
		if(!tel_first.test($('#join_membership_tel1').val())){
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		 }
		}
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_tel1').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			return false;
		}
		if(!tel_first.test($('#join_membership_tel1').val())){
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		 }
		$('#join_membership_error_tel').text('');
		if (key.keyCode == 13) {
			$('#join_membership_tel2').focus();
		}
	});
	
	/*핸드폰 번호2*/
	$('#join_membership_tel2').on("focusout", function() {
		if ($.trim($('#join_membership_tel2').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			return false;
		}
		if (!tel_second.test($('#join_membership_tel2').val())) {
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		}
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_tel2').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			return false;
		}
		if (!tel_second.test($('#join_membership_tel2').val())) {
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		}
		$('#join_membership_error_tel').text('');
		if (key.keyCode == 13) {
			$('#join_membership_tel3').focus();
		}
	});

	/*핸드폰 번호3*/
	$('#join_membership_tel3').on("focusout", function() {
		if ($.trim($('#join_membership_tel3').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			return false;
		}
		if (!tel_third.test($('#join_membership_tel3').val())) {
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		}
	}).on("keyup", function(key) {
		if ($.trim($('#join_membership_tel3').val())=="") {
			$('#join_membership_error_tel').text('핸드폰번호를 입력해주세요!');
			return false;
		}
		if (!tel_third.test($('#join_membership_tel3').val())) {
			$('#join_membership_error_tel').text('정확한 번호를 입력해주세요!');
			return false;
		}
		$('#join_membership_error_tel').text('');
		if (key.keyCode == 13) {
			$('#join_membership_email').focus();
		}
	});
	
//	이메일 id 유효성 검증//추후 복구해야됨!!!!
	$('#join_membership_email').on("focusout", function() {
		if ($.trim($('#join_membership_email').val())=="") {
			$('#join_membership_error_email_domain').text('이메일을 입력해주세요!');
			return false;
		}
	}).on("keyup", function(key) {

		$('#join_membership_certified_btn').attr("disabled",false);
		$('#join_membership_emailcheck_div').hide();
		$('#join_membership_email_flag').val('1');
		$('#join_membership_next_btn').attr('disabled', true);
		
		if ($.trim($('#join_membership_email').val())=="") {
			$('#join_membership_error_email_domain').text('이메일을 입력해주세요!');
			return false;
		}
		$('#join_membership_error_email_domain').text('');
		if (key.keyCode == 13) {
			$('#join_membership_email_datalist').focus();
		}
		
	});
	
//	이메일 도메인 유효성 검증
	$('#join_membership_email_datalist').on("keyup", function() {
		var email = $.trim($('#join_membership_email').val());		
		var domain = $.trim($('#join_membership_email_datalist').val());
		
		if ($.trim($('#join_membership_email_datalist').val())=="") {
			$('#join_membership_error_email_domain').text('도메인을 입력해주세요!');
			return false;
		}
		
		if (!emailCheck.test($('#join_membership_email_datalist').val())) {
			$('#join_membership_error_email_domain').text('도메인을 입력해주세요!');
			return false;
		}
		
		$.ajax({
	        type:"POST",
	        url:"join_membership_emailcheck", 
	        data: {"email":email,"domain":domain},  				
	        datatype:"int",					
	        success: function (data) {		
	      	  if(data==1){	
	      		$('#join_membership_error_email_domain').text('중복이메일 입니다!');
	      		$('#join_membership_certified_btn').attr("disabled",true);
	      		$('#join_membership_certified_btn').css("cursor","default");
	          	return false;
	      	  }  
	        },
	    	  error:function(){
	    		  alert("data error");
	    	  }
	      });
		$('#join_membership_error_email_domain').text('');
	}).on("keyup", function(key) {
		var email = $.trim($('#join_membership_email').val());		
		var domain = $.trim($('#join_membership_email_datalist').val());
		
		$('#join_membership_certified_btn').attr("disabled",false);
		$('#join_membership_emailcheck_div').hide();
		$('#join_membership_email_flag').val('1');
		$('#join_membership_next_btn').attr('disabled', true);
		
		if ($.trim($('#join_membership_email_datalist').val())=="") {
			$('#join_membership_error_email_domain').text('도메인을 입력해주세요!');
			return false;
		}
		
		if (!emailCheck.test($('#join_membership_email_datalist').val())) {
			$('#join_membership_error_email_domain').text('도메인을 입력해주세요!');
			return false;
		}
		
		$('#join_membership_error_email_domain').text('');
		if (key.keyCode == 13) {
			$('#join_membership_certified_btn').focus();
		}
	}).on("focus", function(){
		$('#join_membership_certified_btn').attr("disabled",false);
		$('#join_membership_emailcheck_div').hide();
		$('#join_membership_email_flag').val('1');
		$('#join_membership_next_btn').attr('disabled', true);
	});
	/*닉네임 유효성 검증*/
	$("#join_membership_profile_editor").on("focusout keydown", function(e) {//포커스가 나갈때
		var nickname = $(this).val();		
		if(e.type === 'keydown'){
			if(e.keyCode == 32){
				 return false;
			}
		}
		$.ajax({
	        type:"POST",
	        url:"join_membership_idcheck", 
	        data: {"id":nickname},  			//좌측 id 피라미터 이름에 우측 $mem_id변수값을 저장
	        datatype:"int",					//서버의 실행된 결과값을 사용자로 받아오는 방법
	        success: function (data) {		//아작스로 받아오는것이 성공했을경우 서버 데이터를 data변수에 저장
	      	  if(data==1){	//중복 아이디가 있다면
	      		$('#join_membership_profile_editor_error').text('중복된 작가명 입니다!');
	      		$('#join_membership_next_btn').attr("disabled",true);
	          	return false;
	      	  }else if(data==2){
	      		$('#join_membership_next_btn').attr("disabled",false);
	      	  }
	        },
	    	  error:function(){//비동기식 아작스로 서버디비 데이터를 못가져와서 에러가 발생했을 때 호출되는 함수이다.
	    		  alert("data error");
	    	  }
	      });
		$('#join_membership_profile_editor_error').text('');
	}).on("keyup", function(key) {//타이핑 할때
		var nickname = $(this).val();		
		$.ajax({
	        type:"POST",
	        url:"join_membership_idcheck", 
	        data: {"id":nickname},  			//좌측 id 피라미터 이름에 우측 $mem_id변수값을 저장
	        datatype:"int",					//서버의 실행된 결과값을 사용자로 받아오는 방법
	        success: function (data) {		//아작스로 받아오는것이 성공했을경우 서버 데이터를 data변수에 저장
	      	  if(data==1){	//중복 아이디가 있다면
	      		$('#join_membership_profile_editor_error').text('중복된 작가명 입니다!');
	      		$('#join_membership_next_btn2').attr("disabled",true);
	          	return false;
	      	  }else if(data==2){
	      		$('#join_membership_next_btn2').attr("disabled",false);
	      	  }
	        },
	    	  error:function(){//비동기식 아작스로 서버디비 데이터를 못가져와서 에러가 발생했을 때 호출되는 함수이다.
	    		  alert("data error");
	    	  }
	      });
		$('#join_membership_profile_editor_error').text('');
	});
	
	/*프로필 미리보기 이미지 변경 - 등록메서드 실행*/
	$("#join_membership_profile_input_hide").on("change", handleImgFileSelect);
});

//카테고리 선택시 class,name 추가(form에 post전달하기 위해서 name값에 숫자 추가)
//중요!! $(document).ready()안에 사용하지 않은 이유
//		jQuery의 get이나 ajax방식으로 사용하는 경우 click 메서드가 요소를 인식하지 못한다.
//		click의 조상격인 on을 사용하면 인식가능하므로 on을 사용하도록하자
//		http://blog.freezner.com/archives/411
$(document).on("click",".join_membership_category-span",function(){
	if($(this).parent().hasClass("member_category_check")){
		$(this).parent().removeClass("member_category_check");
		$(this).next().removeClass()
		$(this).next().removeAttr("name");
	}else{
		for(var i=1;i<=3;i++){
			if(!$('.join_membership_category-span').next().hasClass("member_fav"+i)){
				$(this).parent().addClass("member_category_check");
				$(this).next().addClass("member_fav"+i)
				$(this).next().attr("name","mem_fav"+i);
				return false
			}
		}
	}
});

/*프로필 미리보기 이미지 등록 메서드 */
function handleImgFileSelect(e){
	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);
	
	filesArr.forEach(function(f){
		if(!f.type.match("image.*")){
			alert('확장자는 이미지 확장자만 가능합니다!');
			return;
		}
		sel_file = f;
		var reader = new FileReader();
		reader.onload = function(e){
			$("#join_membership_profile_img").attr("src",e.target.result);
		}
		reader.readAsDataURL(f);
	});
}

/*로그인 , 회원가입창에서 엔터치면 텝키효과 나타나도록 효과주기 */
function captureReturnKey(e) { 
    if(e.keyCode==13 && e.srcElement.type != 'textarea') {
    	e.preventDefault();
    }
} 
//이메일 인증 단계 복구해야됨!!

$(function(){
	//이메일 인증 버튼 클릭시 발생하는 이벤트 
	$(document).on("click", "#join_membership_certified_btn", function(){
		var email = $.trim($('#join_membership_email').val());				//이메일값
		var domain = $.trim($('#join_membership_email_datalist').val());	//도메인값
		$('#join_membership_error_email_domain').text('');
		
		if (email=="") {
			$('#join_membership_error_email_domain').text('이메일을 입력해주세요!');
			return false;
		}
		if (domain=="") {
			$('#join_membership_error_email_domain').text('도메인을 입력해주세요!');
			return false;
		}
		if (!emailCheck.test($('#join_membership_email_datalist').val())) {
			$('#join_membership_error_email_domain').text('도메인을 입력해주세요!');
			return false;
		}
		//이메일 중복 다시체크
		$.ajax({
	        type:"POST",
	        url:"join_membership_emailcheck", 
	        data: {"email":email,"domain":domain},  				
	        datatype:"int",					
	        success: function (data) {		
	      	  if(data==1){	
	      		$('#join_membership_error_email_domain').text('중복이메일 입니다!');
	      		$('#join_membership_certified_btn').attr("disabled",true);
	          	return false;
	      	  }  
	      	  	$('#join_membership_error_email_domain').text('');
	        },
	    	  error:function(){
	    		  alert("data error");
	    	  }
	      });
		
		//이메일 중복 체크 후 메일 발송 비동기 처리 
		$.ajax({
			type:"POST",
			url : "join_emailCert",
			data : {"email": email,"domain":domain},
			success : function(data){
					Swal.fire({
						icon : 'info',
						allowOutsideClick: false,
						text : '입력하신 이메일로 인증번호가 발송되었습니다.\n 인증번호를 입력해주세요'
					}).then((result) => {
				$('#join_membership_certified_btn').attr("disabled",true);
				$('#join_membership_emailcheck').val('');
				$('#join_membership_emailcheck').attr('readonly',false);
				$('#join_membership_emailcheck_btn').attr('disabled',false);					
					});
			},
			beforeSend:function(){
			        //(이미지 보여주기 처리)
			        $('.wrap-loading').show();
			},
			complete:function(){
			        //(이미지 감추기 처리)
			        $('.wrap-loading').hide();
			},
			error: function(data){
				alert("에러가 발생했습니다.");
				return false;
			}
		})
		$('#join_membership_emailcheck_div').show();
	});

	//이메일 인증번호 입력 후 인증 버튼 클릭 이벤트
	$(document).on("click", "#join_membership_emailcheck_btn", function(){
		var authCode = $('#join_membership_emailcheck').val();
		$.ajax({
			type:"post",
			url:"join_emailCert_ok",
			data:{"authCode":authCode},
			success:function(data){
				if(data=="complete"){
					Swal.fire({
						icon : 'success',
						allowOutsideClick: false,
						text : '인증이 완료되었습니다!'
					}).then(function(){
					$('#join_membership_email_flag').val('2');
					$('#join_membership_next_btn').attr('disabled', false);
					$('#join_membership_emailcheck').attr('readonly',true);
					$('#join_membership_emailcheck_btn').attr('disabled',true);
					sessionStorage.removeItem('authCode');					
					});
				}else if(data == "false"){
					Swal.fire({
						icon : 'warning',
						text : '인증번호가 틀렸습니다!'
					});
				}
			},
			beforeSend:function(){
		        //(이미지 보여주기 처리)
		        $('.wrap-loading').show();
			},
			complete:function(){
			    //(이미지 감추기 처리)
			    $('.wrap-loading').hide();
			},
			error:function(data){
				alert("에러가 발생했습니다.");
			}
		});
	});
});





