// JavaScript Document
/** Window Init Begin **/
//窗口初始化
function im_funcWindow(opt){ 		
	var top = ($(window).height()-400)/2 <= 0? 0: ($(window).height()-400)/2;
	var left = ($(window).width()-450)/2 <= 0? 0: ($(window).width()-450)/2;
	this.options = { //默认设置
		num : num,
		z : z_value,
		title: "这是标题",
		height : "400",
		width : "450",
		top : top,
		left : left		
	};
	options = $.extend(options,opt);
	var model = {
		"num" : options.num,
		"z" : options.z,
		"top" : options.top,
		"left" : options.left,
		"title" : options.title,
		"width" :options.width , 
		"height" :options.height,
		"b_width" :options.width,
		"b_height" :options.height - 63
	};		
	var temp = funcwindowTemp;  	
	$('#app_window').append(im_formatModel(temp, model)); //初始化页面成功
	var obj = $('#app_window_' + options.num);
	im_basicHandle(obj);
	   z_value += 1;
	   num += 1;
	return obj;	
	
}

//窗口基本功能键初始化
function im_basicHandle(obj) { 	
   im_bindWindowMove(obj);//初始化移动函数
   obj.find('.titlebutton_min').bind("click",function(e) {
		obj.hide();
		$('.task-window div[window="' + obj.attr('window') + '"] a').removeClass('focus');
	});
   obj.find('.titlebutton_close').bind("click", function(e) {				
		$('.task-window div[window="' + obj.attr('window') + '"]').remove();
		obj.remove();
		im_removewinid(obj.attr("window"));
		e.stopPropagation();
		im_cleararray(invitedfriends);
		
	});
  
};
//初始化窗口移动
function im_bindWindowMove(obj) {
	var draggable;
	var cX, cY, sT, sL, eX, eY, w, h, _w, _h;
	obj.find(".titlebar").bind("mousedown", function(e) {
		// 改变窗口样式
		draggable = 1;
		obj.find(".titlebar").css({'cursor':'default'}); 
		cX = e.clientX; // 鼠标位于屏幕的left
		cY = e.clientY; // 鼠标位于屏幕的top
		sT = obj.offset().top;
		sL = obj.offset().left;
		w = $(window).width();
		h = $(window).height();
		_w = obj.find(".titlebar").outerWidth();
		_h = obj.find(".titlebar").outerHeight();
	   // 绑定鼠标移动事件		
	 $(document).unbind("mousemove").bind("mousemove", function(e) {
	   if (draggable) {
		  eX = e.clientX; // 鼠标位于屏幕的left
		  eY = e.clientY; // 鼠标位于屏幕的top
		  lessX = eX - (cX - sL); // 距初始位置的偏移量
		  lessY = eY - (cY - sT); // 距初始位置的偏移量
				// 窗口贴屏幕顶部10px内
		 if (lessX <= 0) {	lessX = 0;}
				// 窗口贴屏幕左边10px内
		 if (lessY <= 0) {	lessY = 0;}
				// 窗口贴屏幕右边10px内
		 if (lessX >= w - _w) {	lessX = w - _w;	}
				// 窗口贴屏幕下边10px内 //40px 下方还有task-bar任务栏
		 if (lessY >= h - _h - 10){	lessY = h - _h - 10;}
		 obj.css({left : lessX , top : lessY});
		 return false;
		}
	});
	$(document).bind("mouseup", function() {
			if (draggable) {
				draggable = 0;
				return false;
			}
	});
  });
};
// 处理任务栏
function im_taskwindow(obj) {
	var window_warp = obj.parent('').attr('window');
	if (obj.hasClass('focus')) {
		obj.removeClass('focus');
		obj.addClass('taskitem');
		$('#app_window_' + window_warp).hide();
	} else {
		// 改变任务栏样式
		$('.task-window div a').removeClass('focus').addClass('taskitem');
		obj.removeClass('taskitem').addClass('focus');
		// 改变窗口样式
		$('#app_window_' + window_warp).css({'z-index' : z_value}).show();
		$('#app_window_' + window_warp).find(".window").css({'z-index' : z_value});
		z_value += 1;
	}
};
// 窗口单击事件
function im_windowclick(obj) {
	// 改变任务栏样式
	$('.task-window div a').removeClass('focus').addClass('taskitem');
	$('.task-window div[window="' + obj.attr('window') + '"] a').addClass('focus');
	obj.css({'z-index' : z_value});
	obj.find(".window").css({'z-index' : z_value});
	z_value += 1;
}

