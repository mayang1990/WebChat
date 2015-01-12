package com.service.implement;

import java.util.List;
import java.util.Map;

import org.ansj.domain.Term;
import org.ansj.splitWord.analysis.ToAnalysis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.MessageDao;
import com.model.MessageModel;
import com.service.MessageService;
@Service
public class MessageServiceImpl implements MessageService {
	@Autowired
	private MessageDao messagedao;

	@Override
	public void addmessage(MessageModel messagemodel) {
		messagedao.addmessage(messagemodel);
		
	}//向数据库存入一条未发送信息。

	@Override
	public void confirmmessage(String USER_ID) {
		messagedao.confirmmessage(USER_ID);
		
	}//确认信息已收到。

	@Override
	public List<Map<String, Object>> getmessagetoreceive(String USER_ID) {
		return messagedao.getmessagetoreceive(USER_ID);
	}//获取该用户待接收的聊天信息。

	@Override
	public List<Map<String, Object>> getallmessage(String USER_ID) {
		return messagedao.getallmessage(USER_ID);
	}//获取该用户的所有聊天信息。

	@Override
	public void deleteoldmessage() {
		List<Map<String, Object>> list=messagedao.getoldmessage();
		if (list.size()>0) {
			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map=list.get(i);
				messagedao.deletemessage(map.get("MSG_ID").toString());
			}
			System.out.println("删除聊天消息。"+Integer.toString(list.size()));
		}
	}//删除30天前的聊天消息。

	@Override
	public List<Map<String, Object>> getrecentmessage(String USER_ID,
			String FRIEND_ID) {
		return messagedao.getrecentmessage(USER_ID, FRIEND_ID);
	}//获取最近30天的一对一聊天消息。

	@Override
	public List<Map<String, Object>> getrecentgroupmessage(String G_ID) {
		return messagedao.getrecentgroupmessage(G_ID);
	}//获取最近30天的群聊天消息。

	@Override
	public String textfilter(String content) {
		System.out.println("过滤前："+content);
		long lstart1 = System.currentTimeMillis();
		List<Term> parse = ToAnalysis.parse(content);
		content=parse.toString();
		//System.out.println(content);
		List<Map<String, Object>> list=messagedao.gettextfilter();
		System.out.println("分词后："+content);
		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map=list.get(i);
			content=content.replace(map.get("TF_TEXT").toString(), "*");
		} 
		//去掉头尾括号。
		content=content.substring(1, content.length()-1);
		//结尾补逗号空格。
		content=content+", ";
		int i=0;
		String returnstr="";
		Boolean sign=false;
		while (i<content.length()) {
			//如果遇到了词性标识开始符号“/”.sign=true。
			if ((content.charAt(i)=='/')&&(i>0)) {
				if ((content.charAt(i+3)==' ')||(content.charAt(i+4)==' ')||(content.charAt(i+5)==' ')||(content.charAt(i+6)==' ')||(content.charAt(i+7)==' ')) {
					sign=true;
				}
			}
			//如果sign=true，则寻找词性结束符号结束标识“ ”，找到之后sign=false。
			if (sign==true) {
				if (content.charAt(i-1)==' ') {
					sign=false;
				}
			}
			i=i+1;
			//剔除词性标识。
			if (sign==true) {
				continue;
			}
			returnstr=returnstr+content.charAt(i-1);
		}
		System.out.println("处理英文标点符号前："+returnstr);
		//处理英文标点符号。
		returnstr=returnstr.replace(" , ", " ");
		returnstr=returnstr.replace("=, ", "=");
		returnstr=returnstr.replace("., ", ".");
		returnstr=returnstr.replace(",, ", ",");
		returnstr=returnstr.replace("\", ", "\"");
		returnstr=returnstr.replace("<, ", "<");
		returnstr=returnstr.replace(">, ", ">");
		returnstr=returnstr.replace("!, ", "!");
		returnstr=returnstr.replace("@, ", "@");
		returnstr=returnstr.replace("#, ", "#");
		returnstr=returnstr.replace("$, ", "$");
		returnstr=returnstr.replace("%, ", "%");
		returnstr=returnstr.replace("^, ", "^");
		returnstr=returnstr.replace("&, ", "&");
		returnstr=returnstr.replace("*, ", "*");
		returnstr=returnstr.replace("(, ", "(");
		returnstr=returnstr.replace("), ", ")");
		returnstr=returnstr.replace("+, ", "+");
		returnstr=returnstr.replace("-, ", "-");
		returnstr=returnstr.replace("/, ", "/");
		//System.out.println(returnstr);
		long lend1 = System.currentTimeMillis();
		long time = (lend1 - lstart1);
		System.out.println("过滤时间："+time);
		System.out.println("过滤后："+returnstr);
		return returnstr;
	}//过滤聊天文本信息。

}
