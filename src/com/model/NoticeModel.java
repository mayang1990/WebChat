package com.model;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject
public class NoticeModel {
	private String NT_ID;
	private String NT_SENDER;
	private String NT_RECEIVER;
	private String NT_SENDERNAME;
	private String NT_RECEIVERNAME;
	private String NT_G_ID;
	private String NT_G_NAME;
	private String NT_VERIFY;
	private String NT_DATE;
	private String NT_TYPE;
	private String NT_STATUS;
	public String getNT_ID() {
		return NT_ID;
	}
	public void setNT_ID(String nT_ID) {
		NT_ID = nT_ID;
	}
	public String getNT_SENDER() {
		return NT_SENDER;
	}
	public void setNT_SENDER(String nT_SENDER) {
		NT_SENDER = nT_SENDER;
	}
	public String getNT_RECEIVER() {
		return NT_RECEIVER;
	}
	public void setNT_RECEIVER(String nT_RECEIVER) {
		NT_RECEIVER = nT_RECEIVER;
	}
	public String getNT_SENDERNAME() {
		return NT_SENDERNAME;
	}
	public void setNT_SENDERNAME(String nT_SENDERNAME) {
		NT_SENDERNAME = nT_SENDERNAME;
	}
	public String getNT_RECEIVERNAME() {
		return NT_RECEIVERNAME;
	}
	public void setNT_RECEIVERNAME(String nT_RECEIVERNAME) {
		NT_RECEIVERNAME = nT_RECEIVERNAME;
	}
	public String getNT_G_ID() {
		return NT_G_ID;
	}
	public void setNT_G_ID(String nT_G_ID) {
		NT_G_ID = nT_G_ID;
	}
	public String getNT_G_NAME() {
		return NT_G_NAME;
	}
	public void setNT_G_NAME(String nT_G_NAME) {
		NT_G_NAME = nT_G_NAME;
	}
	public String getNT_VERIFY() {
		return NT_VERIFY;
	}
	public void setNT_VERIFY(String nT_VERIFY) {
		NT_VERIFY = nT_VERIFY;
	}
	public String getNT_DATE() {
		return NT_DATE;
	}
	public void setNT_DATE(String nT_DATE) {
		NT_DATE = nT_DATE;
	}
	public String getNT_TYPE() {
		return NT_TYPE;
	}
	public void setNT_TYPE(String nT_TYPE) {
		NT_TYPE = nT_TYPE;
	}
	public String getNT_STATUS() {
		return NT_STATUS;
	}
	public void setNT_STATUS(String nT_STATUS) {
		NT_STATUS = nT_STATUS;
	}
}
