"use strict";
$(document).ready(function(){
    viewer.entities.add({
        id: 'pred1',
        position: Cesium.Cartesian3.fromDegrees(127.67490, 36.47845),
        point: {
            show: true, // default
            color: Cesium.Color.RED, // default: WHITE
            pixelSize: 10, // default: 1
            outlineColor: Cesium.Color.RED, // default: BLACK
            outlineWidth: 3, // default: 0
        },
        /* billboard :{
              image: "/image/camera.png",
              scale: 0.1,
             color: new Cesium.Color(255, 0, 0, 1)
         },*/
        label: {
            text: "로드뷰",
            font: "15px Helvetica",
            fillColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            //horizontalOrigin :Cesium.HorizontalOrigin.RIGHT
            pixelOffset: new Cesium.Cartesian2(0, -30)
        }
    });
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(127.67, 36.48, 2000)
    });

    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
        var pickedObject = viewer.scene.pick(movement.position);
        if (!Cesium.defined(pickedObject)) {
            let panoramaDiv = document.getElementById("panorama");
            if (panoramaDiv !== null) {
                panoramaDiv.remove();
            }
            return;
        }
        const width = 600;
        const height = 600;
        let left = (document.body.offsetWidth / 2) - (width / 2);
        let tops = (document.body.offsetHeight / 2) - (height / 2);
        left += window.screenLeft;
        if (pickedObject.id.id === 'pred1') {
            let htmlOverlay = document.createElement("div");
            htmlOverlay.id = "panorama";
            htmlOverlay.style.position = "absolute";

            htmlOverlay.style.top = `${tops}px`;
            htmlOverlay.style.left = `${left}px`;
            htmlOverlay.style.width = '600px';
            htmlOverlay.style.height = '600px';
            document.body.appendChild(htmlOverlay);
            panoramaView();
        }

    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


    function panoramaView() {
        pannellum.viewer('panorama', {
            "default": {
                "firstScene": "circle",

                "sceneFadeDuration": 1000
            },

            "scenes": {
                "circle": {
                    "title": "Mason Circle",
                    "hfov": 110,
                    "pitch": -3,
                    "yaw": 117,
                    "type": "cubemap",
                    "cubeMap": [
                        "/panorama/px.png",
                        "/panorama/nx.png",
                        "/panorama/py.png",
                        "/panorama/ny.png",
                        "/panorama/pz.png",
                        "/panorama/nz.png",
                    ],
                    "hotSpots": [
                        {
                            "pitch": -2.1,
                            "yaw": 132.9,
                            "type": "scene",
                            "text": "Spring House or Dairy",
                            "sceneId": "house"
                        }
                    ]
                },

                "house": {
                    "title": "Spring House or Dairy",
                    "hfov": 110,
                    "yaw": 5,
                    "type": "equirectangular",
                    "panorama": "/panorama/test7.jpeg",
                    "hotSpots": [
                        {
                            "pitch": -0.6,
                            "yaw": 37.1,
                            "type": "scene",
                            "text": "Mason Circle",
                            "sceneId": "circle",
                            "targetYaw": -23,
                            "targetPitch": 2
                        }
                    ]
                }
            }
        });
    }
});