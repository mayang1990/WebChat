package com.dao.implement;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.MessageDao;
import com.model.MessageModel;

@Repository
public class MessageDaoImpl implements MessageDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	static List<Map<String, Object>> list=null;
	
	@Transactional
	public void addmessage(MessageModel messagemodel) {
		String sqlString="";
		Object[] params=null;
		sqlString="insert into TB_MESSAGE nologging (MSG_ID,MSG_CONTENT,MSG_SENDER,MSG_RECEIVER,MSG_ISGROUPMSG,MSG_G_ID,MSG_DATE,MSG_SENDERNAME,MSG_RECEIVERNAME,MSG_G_NAME) values (SQ_MESSAGE.NEXTVAL,?,?,?,?,?,sysdate,?,?,?)";
		params = new Object[]{messagemodel.getMSG_CONTENT(),messagemodel.getMSG_SENDER(),messagemodel.getMSG_RECEIVER(),messagemodel.getMSG_ISGROUPMSG(),messagemodel.getMSG_G_ID(),messagemodel.getMSG_SENDERNAME(),messagemodel.getMSG_RECEIVERNAME(),messagemodel.getMSG_G_NAME()};
		jdbcTemplate.update(sqlString, params);
	}//向数据库存入一条未发送信息。

	@Override
	public void confirmmessage(String USER_ID) {
		String sqlsString="update TB_USERLOG set LASTCONFIRM=sysdate where USER_ID=?";
		Object[] params = new Object[]{USER_ID};
		jdbcTemplate.update(sqlsString, params);
	}//更新最后收到消息的时间。

	@Override
	public List<Map<String, Object>> getmessagetoreceive(String USER_ID) {
		String sqlString="select * from TB_MESSAGE where (MSG_RECEIVER=? and MSG_DATE between (select LASTCONFIRM from TB_USERLOG where USER_ID=?) and sysdate and MSG_DATE!=(select LASTCONFIRM from TB_USERLOG where USER_ID=?)) or (MSG_G_ID in (select GM_G_ID from TB_GROUPMEMBER where GM_USER_ID=?) and MSG_DATE between (select LASTCONFIRM from TB_USERLOG where USER_ID=?) and sysdate and MSG_DATE!=(select LASTCONFIRM from TB_USERLOG where USER_ID=?) and MSG_SENDER!=?) ORDER BY MSG_DATE ASC";
		Object[] params = new Object[]{USER_ID,USER_ID,USER_ID,USER_ID,USER_ID,USER_ID,USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取该用户待接收的聊天信息。

	@Override
	public List<Map<String, Object>> getallmessage(String USER_ID) {
		String sqlString="select * from TB_MESSAGE where MSG_SENDER=? or MSG_RECEIVER=? ORDER BY MSG_DATE DESC";
		Object[] params = new Object[]{USER_ID,USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取该用户的所有聊天信息。

	@Override
	public List<Map<String, Object>> getoldmessage() {
		String sqlString="select * from TB_MESSAGE where MSG_DATE between to_date('2012-10-01 01:00:00','YYYY-MM-DD HH24:MI:SS') and sysdate-30";
		return jdbcTemplate.queryForList(sqlString);
	}//获取30天前的聊天消息。

	@Override
	public void deletemessage(String MSG_ID) {
		String sqlString="delete from TB_MESSAGE where MSG_ID=?";
		Object[] params = new Object[]{MSG_ID};
		jdbcTemplate.update(sqlString, params);
	}//删除一条聊天消息。

	@Override
	public List<Map<String, Object>> getrecentmessage(String USER_ID,String FRIEND_ID) {
		String sqlString="select * from TB_MESSAGE where MSG_ISGROUPMSG='0' and ((MSG_SENDER=? and MSG_RECEIVER=?) or (MSG_RECEIVER=? and MSG_SENDER=?)) order by MSG_DATE";
		Object[] params = new Object[]{USER_ID,FRIEND_ID,USER_ID,FRIEND_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取最近30天的一对一聊天消息。

	@Override
	public List<Map<String, Object>> getrecentgroupmessage(String G_ID) {
		String sqlString="select * from TB_MESSAGE where MSG_ISGROUPMSG='1' and MSG_G_ID=? order by MSG_DATE";
		Object[] params = new Object[]{G_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取最近30天的群聊天消息。

	@Override
	public List<Map<String, Object>> gettextfilter() {
		if (list==null) {
			String sqlString="select TF_TEXT from TB_TEXTFILTER";
			list=jdbcTemplate.queryForList(sqlString);
		}
		return list;
	}//获取消息文本过滤器。
}
