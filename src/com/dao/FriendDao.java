package com.dao;

import java.util.List;
import java.util.Map;

import com.model.FriendModel;

public interface FriendDao {
	public void acceptfriendapply(FriendModel friend);//接受好友申请。
	public void movefriendgroup(FriendModel friend);//移动好友分组。
	public void delfriend(String USER_ID,String F_FriendID);//删除好友。
	public void editremark(FriendModel friend);//修改备注。
	public void deletefriendgroup(String FG_ID);//删除好友分组。
	public void updatefriendgroupname(String FG_ID,String FG_NAME);//修改好友分组名称。
	public String createfriendgroup(String FG_NAME,String FG_USER_ID);//创建好友分组。
	public boolean isfriend(String USER_ID,String F_FriendID);//是否已经是好友关系。
	public List<Map<String, Object>> searchallusers(String USER_ID);//查找除自己以外的所有用户,按所属实验室/工程中心分组显示。
	public List<Map<String, Object>> displayfriendlist(String USER_ID);//显示好友列表。
	public List<Map<String, Object>> displayfriendgroup(String USER_ID);//显示好友分组。
	public List<Map<String, Object>> displayrecentfriend(String USER_ID);//显示最近联系好友。
	public List<Map<String, Object>> displayfriendlist(String USER_ID,String FG_ID);//获取一个分组下的好友。
}
