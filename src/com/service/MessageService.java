package com.service;

import java.util.List;
import java.util.Map;

import com.model.MessageModel;

public interface MessageService {
	public void addmessage(MessageModel messagemodel);//向数据库存入一条未发送信息。
	public void confirmmessage(String USER_ID);//确认信息已收到。
	public void deleteoldmessage();//删除30天前的聊天消息。
	public List<Map<String, Object>> getmessagetoreceive(String USER_ID);//获取该用户待接收的聊天信息。
	public List<Map<String, Object>> getallmessage(String USER_ID);//获取该用户的所有聊天信息。
	public List<Map<String, Object>> getrecentmessage(String USER_ID,String FRIEND_ID);//获取最近30天的一对一聊天消息。
	public List<Map<String, Object>> getrecentgroupmessage(String G_ID);//获取最近30天的群聊天消息。
	public String textfilter(String content);//过滤聊天文本信息。
}
