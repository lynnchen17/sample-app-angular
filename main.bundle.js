webpackJsonp([5,7],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfigService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * This service stores and retrieves user preferences in session storage
 */
var AppConfigService = (function () {
    function AppConfigService() {
        this._sort = '+date';
        this.sort$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](this.parseSort(this.sort));
        this.emailAddress = undefined;
        this.restDelay = 100;
        this.load();
    }
    Object.defineProperty(AppConfigService.prototype, "sort", {
        get: function () { return this._sort; },
        set: function (val) {
            this._sort = val;
            this.sort$.next(this.parseSort(val));
        },
        enumerable: true,
        configurable: true
    });
    AppConfigService.prototype.toObject = function () {
        return {
            sort: this.sort,
            emailAddress: this.emailAddress,
            restDelay: this.restDelay,
        };
    };
    AppConfigService.prototype.parseSort = function (sort) {
        var defaultSort = '+date';
        var sortOrder = sort || defaultSort;
        var pattern = /^([+-])(.*)$/;
        var match = pattern.exec(sortOrder) || pattern.exec(defaultSort);
        var __ = match[0], order = match[1], sortBy = match[2];
        return { sortBy: sortBy, order: (order === '-' ? -1 : 1) };
    };
    AppConfigService.prototype.load = function () {
        try {
            var data = JSON.parse(sessionStorage.getItem('appConfig'));
            return Object.assign(this, data);
        }
        catch (Error) { }
        return this;
    };
    AppConfigService.prototype.save = function () {
        var string = JSON.stringify(this.toObject());
        sessionStorage.setItem('appConfig', string);
    };
    AppConfigService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], AppConfigService);
    return AppConfigService;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/app-config.service.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_config_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_util__ = __webpack_require__(271);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * This service emulates an Authentication Service.
 */
var AuthService = (function () {
    function AuthService(appConfig) {
        this.appConfig = appConfig;
        // data
        this.usernames = ['myself@angular.dev', 'devgal@angular.dev', 'devguy@angular.dev'];
    }
    /**
     * Returns true if the user is currently authenticated, else false
     */
    AuthService.prototype.isAuthenticated = function () {
        return !!this.appConfig.emailAddress;
    };
    /**
     * Fake authentication function that returns a promise that is either resolved or rejected.
     *
     * Given a username and password, checks that the username matches one of the known
     * usernames (this.usernames), and that the password matches 'password'.
     *
     * Delays 800ms to simulate an async REST API delay.
     */
    AuthService.prototype.authenticate = function (username, password) {
        var _this = this;
        var appConfig = this.appConfig;
        // checks if the username is one of the known usernames, and the password is 'password'
        var checkCredentials = function () { return new Promise(function (resolve, reject) {
            var validUsername = _this.usernames.indexOf(username) !== -1;
            var validPassword = password === 'password';
            return (validUsername && validPassword) ? resolve(username) : reject('Invalid username or password');
        }); };
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_util__["a" /* wait */])(800)
            .then(checkCredentials)
            .then(function (authenticatedUser) {
            appConfig.emailAddress = authenticatedUser;
            appConfig.save();
        });
    };
    /** Logs the current user out */
    AuthService.prototype.logout = function () {
        this.appConfig.emailAddress = undefined;
        this.appConfig.save();
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_config_service__["a" /* AppConfigService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__app_config_service__["a" /* AppConfigService */]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/auth.service.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_router_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_router_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ui_router_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pushToArr; });
/* unused harmony export uniqReduce */
/* unused harmony export flattenReduce */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return guid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return copy; });

