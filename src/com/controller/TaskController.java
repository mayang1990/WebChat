package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.service.FileService;
import com.service.MessageService;
import com.service.NoticeService;
import com.service.UserService;


@Component
public class TaskController {
	@Autowired
	private UserService userservice;
	@Autowired
	private FileService fileservice;
	@Autowired
	private MessageService messageservice;
	@Autowired
	private NoticeService noticeservice;
	
	@Scheduled(fixedRate=10000)  // 每隔10秒执行一次
    public void scheduleMethod()
	{
		//java.util.Date date=new java.util.Date();
		//System.out.println("执行定时任务."+date.toString());
		userservice.refreshuser();
	} 
	@Scheduled(cron="0 51 1 ? * *")//每天的01:51：00执行。
	public void daytask()
	{
		System.out.println("daytask.");
		fileservice.deloldfiles();
		//messageservice.deleteoldmessage();
		//noticeservice.deleteoldnotice();
	}
}
