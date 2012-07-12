(function() {
  var Dish, DishList, Order, OrderList, Supplier, SupplierList, User, UserList, UserOrder, UserOrderList,
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

    Dish.prototype.getCategory = function(item) {
      return this.attributes.category;
    };

    return Dish;

  })(Backbone.Model);

  Order = (function(_super) {

    __extends(Order, _super);

    function Order() {
      return Order.__super__.constructor.apply(this, arguments);
    }

    Order.prototype.parse = function(response) {
      console.log(response);
      response.id = response._id;
      return response;
    };

    return Order;

  })(Backbone.Model);

  UserOrder = (function(_super) {

    __extends(UserOrder, _super);

    function UserOrder() {
      return UserOrder.__super__.constructor.apply(this, arguments);
    }

    UserOrder.prototype.parse = function(response) {
      response.id = response._id;
      return response;
    };

    return UserOrder;

  })(Backbone.Model);

  window.User = User;

  window.Supplier = Supplier;

  window.Dish = Dish;

  window.UserOrder = UserOrder;

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

  OrderList = (function(_super) {

    __extends(OrderList, _super);

    function OrderList() {
      return OrderList.__super__.constructor.apply(this, arguments);
    }

    OrderList.prototype.model = Order;

    OrderList.prototype.url = '/orders';

    return OrderList;

  })(Backbone.Collection);

  UserOrderList = (function(_super) {

    __extends(UserOrderList, _super);

    function UserOrderList() {
      return UserOrderList.__super__.constructor.apply(this, arguments);
    }

    UserOrderList.prototype.model = UserOrder;

    UserOrderList.prototype.url = '/user_orders';

    return UserOrderList;

  })(Backbone.Collection);

  window.UserList = UserList;

  window.SupplierList = SupplierList;

  window.DishList = DishList;

  window.OrderList = OrderList;

  window.UserOrderList = UserOrderList;

}).call(this);
