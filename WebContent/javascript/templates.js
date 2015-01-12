// JavaScript Document
//任务栏模板
var taskTemp = '<div window ="{num}" class="taskitembox" id ="window_{id}" style="display:{display}">'+
	              '<a class="focus" title="{title}">'+
	                    '<div class="taskitemicon">'+
		                   '<img src="{imgsrc}">'+
		                '</div>'+
		                '<div class="taskitemtxt">'+
		                   '<div class="taskitemtxt_nick">'+
		                     '{name}'+
		                   '</div>'+
		                '</div>'+ 
	               '</a>'+
               '</div>';

//主面板模板
var mainboardTemp = '<div id="app_window_{num}" window="{num}" class="app_window" style="width:210px; height: 500px; left: {left}px; top:{top}px; display: block; visibility: visible; z-index: {z};" >'+
   '<div id="window_{num}" class="window" >'+
      '<div id="window_bgcontainer_{num}" class="bgcontainer" style="background:url(images/app_window/bg2.png) repeat-x scroll 0 0 #DFEEF6; "></div>'+
      '<div  class="content">'+
	    '<div id="window_titlebar_{num}" class="titlebar" >'+
	      '<div id="window_titlebutton_{num}" class="titlebutton">'+ 
		   '<a title="关闭"  id="close"  style="display:block" class="titlebutton_close"></a>'+	
		   '<a title="最小化" id="min"   style="display:block" class="titlebutton_min"></a>'+  	 
		  '</div>'+
		  '<div class="titletext" > Web IM </div>'+		 
	    '</div>'+ 
		'<div id="window_body" class="body"  style="bottom: 1px; position: absolute; height: 475px; top: 25px; width: 210px;">'+
		  '<div id="myPanel" class="mypanel"> </div>'+
		  '<div id="myPanelToolbar" class="mypaneltoolbar">'+
		   '<a class="mypanel_toolbar_button" title="个人主页" id="mypanel_toolbar_homepage" href="###" target="_blank">'+
		      '<span class="mypanel_toolbar_icon  mypanel_toolbar_homepage"></span>'+
		  '</a>'+
		  '<a class="mypanel_toolbar_button" id="mypanel_toolbar_refresh" title="刷新列表" href="###" >'+
		      '<span class="mypanel_toolbar_icon  mypanel_toolbar_refresh"></span>'+
		  '</a>'+
		  '</div>'+
		  '<div id="mainPanel"  class="mainpanel" style="display: block; ">'+
			  '<div id="main" class="main" style="display: block; height: 100%;">'+
				  '<ul id="tab" class="tab">'+	
			           '<li  id="tabFriendList" title="好友列表"  class="tabfriendlist current" style="display:block">'+
                          '<div id="tab1" title="好友列表" class="tabfriendlisticon iconcurrent1" ></div>'+
		               '</li>'+   	    
                       '<li  id="tabGroupList" title="群/讨论组"  class="tabgrouplist" style="display:block">'+
                          '<div id="tab2" title="群/讨论组" class="tabgrouplisticon" ></div>'+
                      '</li>'+
                       '<li id="tabRecentList"  title="最近联系人" class="tabrecentlist" style="display:block">'+
                         '<div id="tab3" title="最近联系人" class="tabrecentlisticon"></div>'+
                      '</li>'+
		          '</ul>'+
				  '<div id="ListContainer" class="listcontainer" style=" height:357px;" >'+
				      '<div id="friendListPanel" class="friendlistpanel"  style="height:332px;display:block; ">'+
					      '<div id="friendList" class="friendlist" >'+	
						    
						  '</div>'+
						  '<div id="friendlistbottom" class="friendlistbottom">'+
							'<a id="frientSearch"  class="friendsearch"  title="查找好友">'+
							   '<div class="friendsearch_icon"></div> 查找'+
							'</a>'+
							'<a id="friendManage"  class="friendmanage" title="好友管理">'+
							  '<div class="friendmanage_icon"></div> 好友管理'+
							'</a>'+
							'<a id="messageManage"  class="friendmsg" title="信息管理">'+
							  '<div class="friendmsg_icon"></div> 信息管理'+
							'</a>'+
	                     ' </div>'+		
					 '</div>'+					   
					 '<div id="groupListPanel" class="grouplistpanel" style="display:none ; height:332px; ">'+
					   '<div id="groupList" class="groupList" >'+
					   '</div>'+
					   '<div id="grouplistbottom" class="friendlistbottom">'+
							'<a id="groupCreate"  class="groupcreate"  title="创建群">'+
							   '<div class="groupcreate_icon"></div> 创建群'+
							'</a>'+
							'<a id="groupSearch"  class="groupsearch"  title="查找群">'+
							   '<div class="groupsearch_icon"></div> 查找群'+
							'</a>'+
							'<a id="friendManage"  class="groupmanage" title="群管理">'+
							  '<div class="groupmanage_icon"></div> 群管理'+
							'</a>'+
	                    '</div>'+
					 '</div>'+					  
					 '<div id="recentListPanel" class="recentlistpanel" style="display:none ; height:332px;">'+
					 '</div>'+
				  '</div>'+
			 '</div>'+
		 '</div>'+
	    '</div>'+
	 '</div>'+
	 '<div class="bottomside" resize="b">'+
     '</div>'+
   '</div>'+
