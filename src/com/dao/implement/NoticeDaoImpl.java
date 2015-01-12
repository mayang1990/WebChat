package com.dao.implement;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.NoticeDao;
import com.model.NoticeModel;

@Repository
public class NoticeDaoImpl implements NoticeDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Transactional
	public String addnotice(NoticeModel notice) {
		String sqlString="";
		//防止重复发送通知。
		if (notice.getNT_TYPE().equals("friendapply")) {
			sqlString="select * from TB_NOTICE where NT_STATUS='0' and NT_TYPE='friendapply' and NT_SENDER='"+notice.getNT_SENDER()+"' and NT_RECEIVER='"+notice.getNT_RECEIVER()+"'";
		}
		else if (notice.getNT_TYPE().equals("groupinvite")) {
			sqlString="select * from TB_NOTICE where NT_STATUS='0' and NT_TYPE='groupinvite' and NT_SENDER='"+notice.getNT_SENDER()+"' and NT_RECEIVER='"+notice.getNT_RECEIVER()+"' and NT_G_ID='"+notice.getNT_G_ID()+"'";
		}
		else if (notice.getNT_TYPE().equals("groupapply")) {
			sqlString="select * from TB_NOTICE where NT_STATUS='0' and NT_TYPE='groupapply' and NT_SENDER='"+notice.getNT_SENDER()+"' and NT_RECEIVER='"+notice.getNT_RECEIVER()+"' and NT_G_ID='"+notice.getNT_G_ID()+"'";
		}
		if (jdbcTemplate.queryForList(sqlString).size()==0) {
			List<Map<String, Object>> list=jdbcTemplate.queryForList("select SQ_NOTICE.NEXTVAL from dual");
			Map<String, Object> map=list.get(0);
			notice.setNT_ID(map.get("NEXTVAL").toString());
			sqlString="insert into TB_NOTICE (NT_ID,NT_SENDER,NT_RECEIVER,NT_SENDERNAME,NT_RECEIVERNAME,NT_G_ID,NT_G_NAME,NT_VERIFY,NT_DATE,NT_TYPE,NT_STATUS) values (?,?,?,?,?,?,?,?,sysdate,?,?)";
			Object[] params = new Object[]{notice.getNT_ID(),notice.getNT_SENDER(),notice.getNT_RECEIVER(),notice.getNT_SENDERNAME(),notice.getNT_RECEIVERNAME(),notice.getNT_G_ID(),notice.getNT_G_NAME(),notice.getNT_VERIFY(),notice.getNT_TYPE(),notice.getNT_STATUS()};
			jdbcTemplate.update(sqlString, params);
		}
		return notice.getNT_ID();
	}//添加一条通知。

	@Override
	public void delnotice(String NT_ID) {
		String sqlString="delete from TB_NOTICE where NT_ID=?";
		Object[] params = new Object[]{NT_ID};
		jdbcTemplate.update(sqlString, params);
	}//删除一条通知。

	@Override
	public List<Map<String, Object>> getnotice(String USER_ID) {
		String sqlString="select * from TB_NOTICE where NT_RECEIVER=? and NT_STATUS=?";
		Object[] params = new Object[]{USER_ID,"0"};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取该用户的未读通知.

	@Override
	public void updatestatus(String NT_ID) {
		String sqlString="update TB_NOTICE set NT_STATUS=? where NT_ID=?";
		Object[] params = new Object[]{"1",NT_ID};
		jdbcTemplate.update(sqlString, params);
	}//设置通知的的状态为已读。

	@Override
	public List<Map<String, Object>> getallnotice(String USER_ID) {
		String sqlString="select * from TB_NOTICE where NT_RECEIVER=? order by NT_DATE desc";
		Object[] params = new Object[]{USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取该用户的所有通知。

	@Override
	public List<Map<String, Object>> getoldnotice() {
		String sqlString="select * from TB_NOTICE where NT_DATE between to_date('2012-10-01 01:00:00','YYYY-MM-DD HH24:MI:SS') and sysdate-30";
		return jdbcTemplate.queryForList(sqlString);
	}//获取30天前的通知。

}
