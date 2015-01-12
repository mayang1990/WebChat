/**
 * 聊天程序初始化过程 Date 2014-04-05 author lianghao
 **/
// 初始化主面板

var num = 1; // 创建的窗口的顺序
var z_value = 20; // 创建聊天窗口的纵坐标
var font_family = "宋体";  //初始化字体
var font_size = "10";      //初始化字体大小
var contextMenugroup = ""; //移动好友分组二级菜单
var im_my_uid = "";        //当前用户id
var im_my_uname = "";      //当前用户名称
var funcWindowarray = new Array();//功能窗口名称向量
var invitedfriends = new Array();//被邀请加入群的好友。
var isinvideo = false;//是否正在视频聊天。
var lastId = "";  //更新在线时间


/** RightKey Menu Begin **/
// 右键菜单（好友列表菜单）
function im_contextMenu(obj) {
	$.contextMenu( 'destroy', '.context-menu-one' );
	$.contextMenu({
		selector : '.context-menu-one',
		callback : function(key, options) {
			 switch(key)
			  {
				case "send_message":		  
					 im_createWindow($(this).children().attr('id'),$(this).find(".friendlist_nick").html(),"chat_window","block");
					 break;
				case "editremark":
					 im_editremarkwin($(this).children().attr('id'));
					 break;
				case "delet":
				    { 
				     var msg = "确定删除该好友？";
				     var opt = {num : "confirm",height : "130", width : "250"};	
					 im_confirm(msg,opt,$(this).children().attr('id'),im_delfriend);
				    }
					break;
				case "personal_profile":
					im_displayfriendinfo($(this).children().attr('id'));
					break;
				default :
					im_movefriendgroup(key,$(this).children().attr('id'));
					break;			  
			   }         
		},
		items : {
			"send_message" : {name : "发送消息"},
			"sep1" : "---------",		
			"moveto" : {name : "移动好友至",	items : obj	},
			"delet" : {	name : "删除好友"},
			"editremark" : {name : "修改备注"},
			"sep2" : "---------",
			"personal_profile" : {name : "查看资料"}
		}
	});

};

// 右键菜单(群列表菜单)
function im_groupcontextMenu() {
	$.contextMenu({
		selector : '.context-menu-two',
		callback : function(key, options) {
			switch (key) {
				case "send_message" :
					im_createWindow($(this).children().attr('id'),$(this).find(".grouplist_nick").html(), "room_window","block");
					break;
				case "delete":
				{
				      var msg = "确定要删除群吗？";
			          var opt = {num : "confirm",height : "130", width : "250"};	
			          im_confirm(msg,opt,$(this).children().attr('id'),im_deletegroup);
				}
					break;
				case "quite":
				   {
				      var msg = "确定要退出群吗？";
			          var opt = {num : "confirm",height : "130", width : "250"};	
			          im_confirm(msg,opt,$(this).children().attr('id'),im_quitegroup);
				   }
					break;
				case "invite":
					im_invitefriendtogroupwin($(this).children().attr('id'),$(this).children().text());
					break;
				case "group_info":
					im_displayeditgroupinfowin($(this).children().attr('id'),$(this).children().text());
					break;
				default :
					break;
			}
		},
		items : {
			"send_message" : {name : "发送群消息"	},
			"sep1" : "---------",
			"invite" : {name : "邀请好友加入群"},
			"quite" : {name : "退出该群"},
			"delete" : {name : "删除该群"},
		    "sep2" : "---------",
		    "group_info" : {name : "查看群资料"}
			
		}
	});
}
//右键菜单（好友分组菜单）
function im_friendgroupcontextMenu()
{
	$.contextMenu({
		selector:'[fgtype="custom"]',
		callback:function(key, options){
			switch(key){
			case "create":
				im_createfriendgroupwin();
				break;
			case "update":
				im_updatefriendgroupnamewin($(this).attr("head_fg_id"));
				break;
			case "delete":
			   {
			     var msg = "确定要删除好友分组吗？该分组中的好友将会被移动到默认分组";
			     var opt = {num : "confirm",height : "130", width : "250"};	
			     im_confirm(msg,opt,$(this).attr("head_fg_id"),im_deletefriendgroup);
			   }
				break;
			default:
				break;
			}
		},
		items:{
			"create":{name:"创建分组"},
			"update":{name:"修改分组"},
			"delete":{name:"删除分组"}
		}
	});
	$.contextMenu({
		selector:'[fgtype="default"]',
		callback:function(key, options){
			switch(key){
			case "create":
				im_createfriendgroupwin();
				break;
			default:
				break;
			}
		},
		items:{
			"create":{name:"创建分组"}
		}
	});
}
/**
 * im_createfriendgroupwin()
 * 创建好友分组的窗口
 * **/
function im_createfriendgroupwin() {
	if (!im_winexist("createfriendgroup")) {
		var opt = {
			num : "createfriendgroup",
			z : z_value,
			title : "创建好友分组",
			height : "120",
			width : "250"
		};
		var obj = im_funcWindow(opt);
		funcWindowarray.push("createfriendgroup");
		var createfriendgroupstr = ' '
				+ '<div style="margin:5px;padding:5px;">'
				+ '分组名称：<input id="ip_friendgroupname" style="margin:3px;padding:3px;" type="text" maxlength=8 />'
				+ '</div>' + ' ';
		obj.find(".body").append(createfriendgroupstr);
		var btstr = '<a title="确    定" class="chat_sendmsg" id="bt_createfriendgroup" href="#">确    定</a>';
		obj.find(".controlarea").append(btstr);
		obj.find(".controlarea").find("#bt_createfriendgroup").bind("click",
				function() {
					var gname = obj.find("#ip_friendgroupname").val();
					if (gname != '') {
						im_createfriendgroup(obj);
						im_removewinid(obj.attr("window"));
						obj.remove();
					} else {

				}
		});
	}

}
/**
 * im_createfriendgroup()
 * 创建分组
 **/
function im_createfriendgroup(obj)
{
	$.ajax({
		async:false,
		cache:false,
		url:"createfriendgroup.do",
		data:{FG_NAME:obj.find(".body").find("#ip_friendgroupname").val()},
		type:"POST",
		dataType:"text",
		success:function(data){
			im_displaygrouplist();  
			im_grouplist($("#app_window_friendmanage"));
			var contextMenugroupobj = im_formatObj(contextMenugroup);       
			im_contextMenu(contextMenugroupobj);
			im_showFriends($("#app_window_1"));
		}
	});
}
/**
 * im_updatefriendgroupnamewin()
 * 修改好友分组名称窗口
 * id是分组id
 * **/
function im_updatefriendgroupnamewin(id) {
	if (!im_winexist("updatefriendgroupname")) {
		var winopt = {
			num : "updatefriendgroupname",
			z : z_value,
			title : "修改好友分组名称",
			height : "120",
			width : "250"
		};
		var winobj = im_funcWindow(winopt);
		funcWindowarray.push("updatefriendgroupname");
		var updatefriendgroupnamestr = '<div style="margin:5px;padding:5px;">'
				+ '分组名称：<input id="ip_friendgroupname" fgid="' + id
				+ '" style="margin:3px;padding:3px;" type="text" maxlength=8/>'
				+ '</div>';
		winobj.find(".body").append(updatefriendgroupnamestr);
		var btstr = '<a title="确定" class="chat_sendmsg" id="bt_updatefriendgroupname" href="#">确    定</a>';
		winobj.find(".controlarea").append(btstr);
		winobj.find(".controlarea").find("#bt_updatefriendgroupname").bind(
				"click", function() {
					var gname = winobj.find("#ip_friendgroupname").val();
					if (gname != '') {
						im_updatefriendgroupname(winobj);
						im_removewinid(obj.attr("window"));
						obj.remove();
					} else {

					}
				});
	}
}
/**
 * im_updatefriendgroupname()
 * 修改好友分组名称
 * **/
function im_updatefriendgroupname(obj) {
	$.ajax({
        cache : false,
		url : "updatefriendgroupname.do",
		data : {
				FG_ID : obj.find(".body").find("#ip_friendgroupname")
							.attr("fgid"),
				FG_NAME : obj.find(".body").find("#ip_friendgroupname")
							.val()
				},
		type : "POST",
		dataType : "text",
		success : function(data) {
				im_displaygrouplist();
				var contextMenugroupobj = im_formatObj(contextMenugroup);
				im_contextMenu(contextMenugroupobj);
				im_showFriends($("#app_window_1"));
			}
	});
}
/**
 * im_deletefriendgroup(id)
 * 删除好友分组
 * id是好友id
 * **/
function im_deletefriendgroup(id){
	$.ajax({
		cache:false,
		url:"deletefriendgroup.do",
		data:{FG_ID:id},
		type:"POST",
		dataType:"text",
		success:function(data){
			im_displaygrouplist();
			im_displayfriendlist();
			im_grouplist($("#app_window_friendmanage"));
			var contextMenugroupobj = im_formatObj(contextMenugroup);       
			im_contextMenu(contextMenugroupobj);
			im_showFriends($("#app_window_1"));
		}
	});
}
/**
 * im_delfriend()
 * 删除好友
 * **/
function im_delfriend(userid) {
	$.ajax({
			cache:false,
			url : "delfriend.do",
			data : {USERID : userid},
			type : "POST",
			dataType : "text",
			success : function() {
				 var opt={num : "hint",height : "130",width : "250"};
				 var tiptxt = "成功删除好友！" ;
				 im_alert(tiptxt,opt);
				 $(".friendline").each(
					function(){
						if($(this).attr("id")==userid){
						 $(this).parent().remove();
						}
					}
				);
		    }
    });
}
/**
 * im_movefriendgroup(key, userid)
 * 移动好友分组
 * **/
function im_movefriendgroup(key, userid) {
	$.ajax({
		cache:false,
		url : "movefriendgroup.do",
		data : {FG_ID : key,F_FRIENDID : userid},
		type : "POST",
		dataType : "text",
		success : function(){
			im_refreshfriendlist();     
	    }
	});
}
/**
 * im_editremarkwin(id)
 * 修改备注窗口
 * **/
function im_editremarkwin(id)
{
	var winopt={num : "editremark"+id,z : z_value,title: "修改备注",height : "120",width : "250"};
	var winobj=im_funcWindow(winopt);
	var editremarkstr=' '+
	'<div style="margin:5px;padding:5px;">'+
	'备注：<input id="ip_remark" fid="'+id+'" style="margin:3px;padding:3px;" type="text" />'+
	'</div>'+
    ' ';
	winobj.find(".body").append(editremarkstr);
	var btstr='<a title="确定" class="chat_sendmsg" id="bt_editremark" href="#">确    定</a>';
	winobj.find(".controlarea").append(btstr);
	winobj.find(".controlarea").find("#bt_editremark").bind("click",function(){
		im_editremark(winobj);
	});
}
/**
 * im_editremark(obj)
 * 修改备注
 * **/
function im_editremark(obj)
{
	$.ajax({
		cache:false,
		url:"editremark.do",
		type:"POST",
		data:{F_FriendID:obj.find("#ip_remark").attr("fid"),F_REMARK:obj.find("#ip_remark").val()},
		dataType:"text",
		success:function(){
			obj.remove();
			im_refreshfriendlist();
		}
	});
}
//显示好友详细信息。
function im_displayfriendinfo(user_id)
{
	if(!im_winexist("userinfo"))
	{
		var winobj=null;
		funcWindowarray.push("userinfo");
		var winopt={num : "userinfo",z : z_value,title: "详细信息",height : "350",width : "500"};
		winobj=im_funcWindow(winopt);
		
		$.ajax({
			cache:false,
			async : false,
			url : "displayuserdetails.do",
			data : {USER_ID:user_id},
			type : "GET",
			dataType : "json",
			success : function(data){
				var map=data[0];
				var userinfostr='<div class="window_bodyarea" id="window_body_6" style="width: 500px; height: 300px;">'+          
				'<div class="userdetails_area">'+            
				'<div class="userdetails_maininfo" style="height: 65px;">'+              
				'<img class="userdetails_avatar" id="userdetails_avatar" src="images/app_window/im_groupmember_icon.png">'+              
				'<div class="userdetails_namearea">'+                
				'<div class="userdetails_name" id="userdetails_name">'+map.USER_NAME+'</div>'+				
				'<div class="userdetails_account" id="'+map.USER_ID+'" style="display: block;color:#2c879b">&lt;'+map.USER_ID+'&gt;</div>'+                              			             
				'</div>'+                         
				'</div>'+            
				'<div class="userdetails_tabheadarea">'+              
				'<div class=" current" id="userdetails_basicInfo_head" style="display: block;">基本资料</div>'+                      
				'</div>'+            
				'<div class="userdetails_tabbodyarea">'+              
				'<div id="userdetails_basicInfo_body" style="display: block;">';
				if(map.USER_BZ==1)
					{
					userinfostr=userinfostr+'<dl class="userdetails_basiclist">'+          
					'<dt>性  别:</dt>  <dd class="userdetails_small">'+map.USER_GENDER+'</dd>'+                  
					'<dt>生  日:</dt>  <dd>'+map.USER_CSNY+'</dd>'+                    
					'<dt>职  务:</dt>  <dd></dd>'+          
					'<dt>职  称:</dt>  <dd>'+map.USER_ZC+'</dd>'+   
					'<dt>专  业:</dt>  <dd>'+map.USER_CSZY+'</dd>'+        
					'<dt>个人主页:</dt>  <dd></dd>'+          
					'<dt>工程中心:</dt>  <dd class="userdetails_superbig">'+map.WT_NAME+'</dd>'+         
					'</dl>'+      
					'</div>'+                       
					'</div>'+          
					'</div>'+        
					'</div>';
					}
				else if(map.USER_BZ==2)
					{
					userinfostr=userinfostr+'<dl class="userdetails_basiclist">'+          
					'<dt>性  别:</dt> <dd class="userdetails_small">'+map.USER_GENDER+'</dd>'+                  
					'<dt>生  日:</dt> <dd>'+map.USER_CSNY+'</dd>'+                    
					'<dt>职  务:</dt> <dd></dd>'+          
					'<dt>职  称:</dt> <dd>'+map.USER_ZC+'</dd>'+   
					'<dt>专  业:</dt> <dd>'+map.USER_CSZY+'</dd>'+        
					'<dt>个人主页:</dt> <dd></dd>'+          
					'<dt>重点实验室:</dt> <dd class="userdetails_superbig">'+map.WT_NAME+'</dd>'+        
					'</dl>'+      
					'</div>'+                       
					'</div>'+          
					'</div>'+        
					'</div>';
					}
				winobj.find(".body").append(userinfostr);
			}
		});
	}
}
//邀请好友加入已有群窗口
function im_invitefriendtogroupwin(gid,gname)
{
	if(!im_winexist("invitefriendtogroupwin"))
		{
		var winopt={num : "invitefriendtogroupwin",z : z_value,title: "邀请好友加入群",height : "408",width : "542"};
		var winobj=im_funcWindow(winopt);
		funcWindowarray.push("invitefriendtogroupwin");
		var invitememberstr="";
		$.ajax({
			async:false,
			cache:false,
			url:"getfriendtoinvite.do",
			data:{G_ID:gid},
			type:"GET",
			dataType:"json",
			success:function(data){
				invitememberstr='<div style="padding:20px 0px 0px 80px;">'+
				'<select multiple="multiple" id="invitefriendtogroup" name="invitefriendtogroup[]">';
				//获取好友列表。
				for(var listkey in data){
					var map=data[listkey];
					var displayname="";
					if(map.F_REMARK==null)
						{
						displayname=map.USER_NAME;
						}
					else
						{
						displayname=map.F_REMARK;
						}
					invitememberstr=invitememberstr+'<option value="'+map.USER_ID+'">'+displayname+'</option>';
				}
				invitememberstr=invitememberstr+'</select>'+
				'</div>';
			}
		});
		winobj.find(".body").append(invitememberstr);
		winobj.find(".body").find("#invitefriendtogroup").multiSelect({
			afterSelect:function(values){
				im_add_invitedfriends(values.toString());
			},
			afterDeselect:function(values){
				im_sub_invitedfriends(values.toString());
			}
		});
		var btstr='<div id="invitefriendtogroup_confirm" class="ip_button" >确定</div>'+
		'<div id="invitefriendtogroup_cancel" class="ip_button" >取消</div>';
	    winobj.find(".controlarea").append(btstr);
	    winobj.find(".controlarea").find("#invitefriendtogroup_confirm").bind("click",function(){
	    	if(invitedfriends.length>0)
	    		{
	    		im_invitefriendtogroup(winobj,gid,gname);
		    	winobj.find(".controlarea").find("#invitefriendtogroup_confirm").attr("disabled","true");
				setTimeout(function(){winobj.find(".controlarea").find("#invitefriendtogroup_confirm").removeAttr("disabled");},3000);
	    		}
	    });
	    winobj.find(".controlarea").find("#invitefriendtogroup_cancel").bind("click",function(){
	    	im_cleararray(invitedfriends);
	    	winobj.remove();
	    	im_removewinid("invitefriendtogroupwin");
	    });
		}
	
}
//邀请好友加入群
function im_invitefriendtogroup(winobj,gid,gname)
{
	var invitedfriendsstr="";
	for(var i=0;i<invitedfriends.length;i++)
	{
		invitedfriendsstr=invitedfriendsstr+invitedfriends[i]+",";
	}
	$.ajax({
		cache:false,
		url:"invitefriendtogroup.do",
		data:{G_ID:gid,G_NAME:gname,USER_ID_STR:invitedfriendsstr},
		type:"POST",
		dataType:"text",
		success:function(data){
			im_cleararray(invitedfriends);
			winobj.remove();
			im_removewinid("invitefriendtogroupwin");
		}
	});
}
/** RightKey Menu End **/

