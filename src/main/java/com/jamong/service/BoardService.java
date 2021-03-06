package com.jamong.service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import com.jamong.domain.BoardVO;
import com.jamong.domain.MemberVO;

public interface BoardService {

	void insertBoard(HashMap<String, Object> bm, int mem_no);
	BoardVO getUserBoardCont(int bo_no,int mem_no);
	List<BoardVO> getListAll(BoardVO b);
	List<BoardVO> getProfile(HashMap<String, Object> profileMap);
	BoardVO getNextBoardCont(HashMap<String, Object> bm);
	BoardVO getPreBoardCont(HashMap<String, Object> bm);
	List<BoardVO> recomArticle();
	int sympathyUp(BoardVO bo);
	int sympathyDown(BoardVO bo);
	int switchBoardLock(BoardVO bo);
	void adminArticleDelete(int bo_no, int mem_no, int state);
	int boardBan(BoardVO bo);
	void articleDelete(int bo_no, int mem_no);
	void updateBoard(HashMap<String, Object> bm);
	List<BoardVO> bestList();
	List<BoardVO> getSearchPost(HashMap<String, Object> searchMap);
	List<BoardVO> getSearchScrollPost(HashMap<String, Object> searchMap);
	List<BoardVO> infinitiScrollDown(int bo_no);
	List<BoardVO> getUserBoardCatArticle(String cat_name);
	List<BoardVO> categoryArticle(String cat_name);
	List<BoardVO> getUserBoardContList(BoardVO bo);
	List<BoardVO> profileScroll(HashMap<String, Object> scroll);
	List<BoardVO> chartArticleState();
	List<BoardVO> chartArticleCategory();
	List<BoardVO> chartArticleCount();

}
