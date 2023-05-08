(function( $, window, document ) {
	/*
	 * jstree 라이브러리 생성 함수를 JQuery 최상위 객체에 추가합니다. 해당 함수 호출시 jstree가 target element에 생성됩니다.
	 * @param {options} options.map Cesium map 객체
	 * @param {options} options.url ajax url
	 */
	$.fn.jstreeCustom = function (options) {
		var target = $(this);
		var map = options.map;
		var defaults = {
			"checkbox" : {
				"keep_selected_style" : false
			},
			"core" : {
				"themes" : {
					"name": "default-dark",
					"dots": true,
					"stripes" : true,
					"icons": true,
					"responsive": true
				},
				'data' : {
				}
			},
			"types" : {
				"default" : {
					"icon" : "urban-building-icon"
				},
				"urbanCollection" : {
					"icon" : "fa fa-map-o"
				},
				"urbanBuilding-ismart" : {
					"icon" : "/assets/img/building_icon_on.png"
				},
				"bim" : {
					"icon" : "/assets/img/building_icon_off.png"
				}
			},
			"contextmenu" : {
				items : {
					"bim" : {
						"separator_before" : false,
						"separator_after" : false,
						"_disabled" : function(data) {
							return ($.jstree.reference(
									data.reference)
									.get_node(
											data.reference).type !== "bim")
						},
						"label" : "GHP",
						/*!
						"shortcut"			: 113,
						"shortcut_label"	: 'F2',
						"icon"				: "glyphicon glyphicon-leaf",
						 */
						"action" : function(data) {
							var inst = $.jstree
									.reference(data.reference), obj = inst
									.get_node(data.reference);
						}
					},
					"properties" : {
						"separator_before" : false,
						"separator_after" : false,
						"_disabled" : false,
						/* function(data) {
						return ($.jstree.reference(
								data.reference)
								.get_node(
										data.reference).type !== "urbanBuilding")} */
						"label" : "Properties",
						/*!
						"shortcut"			: 113,
						"shortcut_label"	: 'F2',
						"icon"				: "glyphicon glyphicon-leaf",
						 */
						"action" : function(data) {
							var inst = $.jstree
									.reference(data.reference), 
									obj = inst.get_node(data.reference);
//								hideBar();
							if(obj.type =="bim"){
//									showBar(feature[0]);
							}else{
								var idvalArray = obj.id.split('_')
								var objgid = idvalArray[0];
//									showBar(ntIdTable[objgid]);
							}
							// inst.edit(obj);
							
						}
					}
				}
			},
			"search": {
				"show_only_matches": true
			},
			"plugins" : [ "wholerow", "search", "types", "contextmenu" ]
		}
		
		// var deferredObj =
		// 	$.ajax({
		// 	url : options.url,
		// 	type : "GET",
		// 	contentType : "application/json; charset=UTF-8",
		// 	dataType : "json",
		// 	cache : false,
		// 	data : {},
		// 	traditional: true
		// });
		
		// deferredObj.done(function(data, textStatus, jqXHR) {
		// 	setJstreeList( data, target, defaults, map );
		// });
		setJstreeList( target, defaults, map );
	}
	
	/*
	 * jstree를 생성하는 함수입니다. 
	 * @param (data) [Array] 빌딩 리스트
	 * @param (target) "String" element ID
	 * @param (defaults) {Object} jstree 설정값
	 * @param (map) {opt.Cesium} Cesium map 객체
	 */
	function setJstreeList(target, defaults, map ) {
		var list = [];
		var parent = [];
		var temp = {};
		var data = [
			{ "id" : "ajson1", "parent" : "#", "text" : "수지구", "type":"urbanCollection" },
			{ "id" : "ajson2", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson3", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson4", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson5", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson6", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson7", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson8", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson9", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson10", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson11", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson12", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson13", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson14", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson15", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson16", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson17", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson18", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson19", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson20", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson21", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},
			{ "id" : "ajson22", "parent" : "#", "text" : "기흥구",  "type":"urbanCollection"},

			{ "id" : "ajson23", "parent" : "ajson1", "text" : "풍덕천동", "type":"bim" },
			{ "id" : "ajson24", "parent" : "ajson1", "text" : "상현동", "type":"bim" },
			{ "id" : "ajson25", "parent" : "ajson2", "text" : "동백동", "type":"urbanBuilding-ismart" },
			{ "id" : "ajson26", "parent" : "ajson2", "text" : "동백2동", "type":"urbanBuilding-ismart"},
		];
		// for (var i in data) {
		// 	// 구별로 root node를 생성합니다.
		//
		// 	parent.push('suji');
		// 	temp.parent = '#';
		// 	temp.id = 'suji';
		// 	temp.type = 'urbanCollection';
		// 	temp.text = '수지구';
		// 	list.push($.extend({}, temp));
		//
		// 	// 해당 구의 자식 노드로 빌딩 정보를 추가합니다.
		// 	temp.parent = 'suji';
		// 	temp.id = 'biud';
		// 	temp.text = '차차';
		// 	temp.type = 'urbanBuilding-ismart';
		// 	// if ( data[i].isismart === 'Y' ) {
		// 	// 	temp.type = 'urbanBuilding-ismart';
		// 	// } else {
		// 	// 	temp.type = 'bim';
		// 	// }
		// 	list.push($.extend({}, temp));
		// }
		
		defaults.core.data = data;
		
		// jstree 생성
		target
			.jstree( defaults )
			.css( 'width', '100%' )
			.on( 'select_node.jstree', function(e, data) {
				selectNodeEvent( map, e, data );
			});
	}
	
	/*
	 * jstree 리스트 노드 부분을 클릭하는 이벤트를 바인딩합니다.
	 * @param (map) {opt.Cesium} Cesium map 객체
	 * @param (e) event 객체
	 * @param (data) {Object} 선택된 노드의 속성값
	 */
	function selectNodeEvent( map, e, data ) {
		var gid = data.node.id;
		var feature = map.getFeatureByGid( gid );
		
		if ( !!feature && data.node.type != 'urbanCollection' && data.node.type != 'bim' ) {
			feature.cameraFocus();
		}
		
		if( !!feature && data.node.type =="bim" ){
			feature.cameraFocus();
		}
	}
	
	// jstree의 높이값 설정
	function setHeight() {
		var jstreeDivHeight = 0;
		$( '.boot-side-wrapper' ).find( '.row' ).each(function() {
			if ( !( $( this ).hasClass( 'side-jstree-menu' ) ) ) {
				jstreeDivHeight += parseInt( $( this ).height(), 10 );
				jstreeDivHeight += parseInt( $( this ).css( 'margin-top' ), 10 );
				jstreeDivHeight += parseInt( $( this ).css( 'margin-bottom' ), 10 );
			}
		});
		
		$( '.side-jstree-menu' ).height( $( '#boot-side-menu' ).height() - jstreeDivHeight );
	}
	
	setHeight();
	
	// 브라우저 window창 크기 변경시 마다 실행되는 이벤트 함수
	window.addEventListener( 'resize', function () {
		setHeight();
	}, false);
}( jQuery, window, document ));
