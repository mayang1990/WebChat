<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>请登录</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
     <link href="css/validation/template.css" rel="stylesheet" type="text/css" />
    <link href="css/validation/validationEngine.jquery.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="<%=path%>/javascript/jQuery/jquery-1.10.2.js"> </script>
    <script src="javascript/validation/jquery.validationEngine-zh_CN.js" type="text/javascript"></script>
    <script src="javascript/validation/jquery.validationEngine.js" type="text/javascript"></script>
    
    <script type="text/javascript">
        jQuery(document).ready(function () {
            // binds form submission and fields to the validation engine
            jQuery("#form1").validationEngine();
            jQuery('input').attr('data-prompt-position','bottomRight');
			jQuery('input').data('promptPosition','bottomRight');
			jQuery('textarea').attr('data-prompt-position','bottomRight');
			jQuery('textarea').data('promptPosition','bottomRight');
			jQuery('select').attr('data-prompt-position','bottomRight');
			jQuery('select').data('promptPosition','bottomRight');
        });//配置表单验证功能。
            
        function loadimage(){ 
        	document.getElementById("randImage").src = "image.jsp?"+Math.random(); 
        	} //刷新验证码。
	</script>
  </head>
  
<body bgcolor="#cccccc">
<table  style="height:28px; text-align:center; font-size:28px; font-weight:bold; color:#000000; width:100%">
  <tr>
    <td>重点实验室工程技术研究中心资源共享与在线交互平台</td>
    </tr>
</table>
<form action="login.do" method="post" style="margin:0px;display:inline;" id="form1">
<div align="right">
用户名：<input type=text name="USER_ID" class="validate[required,minSize[6],maxSize[20]] text-input"/>&nbsp;
密码：<input type="password" name="U_Pwd"  class="validate[required,minSize[6],maxSize[20]] text-input"/>&nbsp;
验证码：<input type=text name="captcha" maxlength="5" style="width:40px" />&nbsp;
<img alt="code..." name="randImage" id="randImage" src="image.jsp" width="60" height="20" border="1" align="absmiddle">&nbsp;
<a href="javascript:loadimage();"><font class=pt95>看不清点我</font></a>&nbsp;
<input id="submit" type="submit" value="登录" />&nbsp;
<input type="button" onclick="location='regist.jsp'" value="注册" />&nbsp;
<a href="resetpassword.jsp">忘记密码？</a>&nbsp;
<input type="button" onclick="location='displayexceptionlog.do'" value="异常日志" />
</div>
<div align="center">${error_message}</div>
</form>
</body>
</html>