/** Main Board Init Begin **/
//初始化主面板
function im_initMainboard(opt)
{ 
    this.options = { //默认初始化参数
		win_id : "mainboard",
		win_num : num,
		win_z : z_value,
		win_name : "Web IM",
		win_imgsrc : "images/app_window/im_app_icon.png",
		win_height : 500,
		win_width : 210
	};
    options = $.extend(options,opt);  
	var top = ($(window).height() - options.win_height - 30) / 2 <= 0 ? 0: ($(window).height() - options.win_height - 30) / 2;
	var left = ($(window).width() - options.win_width) / 2 <= 0 ? 0	: ($(window).width() - options.win_width) / 2;
	var maintemp = { //初始化参数
		"id" : options.win_id,
		"num" : options.win_num,
		"z" : options.win_z,
		"username" : options.win_name,
		"imgsrc" : options.win_imgsrc,
		"top" : top,
		"left" : left
	};		
	$('#app_window').append(im_formatModel(mainboardTemp, maintemp));// 初始化主面板
	
	var tasktemp = {// 任务栏数据
		"id" : options.win_id,
		"num" : options.win_num,
		"name" : options.win_name,
		"display" : "block",
		"imgsrc" : options.win_imgsrc ,
		"title": "Web IM"
	};
	$('.task-window').append(im_formatModel(taskTemp, tasktemp));// 新增任务栏
	
	var obj = $('#app_window_' + options.win_num);
	im_basicHandle(obj);
	obj.find('.titlebutton_close').unbind("click");
	obj.find('.titlebutton_close').bind("click" , function(){
		var msg = "确定关闭应用程序？将结束所有聊天";
		var opt = {num : "confirm",height : "130", width : "250"};	
		im_confirm(msg,opt,$(this).children().attr('id'),app_end);
	});
	
	obj.find('#mypanel_toolbar_refresh').bind("click",function(e){im_refreshmainboard(); e.stopPropagation();});
	obj.find('.friendsearch').bind("click", function(e) {im_winfriendfind(); e.stopPropagation();});
	obj.find('.friendmanage').bind("click", function(e){im_winfriendmanage(); e.stopPropagation();});
	obj.find('.groupcreate').bind("click", function(e) {im_wincreategroup(); e.stopPropagation();});
	obj.find('.groupsearch').bind("click", function(e) {im_winsearchgroup(); e.stopPropagation();});
		
	im_displaymyself(obj);         //显示用户信息。
	im_displaygrouplist();         //初始化好友分组列表
	im_displayfriendlist();        //显示好友列表
	im_displaygroup();             //初始化群组列表
	im_displayrecentfriend();      //最近联系人
	im_displayrecentgroup();       //最近联系群
	im_showFriends(obj);                 //初始化标签
	var contextMenugroupobj = im_formatObj(contextMenugroup); //初始化二级菜单
	im_contextMenu(contextMenugroupobj); //初始化好友列表右键菜单
	im_groupcontextMenu();               //初始化群组右键菜单
	im_friendgroupcontextMenu();         //初始化好友分组右键菜单
	im_faceControl();                    //初始化表情菜单
	z_value += 1;
	num += 1;
	setInterval(function(){im_refreshmainboard();},10000);
}

/**
 * im_displaymyself(obj)
 * 显示个人信息
 * obj主面板对象
 * **/
function im_displaymyself(obj)
{
	$.ajax({
		cache:false,
		async : false,
		url : "displaymyself.do",
		type : "GET",
		dataType : "json",
		success :function (data) {
			var myPanelstr='<img title="" class="myavatar" id="myAvatar" src="images/photoicon/im_default_photo.jpg" uin="'+data.USER_ID+'">'+                    
            '<div class="myinfo" id="myInfo" style="width: 140px;">'+                                              
            '<div title="'+data.USER_NAME+'" class="mynick" id="myNick" style="width: 165px;">'+data.USER_NAME+'</div>'+                                  
            '</div>';
			obj.find("#myPanel").append(myPanelstr);			
		    im_my_uid = data.USER_ID ;       //当前用户id
            im_my_uname = data.USER_NAME ;   //当前用户名称
	        //点击我的头像显示自己的个人信息。
	        obj.find("#myPanel").bind("click",function(e){im_displayfriendinfo(im_my_uid);e.stopPropagation();});
		}
	});
}


// 切换好友、讨论组、最近联系人列表
function im_showFriends(obj) {
	obj.find("ul li").each(function() {
		$(this).bind("click", function() {
			var index = $(this).index();
			$(this).addClass("current").siblings().removeClass("current");
			switch (index) {
				case 0 :
					$("#tab1").addClass("iconcurrent1");
					$("#tab2").removeClass("iconcurrent2");
					$("#tab3").removeClass("iconcurrent3");
					$("#friendListPanel").show();
					$("#groupListPanel").hide();
					$("#recentListPanel").hide();
					break;
				case 1 :
					$("#tab1").removeClass("iconcurrent1");
					$("#tab2").addClass("iconcurrent2");
					$("#tab3").removeClass("iconcurrent3");
					$("#friendListPanel").hide();
					$("#groupListPanel").show();
					$("#recentListPanel").hide();
					break;
				case 2 :
					$("#tab1").removeClass("iconcurrent1");
					$("#tab2").removeClass("iconcurrent2");
					$("#tab3").addClass("iconcurrent3");
					$("#friendListPanel").hide();
					$("#groupListPanel").hide();
					$("#recentListPanel").show();
					break;
			}
		});
	});

	$(".listbody").hide();
	$(".listhead").click(function() {
			var display = $(this).next(".listbody").css("display");
			if (display == "block") {
				$(this).find("#icon").removeClass("list_icon2");
				$(this).find("#icon").addClass("list_icon1");
			} else {
				$(this).find("#icon").removeClass("list_icon1");
				$(this).find("#icon").addClass("list_icon2");
			}
			$(this).next(".listbody").toggle("normal");
	});
};

//生成好友列表内容字符串。
function im_genfriendliststr(map)
{
	var displayname="";
	if(map.F_REMARK==null)
	{
		  displayname=map.USER_NAME;
	}
	else{
		displayname=map.F_REMARK;
	}
	if(map.USER_ISONLINE=="1")
	{
		bodystr='<div class="context-menu-one">'+
		'<div class="friendline" id="'+map.USER_ID+'">'+
		'<div title="在线" class="friendphoto_container" id="photo_'+map.USER_ID+'">'+
		'<img src="images/app_window/im_groupmember_icon.png">'+
		'</div>'+
		'<div title="'+displayname+' - 在线" class="friendlist_rightcontainer" id="friend_rightcontainer">'+
		'<div class="friendlist_nick" id="nick_'+map.USER_ID+'" >'+displayname+'</div>'+
		'</div></div></div>';
	}
	else{
		bodystr='<div class="context-menu-one">'+
		'<div class="friendline" id="'+map.USER_ID+'">'+
		'<div title="离线" class="friendphoto_container" id="photo_'+map.USER_ID+'" style="filter:alpha(opacity=40);opacity: 0.4;" offline="yes">'+
		'<img src="images/app_window/im_groupmember_icon.png">'+
		'</div>'+
		'<div title="'+displayname+' - 离线" class="friendlist_rightcontainer" id="friend_rightcontainer">'+
		'<div class="friendlist_nick" id="nick_'+map.USER_ID+'">'+displayname+'</div>'+
		'</div></div></div>';
	}
	return bodystr;
}
/**
 * im_displaygrouplist
 * 生成好友列表
 * **/
function im_displaygrouplist() {
	//移动好友分组二级菜单字符串。
	contextMenugroup="";
	//树形菜单字符串。
	var treestr="";
	//前一次循环中的FG_ID.
	var preFG_ID="";
	//生成在线好友默认分组。
	treestr='<div class="listhead" id="listhead_online" fgtype="default">'+
		'<div class="list_icon1" id="icon"></div>'+
		'<div title="在线好友" style="overflow: hidden; padding-left: 5px; display: block;">'+
		'<div id="online_name" style="width: auto; float: left;">在线好友[<span id="online_counter"></span>]'+
		'</div></div></div>'+
		'<div class="listbody" fg_id="onlinefriend" style="height: auto; display: none;"></div>'+				
		'<div class="listhead" id="listhead_online" fgtype="default">'+
		'<div class="list_icon1" id="icon"></div>'+
		'<div title="我的好友" style="overflow: hidden; padding-left: 5px; display: block;">'+
		'<div id="online_name" style="width: auto; float: left;">我的好友[<span id="online_counter"></span>]'+
		'</div></div></div>'+
		'<div class="listbody" fg_id="1" style="height: auto; display: none;"></div>';
	//生成自定义分组。
	var data=im_getfriendgroup();
	for (var listkey in data) {
		var map=data[listkey];
		//遍历data，发现了新的分组。
		if((preFG_ID!=map.FG_ID)&&(map.FG_ID!="1"))
			{
			treestr=treestr+'<div class="listhead" id="listhead_online" fgtype="custom" head_fg_id="'+map.FG_ID+'">'+
			'<div class="list_icon1" id="icon"></div>'+
			'<div title="'+map.FG_NAME+'" style="overflow: hidden; padding-left: 5px; display: block;">'+
			'<div id="online_name" style="width: auto; float: left;">'+map.FG_NAME+'[<span id="online_counter"></span>]'+
			'</div></div></div>'+
			'<div class="listbody" fg_id="'+map.FG_ID+'" style="height: auto; display: none;"></div>';
			//生成移动好友分组二级菜单。
			contextMenugroup = contextMenugroup + "'" + map.FG_ID
			+ "': {name:'" + map.FG_NAME + "'},";
			}
		preFG_ID=map.FG_ID;
	}
	contextMenugroup = contextMenugroup.substring(0,contextMenugroup.length - 1);
	contextMenugroup = "{" + contextMenugroup + "}";
	document.getElementById("friendList").innerHTML =treestr;
}
/**
 * im_displayfriendlist()
 * 生成好友列表
 * **/
function im_displayfriendlist(){
	//填充好友分组。
	var data = im_getfriendlist();
	for (var listkey in data) {
		var map=data[listkey];
		if(map.USER_ISONLINE=="1"){
			$("#friendList").find("[fg_id='onlinefriend']").append(im_genfriendliststr(map));
			$("#friendList").find("[fg_id='"+map.FG_ID+"']").append(im_genfriendliststr(map));
		}
		else{
			$("#friendList").find("[fg_id='"+map.FG_ID+"']").append(im_genfriendliststr(map));
		}
	}
	//自定义分组好友计数。
	$("#friendList").find(".listhead").each(function(){
		var totalcount=$(this).next(".listbody").children().length;
		var offlinecount=$(this).next(".listbody").find("[offline='yes']").length;
		var onlinecount=totalcount-offlinecount;
		$(this).find("#online_counter").html(onlinecount+"/"+totalcount);
	});
	//好友显示弹出层
    $("#friendList").find(".friendline").each(function(){
		im_pop($(this));
     });
	//绑定左键点击事件。
	$('.context-menu-one').each(function() {
		$(this).bind("click", function(e) {
			im_leftclickfriend($(this));
			e.stopPropagation();
		});
	});
}

//获取好友分组。
function im_getfriendgroup()
{
	var friendgroup=null;
	$.ajax({
		cache:false,
		async:false,
		url:"displayfriendgroup.do",
		type:"GET",
		dataType:"json",
		success:function(data){
			friendgroup=data;
		}
	});
	return friendgroup;
}
//获取所有好友。
function im_getfriendlist()
{
	var friendlist=null;
	$.ajax({
		cache:false,
		async:false,
		url : "displayfriendlist.do",
		type : "GET",
		dataType : "json",
		success:function(data){
			friendlist=data;
		}
	});
	return friendlist;
}

//根据分组ID获取好友。
function im_displayfriendlistbygroup(fgid)
{
	var friendlist=null;
	$.ajax({
		async:false,
		cache:false,
		url:"displayfriendlistbygroup.do",
		data:{FG_ID:fgid},
		type:"GET",
		dataType:"json",
		success:function(data){
			friendlist=data;
		}
	});
	return friendlist;
}

//生成群列表。
function im_displaygroup() {
	$.ajax({
		cache:false,
		async:false,
		url:"displaymygroup.do",
		type:"GET",
		dataType:"json",
		success:function(data) {
			var listbody = '';
			for (var listkey in data) {
				var map = data[listkey];
				listbody = listbody
						+ '<div class="context-menu-two"><div id="'
						+ map.G_ID
						+ '" class="groupline">'
						+ '<div id="photo_'+map.G_ID+'" class="groupphoto_container">'
						+ '<img src="images/app_window/im_group_icon.png"/>'
						+ '</div>'
						+ '<div id="group_rightcontainer" class="grouplist_rightcontainer">'
						+ '<div id="nick_'+map.G_ID+'" class="grouplist_nick">'
						+ map.G_NAME + '</div></div>' + '</div>' + '</div>';
			}
			document.getElementById("groupList").innerHTML = listbody;
			$('.context-menu-two').each(function() {
						$(this).bind("click", function(e) {
									im_leftclickgroup($(this));
									e.stopPropagation();
								});
					});
		}
	});
}
//显示最近联系人列表。
function im_displayrecentfriend()
{
	$.ajax({
		cache:false,
		async:false,
		url:"displayrecentfriend.do",
		type:"GET",
		dataType:"json",
		success:function(data){
			var html="";
			var listbody = '<div class="listbody" style="height: auto; display: block;">';
			var listhead = '<div  id="listhead_online" class="listhead">'+
			             '<div id="icon" class="list_icon1"></div>'+
					     '<div style="overflow: hidden; padding-left: 5px; display: block;" title="最近联系人">'+
						 '<div style="width: auto; float: left;" id="online_name">'+
						 '最近联系人'+
						 '</div>'+
						 '</div></div>';
			for (var listkey in data) {
				var map=data[listkey];
				var displayname="";
				if(map.F_REMARK==null){
					displayname=map.USER_NAME;
				}
				else{
					displayname=map.F_REMARK;
				}
				if(map.USER_ISONLINE=="1"){
					listbody += '<div class="context-recent-friend">'+
					'<div class="friendline" id="'+map.USER_ID+'">'+
					'<div title="在线" class="friendphoto_container" id="photo_'+map.USER_ID+'">'+
					'<img src="images/app_window/im_groupmember_icon.png">'+
					'</div>'+
					'<div title="'+displayname+' - 在线" class="friendlist_rightcontainer" id="friend_rightcontainer">'+
					'<div class="friendlist_nick" id="nick_'+map.USER_ID+'" >'+displayname+'</div>'+
					'</div></div></div>';
				}else{
					listbody += '<div class="context-recent-friend">'+
					'<div class="friendline" id="'+map.USER_ID+'">'+
					'<div title="离线" class="friendphoto_container" id="photo_'+map.USER_ID+'" style="filter:alpha(opacity=40);opacity: 0.4;" offline="yes">'+
					'<img src="images/app_window/im_groupmember_icon.png">'+
					'</div>'+
					'<div title="'+displayname+' - 离线" class="friendlist_rightcontainer" id="friend_rightcontainer">'+
					'<div class="friendlist_nick" id="nick_'+map.USER_ID+'">'+displayname+'</div>'+
					'</div></div></div>';
				}
			}
			listbody +='</div>';
			html = listhead + listbody ;
			$("#recentListPanel").append(html);		
			$('.context-recent-friend').each(function() {
				$(this).bind("click", function(e) {
							im_leftclickfriend($(this));
							e.stopPropagation();
				});
			});
			$.contextMenu({
				selector : '.context-recent-friend',
				callback : function(key, options) {
					 switch(key)
					  {
						case "send_message":	
							im_createWindow($(this).children().attr('id'),$(this).find(".friendlist_nick").html(),"chat_window","block");
							break;
						case "editremark":
							im_editremarkwin($(this).children().attr('id'));
							break;
						case "delet":
							im_delfriend($(this).children().attr('id'));
							break;
						default :
							break;			  
					   }         
				},
				items : {
					"send_message" : {name : "发送消息"},
					"editremark" : {name : "修改备注"},
					"personal_profile" : {name : "个人资料"},
					"sep1" : "---------",
					"delet" : {	name : "删除"}
				}
			});
		}
	});
}

//显示最近联系群。
function im_displayrecentgroup()
{
	$.ajax({
		cache:false,
		async:false,
		url:"displayrecentgroup.do",
		type:"GET",
		dataType:"json",
		success:function(data){
			var html="";
			var listbody = '<div class="listbody" style="height: auto; display: block;">';
			var listhead = '<div  id="listhead_online" class="listhead">'+
			             '<div id="icon" class="list_icon1"></div>'+
					     '<div style="overflow: hidden; padding-left: 5px; display: block;" title="最近联系群">'+
						 '<div style="width: auto; float: left;" id="online_name">最近联系群'+
						 '</div>'+
						 '</div></div>';					 
			for (var listkey in data) {
				var map = data[listkey];
				listbody = listbody
						+ '<div class="context-recent-group"><div id="'
						+ map.MSG_G_ID
						+ '"  class="friendline" >'
						+ '<div id="photo_'+map.MSG_G_ID+'" class="friendphoto_container">'
						+ '<img src="images/app_window/im_group_iconsmall.png"/>'
						+ '</div>'
						+ '<div id="group_rightcontainer" class="friendlist_rightcontainer">'
						+ '<div id="nick_'+map.MSG_G_ID+'" class="friendlist_nick">'
						+ map.MSG_G_NAME + '</div></div>' + '</div>' + '</div>';
			}
			listbody +='</div>';
			html = listhead + listbody ;
			$("#recentListPanel").append(html);
			$('.context-recent-group').each(function() {
					$(this).bind("click", function(e) {
						im_leftclickgroup($(this));
						e.stopPropagation();
					});
			});
			$.contextMenu({
				selector : '.context-recent-group',
				callback : function(key, options) {
					switch (key) {
						case "send_message" :
							im_createWindow($(this).children().attr('id'),$(this).find(".friendlist_nick").html(), "room_window","block");
							break;
						case "delete":
							im_deletegroup($(this).children().attr('id'));
							break;
						case "quite":
							im_quitegroup($(this).children().attr('id'));
							break;
						default :
							break;
					}
				},
				items : {
					"send_message" : {name : "发送群消息"},
					"quite" : {name : "退出群"},
					"invite" : {name : "邀请好友加入群"},
					"delete" : {name : "删除群"}
				}
			});
		}
	});
}

//刷新主面板,不能新增分组。
function im_refreshmainboard()
{
	if($("#context-menu-layer").length==0)
	{
	  im_refreshfriendlist();     
	  im_displaygroup();          
	}	          
}

