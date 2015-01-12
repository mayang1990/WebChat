package com.service.implement;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.GroupDao;
import com.dao.UserDao;
import com.model.GroupMemberModel;
import com.model.GroupModel;
import com.model.UserModel;
import com.service.GroupService;
@Service
public class GroupServiceImpl implements GroupService {
	@Autowired
	private GroupDao groupdao;
	@Autowired
	private UserDao usersdao;

	@Override
	public void delgroup(String G_ID) {
		groupdao.delgroup(G_ID);
		
	}//删除群。

	@Override
	public List<Map<String, Object>> getgroup(String G_ID) {
		return groupdao.getgroup(G_ID);
	}//获取一个群的所有信息。

	@Override
	public List<Map<String, Object>> displayalluser() {
		UserModel user=new UserModel();
		return usersdao.searchusers(user);
	}//查找所有用户，用于新建群。

	@Override
	public List<Map<String, Object>> displayalluser(String USER_ID,String G_ID) {
		return groupdao.displayalluser(USER_ID,G_ID);
	}//查找除当前群之外的所有用户，用于原有群邀请用户。

	@Override
	public List<Map<String, Object>> displaygroup(String USER_ID) {
		return groupdao.displaygroup(USER_ID);
	}//显示该用户参加的所有群。

	@Override
	public void delmember(String G_ID,String USER_ID) {
		groupdao.delmember(G_ID,USER_ID);
	}//在群中删除一个用户。

	@Override
	public List<Map<String, Object>> displayuser(String G_ID) {
		return groupdao.displayuser(G_ID);
	}//显示群中的所有用户。

	@Override
	public String creategroup(GroupModel group) {
		return groupdao.creategroup(group);
	}//创建群。

	@Override
	public void addmember(GroupMemberModel groupmember) {
		groupdao.addmember(groupmember);
	}//添加群成员。

	@Override
	public List<Map<String, Object>> getgroupmember(GroupMemberModel groupmember) {
		return groupdao.getgroupmember(groupmember);
	}//获取群成员信息。

	@Override
	public List<Map<String, Object>> searchgroup(GroupModel group) {
		return groupdao.searchgroup(group);
	}//搜索群。

	@Override
	public List<Map<String, Object>> displayrecentgroup(String USER_ID) {
		return groupdao.displayrecentgroup(USER_ID);
	}//显示最近联系群。

	@Override
	public List<Map<String, Object>> getfriendtoinvite(String USER_ID,
			String G_ID) {
		return groupdao.getfriendtoinvite(USER_ID, G_ID);
	}//获取不在群中的好友，用于邀请好友加入群。

	@Override
	public void editgroup(GroupModel group) {
		if ((group.getG_NAME().trim().length()!=0)&&(group.getG_TYPE().trim().length()!=0)&&(group.getG_LY().trim().length()!=0)) {
			groupdao.editgroup(group);
		}
	}//编辑群信息。

}
