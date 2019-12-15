package com.jamong.controller;

import java.io.File;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.jamong.domain.InquireVO;
import com.jamong.domain.MemberVO;
import com.jamong.service.InquireService;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

@Controller
public class InquireController {

	@Autowired
	private InquireService inqService;
	
	@RequestMapping("inquire")
	public String user_inquire() {
		
		return "jsp/inquire";
	}
	
	/* cos.jar를 활용한 첨부파일 추가 방법 */
	/* 문의하기 보내기 */
	@RequestMapping("inquire_ok")
	public ModelAndView user_inquire_ok(InquireVO i,
			HttpServletRequest request,
			HttpServletResponse response,
			HttpSession session)
	throws Exception {
		
		session=request.getSession();
		
		MemberVO user=(MemberVO) session.getAttribute("m");

		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out =response.getWriter();
		
		int maxSize = 10*1024*1024; // 10MB 제한
		String filePath=request.getServletContext().getRealPath("resources/upload/inquire/");
	
		MultipartRequest multi = new MultipartRequest(request, filePath, maxSize, "UTF-8", new DefaultFileRenamePolicy());
		
		
		/* 입력값들을 multi 로부터 가져오는 역할을합니다 */
		
		String inq_item1 = multi.getParameter("inq_item1");
		String inq_email = multi.getParameter("inq_email");
		String inq_phone = multi.getParameter("inq_phone");
		String inq_cont  = multi.getParameter("inq_cont");
		String inq_date  = multi.getParameter("inq_date");


		String inq_state  = multi.getParameter("inq_state");
		
		String fileName1 = multi.getFilesystemName("file_1");
		String fileName2 = multi.getFilesystemName("file_2");
		String fileName3 = multi.getFilesystemName("file_3");
		String fileName4 = multi.getFilesystemName("file_4");
		
		
		String inq_file1 = "/jamong.com/resources/upload/inquire/"+fileName1;
		String inq_file2 = "/jamong.com/resources/upload/inquire/"+fileName2;
		String inq_file3 = "/jamong.com/resources/upload/inquire/"+fileName3;
		String inq_file4 = "/jamong.com/resources/upload/inquire/"+fileName4;
		
		
				
		File UpFile = multi.getFile("inq_file1");
		if(UpFile != null) {//첨부파일이 있는 경우
			String fileName = UpFile.getName();//첨부한 파일명
			
			Calendar c = Calendar.getInstance();
			int year=c.get(Calendar.YEAR);
			int month=c.get(Calendar.MONTH)+1;
			int date=c.get(Calendar.DATE);
			
		
		
			
			
		}
		
		/* 입력한 값들을 InquireVO객체 i에 저장 */
		i.setInq_item1(inq_item1);
		i.setInq_email(inq_email);
		i.setInq_phone(inq_phone);
		i.setInq_cont(inq_cont);
		i.setInq_file1(inq_file1);
		i.setInq_file2(inq_file2);
		i.setInq_file3(inq_file3);
		i.setInq_file4(inq_file4);
		i.setInq_date(inq_date);
		if(user != null) {
			i.setMem_no(user.getMem_no());
		}// if => 세션이 있을때
		
		
		this.inqService.insertInquire(i); //쿼리문 실행 메서드
		
		out.println("<script>");
		out.println("alert('문의가 접수되었습니다!');");
		out.println("location='/jamong.com';");
		out.println("</script>");
		
		return null;
	}
	@RequestMapping("admin_inquire")
	public ModelAndView admin_inquire(InquireVO i,
			HttpServletRequest request,
			HttpServletResponse response,
			HttpSession session)
	throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out =response.getWriter();
		session=request.getSession();
		
		MemberVO adm_m=(MemberVO)session.getAttribute("m");
		
		if(adm_m == null) {
			out.println("<script>");
			out.println("alert('세션이 만료되었습니다. 다시 로그인하세요.');");
			out.println("location='admin_login';");
			out.println("</script>");
		}else {
			int page=1;
			int limit=10;
			if(request.getParameter("page") != null) {
				page=Integer.parseInt(request.getParameter("page"));
			}
			String search_name=request.getParameter("search_name");
			String search_field=request.getParameter("search_field");
			
			i.setSearch_name("%"+search_name+"%");
			i.setSearch_field(search_field);
			
			int listcount=this.inqService.getListCount(i);
			
			i.setStartrow((page-1)*10+1);
			i.setEndrow(i.getStartrow()+limit-1);
			
			List<InquireVO> ilist=this.inqService.getInquireList(i);
			
			int maxpage=(int)((double)listcount/limit+0.95);
			int startpage=(((int)((double)page/10+0.9))-1)*10+1;
			int endpage=maxpage;
			if(endpage>startpage+10-1) endpage=startpage+10-1;
		
			ModelAndView m=new ModelAndView();
			
			m.addObject("ilist",ilist);
			m.addObject("page",page);
			m.addObject("startpage",startpage);
			m.addObject("endpage",endpage);
			m.addObject("maxpage",maxpage);
			m.addObject("search_name",search_name);
			m.addObject("search_field",search_field);
			m.addObject("listcount",listcount);
			
			m.setViewName("jsp/admin_inquire");
			
			return m;
		}	
			return null;
			
		
	}
	@RequestMapping("admin_inquire_info")
	public ModelAndView admin_inquire_info(InquireVO i,int no,
			HttpServletRequest request,
			HttpServletResponse response,
			HttpSession session)
	throws Exception {
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out =response.getWriter();
		session=request.getSession();
	
		MemberVO adm_m=(MemberVO)session.getAttribute("m");	
		
		if(adm_m == null) {
			out.println("<script>");
			out.println("alert('세션이 만료되었습니다. 다시 로그인하세요.');");
			out.println("location='admin_login';");
			out.println("</script>");
		}else {
			int page=1;
			if(request.getParameter("page") != null) page=Integer.parseInt(request.getParameter("page"));
			
			i=this.inqService.getInquireCont(no);
			
			String inq_cont=i.getInq_cont().replace("\n", "<br/>");
			
			ModelAndView m=new ModelAndView();
			
			m.setViewName("jsp/admin_inquire_info");
			
			m.addObject("inq_cont",inq_cont);
			m.addObject("page",page);
			m.addObject("i",i);
			
			return m;
	}
		return null;
	}
}
