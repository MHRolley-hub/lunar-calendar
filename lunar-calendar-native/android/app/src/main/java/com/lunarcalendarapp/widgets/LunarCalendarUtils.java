package com.lunarcalendarapp.widgets;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class LunarCalendarUtils {

    // Accurate new moon dates for Vietnam (GMT+7) - astronomical data
    // Format: "YYYY-MM" -> array of new moon dates for each lunar month
    private static final Map<String, int[][]> NEW_MOON_DATES = new HashMap<String, int[][]>() {{
        // 2024 new moons (month, day for each lunar month 1-12)
        put("2024", new int[][] {
            {2, 10},  // Lunar Month 1 - Feb 10, 2024
            {3, 10},  // Lunar Month 2 - Mar 10, 2024
            {4, 8},   // Lunar Month 3 - Apr 8, 2024
            {5, 8},   // Lunar Month 4 - May 8, 2024
            {6, 6},   // Lunar Month 5 - Jun 6, 2024
            {7, 6},   // Lunar Month 6 - Jul 6, 2024
            {8, 4},   // Lunar Month 7 - Aug 4, 2024
            {9, 3},   // Lunar Month 8 - Sep 3, 2024
            {10, 3},  // Lunar Month 9 - Oct 3, 2024
            {11, 1},  // Lunar Month 10 - Nov 1, 2024
            {12, 1},  // Lunar Month 11 - Dec 1, 2024
            {12, 31}  // Lunar Month 12 - Dec 31, 2024
        });
        // 2025 new moons (accurate astronomical data for Vietnam GMT+7)
        put("2025", new int[][] {
            {1, 29},  // Lunar Month 1 - Jan 29, 2025 (Tết)
            {2, 28},  // Lunar Month 2 - Feb 28, 2025
            {3, 29},  // Lunar Month 3 - Mar 29, 2025
            {4, 27},  // Lunar Month 4 - Apr 27, 2025
            {5, 27},  // Lunar Month 5 - May 27, 2025
            {6, 25},  // Lunar Month 6 - Jun 25, 2025
            {7, 24},  // Lunar Month 7 - Jul 24, 2025
            {8, 23},  // Lunar Month 8 - Aug 23, 2025
            {9, 21},  // Lunar Month 9 - Sep 21, 2025
            {10, 21}, // Lunar Month 10 - Oct 21, 2025
            {11, 20}, // Lunar Month 11 - Nov 20, 2025 (THIS IS THE FIX!)
            {12, 19}  // Lunar Month 12 - Dec 19, 2025
        });
        // 2026 new moons
        put("2026", new int[][] {
            {2, 17},  // Lunar Month 1 - Feb 17, 2026
            {3, 19},  // Lunar Month 2 - Mar 19, 2026
            {4, 17},  // Lunar Month 3 - Apr 17, 2026
            {5, 17},  // Lunar Month 4 - May 17, 2026
            {6, 15},  // Lunar Month 5 - Jun 15, 2026
            {7, 15},  // Lunar Month 6 - Jul 15, 2026
            {8, 13},  // Lunar Month 7 - Aug 13, 2026
            {9, 12},  // Lunar Month 8 - Sep 12, 2026
            {10, 11}, // Lunar Month 9 - Oct 11, 2026
            {11, 10}, // Lunar Month 10 - Nov 10, 2026
            {12, 9},  // Lunar Month 11 - Dec 9, 2026
            {1, 8}    // Lunar Month 12 - Jan 8, 2027
        });
    }};

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
        int month = cal.get(Calendar.MONTH) + 1; // Calendar.MONTH is 0-indexed
        int day = cal.get(Calendar.DAY_OF_MONTH);

        // Try to use accurate new moon data first
        String yearKey = String.valueOf(year);
        if (NEW_MOON_DATES.containsKey(yearKey)) {
            return solarToLunarAccurate(year, month, day);
        }

        // Fallback to old calculation if year not in accurate data
        Date lunarNewYear = LUNAR_NEW_YEAR_DATES.get(year);
        int lunarYear = year;

        if (lunarNewYear == null) {
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

    private static LunarDate solarToLunarAccurate(int year, int month, int day) {
        String yearKey = String.valueOf(year);
        int[][] newMoons = NEW_MOON_DATES.get(yearKey);

        if (newMoons == null) {
            return new LunarDate(year, 1, 1);
        }

        // Find which lunar month this solar date falls into
        int lunarMonth = 1;
        int lunarDay = 1;
        int lunarYear = year;

        // Check if date is before first new moon of the year
        int firstMonth = newMoons[0][0];
        int firstDay = newMoons[0][1];

        if (month < firstMonth || (month == firstMonth && day < firstDay)) {
            // Date is in previous lunar year
            yearKey = String.valueOf(year - 1);
            newMoons = NEW_MOON_DATES.get(yearKey);
            lunarYear = year - 1;

            if (newMoons == null) {
                return new LunarDate(year - 1, 12, 15);
            }

            // Use last month of previous year
            int lastMonthIdx = newMoons.length - 1;
            int nmMonth = newMoons[lastMonthIdx][0];
            int nmDay = newMoons[lastMonthIdx][1];

            // Adjust for year wrap
            if (nmMonth > month) {
                year--;
            }

            Calendar nmCal = Calendar.getInstance();
            nmCal.set(year, nmMonth - 1, nmDay, 0, 0, 0);
            nmCal.set(Calendar.MILLISECOND, 0);

            Calendar dateCal = Calendar.getInstance();
            dateCal.set(year, month - 1, day, 0, 0, 0);
            dateCal.set(Calendar.MILLISECOND, 0);

            long daysDiff = (dateCal.getTimeInMillis() - nmCal.getTimeInMillis()) / (1000 * 60 * 60 * 24);
            lunarDay = (int) (daysDiff + 1);
            lunarMonth = 12;

            return new LunarDate(lunarYear, lunarMonth, Math.max(1, lunarDay));
        }

        // Find the lunar month by checking each new moon date
        for (int i = 0; i < newMoons.length; i++) {
            int nmMonth = newMoons[i][0];
            int nmDay = newMoons[i][1];

            // Get next new moon date for comparison
            int nextNmMonth = 0;
            int nextNmDay = 0;
            int nextYear = year;

            if (i < newMoons.length - 1) {
                nextNmMonth = newMoons[i + 1][0];
                nextNmDay = newMoons[i + 1][1];
            } else {
                // Last month - use first month of next year
                String nextYearKey = String.valueOf(year + 1);
                int[][] nextYearMoons = NEW_MOON_DATES.get(nextYearKey);
                if (nextYearMoons != null) {
                    nextNmMonth = nextYearMoons[0][0];
                    nextNmDay = nextYearMoons[0][1];
                    nextYear = year + 1;
                }
            }

            // Check if current date falls in this lunar month
            boolean afterThisNewMoon = (month > nmMonth) || (month == nmMonth && day >= nmDay);
            boolean beforeNextNewMoon = nextNmMonth == 0 ||
                (month < nextNmMonth) || (month == nextNmMonth && day < nextNmDay) ||
                (nextYear > year && (month < nextNmMonth || month > nmMonth));

            if (afterThisNewMoon && beforeNextNewMoon) {
                lunarMonth = i + 1;

                // Calculate day within the month
                Calendar nmCal = Calendar.getInstance();
                nmCal.set(year, nmMonth - 1, nmDay, 0, 0, 0);
                nmCal.set(Calendar.MILLISECOND, 0);

                Calendar dateCal = Calendar.getInstance();
                dateCal.set(year, month - 1, day, 0, 0, 0);
                dateCal.set(Calendar.MILLISECOND, 0);

                long daysDiff = (dateCal.getTimeInMillis() - nmCal.getTimeInMillis()) / (1000 * 60 * 60 * 24);
                lunarDay = (int) (daysDiff + 1);
                break;
            }
        }

        return new LunarDate(lunarYear, lunarMonth, Math.max(1, lunarDay));
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
