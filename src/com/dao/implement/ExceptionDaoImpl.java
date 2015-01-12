package com.dao.implement;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.ExceptionDao;

@Repository
public class ExceptionDaoImpl implements ExceptionDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Transactional
	public void addexception(String EL_hashCode,String EL_Type,String EL_StackTrace) {
		String EL_ID="";
		String sqlstr="";
		/*List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlstr);
		Map<String, Object> map=(Map<String, Object>) list.get(0);
		if (map.get("max(EL_ID)")==null) {
			EL_ID="1";
		} else {
			int key=Integer.parseInt(map.get("max(EL_ID)").toString())+1;
			EL_ID=Integer.toString(key);
		}*/
		EL_ID=UUID.randomUUID().toString();
		sqlstr="insert into tb_ExceptionLog (EL_ID,EL_hashCode,EL_Type,EL_Date,EL_StackTrace) values (?,?,?,sysdate,?)";
		Object[] params = new Object[]{EL_ID,EL_hashCode,EL_Type,EL_StackTrace};
		jdbcTemplate.update(sqlstr, params);

	}//添加一条异常信息。

	@Override
	public List<Map<String, Object>> displayexception() {
		String sqlstr="select DISTINCT EL_Type,EL_Date,EL_hashCode from tb_ExceptionLog ORDER BY EL_Date DESC";
		return jdbcTemplate.queryForList(sqlstr);
	}//显示所有异常信息。

	@Override
	public List<Map<String, Object>> stacktrace(String EL_hashCode) {
		String sqlstr="select EL_StackTrace from tb_ExceptionLog where EL_hashCode=?";
		Object[] params = new Object[]{EL_hashCode};
		return jdbcTemplate.queryForList(sqlstr,params);
	}//堆栈跟踪。

}