//刷新好友列表（更新在线新状态）
function im_refreshfriendlist()
{
	$.ajax({
		cache:false,
		async : false,
		url : "displayfriendlist.do",
		type : "GET",
		dataType : "json",
		success : function(data){
			$("#friendList").find("[fg_id]").each(function(){
				$(this).html("");
			});
			//填充好友分组。
		  for (var listkey in data) {
			var map=data[listkey];
			if(map.USER_ISONLINE=="1"){
				$("#friendList").find("[fg_id='onlinefriend']").append(im_genfriendliststr(map));
				$("#friendList").find("[fg_id='"+map.FG_ID+"']").append(im_genfriendliststr(map));
			}else{
				$("#friendList").find("[fg_id='"+map.FG_ID+"']").append(im_genfriendliststr(map));
			}
		  }
			//自定义分组好友计数。
		  $("#friendList").find(".listhead").each(function(){
				var totalcount=$(this).next(".listbody").children().length;
				var offlinecount=$(this).next(".listbody").find("[offline='yes']").length;
				var onlinecount=totalcount-offlinecount;
				$(this).find("#online_counter").html(onlinecount+"/"+totalcount);
			});
			//好友显示弹出层
		    $("#friendList").find(".friendline").each(function(){
				im_pop($(this));
			});			
			//绑定左键点击事件。
			$('.context-menu-one').each(function() {
				$(this).bind("click", function(e) {
						im_leftclickfriend($(this));
						e.stopPropagation();
				});
			});
		}
	});
}

//启用左键单击好友。
function im_leftclickfriend(obj) {
	
	im_createWindow($(obj).children().attr('id'), $(obj).find(".friendlist_nick").html(), "chat_window","block");
}
//启用左键单击群。
function im_leftclickgroup(obj) {
	if($(obj).find(".grouplist_nick").html()!=undefined){
		im_createWindow($(obj).children().attr('id'), $(obj).find(".grouplist_nick").html(), "room_window","block");
	}else{
		im_createWindow($(obj).children().attr('id'), $(obj).find(".friendlist_nick").html(), "room_window","block");
	}
}
/** Main Board Init End **/


/** Main Board Function Begin **/

//弹出搜索好友窗口。
function im_winfriendfind()
{
	if(!im_winexist("friendfind"))
	{
		var winobj=null;
		funcWindowarray.push("friendfind");
		var winopt={num : "friendfind",z : z_value,title: "查找好友",height : "400",width : "500"};
		winobj=im_funcWindow(winopt);
		winobj.find(".body").append(searchwindowTemp);
		
		var btstr='<a id="friendsearch_reset" class="ip_button">重    置</a>'+
		          '<a id="friendsearch_search" class="ip_button" style="display:block">查    找</a>'+		
		          '<a id="friendsearch_pre" class="ip_button" style="display:none">上一步</a>';
		winobj.find(".controlarea").css("background-color","#FFFFFF");
		winobj.find(".controlarea").append(btstr);
		winobj.find(".controlarea").append('<div class="divjpages"></div>');
		winobj.find("#friendsearch_search").bind("click",function(){
			
			winobj.find("#friendsearch_reset").css("display","none");
		    winobj.find("#friendsearch_search").css("display","none");
		    winobj.find("#friendsearch_pre").css("display","block");
		    winobj.find("#search_mainArea").css("display","block");
		    winobj.find("#search_mainArea_option").css("display","none");
		    winobj.find('#search_mainArea_result').html("");
		    im_searchuser(winobj);
		});
		winobj.find("#friendsearch_pre").bind("click",function(){
			
		    winobj.find("#friendsearch_search").css("display","block");
		    winobj.find("#friendsearch_reset").css("display","block");
		    winobj.find("#friendsearch_pre").css("display","none");
		    
		    winobj.find("#search_mainArea").css("display","none");
		    winobj.find("#search_mainArea_option").css("display","block");
		    winobj.find('#search_mainArea_result').html("");
		    winobj.find(".divjpages").html("");
		});
		//绑定重置按钮点击事件。
		winobj.find(".controlarea").find("#friendsearch_reset").bind("click",function(){
			winobj.find(":radio").each(
					function(){
						$(this).attr("checked",false);
					}
					);
			winobj.find(":text").each(
					function(){
						$(this).val("");
					}
					);
		});
		//双击radiobutton，取消选中。
		winobj.find(":radio").each(
				function(){
					$(this).bind("dblclick",function(){
						if($(this).is(":checked"))
							{
							$(this).attr("checked",false);
							}
					});
				});
	}
}
//按条件搜索好友。
function im_searchuser(obj) { 
	$.ajax({
		cache:false,
		async : false,
		url : "search.do",
		data : {
			USER_NAME : obj.find('#USER_NAME_input').val(),
			USER_GENDER : obj.find('#USER_GENDER_input').val(),
			JC_ZC : obj.find('#JC_ZC_input').val(),
			JC_WORKTYPE_GCZX : obj.find('#JC_WORKTYPE_input').val(),
			JC_WORKTYPE_SYS : obj.find('#JC_WORKTYPE_input').val(),
			JC_ZY : obj.find('#JC_ZY_input').val(),
			RD_JC_WORKTYPE : obj.find("input[name='RD_JC_WORKTYPE']:checked").val()
		},
		type : "GET",
		dataType : "json",
		success : function(data) {
			var tablestr = '';
			for (var listkey in data) {
				var map = data[listkey];
				tablestr = tablestr
						+ '<div class="friendsearch_tinyinfo" style="display:block;">'
						+ '<div class="friendsearch_tinyinfo_info">'
						+ '<img class="friendsearch_tinyinfo_info_icon" src="images/app_window/im_groupmember_icon.png">'
						+ '<div class="friendsearch_tinyinfo_info_t">'
						+ '<div class="friendsearch_tinyinfo_info_t_showname">'
						+ map.USER_NAME
						+ '</div>'
						+ '</div>'
						+ '</div>'
						+ '<div class="friendsearch_tinyinfo_button">'
						+ '<div class="friendsearch_tinyinfo_button_info" rel="'+map.USER_NAME+'" id="buddyFinder_tiny_detailButton_'
						+ map.USER_ID
						+ '" uid="'
						+ map.USER_ID
						+ '">详细资料</div>'
						+ '<div class="friendsearch_tinyinfo_button_add" rel="'+map.USER_NAME+'" id="buddyFinder_tiny_adderButton_'
						+ map.USER_ID + '" uid="' + map.USER_ID
						+ '">加为好友</div>' + '</div>' + '</div>';
			}
			obj.find('#search_mainArea_result').html(tablestr);
			obj.find(".controlarea").find(".divjpages").jPages({
			    containerID : "search_mainArea_result",
				previous : "",
			    next : "",
			    perPage : 9
			  });
			
			obj.find(".friendsearch_tinyinfo_button_info").each(function(){
				$(this).bind("click",function(e){
					im_displayuserinfo(this.getAttribute("uid"));
					e.stopPropagation();
					});
			});
			
			obj.find(".friendsearch_tinyinfo_button_add").each(function(){
				$(this).bind("click",function(e){
					im_addfriend(this.getAttribute("uid"),this.getAttribute("rel"));
					e.stopPropagation();
					});
			});
		}
	});
}

//添加好友
function im_addfriend(user_id,user_name)
{
	$.ajax({
		cache:false,
		async : false,
		url : "isfriend.do",
		data : {USER_ID:user_id},
		type : "GET",
		dataType : "json",
		success : function(data){
			switch(data.isfriend)
			{
			case "true":
				if(!im_winexist("hint"))
				{   var opt={num : "hint",height : "130",width : "250"};
				    var tiptxt = "已经是您的好友，不能重复添加！" ;
				    im_alert(tiptxt,opt);
				}
				break;
			case "false":
				if(!im_winexist("sendfriendapply"))
				{
				var winopt={num : "sendfriendapply",z : z_value,title: "发送好友申请",height : "210",width : "320"};
				var winobj=im_funcWindow(winopt);
				funcWindowarray.push("sendfriendapply");
				var sendfriendapply='<div class="window_bodyarea" id="window_body" style="width: 320px; height: 150px; bottom: 30px;">'+						
					'<div class="friendadder_area">'+							
				'<div class="friendadder_area_panel">'+								
				'<div class="friendadder_area_p13">您将添加以下好友:</div>'+								
				'<img title="查看资料" class="friendadder_area_avatar" id="friendadder_area_avatar" style="text-decoration: none;" src="images/app_window/im_groupmember_icon.png">'+								
				'<div title="查看资料" class="friendadder_area_nick" id="friendadder_area_nick" style="text-decoration: none;">'+user_name+'</div>'+								
				'<div title="查看资料" class="friendadder_area_uin" id="'+user_id+'" style="display: block;"></div>'+								
				'<div class="friendadder_area_msg">'+
				'<div>请输入验证信息:</div>'+									
				'<textarea class="friendadder_area_msg_input" id="friendadder_area_msg_input" type="text" value=""></textarea>'+								
				'</div>'+																
				'</div>'+							
				'</div>'+						
				'</div>';
				winobj.find(".body").append(sendfriendapply);
				var btstr='<a title="确定" class="chat_sendmsg" id="bt_sendfriendapply" href="#">确定</a>';
				winobj.find(".controlarea").append(btstr);
				winobj.find(".controlarea").find("#bt_sendfriendapply").bind("click",function(){
					im_sendfriendapply(user_id,user_name,winobj.find(".friendadder_area_msg_input").val(),winobj);
					winobj.find(".controlarea").find("#bt_sendfriendapply").attr("disabled","true");
					setTimeout(function(){winobj.find(".controlarea").find("#bt_sendfriendapply").removeAttr("disabled");},3000);
				});
				}
				break;
			case "self":
				if(!im_winexist("hint"))
				{
				    var opt={num : "hint",height : "130",width : "250"};
				    var tiptxt = "不能添加自己为好友！" ;
				    im_alert(tiptxt,opt);
				}
				break;
			default:
				break;
			
			}
		}
	});
}
//发送好友申请。
function im_sendfriendapply(user_id,user_name,verifymsg,winobj)
{
	$.ajax({
		cache:false,
		url : "sendfriendapply.do",
		data : {USER_ID:user_id,USER_NAME:user_name,VERYFY_MESSAGE:verifymsg},
		type : "POST",
		dataType : "text",
		success : function(data){
			im_removewinid(winobj.attr("window"));
			winobj.remove();
		}
	});
}
//回复好友申请。
function im_reply_friend_apply(obj)
{
	if(obj.find("input:radio:checked").val()=="0"){
		$.ajax({
			cache:false,
			url : "refusefriendapply.do",
			data : {NT_ID:obj.find(".friendadder_area_avatar").attr("id")},
			type : "POST",
			dataType : "text",
			success : function(data){
				im_removewinid(obj.attr("window"));
				obj.remove();
			}
		});
	}
	else if(obj.find("input:radio:checked").val()=="1"){
		$.ajax({
			cache:false,
			url : "acceptfriendapply.do",
			data : {F_FRIENDID:obj.find(".friendadder_area_nick").attr("id"),F_REMARK:obj.find(".friendadder_area_input").val(),NT_ID:obj.find(".friendadder_area_avatar").attr("id")},
			type : "POST",
			dataType : "text",
			success : function(data){
				im_removewinid(obj.attr("window"));
				obj.remove();
			}
		});
	}
}
//显示用户详细信息。
function im_displayuserinfo(user_id)
{
	if(!im_winexist("userinfo"))
		{
		var winobj=null;
		funcWindowarray.push("userinfo");
		var winopt={num : "userinfo",z : z_value,title: "详细信息",height : "350",width : "500"};
		winobj=im_funcWindow(winopt);		
		$.ajax({
			cache:false,
			async : false,
			url : "displayuserdetails.do",
			data : {USER_ID:user_id},
			type : "GET",
			dataType : "json",
			success : function(data){
				var map=data[0];
				var userinfostr='<div class="window_bodyarea" id="window_body_6" style="width: 500px; height: 300px;">'+          
				'<div class="userdetails_area">'+            
				'<div class="userdetails_maininfo" style="height: 65px;">'+              
				'<img class="userdetails_avatar" id="userdetails_avatar" src="images/app_window/im_groupmember_icon.png">'+              
				'<div class="userdetails_namearea">'+                
				'<div class="userdetails_name" id="userdetails_name">'+map.USER_NAME+'</div>'+				
				'<div class="userdetails_account" id="'+map.USER_ID+'" style="display: block;color:#2c879b">&lt;'+map.USER_ID+'&gt;</div>'+                              			
				'<a class="userdetails_adder" id="userdetails_adder" style="display: inline;" href="###">加为好友</a>'+              
				'</div>'+                         
				'</div>'+            
				'<div class="userdetails_tabheadarea">'+              
				'<div class=" current" id="userdetails_basicInfo_head" style="display: block;">基本资料</div>'+                      
				'</div>'+            
				'<div class="userdetails_tabbodyarea">'+              
				'<div id="userdetails_basicInfo_body" style="display: block;">';
				if(map.USER_BZ==2){
					userinfostr=userinfostr+'<dl class="userdetails_basiclist">'+          
					'<dt>性  别:</dt>  <dd class="userdetails_small">'+map.USER_GENDER+'</dd>'+                  
					'<dt>生  日:</dt>  <dd>'+map.USER_CSNY+'</dd>'+                    
					'<dt>职  务:</dt>  <dd></dd>'+          
					'<dt>职  称:</dt>  <dd>'+map.USER_ZC+'</dd>'+   
					'<dt>专  业:</dt>  <dd>'+map.USER_CSZY+'</dd>'+        
					'<dt>个人主页:</dt>  <dd></dd>'+          
					'<dt>工程中心:</dt>  <dd class="userdetails_superbig">'+map.WT_NAME+'</dd>'+         
					'</dl>'+      
					'</div>'+                       
					'</div>'+          
					'</div>'+        
					'</div>';
				}
				else if(map.USER_BZ==1){
					userinfostr=userinfostr+'<dl class="userdetails_basiclist">'+          
					'<dt>性  别:</dt> <dd class="userdetails_small">'+map.USER_GENDER+'</dd>'+                  
					'<dt>生  日:</dt> <dd>'+map.USER_CSNY+'</dd>'+                    
					'<dt>职  务:</dt> <dd></dd>'+          
					'<dt>职  称:</dt> <dd>'+map.USER_ZC+'</dd>'+   
					'<dt>专  业:</dt> <dd>'+map.USER_CSZY+'</dd>'+        
					'<dt>个人主页:</dt> <dd></dd>'+          
					'<dt>重点实验室:</dt> <dd class="userdetails_superbig">'+map.WT_NAME+'</dd>'+        
					'</dl>'+      
					'</div>'+                       
					'</div>'+          
					'</div>'+        
					'</div>';
				}
				winobj.find(".body").append(userinfostr);			
				winobj.find(".userdetails_adder").bind("click",function(e){
					im_addfriend(winobj.find(".userdetails_account").attr("id"),winobj.find(".userdetails_name").text());
					e.stopPropagation();
				});
			}
		});
	}
}
// 好友管理
function im_winfriendmanage(){
	
   if(!im_winexist("friendmanage"))
	{
		var obj=null;
		funcWindowarray.push("friendmanage");
		var winopt={num : "friendmanage",z : z_value,title: "好友管理",height : "450",width : "650"};
		obj = im_funcWindow(winopt);
		obj.find(".body").append(friendmanage);			
		obj.find("#tabfriendHead_1").bind("click", function(){		
			obj.find("#tabfriendBody_1").css("display","block");
			obj.find("#tabgroupBody_2").css("display","none");
			obj.find("#tabfriendHead_1").addClass("  current");
			obj.find("#tabgroupHead_2").removeClass("current");			
		});
		obj.find("#tabgroupHead_2").bind("click", function(){		
			obj.find("#tabgroupBody_2").css("display","block");
			obj.find("#tabfriendBody_1").css("display","none");
			obj.find("#tabgroupHead_2").addClass("  current");
			obj.find("#tabfriendHead_1").removeClass("current");			
		});
		im_grouplist(obj);
		
		obj.find("#friendmanage_group_addarea").bind("click", function(e){
		    im_createfriendgroupwin();	
			e.stopPropagation();
		});
		obj.find("#friendmanage_group_delarea").bind("click", function(e){
		    im_delgroupbyid(obj);
		    e.stopPropagation();
		});
		
		obj.find(".friendmanage_toolbar_all").bind("click", function(e){		 
			im_allfriend(obj);
			e.stopPropagation();
		});
	}else{
		im_grouplist($("#app_window_friendmanage"));
	}
	
}
/**
 * im_grouplist()
 * 生成分组列表
 * **/
function im_grouplist(obj){
	if(obj){
  	//生成自定义分组。
	var data = im_getfriendgroup();
	var treestr = "";
	var preFG_ID = "";
	var count = 0;
	treestr ='<div id="group_0" class="friendmanager_left_body_line  " current="0" gid="1">我的好友</div>';
	for (var listkey in data) {
		var map=data[listkey];
		//遍历data，发现了新的分组。
		if((preFG_ID!=map.FG_ID))
		{   count++;
			treestr = treestr+'<div id="group_'+count+'" class="friendmanager_left_body_line  "  current="0" gid="'+map.FG_ID+'">'+map.FG_NAME+'</div>';
		}
		preFG_ID=map.FG_ID;
	}
	obj.find(".friendmanager_left_body").html("");
	obj.find(".friendmanager_left_body").html(treestr);	
	obj.find(".friendmanager_left_body_line").each(function() {
			$(this).bind("click", function(e) {
				$(this).addClass("friendmanager_left_body_linecurrent").siblings().removeClass("friendmanager_left_body_linecurrent");
				$(this).attr("current","1").siblings().attr("current","0");
				var gid=$(this).attr("gid");
				im_bygroupidlist(gid,obj);
				e.stopPropagation();
			});
	});
	}
	
}
/**
 * 通过好友id生成用户列表
 * 
 * **/