'</div>'; 

//单聊窗口模板
var windowTemp ='<div id="app_window_{num}" window="{num}" class="app_window" style="width:450px; height: 400px; left: {left}px; top:{top}px; display: {display}; visibility: visible; z-index: {z};" >' +
   '<div id="window_{num}" class="window" style=" z-index: {z};">' +
      '<div id="window_bgcontainer_{num}" class="bgcontainer" style="background:url(images/app_window/bg.png) repeat-x scroll 0 0 #F4F9FC; "></div>'+
      '<div  class="content">' +
	    '<div id="window_titlebar_{num}" class="titlebar" style="height:80px;">'+
	      '<div id="window_titlebutton_{num}" class="titlebutton">'+ 
		   '<a title="关闭"  id="close_{id}" href="###" style="display:block" class="titlebutton_close" ></a>	'+
		   '<a title="最小化" id="min_{id}" href="###"  style="display:block" class="titlebutton_min"> </a>'+	 
		  '</div>'+
		  '<div id="window_title_{num}" class="title titletext" style="height:80px;">'+
		      '<div uin="{id}" class="chat_friendavatararea" id="chat_avatararea_{id}">' +
		          '<img src="{imgsrc}" class="avatarinchat">' +
		      '</div>'+
		      '<div class="chat_namearea" id="chat_namearea_{id}">' +
		          '<a href="###" title="{user_name}" uin="{id}" class="chat_allname titletext" id="chat_allName_{id}">' +
		             '<span id="chat_mainname_{id}" class="chat_mainname">{user_name}</span>' +
		          '</a>' +
		      '</div>'+
		      '<div class="chat_moreinfoarea" id="chat_moreinfoarea_{id}">' +
		          '<a target="_blank" href="" title="查看个人主页"  id="chat_homepageicon_{id}">' +
		          '</a>'+
		      '</div>'+
			  '<div id="chat_buttonbar_{id}"  class="chat_buttonbar">'+
				  '<a href="#" id="chat_Video_{id}" title="开始视频会话"><span class="chat_videobutton"></span></a>'+        
				  '<a href="#" id="chat_sendFile_{id}" title="发送文件..." > <span class="chat_sendfile" ><input type="file" id="fileupload" name="files" style="position:absolute;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;width:36px;height:36px;" hidefocus></span></a>'+    
				  '<a href="#" id="chatBox_createDisc_{id}" title="创建讨论组" style="display:none;"> <span class="chat_createdisc"></span></a>'+			  
			  '</div>'+
		  '</div>'+		 
	    '</div>'+ 
		'<div id="window_body_{num}"  class="body" style="width: 450px; top:80px; height:321px;">'+ 
		   '<div class="chat_videoinvite" id="chat_videoinvite_{id}"  style=" display:none">'+ 
		        '<div class="chat_video_top">'+
		          '<a class="chat_video_close" title="关闭视频邀请窗口">'+
		          '</a>'+
		        '</div>'+
				'<div class="chat_video_icon">'+
				'</div>'+
		        '<div class="chat_video_msg">'+	
		          '邀请您进行视频聊天'+
				'</div>'+         
				'<div id="chat_video_invite" class="chat_video_buttonbar" style="display:block">'+				    
			        '<a id="chat_video_agree" title="接受视频邀请" class="video_invite_button">'+
			           '<div class="video_invite_agree">'+
			           '</div>'+
			        '</a>'+
                    '<a id="chat_video_disagree" title="拒绝视频邀请" class="video_invite_button">'+
			           '<div class="video_invite_disagree">'+
			           '</div>'+
			        '</a>'+
			    '</div>'+ 
			'</div>'+		
		    '<div id="chat_mainArea_{id}"  class="chat_mainarea" style="width:450px;">'+
			   '<div id="chat_chatBoard_{id}" class="chat_chatboard" style="bottom:145px">'+
			      '<div id="chat_msgList_{id}" class="chat_msglist" style="bottom:0px;">'+
					   '<dl class="chat_mymsg">'+
					      '<dt  class="msghead">'+
						      '<span title="低调一点">低调一点!</span>'+
							  '<span style="margin-left:5px">2014-04-08 13:03:10</span>'+
						  '</dt>'+		            		                          
						  '<dd class="msgbody defaultfontstyle" style="color:#ff6600;font-family:黑体;font-size:10pt;font-weight:normal;font-style:normal;text-decoration:none;">下小盆友<br>'+  
					      '</dd>'+
						'</dl>'+	
					   '<dl class="chat_friendmsg">'+
					     '<dt class="msghead">'+
						    '<span title="把握当前、珍惜现在">把握当前、珍惜现在</span>'+
							'<span style="margin-left:5px">2014-04-08 18:54:20</span>'+
						 '</dt>'+							
						 '<dd  class="msgbody defaultfontstyle" style=" color:#009966;font-family:宋体;font-size:10pt;font-weight:normal;font-style:normal;text-decoration:none;">夫士大夫 <br>'+
						 '</dd>'+
					   '</dl>'+			  
				  '</div>'+
			   '</div>'+
			   '<div id="chat_fonttoolBar_{id}" class="chat_editortoolbar" style="display:none; bottom:145px;" >'+
			        '<ul>'+
					'<li>'+
						'<select class="fontfamily" style=" border: 1px solid #6A9ED2; width: 130px;" id="chat_fonttoolBar_{id}_fontFamily">'+
							 '<option value="宋体">宋体</option>'+
							 '<option value="黑体">黑体</option>'+
							 '<option value="隶书">隶书</option>'+
							 '<option value="微软雅黑">微软雅黑</option>'+
							 '<option value="楷体_GB2312">楷体_GB2312</option>'+
							 '<option value="幼圆">幼圆</option>'+
							 '<option value="Arial">Arial</option>'+
							 '<option value="Arial Black">Arial Black</option>'+
							 '<option value="Times New Roman">Times New Roman</option>'+
						'</select>'+
					'</li>'+
					'<li>'+
					     '<select class="fontsize" style="border: 1px solid #6A9ED2; width: 50px;" id="chat_fonttoolBar_{id}_fontSize" >'+
						      '<option value="8">8</option>'+
							  '<option value="9">9</option>'+
							  '<option value="10">10</option>'+
							  '<option value="11">11</option>'+
							  '<option value="12">12</option>'+
							  '<option value="13">13</option>'+
							  '<option value="14">14</option>'+
							  '<option value="15">15</option>'+
							  '<option value="16">16</option>'+
							  '<option value="17">17</option>'+
							  '<option value="18">18</option>'+
							  '<option value="19">19</option>'+
							  '<option value="20">20</option>'+
							  '<option value="21">21</option>'+
							  '<option value="22">22</option>'+
						'</select>'+
					'</li>'+
					'</ul>'+
			   '</div>'+
			   '<div id="chat_toolBarTop_{id}" class="chat_toolbar_top" style="bottom: 140px;"></div>'+
			   '<div id="chat_toolBar_{id}" class="chat_toolbar"  style="bottom: 115px;">'+
					 '<a href="###" id="chat_fontButton_{id}" ><div title="设置字体颜色和格式" class="chat_fontbutton"></div></a>'+      
					 '<a href="###"><div id="chat_faceButton_{id}" title="表情" class="chat_facebutton" ></div></a>'+                  
					 '<a href="###" id="chat_clearButton_{id}"><div title="清屏" class="chat_clearbutton"></div></a> '+            
					 '<a href="###" id="chat_chatLogButton_{id}" title="消息记录"  class="chat_historybuttoncon" >'+
					     '<div class="chat_historybutton"></div>'+
						 '<div class="chat_historybuttontxt">消息记录</div>'+
				 	 '</a>'+     
			   '</div>'+
			   '<div id="chat_inputBox_{id}" class="chat_inputbox" style="height: 85px;">'+
			     '<div class="chat_rich_editor" style="font-family:宋体; font-size:10pt; font-weight: normal; font-style: normal; text-decoration: none;">'+
					 '<textarea id="chat_rich_editor_div" class="chat_rich_editor_div"  style="display:block;font-family:宋体; font-size:10pt; font-weight: normal; font-style: normal; text-decoration: none;"></textarea>'+
				 '</div>'+
			   '</div>'+
			   '<div id="chat_controlPanel" class="chat_controlpanel">'+
			      '<a title="发送" class="chat_sendmsg" id="chat_sendMsgButton_{id}" href="###" >发  送</a>'+
				  '<a title="关闭" class="chat_close" id="chat_closeButton_{id}" href="###" >关  闭</a>'+ 
			   '</div>'+
			'</div>'+
		'</div>'+
	  '</div>'+
   '</div>'+
