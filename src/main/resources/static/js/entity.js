var viewer = viewer || {};
(function(Cesium,$){
    "use strict";
    $(document).ready(function() {
        viewer.panoramaList = [];
        viewer.loadGeojson = function (view) {
            if(viewer.panoramaList.length > 0) {
                for(var i in viewer.panoramaList){
                    viewer.pviewer.remove(viewer.panoramaList[i]);
                }
                viewer.panoramaList = [];
            }

            var promise = Cesium.GeoJsonDataSource.load('/point.geojson');
            viewer.dataSources.add(promise);
            promise.then(function(data){
                var entities = data.entities.values;
                for(var i in entities){
                    entities[i].billboard = {
                        image: `/image/${view}.png`,
                        scale: 0.1
                    };
                    var panorama = new PANOLENS.ImagePanorama(`panorama/insta/${entities[i].properties.aid.getValue()}.jpg`);
                    panorama.addEventListener( 'progress', viewer.onProgress);
                    viewer.pviewer.add(panorama);

                    entities[i].panorama = panorama;

                    viewer.panoramaList.push(panorama);
                }
            });
        }
    });
}(Cesium,jQuery));