var CameraUtil = function(){};

CameraUtil.flyToVertical = function(lon,lat){
    if(!Cesium.defined(lon) && !Cesium.defined(lat)){
        alert("Undefined longitude, latitude");
        return;
    }

    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(lon, lat, 1000),
        orientation : {
            heading : Cesium.Math.toRadians(0),
            pitch : Cesium.Math.toRadians(-90)
        },
        duration : 2, //카메라 이동 시작~종료 시간(초)
        easingFunction : Cesium.EasingFunction.SINUSOIDAL_IN_OUT //카메라가 움직이는 기법
    });
}

CameraUtil.flyToNormal = function(xyzArr, callback){
    var tempArr = new Array(3);

    //인자값이 적합하다면
    if (Cesium.defined(xyzArr) && xyzArr.length === 3) {
        tempArray = xyzArr;
    }
    //인자값이 적합하지 않다면
    else {
        var center = CameraUtil.screenCenterToDegrees(); //브라우저 창 center 지점에 대한 좌표값 취득
        tempArray[0] = Number(center[0].toFixed(10));
        tempArray[1] = Number(center[1].toFixed(10));
    }

    //경위도가 정의되지 않은 경우 처리 중지
    if (!Cesium.defined(tempArray[0]) && !Cesium.defined(tempArray[1])) {
        return;
    }
    //고도가 정의되지 않은 경우 기본 값 지졍
    else if (!Cesium.defined(tempArray[2])) {
        tempArray[2] = 1000;
    }

    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(tempArray[0], tempArray[1], tempArray[2]),
        orientation : {
            heading : Cesium.Math.toRadians(0),
            pitch : Cesium.Math.toRadians(-90)
        },
        duration : 2, //카메라 이동 시작~종료 시간(초)
        easingFunction : Cesium.EasingFunction.SINUSOIDAL_IN_OUT, //카메라가 움직이는 기법
        complete : function() {
            if (typeof callback === 'function') {
                callback();
            }
        }
    });
}

CameraUtil.screenCenterToDegrees = function() {
    var cartographic = CameraUtil.screenCenterToCartographic();

    var longitude = Number(Cesium.Math.toDegrees(cartographic.longitude)); //라디안을 도(경위도) 단위로 변경
    var latitude = Number(Cesium.Math.toDegrees(cartographic.latitude)); //라디안을 도(경위도) 단위로 변경

    console.log(longitude, latitude);

    return [longitude, latitude];
}