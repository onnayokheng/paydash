'use strict';

exports.blockPerformance = function(BLOCK_CODE) {
    return "SELECT state_code,state_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM state_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.state_code in (SELECT b.state_code FROM blocks b WHERE b.block_code ='" + BLOCK_CODE + "') ORDER BY date ASC;" +
        "SELECT district_code,district_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM district_delays_duration a WHERE a.gender = 'both' AND a.bank_type = 'all' AND a.date_type = 'processed_date' AND a.total_transactions > 0 AND a.district_code in (SELECT b.district_code FROM blocks b WHERE b.block_code ='" + BLOCK_CODE + "') ORDER BY date ASC;" +
        "SELECT block_code,block_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM block_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND block_code ='" + BLOCK_CODE + "' ORDER BY date ASC;";

};

exports.panchayatPerformance = function(BLOCK_CODE) {
    return "SELECT block_name FROM blocks WHERE block_code = '" + BLOCK_CODE + "';" +
    	"SELECT panchayat_code,panchayat_name,total_transactions tot_trn,date,ROUND(mrc_mre_mean,2) mrc_mre,ROUND(mre_wlg_mean,2) mre_wlg,ROUND(wlg_wls_mean,2) wlg_wls,ROUND(wls_fto_mean,2) wls_fto,ROUND(fto_firstsign_mean,2) fto_sn1,ROUND(firstsign_secondsign_mean,2) sn1_sn2,ROUND(secondsign_processed_mean,2) sn2_prc FROM panchayat_delays_duration WHERE gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions > 0 AND panchayat_code <> '0000000000' AND block_code ='" + BLOCK_CODE + "' ORDER BY panchayat_code ASC, date ASC;" +
        "SELECT staff_id, name, task_assign, mobile_no, map_location, mapped_panchayat_name FROM employees WHERE task_assign IN ('TA','GRS') AND block_code = '" + BLOCK_CODE + "';" + 
        "SELECT a.panchayat_code, b.task_assign FROM (SELECT DISTINCT panchayat_code FROM panchayat_delays_duration WHERE block_code = '" + BLOCK_CODE + "' AND panchayat_code <> '0000000000' AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date') a LEFT JOIN (SELECT map_location, task_assign FROM employees WHERE block_code = '" + BLOCK_CODE + "' AND task_assign = 'TA') b ON a.panchayat_code = b.map_location;" +
        "SELECT a.panchayat_code, b.task_assign FROM (SELECT DISTINCT panchayat_code FROM panchayat_delays_duration WHERE block_code = '" + BLOCK_CODE + "' AND panchayat_code <> '0000000000' AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date') a LEFT JOIN (SELECT map_location, task_assign FROM employees WHERE block_code = '" + BLOCK_CODE + "' AND task_assign = 'GRS') b ON a.panchayat_code = b.map_location;" +
        "SELECT b.staff_id AS staff_id, ROUND(SUM(a.mrc_mre_mean * a.total_transactions) / SUM(a.total_transactions),0) AS step1_avg, SUM(total_transactions) as total_transactions FROM (SELECT panchayat_code, mrc_mre_mean, total_transactions FROM panchayat_delays_duration WHERE block_code = '" + BLOCK_CODE + "' AND panchayat_code <> '0000000000' AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions>0 AND date > sysdate()-30) a RIGHT JOIN (SELECT staff_id, map_location FROM employees WHERE task_assign='TA' AND block_code = '" + BLOCK_CODE + "') b ON a.panchayat_code = b.map_location GROUP BY staff_id;" +
        "SELECT b.staff_id AS staff_id, ROUND(SUM(a.mrc_mre_mean * a.total_transactions) / SUM(a.total_transactions),0) AS step1_avg, SUM(total_transactions) as total_transactions FROM (SELECT panchayat_code, mrc_mre_mean, total_transactions FROM panchayat_delays_duration WHERE block_code = '" + BLOCK_CODE + "' AND panchayat_code <> '0000000000' AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions>0 AND date > sysdate()-30) a RIGHT JOIN (SELECT staff_id, map_location FROM employees WHERE task_assign='GRS' AND block_code = '" + BLOCK_CODE + "') b ON a.panchayat_code = b.map_location GROUP BY staff_id;" +
        "SELECT b.staff_id AS staff_id, ROUND(SUM(a.mrc_mre_mean * a.total_transactions) / SUM(a.total_transactions),0) AS step1_avg, SUM(total_transactions) as total_transactions FROM (SELECT panchayat_code, mrc_mre_mean, total_transactions FROM panchayat_delays_duration WHERE block_code = '" + BLOCK_CODE + "' AND panchayat_code <> '0000000000' AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions>0 AND date > sysdate()-60) a RIGHT JOIN (SELECT staff_id, map_location FROM employees WHERE task_assign='TA' AND block_code = '" + BLOCK_CODE + "') b ON a.panchayat_code = b.map_location GROUP BY staff_id;" +
        "SELECT b.staff_id AS staff_id, ROUND(SUM(a.mrc_mre_mean * a.total_transactions) / SUM(a.total_transactions),0) AS step1_avg, SUM(total_transactions) as total_transactions FROM (SELECT panchayat_code, mrc_mre_mean, total_transactions FROM panchayat_delays_duration WHERE block_code = '" + BLOCK_CODE + "' AND panchayat_code <> '0000000000' AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions>0 AND date > sysdate()-60) a RIGHT JOIN (SELECT staff_id, map_location FROM employees WHERE task_assign='GRS' AND block_code = '" + BLOCK_CODE + "') b ON a.panchayat_code = b.map_location GROUP BY staff_id;" +
        "SELECT b.staff_id AS staff_id, ROUND(SUM(a.mrc_mre_mean * a.total_transactions) / SUM(a.total_transactions),0) AS step1_avg, SUM(total_transactions) as total_transactions FROM (SELECT panchayat_code, mrc_mre_mean, total_transactions FROM panchayat_delays_duration WHERE block_code = '" + BLOCK_CODE + "' AND panchayat_code <> '0000000000' AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions>0) a RIGHT JOIN (SELECT staff_id, map_location FROM employees WHERE task_assign='TA' AND block_code = '" + BLOCK_CODE + "') b ON a.panchayat_code = b.map_location GROUP BY staff_id;" +
        "SELECT b.staff_id AS staff_id, ROUND(SUM(a.mrc_mre_mean * a.total_transactions) / SUM(a.total_transactions),0) AS step1_avg, SUM(total_transactions) as total_transactions FROM (SELECT panchayat_code, mrc_mre_mean, total_transactions FROM panchayat_delays_duration WHERE block_code = '" + BLOCK_CODE + "' AND panchayat_code <> '0000000000' AND gender = 'both' AND bank_type = 'all' AND date_type = 'processed_date' AND total_transactions>0) a RIGHT JOIN (SELECT staff_id, map_location FROM employees WHERE task_assign='GRS' AND block_code = '" + BLOCK_CODE + "') b ON a.panchayat_code = b.map_location GROUP BY staff_id;";
};

