/**
 * BootSideMenu v 1.0
 * Author: Andrea Lombardo
 * http://www.lombardoandrea.com
 * https://github.com/AndreaLombardo/BootSideMenu
 * 
 * 건물 객체를 클릭하였을때 선택한 건물의 정보를 제공하는 팝업창을 생성하는 파일입니다.
 * "$( id ).BuildingPopup({option});" 으로 사용할 수 있습니다.
 * */
(function ($) {
	
	$.fn.BuildingPopup = function (userOptions) {
		
		var initialCode;
		var newCode;	
		var menu;
		var prevStatus;
		var body = {};

		// 'BootSideMenu.js' 파일의 옵션과 동일합니다.
		var defaults = {
				side: "right",
				duration: 500,
				remember: false,
				autoClose: true,
				pushBody: true,
				closeOnClick: true,
				onTogglerClick: function () {
						//code to be executed when the toggler arrow was clicked
				},
				onBeforeOpen: function () {
						//code to be executed before menu open
				},
				onBeforeClose: function () {
						//code to be executed before menu close
				},
				onOpen: function () {
						//code to be executed after menu open
					menu.addClass("buildingpopup-visible");
				},
				onClose: function () {
						//code to be executed after menu close
					menu.removeClass("buildingpopup-visible");
				},
				onStartup: function () {
						//code to be executed when the plugin is called
				}
		};

		var options = $.extend({}, defaults, userOptions);


		body.originalMarginLeft = $("body").css("margin-left");
		body.originalMarginRight = $("body").css("margin-right");
		body.width = $("body").width();

		initialCode = this.html();

		newCode = "	<div class=\"menu-wrapper\">\n" + initialCode + " </div>";
		newCode += "<div class=\"toggler\" data-whois=\"toggler\">";
		newCode += "	<i class=\"fa\"></i>";
		newCode += "</div>";

		this.empty();
		this.append(newCode);

		menu = $(this);

		menu.addClass("container");
		menu.addClass( userOptions.className );
		menu.css("width", options.width);

		if (options.side == "left") {
				menu.addClass("buildingpopup-left");
		} else if (options.side == "right") {
				menu.addClass("buildingpopup-right");
		}

		menu.id = menu.attr("id");
		menu.cookieName = "bsm2-" + menu.id;
		menu.toggler = $(menu.children()[1]);
		menu.originalPushBody = options.pushBody;
		menu.originalCloseOnClick = options.closeOnClick;


		if (options.remember) {
				prevStatus = readCookie(menu.cookieName);
		} else {
				prevStatus = null;
		}


		forSmallBody();

		switch (prevStatus) {
				case "opened":
						startOpened();
						break;
				case "closed":
						startClosed();
						break;
				default:
						startDefault();
						break;
		}

		if (options.onStartup !== undefined) {
				options.onStartup(menu);
		}

		$("[data-toggle=\"collapse\"]", menu).each(function () {
				var icona = $("<span class=\"fa fa-chevron-right\"></span>");
				$(this).prepend(icona);
		});

		menu.off("click", "[data-whois=toggler]");
		menu.on("click", "[data-whois=toggler]", function () {
				toggle();
				if (options.onTogglerClick !== undefined) {
						options.onTogglerClick(menu);
				}
		});

//		menu.off("click", ".list-group-item");
//		menu.on("click", ".list-group-item", function () {
//				menu.find(".list-group-item").each(function () {
//						$(this).removeClass("active");
//				});
//				$(this).addClass("active");
//				$(".fa", this).toggleClass("fa-chevron-right").toggleClass("fa-chevron-down");
//		});
//
//
//		menu.off("click", "a.list-group-item");
//		menu.on("click", "a.list-group-item", function () {
//				if (options.closeOnClick) {
//						if ($(this).attr("data-toggle") != "collapse") {
//								closeMenu(true);
//						}
//				}
//		});


		function toggle() {
				if (menu.status == "opened") {
						closeMenu(true);
				} else {
						openMenu(true);
				}
		}

		function switchArrow(side) {
				var span = menu.toggler.find("i.fa");
				if (side == "left") {
						span.removeClass("fa-chevron-left").addClass("fa-chevron-right");
				} else if (side == "right") {
						span.removeClass("fa-chevron-right").addClass("fa-chevron-left");
				}
		}

		function startDefault() {
				if (options.side == "left") {
						if (options.autoClose) {
								menu.status = "closed";
								menu.hide().animate({
										left: -(menu.width() + 2)
								}, 1, function () {
										menu.show();
										switchArrow("left");
								});
						} else if (!options.autoClose) {
								switchArrow("right");
								menu.status = "opened";
								if (options.pushBody) {
										$("body").css("margin-left", menu.width() + 20);
								}
						}
				} else if (options.side == "right") {
						if (options.autoClose) {
								menu.status = "closed";
								menu.hide().animate({
										right: -(menu.width() + 2)
								}, 1, function () {
										menu.show();
										switchArrow("right");
								});
						} else {
								switchArrow("left");
								menu.status = "opened";
								if (options.pushBody) {
										$("body").css("margin-right", menu.width() + 20);
								}
						}
				}
		}

		function startClosed() {
				if (options.side == "left") {
						menu.status = "closed";
						menu.hide().animate({
								left: -(menu.width() + 2)
						}, 1, function () {
								menu.show();
								switchArrow("left");
						});
				} else if (options.side == "right") {
						menu.status = "closed";
						menu.hide().animate({
								right: -(menu.width() + 2)
						}, 1, function () {
								menu.show();
								switchArrow("right");
						})
				}
		}

		function startOpened() {
				if (options.side == "left") {
						switchArrow("right");
						menu.status = "opened";
						if (options.pushBody) {
								$("body").css("margin-left", menu.width() + 20);
						}

				} else if (options.side == "right") {
						switchArrow("left");
						menu.status = "opened";
						if (options.pushBody) {
								$("body").css("margin-right", menu.width() + 20);
						}
				}
		}

		function closeMenu(execFunctions) {
				if (execFunctions) {
						if (options.onBeforeClose !== undefined) {
								options.onBeforeClose(menu);
						}
				}
				if (options.side == "left") {

						if (options.pushBody) {
								$("body").animate({marginLeft: body.originalMarginLeft}, {duration: options.duration});
						}

						menu.animate({
								left: -(menu.width() + 2)
						}, {
								duration: options.duration,
								done: function () {
										switchArrow("left");
										menu.status = "closed";

										if (execFunctions) {
												if (options.onClose !== undefined) {
														options.onClose(menu);
												}
										}
								}
						});
				} else if (options.side == "right") {

						if (options.pushBody) {
								$("body").animate({marginRight: body.originalMarginRight}, {duration: options.duration});
						}

						menu.animate({
								right: -(menu.width() + 2)
						}, {
								duration: options.duration,
								done: function () {
										switchArrow("right");
										menu.status = "closed";

										if (execFunctions) {
												if (options.onClose !== undefined) {
														options.onClose(menu);
												}
										}
								}
						});
				}

				if (options.remember) {
						storeCookie(menu.cookieName, "closed");
				}

		}

		function openMenu(execFunctions) {

				if (execFunctions) {
						if (options.onBeforeOpen !== undefined) {
								options.onBeforeOpen(menu);
						}
				}

				if (options.side == "left") {

						if (options.pushBody) {
								$("body").animate({marginLeft: menu.width() + 20}, {duration: options.duration});
						}

						menu.animate({
								left: 0
						}, {
								duration: options.duration,
								done: function () {
										switchArrow("right");
										menu.status = "opened";

										if (execFunctions) {
												if (options.onOpen !== undefined) {
														options.onOpen(menu);
												}
										}
								}
						});
				} else if (options.side == "right") {

						if (options.pushBody) {
								$("body").animate({marginRight: menu.width() + 20}, {duration: options.duration});
						}

						menu.animate({
								right: 0
						}, {
								duration: options.duration,
								done: function () {
										switchArrow("left");
										menu.status = "opened";

										if (execFunctions) {
												if (options.onOpen !== undefined) {
														options.onOpen(menu);
												}
										}
								}
						});
				}

				if (options.remember) {
						storeCookie(menu.cookieName, "opened");
				}
		}


		function forSmallBody() {
				var windowWidth = $(window).width();

				if (windowWidth <= 480) {
						options.pushBody = false;
						options.closeOnClick = true;
				} else {
						options.pushBody = menu.originalPushBody;
						options.closeOnClick = menu.originalCloseOnClick;
				}
		}

		function storeCookie(nome, valore) {
				var d = new Date();
				d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toUTCString();
				document.cookie = nome + "=" + valore + "; " + expires + "; path=/";
		}

		function readCookie(nome) {
				var name = nome + "=";
				var ca = document.cookie.split(";");
				for (var i = 0; i < ca.length; i++) {
						var c = ca[i];
						while (c.charAt(0) == " ")
								c = c.substring(1);
						if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
				}
				return null;
		}


		function onResize() {
				forSmallBody();
				if (menu.status == "closed") {
						startClosed();
				}
				if (menu.status == "opened") {
						startOpened();
				}
		}

		var resizeStart;
		var resizeEnd;
		var wait = 250;
		window.addEventListener("resize", function () {
				resizeStart = new Date().getMilliseconds();
				resizeEnd = resizeStart + wait;
				setTimeout(function () {
						var now = new Date().getMilliseconds();
//						if (now > resizeEnd) {
								onResize();
//						}
				}, wait);
		}, false);

		return this;
	}
}(jQuery));