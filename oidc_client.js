OIDC = {};

Accounts.oauth.registerService('oidc');

OIDC.requestCredential = function (options, credentialRequestCompleteCallback) {
    // Support a callback without options.
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'oidc'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
        return;
    }

    var credentialToken = Random.id();

    var scope = (options && options.requestPermissions) || [];
    var flatScope = _.map(scope, encodeURIComponent).join('+');

    var loginStyle = OAuth._loginStyle('oidc', config, options);

    var loginUrl =
        'http://localhost:8000/authorize' +
        '?client_id=' + config.clientId +
        '&response_type=code' +
        '&scope=' + 'openid+' + flatScope +
        '&redirect_uri=' + OAuth._redirectUri('oidc', config) +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);

    OAuth.launchLogin({
        loginService: 'oidc',
        loginStyle: loginStyle,
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken,
        popupOptions: { width: 800, height: 700 }
    });
};

Meteor.loginWithOIDC = function(options, callback) {
    // Support a callback without options.
    if (! callback && typeof options === "function") {
        callback = options;
        options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    OIDC.requestCredential(options, credentialRequestCompleteCallback);
};
