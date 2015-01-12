package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.model.FriendModel;
import com.model.NoticeModel;
import com.service.FriendService;
import com.service.NoticeService;
import com.service.implement.JavascriptChat;

@Controller
public class FriendController {
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private FriendService friendservice;
	@Autowired
	private NoticeService noticeservice;
	
	@RequestMapping("/movefriendgroup")
	public ModelAndView movefriendgroup()
	{
		HttpSession session=request.getSession(false);
		FriendModel friend=new FriendModel();
		friend.setF_USER_ID(session.getAttribute("USER_ID").toString());
		friend.setF_FRIENDID(request.getParameter("F_FRIENDID"));
		friend.setFG_ID(request.getParameter("FG_ID"));
		friendservice.movefriendgroup(friend);
		return null;
	}//移动好友分组。
	
	@RequestMapping("/displayfriendlist")
	public @ResponseBody List<Map<String, Object>> displayfriendlist()
	{
		HttpSession session=request.getSession(false);
		return friendservice.displayfriendlist(session.getAttribute("USER_ID").toString());
		
	}//显示好友列表
	
	@RequestMapping("/delfriend")
	public ModelAndView delfriend()
	{
		HttpSession session=request.getSession(false);
		friendservice.delfriend(session.getAttribute("USER_ID").toString(), request.getParameter("USERID"));
		return null;
	}//删除好友。
	
	@RequestMapping("/isfriend")
	public @ResponseBody Map<String, Object> isfriend()
	{
		Map<String, Object> map=new HashMap<String, Object>();
		HttpSession session=request.getSession(false);
		if (session.getAttribute("USER_ID").toString().equals(request.getParameter("USER_ID"))) {
			map.put("isfriend", "self");
		} else {
			if (friendservice.isfriend(session.getAttribute("USER_ID").toString(), request.getParameter("USER_ID"))) {
				map.put("isfriend", "true");
			} else {
				map.put("isfriend", "false");
			}
		}
		return map;
	}//是否已经是好友关系。
	
	@RequestMapping("/sendfriendapply")
	public ModelAndView sendfriendapply()
	{
		HttpSession session=request.getSession(false);
		
		NoticeModel notice=new NoticeModel();
		notice.setNT_STATUS("0");
		notice.setNT_G_ID("");
		notice.setNT_G_NAME("");
		notice.setNT_RECEIVER(request.getParameter("USER_ID"));
		notice.setNT_RECEIVERNAME(request.getParameter("USER_NAME"));
		notice.setNT_SENDER(session.getAttribute("USER_ID").toString());
		notice.setNT_SENDERNAME(session.getAttribute("USER_NAME").toString());
		notice.setNT_TYPE("friendapply");
		notice.setNT_VERIFY(request.getParameter("VERYFY_MESSAGE"));
		
		if (noticeservice.addnotice(notice).equals("")) {
			
		}
		else {
			JavascriptChat jschat=new JavascriptChat();
			jschat.sendnotice(notice);
		}
		return null;
	}//向用户发送好友申请。
	
	@RequestMapping("/acceptfriendapply")
	public ModelAndView acceptfriendapply()
	{
		HttpSession session=request.getSession(false);
		FriendModel friend=new FriendModel();
		friend.setF_FRIENDID(request.getParameter("F_FRIENDID"));
		friend.setFG_ID("1");
		friend.setF_REMARK(request.getParameter("F_REMARK").trim());
		friend.setF_USER_ID(session.getAttribute("USER_ID").toString());
		friendservice.acceptfriendapply(friend);
		noticeservice.updatestatus(request.getParameter("NT_ID"));
		return null;
	}//接受好友申请。
	
	@RequestMapping("/refusefriendapply")
	public ModelAndView refusefriendapply()
	{
		noticeservice.updatestatus(request.getParameter("NT_ID"));
		return null;
	}//拒绝好友申请。
	
	@RequestMapping("/createfriendgroup")
	public ModelAndView createfriendgroup()
	{
		HttpSession session=request.getSession(false);
		friendservice.createfriendgroup(request.getParameter("FG_NAME").trim(), session.getAttribute("USER_ID").toString());
		return null;
	}//创建好友分组。
	
	@RequestMapping("/editremark")
	public ModelAndView editremark()
	{
		HttpSession session=request.getSession(false);
		FriendModel friend=new FriendModel();
		friend.setF_USER_ID(session.getAttribute("USER_ID").toString());
		friend.setF_FRIENDID(request.getParameter("F_FriendID"));
		friend.setF_REMARK(request.getParameter("F_REMARK").trim());
		friendservice.editremark(friend);
		return null;
	}//修改备注。
	
	@RequestMapping("/displayfriendgroup")
	public @ResponseBody List<Map<String, Object>> displayfriendgroup()
	{
		HttpSession session=request.getSession(false);
		return friendservice.displayfriendgroup(session.getAttribute("USER_ID").toString());
	}//显示好友分组。
	
	@RequestMapping("/updatefriendgroupname")
	public ModelAndView updatefriendgroupname()
	{
		friendservice.updatefriendgroupname(request.getParameter("FG_ID"), request.getParameter("FG_NAME").trim());
		return null;
	}//修改好友分组名称。
	
	@RequestMapping("/deletefriendgroup")
	public ModelAndView deletefriendgroup()
	{
		friendservice.deletefriendgroup(request.getParameter("FG_ID"));
		return null;
	}//删除好友分组。
	
	@RequestMapping("/displayrecentfriend")
	public @ResponseBody List<Map<String, Object>> displayrecentfriend()
	{
		HttpSession session=request.getSession(false);
		return friendservice.displayrecentfriend(session.getAttribute("USER_ID").toString());
	}//显示最近联系好友。
	
	@RequestMapping("/displayfriendlistbygroup")
	public @ResponseBody List<Map<String, Object>> displayfriendlistbygroup()
	{
		HttpSession session=request.getSession(false);
		return friendservice.displayfriendlist(session.getAttribute("USER_ID").toString(), request.getParameter("FG_ID"));
	}//获取一个分组下的好友。
}
