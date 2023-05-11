var viewer = viewer || {};
(function(Cesium,$){

    viewer.geojson = {
        "type": "FeatureCollection",
        "features": [
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6750433, 36.4776494]}, "properties": {"aid": "p1"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6754399, 36.4774805]}, "properties": {"aid": "p2"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6757355, 36.4771312]}, "properties": {"aid": "p3"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6757932, 36.4767760]}, "properties": {"aid": "p4"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6754399, 36.4762403]}, "properties": {"aid": "p5"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6752380, 36.4758792]}, "properties": {"aid": "p6"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6751010, 36.4756347]}, "properties": {"aid": "p7"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6749496, 36.4752795]}, "properties": {"aid": "p8"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6748054, 36.4750524]}, "properties": {"aid": "p9"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6745602, 36.4749301]}, "properties": {"aid": "p10"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6742142, 36.4749592]}, "properties": {"aid": "p11"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6742574, 36.4746215]}, "properties": {"aid": "p12"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [127.6744305, 36.4743478]}, "properties": {"aid": "p14"}},
        ]
    };
    viewer.loadGeojson = function(){
        var promise = Cesium.GeoJsonDataSource.load(viewer.geojson);
        viewer.dataSources.add(dataSource);
        // promise.then(function(dataSource){
        //
        // });
    }
}(Cesium,jQuery));