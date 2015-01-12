package com.service;

import java.util.List;
import java.util.Map;

import com.model.UserModel;

public interface UserService {
    public String login(UserModel users);//用户登录。
    public List<Map<String, Object>> search(UserModel users);//按条件查找用户。
    public String changepassword(String USER_ID,String U_Pwd1,String U_Pwd2);//修改密码。
    public void resetpassword(String USER_ID,String U_Pwd);//重置密码，用于用户忘记密码时。
    public List<Map<String, Object>> getuser(String USER_ID);//提取某个用户的所有信息。
    public void lastonline(String USER_ID);//更新用户的最后在线时间。
    public void refreshuser();//更新用户在线离线状态。
    public void updateonlinetime(String USER_ID);//更新用户的累计在线时间。
}
