<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
   String path = request.getContextPath();
   String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html >
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>资源共享在线交流平台</title>

<script type="text/javascript" src="<%=path%>/javascript/jQuery/jquery-1.10.2.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/contextmenu/jquery.ui.position.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/contextmenu/jquery.contextMenu.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/contextmenu/screen.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/contextmenu/prettify.js"> </script>
<script type="text/javascript" src="<%=path%>/dwr/engine.js"> </script>
<script type="text/javascript" src="<%=path%>/dwr/interface/JavascriptChat.js"> </script>
<script type="text/javascript" src="<%=path%>/dwr/util.js"> </script>

<script type="text/javascript" src="<%=path%>/javascript/app_window_func.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/javascript-init.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/templates.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/jPages/jPages.min.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/multiselect/jquery.multi-select.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/plupload-2.1.2/js/plupload.full.min.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/plupload-2.1.2/js/i18n/zh_CN.js"> </script>
<script type="text/javascript" src="<%=path%>/javascript/overlay/jquery.overlay.js"> </script>

<link type="text/css" rel="stylesheet" href="<%=path%>/css/app_window.css" />
<link type="text/css" rel="stylesheet" href="<%=path%>/css/app_window_func.css" />
<link type="text/css" rel="stylesheet" href="<%=path%>/css/contextmenu/jquery.contextMenu.css" />
<link type="text/css" rel="stylesheet" href="<%=path%>/css/contextmenu/screen.css" />
<link type="text/css" rel="stylesheet" href="<%=path%>/css/contextmenu/prettify.sunburst.css" />
<link type="text/css" rel="stylesheet" href="<%=path%>/css/jPages/jPages.css" />
<link type="text/css" rel="stylesheet" href="<%=path%>/css/NewFile.css" />
<link type="text/css" rel="stylesheet" href="<%=path%>/css/multiselect/multi-select.css" />

</head>

<body style="overflow:hidden" class="*">

<div id="noscript_msg" class="noscript_msg" >您需要启动JavaScript，才能使用本网页。</div>
<div id="navigator_msg" class="navigator_tip">您的浏览器版本过低不支持，建议您使用IE8+，FiresFox，Google Chrome</div>
<script type="text/javascript"  >
   $(function() {
	    if(im_goodborwser()==true){app_init();
	    }else{
		  $("#navigator_msg").css("display","block");
		  alert("系统不支持您的浏览器。");
	    }
	    $("#noscript_msg").css("display","none");
	    
	    bindResize(el);
    });
   window.onbeforeunload = function() //author: sunlei
   {
	 alert("你确实要走？");
   };
</script>
<!--  -->
<div id="task-bar" title="任务栏">  
    <div id="task_lb_wrap" class="task-window"> </div> 
</div>
 
<div id="app_window" ></div> 
 
<div id="msg_wav" style="height:1px;"></div>

<div id="facePanel" class="facepanel" title="表情菜单" style="display: none; left: 439px; top: 76px; z-index: 300089;">
   <div class="defaultfacepanel" style="display: block; "></div>
</div>


<div id="messageBubble" title="信息提示栏" class="bubblecontainer" style="z-index: 200000; left: 123px; top: 406px; display:none;">
     <div class="bubblepanel" id="messageBubblePanel" style="left:507px; top:351px;display:none">			
	  <span title="消息管理" class="setting" id="messageBubblePanel_setting"></span>			
	  <div class="item" id="messageBubblePanel_message">
		<span class="single"></span>
		<span class="bubblepanel_body">
		   <span class="content" > <span class="nick">用户名</span>：说话的内容</span>		
		</span>
		<span class="count">(20)</span>	  
	  </div>		
	</div> 	
	 <div class="bubblemsglist" id="messageBubble_bubbleMsgList" style="top: -220px; display: none;">			
	   <h3>未读消息(<span class="count" id="messageBubble_bubbleMsgList_userCount">0</span>)</h3>			
	   <div class="bubblemsglistinner">				
			 <div class="bubblemsglistcontainer" id="messageBubble_bubbleMsgListContainer">					
			   <ul id="messageBubble_bubbleMsgList_ul">   </ul>				
			 </div>				
			 <div class="bubblemsgbuttons">					
				<a class="cancelnotify" id="messageBubble_bubbleMsgList_cancelNotifyButton" href="####">忽略提醒</a>					
				<a class="viewall" id="messageBubble_bubbleMsgList_viewAll" href="####">查看全部</a>				
			 </div>			
	   </div>
	 </div>
