package com.dao.implement;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.FriendDao;
import com.model.FriendModel;
@Repository
public class FriendDaoImpl implements FriendDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Transactional
	public void acceptfriendapply(FriendModel friend) {
		String sqlString="select * from TB_FRIENDS where F_USER_ID=? and F_FRIENDID=?";
		Object[] params = new Object[]{friend.getF_USER_ID(),friend.getF_FRIENDID()};
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlString, params);
		if (list.size()==0) {
			//存储接受好友申请一方的好友关系。
			sqlString="insert into TB_FRIENDS (F_ID,F_USER_ID,F_FRIENDID,F_REMARK,FG_ID) values (SQ_FRIENDS.NEXTVAL,?,?,?,?)";
			params = new Object[]{friend.getF_USER_ID(),friend.getF_FRIENDID(),friend.getF_REMARK(),"1"};
			jdbcTemplate.update(sqlString, params);
			//存储发起好友申请一方的的好友关系。
			params = new Object[]{friend.getF_FRIENDID(),friend.getF_USER_ID(),"","1"};
			jdbcTemplate.update(sqlString, params);
		}
		
		
	}//用户USER_ID同意来自用户F_FriendID的好友申请。

	@Override
	public void delfriend(String USER_ID, String F_FriendID) {
		String sqlstr="delete from TB_FRIENDS where (F_USER_ID=? and F_FRIENDID=?) or (F_USER_ID=? and F_FRIENDID=?)";
		Object[] params = new Object[]{USER_ID,F_FriendID,F_FriendID,USER_ID};
		jdbcTemplate.update(sqlstr, params);
	}//删除好友。

	@Override
	public List<Map<String, Object>> searchallusers(String USER_ID) {
		String sqlstr="select * from XT_USER,XT_PERSON,XT_DWXX where XT_USER.USER_ID=XT_PERSON.USER_ID and XT_USER.USER_DWBH=XT_DWXX.DWBH and XT_USER.USER_ID<>? ORDER BY XT_DWXX.DW_MC";
		Object[] params=new Object[]{USER_ID};
		return jdbcTemplate.queryForList(sqlstr, params);
	}//查找除自己以外的所有用户,按所属实验室/工程中心分组显示。

	@Transactional
	public void movefriendgroup(FriendModel friend) {
		String sqlString="select * from TB_FRIENDGROUP where FG_ID=?";
		Object[] params=new Object[]{friend.getFG_ID()};
		if (jdbcTemplate.queryForList(sqlString, params).size()!=0) {
			sqlString="update TB_FRIENDS set FG_ID=? where F_USER_ID=? and F_FRIENDID=?";
			params = new Object[]{friend.getFG_ID(),friend.getF_USER_ID(),friend.getF_FRIENDID()};
			jdbcTemplate.update(sqlString, params);
		}
	}//移动好友分组。

	@Override
	public boolean isfriend(String USER_ID, String F_FriendID) {
		String sqlString="select * from TB_FRIENDS where F_USER_ID=? and F_FRIENDID=?";
		Object[] params = new Object[]{USER_ID,F_FriendID};
		if (jdbcTemplate.queryForList(sqlString, params).size()!=0) {
			return true;
		} else {
			return false;
		}
	}//是否已经是好友关系。

	@Override
	public List<Map<String, Object>> displayfriendlist(String USER_ID) {
		String sqlString="select XT_USER.USER_ID,XT_USER.USER_NAME,XT_USER.USER_ISONLINE,TB_FRIENDGROUP.FG_ID,TB_FRIENDGROUP.FG_NAME,TB_FRIENDS.F_REMARK from XT_USER,TB_FRIENDS,TB_FRIENDGROUP where TB_FRIENDS.F_USER_ID=? and TB_FRIENDS.FG_ID=TB_FRIENDGROUP.FG_ID and TB_FRIENDS.F_FRIENDID=XT_USER.USER_ID ORDER BY TB_FRIENDGROUP.FG_ID ASC,XT_USER.USER_ISONLINE DESC";
		Object[] params = new Object[]{USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//显示好友列表。

	@Transactional
	public String createfriendgroup(String FG_NAME, String FG_USER_ID) {
		String FG_ID="";
		String sqlString="select SQ_FRIENDGROUP.NEXTVAL from dual";
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlString);
		Map<String, Object> map=list.get(0);
		
		FG_ID=map.get("NEXTVAL").toString();
		sqlString="insert into TB_FRIENDGROUP (FG_ID,FG_NAME,FG_USER_ID) values (?,?,?)";
		Object[] params = new Object[]{FG_ID,FG_NAME,FG_USER_ID};
		jdbcTemplate.update(sqlString, params);
		return FG_ID;
	}//创建好友分组。

	@Override
	public void editremark(FriendModel friend) {
		String sqlString="update TB_FRIENDS set F_REMARK=? where F_USER_ID=? and F_FRIENDID=?";
		Object[] params = new Object[]{friend.getF_REMARK(),friend.getF_USER_ID(),friend.getF_FRIENDID()};
		jdbcTemplate.update(sqlString, params);
	}//修改备注。

	@Transactional
	public void deletefriendgroup(String FG_ID) {
		String sqlString="update TB_FRIENDS set FG_ID=? where FG_ID=?";
		Object[] params = new Object[]{"1",FG_ID};
		jdbcTemplate.update(sqlString, params);
		sqlString="delete from TB_FRIENDGROUP where FG_ID=?";
		params = new Object[]{FG_ID};
		jdbcTemplate.update(sqlString, params);
	}//删除好友分组。

	@Override
	public void updatefriendgroupname(String FG_ID, String FG_NAME) {
		String sqlString="update TB_FRIENDGROUP set FG_NAME=? where FG_ID=?";
		Object[] params = new Object[]{FG_NAME,FG_ID};
		jdbcTemplate.update(sqlString, params);
	}//修改好友分组名称。

	@Override
	public List<Map<String, Object>> displayfriendgroup(String USER_ID) {
		String sqlString="select * from TB_FRIENDGROUP where FG_USER_ID=? order by FG_NAME";
		Object[] params = new Object[]{USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//显示好友分组。

	@Override
	public List<Map<String, Object>> displayrecentfriend(String USER_ID) {
		String sqlString="select * from (select XT_USER.USER_ID,XT_USER.USER_NAME,XT_USER.USER_ISONLINE,TB_FRIENDGROUP.FG_ID,TB_FRIENDGROUP.FG_NAME,TB_FRIENDS.F_REMARK from XT_USER,TB_FRIENDS,TB_FRIENDGROUP where TB_FRIENDS.F_USER_ID=? and TB_FRIENDS.FG_ID=TB_FRIENDGROUP.FG_ID and TB_FRIENDS.F_FRIENDID=XT_USER.USER_ID ORDER BY TB_FRIENDGROUP.FG_ID ASC,XT_USER.USER_ISONLINE DESC) where (USER_ID in (select MSG_SENDER from (select * from (select * from (select MSG_SENDER,MSG_RECEIVER,max(MSG_DATE) from TB_MESSAGE where MSG_ISGROUPMSG='0' and (MSG_SENDER=? or MSG_RECEIVER=?) group by MSG_SENDER,MSG_RECEIVER) order by \"MAX(MSG_DATE)\" desc) where rownum<=10)) or USER_ID in (select MSG_RECEIVER from (select * from (select * from (select MSG_SENDER,MSG_RECEIVER,max(MSG_DATE) from TB_MESSAGE where MSG_ISGROUPMSG='0' and (MSG_SENDER=? or MSG_RECEIVER=?) group by MSG_SENDER,MSG_RECEIVER) order by \"MAX(MSG_DATE)\" desc) where rownum<=10))) and USER_ID!=?";
		Object[] params = new Object[]{USER_ID,USER_ID,USER_ID,USER_ID,USER_ID,USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//显示最近联系好友。

	@Override
	public List<Map<String, Object>> displayfriendlist(String USER_ID,
			String FG_ID) {
		String sqlString="select XT_USER.USER_ID,XT_USER.USER_NAME,XT_USER.USER_ISONLINE,TB_FRIENDGROUP.FG_ID,TB_FRIENDGROUP.FG_NAME,TB_FRIENDS.F_REMARK from XT_USER,TB_FRIENDS,TB_FRIENDGROUP where TB_FRIENDS.F_USER_ID=? and TB_FRIENDS.FG_ID=TB_FRIENDGROUP.FG_ID and TB_FRIENDGROUP.FG_ID=? and TB_FRIENDS.F_FRIENDID=XT_USER.USER_ID ORDER BY TB_FRIENDGROUP.FG_ID ASC,XT_USER.USER_ISONLINE DESC";
		Object[] params = new Object[]{USER_ID,FG_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取一个分组下的好友。

}
