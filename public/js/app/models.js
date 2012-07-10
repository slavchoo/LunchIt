(function() {
  var Supplier, SupplierList, User, UserList,
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

    Supplier.prototype.parse = function(response) {
      response.id = response._id;
      return response;
    };

    return Supplier;

  })(Backbone.Model);

  User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.initialize = function() {};

    User.prototype.defaults = {
      name: 'no name'
    };

    User.prototype.parse = function(response) {
      response.id = response._id;
      return response;
    };

    return User;

  })(Backbone.Model);

  window.User = User;

  window.Supplier = Supplier;

  UserList = (function(_super) {

    __extends(UserList, _super);

    function UserList() {
      return UserList.__super__.constructor.apply(this, arguments);
    }

    UserList.prototype.model = User;

    UserList.prototype.url = '/users';

    return UserList;

  })(Backbone.Collection);

  SupplierList = (function(_super) {

    __extends(SupplierList, _super);

    function SupplierList() {
      return SupplierList.__super__.constructor.apply(this, arguments);
    }

    SupplierList.prototype.model = Supplier;

    SupplierList.prototype.url = '/suppliers';

    return SupplierList;

  })(Backbone.Collection);

  window.UserList = UserList;

  window.SupplierList = SupplierList;

}).call(this);
