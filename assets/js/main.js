!
function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t()
} (this,
function() {
    "use strict";
    var e = function() {};
    e.version = "2.0.5",
    window.addEventListener("mousewheel",
    function() {});
    var t = "data-scrollmagic-pin-spacer";
    e.Controller = function(r) {
        var s, a, o = "REVERSE",
        l = "PAUSED",
        h = i.defaults,
        d = this,
        c = n.extend({},
        h, r),
        u = [],
        p = !1,
        f = 0,
        m = l,
        g = !0,
        v = 0,
        _ = !0,
        y = function() {
            c.refreshInterval > 0 && (a = window.setTimeout(E, c.refreshInterval))
        },
        w = function() {
            return c.vertical ? n.get.scrollTop(c.container) : n.get.scrollLeft(c.container)
        },
        b = function() {
            return c.vertical ? n.get.height(c.container) : n.get.width(c.container)
        },
        x = this._setScrollPos = function(e) {
            c.vertical ? g ? window.scrollTo(n.get.scrollLeft(), e) : c.container.scrollTop = e: g ? window.scrollTo(e, n.get.scrollTop()) : c.container.scrollLeft = e
        },
        T = function() {
            if (_ && p) {
                var e = n.type.Array(p) ? p: u.slice(0);
                p = !1;
                var t = f,
                i = (f = d.scrollPos()) - t;
                0 !== i && (m = i > 0 ? "FORWARD": o),
                m === o && e.reverse(),
                e.forEach(function(e) {
                    e.update(!0)
                })
            }
        },
        S = function() {
            s = n.rAF(T)
        },
        C = function(e) {
            "resize" == e.type && (v = b(), m = l),
            !0 !== p && (p = !0, S())
        },
        E = function() {
            if (!g && v != b()) {
                var e;
                try {
                    e = new Event("resize", {
                        bubbles: !1,
                        cancelable: !1
                    })
                } catch(t) { (e = document.createEvent("Event")).initEvent("resize", !1, !1)
                }
                c.container.dispatchEvent(e)
            }
            u.forEach(function(e) {
                e.refresh()
            }),
            y()
        };
        this._options = c;
        var P = function(e) {
            if (e.length <= 1) return e;
            var t = e.slice(0);
            return t.sort(function(e, t) {
                return e.scrollOffset() > t.scrollOffset() ? 1 : -1
            }),
            t
        };
        return this.addScene = function(t) {
            if (n.type.Array(t)) t.forEach(function(e) {
                d.addScene(e)
            });
            else if (t instanceof e.Scene) if (t.controller() !== d) t.addTo(d);
            else if (u.indexOf(t) < 0) {
                u.push(t),
                u = P(u),
                t.on("shift.controller_sort",
                function() {
                    u = P(u)
                });
                for (var i in c.globalSceneOptions) t[i] && t[i].call(t, c.globalSceneOptions[i])
            }
            return d
        },
        this.removeScene = function(e) {
            if (n.type.Array(e)) e.forEach(function(e) {
                d.removeScene(e)
            });
            else {
                var t = u.indexOf(e);
                t > -1 && (e.off("shift.controller_sort"), u.splice(t, 1), e.remove())
            }
            return d
        },
        this.updateScene = function(t, i) {
            return n.type.Array(t) ? t.forEach(function(e) {
                d.updateScene(e, i)
            }) : i ? t.update(!0) : !0 !== p && t instanceof e.Scene && ( - 1 == (p = p || []).indexOf(t) && p.push(t), p = P(p), S()),
            d
        },
        this.update = function(e) {
            return C({
                type: "resize"
            }),
            e && T(),
            d
        },
        this.scrollTo = function(i, r) {
            if (n.type.Number(i)) x.call(c.container, i, r);
            else if (i instanceof e.Scene) i.controller() === d && d.scrollTo(i.scrollOffset(), r);
            else if (n.type.Function(i)) x = i;
            else {
                var s = n.get.elements(i)[0];
                if (s) {
                    for (; s.parentNode.hasAttribute(t);) s = s.parentNode;
                    var a = c.vertical ? "top": "left",
                    o = n.get.offset(c.container),
                    l = n.get.offset(s);
                    g || (o[a] -= d.scrollPos()),
                    d.scrollTo(l[a] - o[a], r)
                }
            }
            return d
        },
        this.scrollPos = function(e) {
            return arguments.length ? (n.type.Function(e) && (w = e), d) : w.call(d)
        },
        this.info = function(e) {
            var t = {
                size: v,
                vertical: c.vertical,
                scrollPos: f,
                scrollDirection: m,
                container: c.container,
                isDocument: g
            };
            return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t
        },
        this.loglevel = function() {
            return d
        },
        this.enabled = function(e) {
            return arguments.length ? (_ != e && (_ = !!e, d.updateScene(u, !0)), d) : _
        },
        this.destroy = function(e) {
            window.clearTimeout(a);
            for (var t = u.length; t--;) u[t].destroy(e);
            return c.container.removeEventListener("resize", C),
            c.container.removeEventListener("scroll", C),
            n.cAF(s),
            null
        },
        function() {
            for (var e in c) h.hasOwnProperty(e) || delete c[e];
            if (c.container = n.get.elements(c.container)[0], !c.container) throw "ScrollMagic.Controller init failed."; (g = c.container === window || c.container === document.body || !document.body.contains(c.container)) && (c.container = window),
            v = b(),
            c.container.addEventListener("resize", C),
            c.container.addEventListener("scroll", C),
            c.refreshInterval = parseInt(c.refreshInterval) || h.refreshInterval,
            y()
        } (),
        d
    };
    var i = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    e.Controller.addOption = function(e, t) {
        i.defaults[e] = t
    },
    e.Controller.extend = function(t) {
        var i = this;
        e.Controller = function() {
            return i.apply(this, arguments),
            this.$super = n.extend({},
            this),
            t.apply(this, arguments) || this
        },
        n.extend(e.Controller, i),
        e.Controller.prototype = i.prototype,
        e.Controller.prototype.constructor = e.Controller
    },
    e.Scene = function(i) {
        var s, a, o = "BEFORE",
        l = "DURING",
        h = "AFTER",
        d = r.defaults,
        c = this,
        u = n.extend({},
        d, i),
        p = o,
        f = 0,
        m = {
            start: 0,
            end: 0
        },
        g = 0,
        v = !0,
        _ = {};
        this.on = function(e, t) {
            return n.type.Function(t) && (e = e.trim().split(" ")).forEach(function(e) {
                var i = e.split("."),
                r = i[0],
                n = i[1];
                "*" != r && (_[r] || (_[r] = []), _[r].push({
                    namespace: n || "",
                    callback: t
                }))
            }),
            c
        },
        this.off = function(e, t) {
            return e ? ((e = e.trim().split(" ")).forEach(function(e) {
                var i = e.split("."),
                r = i[0],
                n = i[1] || ""; ("*" === r ? Object.keys(_) : [r]).forEach(function(e) {
                    for (var i = _[e] || [], r = i.length; r--;) {
                        var s = i[r]; ! s || n !== s.namespace && "*" !== n || t && t != s.callback || i.splice(r, 1)
                    }
                    i.length || delete _[e]
                })
            }), c) : c
        },
        this.trigger = function(t, i) {
            if (t) {
                var r = t.trim().split("."),
                n = r[0],
                s = r[1],
                a = _[n];
                a && a.forEach(function(t) {
                    s && s !== t.namespace || t.callback.call(c, new e.Event(n, t.namespace, c, i))
                })
            }
            return c
        },
        c.on("change.internal",
        function(e) {
            "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? b() : "reverse" === e.what && c.update())
        }).on("shift.internal",
        function() {
            y(),
            c.update()
        }),
        this.addTo = function(t) {
            return t instanceof e.Controller && a != t && (a && a.removeScene(c), a = t, S(), w(!0), b(!0), y(), a.info("container").addEventListener("resize", x), t.addScene(c), c.trigger("add", {
                controller: a
            }), c.update()),
            c
        },
        this.enabled = function(e) {
            return arguments.length ? (v != e && (v = !!e, c.update(!0)), c) : v
        },
        this.remove = function() {
            if (a) {
                a.info("container").removeEventListener("resize", x);
                var e = a;
                a = void 0,
                e.removeScene(c),
                c.trigger("remove")
            }
            return c
        },
        this.destroy = function(e) {
            return c.trigger("destroy", {
                reset: e
            }),
            c.remove(),
            c.off("*.*"),
            null
        },
        this.update = function(e) {
            if (a) if (e) if (a.enabled() && v) {
                var t, i = a.info("scrollPos");
                t = u.duration > 0 ? (i - m.start) / (m.end - m.start) : i >= m.start ? 1 : 0,
                c.trigger("update", {
                    startPos: m.start,
                    endPos: m.end,
                    scrollPos: i
                }),
                c.progress(t)
            } else P && p === l && M(!0);
            else a.updateScene(c, !1);
            return c
        },
        this.refresh = function() {
            return w(),
            b(),
            c
        },
        this.progress = function(e) {
            if (arguments.length) {
                var t = !1,
                i = p,
                r = a ? a.info("scrollDirection") : "PAUSED",
                n = u.reverse || e >= f;
                if (0 === u.duration ? (t = f != e, f = 1 > e && n ? 0 : 1, p = 0 === f ? o: l) : 0 > e && p !== o && n ? (f = 0, p = o, t = !0) : e >= 0 && 1 > e && n ? (f = e, p = l, t = !0) : e >= 1 && p !== h ? (f = 1, p = h, t = !0) : p !== l || n || M(), t) {
                    var s = {
                        progress: f,
                        state: p,
                        scrollDirection: r
                    },
                    d = p != i,
                    m = function(e) {
                        c.trigger(e, s)
                    };
                    d && i !== l && (m("enter"), m(i === o ? "start": "end")),
                    m("progress"),
                    d && p !== l && (m(p === o ? "start": "end"), m("leave"))
                }
                return c
            }
            return f
        };
        var y = function() {
            m = {
                start: g + u.offset
            },
            a && u.triggerElement && (m.start -= a.info("size") * u.triggerHook),
            m.end = m.start + u.duration
        },
        w = function(e) {
            if (s) {
                var t = "duration";
                C(t, s.call(c)) && !e && (c.trigger("change", {
                    what: t,
                    newval: u[t]
                }), c.trigger("shift", {
                    reason: t
                }))
            }
        },
        b = function(e) {
            var i = 0,
            r = u.triggerElement;
            if (a && r) {
                for (var s = a.info(), o = n.get.offset(s.container), l = s.vertical ? "top": "left"; r.parentNode.hasAttribute(t);) r = r.parentNode;
                var h = n.get.offset(r);
                s.isDocument || (o[l] -= a.scrollPos()),
                i = h[l] - o[l]
            }
            var d = i != g;
            g = i,
            d && !e && c.trigger("shift", {
                reason: "triggerElementPosition"
            })
        },
        x = function() {
            u.triggerHook > 0 && c.trigger("shift", {
                reason: "containerResize"
            })
        },
        T = n.extend(r.validate, {
            duration: function(e) {
                if (n.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
                    var t = parseFloat(e) / 100;
                    e = function() {
                        return a ? a.info("size") * t: 0
                    }
                }
                if (n.type.Function(e)) {
                    s = e;
                    try {
                        e = parseFloat(s())
                    } catch(t) {
                        e = -1
                    }
                }
                if (e = parseFloat(e), !n.type.Number(e) || 0 > e) throw s ? (s = void 0, 0) : 0;
                return e
            }
        }),
        S = function(e) { (e = arguments.length ? [e] : Object.keys(T)).forEach(function(e) {
                var t;
                if (T[e]) try {
                    t = T[e](u[e])
                } catch(i) {
                    t = d[e]
                } finally {
                    u[e] = t
                }
            })
        },
        C = function(e, t) {
            var i = !1,
            r = u[e];
            return u[e] != t && (u[e] = t, S(e), i = r != u[e]),
            i
        },
        E = function(e) {
            c[e] || (c[e] = function(t) {
                return arguments.length ? ("duration" === e && (s = void 0), C(e, t) && (c.trigger("change", {
                    what: e,
                    newval: u[e]
                }), r.shifts.indexOf(e) > -1 && c.trigger("shift", {
                    reason: e
                })), c) : u[e]
            })
        };
        this.controller = function() {
            return a
        },
        this.state = function() {
            return p
        },
        this.scrollOffset = function() {
            return m.start
        },
        this.triggerPosition = function() {
            var e = u.offset;
            return a && (e += u.triggerElement ? g: a.info("size") * c.triggerHook()),
            e
        };
        var P, k;
        c.on("shift.internal",
        function(e) {
            var t = "duration" === e.reason; (p === h && t || p === l && 0 === u.duration) && M(),
            t && O()
        }).on("progress.internal",
        function() {
            M()
        }).on("add.internal",
        function() {
            O()
        }).on("destroy.internal",
        function(e) {
            c.removePin(e.reset)
        });
        var M = function(e) {
            if (P && a) {
                var t = a.info(),
                i = k.spacer.firstChild;
                if (e || p !== l) {
                    var r = {
                        position: k.inFlow ? "relative": "absolute",
                        top: 0,
                        left: 0
                    },
                    s = n.css(i, "position") != r.position;
                    k.pushFollowers ? u.duration > 0 && (p === h && 0 === parseFloat(n.css(k.spacer, "padding-top")) ? s = !0 : p === o && 0 === parseFloat(n.css(k.spacer, "padding-bottom")) && (s = !0)) : r[t.vertical ? "top": "left"] = u.duration * f,
                    n.css(i, r),
                    s && O()
                } else {
                    "fixed" != n.css(i, "position") && (n.css(i, {
                        position: "fixed"
                    }), O());
                    var d = n.get.offset(k.spacer, !0),
                    c = u.reverse || 0 === u.duration ? t.scrollPos - m.start: Math.round(f * u.duration * 10) / 10;
                    d[t.vertical ? "top": "left"] += c,
                    n.css(k.spacer.firstChild, {
                        top: d.top,
                        left: d.left
                    })
                }
            }
        },
        O = function() {
            if (P && a && k.inFlow) {
                var e = p === l,
                t = a.info("vertical"),
                i = k.spacer.firstChild,
                r = n.isMarginCollapseType(n.css(k.spacer, "display")),
                s = {};
                k.relSize.width || k.relSize.autoFullWidth ? e ? n.css(P, {
                    width: n.get.width(k.spacer)
                }) : n.css(P, {
                    width: "100%"
                }) : (s["min-width"] = n.get.width(t ? P: i, !0, !0), s.width = e ? s["min-width"] : "auto"),
                k.relSize.height ? e ? n.css(P, {
                    height: n.get.height(k.spacer) - (k.pushFollowers ? u.duration: 0)
                }) : n.css(P, {
                    height: "100%"
                }) : (s["min-height"] = n.get.height(t ? i: P, !0, !r), s.height = e ? s["min-height"] : "auto"),
                k.pushFollowers && (s["padding" + (t ? "Top": "Left")] = u.duration * f, s["padding" + (t ? "Bottom": "Right")] = u.duration * (1 - f)),
                n.css(k.spacer, s)
            }
        },
        z = function() {
            a && P && p === l && !a.info("isDocument") && M()
        },
        A = function() {
            a && P && p === l && ((k.relSize.width || k.relSize.autoFullWidth) && n.get.width(window) != n.get.width(k.spacer.parentNode) || k.relSize.height && n.get.height(window) != n.get.height(k.spacer.parentNode)) && O()
        },
        L = function(e) {
            a && P && p === l && !a.info("isDocument") && (e.preventDefault(), a._setScrollPos(a.info("scrollPos") - ((e.wheelDelta || e[a.info("vertical") ? "wheelDeltaY": "wheelDeltaX"]) / 3 || 30 * -e.detail)))
        };
        this.setPin = function(e, i) {
            if (i = n.extend({},
            {
                pushFollowers: !0,
                spacerClass: "scrollmagic-pin-spacer"
            },
            i), !(e = n.get.elements(e)[0])) return c;
            if ("fixed" === n.css(e, "position")) return c;
            if (P) {
                if (P === e) return c;
                c.removePin()
            }
            var r = (P = e).parentNode.style.display,
            s = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            P.parentNode.style.display = "none";
            var a = "absolute" != n.css(P, "position"),
            o = n.css(P, s.concat(["display"])),
            l = n.css(P, ["width", "height"]);
            P.parentNode.style.display = r,
            !a && i.pushFollowers && (i.pushFollowers = !1);
            var h = P.parentNode.insertBefore(document.createElement("div"), P),
            d = n.extend(o, {
                position: a ? "relative": "absolute",
                boxSizing: "content-box",
                mozBoxSizing: "content-box",
                webkitBoxSizing: "content-box"
            });
            if (a || n.extend(d, n.css(P, ["width", "height"])), n.css(h, d), h.setAttribute(t, ""), n.addClass(h, i.spacerClass), k = {
                spacer: h,
                relSize: {
                    width: "%" === l.width.slice( - 1),
                    height: "%" === l.height.slice( - 1),
                    autoFullWidth: "auto" === l.width && a && n.isMarginCollapseType(o.display)
                },
                pushFollowers: i.pushFollowers,
                inFlow: a
            },
            !P.___origStyle) {
                P.___origStyle = {};
                var u = P.style;
                s.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]).forEach(function(e) {
                    P.___origStyle[e] = u[e] || ""
                })
            }
            return k.relSize.width && n.css(h, {
                width: l.width
            }),
            k.relSize.height && n.css(h, {
                height: l.height
            }),
            h.appendChild(P),
            n.css(P, {
                position: a ? "relative": "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }),
            (k.relSize.width || k.relSize.autoFullWidth) && n.css(P, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }),
            window.addEventListener("scroll", z),
            window.addEventListener("resize", z),
            window.addEventListener("resize", A),
            P.addEventListener("mousewheel", L),
            P.addEventListener("DOMMouseScroll", L),
            M(),
            c
        },
        this.removePin = function(e) {
            if (P) {
                if (p === l && M(!0), e || !a) {
                    var i = k.spacer.firstChild;
                    if (i.hasAttribute(t)) {
                        var r = k.spacer.style;
                        margins = {},
                        ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"].forEach(function(e) {
                            margins[e] = r[e] || ""
                        }),
                        n.css(i, margins)
                    }
                    k.spacer.parentNode.insertBefore(i, k.spacer),
                    k.spacer.parentNode.removeChild(k.spacer),
                    P.parentNode.hasAttribute(t) || (n.css(P, P.___origStyle), delete P.___origStyle)
                }
                window.removeEventListener("scroll", z),
                window.removeEventListener("resize", z),
                window.removeEventListener("resize", A),
                P.removeEventListener("mousewheel", L),
                P.removeEventListener("DOMMouseScroll", L),
                P = void 0
            }
            return c
        };
        var D, R = [];
        return c.on("destroy.internal",
        function(e) {
            c.removeClassToggle(e.reset)
        }),
        this.setClassToggle = function(e, t) {
            var i = n.get.elements(e);
            return 0 !== i.length && n.type.String(t) ? (R.length > 0 && c.removeClassToggle(), D = t, R = i, c.on("enter.internal_class leave.internal_class",
            function(e) {
                var t = "enter" === e.type ? n.addClass: n.removeClass;
                R.forEach(function(e) {
                    t(e, D)
                })
            }), c) : c
        },
        this.removeClassToggle = function(e) {
            return e && R.forEach(function(e) {
                n.removeClass(e, D)
            }),
            c.off("start.internal_class end.internal_class"),
            D = void 0,
            R = [],
            c
        },
        function() {
            for (var e in u) d.hasOwnProperty(e) || delete u[e];
            for (var t in d) E(t);
            S()
        } (),
        c
    };
    var r = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(e) {
                if (e = parseFloat(e), !n.type.Number(e)) throw 0;
                return e
            },
            triggerElement: function(e) {
                if (e = e || void 0) {
                    var t = n.get.elements(e)[0];
                    if (!t) throw 0;
                    e = t
                }
                return e
            },
            triggerHook: function(e) {
                var t = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (n.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
                else {
                    if (! (e in t)) throw 0;
                    e = t[e]
                }
                return e
            },
            reverse: function(e) {
                return !! e
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    e.Scene.addOption = function(e, t, i, n) {
        e in r.defaults || (r.defaults[e] = t, r.validate[e] = i, n && r.shifts.push(e))
    },
    e.Scene.extend = function(t) {
        var i = this;
        e.Scene = function() {
            return i.apply(this, arguments),
            this.$super = n.extend({},
            this),
            t.apply(this, arguments) || this
        },
        n.extend(e.Scene, i),
        e.Scene.prototype = i.prototype,
        e.Scene.prototype.constructor = e.Scene
    },
    e.Event = function(e, t, i, r) {
        r = r || {};
        for (var n in r) this[n] = r[n];
        return this.type = e,
        this.target = this.currentTarget = i,
        this.namespace = t || "",
        this.timeStamp = this.timestamp = Date.now(),
        this
    };
    var n = e._util = function(e) {
        var t, i = {},
        r = function(e) {
            return parseFloat(e) || 0
        },
        n = function(t) {
            return t.currentStyle ? t.currentStyle: e.getComputedStyle(t)
        },
        s = function(t, i, s, a) {
            if ((i = i === document ? e: i) === e) a = !1;
            else if (!c.DomElement(i)) return 0;
            t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
            var o = (s ? i["offset" + t] || i["outer" + t] : i["client" + t] || i["inner" + t]) || 0;
            if (s && a) {
                var l = n(i);
                o += "Height" === t ? r(l.marginTop) + r(l.marginBottom) : r(l.marginLeft) + r(l.marginRight)
            }
            return o
        },
        a = function(e) {
            return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g,
            function(e) {
                return e[1].toUpperCase()
            })
        };
        i.extend = function(e) {
            for (e = e || {},
            t = 1; t < arguments.length; t++) if (arguments[t]) for (var i in arguments[t]) arguments[t].hasOwnProperty(i) && (e[i] = arguments[t][i]);
            return e
        },
        i.isMarginCollapseType = function(e) {
            return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
        };
        var o = 0,
        l = ["ms", "moz", "webkit", "o"],
        h = e.requestAnimationFrame,
        d = e.cancelAnimationFrame;
        for (t = 0; ! h && t < l.length; ++t) h = e[l[t] + "RequestAnimationFrame"],
        d = e[l[t] + "CancelAnimationFrame"] || e[l[t] + "CancelRequestAnimationFrame"];
        h || (h = function(t) {
            var i = (new Date).getTime(),
            r = Math.max(0, 16 - (i - o)),
            n = e.setTimeout(function() {
                t(i + r)
            },
            r);
            return o = i + r,
            n
        }),
        d || (d = function(t) {
            e.clearTimeout(t)
        }),
        i.rAF = h.bind(e),
        i.cAF = d.bind(e);
        var c = i.type = function(e) {
            return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        };
        c.String = function(e) {
            return "string" === c(e)
        },
        c.Function = function(e) {
            return "function" === c(e)
        },
        c.Array = function(e) {
            return Array.isArray(e)
        },
        c.Number = function(e) {
            return ! c.Array(e) && e - parseFloat(e) + 1 >= 0
        },
        c.DomElement = function(e) {
            return "object" == typeof HTMLElement ? e instanceof HTMLElement: e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
        };
        var u = i.get = {};
        return u.elements = function(t) {
            var i = [];
            if (c.String(t)) try {
                t = document.querySelectorAll(t)
            } catch(e) {
                return i
            }
            if ("nodelist" === c(t) || c.Array(t)) for (var r = 0,
            n = i.length = t.length; n > r; r++) {
                var s = t[r];
                i[r] = c.DomElement(s) ? s: u.elements(s)
            } else(c.DomElement(t) || t === document || t === e) && (i = [t]);
            return i
        },
        u.scrollTop = function(t) {
            return t && "number" == typeof t.scrollTop ? t.scrollTop: e.pageYOffset || 0
        },
        u.scrollLeft = function(t) {
            return t && "number" == typeof t.scrollLeft ? t.scrollLeft: e.pageXOffset || 0
        },
        u.width = function(e, t, i) {
            return s("width", e, t, i)
        },
        u.height = function(e, t, i) {
            return s("height", e, t, i)
        },
        u.offset = function(e, t) {
            var i = {
                top: 0,
                left: 0
            };
            if (e && e.getBoundingClientRect) {
                var r = e.getBoundingClientRect();
                i.top = r.top,
                i.left = r.left,
                t || (i.top += u.scrollTop(), i.left += u.scrollLeft())
            }
            return i
        },
        i.addClass = function(e, t) {
            t && (e.classList ? e.classList.add(t) : e.className += " " + t)
        },
        i.removeClass = function(e, t) {
            t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
        },
        i.css = function(e, t) {
            if (c.String(t)) return n(e)[a(t)];
            if (c.Array(t)) {
                var i = {},
                r = n(e);
                return t.forEach(function(e) {
                    i[e] = r[a(e)]
                }),
                i
            }
            for (var s in t) {
                var o = t[s];
                o == parseFloat(o) && (o += "px"),
                e.style[a(s)] = o
            }
        },
        i
    } (window || {});
    return e
});
_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global: this || window; (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var e = (_gsScope.document || {}).documentElement,
    t = _gsScope,
    i = function(i, r) {
        var n = "x" === r ? "Width": "Height",
        s = "scroll" + n,
        a = "client" + n,
        o = document.body;
        return i === t || i === e || i === o ? Math.max(e[s], o[s]) - (t["inner" + n] || e[a] || o[a]) : i[s] - i["offset" + n]
    },
    r = function(i, r) {
        var n = "scroll" + ("x" === r ? "Left": "Top");
        return i === t && (null != i.pageXOffset ? n = "page" + r.toUpperCase() + "Offset": i = null != e[n] ? e: document.body),
        function() {
            return i[n]
        }
    },
    n = function(i, n) {
        var s = function(e) {
            return "string" == typeof e && (e = TweenLite.selector(e)),
            e.length && e !== t && e[0] && e[0].style && !e.nodeType && (e = e[0]),
            e === t || e.nodeType && e.style ? e: null
        } (i).getBoundingClientRect(),
        a = !n || n === t || n === document.body,
        o = (a ? e: n).getBoundingClientRect(),
        l = {
            x: s.left - o.left,
            y: s.top - o.top
        };
        return ! a && n && (l.x += r(n, "x")(), l.y += r(n, "y")()),
        l
    },
    s = function(e, t, r) {
        var s = typeof e;
        return isNaN(e) ? "number" === s || "string" === s && "=" === e.charAt(1) ? e: "max" === e ? i(t, r) : Math.min(i(t, r), n(e, t)[r]) : parseFloat(e)
    },
    a = _gsScope._gsDefine.plugin({
        propName: "scrollTo",
        API: 2,
        global: !0,
        version: "1.9.0",
        init: function(e, i, n) {
            return this._wdw = e === t,
            this._target = e,
            this._tween = n,
            "object" != typeof i ? "string" == typeof(i = {
                y: i
            }).y && "max" !== i.y && "=" !== i.y.charAt(1) && (i.x = i.y) : i.nodeType && (i = {
                y: i,
                x: i
            }),
            this.vars = i,
            this._autoKill = !1 !== i.autoKill,
            this.getX = r(e, "x"),
            this.getY = r(e, "y"),
            this.x = this.xPrev = this.getX(),
            this.y = this.yPrev = this.getY(),
            null != i.x ? (this._addTween(this, "x", this.x, s(i.x, e, "x") - (i.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0,
            null != i.y ? (this._addTween(this, "y", this.y, s(i.y, e, "y") - (i.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0,
            !0
        },
        set: function(e) {
            this._super.setRatio.call(this, e);
            var r = this._wdw || !this.skipX ? this.getX() : this.xPrev,
            n = this._wdw || !this.skipY ? this.getY() : this.yPrev,
            s = n - this.yPrev,
            o = r - this.xPrev,
            l = a.autoKillThreshold;
            this.x < 0 && (this.x = 0),
            this.y < 0 && (this.y = 0),
            this._autoKill && (!this.skipX && (o > l || o < -l) && r < i(this._target, "x") && (this.skipX = !0), !this.skipY && (s > l || s < -l) && n < i(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))),
            this._wdw ? t.scrollTo(this.skipX ? r: this.x, this.skipY ? n: this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)),
            this.xPrev = this.x,
            this.yPrev = this.y
        }
    }),
    o = a.prototype;
    a.max = i,
    a.getOffset = n,
    a.buildGetter = r,
    a.autoKillThreshold = 7,
    o._kill = function(e) {
        return e.scrollTo_x && (this.skipX = !0),
        e.scrollTo_y && (this.skipY = !0),
        this._super._kill.call(this, e)
    }
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(e) {
    "use strict";
    var t = function() {
        return (_gsScope.GreenSockGlobals || _gsScope).ScrollToPlugin
    };
    "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = t()) : "function" == typeof define && define.amd && define(["TweenLite"], t)
} ();
var _gsScope; ((_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global: this || window)._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function(e, t, i) {
        var r = function(e) {
            var t, i = [],
            r = e.length;
            for (t = 0; t !== r; i.push(e[t++]));
            return i
        },
        n = function(e, t, i) {
            var r, n, s = e.cycle;
            for (r in s) n = s[r],
            e[r] = "function" == typeof n ? n(i, t[i]) : n[i % n.length];
            delete e.cycle
        },
        s = function(e, t, r) {
            i.call(this, e, t, r),
            this._cycle = 0,
            this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._repeat && this._uncache(!0),
            this.render = s.prototype.render
        },
        a = i._internals,
        o = a.isSelector,
        l = a.isArray,
        h = s.prototype = i.to({},
        .1, {}),
        d = [];
        s.version = "1.20.3",
        h.constructor = s,
        h.kill()._gc = !1,
        s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf,
        s.getTweensOf = i.getTweensOf,
        s.lagSmoothing = i.lagSmoothing,
        s.ticker = i.ticker,
        s.render = i.render,
        h.invalidate = function() {
            return this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._yoyoEase = null,
            this._uncache(!0),
            i.prototype.invalidate.call(this)
        },
        h.updateTo = function(e, t) {
            var r, n = this.ratio,
            s = this.vars.immediateRender || e.immediateRender;
            t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (r in e) this.vars[r] = e[r];
            if (this._initted || s) if (t) this._initted = !1,
            s && this.render(0, !0, !0);
            else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                var a = this._totalTime;
                this.render(0, !0, !1),
                this._initted = !1,
                this.render(a, !0, !1)
            } else if (this._initted = !1, this._init(), this._time > 0 || s) for (var o, l = 1 / (1 - n), h = this._firstPT; h;) o = h.s + h.c,
            h.c *= l,
            h.s = o - h.c,
            h = h._next;
            return this
        },
        h.render = function(e, t, r) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var n, s, o, l, h, d, c, u, p, f = this._dirty ? this.totalDuration() : this._totalDuration,
            m = this._time,
            g = this._totalTime,
            v = this._cycle,
            _ = this._duration,
            y = this._rawPrevTime;
            if (e >= f - 1e-7 && e >= 0 ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = _, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, s = "onComplete", r = r || this._timeline.autoRemoveChildren), 0 === _ && (this._initted || !this.vars.lazy || r) && (this._startTime === this._timeline._duration && (e = 0), (y < 0 || e <= 0 && e >= -1e-7 || 1e-10 === y && "isPause" !== this.data) && y !== e && (r = !0, y > 1e-10 && (s = "onReverseComplete")), this._rawPrevTime = u = !t || e || y === e ? e: 1e-10)) : e < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== g || 0 === _ && y > 0) && (s = "onReverseComplete", n = this._reversed), e < 0 && (this._active = !1, 0 === _ && (this._initted || !this.vars.lazy || r) && (y >= 0 && (r = !0), this._rawPrevTime = u = !t || e || y === e ? e: 1e-10)), this._initted || (r = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (l = _ + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && g <= e && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 != (1 & this._cycle) && (this._time = _ - this._time, (p = this._yoyoEase || this.vars.yoyoEase) && (this._yoyoEase || (!0 !== p || this._initted ? this._yoyoEase = p = !0 === p ? this._ease: p instanceof Ease ? p: Ease.map[p] : (p = this.vars.ease, this._yoyoEase = p = p ? p instanceof Ease ? p: "function" == typeof p ? new Ease(p, this.vars.easeParams) : Ease.map[p] || i.defaultEase: i.defaultEase)), this.ratio = p ? 1 - p.getRatio((_ - this._time) / _) : 0)), this._time > _ ? this._time = _: this._time < 0 && (this._time = 0)), this._easeType && !p ? (h = this._time / _, d = this._easeType, c = this._easePower, (1 === d || 3 === d && h >= .5) && (h = 1 - h), 3 === d && (h *= 2), 1 === c ? h *= h: 2 === c ? h *= h * h: 3 === c ? h *= h * h * h: 4 === c && (h *= h * h * h * h), 1 === d ? this.ratio = 1 - h: 2 === d ? this.ratio = h: this._time / _ < .5 ? this.ratio = h / 2 : this.ratio = 1 - h / 2) : p || (this.ratio = this._ease.getRatio(this._time / _))), m !== this._time || r || v !== this._cycle) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!r && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = m,
                    this._totalTime = g,
                    this._rawPrevTime = y,
                    this._cycle = v,
                    a.lazyTweens.push(this),
                    void(this._lazy = [e, t]); ! this._time || n || p ? n && this._ease._calcEnd && !p && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / _)
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== m && e >= 0 && (this._active = !0), 0 === g && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, !0, r) : s || (s = "_dummyGS")), this.vars.onStart && (0 === this._totalTime && 0 !== _ || t || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s,
                o = o._next;
                this._onUpdate && (e < 0 && this._startAt && this._startTime && this._startAt.render(e, !0, r), t || (this._totalTime !== g || s) && this._callback("onUpdate")),
                this._cycle !== v && (t || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
                s && (this._gc && !r || (e < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, !0, r), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[s] && this._callback(s), 0 === _ && 1e-10 === this._rawPrevTime && 1e-10 !== u && (this._rawPrevTime = 0)))
            } else g !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate"))
        },
        s.to = function(e, t, i) {
            return new s(e, t, i)
        },
        s.from = function(e, t, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new s(e, t, i)
        },
        s.fromTo = function(e, t, i, r) {
            return r.startAt = i,
            r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender,
            new s(e, t, r)
        },
        s.staggerTo = s.allTo = function(e, t, a, h, c, u, p) {
            h = h || 0;
            var f, m, g, v, _ = 0,
            y = [],
            w = function() {
                a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments),
                c.apply(p || a.callbackScope || this, u || d)
            },
            b = a.cycle,
            x = a.startAt && a.startAt.cycle;
            for (l(e) || ("string" == typeof e && (e = i.selector(e) || e), o(e) && (e = r(e))), e = e || [], h < 0 && ((e = r(e)).reverse(), h *= -1), f = e.length - 1, g = 0; g <= f; g++) {
                m = {};
                for (v in a) m[v] = a[v];
                if (b && (n(m, e, g), null != m.duration && (t = m.duration, delete m.duration)), x) {
                    x = m.startAt = {};
                    for (v in a.startAt) x[v] = a.startAt[v];
                    n(m.startAt, e, g)
                }
                m.delay = _ + (m.delay || 0),
                g === f && c && (m.onComplete = w),
                y[g] = new s(e[g], t, m),
                _ += h
            }
            return y
        },
        s.staggerFrom = s.allFrom = function(e, t, i, r, n, a, o) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            s.staggerTo(e, t, i, r, n, a, o)
        },
        s.staggerFromTo = s.allFromTo = function(e, t, i, r, n, a, o, l) {
            return r.startAt = i,
            r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender,
            s.staggerTo(e, t, r, n, a, o, l)
        },
        s.delayedCall = function(e, t, i, r, n) {
            return new s(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: i,
                callbackScope: r,
                onReverseComplete: t,
                onReverseCompleteParams: i,
                immediateRender: !1,
                useFrames: n,
                overwrite: 0
            })
        },
        s.set = function(e, t) {
            return new s(e, 0, t)
        },
        s.isTweening = function(e) {
            return i.getTweensOf(e, !0).length > 0
        };
        var c = function(e, t) {
            for (var r = [], n = 0, s = e._first; s;) s instanceof i ? r[n++] = s: (t && (r[n++] = s), n = (r = r.concat(c(s, t))).length),
            s = s._next;
            return r
        },
        u = s.getAllTweens = function(t) {
            return c(e._rootTimeline, t).concat(c(e._rootFramesTimeline, t))
        };
        s.killAll = function(e, i, r, n) {
            null == i && (i = !0),
            null == r && (r = !0);
            var s, a, o, l = u(0 != n),
            h = l.length,
            d = i && r && n;
            for (o = 0; o < h; o++) a = l[o],
            (d || a instanceof t || (s = a.target === a.vars.onComplete) && r || i && !s) && (e ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
        },
        s.killChildTweensOf = function(e, t) {
            if (null != e) {
                var n, h, d, c, u, p = a.tweenLookup;
                if ("string" == typeof e && (e = i.selector(e) || e), o(e) && (e = r(e)), l(e)) for (c = e.length; --c > -1;) s.killChildTweensOf(e[c], t);
                else {
                    n = [];
                    for (d in p) for (h = p[d].target.parentNode; h;) h === e && (n = n.concat(p[d].tweens)),
                    h = h.parentNode;
                    for (u = n.length, c = 0; c < u; c++) t && n[c].totalTime(n[c].totalDuration()),
                    n[c]._enabled(!1, !1)
                }
            }
        };
        var p = function(e, i, r, n) {
            i = !1 !== i,
            r = !1 !== r;
            for (var s, a, o = u(n = !1 !== n), l = i && r && n, h = o.length; --h > -1;) a = o[h],
            (l || a instanceof t || (s = a.target === a.vars.onComplete) && r || i && !s) && a.paused(e)
        };
        return s.pauseAll = function(e, t, i) {
            p(!0, e, t, i)
        },
        s.resumeAll = function(e, t, i) {
            p(!1, e, t, i)
        },
        s.globalTimeScale = function(t) {
            var r = e._rootTimeline,
            n = i.ticker.time;
            return arguments.length ? (t = t || 1e-10, r._startTime = n - (n - r._startTime) * r._timeScale / t, r = e._rootFramesTimeline, n = i.ticker.frame, r._startTime = n - (n - r._startTime) * r._timeScale / t, r._timeScale = e._rootTimeline._timeScale = t, t) : r._timeScale
        },
        h.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - e: e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
        },
        h.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
        },
        h.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 != (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
        },
        h.duration = function(t) {
            return arguments.length ? e.prototype.duration.call(this, t) : this._duration
        },
        h.totalDuration = function(e) {
            return arguments.length ? -1 === this._repeat ? this: this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        },
        h.repeat = function(e) {
            return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
        },
        h.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
        },
        h.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e, this) : this._yoyo
        },
        s
    },
    !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function(e, t, i) {
        var r = function(e) {
            t.call(this, e),
            this._labels = {},
            this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren,
            this.smoothChildTiming = !0 === this.vars.smoothChildTiming,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var i, r, n = this.vars;
            for (r in n) i = n[r],
            o(i) && -1 !== i.join("").indexOf("{self}") && (n[r] = this._swapSelfInParams(i));
            o(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger)
        },
        n = i._internals,
        s = r._internals = {},
        a = n.isSelector,
        o = n.isArray,
        l = n.lazyTweens,
        h = n.lazyRender,
        d = _gsScope._gsDefine.globals,
        c = function(e) {
            var t, i = {};
            for (t in e) i[t] = e[t];
            return i
        },
        u = function(e, t, i) {
            var r, n, s = e.cycle;
            for (r in s) n = s[r],
            e[r] = "function" == typeof n ? n(i, t[i]) : n[i % n.length];
            delete e.cycle
        },
        p = s.pauseCallback = function() {},
        f = function(e) {
            var t, i = [],
            r = e.length;
            for (t = 0; t !== r; i.push(e[t++]));
            return i
        },
        m = r.prototype = new t;
        return r.version = "1.20.3",
        m.constructor = r,
        m.kill()._gc = m._forcingPlayhead = m._hasPause = !1,
        m.to = function(e, t, r, n) {
            var s = r.repeat && d.TweenMax || i;
            return t ? this.add(new s(e, t, r), n) : this.set(e, r, n)
        },
        m.from = function(e, t, r, n) {
            return this.add((r.repeat && d.TweenMax || i).from(e, t, r), n)
        },
        m.fromTo = function(e, t, r, n, s) {
            var a = n.repeat && d.TweenMax || i;
            return t ? this.add(a.fromTo(e, t, r, n), s) : this.set(e, n, s)
        },
        m.staggerTo = function(e, t, n, s, o, l, h, d) {
            var p, m, g = new r({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: d,
                smoothChildTiming: this.smoothChildTiming
            }),
            v = n.cycle;
            for ("string" == typeof e && (e = i.selector(e) || e), a(e = e || []) && (e = f(e)), (s = s || 0) < 0 && ((e = f(e)).reverse(), s *= -1), m = 0; m < e.length; m++)(p = c(n)).startAt && (p.startAt = c(p.startAt), p.startAt.cycle && u(p.startAt, e, m)),
            v && (u(p, e, m), null != p.duration && (t = p.duration, delete p.duration)),
            g.to(e[m], t, p, m * s);
            return this.add(g, o)
        },
        m.staggerFrom = function(e, t, i, r, n, s, a, o) {
            return i.immediateRender = 0 != i.immediateRender,
            i.runBackwards = !0,
            this.staggerTo(e, t, i, r, n, s, a, o)
        },
        m.staggerFromTo = function(e, t, i, r, n, s, a, o, l) {
            return r.startAt = i,
            r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender,
            this.staggerTo(e, t, r, n, s, a, o, l)
        },
        m.call = function(e, t, r, n) {
            return this.add(i.delayedCall(0, e, t, r), n)
        },
        m.set = function(e, t, r) {
            return r = this._parseTimeOrLabel(r, 0, !0),
            null == t.immediateRender && (t.immediateRender = r === this._time && !this._paused),
            this.add(new i(e, 0, t), r)
        },
        r.exportRoot = function(e, t) {
            null == (e = e || {}).smoothChildTiming && (e.smoothChildTiming = !0);
            var n, s, a, o, l = new r(e),
            h = l._timeline;
            for (null == t && (t = !0), h._remove(l, !0), l._startTime = 0, l._rawPrevTime = l._time = l._totalTime = h._time, a = h._first; a;) o = a._next,
            t && a instanceof i && a.target === a.vars.onComplete || ((s = a._startTime - a._delay) < 0 && (n = 1), l.add(a, s)),
            a = o;
            return h.add(l, 0),
            n && l.totalDuration(),
            l
        },
        m.add = function(n, s, a, l) {
            var h, d, c, u, p, f;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, n)), !(n instanceof e)) {
                if (n instanceof Array || n && n.push && o(n)) {
                    for (a = a || "normal", l = l || 0, h = s, d = n.length, c = 0; c < d; c++) o(u = n[c]) && (u = new r({
                        tweens: u
                    })),
                    this.add(u, h),
                    "string" != typeof u && "function" != typeof u && ("sequence" === a ? h = u._startTime + u.totalDuration() / u._timeScale: "start" === a && (u._startTime -= u.delay())),
                    h += l;
                    return this._uncache(!0)
                }
                if ("string" == typeof n) return this.addLabel(n, s);
                if ("function" != typeof n) throw "Cannot add " + n + " into the timeline; it is not a tween, timeline, function, or string.";
                n = i.delayedCall(0, n)
            }
            if (t.prototype.add.call(this, n, s), n._time && n.render((this.rawTime() - n._startTime) * n._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (f = (p = this).rawTime() > n._startTime; p._timeline;) f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1),
            p = p._timeline;
            return this
        },
        m.remove = function(t) {
            if (t instanceof e) {
                this._remove(t, !1);
                var i = t._timeline = t.vars.useFrames ? e._rootFramesTimeline: e._rootTimeline;
                return t._startTime = (t._paused ? t._pauseTime: i._time) - (t._reversed ? t.totalDuration() - t._totalTime: t._totalTime) / t._timeScale,
                this
            }
            if (t instanceof Array || t && t.push && o(t)) {
                for (var r = t.length; --r > -1;) this.remove(t[r]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
        },
        m._remove = function(e, i) {
            t.prototype._remove.call(this, e, i);
            return this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        },
        m.append = function(e, t) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
        },
        m.insert = m.insertMultiple = function(e, t, i, r) {
            return this.add(e, t || 0, i, r)
        },
        m.appendMultiple = function(e, t, i, r) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, r)
        },
        m.addLabel = function(e, t) {
            return this._labels[e] = this._parseTimeOrLabel(t),
            this
        },
        m.addPause = function(e, t, r, n) {
            var s = i.delayedCall(0, p, r, n || this);
            return s.vars.onComplete = s.vars.onReverseComplete = t,
            s.data = "isPause",
            this._hasPause = !0,
            this.add(s, e)
        },
        m.removeLabel = function(e) {
            return delete this._labels[e],
            this
        },
        m.getLabelTime = function(e) {
            return null != this._labels[e] ? this._labels[e] : -1
        },
        m._parseTimeOrLabel = function(t, i, r, n) {
            var s, a;
            if (n instanceof e && n.timeline === this) this.remove(n);
            else if (n && (n instanceof Array || n.push && o(n))) for (a = n.length; --a > -1;) n[a] instanceof e && n[a].timeline === this && this.remove(n[a]);
            if (s = "number" != typeof t || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration: 0, "string" == typeof i) return this._parseTimeOrLabel(i, r && "number" == typeof t && null == this._labels[i] ? t - s: 0, r);
            if (i = i || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = s);
            else {
                if ( - 1 === (a = t.indexOf("="))) return null == this._labels[t] ? r ? this._labels[t] = s + i: i: this._labels[t] + i;
                i = parseInt(t.charAt(a - 1) + "1", 10) * Number(t.substr(a + 1)),
                t = a > 1 ? this._parseTimeOrLabel(t.substr(0, a - 1), 0, r) : s
            }
            return Number(t) + i
        },
        m.seek = function(e, t) {
            return this.totalTime("number" == typeof e ? e: this._parseTimeOrLabel(e), !1 !== t)
        },
        m.stop = function() {
            return this.paused(!0)
        },
        m.gotoAndPlay = function(e, t) {
            return this.play(e, t)
        },
        m.gotoAndStop = function(e, t) {
            return this.pause(e, t)
        },
        m.render = function(e, t, i) {
            this._gc && this._enabled(!0, !1);
            var r, n, s, a, o, d, c, u = this._time,
            p = this._dirty ? this.totalDuration() : this._totalDuration,
            f = this._startTime,
            m = this._timeScale,
            g = this._paused;
            if (u !== this._time && (e += this._time - u), e >= p - 1e-7 && e >= 0) this._totalTime = this._time = p,
            this._reversed || this._hasPausedChild() || (n = !0, a = "onComplete", o = !!this._timeline.autoRemoveChildren, 0 === this._duration && (e <= 0 && e >= -1e-7 || this._rawPrevTime < 0 || 1e-10 === this._rawPrevTime) && this._rawPrevTime !== e && this._first && (o = !0, this._rawPrevTime > 1e-10 && (a = "onReverseComplete"))),
            this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e: 1e-10,
            e = p + 1e-4;
            else if (e < 1e-7) if (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && 1e-10 !== this._rawPrevTime && (this._rawPrevTime > 0 || e < 0 && this._rawPrevTime >= 0)) && (a = "onReverseComplete", n = this._reversed), e < 0) this._active = !1,
            this._timeline.autoRemoveChildren && this._reversed ? (o = n = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (o = !0),
            this._rawPrevTime = e;
            else {
                if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e: 1e-10, 0 === e && n) for (r = this._first; r && 0 === r._startTime;) r._duration || (n = !1),
                r = r._next;
                e = 0,
                this._initted || (o = !0)
            } else {
                if (this._hasPause && !this._forcingPlayhead && !t) {
                    if (e >= u) for (r = this._first; r && r._startTime <= e && !d;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (d = r),
                    r = r._next;
                    else for (r = this._last; r && r._startTime >= e && !d;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (d = r),
                    r = r._prev;
                    d && (this._time = e = d._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = e
            }
            if (this._time !== u && this._first || i || o || d) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && e > 0 && (this._active = !0), 0 === u && this.vars.onStart && (0 === this._time && this._duration || t || this._callback("onStart")), (c = this._time) >= u) for (r = this._first; r && (s = r._next, c === this._time && (!this._paused || g));)(r._active || r._startTime <= c && !r._paused && !r._gc) && (d === r && this.pause(), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)),
                r = s;
                else for (r = this._last; r && (s = r._prev, c === this._time && (!this._paused || g));) {
                    if (r._active || r._startTime <= u && !r._paused && !r._gc) {
                        if (d === r) {
                            for (d = r._prev; d && d.endTime() > this._time;) d.render(d._reversed ? d.totalDuration() - (e - d._startTime) * d._timeScale: (e - d._startTime) * d._timeScale, t, i),
                            d = d._prev;
                            d = null,
                            this.pause()
                        }
                        r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)
                    }
                    r = s
                }
                this._onUpdate && (t || (l.length && h(), this._callback("onUpdate"))),
                a && (this._gc || f !== this._startTime && m === this._timeScale || (0 === this._time || p >= this.totalDuration()) && (n && (l.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[a] && this._callback(a)))
            }
        },
        m._hasPausedChild = function() {
            for (var e = this._first; e;) {
                if (e._paused || e instanceof r && e._hasPausedChild()) return ! 0;
                e = e._next
            }
            return ! 1
        },
        m.getChildren = function(e, t, r, n) {
            n = n || -9999999999;
            for (var s = [], a = this._first, o = 0; a;) a._startTime < n || (a instanceof i ? !1 !== t && (s[o++] = a) : (!1 !== r && (s[o++] = a), !1 !== e && (o = (s = s.concat(a.getChildren(!0, t, r))).length))),
            a = a._next;
            return s
        },
        m.getTweensOf = function(e, t) {
            var r, n, s = this._gc,
            a = [],
            o = 0;
            for (s && this._enabled(!0, !0), n = (r = i.getTweensOf(e)).length; --n > -1;)(r[n].timeline === this || t && this._contains(r[n])) && (a[o++] = r[n]);
            return s && this._enabled(!1, !0),
            a
        },
        m.recent = function() {
            return this._recent
        },
        m._contains = function(e) {
            for (var t = e.timeline; t;) {
                if (t === this) return ! 0;
                t = t.timeline
            }
            return ! 1
        },
        m.shiftChildren = function(e, t, i) {
            i = i || 0;
            for (var r, n = this._first,
            s = this._labels; n;) n._startTime >= i && (n._startTime += e),
            n = n._next;
            if (t) for (r in s) s[r] >= i && (s[r] += e);
            return this._uncache(!0)
        },
        m._kill = function(e, t) {
            if (!e && !t) return this._enabled(!1, !1);
            for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), r = i.length, n = !1; --r > -1;) i[r]._kill(e, t) && (n = !0);
            return n
        },
        m.clear = function(e) {
            var t = this.getChildren(!1, !0, !0),
            i = t.length;
            for (this._time = this._totalTime = 0; --i > -1;) t[i]._enabled(!1, !1);
            return ! 1 !== e && (this._labels = {}),
            this._uncache(!0)
        },
        m.invalidate = function() {
            for (var t = this._first; t;) t.invalidate(),
            t = t._next;
            return e.prototype.invalidate.call(this)
        },
        m._enabled = function(e, i) {
            if (e === this._gc) for (var r = this._first; r;) r._enabled(e, !0),
            r = r._next;
            return t.prototype._enabled.call(this, e, i)
        },
        m.totalTime = function(t, i, r) {
            this._forcingPlayhead = !0;
            var n = e.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            n
        },
        m.duration = function(e) {
            return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
        },
        m.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var t, i, r = 0,
                    n = this._last,
                    s = 999999999999; n;) t = n._prev,
                    n._dirty && n.totalDuration(),
                    n._startTime > s && this._sortChildren && !n._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(n, n._startTime - n._delay), this._calculatingDuration = 0) : s = n._startTime,
                    n._startTime < 0 && !n._paused && (r -= n._startTime, this._timeline.smoothChildTiming && (this._startTime += n._startTime / this._timeScale, this._time -= n._startTime, this._totalTime -= n._startTime, this._rawPrevTime -= n._startTime), this.shiftChildren( - n._startTime, !1, -9999999999), s = 0),
                    (i = n._startTime + n._totalDuration / n._timeScale) > r && (r = i),
                    n = t;
                    this._duration = this._totalDuration = r,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
        },
        m.paused = function(t) {
            if (!t) for (var i = this._first,
            r = this._time; i;) i._startTime === r && "isPause" === i.data && (i._rawPrevTime = 0),
            i = i._next;
            return e.prototype.paused.apply(this, arguments)
        },
        m.usesFrames = function() {
            for (var t = this._timeline; t._timeline;) t = t._timeline;
            return t === e._rootFramesTimeline
        },
        m.rawTime = function(e) {
            return e && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime: (this._timeline.rawTime(e) - this._startTime) * this._timeScale
        },
        r
    },
    !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"],
    function(e, t, i) {
        var r = function(t) {
            e.call(this, t),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = !0 === this.vars.yoyo,
            this._dirty = !0
        },
        n = t._internals,
        s = n.lazyTweens,
        a = n.lazyRender,
        o = _gsScope._gsDefine.globals,
        l = new i(null, null, 1, 0),
        h = r.prototype = new e;
        return h.constructor = r,
        h.kill()._gc = !1,
        r.version = "1.20.3",
        h.invalidate = function() {
            return this._yoyo = !0 === this.vars.yoyo,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            e.prototype.invalidate.call(this)
        },
        h.addCallback = function(e, i, r, n) {
            return this.add(t.delayedCall(0, e, r, n), i)
        },
        h.removeCallback = function(e, t) {
            if (e) if (null == t) this._kill(null, e);
            else for (var i = this.getTweensOf(e, !1), r = i.length, n = this._parseTimeOrLabel(t); --r > -1;) i[r]._startTime === n && i[r]._enabled(!1, !1);
            return this
        },
        h.removePause = function(t) {
            return this.removeCallback(e._internals.pauseCallback, t)
        },
        h.tweenTo = function(e, i) {
            i = i || {};
            var r, n, s, a = {
                ease: l,
                useFrames: this.usesFrames(),
                immediateRender: !1
            },
            h = i.repeat && o.TweenMax || t;
            for (n in i) a[n] = i[n];
            return a.time = this._parseTimeOrLabel(e),
            r = Math.abs(Number(a.time) - this._time) / this._timeScale || .001,
            s = new h(this, r, a),
            a.onStart = function() {
                s.target.paused(!0),
                s.vars.time !== s.target.time() && r === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale),
                i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
            },
            s
        },
        h.tweenFromTo = function(e, t, i) {
            i = i || {},
            e = this._parseTimeOrLabel(e),
            i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [e],
                callbackScope: this
            },
            i.immediateRender = !1 !== i.immediateRender;
            var r = this.tweenTo(t, i);
            return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
        },
        h.render = function(e, t, i) {
            this._gc && this._enabled(!0, !1);
            var r, n, o, l, h, d, c, u, p = this._time,
            f = this._dirty ? this.totalDuration() : this._totalDuration,
            m = this._duration,
            g = this._totalTime,
            v = this._startTime,
            _ = this._timeScale,
            y = this._rawPrevTime,
            w = this._paused,
            b = this._cycle;
            if (p !== this._time && (e += this._time - p), e >= f - 1e-7 && e >= 0) this._locked || (this._totalTime = f, this._cycle = this._repeat),
            this._reversed || this._hasPausedChild() || (n = !0, l = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (e <= 0 && e >= -1e-7 || y < 0 || 1e-10 === y) && y !== e && this._first && (h = !0, y > 1e-10 && (l = "onReverseComplete"))),
            this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e: 1e-10,
            this._yoyo && 0 != (1 & this._cycle) ? this._time = e = 0 : (this._time = m, e = m + 1e-4);
            else if (e < 1e-7) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === m && 1e-10 !== y && (y > 0 || e < 0 && y >= 0) && !this._locked) && (l = "onReverseComplete", n = this._reversed), e < 0) this._active = !1,
            this._timeline.autoRemoveChildren && this._reversed ? (h = n = !0, l = "onReverseComplete") : y >= 0 && this._first && (h = !0),
            this._rawPrevTime = e;
            else {
                if (this._rawPrevTime = m || !t || e || this._rawPrevTime === e ? e: 1e-10, 0 === e && n) for (r = this._first; r && 0 === r._startTime;) r._duration || (n = !1),
                r = r._next;
                e = 0,
                this._initted || (h = !0)
            } else if (0 === m && y < 0 && (h = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (d = m + this._repeatDelay, this._cycle = this._totalTime / d >> 0, 0 !== this._cycle && this._cycle === this._totalTime / d && g <= e && this._cycle--, this._time = this._totalTime - this._cycle * d, this._yoyo && 0 != (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, e = m + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)), this._hasPause && !this._forcingPlayhead && !t) {
                if ((e = this._time) >= p || this._repeat && b !== this._cycle) for (r = this._first; r && r._startTime <= e && !c;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (c = r),
                r = r._next;
                else for (r = this._last; r && r._startTime >= e && !c;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (c = r),
                r = r._prev;
                c && c._startTime < m && (this._time = e = c._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== b && !this._locked) {
                var x = this._yoyo && 0 != (1 & b),
                T = x === (this._yoyo && 0 != (1 & this._cycle)),
                S = this._totalTime,
                C = this._cycle,
                E = this._rawPrevTime,
                P = this._time;
                if (this._totalTime = b * m, this._cycle < b ? x = !x: this._totalTime += m, this._time = p, this._rawPrevTime = 0 === m ? y - 1e-4: y, this._cycle = b, this._locked = !0, p = x ? 0 : m, this.render(p, t, 0 === m), t || this._gc || this.vars.onRepeat && (this._cycle = C, this._locked = !1, this._callback("onRepeat")), p !== this._time) return;
                if (T && (this._cycle = b, this._locked = !0, p = x ? m + 1e-4: -1e-4, this.render(p, !0, !1)), this._locked = !1, this._paused && !w) return;
                this._time = P,
                this._totalTime = S,
                this._cycle = C,
                this._rawPrevTime = E
            }
            if (this._time !== p && this._first || i || h || c) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && e > 0 && (this._active = !0), 0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || t || this._callback("onStart")), (u = this._time) >= p) for (r = this._first; r && (o = r._next, u === this._time && (!this._paused || w));)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (c === r && this.pause(), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)),
                r = o;
                else for (r = this._last; r && (o = r._prev, u === this._time && (!this._paused || w));) {
                    if (r._active || r._startTime <= p && !r._paused && !r._gc) {
                        if (c === r) {
                            for (c = r._prev; c && c.endTime() > this._time;) c.render(c._reversed ? c.totalDuration() - (e - c._startTime) * c._timeScale: (e - c._startTime) * c._timeScale, t, i),
                            c = c._prev;
                            c = null,
                            this.pause()
                        }
                        r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)
                    }
                    r = o
                }
                this._onUpdate && (t || (s.length && a(), this._callback("onUpdate"))),
                l && (this._locked || this._gc || v !== this._startTime && _ === this._timeScale || (0 === this._time || f >= this.totalDuration()) && (n && (s.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[l] && this._callback(l)))
            } else g !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate"))
        },
        h.getActive = function(e, t, i) {
            null == e && (e = !0),
            null == t && (t = !0),
            null == i && (i = !1);
            var r, n, s = [],
            a = this.getChildren(e, t, i),
            o = 0,
            l = a.length;
            for (r = 0; r < l; r++)(n = a[r]).isActive() && (s[o++] = n);
            return s
        },
        h.getLabelAfter = function(e) {
            e || 0 !== e && (e = this._time);
            var t, i = this.getLabelsArray(),
            r = i.length;
            for (t = 0; t < r; t++) if (i[t].time > e) return i[t].name;
            return null
        },
        h.getLabelBefore = function(e) {
            null == e && (e = this._time);
            for (var t = this.getLabelsArray(), i = t.length; --i > -1;) if (t[i].time < e) return t[i].name;
            return null
        },
        h.getLabelsArray = function() {
            var e, t = [],
            i = 0;
            for (e in this._labels) t[i++] = {
                time: this._labels[e],
                name: e
            };
            return t.sort(function(e, t) {
                return e.time - t.time
            }),
            t
        },
        h.invalidate = function() {
            return this._locked = !1,
            e.prototype.invalidate.call(this)
        },
        h.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - e: e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration() || 0
        },
        h.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration() || 0
        },
        h.totalDuration = function(t) {
            return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this: (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        },
        h.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 != (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
        },
        h.repeat = function(e) {
            return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
        },
        h.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
        },
        h.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e, this) : this._yoyo
        },
        h.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
        },
        r
    },
    !0),
    function() {
        var e = 180 / Math.PI,
        t = [],
        i = [],
        r = [],
        n = {},
        s = _gsScope._gsDefine.globals,
        a = function(e, t, i, r) {
            i === r && (i = r - (r - t) / 1e6),
            e === t && (t = e + (i - e) / 1e6),
            this.a = e,
            this.b = t,
            this.c = i,
            this.d = r,
            this.da = r - e,
            this.ca = i - e,
            this.ba = t - e
        },
        o = function(e, t, i, r) {
            var n = {
                a: e
            },
            s = {},
            a = {},
            o = {
                c: r
            },
            l = (e + t) / 2,
            h = (t + i) / 2,
            d = (i + r) / 2,
            c = (l + h) / 2,
            u = (h + d) / 2,
            p = (u - c) / 8;
            return n.b = l + (e - l) / 4,
            s.b = c + p,
            n.c = s.a = (n.b + s.b) / 2,
            s.c = a.a = (c + u) / 2,
            a.b = u - p,
            o.b = d + (r - d) / 4,
            a.c = o.a = (a.b + o.b) / 2,
            [n, s, a, o]
        },
        l = function(e, n, s, a, l) {
            var h, d, c, u, p, f, m, g, v, _, y, w, b, x = e.length - 1,
            T = 0,
            S = e[0].a;
            for (h = 0; h < x; h++) d = (p = e[T]).a,
            c = p.d,
            u = e[T + 1].d,
            l ? (y = t[h], b = ((w = i[h]) + y) * n * .25 / (a ? .5 : r[h] || .5), g = c - ((f = c - (c - d) * (a ? .5 * n: 0 !== y ? b / y: 0)) + (((m = c + (u - c) * (a ? .5 * n: 0 !== w ? b / w: 0)) - f) * (3 * y / (y + w) + .5) / 4 || 0))) : g = c - ((f = c - (c - d) * n * .5) + (m = c + (u - c) * n * .5)) / 2,
            f += g,
            m += g,
            p.c = v = f,
            p.b = 0 !== h ? S: S = p.a + .6 * (p.c - p.a),
            p.da = c - d,
            p.ca = v - d,
            p.ba = S - d,
            s ? (_ = o(d, S, v, c), e.splice(T, 1, _[0], _[1], _[2], _[3]), T += 4) : T++,
            S = m; (p = e[T]).b = S,
            p.c = S + .4 * (p.d - S),
            p.da = p.d - p.a,
            p.ca = p.c - p.a,
            p.ba = S - p.a,
            s && (_ = o(p.a, S, p.c, p.d), e.splice(T, 1, _[0], _[1], _[2], _[3]))
        },
        h = function(e, r, n, s) {
            var o, l, h, d, c, u, p = [];
            if (s) for (l = (e = [s].concat(e)).length; --l > -1;)"string" == typeof(u = e[l][r]) && "=" === u.charAt(1) && (e[l][r] = s[r] + Number(u.charAt(0) + u.substr(2)));
            if ((o = e.length - 2) < 0) return p[0] = new a(e[0][r], 0, 0, e[0][r]),
            p;
            for (l = 0; l < o; l++) h = e[l][r],
            d = e[l + 1][r],
            p[l] = new a(h, 0, 0, d),
            n && (c = e[l + 2][r], t[l] = (t[l] || 0) + (d - h) * (d - h), i[l] = (i[l] || 0) + (c - d) * (c - d));
            return p[l] = new a(e[l][r], 0, 0, e[l + 1][r]),
            p
        },
        d = function(e, s, a, o, d, c) {
            var u, p, f, m, g, v, _, y, w = {},
            b = [],
            x = c || e[0];
            d = "string" == typeof d ? "," + d + ",": ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            null == s && (s = 1);
            for (p in e[0]) b.push(p);
            if (e.length > 1) {
                for (y = e[e.length - 1], _ = !0, u = b.length; --u > -1;) if (p = b[u], Math.abs(x[p] - y[p]) > .05) {
                    _ = !1;
                    break
                }
                _ && (e = e.concat(), c && e.unshift(c), e.push(e[1]), c = e[e.length - 3])
            }
            for (t.length = i.length = r.length = 0, u = b.length; --u > -1;) p = b[u],
            n[p] = -1 !== d.indexOf("," + p + ","),
            w[p] = h(e, p, n[p], c);
            for (u = t.length; --u > -1;) t[u] = Math.sqrt(t[u]),
            i[u] = Math.sqrt(i[u]);
            if (!o) {
                for (u = b.length; --u > -1;) if (n[p]) for (v = (f = w[b[u]]).length - 1, m = 0; m < v; m++) g = f[m + 1].da / i[m] + f[m].da / t[m] || 0,
                r[m] = (r[m] || 0) + g * g;
                for (u = r.length; --u > -1;) r[u] = Math.sqrt(r[u])
            }
            for (u = b.length, m = a ? 4 : 1; --u > -1;) f = w[p = b[u]],
            l(f, s, a, o, n[p]),
            _ && (f.splice(0, m), f.splice(f.length - m, m));
            return w
        },
        c = function(e, t, i) {
            for (var r, n, s, a, o, l, h, d, c, u, p, f = 1 / i,
            m = e.length; --m > -1;) for (s = (u = e[m]).a, a = u.d - s, o = u.c - s, l = u.b - s, r = n = 0, d = 1; d <= i; d++) r = n - (n = ((h = f * d) * h * a + 3 * (c = 1 - h) * (h * o + c * l)) * h),
            t[p = m * i + d - 1] = (t[p] || 0) + r * r
        },
        u = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.8",
            API: 2,
            global: !0,
            init: function(e, t, i) {
                this._target = e,
                t instanceof Array && (t = {
                    values: t
                }),
                this._func = {},
                this._mod = {},
                this._props = [],
                this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                var r, n, s, o, l, h = t.values || [],
                u = {},
                p = h[0],
                f = t.autoRotate || i.vars.orientToBezier;
                this._autoRotate = f ? f instanceof Array ? f: [["x", "y", "rotation", !0 === f ? 0 : Number(f) || 0]] : null;
                for (r in p) this._props.push(r);
                for (s = this._props.length; --s > -1;) r = this._props[s],
                this._overwriteProps.push(r),
                n = this._func[r] = "function" == typeof e[r],
                u[r] = n ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r: "get" + r.substr(3)]() : parseFloat(e[r]),
                l || u[r] !== h[0][r] && (l = u);
                if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? d(h, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, l) : function(e, t, i) {
                    var r, n, s, o, l, h, d, c, u, p, f, m = {},
                    g = "cubic" === (t = t || "soft") ? 3 : 2,
                    v = "soft" === t,
                    _ = [];
                    if (v && i && (e = [i].concat(e)), null == e || e.length < g + 1) throw "invalid Bezier data";
                    for (u in e[0]) _.push(u);
                    for (h = _.length; --h > -1;) {
                        for (m[u = _[h]] = l = [], p = 0, c = e.length, d = 0; d < c; d++) r = null == i ? e[d][u] : "string" == typeof(f = e[d][u]) && "=" === f.charAt(1) ? i[u] + Number(f.charAt(0) + f.substr(2)) : Number(f),
                        v && d > 1 && d < c - 1 && (l[p++] = (r + l[p - 2]) / 2),
                        l[p++] = r;
                        for (c = p - g + 1, p = 0, d = 0; d < c; d += g) r = l[d],
                        n = l[d + 1],
                        s = l[d + 2],
                        o = 2 === g ? 0 : l[d + 3],
                        l[p++] = f = 3 === g ? new a(r, n, s, o) : new a(r, (2 * n + r) / 3, (2 * n + s) / 3, s);
                        l.length = p
                    }
                    return m
                } (h, t.type, u), this._segCount = this._beziers[r].length, this._timeRes) {
                    var m = function(e, t) {
                        var i, r, n, s, a = [],
                        o = [],
                        l = 0,
                        h = 0,
                        d = (t = t >> 0 || 6) - 1,
                        u = [],
                        p = [];
                        for (i in e) c(e[i], a, t);
                        for (n = a.length, r = 0; r < n; r++) l += Math.sqrt(a[r]),
                        p[s = r % t] = l,
                        s === d && (h += l, u[s = r / t >> 0] = p, o[s] = h, l = 0, p = []);
                        return {
                            length: h,
                            lengths: o,
                            segments: u
                        }
                    } (this._beziers, this._timeRes);
                    this._length = m.length,
                    this._lengths = m.lengths,
                    this._segments = m.segments,
                    this._l1 = this._li = this._s1 = this._si = 0,
                    this._l2 = this._lengths[0],
                    this._curSeg = this._segments[0],
                    this._s2 = this._curSeg[0],
                    this._prec = 1 / this._curSeg.length
                }
                if (f = this._autoRotate) for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), s = f.length; --s > -1;) {
                    for (o = 0; o < 3; o++) r = f[s][o],
                    this._func[r] = "function" == typeof e[r] && e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r: "get" + r.substr(3)];
                    r = f[s][2],
                    this._initialRotations[s] = (this._func[r] ? this._func[r].call(this._target) : this._target[r]) || 0,
                    this._overwriteProps.push(r)
                }
                return this._startRatio = i.vars.runBackwards ? 1 : 0,
                !0
            },
            set: function(t) {
                var i, r, n, s, a, o, l, h, d, c, u = this._segCount,
                p = this._func,
                f = this._target,
                m = t !== this._startRatio;
                if (this._timeRes) {
                    if (d = this._lengths, c = this._curSeg, t *= this._length, n = this._li, t > this._l2 && n < u - 1) {
                        for (h = u - 1; n < h && (this._l2 = d[++n]) <= t;);
                        this._l1 = d[n - 1],
                        this._li = n,
                        this._curSeg = c = this._segments[n],
                        this._s2 = c[this._s1 = this._si = 0]
                    } else if (t < this._l1 && n > 0) {
                        for (; n > 0 && (this._l1 = d[--n]) >= t;);
                        0 === n && t < this._l1 ? this._l1 = 0 : n++,
                        this._l2 = d[n],
                        this._li = n,
                        this._curSeg = c = this._segments[n],
                        this._s1 = c[(this._si = c.length - 1) - 1] || 0,
                        this._s2 = c[this._si]
                    }
                    if (i = n, t -= this._l1, n = this._si, t > this._s2 && n < c.length - 1) {
                        for (h = c.length - 1; n < h && (this._s2 = c[++n]) <= t;);
                        this._s1 = c[n - 1],
                        this._si = n
                    } else if (t < this._s1 && n > 0) {
                        for (; n > 0 && (this._s1 = c[--n]) >= t;);
                        0 === n && t < this._s1 ? this._s1 = 0 : n++,
                        this._s2 = c[n],
                        this._si = n
                    }
                    o = (n + (t - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                } else o = (t - (i = t < 0 ? 0 : t >= 1 ? u - 1 : u * t >> 0) * (1 / u)) * u;
                for (r = 1 - o, n = this._props.length; --n > -1;) s = this._props[n],
                l = (o * o * (a = this._beziers[s][i]).da + 3 * r * (o * a.ca + r * a.ba)) * o + a.a,
                this._mod[s] && (l = this._mod[s](l, f)),
                p[s] ? f[s](l) : f[s] = l;
                if (this._autoRotate) {
                    var g, v, _, y, w, b, x, T = this._autoRotate;
                    for (n = T.length; --n > -1;) s = T[n][2],
                    b = T[n][3] || 0,
                    x = !0 === T[n][4] ? 1 : e,
                    a = this._beziers[T[n][0]],
                    g = this._beziers[T[n][1]],
                    a && g && (a = a[i], g = g[i], v = a.a + (a.b - a.a) * o, v += ((y = a.b + (a.c - a.b) * o) - v) * o, y += (a.c + (a.d - a.c) * o - y) * o, _ = g.a + (g.b - g.a) * o, _ += ((w = g.b + (g.c - g.b) * o) - _) * o, w += (g.c + (g.d - g.c) * o - w) * o, l = m ? Math.atan2(w - _, y - v) * x + b: this._initialRotations[n], this._mod[s] && (l = this._mod[s](l, f)), p[s] ? f[s](l) : f[s] = l)
                }
            }
        }),
        p = u.prototype;
        u.bezierThrough = d,
        u.cubicToQuadratic = o,
        u._autoCSS = !0,
        u.quadraticToCubic = function(e, t, i) {
            return new a(e, (2 * t + e) / 3, (2 * t + i) / 3, i)
        },
        u._cssRegister = function() {
            var e = s.CSSPlugin;
            if (e) {
                var t = e._internals,
                i = t._parseToProxy,
                r = t._setPluginRatio,
                n = t.CSSPropTween;
                t._registerComplexSpecialProp("bezier", {
                    parser: function(e, t, s, a, o, l) {
                        t instanceof Array && (t = {
                            values: t
                        }),
                        l = new u;
                        var h, d, c, p = t.values,
                        f = p.length - 1,
                        m = [],
                        g = {};
                        if (f < 0) return o;
                        for (h = 0; h <= f; h++) c = i(e, p[h], a, o, l, f !== h),
                        m[h] = c.end;
                        for (d in t) g[d] = t[d];
                        return g.values = m,
                        o = new n(e, "bezier", 0, 0, c.pt, 2),
                        o.data = c,
                        o.plugin = l,
                        o.setRatio = r,
                        0 === g.autoRotate && (g.autoRotate = !0),
                        !g.autoRotate || g.autoRotate instanceof Array || (h = !0 === g.autoRotate ? 0 : Number(g.autoRotate), g.autoRotate = null != c.end.left ? [["left", "top", "rotation", h, !1]] : null != c.end.x && [["x", "y", "rotation", h, !1]]),
                        g.autoRotate && (a._transform || a._enableTransforms(!1), c.autoRotate = a._target._gsTransform, c.proxy.rotation = c.autoRotate.rotation || 0, a._overwriteProps.push("rotation")),
                        l._onInitTween(c.proxy, g, a._tween),
                        o
                    }
                })
            }
        },
        p._mod = function(e) {
            for (var t, i = this._overwriteProps,
            r = i.length; --r > -1;)(t = e[i[r]]) && "function" == typeof t && (this._mod[i[r]] = t)
        },
        p._kill = function(e) {
            var t, i, r = this._props;
            for (t in this._beziers) if (t in e) for (delete this._beziers[t], delete this._func[t], i = r.length; --i > -1;) r[i] === t && r.splice(i, 1);
            if (r = this._autoRotate) for (i = r.length; --i > -1;) e[r[i][2]] && r.splice(i, 1);
            return this._super._kill.call(this, e)
        }
    } (),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"],
    function(e, t) {
        var i, r, n, s, a = function() {
            e.call(this, "css"),
            this._overwriteProps.length = 0,
            this.setRatio = a.prototype.setRatio
        },
        o = _gsScope._gsDefine.globals,
        l = {},
        h = a.prototype = new e("css");
        h.constructor = a,
        a.version = "1.20.3",
        a.API = 2,
        a.defaultTransformPerspective = 0,
        a.defaultSkewType = "compensated",
        a.defaultSmoothOrigin = !0,
        h = "px",
        a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: ""
        };
        var d, c, u, p, f, m, g, v, _ = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
        y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        w = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        x = /(?:\d|\-|\+|=|#|\.)*/g,
        T = /opacity *= *([^)]*)/i,
        S = /opacity:([^;]*)/i,
        C = /alpha\(opacity *=.+?\)/i,
        E = /^(rgb|hsl)/,
        P = /([A-Z])/g,
        k = /-([a-z])/gi,
        M = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        O = function(e, t) {
            return t.toUpperCase()
        },
        z = /(?:Left|Right|Width)/i,
        A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        L = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        D = /,(?=[^\)]*(?:\(|$))/gi,
        R = /[\s,\(]/i,
        I = Math.PI / 180,
        X = 180 / Math.PI,
        N = {},
        $ = {
            style: {}
        },
        F = _gsScope.document || {
            createElement: function() {
                return $
            }
        },
        B = function(e, t) {
            return F.createElementNS ? F.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : F.createElement(e)
        },
        Y = B("div"),
        H = B("img"),
        G = a._internals = {
            _specialProps: l
        },
        j = (_gsScope.navigator || {}).userAgent || "",
        V = function() {
            var e = j.indexOf("Android"),
            t = B("a");
            return u = -1 !== j.indexOf("Safari") && -1 === j.indexOf("Chrome") && ( - 1 === e || parseFloat(j.substr(e + 8, 2)) > 3),
            f = u && parseFloat(j.substr(j.indexOf("Version/") + 8, 2)) < 6,
            p = -1 !== j.indexOf("Firefox"),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(j) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(j)) && (m = parseFloat(RegExp.$1)),
            !!t && (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity))
        } (),
        q = function(e) {
            return T.test("string" == typeof e ? e: (e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        },
        W = function(e) {
            _gsScope.console && console.log(e)
        },
        U = "",
        K = "",
        Z = function(e, t) {
            var i, r, n = (t = t || Y).style;
            if (void 0 !== n[e]) return e;
            for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === n[i[r] + e];);
            return r >= 0 ? (K = 3 === r ? "ms": i[r], U = "-" + K.toLowerCase() + "-", K + e) : null
        },
        Q = F.defaultView ? F.defaultView.getComputedStyle: function() {},
        J = a.getStyle = function(e, t, i, r, n) {
            var s;
            return V || "opacity" !== t ? (!r && e.style[t] ? s = e.style[t] : (i = i || Q(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(P, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == n || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s: n) : q(e)
        },
        ee = G.convertToPixels = function(e, i, r, n, s) {
            if ("px" === n || !n && "lineHeight" !== i) return r;
            if ("auto" === n || !r) return 0;
            var o, l, h, d = z.test(i),
            c = e,
            u = Y.style,
            p = r < 0,
            f = 1 === r;
            if (p && (r = -r), f && (r *= 100), "lineHeight" !== i || n) if ("%" === n && -1 !== i.indexOf("border")) o = r / 100 * (d ? e.clientWidth: e.clientHeight);
            else {
                if (u.cssText = "border:0 solid red;position:" + J(e, "position") + ";line-height:0;", "%" !== n && c.appendChild && "v" !== n.charAt(0) && "rem" !== n) u[d ? "borderLeftWidth": "borderTopWidth"] = r + n;
                else {
                    if (c = e.parentNode || F.body, -1 !== J(c, "display").indexOf("flex") && (u.position = "absolute"), l = c._gsCache, h = t.ticker.frame, l && d && l.time === h) return l.width * r / 100;
                    u[d ? "width": "height"] = r + n
                }
                c.appendChild(Y),
                o = parseFloat(Y[d ? "offsetWidth": "offsetHeight"]),
                c.removeChild(Y),
                d && "%" === n && !1 !== a.cacheWidths && ((l = c._gsCache = c._gsCache || {}).time = h, l.width = o / r * 100),
                0 !== o || s || (o = ee(e, i, r, n, !0))
            } else l = Q(e).lineHeight,
            e.style.lineHeight = r,
            o = parseFloat(Q(e).lineHeight),
            e.style.lineHeight = l;
            return f && (o /= 100),
            p ? -o: o
        },
        te = G.calculateOffset = function(e, t, i) {
            if ("absolute" !== J(e, "position", i)) return 0;
            var r = "left" === t ? "Left": "Top",
            n = J(e, "margin" + r, i);
            return e["offset" + r] - (ee(e, t, parseFloat(n), n.replace(x, "")) || 0)
        },
        ie = function(e, t) {
            var i, r, n, s = {};
            if (t = t || Q(e, null)) if (i = t.length) for (; --i > -1;) - 1 !== (n = t[i]).indexOf("-transform") && Me !== n || (s[n.replace(k, O)] = t.getPropertyValue(n));
            else for (i in t) - 1 !== i.indexOf("Transform") && ke !== i || (s[i] = t[i]);
            else if (t = e.currentStyle || e.style) for (i in t)"string" == typeof i && void 0 === s[i] && (s[i.replace(k, O)] = t[i]);
            return V || (s.opacity = q(e)),
            r = Ye(e, t, !1),
            s.rotation = r.rotation,
            s.skewX = r.skewX,
            s.scaleX = r.scaleX,
            s.scaleY = r.scaleY,
            s.x = r.x,
            s.y = r.y,
            ze && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ),
            s.filters && delete s.filters,
            s
        },
        re = function(e, t, i, r, n) {
            var s, a, o, l = {},
            h = e.style;
            for (a in i)"cssText" !== a && "length" !== a && isNaN(a) && (t[a] !== (s = i[a]) || n && n[a]) && -1 === a.indexOf("Origin") && ("number" != typeof s && "string" != typeof s || (l[a] = "auto" !== s || "left" !== a && "top" !== a ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[a] || "" === t[a].replace(b, "") ? s: 0 : te(e, a), void 0 !== h[a] && (o = new _e(h, a, h[a], o))));
            if (r) for (a in r)"className" !== a && (l[a] = r[a]);
            return {
                difs: l,
                firstMPT: o
            }
        },
        ne = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        },
        se = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        ae = function(e, t, i) {
            if ("svg" === (e.nodeName + "").toLowerCase()) return (i || Q(e))[t] || 0;
            if (e.getCTM && $e(e)) return e.getBBox()[t] || 0;
            var r = parseFloat("width" === t ? e.offsetWidth: e.offsetHeight),
            n = ne[t],
            s = n.length;
            for (i = i || Q(e, null); --s > -1;) r -= parseFloat(J(e, "padding" + n[s], i, !0)) || 0,
            r -= parseFloat(J(e, "border" + n[s] + "Width", i, !0)) || 0;
            return r
        },
        oe = function(e, t) {
            if ("contain" === e || "auto" === e || "auto auto" === e) return e + " ";
            null != e && "" !== e || (e = "0 0");
            var i, r = e.split(" "),
            n = -1 !== e.indexOf("left") ? "0%": -1 !== e.indexOf("right") ? "100%": r[0],
            s = -1 !== e.indexOf("top") ? "0%": -1 !== e.indexOf("bottom") ? "100%": r[1];
            if (r.length > 3 && !t) {
                for (r = e.split(", ").join(",").split(","), e = [], i = 0; i < r.length; i++) e.push(oe(r[i]));
                return e.join(",")
            }
            return null == s ? s = "center" === n ? "50%": "0": "center" === s && (s = "50%"),
            ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"),
            e = n + " " + s + (r.length > 2 ? " " + r[2] : ""),
            t && (t.oxp = -1 !== n.indexOf("%"), t.oyp = -1 !== s.indexOf("%"), t.oxr = "=" === n.charAt(1), t.oyr = "=" === s.charAt(1), t.ox = parseFloat(n.replace(b, "")), t.oy = parseFloat(s.replace(b, "")), t.v = e),
            t || e
        },
        le = function(e, t) {
            return "function" == typeof e && (e = e(v, g)),
            "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t) || 0
        },
        he = function(e, t) {
            return "function" == typeof e && (e = e(v, g)),
            null == e ? t: "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t: parseFloat(e) || 0
        },
        de = function(e, t, i, r) {
            var n, s, a, o, l;
            return "function" == typeof e && (e = e(v, g)),
            null == e ? o = t: "number" == typeof e ? o = e: (n = 360, s = e.split("_"), a = ((l = "=" === e.charAt(1)) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * ( - 1 === e.indexOf("rad") ? 1 : X) - (l ? 0 : t), s.length && (r && (r[i] = t + a), -1 !== e.indexOf("short") && (a %= n) !== a % (n / 2) && (a = a < 0 ? a + n: a - n), -1 !== e.indexOf("_cw") && a < 0 ? a = (a + 9999999999 * n) % n - (a / n | 0) * n: -1 !== e.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * n) % n - (a / n | 0) * n)), o = t + a),
            o < 1e-6 && o > -1e-6 && (o = 0),
            o
        },
        ce = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        },
        ue = function(e, t, i) {
            return 255 * (6 * (e = e < 0 ? e + 1 : e > 1 ? e - 1 : e) < 1 ? t + (i - t) * e * 6 : e < .5 ? i: 3 * e < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
        },
        pe = a.parseColor = function(e, t) {
            var i, r, n, s, a, o, l, h, d, c, u;
            if (e) if ("number" == typeof e) i = [e >> 16, e >> 8 & 255, 255 & e];
            else {
                if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), ce[e]) i = ce[e];
                else if ("#" === e.charAt(0)) 4 === e.length && (e = "#" + (r = e.charAt(1)) + r + (n = e.charAt(2)) + n + (s = e.charAt(3)) + s),
                i = [(e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & 255, 255 & e];
                else if ("hsl" === e.substr(0, 3)) if (i = u = e.match(_), t) {
                    if ( - 1 !== e.indexOf("=")) return e.match(y)
                } else a = Number(i[0]) % 360 / 360,
                o = Number(i[1]) / 100,
                r = 2 * (l = Number(i[2]) / 100) - (n = l <= .5 ? l * (o + 1) : l + o - l * o),
                i.length > 3 && (i[3] = Number(i[3])),
                i[0] = ue(a + 1 / 3, r, n),
                i[1] = ue(a, r, n),
                i[2] = ue(a - 1 / 3, r, n);
                else i = e.match(_) || ce.transparent;
                i[0] = Number(i[0]),
                i[1] = Number(i[1]),
                i[2] = Number(i[2]),
                i.length > 3 && (i[3] = Number(i[3]))
            } else i = ce.black;
            return t && !u && (r = i[0] / 255, n = i[1] / 255, s = i[2] / 255, l = ((h = Math.max(r, n, s)) + (d = Math.min(r, n, s))) / 2, h === d ? a = o = 0 : (c = h - d, o = l > .5 ? c / (2 - h - d) : c / (h + d), a = h === r ? (n - s) / c + (n < s ? 6 : 0) : h === n ? (s - r) / c + 2 : (r - n) / c + 4, a *= 60), i[0] = a + .5 | 0, i[1] = 100 * o + .5 | 0, i[2] = 100 * l + .5 | 0),
            i
        },
        fe = function(e, t) {
            var i, r, n, s = e.match(me) || [],
            a = 0,
            o = "";
            if (!s.length) return e;
            for (i = 0; i < s.length; i++) r = s[i],
            a += (n = e.substr(a, e.indexOf(r, a) - a)).length + r.length,
            3 === (r = pe(r, t)).length && r.push(1),
            o += n + (t ? "hsla(" + r[0] + "," + r[1] + "%," + r[2] + "%," + r[3] : "rgba(" + r.join(",")) + ")";
            return o + e.substr(a)
        },
        me = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (h in ce) me += "|" + h + "\\b";
        me = new RegExp(me + ")", "gi"),
        a.colorStringFilter = function(e) {
            var t, i = e[0] + " " + e[1];
            me.test(i) && (t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), e[0] = fe(e[0], t), e[1] = fe(e[1], t)),
            me.lastIndex = 0
        },
        t.defaultStringFilter || (t.defaultStringFilter = a.colorStringFilter);
        var ge = function(e, t, i, r) {
            if (null == e) return function(e) {
                return e
            };
            var n, s = t ? (e.match(me) || [""])[0] : "",
            a = e.split(s).join("").match(w) || [],
            o = e.substr(0, e.indexOf(a[0])),
            l = ")" === e.charAt(e.length - 1) ? ")": "",
            h = -1 !== e.indexOf(" ") ? " ": ",",
            d = a.length,
            c = d > 0 ? a[0].replace(_, "") : "";
            return d ? n = t ?
            function(e) {
                var t, u, p, f;
                if ("number" == typeof e) e += c;
                else if (r && D.test(e)) {
                    for (f = e.replace(D, "|").split("|"), p = 0; p < f.length; p++) f[p] = n(f[p]);
                    return f.join(",")
                }
                if (t = (e.match(me) || [s])[0], u = e.split(t).join("").match(w) || [], p = u.length, d > p--) for (; ++p < d;) u[p] = i ? u[(p - 1) / 2 | 0] : a[p];
                return o + u.join(h) + h + t + l + ( - 1 !== e.indexOf("inset") ? " inset": "")
            }: function(e) {
                var t, s, u;
                if ("number" == typeof e) e += c;
                else if (r && D.test(e)) {
                    for (s = e.replace(D, "|").split("|"), u = 0; u < s.length; u++) s[u] = n(s[u]);
                    return s.join(",")
                }
                if (t = e.match(w) || [], u = t.length, d > u--) for (; ++u < d;) t[u] = i ? t[(u - 1) / 2 | 0] : a[u];
                return o + t.join(h) + l
            }: function(e) {
                return e
            }
        },
        ve = function(e) {
            return e = e.split(","),
            function(t, i, r, n, s, a, o) {
                var l, h = (i + "").split(" ");
                for (o = {},
                l = 0; l < 4; l++) o[e[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                return n.parse(t, o, s, a)
            }
        },
        _e = (G._setPluginRatio = function(e) {
            this.plugin.setRatio(e);
            for (var t, i, r, n, s, a = this.data,
            o = a.proxy,
            l = a.firstMPT; l;) t = o[l.v],
            l.r ? t = Math.round(t) : t < 1e-6 && t > -1e-6 && (t = 0),
            l.t[l.p] = t,
            l = l._next;
            if (a.autoRotate && (a.autoRotate.rotation = a.mod ? a.mod(o.rotation, this.t) : o.rotation), 1 === e || 0 === e) for (l = a.firstMPT, s = 1 === e ? "e": "b"; l;) {
                if ((i = l.t).type) {
                    if (1 === i.type) {
                        for (n = i.xs0 + i.s + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                        i[s] = n
                    }
                } else i[s] = i.s + i.xs0;
                l = l._next
            }
        },
        function(e, t, i, r, n) {
            this.t = e,
            this.p = t,
            this.v = i,
            this.r = n,
            r && (r._prev = this, this._next = r)
        }),
        ye = (G._parseToProxy = function(e, t, i, r, n, s) {
            var a, o, l, h, d, c = r,
            u = {},
            p = {},
            f = i._transform,
            m = N;
            for (i._transform = null, N = t, r = d = i.parse(e, t, r, n), N = m, s && (i._transform = f, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
                if (r.type <= 1 && (o = r.p, p[o] = r.s + r.c, u[o] = r.s, s || (h = new _e(r, "s", o, h, r.r), r.c = 0), 1 === r.type)) for (a = r.l; --a > 0;) l = "xn" + a,
                p[o = r.p + "_" + l] = r.data[l],
                u[o] = r[l],
                s || (h = new _e(r, l, o, h, r.rxp[l]));
                r = r._next
            }
            return {
                proxy: u,
                end: p,
                firstMPT: h,
                pt: d
            }
        },
        G.CSSPropTween = function(e, t, r, n, a, o, l, h, d, c, u) {
            this.t = e,
            this.p = t,
            this.s = r,
            this.c = n,
            this.n = l || t,
            e instanceof ye || s.push(this.n),
            this.r = h,
            this.type = o || 0,
            d && (this.pr = d, i = !0),
            this.b = void 0 === c ? r: c,
            this.e = void 0 === u ? r + n: u,
            a && (this._next = a, a._prev = this)
        }),
        we = function(e, t, i, r, n, s) {
            var a = new ye(e, t, i, r - i, n, -1, s);
            return a.b = i,
            a.e = a.xs0 = r,
            a
        },
        be = a.parseComplex = function(e, t, i, r, n, s, o, l, h, c) {
            i = i || s || "",
            "function" == typeof r && (r = r(v, g)),
            o = new ye(e, t, 0, 0, o, c ? 2 : 1, null, !1, l, i, r),
            r += "",
            n && me.test(r + i) && (r = [i, r], a.colorStringFilter(r), i = r[0], r = r[1]);
            var u, p, f, m, w, b, x, T, S, C, E, P, k, M = i.split(", ").join(",").split(" "),
            O = r.split(", ").join(",").split(" "),
            z = M.length,
            A = !1 !== d;
            for ( - 1 === r.indexOf(",") && -1 === i.indexOf(",") || ( - 1 !== (r + i).indexOf("rgb") || -1 !== (r + i).indexOf("hsl") ? (M = M.join(" ").replace(D, ", ").split(" "), O = O.join(" ").replace(D, ", ").split(" ")) : (M = M.join(" ").split(",").join(", ").split(" "), O = O.join(" ").split(",").join(", ").split(" ")), z = M.length), z !== O.length && (z = (M = (s || "").split(" ")).length), o.plugin = h, o.setRatio = c, me.lastIndex = 0, u = 0; u < z; u++) if (m = M[u], w = O[u], (T = parseFloat(m)) || 0 === T) o.appendXtra("", T, le(w, T), w.replace(y, ""), A && -1 !== w.indexOf("px"), !0);
            else if (n && me.test(m)) P = ")" + ((P = w.indexOf(")") + 1) ? w.substr(P) : ""),
            k = -1 !== w.indexOf("hsl") && V,
            C = w,
            m = pe(m, k),
            w = pe(w, k),
            (S = m.length + w.length > 6) && !V && 0 === w[3] ? (o["xs" + o.l] += o.l ? " transparent": "transparent", o.e = o.e.split(O[u]).join("transparent")) : (V || (S = !1), k ? o.appendXtra(C.substr(0, C.indexOf("hsl")) + (S ? "hsla(": "hsl("), m[0], le(w[0], m[0]), ",", !1, !0).appendXtra("", m[1], le(w[1], m[1]), "%,", !1).appendXtra("", m[2], le(w[2], m[2]), S ? "%,": "%" + P, !1) : o.appendXtra(C.substr(0, C.indexOf("rgb")) + (S ? "rgba(": "rgb("), m[0], w[0] - m[0], ",", !0, !0).appendXtra("", m[1], w[1] - m[1], ",", !0).appendXtra("", m[2], w[2] - m[2], S ? ",": P, !0), S && (m = m.length < 4 ? 1 : m[3], o.appendXtra("", m, (w.length < 4 ? 1 : w[3]) - m, P, !1))),
            me.lastIndex = 0;
            else if (b = m.match(_)) {
                if (! (x = w.match(y)) || x.length !== b.length) return o;
                for (f = 0, p = 0; p < b.length; p++) E = b[p],
                C = m.indexOf(E, f),
                o.appendXtra(m.substr(f, C - f), Number(E), le(x[p], E), "", A && "px" === m.substr(C + E.length, 2), 0 === p),
                f = C + E.length;
                o["xs" + o.l] += m.substr(f)
            } else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + w: w;
            if ( - 1 !== r.indexOf("=") && o.data) {
                for (P = o.xs0 + o.data.s, u = 1; u < o.l; u++) P += o["xs" + u] + o.data["xn" + u];
                o.e = P + o["xs" + u]
            }
            return o.l || (o.type = -1, o.xs0 = o.e),
            o.xfirst || o
        },
        xe = 9;
        for ((h = ye.prototype).l = h.pr = 0; --xe > 0;) h["xn" + xe] = 0,
        h["xs" + xe] = "";
        h.xs0 = "",
        h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null,
        h.appendXtra = function(e, t, i, r, n, s) {
            var a = this,
            o = a.l;
            return a["xs" + o] += s && (o || a["xs" + o]) ? " " + e: e || "",
            i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = r || "", o > 0 ? (a.data["xn" + o] = t + i, a.rxp["xn" + o] = n, a["xn" + o] = t, a.plugin || (a.xfirst = new ye(a, "xn" + o, t, i, a.xfirst || a, 0, a.n, n, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                s: t + i
            },
            a.rxp = {},
            a.s = t, a.c = i, a.r = n, a)) : (a["xs" + o] += t + (r || ""), a)
        };
        var Te = function(e, t) {
            t = t || {},
            this.p = t.prefix ? Z(e) || e: e,
            l[e] = l[this.p] = this,
            this.format = t.formatter || ge(t.defaultValue, t.color, t.collapsible, t.multi),
            t.parser && (this.parse = t.parser),
            this.clrs = t.color,
            this.multi = t.multi,
            this.keyword = t.keyword,
            this.dflt = t.defaultValue,
            this.pr = t.priority || 0
        },
        Se = G._registerComplexSpecialProp = function(e, t, i) {
            "object" != typeof t && (t = {
                parser: i
            });
            var r, n = e.split(","),
            s = t.defaultValue;
            for (i = i || [s], r = 0; r < n.length; r++) t.prefix = 0 === r && t.prefix,
            t.defaultValue = i[r] || s,
            new Te(n[r], t)
        },
        Ce = G._registerPluginProp = function(e) {
            if (!l[e]) {
                var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                Se(e, {
                    parser: function(e, i, r, n, s, a, h) {
                        var d = o.com.greensock.plugins[t];
                        return d ? (d._cssRegister(), l[r].parse(e, i, r, n, s, a, h)) : (W("Error: " + t + " js file not loaded."), s)
                    }
                })
            }
        }; (h = Te.prototype).parseComplex = function(e, t, i, r, n, s) {
            var a, o, l, h, d, c, u = this.keyword;
            if (this.multi && (D.test(i) || D.test(t) ? (o = t.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : u && (o = [t], l = [i])), l) {
                for (h = l.length > o.length ? l.length: o.length, a = 0; a < h; a++) t = o[a] = o[a] || this.dflt,
                i = l[a] = l[a] || this.dflt,
                u && (d = t.indexOf(u)) !== (c = i.indexOf(u)) && ( - 1 === c ? o[a] = o[a].split(u).join("") : -1 === d && (o[a] += " " + u));
                t = o.join(", "),
                i = l.join(", ")
            }
            return be(e, this.p, t, i, this.clrs, this.dflt, r, this.pr, n, s)
        },
        h.parse = function(e, t, i, r, s, a, o) {
            return this.parseComplex(e.style, this.format(J(e, this.p, n, !1, this.dflt)), this.format(t), s, a)
        },
        a.registerSpecialProp = function(e, t, i) {
            Se(e, {
                parser: function(e, r, n, s, a, o, l) {
                    var h = new ye(e, n, 0, 0, a, 2, n, !1, i);
                    return h.plugin = o,
                    h.setRatio = t(e, r, s._tween, n),
                    h
                },
                priority: i
            })
        },
        a.useSVGTransformAttr = !0;
        var Ee, Pe = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
        ke = Z("transform"),
        Me = U + "transform",
        Oe = Z("transformOrigin"),
        ze = null !== Z("perspective"),
        Ae = G.Transform = function() {
            this.perspective = parseFloat(a.defaultTransformPerspective) || 0,
            this.force3D = !(!1 === a.defaultForce3D || !ze) && (a.defaultForce3D || "auto")
        },
        Le = _gsScope.SVGElement,
        De = function(e, t, i) {
            var r, n = F.createElementNS("http://www.w3.org/2000/svg", e),
            s = /([a-z])([A-Z])/g;
            for (r in i) n.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), i[r]);
            return t.appendChild(n),
            n
        },
        Re = F.documentElement || {},
        Ie = function() {
            var e, t, i, r = m || /Android/i.test(j) && !_gsScope.chrome;
            return F.createElementNS && !r && (e = De("svg", Re), i = (t = De("rect", e, {
                width: 100,
                height: 50,
                x: 100
            })).getBoundingClientRect().width, t.style[Oe] = "50% 50%", t.style[ke] = "scaleX(0.5)", r = i === t.getBoundingClientRect().width && !(p && ze), Re.removeChild(e)),
            r
        } (),
        Xe = function(e, t, i, r, n, s) {
            var o, l, h, d, c, u, p, f, m, g, v, _, y, w, b = e._gsTransform,
            x = Be(e, !0);
            b && (y = b.xOrigin, w = b.yOrigin),
            (!r || (o = r.split(" ")).length < 2) && (0 === (p = e.getBBox()).x && 0 === p.y && p.width + p.height === 0 && (p = {
                x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
                y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
                width: 0,
                height: 0
            }), o = [( - 1 !== (t = oe(t).split(" "))[0].indexOf("%") ? parseFloat(t[0]) / 100 * p.width: parseFloat(t[0])) + p.x, ( - 1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * p.height: parseFloat(t[1])) + p.y]),
            i.xOrigin = d = parseFloat(o[0]),
            i.yOrigin = c = parseFloat(o[1]),
            r && x !== Fe && (u = x[0], p = x[1], f = x[2], m = x[3], g = x[4], v = x[5], (_ = u * m - p * f) && (l = d * (m / _) + c * ( - f / _) + (f * v - m * g) / _, h = d * ( - p / _) + c * (u / _) - (u * v - p * g) / _, d = i.xOrigin = o[0] = l, c = i.yOrigin = o[1] = h)),
            b && (s && (i.xOffset = b.xOffset, i.yOffset = b.yOffset, b = i), n || !1 !== n && !1 !== a.defaultSmoothOrigin ? (l = d - y, h = c - w, b.xOffset += l * x[0] + h * x[2] - l, b.yOffset += l * x[1] + h * x[3] - h) : b.xOffset = b.yOffset = 0),
            s || e.setAttribute("data-svg-origin", o.join(" "))
        },
        Ne = function(e) {
            var t, i = B("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            r = this.parentNode,
            n = this.nextSibling,
            s = this.style.cssText;
            if (Re.appendChild(i), i.appendChild(this), this.style.display = "block", e) try {
                t = this.getBBox(),
                this._originalGetBBox = this.getBBox,
                this.getBBox = Ne
            } catch(e) {} else this._originalGetBBox && (t = this._originalGetBBox());
            return n ? r.insertBefore(this, n) : r.appendChild(this),
            Re.removeChild(i),
            this.style.cssText = s,
            t
        },
        $e = function(e) {
            return ! (!Le || !e.getCTM || e.parentNode && !e.ownerSVGElement || !
            function(e) {
                try {
                    return e.getBBox()
                } catch(t) {
                    return Ne.call(e, !0)
                }
            } (e))
        },
        Fe = [1, 0, 0, 1, 0, 0],
        Be = function(e, t) {
            var i, r, n, s, a, o, l = e._gsTransform || new Ae,
            h = e.style;
            if (ke ? r = J(e, Me, null, !0) : e.currentStyle && (r = (r = e.currentStyle.filter.match(A)) && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, !ke || !(o = !Q(e) || "none" === Q(e).display) && e.parentNode || (o && (s = h.display, h.display = "block"), e.parentNode || (a = 1, Re.appendChild(e)), i = !(r = J(e, Me, null, !0)) || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, s ? h.display = s: o && je(h, "display"), a && Re.removeChild(e)), (l.svg || e.getCTM && $e(e)) && (i && -1 !== (h[ke] + "").indexOf("matrix") && (r = h[ke], i = 0), n = e.getAttribute("transform"), i && n && ( - 1 !== n.indexOf("matrix") ? (r = n, i = 0) : -1 !== n.indexOf("translate") && (r = "matrix(1,0,0,1," + n.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Fe;
            for (n = (r || "").match(_) || [], xe = n.length; --xe > -1;) s = Number(n[xe]),
            n[xe] = (a = s - (s |= 0)) ? (1e5 * a + (a < 0 ? -.5 : .5) | 0) / 1e5 + s: s;
            return t && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n
        },
        Ye = G.getTransform = function(e, i, r, n) {
            if (e._gsTransform && r && !n) return e._gsTransform;
            var s, o, l, h, d, c, u = r ? e._gsTransform || new Ae: new Ae,
            p = u.scaleX < 0,
            f = ze ? parseFloat(J(e, Oe, i, !1, "0 0 0").split(" ")[2]) || u.zOrigin || 0 : 0,
            m = parseFloat(a.defaultTransformPerspective) || 0;
            if (u.svg = !(!e.getCTM || !$e(e)), u.svg && (Xe(e, J(e, Oe, i, !1, "50% 50%") + "", u, e.getAttribute("data-svg-origin")), Ee = a.useSVGTransformAttr || Ie), (s = Be(e)) !== Fe) {
                if (16 === s.length) {
                    var g, v, _, y, w, b = s[0],
                    x = s[1],
                    T = s[2],
                    S = s[3],
                    C = s[4],
                    E = s[5],
                    P = s[6],
                    k = s[7],
                    M = s[8],
                    O = s[9],
                    z = s[10],
                    A = s[12],
                    L = s[13],
                    D = s[14],
                    R = s[11],
                    I = Math.atan2(P, z);
                    u.zOrigin && (A = M * (D = -u.zOrigin) - s[12], L = O * D - s[13], D = z * D + u.zOrigin - s[14]),
                    u.rotationX = I * X,
                    I && (g = C * (y = Math.cos( - I)) + M * (w = Math.sin( - I)), v = E * y + O * w, _ = P * y + z * w, M = C * -w + M * y, O = E * -w + O * y, z = P * -w + z * y, R = k * -w + R * y, C = g, E = v, P = _),
                    I = Math.atan2( - T, z),
                    u.rotationY = I * X,
                    I && (v = x * (y = Math.cos( - I)) - O * (w = Math.sin( - I)), _ = T * y - z * w, O = x * w + O * y, z = T * w + z * y, R = S * w + R * y, b = g = b * y - M * w, x = v, T = _),
                    I = Math.atan2(x, b),
                    u.rotation = I * X,
                    I && (g = b * (y = Math.cos(I)) + x * (w = Math.sin(I)), v = C * y + E * w, _ = M * y + O * w, x = x * y - b * w, E = E * y - C * w, O = O * y - M * w, b = g, C = v, M = _),
                    u.rotationX && Math.abs(u.rotationX) + Math.abs(u.rotation) > 359.9 && (u.rotationX = u.rotation = 0, u.rotationY = 180 - u.rotationY),
                    I = Math.atan2(C, E),
                    u.scaleX = (1e5 * Math.sqrt(b * b + x * x + T * T) + .5 | 0) / 1e5,
                    u.scaleY = (1e5 * Math.sqrt(E * E + P * P) + .5 | 0) / 1e5,
                    u.scaleZ = (1e5 * Math.sqrt(M * M + O * O + z * z) + .5 | 0) / 1e5,
                    b /= u.scaleX,
                    C /= u.scaleY,
                    x /= u.scaleX,
                    E /= u.scaleY,
                    Math.abs(I) > 2e-5 ? (u.skewX = I * X, C = 0, "simple" !== u.skewType && (u.scaleY *= 1 / Math.cos(I))) : u.skewX = 0,
                    u.perspective = R ? 1 / (R < 0 ? -R: R) : 0,
                    u.x = A,
                    u.y = L,
                    u.z = D,
                    u.svg && (u.x -= u.xOrigin - (u.xOrigin * b - u.yOrigin * C), u.y -= u.yOrigin - (u.yOrigin * x - u.xOrigin * E))
                } else if (!ze || n || !s.length || u.x !== s[4] || u.y !== s[5] || !u.rotationX && !u.rotationY) {
                    var N = s.length >= 6,
                    $ = N ? s[0] : 1,
                    F = s[1] || 0,
                    B = s[2] || 0,
                    Y = N ? s[3] : 1;
                    u.x = s[4] || 0,
                    u.y = s[5] || 0,
                    l = Math.sqrt($ * $ + F * F),
                    h = Math.sqrt(Y * Y + B * B),
                    d = $ || F ? Math.atan2(F, $) * X: u.rotation || 0,
                    c = B || Y ? Math.atan2(B, Y) * X + d: u.skewX || 0,
                    u.scaleX = l,
                    u.scaleY = h,
                    u.rotation = d,
                    u.skewX = c,
                    ze && (u.rotationX = u.rotationY = u.z = 0, u.perspective = m, u.scaleZ = 1),
                    u.svg && (u.x -= u.xOrigin - (u.xOrigin * $ + u.yOrigin * B), u.y -= u.yOrigin - (u.xOrigin * F + u.yOrigin * Y))
                }
                Math.abs(u.skewX) > 90 && Math.abs(u.skewX) < 270 && (p ? (u.scaleX *= -1, u.skewX += u.rotation <= 0 ? 180 : -180, u.rotation += u.rotation <= 0 ? 180 : -180) : (u.scaleY *= -1, u.skewX += u.skewX <= 0 ? 180 : -180)),
                u.zOrigin = f;
                for (o in u) u[o] < 2e-5 && u[o] > -2e-5 && (u[o] = 0)
            }
            return r && (e._gsTransform = u, u.svg && (Ee && e.style[ke] ? t.delayedCall(.001,
            function() {
                je(e.style, ke)
            }) : !Ee && e.getAttribute("transform") && t.delayedCall(.001,
            function() {
                e.removeAttribute("transform")
            }))),
            u
        },
        He = G.set3DTransformRatio = G.setTransformRatio = function(e) {
            var t, i, r, n, s, a, o, l, h, d, c, u, f, m, g, v, _, y, w, b, x, T = this.data,
            S = this.t.style,
            C = T.rotation,
            E = T.rotationX,
            P = T.rotationY,
            k = T.scaleX,
            M = T.scaleY,
            O = T.scaleZ,
            z = T.x,
            A = T.y,
            L = T.z,
            D = T.svg,
            R = T.perspective,
            X = T.force3D,
            N = T.skewY,
            $ = T.skewX;
            if (N && ($ += N, C += N), !((1 !== e && 0 !== e || "auto" !== X || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && X || L || R || P || E || 1 !== O) || Ee && D || !ze) C || $ || D ? (C *= I, b = $ * I, x = 1e5, i = Math.cos(C) * k, s = Math.sin(C) * k, r = Math.sin(C - b) * -M, a = Math.cos(C - b) * M, b && "simple" === T.skewType && (t = Math.tan(b - N * I), r *= t = Math.sqrt(1 + t * t), a *= t, N && (t = Math.tan(N * I), i *= t = Math.sqrt(1 + t * t), s *= t)), D && (z += T.xOrigin - (T.xOrigin * i + T.yOrigin * r) + T.xOffset, A += T.yOrigin - (T.xOrigin * s + T.yOrigin * a) + T.yOffset, Ee && (T.xPercent || T.yPercent) && (g = this.t.getBBox(), z += .01 * T.xPercent * g.width, A += .01 * T.yPercent * g.height), z < (g = 1e-6) && z > -g && (z = 0), A < g && A > -g && (A = 0)), w = (i * x | 0) / x + "," + (s * x | 0) / x + "," + (r * x | 0) / x + "," + (a * x | 0) / x + "," + z + "," + A + ")", D && Ee ? this.t.setAttribute("transform", "matrix(" + w) : S[ke] = (T.xPercent || T.yPercent ? "translate(" + T.xPercent + "%," + T.yPercent + "%) matrix(": "matrix(") + w) : S[ke] = (T.xPercent || T.yPercent ? "translate(" + T.xPercent + "%," + T.yPercent + "%) matrix(": "matrix(") + k + ",0,0," + M + "," + z + "," + A + ")";
            else {
                if (p && (k < (g = 1e-4) && k > -g && (k = O = 2e-5), M < g && M > -g && (M = O = 2e-5), !R || T.z || T.rotationX || T.rotationY || (R = 0)), C || $) C *= I,
                v = i = Math.cos(C),
                _ = s = Math.sin(C),
                $ && (C -= $ * I, v = Math.cos(C), _ = Math.sin(C), "simple" === T.skewType && (t = Math.tan(($ - N) * I), v *= t = Math.sqrt(1 + t * t), _ *= t, T.skewY && (t = Math.tan(N * I), i *= t = Math.sqrt(1 + t * t), s *= t))),
                r = -_,
                a = v;
                else {
                    if (! (P || E || 1 !== O || R || D)) return void(S[ke] = (T.xPercent || T.yPercent ? "translate(" + T.xPercent + "%," + T.yPercent + "%) translate3d(": "translate3d(") + z + "px," + A + "px," + L + "px)" + (1 !== k || 1 !== M ? " scale(" + k + "," + M + ")": ""));
                    i = a = 1,
                    r = s = 0
                }
                d = 1,
                n = o = l = h = c = u = 0,
                f = R ? -1 / R: 0,
                m = T.zOrigin,
                g = 1e-6,
                ",",
                "0",
                (C = P * I) && (v = Math.cos(C), l = -(_ = Math.sin(C)), c = f * -_, n = i * _, o = s * _, d = v, f *= v, i *= v, s *= v),
                (C = E * I) && (t = r * (v = Math.cos(C)) + n * (_ = Math.sin(C)), y = a * v + o * _, h = d * _, u = f * _, n = r * -_ + n * v, o = a * -_ + o * v, d *= v, f *= v, r = t, a = y),
                1 !== O && (n *= O, o *= O, d *= O, f *= O),
                1 !== M && (r *= M, a *= M, h *= M, u *= M),
                1 !== k && (i *= k, s *= k, l *= k, c *= k),
                (m || D) && (m && (z += n * -m, A += o * -m, L += d * -m + m), D && (z += T.xOrigin - (T.xOrigin * i + T.yOrigin * r) + T.xOffset, A += T.yOrigin - (T.xOrigin * s + T.yOrigin * a) + T.yOffset), z < g && z > -g && (z = "0"), A < g && A > -g && (A = "0"), L < g && L > -g && (L = 0)),
                w = T.xPercent || T.yPercent ? "translate(" + T.xPercent + "%," + T.yPercent + "%) matrix3d(": "matrix3d(",
                w += (i < g && i > -g ? "0": i) + "," + (s < g && s > -g ? "0": s) + "," + (l < g && l > -g ? "0": l),
                w += "," + (c < g && c > -g ? "0": c) + "," + (r < g && r > -g ? "0": r) + "," + (a < g && a > -g ? "0": a),
                E || P || 1 !== O ? (w += "," + (h < g && h > -g ? "0": h) + "," + (u < g && u > -g ? "0": u) + "," + (n < g && n > -g ? "0": n), w += "," + (o < g && o > -g ? "0": o) + "," + (d < g && d > -g ? "0": d) + "," + (f < g && f > -g ? "0": f) + ",") : w += ",0,0,0,0,1,0,",
                w += z + "," + A + "," + L + "," + (R ? 1 + -L / R: 1) + ")",
                S[ke] = w
            }
        }; (h = Ae.prototype).x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0,
        h.scaleX = h.scaleY = h.scaleZ = 1,
        Se("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(e, t, i, r, s, o, l) {
                if (r._lastParsedTransform === l) return s;
                r._lastParsedTransform = l;
                var h, d = l.scale && "function" == typeof l.scale ? l.scale: 0;
                "function" == typeof l[i] && (h = l[i], l[i] = t),
                d && (l.scale = d(v, e));
                var c, u, p, f, m, _, y, w, b, x = e._gsTransform,
                T = e.style,
                S = Pe.length,
                C = l,
                E = {},
                P = Ye(e, n, !0, C.parseTransform),
                k = C.transform && ("function" == typeof C.transform ? C.transform(v, g) : C.transform);
                if (P.skewType = C.skewType || P.skewType || a.defaultSkewType, r._transform = P, k && "string" == typeof k && ke)(u = Y.style)[ke] = k,
                u.display = "block",
                u.position = "absolute",
                F.body.appendChild(Y),
                c = Ye(Y, null, !1),
                "simple" === P.skewType && (c.scaleY *= Math.cos(c.skewX * I)),
                P.svg && (_ = P.xOrigin, y = P.yOrigin, c.x -= P.xOffset, c.y -= P.yOffset, (C.transformOrigin || C.svgOrigin) && (k = {},
                Xe(e, oe(C.transformOrigin), k, C.svgOrigin, C.smoothOrigin, !0), _ = k.xOrigin, y = k.yOrigin, c.x -= k.xOffset - P.xOffset, c.y -= k.yOffset - P.yOffset), (_ || y) && (w = Be(Y, !0), c.x -= _ - (_ * w[0] + y * w[2]), c.y -= y - (_ * w[1] + y * w[3]))),
                F.body.removeChild(Y),
                c.perspective || (c.perspective = P.perspective),
                null != C.xPercent && (c.xPercent = he(C.xPercent, P.xPercent)),
                null != C.yPercent && (c.yPercent = he(C.yPercent, P.yPercent));
                else if ("object" == typeof C) {
                    if (c = {
                        scaleX: he(null != C.scaleX ? C.scaleX: C.scale, P.scaleX),
                        scaleY: he(null != C.scaleY ? C.scaleY: C.scale, P.scaleY),
                        scaleZ: he(C.scaleZ, P.scaleZ),
                        x: he(C.x, P.x),
                        y: he(C.y, P.y),
                        z: he(C.z, P.z),
                        xPercent: he(C.xPercent, P.xPercent),
                        yPercent: he(C.yPercent, P.yPercent),
                        perspective: he(C.transformPerspective, P.perspective)
                    },
                    null != (m = C.directionalRotation)) if ("object" == typeof m) for (u in m) C[u] = m[u];
                    else C.rotation = m;
                    "string" == typeof C.x && -1 !== C.x.indexOf("%") && (c.x = 0, c.xPercent = he(C.x, P.xPercent)),
                    "string" == typeof C.y && -1 !== C.y.indexOf("%") && (c.y = 0, c.yPercent = he(C.y, P.yPercent)),
                    c.rotation = de("rotation" in C ? C.rotation: "shortRotation" in C ? C.shortRotation + "_short": "rotationZ" in C ? C.rotationZ: P.rotation, P.rotation, "rotation", E),
                    ze && (c.rotationX = de("rotationX" in C ? C.rotationX: "shortRotationX" in C ? C.shortRotationX + "_short": P.rotationX || 0, P.rotationX, "rotationX", E), c.rotationY = de("rotationY" in C ? C.rotationY: "shortRotationY" in C ? C.shortRotationY + "_short": P.rotationY || 0, P.rotationY, "rotationY", E)),
                    c.skewX = de(C.skewX, P.skewX),
                    c.skewY = de(C.skewY, P.skewY)
                }
                for (ze && null != C.force3D && (P.force3D = C.force3D, f = !0), (p = P.force3D || P.z || P.rotationX || P.rotationY || c.z || c.rotationX || c.rotationY || c.perspective) || null == C.scale || (c.scaleZ = 1); --S > -1;)((k = c[b = Pe[S]] - P[b]) > 1e-6 || k < -1e-6 || null != C[b] || null != N[b]) && (f = !0, s = new ye(P, b, P[b], k, s), b in E && (s.e = E[b]), s.xs0 = 0, s.plugin = o, r._overwriteProps.push(s.n));
                return k = C.transformOrigin,
                P.svg && (k || C.svgOrigin) && (_ = P.xOffset, y = P.yOffset, Xe(e, oe(k), c, C.svgOrigin, C.smoothOrigin), s = we(P, "xOrigin", (x ? P: c).xOrigin, c.xOrigin, s, "transformOrigin"), s = we(P, "yOrigin", (x ? P: c).yOrigin, c.yOrigin, s, "transformOrigin"), _ === P.xOffset && y === P.yOffset || (s = we(P, "xOffset", x ? _: P.xOffset, P.xOffset, s, "transformOrigin"), s = we(P, "yOffset", x ? y: P.yOffset, P.yOffset, s, "transformOrigin")), k = "0px 0px"),
                (k || ze && p && P.zOrigin) && (ke ? (f = !0, b = Oe, k = (k || J(e, b, n, !1, "50% 50%")) + "", (s = new ye(T, b, 0, 0, s, -1, "transformOrigin")).b = T[b], s.plugin = o, ze ? (u = P.zOrigin, k = k.split(" "), P.zOrigin = (k.length > 2 && (0 === u || "0px" !== k[2]) ? parseFloat(k[2]) : u) || 0, s.xs0 = s.e = k[0] + " " + (k[1] || "50%") + " 0px", (s = new ye(P, "zOrigin", 0, 0, s, -1, s.n)).b = u, s.xs0 = s.e = P.zOrigin) : s.xs0 = s.e = k) : oe(k + "", P)),
                f && (r._transformType = P.svg && Ee || !p && 3 !== this._transformType ? 2 : 3),
                h && (l[i] = h),
                d && (l.scale = d),
                s
            },
            prefix: !0
        }),
        Se("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        Se("borderRadius", {
            defaultValue: "0px",
            parser: function(e, t, i, s, a, o) {
                t = this.format(t);
                var l, h, d, c, u, p, f, m, g, v, _, y, w, b, x, T, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                C = e.style;
                for (g = parseFloat(e.offsetWidth), v = parseFloat(e.offsetHeight), l = t.split(" "), h = 0; h < S.length; h++) this.p.indexOf("border") && (S[h] = Z(S[h])),
                -1 !== (u = c = J(e, S[h], n, !1, "0px")).indexOf(" ") && (u = (c = u.split(" "))[0], c = c[1]),
                p = d = l[h],
                f = parseFloat(u),
                y = u.substr((f + "").length),
                (w = "=" === p.charAt(1)) ? (m = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), m *= parseFloat(p), _ = p.substr((m + "").length - (m < 0 ? 1 : 0)) || "") : (m = parseFloat(p), _ = p.substr((m + "").length)),
                "" === _ && (_ = r[i] || y),
                _ !== y && (b = ee(e, "borderLeft", f, y), x = ee(e, "borderTop", f, y), "%" === _ ? (u = b / g * 100 + "%", c = x / v * 100 + "%") : "em" === _ ? (u = b / (T = ee(e, "borderLeft", 1, "em")) + "em", c = x / T + "em") : (u = b + "px", c = x + "px"), w && (p = parseFloat(u) + m + _, d = parseFloat(c) + m + _)),
                a = be(C, S[h], u + " " + c, p + " " + d, !1, "0px", a);
                return a
            },
            prefix: !0,
            formatter: ge("0px 0px 0px 0px", !1, !0)
        }),
        Se("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function(e, t, i, r, s, a) {
                return be(e.style, i, this.format(J(e, i, n, !1, "0px 0px")), this.format(t), !1, "0px", s)
            },
            prefix: !0,
            formatter: ge("0px 0px", !1, !0)
        }),
        Se("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(e, t, i, r, s, a) {
                var o, l, h, d, c, u, p = "background-position",
                f = n || Q(e, null),
                g = this.format((f ? m ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                v = this.format(t);
                if ( - 1 !== g.indexOf("%") != ( - 1 !== v.indexOf("%")) && v.split(",").length < 2 && (u = J(e, "backgroundImage").replace(M, "")) && "none" !== u) {
                    for (o = g.split(" "), l = v.split(" "), H.setAttribute("src", u), h = 2; --h > -1;)(d = -1 !== (g = o[h]).indexOf("%")) !== ( - 1 !== l[h].indexOf("%")) && (c = 0 === h ? e.offsetWidth - H.width: e.offsetHeight - H.height, o[h] = d ? parseFloat(g) / 100 * c + "px": parseFloat(g) / c * 100 + "%");
                    g = o.join(" ")
                }
                return this.parseComplex(e.style, g, v, s, a)
            },
            formatter: oe
        }),
        Se("backgroundSize", {
            defaultValue: "0 0",
            formatter: function(e) {
                return e += "",
                oe( - 1 === e.indexOf(" ") ? e + " " + e: e)
            }
        }),
        Se("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        Se("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        Se("transformStyle", {
            prefix: !0
        }),
        Se("backfaceVisibility", {
            prefix: !0
        }),
        Se("userSelect", {
            prefix: !0
        }),
        Se("margin", {
            parser: ve("marginTop,marginRight,marginBottom,marginLeft")
        }),
        Se("padding", {
            parser: ve("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        Se("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(e, t, i, r, s, a) {
                var o, l, h;
                return m < 9 ? (l = e.currentStyle, h = m < 8 ? " ": ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", t = this.format(t).split(",").join(h)) : (o = this.format(J(e, this.p, n, !1, this.dflt)), t = this.format(t)),
                this.parseComplex(e.style, o, t, s, a)
            }
        }),
        Se("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        Se("autoRound,strictUnits", {
            parser: function(e, t, i, r, n) {
                return n
            }
        }),
        Se("border", {
            defaultValue: "0px solid #000",
            parser: function(e, t, i, r, s, a) {
                var o = J(e, "borderTopWidth", n, !1, "0px"),
                l = this.format(t).split(" "),
                h = l[0].replace(x, "");
                return "px" !== h && (o = parseFloat(o) / ee(e, "borderTopWidth", 1, h) + h),
                this.parseComplex(e.style, this.format(o + " " + J(e, "borderTopStyle", n, !1, "solid") + " " + J(e, "borderTopColor", n, !1, "#000")), l.join(" "), s, a)
            },
            color: !0,
            formatter: function(e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(me) || ["#000"])[0]
            }
        }),
        Se("borderWidth", {
            parser: ve("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        Se("float,cssFloat,styleFloat", {
            parser: function(e, t, i, r, n, s) {
                var a = e.style,
                o = "cssFloat" in a ? "cssFloat": "styleFloat";
                return new ye(a, o, 0, 0, n, -1, i, !1, 0, a[o], t)
            }
        });
        var Ge = function(e) {
            var t, i = this.t,
            r = i.filter || J(this.data, "filter") || "",
            n = this.s + this.c * e | 0;
            100 === n && ( - 1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), t = !J(this.data, "filter")) : (i.filter = r.replace(C, ""), t = !0)),
            t || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + n + ")"), -1 === r.indexOf("pacity") ? 0 === n && this.xn1 || (i.filter = r + " alpha(opacity=" + n + ")") : i.filter = r.replace(T, "opacity=" + n))
        };
        Se("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(e, t, i, r, s, a) {
                var o = parseFloat(J(e, "opacity", n, !1, "1")),
                l = e.style,
                h = "autoAlpha" === i;
                return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + o),
                h && 1 === o && "hidden" === J(e, "visibility", n) && 0 !== t && (o = 0),
                V ? s = new ye(l, "opacity", o, t - o, s) : ((s = new ye(l, "opacity", 100 * o, 100 * (t - o), s)).xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = a, s.setRatio = Ge),
                h && ((s = new ye(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== o ? "inherit": "hidden", 0 === t ? "hidden": "inherit")).xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(i)),
                s
            }
        });
        var je = function(e, t) {
            t && (e.removeProperty ? ("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6) || (t = "-" + t), e.removeProperty(t.replace(P, "-$1").toLowerCase())) : e.removeAttribute(t))
        },
        Ve = function(e) {
            if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                this.t.setAttribute("class", 0 === e ? this.b: this.e);
                for (var t = this.data,
                i = this.t.style; t;) t.v ? i[t.p] = t.v: je(i, t.p),
                t = t._next;
                1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        Se("className", {
            parser: function(e, t, r, s, a, o, l) {
                var h, d, c, u, p, f = e.getAttribute("class") || "",
                m = e.style.cssText;
                if (a = s._classNamePT = new ye(e, r, 0, 0, a, 2), a.setRatio = Ve, a.pr = -11, i = !0, a.b = f, d = ie(e, n), c = e._gsClassPT) {
                    for (u = {},
                    p = c.data; p;) u[p.p] = 1,
                    p = p._next;
                    c.setRatio(1)
                }
                return e._gsClassPT = a,
                a.e = "=" !== t.charAt(1) ? t: f.replace(new RegExp("(?:\\s|^)" + t.substr(2) + "(?![\\w-])"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""),
                e.setAttribute("class", a.e),
                h = re(e, d, ie(e), l, u),
                e.setAttribute("class", f),
                a.data = h.firstMPT,
                e.style.cssText = m,
                a = a.xfirst = s.parse(e, h.difs, a, o)
            }
        });
        var qe = function(e) {
            if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var t, i, r, n, s, a = this.t.style,
                o = l.transform.parse;
                if ("all" === this.e) a.cssText = "",
                n = !0;
                else for (r = (t = this.e.split(" ").join("").split(",")).length; --r > -1;) i = t[r],
                l[i] && (l[i].parse === o ? n = !0 : i = "transformOrigin" === i ? Oe: l[i].p),
                je(a, i);
                n && (je(a, ke), (s = this.t._gsTransform) && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
            }
        };
        for (Se("clearProps", {
            parser: function(e, t, r, n, s) {
                return s = new ye(e, r, 0, 0, s, 2),
                s.setRatio = qe,
                s.e = t,
                s.pr = -10,
                s.data = n._tween,
                i = !0,
                s
            }
        }), h = "bezier,throwProps,physicsProps,physics2D".split(","), xe = h.length; xe--;) Ce(h[xe]); (h = a.prototype)._firstPT = h._lastParsedTransform = h._transform = null,
        h._onInitTween = function(e, t, o, h) {
            if (!e.nodeType) return ! 1;
            this._target = g = e,
            this._tween = o,
            this._vars = t,
            v = h,
            d = t.autoRound,
            i = !1,
            r = t.suffixMap || a.suffixMap,
            n = Q(e, ""),
            s = this._overwriteProps;
            var p, _, y, w, b, C, E, P, k, M = e.style;
            if (c && "" === M.zIndex && ("auto" !== (p = J(e, "zIndex", n)) && "" !== p || this._addLazySet(M, "zIndex", 0)), "string" == typeof t && (w = M.cssText, p = ie(e, n), M.cssText = w + ";" + t, p = re(e, p, ie(e)).difs, !V && S.test(t) && (p.opacity = parseFloat(RegExp.$1)), t = p, M.cssText = w), t.className ? this._firstPT = _ = l.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = _ = this.parse(e, t, null), this._transformType) {
                for (k = 3 === this._transformType, ke ? u && (c = !0, "" === M.zIndex && ("auto" !== (E = J(e, "zIndex", n)) && "" !== E || this._addLazySet(M, "zIndex", 0)), f && this._addLazySet(M, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (k ? "visible": "hidden"))) : M.zoom = 1, y = _; y && y._next;) y = y._next;
                P = new ye(e, "transform", 0, 0, null, 2),
                this._linkCSSP(P, null, y),
                P.setRatio = ke ? He: function(e) {
                    var t, i, r = this.data,
                    n = -r.rotation * I,
                    s = n + r.skewX * I,
                    a = (Math.cos(n) * r.scaleX * 1e5 | 0) / 1e5,
                    o = (Math.sin(n) * r.scaleX * 1e5 | 0) / 1e5,
                    l = (Math.sin(s) * -r.scaleY * 1e5 | 0) / 1e5,
                    h = (Math.cos(s) * r.scaleY * 1e5 | 0) / 1e5,
                    d = this.t.style,
                    c = this.t.currentStyle;
                    if (c) {
                        i = o,
                        o = -l,
                        l = -i,
                        t = c.filter,
                        d.filter = "";
                        var u, p, f = this.t.offsetWidth,
                        g = this.t.offsetHeight,
                        v = "absolute" !== c.position,
                        _ = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + o + ", M21=" + l + ", M22=" + h,
                        y = r.x + f * r.xPercent / 100,
                        w = r.y + g * r.yPercent / 100;
                        if (null != r.ox && (y += (u = (r.oxp ? f * r.ox * .01 : r.ox) - f / 2) - (u * a + (p = (r.oyp ? g * r.oy * .01 : r.oy) - g / 2) * o), w += p - (u * l + p * h)), _ += v ? ", Dx=" + ((u = f / 2) - (u * a + (p = g / 2) * o) + y) + ", Dy=" + (p - (u * l + p * h) + w) + ")": ", sizingMethod='auto expand')", -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? d.filter = t.replace(L, _) : d.filter = _ + " " + t, 0 !== e && 1 !== e || 1 === a && 0 === o && 0 === l && 1 === h && (v && -1 === _.indexOf("Dx=0, Dy=0") || T.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && d.removeAttribute("filter")), !v) {
                            var b, S, C, E = m < 8 ? 1 : -1;
                            for (u = r.ieOffsetX || 0, p = r.ieOffsetY || 0, r.ieOffsetX = Math.round((f - ((a < 0 ? -a: a) * f + (o < 0 ? -o: o) * g)) / 2 + y), r.ieOffsetY = Math.round((g - ((h < 0 ? -h: h) * g + (l < 0 ? -l: l) * f)) / 2 + w), xe = 0; xe < 4; xe++) C = (i = -1 !== (b = c[S = se[xe]]).indexOf("px") ? parseFloat(b) : ee(this.t, S, parseFloat(b), b.replace(x, "")) || 0) !== r[S] ? xe < 2 ? -r.ieOffsetX: -r.ieOffsetY: xe < 2 ? u - r.ieOffsetX: p - r.ieOffsetY,
                            d[S] = (r[S] = Math.round(i - C * (0 === xe || 2 === xe ? 1 : E))) + "px"
                        }
                    }
                },
                P.data = this._transform || Ye(e, n, !0),
                P.tween = o,
                P.pr = -1,
                s.pop()
            }
            if (i) {
                for (; _;) {
                    for (C = _._next, y = w; y && y.pr > _.pr;) y = y._next; (_._prev = y ? y._prev: b) ? _._prev._next = _: w = _,
                    (_._next = y) ? y._prev = _: b = _,
                    _ = C
                }
                this._firstPT = w
            }
            return ! 0
        },
        h.parse = function(e, t, i, s) {
            var a, o, h, c, u, p, f, m, _, y, w = e.style;
            for (a in t) {
                if ("function" == typeof(p = t[a]) && (p = p(v, g)), o = l[a]) i = o.parse(e, p, a, this, i, s, t);
                else {
                    if ("--" === a.substr(0, 2)) {
                        this._tween._propLookup[a] = this._addTween.call(this._tween, e.style, "setProperty", Q(e).getPropertyValue(a) + "", p + "", a, !1, a);
                        continue
                    }
                    u = J(e, a, n) + "",
                    _ = "string" == typeof p,
                    "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || _ && E.test(p) ? (_ || (p = ((p = pe(p)).length > 3 ? "rgba(": "rgb(") + p.join(",") + ")"), i = be(w, a, u, p, !0, "transparent", i, 0, s)) : _ && R.test(p) ? i = be(w, a, u, p, !0, null, i, 0, s) : (f = (h = parseFloat(u)) || 0 === h ? u.substr((h + "").length) : "", "" !== u && "auto" !== u || ("width" === a || "height" === a ? (h = ae(e, a, n), f = "px") : "left" === a || "top" === a ? (h = te(e, a, n), f = "px") : (h = "opacity" !== a ? 0 : 1, f = "")), (y = _ && "=" === p.charAt(1)) ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), m = p.replace(x, "")) : (c = parseFloat(p), m = _ ? p.replace(x, "") : ""), "" === m && (m = a in r ? r[a] : f), p = c || 0 === c ? (y ? c + h: c) + m: t[a], f !== m && ("" === m && "lineHeight" !== a || (c || 0 === c) && h && (h = ee(e, a, h, f), "%" === m ? (h /= ee(e, a, 100, "%") / 100, !0 !== t.strictUnits && (u = h + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? h /= ee(e, a, 1, m) : "px" !== m && (c = ee(e, a, c, m), m = "px"), y && (c || 0 === c) && (p = c + h + m))), y && (c += h), !h && 0 !== h || !c && 0 !== c ? void 0 !== w[a] && (p || p + "" != "NaN" && null != p) ? (i = new ye(w, a, c || h || 0, 0, i, -1, a, !1, 0, u, p)).xs0 = "none" !== p || "display" !== a && -1 === a.indexOf("Style") ? p: u: W("invalid " + a + " tween value: " + t[a]) : (i = new ye(w, a, h, c - h, i, 0, a, !1 !== d && ("px" === m || "zIndex" === a), 0, u, p)).xs0 = m)
                }
                s && i && !i.plugin && (i.plugin = s)
            }
            return i
        },
        h.setRatio = function(e) {
            var t, i, r, n = this._firstPT;
            if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime) for (; n;) {
                if (t = n.c * e + n.s, n.r ? t = Math.round(t) : t < 1e-6 && t > -1e-6 && (t = 0), n.type) if (1 === n.type) if (2 === (r = n.l)) n.t[n.p] = n.xs0 + t + n.xs1 + n.xn1 + n.xs2;
                else if (3 === r) n.t[n.p] = n.xs0 + t + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3;
                else if (4 === r) n.t[n.p] = n.xs0 + t + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4;
                else if (5 === r) n.t[n.p] = n.xs0 + t + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4 + n.xn4 + n.xs5;
                else {
                    for (i = n.xs0 + t + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                    n.t[n.p] = i
                } else - 1 === n.type ? n.t[n.p] = n.xs0: n.setRatio && n.setRatio(e);
                else n.t[n.p] = t + n.xs0;
                n = n._next
            } else for (; n;) 2 !== n.type ? n.t[n.p] = n.b: n.setRatio(e),
            n = n._next;
            else for (; n;) {
                if (2 !== n.type) if (n.r && -1 !== n.type) if (t = Math.round(n.s + n.c), n.type) {
                    if (1 === n.type) {
                        for (r = n.l, i = n.xs0 + t + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                        n.t[n.p] = i
                    }
                } else n.t[n.p] = t + n.xs0;
                else n.t[n.p] = n.e;
                else n.setRatio(e);
                n = n._next
            }
        },
        h._enableTransforms = function(e) {
            this._transform = this._transform || Ye(this._target, n, !0),
            this._transformType = this._transform.svg && Ee || !e && 3 !== this._transformType ? 2 : 3
        };
        var We = function(e) {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null, !0)
        };
        h._addLazySet = function(e, t, i) {
            var r = this._firstPT = new ye(e, t, 0, 0, this._firstPT, 2);
            r.e = i,
            r.setRatio = We,
            r.data = this
        },
        h._linkCSSP = function(e, t, i, r) {
            return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next: this._firstPT === e && (this._firstPT = e._next, r = !0), i ? i._next = e: r || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i),
            e
        },
        h._mod = function(e) {
            for (var t = this._firstPT; t;)"function" == typeof e[t.p] && e[t.p] === Math.round && (t.r = 1),
            t = t._next
        },
        h._kill = function(t) {
            var i, r, n, s = t;
            if (t.autoAlpha || t.alpha) {
                s = {};
                for (r in t) s[r] = t[r];
                s.opacity = 1,
                s.autoAlpha && (s.visibility = 1)
            }
            for (t.className && (i = this._classNamePT) && ((n = i.xfirst) && n._prev ? this._linkCSSP(n._prev, i._next, n._prev._prev) : n === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, n._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== r && i.plugin._kill && (i.plugin._kill(t), r = i.plugin),
            i = i._next;
            return e.prototype._kill.call(this, s)
        };
        var Ue = function(e, t, i) {
            var r, n, s, a;
            if (e.slice) for (n = e.length; --n > -1;) Ue(e[n], t, i);
            else for (n = (r = e.childNodes).length; --n > -1;) a = (s = r[n]).type,
            s.style && (t.push(ie(s)), i && i.push(s)),
            1 !== a && 9 !== a && 11 !== a || !s.childNodes.length || Ue(s, t, i)
        };
        return a.cascadeTo = function(e, i, r) {
            var n, s, a, o, l = t.to(e, i, r),
            h = [l],
            d = [],
            c = [],
            u = [],
            p = t._internals.reservedProps;
            for (e = l._targets || l.target, Ue(e, d, u), l.render(i, !0, !0), Ue(e, c), l.render(0, !0, !0), l._enabled(!0), n = u.length; --n > -1;) if ((s = re(u[n], d[n], c[n])).firstMPT) {
                s = s.difs;
                for (a in r) p[a] && (s[a] = r[a]);
                o = {};
                for (a in s) o[a] = d[n][a];
                h.push(t.fromTo(u[n], i, o, s))
            }
            return h
        },
        e.activate([a]),
        a
    },
    !0),
    function() {
        var e = function(e) {
            for (; e;) e.f || e.blob || (e.m = Math.round),
            e = e._next
        },
        t = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.6.0",
            priority: -1,
            API: 2,
            init: function(e, t, i) {
                return this._tween = i,
                !0
            }
        }).prototype;
        t._onInitAllProps = function() {
            for (var t, i, r, n = this._tween,
            s = n.vars.roundProps.join ? n.vars.roundProps: n.vars.roundProps.split(","), a = s.length, o = {},
            l = n._propLookup.roundProps; --a > -1;) o[s[a]] = Math.round;
            for (a = s.length; --a > -1;) for (t = s[a], i = n._firstPT; i;) r = i._next,
            i.pg ? i.t._mod(o) : i.n === t && (2 === i.f && i.t ? e(i.t._firstPT) : (this._add(i.t, t, i.s, i.c), r && (r._prev = i._prev), i._prev ? i._prev._next = r: n._firstPT === i && (n._firstPT = r), i._next = i._prev = null, n._propLookup[t] = l)),
            i = r;
            return ! 1
        },
        t._add = function(e, t, i, r) {
            this._addTween(e, t, i, i + r, t, Math.round),
            this._overwriteProps.push(t)
        }
    } (),
    _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.6.1",
        init: function(e, t, i, r) {
            var n, s;
            if ("function" != typeof e.setAttribute) return ! 1;
            for (n in t)"function" == typeof(s = t[n]) && (s = s(r, e)),
            this._addTween(e, "setAttribute", e.getAttribute(n) + "", s + "", n, !1, n),
            this._overwriteProps.push(n);
            return ! 0
        }
    }),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function(e, t, i, r) {
            "object" != typeof t && (t = {
                rotation: t
            }),
            this.finals = {};
            var n, s, a, o, l, h, d = !0 === t.useRadians ? 2 * Math.PI: 360;
            for (n in t)"useRadians" !== n && ("function" == typeof(o = t[n]) && (o = o(r, e)), s = (h = (o + "").split("_"))[0], a = parseFloat("function" != typeof e[n] ? e[n] : e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n: "get" + n.substr(3)]()), l = (o = this.finals[n] = "string" == typeof s && "=" === s.charAt(1) ? a + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0) - a, h.length && ( - 1 !== (s = h.join("_")).indexOf("short") && (l %= d) !== l % (d / 2) && (l = l < 0 ? l + d: l - d), -1 !== s.indexOf("_cw") && l < 0 ? l = (l + 9999999999 * d) % d - (l / d | 0) * d: -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * d) % d - (l / d | 0) * d)), (l > 1e-6 || l < -1e-6) && (this._addTween(e, n, a, a + l, n), this._overwriteProps.push(n)));
            return ! 0
        },
        set: function(e) {
            var t;
            if (1 !== e) this._super.setRatio.call(this, e);
            else for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p],
            t = t._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"],
    function(e) {
        var t, i, r, n = _gsScope.GreenSockGlobals || _gsScope,
        s = n.com.greensock,
        a = 2 * Math.PI,
        o = Math.PI / 2,
        l = s._class,
        h = function(t, i) {
            var r = l("easing." + t,
            function() {},
            !0),
            n = r.prototype = new e;
            return n.constructor = r,
            n.getRatio = i,
            r
        },
        d = e.register ||
        function() {},
        c = function(e, t, i, r, n) {
            var s = l("easing." + e, {
                easeOut: new t,
                easeIn: new i,
                easeInOut: new r
            },
            !0);
            return d(s, e),
            s
        },
        u = function(e, t, i) {
            this.t = e,
            this.v = t,
            i && (this.next = i, i.prev = this, this.c = i.v - t, this.gap = i.t - e)
        },
        p = function(t, i) {
            var r = l("easing." + t,
            function(e) {
                this._p1 = e || 0 === e ? e: 1.70158,
                this._p2 = 1.525 * this._p1
            },
            !0),
            n = r.prototype = new e;
            return n.constructor = r,
            n.getRatio = i,
            n.config = function(e) {
                return new r(e)
            },
            r
        },
        f = c("Back", p("BackOut",
        function(e) {
            return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
        }), p("BackIn",
        function(e) {
            return e * e * ((this._p1 + 1) * e - this._p1)
        }), p("BackInOut",
        function(e) {
            return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
        })),
        m = l("easing.SlowMo",
        function(e, t, i) {
            t = t || 0 === t ? t: .7,
            null == e ? e = .7 : e > 1 && (e = 1),
            this._p = 1 !== e ? t: 0,
            this._p1 = (1 - e) / 2,
            this._p2 = e,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = !0 === i
        },
        !0),
        g = m.prototype = new e;
        return g.constructor = m,
        g.getRatio = function(e) {
            var t = e + (.5 - e) * this._p;
            return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e: t - (e = 1 - e / this._p1) * e * e * e * t: e > this._p3 ? this._calcEnd ? 1 === e ? 0 : 1 - (e = (e - this._p3) / this._p1) * e: t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e: this._calcEnd ? 1 : t
        },
        m.ease = new m(.7, .7),
        g.config = m.config = function(e, t, i) {
            return new m(e, t, i)
        },
        t = l("easing.SteppedEase",
        function(e, t) {
            e = e || 1,
            this._p1 = 1 / e,
            this._p2 = e + (t ? 0 : 1),
            this._p3 = t ? 1 : 0
        },
        !0),
        g = t.prototype = new e,
        g.constructor = t,
        g.getRatio = function(e) {
            return e < 0 ? e = 0 : e >= 1 && (e = .999999999),
            ((this._p2 * e | 0) + this._p3) * this._p1
        },
        g.config = t.config = function(e, i) {
            return new t(e, i)
        },
        i = l("easing.RoughEase",
        function(t) {
            for (var i, r, n, s, a, o, l = (t = t || {}).taper || "none", h = [], d = 0, c = 0 | (t.points || 20), p = c, f = !1 !== t.randomize, m = !0 === t.clamp, g = t.template instanceof e ? t.template: null, v = "number" == typeof t.strength ? .4 * t.strength: .4; --p > -1;) i = f ? Math.random() : 1 / c * p,
            r = g ? g.getRatio(i) : i,
            n = "none" === l ? v: "out" === l ? (s = 1 - i) * s * v: "in" === l ? i * i * v: i < .5 ? (s = 2 * i) * s * .5 * v: (s = 2 * (1 - i)) * s * .5 * v,
            f ? r += Math.random() * n - .5 * n: p % 2 ? r += .5 * n: r -= .5 * n,
            m && (r > 1 ? r = 1 : r < 0 && (r = 0)),
            h[d++] = {
                x: i,
                y: r
            };
            for (h.sort(function(e, t) {
                return e.x - t.x
            }), o = new u(1, 1, null), p = c; --p > -1;) a = h[p],
            o = new u(a.x, a.y, o);
            this._prev = new u(0, 0, 0 !== o.t ? o: o.next)
        },
        !0),
        g = i.prototype = new e,
        g.constructor = i,
        g.getRatio = function(e) {
            var t = this._prev;
            if (e > t.t) {
                for (; t.next && e >= t.t;) t = t.next;
                t = t.prev
            } else for (; t.prev && e <= t.t;) t = t.prev;
            return this._prev = t,
            t.v + (e - t.t) / t.gap * t.c
        },
        g.config = function(e) {
            return new i(e)
        },
        i.ease = new i,
        c("Bounce", h("BounceOut",
        function(e) {
            return e < 1 / 2.75 ? 7.5625 * e * e: e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), h("BounceIn",
        function(e) {
            return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e: e < 2 / 2.75 ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : e < 2.5 / 2.75 ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), h("BounceInOut",
        function(e) {
            var t = e < .5;
            return (e = t ? 1 - 2 * e: 2 * e - 1) < 1 / 2.75 ? e *= 7.5625 * e: e = e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375,
            t ? .5 * (1 - e) : .5 * e + .5
        })),
        c("Circ", h("CircOut",
        function(e) {
            return Math.sqrt(1 - (e -= 1) * e)
        }), h("CircIn",
        function(e) {
            return - (Math.sqrt(1 - e * e) - 1)
        }), h("CircInOut",
        function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        })),
        r = function(t, i, r) {
            var n = l("easing." + t,
            function(e, t) {
                this._p1 = e >= 1 ? e: 1,
                this._p2 = (t || r) / (e < 1 ? e: 1),
                this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0),
                this._p2 = a / this._p2
            },
            !0),
            s = n.prototype = new e;
            return s.constructor = n,
            s.getRatio = i,
            s.config = function(e, t) {
                return new n(e, t)
            },
            n
        },
        c("Elastic", r("ElasticOut",
        function(e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
        },
        .3), r("ElasticIn",
        function(e) {
            return - this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2)
        },
        .3), r("ElasticInOut",
        function(e) {
            return (e *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * .5 + 1
        },
        .45)),
        c("Expo", h("ExpoOut",
        function(e) {
            return 1 - Math.pow(2, -10 * e)
        }), h("ExpoIn",
        function(e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), h("ExpoInOut",
        function(e) {
            return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        })),
        c("Sine", h("SineOut",
        function(e) {
            return Math.sin(e * o)
        }), h("SineIn",
        function(e) {
            return 1 - Math.cos(e * o)
        }), h("SineInOut",
        function(e) {
            return - .5 * (Math.cos(Math.PI * e) - 1)
        })),
        l("easing.EaseLookup", {
            find: function(t) {
                return e.map[t]
            }
        },
        !0),
        d(n.SlowMo, "SlowMo", "ease,"),
        d(i, "RoughEase", "ease,"),
        d(t, "SteppedEase", "ease,"),
        f
    },
    !0)
}),
