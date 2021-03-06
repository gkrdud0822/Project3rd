package com.jamong.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jamong.domain.FeedVO;
import com.jamong.domain.MemberVO;
import com.jamong.domain.SympathyVO;

public interface FeedService {

	List<FeedVO> getUserFeedList(int mem_no);
	void feedStateUp(int feed_no);
	int feedCount(int sMem_no);
	void feedDelete(int feed_no);

}
