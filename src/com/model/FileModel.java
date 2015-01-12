package com.model;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject
public class FileModel {
	private String FL_ID;
	private String FL_NAME;
	private String FL_URL;
	private String FL_DATE;
	private String FL_SENDER;
	private String FL_RECEIVER;
	private String FL_STATUS;
	private String FL_SENDERNAME;
	private String FL_RECEIVERNAME;
	private String FL_OLDNAME;
	public String getFL_ID() {
		return FL_ID;
	}
	public void setFL_ID(String fL_ID) {
		FL_ID = fL_ID;
	}
	public String getFL_NAME() {
		return FL_NAME;
	}
	public void setFL_NAME(String fL_NAME) {
		FL_NAME = fL_NAME;
	}
	public String getFL_URL() {
		return FL_URL;
	}
	public void setFL_URL(String fL_URL) {
		FL_URL = fL_URL;
	}
	public String getFL_DATE() {
		return FL_DATE;
	}
	public void setFL_DATE(String fL_DATE) {
		FL_DATE = fL_DATE;
	}
	public String getFL_SENDER() {
		return FL_SENDER;
	}
	public void setFL_SENDER(String fL_SENDER) {
		FL_SENDER = fL_SENDER;
	}
	public String getFL_RECEIVER() {
		return FL_RECEIVER;
	}
	public void setFL_RECEIVER(String fL_RECEIVER) {
		FL_RECEIVER = fL_RECEIVER;
	}
	public String getFL_STATUS() {
		return FL_STATUS;
	}
	public void setFL_STATUS(String fL_STATUS) {
		FL_STATUS = fL_STATUS;
	}
	public String getFL_SENDERNAME() {
		return FL_SENDERNAME;
	}
	public void setFL_SENDERNAME(String fL_SENDERNAME) {
		FL_SENDERNAME = fL_SENDERNAME;
	}
	public String getFL_RECEIVERNAME() {
		return FL_RECEIVERNAME;
	}
	public void setFL_RECEIVERNAME(String fL_RECEIVERNAME) {
		FL_RECEIVERNAME = fL_RECEIVERNAME;
	}
	public String getFL_OLDNAME() {
		return FL_OLDNAME;
	}
	public void setFL_OLDNAME(String fL_OLDNAME) {
		FL_OLDNAME = fL_OLDNAME;
	}
	
}
