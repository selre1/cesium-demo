var viewer = viewer || {};
(function( $, window, document ) {
    "use strict";
    $(document).ready(function(){

        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNzdkOGM0Mi0yMjcyLTQwZmItYWIyNy03MmFmNGViYTdhZjMiLCJpZCI6MTAwMTAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTU0NjI0ODF9.0rtvKxwWfm4NLaW8wWegXW83eOhIJohRCDyb5N5u8yk';
        const vworld_key = 'EA23C739-35C5-3CA8-B630-82FA8355021E';
        var layers = [
            {layer: 'Base', tileType: 'png'},
            {layer: 'gray', tileType: 'png'},
            {layer: 'midnight', tileType: 'png'},
            {layer: 'Hybrid', tileType: 'png'},
            {layer: 'Satellite', tileType: 'jpeg'}
        ];

        var selLayer = layers[0];

        viewer = new Cesium.Viewer('cesiumContainer', {
            animation: false, //좌측 하단 둥근 위젯 노출여부
            shouldAnimate: false, // 애니메이션과 같이 시간에 따른 변경되는 요소가 있어서 시뮬레이션 시간을 진행하려고 하면
            baseLayerPicker: false, // 지형선택 위젯 노출여부
            fullscreenButton: false, // 전체화면 여부
            vrButton: false, // vr 버튼 노출여부
            geocoder: false, //지오 코더 위젯 노출여부. 주소와 경계표를 찾고 카메라를 그 위치에 보내는 위젯. 지오 코딩은
            // Bing Maps Locations API를 사용하여 수행.
            // geocoder: new Geocoder(), //이렇게 설정하면 검색 창이 노출됨. 찾고자 하는 지명 입력시 추천 검색어가 나타남
            homeButton: false, // 홈 버튼 노출여부
            infoBox: false, // 정보 또는 설명을 표시하는 위젯 노출여부 (건물정보 보이고 싶을때)
            sceneModePicker: false, // 2D(평명 지도), 3D(구형 지구) 선택 위젯 노출여부
            timeline: false, //timeline 위젯 노출여부
            navigationHelpButton: false, // 도움말 버튼 노출여부
            trackedEntity: undefined, // 현재 카메라에서 추적중인 Entity 인스턴스를 가져 오거나 설정. 더블클릭시 대상이 화면 가운데로 이동되는것 막기위해 undefined로 설정
            selectionIndicator: false, // 클릭시 클릭위치 표시기 노출여부
            projectionPicker: false, // 직각투영/원근법 투영 선택 위젯 노출여부
            navigationInstructionsInitiallyVisible: false,
            scene3DOnly: true, // GPU의 메모리를 절약하기 위해 3D로 렌더링
            shadows: false, // 기본값 false. 모델과 지형에 태양의 그림자가 드리울지 여부(빛 조정은 이 속성에서 조절 안되고 그림자만 드리워짐)
            // terrainShadows : Cesium.ShadowMode.RECEIVE_ONLY, //기본값 RECEIVE_ONLY. 지형이 태양으로부터 그림자를 던지거나 받는지 여부
            useDefaultRenderLoop: false, // 자동 렌더링 여부
            requestRenderMode: true, // scene을 업데이트하지 않으면 새 프레임을 렌더링하지 않도록 설정
            maximumRenderTimeChange: Infinity, // requestRenderMode가 true인 경우 시물레이션이 변경됨에 따른 새 프레임 요청 간격(초)을 설정
            imageryProvider : new Cesium.OpenStreetMapImageryProvider({
                 url : 'https://a.tile.openstreetmap.org/'
            })
        });
        function renderLoop() {
            viewer.resize();
            viewer.render();
            Cesium.requestAnimationFrame(renderLoop);
        }
        Cesium.requestAnimationFrame(renderLoop);

        $('#cesiumContainer').height($(window).innerHeight());

        $(window).on('resize',function(){
           var cesiumDiv =$('#cesiumContainer');
           var height = $( window ).innerHeight();
           cesiumDiv.height(height);
        });

        viewer.mouseEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

        viewer.imageryViewModels = [
            {
                baselayer : new Cesium.OpenStreetMapImageryProvider({
                    url : 'https://a.tile.openstreetmap.org/'
                })
            },
            {
                baselayer : Cesium.createWorldImagery()
            },
            {
                baselayer : new Cesium.WebMapTileServiceImageryProvider({
                    url : `http://api.vworld.kr/req/wmts/1.0.0/${vworld_key}/${selLayer.layer}/{TileMatrix}/{TileRow}/{TileCol}.${selLayer.tileType}`,
                    layer : 'Base',
                    style : 'default',
                    maximumLevel: 19,
                    credit : new Cesium.Credit('VWorld Korea')
                })
            }
        ];

        $('.baseMap').click(function(){
            const layer = viewer.imageryLayers.get(0);
            if(Cesium.defined(layer))
                viewer.imageryLayers.remove(layer);
            if(this.dataset.value === '2'){
                viewer.camera.setView({
                    destination: new Cesium.Cartesian3(-3756512.992115552, 5003744.628566555, 4786760)
                });
                //viewer.scene.screenSpaceCameraController.maximumZoomDistance = 4786760;
            }
            viewer.imageryLayers.addImageryProvider(viewer.imageryViewModels[this.dataset.value].baselayer);
        });

        viewer.mouseEventHandler.setInputAction(function(movement) {
            viewer.trackedEntity = undefined;
        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        viewer.mouseEventHandler.setInputAction(function(movement){
            var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
            if(Cesium.defined(cartesian)){
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                //Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian); // 데카르트 -> 라디안(경위도), 높이(미터)
                var longitudeInt = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7); // 라디안 -> 도(경위도)
                var latitudeInt = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7); // 라디안 -> 도(경위도)
                var heightInt = cartographic.height.toFixed(7); //m단위

                $('#lon > span').text(longitudeInt);
                $("#lat > span").text(latitudeInt);
                //$("#height > span").text(heightInt);
            }
            viewer.scene.requestRender();
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        viewer.mouseEventHandler.setInputAction(function(movement){
            var cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            if(Cesium.defined(cartesian)){
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                //Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian); // 데카르트 -> 라디안(경위도), 높이(미터)
                var longitudeInt = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7); // 라디안 -> 도(경위도)
                var latitudeInt = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7); // 라디안 -> 도(경위도)
                var heightInt = cartographic.height.toFixed(7); //m단위


                console.log("도:"+longitudeInt+", "+latitudeInt+", "+heightInt);
            }
            viewer.scene.requestRender();
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        viewer.camera.moveEnd.addEventListener(function () {
            var cameraPosition = viewer.scene.camera.positionWC;
            var ellipsoidPosition = viewer.scene.globe.ellipsoid.scaleToGeodeticSurface(cameraPosition);
            var distance = Cesium.Cartesian3.magnitude(Cesium.Cartesian3.subtract(cameraPosition, ellipsoidPosition, new Cesium.Cartesian3()));
            $("#zoomlevel > span").text(distance.toFixed(3)+" m");
        });

        $("#move_position").click(function(event){
            var xpos = $("#xpos").val();
            var ypos = $("#ypos").val();
            if(xpos === '' || ypos === ''){
                alert("Not a Point of Interest")
                return;
            }
            var xyzArr = [parseFloat(xpos),parseFloat(ypos),800];
            CameraUtil.flyToNormal(xyzArr);
        });

        $('#cameraVertical').click(function(){
           var cp = CameraUtil.screenCenterToDegrees();
           CameraUtil.flyToVertical(cp[0],cp[1]);
        });

        viewer.loadGeojson();
    });
}( jQuery, window, document ));