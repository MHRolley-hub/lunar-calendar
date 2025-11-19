package com.lunarcalendarapp.widgets;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class LunarCalendarUtils {

    private static final Map<Integer, Date> LUNAR_NEW_YEAR_DATES = new HashMap<Integer, Date>() {{
        put(2020, createDate(2020, 0, 25));
        put(2021, createDate(2021, 1, 12));
        put(2022, createDate(2022, 1, 1));
        put(2023, createDate(2023, 0, 22));
        put(2024, createDate(2024, 1, 10));
        put(2025, createDate(2025, 0, 29));
        put(2026, createDate(2026, 1, 17));
        put(2027, createDate(2027, 1, 6));
        put(2028, createDate(2028, 0, 26));
        put(2029, createDate(2029, 1, 13));
        put(2030, createDate(2030, 1, 3));
        put(2031, createDate(2031, 0, 23));
        put(2032, createDate(2032, 1, 11));
        put(2033, createDate(2033, 0, 31));
        put(2034, createDate(2034, 1, 19));
        put(2035, createDate(2035, 1, 8));
    }};

    private static final Map<String, String> VIETNAMESE_HOLIDAYS = new HashMap<String, String>() {{
        put("1/1", "Tết Nguyên Đán");
        put("1/2", "Tết (Day 2)");
        put("1/3", "Tết (Day 3)");
        put("1/10", "Giỗ Tổ Hùng Vương");
        put("1/15", "Tết Nguyên Tiêu");
        put("3/3", "Tết Hàn Thực");
        put("4/15", "Lễ Phật Đản");
        put("5/5", "Tết Đoan Ngọ");
        put("7/1", "Khai Hội Quỷ");
        put("7/7", "Thất Tịch");
        put("7/14", "Đêm trước Vu Lan");
        put("7/15", "Lễ Vu Lan");
        put("7/29", "Đóng Cửa Địa Ngục");
        put("8/15", "Tết Trung Thu");
        put("9/9", "Tết Trùng Cửu");
        put("10/10", "Tết Hạ Nguyên");
        put("12/8", "Lễ Phật Thành Đạo");
        put("12/23", "Tết Táo Quân");
    }};

    private static Date createDate(int year, int month, int day) {
        Calendar cal = Calendar.getInstance();
        cal.set(year, month, day, 0, 0, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    public static class LunarDate {
        public int year;
        public int month;
        public int day;

        public LunarDate(int year, int month, int day) {
            this.year = year;
            this.month = month;
            this.day = day;
        }

        public String getFormattedDate() {
            return month + "/" + day;
        }

        public String getFullFormattedDate() {
            return "Month " + month + ", Day " + day + ", Year " + year;
        }
    }

    public static LunarDate solarToLunar(Date solarDate) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(solarDate);
        int year = cal.get(Calendar.YEAR);

        Date lunarNewYear = LUNAR_NEW_YEAR_DATES.get(year);
        int lunarYear = year;

        if (lunarNewYear == null) {
            // Fallback if year not in map
            return new LunarDate(year, 1, 1);
        }

        if (solarDate.before(lunarNewYear)) {
            lunarNewYear = LUNAR_NEW_YEAR_DATES.get(year - 1);
            lunarYear = year - 1;
        }

        long daysDiff = (solarDate.getTime() - lunarNewYear.getTime()) / (1000 * 60 * 60 * 24);
        long daysCount = daysDiff;
        int lunarMonth = 1;

        while (daysCount >= 29) {
            int monthLength = (lunarMonth % 2 == 1) ? 30 : 29;
            if (daysCount >= monthLength) {
                daysCount -= monthLength;
                lunarMonth++;
            } else {
                break;
            }
        }

        int lunarDay = (int) (daysCount + 1);

        return new LunarDate(
            lunarYear,
            Math.max(1, Math.min(12, lunarMonth)),
            Math.max(1, Math.min(30, lunarDay))
        );
    }

    public static double calculateMoonPhase(Date date) {
        Calendar knownNewMoon = Calendar.getInstance();
        knownNewMoon.set(2000, 0, 6, 18, 14, 0);
        knownNewMoon.set(Calendar.MILLISECOND, 0);

        double lunarCycle = 29.530588853;
        double daysSinceKnownNew = (date.getTime() - knownNewMoon.getTimeInMillis()) / (1000.0 * 60 * 60 * 24);
        double currentCycle = daysSinceKnownNew % lunarCycle;
        return currentCycle / lunarCycle;
    }

    public static String getMoonEmoji(double phase) {
        if (phase < 0.03 || phase > 0.97) return "🌑";
        if (phase < 0.22) return "🌒";
        if (phase < 0.28) return "🌓";
        if (phase < 0.47) return "🌔";
        if (phase < 0.53) return "🌕";
        if (phase < 0.72) return "🌖";
        if (phase < 0.78) return "🌗";
        return "🌘";
    }

    public static String getHolidayName(LunarDate lunarDate) {
        String key = lunarDate.month + "/" + lunarDate.day;
        String holiday = VIETNAMESE_HOLIDAYS.get(key);

        if (holiday != null) {
            return holiday;
        }

        // Check for special days
        if (lunarDate.day == 1) {
            return "Mùng 1";
        } else if (lunarDate.day == 15) {
            return "Rằm";
        } else if (lunarDate.day >= 29) {
            return "Cuối tháng";
        }

        return null;
    }
}
