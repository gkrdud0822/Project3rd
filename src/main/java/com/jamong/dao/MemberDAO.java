package com.jamong.dao;

import com.jamong.domain.MemberVO;

public interface MemberDAO {

	void insertMember(MemberVO m);
	MemberVO idCheck(String id);

}
