package com.service.implement;

import java.io.File;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.FileDao;
import com.model.FileModel;
import com.service.FileService;

@Service
public class FileServiceImpl implements FileService {
	@Autowired
	private FileDao filedao;

	@Override
	public String addfile(FileModel file) {
		return filedao.addfile(file);
	}//添加文件信息到数据库。

	@Override
	public void delfile(String FL_ID) {
		filedao.delfile(FL_ID);
	}//从数据库删除文件信息。

	@Override
	public List<Map<String, Object>> getfile(String FL_ID) {
		return filedao.getfile(FL_ID);
	}//获取文件信息。

	@Override
	public void deloldfiles() {
		List<Map<String, Object>> list=filedao.getoldfile();
		if (list.size()>0) {
			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map=(Map<String, Object>)list.get(i);
				if (deleteFile(System.getProperty("user.dir")+"/webapps/WebContent"+map.get("FL_URL").toString()+map.get("FL_NAME").toString())==true) {
					filedao.delfile(map.get("FL_ID").toString());
				} else {
					
				}
			}
		}
	}//删除旧文件。
	
    /**
     * 删除单个文件
     * @param   sPath    被删除文件的文件名
     * @return 单个文件删除成功返回true，否则返回false
     */
    public boolean deleteFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
            System.out.print("删除成功。。。。。。。。。。。。。。。。。。。");
        }
        else {
        	System.out.print("文件不存在。。。。。。。。。。。。。。。。。。。。");
        }
        return flag;
    }

	@Override
	public void filedownload(HttpServletResponse response,String fileurl,String filename,String FL_ID,String fn) {
		System.out.print("下载文件。。。。。。。。。。。。。。。。。。。。");
		System.out.print("文件名："+fn);
		File file = new File(fileurl+filename);
		
		try {
			InputStream input = FileUtils.openInputStream(file);
			response.reset();
			response.setBufferSize(5*1024*1024);
			response.setHeader("Content-Disposition", "attachment; filename=\""+new String(fn.getBytes("gb2312"),"ISO8859-1")+"\"");
			response.addHeader("Content-Length", "" + file.length());
			response.setContentType("application/octet-stream; charset=UTF-8");
			ServletOutputStream out = response.getOutputStream();
			int readLength = 0;
			byte[] readUnit=new byte[1024*1024];
			while ((readLength = input.read(readUnit))!=-1)
			{
				out.write(readUnit,0, readLength);
				out.flush();
			}
			input.close();
			out.close();
			downloadsuccess(FL_ID);
		} catch (Exception e) {
			System.out.println(e.toString());
			for (int i = 0; i < e.getStackTrace().length; i++) {
				System.out.println(e.getStackTrace()[i]);
			}
		}
		
	}//从服务器下载文件。

	@Override
	public void downloadsuccess(String FL_ID) {
		filedao.downloadsuccess(FL_ID);
	}//成功下载文件。

	@Override
	public List<Map<String, Object>> getfiletoreceive(String USER_ID) {
		return filedao.getfiletoreceive(USER_ID);
	}//获取该用户的未接收文件。

	@Override
	public void refuse(String FL_ID) {
		filedao.refuse(FL_ID);
	}//拒绝下载文件。

	@Override
	public void refusefile(String USER_ID) {
		filedao.refusefile(USER_ID);
	}//拒绝下载一个用户发来的所有文件。

	@Override
	public List<Map<String, Object>> getallfile(String USER_ID) {
		return filedao.getallfile(USER_ID);
	}//获取该用户的所有文件信息。

}
