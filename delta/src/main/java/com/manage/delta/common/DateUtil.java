package com.manage.delta.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	public static Date convertStringToDate(String input) {
		 Date date = null;
		try {
			date = new SimpleDateFormat("dd/MM/yyyy").parse(input);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public static String convertDateToString(Date input) {
		
		if(null == input) return null;
		return new SimpleDateFormat("dd/MM/yyyy").format(input);
	}

}
