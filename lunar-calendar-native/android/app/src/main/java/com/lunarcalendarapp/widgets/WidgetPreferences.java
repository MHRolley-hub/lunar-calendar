package com.lunarcalendarapp.widgets;

import android.content.Context;
import android.content.SharedPreferences;

public class WidgetPreferences {
    private static final String PREFS_NAME = "LunarCalendarWidgetPrefs";
    private static final String PREF_TEXT_SIZE_PREFIX = "text_size_";
    private static final float DEFAULT_TEXT_SIZE = 11f;

    /**
     * Save text size preference for a specific widget
     */
    public static void saveTextSize(Context context, int appWidgetId, float textSize) {
        SharedPreferences.Editor prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit();
        prefs.putFloat(PREF_TEXT_SIZE_PREFIX + appWidgetId, textSize);
        prefs.apply();
    }

    /**
     * Get text size preference for a specific widget
     */
    public static float getTextSize(Context context, int appWidgetId) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return prefs.getFloat(PREF_TEXT_SIZE_PREFIX + appWidgetId, DEFAULT_TEXT_SIZE);
    }

    /**
     * Delete preferences for a specific widget (when widget is removed)
     */
    public static void deletePreferences(Context context, int appWidgetId) {
        SharedPreferences.Editor prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit();
        prefs.remove(PREF_TEXT_SIZE_PREFIX + appWidgetId);
        prefs.apply();
    }

    /**
     * Convert slider position (0-16) to text size in sp
     * Range: 8sp (Small) to 24sp (Extra Large)
     * Default: 11sp (Medium) at position 3
     */
    public static float sliderToTextSize(int sliderPosition) {
        return 8f + (sliderPosition * 1f);
    }

    /**
     * Convert text size to slider position
     */
    public static int textSizeToSlider(float textSize) {
        return Math.round(textSize - 8f);
    }

    /**
     * Get text size label for display
     */
    public static String getTextSizeLabel(float textSize) {
        if (textSize <= 9f) {
            return "Small";
        } else if (textSize <= 11f) {
            return "Medium";
        } else if (textSize <= 16f) {
            return "Large";
        } else {
            return "Extra Large";
        }
    }
}
