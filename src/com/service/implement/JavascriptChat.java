package com.service.implement;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.directwebremoting.Browser;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessions;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;

import com.model.FileModel;
import com.model.MessageModel;
import com.model.NoticeModel;
import com.model.VideoMessageModel;
import com.service.GroupService;
import com.service.MessageService;

@RemoteProxy(name = "JavascriptChat")
public class JavascriptChat {
	@Autowired
	HttpServletRequest request;
	@Autowired
	MessageService messageservice;
	@Autowired
	GroupService groupservice;

	public JavascriptChat() {
	}

	/**
	 * @param text
	 *            添加新的消息文本给所有
	 */
	@RemoteMethod
	public void addMessage(String text) {
		final LinkedList<MessageModel> messages = new LinkedList<MessageModel>();
		ScriptBuffer script = new ScriptBuffer();
		script.appendScript("receiveMessages(").appendData(messages).appendScript(");");

		if (text != null && text.trim().length() > 0) {
			// messages.addFirst(new Message(text,"sdfsd"));
			while (messages.size() > 10000) {
				messages.removeLast();
			}
		}

		Browser.withCurrentPage(new Runnable() {
			public void run() {
				ScriptSessions.addFunctionCall("receiveMessages", messages);
			}
		});
	}

	/**
	 * 发送系统消息
	 */
	public void sendSysMessage() {
		final LinkedList<MessageModel> messages = new LinkedList<MessageModel>();
		ScriptBuffer script = new ScriptBuffer();
		script.appendScript("receiveMessages(").appendData(messages).appendScript(");");
		Browser.withCurrentPage(new Runnable() {
			public void run() {
				ScriptSessions.addFunctionCall("SysMessages", messages);
			}
		});
	}

	/**
	 * 发送私聊消息
	 * 
	 * @param content
	 *            消息内容
	 */
	@RemoteMethod
	public void sendMessageAuto(final String content, String UserId,String username, String dateString) {
		long lstart1 = System.currentTimeMillis();
		final LinkedList<MessageModel> messages = new LinkedList<MessageModel>();
		HttpSession session = request.getSession(false);
		MessageModel message = new MessageModel();
		message.setMSG_SENDER(session.getAttribute("USER_ID").toString());
		message.setMSG_RECEIVER(UserId);
		message.setMSG_CONTENT(messageservice.textfilter(content));
		message.setMSG_ISGROUPMSG("0");
		message.setMSG_G_ID("");
		message.setMSG_G_NAME("");
		message.setMSG_DATE(dateString);
		message.setMSG_SENDERNAME(session.getAttribute("USER_NAME").toString());
		message.setMSG_RECEIVERNAME(username);
		messageservice.addmessage(message);
		messages.add(0, message);

		DwrScriptSessionFilter filter = new DwrScriptSessionFilter(UserId);// 过滤器
		Runnable run = new Runnable() {
			ScriptBuffer script = new ScriptBuffer();
			public void run() {
				script.appendScript("im_receiveMessages(").appendData(messages).appendScript(");");
				// 得到所有ScriptSession
				Collection<ScriptSession> sessions = Browser.getTargetSessions();
				// 遍历每一个ScriptSession
				for (ScriptSession scriptSession : sessions) {
					scriptSession.addScript(script);
				}
			}
		};
		// 执行推送
		Browser.withAllSessionsFiltered(filter, run); // 注意这里调用了有filter功能的方法
		long lend1 = System.currentTimeMillis();
		long time = (lend1 - lstart1);
		System.out.println("总时间："+time);
	}

	/**
	 * 收到消息后发送确认
	 * 
	 * @param MSG_ID
	 *            消息ID
	 */
	@RemoteMethod
	public void confirmmessage() {
		HttpSession session = request.getSession(false);
		messageservice.confirmmessage(session.getAttribute("USER_ID").toString());
	}

	/**
	 * 发送群聊消息
	 * 
	 * @param G_ID
	 *            群ID
	 * @param content
	 *            消息内容
	 */
	@RemoteMethod
	public void sendGroupMessage(final String content, String G_ID,String groupname, String dateString) {
		HttpSession session = request.getSession(false);
		MessageModel msg = new MessageModel();
		msg.setMSG_SENDER(session.getAttribute("USER_ID").toString());
		msg.setMSG_RECEIVER("");
		msg.setMSG_CONTENT(messageservice.textfilter(content));
		msg.setMSG_ISGROUPMSG("1");
		msg.setMSG_G_ID(G_ID);
		msg.setMSG_DATE(dateString);
		msg.setMSG_SENDERNAME(session.getAttribute("USER_NAME").toString());
		msg.setMSG_RECEIVERNAME("");
		msg.setMSG_G_NAME(groupname);
		messageservice.addmessage(msg);

		List<Map<String, Object>> list = groupservice.getgroup(G_ID);
		for (int i = 0; i < list.size(); i++) {
			Map<String, Object> map = list.get(i);
			if (!map.get("GM_USER_ID").toString().equals(session.getAttribute("USER_ID").toString())) {
				MessageModel message = new MessageModel();
				message.setMSG_SENDER(session.getAttribute("USER_ID").toString());
				message.setMSG_SENDERNAME(session.getAttribute("USER_NAME").toString());
				message.setMSG_RECEIVER(map.get("GM_USER_ID").toString());
				message.setMSG_CONTENT(messageservice.textfilter(content));
				message.setMSG_ISGROUPMSG("1");
				message.setMSG_G_ID(G_ID);
				message.setMSG_DATE(dateString);
				message.setMSG_G_NAME(groupname);
				final LinkedList<MessageModel> messages = new LinkedList<MessageModel>();
				messages.add(0, message);
				pushmessages(messages, map.get("GM_USER_ID").toString());
			}

		}
	}