'</div>' ;

//群聊模板
var roomwindowTemp = '<div id="app_window_{num}" window="{num}" class="app_window" style="width:475px; height: 400px; left: {left}px; top:{top}px; display: {display}; visibility: visible; z-index: {z};" >' +
   '<div id="window_{num}" class="window" style=" z-index: {z};">' +
      '<div id="window_bgcontainer_{num}" class="bgcontainer" style="background:url(images/app_window/bg.png) repeat-x scroll 0 0 #F4F9FC; "></div>'+
      '<div  class="content">' +
	    '<div id="window_titlebar_{num}" class="titlebar" style="height:80px;">'+
	      '<div id="window_titlebutton_{num}" class="titlebutton">'+ 
		   '<a title="关闭"  id="close" href ="###"  style="display:block" class="titlebutton_close"></a>	'+
		   '<a title="最小化" id="min" href ="###"  style="display:block" class="titlebutton_min"> </a>'+	 
		  '</div>'+
		  '<div id="window_title_{num}" class="title titletext" style="height:80px;">'+
			  '<div uid="{id}" class="chat_friendavatararea" id="chat_avatararea_{id}">' +
		          '<img src="{imgsrc}" class="avatarinchat">' +
		      '</div>'+
		      '<div class="chat_namearea" id="chat_namearea_{id}">' +
		          '<a href="###" title="{user_name}" uid="{id}" class="chat_allname titletext" id="chat_allName_{id}">' +
		             '<span id="chat_mainname_{id}" class="chat_mainname">{user_name}</span>' +
		          '</a>' +
		      '</div>'+
		      '<div class="chat_moreinfoarea" id="chat_moreinfoarea_{id}">' +
		          '<a target="_blank" href="" title="查看个人主页"  id="chat_homepageicon_{id}">' +
		          '</a>'+
		      '</div>'+
		      '<div id="chat_buttonbar_{id}"  class="chat_buttonbar">'+
				  '<a href="#" id="chat_sendFile_123456" style="display:none;" title="共享文件..."> <span class="chat_sharefile" ></span></a>'+			  
			  '</div>'+
		  '</div>'+		 
	    '</div>'+ 
		'<div id="window_body_{num}"  class="body" style="width:475px; top:80px; height:321px;">'+  
		    '<div  id="chat_sideBar2_{id}" class="chat_sidebar2"  style="width: 25px; right: 0px;">'+
			    '<div title="点击可以展开查看群好友" class="chat_sidebar_trigger" id="chat_sideBar_trigger_{id}">'+
				    '<div class="expand">群成员好友</div>'+
			        '<a class="unexpand" onClick="return false;" href="###" ></a>'+			
				'</div>'+				
		    '</div>'+
			'<div class="chat_sidebar" id="chat_sideBar_{id}"  style=" display:none">'+
			   '<div class="chat_groupmember" id="chatBox_groupMember_{id}">'+         
				  '<div class="chat_groupmember_title">群成员('+
				      '<span id="chat_groupmember_onlineCount_{id}">19</span>/'+
					  '<span id="chat_groupmember_count_{id}">41</span>)'+
				  '</div>'+         
				  '<div class="chat_groupmember_mainarea"  id="chat_groupMember_mainArea_{id}">'+          
						'<div class="chat_groupmember_onlinearea" id="chat_groupMember_onlineArea_{id}" style="display: block; padding:0px">'+
							  '<div id="chat_groupMember_friend_{fid}" class="chat_groupmember_friend" style="background-color: transparent;">'+
								   '<div class="groupmember_icon" title="管理员"></div>	'+
								   '<div class="chat_groupember_iconarea">'+	
									  '<img src="images/app_window/im_icon_expression.gif" class="chat_groupmember_icon" id="chat_groupMember_icon_{id}_{fid}">'+											
								   '</div>'+					
								   '<div title="姜丽娅 - 在线" class="chat_groupmember_namearea">'+						
									  '<div class="chat_groupmember_nick " id="chat_groupMember_nick_{id}_{fid}">姜丽雅</div>'+					
								   '</div>'+
							  '</div>'+
						'</div>'+
			      '</div>'+
			   '</div>'+    
			'</div>'+		
		    '<div id="chat_mainArea_{id}"  class="chat_mainarea" style="width:450px;">'+
			   '<div id="chat_chatBoard_{id}" class="chat_chatboard" style=" height:175;bottom:145px">'+
			      '<div id="chat_msgList_{id}" class="chat_msglist" style="height:174px;">'+
					   '<dl class="chat_mymsg">'+
					      '<dt  class="msghead">'+
						      '<span title="低调一点">低调一点!</span>'+
							  '<span style="margin-left:5px">2014-04-08 13:03:10</span>'+
						  '</dt>'+		            		                          
						  '<dd class="msgbody defaultfontstyle" style="color:#ff6600;font-family:黑体;font-size:10pt;font-weight:normal;font-style:normal;text-decoration:none;">下小盆友<br>'+  
					      '</dd>'+
						'</dl>'+	
					   '<dl class="chat_friendmsg">'+
					     '<dt class="msghead">'+
						    '<span title="把握当前、珍惜现在">把握当前、珍惜现在</span>'+
							'<span style="margin-left:5px">2014-04-08 18:54:20</span>'+
						 '</dt>'+							
						 '<dd  class="msgbody defaultfontstyle" style=" color:#009966;font-family:宋体;font-size:10pt;font-weight:normal;font-style:normal;text-decoration:none;">夫士大夫 <br>'+
						 '</dd>'+
					   '</dl>'+			  
				  '</div>'+
			   '</div>'+
			   '<div id="chat_fonttoolBar_{id}" class="chat_editortoolbar" style="display:none; bottom:145px;" >'+
			        '<ul>'+
					'<li>'+
						'<select class="fontfamily" style=" border: 1px solid #6A9ED2; width: 130px;" id="chat_fonttoolBar_{id}_fontFamily">'+
							 '<option value="宋体">宋体</option>'+
							 '<option value="黑体">黑体</option>'+
							 '<option value="隶书">隶书</option>'+
							 '<option value="微软雅黑">微软雅黑</option>'+
							 '<option value="楷体_GB2312">楷体_GB2312</option>'+
							 '<option value="幼圆">幼圆</option>'+
							 '<option value="Arial">Arial</option>'+
							 '<option value="Arial Black">Arial Black</option>'+
							 '<option value="Times New Roman">Times New Roman</option>'+
						'</select>'+
					'</li>'+
					'<li>'+
					     '<select  style="border: 1px solid #6A9ED2; width: 50px;" id="chat_fonttoolBar_{id}_fontSize">'+
						      '<option value="8">8</option>'+
							  '<option value="9">9</option>'+
							  '<option value="10">10</option>'+
							  '<option value="11">11</option>'+
							  '<option value="12">12</option>'+
							  '<option value="13">13</option>'+
							  '<option value="14">14</option>'+
							  '<option value="15">15</option>'+
							  '<option value="16">16</option>'+
							  '<option value="17">17</option>'+
							  '<option value="18">18</option>'+
							  '<option value="19">19</option>'+
							  '<option value="20">20</option>'+
							  '<option value="21">21</option>'+
							  '<option value="22">22</option>'+
						'</select>'+
					'</li>'+
					'</ul>'+
			   '</div>'+
			   '<div id="chat_toolBarTop_{id}" class="chat_toolbar_top" style="bottom: 140px;"></div>'+
			   '<div id="chat_toolBar_{id}" class="chat_toolbar"  style="bottom: 115px;">'+
					 '<a href="###" id="chat_fontButton_{id}" ><div title="设置字体颜色和格式" class="chat_fontbutton"></div></a>'+      
					 '<a href="###"><div id="chat_faceButton_{id}" title="表情" class="chat_facebutton" ></div></a>'+                  
					 '<a href="###" id="chat_clearButton_{id}"><div title="清屏" class="chat_clearbutton"></div></a> '+            
					 '<a href="###" id="chat_chatLogButton_{id}" title="消息记录"  class="chat_historybuttoncon" >'+
					     '<div class="chat_historybutton"></div>'+
						 '<div class="chat_historybuttontxt">消息记录</div>'+
				 	 '</a>'+      
			   '</div>'+
			   '<div id="chat_inputBox_{id}" class="chat_inputbox" style="height: 85px;">'+
			     '<div class="chat_rich_editor" style="font-family: 黑体; font-size: 10pt; font-weight: normal; font-style: normal; text-decoration: none; color: rgb(255, 102, 0);">'+
					 '<textarea class="chat_rich_editor_div"  style="display:block;"></textarea>'+
				 '</div>'+
			   '</div>'+
			   '<div id="chat_controlPanel" class="chat_controlpanel">'+
			      '<a title="发送" class="chat_sendmsg" id="chat_sendMsgButton_{id}" href="#">发送</a>'+
				  '<a title="关闭" class="chat_close" id="chat_closeButton_{id}" href="#">关闭</a>'+ 
			   '</div>'+
			'</div>'+
		'</div>'+
	  '</div>'+
   '</div>'+