function im_bygroupidlist(gid,obj){
    var list = "";
    var data = im_displayfriendlistbygroup(gid);
    for (var listkey in data) {
		var map= data [listkey];
		//遍历data，发现了新的分组。
    list+='<div style="display: block; opacity: 1;" class="friendmanage_tinyinfo" uid='+map.USER_ID+'>'+
	  '<div class="friendmanage_tinyinfo_info">'+
	     '<img src="images/app_window/im_groupmember_icon.png" class="friendmanage_tinyinfo_info_icon">'+
	     '<div class="friendsearch_tinyinfo_info_t">'+
	       '<div class="friendmanage_tinyinfo_info_t_showname">'+map.USER_NAME+'</div>'+
	     '</div>'+
	  '</div>'+
	  '<div class="friendmanage_tinyinfo_button">'+
	    '<div uid="'+map.USER_ID+'" title="好友详情" id="buddyFinder_tiny_detailButton_'+map.USER_ID+'" rel="'+map.USER_NAME+'" class="friendmanage_tinyinfo_button_info">详细资料'+
	    '</div>' +
	    '<div uid="'+map.USER_ID+'" title="删除好友" id="buddyFinder_tiny_adderButton_'+map.USER_ID+'" rel="'+map.USER_NAME+'" class="friendmanage_tinyinfo_button_del">删除好友'+
	    '</div>'+
	  '</div>'+
     '</div>'; 
    }
   	obj.find(".friendmanage_center_result").html("");
	obj.find(".friendmanage_center_result").html(list);	
    obj.find(".friendmanage_tinyinfo").each(function(){
		$(this).find(".friendmanage_tinyinfo_button_info").bind("click",function(e){
			var uid = $(this).attr("uid");
			if(uid!=""&&uid!=null)
			im_displayuserinfo(uid);
			e.stopPropagation();
		});
	});
	
    obj.find(".friendmanage_tinyinfo").each(function(){
		$(this).find(".friendmanage_tinyinfo_button_del").bind("click",function(e){
			var uid = $(this).attr("uid");
			if(uid!=""&&uid!=null){
				var msg = "确定删除该好友？";
				var opt = {num : "confirm",height : "130", width : "250"};	
				im_confirm(msg,opt,uid,im_delfriend);
				if(obj.find("[current = '1']").length!=0){	
		            var gid = obj.find("[current = '1']").attr("gid");
		            setTimeout(function(){ im_bygroupidlist(gid,obj);},2000);
	            }
			}
			e.stopPropagation();
		});
	});
	
}
/**
 * im_delgroupbyid()
 * 删除好友分组
 * **/
function im_delgroupbyid(obj){
	if(obj.find("[current = '1']").length!=0){	
		var gid = obj.find("[current = '1']").attr("gid");
		if(gid!="1"){	
			var msg = "确定要删除好友分组吗？该分组中的好友将会被移动到默认分组";
			var opt = {num : "confirm",height : "130", width : "250"};	
			im_confirm(msg,opt,gid,im_deletefriendgroup);
		}
		else{	
			;
		}	
	}
	else{
		if(!im_winexist("hint")){
			var opt={num : "hint",height : "130",width : "250"};
			var tiptxt = "请选中某个分组！" ;
			im_alert(tiptxt,opt);
		}
	}
}
/**
 * im_allfriend(obj)
 * 全部好友
 * **/
function im_allfriend(obj){
    var list = "";
	var data = im_getfriendlist();
	for (var listkey in data) {
		var map = data[listkey];
		//遍历data，发现了新的分组。
      list+='<div style="display: block; opacity: 1;" class="friendmanage_tinyinfo">'+
	    '<div class="friendmanage_tinyinfo_info">'+
	     '<img src="images/app_window/im_groupmember_icon.png" class="friendmanage_tinyinfo_info_icon">'+
	     '<div class="friendsearch_tinyinfo_info_t">'+
	       '<div class="friendmanage_tinyinfo_info_t_showname">'+map.USER_NAME+'</div>'+
	     '</div>'+
	  '</div>'+
	  '<div class="friendmanage_tinyinfo_button">'+
	    '<div uid="'+map.USER_ID+'" id="buddyFinder_tiny_detailButton_'+map.USER_ID+'" rel="'+map.USER_NAME+'" class="friendmanage_tinyinfo_button_info">详细资料'+
	    '</div>' +
	    '<div uid="'+map.USER_ID+'" id="buddyFinder_tiny_adderButton_'+map.USER_ID+'" rel="'+map.USER_NAME+'" class="friendmanage_tinyinfo_button_del">删除好友'+
	    '</div>'+
	  '</div>'+
     '</div>'; 
    }
   	obj.find(".friendmanage_center_result").html("");
	obj.find(".friendmanage_center_result").html(list);	
	    obj.find(".friendmanage_tinyinfo").each(function(){
		$(this).find(".friendmanage_tinyinfo_button_info").bind("click",function(e){
			var uid = $(this).attr("uid");
			if(uid!=""&&uid!=null)
			im_displayuserinfo(uid);
			e.stopPropagation();
		});
	});
	
    obj.find(".friendmanage_tinyinfo").each(function(){
		$(this).find(".friendmanage_tinyinfo_button_del").bind("click",function(e){
			var uid = $(this).attr("uid");
			if(uid!=""&&uid!=null){
				var msg = "确定删除该好友？";
				var opt = {num : "confirm",height : "130", width : "250"};	
				im_confirm(msg,opt,uid,im_delfriend);
				obj.remove($(this));
			}
				e.stopPropagation();
		});
	});
	
	obj.find(".friendmanager_left_body_line").each(function() {
		$(this).removeClass("friendmanager_left_body_linecurrent");

	});
}

//弹出搜索群窗口
function im_winsearchgroup(){
	if(!im_winexist("searchgroup")){
		var winobj=null;
		funcWindowarray.push("searchgroup");
		var winopt={num : "searchgroup",z : z_value,title: "搜索群",height : "400",width : "500"};
		winobj=im_funcWindow(winopt);
		var searchgroupstr = searchgroupTemp;
		winobj.find(".body").append(searchgroupstr);
		
		var btstr='<a id="groupsearch_reset" class="ip_button">重    置</a>'+
		          '<a id="groupsearch_search" class="ip_button" style="display:block">查    找</a>'+		
		          '<a id="groupsearch_pre" class="ip_button" style="display:none">上一步</a>';
		winobj.find(".controlarea").css("background-color","#FFFFFF");
		winobj.find(".controlarea").append(btstr);
		winobj.find(".controlarea").append('<div class="divjpages"></div>');
		winobj.find("#groupsearch_search").bind("click",function(){	    
		    winobj.find("#groupsearch_search").css("display","none");
		    winobj.find("#groupsearch_reset").css("display","none");
		    winobj.find("#groupsearch_pre").css("display","block");
		    winobj.find("#search_mainArea").css("display","block");
		    winobj.find("#search_mainArea_option").css("display","none");
		    winobj.find('#search_group_result').html("");
		    im_searchgroup(winobj);
		});
		winobj.find("#groupsearch_pre").bind("click",function(){
		    winobj.find("#groupsearch_search").css("display","block");
		    winobj.find("#groupsearch_reset").css("display","block");
		    winobj.find("#groupsearch_pre").css("display","none");
		    winobj.find("#search_mainArea").css("display","none");
		    winobj.find("#search_mainArea_option").css("display","block");
		    winobj.find('#search_group_result').html("");
		    winobj.find(".divjpages").html("");
		});
		//绑定取消按钮点击事件。
		winobj.find(".controlarea").find("#groupsearch_concel").bind("click",function(){
			winobj.remove();
			im_removewinid(winobj.attr("window"));
		});
	}
}

//搜索群。
function im_searchgroup(obj)
{
	$.ajax({
		cache:false,
		async:false,
		url : "searchgroup.do",
		data : {G_NAME:obj.find("#groupname").val(),G_TYPE:obj.find("#grouptype").val(),G_LY:obj.find("#sl_grouply").val()},
		type : "GET",
		dataType : "json",
		success : function(data) {
			var tablestr = '';
			for (var listkey in data) {
				var map = data[listkey];
				tablestr = tablestr
				+ '<div class="friendsearch_tinyinfo" style="display:block;">'
				+ '<div class="friendsearch_tinyinfo_info">'
				+ '<img class="friendsearch_tinyinfo_info_icon" src="images/app_window/im_group_iconsmall.png">'
				+ '<div class="friendsearch_tinyinfo_info_t">'
				+ '<div class="friendsearch_tinyinfo_info_t_showname">'+ map.G_NAME
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '<div class="friendsearch_tinyinfo_button">'
				+ '<div class="friendsearch_tinyinfo_button_info" rel="'+map.G_NAME+'" id="buddyFinder_tiny_detailButton_'+ map.G_ID+ '" uid="'+ map.G_ID+ '">详细资料</div>'
				+ '<div class="friendsearch_tinyinfo_button_add" rel="'+map.G_NAME+'" id="buddyFinder_tiny_adderButton_'+ map.G_ID + '" uid="' + map.G_ID+ '">申请加入</div>' 
				+ '</div>' 
				+ '</div>';
			}
			obj.find('#search_group_result').html(tablestr);
			obj.find(".controlarea").find(".divjpages").jPages({
			    containerID : "search_group_result",
				previous : "",
			    next : "",
			    perPage : 15
			  });
			obj.find(".friendsearch_tinyinfo_button_info").each(function(){
				$(this).bind("click",function(e){
					im_displaygroupinfo(this.getAttribute("uid"),this.getAttribute("rel"));
					e.stopPropagation();
					});
			});
			obj.find(".friendsearch_tinyinfo_button_add").each(function(){
				$(this).bind("click",function(e){
					im_wingroupapply(this.getAttribute("uid"),this.getAttribute("rel"));
					e.stopPropagation();
					});
			});
		}
	});
}

//弹出创建群的窗口。
function im_wincreategroup()
{
	if(!im_winexist("creategroup"))
	{
		var winopt={num : "creategroup",z : z_value,title: "创建群",height : "408",width : "542"};
		var winobj=im_funcWindow(winopt);
		funcWindowarray.push("creategroup");
		winobj.find(".body").append(creategroupstr);
		//生成邀请群成员页面。
		var invitememberstr="";
		$.ajax({
			cache:false,
			async : false,
			url : "displayfriendlist.do",
			type : "GET",
			dataType : "json",
			success : function(data){
				invitememberstr='<div id="invite-pages" style="padding:20px 40px 20px 40px;">'+
				'<select multiple="multiple" id="selectfriends" name="selectfriends[]">';
				//获取好友列表。
				for(var listkey in data){
					var map=data[listkey];
					var displayname="";
					if(map.F_REMARK==null){
						displayname=map.USER_NAME;
					}else
					{
						displayname=map.F_REMARK;
					}
					invitememberstr=invitememberstr+'<option value="'+map.USER_ID+'">'+displayname+'</option>';
				}
				invitememberstr=invitememberstr+'</select>'+
				'</div>';
			}
		});
		winobj.find("#step1").append(invitememberstr);
		winobj.find(".body").find("#selectfriends").multiSelect({
			afterSelect:function(values){
				im_add_invitedfriends(values.toString());
			},
			afterDeselect:function(values){
				im_sub_invitedfriends(values.toString());
			}
		});
		//隐藏邀请群成员页面。
		winobj.find(".body").find("#invite-pages").hide();
		//生成按钮。
		var btstr='<div id="creategroup_next" class="ip_button" >下一步</div>'+
		    '<div id="creategroup_complete" class="ip_button">完成</div>'+
			'<div id="creategroup_pre" class="ip_button" >上一步</div>';
		winobj.find(".controlarea").append(btstr);
		//隐藏邀请群成员页面的按钮。
		winobj.find(".controlarea").find("#creategroup_pre").hide();
		winobj.find(".controlarea").find("#creategroup_complete").hide();
		//绑定创建群页面中下一步按钮的点击事件。
		winobj.find(".controlarea").find("#creategroup_next").bind("click",function(){
			//判断信息填写是否完整。
			if(($.trim(winobj.find("#ipt-group-name").val())=='')||($.trim(winobj.find("#sl_grouply").val())==''))
				{}
			else
				{
				//修改导航栏。
				winobj.find(".body").find(".clearfix").children("li:eq(0)").removeAttr("class");
				winobj.find(".body").find(".clearfix").children("li:eq(1)").attr("class","on");
				//隐藏创建群页面，显示邀请群成员页面。
				winobj.find(".body").find("#mainform").hide("normal");
				winobj.find(".body").find("#invite-pages").show("normal");
				//隐藏创建群页面按钮，显示邀请群成员页面按钮。
				winobj.find(".controlarea").find("#creategroup_next").hide("normal");
				winobj.find(".controlarea").find("#creategroup_pre").show("normal");
				winobj.find(".controlarea").find("#creategroup_complete").show("normal");
				}
		});
		//绑定邀请群成员页面中的上一步按钮的点击事件。
		winobj.find(".controlarea").find("#creategroup_pre").bind("click",function(){
			//修改导航栏。
			winobj.find(".body").find(".clearfix").children("li:eq(1)").removeAttr("class");
			winobj.find(".body").find(".clearfix").children("li:eq(0)").attr("class","on");
			//隐藏邀请群成员页面，显示创建群页面。
			winobj.find(".body").find("#invite-pages").hide("normal");
			winobj.find(".body").find("#mainform").show("normal");
			//隐藏邀请群成员页面按钮，显示创建群页面按钮。
			winobj.find(".controlarea").find("#creategroup_pre").hide("normal");
			winobj.find(".controlarea").find("#creategroup_complete").hide("normal");
			winobj.find(".controlarea").find("#creategroup_next").show("normal");
		});
		//绑定邀请群成员页面中的完成按钮的点击事件。
		winobj.find(".controlarea").find("#creategroup_complete").bind("click",function(){
			//判断信息填写是否完整。
			if(invitedfriends.length==0){}
			else{
				im_creategroup(winobj);
			}
			winobj.find(".controlarea").find("#creategroup_complete").attr("disabled","true");
			setTimeout(function(){winobj.find(".controlarea").find("#creategroup_complete").removeAttr("disabled");},3000);
		});
	}
}

//添加标签
function im_addtags()
{
	if(!im_winexist("addtags"))
	{
		var winopt={num : "creategroup",z : z_value,title: "选择标签",height : "408",width : "542"};
		var winobj=im_funcWindow(winopt);
		funcWindowarray.push("addtags");
		winobj.find(".body").append(label);
	}
}

//创建群。
function im_creategroup(obj)
{
	var invitedfriendsstr="";
	for(var i=0;i<invitedfriends.length;i++){
		invitedfriendsstr=invitedfriendsstr+invitedfriends[i]+",";
	}
	$.ajax({
		cache:false,
		url : "creategroup.do",
		data : {G_NAME:obj.find("#ipt-group-name").val(),G_LY:obj.find("#sl_grouply").val(),G_TYPE:obj.find("#grouptype").val(),USER_ID_STR:invitedfriendsstr},
		type : "POST",
		dataType : "text",
		success : function() {
			im_cleararray(invitedfriends);
			im_removewinid(obj.attr("window"));
			obj.remove();
		}
	});
}

//添加好友到数组。
function im_add_invitedfriends(USER_ID)
{
	invitedfriends.push(USER_ID);
}
//从数组删除好友
function im_sub_invitedfriends(USER_ID)
{
	for(var i=0;i<invitedfriends.length;i++)
	{
	  if(invitedfriends[i]==USER_ID)
	  {
		invitedfriends.splice(i,1);
	  }
	}
}

//回复群邀请。
function im_reply_group_invite(obj)
{
	if(obj.find("input:radio:checked").val()=="0"){
		$.ajax({
			cache:false,
			url : "refusegroupinvite.do",
			data : {NT_ID:obj.find(".friendadder_area_panel").attr("id")},
			type : "POST",
			dataType : "text",
			success : function() {
				im_removewinid(obj.attr("window"));
				obj.remove();
			}
		});
	}
	else if(obj.find("input:radio:checked").val()=="1"){
		$.ajax({
			cache:false,
			url : "acceptgroupinvite.do",
			data : {NT_ID:obj.find(".friendadder_area_panel").attr("id"),G_ID:obj.find(".friendadder_area_panel").attr("gid")},
			type : "POST",
			dataType : "text",
			success : function() {
				im_removewinid(obj.attr("window"));
				obj.remove();
			}
		});
	}
}

//删除群。
function im_deletegroup(gid)
{
	$.ajax({
		cache:false,
		async:false,
		url : "getgroupmember.do",
		data : {G_ID:gid},
		type : "GET",
		dataType : "json",
		success : function(data) {
			var map=data[0];
			vl=map.GM_ROLE;
			if(map.GM_ROLE=="1"){
				$.ajax({
					cache:false,
					url : "deletegroup.do",
					data : {G_ID:gid},
					type : "POST",
					dataType : "text",
					success : function(data) {  
						$(".groupline").each(
							function(){
								if($(this).attr("id")==gid){
									$(this).parent().remove();
								}
							}
						);
					}
				});
			}
			else{
				var opt={num : "hint",height : "130",width : "250"};
				var tiptxt = "您没有权限！" ;
				im_alert(tiptxt,opt);
			}
		}
	});
}
//退出群。
function im_quitegroup(gid)
{
	$.ajax({
		cache:false,
		async:false,
		url : "getgroupmember.do",
		data : {G_ID:gid},
		type : "GET",
		dataType : "json",
		success : function(data) {
			var map=data[0];
			vl=map.GM_ROLE;
			if(map.GM_ROLE=="1"){
				alert("您是该群的管理员，不能退出群。");
			}else{
				$.ajax({
					cache:false,
					url : "quitegroup.do",
					data : {G_ID:gid},
					type : "post",
					dataType : "text",
					success : function(data) {    
						$(".groupline").each(
								function(){
									if($(this).attr("id")==gid)
									{
									$(this).parent().remove();
									}
								}
								);         
					}
				});
			}
		}
	});
}
//显示群详细信息。
function im_displaygroupinfo(gid,gname)
{
	if(!im_winexist("groupinfo"))
		{
		var winopt={num : "groupinfo",z : z_value,title: "群信息",height : "408",width : "542"};
		var winobj=im_funcWindow(winopt);
		funcWindowarray.push("groupinfo");
		var groupinfostr="";
		$.ajax({
			cache:false,
			async:false,
			url : "getgroup.do",
			data : {G_ID:gid},
			type : "GET",
			dataType : "json",
			success : function(data){
				var map=data[0];
				groupinfostr='<div class="window_bodyarea" id="window_body_6" style="width: 542px; height: 358px;">'+          
					'<div class="userdetails_area">'+            
				'<div class="userdetails_maininfo" style="height: 65px;">'+             
				'<img class="userdetails_avatar" id="userdetails_avatar" src="images/app_window/im_groupmember_icon.png">'+              
				'<div class="userdetails_namearea">'+                
				'<div class="userdetails_name" id="'+map.G_ID+'">'+map.G_NAME+'</div>'+				                                			
				'<a class="userdetails_adder" id="userdetails_adder" style="display: inline;" href="###">申请加入</a>'+              
				'</div>'+                         
				'</div>'+            
				'<div class="userdetails_tabheadarea">'+              
				'<div class=" current" id="userdetails_basicInfo_head" style="display: block;">基本资料</div>'+                     
				'</div>'+            
				'<div class="userdetails_tabbodyarea">'+              
				'<div id="userdetails_basicInfo_body" style="display: block;">'+        
				'<dl class="userdetails_basiclist">'+                    
				'<dt>群名称:</dt><dd>'+map.G_NAME+'</dd>'+          
				'<dt>研究领域:</dt><dd>'+map.G_LY+'</dd>'+                            
				'<dt>标签:</dt><dd class="userdetails_superbig">'+map.G_TYPE+'</dd>'+        
				'</dl>'+      
				'</div>'+                       
				'</div>'+          
				'</div>'+        
				'</div>';
				winobj.find(".body").append(groupinfostr);
				winobj.find(".userdetails_adder").bind("click",function(e){
					im_wingroupapply(gid,gname);
					e.stopPropagation();
				});
			}
		});
		}
}

