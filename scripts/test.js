/* AniChart app.js - built Tue Jan 06 2015 02:08:17 */
var app = angular.module("app", ["ui.router", "ngSanitize", "timer", "youtube-embed"]);
app.run(function($rootScope, $location, animeTitleService, outgoingLinkService, templateService, orderService, darkModeService) {
        animeTitleService.set(), outgoingLinkService.set(), templateService.get(), orderService.get(), darkModeService.get(), $rootScope.flashFirst = 1, $(".loader__bar").css("-webkit-animation", "none"), $(".loader__bar").css("animation", "none"), $(".loader").fadeOut(800), $rootScope.$on("$stateChangeStart", function() {
            NProgress.start(), googletag.pubads().refresh()
        }), $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams) {
            $rootScope.currentState = toParams.chartSeason, "undefined" == typeof toParams.chartSeason && ($rootScope.currentState = "archive/" + toParams.archiveSeason), 1 != $rootScope.flashFirst && ($rootScope.flash = ""), $rootScope.flashFirst = null
        })
    }), app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(!0), $urlRouterProvider.otherwise("/"), $stateProvider.state("settings", {
            url: "/settings",
            templateUrl: "http://anichart.net/templates/settings.html",
            controller: "settingsController"
        }).state("archivePage", {
            url: "/archive",
            templateUrl: "http://anichart.net/templates/archive.html",
            controller: function() {
                NProgress.done()
            }
        }).state("archive", {
            url: "/archive/:archiveSeason",
            templateUrl: "http://anichart.net/templates/chart.html",
            controller: "chartController"
        }).state("faq", {
            url: "/faq",
            templateUrl: "http://anichart.net/templates/faq.html",
            controller: function() {
                NProgress.done()
            }
        }).state("chart", {
            url: "/:chartSeason",
            templateUrl: "http://anichart.net/templates/chart.html",
            controller: "chartController"
        }).state("video", {
            url: "/podcast/podtaku",
            templateUrl: "http://anichart.net/templates/video.html",
            controller: "videoController"
        })
    }), app.controller("chartController", function($scope, $state, $stateParams, Api, seasonIdService, seasonNameService, titleService, defaultFilterService) {
        if ("undefined" != typeof $stateParams.archiveSeason) {
            var chartId = seasonIdService.convert($stateParams.archiveSeason);
            Api.show(chartId, "chart/archive")
        } else if ("" == $stateParams.chartSeason) $state.go("chart", {
            chartSeason: "spring",
            location: !0,
            reload: !0,
            inherit: !1,
            notify: !1
        });
        else {
            if ("tba" == $stateParams.chartSeason || "airing" == $stateParams.chartSeason) {
                var chartId = $stateParams.chartSeason;
                "airing" == $stateParams.chartSeason && ($scope.order = "anime.airing.countdown")
            } else var chartId = seasonIdService.convert($stateParams.chartSeason);
            Api.show(chartId, "chart")
        }
        titleService.set(seasonNameService.convert(chartId + "")), $scope.hoverShow = function(id) {
            $scope.hoverId = id
        }, $scope.infoSlide = function(id) {
            $scope.slideId = id
        }, $scope.hlvalue = 1, $scope.$on("ngRepeatFinished", function() {
            NProgress.done(), defaultFilterService.hide()
        })
    }), app.controller("settingsController", function($scope, titleService, flashService, animeTitleService, outgoingLinkService, templateService, orderService, darkModeService, defaultFilterService) {
        NProgress.done(), titleService.set("Settings"), $scope.title = animeTitleService.get(), $scope.defaultFilters = defaultFilterService.get(), $scope.darkMode = darkModeService.get(), $scope.order = orderService.get(), $scope.template = templateService.get(), $scope.setTitle = function() {
            animeTitleService.set($scope.title)
        }, $scope.setLinks = function() {
            outgoingLinkService.set($scope.outLink), "hb_link" == $scope.outLink && flashService.set("HummingBird Links are not yet supported in the achive charts, and may not be 100% sustained in the current season charts.")
        }, $scope.setTemplate = function() {
            templateService.set($scope.template)
        }, $scope.setOrder = function() {
            orderService.set($scope.order)
        }, $scope.setFitler = function() {
            defaultFilterService.set($scope.newFilter), $scope.newFilter = "", $scope.defaultFilters = defaultFilterService.get()
        }, $scope.setdarkMode = function() {
            darkModeService.set($scope.darkMode)
        }, $scope.removeFitler = function(f) {
            defaultFilterService.del(f), $scope.defaultFilters = defaultFilterService.get()
        }, $scope.setTempView = function(view) {
            templateService.tempSet(view)
        }, $scope.setTempOrder = function(order) {
            orderService.tempSet(order)
        }
    }), app.controller("videoController", function($scope, $stateParams, $timeout, $http) {
        function getClosestTo(val, array) {
            if (void 0 !== array[val]) return val;
            for (var upper = val, upperMatched = !1, lower = val, lowerMatched = !1; upper < this.length;)
                if (void 0 !== array[++upper]) {
                    upperMatched = !0;
                    break
                }
            for (; lower > -1;)
                if (void 0 !== array[--lower]) {
                    lowerMatched = !0;
                    break
                }
            return upperMatched && lowerMatched ? val - lower > upper - val ? upper : lower : upperMatched ? upper : lowerMatched ? lower : -1
        }
        NProgress.done(), $scope.theBestVideo = "https://www.youtube.com/watch?v=hnROJrR0GhY#t=185s", $scope.videoVars = {
            autoplay: 1
        }, $http.get("/api/video").success(function(data) {
            console.log(data), videoData = data, $timeout(currentTime, 1e3)
        }), currentTime = function() {
            $scope.t = $scope.vid.getCurrentTime().toFixed(0), $timeout(currentTime, 1e3), $scope.a = videoData[getClosestTo($scope.t, videoData)], console.log(1)
        }
    }), $(document).ready(function() {
        $(".scrollToTop").on("click", function() {
            $("html, body").animate({
                scrollTop: "0"
            })
        })
    }), app.factory("ApiGet", function($http, chartSession) {
        return {
            show: function(id, uri) {
                return $http.get("http://anichart.net/api/" + uri + "/" + id + "?c=" + chartSession)
            }
        }
    }), app.factory("Api", function($rootScope, $http, ApiGet) {
        return {
            show: function(id, uri) {
                $rootScope.chart = [], ApiGet.show(id, uri).success(function(data) {
                    $rootScope.chart = data, $rootScope.chartTime = 0, $rootScope.$apply, "undefined" != typeof $rootScope.chart[0] && ($rootScope.listChart = $rootScope.chart[0].concat($rootScope.chart[1]).concat($rootScope.chart[2]).concat($rootScope.chart[3]).concat($rootScope.chart[4]))
                }), $rootScope.$apply
            }
        }
    }), app.directive("hoverIntent", ["$timeout", function($timeout) {
        return {
            restrict: "A",
            link: function(scope, element, attributes) {
                var hoverIntentPromise;
                element.bind("mouseenter", function(event) {
                    var delay = scope.$eval(attributes.hoverIntentDelay);
                    void 0 === delay && (delay = 500), hoverIntentPromise = $timeout(function() {
                        scope.$eval(attributes.hoverIntent, {
                            $event: event
                        })
                    }, delay)
                }), element.bind("mouseleave", function() {
                    $timeout.cancel(hoverIntentPromise)
                })
            }
        }
    }]), app.directive("onFinishRenderFilters", function($timeout) {
        return {
            restrict: "A",
            link: function(scope) {
                scope.$last === !0 && $timeout(function() {
                    scope.$emit("ngRepeatFinished")
                })
            }
        }
    }), app.filter("encodeUri", function($window) {
        return $window.encodeURIComponent
    }), app.directive("resizeDes", function() {
        return function(scope, element) {
            element.next().ready(function() {
                element.parent().parent().children().ready(function() {
                    element.parent().children().ready(function() {
                        element.css("height", 275 - element.parent().parent().children()[5].clientHeight - element.parent().children()[0].clientHeight - element.next()[0].clientHeight + "px")
                    })
                })
            })
        }
    }), app.directive("highlighter", function(cookieService) {
        function link($scope, element, attrs) {
            $scope.$watch(attrs.highlight, function(value) {
                if (1 != value) {
                    var color = value.replace(/[0-9]/g, "");
                    highlightToggle = element.hasClass(color) ? 1 : 0, element.removeClass("green"), element.removeClass("red"), element.removeClass("yellow"), 1 == highlightToggle ? (element.removeClass(color), cookieService.set(attrs.id, null)) : (element.addClass(color), cookieService.set(attrs.id, color))
                } else color = cookieService.get(attrs.id), element.addClass(color)
            })
        }
        return {
            link: link
        }
    }), app.filter("noSpace", function() {
        return function(value) {
            return value ? value.replace(/ /g, "").replace(/\//g, "") : ""
        }
    }), app.factory("flashService", function($rootScope) {
        return {
            set: function(message) {
                $rootScope.flash = message
            },
            clear: function() {
                $rootScope.flash = ""
            }
        }
    }), app.factory("titleService", function($rootScope) {
        return {
            set: function(message) {
                $rootScope.title = message + " - "
            },
            clear: function() {
                $rootScope.title = ""
            }
        }
    }), app.factory("seasonIdService", function() {
        return {
            convert: function(season) {
                if ("winter" == season) return 151;
                if ("spring" == season) return 152;
                if ("summer" == season) return 153;
                if ("fall" == season) return 144;
                if (0 != season.indexOf("-")) {
                    var s = season.split("-");
                    return "winter" == s[0] ? s[0] = 1 : "spring" == s[0] ? s[0] = 2 : "summer" == s[0] ? s[0] = 3 : "fall" == s[0] && (s[0] = 4), "" + s[1] + s[0]
                }
                return 141
            }
        }
    }), app.factory("seasonNameService", function() {
        return {
            convert: function(seasonId) {
                if ("tba" == seasonId) return "To Be Announced";
                if ("airing" == seasonId) return "Currently Airing";
                var season = seasonId[2];
                1 == season ? season = "winter" : 2 == season ? season = "spring" : 3 == season ? season = "summer" : 4 == season && (season = "fall"), season = angular.uppercase(season[0]) + season.substring(1);
                var year = seasonId[0] + seasonId[1];
                return year = year >= 40 && 99 >= year ? 19 + year : 20 + year, season + " " + year
            }
        }
    }), app.factory("animeTitleService", function($rootScope, cookieService) {
        return {
            set: function(title) {
                var cTitle = cookieService.get("animeTitle");
                "undefined" == typeof title ? "" == cTitle && cookieService.set("animeTitle", "title_romaji") : cookieService.set("animeTitle", title), cTitle = cookieService.get("animeTitle"), $rootScope.animeTitle = cTitle, $rootScope.animeTitleOrder = "anime." + cTitle, $rootScope.animeTitleName = "title_eng" == cTitle ? "English" : "title_romaji" == cTitle ? "Romaji" : "Japense"
            },
            get: function() {
                return $rootScope.animeTitle
            }
        }
    }), app.factory("outgoingLinkService", function($rootScope, cookieService) {
        return {
            set: function(site) {
                var cSite = cookieService.get("outLink");
                "undefined" == typeof site && (site = "" == cSite ? "anilist_link" : cSite), cookieService.set("outLink", site), $rootScope.outLink = site
            },
            get: function() {
                return $rootScope.outLink
            }
        }
    }), app.factory("localStorageService", function() {
        return {
            set: function(key, value) {
                try {
                    return localStorage.setItem(key, value)
                } catch (e) {
                    return localStorage.clear(), localStorage.setItem(key, value)
                }
            },
            get: function(key) {
                return localStorage.getItem(key)
            },
            support: function() {
                return "undefined" != typeof Storage ? !0 : !1
            }
        }
    }), app.factory("cookieService", function() {
        return {
            set: function(key, value) {
                document.cookie = key + "=" + value + "; expires=Thu, 18 Dec 2020 12:00:00 GMT"
            },
            get: function(key) {
                for (var name = key + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
                    var c = ca[i].trim();
                    if (0 == c.indexOf(name)) return c.substring(name.length, c.length)
                }
                return ""
            }
        }
    }), app.factory("templateService", function($rootScope, cookieService) {
        return {
            set: function(template) {
                cookieService.set("template", template), $rootScope.template = template
            },
            get: function() {
                var template = cookieService.get("template");
                return "undefined" == typeof template && (template = "chart"), $rootScope.template = template, template
            },
            tempSet: function(template) {
                $rootScope.template = template
            }
        }
    }), app.factory("orderService", function($rootScope, cookieService) {
        return {
            set: function(order) {
                cookieService.set("order", order), $rootScope.order = order
            },
            get: function() {
                var order = cookieService.get("order");
                return $rootScope.order = order, order
            },
            tempSet: function(order) {
                $rootScope.order = order
            }
        }
    }), app.factory("darkModeService", function($rootScope, cookieService) {
        return {
            set: function(option) {
                cookieService.set("darkmode", option), $rootScope.darkmode = option
            },
            get: function() {
                return $rootScope.darkmode = cookieService.get("darkmode"), cookieService.get("darkmode")
            }
        }
    }), app.factory("defaultFilterService", function($rootScope, cookieService) {
        return {
            set: function(g) {
                var currentGenres = cookieService.get("hiddenDefault");
                void 0 != typeof g && "" != g && -1 == currentGenres.indexOf(g) && (void 0 != typeof currentGenres && "" != currentGenres ? cookieService.set("hiddenDefault", [currentGenres, g]) : cookieService.set("hiddenDefault", [g]))
            },
            get: function() {
                return cookieService.get("hiddenDefault").split(",")
            },
            del: function(g) {
                var currentGenres = cookieService.get("hiddenDefault").split(","),
                    newGenres = [];
                $.each(currentGenres, function(index, gen) {
                    gen != g && newGenres.push(gen)
                }), cookieService.set("hiddenDefault", newGenres)
            },
            hide: function() {
                var defaultFilter = cookieService.get("hiddenDefault").split(","),
                    toHide = [];
                void 0 != typeof defaultFilter && "" != defaultFilter && ($.each(defaultFilter, function(index, filterValue) {
                    $(".genFilter").each(function() {
                        var parent = $(this).parent().attr("id"); - 1 != $(this).text().toLowerCase().indexOf(filterValue.toLowerCase()) && toHide.push(parent)
                    })
                }), "[]" != toHide && $.each(toHide, function(index, hide) {
                    $("#" + hide).hide()
                }))
            }
        }
    }),
    function(p, h, q) {
        "use strict";

        function E(a) {
            var e = [];
            return s(e, h.noop).chars(a), e.join("")
        }

        function k(a) {
            var e = {};
            a = a.split(",");
            var d;
            for (d = 0; d < a.length; d++) e[a[d]] = !0;
            return e
        }

        function F(a, e) {
            function d(a, b, d, g) {
                if (b = h.lowercase(b), t[b])
                    for (; f.last() && u[f.last()];) c("", f.last());
                v[b] && f.last() == b && c("", b), (g = w[b] || !!g) || f.push(b);
                var l = {};
                d.replace(G, function(a, b, e, c, d) {
                    l[b] = r(e || c || d || "")
                }), e.start && e.start(b, l, g)
            }

            function c(a, b) {
                var d, c = 0;
                if (b = h.lowercase(b))
                    for (c = f.length - 1; c >= 0 && f[c] != b; c--);
                if (c >= 0) {
                    for (d = f.length - 1; d >= c; d--) e.end && e.end(f[d]);
                    f.length = c
                }
            }
            var b, g, f = [],
                l = a;
            for (f.last = function() {
                    return f[f.length - 1]
                }; a;) {
                if (g = !0, f.last() && x[f.last()] ? (a = a.replace(RegExp("(.*)<\\s*\\/\\s*" + f.last() + "[^>]*>", "i"), function(b, a) {
                        return a = a.replace(H, "$1").replace(I, "$1"), e.chars && e.chars(r(a)), ""
                    }), c("", f.last())) : (0 === a.indexOf("<!--") ? (b = a.indexOf("--", 4), b >= 0 && a.lastIndexOf("-->", b) === b && (e.comment && e.comment(a.substring(4, b)), a = a.substring(b + 3), g = !1)) : y.test(a) ? (b = a.match(y)) && (a = a.replace(b[0], ""), g = !1) : J.test(a) ? (b = a.match(z)) && (a = a.substring(b[0].length), b[0].replace(z, c), g = !1) : K.test(a) && (b = a.match(A)) && (a = a.substring(b[0].length), b[0].replace(A, d), g = !1), g && (b = a.indexOf("<"), g = 0 > b ? a : a.substring(0, b), a = 0 > b ? "" : a.substring(b), e.chars && e.chars(r(g)))), a == l) throw L("badparse", a);
                l = a
            }
            c()
        }

        function r(a) {
            if (!a) return "";
            var e = M.exec(a);
            a = e[1];
            var d = e[3];
            return (e = e[2]) && (n.innerHTML = e.replace(/</g, "&lt;"), e = "textContent" in n ? n.textContent : n.innerText), a + e + d
        }

        function B(a) {
            return a.replace(/&/g, "&amp;").replace(N, function(a) {
                return "&#" + a.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function s(a, e) {
            var d = !1,
                c = h.bind(a, a.push);
            return {
                start: function(a, g, f) {
                    a = h.lowercase(a), !d && x[a] && (d = a), d || !0 !== C[a] || (c("<"), c(a), h.forEach(g, function(d, f) {
                        var g = h.lowercase(f),
                            k = "img" === a && "src" === g || "background" === g;
                        !0 !== O[g] || !0 === D[g] && !e(d, k) || (c(" "), c(f), c('="'), c(B(d)), c('"'))
                    }), c(f ? "/>" : ">"))
                },
                end: function(a) {
                    a = h.lowercase(a), d || !0 !== C[a] || (c("</"), c(a), c(">")), a == d && (d = !1)
                },
                chars: function(a) {
                    d || c(B(a))
                }
            }
        }
        var L = h.$$minErr("$sanitize"),
            A = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
            z = /^<\s*\/\s*([\w:-]+)[^>]*>/,
            G = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
            K = /^</,
            J = /^<\s*\//,
            H = /\x3c!--(.*?)--\x3e/g,
            y = /<!DOCTYPE([^>]*?)>/i,
            I = /<!\[CDATA\[(.*?)]]\x3e/g,
            N = /([^\#-~| |!])/g,
            w = k("area,br,col,hr,img,wbr");
        p = k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), q = k("rp,rt");
        var v = h.extend({}, q, p),
            t = h.extend({}, p, k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
            u = h.extend({}, q, k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
            x = k("script,style"),
            C = h.extend({}, w, t, u, v),
            D = k("background,cite,href,longdesc,src,usemap"),
            O = h.extend({}, D, k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),
            n = document.createElement("pre"),
            M = /^(\s*)([\s\S]*?)(\s*)$/;
        h.module("ngSanitize", []).provider("$sanitize", function() {
            this.$get = ["$$sanitizeUri", function(a) {
                return function(e) {
                    var d = [];
                    return F(e, s(d, function(c, b) {
                        return !/^unsafe/.test(a(c, b))
                    })), d.join("")
                }
            }]
        }), h.module("ngSanitize").filter("linky", ["$sanitize", function(a) {
            var e = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
                d = /^mailto:/;
            return function(c, b) {
                function g(a) {
                    a && m.push(E(a))
                }

                function f(a, c) {
                    m.push("<a "), h.isDefined(b) && (m.push('target="'), m.push(b), m.push('" ')), m.push('href="'), m.push(a), m.push('">'), g(c), m.push("</a>")
                }
                if (!c) return c;
                for (var l, n, p, k = c, m = []; l = k.match(e);) n = l[0], l[2] == l[3] && (n = "mailto:" + n), p = l.index, g(k.substr(0, p)), f(n, l[0].replace(d, "")), k = k.substring(p + l[0].length);
                return g(k), a(m.join(""))
            }
        }])
    }(window, window.angular), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
    function(a, b, c) {
        "use strict";

        function d(a, b) {
            return I(new(I(function() {}, {
                prototype: a
            })), b)
        }

        function e(a) {
            return H(arguments, function(b) {
                b !== a && H(b, function(b, c) {
                    a.hasOwnProperty(c) || (a[c] = b)
                })
            }), a
        }

        function f(a, b) {
            var c = [];
            for (var d in a.path) {
                if (a.path[d] !== b.path[d]) break;
                c.push(a.path[d])
            }
            return c
        }

        function g(a, b) {
            if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);
            var c = a.length >>> 0,
                d = Number(arguments[2]) || 0;
            for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)
                if (d in a && a[d] === b) return d;
            return -1
        }

        function h(a, b, c, d) {
            var e, h = f(c, d),
                i = {},
                j = [];
            for (var k in h)
                if (h[k].params && h[k].params.length) {
                    e = h[k].params;
                    for (var l in e) g(j, e[l]) >= 0 || (j.push(e[l]), i[e[l]] = a[e[l]])
                }
            return I({}, i, b)
        }

        function i(a, b) {
            var c = {};
            return H(a, function(a) {
                var d = b[a];
                c[a] = null != d ? String(d) : null
            }), c
        }

        function j(a, b, c) {
            if (!c) {
                c = [];
                for (var d in a) c.push(d)
            }
            for (var e = 0; e < c.length; e++) {
                var f = c[e];
                if (a[f] != b[f]) return !1
            }
            return !0
        }

        function k(a, b) {
            var c = {};
            return H(a, function(a) {
                c[a] = b[a]
            }), c
        }

        function l(a, b) {
            var d = 1,
                f = 2,
                g = {},
                h = [],
                i = g,
                j = I(a.when(g), {
                    $$promises: g,
                    $$values: g
                });
            this.study = function(g) {
                function k(a, c) {
                    if (o[c] !== f) {
                        if (n.push(c), o[c] === d) throw n.splice(0, n.indexOf(c)), new Error("Cyclic dependency: " + n.join(" -> "));
                        if (o[c] = d, E(a)) m.push(c, [function() {
                            return b.get(a)
                        }], h);
                        else {
                            var e = b.annotate(a);
                            H(e, function(a) {
                                a !== c && g.hasOwnProperty(a) && k(g[a], a)
                            }), m.push(c, a, e)
                        }
                        n.pop(), o[c] = f
                    }
                }

                function l(a) {
                    return F(a) && a.then && a.$$promises
                }
                if (!F(g)) throw new Error("'invocables' must be an object");
                var m = [],
                    n = [],
                    o = {};
                return H(g, k), g = n = o = null,
                    function(d, f, g) {
                        function h() {
                            --s || (t || e(r, f.$$values), p.$$values = r, p.$$promises = !0, o.resolve(r))
                        }

                        function k(a) {
                            p.$$failure = a, o.reject(a)
                        }

                        function n(c, e, f) {
                            function i(a) {
                                l.reject(a), k(a)
                            }

                            function j() {
                                if (!C(p.$$failure)) try {
                                    l.resolve(b.invoke(e, g, r)), l.promise.then(function(a) {
                                        r[c] = a, h()
                                    }, i)
                                } catch (a) {
                                    i(a)
                                }
                            }
                            var l = a.defer(),
                                m = 0;
                            H(f, function(a) {
                                q.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, q[a].then(function(b) {
                                    r[a] = b, --m || j()
                                }, i))
                            }), m || j(), q[c] = l.promise
                        }
                        if (l(d) && g === c && (g = f, f = d, d = null), d) {
                            if (!F(d)) throw new Error("'locals' must be an object")
                        } else d = i;
                        if (f) {
                            if (!l(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                        } else f = j;
                        var o = a.defer(),
                            p = o.promise,
                            q = p.$$promises = {},
                            r = I({}, d),
                            s = 1 + m.length / 3,
                            t = !1;
                        if (C(f.$$failure)) return k(f.$$failure), p;
                        f.$$values ? (t = e(r, f.$$values), h()) : (I(q, f.$$promises), f.then(h, k));
                        for (var u = 0, v = m.length; v > u; u += 3) d.hasOwnProperty(m[u]) ? h() : n(m[u], m[u + 1], m[u + 2]);
                        return p
                    }
            }, this.resolve = function(a, b, c, d) {
                return this.study(a)(b, c, d)
            }
        }

        function m(a, b, c) {
            this.fromConfig = function(a, b, c) {
                return C(a.template) ? this.fromString(a.template, b) : C(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : C(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
            }, this.fromString = function(a, b) {
                return D(a) ? a(b) : a
            }, this.fromUrl = function(c, d) {
                return D(c) && (c = c(d)), null == c ? null : a.get(c, {
                    cache: b
                }).then(function(a) {
                    return a.data
                })
            }, this.fromProvider = function(a, b, d) {
                return c.invoke(a, null, d || {
                    params: b
                })
            }
        }

        function n(a) {
            function b(b) {
                if (!/^\w+(-+\w+)*$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
                if (f[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
                f[b] = !0, j.push(b)
            }

            function c(a) {
                return a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&")
            }
            var d, e = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                f = {},
                g = "^",
                h = 0,
                i = this.segments = [],
                j = this.params = [];
            this.source = a;
            for (var k, l, m;
                (d = e.exec(a)) && (k = d[2] || d[3], l = d[4] || ("*" == d[1] ? ".*" : "[^/]*"), m = a.substring(h, d.index), !(m.indexOf("?") >= 0));) g += c(m) + "(" + l + ")", b(k), i.push(m), h = e.lastIndex;
            m = a.substring(h);
            var n = m.indexOf("?");
            if (n >= 0) {
                var o = this.sourceSearch = m.substring(n);
                m = m.substring(0, n), this.sourcePath = a.substring(0, h + n), H(o.substring(1).split(/[&?]/), b)
            } else this.sourcePath = a, this.sourceSearch = "";
            g += c(m) + "$", i.push(m), this.regexp = new RegExp(g), this.prefix = i[0]
        }

        function o() {
            this.compile = function(a) {
                return new n(a)
            }, this.isMatcher = function(a) {
                return F(a) && D(a.exec) && D(a.format) && D(a.concat)
            }, this.$get = function() {
                return this
            }
        }

        function p(a) {
            function b(a) {
                var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
                return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
            }

            function c(a, b) {
                return a.replace(/\$(\$|\d{1,2})/, function(a, c) {
                    return b["$" === c ? 0 : Number(c)]
                })
            }

            function d(a, b, c) {
                if (!c) return !1;
                var d = a.invoke(b, b, {
                    $match: c
                });
                return C(d) ? d : !0
            }
            var e = [],
                f = null;
            this.rule = function(a) {
                if (!D(a)) throw new Error("'rule' must be a function");
                return e.push(a), this
            }, this.otherwise = function(a) {
                if (E(a)) {
                    var b = a;
                    a = function() {
                        return b
                    }
                } else if (!D(a)) throw new Error("'rule' must be a function");
                return f = a, this
            }, this.when = function(e, f) {
                var g, h = E(f);
                if (E(e) && (e = a.compile(e)), !h && !D(f) && !G(f)) throw new Error("invalid 'handler' in when()");
                var i = {
                        matcher: function(b, c) {
                            return h && (g = a.compile(c), c = ["$match", function(a) {
                                return g.format(a)
                            }]), I(function(a, e) {
                                return d(a, c, b.exec(e.path(), e.search()))
                            }, {
                                prefix: E(b.prefix) ? b.prefix : ""
                            })
                        },
                        regex: function(a, e) {
                            if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");
                            return h && (g = e, e = ["$match", function(a) {
                                return c(g, a)
                            }]), I(function(b, c) {
                                return d(b, e, a.exec(c.path()))
                            }, {
                                prefix: b(a)
                            })
                        }
                    },
                    j = {
                        matcher: a.isMatcher(e),
                        regex: e instanceof RegExp
                    };
                for (var k in j)
                    if (j[k]) return this.rule(i[k](e, f));
                throw new Error("invalid 'what' in when()")
            }, this.$get = ["$location", "$rootScope", "$injector", function(a, b, c) {
                function d(b) {
                    function d(b) {
                        var d = b(c, a);
                        return d ? (E(d) && a.replace().url(d), !0) : !1
                    }
                    if (!b || !b.defaultPrevented) {
                        var g, h = e.length;
                        for (g = 0; h > g; g++)
                            if (d(e[g])) return;
                        f && d(f)
                    }
                }
                return b.$on("$locationChangeSuccess", d), {
                    sync: function() {
                        d()
                    }
                }
            }]
        }

        function q(a, e, f) {
            function g(a) {
                return 0 === a.indexOf(".") || 0 === a.indexOf("^")
            }

            function l(a, b) {
                var d = E(a),
                    e = d ? a : a.name,
                    f = g(e);
                if (f) {
                    if (!b) throw new Error("No reference point given for path '" + e + "'");
                    for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)
                        if ("" !== h[i] || 0 !== i) {
                            if ("^" !== h[i]) break;
                            if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                            k = k.parent
                        } else k = b;
                    h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
                }
                var l = w[e];
                return !l || !d && (d || l !== a && l.self !== a) ? c : l
            }

            function m(a, b) {
                x[a] || (x[a] = []), x[a].push(b)
            }

            function n(b) {
                b = d(b, {
                    self: b,
                    resolve: b.resolve || {},
                    toString: function() {
                        return this.name
                    }
                });
                var c = b.name;
                if (!E(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");
                if (w.hasOwnProperty(c)) throw new Error("State '" + c + "'' is already defined");
                var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : E(b.parent) ? b.parent : "";
                if (e && !w[e]) return m(e, b.self);
                for (var f in z) D(z[f]) && (b[f] = z[f](b, z.$delegates[f]));
                if (w[c] = b, !b[y] && b.url && a.when(b.url, ["$match", "$stateParams", function(a, c) {
                        v.$current.navigable == b && j(a, c) || v.transitionTo(b, a, {
                            location: !1
                        })
                    }]), x[c])
                    for (var g = 0; g < x[c].length; g++) n(x[c][g]);
                return b
            }

            function o(a) {
                return a.indexOf("*") > -1
            }

            function p(a) {
                var b = a.split("."),
                    c = v.$current.name.split(".");
                if ("**" === b[0] && (c = c.slice(c.indexOf(b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(c.indexOf(b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length) return !1;
                for (var d = 0, e = b.length; e > d; d++) "*" === b[d] && (c[d] = "*");
                return c.join("") === b.join("")
            }

            function q(a, b) {
                return E(a) && !C(b) ? z[a] : D(b) && E(a) ? (z[a] && !z.$delegates[a] && (z.$delegates[a] = z[a]), z[a] = b, this) : this
            }

            function r(a, b) {
                return F(a) ? b = a : b.name = a, n(b), this
            }

            function s(a, e, g, m, n, q, r, s, x) {
                function z() {
                    r.url() !== M && (r.url(M), r.replace())
                }

                function A(a, c, d, f, h) {
                    var i = d ? c : k(a.params, c),
                        j = {
                            $stateParams: i
                        };
                    h.resolve = n.resolve(a.resolve, j, h.resolve, a);
                    var l = [h.resolve.then(function(a) {
                        h.globals = a
                    })];
                    return f && l.push(f), H(a.views, function(c, d) {
                        var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
                        e.$template = [function() {
                            return g.load(d, {
                                view: c,
                                locals: j,
                                params: i,
                                notify: !1
                            }) || ""
                        }], l.push(n.resolve(e, j, h.resolve, a).then(function(f) {
                            if (D(c.controllerProvider) || G(c.controllerProvider)) {
                                var g = b.extend({}, e, j);
                                f.$$controller = m.invoke(c.controllerProvider, null, g)
                            } else f.$$controller = c.controller;
                            f.$$state = a, f.$$controllerAs = c.controllerAs, h[d] = f
                        }))
                    }), e.all(l).then(function() {
                        return h
                    })
                }
                var B = e.reject(new Error("transition superseded")),
                    F = e.reject(new Error("transition prevented")),
                    K = e.reject(new Error("transition aborted")),
                    L = e.reject(new Error("transition failed")),
                    M = r.url(),
                    N = x.baseHref();
                return u.locals = {
                    resolve: null,
                    globals: {
                        $stateParams: {}
                    }
                }, v = {
                    params: {},
                    current: u.self,
                    $current: u,
                    transition: null
                }, v.reload = function() {
                    v.transitionTo(v.current, q, {
                        reload: !0,
                        inherit: !1,
                        notify: !1
                    })
                }, v.go = function(a, b, c) {
                    return this.transitionTo(a, b, I({
                        inherit: !0,
                        relative: v.$current
                    }, c))
                }, v.transitionTo = function(b, c, f) {
                    c = c || {}, f = I({
                        location: !0,
                        inherit: !1,
                        relative: null,
                        notify: !0,
                        reload: !1,
                        $retry: !1
                    }, f || {});
                    var g, k = v.$current,
                        n = v.params,
                        o = k.path,
                        p = l(b, f.relative);
                    if (!C(p)) {
                        var s = {
                            to: b,
                            toParams: c,
                            options: f
                        };
                        if (g = a.$broadcast("$stateNotFound", s, k.self, n), g.defaultPrevented) return z(), K;
                        if (g.retry) {
                            if (f.$retry) return z(), L;
                            var w = v.transition = e.when(g.retry);
                            return w.then(function() {
                                return w !== v.transition ? B : (s.options.$retry = !0, v.transitionTo(s.to, s.toParams, s.options))
                            }, function() {
                                return K
                            }), z(), w
                        }
                        if (b = s.to, c = s.toParams, f = s.options, p = l(b, f.relative), !C(p)) {
                            if (f.relative) throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'");
                            throw new Error("No such state '" + b + "'")
                        }
                    }
                    if (p[y]) throw new Error("Cannot transition to abstract state '" + b + "'");
                    f.inherit && (c = h(q, c || {}, v.$current, p)), b = p;
                    var x, D, E = b.path,
                        G = u.locals,
                        H = [];
                    for (x = 0, D = E[x]; D && D === o[x] && j(c, n, D.ownParams) && !f.reload; x++, D = E[x]) G = H[x] = D.locals;
                    if (t(b, k, G, f)) return b.self.reloadOnSearch !== !1 && z(), v.transition = null, e.when(v.current);
                    if (c = i(b.params, c || {}), f.notify && (g = a.$broadcast("$stateChangeStart", b.self, c, k.self, n), g.defaultPrevented)) return z(), F;
                    for (var N = e.when(G), O = x; O < E.length; O++, D = E[O]) G = H[O] = d(G), N = A(D, c, D === b, N, G);
                    var P = v.transition = N.then(function() {
                        var d, e, g;
                        if (v.transition !== P) return B;
                        for (d = o.length - 1; d >= x; d--) g = o[d], g.self.onExit && m.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                        for (d = x; d < E.length; d++) e = E[d], e.locals = H[d], e.self.onEnter && m.invoke(e.self.onEnter, e.self, e.locals.globals);
                        if (v.transition !== P) return B;
                        v.$current = b, v.current = b.self, v.params = c, J(v.params, q), v.transition = null;
                        var h = b.navigable;
                        return f.location && h && (r.url(h.url.format(h.locals.globals.$stateParams)), "replace" === f.location && r.replace()), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, k.self, n), M = r.url(), v.current
                    }, function(d) {
                        return v.transition !== P ? B : (v.transition = null, a.$broadcast("$stateChangeError", b.self, c, k.self, n, d), z(), e.reject(d))
                    });
                    return P
                }, v.is = function(a, d) {
                    var e = l(a);
                    return C(e) ? v.$current !== e ? !1 : C(d) && null !== d ? b.equals(q, d) : !0 : c
                }, v.includes = function(a, d) {
                    if (E(a) && o(a)) {
                        if (!p(a)) return !1;
                        a = v.$current.name
                    }
                    var e = l(a);
                    if (!C(e)) return c;
                    if (!C(v.$current.includes[e.name])) return !1;
                    var f = !0;
                    return b.forEach(d, function(a, b) {
                        C(q[b]) && q[b] === a || (f = !1)
                    }), f
                }, v.href = function(a, b, c) {
                    c = I({
                        lossy: !0,
                        inherit: !1,
                        absolute: !1,
                        relative: v.$current
                    }, c || {});
                    var d = l(a, c.relative);
                    if (!C(d)) return null;
                    b = h(q, b || {}, v.$current, d);
                    var e = d && c.lossy ? d.navigable : d,
                        g = e && e.url ? e.url.format(i(d.params, b || {})) : null;
                    return !f.html5Mode() && g && (g = "#" + f.hashPrefix() + g), "/" !== N && (f.html5Mode() ? g = N.slice(0, -1) + g : c.absolute && (g = N.slice(1) + g)), c.absolute && g && (g = r.protocol() + "://" + r.host() + (80 == r.port() || 443 == r.port() ? "" : ":" + r.port()) + (!f.html5Mode() && g ? "/" : "") + g), g
                }, v.get = function(a, b) {
                    if (!C(a)) {
                        var c = [];
                        return H(w, function(a) {
                            c.push(a.self)
                        }), c
                    }
                    var d = l(a, b);
                    return d && d.self ? d.self : null
                }, v
            }

            function t(a, b, c, d) {
                return a !== b || (c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1 ? void 0 : !0
            }
            var u, v, w = {},
                x = {},
                y = "abstract",
                z = {
                    parent: function(a) {
                        if (C(a.parent) && a.parent) return l(a.parent);
                        var b = /^(.+)\.[^.]+$/.exec(a.name);
                        return b ? l(b[1]) : u
                    },
                    data: function(a) {
                        return a.parent && a.parent.data && (a.data = a.self.data = I({}, a.parent.data, a.data)), a.data
                    },
                    url: function(a) {
                        var b = a.url;
                        if (E(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1)) : (a.parent.navigable || u).url.concat(b);
                        if (e.isMatcher(b) || null == b) return b;
                        throw new Error("Invalid url '" + b + "' in state '" + a + "'")
                    },
                    navigable: function(a) {
                        return a.url ? a : a.parent ? a.parent.navigable : null
                    },
                    params: function(a) {
                        if (!a.params) return a.url ? a.url.parameters() : a.parent.params;
                        if (!G(a.params)) throw new Error("Invalid params in state '" + a + "'");
                        if (a.url) throw new Error("Both params and url specicified in state '" + a + "'");
                        return a.params
                    },
                    views: function(a) {
                        var b = {};
                        return H(C(a.views) ? a.views : {
                            "": a
                        }, function(c, d) {
                            d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
                        }), b
                    },
                    ownParams: function(a) {
                        if (!a.parent) return a.params;
                        var b = {};
                        H(a.params, function(a) {
                            b[a] = !0
                        }), H(a.parent.params, function(c) {
                            if (!b[c]) throw new Error("Missing required parameter '" + c + "' in state '" + a.name + "'");
                            b[c] = !1
                        });
                        var c = [];
                        return H(b, function(a, b) {
                            a && c.push(b)
                        }), c
                    },
                    path: function(a) {
                        return a.parent ? a.parent.path.concat(a) : []
                    },
                    includes: function(a) {
                        var b = a.parent ? I({}, a.parent.includes) : {};
                        return b[a.name] = !0, b
                    },
                    $delegates: {}
                };
            u = n({
                name: "",
                url: "^",
                views: null,
                "abstract": !0
            }), u.navigable = null, this.decorator = q, this.state = r, this.$get = s, s.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$location", "$urlRouter", "$browser"]
        }

        function r() {
            function a(a, b) {
                return {
                    load: function(c, d) {
                        var e, f = {
                            template: null,
                            controller: null,
                            view: null,
                            locals: null,
                            notify: !0,
                            async: !0,
                            params: {}
                        };
                        return d = I(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
                    }
                }
            }
            this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
        }

        function s() {
            var a = !1;
            this.useAnchorScroll = function() {
                a = !0
            }, this.$get = ["$anchorScroll", "$timeout", function(b, c) {
                return a ? b : function(a) {
                    c(function() {
                        a[0].scrollIntoView()
                    }, 0, !1)
                }
            }]
        }

        function t(a, c, d) {
            function e() {
                return c.has ? function(a) {
                    return c.has(a) ? c.get(a) : null
                } : function(a) {
                    try {
                        return c.get(a)
                    } catch (b) {
                        return null
                    }
                }
            }

            function f(a, b) {
                var c = function() {
                    return {
                        enter: function(a, b, c) {
                            b.after(a), c()
                        },
                        leave: function(a, b) {
                            a.remove(), b()
                        }
                    }
                };
                if (i) return {
                    enter: function(a, b, c) {
                        i.enter(a, null, b, c)
                    },
                    leave: function(a, b) {
                        i.leave(a, b)
                    }
                };
                if (h) {
                    var d = h && h(b, a);
                    return {
                        enter: function(a, b, c) {
                            d.enter(a, null, b), c()
                        },
                        leave: function(a, b) {
                            d.leave(a), b()
                        }
                    }
                }
                return c()
            }
            var g = e(),
                h = g("$animator"),
                i = g("$animate"),
                j = {
                    restrict: "ECA",
                    terminal: !0,
                    priority: 400,
                    transclude: "element",
                    compile: function(c, e, g) {
                        return function(c, e, h) {
                            function i() {
                                k && (k.remove(), k = null), m && (m.$destroy(), m = null), l && (q.leave(l, function() {
                                    k = null
                                }), k = l, l = null)
                            }

                            function j(f) {
                                var h = c.$new(),
                                    j = l && l.data("$uiViewName"),
                                    k = j && a.$current && a.$current.locals[j];
                                if (f || k !== n) {
                                    var r = g(h, function(a) {
                                        q.enter(a, e, function() {
                                            (b.isDefined(p) && !p || c.$eval(p)) && d(a)
                                        }), i()
                                    });
                                    n = a.$current.locals[r.data("$uiViewName")], l = r, m = h, m.$emit("$viewContentLoaded"), m.$eval(o)
                                }
                            }
                            var k, l, m, n, o = h.onload || "",
                                p = h.autoscroll,
                                q = f(h, c);
                            c.$on("$stateChangeSuccess", function() {
                                j(!1)
                            }), c.$on("$viewContentLoading", function() {
                                j(!1)
                            }), j(!0)
                        }
                    }
                };
            return j
        }

        function u(a, b, c) {
            return {
                restrict: "ECA",
                priority: -400,
                compile: function(d) {
                    var e = d.html();
                    return function(d, f, g) {
                        var h = g.uiView || g.name || "",
                            i = f.inheritedData("$uiView");
                        h.indexOf("@") < 0 && (h = h + "@" + (i ? i.state.name : "")), f.data("$uiViewName", h);
                        var j = c.$current,
                            k = j && j.locals[h];
                        if (k) {
                            f.data("$uiView", {
                                name: h,
                                state: k.$$state
                            }), f.html(k.$template ? k.$template : e);
                            var l = a(f.contents());
                            if (k.$$controller) {
                                k.$scope = d;
                                var m = b(k.$$controller, k);
                                k.$$controllerAs && (d[k.$$controllerAs] = m), f.data("$ngControllerController", m), f.children().data("$ngControllerController", m)
                            }
                            l(d)
                        }
                    }
                }
            }
        }

        function v(a) {
            var b = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
            if (!b || 4 !== b.length) throw new Error("Invalid state ref '" + a + "'");
            return {
                state: b[1],
                paramExpr: b[3] || null
            }
        }

        function w(a) {
            var b = a.parent().inheritedData("$uiView");
            return b && b.state && b.state.name ? b.state : void 0
        }

        function x(a, c) {
            var d = ["location", "inherit", "reload"];
            return {
                restrict: "A",
                require: "?^uiSrefActive",
                link: function(e, f, g, h) {
                    var i = v(g.uiSref),
                        j = null,
                        k = w(f) || a.$current,
                        l = "FORM" === f[0].nodeName,
                        m = l ? "action" : "href",
                        n = !0,
                        o = {
                            relative: k
                        },
                        p = e.$eval(g.uiSrefOpts) || {};
                    b.forEach(d, function(a) {
                        a in p && (o[a] = p[a])
                    });
                    var q = function(b) {
                        if (b && (j = b), n) {
                            var c = a.href(i.state, j, o);
                            return h && h.$$setStateInfo(i.state, j), c ? void(f[0][m] = c) : (n = !1, !1)
                        }
                    };
                    i.paramExpr && (e.$watch(i.paramExpr, function(a) {
                        a !== j && q(a)
                    }, !0), j = e.$eval(i.paramExpr)), q(), l || f.bind("click", function(b) {
                        var d = b.which || b.button;
                        d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target") || (c(function() {
                            a.go(i.state, j, o)
                        }), b.preventDefault())
                    })
                }
            }
        }

        function y(a, b, c) {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$attrs", function(d, e, f) {
                    function g() {
                        a.$current.self === i && h() ? e.addClass(l) : e.removeClass(l)
                    }

                    function h() {
                        return !k || j(k, b)
                    }
                    var i, k, l;
                    l = c(f.uiSrefActive || "", !1)(d), this.$$setStateInfo = function(b, c) {
                        i = a.get(b, w(e)), k = c, g()
                    }, d.$on("$stateChangeSuccess", g)
                }]
            }
        }

        function z(a) {
            return function(b) {
                return a.is(b)
            }
        }

        function A(a) {
            return function(b) {
                return a.includes(b)
            }
        }

        function B(a, b) {
            function e(a) {
                this.locals = a.locals.globals, this.params = this.locals.$stateParams
            }

            function f() {
                this.locals = null, this.params = null
            }

            function g(c, g) {
                if (null != g.redirectTo) {
                    var h, j = g.redirectTo;
                    if (E(j)) h = j;
                    else {
                        if (!D(j)) throw new Error("Invalid 'redirectTo' in when()");
                        h = function(a, b) {
                            return j(a, b.path(), b.search())
                        }
                    }
                    b.when(c, h)
                } else a.state(d(g, {
                    parent: null,
                    name: "route:" + encodeURIComponent(c),
                    url: c,
                    onEnter: e,
                    onExit: f
                }));
                return i.push(g), this
            }

            function h(a, b, d) {
                function e(a) {
                    return "" !== a.name ? a : c
                }
                var f = {
                    routes: i,
                    params: d,
                    current: c
                };
                return b.$on("$stateChangeStart", function(a, c, d, f) {
                    b.$broadcast("$routeChangeStart", e(c), e(f))
                }), b.$on("$stateChangeSuccess", function(a, c, d, g) {
                    f.current = e(c), b.$broadcast("$routeChangeSuccess", e(c), e(g)), J(d, f.params)
                }), b.$on("$stateChangeError", function(a, c, d, f, g, h) {
                    b.$broadcast("$routeChangeError", e(c), e(f), h)
                }), f
            }
            var i = [];
            e.$inject = ["$$state"], this.when = g, this.$get = h, h.$inject = ["$state", "$rootScope", "$routeParams"]
        }
        var C = b.isDefined,
            D = b.isFunction,
            E = b.isString,
            F = b.isObject,
            G = b.isArray,
            H = b.forEach,
            I = b.extend,
            J = b.copy;
        b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), l.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", l), m.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", m), n.prototype.concat = function(a) {
            return new n(this.sourcePath + a + this.sourceSearch)
        }, n.prototype.toString = function() {
            return this.source
        }, n.prototype.exec = function(a, b) {
            var c = this.regexp.exec(a);
            if (!c) return null;
            var d, e = this.params,
                f = e.length,
                g = this.segments.length - 1,
                h = {};
            if (g !== c.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
            for (d = 0; g > d; d++) h[e[d]] = c[d + 1];
            for (; f > d; d++) h[e[d]] = b[e[d]];
            return h
        }, n.prototype.parameters = function() {
            return this.params
        }, n.prototype.format = function(a) {
            var b = this.segments,
                c = this.params;
            if (!a) return b.join("");
            var d, e, f, g = b.length - 1,
                h = c.length,
                i = b[0];
            for (d = 0; g > d; d++) f = a[c[d]], null != f && (i += encodeURIComponent(f)), i += b[d + 1];
            for (; h > d; d++) f = a[c[d]], null != f && (i += (e ? "&" : "?") + c[d] + "=" + encodeURIComponent(f), e = !0);
            return i
        }, b.module("ui.router.util").provider("$urlMatcherFactory", o), p.$inject = ["$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", p), q.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider", "$locationProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", q), r.$inject = [], b.module("ui.router.state").provider("$view", r), b.module("ui.router.state").provider("$uiViewScroll", s), t.$inject = ["$state", "$injector", "$uiViewScroll"], u.$inject = ["$compile", "$controller", "$state"], b.module("ui.router.state").directive("uiView", t), b.module("ui.router.state").directive("uiView", u), x.$inject = ["$state", "$timeout"], y.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", x).directive("uiSrefActive", y), z.$inject = ["$state"], A.$inject = ["$state"], b.module("ui.router.state").filter("isState", z).filter("includedByState", A), B.$inject = ["$stateProvider", "$urlRouterProvider"], b.module("ui.router.compat").provider("$route", B).directive("ngView", t)
    }(window, window.angular), angular.module("youtube-embed", ["ng"]).service("youtubeEmbedUtils", ["$window", "$rootScope", function($window, $rootScope) {
        function contains(str, substr) {
            return str.indexOf(substr) > -1
        }
        var Service = {},
            youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi,
            timeRegexp = /t=(\d+)[ms]?(\d+)?s?/;
        return Service.getIdFromURL = function(url) {
                var id = url.replace(youtubeRegexp, "$1");
                if (contains(id, ";")) {
                    var pieces = id.split(";");
                    if (contains(pieces[1], "%")) {
                        var uriComponent = decodeURIComponent(id.split(";")[1]);
                        id = ("http://youtube.com" + uriComponent).replace(youtubeRegexp, "$1")
                    } else id = pieces[0]
                } else contains(id, "#") && (id = id.split("#")[0]);
                return id
            }, Service.getTimeFromURL = function(url) {
                url = url || "";
                var times = url.match(timeRegexp);
                if (!times) return 0;
                var full = times[0],
                    minutes = times[1],
                    seconds = times[2];
                return "undefined" != typeof seconds ? (seconds = parseInt(seconds, 10), minutes = parseInt(minutes, 10)) : contains(full, "m") ? (minutes = parseInt(minutes, 10), seconds = 0) : (seconds = parseInt(minutes, 10), minutes = 0), seconds + 60 * minutes
            },
            function() {
                var tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
            }(), Service.ready = !1, $window.onYouTubeIframeAPIReady = function() {
                $rootScope.$apply(function() {
                    Service.ready = !0
                })
            }, Service
    }]).directive("youtubeVideo", ["youtubeEmbedUtils", function(youtubeEmbedUtils) {
        var uniqId = 1,
            stateNames = {
                "-1": "unstarted",
                0: "ended",
                1: "playing",
                2: "paused",
                3: "buffering",
                5: "queued"
            },
            eventPrefix = "youtube.player.";
        return {
            restrict: "EA",
            scope: {
                videoId: "=?",
                videoUrl: "=?",
                player: "=?",
                playerVars: "=?",
                playerHeight: "=?",
                playerWidth: "=?"
            },
            link: function(scope, element, attrs) {
                function applyBroadcast() {
                    var args = Array.prototype.slice.call(arguments);
                    scope.$apply(function() {
                        scope.$emit.apply(scope, args)
                    })
                }

                function onPlayerStateChange(event) {
                    var state = stateNames[event.data];
                    "undefined" != typeof state && applyBroadcast(eventPrefix + state, scope.player, event), scope.$apply(function() {
                        scope.player.currentState = state
                    })
                }

                function onPlayerReady(event) {
                    applyBroadcast(eventPrefix + "ready", scope.player, event)
                }

                function createPlayer() {
                    var playerVars = angular.copy(scope.playerVars);
                    playerVars.start = playerVars.start || scope.urlStartTime;
                    var player = new YT.Player(playerId, {
                        height: scope.playerHeight,
                        width: scope.playerWidth,
                        videoId: scope.videoId,
                        playerVars: playerVars,
                        events: {
                            onReady: onPlayerReady,
                            onStateChange: onPlayerStateChange
                        }
                    });
                    return player.id = playerId, player
                }

                function loadPlayer() {
                    (scope.videoId || scope.playerVars.list) && (scope.player && scope.player.d && "function" == typeof scope.player.destroy && scope.player.destroy(), scope.player = createPlayer())
                }
                scope.utils = youtubeEmbedUtils;
                var playerId = attrs.playerId || element[0].id || "unique-youtube-embed-id-" + uniqId++;
                element[0].id = playerId, scope.playerHeight = scope.playerHeight || 390, scope.playerWidth = scope.playerWidth || 640, scope.playerVars = scope.playerVars || {};
                var stopWatchingReady = scope.$watch(function() {
                    return scope.utils.ready && ("undefined" != typeof scope.videoUrl || "undefined" != typeof scope.videoId || "undefined" != typeof scope.playerVars.list)
                }, function(ready) {
                    ready && (stopWatchingReady(), "undefined" != typeof scope.videoUrl ? scope.$watch("videoUrl", function(url) {
                        scope.videoId = scope.utils.getIdFromURL(url), scope.urlStartTime = scope.utils.getTimeFromURL(url), loadPlayer()
                    }) : "undefined" != typeof scope.videoId ? scope.$watch("videoId", function() {
                        scope.urlStartTime = null, loadPlayer()
                    }) : scope.$watch("playerVars.list", function() {
                        scope.urlStartTime = null, loadPlayer()
                    }))
                });
                scope.$watchCollection(["playerHeight", "playerWidth"], function() {
                    scope.player && scope.player.setSize(scope.playerWidth, scope.playerHeight)
                }), scope.$on("$destroy", function() {
                    scope.player && scope.player.destroy()
                })
            }
        }
    }]),
    function(factory) {
        "function" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : this.NProgress = factory()
    }(function() {
        function clamp(n, min, max) {
            return min > n ? min : n > max ? max : n
        }

        function toBarPerc(n) {
            return 100 * (-1 + n)
        }

        function barPositionCSS(n, speed, ease) {
            var barCSS;
            return barCSS = "translate3d" === Settings.positionUsing ? {
                transform: "translate3d(" + toBarPerc(n) + "%,0,0)"
            } : "translate" === Settings.positionUsing ? {
                transform: "translate(" + toBarPerc(n) + "%,0)"
            } : {
                "margin-left": toBarPerc(n) + "%"
            }, barCSS.transition = "all " + speed + "ms " + ease, barCSS
        }

        function hasClass(element, name) {
            var list = "string" == typeof element ? element : classList(element);
            return list.indexOf(" " + name + " ") >= 0
        }

        function addClass(element, name) {
            var oldList = classList(element),
                newList = oldList + name;
            hasClass(oldList, name) || (element.className = newList.substring(1))
        }

        function removeClass(element, name) {
            var newList, oldList = classList(element);
            hasClass(element, name) && (newList = oldList.replace(" " + name + " ", " "), element.className = newList.substring(1, newList.length - 1))
        }

        function classList(element) {
            return (" " + (element.className || "") + " ").replace(/\s+/gi, " ")
        }

        function removeElement(element) {
            element && element.parentNode && element.parentNode.removeChild(element)
        }
        var NProgress = {};
        NProgress.version = "0.1.3";
        var Settings = NProgress.settings = {
            minimum: .08,
            easing: "ease",
            positionUsing: "",
            speed: 200,
            trickle: !0,
            trickleRate: .02,
            trickleSpeed: 800,
            showSpinner: !0,
            barSelector: '[role="bar"]',
            spinnerSelector: '[role="spinner"]',
            template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        };
        NProgress.configure = function(options) {
                var key, value;
                for (key in options) value = options[key], void 0 !== value && options.hasOwnProperty(key) && (Settings[key] = value);
                return this
            }, NProgress.status = null, NProgress.set = function(n) {
                var started = NProgress.isStarted();
                n = clamp(n, Settings.minimum, 1), NProgress.status = 1 === n ? null : n;
                var progress = NProgress.render(!started),
                    bar = progress.querySelector(Settings.barSelector),
                    speed = Settings.speed,
                    ease = Settings.easing;
                return progress.offsetWidth, queue(function(next) {
                    "" === Settings.positionUsing && (Settings.positionUsing = NProgress.getPositioningCSS()), css(bar, barPositionCSS(n, speed, ease)), 1 === n ? (css(progress, {
                        transition: "none",
                        opacity: 1
                    }), progress.offsetWidth, setTimeout(function() {
                        css(progress, {
                            transition: "all " + speed + "ms linear",
                            opacity: 0
                        }), setTimeout(function() {
                            NProgress.remove(), next()
                        }, speed)
                    }, speed)) : setTimeout(next, speed)
                }), this
            }, NProgress.isStarted = function() {
                return "number" == typeof NProgress.status
            }, NProgress.start = function() {
                NProgress.status || NProgress.set(0);
                var work = function() {
                    setTimeout(function() {
                        NProgress.status && (NProgress.trickle(), work())
                    }, Settings.trickleSpeed)
                };
                return Settings.trickle && work(), this
            }, NProgress.done = function(force) {
                return force || NProgress.status ? NProgress.inc(.3 + .5 * Math.random()).set(1) : this
            }, NProgress.inc = function(amount) {
                var n = NProgress.status;
                return n ? ("number" != typeof amount && (amount = (1 - n) * clamp(Math.random() * n, .1, .95)), n = clamp(n + amount, 0, .994), NProgress.set(n)) : NProgress.start()
            }, NProgress.trickle = function() {
                return NProgress.inc(Math.random() * Settings.trickleRate)
            },
            function() {
                var initial = 0,
                    current = 0;
                NProgress.promise = function($promise) {
                    return $promise && "resolved" != $promise.state() ? (0 == current && NProgress.start(), initial++, current++, $promise.always(function() {
                        current--, 0 == current ? (initial = 0, NProgress.done()) : NProgress.set((initial - current) / initial)
                    }), this) : this
                }
            }(), NProgress.render = function(fromStart) {
                if (NProgress.isRendered()) return document.getElementById("nprogress");
                addClass(document.documentElement, "nprogress-busy");
                var progress = document.createElement("div");
                progress.id = "nprogress", progress.innerHTML = Settings.template;
                var spinner, bar = progress.querySelector(Settings.barSelector),
                    perc = fromStart ? "-100" : toBarPerc(NProgress.status || 0);
                return css(bar, {
                    transition: "all 0 linear",
                    transform: "translate3d(" + perc + "%,0,0)"
                }), Settings.showSpinner || (spinner = progress.querySelector(Settings.spinnerSelector), spinner && removeElement(spinner)), document.body.appendChild(progress), progress
            }, NProgress.remove = function() {
                removeClass(document.documentElement, "nprogress-busy");
                var progress = document.getElementById("nprogress");
                progress && removeElement(progress)
            }, NProgress.isRendered = function() {
                return !!document.getElementById("nprogress")
            }, NProgress.getPositioningCSS = function() {
                var bodyStyle = document.body.style,
                    vendorPrefix = "WebkitTransform" in bodyStyle ? "Webkit" : "MozTransform" in bodyStyle ? "Moz" : "msTransform" in bodyStyle ? "ms" : "OTransform" in bodyStyle ? "O" : "";
                return vendorPrefix + "Perspective" in bodyStyle ? "translate3d" : vendorPrefix + "Transform" in bodyStyle ? "translate" : "margin"
            };
        var queue = function() {
                function next() {
                    var fn = pending.shift();
                    fn && fn(next)
                }
                var pending = [];
                return function(fn) {
                    pending.push(fn), 1 == pending.length && next()
                }
            }(),
            css = function() {
                function camelCase(string) {
                    return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
                        return letter.toUpperCase()
                    })
                }

                function getVendorProp(name) {
                    var style = document.body.style;
                    if (name in style) return name;
                    for (var vendorName, i = cssPrefixes.length, capName = name.charAt(0).toUpperCase() + name.slice(1); i--;)
                        if (vendorName = cssPrefixes[i] + capName, vendorName in style) return vendorName;
                    return name
                }

                function getStyleProp(name) {
                    return name = camelCase(name), cssProps[name] || (cssProps[name] = getVendorProp(name))
                }

                function applyCss(element, prop, value) {
                    prop = getStyleProp(prop), element.style[prop] = value
                }
                var cssPrefixes = ["Webkit", "O", "Moz", "ms"],
                    cssProps = {};
                return function(element, properties) {
                    var prop, value, args = arguments;
                    if (2 == args.length)
                        for (prop in properties) value = properties[prop], void 0 !== value && properties.hasOwnProperty(prop) && applyCss(element, prop, value);
                    else applyCss(element, args[1], args[2])
                }
            }();
        return NProgress
    }), angular.module("timer", []).directive("timer", ["$compile", function($compile) {
        return {
            restrict: "EAC",
            replace: !1,
            scope: {
                interval: "=interval",
                startTimeAttr: "=startTime",
                endTimeAttr: "=endTime",
                countdownattr: "=countdown",
                autoStart: "&autoStart"
            },
            controller: ["$scope", "$element", "$attrs", "$timeout", function($scope, $element, $attrs, $timeout) {
                function resetTimeout() {
                    $scope.timeoutId && clearTimeout($scope.timeoutId)
                }

                function calculateTimeUnits() {
                    $scope.seconds = Math.floor($scope.millis / 1e3 % 60), $scope.secondsS = 1 == $scope.seconds ? "" : "s", $scope.minutes = Math.floor($scope.millis / 6e4 % 60), $scope.minutesS = 1 == $scope.minutes ? "" : "s", $scope.hours = Math.floor($scope.millis / 36e5 % 24), $scope.hoursS = 1 == $scope.hours ? "" : "s", $scope.days = Math.floor($scope.millis / 36e5 / 24), $scope.daysS = 1 == $scope.days ? "" : "s", $scope.sseconds = $scope.seconds < 10 ? "0" + $scope.seconds : $scope.seconds, $scope.mminutes = $scope.minutes < 10 ? "0" + $scope.minutes : $scope.minutes, $scope.hhours = $scope.hours < 10 ? "0" + $scope.hours : $scope.hours, $scope.ddays = $scope.days < 10 ? "0" + $scope.days : $scope.days
                }
                "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
                    return this.replace(/^\s+|\s+$/g, "")
                }), $scope.autoStart = $attrs.autoStart || $attrs.autostart, $element.append(0 === $element.html().trim().length ? $compile("<span>{{millis}}</span>")($scope) : $compile($element.contents())($scope)), $scope.startTime = null, $scope.endTime = null, $scope.timeoutId = null, $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) >= 0 ? parseInt($scope.countdownattr, 10) : void 0, $scope.isRunning = !1, $scope.$on("timer-start", function() {
                    $scope.start()
                }), $scope.$on("timer-resume", function() {
                    $scope.resume()
                }), $scope.$on("timer-stop", function() {
                    $scope.stop()
                }), $scope.$on("timer-clear", function() {
                    $scope.clear()
                }), $scope.$on("timer-set-countdown", function(e, countdown) {
                    $scope.countdown = countdown
                }), $scope.start = $element[0].start = function() {
                    $scope.startTime = $scope.startTimeAttr ? new Date($scope.startTimeAttr) : new Date, $scope.endTime = $scope.endTimeAttr ? new Date($scope.endTimeAttr) : null, $scope.countdown || ($scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : void 0), resetTimeout(), tick(), $scope.isRunning = !0
                }, $scope.resume = $element[0].resume = function() {
                    resetTimeout(), $scope.countdownattr && ($scope.countdown += 1), $scope.startTime = new Date - ($scope.stoppedTime - $scope.startTime), tick(), $scope.isRunning = !0
                }, $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function() {
                    $scope.clear(), $scope.$emit("timer-stopped", {
                        millis: $scope.millis,
                        seconds: $scope.seconds,
                        minutes: $scope.minutes,
                        hours: $scope.hours,
                        days: $scope.days
                    })
                }, $scope.clear = $element[0].clear = function() {
                    $scope.stoppedTime = new Date, resetTimeout(), $scope.timeoutId = null, $scope.isRunning = !1
                }, $element.bind("$destroy", function() {
                    resetTimeout(), $scope.isRunning = !1
                }), $scope.countdownattr ? ($scope.millis = 1e3 * $scope.countdownattr, $scope.addCDSeconds = $element[0].addCDSeconds = function(extraSeconds) {
                    $scope.countdown += extraSeconds, $scope.$digest(), $scope.isRunning || $scope.start()
                }, $scope.$on("timer-add-cd-seconds", function(e, extraSeconds) {
                    $timeout(function() {
                        $scope.addCDSeconds(extraSeconds)
                    })
                })) : $scope.millis = 0, calculateTimeUnits();
                var tick = function() {
                    $scope.millis = new Date - $scope.startTime;
                    var adjustment = $scope.millis % 1e3;
                    return $scope.endTimeAttr && ($scope.millis = $scope.endTime - new Date, adjustment = $scope.interval - $scope.millis % 1e3), $scope.countdownattr && ($scope.millis = 1e3 * $scope.countdown), $scope.millis < 0 ? ($scope.stop(), $scope.millis = 0, void calculateTimeUnits()) : (calculateTimeUnits(), $scope.timeoutId = setTimeout(function() {
                        tick(), $scope.$digest()
                    }, $scope.interval - adjustment), $scope.$emit("timer-tick", {
                        timeoutId: $scope.timeoutId,
                        millis: $scope.millis
                    }), void($scope.countdown > 0 ? $scope.countdown-- : $scope.countdown <= 0 && $scope.stop()))
                };
                (void 0 === $scope.autoStart || $scope.autoStart === !0) && $scope.start()
            }]
        }
    }]);