//查找窗口是否已存在。
function im_winexist(id){	
    var bool=false;
	for(var i=0;i<funcWindowarray.length;i++)
	{
		if(funcWindowarray[i]==id){
			bool=true;
			break;
		}
	}
	return bool;
}
//关闭窗口时在向量中删除它的名称。
function im_removewinid(id){   
   for(var i=0;i<funcWindowarray.length;i++){
	 if(funcWindowarray[i]==id){
		funcWindowarray.splice(i,1);
	  }
   }
}

/** Window Init End **/

// 表情处理
function im_faceControl() {
	var array = [['em_0', 'em_1', 'em_2', 'em_3', 'em_4', 'em_5', 'em_6', 'em_7','em_8', 'em_9'],
			['em_10', 'em_11', 'em_12', 'em_13', 'em_14', 'em_15', 'em_16','em_17', 'em_18', 'em_19'],
			['em_20', 'em_21', 'em_22', 'em_23', 'em_24', 'em_25', 'em_26','em_27', 'em_28', 'em_29'],
			['em_30', 'em_31', 'em_32', 'em_33', 'em_34', 'em_35', 'em_36','em_37', 'em_38', 'em_39'],
			['em_40', 'em_41', 'em_42', 'em_43', 'em_44', 'em_45', 'em_46','em_47', 'em_48', 'em_49'],
			['em_50', 'em_51', 'em_52', 'em_53', 'em_54', 'em_55', 'em_56','em_57', 'em_58', 'em_59']];

	var html = '';
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < 10; j++) {
			html += '<a href="###" title="' + array[i][j] + '" faceid="['
					+ array[i][j] + ']" class="faceicon"></a>';
		}
	}

	$(".defaultfacepanel").append(html);
	$(document).bind('click', function(e) {
		var target = $(e.target);
		if (target.closest(".chat_facebutton").length == 1)
				return;
		if (target.closest("#facePanel").length == 0) {
				$('#facePanel').hide();
		}
	});

}
// 替换表情符
function im_replaceEm(str) {
	str = str.replace(/\</g, '&lt;');
	str = str.replace(/\>/g, '&gt;');
	str = str.replace(/\n/g, '<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="images/faceicon/$1.gif" border="0" />');
	return str;	
}

// 标题提示
var step = 0;
var setTimeOutId = '';
var main_title="资源共享在线交流平台";
function im_changeTitle() {	
	if (1) {
		step++;
		if (step == 1) {
			document.title = "    "+"您有新的短消息" ;
		} else if (step == 2) {
			document.title = "    "+"有新的短消息...." ;
		}
		else if (step == 3) {
			document.title = "    "+"新的短消息......";			
		}
		else if(step == 4){
			document.title = "    "+"的短消息........";
		}
		else if(step == 5){  
			document.title = "    "+"短消息..........";
		}
		else if(step == 6){   
		    document.title = "    "+"消息............";
		}
		else if(step == 7){   
		    document.title = "    "+"息..............";
		     step = 0;
		}
		if(setTimeOutId) {
			clearTimeout(setTimeOutId);
		};
		setTimeOutId = setTimeout("im_changeTitle()", 500);
	} else {
		document.title = main_title;
	}
}

