package com.model;


import org.directwebremoting.ScriptSession;

public class RoomChatModel {
	
	private String roomName;
	private String userOne;
	private String userTwo;
	
	private ScriptSession scriptSession;
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	
	public String getUserOne() {
		return userOne;
	}
	public void setUserOne(String userOne) {
		this.userOne = userOne;
	}
	public String getUserTwo() {
		return userTwo;
	}
	public void setUserTwo(String userTwo) {
		this.userTwo = userTwo;
	}
	public ScriptSession getScriptSession() {
		return scriptSession;
	}
	public void setScriptSession(ScriptSession scriptSession) {
		this.scriptSession = scriptSession;
	}

	

}

