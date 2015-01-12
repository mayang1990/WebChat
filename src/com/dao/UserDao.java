package com.dao;

import java.util.List;
import java.util.Map;

import com.model.UserModel;

public interface UserDao {
	public String login(UserModel users);//用户登录。
	public List<Map<String, Object>> getuser(String USER_ID);//提取某个用户的所有信息。
	public List<Map<String, Object>> findAllUsers();//查找所有用户
	public boolean deleteUsers(int USER_ID);//删除用户。
	public boolean changeU_Pwd(String USER_ID, String U_Pwd);//修改密码。
	public List<Map<String, Object>> searchusers(UserModel users);//按条件查找用户。
	public List<Map<String, Object>> findoffline();//根据用户的最后在线时间，查找离线用户。
	public List<Map<String, Object>> findonline();//根据用户的最后在线时间，查找在线用户。
	public void lastonline(String USER_ID);//更新用户的最后在线时间。
	public void logout(String USER_ID);//更新用户离线状态。
	public void login(String USER_ID);//更新用户在线状态。
	public void updateonlinetime(String USER_ID);//更新用户的累计在线时间。
}
