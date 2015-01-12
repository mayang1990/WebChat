package com.dao.implement;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.GroupDao;
import com.model.GroupMemberModel;
import com.model.GroupModel;
@Repository
public class GroupDaoImpl implements GroupDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	String usercol="XT_USER.USER_ID,XT_PERSON.ID,XT_PERSON.Inf_Nickname,XT_PERSON.Inf_Truename,XT_PERSON.Inf_Birthday,XT_PERSON.Inf_ID";//用户表列名。

	@Transactional
	public void delgroup(String G_ID) {
		String sqlstr="delete from TB_GROUPMEMBER where GM_G_ID=?";
		Object[] params = new Object[]{G_ID};
		jdbcTemplate.update(sqlstr, params);
		
		sqlstr="delete from TB_GROUP where G_ID=?";
		jdbcTemplate.update(sqlstr, params);
	}//删除群。

	@Override
	public void delmember(String G_ID,String USER_ID) {
		String sqlstr="delete from TB_GROUPMEMBER where GM_G_ID=? and GM_USER_ID=?";
		Object[] params = new Object[]{G_ID,USER_ID};
		jdbcTemplate.update(sqlstr, params);
	}//删除成员。

	@Override
	public List<Map<String, Object>> getgroup(String G_ID) {
		String sqlstr="select * from TB_GROUP,TB_GROUPMEMBER where TB_GROUP.G_ID=TB_GROUPMEMBER.GM_G_ID and TB_GROUP.G_ID=?";
		Object[] params = new Object[]{G_ID};
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlstr, params);
		if (list.size()==0) {
			return null;
		} else {
			return list;
		}
	}//获得一个群的所有信息。

	@Override
	public List<Map<String, Object>> displayalluser(String USER_ID,String G_ID) {
		String sqlstr="(select "+usercol+" from XT_USER,XT_PERSON where XT_PERSON.USER_ID=XT_USER.USER_ID and XT_USER.USER_ID<>?) EXCEPT (select "+usercol+" from XT_USER,XT_PERSON,TB_RELATIONOFUSERANDGROUP where XT_PERSON.USER_ID=XT_USER.USER_ID and TB_RELATIONOFUSERANDGROUP.RLUG_USER_ID=XT_USER.USER_ID and TB_RELATIONOFUSERANDGROUP.RLUG_G_ID=?)";
		Object[] params = new Object[]{USER_ID,G_ID};
		return jdbcTemplate.queryForList(sqlstr, params);
	}//查找除当前群之外的所有用户，用于原有群邀请用户。

	@Override
	public List<Map<String, Object>> displaygroup(String USER_ID) {
		String sqlstr="select * from TB_GROUP,TB_GROUPMEMBER where TB_GROUP.G_ID=TB_GROUPMEMBER.GM_G_ID and TB_GROUPMEMBER.GM_USER_ID=? ORDER BY G_NAME";
		Object[] params = new Object[]{USER_ID};
		return jdbcTemplate.queryForList(sqlstr, params);
	}//显示该用户的所有群。

	@Override
	public List<Map<String, Object>> displayuser(String G_ID) {
		String sqlstr="select * from TB_GROUP,TB_GROUPMEMBER where TB_GROUP.G_ID=TB_GROUPMEMBER.GM_G_ID and TB_GROUP.G_ID=? ORDER BY GM_ROLE DESC,GM_USER_NAME";
		Object[] params = new Object[]{G_ID};
		return jdbcTemplate.queryForList(sqlstr, params);
	}//显示群中的所有用户。

	@Transactional
	public String creategroup(GroupModel group) {
		//创建群。
		String sqlString="select SQ_GROUP.NEXTVAL from dual";
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlString);
		Map<String, Object> map=list.get(0);
		
		group.setG_ID(map.get("NEXTVAL").toString());
		sqlString="insert into TB_GROUP (G_NAME,G_TYPE,G_ID,G_CDATE,G_CREATERID,G_CREATERNAME,G_LY) values (?,?,?,sysdate,?,?,?)";
		Object[] params=new Object[]{group.getG_NAME(),group.getG_TYPE(),group.getG_ID(),group.getG_CREATERID(),group.getG_CREATERNAME(),group.getG_LY()};
		jdbcTemplate.update(sqlString, params);
		//为群添加第一个成员。
		sqlString="insert into TB_GROUPMEMBER (GM_USER_ID,GM_ROLE,GM_G_ID,GM_ID,GM_USER_NAME) values (?,?,?,SQ_GROUPMEMBER.NEXTVAL,?)";
		params=new Object[]{group.getG_CREATERID(),"1",group.getG_ID(),group.getG_CREATERNAME()};
		jdbcTemplate.update(sqlString, params);
		return group.getG_ID();
	}//创建群。

	@Transactional
	public void addmember(GroupMemberModel groupmember) {
		String sqlString="select * from TB_GROUPMEMBER where GM_USER_ID=? and GM_G_ID=?";
		Object[] params=new Object[]{groupmember.getGM_USER_ID(),groupmember.getGM_G_ID()};
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlString, params);
		if (list.size()==0) {
			sqlString="insert into TB_GROUPMEMBER (GM_USER_ID,GM_ROLE,GM_G_ID,GM_ID,GM_USER_NAME) values (?,?,?,SQ_GROUPMEMBER.NEXTVAL,?)";
			params=new Object[]{groupmember.getGM_USER_ID(),groupmember.getGM_ROLE(),groupmember.getGM_G_ID(),groupmember.getGM_USER_NAME()};
			jdbcTemplate.update(sqlString, params);
		}
	}//添加群成员。

	@Override
	public List<Map<String, Object>> getgroupmember(GroupMemberModel groupmember) {
		String sqlString="select * from TB_GROUPMEMBER where GM_USER_ID=? and GM_G_ID=? ORDER BY GM_USER_NAME";
		Object[] params=new Object[]{groupmember.getGM_USER_ID(),groupmember.getGM_G_ID()};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取群成员信息。

	@Override
	public List<Map<String, Object>> searchgroup(GroupModel group) {
		String[] G_TYPE=group.getG_TYPE().split(",");
		String sqlString="(select * from TB_GROUP where G_NAME like '%"+group.getG_NAME()+"%' and G_LY like '%"+group.getG_LY()+"%')";
		for (int i = 0; i < G_TYPE.length; i++) {
			sqlString=sqlString+" INTERSECT (select * from TB_GROUP where G_TYPE like '%"+G_TYPE[i]+"%')";
		}
		return jdbcTemplate.queryForList(sqlString);
	}//搜索群。

	@Override
	public List<Map<String, Object>> displayrecentgroup(String USER_ID) {
		String sqlString="select * from (select * from (select MSG_G_ID,MSG_G_NAME,max(MSG_DATE) from TB_MESSAGE where MSG_ISGROUPMSG='1' and (MSG_SENDER=? or MSG_G_ID in (select GM_G_ID from TB_GROUPMEMBER where GM_USER_ID=?)) group by MSG_G_ID,MSG_G_NAME) order by \"MAX(MSG_DATE)\" desc) where rownum<=10";
		Object[] params=new Object[]{USER_ID,USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//显示最近联系群。

	@Override
	public List<Map<String, Object>> getfriendtoinvite(String USER_ID,
			String G_ID) {
		String sqlString="select XT_USER.USER_ID,XT_USER.USER_NAME,XT_USER.USER_ISONLINE,TB_FRIENDGROUP.FG_ID,TB_FRIENDGROUP.FG_NAME,TB_FRIENDS.F_REMARK from XT_USER,TB_FRIENDS,TB_FRIENDGROUP where TB_FRIENDS.F_USER_ID=? and TB_FRIENDS.F_FRIENDID not in (select GM_USER_ID from TB_GROUPMEMBER where GM_G_ID=?) and TB_FRIENDS.FG_ID=TB_FRIENDGROUP.FG_ID and TB_FRIENDS.F_FRIENDID=XT_USER.USER_ID ORDER BY TB_FRIENDGROUP.FG_ID ASC,XT_USER.USER_ISONLINE DESC";
		Object[] params=new Object[]{USER_ID,G_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取不在群中的好友，用于邀请好友加入群。

	@Transactional
	public void editgroup(GroupModel group) {
		String sqlString="update TB_GROUP set G_NAME=?,G_TYPE=?,G_LY=? where G_ID=?";
		Object[] params=new Object[]{group.getG_NAME(),group.getG_TYPE(),group.getG_LY(),group.getG_ID()};
		jdbcTemplate.update(sqlString, params);
		sqlString="update TB_MESSAGE set MSG_G_NAME=? where MSG_G_ID=?";
		params=new Object[]{group.getG_NAME(),group.getG_ID()};
		jdbcTemplate.update(sqlString, params);
	}//编辑群信息。

}