'</div>';

//搜索好友模板
var searchwindowTemp ='<div id="mainArea_{num}"  class="chat_mainarea">'+
             '<div id="search_mainArea_option" class="search_mainarea_option">'+
                '<div class="friendsearch_endline">查找条件'+
				   '<hr class="line">'+
				'</div>'+
				'<div class="options">'+
				  '<div>' +
				   '<input  type="radio" class="typeinput" name="RD_JC_WORKTYPE" id="RD_GCZX" value="2"/>'+
                     '工程中心'+
                  '</div>'+
				  '<div>'+
				   '<input  type="radio" class="typeinput" name="RD_JC_WORKTYPE" id="RD_GCZX" value="1"/>'+
                     '重点实验室'+
				  '</div>'+
				'</div>'+
				'<div class="basic_options">'+
				 '<dl class="bf_basicList" id="bf_basicList_2">'+
				  '<dt class="dItem_s">用户名：</dt>'+
				  '<dt class="dItem_s">性别：</dt>'+
				  '<dt class="dItem_s"><input type="text" name="USER_NAME" id="USER_NAME_input" maxlength="15" style="height: 20px;" /></dt>'+
				  '<dt class="dItem_s"><select name="USER_GENDER" id="USER_GENDER_input" style="width: 100px;" >'+
				  '<option value =""></option>'+
				  '<option value ="male">男</option>'+
				  '<option value="female">女</option>'+
				  '</select></dt>'+
				  '<dt class="dItem_s">职称：</dt>'+
				  '<dt class="dItem_s">专业：</dt>'+
				  '<dt class="dItem_s"><input type="text" name="JC_ZC" id="JC_ZC_input" maxlength="15" style="height: 20px;" /></dt>'+
			      '<dt class="dItem_s"><input type="text" name="JC_ZY" maxlength="15" id="JC_ZY_input" style="height: 20px;" /></dt>'+
			      '<dt class="dItem_s">工程中心/重点实验室：</dt>'+
			      '<dt class="dItem_s"></dt>'+
			      '<dt class="dItem_s" style=" width:300px;"><input type="text" name="JC_WORKTYPE" id="JC_WORKTYPE_input" maxlength="15" style="width: 250px; height: 20px;" /></dt>'+
				 '</dl>'+
				 '</div>'+
			 '</div>'+
			 '<div id="search_mainArea" class="search_mainarea" style="display:none">'+
			    '<div class="friendsearch_endline">查找结果'+
				   '<hr class="line">'+
			    '</div>'+
				'<div id="search_mainArea_main" class="search_mainarea_main">'+
				   '<div id="search_mainArea_result" class="search_mainarea_result" >'+
				   '</div>'+
				'</div>'+
			 '</div>'+
		'</div>';