/** Some utility functions used by the application */
var setProp = function (obj, key, val) { obj[key] = val; return obj; };
var pushToArr = function (array, item) { array.push(item); return array; };
var uniqReduce = function (arr, item) { return arr.indexOf(item) !== -1 ? arr : pushToArr(arr, item); };
var flattenReduce = function (arr, item) { return arr.concat(item); };
var guidChar = function (c) { return c !== 'x' && c !== 'y' ? '-' : Math.floor(Math.random() * 16).toString(16).toUpperCase(); };
var guid = function () { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('').map(guidChar).join(''); };
// A function that returns a promise which resolves after a timeout
var wait = function (delay) { return new Promise(function (resolve) { return setTimeout(resolve, delay); }); };
var copy = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ui_router_core__["pattern"])([
    [Array.isArray, function (val) { return val.map(copy); }],
    [__WEBPACK_IMPORTED_MODULE_0_ui_router_core__["isObject"], function (val) { return Object.keys(val).reduce(function (acc, key) { return (acc[key] = copy(val[key]), acc); }, {}); }],
    [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ui_router_core__["val"])(true), __WEBPACK_IMPORTED_MODULE_0_ui_router_core__["identity"]]
]);
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/util.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dialog_component__ = __webpack_require__(354);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogService = (function () {
    function DialogService(resolver) {
        this.factory = resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_1__dialog_component__["a" /* DialogComponent */]);
    }
    DialogService.prototype.confirm = function (message, details, yesMsg, noMsg) {
        if (details === void 0) { details = 'Are you sure?'; }
        if (yesMsg === void 0) { yesMsg = 'Yes'; }
        if (noMsg === void 0) { noMsg = 'No'; }
        var componentRef = this.vcRef.createComponent(this.factory);
        var component = componentRef.instance;
        component.message = message;
        component.details = details;
        component.yesMsg = yesMsg;
        component.noMsg = noMsg;
        var destroy = function () { return componentRef.destroy(); };
        component.promise.then(destroy, destroy);
        return component.promise;
    };
    DialogService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ComponentFactoryResolver */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ComponentFactoryResolver */]) === 'function' && _a) || Object])
    ], DialogService);
    return DialogService;
    var _a;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/dialog.service.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_dialog_service__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ui_router_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ui_router_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ui_router_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_auth_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_app_config_service__ = __webpack_require__(120);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * This is the main app component for an authenticated user.
 *
 * This component renders the outermost chrome
 * (application header and tabs, the compose  and logout button)
 * It has a `ui-view` viewport for nested states to fill in.
 */
var AppComponent = (function () {
    function AppComponent(appConfig, authService, $state, dialog) {
        this.authService = authService;
        this.$state = $state;
        this.dialog = dialog;
        this.emailAddress = appConfig.emailAddress;
        this.isAuthenticated = authService.isAuthenticated();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.dialog.vcRef = this.dialogdiv;
    };
    AppComponent.prototype.show = function () {
        this.dialog.confirm('foo');
    };
    AppComponent.prototype.logout = function () {
        var _a = this, authService = _a.authService, $state = _a.$state;
        authService.logout();
        // Reload states after authentication change
        return $state.go('welcome', {}, { reload: true });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ViewChild */])('dialogdiv', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ViewContainerRef */] }), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "dialogdiv", void 0);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Component */])({
            selector: 'app-root',
            template: "\n    <div #dialogdiv></div>\n    <div class=\"navheader\">\n      <ul *ngIf=\"isAuthenticated\" class=\"nav nav-tabs\">\n\n        <li uiSrefActive=\"active\"> <a uiSref=\"mymessages\" role=\"button\"> Messages </a> </li>\n        <li uiSrefActive=\"active\"> <a uiSref=\"contacts\" role=\"button\"> Contacts </a> </li>\n        <li uiSrefActive=\"active\"> <a uiSref=\"prefs\" role=\"button\"> Preferences </a> </li>\n\n        <li class=\"navbar-right\">\n          <button class=\"btn btn-primary fa fa-home\" uiSref=\"home\"></button>\n          <button style=\"margin-right: 15px;\" class=\"btn btn-primary\" uiSref=\"mymessages.compose\">\n            <i class=\"fa fa-envelope\"></i> New Message\n          </button>\n        </li>\n\n        <li class=\"navbar-text navbar-right logged-in-user\" style=\"margin: 0.5em 1.5em;\">\n          <div>\n            {{emailAddress}} <i class=\"fa fa-chevron-down\"></i>\n            <div class=\"hoverdrop\">\n              <button class=\"btn btn-primary\" (click)=\"logout()\">Log Out</button>\n            </div>\n          </div>\n        </li>\n\n      </ul>\n    </div>\n\n    <ui-view></ui-view>\n",
            styles: []
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__global_app_config_service__["a" /* AppConfigService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__global_app_config_service__["a" /* AppConfigService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__global_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ui_router_core__["StateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ui_router_core__["StateService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__global_dialog_service__["a" /* DialogService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__global_dialog_service__["a" /* DialogService */]) === 'function' && _d) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/app.component.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_util__ = __webpack_require__(271);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogComponent = (function () {
    function DialogComponent() {
        var _this = this;
        this.dialog = true;
        this.promise = new Promise(function (resolve, reject) {
            _this.yes = function () {
                _this.visible = false;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* wait */])(300).then(resolve);
            };
            _this.no = function () {
                _this.visible = false;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* wait */])(300).then(reject);
            };
        });
    }
    DialogComponent.prototype.yes = function () { };
    DialogComponent.prototype.no = function () { };
    DialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_util__["a" /* wait */])(50).then(function () { return _this.visible = true; });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* HostBinding */])('class.dialog'), 
        __metadata('design:type', Object)
    ], DialogComponent.prototype, "dialog", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* HostBinding */])('class.active'), 
        __metadata('design:type', Boolean)
    ], DialogComponent.prototype, "visible", void 0);
    DialogComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Component */])({
            selector: 'app-dialog',
            template: "\n      <div class=\"backdrop\" [class.active]=\"visible\"></div>\n      <div class='wrapper'>\n        <div class=\"content\">\n          <h4 *ngIf=\"message\">{{message}}</h4>\n          <div [hidden]=\"!details\">{{details}}</div>\n    \n          <div style=\"padding-top: 1em;\">\n            <button class=\"btn btn-primary\" (click)=\"yes()\">{{yesMsg}}</button>\n            <button class=\"btn btn-primary\" (click)=\"no()\">{{noMsg}}</button>\n          </div>\n        </div>\n      </div>\n",
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], DialogComponent);
    return DialogComponent;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/dialog.component.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// This is a home component for authenticated users.
