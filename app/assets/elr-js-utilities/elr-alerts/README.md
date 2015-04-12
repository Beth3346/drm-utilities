# ELR Alerts

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

A jQuery component for dismissable alerts
Requires jQuery

## Features:

### Add to Markup:

Just add class "elr-dismissable-alert" to the element you want to make dismissable. 

Add the "close" class to the element you want the user to click on to dismiss the alert.

### Add Alerts Dynamically:

        elrAlert = elrDismissableAlert({});
        elrAlert.showAlert('info', 'This is just an informative alert', $('.elr-alert-holder'));
        elrAlert.showAlert('danger', 'Danger Danger Danger!', $('.elr-alert-holder'));
        elrAlert.showAlert('warning', 'This is just a gentle warning', $('.elr-alert-holder'));
        elrAlert.showAlert('success', 'your request was successful', $('.elr-alert-holder'));
        elrAlert.showAlert('muted', 'A muted alert that will probably be ignored', $('.elr-alert-holder'));
        elrAlert.showAlert('custom', 'This is a custom alert', $('.elr-alert-holder'));

## Example Usage:

        <div class="elr-dismissable-alert">
            <button class="close">x</button>
            This is just an informative alert
        </div>