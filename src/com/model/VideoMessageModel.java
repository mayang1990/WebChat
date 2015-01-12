package com.model;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject
public class VideoMessageModel {
	private String SENDER;
	private String SENDERNAME;
	private String RECEIVER;
	private String RECEIVERNAME;
	private String CONTENT;
	public String getSENDER() {
		return SENDER;
	}
	public void setSENDER(String sENDER) {
		SENDER = sENDER;
	}
	public String getSENDERNAME() {
		return SENDERNAME;
	}
	public void setSENDERNAME(String sENDERNAME) {
		SENDERNAME = sENDERNAME;
	}
	public String getRECEIVER() {
		return RECEIVER;
	}
	public void setRECEIVER(String rECEIVER) {
		RECEIVER = rECEIVER;
	}
	public String getRECEIVERNAME() {
		return RECEIVERNAME;
	}
	public void setRECEIVERNAME(String rECEIVERNAME) {
		RECEIVERNAME = rECEIVERNAME;
	}
	public String getCONTENT() {
		return CONTENT;
	}
	public void setCONTENT(String cONTENT) {
		CONTENT = cONTENT;
	}
	
}
