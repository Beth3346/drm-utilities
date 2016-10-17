// export default elrMaps = function(params) {
//     const self = {};

//     function initialize() {
//         let options = {
//             scrollwheel: false,
//             // disableDoubleClickZoom: true,
//             // draggable: false,
//             disableDefaultUI: true,
//             mapTypeControlOptions: {
//                 mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
//             },
//             mapTypeId: MY_MAPTYPE_ID,
//             url: elr_custom.template_url
//         };

//         let featureOpts = [];

//         let mapOptions = { zoom: zoom };

//         let styledMapOptions = {
//             name: 'Custom Style'
//         };

//         $.extend(mapOptions, options);

//         $.each($('.location-map'), function() {
//             let $that = $(this);
//             let address = $that.data('address');
//             let geocoder = new google.maps.Geocoder();
//             let map = new google.maps.Map(this, mapOptions);

//             // let image = {
//             //     url: mapOptions.url + '/images/ecot-marker.png'
//             // };

//             let customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

//             map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

//             if (geocoder) {
//                 console.log('geocoding!');
//                 geocoder.geocode( { 'address': address}, function(results, status) {
//                     if (status === google.maps.GeocoderStatus.OK) {
//                         if (status !== google.maps.GeocoderStatus.ZERO_RESULTS) {
//                             map.setCenter(results[0].geometry.location);

//                             let infowindow = new google.maps.InfoWindow({
//                                 content: `<b>${address}</b>`,
//                                 size: new google.maps.Size(150,50)
//                             });

//                             let marker = new google.maps.Marker({
//                                 position: results[0].geometry.location,
//                                 map: map,
//                                 title:address
//                             });

//                             google.maps.event.addListener(marker, 'click', function() {
//                                 infowindow.open(map, marker);
//                             });

//                         } else {
//                             console.log("No results found");
//                         }
//                     } else {
//                         console.log("Geocode was not successful for the following reason: " + status);
//                     }
//                 });
//             }
//         });
//     }

//     let zoom = 11;
//     let MY_MAPTYPE_ID = 'custom_style';

//     google.maps.event.addDomListener(window, 'load', initialize);

//     return self;
// }