// It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Component */])({
            selector: 'app-home',
            template: "\n    <div class=\"home buttons\">\n      <button uiSref=\"mymessages\" class=\"btn btn-primary\">\n        <h1><i class=\"fa fa-envelope\"></i></h1>\n        <h1>Messages</h1>\n      </button>\n\n      <button uiSref=\"contacts\" class=\"btn btn-primary\">\n      <h1><i class=\"fa fa-users\"></i></h1>\n      <h1>Contacts</h1>\n      </button>\n\n      <button uiSref=\"prefs\" class=\"btn btn-primary\">\n        <h1><i class=\"fa fa-cogs\"></i></h1>\n        <h1>Preferences</h1>\n      </button>\n    </div>\n",
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/home.component.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ui_router_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ui_router_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ui_router_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_auth_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_app_config_service__ = __webpack_require__(120);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * This component renders a faux authentication UI
 *
 * It prompts for the username/password (and gives hints with bouncy arrows)
 * It shows errors if the authentication failed for any reason.
 */
var LoginComponent = (function () {
    function LoginComponent(appConfig, authService, $state) {
        this.authService = authService;
        this.$state = $state;
        this.credentials = { username: null, password: null };
        this.usernames = authService.usernames;
        this.credentials = {
            username: appConfig.emailAddress,
            password: 'password'
        };
    }
    /**
     * The controller for the `login` component
     *
     * The `login` method validates the credentials.
     * Then it sends the user back to the `returnTo` state, which is provided as a resolve data.
     */
    LoginComponent.prototype.login = function (credentials) {
        var _this = this;
        this.authenticating = true;
        var returnToOriginalState = function () {
            var state = _this.returnTo.state();
            var params = _this.returnTo.params();
            var options = Object.assign({}, _this.returnTo.options(), { reload: true });
            _this.$state.go(state, params, options);
        };
        var showError = function (errorMessage) {
            return _this.errorMessage = errorMessage;
        };
        var stop = function () { return _this.authenticating = false; };
        this.authService.authenticate(credentials.username, credentials.password)
            .then(returnToOriginalState)
            .catch(showError)
            .then(stop, stop);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ui_router_core__["TargetState"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ui_router_core__["TargetState"]) === 'function' && _a) || Object)
    ], LoginComponent.prototype, "returnTo", void 0);
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Component */])({
            selector: 'app-login',
            template: "\n    <div class=\"container\">\n      <div class=\"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">\n        <h3>Log In</h3>\n        <p>\n          (This login screen is for demonstration only... \n          just pick a username, enter 'password' and click <b>\"Log in\"</b>)</p>\n        <hr>\n    \n        <div>\n          <label for=\"username\">Username:</label>\n          <select class=\"form-control\" name=\"username\" id=\"username\" [(ngModel)]=\"credentials.username\">\n            <option *ngFor=\"let username of usernames\" [value]=\"username\">{{username}}</option>\n          </select>\n          \n          <i style=\"position: relative; bottom: 1.8em; margin-left: 10em; height: 0\"\n              *ngIf=\"!credentials.username\" class=\"fa fa-arrow-left bounce-horizontal\"> Choose </i>\n        </div>\n        <br>\n    \n        <div>\n          <label for=\"password\">Password:</label>\n          <input class=\"form-control\" type=\"password\" name=\"password\" [(ngModel)]=\"credentials.password\">\n          <i style=\"position: relative; bottom: 1.8em; margin-left: 5em; height: 0\"\n              *ngIf=\"credentials.username && credentials.password !== 'password'\" class=\"fa fa-arrow-left bounce-horizontal\">\n            Enter '<b>password</b>' here\n          </i>\n        </div>\n    \n        <div [hidden]=\"!errorMessage\" class=\"well error\">{{ errorMessage }}</div>\n    \n        <hr>\n        <div>\n          <button class=\"btn btn-primary\" type=\"button\" [disabled]=\"authenticating\" (click)=\"login(credentials)\">\n            <i class=\"fa fa-spin fa-spinner\" *ngIf=\"authenticating\"></i> <span>Log in</span>\n          </button>\n          <i *ngIf=\"credentials.username || credentials.password !== 'password'\" \n          style=\"position: relative;\" class=\"fa fa-arrow-left bounce-horizontal\"> Click Me!</i>\n        </div>\n      </div>\n    </div>\n",
            styles: []
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__global_app_config_service__["a" /* AppConfigService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__global_app_config_service__["a" /* AppConfigService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__global_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__global_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ui_router_core__["StateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ui_router_core__["StateService"]) === 'function' && _d) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/login.component.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WelcomeComponent = (function () {
    function WelcomeComponent() {
    }
    WelcomeComponent.prototype.ngOnInit = function () {
    };
    WelcomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Component */])({
            selector: 'app-welcome',
            template: "\n    <div class=\"container-fluid\">\n    \n      <h3>UI-Router Sample App</h3>\n    \n      <p>Welcome to the sample app!</p>\n      <p>This is a demonstration app intended to highlight some patterns that can be used within UI-Router.\n        These patterns should help you to to build cohesive, robust apps.  Additionally, this app uses state-vis\n        to show the tree of states, and a transition log visualizer.</p>\n    \n      <h4>App Overview</h4>\n      <p>\n        First, start exploring the application's functionality at a high level by activating\n        one of the three submodules: Messages, Contacts, or Preferences. If you are not already logged in,\n        you will be taken to an authentication screen (the authentication is fake; the password is \"password\")\n      </p>\n      <div>\n        <button class=\"btn btn-primary\" uiSref=\"mymessages\"><i class=\"fa fa-envelope\"></i><span>Messages</span></button>\n        <button class=\"btn btn-primary\" uiSref=\"contacts\"><i class=\"fa fa-users\"></i><span>Contacts</span></button>\n        <button class=\"btn btn-primary\" uiSref=\"prefs\"><i class=\"fa fa-cogs\"></i><span>Preferences</span></button>\n      </div>\n    \n      <h4>Patterns and Recipes</h4>\n      <ul>\n        <li>Require Authentication</li>\n        <li>Previous State</li>\n        <li>Redirect Hook</li>\n        <li>Default Param Values</li>\n      </ul>\n    </div>\n",
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/welcome.component.js.map

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./contacts/contacts.module": [
		783,
		1
	],
	"./mymessages/mymessages.module": [
		784,
		0
	],
	"./prefs/prefs.module": [
		785,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 433;


/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(549);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/main.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__welcome_component__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_component__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ui_router_ng2__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_states__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__global_global_module__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__router_config__ = __webpack_require__(553);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__welcome_component__["a" /* WelcomeComponent */],
                __WEBPACK_IMPORTED_MODULE_6__login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_7__home_component__["a" /* HomeComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_8_ui_router_ng2__["UIRouterModule"].forRoot({
                    states: __WEBPACK_IMPORTED_MODULE_9__app_states__["a" /* APP_STATES */],
                    useHash: true,
                    otherwise: { state: 'home' },
                    config: __WEBPACK_IMPORTED_MODULE_11__router_config__["a" /* routerConfigFn */],
                }),
                __WEBPACK_IMPORTED_MODULE_10__global_global_module__["a" /* GlobalModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["c" /* NgModuleFactoryLoader */], useClass: __WEBPACK_IMPORTED_MODULE_1__angular_core__["d" /* SystemJsNgModuleLoader */] }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8_ui_router_ng2__["UIView"]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/app.module.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__welcome_component__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_component__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ui_router_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ui_router_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ui_router_core__);
