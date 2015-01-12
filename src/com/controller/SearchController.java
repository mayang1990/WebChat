package com.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.model.UserModel;
import com.service.FriendService;
import com.service.UserService;

@Controller
public class SearchController {
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private FriendService friendservice;
	@Autowired
	private UserService userservice;
	
	@RequestMapping("/search")
	public @ResponseBody List<Map<String, Object>> search()
	{
		UserModel user=new UserModel();
		user.setUSER_NAME(request.getParameter("USER_NAME"));
		user.setUSER_GENDER(request.getParameter("USER_GENDER"));
		user.setJC_WORKTYPE_GCZX(request.getParameter("JC_WORKTYPE_GCZX"));
		user.setJC_WORKTYPE_SYS(request.getParameter("JC_WORKTYPE_SYS"));
		user.setJC_ZC(request.getParameter("JC_ZC"));
		user.setJC_ZY(request.getParameter("JC_ZY"));
		user.setUSER_BZ(request.getParameter("RD_JC_WORKTYPE"));
		
		return userservice.search(user);
	}//按条件搜索用户。
	
	@RequestMapping("/displayuserdetails")
	public @ResponseBody List<Map<String, Object>> displayuserdetails()
	{
		return userservice.getuser(request.getParameter("USER_ID"));
	}
}