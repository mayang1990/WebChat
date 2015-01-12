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

import com.model.GroupMemberModel;
import com.model.GroupModel;
import com.model.NoticeModel;
import com.service.GroupService;
import com.service.NoticeService;
import com.service.UserService;
import com.service.implement.JavascriptChat;

@Controller
public class GroupController {
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private GroupService groupservice;
	@Autowired
	private UserService userservice;
	@Autowired
	private NoticeService noticeservice;
	
	@RequestMapping("/displaymygroup")
	public @ResponseBody List<Map<String, Object>> displaymygroup()
	{
		HttpSession session=request.getSession(false);
		return groupservice.displaygroup(session.getAttribute("USER_ID").toString());
	}//显示当前用户参加的所有群。
	
	@RequestMapping("/displaygroupmember")
	public @ResponseBody List<Map<String, Object>> displaygroupmember()
	{
		return groupservice.displayuser(request.getParameter("G_ID"));
	}//显示群中的用户。
	
	@RequestMapping("/creategroup")
	public ModelAndView creategroup()
	{
		HttpSession session=request.getSession(false);
		//创建群。
		GroupModel group=new GroupModel();
		group.setG_CREATERID(session.getAttribute("USER_ID").toString());
		group.setG_CREATERNAME(session.getAttribute("USER_NAME").toString());
		group.setG_LY(request.getParameter("G_LY").trim());
		group.setG_NAME(request.getParameter("G_NAME").trim());
		group.setG_TYPE(request.getParameter("G_TYPE").trim());
		group.setG_ID(groupservice.creategroup(group));
		
		//向好友发送邀请。
		JavascriptChat jschat=new JavascriptChat();
		String[] userarray=request.getParameter("USER_ID_STR").split(",");
		for (int i = 0; i < userarray.length; i++) {
			Map<String, Object> map=userservice.getuser(userarray[i]).get(0);
			NoticeModel notice=new NoticeModel();
			notice.setNT_G_ID(group.getG_ID());
			notice.setNT_G_NAME(group.getG_NAME());
			notice.setNT_SENDER(session.getAttribute("USER_ID").toString());
			notice.setNT_SENDERNAME(session.getAttribute("USER_NAME").toString());
			notice.setNT_STATUS("0");
			notice.setNT_TYPE("groupinvite");
			notice.setNT_VERIFY("");
			notice.setNT_RECEIVER(userarray[i]);
			notice.setNT_RECEIVERNAME(map.get("USER_NAME").toString());
            if (noticeservice.addnotice(notice).equals("")) {
				
			} else {
				jschat.sendnotice(notice);
			}
		}
		return null;
	}//创建群。
	
	@RequestMapping("/acceptgroupinvite")
	public ModelAndView acceptgroupinvite()
	{
		HttpSession session=request.getSession(false);
		GroupMemberModel groupmember=new GroupMemberModel();
		groupmember.setGM_G_ID(request.getParameter("G_ID"));
		groupmember.setGM_ROLE("0");
		groupmember.setGM_USER_ID(session.getAttribute("USER_ID").toString());
		groupmember.setGM_USER_NAME(session.getAttribute("USER_NAME").toString());
		groupservice.addmember(groupmember);
		noticeservice.updatestatus(request.getParameter("NT_ID"));
		return null;
	}//接受加入群邀请。
	
	@RequestMapping("/refusegroupinvite")
	public ModelAndView refusegroupinvite()
	{
		noticeservice.updatestatus(request.getParameter("NT_ID"));
		return null;
	}//拒绝加入群邀请。
	
	@RequestMapping("/getgroupmember")
	public @ResponseBody List<Map<String, Object>> getgroupmember()
	{
		HttpSession session=request.getSession(false);
		GroupMemberModel groupmember=new GroupMemberModel();
		groupmember.setGM_G_ID(request.getParameter("G_ID"));
		groupmember.setGM_USER_ID(session.getAttribute("USER_ID").toString());
		return groupservice.getgroupmember(groupmember);
	}//获取群成员信息。
	
	@RequestMapping("/getgroup")
	public @ResponseBody List<Map<String, Object>> getgroup()
	{
		return groupservice.getgroup(request.getParameter("G_ID"));
	}//获取群信息。
	
	@RequestMapping("/deletegroup")
	public ModelAndView deletegroup()
	{
		groupservice.delgroup(request.getParameter("G_ID"));
		return null;
	}//删除群。
	
	@RequestMapping("/quitegroup")
	public ModelAndView quitegroup()
	{
		HttpSession session=request.getSession(false);
		groupservice.delmember(request.getParameter("G_ID"), session.getAttribute("USER_ID").toString());
		return null;
	}//退出群
	
	@RequestMapping("/searchgroup")
	public @ResponseBody List<Map<String, Object>> searchgroup()
	{
		GroupModel group=new GroupModel();
		group.setG_NAME(request.getParameter("G_NAME").trim());
		group.setG_TYPE(request.getParameter("G_TYPE").trim());
		group.setG_LY(request.getParameter("G_LY").trim());
		return groupservice.searchgroup(group);
	}//搜索群。
	