exports.apiHelper = function(BLOCK_CODE) {
    return "SELECT short_name, state_code FROM short_codes a WHERE a.state_code in (SELECT b.state_code FROM blocks b WHERE b.block_code ='" + BLOCK_CODE + "');" +
    "SELECT name, task_assign, mobile_no, map_location, mapped_panchayat_name FROM employees WHERE task_assign IN ('TA','GRS') AND block_code ='" + BLOCK_CODE + "';";
};

exports.userBlocks = function(USER_ID) {
    return "SELECT block_code FROM user_blocks WHERE id = " + USER_ID + ");";
};

exports.outcomes = function(){
    return "SELECT outcome, label FROM outcomes;" +
    "SELECT date, mean, upper, outcome, lower, treatment FROM estimates_series;" +
    "SELECT * FROM estimates_summary;" +
    "SELECT date, mean, upper, outcome, lower, arm FROM estimates_series_arms;" + // arm === (1,2,3)
    "SELECT t1_mean, t2_mean, t3_mean, p_val, outcome FROM estimates_summary_arms;";
};

exports.current_musters = function(BLOCK_CODE){
    return "SELECT msr_no, work_name, work_code, start_date, end_date, panchayat_name FROM current_musters WHERE block_code = '"+BLOCK_CODE+"';";    
};

exports.delayed_musters = function(BLOCK_CODE){
    return "SELECT step, msr_no, work_name, work_code, start_date, end_date, panchayat_name FROM delayed_musters WHERE block_code = '"+ BLOCK_CODE + "';";
};