// 播放新消息声音
function im_playMsg() {
	
	var html = '';
	html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="1" height="1">';
	html += '<param name="movie" value="javascript/flash/msg.swf" />';
	html += '<param name="quality" value="high" />';
	html += '<param name="wmode" value="transparent" />';
	html += '<param name="menu" value="false" />';
	html += '<embed src="javascript/flash/msg.swf" menu="false" wmode="transparent" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="1" height="1"></embed>';
	html += '</object>';
	$("#msg_wav").html(html);
	setTimeout(function (){$("#msg_wav").html("");}, 1000);
}

// 播放视频提示音
function im_playViodeo(){
    var html = '';
	html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="1" height="1">';
	html += '<param name="movie" value="javascript/flash/msg.swf" />';
	html += '<param name="quality" value="high" />';
	html += '<param name="wmode" value="transparent" />';
	html += '<param name="menu" value="false" />';
	html += '<embed src="javascript/flash/msg.swf" menu="false" wmode="transparent" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="1" height="1"></embed>';
	html += '</object>';
	$("#msg_wav").html("");
	$("#msg_wav").html(html);
	setTimeout(function (){$("#msg_wav").html("");}, 1000);
}

//用户视频交互
function im_videoDisplay(obj,id){

    var html = "";
	if(id!= null){
		id ="p2p_" + id ;
		html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,0,0,0" width="360" height="300" id="'+id+'">';
		html += '<param name="movie" value="javascript/flash/VideoChat.swf" />';
		html += '<param name="quality" value="high" />';
		html += '<param name="wmode" value="transparent" />';
		html += '<param name="menu" value="false" />';
		html += '<param name="bgcolor" value="#ffffff" />';
		html += '<param name="allowScriptAccess" value="always" />';
		html += '<param name="allowFullScreen" value="true" />';
		html += '<embed src="javascript/flash/VideoChat.swf" menu="false" wmode="transparent" quality="high" allowScriptAccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="360" height="300" swliveconnect="true" swliveconnect="true" id="'+id+'" name="'+id+'" />';
		html += '</embed>';
		html += '</object>';
		obj.find("#videodisplay").html(html);			
	}
}
// 模板格式化
function im_formatModel(str, model) {
	for (var k in model) {
		var re = new RegExp("{" + k + "}", "g");
		str = str.replace(re, model[k]);
	}
	return str;
};

// 二级菜单格式化对象
function im_formatObj(str) {
	return eval("(" + str + ")");
};