//搜索群模板		
var searchgroupTemp='<div id="mainArea_{num}"  class="chat_mainarea">'+
     '<div id="search_mainArea_option" class="search_mainarea_option">'+
            '<div class="friendsearch_endline">查找条件'+
				'<hr class="line">'+
			'</div>'+
	  '<div class="basic_options">'+
		 '<dl class="bf_basicList" id="bf_basicList_2">'+
		   '<dt class="dItem_s">名称：</dt>'+
		   '<dt class="dItem_s">领域：</dt>'+
		   '<dt class="dItem_s"><input type="text" name="groupname" id="groupname" maxlength="15" style="height: 20px;" /></dt>'+	   
		   '<dt class="dItem_s">'+
	       '<select id="sl_grouply" name="sl_grouply">'+
	        '<option value =""></option>'+
	        '<option value ="生命科学">生命科学</option>'+
	        '<option value="材料科学">材料科学</option>'+
	        '<option value="地球科学">地球科学</option>'+
	        '<option value ="信息科学">信息科学</option>'+
	        '<option value ="工程科学">工程科学</option>'+
	        '<option value ="化学科学">化学科学</option>'+
	        '<option value ="数理科学">数理科学</option>'+
	        '<option value ="交叉领域">交叉领域</option>'+
	        '<option value ="农业">农业</option>'+
	        '<option value ="能源与交通">能源与交通</option>'+
	        '<option value ="制造业">制造业</option>'+
	        '<option value ="电子与信息通信">电子与信息通信</option>'+
	        '<option value ="材料">材料</option>'+
	        '<option value ="建设与环保">建设与环保</option>'+
	        '<option value ="资源开发">资源开发</option>'+
	        '<option value ="轻纺与医药卫生领域">轻纺与医药卫生领域</option>'+
	        '<option value ="其它">其它</option>'+
	        '</select>'+
	        '</dt>'+
	        '<dt class="dItem_s">标签：</dt>'+	
	        '<dt class="dItem_s"></dt>'+
		    '<dt class="dItem_s"><input type="text" name="grouptype" id="grouptype" maxlength="15" style="height: 20px;" /></dt>'+
		  '</dl>'+
	   '</div>'+
	 '</div>'+
	 '<div id="search_mainArea" class="search_mainarea" style="display:none">'+
		 '<div class="friendsearch_endline">查找结果'+
			'<hr class="line">'+
		 '</div>'+
		 '<div id="search_mainarea_main" class="search_mainarea_main">'+
			'<div id="search_group_result" class="search_mainarea_result" >'+
			'</div>'+
		 '</div>'+
	'</div>'+
