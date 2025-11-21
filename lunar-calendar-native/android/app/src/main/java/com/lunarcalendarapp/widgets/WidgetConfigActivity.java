package com.lunarcalendarapp.widgets;

import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;
import com.lunarcalendarapp.R;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class WidgetConfigActivity extends Activity {
    private int appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    private SeekBar textSizeSlider;
    private TextView textSizeValue;
    private TextView previewLunarDate;
    private TextView previewMoonPhase;
    private TextView previewSolarDate;
    private float currentTextSize = 11f;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set result to CANCELED initially
        setResult(RESULT_CANCELED);

        setContentView(R.layout.widget_config);

        // Find the widget ID from the intent
        Intent intent = getIntent();
        Bundle extras = intent.getExtras();
        if (extras != null) {
            appWidgetId = extras.getInt(
                AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID
            );
        }

        // If they gave us an invalid widget ID, finish immediately
        if (appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            finish();
            return;
        }

        // Initialize views
        textSizeSlider = findViewById(R.id.text_size_slider);
        textSizeValue = findViewById(R.id.text_size_value);
        Button saveButton = findViewById(R.id.save_button);

        // Get preview widget views
        previewLunarDate = findViewById(R.id.lunar_date_text);
        previewMoonPhase = findViewById(R.id.moon_phase_emoji);
        previewSolarDate = findViewById(R.id.solar_date_text);

        // Load existing preferences or use defaults
        currentTextSize = WidgetPreferences.getTextSize(this, appWidgetId);
        int sliderPosition = WidgetPreferences.textSizeToSlider(currentTextSize);
        textSizeSlider.setProgress(sliderPosition);

        // Update preview with current date
        updatePreview(currentTextSize);

        // Set up slider listener
        textSizeSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                currentTextSize = WidgetPreferences.sliderToTextSize(progress);
                updateTextSizeLabel();
                updatePreview(currentTextSize);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {}

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {}
        });

        // Set up save button
        saveButton.setOnClickListener(v -> {
            // Save the preference
            WidgetPreferences.saveTextSize(WidgetConfigActivity.this, appWidgetId, currentTextSize);

            // Update the widget
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(WidgetConfigActivity.this);
            SmallWidgetProvider.updateAppWidget(WidgetConfigActivity.this, appWidgetManager, appWidgetId);

            // Return OK result
            Intent resultValue = new Intent();
            resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
            setResult(RESULT_OK, resultValue);
            finish();
        });

        // Initial label update
        updateTextSizeLabel();
    }

    private void updateTextSizeLabel() {
        String label = WidgetPreferences.getTextSizeLabel(currentTextSize);
        textSizeValue.setText(label + " (" + Math.round(currentTextSize) + "sp)");
    }

    private void updatePreview(float textSize) {
        // Get current date information
        Date today = new Date();
        LunarCalendarUtils.LunarDate lunarDate = LunarCalendarUtils.solarToLunar(today);
        double phase = LunarCalendarUtils.calculateMoonPhase(today);
        String moonEmoji = LunarCalendarUtils.getMoonEmoji(phase);
        SimpleDateFormat solarFormat = new SimpleDateFormat("MMM d", Locale.ENGLISH);
        String solarDateStr = solarFormat.format(today);

        // Update preview text
        if (previewLunarDate != null) {
            previewLunarDate.setText(lunarDate.getFormattedDate());
            previewLunarDate.setTextSize(textSize);
        }

        if (previewMoonPhase != null) {
            previewMoonPhase.setText(moonEmoji);
            // Moon emoji should be proportionally larger
            previewMoonPhase.setTextSize(textSize * 2.5f);
        }

        if (previewSolarDate != null) {
            previewSolarDate.setText(solarDateStr);
            // Solar date should be proportionally smaller
            previewSolarDate.setTextSize(textSize * 0.75f);
        }
    }
}