//弹出查看和编辑自己所属群的资料窗口。
function im_displayeditgroupinfowin(gid,gname)
{
	if(!im_winexist("displayeditgroupinfo"))
	{
	var winopt={num : "displayeditgroupinfo",z : z_value,title: "群信息",height : "408",width : "542"};
	var winobj=im_funcWindow(winopt);
	funcWindowarray.push("displayeditgroupinfo");
	var groupinfostr="";
	$.ajax({
		cache:false,
		async:false,
		url : "getgroup.do",
		data : {G_ID:gid},
		type : "GET",
		dataType : "json",
		success : function(data){
			var map=data[0];
			groupinfostr='<div class="window_bodyarea" id="window_body_6" style="width: 542px; height: 358px;">'+          
				'<div class="userdetails_area">'+            
			'<div class="userdetails_maininfo" style="height: 65px;">'+             
			'<img class="userdetails_avatar" id="userdetails_avatar" src="images/app_window/im_groupmember_icon.png">'+              
			'<div class="userdetails_namearea">'+                
			'<div class="userdetails_name" id="'+map.G_ID+'">'+map.G_NAME+'</div>'+				                                			             
			'</div>'+                         
			'</div>'+            
			'<div class="userdetails_tabheadarea">'+              
			'<div class=" current" id="userdetails_basicInfo_head" style="display: block;">基本资料</div>'+                     
			'</div>'+            
			'<div class="userdetails_tabbodyarea">'+              
			'<div id="userdetails_basicInfo_body" style="display: block;">'+        
			'<dl class="userdetails_basiclist">'+                    
			'<dt>群名称:</dt><dd><input name="groupname" tabindex="20" class="single" id="ipt-group-name" aria-required="true" style="height: 20px;" type="text" maxlength="30" disabled="disabled"></dd>'+          
			'<dt>研究领域:</dt><dd><select name="sl_grouply" id="sl_grouply" disabled="disabled"><option value=""></option><option value="生命科学">生命科学</option><option value="材料科学">材料科学</option><option value="地球科学">地球科学</option><option value="信息科学">信息科学</option><option value="工程科学">工程科学</option><option value="化学科学">化学科学</option><option value="数理科学">数理科学</option><option value="交叉领域">交叉领域</option><option value="农业">农业</option><option value="能源与交通">能源与交通</option><option value="制造业">制造业</option><option value="电子与信息通信">电子与信息通信</option><option value="材料">材料</option><option value="建设与环保">建设与环保</option><option value="资源开发">资源开发</option><option value="轻纺与医药卫生领域">轻纺与医药卫生领域</option><option value="其它">其它</option></select></dd>'+                            
			'<dt>标签:</dt><dd class="userdetails_superbig"><input name="grouptype" tabindex="20" class="single" id="grouptype" aria-required="true" style="height: 20px;" type="text" maxlength="30" disabled="disabled" ></dd>'+        
			'</dl>'+      
			'</div>'+                       
			'</div>'+          
			'</div>'+        
			'</div>';
			winobj.find(".body").append(groupinfostr);
			winobj.find(".userdetails_adder").bind("click",function(e){
				im_wingroupapply(gid,gname);
				e.stopPropagation();
			});
			winobj.find(".body").find("#ipt-group-name").val(map.G_NAME);
			winobj.find(".body").find("#sl_grouply").val(map.G_LY);
			winobj.find(".body").find("#grouptype").val(map.G_TYPE);
			var btstr='<div id="displayeditgroupinfo_save" class="ip_button" >保存</div>';
		    winobj.find(".controlarea").append(btstr);
		    //如果当前登录用户是群管理员，则信息可编辑。
		    if(map.G_CREATERID==im_my_uid){
		    	winobj.find(".body").find("#ipt-group-name").removeAttr("disabled");
				winobj.find(".body").find("#sl_grouply").removeAttr("disabled");
				winobj.find(".body").find("#grouptype").removeAttr("disabled");
				winobj.find(".controlarea").find("#displayeditgroupinfo_save").show();
				winobj.find(".controlarea").find("#displayeditgroupinfo_save").bind("click",function(){
					im_displayeditgroupinfo(winobj);
				});
		    }
		    else{
		    	winobj.find(".controlarea").find("#displayeditgroupinfo_save").hide();
		    }
		}
	});
  }
}
//编辑群资料。
function im_displayeditgroupinfo(obj)
{
	if((obj.find(".body").find("#ipt-group-name").val()!="")&&(obj.find(".body").find("#sl_grouply").val()!="")&&(obj.find(".body").find("#grouptype").val()!=""))
	$.ajax({
		cache:false,
		url : "editgroup.do",
		data:{G_NAME:obj.find(".body").find("#ipt-group-name").val(),G_LY:obj.find(".body").find("#sl_grouply").val(),G_TYPE:obj.find(".body").find("#grouptype").val(),G_ID:obj.find(".body").find(".userdetails_name").attr("id")},
		type : "POST",
		dataType : "text",
		success:function(data){
			obj.remove();
			im_removewinid("displayeditgroupinfo");
		}
	});
}

//打开申请加入群窗口。
function im_wingroupapply(gid,gname)
{
	$.ajax({
		cache:false,
		async:false,
		url : "isgroupmember.do",
		data :{G_ID:gid},
		type : "GET",
		dataType : "json",
		success : function(data) {
			switch(data.isgroupmember)
			{
			case "true":
				if(!im_winexist("hint")){
				    var opt={num : "hint",height : "130",width : "250"};
				    var tiptxt = "您已经是这个群好友！" ;
				    im_alert(tiptxt,opt);
				}
				break;
			case "false":
				if(!im_winexist("sendgroupapply")){
				var winopt={num : "sendgroupapply",z : z_value,title: "申请加入群",height : "280",width : "350"};
				var winobj=im_funcWindow(winopt);
				funcWindowarray.push("sendgroupapply");
				var sendfriendapply='<div class="window_bodyarea" id="window_body_7" style="width: 350px; height: 230px; bottom: 29px;">'+						
					'<div class="friendadder_area">'+							
				'<div class="friendadder_area_panel">'+								
				'<div class="friendadder_area_p13">您将加如以下群:</div>'+								
				'<img title="查看资料" class="friendadder_area_avatar" id="friendadder_area_avatar" style="text-decoration: none;" src="images/app_window/im_groupmember_icon.png">'+								
				'<div title="查看资料" class="friendadder_area_nick" id="friendadder_area_nick" style="text-decoration: none;">'+gname+'</div>'+								
				'<div title="查看资料" class="friendadder_area_uin" id="friendadder_area_uin" style="display: none;">'+gid+'</div>'+								
				'<div class="friendadder_area_msg">'+
				'<div>请输入验证信息:</div>'+									
				'<textarea class="friendadder_area_msg_input" id="friendadder_area_msg_input_7" type="text" value=""></textarea>'+								
				'</div>'+																
				'</div>'+							
				'</div>'+						
				'</div>';
				winobj.find(".body").append(sendfriendapply);
				var btstr='<a title="确定" class="chat_sendmsg" id="bt_sendgroupapply" href="#">确定</a>';
				winobj.find(".controlarea").append(btstr);
				winobj.find(".controlarea").find("#bt_sendgroupapply").bind("click",function(){
					im_sendgroupapply(gid,gname,winobj.find(".friendadder_area_msg_input").val(),winobj);
					winobj.find(".controlarea").find("#bt_sendgroupapply").attr("disabled","true");
					setTimeout(function(){winobj.find(".controlarea").find("#bt_sendgroupapply").removeAttr("disabled");},3000);
				});
				}
				break;
			default :
				break;
			}
		}
	});
}
//发送加入群申请。
function im_sendgroupapply(gid,gname,verifymsg,winobj)
{
	$.ajax({
		cache:false,
		url : "sendgroupapply.do",
		data :{G_ID:gid,G_NAME:gname,VERYFY_MESSAGE:verifymsg},
		type : "POST",
		dataType : "text",
		success : function(data) {
			im_removewinid(winobj.attr("window"));
			winobj.remove();
		}
	});
}

//回复加入群申请。
function im_replygroupapply(obj)
{
	if(obj.find("input:radio:checked").val()=="0")
		{
		$.ajax({
			cache:false,
			url : "refusegroupapply.do",
			data :{NT_ID:obj.find(".friendadder_area_avatar").attr("id")},
			type : "POST",
			dataType : "text",
			success : function() {
				im_removewinid(obj.attr("window"));
				obj.remove();
			}
		});
		}
	else if(obj.find("input:radio:checked").val()=="1")
		{
		$.ajax({
			cache:false,
			url : "acceptgroupapply.do",
			data :{G_ID:obj.find(".friendadder_area_panel").attr("gid"),USER_ID:obj.find(".friendadder_area_panel").attr("userid"),USER_NAME:obj.find(".friendadder_area_panel").attr("username"),NT_ID:obj.find(".friendadder_area_avatar").attr("id")},
			type : "POST",
			dataType : "text",
			success : function() {
				im_removewinid(obj.attr("window"));
				obj.remove();
			}
		});
		}
}

/** Main Board Function End **/

/*-------------------------------------------------------------------------------------*/

/** Chat Window Init Begin **/
// 初始化聊天窗口
function im_createWindow(id, username, type, display) {
    var imgsrc="";
    var title ="";
    var template = "";	
	var options = { //默认设置
		win_id : id,
		win_num : num,
		win_z : z_value,
		win_name : username,
		win_height : "400",
		win_width : "450",
		win_display: display
	};
	if (im_my_uid == id) {
		return false;
	}
	if (type == "chat_window")
	{   
	    imgsrc="images/app_window/im_chatwin_single_icon.jpg";
		template = windowTemp;
		title="好友 - "+options.win_name;
	}
	else if (type == "room_window")
	{   
	    imgsrc="images/app_window/im_chatwin_group_icon.jpg";
		template = roomwindowTemp;
		title="群组 - "+options.win_name;
	}
	// 判断窗口是否已打开
	var iswindowopen = 0;
	$('.task-window div').each(function() {
		if ($(this).attr('id') == "window_" + options.win_id) {
				iswindowopen = 1;
				// 改变任务栏样式
				$('.task-window div a').removeClass('focus');
				$(this).children('a').addClass('focus');
				// 改变窗口样式
				var obj = $('#app_window_' + $(this).attr('window'));
				obj.css({'z-index' : z_value }).show();
				obj.find(".window").css({'z-index' : z_value});
				z_value += 1;
		}
	});

	if (iswindowopen == 0) {
		$('.task-window div a').removeClass('focus');
		// 任务栏，窗口等数据
	    var tasktemp = {
			"id" : options.win_id,
			"num" : options.win_num,
			"name" : options.win_name,
			"imgsrc" : "images/app_window/im_chat_icon.png",
			"display" :options.win_display,
			"title"	: title		
		};
		var top = ($(window).height() - options.win_height - 30) / 2 <= 0? 0: ($(window).height() - options.win_height - 30) / 2;
		var left = ($(window).width() - options.win_width) / 2 <= 0	? 0	: ($(window).width() - options.win_width) / 2;
		var wintemp = {
			"id" : options.win_id,
			"num" : options.win_num,
			"z" : options.win_z,
			"user_name" : options.win_name,
			"top" : top,
			"left" : left,
			"display" :options.win_display,
			"imgsrc" : imgsrc
		};
		// 新增任务栏
		$('.task-window').append(im_formatModel(taskTemp, tasktemp));
		// 新增窗口
		$('#app_window').append(im_formatModel(template, wintemp));
		    z_value += 1;
		    num += 1;
		// 绑定窗口功能按钮事件
		im_chatHandle($('#app_window_' + options.win_num), options.win_id, type , username);
		// 获取即将打开的好友的详情
		/*
		 * if(name == 'chat_window'){ //更新最近联系人 im_updateCloseContacted(id);
		 * 
		 * if(frendlistarrayobj[id]) { var pals_obj = frendlistarrayobj[id]; }
		 * else { i_im_getFriendInfo(id); return false } } else
		 * if(name=='room_window') { var pals_obj = grouplistarrayobj[id]; }
		 */
	}
}

