package com.dao;

import java.util.List;
import java.util.Map;

import com.model.FileModel;

public interface FileDao {
	public void delfile(String FL_ID);//从数据库删除文件信息。
	public void downloadsuccess(String FL_ID);//成功下载文件。
	public void refuse(String FL_ID);//拒绝下载文件。
	public void refusefile(String USER_ID);//拒绝下载一个用户发来的所有文件。
	public String addfile(FileModel file);//添加文件信息到数据库。
	public List<Map<String, Object>> getfile(String FL_ID);//获取文件信息。
	public List<Map<String, Object>> getoldfile();//获取N天前的文件信息。
	public List<Map<String, Object>> getfiletoreceive(String USER_ID);//获取该用户的未接收文件。
	public List<Map<String, Object>> getallfile(String USER_ID);//获取该用户的所有文件信息。
}