//扩展Date的format方法  
Date.prototype.format = function (format) 
{
	var o = {
			"M+": this.getMonth() + 1, 
			"d+": this.getDate(), 
			"h+": this.getHours(), 
			"m+": this.getMinutes(), 
			"s+": this.getSeconds(), 
			"q+": Math.floor((this.getMonth() + 3) / 3), 
			"S": this.getMilliseconds()
	};
	if (/(y+)/.test(format)) 
	{
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) 
	{
		if (new RegExp("(" + k + ")").test(format)) 
		{
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
/** 
*转换日期对象为日期字符串 
* @param date 日期对象 
* @param isFull 是否为完整的日期数据, 
* 为true时, 格式如"2000-03-05 01:05:04" 
* 为false时, 格式如 "2000-03-05" 
* @return 符合要求的日期字符串 
*/ 
function getSmpFormatDate(date, isFull)
{
	var pattern = ""; 
	if (isFull == true || isFull == undefined)
		{
		pattern = "yyyy-MM-dd hh:mm:ss";
		}
	else
		{
		pattern = "yyyy-MM-dd";
		}
	return getFormatDate(date, pattern);
}
/** 
*转换当前日期对象为日期字符串 
* @param date 日期对象 
* @param isFull 是否为完整的日期数据, 
* 为true时, 格式如"2000-03-05 01:05:04" 
* 为false时, 格式如 "2000-03-05" 
* @return 符合要求的日期字符串 
*/ 
function getSmpFormatNowDate(isFull) 
{
	return getSmpFormatDate(new Date(), isFull); 
} 
/** 
*转换long值为日期字符串 
* @param l long值 
* @param isFull 是否为完整的日期数据, 
* 为true时, 格式如"2000-03-05 01:05:04" 
* 为false时, 格式如 "2000-03-05" 
* @return 符合要求的日期字符串 
*/ 
function getSmpFormatDateByLong(l, isFull) 
{ 
	return getSmpFormatDate(new Date(l), isFull);
} 
/** 
*转换long值为日期字符串 
* @param l long值 
* @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss 
* @return 符合要求的日期字符串 
*/ 
function getFormatDateByLong(l, pattern) 
{
	return getFormatDate(new Date(l), pattern);
} 
/** 
*转换日期对象为日期字符串 
* @param l long值 
* @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss 
* @return 符合要求的日期字符串 
*/ 
function getFormatDate(date, pattern) 
{ 
	if (date == undefined) 
		{
		date = new Date();
		}
	
	if (pattern == undefined)
		{
		pattern = "yyyy-MM-dd hh:mm:ss";
		}
	
	return date.format(pattern);
} 

//更新最后在线时间。
function im_lastonline()
{
	$.ajax({
		cache:false,
		url:"lastonline.do"
	});
}

//光标定位插件
jQuery.extend({ 
unselectContents: function(){ 
	if(window.getSelection) 
		window.getSelection().removeAllRanges(); 
	else if(document.selection) 
		document.selection.empty(); 
	} 
});

jQuery.fn.extend({ 
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	}, 

	setCaret: function(){ 
	  
		//if($.support.leadingWhitespace) 
		   //  return; 
		var initSetCaret = function(){ 
			var textObj = $(this).get(0); 
			textObj.caretPos = document.selection.createRange().duplicate(); 
		}; 
		  $(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
	}, 

	insertAtCaret: function(textFeildValue){ 
		var textObj = $(this).get(0); 
		if(document.all && textObj.createTextRange && textObj.caretPos){ 
			var caretPos=textObj.caretPos; 
			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
			textFeildValue+'' : textFeildValue; 
		} else if(textObj.setSelectionRange){ 
			var rangeStart=textObj.selectionStart; 
			var rangeEnd=textObj.selectionEnd; 
			var tempStr1=textObj.value.substring(0,rangeStart); 
			var tempStr2=textObj.value.substring(rangeEnd); 
			textObj.value=tempStr1+textFeildValue+tempStr2; 
			textObj.focus(); 
			var len=textFeildValue.length; 
			textObj.setSelectionRange(rangeStart+len,rangeStart+len); 
			textObj.blur(); 
		}else{ 
			textObj.value+=textFeildValue; 
		} 
	} ,
	insertContent : function(myValue, t) {  
			var $t = $(this)[0];  
			if (document.selection) {  
				this.focus();  
				var sel = document.selection.createRange();  
				sel.text = myValue;  
				this.focus();  
				sel.moveStart('character', -l);  
				var wee = sel.text.length;  
				if (arguments.length == 2) {  
				var l = $t.value.length;  
				sel.moveEnd("character", wee + t);  
				t <= 0 ? sel.moveStart("character", wee - 2 * t	- myValue.length) : sel.moveStart("character", wee - t - myValue.length);  
				sel.select();  
				}  
			} else if ($t.selectionStart || $t.selectionStart == '0') {  
				var startPos = $t.selectionStart;  
				var endPos = $t.selectionEnd;  
				var scrollTop = $t.scrollTop;  
				$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos,$t.value.length);  
				this.focus();  
				$t.selectionStart = startPos + myValue.length;  
				$t.selectionEnd = startPos + myValue.length;  
				$t.scrollTop = scrollTop;  
				if (arguments.length == 2) { 
					$t.setSelectionRange(startPos - t,$t.selectionEnd + t);  
					this.focus(); 
				}  
			} else {                              
				this.value += myValue;                              
				this.focus();  
			}  
		}  
	
});

//弹出自定义alert。
function im_alert(message,opt)
{
	this.options = { //默认设置
	   num : "im_alert",
	   z : 10000,
	   title: "温馨提示",
	   height : "130",
	   width : "250"
	};	
	options = $.extend(options,opt);	
	message = '<div style="text-align: center; margin-top: 15px; font-size:12px;">'+message+'</div>';
	var btstr = '<div class="ip_button">确定</div>';
	var winobj = im_funcWindow(options);
	funcWindowarray.push(options.num);
	winobj.removeClass("app_window").addClass("tip_window");
	winobj.find(".body").append(message);
	winobj.find(".titlebutton_close").remove();
	winobj.find(".controlarea").css("background","#ffffff").html(btstr);
	$(document).overlay();
	winobj.find(".controlarea").find(".ip_button").bind("click",function(){
		winobj.remove();
		im_removewinid(winobj.attr("window"));
		$(".overlay").remove();
	});
}
//弹出自定义confirm，点击确定返回true，点击取消返回false。
function im_confirm(message,opt,param, callback)
{
	this.options = { //默认设置
	   num : "im_confirm",
	   z : 10000,
	   title: "温馨提示",
	   height : "130",
	   width : "250"
	};	
	options = $.extend(options,opt);	
	message='<div style="text-align: center; margin-top: 15px; font-size: 12px;">'+message+'</div>';
	var btstr='<div class="ip_button" id="ip_button_confirm" style="float:left; margin-left:30px">确定</div>'+
	'<div class="ip_button" id="ip_button_cancel"style="float:right; margin-right:30px">取消</div>';
	var winobj = im_funcWindow(options);
	funcWindowarray.push(options.num);
	winobj.removeClass("app_window").addClass("tip_window");
	winobj.find(".body").append(message);
	winobj.find(".titlebutton_close").remove();
	winobj.find(".controlarea").html(btstr);
	$(document).overlay();	
	winobj.find(".controlarea").find("#ip_button_confirm").bind("click",function(){
		winobj.remove();
		im_removewinid(winobj.attr("window"));
		$(".overlay").remove();
		if(typeof callback === "function"){
        //调用它，既然我们已经确定了它是可调用的
        callback(param);
        }
	});
	
	winobj.find(".controlarea").find("#ip_button_cancel").bind("click",function(){
		winobj.remove();
		im_removewinid(winobj.attr("window"));
		$(".overlay").remove();
		return ;
	});
}

function bindResize(el,direction)
{
      //初始化参数
      var els = el.style,
       //鼠标的 X 和 Y 轴坐标
      x = y = 0;
      //邪恶的食指
      $(el).mousedown(function (e)
      {
         //按下元素后，计算当前鼠标与对象计算后的坐标
         x = e.clientX - el.offsetWidth,
         y = e.clientY - el.offsetHeight;
         //在支持 setCapture 做些东东
         el.setCapture ? (
         //捕捉焦点
         el.setCapture(),
         //设置事件
         el.onmousemove = function (ev)
         {
              mouseMove(ev || event);
         },
         el.onmouseup = mouseUp
         ) : (
                //绑定事件
                 $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
         );
          //防止默认事件发生
         e.preventDefault();
       });
       //移动事件
      function mouseMove(e)
      {
           //宇宙超级无敌运算中...
           els.width = e.clientX - x + 'px',
           els.height = e.clientY - y + 'px';
      }
      //停止事件
      function mouseUp()
      {
                //在支持 releaseCapture 做些东东
         el.releaseCapture ? (
                //释放焦点
             el.releaseCapture(),
                //移除事件
             el.onmousemove = el.onmouseup = null
           ) : (
                    //卸载事件
              $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
           );
       }
}

//判断浏览器版本，如果是ie8以下，返回false，其他返回true。
function im_goodborwser()
{
	if(navigator.appVersion.indexOf("MSIE 7.0")!=-1)
	{  //ie6或ie7
	   return false;
	}
	else
		return true;
}