</div>

<div id="miniCard" title="最小化窗口" class="panel_1" style="display: none; left: 800px; top: 285px; z-index: 300000;" _olddisplay="block">
  <div class="panel_1_outer">				
	 <div class="panel_1_inner">									
		 <div class="panel_1_content" id="miniCardBody">						
		     <img class="minicard_avatar" id="miniCard_avatar" src="images/photoicon/im_default_photo.jpg">						
		     <div class="minicard_name">							
		        <div class="minicard_name_inner" uid="userid" id="miniCard_name_inner" title="把握当前、珍惜现在">
				   把握当前、珍惜现在
				</div>						            
			 </div>						
			 <div class="minicard_signature" id="miniCard_signature" style="display: block;">							
		        <div class="minicard_signature_inner" id="miniCard_signature_inner" title="等等什么东东">备注：</div>						
			 </div>																	
			 <div class="minicard_quickLink" id="miniCard_quickLink">							
			    <a href="###" title="开始会话"  class="minicard_chat" id="miniCard_Chat" style="display: block;" _olddisplay="block"></a>							
			    <a href="###" target="_blank" title="访问个人主页" class="minicard_homepage" id="miniCard_homepage">	</a>												
			 </div>						
			 <div class="buddyoption_tabhead" id="miniCard_buddyOption_tabHead">							
				 <div class="buddyoption_tabhead_div" id="miniCard_userDetails">详细资料</div>						
			 </div>							
		  </div>
	 </div>
  </div>
</div>

<div id="videowindow" type="video" title="视频聊天窗口" uid=""  style="width:360px; height: 355px; left: 500px; top:300px; display: none; visibility: visible; z-index: 30000;border: 1px solid #3E7186; verflow: hidden; padding: 0;position: absolute;" > 
   <div id="window" style=" height: 100%; position: relative;  width: 100%; z-index: 30000;"> 
      <div id="window_bgcontainer" class="bgcontainer" style="background:url(images/app_window/im_messagebubble.png) repeat #F4F9FC;">
	  </div>
      <div class="content"> 
	    <div id="window_titlebar" class="titlebar" style="height:25px;">
	      <div id="window_titlebutton" class="titlebutton"> 
		    <a title="关闭"  id="close" href ="###"  style="display:block" class="titlebutton_close"></a> 
		  </div>
		  <div id="window_title" class="title titletext" style="height:25px;color:#ffffff">
		                 您正在与某人视频......
		  </div>		 
	    </div> 
		<div id="window_body"  class="body" style="width:360px; top:25px; height:302px;"> 
		  <div id="videoPage" class="videopage" style="display:none"> </div>
		  <div id="videodisplay" class="videodisplay" style="display:block"> </div>
		  <div id="videoerropage" class ="videoerropage" style="display:none"></div> 
	    </div>
	    <div id="window_controlPanel" align="right" class="controlarea" style="" >
		   <div id="video_info" class ="video_info">  </div>
		   <a id="video_shutdown" href="###" class="videotoolbar" title="断开视频连接">
		        <div class="video_shutdown"> </div>
		   </a>
		   <a id="video_change"  href="###" class="videotoolbar" title="调整视频显示窗口"> 
		        <div class="video_change"> </div>
		   </a>
		   <a id="video_show" href="###" class="videotoolbar" title="窗口显示样式"> 
		        <div class="video_show"> </div>
		   </a>
	    </div>
	  </div>
   </div>
</div>
<!-- 页面遮罩层 -->
<div id="" style="z-index: 99999; cursor: default; background: none repeat scroll 0% 0% transparent; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%; opacity: 0; display: none;">
   <div style="height:100%;width:100%"></div>
</div>

</body>
</html>