'</div>';
        
//生成创建群页面。
var creategroupstr='<div class="pages" id="ui-pages">'+
			'<div class="page step1" id="step1" style="display: block;">'+
			  '<div class="nav">'+
			    '<ul class="clearfix">'+
			        '<li class="on"><i>1</i><span>填写群信息</span></li>'+
			        '<li><i>2</i><span>邀请群成员</span></li>'+
			    '</ul>'+
		      '</div>'+
			  '<div class="form mainform" id="mainform">'+
			    '<div class="label">群名称：</div>'+
			    '<div class="content">'+
		           '<input name="groupname" tabindex="20" class="single" id="ipt-group-name" aria-required="true" type="text" maxlength="30" value="" _placeholder="为你们的群取个给力的名字吧！" style="height: 20px;" >'+
			    '</div>'+
			    '<div class="label">群类型：</div>'+
			    '<div class="content">'+
			    '<select id="sl_grouply" name="sl_grouply">'+
			      '<option value =""></option>'+
			      '<option value ="生命科学">生命科学</option>'+
			      '<option value="材料科学">材料科学</option>'+
			      '<option value="地球科学">地球科学</option>'+
			      '<option value ="信息科学">信息科学</option>'+
			      '<option value ="工程科学">工程科学</option>'+
			      '<option value ="化学科学">化学科学</option>'+
			      '<option value ="数理科学">数理科学</option>'+
			      '<option value ="交叉领域">交叉领域</option>'+
			      '<option value ="农业">农业</option>'+
			      '<option value ="能源与交通">能源与交通</option>'+
			      '<option value ="制造业">制造业</option>'+
			      '<option value ="电子与信息通信">电子与信息通信</option>'+
			      '<option value ="材料">材料</option>'+
			      '<option value ="建设与环保">建设与环保</option>'+
			      '<option value ="资源开发">资源开发</option>'+
			      '<option value ="轻纺与医药卫生领域">轻纺与医药卫生领域</option>'+
			      '<option value ="其它">其它</option>'+
			    '</select>'+
			    '<label>&nbsp;</label>'+
			    '</div>'+
			    '<div class="label">自定义标签：</div>'+
			    '<div class="content">'+
			        '<div style="width:150px;height:35px;line-height:35px;float:left;">'+
			          '<input name="grouptype" tabindex="20" class="single" id="grouptype" aria-required="true" type="text" maxlength="30" value="" _placeholder="为你们的群取个给力的名字吧！" style="height: 20px;" >'+
			        '</div>'+
			        '<div id="user_addlabel" style="width:150px;height:35px;line-height:35px;float:left;">'+
			          '<div id="add_label" style="height:25px;width:50px;margin-top:5px;">'+
			          '</div>'+
			        '</div>'+
			    '</div>'+  
		   '</div>'+
		'</div>'+
	'</div>';
			
