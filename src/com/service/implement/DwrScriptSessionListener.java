package com.service.implement;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.directwebremoting.ScriptSession;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.event.ScriptSessionEvent;
import org.directwebremoting.event.ScriptSessionListener;

/**
 * 扩展ScriptSessionManager WebChat
 * 
 * @author lianghao
 * @version 2013-12-31
 */

public class DwrScriptSessionListener implements ScriptSessionListener {
	// 维护一个Map key为session的Id， value为ScriptSession对象
	public static final Map<String, ScriptSession> scriptSessionMap = new HashMap<String, ScriptSession>();
	final String OP_ID = "USER_ID"; //用户id标识
	/**
	 * ScriptSession创建事件 event 事件参数
	 */
	public void sessionCreated(ScriptSessionEvent event) {
		Date date=new Date();
		WebContext webContext = WebContextFactory.get();
		HttpSession session = webContext.getSession();// 获取用户session
		ScriptSession scriptsession = event.getSession();// 获取客户端scriptsession
		String userId = (String) session.getAttribute("USER_ID"); // 获取用户ID
		if (userId == null) {
           // scriptsession.invalidate();//使scriptsession失效
			session.invalidate();    //使session失效
			return;
		} else {
			scriptsession.setAttribute(OP_ID, userId);// 此处将userId和scriptSession绑定
		}
		scriptSessionMap.put(session.getId(), scriptsession); // 添加scriptSession
		System.out.println("session: " + session.getId() + " scriptSession: " + scriptsession.getId() + "is created!"+date.toString());
	}

	/**
	 * ScriptSession销毁事件
	 */
	public void sessionDestroyed(ScriptSessionEvent event) {
		Date date=new Date();
		WebContext webContext = WebContextFactory.get();
		HttpSession session = webContext.getSession();
		scriptSessionMap.remove(session.getId()); // 移除scriptSession
		System.out.println("scriptSession销毁。"+date.toString());
	}

	/**
	 * 获取所有ScriptSession
	 * Collection<ScriptSession>所有ScriptSession
	 */
	public static Collection<ScriptSession> getScriptSessions() {
		return scriptSessionMap.values();
	}

}