// 聊天窗口初始化功能键
function im_chatHandle(obj, id, type ,name) {
	var winid = id;	
	obj.find(".fontfamily").val(font_family);// 初始化字体
	obj.find(".fontsize").val(font_size);
	im_basicHandle(obj);  //初始化窗口
	
	obj.find(".chat_close").bind("click", function(e) {// 聊天的关闭按钮
		$('.task-window div[window="' + obj.attr('window') + '"]').remove();
		obj.remove();
	});
    
	obj.find("#chat_Video_"+id).bind("click", function(e){ //视频聊天邀请
		if(isinvideo==true){
			var opt={num : "hint",height : "130",width : "250"};
			var tiptxt = "不能同时与多人视频！" ;
			im_alert(tiptxt,opt);
		}else{ 
			im_videoInvite(im_my_uid,id,im_my_uname,name);//视频邀请
		}							
	});
	
	obj.find("chat_video_close").bind("click",function(){ //关闭视频聊天窗口   
		obj.width(450);
		obj.find(".body").width(450);
		obj.find("chat_videoinvite").css("display","none");
		
	});
		
	obj.find(".video_invite_agree").bind("click",function(){//绑定同意视频聊天按钮。	
			obj.width(450);
			obj.find(".body").width(450);
			obj.find("chat_videoinvite").css("display","none");
			im_openVideoWin(im_my_uid,my_peerid,im_my_uname,my_peername);
			setTimeout(function(){im_Connect(im_my_uid,im_my_uname);},3000);
			
	});
	
	obj.find(".video_invite_disagree").bind("click",function(){//绑定拒绝视频聊天按钮。
		JavascriptChat.replyvideochat(my_peerid,"disagree");
		obj.width(450);
		obj.find(".body").width(450);
		obj.find("chat_videoinvite").css("display","none");
	});
		
	obj.find(".chat_fontbutton").bind("click", function(e) {// 显示字体工具
		var dis = obj.find(".chat_editortoolbar").css("display");
		if (dis == "block") {
			obj.find(".chat_chatboard").css({'bottom' : '145px'	});
			obj.find(".chat_editortoolbar").hide();
		} else {
			obj.find(".chat_chatboard").css({'bottom' : '170px'	});
			obj.find(".chat_editortoolbar").show();
		}

	});
	
	obj.find(".fontfamily").change(function() {// 设置字体样式
			var fontfamily = $(this).children('option:selected').val();
			obj.find(".chat_rich_editor_div").css({'font-family' : fontfamily});
			font_family = fontfamily;
	});
	
	obj.find(".fontsize").change(function() { // 设置字体大小
			var size = $(this).children('option:selected').val();
			obj.find(".chat_rich_editor_div").css({'font-size' : size + 'pt'	});
			font_size = size;
	});

	obj.find(".chat_facebutton").bind("click", function(e) { //初始化表情面板
		obj.find(".chat_rich_editor_div").setCaret();
		var left = e.pageX, top = e.pageY - 180;
		$('#facePanel').css({left : left + "px", top : top + "px"}).show();
		$("#facePanel .defaultfacepanel").find('.faceicon').each(function() {
			$(this).unbind("click");
			$(this).bind('click', function() {
					var str = $(this).attr("faceid");
					obj.find(".chat_rich_editor_div").insertContent(str);
					$("#facePanel").hide();
			});
		});
		e.stopPropagation();

	});
	
	obj.find(".chat_clearbutton").bind("click", function() { 
		obj.find(".chat_msglist").html('');//初始化清屏
	});
	
	// 限制聊天内容输入最大长度。
	obj.find('textarea').bind('input propertychange', function() {
		if ($('textarea').val().length > 100)
			$('textarea').val($('textarea').val().substring(0, 100));
	});
	
	// 发送消息
	obj.find(".chat_sendmsg").bind("click", function() {
			var userid = winid;
			var chatlog = '';
			var text = obj.find('.chat_rich_editor_div').val();
			text = im_replaceEm(text);
			if (text == null || text == "")
			  alert("不能为空！");			  
			else {
				chatlog = "<dl class='chat_mymsg'>"
						+ "<dt  class='msghead'>"
						+ "<span title='"+im_my_uname+"'>"+im_my_uname+"</span>"
						+ "<span style='margin-left:5px'>"
						+ getFormatDate()
						+ "</span>"
						+ "</dt>"
						+ "<dd class='msgbody defaultfontstyle' style='color:#ff6600;font-family:"
						+ font_family
						+ " ;font-size:"
						+ font_size
						+ "pt;line-height:14pt;font-weight:normal;font-style:normal;text-decoration:none;'>"
						+ text + "<br>" + "</dd>" + "</dl>";
				obj.find(".chat_msglist").append(chatlog);
				var scrollTop = obj.find(".chat_msglist")[0].scrollHeight;
				obj.find(".chat_msglist").scrollTop(scrollTop);
				obj.find('.chat_rich_editor_div').val("");
			if (type == "chat_window"){
				JavascriptChat.sendMessageAuto(text.toString(), userid.toString(),name.toString(),getFormatDate().toString());
			} else if (type == "room_window"){
				JavascriptChat.sendGroupMessage(text.toString(), userid.toString(),name.toString(),getFormatDate().toString());
			}
		   }
			obj.find('.chat_rich_editor_div').focus();
		}); 
   	//发送消息快捷键。
	obj.find(".chat_rich_editor_div").keydown(function(event){
	    obj.find(".chat_rich_editor_div").setCaret();	
		if(event.ctrlKey && event.which == 13 || event.which == 10){
			event.preventDefault();
			obj.find(".chat_rich_editor_div").insertContent("\n");
		}
		else if( event.which==13 || event.which == 10){
			event.preventDefault();
			obj.find(".chat_sendmsg").trigger("click");
		}
	});
	
   if(type == "room_window")
   {
   	 obj.find(".expand").bind("click", function(){
		obj.width(650);
		obj.find(".body").width(650);
		obj.find(".chat_sidebar2").css({'right':'190px'});
		obj.find(".chat_sidebar2").width(10);
		obj.find(".chat_sidebar").css({'display':'block'});
		obj.find(".chat_sidebar2").addClass("chat_sidebar2_expand");
	  });
	 obj.find(".unexpand").bind("click", function(){
		obj.width(475);
		obj.find(".body").width(475);
		obj.find(".chat_sidebar2").css({'right':'0px'});
		obj.find(".chat_sidebar2").width(25);
		obj.find(".chat_sidebar").css({'display':'none'});
		obj.find(".chat_sidebar2").removeClass("chat_sidebar2_expand");
	  });
	 im_displaygroupmember(obj,winid); //显示群好友
	 obj.find(".chat_historybuttoncon").bind("click", function(e){
		 im_displayhistorygroupmessage(obj,id);
		  e.stopPropagation();
	 });
	 
	 obj.find(".chat_groupmember_friend").each(function(){
			im_groupmemberhover($(this));	
		});
	 obj.find(".chat_groupmember_deletable").each(function(){
			im_groupmemberhover($(this));
		});
   }
   else{
	  obj.find(".chat_historybuttoncon").bind("click", function(e){
		   im_displayhistorymessage(obj,id);
		   e.stopPropagation();
	  });
	 
   var uploader=null; //初始化
	   uploader = new plupload.Uploader({
		   runtimes : 'html5,flash,html4',
		   browse_button: obj.find('#fileupload').get(0), // this can be an id of a DOM element or the DOM element itself
		   flash_swf_url : 'javascript/plupload-2.1.2/js/Moxie.swf',
		   max_file_size : '10mb',
		   url: 'fileUpload.do',
		   init: {
				FilesAdded : function (up, files){
					plupload.each(files, function(file) {
						var fileicon = "";
						fileicon = im_getfileextension(file.name);
						var filestring='<dl class="chat_friendmsg" duin="860851669" time="'+getFormatDate()+'">'+
						'<dt class="msghead">'+
					    '<span>'+
					    '<span class="icon_yellow">'+im_my_uname+' </span>'+
					    '</span>'+
					    '<span style="margin-left: 5px;">'+getFormatDate()+'</span>'+
					    '</dt>'+
					    '<dd class="msgBody defaultfontstyle">'+
					    '<div class="msgFileBox" id="'+file.id+'">发送文件:<br>'+
					    '<span class="icon_others" style="'+ fileicon +'">&nbsp;</span>'+file.name+''+
					    '('+plupload.formatSize(file.size)+')'+'<b></b>'+
					    '</div>'+
					    '</dd>'+
					    '</dl>';
						obj.find(".chat_msglist").append(filestring);
						var scrollTop = obj.find(".chat_msglist")[0].scrollHeight;
						if((scrollTop!=undefined)&&(scrollTop!=null)){
							obj.find(".chat_msglist").scrollTop(scrollTop);
						}
					});
					uploader.start();
				 },
				 UploadProgress: function(up, file) {
					   $("#"+file.id).find("b").html('<span>' + file.percent + "%</span>");
				 },
			Error: function(up, err) {
					alert(err.message);
					},
			FileUploaded:function(){
					$.ajax({
		        		cache:false,
						url:'sendfile.do',
						data:{FL_RECEIVER:id,FL_RECEIVERNAME:name,FL_DATE:getFormatDate()},
						type: "POST",
						dataType: "text",
						success:function()
						{
						}
					});
				},
			UploadComplete:function(){
				}
			}
		 });
	   uploader.init();
   }
};

//生成聊天信息字符串。
function im_genmsgstr(map)
{
	var date="";
	var msgstr="";
	if(isNaN(map.MSG_DATE)){
		date=map.MSG_DATE;
	}
	else{
		date=getSmpFormatDateByLong(map.MSG_DATE,true);
	}
	if(map.MSG_SENDER==im_my_uid)
		{
		msgstr="<dl class='chat_mymsg'>"
			+ "<dt  class='msghead'>"
			+ "<span title='"+map.MSG_SENDERNAME+"'>"+map.MSG_SENDERNAME+"</span>"
			+ "<span style='margin-left:5px'>"
			+ date
			+ "</span>"
			+ "</dt>"
			+ "<dd class='msgbody defaultfontstyle' style='color:#ff6600;font-family:宋体 ;font-size:10pt;line-height:14pt;font-weight:normal;font-style:normal;text-decoration:none;'>"
			+ map.MSG_CONTENT + "<br>" + "</dd>" + "</dl>";
		}
	else
		{
		msgstr="<dl class='chat_friendmsg'>"
			+ "<dt  class='msghead'>"
			+ "<span title='"+map.MSG_SENDERNAME+"'>"+map.MSG_SENDERNAME+"</span>"
			+ "<span style='margin-left:5px'>"
			+ date
			+ "</span>"
			+ "</dt>"
			+ "<dd class='msgbody defaultfontstyle' style='color:#ff6600;font-family:宋体 ;font-size:10pt;line-height:14pt;font-weight:normal;font-style:normal;text-decoration:none;'>"
			+ map.MSG_CONTENT + "<br>" + "</dd>" + "</dl>";
		}
	return msgstr;
}
//显示历史信息。
function im_displayhistorymessage(obj,id)
{
	var winopt={num : "historymessage"+id,z : z_value,title: "历史消息记录",height : "358",width : "450"};
	var winobj=im_funcWindow(winopt);
	$.ajax({
		cache:false,
		async:false,
		url:"getrecentmessage.do",
		data:{FRIEND_ID:id},
		type:"GET",
		dataType: "json",
		success:function(data){
			var msgstr="";
			if (data.length) {
				for (var listkey in data) {
					var map = data[listkey];
					msgstr = msgstr + im_genmsgstr(map);
				}
				msgstr = '<div id="id_getrecentmessage' + id
						+ '" style="height:auto;">' + msgstr + '</div>';
				msgstr = '<div style="height:295px;overflow-y:auto;">' + msgstr
						+ '</div>';
				winobj.find(".body").html(msgstr);
				winobj.find(".controlarea").css("background-color", "#FFFFFF");
				winobj
						.find(".controlarea")
						.html('<div class="divjpages" style="float:right"></div>');
				winobj.find(".controlarea").find(".divjpages").jPages({
							containerID : "id_getrecentmessage" + id,
							previous : "",
							next : "",
							perPage : 8
						});
			}
		}
	});
}
//显示群历史信息。
function im_displayhistorygroupmessage(obj,id)
{
	var winopt={num : "historygroupmessage"+id,z : z_value,title:"消息记录",height : "358",width : "450"};
	var winobj=im_funcWindow(winopt);
	$.ajax({
		cache:false,
		async:false,
		url:"getrecentgroupmessage.do",
		data:{G_ID:id},
		type:"GET",
		dataType: "json",
		success:function(data){
			var msgstr="";
			if(data.length){
			for(var listkey in data){
				var map=data[listkey];
				msgstr=msgstr+im_genmsgstr(map);
			}
			msgstr='<div id="id_getrecentmessage'+id+'" style="height:auto;">'+msgstr+'</div>';
			msgstr='<div style="height:295px;overflow-y:auto;">'+msgstr+'</div>';
			winobj.find(".body").html(msgstr);
			winobj.find(".controlarea").html("<div class='divjpages'></div>");
			winobj.find(".controlarea").find(".divjpages").jPages({
			    containerID : "id_getrecentmessage"+id,
			    previous : "",
			    next : "",
			    perPage : 8
			  });
			}
		}
	});
}
//获取文件扩展名。
function im_getfileextension(filename)
{   
	var exten = "";	
	exten = filename.substring(filename.lastIndexOf(".")+1);
	
	var fileicon ="";
	if(exten=="doc"||exten=="docx")
	{
		fileicon="background: url(images/app_window/im_file_word.png) no-repeat ;";
	}
	else if(exten=="xls"||exten=="xlsx")
	{
		fileicon="background: url(images/app_window/im_file_excel.png) no-repeat ;";
	}
	else if(exten=="zip"||exten=="rar"||exten=="")
	{
		fileicon="background: url(images/app_window/im_file_zip.png) no-repeat ;";
	}
	else if(exten=="ppt"||exten=="pptx")
	{
		fileicon="background: url(images/app_window/im_file_ppt.png) no-repeat ;";
	}
	else if(exten=="pdf"||exten=="caj")
	{
		fileicon="background: url(images/app_window/im_file_pdf.png) no-repeat ;";
	}
	else if(exten=="jpg"||exten=="jepg"||exten=="gif"||exten=="png")
	{
		fileicon="background: url(images/app_window/im_file_image.png) no-repeat ;";
	}
	else if(exten=="txt")
	{
		fileicon="background: url(images/app_window/im_file_txt.png) no-repeat ;";
	}
	else
	{
		fileicon="background: url(images/app_window/im_file_others.png) no-repeat ;";
	}
	
	return fileicon ;
}

//显示群成员列表
function im_displaygroupmember(obj,G_ID)
{
	$.ajax({
		cache:false,
		async:false,
		url:"displaygroupmember.do",
		data:{G_ID:G_ID},
		type:"GET",
		dataType: "json",
		success:function(data){
			var listbody="";
			for(var listkey in data)
				{
				var map=data[listkey];
				if((map.GM_ROLE=="0")&&(map.G_CREATERID==im_my_uid))
					{
					listbody=listbody+'<div id="'+map.GM_USER_ID+'" gid="'+map.GM_G_ID+'" gm_role="'+map.GM_ROLE+'" class="chat_groupmember_deletable" style="background-color: transparent;">'+
					   '<div class="chat_groupmember_iconarea">'+	
						  '<img src="images/app_window/im_groupmember_icon.png" class="chat_groupmember_icon" id="chat_groupMember_icon_{id}_{fid}">'+											
					   '</div>'+					
					   '<div title="'+map.GM_USER_NAME+'" class="chat_groupmember_namearea">'+						
						  '<div class="chat_groupmember_nick " id="chat_groupMember_nick_{id}_{fid}">'+map.GM_USER_NAME+'</div>'+					
					   '</div>'+
				  '</div>';
					}
				else
					{
					listbody=listbody+'<div id="'+map.GM_USER_ID+'" gid="'+map.GM_G_ID+'" gm_role="'+map.GM_ROLE+'" class="chat_groupmember_friend" style="background-color: transparent;">'+
					   '<div class="chat_groupmember_iconarea">'+	
						  '<img src="images/app_window/im_groupmember_icon.png" class="chat_groupmember_icon" id="chat_groupMember_icon_{id}_{fid}">'+											
					   '</div>'+					
					   '<div title="'+map.GM_USER_NAME+'" class="chat_groupmember_namearea">'+						
						  '<div class="chat_groupmember_nick " id="chat_groupMember_nick_{id}_{fid}">'+map.GM_USER_NAME+'</div>'+					
					   '</div>'+
				  '</div>';
					}
				}
			obj.find('.chat_groupmember_onlinearea').html(listbody);
			obj.find('.chat_groupmember_onlinearea').children().each(function(){
				if($(this).attr("gm_role")=="1")
					{
					$(this).html('<div class="chat_groupmaster_icon" title="创建者"></div>'+$(this).html());
					}
			});
			obj.find(".chat_groupmember_title").html("群成员（"+obj.find('.chat_groupmember_onlinearea').children().length+"）");
			im_groupmembercontextMenu();
		}
	});
}
//为群内成员绑定右键菜单。
function im_groupmembercontextMenu()
{
	$.contextMenu( 'destroy', '.chat_groupmember_deletable' );
	$.contextMenu({
		selector:'.chat_groupmember_deletable',
		callback:function(key,options){
			switch(key){
			case "personal_profile":
				im_displayfriendinfo($(this).attr('id'));
				break;
			case "deletemember":
			{
			  var msg="确定要删除群成员吗？";
			  var opt = {num : "confirm",height : "130", width : "250"};
			  var param = {gid:$(this).attr("gid"),uid:$(this).attr("id"),obj:$(this)};
			  im_confirm(msg,opt,param,im_deletegroupmember);
			}
				break;
			default:
				break;
			}
		},
		items:{
			"personal_profile" : {name : "查看资料"},
			"deletemember":{name:"删除群成员"}
		}
	});
	
	$.contextMenu( 'destroy', '.chat_groupmember_friend' );
	$.contextMenu({
		selector:'.chat_groupmember_friend',
		callback:function(key,options){
			switch(key){
			case "personal_profile":
				im_displayfriendinfo($(this).attr('id'));
				break;
			default:
				break;
			}
		},
		items:{
			"personal_profile" : {name : "查看资料"}
		}
	});
}

//删除群成员。
function im_deletegroupmember(param)
{
	$.ajax({
		cache:false,
		url:"deletegroupmember.do",
		data:{G_ID:param.gid,USER_ID:param.uid},
		type:"POST",
		dataType: "text",
		success:function(){
			im_alert("成功删除群成员。");
			param.obj.remove();
		}
	});
}

/** Chat Window Init End **/


/** Chat Message Handle Begin **/
//接收单聊消息 
function im_receiveMessages(messages) {
	var chatlog="";
	var map=null;
	 for(var listkey in messages){
		 map = messages[listkey];
		 if($('#chat_msgList_'+map.MSG_SENDER).length<=0){
			 im_showtips("single",map.MSG_SENDER,map.MSG_SENDERNAME,map.MSG_CONTENT,"none");
			 im_createWindow(map.MSG_SENDER,map.MSG_SENDERNAME,"chat_window","none");
			 im_hidetaskbar(map.MSG_SENDER);
		 }
		 else{
			 var winid=$("#task-bar").find("#window_"+map.MSG_SENDER).attr("window");
			 if($("#app_window_"+winid).is(":hidden")){
				 im_showtips("single",map.MSG_SENDER,map.MSG_SENDERNAME,map.MSG_CONTENT);
			 }
			 else{}
		}
		chatlog = chatlog+im_genmsgstr(map);			
		JavascriptChat.confirmmessage();
	 }
	 $('#chat_msgList_'+map.MSG_SENDER).append(chatlog);
	 var scrollTop = $('#chat_msgList_'+map.MSG_SENDER)[0].scrollHeight;
	 $('#chat_msgList_'+map.MSG_SENDER).scrollTop(scrollTop);
		
}
//接受群聊天消息
function im_receiveGroupMessages(messages)
{
	var chatlog="";
	var map=null;
	 for(var listkey in messages){
		map = messages[listkey];
		if($('#chat_msgList_'+map.MSG_G_ID).length<=0){
			im_showtips("group",map.MSG_G_ID,map.MSG_G_NAME,map.MSG_CONTENT);
			im_createWindow(map.MSG_G_ID,map.MSG_G_NAME,"room_window","none");
			im_hidetaskbar(map.MSG_G_ID);
	    }
		else{
			var winid=$("#task-bar").find("#window_"+map.MSG_G_ID).attr("window");
			if($("#app_window_"+winid).is(":hidden")){
				im_showtips("group",map.MSG_G_ID,map.MSG_G_NAME,map.MSG_CONTENT);
			}
			else
				{}
		}
	  chatlog = chatlog+im_genmsgstr(map);	
	  JavascriptChat.confirmmessage();
	}
	 $('#chat_msgList_'+map.MSG_G_ID).append(chatlog);
	 var scrollTop = $('#chat_msgList_'+map.MSG_G_ID)[0].scrollHeight;
	 $('#chat_msgList_'+map.MSG_G_ID).scrollTop(scrollTop);
}
//接受文件信息。
function im_receivefileinfo(files)
{
	var map=files[0];
	if($('#chat_msgList_'+map.FL_SENDER).length<=0){
		im_createWindow(map.FL_SENDER,map.FL_SENDERNAME,"chat_window","none");
	    im_hidetaskbar(map.FL_SENDER);
	    im_showtips("single",map.FL_SENDER,map.FL_SENDERNAME,"向您发送文件。");
	}
	else{
		var winid=$("#task-bar").find("#window_"+map.FL_SENDER).attr("window");
		if($("#app_window_"+winid).is(":hidden")){
			im_showtips("single",map.FL_SENDER,map.FL_SENDERNAME,"向您发送文件。");
		}
		else
			{}
	}
	var filestring='<dl class="chat_friendmsg" duin="860851669" time="'+map.FL_DATE+'">'+
		'<dt class="msghead">'+
	'<span title="'+map.FL_SENDER+'">'+
	'<span class="icon_yellow">&nbsp;</span>'+
	'</span>'+
	'<span style="margin-left: 5px;">'+map.FL_DATE+'</span>'+
	'</dt>'+
	'<dd class="msgBody defaultfontstyle">'+
	'<div class="msgFileBox">对方给您发送文件:<br>'+
	'<span class="icon_others">&nbsp;</span>'+map.FL_OLDNAME+''+
	'<span class="fileAct">&nbsp;'+
	'<a id="agree_'+map.FL_ID+'" href="#">[同意]</a>&nbsp;'+
	'<a id="refuse_'+map.FL_ID+'" href="#">[拒绝]</a>'+
	'</span>'+
	'</div>'+
	'</dd>'+
	'</dl>';
	$('#chat_msgList_'+map.FL_SENDER).append(filestring);
	var scrollTop = $('#chat_msgList_'+map.FL_SENDER)[0].scrollHeight;
	$('#chat_msgList_'+map.FL_SENDER).scrollTop(scrollTop);
	//绑定同意下载函数。
	$('#chat_msgList_'+map.FL_SENDER).find('#agree_'+map.FL_ID).bind('click',function(){
		im_downloadfile(map.FL_ID);
	});
	
	//绑定拒绝下载函数。
	$('#chat_msgList_'+map.FL_SENDER).find('#refuse_'+map.FL_ID).bind('click',function(){
		im_refusedownloadfile(map.FL_ID);
	});
}
//下载文件。
function im_downloadfile(fl_id)
{
	$('#agree_'+fl_id).css("color","red");
	location.href="filedownload.do?FL_ID="+fl_id;
}
//拒绝下载文件。
function im_refusedownloadfile(fl_id)
{
	$('#refuse_'+fl_id).css("color","red");
	$.ajax({
		cache:false,
		url:"refusedownloadfile.do",
		data:{FL_ID:fl_id},
		type:"POST"
	});
}

