(function() {
  var ViewsLiteral,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _.templateSettings = {
    evaluate: /<@([\s\S]+?)@>/g,
    interpolate: /<@=([\s\S]+?)@>/g,
    escape: /<@-([\s\S]+?)@>/g
  };

  ViewsLiteral = {};

  $(function() {
    var AccessorisMenuView, AppMenuView, DayOrderView, DishesMenuView, EditSupplierView, FullOrderView, IndexView, MenuDishFormView, MenuView, OrderButtonView, OrderView, PreferencesParamsView, PreferencesSendView, PreferencesTeamView, PreferencesUserView, PreferencesView, PreferencesViews, Route, SupplierView, SuppliersSelectorView, SuppliersView, Views, WeekDayOrderView, WeekOrderView, WeekSwitcherView, routes;
    Route = (function(_super) {

      __extends(Route, _super);

      function Route() {
        return Route.__super__.constructor.apply(this, arguments);
      }

      Route.prototype.routes = {
        "": "index",
        "!/": "index",
        "!/menu": "menu",
        "!/suppliers": "suppliers",
        "!/preferences": "preferences",
        "!/week-order": "weekOrder",
        "!/order": 'order'
      };

      Route.prototype.initialize = function() {
        return new AppMenuView();
      };

      Route.prototype.index = function() {
        return new IndexView();
      };

      Route.prototype.menu = function() {
        return new MenuView();
      };

      Route.prototype.suppliers = function() {
        return ViewsLiteral.suppliersPageView = new SuppliersView();
      };

      Route.prototype.preferences = function() {
        return new PreferencesView();
      };

      Route.prototype.weekOrder = function() {
        return new WeekOrderView();
      };

      return Route;

    })(Backbone.Router);
    Views = {};
    PreferencesViews = {};
    AppMenuView = (function(_super) {

      __extends(AppMenuView, _super);

      function AppMenuView() {
        return AppMenuView.__super__.constructor.apply(this, arguments);
      }

      AppMenuView.prototype.el = "#app-menu";

      AppMenuView.prototype.tagName = 'li';

      AppMenuView.prototype.initialize = function() {
        ViewsLiteral.orderButtonView = new OrderButtonView();
        return ViewsLiteral.orderButtonView.updateOrderStatus();
      };

      AppMenuView.prototype.events = function() {
        return {
          "click li": "activateMenuItem"
        };
      };

      AppMenuView.prototype.activateMenuItem = function(e) {
        $(this.el).find(this.tagName).removeClass("active");
        return $(e.target).parent().addClass("active");
      };

      return AppMenuView;

    })(Backbone.View);
    IndexView = (function(_super) {

      __extends(IndexView, _super);

      function IndexView() {
        return IndexView.__super__.constructor.apply(this, arguments);
      }

      IndexView.prototype.el = "#home-page";

      IndexView.prototype.initialize = function() {
        return console.log("index");
      };

      IndexView.prototype.render = function() {};

      return IndexView;

    })(Backbone.View);
    /*
    		Preferences view
    */

    PreferencesSendView = (function(_super) {

      __extends(PreferencesSendView, _super);

      function PreferencesSendView() {
        return PreferencesSendView.__super__.constructor.apply(this, arguments);
      }

      PreferencesSendView.prototype.el = "#preferences-form";

      PreferencesSendView.prototype.supplierContainer = '#supplier';

      PreferencesSendView.prototype.initialize = function() {
        ViewsLiteral.suppliersView.collection.on("reset", this.render, this);
        return ViewsLiteral.suppliersView.on('changeValue', this.render, this);
      };

      PreferencesSendView.prototype.events = function() {
        return {
          'click button': 'save',
          'click #add-supplier': 'addSupplier'
        };
      };

      PreferencesSendView.prototype.render = function() {
        this.model = ViewsLiteral.suppliersView.getCurrent();
        if (this.model) {
          $(this.el).html(_.template($('#preferences-send-template').html(), {
            model: this.model.attributes
          }));
        }
        return this;
      };

      PreferencesSendView.prototype.save = function() {
        var formData, preferencesFields,
          _this = this;
        formData = {};
        preferencesFields = $(this.el).find('input, textarea');
        _.each(preferencesFields, function(item) {
          var key, value;
          key = $(item).attr('name');
          value = $(item).val();
          return formData[key] = value;
        });
        return this.model.save(formData);
      };

      PreferencesSendView.prototype.addSupplier = function() {
        return this.collection.create({
          name: 'Лидо',
          address: 'lido@lido.by',
          cc: 'mike@gmail.com'
        });
      };

      return PreferencesSendView;

    })(Backbone.View);
    PreferencesParamsView = (function(_super) {

      __extends(PreferencesParamsView, _super);

      function PreferencesParamsView() {
        return PreferencesParamsView.__super__.constructor.apply(this, arguments);
      }

      PreferencesParamsView.prototype.el = "#preferences-form";

      PreferencesParamsView.prototype.initialize = function() {
        ViewsLiteral.suppliersView.collection.on("reset", this.render, this);
        return ViewsLiteral.suppliersView.on('changeValue', this.render, this);
      };

      PreferencesParamsView.prototype.events = function() {
        return {
          'click button': 'save'
        };
      };

      PreferencesParamsView.prototype.render = function() {
        var preferencesFields,
          _this = this;
        this.model = ViewsLiteral.suppliersView.getCurrent();
        $(this.el).html(_.template($('#preferences-params-template').html(), {
          model: this.model
        }));
        preferencesFields = $(this.el);
        if (this.model) {
          _.each(this.model.attributes, function(item, key) {
            return preferencesFields.find('[name="' + key + '"]').val(item);
          });
        }
        return this;
      };

      PreferencesParamsView.prototype.save = function() {
        var formData, preferencesFields,
          _this = this;
        formData = {};
        preferencesFields = $(this.el).find('input, textarea');
        _.each(preferencesFields, function(item) {
          var key, value;
          key = $(item).attr('name');
          value = $(item).val();
          return formData[key] = value;
        });
        return this.model.save(formData);
      };

      return PreferencesParamsView;

    })(Backbone.View);
    PreferencesTeamView = (function(_super) {

      __extends(PreferencesTeamView, _super);

      function PreferencesTeamView() {
        return PreferencesTeamView.__super__.constructor.apply(this, arguments);
      }

      PreferencesTeamView.prototype.el = "#preferences-form";

      PreferencesTeamView.prototype.initialize = function() {
        this.collection = new UserList();
        this.collection.fetch();
        this.render();
        this.collection.on("add", this.renderUser, this);
        this.collection.on("remove", this.removeUser, this);
        return this.collection.on("reset", this.render, this);
      };

      PreferencesTeamView.prototype.events = function() {
        return {
          "click .team-user-form .add": 'addUser'
        };
      };

      PreferencesTeamView.prototype.addUser = function(e) {
        var userName, userNameField;
        e.preventDefault();
        userNameField = $(".team-user-form").find("input.user-name");
        userName = userNameField.val();
        if (!_.isEmpty(userName)) {
          this.collection.create({
            name: userName
          });
          return userNameField.val('');
        }
      };

      PreferencesTeamView.prototype.render = function() {
        var _this = this;
        $(this.el).html(_.template($('#preferences-team-template').html()));
        _.each(this.collection.models, function(item) {
          return _this.renderUser(item);
        });
        return this;
      };

      PreferencesTeamView.prototype.renderUser = function(item) {
        var userView;
        userView = new PreferencesUserView({
          model: item
        });
        return $('#users-list').append(userView.render().el);
      };

      PreferencesTeamView.prototype.removeUser = function(removedUser) {
        var removedUsersData;
        return removedUsersData = removedUser.attributes;
      };

      return PreferencesTeamView;

    })(Backbone.View);
    PreferencesUserView = (function(_super) {

      __extends(PreferencesUserView, _super);

      function PreferencesUserView() {
        return PreferencesUserView.__super__.constructor.apply(this, arguments);
      }

      PreferencesUserView.prototype.tagName = 'li';

      PreferencesUserView.prototype.template = $("#preferences-team-user-template").html();

      PreferencesUserView.prototype.events = function() {
        return {
          "click .delete": "deleteUser"
        };
      };

      PreferencesUserView.prototype.render = function() {
        var tmpl;
        tmpl = _.template(this.template);
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
      };

      PreferencesUserView.prototype.deleteUser = function(e) {
        e.preventDefault();
        this.model.destroy();
        return this.remove();
      };

      return PreferencesUserView;

    })(Backbone.View);
    PreferencesView = (function(_super) {

      __extends(PreferencesView, _super);

      function PreferencesView() {
        return PreferencesView.__super__.constructor.apply(this, arguments);
      }

      PreferencesView.prototype.el = "#main";

      PreferencesView.prototype.initialize = function() {
        this.render();
        $(this.el).find('ul li:eq(0)').addClass('active');
        return this.loadPreferences('team');
      };

      PreferencesView.prototype.events = function() {
        return {
          'click #preferences-tabs li': 'switchTab',
          'change #supplier': 'changeSupplier'
        };
      };

      PreferencesView.prototype.switchTab = function(e) {
        var li;
        e.preventDefault();
        $(this.el).find('li').removeClass("active");
        li = $(e.target).parent();
        li.addClass("active");
        return this.loadPreferences(li.attr("form-name"));
      };

      PreferencesView.prototype.loadPreferences = function(name) {
        var view;
        name = name + 'ParamsView';
        view = void 0;
        switch (name) {
          case 'sendParamsView':
            view = new PreferencesSendView();
            break;
          case 'paramsParamsView':
            view = new PreferencesParamsView();
            break;
          case 'teamParamsView':
            view = new PreferencesTeamView();
        }
        ViewsLiteral[name] = view;
        if (ViewsLiteral.sendParamsView) {
          ViewsLiteral.sendParamsView.undelegateEvents();
        }
        if (ViewsLiteral.paramsParamsView) {
          ViewsLiteral.paramsParamsView.undelegateEvents();
        }
        if (ViewsLiteral.teamParamsView) {
          ViewsLiteral.teamParamsView.undelegateEvents();
        }
        ViewsLiteral[name].initialize();
        ViewsLiteral[name].delegateEvents();
        return ViewsLiteral[name].render();
      };

      PreferencesView.prototype.render = function() {
        $(this.el).html(_.template($('#preferences-template').html()));
        return this;
      };

      PreferencesView.prototype.changeSupplier = function() {
        return this.supplierId = $(this.supplierContainer).val();
      };

      return PreferencesView;

    })(Backbone.View);
    SuppliersSelectorView = (function(_super) {

      __extends(SuppliersSelectorView, _super);

      function SuppliersSelectorView() {
        return SuppliersSelectorView.__super__.constructor.apply(this, arguments);
      }

      SuppliersSelectorView.prototype.current = void 0;

      SuppliersSelectorView.prototype.initialize = function() {
        this.collection = new SupplierList();
        this.collection.fetch();
        return this.collection.on('reset', this.render, this);
      };

      SuppliersSelectorView.prototype.events = function() {
        return {
          'change select': 'change'
        };
      };

      SuppliersSelectorView.prototype.change = function(e) {
        this.trigger('changeValue');
        return this.current = $(e.target).val();
      };

      SuppliersSelectorView.prototype.getCurrentId = function() {
        if (this.current) {
          return this.current;
        } else {
          return $(this.el).find('select option:selected').val();
        }
      };

      SuppliersSelectorView.prototype.getCurrent = function() {
        return this.collection.get(this.getCurrentId());
      };

      SuppliersSelectorView.prototype.render = function() {
        $(this.el).html(_.template($('#supplier-selector-template').html(), {
          suppliers: this.collection.models
        }));
        return this;
      };

      return SuppliersSelectorView;

    })(Backbone.View);
    /*
    	////////////////////////////
    		MENU VIEWS
    	////////////////////////////
    */

    MenuView = (function(_super) {

      __extends(MenuView, _super);

      function MenuView() {
        return MenuView.__super__.constructor.apply(this, arguments);
      }

      MenuView.prototype.el = '#main';

      MenuView.prototype.initialize = function() {
        var suppliers;
        this.collection = new DishList();
        this.collection.fetch();
        this.render();
        suppliers = new SuppliersSelectorView({
          el: 'div.suppliers'
        });
        this.collection.on('add', this.renderDishes, this);
        return this.collection.on('reset', this.renderDishes, this);
      };

      MenuView.prototype.events = function() {
        return {
          'click #add-dish': 'showDishForm',
          'click #remove-dish': 'removeDish',
          'dblclick .dish-info .view': 'inlineEdit',
          'blur .dish-info input': 'saveInlineEdit',
          'change input[type="checkbox"]': 'selectDish'
        };
      };

      MenuView.prototype.render = function() {
        $(this.el).html(_.template($('#menu-template').html()));
        return this;
      };

      MenuView.prototype.showDishForm = function(e) {
        e.preventDefault();
        return new MenuDishFormView({
          collection: this.collection
        });
      };

      MenuView.prototype.renderDishes = function() {
        var accessories, food;
        food = new DishesMenuView({
          collection: this.collection
        });
        accessories = new AccessorisMenuView({
          collection: this.collection
        });
        $('#menu-dishes').html(food.render().el);
        return $('#menu-accessories').html(accessories.render().el);
      };

      MenuView.prototype.inlineEdit = function(e) {
        var container, model, modelId;
        container = $(e.target).parents('.dish-info');
        modelId = container.attr('attributeId');
        model = this.collection.get(modelId);
        container.find('.view').addClass('hide');
        container.find('.edit').removeClass('hide').find('input:first').focus();
        return _.each(container.find('.edit input, .edit select'), function(item) {
          var key;
          key = $(item).attr('name');
          return $(item).val(model.attributes[key]);
        });
      };

      MenuView.prototype.saveInlineEdit = function(e) {
        var container, formData, model, modelId;
        e.preventDefault();
        container = $(e.target).parents('.dish-info');
        if (!$(e.target).parents('.dish-info').find('input:hover, select:hover').length) {
          modelId = container.attr('attributeId');
          container = $(e.target).parents('.dish-info');
          container.find('.view').removeClass('hide');
          container.find('.edit').addClass('hide');
          model = this.collection.get(modelId);
          formData = {};
          _.each(container.find('.edit input, .edit select'), function(item) {
            var key;
            key = $(item).attr('name');
            return formData[key] = $(item).val();
          });
          model.save(formData);
          return this.collection.trigger('reset');
        }
      };

      MenuView.prototype.selectDish = function() {
        if ($('input[type="checkbox"]:checked').length > 0) {
          return $('.manage-dishes').removeAttr('id').attr('id', 'remove-dish').removeClass('btn-success').addClass('btn-danger').text('Удалить выбраные');
        } else {
          return $('.manage-dishes').removeAttr('id').attr('id', 'add-dish').removeClass('btn-danger').addClass('btn-success').text('Добавить блюдо');
        }
      };

      MenuView.prototype.removeDish = function(e) {
        var _this = this;
        e.preventDefault();
        _.each($('input[type="checkbox"]:checked'), function(item) {
          var id;
          id = $(item).next().attr('attributeId');
          return _this.collection.get(id).destroy();
        });
        $('.manage-dishes').removeAttr('id').attr('id', 'add-dish').removeClass('btn-danger').addClass('btn-success').text('Добавить блюдо');
        return this.collection.trigger('reset');
      };

      return MenuView;

    })(Backbone.View);
    DishesMenuView = (function(_super) {

      __extends(DishesMenuView, _super);

      function DishesMenuView() {
        return DishesMenuView.__super__.constructor.apply(this, arguments);
      }

      DishesMenuView.prototype.render = function() {
        $(this.$el).html(_.template($('#menu-items-template').html(), {
          dishes: this.collection.models,
          mode: 'food'
        }));
        return this;
      };

      return DishesMenuView;

    })(Backbone.View);
    AccessorisMenuView = (function(_super) {

      __extends(AccessorisMenuView, _super);

      function AccessorisMenuView() {
        return AccessorisMenuView.__super__.constructor.apply(this, arguments);
      }

      AccessorisMenuView.prototype.render = function() {
        $(this.$el).html(_.template($('#menu-items-template').html(), {
          dishes: this.collection.models,
          mode: 'accessories'
        }));
        return this;
      };

      return AccessorisMenuView;

    })(Backbone.View);
    MenuDishFormView = (function(_super) {

      __extends(MenuDishFormView, _super);

      function MenuDishFormView() {
        return MenuDishFormView.__super__.constructor.apply(this, arguments);
      }

      MenuDishFormView.prototype.el = '#dish-popup';

      MenuDishFormView.prototype.initialize = function() {
        var _this = this;
        this.render();
        $('#dish-form').modal({
          backdrop: false
        });
        return $('#dish-form').on('hidden', function() {
          return _this.hide();
        });
      };

      MenuDishFormView.prototype.events = function() {
        return {
          'click a.save': 'saveForm'
        };
      };

      MenuDishFormView.prototype.render = function() {
        return $(this.el).append(_.template($('#dish-form-template').html()));
      };

      MenuDishFormView.prototype.saveForm = function(e) {
        var formData;
        e.preventDefault();
        formData = {};
        _.each($('#dish-form').find('input, select'), function(item) {
          return formData[$(item).attr('name')] = $(item).val();
        });
        this.collection.create(formData);
        return $('#dish-form').modal('hide');
      };

      MenuDishFormView.prototype.hide = function() {
        $('#dish-popup').empty();
        return this.undelegateEvents();
      };

      return MenuDishFormView;

    })(Backbone.View);
    /* ///////////////////////////
    		ORDER PAGES
    	///////////////////////////
    */

    WeekOrderView = (function(_super) {

      __extends(WeekOrderView, _super);

      function WeekOrderView() {
        return WeekOrderView.__super__.constructor.apply(this, arguments);
      }

      WeekOrderView.prototype.el = '#main';

      WeekOrderView.prototype.initialize = function() {
        var suppliers, weekSwitcher;
        this.render();
        suppliers = new SuppliersSelectorView({
          el: 'div.suppliers'
        });
        weekSwitcher = new WeekSwitcherView;
        weekSwitcher.render();
        return this.collection = new OrderList();
      };

      WeekOrderView.prototype.events = function() {};

      WeekOrderView.prototype.render = function() {
        $(this.el).html(_.template($('#week-order-template').html()));
        return this;
      };

      return WeekOrderView;

    })(Backbone.View);
    WeekDayOrderView = (function(_super) {

      __extends(WeekDayOrderView, _super);

      function WeekDayOrderView() {
        return WeekDayOrderView.__super__.constructor.apply(this, arguments);
      }

      WeekDayOrderView.prototype.initialize = function() {
        this.first = this.attributes.firstDay;
        this.last = this.attributes.lastDay;
        this.collection = new OrderList();
        this.collection.url = '/orders/' + this.first.format('YYYY-MM-DD') + '/' + this.last.format('YYYY-MM-DD');
        this.collection.fetch();
        return this.collection.on('reset', this.render, this);
      };

      WeekDayOrderView.prototype.render = function() {
        var currentDay, day, dayOrder, orders;
        orders = {};
        _.each(this.collection.models, function(model) {
          return orders[moment.unix(parseInt(model.attributes.createdAt)).format('DD-MM')] = model;
        });
        day = 0;
        $(this.$el).html('');
        while (day < 7) {
          currentDay = moment(this.first).add('days', day);
          dayOrder = new DayOrderView({
            attributes: {
              currentDay: currentDay
            },
            model: orders[currentDay.format('DD-MM')]
          });
          $(this.$el).append(dayOrder.render().el);
          day = day + 1;
        }
        return this;
      };

      return WeekDayOrderView;

    })(Backbone.View);
    DayOrderView = (function(_super) {

      __extends(DayOrderView, _super);

      function DayOrderView() {
        return DayOrderView.__super__.constructor.apply(this, arguments);
      }

      DayOrderView.prototype.initialize = function() {
        if (this.model) {
          this.collection = new UserOrderList();
          this.collection.url = '/user_orders/' + this.model.id;
          this.collection.fetch();
          this.collection.on('reset', this.render, this);
          return this.collection.on('update', this.initialize, this);
        }
      };

      DayOrderView.prototype.render = function() {
        var dayTotal, userOrders;
        userOrders = {};
        dayTotal = 0;
        if (this.collection) {
          _.each(this.collection.models, function(item) {
            if (!userOrders[item.attributes.user._id]) {
              userOrders[item.attributes.user._id] = {
                user: {},
                order: [],
                total: 0
              };
            }
            userOrders[item.attributes.user._id].user = item.attributes.user;
            userOrders[item.attributes.user._id].order.push(item.attributes);
            userOrders[item.attributes.user._id].total += item.attributes.price * item.attributes.quantity;
            return dayTotal += item.attributes.price * item.attributes.quantity;
          });
        }
        $(this.$el).html(_.template($('#day-order-template').html(), {
          currentDay: this.attributes.currentDay,
          order: this.model,
          userOrders: userOrders,
          dayTotal: dayTotal
        }));
        return this;
      };

      DayOrderView.prototype.events = function() {
        return {
          'click .add-order': 'addOrder',
          'click .user-order': 'editOrder',
          'click .preview': 'preview'
        };
      };

      DayOrderView.prototype.addOrder = function(e) {
        e.preventDefault();
        return new OrderView({
          model: this.model,
          attributes: {
            currentDay: this.attributes.currentDay
          }
        });
      };

      DayOrderView.prototype.editOrder = function(e) {
        var orderLine, userId;
        e.preventDefault();
        orderLine = $(e.target);
        if (orderLine.attr('userId')) {
          userId = orderLine.attr('userId');
        } else {
          userId = orderLine.parent().attr('userId');
        }
        return new OrderView({
          model: this.model,
          attributes: {
            currentDay: this.attributes.currentDay,
            userId: userId
          }
        });
      };

      DayOrderView.prototype.preview = function(e) {
        e.preventDefault();
        ViewsLiteral.fullOrderPopup = new FullOrderView({
          collection: this.collection,
          model: this.model,
          attributes: {
            currentDay: this.attributes.currentDay
          }
        });
        return ViewsLiteral.fullOrderPopup.render();
      };

      return DayOrderView;

    })(Backbone.View);
    FullOrderView = (function(_super) {

      __extends(FullOrderView, _super);

      function FullOrderView() {
        return FullOrderView.__super__.constructor.apply(this, arguments);
      }

      FullOrderView.prototype.el = '#full-order-popup';

      FullOrderView.prototype.dishCategories = {
        1: 'Супы',
        2: 'Мясо',
        3: 'Гарниры',
        4: 'Салаты',
        5: 'Блины',
        6: 'Другое',
        7: 'Контейнеры'
      };

      FullOrderView.prototype.initialize = function() {};

      FullOrderView.prototype.events = function() {
        return {
          'click .save': 'save',
          'keyup input[name="price"]': 'calculateTotal'
        };
      };

      FullOrderView.prototype.render = function() {
        var fullOrderDishes, total,
          _this = this;
        this.delegateEvents();
        fullOrderDishes = {};
        total = 0;
        _.each(this.collection.models, function(dish) {
          if (!fullOrderDishes[dish.attributes.dish.category]) {
            fullOrderDishes[dish.attributes.dish.category] = {};
          }
          if (!fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id]) {
            fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id] = {};
          }
          if (!fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].quantity) {
            fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].quantity = 0;
          }
          fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].quantity += dish.attributes.quantity;
          fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].name = dish.attributes.dish.name;
          fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].price = dish.attributes.price;
          fullOrderDishes[dish.attributes.dish.category][dish.attributes.dish._id].id = dish.attributes.dish._id;
          return total += dish.attributes.quantity * dish.attributes.price;
        });
        $(this.el).html(_.template($('#full-order-template').html(), {
          dishCategories: this.dishCategories,
          fullOrderDishes: fullOrderDishes,
          date: this.attributes.currentDay.format('DD MMMM'),
          total: total
        }));
        $('#full-order-form').modal({
          backdrop: false
        });
        return $('#full-order-form').on('hidden', function() {
          return _this.hide();
        });
      };

      FullOrderView.prototype.save = function(e) {
        var formData;
        e.preventDefault();
        formData = {};
        _.each($(this.el).find('input[name="price"]'), function(item) {
          return formData[$(item).attr('dishId')] = $(item).val();
        });
        this.collection.url = '/orders/' + this.model.id;
        this.collection.create(formData);
        this.collection.trigger('update');
        return this.hide();
      };

      FullOrderView.prototype.hide = function() {
        delete ViewsLiteral.fullOrderPopup;
        return this.undelegateEvents();
      };

      FullOrderView.prototype.calculateTotal = function(e) {
        var total;
        total = 0;
        _.each($(this.el).find('input[name="price"]'), function(item) {
          return total += $(item).attr('quantity') * $(item).val();
        });
        return $(this.el).find('div.total .sum').text(total);
      };

      return FullOrderView;

    })(Backbone.View);
    WeekSwitcherView = (function(_super) {

      __extends(WeekSwitcherView, _super);

      function WeekSwitcherView() {
        return WeekSwitcherView.__super__.constructor.apply(this, arguments);
      }

      WeekSwitcherView.prototype.el = '#week-switcher';

      WeekSwitcherView.prototype.weekNumberFromToday = 0;

      WeekSwitcherView.prototype.initialize = function() {
        this.currentDayNumber = moment().format('d');
        return this.on('changeDate', this.render, this);
      };

      WeekSwitcherView.prototype.events = function() {
        return {
          'click .prev': 'prev',
          'click .next': 'next',
          'click .today': 'today'
        };
      };

      WeekSwitcherView.prototype.getFirstDay = function() {
        if (this.weekNumberFromToday < 0) {
          return moment().subtract('days', parseInt(this.currentDayNumber) - (this.weekNumberFromToday * 7) - 1);
        } else if (this.weekNumberFromToday > 0) {
          return moment().add('days', parseInt(this.currentDayNumber) + (this.weekNumberFromToday * 7) - 1);
        } else {
          return moment().subtract('days', parseInt(this.currentDayNumber) - 1);
        }
      };

      WeekSwitcherView.prototype.getLastDay = function() {
        if (this.weekNumberFromToday < 0) {
          return moment().add('days', parseInt(7 - this.currentDayNumber) - ((this.weekNumberFromToday + 1) * 7) + 1);
        } else if (this.weekNumberFromToday > 0) {
          return moment().add('days', parseInt(7 - this.currentDayNumber) + (this.weekNumberFromToday * 7));
        } else {
          return moment().add('days', parseInt(7 - this.currentDayNumber));
        }
      };

      WeekSwitcherView.prototype.render = function() {
        var firstDay, lastDay;
        firstDay = this.getFirstDay();
        lastDay = this.getLastDay();
        $(this.el).html(_.template($('#week-switcher-template').html(), {
          firstDay: firstDay,
          lastDay: lastDay
        }));
        this.renderWeekOrder(firstDay, lastDay);
        return this;
      };

      WeekSwitcherView.prototype.renderWeekOrder = function(firstDay, lastDay) {
        this.weekOrderView = new WeekDayOrderView({
          attributes: {
            firstDay: firstDay,
            lastDay: lastDay
          }
        });
        return $('#week-order').html(this.weekOrderView.render().el);
      };

      WeekSwitcherView.prototype.prev = function(e) {
        e.preventDefault();
        this.weekNumberFromToday -= 1;
        return this.trigger('changeDate');
      };

      WeekSwitcherView.prototype.next = function(e) {
        e.preventDefault();
        this.weekNumberFromToday += 1;
        return this.trigger('changeDate');
      };

      WeekSwitcherView.prototype.today = function(e) {
        e.preventDefault();
        this.weekNumberFromToday = 0;
        return this.trigger('changeDate');
      };

      return WeekSwitcherView;

    })(Backbone.View);
    OrderView = (function(_super) {

      __extends(OrderView, _super);

      function OrderView() {
        return OrderView.__super__.constructor.apply(this, arguments);
      }

      OrderView.prototype.el = '#main';

      OrderView.prototype.dishCategories = {
        1: 'Супы',
        2: 'Мясо',
        3: 'Гарниры',
        4: 'Салаты',
        5: 'Блины',
        6: 'Другое',
        7: 'Контейнеры'
      };

      OrderView.prototype.initialize = function() {
        this.users = new UserList();
        this.users.fetch();
        this.userOrder = new UserOrderList();
        if (this.attributes.userId && this.model) {
          this.userOrder.url = '/user_orders/' + this.attributes.userId + '/' + this.model.attributes.id;
          this.userOrder.fetch();
        }
        this.dishes = new DishList();
        this.dishes.fetch();
        this.render();
        this.dishes.on('reset', this.render, this);
        this.userOrder.on('reset', this.render, this);
        return this.on('updateMenu', this.initialize, this);
      };

      OrderView.prototype.events = function() {
        return {
          'click .category-dish-name': 'slideToggleMenu',
          'click .save': 'saveOrder',
          'click .preview': 'previewOrder',
          'change select.user': 'changeUser'
        };
      };

      OrderView.prototype.changeUser = function(e) {
        var userId;
        userId = $(e.target).val();
        this.attributes.userId = userId;
        return this.trigger('updateMenu');
      };

      OrderView.prototype.slideToggleMenu = function(e) {
        e.preventDefault();
        return $(e.target).next().slideToggle();
      };

      OrderView.prototype.saveOrder = function(e) {
        var orderBlock, orderedDishes, selectedSupplier, userId,
          _this = this;
        e.preventDefault();
        selectedSupplier = $('#supplier-selector').val();
        orderedDishes = [];
        orderBlock = $('#main .order');
        userId = orderBlock.find('.user').val();
        console.log(this.model);
        _.each(orderBlock.find('.dish-order'), function(item) {
          if ($(item).val()) {
            return orderedDishes.push({
              dish: $(item).attr('dishId'),
              quantity: $(item).val(),
              user: userId,
              supplier: selectedSupplier,
              order: _this.model ? _this.model.attributes.id : void 0,
              date: moment(_this.attributes.currentDay).unix()
            });
          }
        });
        if (orderedDishes.length) {
          this.userOrder.url = '/user_orders/';
          this.userOrder.create(orderedDishes);
        }
        return this.close();
      };

      OrderView.prototype.previewOrder = function(e) {
        return e.preventDefault();
      };

      OrderView.prototype.render = function() {
        var dishesByCategory, userOrder;
        dishesByCategory = {};
        _.each(this.dishes.models, function(model) {
          if (!dishesByCategory[model.attributes.category]) {
            dishesByCategory[model.attributes.category] = [];
          }
          return dishesByCategory[model.attributes.category].push(model);
        });
        userOrder = {};
        if (this.userOrder) {
          _.each(this.userOrder.models, function(userOrderModel) {
            if (!userOrder[userOrderModel.attributes.dish]) {
              userOrder[userOrderModel.attributes.dish] = [];
            }
            return userOrder[userOrderModel.attributes.dish] = userOrderModel.attributes;
          });
        }
        $(this.el).html(_.template($('#order-template').html(), {
          model: this.model,
          dishesByCategory: dishesByCategory,
          currentDay: this.attributes.currentDay,
          dishCategories: this.dishCategories,
          users: this.users,
          userOrder: userOrder
        }));
        if (this.attributes.userId) {
          $('#main .order .user').val(this.attributes.userId);
        }
        return this;
      };

      OrderView.prototype.close = function() {
        this.undelegateEvents();
        return new WeekOrderView();
      };

      return OrderView;

    })(Backbone.View);
    SuppliersView = (function(_super) {

      __extends(SuppliersView, _super);

      function SuppliersView() {
        return SuppliersView.__super__.constructor.apply(this, arguments);
      }

      SuppliersView.prototype.el = "#main";

      SuppliersView.prototype.initialize = function() {
        return this.updateSuppliers();
      };

      SuppliersView.prototype.updateSuppliers = function() {
        this.collection = new SupplierList();
        this.collection.fetch();
        return this.collection.on('reset', this.render, this);
      };

      SuppliersView.prototype.events = function() {
        return {
          'click .add': 'addSupplier'
        };
      };

      SuppliersView.prototype.addSupplier = function(e) {
        e.preventDefault();
        return new EditSupplierView({
          collection: this.collection,
          model: this.model
        });
      };

      SuppliersView.prototype.render = function() {
        var _this = this;
        $(this.el).html(_.template($('#suppliers-template').html()));
        if (this.collection.models.length) {
          _.each(this.collection.models, function(item) {
            return _this.renderSupplier(item, _this.collection);
          });
        } else {
          $('.suppliers-list').html('<h2>Hи одного поставщика не добавлено</h2>');
        }
        return $('.suppliers-list a.add').show();
      };

      SuppliersView.prototype.renderSupplier = function(model, collection) {
        var supplierView;
        supplierView = new SupplierView({
          model: model,
          collection: collection
        });
        return $('.suppliers-list ul').append(supplierView.render().el);
      };

      return SuppliersView;

    })(Backbone.View);
    EditSupplierView = (function(_super) {

      __extends(EditSupplierView, _super);

      function EditSupplierView() {
        return EditSupplierView.__super__.constructor.apply(this, arguments);
      }

      EditSupplierView.prototype.el = '.supplier-form';

      EditSupplierView.prototype.initialize = function() {
        return this.render();
      };

      EditSupplierView.prototype.events = function() {
        return {
          'click button': 'save'
        };
      };

      EditSupplierView.prototype.render = function() {
        var container;
        $('.suppliers-list ul').empty();
        $('.suppliers-list a.add').hide();
        $(this.el).html(_.template($('#supplier-form-template').html()));
        container = $(this.el);
        if (this.model) {
          return _.each(this.model.attributes, function(item, key) {
            return container.find('[name="' + key + '"]').val(item);
          });
        }
      };

      EditSupplierView.prototype.save = function() {
        var formData;
        formData = {};
        _.each($(this.el).find('input, select, textarea'), function(item) {
          return formData[$(item).attr('name')] = $(item).val();
        });
        if (!this.model) {
          this.model = new Supplier(formData);
          this.collection.create(this.model);
        } else {
          this.model.save(formData);
        }
        this.remove();
        return ViewsLiteral.suppliersPageView.updateSuppliers();
      };

      return EditSupplierView;

    })(Backbone.View);
    SupplierView = (function(_super) {

      __extends(SupplierView, _super);

      function SupplierView() {
        return SupplierView.__super__.constructor.apply(this, arguments);
      }

      SupplierView.prototype.tagName = 'li';

      SupplierView.prototype.events = function() {
        return {
          'click .edit': 'edit'
        };
      };

      SupplierView.prototype.edit = function(e) {
        e.preventDefault();
        return new EditSupplierView({
          model: this.model
        });
      };

      SupplierView.prototype.render = function() {
        $(this.$el).html(_.template($('#supplier-template').html(), this.model.attributes));
        return this;
      };

      return SupplierView;

    })(Backbone.View);
    OrderButtonView = (function(_super) {

      __extends(OrderButtonView, _super);

      function OrderButtonView() {
        return OrderButtonView.__super__.constructor.apply(this, arguments);
      }

      OrderButtonView.prototype.buttonSelector = 'header .order-button a';

      OrderButtonView.prototype.el = '.order-button';

      OrderButtonView.prototype.initialize = function() {};

      OrderButtonView.prototype.events = function() {
        return {
          'click a': 'sendOrder'
        };
      };

      OrderButtonView.prototype.getLastOrder = function() {
        var lastOrder;
        lastOrder = {};
        _.each(this.collection.models, function(model) {
          return lastOrder = model.attributes;
        });
        this.lastOrder = lastOrder;
        this.changeButtonStatus(lastOrder);
        return this.trigger('saveOrder');
      };

      OrderButtonView.prototype.sendOrder = function(e) {
        this.on('saveOrder', this.saveOrder, this);
        this.updateOrderStatus();
        return e.preventDefault();
      };

      OrderButtonView.prototype.saveOrder = function() {
        if (this.lastOrder) {
          this.orderSend = new OrderList();
          this.orderSend.url = '/orders/' + this.lastOrder.id;
          this.orderSend.fetch();
          this.orderSend.on('reset', this.updateOrderStatus, this);
        }
        return this.off('saveOrder');
      };

      OrderButtonView.prototype.updateOrderStatus = function() {
        this.collection = new OrderList();
        this.collection.getTodayOrder();
        return this.collection.on('reset', this.getLastOrder, this);
      };

      OrderButtonView.prototype.render = function() {};

      OrderButtonView.prototype.changeButtonStatus = function(order) {
        if (order.sentAt === void 0) {
          return $(this.buttonSelector).removeClass('btn-warning').addClass('btn-success').text('Отправить заказ');
        } else {
          return $(this.buttonSelector).removeClass('btn-success').addClass('btn-warning').text('Заказ отправлен');
        }
      };

      return OrderButtonView;

    })(Backbone.View);
    routes = new Route();
    return Backbone.history.start();
  });

}).call(this);
