package com.service.implement;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dao.NoticeDao;
import com.model.NoticeModel;
import com.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private NoticeDao noticedao;

	@Override
	public String addnotice(NoticeModel notice) {
		return noticedao.addnotice(notice);
	}//添加一条通知。

	@Override
	public void delnotice(String NT_ID) {
		noticedao.delnotice(NT_ID);
	}//删除一条通知。

	@Override
	public List<Map<String, Object>> getnotice(String USER_ID) {
		return noticedao.getnotice(USER_ID);
	}//获取该用户的未读通知.

	@Override
	public void updatestatus(String NT_ID) {
		noticedao.updatestatus(NT_ID);
	}//设置通知的的状态为已读。

	@Override
	public List<Map<String, Object>> getallnotice(String USER_ID) {
		return noticedao.getallnotice(USER_ID);
	}//获取该用户的所有通知。

	@Override
	public void deleteoldnotice() {
		List<Map<String, Object>> list=noticedao.getoldnotice();
		if (list.size()>0) {
			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map=list.get(i);
				noticedao.delnotice(map.get("NT_ID").toString());
			}
			System.out.println("删除通知。"+Integer.toString(list.size()));
		}
	}//删除30天前的通知。

}
