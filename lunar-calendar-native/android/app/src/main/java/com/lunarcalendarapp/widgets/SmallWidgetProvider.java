package com.lunarcalendarapp.widgets;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import android.util.TypedValue;
import com.lunarcalendarapp.R;
import com.lunarcalendarapp.WidgetConfigActivity;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class SmallWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        // Clean up preferences when widget is deleted
        for (int appWidgetId : appWidgetIds) {
            WidgetConfigActivity.deleteTextSizePref(context, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        // Handle widget update broadcasts
        if (intent.getAction() != null && intent.getAction().equals(AppWidgetManager.ACTION_APPWIDGET_UPDATE)) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(
                new android.content.ComponentName(context, SmallWidgetProvider.class)
            );
            onUpdate(context, appWidgetManager, appWidgetIds);
        }
    }

    public static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_small);

        // Get current date
        Date today = new Date();

        // Calculate lunar date
        LunarCalendarUtils.LunarDate lunarDate = LunarCalendarUtils.solarToLunar(today);

        // Calculate moon phase
        double phase = LunarCalendarUtils.calculateMoonPhase(today);
        String moonEmoji = LunarCalendarUtils.getMoonEmoji(phase);

        // Format solar date
        SimpleDateFormat solarFormat = new SimpleDateFormat("MMM d", Locale.ENGLISH);
        String solarDateStr = solarFormat.format(today);

        // Determine background based on day type
        int backgroundDrawable = getBackgroundForLunarDay(lunarDate);

        // Load saved text size preference
        float baseTextSize = WidgetConfigActivity.loadTextSizePref(context, appWidgetId);

        // Update widget views
        views.setInt(R.id.widget_root, "setBackgroundResource", backgroundDrawable);
        views.setTextViewText(R.id.lunar_date_text, lunarDate.getFormattedDate());
        views.setTextViewText(R.id.moon_phase_emoji, moonEmoji);
        views.setTextViewText(R.id.solar_date_text, solarDateStr);

        // Apply custom text sizes
        views.setTextViewTextSize(R.id.lunar_date_text, TypedValue.COMPLEX_UNIT_SP, baseTextSize);
        views.setTextViewTextSize(R.id.moon_phase_emoji, TypedValue.COMPLEX_UNIT_SP, baseTextSize * 2.9f);
        views.setTextViewTextSize(R.id.solar_date_text, TypedValue.COMPLEX_UNIT_SP, baseTextSize * 0.82f);

        // Create intent to open app when widget is clicked
        Intent intent = new Intent(context, com.lunarcalendarapp.MainActivity.class);
        android.app.PendingIntent pendingIntent = android.app.PendingIntent.getActivity(
            context,
            0,
            intent,
            android.app.PendingIntent.FLAG_UPDATE_CURRENT | android.app.PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(R.id.widget_root, pendingIntent);

        // Update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    private static int getBackgroundForLunarDay(LunarCalendarUtils.LunarDate lunarDate) {
        // Check if it's a holiday
        String holidayName = LunarCalendarUtils.getHolidayName(lunarDate);
        if (holidayName != null && !holidayName.equals("Mùng 1") && !holidayName.equals("Rằm") && !holidayName.equals("Cuối tháng")) {
            return R.drawable.widget_background_holiday;
        }

        // Check special days
        if (lunarDate.day == 1) {
            return R.drawable.widget_background_first_day;
        } else if (lunarDate.day == 15) {
            return R.drawable.widget_background_full_moon;
        } else if (lunarDate.day >= 29) {
            return R.drawable.widget_background_month_end;
        }

        // Default background
        return R.drawable.widget_background;
    }
}
