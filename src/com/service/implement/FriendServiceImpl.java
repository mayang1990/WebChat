package com.service.implement;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.FriendDao;
import com.model.FriendModel;
import com.service.FriendService;
@Service
public class FriendServiceImpl implements FriendService {
	@Autowired
	private FriendDao frienddao;

	@Override
	public void delfriend(String USER_ID, String F_FriendID) {
		frienddao.delfriend(USER_ID, F_FriendID);
		
	}//删除好友。

	@Override
	public List<Map<String, Object>> searchallusers(String USER_ID) {
		return frienddao.searchallusers(USER_ID);
	}//查找除自己以外的所有用户,按所属实验室/工程中心分组显示。

	@Override
	public void movefriendgroup(FriendModel friend) {
		frienddao.movefriendgroup(friend);
	}//移动好友分组。

	@Override
	public boolean isfriend(String USER_ID, String F_FriendID) {
		return frienddao.isfriend(USER_ID, F_FriendID);
	}//是否已经是好友关系。

	@Override
	public List<Map<String, Object>> displayfriendlist(String USER_ID) {
		return frienddao.displayfriendlist(USER_ID);
	}//显示好友列表。

	@Override
	public void acceptfriendapply(FriendModel friend) {
		frienddao.acceptfriendapply(friend);
	}//接受好友申请。

	@Override
	public String createfriendgroup(String FG_NAME, String FG_USER_ID) {
		return frienddao.createfriendgroup(FG_NAME, FG_USER_ID);
	}//创建好友分组。

	@Override
	public void editremark(FriendModel friend) {
		frienddao.editremark(friend);
	}//修改备注。

	@Override
	public void deletefriendgroup(String FG_ID) {
		frienddao.deletefriendgroup(FG_ID);
	}//删除好友分组。

	@Override
	public void updatefriendgroupname(String FG_ID, String FG_NAME) {
		frienddao.updatefriendgroupname(FG_ID, FG_NAME);
	}//修改好友分组名称。

	@Override
	public List<Map<String, Object>> displayfriendgroup(String USER_ID) {
		return frienddao.displayfriendgroup(USER_ID);
	}//显示好友分组。

	@Override
	public List<Map<String, Object>> displayrecentfriend(String USER_ID) {
		return frienddao.displayrecentfriend(USER_ID);
	}//显示最近联系好友。

	@Override
	public List<Map<String, Object>> displayfriendlist(String USER_ID,
			String FG_ID) {
		return frienddao.displayfriendlist(USER_ID, FG_ID);
	}//获取一个分组下的好友。

}