/* unused harmony export appState */
/* unused harmony export welcomeState */
/* unused harmony export homeState */
/* unused harmony export loginState */
/* unused harmony export returnTo */
/* unused harmony export contactsFutureState */
/* unused harmony export prefsFutureState */
/* unused harmony export mymessagesFutureState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_STATES; });





/**
 * This is the parent state for the entire application.
 *
 * This state's primary purposes are:
 * 1) Shows the outermost chrome (including the navigation and logout for authenticated users)
 * 2) Provide a viewport (ui-view) for a substate to plug into
 */
var appState = {
    name: 'app',
    redirectTo: 'welcome',
    component: __WEBPACK_IMPORTED_MODULE_0__app_component__["a" /* AppComponent */],
};
/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
var welcomeState = {
    parent: 'app',
    name: 'welcome',
    url: '/welcome',
    component: __WEBPACK_IMPORTED_MODULE_1__welcome_component__["a" /* WelcomeComponent */],
};
/**
 * This is a home screen for authenticated users.
 *
 * It shows giant buttons which activate their respective submodules: Messages, Contacts, Preferences
 */
var homeState = {
    parent: 'app',
    name: 'home',
    url: '/home',
    component: __WEBPACK_IMPORTED_MODULE_2__home_component__["a" /* HomeComponent */],
};
/**
 * This is the login state.  It is activated when the user navigates to /login, or if a unauthenticated
 * user attempts to access a protected state (or substate) which requires authentication. (see routerhooks/requiresAuth.js)
 *
 * It shows a fake login dialog and prompts the user to authenticate.  Once the user authenticates, it then
 * reactivates the state that the user originally came from.
 */
