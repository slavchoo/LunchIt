(function() {
  var Dish, DishList, Supplier, SupplierList, User, UserList,
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

    User.prototype.parse = function(response) {
      response.id = response._id;
      return response;
    };

    return User;

  })(Backbone.Model);

  Dish = (function(_super) {

    __extends(Dish, _super);

    function Dish() {
      return Dish.__super__.constructor.apply(this, arguments);
    }

    Dish.prototype.initialize = function() {};

    Dish.prototype.parse = function(response) {
      response.id = response._id;
      return response;
    };

    return Dish;

  })(Backbone.Model);

  window.User = User;

  window.Supplier = Supplier;

  window.Dish = Dish;

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

  DishList = (function(_super) {

    __extends(DishList, _super);

    function DishList() {
      return DishList.__super__.constructor.apply(this, arguments);
    }

    DishList.prototype.model = Dish;

    DishList.prototype.url = '/dishes';

    return DishList;

  })(Backbone.Collection);

  window.UserList = UserList;

  window.SupplierList = SupplierList;

  window.DishList = DishList;

}).call(this);
