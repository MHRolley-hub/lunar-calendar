package com.lunarcalendarapp;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

import com.lunarcalendarapp.widgets.LargeWidgetProvider;
import com.lunarcalendarapp.widgets.SmallWidgetProvider;

public class WidgetConfigActivity extends Activity {
    private static final String PREFS_NAME = "WidgetPrefs";
    private static final String PREF_TEXT_SIZE = "text_size_";

    private int appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    private SeekBar textSizeSeekBar;
    private TextView textSizeValue;
    private TextView previewLunarDate;
    private TextView previewMoonEmoji;
    private TextView previewSolarDate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set result to CANCELED in case user backs out
        setResult(RESULT_CANCELED);

        setContentView(R.layout.widget_config);

        // Get widget ID from intent
        Intent intent = getIntent();
        Bundle extras = intent.getExtras();
        if (extras != null) {
            appWidgetId = extras.getInt(
                AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID
            );
        }

        // If invalid widget ID, finish
        if (appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            finish();
            return;
        }

        // Initialize views
        textSizeSeekBar = findViewById(R.id.textSizeSeekBar);
        textSizeValue = findViewById(R.id.textSizeValue);
        previewLunarDate = findViewById(R.id.previewLunarDate);
        previewMoonEmoji = findViewById(R.id.previewMoonEmoji);
        previewSolarDate = findViewById(R.id.previewSolarDate);
        Button saveButton = findViewById(R.id.saveButton);
        Button cancelButton = findViewById(R.id.cancelButton);

        // Load saved text size
        float savedSize = loadTextSizePref(this, appWidgetId);
        int progress = (int) ((savedSize - 8) / 0.16f); // Map 8-24sp to 0-100
        textSizeSeekBar.setProgress(progress);
        updatePreview(savedSize);

        // Setup SeekBar listener
        textSizeSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                float textSize = 8 + (progress * 0.16f); // Map 0-100 to 8-24sp
                updatePreview(textSize);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {}

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {}
        });

        // Save button
        saveButton.setOnClickListener(v -> {
            float textSize = 8 + (textSizeSeekBar.getProgress() * 0.16f);
            saveTextSizePref(this, appWidgetId, textSize);

            // Update the widget
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(this);

            // Try to update both widget types (only the correct one will actually update)
            SmallWidgetProvider.updateAppWidget(this, appWidgetManager, appWidgetId);
            LargeWidgetProvider.updateAppWidget(this, appWidgetManager, appWidgetId);

            // Return success
            Intent resultValue = new Intent();
            resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
            setResult(RESULT_OK, resultValue);
            finish();
        });

        // Cancel button
        cancelButton.setOnClickListener(v -> finish());
    }

    private void updatePreview(float textSize) {
        String sizeLabel;
        if (textSize < 10) {
            sizeLabel = "Small";
        } else if (textSize < 14) {
            sizeLabel = "Medium";
        } else if (textSize < 18) {
            sizeLabel = "Large";
        } else {
            sizeLabel = "Extra Large";
        }

        textSizeValue.setText(String.format("%s (%.0fsp)", sizeLabel, textSize));

        // Update preview text sizes proportionally
        previewLunarDate.setTextSize(textSize);
        previewMoonEmoji.setTextSize(textSize * 2.9f); // 32/11 ratio
        previewSolarDate.setTextSize(textSize * 0.82f); // 9/11 ratio
    }

    public static void saveTextSizePref(Context context, int appWidgetId, float textSize) {
        SharedPreferences.Editor prefs = context.getSharedPreferences(PREFS_NAME, 0).edit();
        prefs.putFloat(PREF_TEXT_SIZE + appWidgetId, textSize);
        prefs.apply();
    }

    public static float loadTextSizePref(Context context, int appWidgetId) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, 0);
        return prefs.getFloat(PREF_TEXT_SIZE + appWidgetId, 11.0f); // Default 11sp
    }

    public static void deleteTextSizePref(Context context, int appWidgetId) {
        SharedPreferences.Editor prefs = context.getSharedPreferences(PREFS_NAME, 0).edit();
        prefs.remove(PREF_TEXT_SIZE + appWidgetId);
        prefs.apply();
    }
}
