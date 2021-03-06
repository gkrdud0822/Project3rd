<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include/header.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/inquire.css"/>
<script src="${pageContext.request.contextPath}/resources/js/inquire.js"></script>
<article class=inq_main_art oncontextmenu="return false" ondragstart="return false"
 onselectstart="return false">
  <h3 class=inq_title>문의하기</h3>
  <span class=inq_required>*필수입력 사항</span>
  <br/>
  <div class=inq_question_cont>
  	<form id="inq_request" method="post"  action="inquire_ok" enctype="multipart/form-data"
  	 name="inq_request" onsubmit="return inq();" >
  	<fieldset class="inq_field_set">
  	  <legend class="inq_form">문의하기 폼</legend>
  	   
  	   <!-- 페이지를 보면서 보시면 이해가 쉽습니다. -->
  	   
  	   
  	   <!-- Select 시 Hide 보여지는 부분 시작 -->
  	   <dl class="inq_info_confirm" id="inq_info_confirm" style="display:none;">
  	    <dt class="inq_tit_confirm" id="inq_tit_confirm">
  	     <span class="inq_txt_caution" id="inq_txt_caution">꼭 확인해 주세요!</span>
  	    </dt>
  	    <dd class="inq_txt_confirm" id="inq_txt_confirm" 
  	    style="border:1px solid black; height: -webkit-fill-available;">
  	    	Jamong 서비스에 개선 또는 제안하고 싶은 내용을 입력해 주세요 :)
  	    </dd>
  	   </dl>
  	   <!-- Select 시 Hide 보여지는 부분 끝 -->
  	   
  	   <!-- Select 시 Hide 보여지는 부분 시작2 -->
  	   <dl class="inq_info_confirm" id="inq_info_confirm2" style="display:none;">
  	    <dt class="inq_tit_confirm" id="inq_tit_confirm2">
  	     <span class="inq_txt_caution" id="inq_txt_caution2">꼭 확인해 주세요!</span>
  	    </dt>
  	    <dd class="inq_txt_confirm" id="inq_txt_confirm2" 
  	    style="border:1px solid black; height: -webkit-fill-available;">
  	    	Jamong 서비스에 문의하고 싶은 내용을 입력해 주세요 :)
  	    </dd>
  	   </dl>
  	   <!-- Select 시 Hide 보여지는 부분 끝2 -->
  	   
  	   
  	   <!-- 문의 분류쪽 큰 Div 시작 -->
  	   <dl class="inq_info_question">
  	     <dt>문의 분류 *</dt>
  	    <dd>
  	      <div class="inq_wrap_select">
  	       <select class="inq_list_select" name="inq_item" id="listselect" onselect="return inq2();">
  	          <option value="none">선택</option>
  	          <option value="개선/제안">개선/제안</option>
  	          <option value="일반문의">일반문의</option>
  	          <option value="제휴/협업 문의">제휴/협업 문의</option> 
  	       </select>
  	       
  	      </div>
  	       
  	    
  	       <div class="inq_vali_date" id="inq_vali_list"></div>
  	    </dd>
  	   </dl>
  	   <!-- 문의쪽 큰DIV 끝 -->
  	   
  	   
  	   <!-- E-mail주소 큰 DIV 시작 -->
  	   <dl class=inq_info_question>
  	    <dt>
  	     <label class=inq_lab_info for="email">이메일 주소 *</label>
  	    </dt>
  	    
  	   <dd>
  	     <div class="inq_wrap_item">
  	    <input autocomplete="off" class="inq_email_info"
  	    id="email" name="inq_email" placeholder="Example@Jamong.com"
  	    	<c:if test="${!empty m}">
  	    	 value="${m.email_id}@${m.email_domain}"
  	    	</c:if>
  	    >
  	     </div>
  	      <div class="inq_vali_date" id="inq_vali_email"></div>
  	    </dd>
  	   </dl>
  	   <!-- E-Mail주소 큰 DIV 끝 -->
  	   
  	   
  	   <!-- 휴대폰번호 큰 DIV 시작 -->
  	   <dl class=inq_info_question>
  	    <dt>
  	     <label class="inq_lab_info" for="phone">휴대폰 번호 *</label>
  	    </dt>
  	    
  	    <dd>
  	     <input autocomplete="off" class="inq_nation" name="inq_phone" id="phone"
  	      type="text" maxlength="11" placeholder=" -없이 숫자만 입력 ex)01012345678"
  	      <c:if test="${!empty m}">
  	    	 value="${m.mem_phone01}${m.mem_phone02}${m.mem_phone03}"
  	      </c:if>
  	      >
  	     <div class="inq_vali_date" id="inq_vali_phone"></div>
  	    </dd>
  	   </dl>
  	   <!-- 휴대폰 번호 DIV 끝 -->
  	   
  	   <!-- 문의 내용 큰 DIV -->
  	   <dl class="inq_info_question">
  	    <dt>
  	     <label class="inq_lab_info" for="contents">
  	    	문의내용 *
  	     </label>
  	    </dt>
  	    <dd>
  	     <div class="inq_wrap_item2">
  	     	<textarea class="inq_inp_info2" placeholder="문의 내용을 입력해 주세요(최대 400자)" cols="24" rows="6" 
  	     	id="inq_cont" name="inq_cont" style="line-height: normal" maxlength="400"></textarea>
  	     </div>
  	     <div class="inq_vali_date" id="inq_vali_info"></div>
  	    </dd>
  	   </dl>
  	   <!-- 문의 내용 큰 DIV 끝 -->
  	   
  	   
  	   <!-- 파일첨부 dl 시작  -->
  	   <dl class="inq_info_question">
  	    <dt>
  	     <label class="inq_lab_info" for="infoFile" id="fileInputLabel">
  	     	파일첨부
  	     </label>
  	    </dt>
  	    <dd id="inq_file_list">
  	     
  	     <div class="inq_wrap_upload" id="fileinput">
  	       
  	     	<input id="file_name1" class="file_name" value="파일선택" disabled="disabled"/>  	      	
  	     	<label for="inq_file1">업로드</label>
  	      	<input type="file" class="inq_inp_file" name="inq_file1" id="inq_file1" accept=".jpg,.gif,.psd,.png,.tif,.zip,.ms office,.hwp,.pdf">	
  	     	
  	     	<input id="file_name2" class="file_name" value="파일선택" disabled="disabled"/>  	      	
  	     	<label for="inq_file2">업로드</label>
  	      	<input type="file" class="inq_inp_file" name="inq_file2" id="inq_file2" accept=".jpg,.gif,.psd,.png,.tif,.zip,.ms office,.hwp,.pdf">	
  	     	
  	     	<input id="file_name3" class="file_name" value="파일선택" disabled="disabled"/>  	      	
  	     	<label for="inq_file3">업로드</label>
  	      	<input type="file" class="inq_inp_file" name="inq_file3" id="inq_file3" accept=".jpg,.gif,.psd,.png,.tif,.zip,.ms office,.hwp,.pdf">	
  	     	
  	     	<input id="file_name4" class="file_name" value="파일선택" disabled="disabled"/>  	      	
  	     	<label for="inq_file4">업로드</label>
  	      	<input type="file" class="inq_inp_file" name="inq_file4" id="inq_file4" accept=".jpg,.gif,.psd,.png,.tif,.zip,.ms office,.hwp,.pdf">	
  	     	
  	     </div>
  	  
  	  	<br/><br/>
  	     <p class="inq_desc_info">
  	     첨부파일은 최대 4개, 각 10MB까지 등록 가능하며
  	     <br>
  	     파일 형식은 jpg, gif, psd, png, tif, zip, ms office, 아래한글(hwp), pdf 만 가능합니다.
  	     </p>
  	    </dd>
  	   </dl>
  	   <!-- 파일첨부 dl 끝 -->
  	   
  	   
  	   <!-- 개인정보 수집 div -->
  	   <div class="inq_info_agree">
  	    <strong class="inq_tit_agree">개인정보 수집·이용에 대한 안내</strong>
  	    <p class="inq_desc_agree">
  	    필수 수집·이용 항목 (문의접수와 처리,회신을 위한 최소한의 개인정보입니다. 동의가 필요합니다 :)
  	    </p>
  	    <table class="inq_tbl_privacy">
  	     <colgroup>
  	      <col>
  	      <col>
  	      <col>  	     
  	     </colgroup>
  	     <thead>
  	      <tr>
  	       <th scope="col" style="width:254px">수집항목</th>
  	       <th scope="col" style="width:352px">목적</th>
  	       <th scope="col" style="width:251px">보유기간</th>
  	      </tr>
  	     </thead>
  	     <tbody>
  	      <tr>
  	       <td>이메일 주소, 휴대폰 번호</td>
  	       <td>고객문의 및 상담요청에 대한 회신,<br>상담을 위한 서비스 이용기록 조회</td>
  	       <td>문의 접수 후 3년간 보관</td>
  	      </tr>
  	     </tbody>
  	    </table>
  	    <p class="inq_desc_more">
  	    더 자세한 내용에 대해서는
  	    <a class="inq_link_more" href="${pageContext.request.contextPath}/policy_privacy"
  	    target="_blank">자몽 개인정보처리방침</a>
  	    을 참고하시기 바랍니다.
  	    </p>
  	    <div class="inq_wrap_check">
  	      <input class="inq_check_agreement" type="checkbox" id="agree" name="agree" >
  	      <label class="inq_lab_check" id="inq_check" for="agree">
  	             위 내용에 동의합니다.
  	      </label>
  	    </div>
  	       <div class="inq_vali_date" id="inq_vali_check"></div>
  	   </div>
  	   <!-- 개인정보수집 DIV 끝 -->
  	   
  	   
  	   <!-- 문의접수 BUTTON -->
  	   <div class="inq_wrap_btn">
  	    <button class="inq_btn_cs" type="submit" >
  	    	문의접수 
  	    </button>
  	   </div>
  	   <!-- 문의접수 BUTTON 끝 -->
  	   
  	</fieldset>
  	</form>
  </div>
</article>





<%@ include file="../include/footer.jsp" %>