(function($) {
    var houstonLocation = new google.maps.LatLng(29.754013, -95.452374),
        tulsaLocation = new google.maps.LatLng(36.060046, -95.923329),
        bartlesvilleLocation = new google.maps.LatLng(36.750590, -95.977802),
        zoom = 14,
        MY_MAPTYPE_ID = 'custom_style',
        url = pri_custom.template_url;

    function initialize() {

        var mapOptions = {
            zoom: zoom,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            draggable: false,
            disableDefaultUI: true,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            },
            mapTypeId: MY_MAPTYPE_ID
        }

        var image = {
            url: url + '/images/map-marker-shadow.png'
        }

        var featureOpts = [
            {
                featureType: 'water',
                elementType: 'all',
                stylers: [
                    { color: '#a4daf4' },
                    { saturation: 99 }
                ]
            },
            {
                featureType: 'landscape',
                elementType: 'all',
                stylers: [
                    { color: '#f8f1df' },
                    { saturation: 99 }
                ]
            },
            {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                    { color: '#ffffff' },
                    { saturation: 99 }
                ]
            },
            {
                featureType: 'road.highway',
                elementType: 'all',
                stylers: [
                    { color: '#fee161' },
                    { saturation: 99 }
                ]
            },
            {
                elementType: 'labels',
                stylers: [
                    { visibility: 'off' }
                ]
            },
            {
                featureType: 'poi',
                elementType: 'all',
                stylers: [
                    { hue: '#bbe7ac' },
                    { saturation: 50 }
                ]
            }
        ];

        var houstonMapOptions = {},
            tulsaMapOptions = {},
            bartlesvilleMapOptions = {};

        $.extend(houstonMapOptions, mapOptions);
        $.extend(tulsaMapOptions, mapOptions);
        $.extend(bartlesvilleMapOptions, mapOptions);

        houstonMapOptions.center = houstonLocation;
        tulsaMapOptions.center = tulsaLocation;
        bartlesvilleMapOptions.center = bartlesvilleLocation;

        houstonMap = new google.maps.Map(document.getElementById('houston-map'), houstonMapOptions);
        tulsaMap = new google.maps.Map(document.getElementById('tulsa-map'), tulsaMapOptions);
        bartlesvilleMap = new google.maps.Map(document.getElementById('bartlesville-map'), bartlesvilleMapOptions);

        var styledMapOptions = {
            name: 'Custom Style'
        };

        var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        houstonMap.mapTypes.set(MY_MAPTYPE_ID, customMapType);
        tulsaMap.mapTypes.set(MY_MAPTYPE_ID, customMapType);
        bartlesvilleMap.mapTypes.set(MY_MAPTYPE_ID, customMapType);

        var houstonMarker = new google.maps.Marker({
            position: houstonLocation,
            map: houstonMap,
            title: 'Primary Services',
            icon: image
        });

        var tulsaMarker = new google.maps.Marker({
            position: tulsaLocation,
            map: tulsaMap,
            title: 'Primary Services',
            icon: image
        });

        var bartlesvilleMarker = new google.maps.Marker({
            position: bartlesvilleLocation,
            map: bartlesvilleMap,
            title: 'Primary Services',
            icon: image
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery);