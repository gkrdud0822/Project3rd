<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include/header.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel=stylesheet type="text/css" href="${pageContext.request.contextPath}/resources/css/profile.css">
<script src="${pageContext.request.contextPath}/resources/js/profile.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/jquery.word-break-keep-all.min.js"></script>
<title></title>
</head>
<body oncontextmenu="return false" ondragstart="return false" onselectstart="return false" >
	<div id="profile_main">
		<div id="profile_padding">
			<div id="profile_content">
				<div id="profile_">
					<div>
						<div id="p_menu" class="p_menu_button hide">
							<%--신고  --%>
							<c:if test="${m.mem_id != mp.mem_id}">
								<button id="warring_icon" class="accuse_page_open"
									onclick="accuseShow(1);"
								>
									<!-- after 적용 -->
								</button>
							</c:if>
							<%--편집 --%>
							<c:if test="${m.mem_id == mp.mem_id}">
								<button id="pt_edit_icon" onclick="location='profile_edit';">
									<!-- after 적용 -->
								</button>
							</c:if>
						</div>
						<div id="profile_cont">
							<div class="pf_subscriber">
								<img id="profile_img" alt="이미지" src="${mp.profile_photo}">
							</div>
							<strong id="profile_name">${mp.mem_nickname}</strong>
							<br>
							<span class="profile_font_size"></span>
						</div>
						<dl class="subscriber">
							<dt class="hide_font">정보</dt>
							<dd>
								<a><b class="profile_line profile_font_size">구독자</b> <span
									class="profile_line_num"
								>${subCount}</span></a>
							<dd>
								<div id="profile_button">
									<%--해당되는 아이디로 로그인 했을때 --%>
									<c:if test="${m.mem_id == mp.mem_id}">
										<a href="${pageContext.request.contextPath}/write" class="profile_button_type subscribe_check">글쓰기</a>
										 <c:if test="${mp.mem_author == 1}">
										  <a href="${pageContext.request.contextPath}/book_create" class="profile_button_type subscribe_check">책 발간</a>
										 </c:if>
									</c:if>
									<c:if test="${mp.mem_author == 1 && m.mem_id != mp.mem_id}">
                                        <a href="${pageContext.request.contextPath}/offer_author/@${mp.mem_id}" class="profile_button_type">제안하기</a>
                                        </c:if>
									<c:if test="${m.mem_id != mp.mem_id }">
										<span>
										 	<c:if test="${sub.sub_member != m.mem_no || empty sub}">
											<button class="profile_button_type2">구독하기</button>
											</c:if>
											<c:if test="${sub.sub_member == m.mem_no && !empty sub}">
											<button class="profile_button_type2 p_follow">구독중</button>
											</c:if>
										</span>
									</c:if>
									
								</div>
						</dl>
						<c:if test="${mp.mem_author==1}">
							<div id="profile_keyword_line">
								<ul class="profile_keyword_link">
								<c:forEach items="${mp.mem_keyword.split('/')}" var="tag">
							 		<li>
							 		<a class="profile_button_keyword profile_line" 
							 		href="${pageContext.request.contextPath}/search?w=post&s=accuracy&q=${tag}">${tag}</a>	        
								</li>
								
								</c:forEach>
								</ul>
							</div>
						</c:if>
						<!-- after적용 -->
					</div>
				</div>
			</div>
			<div id="profile_menu">
			<c:if test = "${view == null}">
			<input type="hidden" id="profile_menu_check" value="info" disabled>
			</c:if>
			<c:if test = "${view != null}">
			<input type="hidden" id="profile_menu_check" value="article" disabled>
			</c:if>
				<%--ARIA roles 적용  --%>
				<div id="Tablist">
				<c:if test = "${view == null}">
						<button id="info_tab" class="tab active">
							<span class="profile_font_size">작가소개</span><b></b>
						</button>
						<button id="article_tab" class="tab">
							<span class="profile_font_size">글</span><b></b>
						</button>
					<c:if test="${mp.mem_author == 1}">
						<button id="Magazine_tab" class="tab">
							<span class="profile_font_size">작품</span><b></b>
						</button>
					</c:if>
					</c:if>
					<%-- 비공개, 공개 버튼 클릭 후  --%>
					<c:if test= "${view != null}">
						<button id="info_tab" class="tab ">
							<span class="profile_font_size">작가소개</span><b></b>
						</button>
						<button id="article_tab" class="tab active">
							<span class="profile_font_size">글</span><b></b>
						</button>
					<c:if test="${mp.mem_author == 1}">
						<button id="Magazine_tab" class="tab">
							<span class="profile_font_size">작품</span><b></b>
						</button>
					</c:if>
					</c:if>
				</div>
			</div>
		</div>
		<main> <!-- main : 문서의 중요한 항목을 담는것  하나의 페이지에 하나의 요소만 사용가능--> <!-- 사용되지않는 main의 요소는 화면에서 감춤처리 -->
		<div id="profile_main_list">
			<div id="profile_info" 
			<c:if test="${view != null}">style="display: none;"</c:if>
			<c:if test="${view == null}">style="display: block;"</c:if>>
				<h3 class="hide_font">작가소개</h3>
				<div class="author_intro">
					<strong class="profile_font_size">소개</strong>
					<p class="profile_font_size">${mp.profile_cont}</p>
				</div>
				<c:if test="${mp.mem_author == 1 && mp.mem_portfolio != null}">
					<p class="profile_font_size">
						<strong>기타 이력 및 포트폴리오</strong> 
						<p class="profile_font_size">${mp.mem_portfolio}
					</p>
				</c:if>
			</div>
			
			<div id="article"
			<c:if test="${view == null}">style="display: none;"</c:if>
			<c:if test="${view != null}">style="display: block;"</c:if>
			>
				<div class="author_intro">
					<h3 class="hide_font">글목록</h3>
					<c:if test ="${m.mem_id == mp.mem_id || m.mem_state == 9}">
					<div id="private_btn">
					<form action="${pageContext.request.contextPath}/@${mp.mem_id}">
					<input type="hidden" id="article_check" name="view" value="" >
						<c:if test="${view == 'open'}">
							<input type="submit" id="article_all" class="profile_button_type3" value="전체" >
							<input type="submit" id="article_close" class="profile_button_type3" value="비공개" >
							<input type="submit" id="article_open" class="profile_button_type4" value="공개" >
						</c:if>
						<c:if test="${view == 'close'}">
							<input type="submit" id="article_all" class="profile_button_type3" value="전체" >
							<input type="submit" id="article_close" class="profile_button_type4" value="비공개" >
							<input type="submit" id="article_open" class="profile_button_type3" value="공개" >
						</c:if>
						<c:if test="${view == 'all' || view == null}">
							<input type="submit" id="article_all" class="profile_button_type4" value="전체" >
							<input type="submit" id="article_close" class="profile_button_type3" value="비공개" >
							<input type="submit" id="article_open" class="profile_button_type3" value="공개" >
						</c:if>
					</form>
					</div>
					</c:if>
					<ul class="profile_writer_list">
						<c:if test="${empty mplist}">
						<div class="profile_none"> 작성한 글이 없습니다 </div> 
						</c:if>
						<c:if test="${!empty mplist}"> 
						<c:forEach var="fp" items="${mplist}" varStatus="status">
						 <c:if test="${fp.bo_lock != 2 && fp.bo_lock != 3}">
								<c:if test="${empty fp}">
								</c:if>
								<%-- 다른사람의 프로필을 들어갔을때 --%>
                                <c:if test="${m.mem_id != mp.mem_id || empty m }" >
									<li class="profile_articles scrolling" data-no="${mp.mem_no}/${fp.bo_no}/${status.count}">
										<div>
												<div class="profile_article_main">
											<%--관리자 권한일때 --%>
											<c:if test="${m.mem_state == 9 }">
												<c:if test="${fp.bo_lock == 0 && fp.book_no eq 0 }"> <%-- 0 = 비공개 --%>
													<img class="private lock" src="${pageContext.request.contextPath}/resources/img/lock.png" data-no="${fp.bo_no}" data-disabled="false" />
												</c:if>
												<c:if test="${fp.bo_lock == 1 && fp.book_no eq 0 }"> <%-- 1 = 공개 --%>
													<img class="private unlock" src="${pageContext.request.contextPath}/resources/img/unlock.png" data-no="${fp.bo_no}" data-disabled="false" />
												</c:if>
											</c:if>
												         <a href="${pageContext.request.contextPath}/category/${fp.cat_name}"
															class="profile_cat_color">${fp.cat_name}</a>
													<c:if test="${fp.book_no ne 0}">
														<a href="${pageContext.request.contextPath}/book/@${mp.mem_id}/${fp.book_no}"><span class="profile_book_color"
														>Book</span></a>
													</c:if>
												</div>
												<a href="${pageContext.request.contextPath}/@${mp.mem_id}/${fp.bo_no}"> 
											<strong class="pf_bo_title">${fp.bo_title}</strong> 
											<%-- <em class="profile_font_size">${fp.bo_subtitle}</em>--%>
											<div class="article_cont">${fp.bo_cont}</div>
											<div>
													<c:set var="img" value="${fp.bo_thumbnail}" />
													<c:if test="${!empty img}">
														<img class="profile_post_img" alt="이미지 정보"
															src="${fp.bo_thumbnail}">
													</c:if>
													<c:if test="${empty img}"></c:if>
											</div>
											</a>
										</div> <span class="pf_post_date">${fp.bo_date}</span>
									</li>
								</c:if>
								<%-- 자신의 아이디로 로그인시 --%>
								<c:if test="${ m.mem_id == mp.mem_id}">
									<li class="profile_articles scrolling" data-no="${mp.mem_no}/${fp.bo_no}/${status.count}">
											<div>
												<div class="profile_article_main">
													<c:if test="${fp.bo_lock == 0 && fp.book_no eq 0 }"> <%-- 0 = 비공개 --%>
												<img class="private lock" src="${pageContext.request.contextPath}/resources/img/lock.png" data-no="${fp.bo_no}" data-disabled="false" />
													</c:if>
													<c:if test="${fp.bo_lock == 1 && fp.book_no eq 0 }"> <%-- 1 = 공개 --%>
												<img class="private unlock" src="${pageContext.request.contextPath}/resources/img/unlock.png" data-no="${fp.bo_no}" data-disabled="false" />
											</c:if>
												         <a href="${pageContext.request.contextPath}/category/${fp.cat_name}"
															class="profile_cat_color">${fp.cat_name}</a>
													<c:if test="${fp.book_no ne 0}">
														<a href="${pageContext.request.contextPath}/book/@${mp.mem_id}/${fp.book_no}"><span class="profile_book_color"
														>Book</span></a>
													</c:if>
													</div>
												<a href="${pageContext.request.contextPath}/@${mp.mem_id}/${fp.bo_no}"> 
											<strong class="pf_bo_title">${fp.bo_title}</strong> 
											<div class="article_cont">
											<%-- <em class="profile_font_size">${fp.bo_subtitle}</em>--%>
											${fp.bo_cont}
											</div>
											<div>
													<c:set var="img" value="${fp.bo_thumbnail}" />
													<c:if test="${!empty img}">
														<img class="profile_post_img" alt="이미지 정보"
															src="${fp.bo_thumbnail}"></c:if>
													<c:if test="${empty img}"></c:if>
											</div>
											</a>
										</div> <span class="pf_post_date">${fp.bo_date}</span>
									</li>
								</c:if>
								</c:if>
						</c:forEach>
						</c:if>
					</ul>
				</div>
			</div>
			<div id="Magazine" style="display: none;">
				<h3 class="hide_font">매거진</h3>
				<%-- 공감과 추천한 숫자를 지정 --%>
				<div id="" class="Magazine_list jm_list ">
					<c:if test="${empty mybook}">
				<div class="profile_none m_right"> 완성된 작품이 없습니다 </div>
					</c:if>
					<c:if test="${!empty mybook}">
				<c:forEach var="mb" items="${mybook}" varStatus="status">
				<c:if test="${!empty mb.bookVO.book_no}">
						<div class="box_contents bookList" data-no="${mp.mem_no}/${mb.bookVO.book_no}/${status.count}">
								<div class="cover_book">
								<a href="${pageContext.request.contextPath}/book/@${mp.mem_id}/${mb.bookVO.book_no}">
								<c:set var="img" value="${mb.bookVO.book_cover}" />
								<c:if test="${not empty img }">
									<img class="cover_img" src="${img}">
								</c:if>
								<c:if test="${empty img }">
									<img class="cover_img" src="${pageContext.request.contextPath}/resources/img/book_cover.jpg" >	
								</c:if>
								<div class="info_cover">
									<strong class="tit_cover">${mb.bookVO.book_name}</strong> <span>by ${mp.mem_nickname}</span>
								</div>
								<span class="book_line"></span>
							</a>
						</div>
						<strong class="profile_cat_color">${mb.bookVO.cat_name}</strong> 
						<strong class="pf_date">${mb.bookVO.book_date}</strong>
						<div>
						<div class="j_list_info">
								<img class="relate" src="${pageContext.request.contextPath}/resources/img/heart.png"/>
							<span class="box_contents_num">${mb.bookVO.book_recommend}</span>
						</div>
						</div>
						</div>
					</c:if>
					</c:forEach>
					</c:if>
				</div>
			</div>
		</div>
	</div>
	</div>
	</main>
	</div>
</body>
</html>
<%@include file="../include/footer.jsp" %>