	@RequestMapping("/isgroupmember")
	public @ResponseBody Map<String, Object> isgroupmember()
	{
		HttpSession session=request.getSession(false);
		Map<String, Object> map=new HashMap<String, Object>();
		GroupMemberModel groupmember=new GroupMemberModel();
		groupmember.setGM_G_ID(request.getParameter("G_ID"));
		groupmember.setGM_USER_ID(session.getAttribute("USER_ID").toString());
		if (groupservice.getgroupmember(groupmember).size()==0) {
			map.put("isgroupmember", "false");
		} else {
			map.put("isgroupmember", "true");
		}
		return map;
	}//是否已经是群成员。
	
	@RequestMapping("/sendgroupapply")
	public ModelAndView sendgroupapply()
	{
		HttpSession session=request.getSession(false);
		NoticeModel notice=new NoticeModel();
		notice.setNT_G_ID(request.getParameter("G_ID"));
		notice.setNT_G_NAME(request.getParameter("G_NAME"));
		Map<String, Object> map=groupservice.getgroup(request.getParameter("G_ID")).get(0);
		notice.setNT_RECEIVER(map.get("G_CREATERID").toString());
		notice.setNT_RECEIVERNAME(map.get("G_CREATERNAME").toString());
		notice.setNT_SENDER(session.getAttribute("USER_ID").toString());
		notice.setNT_SENDERNAME(session.getAttribute("USER_NAME").toString());
		notice.setNT_STATUS("0");
		notice.setNT_TYPE("groupapply");
		notice.setNT_VERIFY(request.getParameter("VERYFY_MESSAGE"));
		
		if (noticeservice.addnotice(notice).equals("")) {
			
		} else {
			JavascriptChat jschat=new JavascriptChat();
			jschat.sendnotice(notice);
		}
		return null;
	}//发送加入群申请。
	
	@RequestMapping("/acceptgroupapply")
	public ModelAndView acceptgroupapply()
	{
		GroupMemberModel groupmember=new GroupMemberModel();
		groupmember.setGM_G_ID(request.getParameter("G_ID"));
		groupmember.setGM_ROLE("0");
		groupmember.setGM_USER_ID(request.getParameter("USER_ID"));
		groupmember.setGM_USER_NAME(request.getParameter("USER_NAME"));
		groupservice.addmember(groupmember);
		noticeservice.updatestatus(request.getParameter("NT_ID"));
		return null;
	}//接受加入群申请。
	
	@RequestMapping("/refusegroupapply")
	public ModelAndView refusegroupapply()
	{
		noticeservice.updatestatus(request.getParameter("NT_ID"));
		return null;
	}//拒绝加入群申请。
	
	@RequestMapping("/displayrecentgroup")
	public @ResponseBody List<Map<String, Object>> displayrecentgroup()
	{
		HttpSession session=request.getSession(false);
		return groupservice.displayrecentgroup(session.getAttribute("USER_ID").toString());
	}//显示最近联系群。
	
	@RequestMapping("/deletegroupmember")
	public ModelAndView deletegroupmember()
	{
		groupservice.delmember(request.getParameter("G_ID"), request.getParameter("USER_ID"));
		return null;
	}//删除群成员。
	
	@RequestMapping("/getfriendtoinvite")
	public @ResponseBody List<Map<String, Object>> getfriendtoinvite()
	{
		HttpSession session=request.getSession(false);
		return groupservice.getfriendtoinvite(session.getAttribute("USER_ID").toString(), request.getParameter("G_ID"));
	}//获取不在群中的好友，用于邀请好友加入群。
	
	@RequestMapping("/invitefriendtogroup")
	public ModelAndView invitefriendtogroup()
	{
		HttpSession session=request.getSession(false);
		GroupModel group=new GroupModel();
		group.setG_ID(request.getParameter("G_ID"));
		group.setG_NAME(request.getParameter("G_NAME"));
		
		JavascriptChat jschat=new JavascriptChat();
		String[] userarray=request.getParameter("USER_ID_STR").split(",");
		for (int i = 0; i < userarray.length; i++) {
			Map<String, Object> map=userservice.getuser(userarray[i]).get(0);
			NoticeModel notice=new NoticeModel();
			notice.setNT_G_ID(group.getG_ID());
			notice.setNT_G_NAME(group.getG_NAME());
			notice.setNT_SENDER(session.getAttribute("USER_ID").toString());
			notice.setNT_SENDERNAME(session.getAttribute("USER_NAME").toString());
			notice.setNT_STATUS("0");
			notice.setNT_TYPE("groupinvite");
			notice.setNT_VERIFY("");
			notice.setNT_RECEIVER(userarray[i]);
			notice.setNT_RECEIVERNAME(map.get("USER_NAME").toString());
            if (noticeservice.addnotice(notice).equals("")) {
				
			} else {
				jschat.sendnotice(notice);
			}
		}
		return null;
	}//邀请好友加入群。
	
	@RequestMapping("/editgroup")
	public ModelAndView editgroup()
	{
		GroupModel group=new GroupModel();
		group.setG_ID(request.getParameter("G_ID").trim());
		group.setG_LY(request.getParameter("G_LY").trim());
		group.setG_NAME(request.getParameter("G_NAME").trim());
		group.setG_TYPE(request.getParameter("G_TYPE").trim());
		groupservice.editgroup(group);
		return null;
	}//编辑群信息。
}
