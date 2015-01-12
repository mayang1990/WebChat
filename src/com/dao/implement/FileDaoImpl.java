package com.dao.implement;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dao.FileDao;
import com.model.FileModel;

@Repository
public class FileDaoImpl implements FileDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Transactional
	public String addfile(FileModel file) {
		String sqlString="select SQ_FILE.NEXTVAL from dual";
		List<Map<String, Object>> list=jdbcTemplate.queryForList(sqlString);
		Map<String, Object> map=list.get(0);
		file.setFL_ID(map.get("NEXTVAL").toString());
		sqlString="insert into TB_FILE (FL_ID,FL_NAME,FL_URL,FL_DATE,FL_SENDER,FL_RECEIVER,FL_STATUS,FL_SENDERNAME,FL_RECEIVERNAME,FL_OLDNAME) values (?,?,?,to_date(?,'YYYY-MM-DD HH24:MI:SS'),?,?,'0',?,?,?)";
		Object[] params = new Object[]{file.getFL_ID(),file.getFL_NAME(),file.getFL_URL(),file.getFL_DATE(),file.getFL_SENDER(),file.getFL_RECEIVER(),file.getFL_SENDERNAME(),file.getFL_RECEIVERNAME(),file.getFL_OLDNAME()};
		jdbcTemplate.update(sqlString, params);
		return file.getFL_ID();
	}//添加文件信息到数据库。

	@Override
	public void delfile(String FL_ID) {
		String sqlString="delete from TB_FILE where FL_ID=?";
		Object[] params = new Object[]{FL_ID};
		jdbcTemplate.update(sqlString, params);
	}//从数据库删除文件信息。

	@Override
	public List<Map<String, Object>> getfile(String FL_ID) {
		String sqlString="select * from TB_FILE where FL_ID=?";
		Object[] params = new Object[]{FL_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取文件信息。

	@Override
	public List<Map<String, Object>> getoldfile() {
		String sqlString="select * from TB_FILE where FL_DATE between to_date('2012-10-01 01:00:00','YYYY-MM-DD HH24:MI:SS') and sysdate-7";
		return jdbcTemplate.queryForList(sqlString);
	}//获取N天前的文件信息。

	@Override
	public void downloadsuccess(String FL_ID) {
		String sqlString="update TB_FILE set FL_STATUS=? where FL_ID=?";
		Object[] params = new Object[]{"1",FL_ID};
		jdbcTemplate.update(sqlString, params);
	}//成功下载文件。

	@Override
	public void refuse(String FL_ID) {
		String sqlString="update TB_FILE set FL_STATUS=? where FL_ID=?";
		Object[] params = new Object[]{"2",FL_ID};
		jdbcTemplate.update(sqlString, params);
	}//拒绝下载文件。

	@Override
	public List<Map<String, Object>> getfiletoreceive(String USER_ID) {
		String sqlString="select * from TB_FILE where FL_STATUS=? and FL_RECEIVER=?";
		Object[] params = new Object[]{"0",USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取该用户的未接收文件。

	@Override
	public void refusefile(String USER_ID) {
		String sqlString="update TB_FILE set FL_STATUS=? where FL_SENDER=?";
		Object[] params = new Object[]{"2",USER_ID};
		jdbcTemplate.update(sqlString, params);
	}//拒绝下载一个用户发来的所有文件。

	@Override
	public List<Map<String, Object>> getallfile(String USER_ID) {
		String sqlString="select * from TB_FILE where FL_SENDER=? or FL_RECEIVER=? order by FL_DATE desc";
		Object[] params = new Object[]{USER_ID,USER_ID};
		return jdbcTemplate.queryForList(sqlString, params);
	}//获取该用户的所有文件信息。

}