//生成消息提示字符串。
function im_gentipstr(sendername,content)
{
	var tipstr='<a href="###">'+
	'<span class="count">(<span class="countnum">1</span>)</span>'+
	'<img class="avatar" alt="" src="images/app_window/im_groupmember_icon.png">'+
	'<span class="msgcontent"><span class="contentinner">'+sendername+'：'+content.replace(/<br\/>/g, "")+'</span></span>'+
	'</a>'+
	'</li>';
	return tipstr;
}

//显示消息提示
function im_showtips(type,winid,sendername,content)
{
	//改变title。
	im_changeTitle();
	//播放声音。
	im_playMsg();
	//提示有消息。
	$("#messageBubble").show("normal");
	$("#messageBubblePanel").show("normal");
	var msgliststr="";
	//msgliststr=$("#messageBubble_bubbleMsgList_ul").html();
	var totalcount=$("#messageBubble_bubbleMsgList_userCount").html();
	totalcount=parseInt(totalcount)+1;
	//在messageBubblePanel中显示最新一条消息。
	var msgnow='<span class="content" > <span class="nick">'+sendername+'</span>：'+content+'</span>';
	$("#messageBubble").find(".bubblepanel_body").find(".content").html(msgnow);
	$("#messageBubble").find("#messageBubblePanel").find(".count").html("("+totalcount+")");
	$("#messageBubble_bubbleMsgList_userCount").html(totalcount);
	switch(type)
	{
	case "single":
		if($("#messagebubble_msg_single_"+winid).length>0)
			{
			var msg_single_count=$("#messagebubble_msg_single_"+winid).find(".countnum").html();
			msg_single_count=parseInt(msg_single_count)+1;
			$("#messagebubble_msg_single_"+winid).find(".countnum").html(msg_single_count);
			$("#messagebubble_msg_single_"+winid).find(".contentinner").html(sendername+":"+content.replace(/<br\/>/g, ""));
			}
		else
			{
			msgliststr='<li class="item" id="messagebubble_msg_single_'+winid+'" uid="'+winid+'">'+im_gentipstr(sendername,content);
			$("#messageBubble_bubbleMsgList_ul").append(msgliststr);
			$("#messageBubble_bubbleMsgList_ul").find("#messagebubble_msg_single_"+winid).find("a").bind("click",function(){
				im_showsinglewin(winid);
			});
			}
		break;
	case "group":
		if($("#messagebubble_msg_group_"+winid).length>0)
		{
		   var msg_group_count=$("#messagebubble_msg_group_"+winid).find(".countnum").html();
		   msg_group_count=parseInt(msg_group_count)+1;
		   $("#messagebubble_msg_group_"+winid).find(".countnum").html(msg_group_count);
		   $("#messagebubble_msg_group_"+winid).find(".contentinner").html(sendername+":"+content.replace(/<br\/>/g, ""));
		}
	    else
		{
		   msgliststr='<li class="item" id="messagebubble_msg_group_'+winid+'" gid="'+winid+'">'+im_gentipstr(sendername,content);
		   $("#messageBubble_bubbleMsgList_ul").append(msgliststr);
		   $("#messageBubble_bubbleMsgList_ul").find("#messagebubble_msg_group_"+winid).find("a").bind("click",function(){
			  im_showgroupwin(winid);
		   });
		}
		break;
	case "friendapply":
		msgliststr='<li class="item" id="messagebubble_msg_notice_'+winid+'" nid="'+winid+'">'+im_gentipstr(sendername,content);
		$("#messageBubble_bubbleMsgList_ul").append(msgliststr);
		$("#messageBubble_bubbleMsgList_ul").find("#messagebubble_msg_notice_"+winid).find("a").bind("click",function(){
			im_showfriendapplywin(winid);
		});
		break;
	case "groupinvite":
		msgliststr='<li class="item" id="messagebubble_msg_notice_'+winid+'" nid="'+winid+'">'+im_gentipstr(sendername,content);
		$("#messageBubble_bubbleMsgList_ul").append(msgliststr);
		$("#messageBubble_bubbleMsgList_ul").find("#messagebubble_msg_notice_"+winid).find("a").bind("click",function(){
			im_showgroupinvitewin(winid);
		});
		break;
	case "groupapply":
		msgliststr='<li class="item" id="messagebubble_msg_notice_'+winid+'" nid="'+winid+'">'+im_gentipstr(sendername,content);
		$("#messageBubble_bubbleMsgList_ul").append(msgliststr);
		$("#messageBubble_bubbleMsgList_ul").find("#messagebubble_msg_notice_"+winid).find("a").bind("click",function(){
			im_showgroupapplywin(winid);
		});
		break;
	default:
		break;
	}
}

//显示消息提示框。
function im_showlayer()
{
	$("#messageBubble_bubbleMsgList").toggle("normal");
}

//查看全部信息
function im_viewall()
{
	$("#messageBubble_bubbleMsgListContainer").find("#messageBubble_bubbleMsgList_ul").find("a").each(
	    function(){$(this).click();
	});
}

//忽略全部消息
function im_ignoreall()
{
	//关闭未显示的聊天窗口和底部隐藏的任务栏。
	$("#task-bar").find(".task-window").find("li").each(function(){
		var obj=this;
		if($(obj).is(":hidden"))
			{
			var winid=$(obj).attr("window");
			$("#app_window_"+winid).remove();
			$(obj).remove();
			}
	});
	//关闭未显示的通知窗口。
	$("#messageBubble").find("#messageBubble_bubbleMsgList_ul").find("li").each(function(){
		var obj=this;
		if($(obj).attr("nid")!=undefined)
			{
			var nid=$(obj).attr("nid");
			$("#app_window_notice"+nid).remove();
			im_ignorenotice(nid);
			}
		else
			{}
	});
	//拒绝接收未显示的聊天窗口中的文件。
	$("#messageBubble").find("#messageBubble_bubbleMsgList_ul").find("li").each(function(){
		var obj=this;
		if($(obj).attr("uid")!=undefined)
			{
			var uid=$(obj).attr("uid");
			im_ignorefile(uid);
			}
		else
			{}
	});
	//消息数清零。
	$(".bubblecontainer").find("#messageBubble_bubbleMsgList_userCount").html("0");
	//清空消息列表。
	$(".bubblecontainer").find(".bubblepanel_body").find(".content").html("");
	$(".bubblecontainer").find("#messageBubble_bubbleMsgList_ul").html("");
	//隐藏消息提示。
	$(".bubblecontainer").hide("normal");
	$(".bubblecontainer").find("#messageBubble_bubbleMsgList").hide("normal");
	//还原title。
	clearTimeout(setTimeOutId);
	document.title = main_title;
}
//移除一条消息提示。
function im_removetip(id,type)
{
	var totalcount=$("#messageBubble_bubbleMsgList_userCount").html();
	totalcount=parseInt(totalcount);
	switch(type)
	{
	case "single":
		totalcount=totalcount-parseInt($("#messagebubble_msg_single_"+id).find(".countnum").html());
		$("#messagebubble_msg_single_"+id).remove();
		break;
	case "group":
		totalcount=totalcount-parseInt($("#messagebubble_msg_group_"+id).find(".countnum").html());
		$("#messagebubble_msg_group_"+id).remove();
		break;
	case "friendapply":
		totalcount=totalcount-1;
		$("#messagebubble_msg_notice_"+id).remove();
		break;
	case "groupinvite":
		totalcount=totalcount-1;
		$("#messagebubble_msg_notice_"+id).remove();
		break;
	case "groupapply":
		totalcount=totalcount-1;
		$("#messagebubble_msg_notice_"+id).remove();
		break;
	default:
		break;
	}
	$("#messageBubble_bubbleMsgList_userCount").html(totalcount);
	$("#messageBubble").find("#messageBubblePanel").find(".count").html("("+totalcount+")");
	if(totalcount==0)
	{
		//还原title。
		clearTimeout(setTimeOutId);
		document.title = main_title;
		$(".bubblecontainer").hide("normal");
		$(".bubblecontainer").find("#messageBubble_bubbleMsgList").hide("normal");
	}
}
//显示单聊窗口。
function im_showsinglewin(id)
{
	var winid=$("#task-bar").find("#window_"+id).attr("window");
	$("#app_window_"+winid).show("normal");
	im_removetip(id,"single");
	im_showtaskbar(id);
	var scrollTop = $('#chat_msgList_'+id)[0].scrollHeight;
	$('#chat_msgList_'+id).scrollTop(scrollTop);
}

//显示群聊天窗口。
function im_showgroupwin(id)
{
	var winid=$("#task-bar").find("#window_"+id).attr("window");
	$("#app_window_"+winid).show("normal");
	im_removetip(id,"group");
	im_showtaskbar(id);
	var scrollTop = $('#chat_msgList_'+id)[0].scrollHeight;
	$('#chat_msgList_'+id).scrollTop(scrollTop);
}
//显示好友申请通知窗口。
function im_showfriendapplywin(id)
{
	$("#app_window_notice"+id).show("normal");
	im_removetip(id,"friendapply");
}
//显示邀请加入群通知窗口。
function im_showgroupinvitewin(id)
{
	$("#app_window_notice"+id).show("normal");
	im_removetip(id,"groupinvite");
}
//显示申请加入群通知窗口。
function im_showgroupapplywin(id)
{
	$("#app_window_notice"+id).show("normal");
	im_removetip(id,"groupapply");
}
//显示通知。
function im_receivenotice(notices)
{
	var map=notices[0];
	im_winnotice(map);
}

//显示好友消息记录。
function im_display_friend_message_log(obj)
{
	obj.find(".messdetail").children().hide();
	obj.find("#friend_message_log").show();
}

//显示群消息记录。
function im_display_group_message_log(obj)
{
	obj.find(".messdetail").children().hide();
	obj.find("#group_message_log").show();
}

//显示系统消息记录。
function im_display_system_message_log(obj)
{
	obj.find(".messdetail").children().hide();
	obj.find("#system_message_log").show();
}

//主动获取通知
function im_getnotice()
{
	$.ajax({
		async:false,
		cache:false,
		url : "getnotice.do",
		type : "GET",
		dataType :"json",
		success : function(data) {
			for (var listkey in data)
			{
				var map=data[listkey];
				im_winnotice(map);
			}
		}
	});
}
//创建通知窗口。
function im_winnotice(map)
{
	switch(map.NT_TYPE)
	{
	case "friendapply":
		im_showtips("friendapply",map.NT_ID,map.NT_SENDERNAME,"请求添加您为好友。");
		var winopt={num : "notice"+map.NT_ID,z : z_value,title: "好友申请",height : "250",width : "350"};
		var winobj=im_funcWindow(winopt);
		winobj.hide();
		var friendapplystr='<div class="window_bodyarea" id="window_body_4" style="width: 350px; height: 230px; bottom: 29px;">'+						
			'<div class="friendadder_area">'+							
		'<div class="friendadder_area_panel">'+								
		'<img title="查看资料" class="friendadder_area_avatar" id="'+map.NT_ID+'" style="text-decoration: none;" src="images/app_window/im_groupmember_icon.png">'+								
		'<div title="查看资料" class="friendadder_area_nick" id="'+map.NT_SENDER+'" style="text-decoration: none;">'+map.NT_SENDERNAME+'</div>'+								
		'<div>请求添加您为好友。</div>'+								
		'<div class="friendadder_area_msg">'+
		    '<div style="height: 50px; overflow: auto;">附加信息:('+map.NT_VERIFY+')</div>'+								
		'</div>'+								
		'<div class="friendadder_area_aradio" id="friendadder_area_label" for="friendadder_area_aradio">'+									
		   '<input name="ra'+map.NT_ID+'" class="radio" type="radio" checked="checked" value="1">'+								
		   '<span class="friendadder_area_lable_text">同意并添加对方为好友</span>'+								
		'</div>'+								
		'<div class="friendadder_area_content" id="friendadder_area_content">'+									
		  '<div class="friendadder_area_rename2">'+
		    '<span>备注:</span>'+										
		    '<input class="friendadder_area_input" id="friendadder_area_rename" type="text" value="">'+									
		  '</div>'+																
		'</div>'+																						
		'<div class="friendadder_area_aradio" id="friendadder_area_label" for="friendadder_area_aradio">'+									
		    '<input name="ra'+map.NT_ID+'" class="radio" type="radio" value="0">'+									
		    '<span class="friendadder_area_lable_text">拒绝</span>'+							
		'</div>'+															
		'</div>'+						
		'</div>'+						
		'</div>';
		winobj.find(".body").append(friendapplystr);
		winobj.find(".friendadder_area_nick").bind("click",function(e){
			im_displayuserinfo(winobj.find(".friendadder_area_nick").attr("id"));
			e.stopPropagation();
		});
		var btstr='<div id="replyfriendapply" class="ip_button" >确    定</div>';
	    winobj.find(".controlarea").append(btstr);
	    winobj.find("#replyfriendapply").bind("click",function(){
	    	im_reply_friend_apply(winobj);
	    	winobj.find(".controlarea").find("#replyfriendapply").attr("disabled","true");
			setTimeout(function(){winobj.find(".controlarea").find("#replyfriendapply").removeAttr("disabled");},3000);
	    });
		break;

	case "groupinvite":
		im_showtips("groupinvite",map.NT_ID,map.NT_SENDERNAME,"邀请您加入群。");
		var winopt={num : "notice"+map.NT_ID,z : z_value,title: "邀请您加入群",height : "150",width : "350"};
		var winobj=im_funcWindow(winopt);
		winobj.hide();
		var groupinvitestr='<div class="window_bodyarea" id="window_body_4" style="width: 350px; height: 100px; bottom: 29px;">'+						
			'<div class="friendadder_area">'+							
		'<div class="friendadder_area_panel" id="'+map.NT_ID+'" gid="'+map.NT_G_ID+'" gname="'+map.NT_G_NAME+'" uid="'+map.NT_SENDER+'">'+																
		'<span style="margin-left: 10px; float: left;"><a class="confirm_htmlAllName" id="a_sendername" onclick="return false;" href="#">'+map.NT_SENDERNAME+'</a></span>'+
		'<span style="margin-left: 10px; float: left;">邀请您加入群</span>'+
		'<span style="margin-left: 10px; float: left;"><a class="confirm_htmlAllName" id="a_gname" onclick="return false;" href="#">'+map.NT_G_NAME+'</a></span>'+
		'<div>&nbsp;</div>'+	
		'<div>&nbsp;</div>'+
		'<div class="friendadder_area_aradio" id="friendadder_area_label" for="friendadder_area_aradio">'+									
		  '<input name="ra'+map.NT_ID+'" class="radio" type="radio" checked="checked" value="1">'+								
		  '<span class="friendadder_area_lable_text">同意</span>	'+							
		'</div>'+																														
		'<div class="friendadder_area_aradio" id="friendadder_area_label" for="friendadder_area_aradio">'+									
		   '<input name="ra'+map.NT_ID+'" class="radio" type="radio" value="0">'+								
		   '<span class="friendadder_area_lable_text">拒绝</span>'+								
		'</div>'+														
		'</div>'+						
		'</div>'+						
		'</div>';
		winobj.find(".body").append(groupinvitestr);
		winobj.find("#a_sendername").bind("click",function(e){
			im_displayuserinfo(winobj.find(".friendadder_area_panel").attr("uid"));
			e.stopPropagation();
		});
		winobj.find("#a_gname").bind("click",function(e){
			im_displaygroupinfo(winobj.find(".friendadder_area_panel").attr("gid"),winobj.find(".friendadder_area_panel").attr("gname"));
			e.stopPropagation();
		});
		var btstr='<div id="replygroupinvite" class="ip_button">确定</div>';
	    winobj.find(".controlarea").append(btstr);
	    winobj.find("#replygroupinvite").bind("click",function(){
	    	im_reply_group_invite(winobj);
	    	winobj.find(".controlarea").find("#replygroupinvite").attr("disabled","true");
			setTimeout(function(){winobj.find(".controlarea").find("#replygroupinvite").removeAttr("disabled");},3000);
	    });
		break;
	case "groupapply":
		im_showtips("groupapply",map.NT_ID,map.NT_SENDERNAME,"申请加入群。");
		var winopt={num : "notice"+map.NT_ID,z : z_value,title: "申请加入群",height : "280",width : "350"};
		var winobj=im_funcWindow(winopt);
		winobj.hide();
		var groupapplystr='<div class="window_bodyarea" id="window_body_4" style="width: 350px; height: 230px; bottom: 29px;">'+						
			'<div class="friendadder_area">'+							
		'<div class="friendadder_area_panel" gid="'+map.NT_G_ID+'" userid="'+map.NT_SENDER+'" username="'+map.NT_SENDERNAME+'">'+								
		'<img title="查看资料" class="friendadder_area_avatar" id="'+map.NT_ID+'" style="text-decoration: none;" src="images/app_window/im_groupmember_icon.png">'+								
		'<div title="查看资料" class="friendadder_area_nick" id="'+map.NT_SENDER+'" style="text-decoration: none;">'+map.NT_SENDERNAME+'</div>'+								
		'<div>申请加入群'+map.NT_G_NAME+'。</div>'+								
		'<div class="friendadder_area_msg">'+
		'<div style="height: 50px; overflow: auto;">附加信息:('+map.NT_VERIFY+')</div>'+								
		'</div>'+								
		'<div class="friendadder_area_aradio" id="friendadder_area_label" for="friendadder_area_aradio">'+									
		  '<input name="ra'+map.NT_ID+'" class="radio" type="radio" checked="checked" value="1">'+								
		  '<span class="friendadder_area_lable_text">同意</span>'+								
		'</div>'+																													
		'<div class="friendadder_area_aradio" id="friendadder_area_label" for="friendadder_area_aradio">'+									
		  '<input name="ra'+map.NT_ID+'" class="radio" type="radio" value="0">'+									
		   '<span class="friendadder_area_lable_text">拒绝</span>'+							
		'</div>'+															
		'</div>'+						
		'</div>'+						
		'</div>';
		winobj.find(".body").append(groupapplystr);
		var btstr='<div id="replygroupapply" class="ip_button" >确定</div>';
	    winobj.find(".controlarea").append(btstr);
	    winobj.find("#replygroupapply").bind("click",function(){
	    	im_replygroupapply(winobj);
	    	winobj.find(".controlarea").find("#replygroupapply").attr("disabled","true");
			setTimeout(function(){winobj.find(".controlarea").find("#replygroupapply").removeAttr("disabled");},3000);
	    });
		break;
	default:
		break;
	}
}
//主动获取消息
function im_getmessage()
{
	$.ajax({
		async:false,
		cache:false,
		url : "getmessage.do",
		type : "GET",
		dataType :"json",
		success : function(data) {
			var chatlog="";
			for (var listkey in data)
			{
				var map=data[listkey];
				if(map.MSG_ISGROUPMSG=="0"){
					if($('#chat_msgList_'+map.MSG_SENDER).length<=0){
						im_showtips("single",map.MSG_SENDER,map.MSG_SENDERNAME,map.MSG_CONTENT);
						im_createWindow(map.MSG_SENDER,map.MSG_SENDERNAME,"chat_window","none");
						im_hidetaskbar(map.MSG_SENDER);
					}else{
						var winid=$("#task-bar").find("#window_"+map.MSG_SENDER).attr("window");
						if($("#app_window_"+winid).is(":hidden")){
							im_showtips("single",map.MSG_SENDER,map.MSG_SENDERNAME,map.MSG_CONTENT);
						}else
						{}
					}
					chatlog = im_genmsgstr(map);	
					$('#chat_msgList_'+map.MSG_SENDER).append(chatlog);
					var scrollTop = $('#chat_msgList_'+map.MSG_SENDER)[0].scrollHeight;
					$('#chat_msgList_'+map.MSG_SENDER).scrollTop(scrollTop);
				}
				else{
					if($('#chat_msgList_'+map.MSG_G_ID).length<=0){
						im_showtips("group",map.MSG_G_ID,map.MSG_G_NAME,map.MSG_CONTENT);
						im_createWindow(map.MSG_G_ID,map.MSG_G_NAME,"room_window","none");
						im_hidetaskbar(map.MSG_G_ID);
					}
					else{
						var winid=$("#task-bar").find("#window_"+map.MSG_G_ID).attr("window");
						if($("#app_window_"+winid).is(":hidden")){
							im_showtips("group",map.MSG_G_ID,map.MSG_G_NAME,map.MSG_CONTENT);
						}
						else{}
					}
					chatlog = im_genmsgstr(map);
					$('#chat_msgList_'+map.MSG_G_ID).append(chatlog);
					var scrollTop = $('#chat_msgList_'+map.MSG_G_ID)[0].scrollHeight;
					$('#chat_msgList_'+map.MSG_G_ID).scrollTop(scrollTop);
				}
			}
			JavascriptChat.confirmmessage();
		}
	});
}
//获取待接收的文件
function im_getfiletoreceive()
{
	$.ajax({
		cache:false,
		async:false,
		url:"getfiletoreceive.do",
		type:"GET",
		dataType :"json",
		success:function(data){
			for (var listkey in data)
			{
				var map=data[listkey];
				if($('#chat_msgList_'+map.FL_SENDER).length<=0){
					im_showtips("single",map.FL_SENDER,map.FL_SENDERNAME,"向您发送文件。");
					im_createWindow(map.FL_SENDER,map.FL_SENDERNAME,"chat_window","none");
					im_hidetaskbar(map.FL_SENDER);
					}
				else{
					var winid=$("#task-bar").find("#window_"+map.FL_SENDER).attr("window");
					if($("#app_window_"+winid).is(":hidden")){
						im_showtips("single",map.FL_SENDER,map.FL_SENDERNAME,"向您发送文件。");
					}
					else
						{}
				}
				var filestring='<dl class="chat_friendmsg" duin="860851669" time="'+getSmpFormatDateByLong(map.FL_DATE,true)+'">'+
				'<dt class="msghead">'+
			    '<span title="'+map.FL_SENDER+'">'+
			    '<span class="icon_yellow">&nbsp;</span>'+
			    '</span>'+
			    '<span style="margin-left: 5px;">'+getSmpFormatDateByLong(map.FL_DATE,true)+'</span>'+
			    '</dt>'+
			    '<dd class="msgBody defaultfontstyle">'+
			    '<div class="msgFileBox">对方给您发送文件:<br>'+
			    '<span class="icon_others">&nbsp;</span>'+map.FL_OLDNAME+''+
			    '<span class="fileAct">&nbsp;'+
			    '<a id="agree_'+map.FL_ID+'" href="#">[同意]</a>&nbsp;'+
			    '<a id="refuse_'+map.FL_ID+'" href="#">[拒绝]</a>'+
			    '</span>'+
			    '</div>'+
			    '</dd>'+
			    '</dl>';
				$('#chat_msgList_'+map.FL_SENDER).append(filestring);
				var scrollTop = $('#chat_msgList_'+map.FL_SENDER)[0].scrollHeight;
				if((scrollTop!=undefined)&&(scrollTop!=null))
				{
					$('#chat_msgList_'+map.FL_SENDER).scrollTop(scrollTop);
				}
				//绑定同意下载函数。
				im_binddownloadfile($('#chat_msgList_'+map.FL_SENDER).find('#agree_'+map.FL_ID),map.FL_ID);
				
				//绑定拒绝下载函数。
				im_bindrefusedownloadfile($('#chat_msgList_'+map.FL_SENDER).find('#refuse_'+map.FL_ID),map.FL_ID);
				}
			//temobj.hide();
		}
	});
}
//绑定同意下载函数。
function im_binddownloadfile(obj,flid)
{
	obj.bind("click",function(){
		im_downloadfile(flid);
	});
}
//绑定拒绝下载函数。
function im_bindrefusedownloadfile(obj,flid)
{
	obj.bind("click",function(){
		im_refusedownloadfile(flid);
	});
}