var loginState = {
    parent: 'app',
    name: 'login',
    url: '/login',
    component: __WEBPACK_IMPORTED_MODULE_3__login_component__["a" /* LoginComponent */],
    resolve: [
        { token: 'returnTo', deps: [__WEBPACK_IMPORTED_MODULE_4_ui_router_core__["Transition"]], resolveFn: returnTo },
    ]
};
/**
 * A resolve function for 'login' state which figures out what state to return to, after a successful login.
 *
 * If the user was initially redirected to login state (due to the requiresAuth redirect), then return the toState/params
 * they were redirected from.  Otherwise, if they transitioned directly, return the fromState/params.  Otherwise
 * return the main "home" state.
 */
function returnTo($transition$) {
    if ($transition$.redirectedFrom() != null) {
        // The user was redirected to the login state (e.g., via the requiresAuth hook when trying to activate contacts)
        // Return to the original attempted target state (e.g., contacts)
        return $transition$.redirectedFrom().targetState();
    }
    var $state = $transition$.router.stateService;
    // The user was not redirected to the login state; they directly activated the login state somehow.
    // Return them to the state they came from.
    if ($transition$.from().name !== '') {
        return $state.target($transition$.from(), $transition$.params('from'));
    }
    // If the fromState's name is empty, then this was the initial transition. Just return them to the home state
    return $state.target('home');
}
// This future state is a placeholder for all the lazy loaded Contacts states
// The Contacts NgModule isn't loaded until a Contacts link is activated
var contactsFutureState = {
    name: 'contacts.**',
    url: '/contacts',
    loadChildren: './contacts/contacts.module#ContactsModule'
};
// This future state is a placeholder for the lazy loaded Prefs states
var prefsFutureState = {
    name: 'prefs.**',
    url: '/prefs',
    loadChildren: './prefs/prefs.module#PrefsModule'
};
// This future state is a placeholder for the lazy loaded My Messages feature module
var mymessagesFutureState = {
    name: 'mymessages.**',
    url: '/mymessages',
    loadChildren: './mymessages/mymessages.module#MymessagesModule'
};
var APP_STATES = [
    appState,
    welcomeState,
    homeState,
    loginState,
    contactsFutureState,
    prefsFutureState,
    mymessagesFutureState,
];
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/app.states.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__(157);
/* harmony export (immutable) */ __webpack_exports__["a"] = requiresAuthHook;

