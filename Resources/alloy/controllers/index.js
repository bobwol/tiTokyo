function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createWindow({
        orientation: Ti.UI.PORTRAIT,
        orientationModes: [ Ti.UI.PORTRAIT ],
        backgroundImage: "/images/background.png",
        backgroundRepeat: !0,
        navBarHidden: "true",
        exitOnClose: "true",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.content = A$(Ti.UI.createView({
        top: "65dp",
        bottom: "46dp",
        id: "content"
    }), "View", $.__views.index);
    $.__views.index.add($.__views.content);
    $.__views.tab = Alloy.createController("tab", {
        id: "tab"
    });
    $.__views.tab.setParent($.__views.index);
    $.__views.modal = A$(Ti.UI.createView({
        top: "65dp",
        bottom: 0,
        backgroundImage: "/images/modal.png",
        backgroundRepeat: !0,
        opacity: 0,
        touchEnabled: !1,
        id: "modal"
    }), "View", $.__views.index);
    $.__views.index.add($.__views.modal);
    $.__views.navigation = Alloy.createController("navigation", {
        id: "navigation"
    });
    $.__views.navigation.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Animation = require("alloy/animation"), tab = "home", current = Alloy.createController("home");
    current.getView().applyProperties({
        opacity: 1
    });
    $.content.add(current.getView());
    current.trigger("home:focus");
    var info = Alloy.createController("info");
    $.navigation.on("navigation:logo", function(e) {
        if (e.visibled) Animation.fadeOut(info.getView(), 200, function() {
            current.trigger(tab + ":focus");
            $.modal.remove(info.getView());
            info.getView().scrollTo(0, 0);
            info.getView().applyProperties({
                opacity: 0
            });
            $.modal.applyProperties({
                opacity: 0,
                touchEnabled: !1
            });
        }); else {
            $.modal.applyProperties({
                opacity: 1,
                touchEnabled: !0
            });
            $.modal.add(info.getView());
            Animation.fadeIn(info.getView(), 200, function() {
                current.trigger(tab + ":blur");
            });
        }
    });
    $.tab.on("tab:change", function(e) {
        var next = Alloy.createController(e.after);
        $.content.add(next.getView());
        current.trigger(e.before + ":blur");
        Animation.crossFade(current.getView(), next.getView(), 200, function() {
            tab = e.after;
            next.trigger(e.after + ":focus");
            $.tab.trigger("tab:changed");
            $.content.remove(current.getView());
            current = next;
        });
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;