//忽略一条通知。
function im_ignorenotice(id)
{
	$.ajax({
		cache:false,
		url:"refusefriendapply.do",
		data:{NT_ID:id},
		type:"POST"
	});
}
//忽略一个用户发来的文件。
function im_ignorefile(uid)
{
	$.ajax({
		cache:false,
		url:"ignorefile.do",
		data:{USER_ID:uid},
		type:"POST"
	});
}

//隐藏任务条。
function im_hidetaskbar(id)
{
	$("#task-bar").find("#window_"+id).hide();
}
//显示任务条。
function im_showtaskbar(id)
{
	$("#task-bar").find("#window_"+id).show();
}

/*********** 视频插件接口函数 Begin **********/
var my_peerid = '' ;   //视频对象ID
var my_peername = '';  //视频对象Name
var connect_status = 0 ; //视频连接状态
var connect_times = 2; //连接次数
var inviter = 1;
var setTimeId = '';

function im_mainSwf(movieName){//获取swf对象

	if (window.document[movieName]) {
		    return window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet") == -1) {
		if (document.embeds && document.embeds[movieName])
			return document.embeds[movieName];
	} else 
	{
		    return document.getElementById(movieName);
	}
}

//获取swf返回的信息
function im_videomessage(info){
	
	var msg = info;
	var obj = $("#videowindow");
	obj.find(".video_info").text(msg);	
}

//打开视频聊天窗口
function im_openVideoWin(myid,peerid,name,peername){
	
	var title = "您正在与" + peername + "视频....." ;
	if(myid!=null&&peerid!=null&&name!=null){ 	
		var obj = $('#videowindow');
		obj.find('#window_title').text(title);
		obj.css("display", "block");
		obj.find('.videopage').css("display", "none");
	    obj.find('.videodisplay').css("display", "block");		
	    obj.show();
		im_bindWindowMove(obj);	
		im_videoDisplay(obj,peerid); //显示视频窗口
		obj.find("#close").bind("click" , function(e){
			im_disConnect(obj,peerid);
			obj.find(".video_info").text("");
			obj.css("display", "none");
			obj.hide();
		});		
		obj.find("#video_shutdown").bind("click" , function(){
			im_disConnect(obj,peerid);
			obj.find(".video_info").text("");
			obj.css("display", "none");
			obj.hide();
		});
		obj.find("#video_change").bind("click", function(){
			im_changevideodisplay(obj,peerid);											 
		});
	}
}

//链接Server
/*JS 调用 SWF*/
function im_Connect(myid,myname){
   
   if(my_peerid!=''){
	  var swf = im_mainSwf("p2p_"+my_peerid);
	  if(swf!=null){
         
	    if(connect_times>=1&&connect_status != 1)
	    {   	
	    	swf.InitUser(myid,myname);
	        swf.connectServer();	
	        setTimeId = setTimeout(function(){im_Connect(myid,myname);},3000);
	        connect_times-- ;
	    }
	    else if(connect_times<1&&connect_status != 1)
	    {
	    	clearTimeout(setTimeId);
	    	connect_times = 2;
	    	im_videomessage("服务器连接失败，请重新尝试");
	    }
	    else if(connect_status == 1)
	    {   if(inviter)
	    	JavascriptChat.invitevideochat(my_peerid);//发送邀请信息
	        else{
	        	JavascriptChat.replyvideochat(my_peerid,"agree");					
			    im_agreevideonInvite(my_peerid , my_peername);			
	        }
	    	clearTimeout(setTimeId);
	    	connect_times = 2;
	    }
	  }
	  else{
	   im_videomessage("初始化错误，请重新尝试！");
	  }
	}
	else{
	   im_videomessage("请关闭窗口重新尝试！"); 
	}
}

//连接server状态处理
function im_connectstatus(con){
	var obj = $('#videowindow');	
    if(con == 1)
	{	obj.find(".video_info").text("服务器连接成功");
		connect_status = 1;		
	}
	else
	{   obj.find(".video_info").text("我们正在努力尝试连接！");
		connect_status = 0;
		my_peerid='';
	}
}

//打开视频窗口连接服务器
function im_videoInvite(im_my_uid,peerid,im_my_uname,peername){
	
	my_peerid = peerid;	
	my_peername = peername;
	inviter = 1;
	im_openVideoWin(im_my_uid,peerid,im_my_uname,peername);
	setTimeout(function(){im_Connect(im_my_uid,im_my_uname);},3000);
}
//收到视频邀请。
function im_receivevideoinvite(msg)
{   
	inviter = 0;
	if(isinvideo==true)
	{
		JavascriptChat.replyvideochat(msg.SENDER,"isinvideo");
	}
	else
	{
		if($("#chat_videoinvite_"+msg.RECEIVER).length<=0)
		{
			im_createWindow(msg.SENDER,msg.SENDERNAME,"chat_window","block");
		}		
		my_peerid = msg.SENDER ;   //视频对象ID
        my_peername = msg.SENDERNAME;  //视频对象Name	
        isinvideo = true;
        var num = $('#task-bar').find('#window_'+my_peerid).attr('window');
        $('#app_window_'+num).width(600);
        $('#app_window_'+num).find('.body').width(600);
        $('#app_window_'+num).find('.chat_videoinvite').css('display','block');
	}
}

//收到被邀请方的回复。
function im_receivevideochatreply(msg)
{   
    var opt={num : "hint",height : "130",width : "250"};
    var tiptxt = "";
	if(msg.CONTENT=="agree"){
		im_agreevideonInvite(my_peerid,my_peername);
	}
	else if(msg.CONTENT=="disagree"){

		tiptxt = "对方拒绝您的视频邀请！" ;
		im_alert(tiptxt,opt);
		my_peerid="";
		my_peername ="";
		isinvideo = false;
	}else{
		
		tiptxt="对方暂时无法接受您的视频邀请！";
		im_alert(tiptxt,opt);
		my_peerid="";
		my_peername ="";
		isinvideo = false;
	}
}

//同意视频邀请调用swf。
function im_agreevideonInvite(peerid,peername)
{   
	var swf = im_mainSwf("p2p_"+my_peerid);
	if(my_peerid!=''&&connect_status == 1){
	   swf.InitOther(peerid,peername);
	   swf.agreeInvite("同意");
	}
}

//断开聊天视频连接
function im_disConnect(){
   var swf = im_mainSwf("p2p_"+my_peerid);
   if(my_peerid!=''&&connect_status == 1){
     swf.closeStream("关闭");  
   }
}

//变换视频显示
function im_changevideodisplay(){
	var swf = im_mainSwf("p2p_"+my_peerid);
	if(my_peerid!=''&&connect_status == 1){
	 swf.find(".p2p_"+id).changeDisplay(); 
	}
}

/***  视频插件  end  ***/


//显示好友详细信息的弹出层
function im_pop(list) {  
	    var div = $("#miniCard"); //要浮动在这个元素旁边的层  
	    div.css("position", "absolute");//让这个层可以绝对定位   
	    var obj = list.find(".friendphoto_container");
	    list.hover(function(e) { 
			$(this).css("background-color","#99CCFF");
			e.stopPropagation();
	    },  
	    function(e) { 
	      $(this).css("background-color","#FFFFFF");
		  e.stopPropagation();
	     }  
	    );
	    
		obj.hover(function(e) { 
			im_poplayer_init(list);//初始化基本功能  
			var p = obj.offset(); //获取这个元素的left和top  
	        var x = p.left ;//获取这个元素的left 
			var t = p.top; //获取这个元素的top
	        if (x - div.width() >10) {  
	            x = p.left - div.width()+3;  
	        } 
			else{
			   x = 25 ;
			}
	        div.css("left", x);  
	        div.css("top",t-3 );
			div.css("display", "block"); 
	        div.show();
			e.stopPropagation();
	    },  
	    function(e) { 
		  var target = $(e.target);
		  if (target.closest("#miniCard").length != 1)
		  {
	         div.css("display", "none");
		  }
		  e.stopPropagation();
	     }  
	    );  
		div.hover(function(e){
		 var target = $(e.target);
		 if (target.closest("#miniCard").length == 1)
		 { 
		    div.css("display", "block"); 
	        div.show();
		 }
		  e.stopPropagation();
		},
		function(e){
		   var target = $(e.target);
		   if (target.closest("friendphoto_container").length != 1)
		   { 
	            div.css("display", "none");
				poplay = 0;
			}
			e.stopPropagation();
		});
} 
/**
 * im_groupmemberhover
 * 群好友的hover
 * **/
function im_groupmemberhover(list){
	  list.hover(function(e) { 
			$(this).css("background-color","#99CCFF");
			e.stopPropagation();
	    },  
	    function(e) { 
	      $(this).css("background-color","#FFFFFF");
		  e.stopPropagation();
	     }  
	    );
}
//弹出层初始化
function im_poplayer_init(list){
     var div = $("#miniCard"); //要浮动在这个元素旁边的层  
     var uname = list.find(".friendlist_nick").text();
     var uid = list.attr("id");
     
     div.find("#miniCard_name_inner").text(uname);
	 div.find("#miniCard_name_inner").attr("title",uname); 	 
	 div.find("#miniCard_Chat").bind("click", function(){
	   im_createWindow(uid, uname, "chat_window", "display");	 	
	 });
	 div.find("#miniCard_homepage").attr("href","#####"); //好友主页连接
	 div.find("#miniCard_userDetails").bind("click",function(){ //好友详细信息
	    im_displayuserinfo(uid);
	 });
}

//清空Array 对象
function im_cleararray(array)
{
	if(array!=null)
	{
	  for(var i=0;i<array.length;i++)
	  {
		array.pop();
	  }
	}
}
/**
 * im_msgTip
 * 聊天信息提示
 * **/
function im_msgTip(){
     //显示信息提示框
	$("#messageBubble").find("#messageBubblePanel").bind("click",function(){
	   im_showlayer();
	});
	//取消全部信息
	$("#messageBubble").find("#messageBubble_bubbleMsgList_cancelNotifyButton").bind("click",function(){
	    im_ignoreall();
	});
	//查看全部信息
	$("#messageBubble").find("#messageBubble_bubbleMsgList_viewAll").bind("click",function(){
	   im_viewall();
	});
}
/**
 * init()
 * 初始化函数
 *  
 * **/
function app_init() {
	//接收信息
	im_msgTip();
	dwr.engine.setActiveReverseAjax(true,true);
	//自定义异常处理。
	function errh(msg, exc) {;	}
	dwr.engine.setErrorHandler(errh);
	// 绑定任务栏点击事件
	$(document).on('click', '.task-window a', function(){im_taskwindow($(this));});
	// 绑定窗口点击事件
	$(document).on('click', '.app_window', function(){	im_windowclick($(this)); });
	//阻止右键
	$(document).bind("contextmenu", function(e) {return false;});	
	im_initMainboard(); //初始化主面板
	setTimeout(function(){
		im_getmessage();
		im_getnotice();
		im_getfiletoreceive();
	},3000);	
	lastId = setInterval(im_lastonline, 30000);
};

/**
 * app_end()
 * 结束函数
 * **/
function app_end(obj){ 	
   $("#task-bar").find(".task-window").html("");
   $("#app_window").html("");
   $("ul").remove();
   im_cleararray(invitedfriends);
   window.clearInterval(lastId);
   im_lastonline();						
   e.stopPropagation();
}
