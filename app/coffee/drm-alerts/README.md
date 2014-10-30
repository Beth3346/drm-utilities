# DRM Alerts

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

A jQuery component for dismissable alerts
Requires jQuery

## Features:

### Add to Markup:

Just add class "drm-dismissable-alert" to the element you want to make dismissable. 

Add the "close" class to the element you want the user to click on to dismiss the alert.

### Add Alerts Dynamically:

        drmAlert = new DrmDismissableAlert();
        drmAlert.showAlert('info', 'This is just an informative alert', $('.drm-alert-holder'));
        drmAlert.showAlert('danger', 'Danger Danger Danger!', $('.drm-alert-holder'));
        drmAlert.showAlert('warning', 'This is just a gentle warning', $('.drm-alert-holder'));
        drmAlert.showAlert('success', 'your request was successful', $('.drm-alert-holder'));
        drmAlert.showAlert('muted', 'A muted alert that will probably be ignored', $('.drm-alert-holder'));
        drmAlert.showAlert('custom', 'This is a custom alert', $('.drm-alert-holder'));

## Alert Types:

+ Info "info-alert"
+ Danger "danger-alert"
+ Warning "warning-alert"
+ Success "success-alert"
+ Muted "muted-alert"
+ Custom "custom-alert"
    * You can create custom alerts using the @mixin drm-context-box

## Example Usage:

        <div class="info-alert drm-dismissable-alert">
            <button class="close">x</button>
            This is just an informative alert
        </div>