	// 发送文件名，url等信息，供对方下载。。
	public void sendFile(FileModel file) {
		System.out.print("发送文件……………………………………………………………………………………………");
		final LinkedList<FileModel> files = new LinkedList<FileModel>();
		files.add(0, file);
		DwrScriptSessionFilter filter = new DwrScriptSessionFilter(file.getFL_RECEIVER());
		Runnable run = new Runnable() {
			ScriptBuffer script = new ScriptBuffer();
			public void run() {
				script.appendScript("im_receivefileinfo(").appendData(files).appendScript(");");
				Collection<ScriptSession> sessions = Browser.getTargetSessions();
				for (ScriptSession scriptSession : sessions) {
					scriptSession.addScript(script);
				}
			}
		};
		Browser.withAllSessionsFiltered(filter, run);
	}

	// 向群用户推送消息。
	public void pushmessages(final LinkedList<MessageModel> messages,
			String USER_ID) {
		DwrScriptSessionFilter filter = new DwrScriptSessionFilter(USER_ID);
		Runnable run = new Runnable() {
			ScriptBuffer script = new ScriptBuffer();
			public void run() {
				script.appendScript("im_receiveGroupMessages(").appendData(messages).appendScript(");");
				Collection<ScriptSession> sessions = Browser.getTargetSessions();
				for (ScriptSession scriptSession : sessions) {
					scriptSession.addScript(script);
				}
			}
		};
		Browser.withAllSessionsFiltered(filter, run);
	}

	// 向群用户推送通知。
	public void sendnotice(NoticeModel notice) {
		final LinkedList<NoticeModel> notices=new LinkedList<NoticeModel>();
		notices.add(0, notice);
		DwrScriptSessionFilter filter = new DwrScriptSessionFilter(notice.getNT_RECEIVER());
		Runnable run = new Runnable() {
			ScriptBuffer script = new ScriptBuffer();
			public void run() {
				script.appendScript("im_receivenotice(").appendData(notices).appendScript(");");
				Collection<ScriptSession> sessions = Browser.getTargetSessions();
				for (ScriptSession scriptSession : sessions) {
					scriptSession.addScript(script);
				}
			}
		};
		Browser.withAllSessionsFiltered(filter, run);
	}
	
	//推送视频邀请。
	@RemoteMethod
	public void invitevideochat(final String friendid){
		HttpSession session = request.getSession(false);
		final VideoMessageModel videomsg=new VideoMessageModel();
		videomsg.setSENDER(session.getAttribute("USER_ID").toString());
		videomsg.setSENDERNAME(session.getAttribute("USER_NAME").toString());
		videomsg.setRECEIVER(friendid);
		videomsg.setCONTENT("invitevideochat");
		DwrScriptSessionFilter filter = new DwrScriptSessionFilter(friendid);
		Runnable run = new Runnable(){
			ScriptBuffer script = new ScriptBuffer();
			public void run() {
				script.appendScript("im_receivevideoinvite(").appendData(videomsg).appendScript(");");
				Collection<ScriptSession> sessions = Browser.getTargetSessions();
				for (ScriptSession scriptSession : sessions) {
					scriptSession.addScript(script);
				}
			}
		};
		Browser.withAllSessionsFiltered(filter, run);
	}
	
	//回复视频邀请。
	@RemoteMethod
	public void replyvideochat(final String friendid,final String content){
		HttpSession session = request.getSession(false);
		final VideoMessageModel videomsg=new VideoMessageModel();
		videomsg.setSENDER(session.getAttribute("USER_ID").toString());
		videomsg.setSENDERNAME(session.getAttribute("USER_NAME").toString());
		videomsg.setRECEIVER(friendid);
		videomsg.setCONTENT(content);
		DwrScriptSessionFilter filter = new DwrScriptSessionFilter(friendid);
		Runnable run = new Runnable(){
			ScriptBuffer script = new ScriptBuffer();
			public void run() {
				script.appendScript("im_receivevideochatreply(").appendData(videomsg).appendScript(");");
				Collection<ScriptSession> sessions = Browser.getTargetSessions();
				for (ScriptSession scriptSession : sessions) {
					scriptSession.addScript(script);
				}
			}
		};
		Browser.withAllSessionsFiltered(filter, run);
	}
}
