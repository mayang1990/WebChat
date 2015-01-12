package com.model;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject 
public class MessageModel {
	private String MSG_ID;
	private String MSG_CONTENT;
	private String MSG_SENDER;
	private String MSG_RECEIVER;
	private String MSG_STATUS;
	private String MSG_DATE;
	private String MSG_ISGROUPMSG;
	private String MSG_G_ID;
	private String MSG_SENDERNAME;
	private String MSG_RECEIVERNAME;
	private String MSG_G_NAME;
	public String getMSG_ID() {
		return MSG_ID;
	}
	public void setMSG_ID(String mSG_ID) {
		MSG_ID = mSG_ID;
	}
	public String getMSG_CONTENT() {
		return MSG_CONTENT;
	}
	public void setMSG_CONTENT(String mSG_CONTENT) {
		MSG_CONTENT = mSG_CONTENT;
	}
	public String getMSG_SENDER() {
		return MSG_SENDER;
	}
	public void setMSG_SENDER(String mSG_SENDER) {
		MSG_SENDER = mSG_SENDER;
	}
	public String getMSG_RECEIVER() {
		return MSG_RECEIVER;
	}
	public void setMSG_RECEIVER(String mSG_RECEIVER) {
		MSG_RECEIVER = mSG_RECEIVER;
	}
	public String getMSG_STATUS() {
		return MSG_STATUS;
	}
	public void setMSG_STATUS(String mSG_STATUS) {
		MSG_STATUS = mSG_STATUS;
	}
	public String getMSG_DATE() {
		return MSG_DATE;
	}
	public void setMSG_DATE(String mSG_DATE) {
		MSG_DATE = mSG_DATE;
	}
	public String getMSG_ISGROUPMSG() {
		return MSG_ISGROUPMSG;
	}
	public void setMSG_ISGROUPMSG(String mSG_ISGROUPMSG) {
		MSG_ISGROUPMSG = mSG_ISGROUPMSG;
	}
	public String getMSG_G_ID() {
		return MSG_G_ID;
	}
	public void setMSG_G_ID(String mSG_G_ID) {
		MSG_G_ID = mSG_G_ID;
	}
	public String getMSG_SENDERNAME() {
		return MSG_SENDERNAME;
	}
	public void setMSG_SENDERNAME(String mSG_SENDERNAME) {
		MSG_SENDERNAME = mSG_SENDERNAME;
	}
	public String getMSG_RECEIVERNAME() {
		return MSG_RECEIVERNAME;
	}
	public void setMSG_RECEIVERNAME(String mSG_RECEIVERNAME) {
		MSG_RECEIVERNAME = mSG_RECEIVERNAME;
	}
	public String getMSG_G_NAME() {
		return MSG_G_NAME;
	}
	public void setMSG_G_NAME(String mSG_G_NAME) {
		MSG_G_NAME = mSG_G_NAME;
	}
}
