(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _.templateSettings = {
    evaluate: /<@([\s\S]+?)@>/g,
    interpolate: /<@=([\s\S]+?)@>/g,
    escape: /<@-([\s\S]+?)@>/g
  };

  $(function() {
    var AppMenuView, IndexView, PreferencesParamsView, PreferencesSendView, PreferencesTeamView, PreferencesUserView, PreferencesView, Route, Views, routes, suppliersData, usersData;
    usersData = [
      {
        'name': 'John Doe'
      }, {
        'name': 'Chris Wonder'
      }
    ];
    suppliersData = [
      {
        id: 23,
        name: 'Лидо',
        address: 'lido@lido.by',
        cc: 'lido2@lido.by',
        subject: 'mail subject',
        template: 'template mail mail template',
        min_order: 120000
      }, {
        id: 35,
        name: 'Пивнуха',
        address: '1lido@lido.by',
        cc: '1lido2@lido.by',
        subject: '1mail subject',
        template: '1template mail mail template',
        min_order: 100000
      }
    ];
    Route = (function(_super) {

      __extends(Route, _super);

      function Route() {
        return Route.__super__.constructor.apply(this, arguments);
      }

      Route.prototype.routes = {
        "": "index",
        "!/": "index",
        "!/menu": "menu",
        "!/suppliers": "supplier",
        "!/preferences": "preferences",
        "!/order": "order"
      };

      Route.prototype.initialize = function() {
        return new AppMenuView();
      };

      Route.prototype.index = function() {
        return new IndexView();
      };

      Route.prototype.menu = function() {};

      Route.prototype.suppliers = function() {};

      Route.prototype.preferences = function() {
        return new PreferencesView();
      };

      Route.prototype.order = function() {};

      return Route;

    })(Backbone.Router);
    Views = {};
    AppMenuView = (function(_super) {

      __extends(AppMenuView, _super);

      function AppMenuView() {
        return AppMenuView.__super__.constructor.apply(this, arguments);
      }

      AppMenuView.prototype.el = "#app-menu";

      AppMenuView.prototype.tagName = 'li';

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
        this.collection = new SupplierList();
        this.collection.fetch();
        this.supplierId = $(this.supplierContainer).val();
        this.render();
        return this.collection.on("reset", this.render, this);
      };

      PreferencesSendView.prototype.events = function() {
        return {
          'click button': 'save',
          'click #add-supplier': 'addSupplier'
        };
      };

      PreferencesSendView.prototype.render = function() {
        var preferencesFields,
          _this = this;
        this.model = this.collection.get('4ffc462b7293dd8c12000001');
        $(this.el).html(_.template($('#preferences-send-template').html()));
        preferencesFields = $(this.el);
        if (this.model) {
          _.each(this.model.attributes, function(item, key) {
            return preferencesFields.find('[name="' + key + '"]').val(item);
          });
        }
        return this;
      };

      PreferencesSendView.prototype.save = function() {
        var formData, preferencesFields, supplierData,
          _this = this;
        formData = [];
        preferencesFields = $(this.el).find('input, textarea');
        supplierData = {};
        _.each(suppliersData, function(item) {
          if (item.id === _this.model.id) {
            return supplierData = item;
          }
        });
        suppliersData = _.map(preferencesFields, function(item) {
          var key, value;
          key = $(item).attr('name');
          value = $(item).val();
          formData[key] = value;
          return supplierData[key] = value;
        });
        return this.model.set(formData);
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

      PreferencesParamsView.prototype.el = "#preferences-form .params";

      PreferencesParamsView.prototype.initialize = function() {
        return this.render();
      };

      PreferencesParamsView.prototype.events = function() {
        return {
          'click button': 'save'
        };
      };

      PreferencesParamsView.prototype.render = function() {
        var preferencesFields,
          _this = this;
        $(this.el).html(_.template($('#preferences-params-template').html()));
        preferencesFields = $(this.el);
        _.each(this.model.attributes, function(item, key) {
          return preferencesFields.find('[name="' + key + '"]').val(item);
        });
        return this;
      };

      PreferencesParamsView.prototype.save = function() {
        var formData, preferencesFields, supplierData,
          _this = this;
        formData = [];
        preferencesFields = $(this.el).find('input, textarea');
        supplierData = {};
        _.each(suppliersData, function(item) {
          if (item.id === _this.model.id) {
            return supplierData = item;
          }
        });
        suppliersData = _.map(preferencesFields, function(item) {
          var key, value;
          key = $(item).attr('name');
          value = $(item).val();
          formData[key] = value;
          return supplierData[key] = value;
        });
        return this.model.set(formData);
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
          usersData.push({
            name: userName
          });
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
        var removedUsersData,
          _this = this;
        removedUsersData = removedUser.attributes;
        return _.each(usersData, function(user) {
          if (_.isEqual(user, removedUsersData)) {
            return usersData.splice(_.indexOf(usersData, user), 1);
          }
        });
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

      PreferencesView.prototype.el = "#preferences";

      PreferencesView.prototype.supplierId = void 0;

      PreferencesView.prototype.initialize = function() {
        this.render();
        $(this.el).find('ul li:eq(0)').addClass('active');
        return this.loadPreferences('send');
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
        switch (name) {
          case 'send':
            return new PreferencesSendView();
          case 'params':
            return new PreferencesParamsView();
          case 'team':
            return new PreferencesTeamView();
        }
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
    routes = new Route();
    return Backbone.history.start();
  });

}).call(this);
