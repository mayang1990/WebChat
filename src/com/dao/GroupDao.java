package com.dao;

import java.util.List;
import java.util.Map;

import com.model.GroupMemberModel;
import com.model.GroupModel;

public interface GroupDao {
	public String creategroup(GroupModel group);//创建群。
	public void addmember(GroupMemberModel groupmember);//添加成员。
	public void delgroup(String G_ID);//删除群。
	public void delmember(String G_ID,String USER_ID);//删除成员。
	public void editgroup(GroupModel group);//编辑群信息。
	public List<Map<String, Object>> getgroup(String G_ID);//获取一个群的所有信息。
	public List<Map<String, Object>> getgroupmember(GroupMemberModel groupmember);//获取群成员信息。
	public List<Map<String, Object>> displayalluser(String USER_ID,String G_ID);//查找除当前群之外的所有用户，用于原有群邀请用户。
	public List<Map<String, Object>> displaygroup(String USER_ID);//显示该用户的所有群。
	public List<Map<String, Object>> displayuser(String G_ID);//显示群中的所有用户。
	public List<Map<String, Object>> searchgroup(GroupModel group);//搜索群。
	public List<Map<String, Object>> displayrecentgroup(String USER_ID);//显示最近联系群。
	public List<Map<String, Object>> getfriendtoinvite(String USER_ID,String G_ID);//获取不在群中的好友，用于邀请好友加入群。
}
