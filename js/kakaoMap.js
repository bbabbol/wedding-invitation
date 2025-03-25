let marker = {
    position: new kakao.maps.LatLng(36.349255, 127.438104),
    text: '호텔선샤인 7층 씨엘드포레' // text 옵션을 설정하면 마커 위에 텍스트를 함께 표시할 수 있습니다
};

let MapContainer  = document.getElementById("staticMap"),
                    MapOption = {
                        center: new kakao.maps.LatLng(36.349255, 127.438104),
                        level: 3
                        marker: marker
                    };

mapContainer.style.width = "100%";
mapContainer.style.height = "250px";
mapContainer.style.overflow = "hidden";
let map = new kakao.maps.StaticMap(MapContainer, MapOption);

//map.relayout();
//map.setDraggable(false);

//let zoomControl = new kakao.maps.ZoomControl();
//map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//let geocoder = new kakao.maps.services.Geocoder();
//    geocoder.addressSearch("대전 동구 동서대로 1700", function(result, status) {
//    if (status === kakao.maps.services.Status.OK) {
//        let locPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
//        let marker = new kakao.maps.Marker({
//                                map: map,
//                                position: locPosition
//                            });
//        let infoWindow = new kakao.maps.InfoWindow({
//                                content: '<div style="font-size: medium; width:200px; text-align:center; padding:3px 0;">호텔선샤인 7층 씨엘드포레</div>'
//                            });
//        infoWindow.open(map, marker);
//        map.setCenter(locPosition);
//    }
//});
