$('#modalCrearEjercicio').modal('hide');
(function() {
    function a(a) {
        if (!(a instanceof HTMLElement || a instanceof SVGElement)) throw Error("an HTMLElement or SVGElement is required; got " + a);
    }

    function d(a) {
        return a && 0 == a.lastIndexOf("http", 0) && -1 == a.lastIndexOf(window.location.host)
    }

    function g(f, c) {
        a(f);
        var b = f.querySelectorAll("image"),
            e = b.length,
            q = function() {
                0 === e && c()
            };
        q();
        for (var g = 0; g < b.length; g++)(function(a) {
            var c = a.getAttributeNS("http://www.w3.org/1999/xlink", "href");
            if (c && d(c.value)) console.warn("Cannot render embedded images linking to external hosts: " +
                c.value);
            else {
                var f = document.createElement("canvas"),
                    b = f.getContext("2d"),
                    l = new Image;
                l.crossOrigin = "anonymous";
                (c = c || a.getAttribute("href")) ? (l.src = c, l.onload = function() {
                    f.width = l.width;
                    f.height = l.height;
                    b.drawImage(l, 0, 0);
                    a.setAttributeNS("http://www.w3.org/1999/xlink", "href", f.toDataURL("image/png"));
                    e--;
                    q()
                }, l.onerror = function() {
                    console.log("Could not load " + c);
                    e--;
                    q()
                }) : (e--, q())
            }
        })(b[g])
    }

    function h(a, c, b) {
        function f(a) {
            for (var c = {
                    woff2: "font/woff2",
                    woff: "font/woff",
                    otf: "application/x-font-opentype",
                    ttf: "application/x-font-ttf",
                    eot: "application/vnd.ms-fontobject",
                    sfnt: "application/font-sfnt",
                    svg: "image/svg+xml"
                }, f = Object.keys(c), b = 0; b < f.length; ++b) {
                var d = f[b];
                if (0 < a.indexOf("." + d)) return c[d]
            }
            console.error("Unknown font format for " + a + "; Fonts may not be working correctly");
            return "application/octet-stream"
        }

        function d(a) {
            function c(c) {
                function f(f) {
                    console.warn("Failed to load font from: " + c.url);
                    console.warn(f);
                    l += c.text + "\n";
                    d(a)
                }

                function b(c, f) {
                    l += c.text.replace(c.fontUrlRegexp, 'url("data:' +
                        c.format + ";base64," + f + '")') + "\n";
                    setTimeout(function() {
                        d(a)
                    }, 0)
                }
                var e = new XMLHttpRequest;
                e.addEventListener("load", function() {
                    var a = "";
                    for (var f = new Uint8Array(e.response), d = f.byteLength, l = 0; l < d; l++) a += String.fromCharCode(f[l]);
                    a = window.btoa(a);
                    b(c, a)
                });
                e.addEventListener("error", f);
                e.addEventListener("abort", f);
                e.open("GET", c.url);
                e.responseType = "arraybuffer";
                e.send()
            }
            if (0 < a.length) {
                var f = a.pop();
                c(f)
            } else b(l)
        }
        var e = c.selectorRemap;
        c = c.modifyStyle;
        for (var l = "", g = [], h = document.styleSheets, k = 0; k <
            h.length; k++) {
            try {
                var m = h[k].cssRules
            } catch (v) {
                console.warn("Stylesheet could not be loaded: " + h[k].href);
                continue
            }
            if (null != m)
                for (var z = 0, r; z < m.length; z++, r = null) {
                    var p = m[z];
                    if ("undefined" != typeof p.style) {
                        try {
                            var w = p.selectorText
                        } catch (v) {
                            console.warn('The following CSS rule has an invalid selector: "' + p + '"', v)
                        }
                        try {
                            w && (r = a.querySelector(w) || a.parentNode.querySelector(w))
                        } catch (v) {
                            console.warn('Invalid CSS selector "' + w + '"', v)
                        }
                        if (r) r = e ? e(p.selectorText) : p.selectorText, p = c ? c(p.style.cssText) : p.style.cssText,
                            l += r + " { " + p + " }\n";
                        else if (p.cssText.match(/^@font-face/)) {
                            r = /url\(["']?(.+?)["']?\)/;
                            var n = p.cssText.match(r),
                                n = n && n[1] || "";
                            n.match(/^data:/) && (n = "");
                            "about:blank" === n && (n = "");
                            n ? (n.startsWith("../") ? n = h[k].href + "/../" + n : n.startsWith("./") && (n = h[k].href + "/." + n), g.push({
                                text: p.cssText,
                                fontUrlRegexp: r,
                                format: f(n),
                                url: n
                            })) : l += p.cssText + "\n"
                        }
                    }
                }
        }
        d(g)
    }

    function m(a, c, b) {
        a = a.viewBox && a.viewBox.baseVal && a.viewBox.baseVal[b] || null !== c.getAttribute(b) && !c.getAttribute(b).match(/%$/) && parseInt(c.getAttribute(b)) ||
            a.getBoundingClientRect()[b] || parseInt(c.style[b]) || parseInt(window.getComputedStyle(a).getPropertyValue(b));
        return "undefined" === typeof a || null === a || isNaN(parseFloat(a)) ? 0 : a
    }

    function e(a) {
        a = encodeURIComponent(a);
        a = a.replace(/%([0-9A-F]{2})/g, function(a, b) {
            var c = String.fromCharCode("0x" + b);
            return "%" === c ? "%25" : c
        });
        return decodeURIComponent(a)
    }

    function k(a) {
        var c = window.atob(a.split(",")[1]);
        a = a.split(",")[0].split(":")[1].split(";")[0];
        for (var b = new ArrayBuffer(c.length), d = new Uint8Array(b), f = 0; f < c.length; f++) d[f] =
            c.charCodeAt(f);
        return new Blob([b], {
            type: a
        })
    }
    var b = "undefined" != typeof exports && exports || "undefined" != typeof define && {} || this;
    b.prepareSvg = function(b, c, d) {
        a(b);
        c = c || {};
        c.scale = c.scale || 1;
        c.responsive = c.responsive || !1;
        g(b, function() {
            var a = document.createElement("div"),
                e = b.cloneNode(!0);
            if ("svg" == b.tagName) {
                var f = c.width || m(b, e, "width");
                var l = c.height || m(b, e, "height")
            } else if (b.getBBox) {
                var g = b.getBBox();
                f = g.x + g.width;
                l = g.y + g.height;
                e.setAttribute("transform", e.getAttribute("transform").replace(/translate\(.*?\)/,
                    ""));
                g = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                g.appendChild(e);
                e = g
            } else {
                console.error("Attempted to render non-SVG element", b);
                return
            }
            e.setAttribute("version", "1.1");
            e.getAttribute("xmlns") || e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
            e.getAttribute("xmlns:xlink") || e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            c.responsive ? (e.removeAttribute("width"), e.removeAttribute("height"), e.setAttribute("preserveAspectRatio",
                "xMinYMin meet")) : (e.setAttribute("width", f * c.scale), e.setAttribute("height", l * c.scale));
            e.setAttribute("viewBox", [c.left || 0, c.top || 0, f, l].join(" "));
            for (var g = e.querySelectorAll("foreignObject > *"), k = 0; k < g.length; k++) g[k].getAttribute("xmlns") || g[k].setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/1999/xhtml");
            a.appendChild(e);
            h(b, c, function(b) {
                var c = document.createElement("style");
                c.setAttribute("type", "text/css");
                c.innerHTML = "<![CDATA[\n" + b + "\n]]\x3e";
                b = document.createElement("defs");
                b.appendChild(c);
                e.insertBefore(b, e.firstChild);
                d && (c = a.innerHTML, c = c.replace(/NS\d+:href/gi, 'xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href'), d(c, f, l))
            })
        })
    };
    b.svgAsDataUri = function(a, c, d) {
        b.prepareSvg(a, c, function(a) {
            a = "data:image/svg+xml;base64," + window.btoa(e('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [<!ENTITY nbsp "&#160;">]>' + a));
            d && d(a)
        })
    };
    b.svgAsPngUri = function(e, c, d) {
        a(e);
        c = c || {};
        c.encoderType =
            c.encoderType || "image/png";
        c.encoderOptions = c.encoderOptions || .8;
        var f = function(a, b, e) {
            var f = document.createElement("canvas"),
                g = f.getContext("2d");
            f.width = b - 2 * b * c.widthCoeff;
            f.height = e - 2 * e * c.heightCoeff;
            c.canvg ? c.canvg(f, a) : g.drawImage(a, -b * c.widthCoeff, -e * c.heightCoeff);
            c.backgroundColor && (g.globalCompositeOperation = "destination-over", g.fillStyle = c.backgroundColor, g.fillRect(0, 0, f.width, f.height));
            try {
                var l = f.toDataURL(c.encoderType, c.encoderOptions)
            } catch (y) {
                if ("undefined" !== typeof SecurityError &&
                    y instanceof SecurityError || "SecurityError" == y.name) {
                    console.error("Rendered SVG images cannot be downloaded in this browser.");
                    return
                }
                throw y;
            }
            d(l)
        };
        c.canvg ? b.prepareSvg(e, c, f) : b.svgAsDataUri(e, c, function(a) {
            var b = new Image;
            b.onload = function() {
                f(b, b.width, b.height)
            };
            b.onerror = function() {
                console.error("There was an error loading the data URI as an image on the following SVG\n", window.atob(a.slice(26)), "\n", "Open the following link to see browser's diagnosis\n", a)
            };
            b.src = a
        })
    };
    b.download = function(a,
        b) {
        if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(k(b), a);
        else {
            var c = document.createElement("a");
            if ("download" in c) {
                try {
                    var e = k(b),
                        d = URL.createObjectURL(e);
                         fd = new FormData();
                        fd.append('imagen', e);
                        var deporte = $('#param_board_type').val();
                        if( deporte == "handball" ){
                            key = localStorage.getItem("main_handball");
                        }else if( deporte == "basketball-new" ){
                            key = localStorage.getItem("main_basketball-new");

                        }
                        fd.append('exercisesport', $("#exercisesport").val() );
                        fd.append('exercisestype', $("#exercisetype").val() );
                        fd.append('exercisesub', $("#exercisesub").val() );
                        fd.append('exercisename', $("#exercisename").val() );
                        fd.append('exercisedescription', $("#exercisedescription").val() );
                        fd.append('exercisetime', $("#exercisetime").val() );
                        fd.append('exercisemin', $("#exercisemin").val() );
                        fd.append('exercisemax', $("#exercisemax").val() );
                        fd.append('exercisematerial', JSON.stringify(materialA)); //datos que se envian a traves de ajax*/
                        fd.append('imagename', Date.now());
                        fd.append('datospizarra', key);
                    if ($("#imgcheck").prop('checked')){
					 // fd.append('imgexterna',$("#exerciseimg"));
						//var formData = new FormData();
						var file=document.getElementById("exerciseimg").files[0];
						  fd.append("imgexterna", file);
						  // console.log("intentando ajax img ext");
					   /*  $.ajax({ 
							url: "./php/Form_CrearEjercicio.php",
							type: "POST",
							data: formData,
							processData: false,
							contentType: false,
							success: function(response) {
								if (response!="ok"){
									document.getElementById("result").innerHTML="Lo sentimos, no se ha podido subir el archivo externo...";
								}else{
									console.log('ok-imgext');
								}
							},
							error: function(jqXHR,textStatus,errorThrown) {
								console.log('error: '+textStatus);
								console.log(jqXHR.status);
							}
						 });  */  
						}
                var idejer = getCookie('idejercicio');
                if(idejercicio == undefined){
					$.ajax({
		                url: "../php/Form_CrearEjercicio.php",
		                type: "POST",
		                data: fd,
		                processData: false,
   						contentType: false,
                        success:( function(response) {
                            estado = response['estado'];
                            if( estado == 'subido' ){
                                console.log("modal");
                                $('#modalCrearEjercicio').modal('show');
                            }
                        }),
		                error:( function() {
		                    console.log('error')
	                	})
	           		 });
                 }else{
                    $.ajax({
                        url: "../php/updateCrearEjercicio.php",
                        type: "POST",
                        data: fd,
                        processData: false,
                        contentType: false,
                        success:( function(response) {
                            estado = response['estado'];
                            if( estado == 'subido' ){
                                console.log("modal");
                                $('#modalCrearEjercicio').modal('show');
                            }
                        }),
                        error:( function() {
                            console.log('error')
                        })
                     });
                 }                        
                } catch (u) {
                    console.warn("This browser does not support object URLs. Falling back to string URL."), c.href = b
                }
            } else window.open(b, "_temp", "menubar=no,toolbar=no,status=no")
        }
    };
    b.saveSvg = function(e, c, d) {
        a(e);
        d = d || {};
        b.svgAsDataUri(e, d, function(a) {
            b.download(c, a)
        })
    };
    b.saveSvgAsPng = function(e, c, d) {
        a(e);
        d = d || {};
        b.svgAsPngUri(e, d, function(a) {
            b.download(c, a)
        })
    };
    "undefined" !== typeof define && define(function() {
        return b
    })
})();
var Session = {
    set: function(a, d) {
        return window.sessionStorage ? sessionStorage.setItem(a, d) : !1
    },
    get: function(a) {
        return window.sessionStorage ? sessionStorage.getItem(a) : !1
    },
    remove: function(a) {
        return window.sessionStorage ? sessionStorage.removeItem(a) : !1
    }
};

function ajax(a) {
    var d = a.url,
        g = a.type || "GET",
        g = g.toLowerCase(),
        h = a.dataType || "",
        h = h.toLowerCase();
    if (a.data && "get" == g) {
        var d = d.split("#")[0],
            m = [],
            e;
        for (e in a.data) a.data.hasOwnProperty(e) && m.push(e + "=" + encodeURIComponent(a.data[e]));
        d = 0 > d.indexOf("?") ? d + "?" : d + "&";
        d += m.join("&")
    }
    async = void 0 === a.async ? !0 : a.async;
    async = !!async;
    var m = a.headers,
        k = a.timeout,
        b = new("onload" in new XMLHttpRequest ? XMLHttpRequest : XDomainRequest);
    b.open(g, d, async);
    if (m)
        for (var f in m) m.hasOwnProperty(f) && b.setRequestHeader(f,
            m[f]);
    b.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    k && (b.timeout = k);
    b.onloadstart = function() {
        a.beforeSend && a.beforeSend()
    };
    b.onprogress = function() {
        a.progress && a.progress(b.responseText, b.status, b.statusText)
    };
    b.onload = function() {
        if (200 <= b.status && 400 > b.status) {
            var c = b.responseText;
            if ("application/json" == b.getResponseHeader("Content-Type") || "json" == h) c = JSON.parse(c);
            a.success && a.success(c, b.status, b.statusText)
        } else a.error && a.error(b.responseText, b.status, b.statusText)
    };
    b.onerror = function() {
        a.error &&
            a.error(b.responseText, b.status, b.statusText)
    };
    b.onabort = function() {
        a.abort && a.abort(b.responseText, b.status, b.statusText)
    };
    b.ontimeout = function() {
        if (a.ontimeout) a.ontimeout(b.responseText, b.status, b.statusText)
    };
    b.onloadend = function() {
        a.complete && a.complete(b.responseText, b.status, b.statusText)
    };
    if ("post" == g) {
        d = [];
        if (a.data)
            for (e in a.data) a.data.hasOwnProperty(e) && d.push(e + "=" + encodeURIComponent(a.data[e]));
        b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        b.send(d.join("&"))
    } else b.send();
    return b
}

function addClass(a, d) {
    a.classList ? a.classList.add(d) : a.className += " " + d
}

function removeClass(a, d) {
    a.classList ? a.classList.remove(d) : a.className = a.className.replace(new RegExp("(^|\\b)" + d.split(" ").join("|") + "(\\b|$)", "gi"), " ")
}

function addEventForElements(a, d, g) {
    a = document.querySelectorAll(a);
    for (var h = 0; h < a.length; h++) a[h].addEventListener(d, g, !1)
}

function removeEventFromElements(a, d, g) {
    a = document.querySelectorAll(a);
    for (var h = 0; h < a.length; h++) a[h].removeEventListener(d, g)
}

function hideElement(a) {
    a = document.querySelectorAll(a);
    for (var d = 0; d < a.length; d++) a[d].style.display = "none"
}

function showElement(a, d) {
    d = d || "block";
    for (var g = document.querySelectorAll(a), h = 0; h < g.length; h++) g[h].style.display = d
}

function removeElement(a) {
    a = document.querySelectorAll(a);
    for (var d = 0; d < a.length; d++) a[d].remove()
}

function isFlashEnabled() {
    var a = !1;
    if ("undefined" != typeof navigator.plugins && "object" == typeof navigator.plugins["Shockwave Flash"]) a = !0;
    else if ("undefined" != typeof window.ActiveXObject) try {
        new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a = !0
    } catch (d) {}
    return a
}

function emptyObject(a) {
    for (var d in a)
        if (a.hasOwnProperty(d)) return !1;
    return !0
}

function parseSvgMarkup(a, d) {
    try {
        document.getElementById(d).textContent = "";
        var g = Object.create(null);
        g.image = a.match(/<image [^>]*>/ig);
        g.path = a.match(/<path [^\/>]*\/>/ig);
        g.circle = a.match(/<circle [^\/>]*\/>/ig);
        g.text = a.match(/<text [^>]*>[^<]*<\/text>/ig);
        for (var h in g)
            if (g[h])
                for (var m = 0; m < g[h].length; m++) {
                    var e = g[h][m],
                        k = null;
                    switch (h) {
                        case "path":
                        case "circle":
                        case "image":
                            e = e.replace("<" + h, "").trim();
                            e = e.replace("/>", "").trim();
                            break;
                        case "text":
                            k = e.match(/>([^<]*)<\/text>/i)[1], e = e.match(/<text ([^>]*)>/i)[1]
                    }
                    for (var e =
                            e.trim(), b = e.match(/[^=]*="[^"]*"/ig), f = document.createElementNS("http://www.w3.org/2000/svg", h), c = 0; c < b.length; c++) {
                        b[c] = b[c].replace(/"/g, "").trim();
                        var l = b[c].split("="),
                            t = l[0].trim(),
                            q = l[1].trim();
                        "xlink:href" == t ? f.setAttributeNS("http://www.w3.org/1999/xlink", t, q) : f.setAttribute(t, q)
                    }
                    k && (f.textContent = k);
                    f = $(f).appendTo($("#" + d))
                }
    } catch (u) {
        console.error("parseSvgMarkup Error", u.message)
    }
}

function generateUUID() {
    var a = (new Date).getTime();
    return "xxxxx4xxxyxxxx".replace(/[xy]/g, function(d) {
        var g = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" == d ? g : g & 7 | 8).toString(16)
    })
}
(function() {
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(a) {
        a = (this.document || this.ownerDocument).querySelectorAll(a);
        for (var d = a.length; 0 <= --d && a.item(d) !== this;);
        return -1 < d
    });
    Element.prototype.closest || (Element.prototype.closest = function(a) {
        for (var d = this; d;) {
            if (d.matches(a)) return d;
            d = d.parentElement
        }
        return null
    })
})();
(function() {
    "remove" in Element.prototype || (Element.prototype.remove = function() {
        this.parentNode && this.parentNode.removeChild(this)
    })
})();
var AppTexts = function() {
        var a = null;
        this.get = function() {
            if (null !== a) return a;
            var d = $("#param_lang_key").val();
            $.ajax({
                url: _siteUri + "&ajax_request=get_texts",
                type: "post",
                async: !1,
                data: {
                    lang_key: d
                },
                success: function(d) {
                    a = d
                },
                error: function(a) {
                    console.log(a)
                }
            });
            return a
        }
    },
    ModalWindow = function(a) {
        function d() {
            k.hide();
            b.hide();
            t && setTimeout(t, 50)
        }
        var g = a.html,
            h = a.width || 0,
            m = a.height || 0,
            e = a.closeButton || !1,
            e = !!e,
            k = $("#modal_window"),
            b = $("#modal_window_bg"),
            f = .02; + $("#is_mobile").val() && a.increasedClosedBtn &&
            (f = .05);
        var c = a.yesButtonFunction || !1,
            l = a.afterWindowCreatedFunction || null,
            t = a.afterWindowClosedFunction || null;
        this.close = function() {
            d()
        };
        k.html() || (k = $("<DIV class=modal-window>").attr("id", "modal_window"), $(document.body).append(k), $(document).keydown(function(a) {
            27 == a.keyCode && d()
        }));
        if (null === b.html() || void 0 === b.html()) b = $("<DIV>").attr("id", "modal_window_bg"), $(document.body).append(b), $("#modal_window_bg").on("click", function() {
            d();
            return !1
        });
        k.css("width", "");
        0 < h && k.width(h);
        k.css("height",
            "");
        0 < m && k.height(m);
        $(k).html(g);
        var q = Math.ceil(.005 * _boardObj.getSize().width),
            u = Math.ceil(.015 * _boardObj.getSize().width),
            x = Math.ceil(.0225 * _boardObj.getSize().width);
        $("#modal_window").css({
            fontSize: Math.ceil(.017 * _boardObj.getSize().width) + "px",
            borderWidth: q + "px",
            padding: u + "px",
            paddingRight: x + "px"
        });
        $(".info-modal-window") && ($(".info-modal-window").css("paddingLeft", Math.ceil(.015 * _boardObj.getSize().width) + "px"), $(".info-modal-window").css("paddingRight", Math.ceil(.015 * _boardObj.getSize().width) +
            "px"));
        void 0 !== a.top ? "center" == a.top ? ($("#modal_window").css({
            top: "50%"
        }), a = $("#modal_window").height(), $("#modal_window").css({
            "margin-top": -a / 2 + "px"
        })) : $("#modal_window").css({
            top: a.top + "px"
        }) : $("#modal_window").css({
            top: "10%"
        });
        if (e || c) e = Math.ceil(f * _boardObj.getSize().width), f = $('<DIV id="modal_window_close"><IMG src="' + _siteUri + 'Public/Images/buttons/mw-close.png" id="modal_window_close_img">'), k.append(f), $("#modal_window_close").on("click", function() {
                d();
                return !1
            }), $("#modal_window_close_img").width(e),
            $("#modal_window_close_img").height(e);
        c && (e = Math.ceil(.04 * _boardObj.getSize().width), f = $('<DIV id="modal_window_yes_buttons" class="modal-window-yes-panel"><DIV class="button" id="modal_window_yes"><IMG src="' + _siteUri + 'Public/Images/buttons/mw-button-yes.png"></DIV>'), k.append(f), $("#modal_window_yes").on("click", function() {
            c();
            d();
            return !1
        }), $("#modal_window_yes_buttons").width(1.33 * e), $("#modal_window_yes_buttons DIV").width(1.33 * e), $("#modal_window_yes_buttons DIV").height(1.33 * e), $("#modal_window_yes_buttons DIV").css("borderRadius",
            Math.ceil(.2666 * e)), $("#modal_window_yes_buttons DIV").css("borderWidth", Math.ceil(.111 * e)), $("#modal_window_yes_buttons DIV IMG").width(e), $("#modal_window_yes_buttons DIV IMG").height(e), $("#modal_window_yes_buttons DIV IMG").css("marginTop", .15 * e + "px"));
        e = $(window).width();
        f = k.width();
        e = e / 2 - (f + u + x + 2 * q) / 2;
        $("#modal_window").css({
            left: +e + "px"
        });
        k.css("opacity", .001);
        k.show("fast", function() {
            var a = $(window).width(),
                b = k.width(),
                a = a / 2 - (b + u + x + 2 * q) / 2;
            $("#modal_window").css({
                left: +a + "px"
            });
            k.css("opacity",
                .7)
        });
        b.show();
        l && setTimeout(l, 200)
    },
    LinkDataStore = function() {
        var a = this;
        a.data = {};
        a.get = function(d, g) {
            var h = $("#param_animation_link_token").val();
            !h && "animation" == d && g && (h = g);
            var m = $("#param_main_link_token").val();
            !m && "main" == d && g && (m = g);
            h ? ajax({
                type: "post",
                dataType: "json",
                url: _siteUri + "&ajax_request=get_animation_data_from_link",
                async: !1,
                data: {
                    boardType: _boardObj.getType(),
                    linkToken: h
                },
                beforeSend: function() {
                    $("#bg_loading_link_data_store").show()
                },
                success: function(e) {
                    a.data.animation = e;
                    a.data.animation.edit_mode =
                        document.querySelector("#param_animation_edit_mode") ? +document.querySelector("#param_animation_edit_mode").value : 0
                },
                complete: function() {
                    $("#bg_loading_link_data_store").hide()
                },
                error: function(e) {
                    var d = _projectTexts.get();
                    console.log(e);
                    document.querySelector("#param_animation_edit_mode") && +document.querySelector("#param_animation_edit_mode").value && (a.data.animation = {});
                    new ModalWindow({
                        html: '<span class="error-modal-window">' + d.server_error + '</span><br><span class="error-modal-window">' + d.animation_not_loaded_from_link +
                            "</span>",
                        closeButton: !0
                    })
                }
            }) : m ? ajax({
                type: "post",
                dataType: "json",
                url: _siteUri + "&ajax_request=get_data_from_link",
                async: !1,
                data: {
                    boardType: _boardObj.getType(),
                    linkToken: m
                },
                beforeSend: function() {
                    $("#bg_loading_link_data_store").show()
                },
                success: function(e) {
                    a.data.main = e
                },
                complete: function() {
                    $("#bg_loading_link_data_store").hide()
                },
                error: function(e) {
                    var d = _projectTexts.get();
                    console.log(e);
                    a.data.main = {};
                    new ModalWindow({
                        html: '<span class="error-modal-window">' + d.server_error + '</span><br><span class="error-modal-window">' +
                            d.scheme_not_loaded_from_link + "</span>",
                        closeButton: !0
                    })
                }
            }) : $("#bg_loading_link_data_store").hide()
        }
    };
                                $('#modalCrearEjercicio').on('hidden.bs.modal', function (e) {
                                      $('#form-registroejer').trigger("reset");
                                      localStorage.removeItem("main_handball");
                                      localStorage.removeItem("main_basketball-new");
                                      $('#clear_all_button').click();
                                });
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}