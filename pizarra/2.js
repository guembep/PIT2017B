AppConfig = {
    clickType: "mouse",
    playersCount: 25,
    buttonToBoardHeightCoeff: .040548,
    buttonsPanelLeftToBoardWidthCoeff: .473816,
    fontsizeToButtonWidthCoeff: .7,
    playersColors: [{
        background: "#8B2323",
        font: "#CCCCCC"
    }, {
        background: "#FFFF00",
        font: "#444444"
    }, {
        background: "#912CEE",
        font: "#EEEEEE"
    }, {
        background: "#00FF00",
        font: "#222222"
    }, {
        background: "#1D4BA0",
        font: "#EEEEEE"
    }, {
        background: "#EE2C2C",
        font: "#222222"
    }, {
        background: "#ff7f50",
        font: "#222222"
    }, {
        background: "#009ACD",
        font: "#222222"
    }],
    ballsCount: 20,
    ballsColors: [{
            background: "#ffa500"
        },
        {
            background: "#CC3333"
        }
    ],
    shapesColors: [{
        stroke: "#FF3300",
        fill: "#FF3300"
    }, {
        stroke: "#0000FF",
        fill: "#0000FF"
    }, {
        stroke: "#FF7F50",
        fill: "#FF7F50"
    }, {
        stroke: "#FFFF00",
        fill: "#FFFF00"
    }, {
        stroke: "#FFFFFF",
        fill: "#FFFFFF"
    }, {
        stroke: "#3aff3a",
        fill: "#3aff3a"
    }]
};
isTouch() && (AppConfig.clickType = "touch");

function isTouch() {
    return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
}
var _boardObj = null,
    _linkDataStore = null,
    _projectTexts = null,
    _langKey = null,
    _siteUri = null,
    _pages = {
        main: null,
        animation: null
    },
    _currentPage = null,
    _scrollTimer = null;

function _run() {
    _init();
    _scrollBoard()
}

function _refresh() {
    if ("touch" == AppConfig.clickType && !AppConfig.fullscreenClicked) return !0;
    hideElement(".context-menu");
    hideElement("#modal_window");
    hideElement("#modal_window_bg");
    _boardObj.refresh();
    _pages[_currentPage].refresh && _pages[_currentPage].refresh();
    _scrollBoard();
    AppConfig.fullscreenClicked = !1
}

function _init() {
    _siteUri = document.querySelector("#param_site_uri").value;
    _langKey = document.querySelector("#param_lang_key").value;
    _boardObj = BoardHelpers.boardFactory();
    _boardObj.init();
    _projectTexts = new AppTexts;
    var J = window.location.hash.replace("#", "").split("_"),
        q = J[0],
        J = J[1] || null;
    q && void 0 !== _pages[q] || (q = "main");
    _linkDataStore = new LinkDataStore;
    _linkDataStore.get(q, J);
    _linkDataStore.data.animation && (q = "animation");
    BoardHelpers.showPage(q, {
        link_token: J
    })
}

function _scrollBoard() {
    _scrollTimer && clearTimeout(_scrollTimer);
    _scrollTimer = setTimeout(function() {
        var J = Math.ceil(.8 * $("#board").offset().top);
        if (!J || isNaN(J)) J = 0;
        $("HTML, BODY").animate({
            scrollTop: J
        }, 1E3)
    }, 1E3)
}

