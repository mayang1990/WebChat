package com.model;

import java.io.Serializable;

import org.directwebremoting.annotations.DataTransferObject;

@SuppressWarnings("serial")
@DataTransferObject 

public class Message implements Serializable
{

    private long id = System.currentTimeMillis();
    private String text;
    private String time;


    public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	/**
     * @param newtext the new message text
     */
    public Message(String newtext , String newtime)
    {
        text = newtext;
        time=newtime;

        if (text.length() > 256)
        {
            text = text.substring(0, 256);
        }
    }

    /**
     * @return the message id
     */
    public void setId(long id) {
		this.id = id;
	}
    public long getId()
    {
        return id;
    }
    /**
     * @return the message text
     */
	public void setText(String text) {
		this.text = text;
	}
    public String getText()
    {
        return text;
    }

}
