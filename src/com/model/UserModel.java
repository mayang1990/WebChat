package com.model;

public class UserModel {
	private String ID;
	private String USER_ID;
	private String USER_NAME;
	private String JC_ZC;
	private String JC_ZY;
	private String JC_WORKTYPE_GCZX;
	private String JC_WORKTYPE_SYS;
	private String USER_BZ;
	private String USER_GENDER;
	private String U_Pwd;
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getUSER_ID() {
		return USER_ID;
	}
	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}
	public String getUSER_NAME() {
		return USER_NAME;
	}
	public void setUSER_NAME(String uSER_NAME) {
		USER_NAME = uSER_NAME;
	}
	public String getJC_ZC() {
		return JC_ZC;
	}
	public void setJC_ZC(String jC_ZC) {
		JC_ZC = jC_ZC;
	}
	public String getJC_ZY() {
		return JC_ZY;
	}
	public void setJC_ZY(String jC_ZY) {
		JC_ZY = jC_ZY;
	}
	public String getJC_WORKTYPE_GCZX() {
		return JC_WORKTYPE_GCZX;
	}
	public void setJC_WORKTYPE_GCZX(String jC_WORKTYPE_GCZX) {
		JC_WORKTYPE_GCZX = jC_WORKTYPE_GCZX;
	}
	public String getJC_WORKTYPE_SYS() {
		return JC_WORKTYPE_SYS;
	}
	public void setJC_WORKTYPE_SYS(String jC_WORKTYPE_SYS) {
		JC_WORKTYPE_SYS = jC_WORKTYPE_SYS;
	}
	public String getUSER_BZ() {
		if (USER_BZ==null) {
			return "";
		} else {
			return USER_BZ;
		}
	}
	public void setUSER_BZ(String uSER_BZ) {
		USER_BZ = uSER_BZ;
	}
	public String getUSER_GENDER() {
		return USER_GENDER;
	}
	public void setUSER_GENDER(String uSER_GENDER) {
		USER_GENDER = uSER_GENDER;
	}
	public String getU_Pwd() {
		return U_Pwd;
	}
	public void setU_Pwd(String u_Pwd) {
		U_Pwd = u_Pwd;
	}
	
}
