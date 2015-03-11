(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["backbone"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("backbone"));
    } else {
        root.Requester = factory(root.Backbone);
    }
}(this, function (Backbone) {

    // from https://github.com/NYTimes/backbone.stickit/issues/97
    // Based on http://jsfiddle.net/px6UP/36/

    Backbone.Stickit.addHandler({
        selector: 'select.select2,input.select2',
        initialize: function($el, model, opt) {
            var e = 'change:' + opt.observe,
                allowClear = $el.data("allow-clear") || false,
                self = this;
            $el.select2({
                allowClear: allowClear
            });
            var up = function(m, v, o) {
                if (!o.stickitChange) $el.trigger("change");
            };
            this.listenTo(model, e, up);
            this.listenTo(model, 'stickit:unstuck', function() {
                self.stopListening(model, e, up);
            });
        }
    });

}));