/**
 * This file contains a Transition Hook which protects a
 * route that requires authentication.
 *
 * This hook redirects to /login when both:
 * - The user is not authenticated
 * - The user is navigating to a state that requires authentication
 */
function requiresAuthHook(transitionService) {
    // Matches if the destination state's data property has a truthy 'requiresAuth' property
    var requiresAuthCriteria = {
        to: function (state) { return state.data && state.data.requiresAuth; }
    };
    // Function that returns a redirect for the current transition to the login state
    // if the user is not currently authenticated (according to the AuthService)
    var redirectToLogin = function (transition) {
        var authService = transition.injector().get(__WEBPACK_IMPORTED_MODULE_0__auth_service__["a" /* AuthService */]);
        var $state = transition.router.stateService;
        if (!authService.isAuthenticated()) {
            return $state.target('login', undefined, { location: false });
        }
    };
    // Register the "requires auth" hook with the TransitionsService
    transitionService.onBefore(requiresAuthCriteria, redirectToLogin, { priority: 10 });
}
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/auth.hook.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config_service__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialog_component__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dialog_service__ = __webpack_require__(272);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GlobalModule = (function () {
    function GlobalModule() {
    }
    GlobalModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* CommonModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__app_config_service__["a" /* AppConfigService */],
                __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_5__dialog_service__["a" /* DialogService */],
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__dialog_component__["a" /* DialogComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_4__dialog_component__["a" /* DialogComponent */]],
        }), 
        __metadata('design:paramtypes', [])
    ], GlobalModule);
    return GlobalModule;
}());
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/global.module.js.map

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_router_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_router_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ui_router_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_ga__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_auth_hook__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ui_router_visualizer__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ui_router_visualizer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ui_router_visualizer__);
/* harmony export (immutable) */ __webpack_exports__["a"] = routerConfigFn;




function routerConfigFn(router) {
    var transitionService = router.transitionService;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__global_auth_hook__["a" /* requiresAuthHook */])(transitionService);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_ga__["a" /* googleAnalyticsHook */])(transitionService);
    router.trace.enable(__WEBPACK_IMPORTED_MODULE_0_ui_router_core__["Category"].TRANSITION);
    router.plugin(__WEBPACK_IMPORTED_MODULE_3_ui_router_visualizer__["Visualizer"]);
}
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/router.config.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = googleAnalyticsHook;
/** Google analytics */
/* tslint:disable */
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * (new Date());
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
var ga = window['ga'];
ga('create', 'UA-73329341-1', 'auto');
ga('send', 'pageview');
function googleAnalyticsHook(transitionService) {
    transitionService.onBefore({}, function (transition) {
        var path = transition.treeChanges().to
            .map(function (node) { return node.state.self.url; })
            .filter(function (x) { return x != null && x !== '^'; })
            .join('');
        var vpv = function (path) { return ga('send', 'pageview', path); };
        var success = function () { vpv(path); };
        var error = function (err) {
            var errType = err && err.hasOwnProperty("type") ? err.type : '_';
            path = path.replace(/^\//, "");
            vpv("/errors/" + errType + "/" + path);
        };
        transition.promise.then(success, error);
    });
}
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/ga.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/christhielen/projects/sample-app-ng2/src/environment.js.map

/***/ }),

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(434);


/***/ })

},[780]);
//# sourceMappingURL=main.bundle.map