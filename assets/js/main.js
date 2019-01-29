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
