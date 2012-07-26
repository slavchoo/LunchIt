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
    var AccessorisMenuView, AppMenuView, BillingView, DayOrderView, DishCategoriesView, DishCategoryView, DishesMenuView, EditSupplierView, FullOrderView, IndexView, MenuDishFormView, MenuView, OrderButtonView, OrderView, PreferencesParamsView, PreferencesSendView, PreferencesTeamView, PreferencesUserView, PreferencesView, PreferencesViews, PreviewEmailView, Route, SupplierView, SuppliersSelectorView, SuppliersView, UserSelectorView, Views, WeekDayOrderView, WeekOrderView, WeekSwitcherView, routes;
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
        "!/user-order": 'userOrder',
        "!/billing": 'billing'
      };

      Route.prototype.initialize = function() {
        new AppMenuView();
        ViewsLiteral.userSelector = new UserSelectorView();
        return ViewsLiteral.userSelector.updateList();
      };

      Route.prototype.index = function() {
        return routes.navigate('!/week-order', {
          trigger: true,
          replace: true
        });
      };

      Route.prototype.menu = function() {
        return new MenuView();
      };

      Route.prototype.suppliers = function() {
        return ViewsLiteral.suppliersPageView = new SuppliersView();
      };

      Route.prototype.userOrder = function() {
        return routes.navigate('!/week-order', {
          trigger: true,
          replace: true
        });
      };

      Route.prototype.preferences = function() {
        return new PreferencesView();
      };

      Route.prototype.weekOrder = function() {
        return new WeekOrderView();
      };

      Route.prototype.billing = function() {
        ViewsLiteral.BillingView = new BillingView();
        return ViewsLiteral.BillingView.render();
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

      IndexView.prototype.initialize = function() {};

      IndexView.prototype.render = function() {};

      return IndexView;

    })(Backbone.View);
    UserSelectorView = (function(_super) {

      __extends(UserSelectorView, _super);

      function UserSelectorView() {
        return UserSelectorView.__super__.constructor.apply(this, arguments);
      }

      UserSelectorView.prototype.el = '#user-selector';

      UserSelectorView.prototype.initialize = function() {
        this.users = new UserList();
        this.users.on('reset', this.render, this);
        return this.userId = $.cookie('user');
      };

      UserSelectorView.prototype.events = function() {
        return {
          'change select': 'setUser'
        };
      };

      UserSelectorView.prototype.setUser = function(e) {
        this.userId = $(e.target).val();
        return $.cookie('user', this.userId);
      };

      UserSelectorView.prototype.render = function() {
        $(this.el).html(_.template($('#user-selector-template').html(), {
          users: this.users.models,
          currentUser: this.userId
        }));
        return this;
      };

      UserSelectorView.prototype.updateList = function() {
        return this.users.fetch();
      };

      return UserSelectorView;

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
        return $('#full-order-form').modal('hide');
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

      OrderView.prototype.datepicker = '.datepicker-focus';

      OrderView.prototype.copyDate = void 0;

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
        var _this = this;
        if (_.isEmpty(ViewsLiteral.userSelector.userId)) {
          alert('Для редактирования и просмотра заказа выберите пользователя вверху');
          routes.navigate("!/week-order", {
            trigger: true,
            replace: true
          });
          return;
        }
        this.users = new UserList();
        this.users.fetch();
        this.users.on('reset', function(usersList) {
          _this.userOrder = new UserOrderList();
          if (_this.attributes.userId && _this.model) {
            _this.userOrder.url = '/user_orders/' + _this.attributes.userId + '/' + _this.model.attributes.id;
            _this.userOrder.fetch();
          }
          _this.dishes = new DishList();
          _this.dishes.fetch();
          _this.dishes.on('reset', _this.render, _this);
          _this.userOrder.on('reset', _this.render, _this);
          return _this.on('updateMenu', _this.initialize, _this);
        });
        return routes.navigate("!/user-order");
      };

      OrderView.prototype.events = function() {
        return {
          'click .category-dish-name': 'slideToggleMenu',
          'click .save': 'saveOrder',
          'click .copy': 'copyOrder',
          'click .cancel': 'cancelOrder',
          'click .delete': 'deleteOrder',
          'click .calendar': 'orderCalendar',
          'click .preview': 'previewOrder'
        };
      };

      OrderView.prototype.slideToggleMenu = function(e) {
        e.preventDefault();
        return $(e.target).next().slideToggle();
      };

      OrderView.prototype.cancelOrder = function(e) {
        e.preventDefault();
        return this.close();
      };

      OrderView.prototype.copyOrder = function(e) {
        var copyData;
        e.preventDefault();
        copyData = {};
        _.each($(this.el).find('.order .dish-order'), function(item) {
          return copyData[$(item).attr('dishId')] = $(item).val();
        });
        this.undelegateEvents();
        return new OrderView({
          model: this.potentialOrder,
          attributes: {
            currentDay: this.copyDate.subtract('days', 1),
            copyData: copyData,
            userId: $(this.el).find('select.user').val()
          }
        });
      };

      OrderView.prototype.orderCalendar = function(e) {
        e.preventDefault();
        return $(this.datepicker).focus();
      };

      OrderView.prototype.deleteOrder = function(e) {
        var _this = this;
        e.preventDefault();
        return $.ajax({
          url: '/user_orders/' + this.attributes.userId + '/' + this.model.attributes.id,
          type: 'DELETE',
          dataType: 'json',
          success: function() {
            return _this.close();
          }
        });
      };

      OrderView.prototype.saveOrder = function(e) {
        var orderBlock, orderedDishes, selectedSupplier, userId,
          _this = this;
        e.preventDefault();
        selectedSupplier = $('#supplier-selector').val();
        orderedDishes = [];
        orderBlock = $('#main .order');
        userId = ViewsLiteral.userSelector.userId;
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
        var copyUserOrder, dishesByCategory, userOrder,
          _this = this;
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
        copyUserOrder = void 0;
        if (this.attributes.copyData) {
          copyUserOrder = {};
          _.each(this.attributes.copyData, function(item, dishId) {
            return copyUserOrder[dishId] = _this.attributes.copyData[dishId];
          });
        }
        $(this.el).html(_.template($('#order-template').html(), {
          model: this.model,
          copyUserOrder: copyUserOrder,
          dishesByCategory: dishesByCategory,
          currentDay: this.attributes.currentDay,
          dishCategories: this.dishCategories,
          users: this.users,
          userOrder: userOrder,
          orderOwnerId: this.attributes.userId,
          currentUser: ViewsLiteral.userSelector.userId
        }));
        if (this.attributes.userId) {
          $('#main .order .user').val(this.attributes.userId);
        }
        $(this.datepicker).val(moment(this.attributes.currentDay).add('days', 1).format('MM/DD/YYYY'));
        this.setDatepickerEvents();
        return this;
      };

      OrderView.prototype.setDatepickerEvents = function() {
        var _this = this;
        this.getPotentialCopyDay(moment(this.attributes.currentDay).add('days', 1));
        $('.order .control-buttons .copy').text('Копировать на завтра');
        return $(this.datepicker).datepicker({
          dateFormat: "mm/dd/yy",
          onSelect: function(dateText, inst) {
            return _this.getPotentialCopyDay(dateText);
          }
        });
      };

      OrderView.prototype.getPotentialCopyDay = function(dateText) {
        var _this = this;
        this.copyDate = moment(dateText);
        $('.order .control-buttons .copy').text('Копировать на ' + this.copyDate.format('DD MMMM'));
        this.potentialCopyDay = new OrderList();
        this.potentialCopyDay.url = '/orders/' + this.copyDate.format('YYYY-MM-DD') + '/' + this.copyDate.add('days', 1).format('YYYY-MM-DD');
        this.potentialCopyDay.fetch();
        return this.potentialCopyDay.on('reset', function(order) {
          return _this.potentialOrder = order.models[0];
        });
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
          'click .supplier.add': 'addSupplier'
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
        return $('a.add.supplier').show();
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
        $('a.add.supplier').hide();
        $(this.el).html(_.template($('#supplier-form-template').html()));
        container = $(this.el);
        if (this.model) {
          _.each(this.model.attributes, function(item, key) {
            return container.find('[name="' + key + '"]').val(item);
          });
          ViewsLiteral.dishCategory = new DishCategoriesView({
            attributes: {
              supplier: this.model.attributes
            }
          });
          return ViewsLiteral.dishCategory.updateList();
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
    DishCategoriesView = (function(_super) {

      __extends(DishCategoriesView, _super);

      function DishCategoriesView() {
        return DishCategoriesView.__super__.constructor.apply(this, arguments);
      }

      DishCategoriesView.prototype.el = '#dish-categories';

      DishCategoriesView.prototype.initialize = function() {};

      DishCategoriesView.prototype.updateList = function() {
        this.categories = new DishCategoryList();
        this.categories.url = '/dish_category/' + this.attributes.supplier.id;
        this.categories.fetch();
        return this.categories.on('reset', this.render, this);
      };

      DishCategoriesView.prototype.events = function() {};

      DishCategoriesView.prototype.render = function() {
        if (this.categories.length) {
          return _.each(this.categories.models, function(model) {
            var categoryView;
            categoryView = new DishCategoryView({
              model: model
            });
            return $(this.el).find('ul').append(categoryView.render().el);
          });
        }
      };

      return DishCategoriesView;

    })(Backbone.View);
    DishCategoryView = (function(_super) {

      __extends(DishCategoryView, _super);

      function DishCategoryView() {
        return DishCategoryView.__super__.constructor.apply(this, arguments);
      }

      DishCategoryView.prototype.tagName = 'li';

      DishCategoryView.prototype.events = function() {
        return {
          'click .edit': 'edit',
          'click .delete': 'delete'
        };
      };

      DishCategoryView.prototype.edit = function(e) {
        return e.preventDefault();
      };

      DishCategoryView.prototype["delete"] = function(e) {
        return e.preventDefault();
      };

      return DishCategoryView;

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
          'click a': 'showPreview'
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

      OrderButtonView.prototype.showPreview = function(e) {
        e.preventDefault();
        this.on('saveOrder', this.loadPopup, this);
        return this.updateOrderStatus();
      };

      OrderButtonView.prototype.loadPopup = function() {
        console.log('load popup');
        ViewsLiteral.previewEmail = new PreviewEmailView({
          model: this.lastOrder
        });
        ViewsLiteral.previewEmail.on('sent', this.saveOrder, this);
        return this.off('saveOrder');
      };

      OrderButtonView.prototype.saveOrder = function() {
        var _this = this;
        if (this.lastOrder) {
          $.ajax({
            url: '/send_order/' + this.lastOrder.id,
            data: {
              text: ViewsLiteral.previewEmail.emailText
            },
            type: 'POST',
            dataType: 'text',
            success: function(response) {
              console.log('update status');
              return _this.updateOrderStatus();
            }
          });
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
    PreviewEmailView = (function(_super) {

      __extends(PreviewEmailView, _super);

      function PreviewEmailView() {
        return PreviewEmailView.__super__.constructor.apply(this, arguments);
      }

      PreviewEmailView.prototype.el = '#preview-email';

      PreviewEmailView.prototype.initialize = function() {
        var _this = this;
        this.on('loadPopup', this.render, this);
        return $.ajax({
          url: '/order_preview/' + this.model.id,
          type: 'GET',
          dataType: 'text',
          success: function(response) {
            _this.emailText = response;
            return _this.trigger('loadPopup');
          }
        });
      };

      PreviewEmailView.prototype.events = function() {
        return {
          'click a.save': 'save'
        };
      };

      PreviewEmailView.prototype.save = function(e) {
        e.preventDefault();
        this.emailText = $(this.el).find('textarea').val();
        this.trigger('sent');
        $('#preview-order-form').modal('hide');
        return $(ViewsLiteral.orderButtonView.buttonSelector).addClass('btn-success').text('Заказ отправляется...');
      };

      PreviewEmailView.prototype.render = function() {
        var _this = this;
        $(this.el).html(_.template($('#preview-email-template').html(), {
          date: moment().format('DD MMMM'),
          text: this.emailText
        }));
        $('#preview-order-form').modal({
          backdrop: false
        });
        return $('#preview-order-form').on('hidden', function() {
          return _this.hide();
        });
      };

      PreviewEmailView.prototype.hide = function() {
        ViewsLiteral.previewEmail.off('sent');
        $(this.el).empty();
        return this.undelegateEvents();
      };

      return PreviewEmailView;

    })(Backbone.View);
    /* ////////////////////////////////////////////////
    		Billing
    	////////////////////////////////////////////////
    */

    BillingView = (function(_super) {

      __extends(BillingView, _super);

      function BillingView() {
        return BillingView.__super__.constructor.apply(this, arguments);
      }

      BillingView.prototype.el = '#main';

      BillingView.prototype.initialize = function() {
        var _this = this;
        this.orders = new OrderList();
        this.unpaid = new UserDayOrderList();
        this.users = new UserList();
        this.users.fetch();
        this.users.on('reset', function(users) {
          _this.orders.getOrderByDate(moment());
          return _this.orders.on('reset', function(result) {
            _this.order = _this.orders.models[0];
            _this.renderPayer();
            return _this.updateUnpaid();
          });
        });
        return this.currentDate = moment();
      };

      BillingView.prototype.events = function() {
        return {
          'click #unpaid-users button.save': 'savePayment',
          'change #unpaid-users input[type="checkbox"]': 'recalculateTotal',
          'click #payer .pay': 'attachUser',
          'change #payer .payer-name select': 'updateUnpaid',
          'click #payer div.calendar a': 'showCalendar'
        };
      };

      BillingView.prototype.showCalendar = function(e) {
        e.preventDefault();
        return $('#payer input.calendar').focus();
      };

      BillingView.prototype.attachUser = function(e) {
        var userId;
        e.preventDefault();
        userId = $('#payer .payer-name select').val();
        if (!_.isEmpty(userId)) {
          this.orders.url = '/orders';
          this.order.save({
            payer: userId
          });
          return this.updateUnpaid();
        }
      };

      BillingView.prototype.recalculateTotal = function() {
        var checkboxes, total;
        checkboxes = $('#unpaid-users input[type="checkbox"]');
        total = 0;
        _.each(checkboxes, function(item) {
          if ($(item).is(':checked')) {
            return total += parseInt($(item).attr('total'));
          }
        });
        return checkboxes.parents('.user').find('.name .total .paid').text(total);
      };

      BillingView.prototype.updateUnpaid = function() {
        console.log(this.order);
        this.unpaid.getUnpaid($('#payer .payer-name select').val());
        return this.unpaid.on('reset', this.renderUsers, this);
      };

      BillingView.prototype.savePayment = function(e) {
        var paid;
        e.preventDefault();
        paid = [];
        _.each($('#unpaid-users .user input[type="checkbox"]:checked'), function(item) {
          return paid.push($(item).parents('div.day').attr('orderId'));
        });
        this.unpaid.on('sync', this.updateUnpaid, this);
        this.unpaid.url = '/user_day_orders';
        return this.unpaid.create(paid);
      };

      BillingView.prototype.renderPayer = function() {
        var _this = this;
        $(this.el).find('#payer').html(_.template($('#payer-template').html(), {
          users: this.users.models,
          orders: this.order,
          date: this.currentDate
        }));
        return $('#payer input[type="hidden"]').datepicker({
          onSelect: function(date) {
            var dateObject;
            dateObject = moment(date);
            _this.orders.getOrderByDate(dateObject);
            _this.currentDate = dateObject;
            return $('#payer .calendar a').text(dateObject.format('DD MMMM'));
          }
        });
      };

      BillingView.prototype.renderUsers = function() {
        var unpaidUsers;
        unpaidUsers = {};
        _.each(this.unpaid.models, function(user) {
          if (!unpaidUsers[user.attributes.user._id]) {
            unpaidUsers[user.attributes.user._id] = [];
          }
          if (!unpaidUsers[user.attributes.user._id].total) {
            unpaidUsers[user.attributes.user._id].total = 0;
          }
          unpaidUsers[user.attributes.user._id].push(user);
          return unpaidUsers[user.attributes.user._id].total += user.attributes.order.total;
        });
        return $(this.el).find('#unpaid-users').html(_.template($('#unpaid-users-template').html(), {
          unpaid: unpaidUsers,
          users: this.users
        }));
      };

      BillingView.prototype.render = function() {
        $(this.el).html(_.template($('#billing-page-template').html()));
        return this;
      };

      return BillingView;

    })(Backbone.View);
    routes = new Route();
    return Backbone.history.start();
  });

}).call(this);
