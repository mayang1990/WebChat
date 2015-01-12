package com.service.implement;

import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessionFilter;

public class DwrScriptSessionFilter implements ScriptSessionFilter {
	private String userid; // uerid
	public DwrScriptSessionFilter(String userid) {
		this.userid = userid;
	}

	/*
	 * 比较函数 (non-Javadoc)
	 * 
	 * @see
	 * org.directwebremoting.ScriptSessionFilter#match(org.directwebremoting
	 * .ScriptSession)
	 */
	public boolean match(ScriptSession session) {
		Object check = session.getAttribute("USER_ID");
		if (check == null)
			return false;
		else {
			return check.equals(userid);
		}
	}
}