//窗口模板		
var funcwindowTemp = '<div id="app_window_{num}" window="{num}" class="app_window" style="width:{width}px; height: {height}px; left: {left}px; top:{top}px; display: block; visibility: visible; z-index: {z};" >' +
   '<div id="window_{num}" class="window" style=" z-index: {z};">' +
      '<div id="window_bgcontainer_{num}" class="bgcontainer" style="background:url(images/app_window/bg3.png) repeat-x scroll 0 0 #F4F9FC; "></div>'+
      '<div class="content">' +
	    '<div id="window_titlebar_{num}" class="titlebar" style="height:25px;">'+
	      '<div id="window_titlebutton_{num}" class="titlebutton">'+ 
		    '<a title="关闭"  id="close" href ="###"  style="display:block" class="titlebutton_close"></a>'+ 
		  '</div>'+
		  '<div id="window_title_{num}" class="title titletext" style="height:25px;">'+
			 '{title}'+
		  '</div>'+		 
	    '</div>'+ 
		'<div id="window_body_{num}"  class="body" style="width:{b_width}px; top:35px; height:{b_height}px;">'+ 
		     
	    '</div>'+
	    '<div id="window_controlPanel_{num}" align="right" class="controlarea">'+
	    '</div>'+
	  '</div>'+
   '</div>'+
'</div>';

