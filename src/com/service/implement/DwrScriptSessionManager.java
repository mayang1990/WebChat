package com.service.implement;



import org.directwebremoting.impl.DefaultScriptSessionManager;

import com.service.implement.DwrScriptSessionListener;

/**
 * 扩展默认的ScriptSession管理
 * @author lianghao
 * @version 2013-12-31
 */
public class DwrScriptSessionManager extends DefaultScriptSessionManager {
	public DwrScriptSessionManager() {
		// 绑定一个自定义ScriptSession事件的监听器
		try {
			this.addScriptSessionListener(new DwrScriptSessionListener());
			System.out.println("bind DWRScriptSessionListener");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