function _hideElements() {
    $(".context-menu").hide();
    shapesPainter.removeAdditionalShapes();
    var J = $("#modal_window"),
        q = $("#modal_window_bg");
    J && J.hide();
    q && q.hide()
}
document.addEventListener("DOMContentLoaded", _run);
window.addEventListener("resize", _refresh);
var BoardHelpers = {
        boardFactory: function() {
            var J = document.querySelector("#param_board_type").value,
                q = document.querySelector("#param_board_key").value,
                w = this.boardsConfigs[J];
            w.type = J;
            w.key = q;
            return new Board(w)
        },
        showPage: function(J, q) {
            q = q || {};
            _currentPage && _pages[_currentPage] && _pages[_currentPage].hide();
            _currentPage = J;
            if (!_pages[_currentPage]) {
                var w = "_pages[_currentPage] = new " + J.charAt(0).toUpperCase() + J.substr(1, J.length - 1);
                q.link_token && (w += '({link_token: "' + q.link_token + '"})');
                eval(w + ";")
            }
            _pages[_currentPage].show(q)
        },
        boardsConfigs: {
            "big-football": {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .6568,
                playerToBoardWidthCoeff: .026184
            },
            "mini-football": {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .572,
                playerToBoardWidthCoeff: .026184
            },
            basketball: {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .5976,
                playerToBoardWidthCoeff: .02182
            },
            "basketball-new": {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .5976,
                playerToBoardWidthCoeff: .02182
            },
            hockey: {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .5816,
                playerToBoardWidthCoeff: .0235656
            },
            "field-hockey": {
                bgColor: "#e5c0c5",
                strokeColor: "#000000",
                heightToWidthCoeff: .6392,
                playerToBoardWidthCoeff: .026184
            },
            handball: {
                bgColor: "#282c31",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .572,
                playerToBoardWidthCoeff: .03182
            },
            bandy: {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .664,
                playerToBoardWidthCoeff: .026184
            },
            "american-football": {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .6328,
                playerToBoardWidthCoeff: .026184
            },
            volleyball: {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .5696,
                playerToBoardWidthCoeff: .026184
            },
            rugby: {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .6568,
                playerToBoardWidthCoeff: .02182
            },
            floorball: {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .572,
                playerToBoardWidthCoeff: .02182
            },
            "rocket-league": {
                bgColor: "#738554",
                strokeColor: "#ffffff",
                heightToWidthCoeff: .8288,
                playerToBoardWidthCoeff: .026184
            }
        }
    },
    Board = function(J) {
        function q() {
            var a = +(.65 * window.innerWidth).toFixed(),
                b = window.innerHeight,
                e = a,
                c = 200;
            for ("touch" == AppConfig.clickType || 520 >= b ? c = 0 : 700 >= b ? c = 100 : 800 >= b && (c = 150);;) {
                e--;
                var l = Math.ceil(e * G);
                if (e < a && l < b - Math.ceil(.7 * c)) break
            }
            h.width = e;
            h.height = Math.ceil(e * G);
            m.style.width = e + "px";
            m.style.height = l + "px"
        }

        function w() {
            u || (u = document.getElementById("svg_canvas"), u.style.background = n.bgColor, document.getElementById("svg_bg_rect").setAttribute("fill", n.bgColor), document.getElementById("svg_bg_rect").setAttribute("stroke", n.bgColor));
            u.setAttribute("width", h.width);
            u.setAttribute("height", h.height);
            u.setAttribute("viewBox", "0 0 " + h.width + " " + h.height);
            document.getElementById("svg_bg_rect").setAttribute("width", h.width);
            document.getElementById("svg_bg_rect").setAttribute("height", h.height);
            drawFieldMarkup(h.width, h.height, n.strokeColor)
        }

        function C() {
            e = Math.ceil(h.width * AppConfig.buttonToBoardHeightCoeff);
            b = Math.ceil(e * AppConfig.fontsizeToButtonWidthCoeff);
            10 > b && (b = 10);
            (function() {
                var a = Math.ceil(b / 2);
                12 > a && (a = 12);
                for (var r = Math.ceil(e / 10), c = Math.ceil(e / 15), l =
                        Math.ceil(e / 5), m = Math.ceil(e / 15), h = document.querySelectorAll(".context-menu"), F = 0; F < h.length; F++) h[F].style.fontSize = a + "px", h[F].style.padding = r + "px", h[F].style.borderWidth = c + "px", h[F].style.borderRadius = l + "px";
                h = document.querySelectorAll(".context-menu input");
                for (F = 0; F < h.length; F++) h[F].style.fontSize = a + "px", h[F].style.marginBottom = m + "px"
            })();
            (function() {
                var a = document.querySelector("#left_menu_panel #close"),
                    r = document.querySelector("#left_menu_panel #board_type_label"),
                    c = document.querySelector("#left_menu_panel #social_buttons"),
                    h = Math.ceil(b / 1.3);
                10 > h && (h = 10);
                l.style.fontSize = h + "px";
                h = Math.ceil(b / 1.5);
                10 > h && (h = 10);
                for (var m = document.querySelectorAll("#left_menu_panel .menu_item"), y = 0; y < m.length; y++) m[y].style.fontSize = h + "px", m[y].style.height = e + "px", m[y].style.lineHeight = e + "px";
                r.style.lineHeight = 2 * e + "px";
                a.style.width = Math.ceil(e / 2) + "px";
                a.style.height = Math.ceil(e / 2) + "px";
                a.style.right = Math.ceil(e / 8) + "px";
                a.style.top = Math.ceil(e / 8) + "px";
                document.querySelector("#left_menu_panel #btn_board_type").style.marginTop = Math.ceil(e /
                    2) + "px";
                c.style.marginTop = Math.ceil(e / 2) + "px";
                document.getElementById("btn_mail").style.padding = "0px";
                document.getElementById("btn_mail_img").style.height = e + "px";
                document.getElementById("btn_mail_img").style.width = e + "px";
                document.getElementById("btn_mail").style.marginRight = .33333 * e / 1.75 + "px";
                document.getElementById("btn_vk").style.padding = "0px";
                document.getElementById("btn_vk_img").style.height = e + "px";
                document.getElementById("btn_vk_img").style.width = e + "px";
                document.getElementById("btn_vk").style.marginRight =
                    .33333 * e / 1.75 + "px";
                document.getElementById("btn_facebook").style.padding = "0px";
                document.getElementById("btn_facebook_img").style.height = e + "px";
                document.getElementById("btn_facebook_img").style.width = e + "px";
                document.getElementById("btn_facebook").style.marginLeft = .33333 * e / 1.75 + "px";
                document.getElementById("btn_facebook").style.marginRight = .33333 * e / 1.75 + "px";
                document.getElementById("btn_youtube").style.padding = "0px";
                document.getElementById("btn_youtube_img").style.height = e + "px";
                document.getElementById("btn_youtube_img").style.width =
                    e + "px";
                document.getElementById("btn_youtube").style.marginRight = .33333 * e / 1.75 + "px"
            })();
            (function() {
                for (var a = Math.ceil(.1 * e), r = document.querySelectorAll("#top_buttons_panel > .button"), c = 0; c < r.length; c++) r[c].style.height = e + "px", r[c].style.lineHeight = Math.round(.93 * e) + "px", r[c].style.marginRight = a + "px", r[c].style.marginTop = .1 * e + "px", r[c].style.paddingLeft = .2 * e + "px", r[c].style.paddingRight = .2 * e + "px", r[c].style.fontSize = b + "px";
                document.getElementById("top_buttons_panel").style.width = _boardObj.getSize().width -
                    .06837 * _boardObj.getSize().width + "px";
                document.getElementById("top_buttons_panel").style.paddingLeft = .06837 * _boardObj.getSize().width + "px";
                document.getElementById("btn_link").style.padding = "0px";
                document.getElementById("btn_link_img").style.height = e + "px";
                document.getElementById("btn_link_img").style.width = e + "px";
                document.getElementById("btn_save_image").style.padding = "0px";
                document.getElementById("btn_save_image_img").style.height = e + "px";
                document.getElementById("btn_save_image_img").style.width = e +
                    "px";
                document.getElementById("btn_fullscreen").style.padding = "0px";
                document.getElementById("btn_fullscreen_img").style.height = e + "px";
                document.getElementById("btn_fullscreen_img").style.width = e + "px";
                document.getElementById("btn_animation").style.padding = "0px";
                document.getElementById("btn_animation").style.marginLeft = 3 * a + "px";
                document.getElementById("btn_animation_img").style.height = e + "px";
                document.getElementById("btn_animation_img").style.width = e + "px";
                document.getElementById("btn_animation_remove_last_frame").style.padding =
                    "0px";
                document.getElementById("btn_animation_remove_last_frame").style.marginLeft = 3 * a + "px";
                document.getElementById("btn_animation_remove_last_frame_img").style.height = e + "px";
                document.getElementById("btn_animation_remove_last_frame_img").style.width = e + "px";
                document.getElementById("btn_animation_links").style.padding = "0px";
                document.getElementById("btn_animation_links_img").style.height = e + "px";
                document.getElementById("btn_animation_links_img").style.width = e + "px";
                document.getElementById("btn_left_menu_panel").style.padding =
                    "0px";
                document.getElementById("btn_left_menu_panel").style.marginRight = 4 * a + "px";
                document.getElementById("btn_left_menu_panel_img").style.height = e + "px";
                document.getElementById("btn_left_menu_panel_img").style.width = e + "px";
                document.getElementById("btn_back").style.padding = "0px";
                document.getElementById("btn_back").style.marginRight = 6 * a + "px";
                document.getElementById("btn_back_img").style.height = e + "px";
                document.getElementById("btn_back_img").style.width = e + "px";
                a = document.getElementById("main_html");
                a.requestFullscreen ||
                    a.requestFullScreen || a.webkitRequestFullScreen || a.mozRequestFullScreen || a.msRequestFullScreen || a.msRequestFullscreen || (document.getElementById("btn_fullscreen_img").style.display = "none")
            })();
            (function() {
                var a = document.getElementById("shape_color_button_title");
                var b = document.getElementById("shape_color");
                if (a && !b) {
                    for (var c = 0; c < AppConfig.shapesColors.length; c++) {
                        var l = "color-" + AppConfig.shapesColors[c].stroke.substr(1);
                        b = document.createElement("img");
                        b.className = "button hidden";
                        b.setAttribute("id",
                            "shape_color_" + c);
                        b.setAttribute("src", _siteUri + "Public/Images/buttons/shapes/" + l + ".png?1");
                        b.setAttribute("title", a.value);
                        document.querySelector("div#shapes_colors").appendChild(b)
                    }
                    l = "color-" + AppConfig.shapesColors[0].stroke.substr(1);
                    b = document.createElement("img");
                    b.className = "button";
                    b.setAttribute("id", "shape_color");
                    b.setAttribute("src", _siteUri + "Public/Images/buttons/shapes/" + l + ".png?1");
                    b.setAttribute("title", a.value);
                    document.querySelector("div#shapes_colors").appendChild(b);
                    document.getElementById("shape_color_button_title").remove()
                }
                document.getElementById("shapes_buttons_panel").style.left =
                    Math.ceil(h.width * AppConfig.buttonsPanelLeftToBoardWidthCoeff) + "px";
                a = document.querySelectorAll("#shapes_buttons_panel .button");
                for (b = 0; b < a.length; b++) a[b].style.width = e + "px", a[b].style.height = e + "px";
                a = document.querySelectorAll("#shapes_buttons_panel div");
                for (b = 0; b < a.length; b++) a[b].style.width = e + "px", a[b].style.margin = "0px";
                a = 0;
                b = Math.ceil(1.1 * e);
                document.querySelector("#shapes_buttons_panel #shapes_elements").style.marginLeft = b * a++ + "px";
                document.querySelector("#shapes_buttons_panel #shapes_stroke_styles").style.marginLeft =
                    b * a++ + "px";
                document.querySelector("#shapes_buttons_panel #shapes_arrow").style.marginLeft = b * a++ + "px";
                document.querySelector("#shapes_buttons_panel #shapes_colors").style.marginLeft = b * a++ + "px";
                document.querySelector("#shapes_buttons_panel #remove_last_shape").style.marginLeft = Math.ceil(.33333 * e) + "px";
                document.querySelector("#shapes_buttons_panel #remove_last_shape").style.left = b * a + "px";
                document.querySelector("#shapes_buttons_panel #remove_all_shapes").style.marginLeft = Math.ceil(.1 * e) + "px";
                document.querySelector("#shapes_buttons_panel #remove_all_shapes").style.left =
                    b * a + "px";
                document.getElementById("clear_all_button").style.height = e + "px";
                document.getElementById("clear_all_button").style.width = e + "px";
                document.getElementById("clear_all_button").style.marginRight = .33333 * e / 1.75 + .0636 * _boardObj.getSize().width + "px"
            })();
            (function() {
                document.getElementById("anim_frames_container").style.height = e + "px";
                document.getElementById("anim_frames_container").style.maxWidth = 6 * e + "px";
                document.getElementById("anim_frames_container").style.margin = "0px";
                document.getElementById("anim_frames_container").style.marginTop =
                    .1 * e + "px";
                for (var a = document.querySelectorAll("#anim_frames_container .anim-frame"), c = 0; c < a.length; c++) a[c].style.height = e + "px", a[c].style.lineHeight = e + "px", a[c].style.width = e + "px";
                a = document.querySelectorAll(".anim-frame-img");
                for (c = 0; c < a.length; c++) a[c].style.height = e + "px", a[c].style.width = e + "px";
                a = document.querySelectorAll("#anim_frames_container .anim-frame .anim-frame-text");
                for (c = 0; c < a.length; c++) a[c].style.height = e + "px", a[c].style.width = e + "px", a[c].style.lineHeight = e + "px", a[c].style.fontSize =
                    Math.ceil(b / 1.7) + "px";
                document.getElementById("btn_animation_frames_left").style.height = e + "px";
                document.getElementById("btn_animation_frames_left").style.width = e / 2 + "px";
                document.getElementById("btn_animation_frames_left").style.padding = "0px";
                document.getElementById("btn_animation_frames_left").style.marginRight = "0px";
                document.getElementById("btn_animation_frames_left").style.marginLeft = .33333 * e + "px";
                document.getElementById("btn_animation_frames_left_img").style.height = e + "px";
                document.getElementById("btn_animation_frames_left_img").style.width =
                    e / 2 + "px";
                document.getElementById("btn_animation_frames_right").style.height = e + "px";
                document.getElementById("btn_animation_frames_right").style.width = e / 2 + "px";
                document.getElementById("btn_animation_frames_right").style.padding = "0px";
                document.getElementById("btn_animation_frames_right_img").style.height = e + "px";
                document.getElementById("btn_animation_frames_right_img").style.width = e / 2 + "px"
            })();
            (function() {
                document.getElementById("animation_buttons_panel").style.right = .0636 * _boardObj.getSize().width + "px";
                for (var a = document.querySelectorAll("#animation_buttons_panel .button"), c = 0; c < a.length; c++) a[c].style.width = e + "px", a[c].style.height = e + "px", a[c].style.marginRight = Math.ceil(.1 * e) + "px";
                a = document.querySelectorAll("#animation_buttons_panel .button_no_hover");
                for (c = 0; c < a.length; c++) a[c].style.width = e + "px", a[c].style.height = e + "px", a[c].style.marginRight = Math.ceil(.1 * e) + "px";
                document.getElementById("clear_animation_button").style.height = e + "px";
                document.getElementById("clear_animation_button").style.width =
                    e + "px";
                document.getElementById("clear_animation_button").style.marginRight = .33333 * e / 1.75 + .0636 * _boardObj.getSize().width + "px";
                document.getElementById("btn_animation_speed_plus").style.height = e + "px";
                document.getElementById("btn_animation_speed_plus").style.width = e / 2 + "px";
                document.getElementById("btn_animation_speed_plus").style.padding = "0px";
                document.getElementById("btn_animation_speed_plus").style.marginRight = .33333 * e + "px";
                document.getElementById("btn_animation_speed_plus_img").style.height = e + "px";
                document.getElementById("btn_animation_speed_plus_img").style.width = e / 2 + "px";
                document.getElementById("btn_animation_speed").style.height = e + "px";
                document.getElementById("btn_animation_speed").style.width = e + "px";
                document.getElementById("btn_animation_speed").style.padding = "0px";
                document.getElementById("btn_animation_speed").style.marginRight = "0px";
                document.getElementById("btn_animation_speed_img").style.height = e + "px";
                document.getElementById("btn_animation_speed_img").style.width = e + "px";
                document.getElementById("btn_animation_speed_minus").style.height =
                    e + "px";
                document.getElementById("btn_animation_speed_minus").style.width = e / 2 + "px";
                document.getElementById("btn_animation_speed_minus").style.padding = "0px";
                document.getElementById("btn_animation_speed_minus").style.marginRight = "0px";
                document.getElementById("btn_animation_speed_minus").style.marginLeft = .33333 * e + "px";
                document.getElementById("btn_animation_speed_minus_img").style.height = e + "px";
                document.getElementById("btn_animation_speed_minus_img").style.width = e / 2 + "px";
                a = document.querySelectorAll("#animation_buttons_panel .anim-frame-text");
                for (c = 0; c < a.length; c++) a[c].style.height = e + "px", a[c].style.width = e + "px", a[c].style.lineHeight = e + "px", a[c].style.fontSize = Math.ceil(b / 1.7) + "px"
            })()
        }

        function E() {
            (function() {
                document.addEventListener("click", function(a) {
                    "btn_left_menu_panel" != a.target.id && "btn_left_menu_panel_img" != a.target.id && (l.style.left = "-10000px");
                    a.which && 3 != a.which && (a.target.closest(".context-menu") || hideElement(".context-menu"))
                }, !1);
                document.addEventListener("selectstart", function(a) {
                    if (!(a.target && a.target.localName && "input" ==
                            a.target.localName.toLowerCase() || a.target && a.target.nodeName && "input" == a.target.nodeName.toLowerCase() || a.target && a.target.tagName && "input" == a.target.tagName.toLowerCase())) return a.preventDefault(), !1
                }, !1);
                "touch" != AppConfig.clickType ? document.addEventListener("contextmenu", function(a) {
                    if (!(a.target && a.target.localName && "input" == a.target.localName.toLowerCase() || a.target && a.target.nodeName && "input" == a.target.nodeName.toLowerCase() || a.target && a.target.tagName && "input" == a.target.tagName.toLowerCase())) return a.preventDefault(),
                        hideElement(".context-menu"), !1
                }, !1) : document.addEventListener("contextmenu", function(a) {
                    a.preventDefault();
                    return !1
                }, !1);
                "touch" != AppConfig.clickType && window.addEventListener("scroll", function(a) {
                    hideElement(".context-menu")
                })
            })();
            (function() {
                addEventForElements(".context-menu", "keydown", function(a) {
                    27 == a.which && hideElement(".context-menu")
                })
            })();
            (function() {
                addEventForElements("#shapes_buttons_panel .button", "mousedown", function(a) {
                    a.preventDefault();
                    return !1
                }, !1);
                addEventForElements("div.shapes-selector-column .hidden",
                    "click",
                    function() {
                        var a = this.id.split("_"),
                            b = a[1],
                            c = a[a.length - 1],
                            b = "set" + b.charAt(0).toUpperCase() + b.slice(1);
                        _pages[_currentPage].getShapesPainter()[b](c);
                        --a.length;
                        a = a.join("_");
                        document.getElementById(a).setAttribute("src", this.getAttribute("src"));
                        hideElement("div.shapes-selector-column img.hidden");
                        return !1
                    });
                addEventForElements("#shapes_elements .button", "mouseover", function() {
                    showElement("#shapes_elements IMG.hidden")
                });
                addEventForElements("#shapes_elements .button", "mouseout", function() {
                    hideElement("#shapes_elements IMG.hidden")
                });
                addEventForElements("#shapes_stroke_styles .button", "mouseover", function() {
                    showElement("#shapes_stroke_styles IMG.hidden")
                });
                addEventForElements("#shapes_stroke_styles .button", "mouseout", function() {
                    hideElement("#shapes_stroke_styles IMG.hidden")
                });
                addEventForElements("#shapes_arrow .button", "mouseover", function() {
                    showElement("#shapes_arrow IMG.hidden")
                });
                addEventForElements("#shapes_arrow .button", "mouseout", function() {
                    hideElement("#shapes_arrow IMG.hidden")
                });
                addEventForElements("#shapes_colors .button",
                    "mouseover",
                    function() {
                        showElement("#shapes_colors IMG.hidden")
                    });
                addEventForElements("#shapes_colors .button", "mouseout", function() {
                    hideElement("#shapes_colors IMG.hidden")
                })
            })();
            (function() {
                document.querySelector("#left_menu_panel #close").addEventListener("click", function() {
                    l.style.left = "-10000px"
                });
                document.getElementById("left_menu_panel").addEventListener("click", function() {
                    l.style.left = "-10000px"
                });
                document.querySelector("#left_menu_panel #btn_page_main").addEventListener("click", function() {
                    window.yaCounter25937516 &&
                        window.yaCounter25937516.hit && window.yaCounter25937516.hit("&ajax_request=main", null, null);
                    BoardHelpers.showPage("main")
                }, !1);
                document.querySelector("#left_menu_panel #btn_page_animation").addEventListener("click", function() {
                    window.yaCounter25937516 && window.yaCounter25937516.hit && window.yaCounter25937516.hit("&ajax_request=create_animation", null, null);
                    BoardHelpers.showPage("animation")
                }, !1)
            })();
            (function() {
                for (var a = document.querySelectorAll("#top_buttons_panel .button"), b = 0; b < a.length; b++) a[b].addEventListener("mousedown",
                    function(a) {
                        a.preventDefault();
                        return !1
                    }, !1);
                document.getElementById("btn_animation").addEventListener("click", function() {
                    window.yaCounter25937516 && window.yaCounter25937516.hit && window.yaCounter25937516.hit("&ajax_request=create_animation", null, null);
                    BoardHelpers.showPage("animation")
                }, !1);
                document.getElementById("btn_back").addEventListener("click", function() {
                    BoardHelpers.showPage("main")
                }, !1);
                document.getElementById("btn_left_menu_panel").addEventListener("click", function(a) {
                    a.preventDefault();
                    $(l).animate({
                        left: 0
                    }, 200);
                    return !1
                }, !1)
            })();
            (function() {
                document.getElementById("btn_language").addEventListener("click", function() {
                    var a = window.location.hash.replace("#", "");
                    new ModalWindow({
                        html: '<div class="loading-image-modal-window"></div>'
                    });
                    var b = _siteUri + "&ajax_request=get_langs&board_type=" + L;
                    a && (b = b + "&anchor=" + a);
                    if (a = Session.get(b)) {
                        new ModalWindow({
                            html: a,
                            closeButton: !0
                        });
                        for (var a = document.querySelectorAll(".langs-list-flag-image"), c = 0; c < a.length; c++) a[c].style.width = 1.3 * e + "px", a[c].style.height =
                            e + "px";
                        a = document.querySelectorAll(".langs-list");
                        for (c = 0; c < a.length; c++) a[c].setAttribute("cellspacing", Math.ceil(.01 * h.width))
                    } else ajax({
                        url: b,
                        success: function(a) {
                            new ModalWindow({
                                html: a,
                                closeButton: !0
                            });
                            for (var c = document.querySelectorAll(".langs-list-flag-image"), k = 0; k < c.length; k++) c[k].style.width = 1.3 * e + "px", c[k].style.height = e + "px";
                            c = document.querySelectorAll(".langs-list");
                            for (k = 0; k < c.length; k++) c[k].setAttribute("cellspacing", Math.ceil(.01 * h.width));
                            Session.set(b, a)
                        },
                        error: function(a) {
                            console.log(a);
                            new ModalWindow({
                                html: '<span class="error-modal-window">Error</span>',
                                closeButton: !0
                            })
                        }
                    });
                    return !1
                }, !1)
            })();
            (function() {
                document.getElementById("btn_board_type").addEventListener("click", function() {
                    new ModalWindow({
                        html: '<div class="loading-image-modal-window"></div>'
                    });
                    var a = _siteUri + "&ajax_request=get_board_types&lang_key=" + _langKey,
                        b = Session.get(a);
                    if (b) {
                        new ModalWindow({
                            html: b,
                            closeButton: !0
                        });
                        for (var b = document.querySelectorAll(".board-types-list"), c = 0; c < b.length; c++) b[c].setAttribute("cellspacing",
                            Math.ceil(.01 * h.width))
                    } else ajax({
                        url: a,
                        success: function(b) {
                            new ModalWindow({
                                html: b,
                                closeButton: !0
                            });
                            for (var c = document.querySelectorAll(".board-types-list"), e = 0; e < c.length; e++) c[e].setAttribute("cellspacing", Math.ceil(.01 * h.width));
                            Session.set(a, b)
                        },
                        error: function(a) {
                            console.log(a);
                            new ModalWindow({
                                html: '<span class="error-modal-window">Error</span>',
                                closeButton: !0
                            })
                        }
                    });
                    return !1
                }, !1)
            })();
            (function() {
                document.getElementById("btn_mail").addEventListener("click", function() {
                    new ModalWindow({
                        html: '<span class="info-modal-window"><a href="mailto:' +
                            document.getElementById("param_feedback_mail").value + '">' + document.getElementById("param_feedback_mail").value + "</a></span>",
                        closeButton: !0
                    })
                }, !1)
            })();
            (function() {
                document.getElementById("btn_fullscreen").addEventListener("click", function() {
                    if (a) {
                        var b = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
                        try {
                            b.call(document)
                        } catch (A) {}
                        a = !1;
                        b = document.getElementById("btn_fullscreen_img").getAttribute("src");
                        newSrcImg = b.split("-on").join("-off");
                        document.getElementById("btn_fullscreen_img").setAttribute("src", newSrcImg);
                        return !1
                    }
                    var c = document.getElementById("main_html");
                    c.requestFullscreen ? c.requestFullscreen() : c.requestFullScreen ? c.requestFullScreen() : c.msRequestFullScreen ? c.msRequestFullScreen() : c.msRequestFullscreen ? c.msRequestFullscreen() : c.mozRequestFullScreen ? c.mozRequestFullScreen() : c.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) && c.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                    setTimeout(function() {
                        !document.webkitCurrentFullScreenElement &&
                            c.webkitRequestFullScreen && c.webkitRequestFullScreen()
                    }, 100);
                    a = !0;
                    b = document.getElementById("btn_fullscreen_img").getAttribute("src");
                    newSrcImg = b.split("-off").join("-on");
                    document.getElementById("btn_fullscreen_img").setAttribute("src", newSrcImg);
                    "touch" == AppConfig.clickType && (AppConfig.fullscreenClicked = !0)
                }, !1)
            })();
            (function() {
                document.getElementById("btn_save_image").addEventListener("click", function() {
                    _pages[_currentPage].getShapesPainter && _pages[_currentPage].getShapesPainter() && _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    saveSvgAsPng(document.getElementById("svg_canvas"), document.getElementById("param_site_name").value + ".png", {
                        heightCoeff: .05,
                        widthCoeff: .025
                    })
                }, !1)
            })();
            (function() {
                window.addEventListener("popstate", function(a) {
                    if (a.state && a.state.page && _pages[a.state.page]) {
                        var b = a.state.pageOptions || {};
                        b.add_to_history = !1;
                        BoardHelpers.showPage(a.state.page, b)
                    }
                })
            })()
        }
        var L = J.type,
            x = J.key,
            G = J.heightToWidthCoeff,
            v = J.playerToBoardWidthCoeff,
            c = .6 * v,
            h = {
                width: null,
                height: null
            },
            n = {
                bgColor: J.bgColor,
                strokeColor: J.strokeColor
            },
            e = null,
            b = null,
            m = document.getElementById("board"),
            l = document.getElementById("left_menu_panel"),
            u = null,
            a = !1;
        this.init = function() {
            document.documentElement.style.backgroundColor = J.bgColor;
            document.body.style.backgroundColor = J.bgColor;
            q();
            w();
            C();
            E()
        };
        this.refresh = function() {
            q();
            w();
            C()
        };
        this.getPlayerToBoardWidthCoeff = function() {
            return v
        };
        this.getBallToBoardWidthCoeff = function() {
            return c
        };
        this.getSize = function() {
            return h
        };
        this.getColors = function() {
            return n
        };
        this.getType = function() {
            return L
        };
        this.getKey =
            function() {
                return x
            };
        this.getContainer = function() {
            return m
        };
        this.getCanvasId = function() {
            return "svg_canvas"
        };
        this.getCanvasContainer = function() {
            u || (u = document.getElementById("svg_canvas"));
            return u
        }
    },
    Player = function(J) {
        function q(a) {
            hideElement(".context-menu");
            if (1 == _pages[_currentPage].getPlayers().lockContextMenu()) return !1;
            var b = document.querySelector("#" + a.containerID),
                f = Math.ceil(_boardObj.getSize().width * u),
                d = parseInt(k.getAttribute("cx")),
                c = parseInt(k.getAttribute("cy")),
                e = $(b).width(),
                l = b.style.borderTopWidth,
                l = parseInt(l);
            isNaN(l) && (l = 2);
            var p = b.style.paddingLeft,
                p = parseInt(p);
            isNaN(p) && (p = 3);
            d = d - Math.ceil(e / 2) - p - l;
            e = k.getAttribute("fill");
            document.querySelector("#" + a.containerID).style.background = e;
            f = Math.ceil(c + f / 2 + Math.ceil(.25 * f));
            b.style.left = d + "px";
            b.style.top = f + "px";
            b.style.display = "block";
            if (a.onMenuOpen) a.onMenuOpen(h);
            return !1
        }

        function w(a, b, f) {
            _boardObj.getSize();
            f.setAttribute("cx", a);
            f.setAttribute("cy", b)
        }

        function C(a, b, f) {
            var d = Math.ceil(_boardObj.getSize().width * u),
                c = +(a - d / 4.8).toFixed();
            1 < (n + "").length && (c = +(a - d / 2.4).toFixed());
            a = +(b + d / 4).toFixed();
            f.setAttribute("x", c + "px");
            f.setAttribute("y", a + "px")
        }

        function E(a, b, f) {
            var d = Math.ceil(_boardObj.getSize().width * u);
            a = +(a - f.getBoundingClientRect().width / 2).toFixed();
            b = +(b - d / 1.4).toFixed();
            f.setAttribute("x", a + "px");
            f.setAttribute("y", b + "px")
        }

        function L(a, b) {
            return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ?
                event.clientX + document.body.scrollTop : a.pageX
        }

        function x(a, b) {
            function f(a) {
                if (!n) {
                    var b = L(a, 1) + l - h;
                    a = L(a) + t - p;
                    a < e / 2 ? a = e / 2 : a > _boardObj.getSize().width - e / 2 && (a = _boardObj.getSize().width - e / 2);
                    b < +(2 * e).toFixed() ? b = +(2 * e).toFixed() : parseInt(k.getAttribute("cy")) - parseInt(k.getAttribute("r")) <= _boardObj.getSize().height - 1.6 * e ? b > _boardObj.getSize().height - 1.6 * e && (b = _boardObj.getSize().height - 1.6 * e) : a > .45 * _boardObj.getSize().width && (a = .45 * _boardObj.getSize().width);
                    var d = a,
                        f = b;
                    w(d, f, k);
                    C(d, f, r);
                    E(d, f, A);
                    B.left = +(a / _boardObj.getSize().width).toFixed(20);
                    B.top = +(b / _boardObj.getSize().height).toFixed(20);
                    if (c.onMove) c.onMove(m, {
                        x: +B.left,
                        y: +B.top
                    })
                }
            }

            function d(a) {
                n = 1;
                if (c.onMoveEnd) c.onMoveEnd(m, {
                    x: +B.left,
                    y: +B.top
                });
                document.removeEventListener("mousemove", f);
                document.removeEventListener("mouseup", d)
            }
            var e = Math.ceil(_boardObj.getSize().width * u),
                t = parseInt(k.getAttribute("cx")),
                l = parseInt(k.getAttribute("cy")),
                p = L(b),
                h = L(b, 1),
                n;
            document.addEventListener("mousemove", f, !1);
            document.addEventListener("mouseup",
                d, !1);
            if (c.onMoveStart) c.onMoveStart(m)
        }

        function G(a, b) {
            function f(a) {
                if (+e.changedTouches[0].clientX.toFixed(5) == +a.changedTouches[0].clientX.toFixed(5) && +e.changedTouches[0].clientY.toFixed(5) == +a.changedTouches[0].clientY.toFixed(5)) return !1;
                clearTimeout(D);
                hideElement(".context-menu");
                if (1 == _pages[_currentPage].getPlayers().lockMoving()) return !1;
                var b = a.touches[0].pageX - F.left + t - p;
                a = a.touches[0].pageY - F.top + l - h;
                b < n / 2 ? b = n / 2 : b > _boardObj.getSize().width - n / 2 && (b = _boardObj.getSize().width - n / 2);
                a < +(2 *
                    n).toFixed() ? a = +(2 * n).toFixed() : parseInt(k.getAttribute("cy")) - parseInt(k.getAttribute("r")) <= _boardObj.getSize().height - 1.6 * n ? a > _boardObj.getSize().height - 1.6 * n && (a = _boardObj.getSize().height - 1.6 * n) : b > .45 * _boardObj.getSize().width && (b = .45 * _boardObj.getSize().width);
                var d = b,
                    f = a;
                w(d, f, k);
                C(d, f, r);
                E(d, f, A);
                B.top = +(a / _boardObj.getSize().height).toFixed(20);
                B.left = +(b / _boardObj.getSize().width).toFixed(20);
                if (c.onMove) c.onMove(m, {
                    x: +B.left,
                    y: +B.top
                });
                return !1
            }

            function d() {
                clearTimeout(D);
                document.removeEventListener("touchmove",
                    f);
                document.removeEventListener("touchend", d);
                if (c.onMoveEnd) c.onMoveEnd(m, {
                    x: +B.left,
                    y: +B.top
                })
            }
            b.preventDefault();
            var e = b.originalEvent,
                t = parseInt(k.getAttribute("cx")),
                l = parseInt(k.getAttribute("cy")),
                p = e.changedTouches[0].pageX - $("#" + y).offset().left,
                h = e.changedTouches[0].pageY - $("#" + y).offset().top,
                n = Math.ceil(_boardObj.getSize().width * u),
                F = $("#" + y).offset();
            if (c.onMoveStart) c.onMoveStart(m);
            document.addEventListener("touchmove", f, !1);
            document.addEventListener("touchend", d, !1)
        }

        function v(a) {
            clearTimeout(D);
            c.contextMenu && (D = setTimeout(function() {
                q({
                    containerID: c.contextMenu.containerID,
                    onMenuOpen: c.contextMenu.onMenuOpen
                });
                return !1
            }, 750))
        }
        var c = J,
            h = this,
            n = c.number,
            e = c.name || "",
            b = c.colors,
            m = c.playerID,
            l = c.zindex || 100001,
            u = _boardObj.getPlayerToBoardWidthCoeff(),
            a = null,
            k = null,
            r = null,
            A = null,
            B = c.playerPositionRelations,
            D = null,
            y = _boardObj.getCanvasId();
        (function() {
            a = $(document.getElementById(m));
            a.show();
            k = document.getElementById(m + "_shape");
            r = document.getElementById(m + "_number");
            r.textContent = n;
            A = document.getElementById(m +
                "_name");
            A.textContent = e;
            var F = Math.ceil(_boardObj.getSize().width * u),
                t = +(_boardObj.getSize().width * B.left).toFixed(),
                f = +(_boardObj.getSize().height * B.top).toFixed(),
                d = +(.67 * F).toFixed();
            8 > d && (d = 8);
            var y = Math.ceil(d / 1.25),
                F = Math.ceil(F / 2);
            w(t, f, k);
            k.setAttribute("fill", b.background);
            k.setAttribute("r", F);
            r.setAttribute("font-size", d + "px");
            r.setAttribute("fill", b.font);
            C(t, f, r);
            A.setAttribute("font-size", y + "px");
            A.setAttribute("fill", "#000000");
            E(t, f, A);
            if ("touch" == AppConfig.clickType) a.on("click",
                function(a) {
                    clearTimeout(D)
                }), a.on("touchstart", function(b) {
                v(b);
                _pages[_currentPage].getShapesPainter && _pages[_currentPage].getShapesPainter() && _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                hideElement(".context-menu");
                if (1 == _pages[_currentPage].getPlayers().lockMoving()) return !1;
                var d = _pages[_currentPage].getPlayers().getMaxZindex();
                d > l && (d++, _pages[_currentPage].getPlayers().setMaxZindex(d), h.setZindex(d));
                d = document.getElementById("players_section").lastElementChild;
                a.insertAfter($(d));
                G($(this), b);
                return !1
            });
            else if (a.on("mousedown", function(b) {
                    _pages[_currentPage].getShapesPainter && _pages[_currentPage].getShapesPainter() && _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    hideElement(".context-menu");
                    if (1 == _pages[_currentPage].getPlayers().lockMoving()) return !1;
                    var d = _pages[_currentPage].getPlayers().getMaxZindex();
                    d > l && (d++, _pages[_currentPage].getPlayers().setMaxZindex(d), h.setZindex(d));
                    d = document.getElementById("players_section").lastElementChild;
                    a.insertAfter($(d));
                    x(document.getElementById(m), b);
                    return !1
                }), c.contextMenu) a.on("contextmenu", function(a) {
                a.preventDefault();
                q({
                    containerID: c.contextMenu.containerID,
                    onMenuOpen: c.contextMenu.onMenuOpen
                });
                return !1
            })
        })();
        h.refresh = function(b) {
            if (a) {
                var c = Math.ceil(_boardObj.getSize().width * u);
                b = +(_boardObj.getSize().width * B.left).toFixed();
                var f = +(_boardObj.getSize().height * B.top).toFixed(),
                    d = +(.67 * c).toFixed();
                8 > d && (d = 8);
                var e = Math.ceil(d / 1.25),
                    c = +(c / 2).toFixed();
                k.setAttribute("r", c);
                w(b, f, k);
                r.setAttribute("font-size",
                    d + "px");
                C(b, f, r);
                A.setAttribute("font-size", e + "px");
                E(b, f, A)
            }
        };
        h.setPosition = function(a) {
            B = a.playerPositionRelations;
            a = Math.ceil(_boardObj.getSize().width * B.left);
            var b = Math.ceil(_boardObj.getSize().height * B.top);
            w(a, b, k);
            C(a, b, r);
            E(a, b, A)
        };
        h.setNumber = function(a) {
            n = a;
            r.textContent = n;
            _boardObj.getSize();
            a = parseInt(k.getAttribute("cx"));
            var b = parseInt(k.getAttribute("cy"));
            C(a, b, r);
            if (a = document.getElementById("anim_clone_" + m + "_number")) {
                var f = document.getElementById("anim_clone_" + m + "_shape");
                a.textContent =
                    n;
                b = parseInt(f.getAttribute("cx"));
                f = parseInt(f.getAttribute("cy"));
                C(b, f, a)
            }
        };
        h.setName = function(a) {
            e = a;
            A.textContent = e;
            a = parseInt(k.getAttribute("cx"));
            var b = parseInt(k.getAttribute("cy"));
            E(a, b, A);
            if (a = document.getElementById("anim_clone_" + m + "_name")) {
                var f = document.getElementById("anim_clone_" + m + "_shape");
                a.textContent = e;
                b = parseInt(f.getAttribute("cx"));
                f = parseInt(f.getAttribute("cy"));
                E(b, f, a)
            }
        };
        h.createClone = function(b, c) {
            var f = $(a).clone();
            var d = b + m;
            f.insertBefore("#" + m);
            f.attr("id", d);
            for (var d =
                    document.getElementById(d).childNodes, e = 0; e < d.length; e++) {
                var t = null;
                d[e].getAttribute && (t = d[e].getAttribute("id"));
                t && d[e].setAttribute("id", b + t)
            }
            f.attr("opacity", "0.5");
            f.removeClass("svg-player-shape");
            f = document.getElementById(b + m + "_shape");
            f.style.cursor = "default";
            if (void 0 !== c) {
                f = document.getElementById(b + m + "_shape");
                d = document.getElementById(b + m + "_name");
                e = document.getElementById(b + m + "_number");
                _boardObj.getSize();
                var t = c.x * _boardObj.getSize().width,
                    k = c.y * _boardObj.getSize().height;
                w(t, k, f);
                C(t, k, e);
                E(t, k, d)
            }
        };
        h.getPositionRelations = function() {
            return B
        };
        h.getInfo = function() {
            return {
                nmb: n,
                nm: e,
                zi: l,
                pos: {
                    x: +(+B.left).toFixed(8),
                    y: +(+B.top).toFixed(8)
                }
            }
        };
        h.getId = function() {
            return m
        };
        h.getNumber = function() {
            return n
        };
        h.getName = function() {
            return e
        };
        h.getZindex = function() {
            return l
        };
        h.setZindex = function(a) {
            l = a
        }
    },
    Ball = function(J) {
        function q(a) {
            hideElement(".context-menu");
            if (1 == _pages[_currentPage].getBalls().lockContextMenu()) return !1;
            var b = document.querySelector("#" + a.containerID),
                e = Math.ceil(_boardObj.getSize().width *
                    m),
                k = parseInt(u.getAttribute("cx")),
                t = parseInt(u.getAttribute("cy")),
                f = $(b).width(),
                d = b.style.borderTopWidth,
                d = parseInt(d);
            isNaN(d) && (d = 2);
            var l = b.style.paddingLeft,
                l = parseInt(l);
            isNaN(l) && (l = 3);
            k = k - Math.ceil(f / 2) - l - d;
            f = u.getAttribute("fill");
            document.querySelector("#" + a.containerID).style.background = f;
            e = Math.ceil(t + e / 2 + Math.ceil(.25 * e));
            b.style.left = k + "px";
            b.style.top = e + "px";
            b.style.display = "block";
            if (a.onMenuOpen) a.onMenuOpen(c);
            return !1
        }

        function w(a, b, c) {
            _boardObj.getSize();
            c.setAttribute("cx",
                a);
            c.setAttribute("cy", b)
        }

        function C(a, b, c) {
            var e = Math.ceil(_boardObj.getSize().width * m);
            a = +(a - c.getBoundingClientRect().width / 2).toFixed();
            b = +(b - e / 1.3).toFixed();
            c.setAttribute("x", a + "px");
            c.setAttribute("y", b + "px")
        }

        function E(a, b) {
            return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
        }

        function L(b, c) {
            function l(b) {
                if (!B) {
                    var c =
                        E(b, 1) + d - n;
                    b = E(b) + f - r;
                    b < t / 2 ? b = t / 2 : b > _boardObj.getSize().width - t / 2 && (b = _boardObj.getSize().width - t / 2);
                    c < +(3 * t).toFixed() ? c = +(3 * t).toFixed() : parseInt(u.getAttribute("cy")) - parseInt(u.getAttribute("r")) <= _boardObj.getSize().height - 3 * t ? c > _boardObj.getSize().height - 3 * t && (c = _boardObj.getSize().height - 3 * t) : b > .45 * _boardObj.getSize().width && (b = .45 * _boardObj.getSize().width);
                    var p = b,
                        l = c;
                    w(p, l, u);
                    C(p, l, a);
                    k.left = +(b / _boardObj.getSize().width).toFixed(20);
                    k.top = +(c / _boardObj.getSize().height).toFixed(20);
                    if (v.onMove) v.onMove(e, {
                        x: +k.left,
                        y: +k.top
                    })
                }
            }

            function h(a) {
                B = 1;
                if (v.onMoveEnd) v.onMoveEnd(e, {
                    x: +k.left,
                    y: +k.top
                });
                document.removeEventListener("mousemove", l);
                document.removeEventListener("mouseup", h)
            }
            var t = Math.ceil(_boardObj.getSize().width * m),
                f = parseInt(u.getAttribute("cx")),
                d = parseInt(u.getAttribute("cy")),
                r = E(c),
                n = E(c, 1),
                B;
            document.addEventListener("mousemove", l, !1);
            document.addEventListener("mouseup", h, !1);
            if (v.onMoveStart) v.onMoveStart(e)
        }

        function x(b, c) {
            function l(b) {
                if (+t.changedTouches[0].clientX.toFixed(5) ==
                    +b.changedTouches[0].clientX.toFixed(5) && +t.changedTouches[0].clientY.toFixed(5) == +b.changedTouches[0].clientY.toFixed(5)) return !1;
                clearTimeout(r);
                hideElement(".context-menu");
                if (1 == _pages[_currentPage].getBalls().lockMoving()) return !1;
                var c = b.touches[0].pageX - p.left + f - n;
                b = b.touches[0].pageY - p.top + d - B;
                c < K / 2 ? c = K / 2 : c > _boardObj.getSize().width - K / 2 && (c = _boardObj.getSize().width - K / 2);
                b < +(3 * K).toFixed() ? b = +(3 * K).toFixed() : parseInt(u.getAttribute("cy")) - parseInt(u.getAttribute("r")) <= _boardObj.getSize().height -
                    3 * K ? b > _boardObj.getSize().height - 3 * K && (b = _boardObj.getSize().height - 3 * K) : c > .45 * _boardObj.getSize().width && (c = .45 * _boardObj.getSize().width);
                var l = c,
                    h = b;
                w(l, h, u);
                C(l, h, a);
                k.top = +(b / _boardObj.getSize().height).toFixed(20);
                k.left = +(c / _boardObj.getSize().width).toFixed(20);
                if (v.onMove) v.onMove(e, {
                    x: +k.left,
                    y: +k.top
                });
                return !1
            }

            function h() {
                clearTimeout(r);
                document.removeEventListener("touchmove", l);
                document.removeEventListener("touchend", h);
                if (v.onMoveEnd) v.onMoveEnd(e, {
                    x: +k.left,
                    y: +k.top
                })
            }
            c.preventDefault();
            var t = c.originalEvent,
                f = parseInt(u.getAttribute("cx")),
                d = parseInt(u.getAttribute("cy")),
                n = t.changedTouches[0].pageX - $("#" + A).offset().left,
                B = t.changedTouches[0].pageY - $("#" + A).offset().top,
                K = Math.ceil(_boardObj.getSize().width * m),
                p = $("#" + A).offset();
            if (v.onMoveStart) v.onMoveStart(e);
            document.addEventListener("touchmove", l, !1);
            document.addEventListener("touchend", h, !1)
        }

        function G(a) {
            clearTimeout(r);
            v.contextMenu && (r = setTimeout(function() {
                q({
                    containerID: v.contextMenu.containerID,
                    onMenuOpen: v.contextMenu.onMenuOpen
                });
                return !1
            }, 750))
        }
        var v = J,
            c = this,
            h = v.name || "",
            n = v.colors,
            e = v.ballID,
            b = v.zindex || 10000001,
            m = _boardObj.getBallToBoardWidthCoeff(),
            l = null,
            u = null,
            a = null,
            k = v.ballPositionRelations,
            r = null,
            A = _boardObj.getCanvasId();
        (function() {
            l = $(document.getElementById(e));
            l.show();
            var h = Math.ceil(_boardObj.getSize().width * m),
                A = +(_boardObj.getSize().width * k.left).toFixed(),
                y = +(_boardObj.getSize().height * k.top).toFixed(),
                F = +(1.1 * h).toFixed();
            8 > F && (F = 8);
            F = Math.ceil(F / 1.25);
            h = Math.ceil(h / 2);
            u = document.getElementById(e + "_shape");
            w(A, y, u);
            u.setAttribute("fill", n.background);
            u.setAttribute("r", h);
            a = document.getElementById(e + "_name");
            a.setAttribute("font-size", F + "px");
            a.setAttribute("fill", "#000000");
            C(A, y, a);
            if ("touch" == AppConfig.clickType) l.on("click", function(a) {
                clearTimeout(r)
            }), l.on("touchstart", function(a) {
                G(a);
                _pages[_currentPage].getShapesPainter && _pages[_currentPage].getShapesPainter() && _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                hideElement(".context-menu");
                if (1 == _pages[_currentPage].getBalls().lockMoving()) return !1;
                var f = _pages[_currentPage].getBalls().getMaxZindex();
                f > b && (f++, _pages[_currentPage].getBalls().setMaxZindex(f), c.setZindex(f));
                f = document.getElementById("balls_section").lastElementChild;
                l.insertAfter($(f));
                x($(this), a);
                return !1
            });
            else if (l.on("mousedown", function(a) {
                    _pages[_currentPage].getShapesPainter && _pages[_currentPage].getShapesPainter() && _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    hideElement(".context-menu");
                    if (1 == _pages[_currentPage].getBalls().lockMoving()) return !1;
                    var f = _pages[_currentPage].getBalls().getMaxZindex();
                    f > b && (f++, _pages[_currentPage].getBalls().setMaxZindex(f), c.setZindex(f));
                    f = document.getElementById("balls_section").lastElementChild;
                    l.insertAfter($(f));
                    L(document.getElementById(e), a);
                    return !1
                }), v.contextMenu) l.on("contextmenu", function(a) {
                a.preventDefault();
                q({
                    containerID: v.contextMenu.containerID,
                    onMenuOpen: v.contextMenu.onMenuOpen
                });
                return !1
            })
        })();
        c.refresh = function(b) {
            if (l) {
                var c = Math.ceil(_boardObj.getSize().width * m);
                b = +(_boardObj.getSize().width *
                    k.left).toFixed();
                var e = +(_boardObj.getSize().height * k.top).toFixed(),
                    h = +(1.1 * c).toFixed();
                8 > h && (h = 8);
                h = Math.ceil(h / 1.25);
                c = +(c / 2).toFixed();
                u.setAttribute("r", c);
                w(b, e, u);
                a.setAttribute("font-size", h + "px");
                C(b, e, a)
            }
        };
        c.setPosition = function(b) {
            k = b.ballPositionRelations;
            b = Math.ceil(_boardObj.getSize().width * k.left);
            var c = Math.ceil(_boardObj.getSize().height * k.top);
            w(b, c, u);
            C(b, c, a)
        };
        c.setName = function(b) {
            h = b;
            a.textContent = h;
            b = parseInt(u.getAttribute("cx"));
            var c = parseInt(u.getAttribute("cy"));
            C(b,
                c, a);
            if (b = document.getElementById("anim_clone_" + e + "_name")) {
                var k = document.getElementById("anim_clone_" + e + "_shape");
                b.textContent = h;
                c = parseInt(k.getAttribute("cx"));
                k = parseInt(k.getAttribute("cy"));
                C(c, k, b)
            }
        };
        c.createClone = function(a, b) {
            var c = $(l).clone();
            var k = a + e;
            c.insertBefore("#" + e);
            c.attr("id", k);
            for (var k = document.getElementById(k).childNodes, t = 0; t < k.length; t++) {
                var f = null;
                k[t].getAttribute && (f = k[t].getAttribute("id"));
                f && k[t].setAttribute("id", a + f)
            }
            c.attr("opacity", "0.5");
            c = document.getElementById(a +
                e + "_shape");
            c.style.cursor = "default";
            void 0 !== b && (c = document.getElementById(a + e + "_shape"), k = document.getElementById(a + e + "_name"), _boardObj.getSize(), t = b.x * _boardObj.getSize().width, f = b.y * _boardObj.getSize().height, w(t, f, c), C(t, f, k))
        };
        c.getPositionRelations = function() {
            return k
        };
        c.getInfo = function() {
            return {
                nm: h,
                zi: b,
                pos: {
                    x: +(+k.left).toFixed(8),
                    y: +(+k.top).toFixed(8)
                }
            }
        };
        c.getId = function() {
            return e
        };
        c.getName = function() {
            return h
        };
        c.getZindex = function() {
            return b
        };
        c.setZindex = function(a) {
            b = a
        }
    },
    Players =
    function(J) {
        function q(c) {
            if (c) {
                var h = [];
                for (n in c) c.hasOwnProperty(n) && C[n] && c[n].pos && (c[n].id = n, h.push(c[n]));
                h.sort(function(b, c) {
                    if (!b.zi) return -1;
                    if (!c.zi) return 1;
                    if (b.zi < c.zi) return -1;
                    if (b.zi > c.zi) return 1
                });
                for (c = 0; c < h.length; c++) {
                    var n = h[c].id;
                    C[n].setPosition({
                        playerPositionRelations: {
                            left: h[c].pos.x,
                            top: h[c].pos.y
                        }
                    });
                    void 0 !== h[c].nmb && C[n].setNumber(h[c].nmb);
                    void 0 !== h[c].nm && C[n].setName(h[c].nm);
                    void 0 !== h[c].zi && (C[n].setZindex(h[c].zi), h[c].zi > x && (x = h[c].zi));
                    var e = document.getElementById("players_section").lastElementChild;
                    $("#" + n).insertAfter($(e))
                }
            }
        }
        var w = J || {},
            C = {},
            E = {},
            L = 100001,
            x = L,
            G = !1,
            v = !1;
        (function() {
            for (var c = _boardObj.getSize().width * _boardObj.getPlayerToBoardWidthCoeff(), h = +(_boardObj.getSize().height - .6 * c).toFixed(), n = 0; n < AppConfig.playersColors.length; n++)
                for (var e = AppConfig.playersCount; 0 < e; e--) {
                    var b = _currentPage + "_player_" + e + "_" + (parseInt(n) + 1),
                        m = {};
                    m.colors = AppConfig.playersColors[n];
                    m.playerID = b;
                    m.number = e;
                    m.name = "";
                    m.zindex = L++;
                    var l = Math.ceil(n * c) + Math.ceil(c / 3) * n;
                    l = l + .33333 * c / 1.75 + .0636 * _boardObj.getSize().width +
                        .5 * c;
                    l = Math.ceil(l);
                    l = {
                        top: +(h / _boardObj.getSize().height).toFixed(20),
                        left: +(l / _boardObj.getSize().width).toFixed(20)
                    };
                    m.playerPositionRelations = l;
                    w.onPlayerMoveStart && (m.onMoveStart = w.onPlayerMoveStart);
                    w.onPlayerMove && (m.onMove = w.onPlayerMove);
                    w.onPlayerMoveEnd && (m.onMoveEnd = w.onPlayerMoveEnd);
                    w.contextMenu && (m.contextMenu = w.contextMenu);
                    C[b] = new Player(m);
                    E[b] = {};
                    E[b].top = l.top;
                    E[b].left = l.left;
                    E[b].number = e;
                    E[b].zindex = m.zindex
                }
            x = L + 1
        })();
        this.show = function() {
            showElement('[id^="' + _currentPage +
                '_player_"]')
        };
        this.hide = function() {
            hideElement('[id^="' + _currentPage + '_player_"]')
        };
        this.refresh = function() {
            for (var c in C) C.hasOwnProperty(c) && C[c].refresh && C[c].refresh()
        };
        this.getPlayerInfo = function(c) {
            return C[c].getInfo()
        };
        this.restore = function(c) {
            q(c)
        };
        this.reset = function(c) {
            c = c || {};
            if (c.player_id) return C[c.player_id].setPosition({
                playerPositionRelations: {
                    left: E[c.player_id].left,
                    top: E[c.player_id].top
                }
            }), C[c.player_id].setNumber(E[c.player_id].number), C[c.player_id].setName(""), C[c.player_id].setZindex(E[c.player_id].zindex), !0;
            x = 0;
            for (var h in C) C.hasOwnProperty(h) && (C[h].setPosition({
                playerPositionRelations: {
                    left: E[h].left,
                    top: E[h].top
                }
            }), C[h].setNumber(E[h].number), C[h].setName(""), C[h].setZindex(E[h].zindex)), E[h].zindex > x && (x = E[h].zindex)
        };
        this.setMaxZindex = function(c) {
            x = c
        };
        this.getMaxZindex = function() {
            return x
        };
        this.lockMoving = function(c) {
            if (void 0 === c) return G;
            G = c;
            return G = !!G
        };
        this.lockContextMenu = function(c) {
            if (void 0 === c) return v;
            v = c;
            return v = !!v
        };
        this.setPlayerPosition = function(c, h) {
            C[c].setPosition(h)
        };
        this.setPlayerNumber =
            function(c, h) {
                C[c].setNumber(h)
            };
        this.setPlayerName = function(c, h) {
            C[c].setName(h)
        };
        this.createPlayerClone = function(c, h, n) {
            C[c].createClone(h, n)
        }
    },
    Balls = function(J) {
        function q(c) {
            var h = [];
            for (n in c) c.hasOwnProperty(n) && C[n] && c[n].pos && (c[n].id = n, h.push(c[n]));
            h.sort(function(b, c) {
                if (!b.zi) return -1;
                if (!c.zi) return 1;
                if (b.zi < c.zi) return -1;
                if (b.zi > c.zi) return 1
            });
            for (c = 0; c < h.length; c++) {
                var n = h[c].id;
                C[n].setPosition({
                    ballPositionRelations: {
                        left: h[c].pos.x,
                        top: h[c].pos.y
                    }
                });
                void 0 !== h[c].nm && C[n].setName(h[c].nm);
                void 0 !== h[c].zi && (C[n].setZindex(h[c].zi), h[c].zi > x && (x = h[c].zi));
                var e = document.getElementById("balls_section").lastElementChild;
                $("#" + n).insertAfter($(e))
            }
        }
        var w = J || {},
            C = {},
            E = {},
            L = 10000001,
            x = L,
            G = !1,
            v = !1;
        (function() {
            for (var c = _boardObj.getSize().width * _boardObj.getBallToBoardWidthCoeff(), h = +(_boardObj.getSize().height - .6 * c).toFixed(), n = _boardObj.getSize().width * _boardObj.getPlayerToBoardWidthCoeff(), n = AppConfig.playersColors.length * (n + Math.ceil(n / 3)) + Math.ceil(c) + .0636 * _boardObj.getSize().width,
                    e = 0; e < AppConfig.ballsColors.length; e++)
                for (var b = AppConfig.ballsCount; 0 < b; b--) {
                    var m = _currentPage + "_ball_" + b + "_" + (parseInt(e) + 1),
                        l = {};
                    l.colors = AppConfig.ballsColors[e];
                    l.ballID = m;
                    l.name = "";
                    l.zindex = L++;
                    var u = Math.ceil(n + e * c + c / 3 * e);
                    u = Math.ceil(u);
                    u = {
                        top: +(h / _boardObj.getSize().height).toFixed(20),
                        left: +(u / _boardObj.getSize().width).toFixed(20)
                    };
                    l.ballPositionRelations = u;
                    w.onBallMoveStart && (l.onMoveStart = w.onBallMoveStart);
                    w.onBallMove && (l.onMove = w.onBallMove);
                    w.onBallMoveEnd && (l.onMoveEnd = w.onBallMoveEnd);
                    w.contextMenu && (l.contextMenu = w.contextMenu);
                    C[m] = new Ball(l);
                    E[m] = {};
                    E[m].top = u.top;
                    E[m].left = u.left;
                    E[m].zindex = l.zindex
                }
            x = L + 1
        })();
        this.show = function() {
            showElement('[id^="' + _currentPage + '_ball_"]')
        };
        this.hide = function() {
            hideElement('[id^="' + _currentPage + '_ball_"]')
        };
        this.refresh = function() {
            for (var c in C) C.hasOwnProperty(c) && C[c].refresh()
        };
        this.getBallInfo = function(c) {
            return C[c].getInfo()
        };
        this.restore = function(c) {
            q(c)
        };
        this.reset = function(c) {
            c = c || {};
            if (c.ball_id) return C[c.ball_id].setPosition({
                ballPositionRelations: {
                    left: E[c.ball_id].left,
                    top: E[c.ball_id].top
                }
            }), C[c.ball_id].setName(""), C[c.ball_id].setZindex(E[c.ball_id].zindex), !0;
            x = 0;
            for (var h in C) C.hasOwnProperty(h) && (C[h].setPosition({
                ballPositionRelations: {
                    left: E[h].left,
                    top: E[h].top
                }
            }), C[h].setName(""), C[h].setZindex(E[h].zindex)), !E[h].zindex > x && (x = E[h].zindex)
        };
        this.setMaxZindex = function(c) {
            x = c
        };
        this.getMaxZindex = function() {
            return x
        };
        this.lockMoving = function(c) {
            if (void 0 === c) return G;
            G = c;
            return G = !!G
        };
        this.lockContextMenu = function(c) {
            if (void 0 === c) return v;
            v = c;
            return v = !!v
        };
        this.setBallPosition = function(c, h) {
            C[c].setPosition(h)
        };
        this.setBallName = function(c, h) {
            C[c].setName(h)
        };
        this.createBallClone = function(c, h, n) {
            C[c].createClone(h, n)
        }
    },
    ShapesPainter = function(J) {
        function q() {
            var a = [];
            $.each(e, function(b, d) {
                var c = d.getStoreInfo();
                a.push(c)
            });
            return a
        }

        function w(a) {
            $.each(a, function(a, b) {
                var d = Shapes.Factory(b.t, {
                    onChanged: v.onShapeChanged
                });
                if (d) {
                    var c = {
                        canvas_element_id: h,
                        stroke_width: C(d)
                    };
                    d.create(c);
                    d.restore({
                        points_positions_relations: b.ppr,
                        stroke_style: b.ss,
                        arrow: b.a,
                        stroke_color: b.sc,
                        fill_color: b.fc
                    });
                    d.draw();
                    e.push(d)
                }
            })
        }

        function C(a) {
            var b = l;
            a && a.getStrokeWidthToBoardCoeff && (b = _boardObj.getSize().width * a.getStrokeWidthToBoardCoeff());
            return b = Math.ceil(b)
        }

        function E() {
            "touch" == AppConfig.clickType ? n.addEventListener("touchstart", L, !1) : n.addEventListener("mousedown", L, !1)
        }

        function L(e) {
            c.removeAdditionalShapes();
            if (B) {
                hideElement(".context-menu");
                y = !1;
                if (e.touches && 1 != e.touches.length) return !0;
                e.preventDefault();
                if (e.touches) {
                    var f = e.touches[0].pageX - $("#" +
                        h).offset().left;
                    e = e.touches[0].pageY - $("#" + h).offset().top
                } else {
                    if (1 !== e.which) return !0;
                    f = e.pageX - $("#" + h).offset().left;
                    e = e.pageY - $("#" + h).offset().top
                }
                if (b = Shapes.Factory(m, {
                        onChanged: v.onShapeChanged
                    })) f = {
                    canvas_element_id: h,
                    left: f,
                    top: e,
                    stroke_color: r,
                    stroke_width: C(b),
                    stroke_style: u,
                    arrow: a,
                    fill_color: k
                }, b.create(f);
                else return !0;
                D = !1;
                "touch" == AppConfig.clickType ? (document.addEventListener("touchmove", G, !1), document.addEventListener("touchend", x, !1)) : (document.addEventListener("mousemove", G, !1), document.addEventListener("mouseup", x, !1))
            }
        }

        function x() {
            if (!D) {
                D = !0;
                if (b) {
                    if (!y || b.isValid && !b.isValid()) return b.remove(), y = !1, !0;
                    b.afterCreated();
                    e.push(b);
                    if (v.onShapeAdded) v.onShapeAdded(b)
                }
                "touch" == AppConfig.clickType ? (document.removeEventListener("touchmove", G), document.removeEventListener("touchend", x)) : (document.removeEventListener("mousemove", G), document.removeEventListener("mouseup", x));
                y = !1
            }
        }

        function G(a) {
            if (!D) {
                "touch" != AppConfig.clickType && a.preventDefault();
                if (a.touches) {
                    var c =
                        a.touches[0].pageX - $("#" + h).offset().left;
                    a = a.touches[0].pageY - $("#" + h).offset().top
                } else c = a.pageX - $("#" + h).offset().left, a = a.pageY - $("#" + h).offset().top;
                b && b.creating({
                    left: c,
                    top: a
                });
                y = !0
            }
        }
        var v = J || {},
            c = this;
        document.getElementById("board");
        var h = _boardObj.getCanvasId(),
            n = _boardObj.getCanvasContainer(),
            e = [],
            b = null,
            m = null,
            l = Math.ceil(.0017456 * _boardObj.getSize().width),
            u = null,
            a = null,
            k = AppConfig.shapesColors[0].fill,
            r = AppConfig.shapesColors[0].stroke,
            A = 0,
            B = !1,
            D = !0,
            y = !1,
            F = !1,
            h = _boardObj.getCanvasId(),
            n = _boardObj.getCanvasContainer();
        E();
        c.refresh = function(a) {
            document.getElementById("shapes_1_section").textContent = "";
            document.getElementById("shapes_2_section").textContent = "";
            l = Math.ceil(.0017456 * _boardObj.getSize().width);
            n = _boardObj.getCanvasContainer();
            E();
            a = {
                stroke_width: l
            };
            for (var b = 0; b < e.length; b++) a.stroke_width = C(e[b]), e[b].draw(a)
        };
        c.hide = function() {
            removeElement('[id^="svg_shape_"]');
            removeElement(".svg-shape-arrow");
            c.removeAdditionalShapes();
            hideElement(".context-menu");
            "touch" == AppConfig.clickType ?
                n.removeEventListener("touchstart", L) : n.removeEventListener("mousedown", L);
            B = !1;
            document.querySelector("#" + h).style.cursor = "default"
        };
        c.getInfo = function() {
            return q()
        };
        c.getStrokeWidthToBoardCoeff = function() {
            return .0017456
        };
        c.restore = function(a) {
            w(a)
        };
        c.enable = function() {
            if (m && "null" != m) {
                B = !0;
                //var a = _siteUri + "Public/Images/cursors/pencil.png";
                document.querySelector("#" + h).style.cursor = 'url("' + a + '"), default'
            }
        };
        c.disable = function() {
            B = !1;
            document.querySelector("#" + h).style.cursor = "default"
        };
        c.lockShapesFocusing =
            function(a) {
                for (var b = 0; b < e.length; b++) e[b].lockFocusing(a)
            };
        c.lockShapesChanging = function(a) {
            for (var b = 0; b < e.length; b++) e[b].lockChanging(a)
        };
        c.lockContextMenu = function(a) {
            if (void 0 === a) return F;
            F = a;
            return F = !!F
        };
        c.clean = function(a) {
            for (a = 0; a < e.length; a++) e[a].remove();
            removeElement(".svg-shape-arrow");
            c.removeAdditionalShapes();
            hideElement(".context-menu");
            e = []
        };
        c.removeLastShape = function() {
            if (0 == e.length) return !1;
            var a = e.length - 1;
            if (v.onShapeBeforeRemoved) v.onShapeBeforeRemoved(e[a]);
            e[a].remove();
            e.length = a;
            c.removeAdditionalShapes();
            hideElement(".context-menu");
            if (v.onShapeRemoved) v.onShapeRemoved()
        };
        c.removeShape = function(a) {
            for (var b = 0; b < e.length; b++)
                if (e[b].getId() == a) {
                    if (v.onShapeBeforeRemoved) v.onShapeBeforeRemoved(e[b]);
                    e[b].remove();
                    c.removeAdditionalShapes();
                    hideElement(".context-menu");
                    e.splice(b, 1);
                    if (v.onShapeRemoved) v.onShapeRemoved();
                    break
                }
        };
        c.setShapeType = function(a) {
            (m = a) && "null" != a ? (B = !0, a = "", document.querySelector("#" + h).style.cursor =
                'url("' + a + '"), default') : (B = !1, document.querySelector("#" + h).style.cursor = "default")
        };
        c.setStrokeStyle = function(a) {
            u = a
        };
        c.setArrow = function(b) {
            a = b
        };
        c.setColor = function(a) {
            k = AppConfig.shapesColors[a].fill;
            r = AppConfig.shapesColors[a].stroke;
            A = a
        };
        c.removeAdditionalShapes = function() {
            removeElement(".svg-shape-shadow");
            removeElement('[id^="svg_node_shape_"]')
        };
        c.shapeContextMenu = function(a, b) {
            if (F || !v.contextMenu) return !1;
            hideElement(".context-menu");
            var d = Math.ceil(.015 * _boardObj.getSize().width);
            8 > d &&
                (d = 8);
            var c = document.querySelector("#" + v.contextMenu.containerID);
            c.style.fontSize = d + "px";
            if ("touch" == AppConfig.clickType) {
                var f = a.originalEvent;
                d = f.changedTouches[0].pageX - $("#" + v.contextMenu.containerID).width() / 2;
                f = f.changedTouches[0].pageY + $("#" + v.contextMenu.containerID).height() / 2
            } else f = 0, document.body && document.body.scrollTop ? f = document.body.scrollTop : document.documentElement && document.documentElement.scrollTop && (f = document.documentElement.scrollTop), d = a.pageX - $("#" + v.contextMenu.containerID).width() /
                2, f = a.pageY - f + $("#" + v.contextMenu.containerID).height() / 2;
            c.style.left = d + "px";
            c.style.top = f + "px";
            if (v.contextMenu.onMenuOpen) v.contextMenu.onMenuOpen(b);
            c.style.display = "block";
            return !1
        };
        c.shapeKeyDownEvent = function(a) {
            $(document).off("keydown.remove_shape");
            $(document).on("keydown.remove_shape", function(b) {
                if (1 == $("#shadow_" + a).length && 46 == b.keyCode) {
                    for (b = 0; b < e.length; b++)
                        if (e[b].getId() == a) {
                            if (v.onShapeBeforeRemoved) v.onShapeBeforeRemoved(e[b]);
                            e[b].remove();
                            c.removeAdditionalShapes();
                            hideElement(".context-menu");
                            e.splice(b, 1);
                            if (v.onShapeRemoved) v.onShapeRemoved();
                            break
                        }
                    $(document).off("keydown.remove_shape")
                }
            })
        };
        c.addShape = function(a) {
            e.push(a)
        };
        c.refreshPanelButtons = function() {
            var b = document.querySelector("#shape_shapeType"),
                f = "shape_shapeType_null";
            m && (f = "shape_shapeType_" + m);
            b.setAttribute("src", document.querySelector("#" + f).getAttribute("src"));
            c.disable();
            m && c.enable();
            b = document.querySelector("#shape_strokeStyle");
            f = "shape_strokeStyle_solid";
            u && (f = "shape_strokeStyle_" + u);
            b.setAttribute("src", document.querySelector("#" +
                f).getAttribute("src"));
            b = document.querySelector("#shape_arrow");
            f = "shape_arrow_none";
            a && (f = "shape_arrow_" + a);
            b.setAttribute("src", document.querySelector("#" + f).getAttribute("src"));
            b = document.querySelector("#shape_color");
            f = "shape_color_0";
            A && (f = "shape_color_" + A);
            b.setAttribute("src", document.querySelector("#" + f).getAttribute("src"))
        }
    },
    Shapes = {
        Factory: function(J, q) {
            switch (J) {
                case "line":
                    return new Shapes.Line(q);
                case "pencil":
                    return new Shapes.Pencil(q);
                case "arrow":
                    return new Shapes.Arrow(q);
                case "rectangle":
                    return new Shapes.Rectangle(q);
                case "polygon":
                    return new Shapes.Polygon(q);
                case "ellipse":
                    return new Shapes.Ellipse(q);
                case "curve-line":
                    return new Shapes.CurveLine(q);
                default:
                    return null
            }
        },
        Pencil: function(J) {
            function q() {
                if (U) return !1;
                var a = document.getElementById("shapes_2_section").lastElementChild;
                b.insertAfter($(a));
                m.insertBefore(b);
                $.each(k, function(a, b) {
                    b.insertAfter($("#" + e))
                });
                E();
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(e)
            }

            function w(a) {
                var d = null;
                b.attr("points") && (d = b.attr("points").split(" "));
                if (!(d &&
                        3 < d.length)) return !1;
                if ("start" == a) {
                    var f = +d[3].split(",")[0];
                    var p = +d[3].split(",")[1];
                    var h = +d[0].split(",")[0];
                    var z = +d[0].split(",")[1]
                } else "end" == a && (f = +d[d.length - 3].split(",")[0], p = +d[d.length - 3].split(",")[1], h = +d[d.length - 1].split(",")[0], z = +d[d.length - 1].split(",")[1]);
                var I = Math.sqrt(Math.pow(f - h, 2) + Math.pow(p - z, 2)) / r;
                if (0 == I) return !1;
                var d = h,
                    fa = z;
                0 != I && (h = (h * (1 + I) - f) / I, z = (z * (1 + I) - p) / I);
                f = d;
                p = fa;
                var I = d + r / 3 / Math.sqrt(1 + Math.pow((f - h) / (p - z), 2)),
                    Z = fa - r / 3 / Math.sqrt(1 + Math.pow((p - z) / (f - h),
                        2)),
                    N = d - r / 3 / Math.sqrt(1 + Math.pow((f - h) / (p - z), 2)),
                    O = fa + r / 3 / Math.sqrt(1 + Math.pow((p - z) / (f - h), 2));
                if (0 > z - p && 0 < h - f || 0 < z - p && 0 > h - f) I = d + r / 3 / Math.sqrt(1 + Math.pow((f - h) / (p - z), 2)), Z = fa + r / 3 / Math.sqrt(1 + Math.pow((p - z) / (f - h), 2)), N = d - r / 3 / Math.sqrt(1 + Math.pow((f - h) / (p - z), 2)), O = fa - r / 3 / Math.sqrt(1 + Math.pow((p - z) / (f - h), 2));
                f = f + "," + p + " " + h + "," + z + " " + I + "," + Z + " " + h + "," + z + " " + N + "," + O;
                if (!k[a]) {
                    p = "svg_shape_arrow_" + a + "_" + e;
                    $("#" + p).remove();
                    k[a] = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                    k[a] = $(k[a]).insertAfter("#" +
                        e);
                    k[a].attr("id", p);
                    k[a].addClass("svg-shape-arrow");
                    k[a].attr("stroke", b.attr("stroke"));
                    k[a].attr("stroke-width", b.attr("stroke-width"));
                    k[a].attr("fill", b.attr("fill"));
                    k[a].attr("fill-rule", b.attr("fill-rule"));
                    k[a].attr("fill-opacity", b.attr("fill-opacity"));
                    k[a].css("cursor", "pointer");
                    l.push(document.querySelector("#" + p));
                    if ("touch" == AppConfig.clickType) k[a].on("touchstart", function(a) {
                        c(a);
                        v(a);
                        return !1
                    });
                    else k[a].on("mousedown", function(a) {
                        if (1 == a.which) return G(a), !1
                    }), k[a].on("contextmenu",
                        function(a) {
                            a.preventDefault();
                            q();
                            _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                            return !1
                        });
                    k[a].on("click", function(a) {
                        clearTimeout(B);
                        a.preventDefault();
                        q();
                        return !1
                    })
                }
                k[a].attr("points", f)
            }

            function C() {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                b = $(a).appendTo("#shapes_2_section");
                b.attr("id", e);
                b.addClass("shape-high-level", e);
                b.css("cursor", "pointer");
                l.push(document.querySelector("#" + e));
                a = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                m = $(a).insertBefore(b);
                m.attr("id", e + "_bg");
                m.addClass("shape-high-level", e + "_bg");
                m.addClass("svg-shape-bg-line", e + "_bg");
                m.css("cursor", "pointer");
                l.push(document.querySelector("#" + e + "_bg"));
                "touch" == AppConfig.clickType ? (b.on("touchstart", function(a) {
                    c(a);
                    v(a);
                    return !1
                }), m.on("touchstart", function(a) {
                    c(a);
                    v(a);
                    return !1
                })) : (b.on("mousedown", function(a) {
                    if (1 == a.which) return G(a), !1
                }), b.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                    return !1
                }), m.on("mousedown", function(a) {
                    if (1 == a.which) return G(a), !1
                }), m.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                    return !1
                }));
                b.on("click", function(a) {
                    clearTimeout(B);
                    a.preventDefault();
                    q();
                    return !1
                });
                m.on("click", function(a) {
                    clearTimeout(B);
                    a.preventDefault();
                    q();
                    return !1
                });
                $.each(f, function(a, d) {
                    b.attr(a, d);
                    m.attr(a, d)
                });
                m.attr("stroke-opacity", .01);
                m.attr("stroke-width", 6 * b.attr("stroke-width"));
                "dashed" == y && b.attr("stroke-dasharray",
                    3 * f["stroke-width"] + "px," + 4 * f["stroke-width"] + "px");
                $.each(d, function(a, d) {
                    b.attr(a, d);
                    m.attr(a, d)
                })
            }

            function E() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                    c = $(a).insertBefore("#" + e + "_bg");
                c.attr("id", "shadow_" + e);
                c.addClass("svg-shape-shadow");
                $.each(f, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("stroke-opacity", .15);
                c.attr("points", b.attr("points"));
                c.attr("stroke-width", 3 * b.attr("stroke-width"));
                $.each(d, function(a, b) {
                    c.attr(a, b)
                });
                $.each(k,
                    function(a, c) {
                        var p = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                            k = $(p).insertBefore("#" + e);
                        k.addClass("svg-shape-shadow");
                        $.each(f, function(a, b) {
                            k.attr(a, b)
                        });
                        k.attr("stroke-opacity", .15);
                        k.attr("points", c.attr("points"));
                        k.attr("stroke-width", 3 * b.attr("stroke-width"));
                        $.each(d, function(a, b) {
                            k.attr(a, b)
                        })
                    })
            }

            function L(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        d = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b.clientLeft ||
                        0);
                    a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function x(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
            }

            function G(d) {
                function c(d) {
                    if (!l) {
                        d.preventDefault();
                        d = L(d);
                        var c = x(d);
                        d = x(d, 1);
                        for (var f = 0; f < D.length; f++) D[f].split(","),
                            D[f].split(","), I[f].x += c - e, I[f].y += d - k, D[f] = I[f].x + "," + I[f].y;
                        e = c;
                        k = d;
                        b.attr("points", D.join(" "));
                        m.attr("points", D.join(" "));
                        u && w("start");
                        a && w("end");
                        E()
                    }
                }

                function f() {
                    l = 1;
                    q();
                    document.removeEventListener("mousemove", c);
                    document.removeEventListener("mouseup", f);
                    b.attr("points", D.join(" "));
                    m.attr("points", D.join(" "));
                    u && w("start");
                    a && w("end");
                    A = [];
                    for (var d = 0; d < D.length; d++) {
                        var I = +D[d].split(",")[0],
                            e = +D[d].split(",")[1],
                            I = +(I / K.width).toFixed(4) + "," + +(e / K.height).toFixed(4);
                        A.push(I)
                    }
                    if (h.onChanged) h.onChanged()
                }
                if (P) return !1;
                $(".context-menu").hide();
                d.preventDefault();
                d = L(d);
                n.focus();
                var e = x(d),
                    k = x(d, 1),
                    l = 0,
                    I = [];
                for (d = 0; d < D.length; d++) {
                    var p = +D[d].split(",")[0],
                        Z = +D[d].split(",")[1];
                    I.push({
                        x: p,
                        y: Z
                    })
                }
                document.addEventListener("mousemove", c, !1);
                document.addEventListener("mouseup", f, !1)
            }

            function v(d) {
                function c(d) {
                    clearTimeout(B);
                    if (!l) {
                        $(".context-menu").hide();
                        var c = d.touches[0].pageX - $("#" + t).offset().left;
                        d = d.touches[0].pageY - $("#" + t).offset().top;
                        for (var f = 0; f < D.length; f++) D[f].split(","), D[f].split(","),
                            I[f].x += c - e, I[f].y += d - k, D[f] = I[f].x + "," + I[f].y;
                        e = c;
                        k = d;
                        b.attr("points", D.join(" "));
                        m.attr("points", D.join(" "));
                        u && w("start");
                        a && w("end");
                        E()
                    }
                }

                function f() {
                    clearTimeout(B);
                    l = 1;
                    q();
                    document.removeEventListener("touchmove", c);
                    document.removeEventListener("touchend", f);
                    b.attr("points", D.join(" "));
                    m.attr("points", D.join(" "));
                    u && w("start");
                    a && w("end");
                    A = [];
                    for (var d = 0; d < D.length; d++) {
                        var I = +D[d].split(",")[0],
                            e = +D[d].split(",")[1],
                            I = +(I / K.width).toFixed(4) + "," + +(e / K.height).toFixed(4);
                        A.push(I)
                    }
                    if (h.onChanged) h.onChanged()
                }
                if (P) return !1;
                $(".context-menu").hide();
                d.preventDefault();
                n.focus();
                d = d.originalEvent;
                var e = d.changedTouches[0].pageX - $("#" + t).offset().left,
                    k = d.changedTouches[0].pageY - $("#" + t).offset().top,
                    l = 0,
                    I = [];
                for (d = 0; d < D.length; d++) {
                    var p = +D[d].split(",")[0],
                        Z = +D[d].split(",")[1];
                    I.push({
                        x: p,
                        y: Z
                    })
                }
                document.addEventListener("touchmove", c, !1);
                document.addEventListener("touchend", f, !1)
            }

            function c(a) {
                clearTimeout(B);
                B = setTimeout(function() {
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n)
                }, 750)
            }
            var h =
                J || {},
                n = this,
                e = null,
                b = null,
                m = null,
                l = [],
                u = 0,
                a = 0,
                k = {},
                r = null,
                A = null,
                B = null,
                D = [],
                y = null,
                F = "n",
                t = null,
                f = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                d = {
                    fill: "none",
                    "fill-opacity": .4,
                    "fill-rule": "nonzero"
                },
                U = !1,
                P = !1,
                K = _boardObj.getSize();
            n.create = function(d) {
                D = d.points || [];
                f.stroke = d.stroke_color;
                f["stroke-width"] = d.stroke_width;
                y = d.stroke_style;
                (F = d.arrow) || (F = "n");
                F = F[0];
                switch (F) {
                    case "n":
                        a = u = 0;
                        break;
                    case "e":
                        u = 0;
                        a = 1;
                        break;
                    case "s":
                        u = 1;
                        a = 0;
                        break;
                    case "b":
                        a = u = 1;
                        break;
                    default:
                        a = u = 0
                }
                r = 7 * f["stroke-width"];
                t = d.canvas_element_id;
                for (d = 1;;) {
                    if (!document.getElementById("svg_shape_pencil_" + d)) {
                        e = "svg_shape_pencil_" + d;
                        break
                    }
                    d++
                }
                C();
                b.attr("points", D.join(" "));
                m.attr("points", D.join(" "));
                u && w("start");
                a && w("end")
            };
            n.creating = function(d) {
                b.css("cursor", $("#" + t).css("cursor"));
                m.css("cursor", $("#" + t).css("cursor"));
                k.start && k.start.css("cursor", $("#" + t).css("cursor"));
                k.end && k.end.css("cursor", $("#" + t).css("cursor"));
                var c = d.left;
                d = d.top;
                var f = +(c / K.width).toFixed(4) + "," +
                    +(d / K.height).toFixed(4);
                A || (A = []);
                A.push(f);
                D.push(c + "," + d);
                b.attr("points", D.join(" "));
                m.attr("points", D.join(" "));
                u && w("start");
                a && w("end")
            };
            n.afterCreated = function(a) {
                b.css("cursor", "pointer");
                m.css("cursor", "pointer");
                k.start && k.start.css("cursor", "pointer");
                k.end && k.end.css("cursor", "pointer");
                setTimeout(q, 200)
            };
            n.draw = function(d) {
                if (!A) return document.getElementById(e) && b.remove(), document.getElementById(e + "_bg") && m.remove(), !1;
                document.getElementById(e) || C();
                D = [];
                $.each(A, function(a, b) {
                    var d =
                        b.split(",");
                    D.push(d[0] * K.width + "," + d[1] * K.height)
                });
                d && d.stroke_width && f["stroke-width"] != d.stroke_width && (f["stroke-width"] = d.stroke_width, b.attr("stroke-width", f["stroke-width"]), m.attr("stroke-width", 6 * f["stroke-width"]), r = 7 * f["stroke-width"], "dashed" == y && b.attr("stroke-dasharray", 3 * f["stroke-width"] + "px," + 4 * f["stroke-width"] + "px"));
                b.attr("points", D.join(" "));
                m.attr("points", D.join(" "));
                k = {};
                u && w("start");
                a && w("end")
            };
            n.show = function() {
                for (var a = 0; a < l.length; a++) l[a].style.visibility = "visible"
            };
            n.hide = function() {
                for (var a = 0; a < l.length; a++) l[a].style.visibility = "hidden"
            };
            n.focus = function() {
                q()
            };
            n.lockFocusing = function(a) {
                if (void 0 === a) return U;
                U = a;
                return U = !!U
            };
            n.lockChanging = function(a) {
                if (void 0 === a) return P;
                P = a;
                return P = !!P
            };
            n.getStoreInfo = function() {
                return A ? {
                    t: "pencil",
                    ppr: A,
                    ss: y,
                    a: F,
                    sc: f.stroke
                } : !1
            };
            n.restore = function(c) {
                A = c.points_positions_relations;
                if (!A) return !1;
                y = c.stroke_style;
                f.stroke = c.stroke_color;
                (F = c.arrow) || (F = "n");
                switch (F) {
                    case "n":
                        a = u = 0;
                        break;
                    case "e":
                        u = 0;
                        a = 1;
                        break;
                    case "s":
                        u =
                            1;
                        a = 0;
                        break;
                    case "b":
                        a = u = 1;
                        break;
                    default:
                        a = u = 0
                }
                $.each(f, function(a, d) {
                    b.attr(a, d);
                    m.attr(a, d)
                });
                m.attr("stroke-opacity", .01);
                m.attr("stroke-width", 6 * b.attr("stroke-width"));
                $.each(d, function(a, d) {
                    b.attr(a, d);
                    m.attr(a, d)
                });
                "dashed" == y && b.attr("stroke-dasharray", 3 * f["stroke-width"] + "px," + 4 * f["stroke-width"] + "px")
            };
            n.getId = function() {
                return e
            };
            n.remove = function() {
                b.remove();
                m.remove();
                $("#svg_shape_arrow_start_" + e).remove();
                $("#svg_shape_arrow_end_" + e).remove()
            };
            n.isValid = function() {
                return !D || 3 > D.length ?
                    !1 : !0
            }
        },
        Line: function(J) {
            function q() {
                if (W) return !1;
                var b = document.getElementById("shapes_2_section").lastElementChild;
                k.insertAfter($(b));
                r.insertBefore(k);
                $.each(y, function(b, d) {
                    d.insertAfter($("#" + a))
                });
                x();
                C();
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(a)
            }

            function w(b) {
                var c = null;
                k.attr("points") && (c = k.attr("points").split(" "));
                if ("start" == b) {
                    var e = d.end.x;
                    var I = d.end.y;
                    c && 30 < c.length && (e = +c[5].split(",")[0], I = +c[5].split(",")[1]);
                    var l = d.start.y;
                    var z = d.start.x
                } else "end" == b &&
                    (e = d.start.x, I = d.start.y, c && 30 < c.length && (e = +c[c.length - 5].split(",")[0], I = +c[c.length - 5].split(",")[1]), l = d.end.y, z = d.end.x);
                var r = Math.sqrt(Math.pow(e - z, 2) + Math.pow(I - l, 2)) / F;
                if (0 == r) return !1;
                var c = z,
                    p = l;
                0 != r && (z = (z * (1 + r) - e) / r, l = (l * (1 + r) - I) / r);
                e = c;
                I = p;
                var r = c + F / 3 / Math.sqrt(1 + Math.pow((e - z) / (I - l), 2)),
                    t = p - F / 3 / Math.sqrt(1 + Math.pow((I - l) / (e - z), 2)),
                    v = c - F / 3 / Math.sqrt(1 + Math.pow((e - z) / (I - l), 2)),
                    g = p + F / 3 / Math.sqrt(1 + Math.pow((I - l) / (e - z), 2));
                if (0 > l - I && 0 < z - e || 0 < l - I && 0 > z - e) r = c + F / 3 / Math.sqrt(1 + Math.pow((e - z) /
                    (I - l), 2)), t = p + F / 3 / Math.sqrt(1 + Math.pow((I - l) / (e - z), 2)), v = c - F / 3 / Math.sqrt(1 + Math.pow((e - z) / (I - l), 2)), g = p - F / 3 / Math.sqrt(1 + Math.pow((I - l) / (e - z), 2));
                e = e + "," + I + " " + z + "," + l + " " + r + "," + t + " " + z + "," + l + " " + v + "," + g;
                if (!y[b]) {
                    I = "svg_shape_arrow_" + b + "_" + a;
                    $("#" + I).remove();
                    y[b] = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                    y[b] = $(y[b]).insertAfter("#" + a);
                    y[b].attr("id", I);
                    y[b].addClass("shape-arrow");
                    y[b].attr("stroke", k.attr("stroke"));
                    y[b].attr("stroke-width", k.attr("stroke-width"));
                    y[b].attr("fill",
                        k.attr("fill"));
                    y[b].attr("fill-rule", k.attr("fill-rule"));
                    y[b].attr("fill-opacity", k.attr("fill-opacity"));
                    y[b].css("cursor", "pointer");
                    A.push(document.querySelector("#" + I));
                    if ("touch" == AppConfig.clickType) y[b].on("touchstart", function(a) {
                        m(a);
                        n(a);
                        return !1
                    });
                    else y[b].on("mousedown", function(a) {
                        if (1 == a.which) return h(a), !1
                    }), y[b].on("contextmenu", function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                        return !1
                    });
                    y[b].on("click", function(a) {
                        clearTimeout(f);
                        a.preventDefault();
                        q();
                        return !1
                    })
                }
                y[b].attr("points", e)
            }

            function C() {
                $("[id^='svg_node_shape_']").remove();
                var c = 0 + Math.sqrt(Math.pow(d.start.x - d.im1.x, 2) + Math.pow(d.start.y - d.im1.y, 2)) + Math.sqrt(Math.pow(d.im1.x - d.im2.x, 2) + Math.pow(d.im1.y - d.im2.y, 2)) + Math.sqrt(Math.pow(d.im2.x - d.end.x, 2) + Math.pow(d.im2.y - d.end.y, 2)),
                    f = Math.ceil(_boardObj.getSize().width * ba);
                if (c < 12 * f) return !1;
                c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c = y.start ? $(c).insertAfter(y.start) : $(c).insertAfter("#" +
                    a);
                c.attr("id", "svg_node_shape_line_start_" + a);
                c.attr("stroke", _boardObj.getColors().bgColor);
                c.attr("stroke-width", "1px");
                c.attr("fill", $("#" + a).attr("stroke"));
                c.attr("fill-rule", "nonzero");
                c.attr("fill-opacity", .8);
                c.attr("cx", d.start.x);
                c.attr("cy", d.start.y);
                c.attr("r", f + "px");
                c.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) c.on("touchstart", function(a) {
                    m(a);
                    b($(this), a, "start");
                    return !1
                });
                else c.on("mousedown", function(a) {
                    if (1 == a.which) return e($(this), a, "start"), !1
                }), c.on("contextmenu",
                    function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                        return !1
                    });
                c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c = $(c).insertAfter("#" + a);
                c.attr("id", "svg_node_shape_line_im1_" + a);
                c.attr("stroke", _boardObj.getColors().bgColor);
                c.attr("stroke-width", "1px");
                c.attr("fill", $("#" + a).attr("stroke"));
                c.attr("fill-rule", "nonzero");
                c.attr("fill-opacity", .8);
                c.attr("cx", d.im1.x);
                c.attr("cy", d.im1.y);
                c.attr("r", f + "px");
                c.css("cursor", "pointer");
                if ("touch" ==
                    AppConfig.clickType) c.on("touchstart", function(a) {
                    m(a);
                    b($(this), a, "im1");
                    return !1
                });
                else c.on("mousedown", function(a) {
                    if (1 == a.which) return e($(this), a, "im1"), !1
                }), c.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                });
                c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c = $(c).insertAfter("#" + a);
                c.attr("id", "svg_node_shape_line_im2_" + a);
                c.attr("stroke", _boardObj.getColors().bgColor);
                c.attr("stroke-width", "1px");
                c.attr("fill", $("#" + a).attr("stroke"));
                c.attr("fill-rule", "nonzero");
                c.attr("fill-opacity", .8);
                c.attr("cx", d.im2.x);
                c.attr("cy", d.im2.y);
                c.attr("r", f + "px");
                c.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) c.on("touchstart", function(a) {
                    m(a);
                    b($(this), a, "im2");
                    return !1
                });
                else c.on("mousedown", function(a) {
                    if (1 == a.which) return e($(this), a, "im2"), !1
                }), c.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                });
                c = document.createElementNS("http://www.w3.org/2000/svg",
                    "circle");
                c = y.end ? $(c).insertAfter(y.end) : $(c).insertAfter("#" + a);
                c.attr("id", "svg_node_shape_line_end_" + a);
                c.attr("stroke", _boardObj.getColors().bgColor);
                c.attr("stroke-width", "1px");
                c.attr("fill", $("#" + a).attr("stroke"));
                c.attr("fill-rule", "nonzero");
                c.attr("fill-opacity", .8);
                c.attr("cx", d.end.x);
                c.attr("cy", d.end.y);
                c.attr("r", f + "px");
                c.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) c.on("touchstart", function(a) {
                    m(a);
                    b($(this), a, "end");
                    return !1
                });
                else c.on("mousedown", function(a) {
                    if (1 ==
                        a.which) return e($(this), a, "end"), !1
                }), c.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                })
            }

            function E() {
                var b = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                k = $(b).appendTo("#shapes_2_section");
                k.attr("id", a);
                k.addClass("shape-high-level", a);
                k.css("cursor", "pointer");
                A.push(document.querySelector("#" + a));
                b = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                r = $(b).insertBefore(k);
                r.attr("id",
                    a + "_bg");
                r.addClass("shape-high-level", a + "_bg");
                r.addClass("svg-shape-bg-line", a + "_bg");
                r.css("cursor", "pointer");
                A.push(document.querySelector("#" + a + "_bg"));
                "touch" == AppConfig.clickType ? (k.on("touchstart", function(a) {
                    m(a);
                    n(a);
                    return !1
                }), r.on("touchstart", function(a) {
                    m(a);
                    n(a);
                    return !1
                })) : (k.on("mousedown", function(a) {
                    if (1 == a.which) return h(a), !1
                }), k.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                }), r.on("mousedown", function(a) {
                    if (1 ==
                        a.which) return h(a), !1
                }), r.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u);
                    return !1
                }));
                k.on("click", function(a) {
                    clearTimeout(f);
                    a.preventDefault();
                    q();
                    return !1
                });
                r.on("click", function(a) {
                    clearTimeout(f);
                    a.preventDefault();
                    q();
                    return !1
                });
                $.each(p, function(a, b) {
                    k.attr(a, b);
                    r.attr(a, b)
                });
                r.attr("stroke-opacity", .01);
                r.attr("stroke-width", 6 * k.attr("stroke-width"));
                "dashed" == U && k.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] +
                    "px");
                $.each(ca, function(a, b) {
                    k.attr(a, b);
                    r.attr(a, b)
                })
            }

            function L() {
                d.im1 || (d.im1 = {}, d.im1.x = d.start.x + (d.end.x - d.start.x) / 3, d.im1.y = d.start.y + (d.end.y - d.start.y) / 3, d.im2 = {}, d.im2.x = d.start.x + (d.end.x - d.start.x) / 3 * 2, d.im2.y = d.start.y + (d.end.y - d.start.y) / 3 * 2);
                var a = [];
                a.push({
                    x: d.start.x,
                    y: d.start.y
                });
                a.push({
                    x: d.im1.x,
                    y: d.im1.y
                });
                a.push({
                    x: d.im2.x,
                    y: d.im2.y
                });
                a.push({
                    x: d.end.x,
                    y: d.end.y
                });
                a = v(a);
                k.attr("points", a);
                r.attr("points", a);
                B && w("start");
                D && w("end");
                t = [];
                a = +(d.start.x / z.width).toFixed(4) +
                    "," + +(d.start.y / z.height).toFixed(4);
                t.push(a);
                a = +(d.im1.x / z.width).toFixed(4) + "," + +(d.im1.y / z.height).toFixed(4);
                t.push(a);
                a = +(d.im2.x / z.width).toFixed(4) + "," + +(d.im2.y / z.height).toFixed(4);
                t.push(a);
                a = +(d.end.x / z.width).toFixed(4) + "," + +(d.end.y / z.height).toFixed(4);
                t.push(a)
            }

            function x() {
                $(".svg-shape-shadow").remove();
                var b = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                    c = $(b).insertBefore("#" + a + "_bg");
                c.attr("id", "shadow_" + a);
                c.addClass("svg-shape-shadow");
                $.each(p, function(a,
                    b) {
                    c.attr(a, b)
                });
                c.attr("stroke-opacity", .15);
                c.attr("points", k.attr("points"));
                c.attr("stroke-width", 3 * k.attr("stroke-width"));
                $.each(ca, function(a, b) {
                    c.attr(a, b)
                });
                $.each(y, function(b, c) {
                    var d = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                        f = $(d).insertBefore("#" + a);
                    f.addClass("svg-shape-shadow");
                    $.each(p, function(a, b) {
                        f.attr(a, b)
                    });
                    f.attr("stroke-opacity", .15);
                    f.attr("points", c.attr("points"));
                    f.attr("stroke-width", 3 * k.attr("stroke-width"));
                    $.each(ca, function(a, b) {
                        f.attr(a, b)
                    })
                })
            }

            function G(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function v(a) {
                if (2 == a.length) {
                    var b = a[0],
                        c = a[1],
                        d = {
                            x: b.x + (c.x - b.x) / 3,
                            y: b.y + (c.y - b.y) / 3
                        },
                        f = {
                            x: b.x + (c.x - b.x) / 3 * 2,
                            y: b.y + (c.y - b.y) / 3 * 2
                        };
                    a = [];
                    a.push(b);
                    a.push(d);
                    a.push(f);
                    a.push(c)
                }
                var b = [],
                    c = a.length,
                    d = a.concat();
                d.unshift(a[0]);
                d.push(a[c - 1]);
                for (var e = 1; e < c; e++) {
                    var k = d[e].x;
                    var l = d[e].y;
                    var h = d[e + 1].x;
                    var I = d[e + 1].y;
                    a = .5 * (h - d[e - 1].x);
                    f = .5 * (d[e + 2].x - k);
                    var g = .5 * (I - d[e - 1].y);
                    var z = .5 * (d[e + 2].y - l);
                    for (var r = 0; 50 >= r; r++) {
                        var m = r / 50;
                        var p = Math.pow(m, 2);
                        var n = p * m;
                        var t = 3 * p;
                        var u = 2 * n;
                        var v = u - t + 1;
                        u = t - u;
                        m = n - 2 * p + m;
                        n -= p;
                        b.push("" + (v * k + u * h + m * a + n * f) + "," + (v * l + u * I + m * g + n * z) + "")
                    }
                }
                return b.join(" ")
            }

            function c(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY +
                    document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
            }

            function h(a) {
                function b(a) {
                    if (!h) {
                        $("[id^='svg_node_shape_']").remove();
                        a.preventDefault();
                        a = G(a);
                        var b = c(a);
                        a = c(a, 1);
                        d.start.x += b - e;
                        d.start.y += a - k;
                        d.end.x += b - e;
                        d.end.y += a - k;
                        d.im1 && (d.im1.x += b - e, d.im1.y += a - k, d.im2.x += b - e, d.im2.y += a - k);
                        e = b;
                        k = a;
                        L();
                        x()
                    }
                }

                function f() {
                    h = 1;
                    L();
                    q();
                    document.removeEventListener("mousemove", b);
                    document.removeEventListener("mouseup",
                        f);
                    if (l.onChanged) l.onChanged()
                }
                if (T) return !1;
                $(".context-menu").hide();
                a.preventDefault();
                a = G(a);
                u.focus();
                var e = c(a),
                    k = c(a, 1),
                    h = 0;
                document.addEventListener("mousemove", b, !1);
                document.addEventListener("mouseup", f, !1)
            }

            function n(a) {
                function b(a) {
                    clearTimeout(f);
                    if (!h) {
                        $(".context-menu").hide();
                        $("[id^='svg_node_shape_']").remove();
                        var b = a.touches[0].pageX - $("#" + K).offset().left;
                        a = a.touches[0].pageY - $("#" + K).offset().top;
                        d.start.x += b - e;
                        d.start.y += a - k;
                        d.end.x += b - e;
                        d.end.y += a - k;
                        d.im1 && (d.im1.x += b - e,
                            d.im1.y += a - k, d.im2.x += b - e, d.im2.y += a - k);
                        e = b;
                        k = a;
                        L();
                        x()
                    }
                }

                function c() {
                    clearTimeout(f);
                    h = 1;
                    L();
                    q();
                    document.removeEventListener("touchmove", b);
                    document.removeEventListener("touchend", c);
                    if (l.onChanged) l.onChanged()
                }
                if (T) return !1;
                $(".context-menu").hide();
                a.preventDefault();
                u.focus();
                a = a.originalEvent;
                var e = a.changedTouches[0].pageX - $("#" + K).offset().left,
                    k = a.changedTouches[0].pageY - $("#" + K).offset().top,
                    h = 0;
                document.addEventListener("touchmove", b, !1);
                document.addEventListener("touchend", c, !1)
            }

            function e(a,
                b, f) {
                function e(b) {
                    if (!n) {
                        b.preventDefault();
                        b = G(b);
                        var e = c(b, 1) + z - r;
                        b = c(b) + I - m;
                        b < h && (b = h);
                        b > $("#" + K).width() - h && (b = $("#" + K).width() - h);
                        e < 7 * h && (e = 7 * h);
                        e > $("#" + K).height() - 7 * h && (e = $("#" + K).height() - 7 * h);
                        g = b + "px";
                        p = e + "px";
                        a.attr("cx", g);
                        a.attr("cy", p);
                        d[f].x = b;
                        d[f].y = e;
                        L();
                        x()
                    }
                }

                function k() {
                    n = 1;
                    L();
                    q();
                    document.removeEventListener("mousemove", e);
                    document.removeEventListener("mouseup", k);
                    if (l.onChanged) l.onChanged()
                }
                if (T) return !1;
                $(".context-menu").hide();
                b.preventDefault();
                b = G(b);
                var h = parseInt($(a).attr("r")),
                    I = parseInt(a.attr("cx")),
                    z = parseInt(a.attr("cy")),
                    m = c(b),
                    r = c(b, 1),
                    g, p, n = 0;
                document.addEventListener("mousemove", e, !1);
                document.addEventListener("mouseup", k, !1)
            }

            function b(a, b, c) {
                function e(b) {
                    clearTimeout(f);
                    if (!n) {
                        $(".context-menu").hide();
                        var e = b.touches[0].pageX - $("#" + K).offset().left + z - m;
                        b = b.touches[0].pageY - $("#" + K).offset().top + I - r;
                        e < -h && (e = -h);
                        e > $("#" + K).width() - 2 * h && (e = $("#" + K).width() - 2 * h);
                        b < 2 * h && (b = 2 * h);
                        b > $("#" + K).height() - 6 * h && (b = $("#" + K).height() - 6 * h);
                        g = e + "px";
                        p = b + "px";
                        a.attr("cx", g);
                        a.attr("cy", p);
                        d[c].x = e;
                        d[c].y = b;
                        L();
                        x()
                    }
                }

                function k() {
                    clearTimeout(f);
                    n = 1;
                    L();
                    q();
                    document.removeEventListener("touchmove", e);
                    document.removeEventListener("touchend", k);
                    if (l.onChanged) l.onChanged()
                }
                if (T) return !1;
                $(".context-menu").hide();
                b.preventDefault();
                var h = parseInt($(a).attr("r"));
                b = b.originalEvent;
                var z = parseInt(a.attr("cx")),
                    I = parseInt(a.attr("cy")),
                    m = b.changedTouches[0].pageX - $("#" + K).offset().left,
                    r = b.changedTouches[0].pageY - $("#" + K).offset().top,
                    g, p, n = 0;
                document.addEventListener("touchmove",
                    e, !1);
                document.addEventListener("touchend", k, !1)
            }

            function m(a) {
                clearTimeout(f);
                f = setTimeout(function() {
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, u)
                }, 750)
            }
            var l = J || {},
                u = this,
                a = null,
                k = null,
                r = null,
                A = [],
                B = 0,
                D = 0,
                y = {},
                F = null,
                t = null,
                f = null,
                d = {
                    start: null,
                    im1: null,
                    im2: null,
                    end: null
                },
                U = null,
                P = "n",
                K = null,
                p = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                ca = {
                    fill: "none",
                    "fill-opacity": .4,
                    "fill-rule": "nonzero"
                },
                ba = .0061096;
            "touch" == AppConfig.clickType && (ba = .0104736);
            var W = !1,
                T = !1,
                z = _boardObj.getSize();
            u.create = function(b) {
                void 0 !== b.left && (d.start = {}, d.start.x = b.left, d.start.y = b.top, d.end = {}, d.end.x = b.left, d.end.y = b.top);
                p.stroke = b.stroke_color;
                p["stroke-width"] = b.stroke_width;
                U = b.stroke_style;
                (P = b.arrow) || (P = "n");
                P = P[0];
                switch (P) {
                    case "n":
                        D = B = 0;
                        break;
                    case "e":
                        B = 0;
                        D = 1;
                        break;
                    case "s":
                        B = 1;
                        D = 0;
                        break;
                    case "b":
                        D = B = 1;
                        break;
                    default:
                        D = B = 0
                }
                F = 7 * p["stroke-width"];
                K = b.canvas_element_id;
                for (b = 1;;) {
                    if (!document.getElementById("svg_shape_line_" + b)) {
                        a = "svg_shape_line_" + b;
                        break
                    }
                    b++
                }
                E()
            };
            u.creating = function(a) {
                k.css("cursor", $("#" + K).css("cursor"));
                r.css("cursor", $("#" + K).css("cursor"));
                y.start && y.start.css("cursor", $("#" + K).css("cursor"));
                y.end && y.end.css("cursor", $("#" + K).css("cursor"));
                d.end.x = a.left;
                d.end.y = a.top;
                a = [];
                a.push({
                    x: d.start.x,
                    y: d.start.y
                });
                a.push({
                    x: d.end.x,
                    y: d.end.y
                });
                a = v(a);
                k.attr("points", a);
                r.attr("points", a);
                B && w("start");
                D && w("end");
                t = [];
                a = +(d.start.x / z.width).toFixed(4) + "," + +d.start.y.toFixed(4);
                t.push(a);
                a = +(d.end.x / z.width).toFixed(4) + "," + +(d.end.y / z.height).toFixed(4);
                t.push(a)
            };
            u.afterCreated = function(a) {
                k.css("cursor", "pointer");
                r.css("cursor", "pointer");
                y.start && y.start.css("cursor", "pointer");
                y.end && y.end.css("cursor", "pointer");
                L();
                setTimeout(q, 200)
            };
            u.draw = function(b) {
                if (!t) return document.getElementById(a) && k.remove(), document.getElementById(a + "_bg") && r.remove(), !1;
                document.getElementById(a) || E();
                var c = t[0].split(","),
                    f = t[t.length - 1].split(",");
                d.start = {};
                d.start.x = c[0] * z.width;
                d.start.y = c[1] * z.height;
                d.end = {};
                d.end.x = f[0] * z.width;
                d.end.y = f[1] * z.height;
                4 == t.length && (c = t[1].split(","), d.im1 = {}, d.im1.x = c[0] * z.width, d.im1.y = c[1] * z.height, c = t[2].split(","), d.im2 = {}, d.im2.x = c[0] * z.width, d.im2.y = c[1] * z.height);
                b && b.stroke_width && p["stroke-width"] != b.stroke_width && (p["stroke-width"] = b.stroke_width, k.attr("stroke-width", p["stroke-width"]), r.attr("stroke-width", 6 * p["stroke-width"]), F = 7 * p["stroke-width"], "dashed" == U && k.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px"));
                $(".svg-shape-shadow").remove();
                y = {};
                L()
            };
            u.focus = function() {
                q()
            };
            u.lockFocusing = function(a) {
                if (void 0 === a) return W;
                W = a;
                return W = !!W
            };
            u.lockChanging = function(a) {
                if (void 0 === a) return T;
                T = a;
                return T = !!T
            };
            u.show = function() {
                for (var a = 0; a < A.length; a++) A[a].style.visibility = "visible"
            };
            u.hide = function() {
                for (var a = 0; a < A.length; a++) A[a].style.visibility = "hidden"
            };
            u.getStoreInfo = function() {
                return t ? {
                    t: "line",
                    ppr: t,
                    ss: U,
                    a: P,
                    sc: p.stroke
                } : !1
            };
            u.restore = function(a) {
                t = a.points_positions_relations;
                if (!t) return !1;
                U = a.stroke_style;
                p.stroke = a.stroke_color;
                (P = a.arrow) || (P = "n");
                switch (P) {
                    case "n":
                        D =
                            B = 0;
                        break;
                    case "e":
                        B = 0;
                        D = 1;
                        break;
                    case "s":
                        B = 1;
                        D = 0;
                        break;
                    case "b":
                        D = B = 1;
                        break;
                    default:
                        D = B = 0
                }
                $.each(p, function(a, b) {
                    k.attr(a, b);
                    r.attr(a, b)
                });
                r.attr("stroke-opacity", .01);
                r.attr("stroke-width", 6 * k.attr("stroke-width"));
                $.each(ca, function(a, b) {
                    k.attr(a, b);
                    r.attr(a, b)
                });
                "dashed" == U && k.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px")
            };
            u.getId = function() {
                return a
            };
            u.remove = function() {
                k.remove();
                r.remove();
                $("#svg_shape_arrow_start_" + a).remove();
                $("#svg_shape_arrow_end_" + a).remove()
            };
            u.isValid = function() {
                return !k || !d.start || !d.end || !d.im1 && !d.im2 && Math.sqrt(Math.pow(d.start.x - d.end.x, 2) + Math.pow(d.start.y - d.end.y, 2)) < .008 * z.width ? !1 : !0
            }
        },
        CurveLine: function(J) {
            function q() {
                if (ba) return !1;
                var a = document.getElementById("shapes_2_section").lastElementChild;
                l.insertAfter($(a));
                u.insertBefore(l);
                $.each(y, function(a, b) {
                    b.insertAfter($("#" + m))
                });
                L();
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(m)
            }

            function w(e) {
                if ("start" == e) {
                    var k = d.end.x;
                    var r = d.end.y;
                    var z = d.start.y;
                    var p =
                        d.start.x
                } else "end" == e && (k = d.start.x, r = d.start.y, z = d.end.y, p = d.end.x);
                var t = Math.sqrt(Math.pow(k - p, 2) + Math.pow(r - z, 2)) / F;
                if (0 == t) return !1;
                var u = p,
                    v = z;
                0 != t && (p = (p * (1 + t) - k) / t, z = (z * (1 + t) - r) / t);
                k = u;
                r = v;
                var t = u + F / 3 / Math.sqrt(1 + Math.pow((k - p) / (r - z), 2)),
                    A = v - F / 3 / Math.sqrt(1 + Math.pow((r - z) / (k - p), 2)),
                    w = u - F / 3 / Math.sqrt(1 + Math.pow((k - p) / (r - z), 2)),
                    K = v + F / 3 / Math.sqrt(1 + Math.pow((r - z) / (k - p), 2));
                if (0 > z - r && 0 < p - k || 0 < z - r && 0 > p - k) t = u + F / 3 / Math.sqrt(1 + Math.pow((k - p) / (r - z), 2)), A = v + F / 3 / Math.sqrt(1 + Math.pow((r - z) / (k - p), 2)),
                    w = u - F / 3 / Math.sqrt(1 + Math.pow((k - p) / (r - z), 2)), K = v - F / 3 / Math.sqrt(1 + Math.pow((r - z) / (k - p), 2));
                k = k + "," + r + " " + p + "," + z + " " + t + "," + A + " " + p + "," + z + " " + w + "," + K;
                if (!y[e]) {
                    r = "svg_shape_arrow_" + e + "_" + m;
                    $("#" + r).remove();
                    y[e] = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                    y[e] = $(y[e]).insertAfter("#" + m);
                    y[e].attr("id", r);
                    y[e].addClass("svg-shape-arrow");
                    y[e].attr("stroke", l.attr("stroke"));
                    y[e].attr("stroke-width", l.attr("stroke-width"));
                    y[e].attr("fill", l.attr("fill"));
                    y[e].attr("fill-rule", l.attr("fill-rule"));
                    y[e].attr("fill-opacity", l.attr("fill-opacity"));
                    y[e].css("cursor", "pointer");
                    a.push(document.querySelector("#" + r));
                    if ("touch" == AppConfig.clickType) y[e].on("touchstart", function(a) {
                        n(a);
                        h(a);
                        return !1
                    });
                    else y[e].on("mousedown", function(a) {
                        if (1 == a.which) return c(a), !1
                    }), y[e].on("contextmenu", function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, b);
                        return !1
                    });
                    y[e].on("click", function(a) {
                        clearTimeout(f);
                        a.preventDefault();
                        q();
                        return !1
                    })
                }
                y[e].attr("points", k)
            }

            function C() {
                var d =
                    document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                l = $(d).appendTo("#shapes_2_section");
                l.attr("id", m);
                l.addClass("shape-high-level", m);
                l.css("cursor", "pointer");
                a.push(document.querySelector("#" + m));
                d = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                u = $(d).insertBefore(l);
                u.attr("id", m + "_bg");
                u.addClass("shape-high-level", m + "_bg");
                u.addClass("svg-shape-bg-line", m + "_bg");
                u.css("cursor", "pointer");
                a.push(document.querySelector("#" + m + "_bg"));
                "touch" == AppConfig.clickType ?
                    (l.on("touchstart", function(a) {
                        n(a);
                        h(a);
                        return !1
                    }), u.on("touchstart", function(a) {
                        n(a);
                        h(a);
                        return !1
                    })) : (l.on("mousedown", function(a) {
                        if (1 == a.which) return c(a), !1
                    }), l.on("contextmenu", function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, b);
                        return !1
                    }), u.on("mousedown", function(a) {
                        if (1 == a.which) return c(a), !1
                    }), u.on("contextmenu", function(a) {
                        a.preventDefault();
                        q();
                        _pages[_currentPage].getShapesPainter().shapeContextMenu(a, b);
                        return !1
                    }));
                l.on("click", function(a) {
                    clearTimeout(f);
                    a.preventDefault();
                    q();
                    return !1
                });
                u.on("click", function(a) {
                    clearTimeout(f);
                    a.preventDefault();
                    q();
                    return !1
                });
                $.each(p, function(a, b) {
                    l.attr(a, b);
                    u.attr(a, b)
                });
                u.attr("stroke-opacity", .01);
                u.attr("stroke-width", 6 * l.attr("stroke-width"));
                "dashed" == U && l.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px");
                $.each(ca, function(a, b) {
                    l.attr(a, b);
                    u.attr(a, b)
                })
            }

            function E() {
                var a = [];
                a.push({
                    x: d.end.x,
                    y: d.end.y
                });
                a.push({
                    x: d.start.x,
                    y: d.start.y
                });
                a = G(a);
                l.attr("points", a);
                u.attr("points",
                    a);
                B && w("start");
                D && w("end");
                t = [];
                a = +(d.start.x / T.width).toFixed(4) + "," + +(d.start.y / T.height).toFixed(4);
                t.push(a);
                a = +(d.end.x / T.width).toFixed(4) + "," + +(d.end.y / T.height).toFixed(4);
                t.push(a)
            }

            function L() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                    b = $(a).insertBefore("#" + m + "_bg");
                b.attr("id", "shadow_" + m);
                b.addClass("svg-shape-shadow");
                $.each(p, function(a, c) {
                    b.attr(a, c)
                });
                b.attr("stroke-opacity", .15);
                b.attr("points", l.attr("points"));
                b.attr("stroke-width",
                    3 * l.attr("stroke-width"));
                $.each(ca, function(a, c) {
                    b.attr(a, c)
                });
                $.each(y, function(a, b) {
                    var c = document.createElementNS("http://www.w3.org/2000/svg", "polyline"),
                        d = $(c).insertBefore("#" + m);
                    d.addClass("svg-shape-shadow");
                    $.each(p, function(a, b) {
                        d.attr(a, b)
                    });
                    d.attr("stroke-opacity", .15);
                    d.attr("points", b.attr("points"));
                    d.attr("stroke-width", 3 * l.attr("stroke-width"));
                    $.each(ca, function(a, b) {
                        d.attr(a, b)
                    })
                })
            }

            function x(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function G(a) {
                var b = [],
                    c = a[0].x,
                    d = a[0].y,
                    f = a[1].x;
                a = a[1].y;
                for (var e = Math.sqrt(Math.pow(f - c, 2) + Math.pow(a - d, 2)), h = Math.abs(f - c) / e, l = Math.sqrt(1 - Math.pow(h, 2)), p = -k; p <= e - k; p++) {
                    var m = 0 > p ? 0 : Math.sin(p / r) * A;
                    if (f >= c && a >= d) {
                        var n = p * h - m * l;
                        var g = p * l + m * h;
                        n += k * h;
                        g += k * l
                    } else f < c && a >= d ?
                        (n = -p * h - m * l, g = p * l - m * h, n -= k * h, g += k * l) : f >= c && a < d ? (n = p * h + m * l, g = -p * l + m * h, n += k * h, g -= k * l) : f < c && a < d && (n = -p * h + m * l, g = -p * l - m * h, n -= k * h, g -= k * l);
                    n += c;
                    g += d;
                    b.push(n + "," + g)
                }
                return b.join(" ")
            }

            function v(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
            }

            function c(a) {
                function c(a) {
                    if (!l) {
                        $('[id^="svg_node_shape_"]').remove();
                        a.preventDefault();
                        a = x(a);
                        var b = v(a);
                        a = v(a, 1);
                        d.start.x += b - k;
                        d.start.y += a - h;
                        d.end.x += b - k;
                        d.end.y += a - h;
                        k = b;
                        h = a;
                        E();
                        L()
                    }
                }

                function f() {
                    l = 1;
                    E();
                    q();
                    document.removeEventListener("mousemove", c);
                    document.removeEventListener("mouseup", f);
                    if (e.onChanged) e.onChanged()
                }
                if (W) return !1;
                $(".context-menu").hide();
                a.preventDefault();
                a = x(a);
                b.focus();
                var k = v(a),
                    h = v(a, 1),
                    l = 0;
                document.addEventListener("mousemove", c, !1);
                document.addEventListener("mouseup", f, !1)
            }

            function h(a) {
                function c(a) {
                    clearTimeout(f);
                    if (!p) {
                        $(".context-menu").hide();
                        $('[id^="svg_node_shape_"]').remove();
                        var b = a.touches[0].pageX - $("#" + K).offset().left;
                        a = a.touches[0].pageY - $("#" + K).offset().top;
                        d.start.x += b - h;
                        d.start.y += a - l;
                        d.end.x += b - h;
                        d.end.y += a - l;
                        h = b;
                        l = a;
                        E();
                        L()
                    }
                }

                function k() {
                    clearTimeout(f);
                    p = 1;
                    E();
                    q();
                    document.removeEventListener("touchmove", c);
                    document.removeEventListener("touchend", k);
                    if (e.onChanged) e.onChanged()
                }
                if (W) return !1;
                $(".context-menu").hide();
                a.preventDefault();
                b.focus();
                a = a.originalEvent;
                var h = a.changedTouches[0].pageX - $("#" + K).offset().left,
                    l = a.changedTouches[0].pageY - $("#" + K).offset().top,
                    p = 0;
                document.addEventListener("touchmove", c, !1);
                document.addEventListener("touchend", k, !1)
            }

            function n(a) {
                clearTimeout(f);
                f = setTimeout(function() {
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, b)
                }, 750)
            }
            var e = J || {},
                b = this,
                m = null,
                l = null,
                u = null,
                a = [],
                k = null,
                r = null,
                A = null,
                B = 0,
                D = 0,
                y = {},
                F = null,
                t = null,
                f = null,
                d = {
                    start: null,
                    end: null
                },
                U = null,
                P = "n",
                K = null,
                p = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                ca = {
                    fill: "none",
                    "fill-opacity": .4,
                    "fill-rule": "nonzero"
                },
                ba = !1,
                W = !1,
                T = _boardObj.getSize();
            b.create = function(a) {
                void 0 !== a.left && (d.start = {}, d.start.x = a.left, d.start.y = a.top, d.end = {}, d.end.x = a.left, d.end.y = a.top);
                p.stroke = a.stroke_color;
                p["stroke-width"] = a.stroke_width;
                U = a.stroke_style;
                (P = a.arrow) || (P = "n");
                P = P[0];
                switch (P) {
                    case "n":
                        D = B = 0;
                        break;
                    case "e":
                        B = 0;
                        D = 1;
                        break;
                    case "s":
                        B = 1;
                        D = 0;
                        break;
                    case "b":
                        D = B = 1;
                        break;
                    default:
                        D = B = 0
                }
                F = 7 * p["stroke-width"];
                k = 0 * p["stroke-width"];
                r = 3.3333 * p["stroke-width"];
                A = 3.3333 * p["stroke-width"];
                K = a.canvas_element_id;
                for (a = 1;;) {
                    if (!document.getElementById("svg_shape_curve_line_" + a)) {
                        m = "svg_shape_curve_line_" + a;
                        break
                    }
                    a++
                }
                C()
            };
            b.creating = function(a) {
                l.css("cursor", $("#" + K).css("cursor"));
                u.css("cursor", $("#" + K).css("cursor"));
                y.start && y.start.css("cursor", $("#" + K).css("cursor"));
                y.end && y.end.css("cursor", $("#" + K).css("cursor"));
                d.end.x = a.left;
                d.end.y = a.top;
                a = [];
                a.push({
                    x: d.end.x,
                    y: d.end.y
                });
                a.push({
                    x: d.start.x,
                    y: d.start.y
                });
                a = G(a);
                l.attr("points", a);
                u.attr("points", a);
                B && w("start");
                D && w("end");
                t = [];
                a = +(d.start.x / T.width).toFixed(4) + "," + +d.start.y.toFixed(4);
                t.push(a);
                a = +(d.end.x / T.width).toFixed(4) + "," + +(d.end.y / T.height).toFixed(4);
                t.push(a)
            };
            b.afterCreated = function(a) {
                l.css("cursor", "pointer");
                u.css("cursor", "pointer");
                y.start && y.start.css("cursor", "pointer");
                y.end && y.end.css("cursor", "pointer");
                E();
                setTimeout(q, 200)
            };
            b.draw = function(a) {
                if (!t) return document.getElementById(m) && l.remove(), document.getElementById(m + "_bg") && u.remove(), !1;
                document.getElementById(m) || C();
                var b = t[0].split(","),
                    c = t[t.length - 1].split(",");
                d.start = {};
                d.start.x = b[0] * T.width;
                d.start.y = b[1] * T.height;
                d.end = {};
                d.end.x = c[0] * T.width;
                d.end.y = c[1] * T.height;
                a && a.stroke_width && p["stroke-width"] != a.stroke_width && (p["stroke-width"] = a.stroke_width, k = 0 * p["stroke-width"], r = 3.3333 * p["stroke-width"], A = 3.3333 * p["stroke-width"], l.attr("stroke-width", p["stroke-width"]), u.attr("stroke-width", 6 * p["stroke-width"]), F = 7 * p["stroke-width"], "dashed" == U && l.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px"));
                $(".svg-shape-shadow").remove();
                y = {};
                E()
            };
            b.show = function() {
                for (var b = 0; b < a.length; b++) a[b].style.visibility = "visible"
            };
            b.hide = function() {
                for (var b = 0; b < a.length; b++) a[b].style.visibility = "hidden"
            };
            b.focus = function() {
                q()
            };
            b.lockFocusing = function(a) {
                if (void 0 === a) return ba;
                ba = a;
                return ba = !!ba
            };
            b.lockChanging = function(a) {
                if (void 0 === a) return W;
                W = a;
                return W = !!W
            };
            b.getStoreInfo = function() {
                return t ? {
                    t: "curve-line",
                    ppr: t,
                    ss: U,
                    a: P,
                    sc: p.stroke
                } : !1
            };
            b.restore = function(a) {
                t = a.points_positions_relations;
                if (!t) return !1;
                U = a.stroke_style;
                p.stroke =
                    a.stroke_color;
                (P = a.arrow) || (P = "n");
                switch (P) {
                    case "n":
                        D = B = 0;
                        break;
                    case "e":
                        B = 0;
                        D = 1;
                        break;
                    case "s":
                        B = 1;
                        D = 0;
                        break;
                    case "b":
                        D = B = 1;
                        break;
                    default:
                        D = B = 0
                }
                $.each(p, function(a, b) {
                    l.attr(a, b);
                    u.attr(a, b)
                });
                u.attr("stroke-opacity", .01);
                u.attr("stroke-width", 6 * l.attr("stroke-width"));
                "dashed" == U && l.attr("stroke-dasharray", 3 * p["stroke-width"] + "px," + 4 * p["stroke-width"] + "px")
            };
            b.getId = function() {
                return m
            };
            b.remove = function() {
                l.remove();
                u.remove();
                $("#svg_shape_arrow_start_" + m).remove();
                $("#svg_shape_arrow_end_" +
                    m).remove()
            };
            b.isValid = function() {
                return !l || !d.start || !d.end || Math.sqrt(Math.pow(d.start.x - d.end.x, 2) + Math.pow(d.start.y - d.end.y, 2)) < .015 * T.width ? !1 : !0
            }
        },
        Rectangle: function(J) {
            function q() {
                if (y) return !1;
                a.start.x = parseInt(b.attr("x"));
                a.start.y = parseInt(b.attr("y"));
                a.end.x = parseInt(b.attr("width"));
                a.end.x += a.start.x;
                a.end.y = parseInt(b.attr("height"));
                a.end.y += a.start.y;
                l = [];
                var c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                l.push(c);
                c = +(a.end.x / t.width).toFixed(4) + "," +
                    +(a.end.y / t.height).toFixed(4);
                l.push(c);
                c = document.getElementById("shapes_1_section").lastElementChild;
                b.insertAfter($(c));
                C();
                $("[id^='svg_node_shape_']").remove();
                _boardObj.getSize();
                var c = a.start.x + (a.end.x - a.start.x) / 2;
                var d = a.start.y;
                var k = a.end.x;
                var h = a.start.y + (a.end.y - a.start.y) / 2;
                var r = a.start.x + (a.end.x - a.start.x) / 2;
                var p = a.end.y;
                var m = a.start.x;
                var n = a.start.y + (a.end.y - a.start.y) / 2;
                E(1, c, d);
                E(2, k, h);
                E(3, r, p);
                E(4, m, n);
                E(11, a.start.x, a.start.y);
                E(22, a.end.x, a.start.y);
                E(33, a.end.x, a.end.y);
                E(44, a.start.x, a.end.y);
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(e)
            }

            function w() {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                b = $(a).appendTo("#shapes_1_section");
                b.attr("id", e);
                b.addClass("shape-low-level", e);
                m.push(document.querySelector("#" + e));
                if ("touch" == AppConfig.clickType) b.on("touchstart", function(a) {
                    function b(a) {
                        clearTimeout(u)
                    }

                    function d() {
                        clearTimeout(u);
                        document.removeEventListener("touchmove", b);
                        document.removeEventListener("touchend", d)
                    }
                    c(a);
                    document.addEventListener("touchmove", b, !1);
                    document.addEventListener("touchend", d, !1)
                });
                else b.on("mousedown", function(a) {
                    function c(a) {
                        if (3 == a.which && (b.off("contextmenu").one("contextmenu", function(a) {
                                a.preventDefault();
                                return !1
                            }), a.pageX == d && a.pageY == f && $(a.target).attr("id") == e)) return a.preventDefault(), b.attr("fill-opacity", .6), setTimeout(function() {
                            b.attr("fill-opacity", .2)
                        }, 100), q(), _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n), !1
                    }
                    $(".context-menu").hide();
                    _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    a = L(a);
                    if (3 == a.which) {
                        var d = a.pageX;
                        var f = a.pageY;
                        a.preventDefault();
                        b.one("mouseup", c);
                        return !1
                    }
                });
                $.each(A, function(a, c) {
                    b.attr(a, c)
                });
                "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px");
                $.each(B, function(a, c) {
                    b.attr(a, c)
                })
            }

            function C() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
                    c = $(a).insertBefore("#" + e);
                c.attr("id", "shadow_" + e);
                c.addClass("svg-shape-shadow");
                $.each(A, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("stroke-opacity",
                    .15);
                c.attr("x", b.attr("x"));
                c.attr("y", b.attr("y"));
                c.attr("width", b.attr("width"));
                c.attr("height", b.attr("height"));
                c.attr("stroke-width", 3 * b.attr("stroke-width"));
                $.each(B, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("fill", "none")
            }

            function E(a, b, k) {
                var d = Math.ceil(_boardObj.getSize().width * D),
                    f = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
                    f = $(f).insertAfter("#" + e);
                f.attr("id", "svg_node_shape_" + a + "_" + e);
                f.attr("stroke", _boardObj.getColors().bgColor);
                f.attr("stroke-width", "1px");
                f.attr("fill",
                    $("#" + e).attr("stroke"));
                f.attr("fill-rule", "nonzero");
                f.attr("fill-opacity", .8);
                f.attr("cx", b);
                f.attr("cy", k);
                f.attr("r", d + "px");
                f.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) f.on("touchstart", function(b) {
                    if (F) return !1;
                    c(b);
                    v($(this), b, a);
                    return !1
                });
                else f.on("mousedown", function(b) {
                    if (F) return !1;
                    if (1 == b.which) return G($(this), b, a), !1
                }), f.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                    return !1
                })
            }

            function L(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function x(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX +
                    document.body.scrollTop : a.pageX
            }

            function G(c, d, e) {
                function f(d) {
                    if (!B) {
                        $("[id^='svg_node_shape_']").hide();
                        c.show();
                        d.preventDefault();
                        d = L(d);
                        switch (e) {
                            case 1:
                            case 3:
                                var f = n;
                                var k = x(d, 1) + u - A;
                                break;
                            case 2:
                            case 4:
                                f = x(d) + n - v;
                                k = u;
                                break;
                            case 11:
                            case 22:
                            case 33:
                            case 44:
                                f = x(d) + n - v, k = x(d, 1) + u - A
                        }
                        f < m && (f = m);
                        f > $("#" + r).width() - m && (f = $("#" + r).width() - m);
                        k < 7 * m && (k = 7 * m);
                        k > $("#" + r).height() - 7 * m && (k = $("#" + r).height() - 7 * m);
                        switch (e) {
                            case 1:
                                var h = a.start.x;
                                var p = k;
                                var q = a.end.x - a.start.x;
                                var z = a.end.y - k;
                                0 > z && (p = a.end.y,
                                    z = -z);
                                break;
                            case 2:
                                h = a.start.x;
                                p = a.start.y;
                                q = f - a.start.x;
                                z = a.end.y - a.start.y;
                                0 > q && (h = f, q = -q);
                                break;
                            case 3:
                                h = a.start.x;
                                p = a.start.y;
                                q = a.end.x - a.start.x;
                                z = k - a.start.y;
                                0 > z && (p = k, z = -z);
                                break;
                            case 4:
                                h = f;
                                p = a.start.y;
                                q = a.end.x - f;
                                z = a.end.y - a.start.y;
                                0 > q && (h = a.end.x, q = -q);
                                break;
                            case 11:
                                h = f;
                                p = k;
                                q = a.end.x - f;
                                z = a.end.y - k;
                                0 > q && (h = a.end.x, q = -q);
                                0 > z && (p = a.end.y, z = -z);
                                break;
                            case 22:
                                h = a.start.x;
                                p = k;
                                q = f - a.start.x;
                                z = a.end.y - k;
                                0 > q && (h = f, q = -q);
                                0 > z && (p = a.end.y, z = -z);
                                break;
                            case 33:
                                h = a.start.x;
                                p = a.start.y;
                                q = f - a.start.x;
                                z =
                                    k - a.start.y;
                                0 > q && (h = f, q = -q);
                                0 > z && (p = k, z = -z);
                                break;
                            case 44:
                                h = f, p = a.start.y, q = a.end.x - f, z = k - a.start.y, 0 > q && (h = a.end.x, q = -q), 0 > z && (p = k, z = -z)
                        }
                        w = f + "px";
                        y = k + "px";
                        c.attr("cx", w);
                        c.attr("cy", y);
                        b.attr("x", h);
                        b.attr("y", p);
                        b.attr("width", q);
                        b.attr("height", z);
                        C();
                        l = [];
                        d = +(h / t.width).toFixed(4) + "," + +(p / t.height).toFixed(4);
                        l.push(d);
                        d = +((h + q) / t.width).toFixed(4) + "," + +((p + z) / t.height).toFixed(4);
                        l.push(d)
                    }
                }

                function k() {
                    B = 1;
                    a.start.x = parseInt(b.attr("x"));
                    a.start.y = parseInt(b.attr("y"));
                    a.end.x = parseInt(b.attr("width"));
                    a.end.x += a.start.x;
                    a.end.y = parseInt(b.attr("height"));
                    a.end.y += a.start.y;
                    document.removeEventListener("mousemove", f);
                    document.removeEventListener("mouseup", k);
                    q();
                    l = [];
                    var c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = +(a.end.x / t.width).toFixed(4) + "," + +(a.end.y / t.height).toFixed(4);
                    l.push(c);
                    if (h.onChanged) h.onChanged()
                }
                $(".context-menu").hide();
                d.preventDefault();
                d = L(d);
                var m = parseInt($(c).attr("r")),
                    n = parseInt(c.attr("cx")),
                    u = parseInt(c.attr("cy")),
                    v = x(d),
                    A = x(d, 1),
                    w, y, B = 0;
                document.addEventListener("mousemove", f, !1);
                document.addEventListener("mouseup", k, !1)
            }

            function v(c, d, e) {
                function f(d) {
                    clearTimeout(u);
                    if (!B) {
                        $(".context-menu").hide();
                        $("[id^='svg_node_shape_']").hide();
                        c.show();
                        var f = d.touches[0].pageX - $("#" + r).offset().left + n - A,
                            k = d.touches[0].pageY - $("#" + r).offset().top + v - w;
                        switch (e) {
                            case 1:
                            case 3:
                                f = n;
                                k = d.touches[0].pageY - $("#" + r).offset().top + v - w;
                                break;
                            case 2:
                            case 4:
                                f = d.touches[0].pageX - $("#" + r).offset().left + n - A;
                                k = v;
                                break;
                            case 11:
                            case 22:
                            case 33:
                            case 44:
                                f =
                                    d.touches[0].pageX - $("#" + r).offset().left + n - A, k = d.touches[0].pageY - $("#" + r).offset().top + v - w
                        }
                        f < -m && (f = -m);
                        f > $("#" + r).width() - 2 * m && (f = $("#" + r).width() - 2 * m);
                        k < 2 * m && (k = 2 * m);
                        k > $("#" + r).height() - 6 * m && (k = $("#" + r).height() - 6 * m);
                        switch (e) {
                            case 1:
                                var h = a.start.x;
                                var p = k;
                                var q = a.end.x - a.start.x;
                                var x = a.end.y - k;
                                0 > x && (p = a.end.y, x = -x);
                                break;
                            case 2:
                                h = a.start.x;
                                p = a.start.y;
                                q = f - a.start.x;
                                x = a.end.y - a.start.y;
                                0 > q && (h = f, q = -q);
                                break;
                            case 3:
                                h = a.start.x;
                                p = a.start.y;
                                q = a.end.x - a.start.x;
                                x = k - a.start.y;
                                0 > x && (p = k, x = -x);
                                break;
                            case 4:
                                h = f;
                                p = a.start.y;
                                q = a.end.x - f;
                                x = a.end.y - a.start.y;
                                0 > q && (h = a.end.x, q = -q);
                                break;
                            case 11:
                                h = f;
                                p = k;
                                q = a.end.x - f;
                                x = a.end.y - k;
                                0 > q && (h = a.end.x, q = -q);
                                0 > x && (p = a.end.y, x = -x);
                                break;
                            case 22:
                                h = a.start.x;
                                p = k;
                                q = f - a.start.x;
                                x = a.end.y - k;
                                0 > q && (h = f, q = -q);
                                0 > x && (p = a.end.y, x = -x);
                                break;
                            case 33:
                                h = a.start.x;
                                p = a.start.y;
                                q = f - a.start.x;
                                x = k - a.start.y;
                                0 > q && (h = f, q = -q);
                                0 > x && (p = k, x = -x);
                                break;
                            case 44:
                                h = f, p = a.start.y, q = a.end.x - f, x = k - a.start.y, 0 > q && (h = a.end.x, q = -q), 0 > x && (p = k, x = -x)
                        }
                        z = f + "px";
                        y = k + "px";
                        c.attr("cx", z);
                        c.attr("cy", y);
                        b.attr("x", h);
                        b.attr("y", p);
                        b.attr("width", q);
                        b.attr("height", x);
                        C();
                        l = [];
                        d = +(h / t.width).toFixed(4) + "," + +(p / t.height).toFixed(4);
                        l.push(d);
                        d = +((h + q) / t.width).toFixed(4) + "," + +((p + x) / t.height).toFixed(4);
                        l.push(d)
                    }
                }

                function k() {
                    clearTimeout(u);
                    B = 1;
                    a.start.x = parseInt(b.attr("x"));
                    a.start.y = parseInt(b.attr("y"));
                    a.end.x = parseInt(b.attr("width"));
                    a.end.x += a.start.x;
                    a.end.y = parseInt(b.attr("height"));
                    a.end.y += a.start.y;
                    document.removeEventListener("touchmove", f);
                    document.removeEventListener("touchend",
                        k);
                    q();
                    l = [];
                    var c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = +(a.end.x / t.width).toFixed(4) + "," + +(a.end.y / t.height).toFixed(4);
                    l.push(c);
                    if (h.onChanged) h.onChanged()
                }
                $(".context-menu").hide();
                d.preventDefault();
                var m = parseInt($(c).attr("r"));
                d = d.originalEvent;
                var n = parseInt(c.attr("cx")),
                    v = parseInt(c.attr("cy")),
                    A = d.changedTouches[0].pageX - $("#" + r).offset().left,
                    w = d.changedTouches[0].pageY - $("#" + r).offset().top,
                    z, y, B = 0;
                document.addEventListener("touchmove", f, !1);
                document.addEventListener("touchend", k, !1)
            }

            function c(a) {
                clearTimeout(u);
                u = setTimeout(function() {
                    b.attr("fill-opacity", .6);
                    setTimeout(function() {
                        b.attr("fill-opacity", .2)
                    }, 100);
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n)
                }, 750)
            }
            var h = J || {},
                n = this,
                e = null,
                b = null,
                m = [],
                l = null,
                u = null,
                a = {
                    start: null,
                    end: null
                },
                k = null,
                r = null,
                A = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                B = {
                    fill: "none",
                    "fill-opacity": .2,
                    "fill-rule": "nonzero"
                },
                D = .0061096;
            "touch" ==
            AppConfig.clickType && (D = .0104736);
            var y = !1,
                F = !1,
                t = _boardObj.getSize();
            n.create = function(c) {
                a.start = {};
                a.start.x = c.left;
                a.start.y = c.top;
                a.end = {};
                a.end.x = c.left;
                a.end.y = c.top;
                A.stroke = c.stroke_color;
                A["stroke-width"] = c.stroke_width;
                B.fill = c.fill_color;
                k = c.stroke_style;
                r = c.canvas_element_id;
                for (c = 1;;) {
                    if (!document.getElementById("svg_shape_rectangle_" + c)) {
                        e = "svg_shape_rectangle_" + c;
                        break
                    }
                    c++
                }
                w();
                b.attr("x", a.start.x);
                b.attr("y", a.start.y)
            };
            n.creating = function(c) {
                a.end || (a.end = {});
                a.end.x = c.left;
                a.end.y =
                    c.top;
                var d = a.end.x - a.start.x,
                    f = a.start.x;
                c = a.end.x;
                0 > d && (b.attr("x", a.end.x), d = Math.abs(d), f = a.end.x, c = a.start.x);
                var e = a.end.y - a.start.y,
                    k = a.start.y,
                    h = a.end.y;
                0 > e && (b.attr("y", a.end.y), e = Math.abs(e), k = a.end.y, h = a.start.y);
                b.attr("width", d);
                b.attr("height", e);
                l = [];
                d = +(f / t.width).toFixed(4) + "," + +(k / t.height).toFixed(4);
                l.push(d);
                d = +(c / t.width).toFixed(4) + "," + +(h / t.height).toFixed(4);
                l.push(d)
            };
            n.afterCreated = function(c) {
                a.start.x = parseInt(b.attr("x"));
                a.start.y = parseInt(b.attr("y"));
                a.end.x = parseInt(b.attr("width"));
                a.end.x += a.start.x;
                a.end.y = parseInt(b.attr("height"));
                a.end.y += a.start.y;
                l = [];
                c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                l.push(c);
                c = +(a.end.x / t.width).toFixed(4) + "," + +(a.end.y / t.height).toFixed(4);
                l.push(c)
            };
            n.draw = function(c) {
                if (!l) return document.getElementById(e) && b.remove(), !1;
                document.getElementById(e) || w();
                var d = l[0].split(","),
                    f = l[1].split(",");
                a.start = {};
                a.start.x = d[0] * t.width;
                a.start.y = d[1] * t.height;
                a.end = {};
                a.end.x = f[0] * t.width;
                a.end.y = f[1] * t.height;
                b.attr("x",
                    a.start.x);
                b.attr("y", a.start.y);
                b.attr("width", a.end.x - a.start.x);
                b.attr("height", a.end.y - a.start.y);
                c && c.stroke_width && A["stroke-width"] != c.stroke_width && (A["stroke-width"] = c.stroke_width, b.attr("stroke-width", A["stroke-width"]), "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px"))
            };
            n.show = function() {
                for (var a = 0; a < m.length; a++) m[a].style.visibility = "visible"
            };
            n.hide = function() {
                for (var a = 0; a < m.length; a++) m[a].style.visibility = "hidden"
            };
            n.focus = function() {
                q()
            };
            n.lockFocusing = function(a) {
                if (void 0 === a) return y;
                y = a;
                return y = !!y
            };
            n.lockChanging = function(a) {
                if (void 0 === a) return F;
                F = a;
                return F = !!F
            };
            n.getStoreInfo = function() {
                return l ? {
                    t: "rectangle",
                    ppr: l,
                    ss: k,
                    sc: A.stroke,
                    fc: B.fill
                } : !1
            };
            n.restore = function(a) {
                l = a.points_positions_relations;
                if (!l) return !1;
                k = a.stroke_style;
                A.stroke = a.stroke_color;
                B.fill = a.fill_color;
                $.each(A, function(a, c) {
                    b.attr(a, c)
                });
                $.each(B, function(a, c) {
                    b.attr(a, c)
                });
                "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] +
                    "px")
            };
            n.getId = function() {
                return e
            };
            n.remove = function() {
                b.remove()
            };
            n.isValid = function() {
                return !b || !a.start || !a.end || a.start.x == a.end.x || a.start.y == a.end.y || Math.sqrt(Math.pow(a.start.x - a.end.x, 2) + Math.pow(a.start.y - a.end.y, 2)) < .005 * t.width ? !1 : !0
            };
            n.getStrokeWidthToBoardCoeff = function() {
                return 8.728E-4
            }
        },
        Ellipse: function(J) {
            function q() {
                if (y) return !1;
                var c = parseInt(b.attr("cx")),
                    d = parseInt(b.attr("cy")),
                    k = parseInt(b.attr("rx")),
                    h = parseInt(b.attr("ry"));
                a.start.x = c - k;
                a.start.y = d - h;
                a.end.x = c + k;
                a.end.y =
                    d + h;
                l = [];
                c = (a.start.x / t.width).toFixed(4) + "," + (a.start.y / t.height).toFixed(4);
                l.push(c);
                c = (a.end.x / t.width).toFixed(4) + "," + (a.end.y / t.height).toFixed(4);
                l.push(c);
                c = document.getElementById("shapes_1_section").lastElementChild;
                b.insertAfter($(c));
                C();
                $("[id^='svg_node_shape_']").remove();
                var c = a.start.x + (a.end.x - a.start.x) / 2,
                    d = a.start.y,
                    k = a.end.x,
                    h = a.start.y + (a.end.y - a.start.y) / 2;
                var m = a.start.x + (a.end.x - a.start.x) / 2;
                var p = a.end.y;
                var r = a.start.x;
                var n = a.start.y + (a.end.y - a.start.y) / 2;
                E(1, c, d);
                E(2,
                    k, h);
                E(3, m, p);
                E(4, r, n);
                E(11, a.start.x, a.start.y);
                E(22, a.end.x, a.start.y);
                E(33, a.end.x, a.end.y);
                E(44, a.start.x, a.end.y);
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(e)
            }

            function w() {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
                b = $(a).appendTo("#shapes_1_section");
                b.attr("id", e);
                b.addClass("shape-low-level", e);
                m.push(document.querySelector("#" + e));
                if ("touch" == AppConfig.clickType) b.on("touchstart", function(a) {
                    function b(a) {
                        clearTimeout(u)
                    }

                    function d() {
                        clearTimeout(u);
                        document.removeEventListener("touchmove", b);
                        document.removeEventListener("touchend", d)
                    }
                    c(a);
                    document.addEventListener("touchmove", b, !1);
                    document.addEventListener("touchend", d, !1)
                });
                else b.on("mousedown", function(a) {
                    function c(a) {
                        if (3 == a.which && (b.off("contextmenu").one("contextmenu", function(a) {
                                a.preventDefault();
                                return !1
                            }), a.pageX == d && a.pageY == f && $(a.target).attr("id") == e)) return a.preventDefault(), b.attr("fill-opacity", .6), setTimeout(function() {
                            b.attr("fill-opacity", .2)
                        }, 100), q(), _pages[_currentPage].getShapesPainter().shapeContextMenu(a,
                            n), !1
                    }
                    $(".context-menu").hide();
                    _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    a = L(a);
                    if (3 == a.which) {
                        var d = a.pageX;
                        var f = a.pageY;
                        a.preventDefault();
                        b.one("mouseup", c);
                        return !1
                    }
                });
                $.each(A, function(a, c) {
                    b.attr(a, c)
                });
                "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px");
                $.each(B, function(a, c) {
                    b.attr(a, c)
                })
            }

            function C() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"),
                    c = $(a).insertBefore("#" +
                        e);
                c.attr("id", "shadow_" + e);
                c.addClass("svg-shape-shadow");
                $.each(A, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("stroke-opacity", .15);
                c.attr("cx", b.attr("cx"));
                c.attr("cy", b.attr("cy"));
                c.attr("rx", b.attr("rx"));
                c.attr("ry", b.attr("ry"));
                c.attr("stroke-width", 3 * b.attr("stroke-width"));
                $.each(B, function(a, b) {
                    c.attr(a, b)
                });
                c.attr("fill", "none")
            }

            function E(a, b, k) {
                var d = Math.ceil(_boardObj.getSize().width * D),
                    f = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
                    f = $(f).insertAfter("#" + e);
                f.attr("id",
                    "svg_node_shape_" + a + "_" + e);
                f.attr("stroke", _boardObj.getColors().bgColor);
                f.attr("stroke-width", "1px");
                f.attr("fill", $("#" + e).attr("stroke"));
                f.attr("fill-rule", "nonzero");
                f.attr("fill-opacity", .8);
                f.attr("cx", b);
                f.attr("cy", k);
                f.attr("r", d + "px");
                f.css("cursor", "pointer");
                if ("touch" == AppConfig.clickType) f.on("touchstart", function(b) {
                    if (F) return !1;
                    c(b);
                    v($(this), b, a);
                    return !1
                });
                else f.on("mousedown", function(b) {
                    if (F) return !1;
                    if (1 == b.which) return G($(this), b, a), !1
                }), f.on("contextmenu", function(a) {
                    a.preventDefault();
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n);
                    return !1
                })
            }

            function L(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function x(a, b) {
                return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY +
                    document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
            }

            function G(c, d, e) {
                function f(d) {
                    if (!B) {
                        $("[id^='svg_node_shape_']").hide();
                        c.show();
                        d.preventDefault();
                        d = L(d);
                        switch (e) {
                            case 1:
                            case 3:
                                var f = n;
                                var k = x(d, 1) + u - A;
                                break;
                            case 2:
                            case 4:
                                f = x(d) + n - v;
                                k = u;
                                break;
                            case 11:
                            case 22:
                            case 33:
                            case 44:
                                f = x(d) + n - v, k = x(d, 1) + u - A
                        }
                        f < m && (f = m);
                        f > $("#" + r).width() - m && (f = $("#" + r).width() - m);
                        k < 7 * m && (k = 7 * m);
                        k > $("#" + r).height() - 7 * m && (k = $("#" +
                            r).height() - 7 * m);
                        d = (a.end.x + a.start.x) / 2;
                        var h = (a.end.y + a.start.y) / 2,
                            p = Math.abs((a.end.x - a.start.x) / 2),
                            q = Math.abs((a.end.y - a.start.y) / 2);
                        switch (e) {
                            case 1:
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 2:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                break;
                            case 3:
                                h = (a.start.y + k) / 2;
                                q = Math.abs((k - a.start.y) / 2);
                                break;
                            case 4:
                                d = (a.end.x + f) / 2;
                                p = Math.abs((a.end.x - f) / 2);
                                break;
                            case 11:
                                d = (a.end.x + f) / 2;
                                p = Math.abs((a.end.x - f) / 2);
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 22:
                                d = (a.start.x + f) / 2;
                                p =
                                    Math.abs((f - a.start.x) / 2);
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 33:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                h = (a.start.y + k) / 2;
                                q = Math.abs((k - a.start.y) / 2);
                                break;
                            case 44:
                                d = (a.end.x + f) / 2, p = Math.abs((a.end.x - f) / 2), h = (a.start.y + k) / 2, q = Math.abs((k - a.start.y) / 2)
                        }
                        w = f + "px";
                        y = k + "px";
                        c.attr("cx", w);
                        c.attr("cy", y);
                        b.attr("cx", d);
                        b.attr("cy", h);
                        b.attr("rx", p);
                        b.attr("ry", q);
                        C();
                        l = [];
                        f = +((d - p) / t.width).toFixed(4) + "," + +((h - q) / t.height).toFixed(4);
                        l.push(f);
                        f = +((d + p) / t.width).toFixed(4) + "," +
                            +((h + q) / t.height).toFixed(4);
                        l.push(f)
                    }
                }

                function k() {
                    B = 1;
                    var c = parseInt(b.attr("cx")),
                        d = parseInt(b.attr("cy")),
                        e = parseInt(b.attr("rx")),
                        m = parseInt(b.attr("ry"));
                    a.start.x = c - e;
                    a.start.y = d - m;
                    a.end.x = c + e;
                    a.end.y = d + m;
                    document.removeEventListener("mousemove", f);
                    document.removeEventListener("mouseup", k);
                    q();
                    l = [];
                    c = (a.start.x / t.width).toFixed(4) + "," + (a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = (a.end.x / t.width).toFixed(4) + "," + (a.end.y / t.height).toFixed(4);
                    l.push(c);
                    if (h.onChanged) h.onChanged()
                }
                $(".context-menu").hide();
                d.preventDefault();
                d = L(d);
                var m = parseInt($(c).attr("r")),
                    n = parseInt(c.attr("cx")),
                    u = parseInt(c.attr("cy")),
                    v = x(d),
                    A = x(d, 1),
                    w, y, B = 0;
                document.addEventListener("mousemove", f, !1);
                document.addEventListener("mouseup", k, !1)
            }

            function v(c, d, e) {
                function f(d) {
                    clearTimeout(u);
                    if (!B) {
                        $(".context-menu").hide();
                        $("[id^='svg_node_shape_']").hide();
                        c.show();
                        var f = d.touches[0].pageX - $("#" + r).offset().left + n - A,
                            k = d.touches[0].pageY - $("#" + r).offset().top + v - w;
                        switch (e) {
                            case 1:
                            case 3:
                                f = n;
                                k = d.touches[0].pageY - $("#" + r).offset().top +
                                    v - w;
                                break;
                            case 2:
                            case 4:
                                f = d.touches[0].pageX - $("#" + r).offset().left + n - A;
                                k = v;
                                break;
                            case 11:
                            case 22:
                            case 33:
                            case 44:
                                f = d.touches[0].pageX - $("#" + r).offset().left + n - A, k = d.touches[0].pageY - $("#" + r).offset().top + v - w
                        }
                        f < -m && (f = -m);
                        f > $("#" + r).width() - 2 * m && (f = $("#" + r).width() - 2 * m);
                        k < 2 * m && (k = 2 * m);
                        k > $("#" + r).height() - 6 * m && (k = $("#" + r).height() - 6 * m);
                        d = (a.end.x + a.start.x) / 2;
                        var h = (a.end.y + a.start.y) / 2,
                            p = Math.abs((a.end.x - a.start.x) / 2),
                            q = Math.abs((a.end.y - a.start.y) / 2);
                        switch (e) {
                            case 1:
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y -
                                    k) / 2);
                                break;
                            case 2:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                break;
                            case 3:
                                h = (a.start.y + k) / 2;
                                q = Math.abs((k - a.start.y) / 2);
                                break;
                            case 4:
                                d = (a.end.x + f) / 2;
                                p = Math.abs((a.end.x - f) / 2);
                                break;
                            case 11:
                                d = (a.end.x + f) / 2;
                                p = Math.abs((a.end.x - f) / 2);
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 22:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                h = (a.end.y + k) / 2;
                                q = Math.abs((a.end.y - k) / 2);
                                break;
                            case 33:
                                d = (a.start.x + f) / 2;
                                p = Math.abs((f - a.start.x) / 2);
                                h = (a.start.y + k) / 2;
                                q = Math.abs((k - a.start.y) / 2);
                                break;
                            case 44:
                                d =
                                    (a.end.x + f) / 2, p = Math.abs((a.end.x - f) / 2), h = (a.start.y + k) / 2, q = Math.abs((k - a.start.y) / 2)
                        }
                        y = f + "px";
                        x = k + "px";
                        c.attr("cx", y);
                        c.attr("cy", x);
                        b.attr("cx", d);
                        b.attr("cy", h);
                        b.attr("rx", p);
                        b.attr("ry", q);
                        C();
                        l = [];
                        f = +((d - p) / t.width).toFixed(4) + "," + +((h - q) / t.height).toFixed(4);
                        l.push(f);
                        f = +((d + p) / t.width).toFixed(4) + "," + +((h + q) / t.height).toFixed(4);
                        l.push(f)
                    }
                }

                function k() {
                    clearTimeout(u);
                    B = 1;
                    var c = parseInt(b.attr("cx")),
                        d = parseInt(b.attr("cy")),
                        e = parseInt(b.attr("rx")),
                        m = parseInt(b.attr("ry"));
                    a.start.x = c -
                        e;
                    a.start.y = d - m;
                    a.end.x = c + e;
                    a.end.y = d + m;
                    document.removeEventListener("touchmove", f);
                    document.removeEventListener("touchend", k);
                    q();
                    l = [];
                    c = (a.start.x / t.width).toFixed(4) + "," + (a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = (a.end.x / t.width).toFixed(4) + "," + (a.end.y / t.height).toFixed(4);
                    l.push(c);
                    if (h.onChanged) h.onChanged()
                }
                $(".context-menu").hide();
                d.preventDefault();
                var m = parseInt($(c).attr("r"));
                d = d.originalEvent;
                var n = parseInt(c.attr("cx")),
                    v = parseInt(c.attr("cy")),
                    A = d.changedTouches[0].pageX - $("#" +
                        r).offset().left,
                    w = d.changedTouches[0].pageY - $("#" + r).offset().top,
                    y, x, B = 0;
                document.addEventListener("touchmove", f, !1);
                document.addEventListener("touchend", k, !1)
            }

            function c(a) {
                clearTimeout(u);
                u = setTimeout(function() {
                    b.attr("fill-opacity", .6);
                    setTimeout(function() {
                        b.attr("fill-opacity", .2)
                    }, 100);
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, n)
                }, 750)
            }
            var h = J || {},
                n = this,
                e = null,
                b = null,
                m = [],
                l = null,
                u = null,
                a = {
                    start: null,
                    end: null
                },
                k = null,
                r = null,
                A = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                B = {
                    fill: "none",
                    "fill-opacity": .2,
                    "fill-rule": "nonzero"
                },
                D = .0061096;
            "touch" == AppConfig.clickType && (D = .0104736);
            var y = !1,
                F = !1,
                t = _boardObj.getSize();
            n.create = function(b) {
                a.start = {};
                a.start.x = b.left;
                a.start.y = b.top;
                a.end = {};
                a.end.x = b.left;
                a.end.y = b.top;
                A.stroke = b.stroke_color;
                A["stroke-width"] = b.stroke_width;
                B.fill = b.fill_color;
                k = b.stroke_style;
                r = b.canvas_element_id;
                for (b = 1;;) {
                    if (!document.getElementById("svg_shape_ellipse_" + b)) {
                        e = "svg_shape_ellipse_" + b;
                        break
                    }
                    b++
                }
                w()
            };
            n.creating =
                function(c) {
                    a.end || (a.end = {});
                    a.end.x = c.left;
                    a.end.y = c.top;
                    c = (a.end.y + a.start.y) / 2;
                    var d = Math.abs((a.end.x - a.start.x) / 2),
                        e = Math.abs((a.end.y - a.start.y) / 2);
                    b.attr("cx", (a.end.x + a.start.x) / 2);
                    b.attr("cy", c);
                    b.attr("rx", d);
                    b.attr("ry", e);
                    l = [];
                    c = +(a.start.x / t.width).toFixed(4) + "," + +(a.start.y / t.height).toFixed(4);
                    l.push(c);
                    c = +(a.end.x / t.width).toFixed(4) + "," + +(a.end.y / t.height).toFixed(4);
                    l.push(c)
                };
            n.afterCreated = function(a) {};
            n.draw = function(c) {
                if (!l) return document.getElementById(e) && b.remove(), !1;
                document.getElementById(e) || w();
                var d = l[0].split(","),
                    f = l[1].split(",");
                a.start = {};
                a.start.x = d[0] * t.width;
                a.start.y = d[1] * t.height;
                a.end = {};
                a.end.x = f[0] * t.width;
                a.end.y = f[1] * t.height;
                var d = (a.end.y + a.start.y) / 2,
                    f = Math.abs((a.end.x - a.start.x) / 2),
                    h = Math.abs((a.end.y - a.start.y) / 2);
                b.attr("cx", (a.end.x + a.start.x) / 2);
                b.attr("cy", d);
                b.attr("rx", f);
                b.attr("ry", h);
                c && c.stroke_width && A["stroke-width"] != c.stroke_width && (A["stroke-width"] = c.stroke_width, b.attr("stroke-width", A["stroke-width"]), "dashed" == k &&
                    b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px"))
            };
            n.show = function() {
                for (var a = 0; a < m.length; a++) m[a].style.visibility = "visible"
            };
            n.hide = function() {
                for (var a = 0; a < m.length; a++) m[a].style.visibility = "hidden"
            };
            n.focus = function() {
                q()
            };
            n.lockFocusing = function(a) {
                if (void 0 === a) return y;
                y = a;
                return y = !!y
            };
            n.lockChanging = function(a) {
                if (void 0 === a) return F;
                F = a;
                return F = !!F
            };
            n.getStoreInfo = function() {
                return l ? {
                    t: "ellipse",
                    ppr: l,
                    ss: k,
                    sc: A.stroke,
                    fc: B.fill
                } : !1
            };
            n.restore = function(a) {
                l =
                    a.points_positions_relations;
                if (!l) return !1;
                k = a.stroke_style;
                A.stroke = a.stroke_color;
                B.fill = a.fill_color;
                $.each(A, function(a, c) {
                    b.attr(a, c)
                });
                $.each(B, function(a, c) {
                    b.attr(a, c)
                });
                "dashed" == k && b.attr("stroke-dasharray", 3 * A["stroke-width"] + "px," + 4 * A["stroke-width"] + "px")
            };
            n.getId = function() {
                return e
            };
            n.remove = function() {
                b.remove()
            };
            n.isValid = function() {
                return !b || !a.start || !a.end || a.start.x == a.end.x || a.start.y == a.end.y || Math.sqrt(Math.pow(a.start.x - a.end.x, 2) + Math.pow(a.start.y - a.end.y, 2)) < .005 * t.width ?
                    !1 : !0
            };
            n.getStrokeWidthToBoardCoeff = function() {
                return 8.728E-4
            }
        },
        Polygon: function(J) {
            function q() {
                if (u) return !1;
                var a = document.getElementById("shapes_1_section").lastElementChild;
                v.insertAfter($(a));
                C();
                _pages[_currentPage].getShapesPainter().shapeKeyDownEvent(G)
            }

            function w() {
                var a = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                v = $(a).appendTo("#shapes_1_section");
                v.attr("id", G);
                v.addClass("shape-low-level", G);
                c.push(document.querySelector("#" + G));
                if ("touch" == AppConfig.clickType) v.on("touchstart",
                    function(a) {
                        function b(a) {
                            clearTimeout(n)
                        }

                        function c() {
                            clearTimeout(n);
                            document.removeEventListener("touchmove", b);
                            document.removeEventListener("touchend", c)
                        }
                        L(a);
                        document.addEventListener("touchmove", b, !1);
                        document.addEventListener("touchend", c, !1)
                    });
                else v.on("mousedown", function(a) {
                    function b(a) {
                        if (3 == a.which && (v.off("contextmenu").one("contextmenu", function(a) {
                                a.preventDefault();
                                return !1
                            }), a.pageX == c && a.pageY == e && $(a.target).attr("id") == G)) return a.preventDefault(), v.attr("fill-opacity", .6), setTimeout(function() {
                            v.attr("fill-opacity",
                                .2)
                        }, 100), q(), _pages[_currentPage].getShapesPainter().shapeContextMenu(a, x), !1
                    }
                    $(".context-menu").hide();
                    _pages[_currentPage].getShapesPainter().removeAdditionalShapes();
                    a = E(a);
                    if (3 == a.which) {
                        var c = a.pageX;
                        var e = a.pageY;
                        a.preventDefault();
                        v.one("mouseup", b);
                        return !1
                    }
                });
                $.each(m, function(a, b) {
                    v.attr(a, b)
                });
                "dashed" == b && v.attr("stroke-dasharray", 3 * m["stroke-width"] + "px," + 4 * m["stroke-width"] + "px");
                $.each(l, function(a, b) {
                    v.attr(a, b)
                })
            }

            function C() {
                $(".svg-shape-shadow").remove();
                var a = document.createElementNS("http://www.w3.org/2000/svg",
                        "polyline"),
                    b = $(a).insertBefore("#" + G);
                b.attr("id", "shadow_" + G);
                b.addClass("svg-shape-shadow");
                b.addClass("svg-shape-shadow-no-cursor");
                $.each(m, function(a, c) {
                    b.attr(a, c)
                });
                b.attr("stroke-opacity", .15);
                b.attr("points", v.attr("points"));
                b.attr("stroke-width", 3 * v.attr("stroke-width"));
                $.each(l, function(a, c) {
                    b.attr(a, c)
                });
                b.attr("fill", "none")
            }

            function E(a) {
                a = a || window.event;
                if (null == a.pageX && null != a.clientX) {
                    var b = _canvasElement,
                        c = document.body;
                    a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) -
                        (b.clientLeft || 0);
                    a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
                }!a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
                return a
            }

            function L(a) {
                clearTimeout(n);
                n = setTimeout(function() {
                    v.attr("fill-opacity", .6);
                    setTimeout(function() {
                        v.attr("fill-opacity", .2)
                    }, 100);
                    q();
                    _pages[_currentPage].getShapesPainter().shapeContextMenu(a, x)
                }, 750)
            }
            var x = this,
                G = null,
                v = null,
                c = [],
                h = null,
                n = null,
                e = [],
                b = null,
                m = {
                    stroke: null,
                    "stroke-width": null,
                    "stroke-linejoin": "round",
                    "stroke-opacity": .8
                },
                l = {
                    fill: "none",
                    "fill-opacity": .2,
                    "fill-rule": "nonzero"
                },
                u = !1,
                a = _boardObj.getSize();
            x.create = function(a) {
                e = a.points || [];
                m.stroke = a.stroke_color;
                m["stroke-width"] = a.stroke_width;
                l.fill = a.fill_color;
                b = a.stroke_style;
                for (a = 1;;) {
                    if (!document.getElementById("svg_shape_polygon_" + a)) {
                        G = "svg_shape_polygon_" + a;
                        break
                    }
                    a++
                }
                w();
                v.attr("points", e.join(" "))
            };
            x.creating = function(b) {
                var c = b.left;
                b = b.top;
                var k = +(c / a.width).toFixed(4) + "," + +(b / a.height).toFixed(4);
                h || (h = []);
                h.push(k);
                e.push(c + "," + b);
                v.attr("points",
                    e.join(" "))
            };
            x.afterCreated = function(a) {};
            x.draw = function(c) {
                if (!h) return document.getElementById(G) && v.remove(), !1;
                document.getElementById(G) || w();
                e = [];
                $.each(h, function(b, c) {
                    var k = c.split(",");
                    e.push(k[0] * a.width + "," + k[1] * a.height)
                });
                c && c.stroke_width && m["stroke-width"] != c.stroke_width && (m["stroke-width"] = c.stroke_width, v.attr("stroke-width", m["stroke-width"]), "dashed" == b && v.attr("stroke-dasharray", 3 * m["stroke-width"] + "px," + 4 * m["stroke-width"] + "px"));
                v.attr("points", e.join(" "))
            };
            x.show = function() {
                for (var a =
                        0; a < c.length; a++) c[a].style.visibility = "visible"
            };
            x.hide = function() {
                for (var a = 0; a < c.length; a++) c[a].style.visibility = "hidden"
            };
            x.focus = function() {
                q()
            };
            x.lockFocusing = function(a) {
                if (void 0 === a) return u;
                u = a;
                return u = !!u
            };
            x.lockChanging = function(a) {};
            x.getStoreInfo = function() {
                return h ? {
                    t: "polygon",
                    ppr: h,
                    ss: b,
                    sc: m.stroke,
                    fc: l.fill
                } : !1
            };
            x.restore = function(a) {
                h = a.points_positions_relations;
                if (!h) return !1;
                b = a.stroke_style;
                m.stroke = a.stroke_color;
                l.fill = a.fill_color;
                $.each(m, function(a, b) {
                    v.attr(a, b)
                });
                $.each(l,
                    function(a, b) {
                        v.attr(a, b)
                    });
                "dashed" == b && v.attr("stroke-dasharray", 3 * m["stroke-width"] + "px," + 4 * m["stroke-width"] + "px")
            };
            x.getId = function() {
                return G
            };
            x.remove = function() {
                v.remove()
            };
            x.isValid = function() {
                return !e || 15 > e.length ? !1 : !0
            };
            x.getStrokeWidthToBoardCoeff = function() {
                return 8.728E-4
            }
        }
    },
    Main = function(J) {
        function q() {
            var b = {
                    players: {},
                    balls: {},
                    shapes: h.getInfo()
                },
                e;
            for (e in n.players) b.players[e] = v.getPlayerInfo(e);
            for (var l in n.balls) b.balls[l] = c.getBallInfo(l);
            return b
        }

        function w() {
            if (!("localStorage" in
                    window && null !== window.localStorage)) return !1;
            localStorage.setItem("main_" + _boardObj.getType(), JSON.stringify(q()))
        }

        function C() {
            if (!("localStorage" in window && null !== window.localStorage)) return !1;
            var b = JSON.parse(localStorage.getItem("main_" + _boardObj.getType()));
            if (b) {
                if (b.players) {
                    for (var e in b.players) b.players.hasOwnProperty(e) && (n.players[e] = 1);
                    v.restore(b.players)
                }
                if (b.balls) {
                    for (var l in b.balls) b.balls.hasOwnProperty(l) && (n.balls[l] = 1);
                    c.restore(b.balls)
                }
                h.restore(b.shapes)
            }
        }

        function E() {
            if (_linkDataStore.data.main.players) {
                v.restore(_linkDataStore.data.main.players);
                for (var b in _linkDataStore.data.main.players) _linkDataStore.data.main.players.hasOwnProperty(b) && (n.players[b] = 1)
            }
            if (_linkDataStore.data.main.balls) {
                c.restore(_linkDataStore.data.main.balls);
                for (var e in _linkDataStore.data.main.balls) _linkDataStore.data.main.balls.hasOwnProperty(e) && (n.balls[e] = 1)
            }
            _linkDataStore.data.main.shapes && h.restore(_linkDataStore.data.main.shapes)
        }

        function L() {
            document.querySelector("#shapes_buttons_panel #remove_last_shape").removeEventListener("click", x().shapesPainterRemoveLastShape);
            document.querySelector("#shapes_buttons_panel #remove_all_shapes").removeEventListener("click", x().shapesPainterRemoveAllShapes)
        }

        function x() {
            e || (e = {
                contextMenuKeyPress: function(b) {
                    13 == b.which && hideElement(".context-menu")
                },
                playerContextMenuNumberInput: function() {
                    var b = document.querySelector("#context_menu_player_id_main").value,
                        c = document.querySelector("#context_menu_player_number_main").value;
                    v.setPlayerNumber(b, c);
                    w()
                },
                playerContextMenuNameInput: function() {
                    var b = document.querySelector("#context_menu_player_id_main").value,
                        c = document.querySelector("#context_menu_player_name_main").value;
                    v.setPlayerName(b, c);
                    w()
                },
                playerContextMenuDelete: function(b) {
                    b.preventDefault();
                    b = document.querySelector("#context_menu_player_id_main").value;
                    hideElement(".context-menu");
                    v.reset({
                        player_id: b
                    });
                    delete n.players[b];
                    w();
                    return !1
                },
                ballContextMenuNameInput: function() {
                    var b = document.querySelector("#context_menu_ball_id_main").value,
                        e = document.querySelector("#context_menu_ball_name_main").value;
                    c.setBallName(b, e);
                    w()
                },
                ballContextMenuDelete: function(b) {
                    b.preventDefault();
                    b = document.querySelector("#context_menu_ball_id_main").value;
                    hideElement(".context-menu");
                    c.reset({
                        ball_id: b
                    });
                    delete n.balls[b];
                    w();
                    return !1
                },
                shapesPainterRemoveShape: function(b) {
                    b = document.querySelector("#context_menu_shape_id_main").value;
                    h.removeShape(b)
                },
                shapesPainterRemoveLastShape: function(b) {
                    h.removeLastShape();
                    w()
                },
                shapesPainterRemoveAllShapes: function(b) {
                    h.clean();
                    w()
                },
                clearAll: function(b) {
                    b.preventDefault();
                    "localStorage" in window && null !== window.localStorage && localStorage.removeItem("main_" +
                        _boardObj.getType());
                    v.reset();
                    c.reset();
                    h.clean();
                    n = {
                        players: Object.create(null),
                        balls: Object.create(null)
                    };
                    return !1
                },
                getPositionsLink: function() {
                    new ModalWindow({
                        html: '<div class="loading-image-modal-window"></div>'
                    });
                    for (var b = generateUUID() + "_" + _boardObj.getKey() + _langKey, c = !1, e = JSON.stringify(q()), h = [], a = 0;;) {
                        var k = e.substr(1E5 * a, 1E5);
                        if ("" === k) break;
                        h.push(k);
                        a++
                    }
                    for (e = 0; e < h.length && !c; e++) ajax({
                        url: _siteUri + "&ajax_request=store_data_for_link",
                        type: "post",
                        async: !1,
                        data: {
                            linkToken: b,
                            boardType: _boardObj.getType(),
                            langKey: _langKey,
                            dataPart: h[e],
                            dataPartIndex: e
                        },
                        error: function(a) {
                            c = !0;
                            console.log(a)
                        }
                    });
                    ajax({
                        url: _siteUri + "&ajax_request=postions_link_window",
                        type: "post",
                        data: {
                            linkToken: b,
                            langKey: _langKey
                        },
                        success: function(a) {
                            if (c) a = _projectTexts.get(), new ModalWindow({
                                html: '<span class="error-modal-window">' + a.server_error + '</span><br><span class="error-modal-window">' + a.try_again_later + "</span>",
                                closeButton: !0
                            });
                            else {
                                new ModalWindow({
                                    html: a
                                });
                                var b = document.querySelector("#txt_box_positions_link");
                                b.style.fontSize =
                                    Math.ceil(.013092 * _boardObj.getSize().width) + "px";
                                b.style.width = Math.ceil(.0082916 * _boardObj.getSize().width * document.querySelector("#txt_box_positions_link").value.length) + "px";
                                b.select();
                                document.queryCommandSupported("copy") ? document.querySelector("#copy_positions_link_button").addEventListener("click", function() {
                                    try {
                                        b.select(), document.execCommand("copy"), hideElement("#modal_window"), hideElement("#modal_window_bg")
                                    } catch (B) {
                                        console.log(B)
                                    }
                                }) : isFlashEnabled() ? $("#copy_positions_link_button").zclip({
                                    path: _siteUri +
                                        "Public/Js/ZeroClipboard.swf",
                                    copy: document.querySelector("#txt_box_positions_link").value,
                                    afterCopy: function() {
                                        hideElement("#modal_window");
                                        hideElement("#modal_window_bg")
                                    }
                                }) : $("#copy_positions_link_button").hide()
                            }
                        },
                        error: function(a) {
                            console.log(a);
                            a = _projectTexts.get();
                            new ModalWindow({
                                html: '<span class="error-modal-window">' + a.server_error + '</span><br><span class="error-modal-window">' + a.try_again_later + "</span>",
                                closeButton: !0
                            })
                        }
                    });
                    return !1
                }
            });
            return e
        }
        var G = (J || {}).link_token || null,
            v = null,
            c =
            null,
            h = null,
            n = {
                players: Object.create(null),
                balls: Object.create(null)
            },
            e = null;
        (function() {
            document.querySelector("#context_menu_player_number_main").addEventListener("input", x().playerContextMenuNumberInput, !1);
            document.querySelector("#context_menu_player_name_main").addEventListener("input", x().playerContextMenuNameInput, !1);
            document.querySelector("#context_menu_player_delete_btn_main").addEventListener("click", x().playerContextMenuDelete);
            document.querySelector("#context_menu_player_main").addEventListener("keypress",
                x().contextMenuKeyPress, !1);
            document.querySelector("#context_menu_ball_name_main").addEventListener("input", x().ballContextMenuNameInput, !1);
            document.querySelector("#context_menu_ball_delete_btn_main").addEventListener("click", x().ballContextMenuDelete, !1);
            document.querySelector("#context_menu_ball_main").addEventListener("keypress", x().contextMenuKeyPress, !1);
            document.querySelector("#context_menu_shape_delete_btn_main").addEventListener("click", x().shapesPainterRemoveShape, !1);
            document.querySelector("#clear_all_button").addEventListener("click",
                x().clearAll, !1);
            document.querySelector("#btn_link").addEventListener("click", x().getPositionsLink, !1);
            h = new ShapesPainter({
                contextMenu: {
                    containerID: "context_menu_shape_main",
                    onMenuOpen: function(b) {
                        document.querySelector("#context_menu_shape_id_main").value = b.getId();
                        b = Math.ceil(.013092 * _boardObj.getSize().width / 3);
                        document.querySelector("#context_menu_shape_delete_btn_main").style.padding = b + "px"
                    }
                },
                onShapeAdded: function() {
                    w()
                },
                onShapeChanged: function() {
                    w()
                },
                onShapeRemoved: function() {
                    w()
                }
            });
            v = new Players({
                contextMenu: {
                    containerID: "context_menu_player_main",
                    onMenuOpen: function(b) {
                        document.querySelector("#context_menu_player_number_main").value = b.getNumber();
                        document.querySelector("#context_menu_player_name_main").value = b.getName();
                        document.querySelector("#context_menu_player_id_main").value = b.getId();
                        document.querySelector("#context_menu_player_name_main").focus()
                    }
                },
                onPlayerMoveEnd: function(b) {
                    n.players[b] = 1;
                    w()
                }
            });
            c = new Balls({
                contextMenu: {
                    containerID: "context_menu_ball_main",
                    onMenuOpen: function(b) {
                        document.querySelector("#context_menu_ball_name_main").value =
                            b.getName();
                        document.querySelector("#context_menu_ball_id_main").value = b.getId();
                        document.querySelector("#context_menu_ball_name_main").focus()
                    }
                },
                onBallMoveEnd: function(b) {
                    n.balls[b] = 1;
                    w()
                }
            });
            _linkDataStore.data.main ? E() : C();
            w()
        })();
        this.show = function(b) {
            b = b || {};
            !1 !== b.add_to_history && (b = "main", G && (b += "_" + G), window.history.pushState({
                page: "main"
            }, "", _siteUri + _langKey + "/" + _boardObj.getType() + "#" + b));
            document.querySelector("#btn_link").style.display = "block";
            document.querySelector("#btn_save_image").style.display =
                "block";
            document.querySelector("#btn_fullscreen").style.display = "block";
            document.querySelector("#btn_animation").style.display = "block";
            document.querySelector("#top_buttons_panel").style.display = "block";
            document.querySelector("#shapes_buttons_panel").style.display = "block";
            document.querySelector("#clear_all_button").style.display = "block";
            h.refresh();
            h.refreshPanelButtons();
            v.show();
            v.refresh();
            c.show();
            c.refresh();
            L();
            document.querySelector("#shapes_buttons_panel #remove_last_shape").addEventListener("click",
                x().shapesPainterRemoveLastShape, !1);
            document.querySelector("#shapes_buttons_panel #remove_all_shapes").addEventListener("click", x().shapesPainterRemoveAllShapes, !1)
        };
        this.hide = function() {
            L();
            document.querySelector("#btn_link").style.display = "none";
            document.querySelector("#btn_save_image").style.display = "none";
            document.querySelector("#btn_fullscreen").style.display = "none";
            document.querySelector("#btn_animation").style.display = "none";
            document.querySelector("#top_buttons_panel").style.display = "none";
            document.querySelector("#shapes_buttons_panel").style.display = "none";
            document.querySelector("#clear_all_button").style.display = "none";
            v.hide();
            c.hide();
            h.hide();
            h.disable()
        };
        this.refresh = function() {
            v.refresh();
            c.refresh();
            h.refresh()
        };
        this.getPlayers = function() {
            return v
        };
        this.getBalls = function() {
            return c
        };
        this.getShapesPainter = function() {
            return h
        }
    },
    Animation = function(J) {
        function q() {
            for (var a = [], b = 0; b < g.length; b++) {
                var c = {
                        elements: {}
                    },
                    d;
                for (d in g[b].elements) g[b].elements.hasOwnProperty(d) && (c.elements[d] = {}, c.elements[d].pos = g[b].elements[d].pos);
                if (g[b].shapes)
                    for (var e = 0; e < g[b].shapes.length; e++) c.shps || (c.shps = []), c.shps.push(g[b].shapes[e].getStoreInfo());
                a.push(c)
            }
            return {
                frames: a,
                frames_elements: M,
                speed: +S,
                repeat: +Y
            }
        }

        function w() {
            if (!(R && oa && "localStorage" in window && null !== window.localStorage)) return !1;
            localStorage.setItem("animation_" + _boardObj.getType(), JSON.stringify(q()))
        }

        function C() {
            if (!("localStorage" in window && null !== window.localStorage)) return !1;
            var a = JSON.parse(localStorage.getItem("animation_" +
                _boardObj.getType()));
            if (a) {
                (g = a.frames) || (g = []);
                for (var b = 0; b < g.length; b++) {
                    if (!g[b].elements) {
                        var c = g[b];
                        g[b] = {};
                        g[b].elements = c
                    }
                    if (g[b].shps) {
                        for (c = 0; c < g[b].shps.length; c++) {
                            var d = Shapes.Factory(g[b].shps[c].t, {
                                onChanged: function() {
                                    w()
                                }
                            });
                            if (d) {
                                var e = Math.ceil(_boardObj.getSize().width * N.getStrokeWidthToBoardCoeff());
                                d.getStrokeWidthToBoardCoeff && (e = _boardObj.getSize().width * d.getStrokeWidthToBoardCoeff());
                                e = Math.ceil(e);
                                d.create({
                                    canvas_element_id: ha,
                                    stroke_width: e
                                });
                                d.restore({
                                    points_positions_relations: g[b].shps[c].ppr,
                                    stroke_style: g[b].shps[c].ss,
                                    arrow: g[b].shps[c].a,
                                    stroke_color: g[b].shps[c].sc,
                                    fill_color: g[b].shps[c].fc
                                });
                                d.draw();
                                g[b].shapes || (g[b].shapes = []);
                                g[b].shapes.push(d);
                                da.push(d);
                                N.addShape(d)
                            }
                        }
                        delete g[b].shps
                    }
                }(M = a.frames_elements) || (M = {});
                (S = +a.speed) || (S = 5);
                Y = +a.repeat;
                Y = !!Y;
                1 < g.length && (B(g.length - 1) || g.pop())
            }
        }

        function E() {
            (g = _linkDataStore.data.animation.frames) || (g = []);
            for (var a = 0; a < g.length; a++) {
                if (!g[a].elements) {
                    var b = g[a];
                    g[a] = {};
                    g[a].elements = b
                }
                if (g[a].shps) {
                    for (b = 0; b < g[a].shps.length; b++) {
                        var c =
                            Shapes.Factory(g[a].shps[b].t, {
                                onChanged: function() {
                                    w()
                                }
                            });
                        if (c) {
                            var d = Math.ceil(_boardObj.getSize().width * N.getStrokeWidthToBoardCoeff());
                            c.getStrokeWidthToBoardCoeff && (d = _boardObj.getSize().width * c.getStrokeWidthToBoardCoeff());
                            d = Math.ceil(d);
                            c.create({
                                canvas_element_id: ha,
                                stroke_width: d
                            });
                            c.restore({
                                points_positions_relations: g[a].shps[b].ppr,
                                stroke_style: g[a].shps[b].ss,
                                arrow: g[a].shps[b].a,
                                stroke_color: g[a].shps[b].sc,
                                fill_color: g[a].shps[b].fc
                            });
                            c.draw();
                            g[a].shapes || (g[a].shapes = []);
                            g[a].shapes.push(c);
                            da.push(c);
                            N.addShape(c)
                        }
                    }
                    delete g[a].shps
                }
            }(M = _linkDataStore.data.animation.frames_elements) || (M = {});
            (S = +_linkDataStore.data.animation.speed) || (S = 5);
            Y = +_linkDataStore.data.animation.repeat;
            Y = !!Y;
            (R = void 0 === _linkDataStore.data.animation.edit_mode ? !0 : !!_linkDataStore.data.animation.edit_mode) || (oa = !1);
            _linkDataStore.data.animation = null;
            delete _linkDataStore.data.animation
        }

        function L() {
            function b(a) {
                var b = _boardObj.getSize().width * _boardObj.getPlayerToBoardWidthCoeff();
                $("#anim_frames_container").scrollLeft($("#anim_frames_container").scrollLeft() +
                    a * b)
            }
            document.querySelector("#context_menu_player_number_animation").addEventListener("input", G().playerContextMenuNumberInput, !1);
            document.querySelector("#context_menu_player_name_animation").addEventListener("input", G().playerContextMenuNameInput, !1);
            document.querySelector("#context_menu_player_animation").addEventListener("keypress", G().contextMenuKeyPress, !1);
            document.querySelector("#context_menu_player_delete_btn_animation").addEventListener("click", G().playerContextMenuDelete, !1);
            document.querySelector("#context_menu_ball_name_animation").addEventListener("input",
                G().ballContextMenuNameInput, !1);
            document.querySelector("#context_menu_ball_animation").addEventListener("keypress", G().contextMenuKeyPress, !1);
            document.querySelector("#context_menu_ball_delete_btn_animation").addEventListener("click", G().ballContextMenuDelete, !1);
            document.querySelector("#context_menu_shape_delete_btn_animation").addEventListener("click", G().shapesPainterRemoveShape, !1);
            document.querySelector("#btn_anim_add_frame").addEventListener("click", G().addFrameButtonClick, !1);
            document.querySelector("#btn_anim_start_frame").addEventListener("click",
                G().addStartFrameButtonClick, !1);
            document.querySelector("#remove_frame_button_img").addEventListener("click", G().removeFrameButtonClick, !1);
            document.querySelector("#btn_animation_frames_left").addEventListener("click", function() {
                b(-1)
            }, !1);
            document.querySelector("#btn_animation_frames_right").addEventListener("click", function() {
                b(1)
            }, !1);
            document.querySelector("#animation_play").addEventListener("click", function() {
                a(!1)
            }, !1);
            document.querySelector("#animation_play_current_frame").addEventListener("click",
                function() {
                    a(!0)
                }, !1);
            document.querySelector("#animation_pause").addEventListener("click", function() {
                u()
            }, !1);
            document.querySelector("#animation_stop").addEventListener("click", function() {
                r()
            }, !1);
            document.querySelector("#btn_animation_remove_last_frame").addEventListener("click", function() {
                c()
            }, !1);
            document.querySelector("#animation_repeat").addEventListener("click", function() {
                Y = !Y;
                removeClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
                Y && addClass(document.querySelector("#animation_buttons_panel #animation_repeat"),
                    "button-selected");
                w()
            }, !1);
            document.querySelector("#btn_animation_speed_plus").addEventListener("click", function() {
                m(S + 1)
            }, !1);
            document.querySelector("#btn_animation_speed_minus").addEventListener("click", function() {
                m(S - 1)
            }, !1);
            document.querySelector("#clear_animation_button").addEventListener("click", G().clearAnimationButtonClick, !1);
            document.querySelector("#btn_animation_links").addEventListener("click", G().animationLinksButtonClick, !1);
            $.fn.dragImCircleMobile = G().dragImCircleMobile
        }

        function x() {
            document.querySelector("#shapes_buttons_panel #remove_last_shape").removeEventListener("click",
                G().shapesPainterRemoveLastShape);
            document.querySelector("#shapes_buttons_panel #remove_all_shapes").removeEventListener("click", G().shapesPainterRemoveAllShapes)
        }

        function G() {
            qa || (qa = {
                contextMenuKeyPress: function(a) {
                    13 == a.which && hideElement(".context-menu")
                },
                playerContextMenuNumberInput: function() {
                    var a = document.querySelector("#context_menu_player_id_animation").value,
                        b = document.querySelector("#context_menu_player_number_animation").value;
                    O.setPlayerNumber(a, b);
                    M[a].nmb = b;
                    w()
                },
                playerContextMenuNameInput: function() {
                    var a =
                        document.querySelector("#context_menu_player_id_animation").value,
                        b = document.querySelector("#context_menu_player_name_animation").value;
                    O.setPlayerName(a, b);
                    M[a].nm = b;
                    w()
                },
                playerContextMenuDelete: function() {
                    var a = document.querySelector("#context_menu_player_id_animation").value;
                    e(a)
                },
                ballContextMenuNameInput: function() {
                    var a = document.querySelector("#context_menu_ball_id_animation").value,
                        b = document.querySelector("#context_menu_ball_name_animation").value;
                    Q.setBallName(a, b);
                    M[a].nm = b;
                    w()
                },
                ballContextMenuDelete: function() {
                    var a =
                        document.querySelector("#context_menu_ball_id_animation").value;
                    e(a)
                },
                shapesPainterRemoveShape: function(a) {
                    a = document.querySelector("#context_menu_shape_id_animation").value;
                    b(a, H);
                    N.removeShape(a)
                },
                shapesPainterRemoveLastShape: function(a) {
                    g[H].shapes && 0 < g[H].shapes.length && (a = g[H].shapes[g[H].shapes.length - 1].getId(), b(a, H), N.removeShape(a), w())
                },
                shapesPainterRemoveAllShapes: function(a) {
                    if (g[H].shapes && 0 < g[H].shapes.length) {
                        for (; 0 < g[H].shapes.length;) a = g[H].shapes[0].getId(), b(a, H), N.removeShape(a);
                        g[H].shapes = [];
                        w()
                    }
                },
                addFrameButtonClick: function(a) {
                    a.preventDefault();
                    v();
                    return !1
                },
                addStartFrameButtonClick: function(a) {
                    a.preventDefault();
                    r();
                    H = 0;
                    l(0);
                    return !1
                },
                removeFrameButtonClick: function(a) {
                    a.preventDefault();
                    r();
                    if (a = parseInt(document.querySelector("#context_menu_frame_button > #context_menu_frame_button_index").value)) h(a), H = a < g.length && 0 <= a ? a : g.length - 1, l(H);
                    hideElement(".context-menu");
                    return !1
                },
                clearAnimationButtonClick: function(a) {
                    a = _projectTexts.get();
                    new ModalWindow({
                        html: '<p class="info-modal-window">' +
                            a.are_you_sure + "<br>" + a.ensure_you_got_animation_links + "</p>",
                        yesButtonFunction: function() {
                            A()
                        }
                    })
                },
                animationLinksButtonClick: function(a) {
                    a.preventDefault();
                    a = generateUUID() + "_" + _boardObj.getKey() + _langKey;
                    if (2 > g.length) return !1;
                    if (!B(g.length - 1)) {
                        if (3 > g.length) return a = _projectTexts.get(), new ModalWindow({
                            html: '<p class="info-modal-window">' + a.animation_no_moves_for_animation + "</p>",
                            closeButton: !0
                        }), !1;
                        c()
                    }
                    new ModalWindow({
                        html: '<div class="loading-image-modal-window"></div>'
                    });
                    for (var b = !1, d = JSON.stringify(q()),
                            e = [], f = 0;;) {
                        var va = d.substr(1E5 * f, 1E5);
                        if ("" === va) break;
                        e.push(va);
                        f++
                    }
                    for (d = 0; d < e.length && !b; d++) ajax({
                        url: _siteUri + "&ajax_request=store_animation_data_for_link",
                        type: "post",
                        async: !1,
                        data: {
                            linkToken: a,
                            boardType: _boardObj.getType(),
                            langKey: _langKey,
                            dataPart: e[d],
                            dataPartIndex: d
                        },
                        error: function(a) {
                            b = !0;
                            console.log(a)
                        }
                    });
                    ajax({
                        url: _siteUri + "&ajax_request=animation_links_window",
                        type: "post",
                        data: {
                            linkToken: a,
                            langKey: _langKey
                        },
                        success: function(a) {
                            if (b) a = _projectTexts.get(), new ModalWindow({
                                html: '<span class="error-modal-window">' +
                                    a.server_error + '</span><br><span class="error-modal-window">' + a.try_again_later + "</span>",
                                closeButton: !0
                            });
                            else {
                                new ModalWindow({
                                    html: a,
                                    closeButton: !0
                                });
                                a = Math.ceil(.0095 * _boardObj.getSize().width * document.querySelector("#txt_box_animation_edit_link").value.length);
                                var c = Math.ceil(.015 * _boardObj.getSize().width);
                                document.querySelector("#txt_box_animation_link").style.fontSize = c + "px";
                                document.querySelector("#txt_box_animation_link").style.width = a + "px";
                                document.querySelector("#txt_box_animation_edit_link").style.fontSize =
                                    c + "px";
                                document.querySelector("#txt_box_animation_edit_link").style.width = a + "px";
                                document.querySelector("#copy_animation_link_button").style.width = a + "px";
                                document.querySelector("#copy_animation_link_button").style.height = 3 * c + "px";
                                document.querySelector("#copy_animation_edit_link_button").style.width = a + "px";
                                document.querySelector("#copy_animation_edit_link_button").style.height = 3 * c + "px";
                                document.queryCommandSupported("copy") ? (document.querySelector("#copy_animation_link_button").addEventListener("click",
                                    function() {
                                        try {
                                            document.querySelector("#txt_box_animation_link").select(), document.execCommand("copy")
                                        } catch (ra) {
                                            console.log(ra)
                                        }
                                    }), document.querySelector("#copy_animation_edit_link_button").addEventListener("click", function() {
                                    try {
                                        document.querySelector("#txt_box_animation_edit_link").select(), document.execCommand("copy")
                                    } catch (ra) {
                                        console.log(ra)
                                    }
                                })) : isFlashEnabled() ? ($("#copy_animation_link_button").zclip({
                                    path: _siteUri + "Public/Js/ZeroClipboard.swf",
                                    copy: document.querySelector("#txt_box_animation_link").value,
                                    afterCopy: function() {
                                        document.querySelector("#txt_box_animation_link").select()
                                    }
                                }), $("#copy_animation_edit_link_button").zclip({
                                    path: _siteUri + "Public/Js/ZeroClipboard.swf",
                                    copy: document.querySelector("#txt_box_animation_edit_link").value,
                                    afterCopy: function() {
                                        document.querySelector("#txt_box_animation_edit_link").select()
                                    }
                                })) : ($("#copy_animation_link_button").hide(), $("#copy_animation_edit_link_button").hide())
                            }
                        },
                        error: function(a) {
                            console.log(a);
                            a = _projectTexts.get();
                            new ModalWindow({
                                html: '<span class="error-modal-window">' +
                                    a.server_error + '</span><br><span class="error-modal-window">' + a.try_again_later + "</span>",
                                closeButton: !0
                            })
                        }
                    });
                    return !1
                },
                frameElementMoveStart: function(a) {
                    var b = document.querySelector("#anim_circle_im1_" + a);
                    b && b.remove();
                    (a = document.querySelector("#anim_circle_im2_" + a)) && a.remove()
                },
                frameElementMove: function(a, b) {
                    n(a, b, H);
                    if (void 0 === g[H].elements[a]) return !1;
                    g[H].elements[a].pos.e = b;
                    if (void 0 !== g[H].elements[a].pos.s) {
                        var c = g[H].elements[a].pos.s;
                        g[H].elements[a].pos.im1 = {};
                        g[H].elements[a].pos.im1.x =
                            c.x + (b.x - c.x) / 3;
                        g[H].elements[a].pos.im1.y = c.y + (b.y - c.y) / 3;
                        g[H].elements[a].pos.im2 = {};
                        g[H].elements[a].pos.im2.x = c.x + (b.x - c.x) / 3 * 2;
                        g[H].elements[a].pos.im2.y = c.y + (b.y - c.y) / 3 * 2;
                        void 0 === g[H].elements[a].line_way && d(a, H);
                        var e = $("#" + a).width() / 2 + _boardObj.getSize().width * c.x,
                            f = $("#" + a).width() / 2 + _boardObj.getSize().height * c.y,
                            c = e + "," + f,
                            e = $("#" + a).width() / 2 + _boardObj.getSize().width * b.x,
                            f = $("#" + a).width() / 2 + _boardObj.getSize().height * b.y;
                        g[H].elements[a].line_way.attr("points", c + (" " + e + "," + f))
                    }
                    return !0
                },
                frameElementMoveEnd: function(a, b) {
                    for (var c = H + 1; c < g.length; c++) g[c].elements[a] ? (g[c].elements[a].pos.s.x == g[c].elements[a].pos.e.x && (g[c].elements[a].pos.e.x = g[c - 1].elements[a].pos.e.x, g[c].elements[a].pos.e.y = g[c - 1].elements[a].pos.e.y), g[c].elements[a].pos.s.x = g[c - 1].elements[a].pos.e.x, g[c].elements[a].pos.s.y = g[c - 1].elements[a].pos.e.y, c == H + 1 && g[c].elements[a].pos.im1 && (g[c].elements[a].pos.im1 = {}, g[c].elements[a].pos.im1.x = g[c].elements[a].pos.s.x + (g[c].elements[a].pos.e.x - g[c].elements[a].pos.s.x) /
                        3, g[c].elements[a].pos.im1.y = g[c].elements[a].pos.s.y + (g[c].elements[a].pos.e.y - g[c].elements[a].pos.s.y) / 3, g[c].elements[a].pos.im2 = {}, g[c].elements[a].pos.im2.x = g[c].elements[a].pos.s.x + (g[c].elements[a].pos.e.x - g[c].elements[a].pos.s.x) / 3 * 2, g[c].elements[a].pos.im2.y = g[c].elements[a].pos.s.y + (g[c].elements[a].pos.e.y - g[c].elements[a].pos.s.y) / 3 * 2)) : (n(a, b, c), g[c].elements[a].pos.s = {}, g[c].elements[a].pos.s.x = b.x, g[c].elements[a].pos.s.y = b.y);
                    if (!g[H].elements[a]) return !1;
                    w();
                    if (void 0 === g[H].elements[a].line_way ||
                        void 0 === g[H].elements[a].pos.im1) return !1;
                    U(a, H);
                    f(a, H)
                },
                dragImCircleMobile: function(a, b) {
                    var c = null,
                        d = Math.ceil(_boardObj.getSize().width * pa);
                    this.on("touchstart", function(a) {
                        N.removeAdditionalShapes();
                        hideElement(".context-menu");
                        a = a.originalEvent;
                        c = {
                            x: a.changedTouches[0].pageX - parseFloat($(this).attr("cx")) + parseFloat($(this).attr("r")),
                            y: a.changedTouches[0].pageY - parseFloat($(this).attr("cy")) + parseFloat($(this).attr("r"))
                        }
                    });
                    this.on("touchmove", function(e) {
                        e.preventDefault();
                        var g = e.originalEvent;
                        e = $("#" + a).width() / 2;
                        var h = g.changedTouches[0].pageX - c.x + d,
                            g = g.changedTouches[0].pageY - c.y + d;
                        h < d ? h = d : h > _boardObj.getSize().width - d && (h = _boardObj.getSize().width - d);
                        g < 4 * d ? g = 4 * d : g > $("#" + ha).height() - 4 * d && (g = $("#" + ha).height() - 4 * d);
                        tY = g + "px";
                        tX = h + "px";
                        $(this).attr("cx", tX);
                        $(this).attr("cy", tY);
                        b.x = (h - e) / _boardObj.getSize().width;
                        b.y = (g - e) / _boardObj.getSize().height;
                        f(a, H);
                        return !1
                    });
                    this.on("touchend", function(a) {
                        w()
                    })
                }
            });
            return qa
        }

        function v() {
            r();
            var a = {
                elements: {}
            };
            if (0 === g.length) return g.push(a),
                l(g.length - 1), !0;
            if (1 == g.length && (!g[0].elements || emptyObject(g[0].elements))) return a = _projectTexts.get(), new ModalWindow({
                html: '<p class="info-modal-window">' + a.animation_add_at_least_one_element + "</p>",
                closeButton: !0
            }), !1;
            if (!B(g.length - 1)) {
                if (H !== g.length - 1) return H = g.length - 1, l(g.length - 1), !1;
                a = _projectTexts.get();
                new ModalWindow({
                    html: '<p class="info-modal-window">' + a.animation_no_moves_on_prev_frame + "</p>",
                    closeButton: !0
                });
                return !1
            }
            var b = g[g.length - 1],
                c;
            for (c in b.elements)
                if (b.elements.hasOwnProperty(c)) {
                    var d = {
                        x: b.elements[c].pos.e.x,
                        y: b.elements[c].pos.e.y
                    };
                    a.elements[c] = {};
                    a.elements[c].pos = {};
                    a.elements[c].pos.s = d;
                    a.elements[c].pos.e = d
                }
            if (b.shapes && 0 < b.shapes.length)
                for (c = 0; c < b.shapes.length; c++) {
                    var d = b.shapes[c].getStoreInfo(),
                        e = Shapes.Factory(d.t, {
                            onChanged: function() {
                                w()
                            }
                        });
                    if (e) {
                        var f = Math.ceil(_boardObj.getSize().width * N.getStrokeWidthToBoardCoeff());
                        e.getStrokeWidthToBoardCoeff && (f = _boardObj.getSize().width * e.getStrokeWidthToBoardCoeff());
                        f = Math.ceil(f);
                        e.create({
                            canvas_element_id: ha,
                            stroke_width: f
                        });
                        e.restore({
                            points_positions_relations: d.ppr,
                            stroke_style: d.ss,
                            arrow: d.a,
                            stroke_color: d.sc,
                            fill_color: d.fc
                        });
                        e.draw();
                        a.shapes || (a.shapes = []);
                        a.shapes.push(e);
                        da.push(e);
                        N.addShape(e)
                    }
                }
            g.push(a);
            F();
            H = g.length - 1;
            l(g.length - 1);
            R && showElement("#btn_animation_remove_last_frame");
            w()
        }

        function c() {
            if (2 > g.length) return !1;
            r();
            if (g[g.length - 1].shapes && 0 < g[g.length - 1].shapes.length)
                for (; 0 < g[g.length - 1].shapes.length;) {
                    var a = g[g.length - 1].shapes[0].getId();
                    b(a, g.length - 1);
                    N.removeShape(a)
                }
            g.pop();
            for (var a = {}, c = 0; c < g.length; c++)
                for (var d in g[c].elements) g[c].elements.hasOwnProperty(d) && (a[d] = 1);
            for (d in M) M.hasOwnProperty(d) && void 0 == a[d] && (delete M[d], removeClass(document.querySelector("#" + d), "anim-elem"), showElement("#" + d));
            document.querySelector("#btn_anim_frame_" + g.length).remove();
            P();
            H = g.length - 1;
            l(g.length - 1);
            2 > g.length && hideElement("#btn_animation_remove_last_frame");
            w()
        }

        function h(a) {
            if (g[a].shapes && 0 < g[a].shapes.length) {
                for (; 0 < g[a].shapes.length;) {
                    var c = g[a].shapes[0].getId();
                    b(c, a);
                    N.removeShape(c)
                }
                g[a].shapes = [];
                w()
            }
            g[a] = void 0;
            g.splice(a, 1);
            for (c = a; c < g.length && g[c - 1] && g[c].elements; c++)
                for (var d in g[c].elements) g[c].elements.hasOwnProperty(d) && g[c].elements[d].pos.s && g[c - 1].elements[d] && g[c - 1].elements[d].pos.e && (g[c].elements[d].pos.s.x == g[c].elements[d].pos.e.x && (g[c].elements[d].pos.e.x = g[c - 1].elements[d].pos.e.x, g[c].elements[d].pos.e.y = g[c - 1].elements[d].pos.e.y), g[c].elements[d].pos.s.x = g[c - 1].elements[d].pos.e.x, g[c].elements[d].pos.s.y = g[c - 1].elements[d].pos.e.y, c == a && g[c].elements[d].pos.im1 &&
                    (g[c].elements[d].pos.im1 = {}, g[c].elements[d].pos.im1.x = g[c].elements[d].pos.s.x + (g[c].elements[d].pos.e.x - g[c].elements[d].pos.s.x) / 3, g[c].elements[d].pos.im1.y = g[c].elements[d].pos.s.y + (g[c].elements[d].pos.e.y - g[c].elements[d].pos.s.y) / 3, g[c].elements[d].pos.im2 = {}, g[c].elements[d].pos.im2.x = g[c].elements[d].pos.s.x + (g[c].elements[d].pos.e.x - g[c].elements[d].pos.s.x) / 3 * 2, g[c].elements[d].pos.im2.y = g[c].elements[d].pos.s.y + (g[c].elements[d].pos.e.y - g[c].elements[d].pos.s.y) / 3 * 2));
            a = document.querySelectorAll('div [id^="btn_anim_frame_"]');
            for (d = 0; d < a.length; d++) a[d].remove();
            for (a = 1; a < g.length; a++) F(a);
            hideElement("#btn_animation_remove_last_frame");
            1 < g.length && showElement("#btn_animation_remove_last_frame")
        }

        function n(a, b, c) {
            void 0 === c && (c = H);
            if (g[c].elements && void 0 !== g[c].elements[a]) return !1;
            void 0 === M[a] && addClass(document.querySelector("#" + a), "anim-elem");
            M[a] = {};
            void 0 !== J && (M[a] = J);
            g[c].elements[a] = {};
            g[c].elements[a].pos = {};
            g[c].elements[a].pos.e = b;
            w();
            return !0
        }

        function e(a) {
            var b;
            M[a] && delete M[a];
            for (b = 0; b < g.length; b++) g[b].elements[a] &&
                delete g[b].elements[a];
            (b = document.querySelector("#anim_clone_" + a)) && b.remove();
            (b = document.querySelector("#anim_circle_im1_" + a)) && b.remove();
            (b = document.querySelector("#anim_circle_im2_" + a)) && b.remove();
            (b = document.querySelector("#anim_line_way_" + a)) && b.remove();
            hideElement(".context-menu");
            0 === a.indexOf("animation_player_") ? O.reset({
                player_id: a
            }) : 0 === a.indexOf("animation_ball_") && Q.reset({
                ball_id: a
            });
            emptyObject(g[H].elements) && (h(H), 0 < H && H--);
            if (g.length) {
                for (b = g.length - 1; !(emptyObject(g[b].elements) ?
                        (h(b), H = b = g.length - 1) : b--, 0 > b););
                if (g.length) {
                    for (; !B(g.length - 1) && !(c(), 2 > g.length););
                    if (1 < g.length)
                        for (b = 1; !(B(b) ? b++ : (h(b), b = 1), b >= g.length););
                } else A()
            } else A();
            if (H >= g.length || 0 > H) H = g.length - 1;
            l(H);
            P();
            w()
        }

        function b(a, b) {
            for (var c = 0; c < g[b].shapes.length; c++) g[b].shapes[c].getId() == a && g[b].shapes.splice(c, 1);
            for (c = 0; c < da.length; c++) da[c].getId() == a && da.splice(c, 1)
        }

        function m(b) {
            void 0 !== b && (S = b);
            9 < S && (S = 9);
            1 > S && (S = 1);
            document.querySelector("#animation_speed_text").innerHTML = S;
            w();
            ka = 1;
            8 < S ? ka =
                6 : 6 < S ? ka = 4 : 4 < S && (ka = 2);
            3 < S ? ma = 500 * (10 - S) : 3 == S ? ma = 4E3 : 2 == S ? ma = 5E3 : 1 == S && (ma = 7E3);
            aa && (u(), a(na))
        }

        function l(a) {
            void 0 === a && (a = H);
            !R || aa || ga || (O.lockMoving(!1), O.lockContextMenu(!1), Q.lockMoving(!1), Q.lockContextMenu(!1), N.lockShapesFocusing(!1), N.lockShapesChanging(!1), N.lockContextMenu(!1));
            y();
            if (R && !aa && !ga)
                for (var b in M) M.hasOwnProperty(b) && (0 === b.indexOf("animation_player_") ? O.reset({
                    player_id: b
                }) : 0 === b.indexOf("animation_ball_") && Q.reset({
                    ball_id: b
                }), hideElement("#" + b));
            for (b in g[a].elements)
                if (g[a].elements.hasOwnProperty(b)) {
                    showElement("#" +
                        b);
                    var c = {
                        top: g[a].elements[b].pos.e.y,
                        left: g[a].elements[b].pos.e.x
                    };
                    R || (c = void 0 !== g[a].elements[b].pos.s ? {
                        top: g[a].elements[b].pos.s.y,
                        left: g[a].elements[b].pos.s.x
                    } : {
                        top: g[a].elements[b].pos.e.y,
                        left: g[a].elements[b].pos.e.x
                    });
                    void 0 !== ja[b] ? c = {
                        top: ja[b].y,
                        left: ja[b].x
                    } : !0 === aa && void 0 !== g[a].elements[b].pos.s && (c = {
                        top: g[a].elements[b].pos.s.y,
                        left: g[a].elements[b].pos.s.x
                    });
                    0 === b.indexOf("animation_player_") ? (O.setPlayerPosition(b, {
                        playerPositionRelations: c
                    }), void 0 !== M[b] && (void 0 !== M[b].nmb &&
                        O.setPlayerNumber(b, M[b].nmb), void 0 !== M[b].nm && O.setPlayerName(b, M[b].nm), void 0 !== M[b].z && O.setPlayerZindex(b, M[b].z))) : 0 === b.indexOf("animation_ball_") && (Q.setBallPosition(b, {
                        ballPositionRelations: c
                    }), void 0 !== M[b] && void 0 !== M[b].nm && Q.setBallName(b, M[b].nm));
                    void 0 !== g[a].elements[b].pos.s && void 0 === g[a].elements[b].pos.im1 && !0 !== aa && !0 !== ga && 1 == R && (0 === b.indexOf("animation_player_") && O.createPlayerClone(b, "anim_clone_"), 0 === b.indexOf("animation_ball_") && Q.createBallClone(b, "anim_clone_"));
                    void 0 !==
                        g[a].elements[b].pos.im1 && !0 !== aa && !0 !== ga && (1 == R && (0 === b.indexOf("animation_player_") && O.createPlayerClone(b, "anim_clone_", g[a].elements[b].pos.s), 0 === b.indexOf("animation_ball_") && Q.createBallClone(b, "anim_clone_", g[a].elements[b].pos.s), d(b, a), U(b, a)), f(b, a))
                }
            N.removeAdditionalShapes();
            ca();
            if (g[a].shapes && g[a].shapes.length)
                for (b = 0; b < g[a].shapes.length; b++) g[a].shapes[b].show();
            R && D(a)
        }

        function u() {
            O.lockMoving(!0);
            O.lockContextMenu(!0);
            Q.lockMoving(!0);
            Q.lockContextMenu(!0);
            N.lockShapesFocusing(!0);
            N.lockShapesChanging(!0);
            N.lockContextMenu(!0);
            if (aa) {
                aa = !1;
                ga = !0;
                clearInterval(la);
                for (var a = document.querySelectorAll("#animation_buttons_panel .button"), b = 0; b < a.length; b++) removeClass(a[b], "button-selected");
                addClass(document.querySelector("#animation_buttons_panel #animation_pause"), "button-selected");
                return !1
            }
        }

        function a(a) {
            if (aa) return !1;
            na = a;
            na = !!na;
            N.removeAdditionalShapes();
            if (!ga) {
                if (2 > g.length) return !1;
                if (!0 === a) {
                    if (!B(H)) return a = _projectTexts.get(), new ModalWindow({
                        html: '<p class="info-modal-window">' +
                            a.animation_no_moves_on_current_frame + "</p>",
                        closeButton: !0
                    }), !1
                } else if (!B(g.length - 1)) {
                    if (3 > g.length) return a = _projectTexts.get(), new ModalWindow({
                        html: '<p class="info-modal-window">' + a.animation_no_moves_for_animation + "</p>",
                        closeButton: !0
                    }), !1;
                    c()
                }
                V = 1;
                clearInterval(la);
                if (!0 === a || 0 < H && H < g.length - 1) V = H;
                R && (y(), p(!1), hideElement("#shapes_buttons_panel"), N.disable());
                for (var b = 0; b < g.length; b++)
                    for (var d in g[b].elements)
                        if (g[b].elements.hasOwnProperty(d) && (g[b].elements[d].element = document.querySelector("#" +
                                d), g[b].elements[d].lineWayPoints = void 0, void 0 !== g[b].elements[d].pos.im1)) {
                            var e = [];
                            e.push({
                                x: g[b].elements[d].pos.s.x,
                                y: g[b].elements[d].pos.s.y
                            });
                            e.push({
                                x: g[b].elements[d].pos.im1.x,
                                y: g[b].elements[d].pos.im1.y
                            });
                            e.push({
                                x: g[b].elements[d].pos.im2.x,
                                y: g[b].elements[d].pos.im2.y
                            });
                            e.push({
                                x: g[b].elements[d].pos.e.x,
                                y: g[b].elements[d].pos.e.y
                            });
                            g[b].elements[d].lineWayPoints = ba(e);
                            ea || (ea = g[b].elements[d].lineWayPoints.length)
                        }
            }
            aa = !0;
            ga = !1;
            O.lockMoving(!0);
            O.lockContextMenu(!0);
            Q.lockMoving(!0);
            Q.lockContextMenu(!0);
            N.lockShapesFocusing(!0);
            N.lockShapesChanging(!0);
            N.lockContextMenu(!0);
            sa = document.querySelectorAll(".anim-elem");
            k(a, ma / (ea / ka) * .95);
            b = document.querySelectorAll("#animation_buttons_panel .button");
            for (d = 0; d < b.length; d++) removeClass(b[d], "button-selected");
            a ? addClass(document.querySelector("#animation_buttons_panel #animation_play_current_frame"), "button-selected") : addClass(document.querySelector("#animation_buttons_panel #animation_play"), "button-selected")
        }

        function k(a, b) {
            var c =
                g[V],
                d = (g.length - 1) * ea;
            R && D(V);
            la = setInterval(function() {
                if (X >= ea) {
                    ja = {};
                    if (!0 !== a)
                        if (V++, V < g.length) X = X - ea + 1, c = g[V];
                        else if (!0 === Y) {
                        for (var b = X = 0; b < sa.length; b++) sa[b].style.display = "none";
                        V = 1;
                        c = g[V]
                    } else return clearInterval(la), b = 100, R || (b = 750), setTimeout(function() {
                        r()
                    }, b), !1;
                    else if (Y) X = 0;
                    else return clearInterval(la), setTimeout(function() {
                        r()
                    }, 100), !1;
                    R && D(V)
                }
                for (var e in c.elements) c.elements.hasOwnProperty(e) && (c.elements[e].element.style.display = "block", void 0 !== c.elements[e].lineWayPoints ?
                    (0 === e.indexOf("animation_player_") && O.setPlayerPosition(e, {
                        playerPositionRelations: {
                            left: c.elements[e].lineWayPoints[X].x,
                            top: c.elements[e].lineWayPoints[X].y
                        }
                    }), 0 === e.indexOf("animation_ball_") && Q.setBallPosition(e, {
                        ballPositionRelations: {
                            left: c.elements[e].lineWayPoints[X].x,
                            top: c.elements[e].lineWayPoints[X].y
                        }
                    }), ja[e] = c.elements[e].lineWayPoints[X]) : void 0 === c.elements[e].pos.s ? (0 === e.indexOf("animation_player_") && O.setPlayerPosition(e, {
                            playerPositionRelations: {
                                left: c.elements[e].pos.e.x,
                                top: c.elements[e].pos.e.y
                            }
                        }),
                        0 === e.indexOf("animation_ball_") && Q.setBallPosition(e, {
                            ballPositionRelations: {
                                left: c.elements[e].pos.e.x,
                                top: c.elements[e].pos.e.y
                            }
                        }), void 0 !== M[e] && (0 === e.indexOf("animation_player_") ? (void 0 !== M[e].nmb && O.setPlayerNumber(e, M[e].nmb), void 0 !== M[e].nm && O.setPlayerName(e, M[e].nm), void 0 !== M[e].z && O.setPlayerZindex(e, M[e].z)) : 0 === e.indexOf("animation_ball_") && void 0 !== M[e].nm && Q.setBallName(e, M[e].nm))) : (0 === e.indexOf("animation_player_") && O.setPlayerPosition(e, {
                        playerPositionRelations: {
                            left: c.elements[e].pos.s.x,
                            top: c.elements[e].pos.s.y
                        }
                    }), 0 === e.indexOf("animation_ball_") && Q.setBallPosition(e, {
                        ballPositionRelations: {
                            left: c.elements[e].pos.s.x,
                            top: c.elements[e].pos.s.y
                        }
                    })));
                K(Math.round(((V - 1) * ea + X) / d * 100));
                ca();
                if (g[V].shapes && g[V].shapes.length)
                    for (b = 0; b < g[V].shapes.length; b++) g[V].shapes[b].show();
                X = V != g.length - 1 && !0 !== a || 1 != ea - X ? X + ka : ea;
                X > ea && (V == g.length - 1 || !0 === a) && (X = ea - 1)
            }, b)
        }

        function r() {
            clearInterval(la);
            K(0);
            X = 0;
            V = 1;
            ja = {};
            if (!aa && !ga) return !1;
            ga = aa = !1;
            if (R) p(!0), showElement("#shapes_buttons_panel"),
                N.enable(), !0 === na ? l(H) : 0 < g.length && R && (H = g.length - 1, l(g.length - 1), $("#anim_frames_container").scrollLeft(1E3));
            else {
                hideElement(".anim-elem");
                for (var a in g[1].elements) g[1].elements.hasOwnProperty(a) && showElement("#" + a);
                H = 1;
                l(1)
            }
            a = document.querySelectorAll("#animation_buttons_panel .button");
            for (var b = 0; b < a.length; b++) removeClass(a[b], "button-selected")
        }

        function A() {
            r();
            y();
            for (var a = document.querySelectorAll('div [id^="btn_anim_frame_"]'), b = 0; b < a.length; b++) a[b].remove();
            O.lockMoving(!1);
            O.lockContextMenu(!1);
            Q.lockMoving(!1);
            Q.lockContextMenu(!1);
            N.lockShapesFocusing(!1);
            N.lockShapesChanging(!1);
            N.lockContextMenu(!1);
            for (var c in M) M.hasOwnProperty(c) && removeClass(document.querySelector("#" + c), "anim-elem");
            showElement("#" + c);
            p(!0);
            O.reset();
            Q.reset();
            S = 5;
            m(S);
            Y = !0;
            removeClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            Y && addClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            oa && "localStorage" in window && null !== window.localStorage &&
                localStorage.removeItem("animation_" + _boardObj.getType());
            g = [];
            M = {};
            v();
            P()
        }

        function B(a) {
            if (2 > g.length) return !0;
            var b = !1,
                c;
            for (c in g[a].elements)
                if (g[a].elements.hasOwnProperty(c) && void 0 !== g[a].elements[c].pos.s && void 0 !== g[a].elements[c].pos.e && (g[a].elements[c].pos.e.x != g[a].elements[c].pos.s.x || g[a].elements[c].pos.e.y != g[a].elements[c].pos.s.y || void 0 !== g[a].elements[c].pos.im1)) {
                    b = !0;
                    break
                }
            return b
        }

        function D(a) {
            removeClass(document.querySelector("#btn_anim_start_frame"), "anim-frame-selected");
            for (var b = document.querySelectorAll('div [id^="btn_anim_frame_"]'), c = 0; c < b.length; c++) removeClass(b[c], "anim-frame-selected");
            0 == a ? addClass(document.querySelector("#btn_anim_start_frame"), "anim-frame-selected") : addClass(document.querySelector("#btn_anim_frame_" + a), "anim-frame-selected");
            H = a;
            aa && $("#anim_frames_container").scrollLeft($("#btn_anim_start_frame").width() * a)
        }

        function y() {
            for (var a = document.querySelectorAll(".anim-circle"), b = 0; b < a.length; b++) a[b].remove();
            a = document.querySelectorAll(".anim-circle-touch");
            for (b = 0; b < a.length; b++) a[b].remove();
            a = document.querySelectorAll(".anim-line-way");
            for (b = 0; b < a.length; b++) a[b].remove();
            a = document.querySelectorAll('[id^="anim_clone_"]');
            for (b = 0; b < a.length; b++) a[b].remove()
        }

        function F(a) {
            ia = !0;
            void 0 === a && (a = g.length - 1);
            var b = "btn_anim_frame_" + a,
                c = $("#btn_anim_start_frame").clone();
            c.insertBefore("#btn_anim_add_frame");
            P();
            c.attr("id", b);
            document.querySelector("#" + b + " .anim-frame-text").innerHTML = a;
            $(".c2").width();
            $("#anim_frames_container").scrollLeft(1E3);
            c.on("click",
                function() {
                    hideElement(".context-menu");
                    if (!ia) return !1;
                    r();
                    H = a;
                    l(a);
                    return !1
                });
            c.on("mousedown", function(a) {
                hideElement(".context-menu");
                z(a);
                return !1
            });
            c.on("touchstart", function(a) {
                hideElement(".context-menu");
                z(a)
            });
            c.on("contextmenu", t)
        }

        function t() {
            hideElement(".context-menu");
            clearTimeout(wa);
            var a = this.id.replace("btn_anim_frame_", "");
            if (a != H) return !1;
            var b = document.querySelector("#context_menu_frame_button"),
                c = this.offsetWidth,
                d = this.offsetTop,
                e = this.offsetHeight;
            b.style.left = this.offsetLeft +
                "px";
            b.style.top = d + "px";
            b.style.width = c + "px";
            b.style.height = e + "px";
            d = document.querySelector("#context_menu_frame_button > #remove_frame_button_img");
            d.style.width = c + "px";
            d.style.height = e + "px";
            b.style.display = "block";
            document.querySelector("#context_menu_frame_button > #context_menu_frame_button_index").value = a;
            wa = setTimeout(function() {
                document.querySelector("#context_menu_frame_button").style.display = "none"
            }, 2E3);
            return !1
        }

        function f(a, b) {
            void 0 === b && (b = g.length - 1);
            var c = [];
            c.push({
                x: g[b].elements[a].pos.s.x,
                y: g[b].elements[a].pos.s.y
            });
            c.push({
                x: g[b].elements[a].pos.im1.x,
                y: g[b].elements[a].pos.im1.y
            });
            c.push({
                x: g[b].elements[a].pos.im2.x,
                y: g[b].elements[a].pos.im2.y
            });
            c.push({
                x: g[b].elements[a].pos.e.x,
                y: g[b].elements[a].pos.e.y
            });
            for (var c = ba(c, 13), d = [], e = $("#" + a).width() / 2, f = 0; f < c.length; f++) d.push(e + _boardObj.getSize().width * c[f].x + "," + (e + _boardObj.getSize().height * c[f].y));
            R && g[b].elements[a].line_way.attr("points", d.join(" "))
        }

        function d(a, b) {
            void 0 === b && (b = g.length - 1);
            var c = document.querySelector("#" +
                a + "_shape").getAttribute("fill");
            var d = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            g[b].elements[a].line_way = $(d).insertBefore($("#" + a));
            g[b].elements[a].line_way.attr("class", "anim-line-way");
            g[b].elements[a].line_way.attr("id", "anim_line_way_" + a);
            g[b].elements[a].line_way.css("fill", "none");
            g[b].elements[a].line_way.css("stroke", c);
            g[b].elements[a].line_way.css("stroke-width", ta);
            g[b].elements[a].line_way.css("stroke-dasharray", 3 * ta + "px," + 4 * ta + "px")
        }

        function U(a, b) {
            var c = "#555",
                c = document.querySelector("#" + a + "_shape").getAttribute("fill"),
                d = Math.ceil(_boardObj.getSize().width * pa),
                e = $("#" + a).width() / 2,
                f = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            g[b].elements[a].circle_im1 = $(f).insertBefore($("#" + a));
            g[b].elements[a].circle_im1.attr("class", "anim-circle");
            g[b].elements[a].circle_im1.attr("id", "anim_circle_im1_" + a);
            g[b].elements[a].circle_im1.attr("fill", c);
            g[b].elements[a].circle_im1.attr("fill-rule", "nonzero");
            g[b].elements[a].circle_im1.attr("fill-opacity",
                .8);
            "touch" == AppConfig.clickType && (g[b].elements[a].circle_im1.attr("class", "anim-circle-touch"), g[b].elements[a].circle_im1.attr("stroke", c), g[b].elements[a].circle_im1.attr("fill-opacity", .2), g[b].elements[a].circle_im1.attr("stroke-width", "1px"));
            g[b].elements[a].circle_im1.attr("cx", e + _boardObj.getSize().width * g[b].elements[a].pos.im1.x);
            g[b].elements[a].circle_im1.attr("cy", e + _boardObj.getSize().height * g[b].elements[a].pos.im1.y);
            g[b].elements[a].circle_im1.attr("r", d + "px");
            f = document.createElementNS("http://www.w3.org/2000/svg",
                "circle");
            g[b].elements[a].circle_im2 = $(f).insertBefore($("#" + a));
            g[b].elements[a].circle_im2.attr("class", "anim-circle");
            g[b].elements[a].circle_im2.attr("id", "anim_circle_im2_" + a);
            g[b].elements[a].circle_im2.attr("fill", c);
            g[b].elements[a].circle_im2.attr("fill-rule", "nonzero");
            g[b].elements[a].circle_im2.attr("fill-opacity", .8);
            "touch" == AppConfig.clickType && (g[b].elements[a].circle_im2.attr("class", "anim-circle-touch"), g[b].elements[a].circle_im2.css("stroke", c), g[b].elements[a].circle_im2.attr("fill-opacity",
                .2), g[b].elements[a].circle_im2.attr("stroke-width", "1px"));
            g[b].elements[a].circle_im2.attr("cx", e + _boardObj.getSize().width * g[b].elements[a].pos.im2.x);
            g[b].elements[a].circle_im2.attr("cy", e + _boardObj.getSize().height * g[b].elements[a].pos.im2.y);
            g[b].elements[a].circle_im2.attr("r", d + "px");
            "touch" == AppConfig.clickType ? (g[b].elements[a].circle_im1.dragImCircleMobile(a, g[b].elements[a].pos.im1), g[b].elements[a].circle_im2.dragImCircleMobile(a, g[b].elements[a].pos.im2)) : (g[b].elements[a].circle_im1.on("mousedown",
                function(c) {
                    N.removeAdditionalShapes();
                    hideElement(".context-menu");
                    T($(this), c, a, g[b].elements[a].pos.im1);
                    return !1
                }), g[b].elements[a].circle_im2.on("mousedown", function(c) {
                N.removeAdditionalShapes();
                hideElement(".context-menu");
                T($(this), c, a, g[b].elements[a].pos.im2);
                return !1
            }))
        }

        function P() {
            $("#anim_frames_box").width($("#btn_mail_img").width() * (g.length + 1))
        }

        function K(a) {
            a = +a;
            100 < a && (a = 100);
            0 > a && (a = 0);
            xa.style.width = a + "%"
        }

        function p(a) {
            !1 === a ? (hideElement(".player"), hideElement(".ball")) : (showElement(".player"),
                showElement(".ball"))
        }

        function ca() {
            if (da && da.length)
                for (var a = 0; a < da.length; a++) da[a].hide()
        }

        function ba(a, b) {
            var c = [],
                d = a.length;
            void 0 === b && (b = 50);
            var e = a.concat();
            e.unshift(a[0]);
            e.push(a[d - 1]);
            for (var f = 1; f < d; f++) {
                var g = e[f].x;
                var h = e[f].y;
                var k = e[f + 1].x;
                var l = e[f + 1].y;
                var m = .5 * (k - e[f - 1].x);
                var n = .5 * (e[f + 2].x - g);
                var p = .5 * (l - e[f - 1].y);
                var q = .5 * (e[f + 2].y - h);
                for (var t = 0; t <= b; t++) {
                    var r = t / b;
                    var u = Math.pow(r, 2);
                    var v = u * r;
                    var w = 3 * u;
                    var x = 2 * v;
                    var y = x - w + 1;
                    x = w - x;
                    r = v - 2 * u + r;
                    v -= u;
                    c.push({
                        x: y * g + x * k + r * m + v *
                            n,
                        y: y * h + x * l + r * p + v * q
                    })
                }
            }
            return c
        }

        function W(a, b) {
            return b ? Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientY + document.body.scrollTop : a.pageY : Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0) ? event.clientX + document.body.scrollTop : a.pageX
        }

        function T(a, b, c, d) {
            function e(b) {
                var e = $("#" + c).width() / 2;
                if (!r) {
                    var g = W(b, 1) + l - n;
                    b = W(b) + k - m;
                    b < h && (b = h);
                    b > _boardObj.getSize().width - h && (b = _boardObj.getSize().width - h);
                    g < 6 * h && (g = 6 * h);
                    g > $("#" + ha).height() - 6 * h && (g = $("#" + ha).height() -
                        6 * h);
                    q = g + "px";
                    p = b + "px";
                    a.attr("cx", p);
                    a.attr("cy", q);
                    d.x = (b - e) / _boardObj.getSize().width;
                    d.y = (g - e) / _boardObj.getSize().height;
                    f(c, H)
                }
            }

            function g() {
                r = 1;
                document.onmousemove = "";
                document.removeEventListener("mousemove", e);
                document.removeEventListener("mouseup", g);
                w()
            }
            var h = Math.ceil(_boardObj.getSize().width * pa),
                k = parseInt(a.attr("cx")),
                l = parseInt(a.attr("cy")),
                m = W(b),
                n = W(b, 1),
                p, q, r;
            document.addEventListener("mousemove", e, !1);
            document.addEventListener("mouseup", g, !1)
        }

        function z(a) {
            function b(a) {
                if (!d) {
                    ia = !1;
                    f = a.clientX;
                    if (a.originalEvent) {
                        var b = a.originalEvent;
                        b.changedTouches ? f = b.changedTouches[0].clientX : b.clientX && (f = a.clientX)
                    }
                    a = h + e - f;
                    $("#anim_frames_container").scrollLeft(a)
                }
            }

            function c(a) {
                d = 1;
                $("#anim_frames_container").off("mousemove.swipe");
                $("#anim_frames_container").off("mouseup.swipe");
                $("#anim_frames_container").off("mouseleave.swipe")
            }
            var d = 0,
                e = a.clientX,
                f = a.clientX;
            if (a.originalEvent) {
                var g = a.originalEvent;
                g.changedTouches ? (e = g.changedTouches[0].clientX, f = g.changedTouches[0].clientX) :
                    g.clientX && (f = e = a.clientX)
            }
            $("#anim_frames_container").on("mousemove.swipe", b);
            $("#anim_frames_container").on("touchmove.swipe", b);
            $("#anim_frames_container").on("mouseup.swipe", function(a) {
                c(a);
                f == e ? ia = !0 : setTimeout(function() {
                    ia = !0
                }, 100)
            });
            $("#anim_frames_container").on("mouseleave.swipe", function(a) {
                c(a);
                ia = !0
            });
            $("#anim_frames_container").on("touchend.swipe", function(a) {
                c(a);
                f == e ? ia = !0 : setTimeout(function() {
                    ia = !0
                }, 100)
            });
            var h = $("#anim_frames_container").scrollLeft()
        }

        function I() {
            if ("localStorage" in
                window && null !== window.localStorage) {
                var a = +localStorage.getItem("full_screen_ad_appearence_count");
                localStorage.setItem("full_screen_ad_appearence_count", a + 1);
                if (1 !== a % 3) return a++, localStorage.setItem("full_screen_ad_appearence_count", a), !1
            }
            if (a = document.querySelector("#param_remote_ip")) a = a.value;
            if (a = document.querySelector("#param_is_mobile")) a = a.value;
            1 == a && (a = $(window).height(), new ModalWindow({
                width: Math.ceil(.95 * _boardObj.getSize().width),
                height: Math.ceil(.9 * a),
                increasedClosedBtn: 1,
                top: Math.ceil(.02 *
                    $(window).height()),
                html: '<div id="full_screen_ad" style="margin-top:' + Math.ceil(.05 * a) + 'px;"></div>',
                closeButton: !0
            }))
        }
        var fa = J || {},
            Z = this,
            N = null,
            O = null,
            Q = null,
            qa = null,
            ha = "svg_canvas";
        void 0 !== fa.svgFieldID && (ha = fa.svgFieldID);
        var ua = "board";
        void 0 !== fa.mainFieldID && (ua = fa.boardID);
        var R = !0,
            g = [],
            M = {},
            da = [],
            S = 5,
            ma = null,
            H = 0,
            na = !1,
            ja = {},
            ea = 0,
            X = 0,
            ka = 1,
            V = 1,
            Y = !0,
            aa = !1,
            ga = !1,
            la = null,
            ta = Math.ceil(8.728E-4 * _boardObj.getSize().width),
            pa = .0061096;
        "touch" == AppConfig.clickType && (pa = .0104736);
        var oa = !0,
            ia = !0,
            xa = document.querySelector("#animation_progress_bar_line"),
            sa = [],
            wa = null;
        (function() {
            L();
            N = new ShapesPainter({
                contextMenu: {
                    containerID: "context_menu_shape_animation",
                    onMenuOpen: function(a) {
                        document.querySelector("#context_menu_shape_id_animation").value = a.getId();
                        a = Math.ceil(.015 * _boardObj.getSize().width / 3);
                        document.querySelector("#context_menu_shape_delete_btn_animation").style.padding = a + "px"
                    }
                },
                onShapeAdded: function(a) {
                    g[H].shapes || (g[H].shapes = []);
                    g[H].shapes.push(a);
                    da.push(a);
                    w()
                },
                onShapeChanged: function() {
                    w()
                },
                onShapeRemoved: function(a) {
                    w()
                }
            });
            O = new Players({
                onPlayerMoveStart: G().frameElementMoveStart,
                onPlayerMove: G().frameElementMove,
                onPlayerMoveEnd: G().frameElementMoveEnd,
                contextMenu: {
                    containerID: "context_menu_player_animation",
                    onMenuOpen: function(a) {
                        document.querySelector("#context_menu_player_number_animation").value = a.getNumber();
                        document.querySelector("#context_menu_player_name_animation").value = a.getName();
                        document.querySelector("#context_menu_player_id_animation").value = a.getId();
                        a = Math.ceil(.015 * _boardObj.getSize().width);
                        document.querySelector("#context_menu_player_delete_btn_animation").style.marginTop = a + "px";
                        document.querySelector("#context_menu_player_name_animation").focus()
                    }
                }
            });
            Q = new Balls({
                onBallMoveStart: G().frameElementMoveStart,
                onBallMove: G().frameElementMove,
                onBallMoveEnd: G().frameElementMoveEnd,
                contextMenu: {
                    containerID: "context_menu_ball_animation",
                    onMenuOpen: function(a) {
                        document.querySelector("#context_menu_ball_name_animation").value = a.getName();
                        document.querySelector("#context_menu_ball_id_animation").value = a.getId();
                        a = Math.ceil(.015 * _boardObj.getSize().width);
                        document.querySelector("#context_menu_ball_delete_btn_animation").style.marginTop = a + "px";
                        document.querySelector("#context_menu_ball_name_animation").focus()
                    }
                }
            });
            _linkDataStore.data.animation ? E() : C();
            if (0 < g.length) {
                if (1 < g.length && !R) {
                    p(!1);
                    for (var a in g[1].elements) g[1].elements.hasOwnProperty(a) && showElement("#" + a);
                    H = 1;
                    l(1)
                }
                if (R) {
                    for (var b = 1; b < g.length; b++) F(b);
                    H = g.length - 1;
                    l(g.length - 1);
                    1 < g.length && showElement("#btn_animation_remove_last_frame");
                    showElement("#top_buttons_panel");
                    showElement("#anim_frames_container");
                    $("#anim_frames_container").scrollLeft(1E3)
                }
            } else g = [], M = {}, v();
            for (a in M) M.hasOwnProperty(a) && addClass(document.querySelector("#" + a), "anim-elem");
            P()
        })();
        Z.show = function(a) {
            a = a || {};
            !1 !== a.add_to_history && window.history.pushState({
                page: "animation"
            }, "", _siteUri + _langKey + "/" + _boardObj.getType() + "#animation");
            if (!window.no_blockers) return Z.hide(), a = _projectTexts.get(), document.querySelector("#" + ua).style.background = "transparent", new ModalWindow({
                html: '<p class="info-modal-window">' + a.animation_locked + "</p>",
                closeButton: !0,
                afterWindowClosedFunction: function() {
                    window.location.href = _siteUri
                }
            }), !1;
            I();
            aa = !1;
            ja = {};
            showElement("#top_buttons_panel");
            showElement("#clear_animation_button");
            showElement("#btn_back");
            showElement("#btn_save_image");
            showElement("#btn_fullscreen");
            showElement("#animation_buttons_panel");
            showElement("#btn_animation_links");
            showElement("#anim_frames_container");
            showElement(".anim-frames-arrows");
            showElement(".anim-speed-setters");
            showElement("#animation_play_current_frame");
            showElement("#shapes_buttons_panel");
            1 < g.length && showElement("#btn_animation_remove_last_frame");
            R || (hideElement("#clear_animation_button"), hideElement("#btn_animation_links"),
                hideElement("#anim_frames_container"), hideElement(".anim-frames-arrows"), hideElement("#animation_play_current_frame"), hideElement("#btn_animation_remove_last_frame"), hideElement("#shapes_buttons_panel"), showElement("#animation_progress_bar_container"), O.lockMoving(!0), O.lockContextMenu(!0), Q.lockMoving(!0), Q.lockContextMenu(!0), N.lockShapesFocusing(!0), N.lockShapesChanging(!0), N.lockContextMenu(!0), S = 5, Y = !0);
            R && (N.refreshPanelButtons(), y(), O.show(), Q.show());
            removeClass(document.querySelector("#animation_buttons_panel #animation_repeat"),
                "button-selected");
            Y && addClass(document.querySelector("#animation_buttons_panel #animation_repeat"), "button-selected");
            m(S);
            Z.refresh();
            x();
            document.querySelector("#shapes_buttons_panel #remove_last_shape").addEventListener("click", G().shapesPainterRemoveLastShape, !1);
            document.querySelector("#shapes_buttons_panel #remove_all_shapes").addEventListener("click", G().shapesPainterRemoveAllShapes, !1)
        };
        Z.hide = function() {
            x();
            r();
            O.hide();
            Q.hide();
            y();
            if (!R) {
                R = !0;
                A();
                C();
                if (0 < g.length) {
                    for (var a = 1; a < g.length; a++) F(a);
                    H = g.length - 1;
                    for (var b in M) M.hasOwnProperty(b) && addClass(document.querySelector("#" + b), "anim-elem")
                }
                oa = !0;
                showElement("#anim_frames_container");
                $("#anim_frames_container").scrollLeft(1E3)
            }
            hideElement("#top_buttons_panel");
            hideElement("#clear_animation_button");
            hideElement("#btn_back");
            hideElement("#animation_buttons_panel");
            hideElement("#btn_animation_links");
            hideElement("#anim_frames_container");
            hideElement(".anim-frames-arrows");
            hideElement(".anim-speed-setters");
            hideElement("#animation_play_current_frame");
            hideElement("#animation_progress_bar_container");
            hideElement("#btn_animation_remove_last_frame");
            hideElement("#shapes_buttons_panel");
            N.disable()
        };
        Z.refresh = function() {
            var a = Math.ceil(_boardObj.getSize().width * AppConfig.buttonToBoardHeightCoeff),
                b = document.querySelector("#animation_buttons_panel");
            b.style.marginTop = .1 * a + "px";
            if (!R) {
                b.style.zIndex = 100000001;
                var c = document.querySelector("#animation_progress_bar_container");
                c.style.height = a / 2.5 + "px";
                c.style.bottom = .75 * a + "px";
                c.style.width = Math.ceil(_boardObj.getSize().width -
                    .136 * _boardObj.getSize().width) + "px";
                c.style.left = .068 * _boardObj.getSize().width + "px"
            }
            R && (b.style.zIndex = 101);
            O.refresh();
            Q.refresh();
            N.refresh();
            l();
            P();
            R || (document.querySelector("#animation_buttons_panel").style.zIndex = 100000001);
            R && (document.querySelector("#animation_buttons_panel").style.zIndex = 101)
        };
        Z.getPlayers = function() {
            return O
        };
        Z.getBalls = function() {
            return Q
        };
        Z.getShapesPainter = function() {
            return N
        }
    };