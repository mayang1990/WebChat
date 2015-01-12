package com.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.model.FileModel;
import com.service.FileService;
import com.service.implement.JavascriptChat;

/**
 * SpringMVC中的文件上传
 * 1)由于SpringMVC使用的是commons-fileupload实现,所以先要将其组件引入项目中
 * 2)在SpringMVC配置文件中配置MultipartResolver处理器(可在此加入对上传文件的属性限制)
 * 3)在Controller的方法中添加MultipartFile参数(该参数用于接收表单中file组件的内容)
 * 4)编写前台表单(注意enctype="multipart/form-data"以及<input type="file" name="****"/>)
 * PS:由于这里使用了ajaxfileupload.js实现无刷新上传,故本例中未使用表单
 * ---------------------------------------------------------------------------------------------
 * 这里用到了如下的jar
 * commons-io-2.4.jar
 * commons-fileupload-1.3.jar
 * commons-logging-1.1.2.jar
 * spring-aop-3.2.4.RELEASE.jar
 * spring-beans-3.2.4.RELEASE.jar
 * spring-context-3.2.4.RELEASE.jar
 * spring-core-3.2.4.RELEASE.jar
 * spring-expression-3.2.4.RELEASE.jar
 * spring-jdbc-3.2.4.RELEASE.jar
 * spring-oxm-3.2.4.RELEASE.jar
 * spring-tx-3.2.4.RELEASE.jar
 * spring-web-3.2.4.RELEASE.jar
 * spring-webmvc-3.2.4.RELEASE.jar
 * ---------------------------------------------------------------------------------------------
 * @create Sep 14, 2013 5:06:09 PM
 * @author 玄玉<http://blog.csdn.net/jadyer>
 */
@Controller
public class FileController {
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private FileService fileservice;
	
	//上传文件的原名(即上传前的文件名字)
    private String originalFilename = null;
    private String newfilename="";
    private String extensionName ="";
	/**
	 * 这里这里用的是MultipartFile[] myfiles参数,所以前台就要用<input type="file" name="myfiles"/>
	 * 上传文件完毕后返回给前台[0`filepath],0表示上传成功(后跟上传后的文件路径),1表示失败(后跟失败描述)
	 */
	@RequestMapping("/fileUpload")
	public ModelAndView fileUpload(@RequestParam("file") MultipartFile[] files, HttpServletRequest request, HttpServletResponse response) throws IOException{
		System.out.print("上传文件。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。");
		HttpSession session=request.getSession(false);
		String realPath = request.getSession().getServletContext().getRealPath("/upload/"+session.getAttribute("USER_ID").toString());
		//设置响应给前台内容的数据格式
		response.setContentType("text/plain; charset=UTF-8");
		//设置响应给前台内容的PrintWriter对象
		PrintWriter out = response.getWriter();
		
		//如果只是上传一个文件,则只需要MultipartFile类型接收文件即可,而且无需显式指定@RequestParam注解
		//如果想上传多个文件,那么这里就要用MultipartFile[]类型来接收文件,并且要指定@RequestParam注解
		//上传多个文件时,前台表单中的所有<input type="file"/>的name都应该是myfiles,否则参数里的myfiles无法获取到所有上传的文件
		for(MultipartFile myfile : files){
			if(myfile.isEmpty()){
				out.print("1`请选择文件后上传");
				out.flush();
				return null;
			}else if (myfile.getSize()>10485760) {
				throw new MaxUploadSizeExceededException(10485760);
			}else {
			originalFilename = myfile.getOriginalFilename();
			extensionName = originalFilename.substring(originalFilename .lastIndexOf(".")+1);
				System.out.println("文件原名: " + originalFilename);
				System.out.println("文件长度: " + myfile.getSize());
				System.out.println("文件类型: " + myfile.getContentType());
				System.out.println(session.getServletContext().getRealPath("/"));
				Date date=new Date();
				newfilename = Long.toString(date.getTime())+"."+extensionName;
				try {
					FileUtils.copyInputStreamToFile(myfile.getInputStream(), new File(realPath, newfilename));
				} catch (IOException e) {
					System.out.println("文件[" + originalFilename + "]上传失败,堆栈轨迹如下");
					e.printStackTrace();
					out.print("1`文件上传失败，请重试！！");
					out.flush();
					return null;
				}
			}
		}
		out.print("0`" + request.getContextPath() + "/upload/" + originalFilename);
		out.flush();
		return null;
	}//把文件保存到服务器上。
	
	@RequestMapping("/sendfile")
	public ModelAndView sendfile()
	{
		HttpSession session=request.getSession(false);
		FileModel file=new FileModel();
		file.setFL_OLDNAME(originalFilename);
		file.setFL_URL("/upload/"+session.getAttribute("USER_ID").toString()+"/");
		file.setFL_SENDER(session.getAttribute("USER_ID").toString());
		file.setFL_RECEIVERNAME(request.getParameter("FL_RECEIVERNAME"));
		file.setFL_RECEIVER(request.getParameter("FL_RECEIVER"));
		file.setFL_SENDERNAME(session.getAttribute("USER_NAME").toString());
		file.setFL_DATE(request.getParameter("FL_DATE"));
		file.setFL_NAME(newfilename);
		fileservice.addfile(file);
		JavascriptChat jschat=new JavascriptChat();
		jschat.sendFile(file);
		return null;
	}//存储并发送文件信息。
	
	@RequestMapping("/filedownload")
	public ModelAndView filedownload(HttpServletRequest request,HttpServletResponse response)
	{   HttpSession session=request.getSession(false);
		String realPath = session.getServletContext().getRealPath("/");
		List<Map<String, Object>> list=fileservice.getfile(request.getParameter("FL_ID"));
		Map<String, Object> map=(Map<String, Object>)list.get(0);
		fileservice.filedownload(response,realPath+map.get("FL_URL").toString(),map.get("FL_NAME").toString(),map.get("FL_ID").toString(),map.get("FL_OLDNAME").toString());
		return null;
	}//下载文件。
	
	@RequestMapping("/getfiletoreceive")
	public @ResponseBody List<Map<String, Object>> getfiletoreceive()
	{
		HttpSession session=request.getSession(false);
		return fileservice.getfiletoreceive(session.getAttribute("USER_ID").toString());
	}//获取当前登录用户待接收的文件。
	
	@RequestMapping("/refusedownloadfile")
	public ModelAndView refusedownloadfile()
	{
		fileservice.refuse(request.getParameter("FL_ID"));
		return null;
	}//拒绝下载文件。
	
	@RequestMapping("/ignorefile")
	public ModelAndView ignorefile()
	{
		System.out.print(request.getParameter("USER_ID"));
		fileservice.refusefile(request.getParameter("USER_ID"));
		return null;
	}//忽略一个用户发来的所有文件。
}
	
