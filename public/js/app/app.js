(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _.templateSettings = {
    evaluate: /<@([\s\S]+?)@>/g,
    interpolate: /<@=([\s\S]+?)@>/g,
    escape: /<@-([\s\S]+?)@>/g
  };

  $(function() {
    var AppMenuView, IndexView, PreferencesParamsView, PreferencesSendView, PreferencesTeamView, PreferencesView, Route, Views, routes;
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
    PreferencesSendView = (function(_super) {

      __extends(PreferencesSendView, _super);

      function PreferencesSendView() {
        return PreferencesSendView.__super__.constructor.apply(this, arguments);
      }

      PreferencesSendView.prototype.el = "#preferences-form";

      PreferencesSendView.prototype.initialize = function() {
        return this.render();
      };

      PreferencesSendView.prototype.render = function() {
        $(this.el).html(_.template($('#preferences-send-template').html()));
        return this;
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
        return this.render();
      };

      PreferencesParamsView.prototype.render = function() {
        $(this.el).html(_.template($('#preferences-send-template').html()));
        return this;
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
        return this.render();
      };

      PreferencesTeamView.prototype.render = function() {
        $(this.el).html(_.template($('#preferences-send-template').html()));
        return this;
      };

      return PreferencesTeamView;

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
          'click #preferences-tabs li': 'switchTab'
        };
      };

      PreferencesView.prototype.switchTab = function(e) {
        var li;
        $(this.el).find('li').removeClass("active");
        li = $(e.target).parent();
        li.addClass("active");
        return this.loadPreferences(li.attr("form-name"));
      };

      PreferencesView.prototype.loadPreferences = function(name) {
        var preferencesViews;
        preferencesViews = {
          send: new PreferencesSendView(),
          parameters: new PreferencesParamsView(),
          team: new PreferencesTeamView()
        };
        return preferencesViews[name];
      };

      PreferencesView.prototype.render = function() {
        $(this.el).html(_.template($('#preferences-template').html()));
        return this;
      };

      PreferencesView.prototype.remove = function() {
        return console.log("remove");
      };

      PreferencesView.prototype.clear = function() {
        return console.log("clear");
      };

      return PreferencesView;

    })(Backbone.View);
    routes = new Route();
    return Backbone.history.start();
  });

}).call(this);
