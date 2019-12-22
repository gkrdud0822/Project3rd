package com.jamong.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jamong.dao.BookDAO;
import com.jamong.domain.BoardVO;
import com.jamong.domain.BookVO;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookDAO bookDao;

	@Override
	public List<BoardVO> getBList(String mem_id) {
		return this.bookDao.getBList(mem_id);
	}

	@Override
	public void insertBook(BookVO b) {
		this.bookDao.insertBook(b);
	}
	
	@Transactional
	@Override
	public void book_noUP(String bo_no) {
		BookVO book = new BookVO();
		int book_no = book.getBook_no();
		this.bookDao.book_noSEL(bo_no);
		this.bookDao.book_noUP(book_no);
	}

}
