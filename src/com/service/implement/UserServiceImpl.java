package com.service.implement;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.UserDao;
import com.model.UserModel;
import com.service.MD5Service;
import com.service.UserService;
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userdao;
	@Autowired
	private MD5Service md5Service;

	@Override
	public String login(UserModel users) {
		users.setU_Pwd(md5Service.GetMD5Code(users.getU_Pwd()));
		return userdao.login(users);
	}//用户登录。

	@Override
	public List<Map<String, Object>> search(UserModel users) {
		return userdao.searchusers(users);
	}//按条件查找用户。

	@Override
	public String changepassword(String USER_ID, String U_Pwd1, String U_Pwd2) {
		UserModel users=new UserModel();
		users.setUSER_ID(USER_ID);
		users.setU_Pwd(md5Service.GetMD5Code(U_Pwd1));
		
		if (userdao.login(users).equals("success")) {
			userdao.changeU_Pwd(USER_ID, md5Service.GetMD5Code(U_Pwd2));
			return "success";
		} else {
			return "passworderror";
		}
	}//修改密码。

	@Override
	public void resetpassword(String USER_ID, String U_Pwd) {
		userdao.changeU_Pwd(USER_ID, md5Service.GetMD5Code(U_Pwd));
		
	}//重置密码，用于用户忘记密码时。

	@Override
	public List<Map<String, Object>> getuser(String USER_ID) {
		return userdao.getuser(USER_ID);
	}

	@Override
	public void lastonline(String USER_ID) {
		userdao.lastonline(USER_ID);
	}//更新用户的最后在线时间。

	@Override
	public void refreshuser() {
		List<Map<String, Object>> list=userdao.findoffline();
		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map=list.get(i);
			userdao.logout(map.get("USER_ID").toString());
			userdao.updateonlinetime(map.get("USER_ID").toString());
		}
		
		list=userdao.findonline();
		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map=list.get(i);
			userdao.login(map.get("USER_ID").toString());
		}
	}//更新用户离线状态。

	@Override
	public void updateonlinetime(String USER_ID) {
		userdao.updateonlinetime(USER_ID);
	}//更新用户的累计在线时间。

}
