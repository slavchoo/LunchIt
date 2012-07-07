(function() {
  var Supplier, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Supplier = (function(_super) {

    __extends(Supplier, _super);

    function Supplier() {
      return Supplier.__super__.constructor.apply(this, arguments);
    }

    Supplier.prototype.initialize = function() {
      return console.log("init model supplier");
    };

    return Supplier;

  })(Backbone.Model);

  User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.initialize = function() {
      return console.log("init user model");
    };

    return User;

  })(Backbone.Model);

}).call(this);
