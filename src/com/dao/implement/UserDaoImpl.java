package com.dao.implement;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.UserDao;
import com.model.UserModel;

@Repository
public class UserDaoImpl implements UserDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	String columntosearch="XT_USER.USER_ID,XT_USER.ID,XT_USER.USER_NAME,XT_USER.USER_CSNY";

	@Transactional
	public String login(UserModel users) {
		String sqlstr="select * from XT_USER where USER_ID=? and USER_PWD=?";
		Object[] params = new Object[]{users.getUSER_ID(),users.getU_Pwd()};
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlstr, params);
		if (list.size()==0) {
			sqlstr="select * from XT_USER where USER_ID=?";
			params = new Object[]{users.getUSER_ID()};
			list=jdbcTemplate.queryForList(sqlstr, params);
			if (list.size()==0) {
				return "none";//用户名不存在。
			} else {
				return "passworderror";//密码错误。
			}
		} else {
			
			sqlstr="select * from TB_USERLOG where USER_ID=?";
			params = new Object[]{users.getUSER_ID()};
			if (jdbcTemplate.queryForList(sqlstr, params).size()==0) {
				sqlstr="insert into TB_USERLOG (USER_ID,LASTLOGIN,LASTCONFIRM) values (?,sysdate,sysdate)";
				params = new Object[]{users.getUSER_ID()};
				jdbcTemplate.update(sqlstr, params);
			}
			else {
				sqlstr="update TB_USERLOG set LASTLOGIN=sysdate where USER_ID=?";
				params = new Object[]{users.getUSER_ID()};
				jdbcTemplate.update(sqlstr, params);
			}
			
			sqlstr="update XT_USER set USER_ISONLINE='1' where USER_ID=?";
			params = new Object[]{users.getUSER_ID()};
			jdbcTemplate.update(sqlstr, params);
			return "success";//登陆成功。
		}
		
	}//用户登录。

	@Override
	public List<Map<String, Object>> getuser(String USER_ID) {
		String sqlString="select USER_BZ from XT_PERSON where USER_ID=?";
		Object[] params = new Object[]{USER_ID};
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlString, params);
		Map<String, Object> map=(Map<String, Object>) list.get(0);
		if (map.get("USER_BZ").toString().equals("1")) {
			sqlString="select * from XT_USER,XT_PERSON,JC_WORKTYPE_SYS where XT_USER.USER_ID=XT_PERSON.USER_ID and XT_PERSON.USER_LX=JC_WORKTYPE_SYS.ID and XT_USER.USER_ID=?";
		} else {
			sqlString="select * from XT_USER,XT_PERSON,JC_WORKTYPE_GCZX where XT_USER.USER_ID=XT_PERSON.USER_ID and XT_PERSON.USER_LX=JC_WORKTYPE_GCZX.ID and XT_USER.USER_ID=?";
		}
		
		return jdbcTemplate.queryForList(sqlString, params);
	}//提取某个用户的所有信息。

	@Override
	public List<Map<String, Object>> findAllUsers() {
		String sqlString="select * from XT_USER";
		return jdbcTemplate.queryForList(sqlString);
	}//查找所有用户。

	@Override
	public boolean deleteUsers(int USER_ID) {
		return false;
	}

	@Override
	public boolean changeU_Pwd(String USER_ID, String U_Pwd) {
		String sqlstr="update XT_USER set XT_USER.USER_PWD=? where XT_USER.USER_ID=?";
		Object[] params=new Object[]{U_Pwd,USER_ID};
		if (jdbcTemplate.update(sqlstr, params)>0) {
			return true;
		} else {
			return false;
		}
		
	}//更改密码。

	@Override
	public List<Map<String, Object>> searchusers(UserModel users) {
		String sqlString="";
		Object[] params=null;
		if (users.getUSER_BZ().equals("1")) {
			sqlString="(select XT_USER.USER_ID,XT_USER.USER_NAME from XT_USER,XT_PERSON where XT_USER.USER_ID=XT_PERSON.USER_ID and XT_USER.USER_NAME like ? and XT_PERSON.USER_GENDER like ? and XT_PERSON.USER_ZC like ? and XT_PERSON.USER_CSZY like ?) intersect (select XT_USER.USER_ID,XT_USER.USER_NAME from XT_USER,XT_PERSON,JC_WORKTYPE_SYS where XT_USER.USER_ID=XT_PERSON.USER_ID and XT_PERSON.USER_BZ='1' and XT_PERSON.USER_LX=JC_WORKTYPE_SYS.ID and JC_WORKTYPE_SYS.WT_NAME like ?)";
			params=new Object[]{'%'+users.getUSER_NAME()+'%','%'+users.getUSER_GENDER()+'%','%'+users.getJC_ZC()+'%','%'+users.getJC_ZY()+'%','%'+users.getJC_WORKTYPE_SYS()+'%'};
			return jdbcTemplate.queryForList(sqlString, params);
		} else if(users.getUSER_BZ().equals("2")){
			sqlString="(select XT_USER.USER_ID,XT_USER.USER_NAME from XT_USER,XT_PERSON where XT_USER.USER_ID=XT_PERSON.USER_ID and XT_USER.USER_NAME like ? and XT_PERSON.USER_GENDER like ? and XT_PERSON.USER_ZC like ? and XT_PERSON.USER_CSZY like ?) intersect (select XT_USER.USER_ID,XT_USER.USER_NAME from XT_USER,XT_PERSON,JC_WORKTYPE_GCZX where XT_USER.USER_ID=XT_PERSON.USER_ID and XT_PERSON.USER_BZ='2' and XT_PERSON.USER_LX=JC_WORKTYPE_GCZX.ID and JC_WORKTYPE_GCZX.WT_NAME like ?)";
			params=new Object[]{'%'+users.getUSER_NAME()+'%','%'+users.getUSER_GENDER()+'%','%'+users.getJC_ZC()+'%','%'+users.getJC_ZY()+'%','%'+users.getJC_WORKTYPE_GCZX()+'%'};
			return jdbcTemplate.queryForList(sqlString, params);
		}
		else {
			sqlString="select XT_USER.USER_ID,XT_USER.USER_NAME from XT_USER,XT_PERSON where XT_USER.USER_ID=XT_PERSON.USER_ID and XT_USER.USER_NAME like ? and XT_PERSON.USER_GENDER like ? and XT_PERSON.USER_ZC like ? and XT_PERSON.USER_CSZY like ?";
			params=new Object[]{'%'+users.getUSER_NAME()+'%','%'+users.getUSER_GENDER()+'%','%'+users.getJC_ZC()+'%','%'+users.getJC_ZY()+'%'};
			return jdbcTemplate.queryForList(sqlString, params);
		}
		
	}//按条件查找用户。

	@Override
	public void lastonline(String USER_ID) {
		String sqlString="update TB_USERLOG set LASTONLINE=sysdate where USER_ID=?";
		Object[] params = new Object[]{USER_ID};
		jdbcTemplate.update(sqlString, params);
	}//更新用户的最后在线时间。

	@Override
	public void logout(String USER_ID) {
		String sqlString="update XT_USER set USER_ISONLINE='0' where USER_ID=?";
		Object[] params = new Object[]{USER_ID};
		jdbcTemplate.update(sqlString, params);
	}//更新用户离线状态。

	@Override
	public List<Map<String, Object>> findoffline() {
		String sqlString="select * from TB_USERLOG where USER_ID in (select USER_ID from XT_USER where USER_ISONLINE='1') and LASTONLINE between to_date('2012-10-01 01:00:00','YYYY-MM-DD HH24:MI:SS') and sysdate-1/24/60";
		return jdbcTemplate.queryForList(sqlString);
	}//根据用户的最后在线时间，查找离线用户。

	@Override
	public List<Map<String, Object>> findonline() {
		String sqlString="select * from TB_USERLOG where LASTONLINE between sysdate-1/24/60 and sysdate";
		return jdbcTemplate.queryForList(sqlString);
	}//根据用户的最后在线时间，查找在线用户。

	@Override
	public void login(String USER_ID) {
		String sqlString="update XT_USER set USER_ISONLINE='1' where USER_ID=?";
		Object[] params = new Object[]{USER_ID};
		jdbcTemplate.update(sqlString, params);
	}//更新用户在线状态。

	@Override
	public void updateonlinetime(String USER_ID) {
		Long timeLong=(long) 0;
		String sqlString="select LASTLOGIN,ONLINETIME from TB_USERLOG where USER_ID=?";
		Object[] params = new Object[]{USER_ID};
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlString, params);
		Map<String, Object> map=list.get(0);
		Date lastloginDate=(Date)map.get("LASTLOGIN");
		Long onlinetimeDate=Long.parseLong(map.get("ONLINETIME").toString());

		Date now=new Date();
		timeLong=onlinetimeDate*1000+(now.getTime()-lastloginDate.getTime());

		sqlString="update TB_USERLOG set ONLINETIME=? where USER_ID=?";
		params = new Object[]{timeLong/1000-60,USER_ID};
		jdbcTemplate.update(sqlString, params);
	}//更新用户的累计在线时间。
}