//好友管理模板
var friendmanage = '<div class="content_area">'+
	'<div class="friendmanager_tabheadarea">'+								
	  '<div id="tabfriendHead_1" style="display: block;" class=" current">好友管理</div>'+								
	  '<div id="tabgroupHead_2" style="display: none;" class=" ">群组管理</div>'+							
	'</div>'+
	'<div class="friendmanager_tabbodyarea managerbody">'+								
	  '<div id="tabfriendBody_1" class="friendmanager" style="display: block;">'+ 
	    '<div id="friendmanager_area">'+
		   '<div id="friendmanager_left" class="friendmanager_left">'+
		     '<div id="friendmanager_left_head" class="friendmanager_left_head">好友分组'+
			 '</div>'+
			 '<div id="friendmanager_left_body" class="friendmanager_left_body">'+			  
			 '</div>'+
			 '<div id="friendmanager_left_footer" class="friendmanager_left_footer">'+
			    '<a id="friendmanage_group_addarea" title="添加好友分组" class="friendmanage_group_addarea" href="###">'+
			     '<div class="friendmanage_group_add" id="friendmanage_groupadd">'+
			     '添加'+
			     '</div>'+
			    '</a>'+
			    '<a id="friendmanage_group_delarea" title="删除好友分组" class="friendmanage_group_delarea" href="###">'+
			     '<div class="friendmanage_group_del" id="friendmanage_groupdel">'+
			     '删除'+
			     '</div>'+
			    '</a>'+
			 '</div>'+
		   '</div>'+
		   '<div id="friendmanager_center" class="friendmanager_center">'+
		      '<div id="friendmanage_center_toolbar" class="friendmanage_center_toolbar">'+	
		        '<a id="friendmanage_toolbar_all" class="friendmanage_toolbar_all">'+
		          '<div id="friendmanage_toolbar_allicon" class="friendmanage_toolbar_allicon">'+
		            '全    部'+
		          '</div>'+
		        '</a>'+
		      '</div>'+
		      '<div id ="friendmanage_center_area" class="friendmanage_center_area">'+
		           '<div id="friendmanage_center_result" class="friendmanage_center_result">'+
		           '</div>'+
		      '</div>'+
		   '</div>'+
		'</div>'+	
	  '</div>'+							
      '<div id="tabgroupBody_2" class="groupmanager" style="display: none;" >'+
	     '<div id="groupmanager_area">'+
		    '<div id="groupmanager_center">'+
			
			'</div>'+
		 '</div>'+
	  '</div>'+
	'</div>'+
   '</div>';
 
var tagTemp = '<h3 class="special-title">已添加：</h3>'+
                  '<div class="special-label-now" id="J_userLabelWrap" >'+
                    '<span style="opacity: 1;" class="special-label-edit special-label-edit1" title="精通互联网" value="精通互联网">'+
                       '<em></em><b>精通互联网</b><i class=""></i>'+
                    '</span>'+
                    '<span style="opacity: 1;" class="special-label-edit special-label-edit1" title="团队合作" value="团队合作">' +
                       '<em></em><b>团队合作</b><i></i>'+
                    '</span>'+
                    '<span style="opacity: 1;" class="special-label-edit special-label-edit1" title="沟通协调" value="沟通协调">' +
                       '<em></em><b>沟通协调</b><i class=""></i>'+
                    '</span>'+    
                '</div>';
                
var label = '<h3 class="default-label-title">快速添加符合自己的技能标签：</h3>'+
               '<div class="default-label-wrap">'+
                 '<div class="label-animate-wrap">'+
                    '<ul style="width: 1590px; left: 0px;" class="deafult-label-con" id="J_pagesWrap">'+
                     '<li>'+
                          '<a class="special-label-default" href="" value="word"><em></em><span>项目工程</span></a>'+
                          '<a class="special-label-default" href="" value="excel"><em></em><span>科学研究</span></a>'+
                          '<a class="special-label-default" href="" value="powerpoint"><em></em><span>科学前沿</span></a>'+
                          '<a class="special-label-default" href="" value="photoshop"><em></em><span>小组讨论</span></a>'+
                          '<a class="special-label-default" href="" value="outlook"><em></em><span>相互学习</span></a>'+
                          '<a class="special-label-default" href="" value="商务谈判"><em></em><span>会议讨论</span></a>'+
                          '<a class="special-label-default" href="" value="市场拓展"><em></em><span>项目协作</span></a>'+
                          '<a class="special-label-default" href="" value="英语"><em></em><span>双方合作</span></a>'+
                          '<a class="special-label-default" href="" value="公文写作"><em></em><span>技术团队</span></a>'+
                          '<a class="special-label-default" href="" value="办公自动化"><em></em><span>领域工作</span></a>'+
                          '<a class="special-label-pass" href="" value="沟通协调"><em></em><span>沟通协调</span></a>'+ 
                          '<a class="special-label-default" href="" value="表达能力"><em></em><span>茶余饭后</span></a>'+
                          '<a class="special-label-default" href="" value="创新能力"><em></em><span>技术创新</span></a>'+
                          '<a class="special-label-default" href="" value="目标管理"><em></em><span>目标管理</span></a>'+
                          '<a class="special-label-default" href="" value="逻辑分析"><em></em><span>其他</span></a>'+
                      '</li>'+
                    '</ul>'+
               '</div>'+
      '<div class="default-label-page">'+
         '<a title="查看其他标签" href="" class="label-pre label-pre-normal label-pre-disable" id="J_prePage" onclick="return false;" hidefocus="true">上一页</a>'+
         '<a title="查看其他标签" href="" class="label-next label-next-normal" id="J_nextPage" onclick="return false;" hidefocus="ture">下一页</a>'+
      '</div>'+
    '</div>';
 