var viewer = viewer || {};
$(document).ready(function(){
    viewer.pviewer = new PANOLENS.Viewer({output: 'overlay', container: document.getElementById( 'main-container' )});
    viewer.onProgress = function(event){
        var progress = event.progress.loaded / event.progress.total * 100;
        $('#progress-bar').css('width',`${progress}%`);
        if ( progress === 100 ) $('#progress-bar').css('opacity', 0);
    }

    $('.close').on( 'click', function () {
        $('#progress-bar').css('width',0);
        $('#progress-bar').css('opacity',1);
        $('#panorama-container').removeClass('open');
        $('#cesiumContainer').removeClass('open');
        viewer.activeEntity.billboard.color = new Cesium.Color(1, 1, 1, 1);
        viewer.activeEntity = undefined;
    });
});