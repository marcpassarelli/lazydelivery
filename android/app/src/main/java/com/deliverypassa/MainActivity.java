package com.deliverypassa;

import android.content.Intent;

import android.net.Uri;

import android.provider.Settings;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;

import com.facebook.react.ReactActivity;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "DeliveryPassa";
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

}
