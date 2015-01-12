package com.dao;

import java.util.List;
import java.util.Map;

import com.model.NoticeModel;

public interface NoticeDao {
	public String addnotice(NoticeModel notice);//添加一条通知。
	public void delnotice(String NT_ID);//删除一条通知。
	public void updatestatus(String NT_ID);//设置通知的的状态为已读。
	public List<Map<String, Object>> getnotice(String USER_ID);//获取该用户的未读通知.
	public List<Map<String, Object>> getallnotice(String USER_ID);//获取该用户的所有通知。
	public List<Map<String, Object>> getoldnotice();//获取30天前的通知。
}
