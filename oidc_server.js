OIDC = {};

Accounts.oauth.registerService('oidc');

OAuth.registerService('oidc', 2, null, function(query) {

    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);

    return {
        serviceData: {
            id: identity.email,
            accessToken: accessToken
        },
        options: { profile: { name: identity.email } }
    };
});

Accounts.addAutopublishFields({
    forLoggedInUser: ['services.oidc'],
    forOtherUsers: ['services.oidc.id']
});

var getAccessToken = function (query) {

    var config = ServiceConfiguration.configurations.findOne({ service: 'oidc' });
    if (!config) {
        throw new ServiceConfiguration.ConfigError();
    }

    var response;
    try {
        response = HTTP.post(config.tokenEndpoint, {
            params: {
                code: query.code,
                client_id: config.clientId,
                client_secret: OAuth.openSecret(config.secret),
                grant_type: 'authorization_code',
                redirect_uri: OAuth._redirectUri('oidc', config),
                state: query.state
            }
        });
    } catch (err) {
        throw _.extend(new Error("Failed to complete OpenID Connect handshake with your provider. " + err.message), { response: err.response });
    }

    if (response.data.error) {
        throw new Error("Failed to complete OpenID Connect handshake with your provider. " + response.data.error);
    } else {
        return response.data.access_token;
    }
};

var getIdentity = function (accessToken) {
    var config = ServiceConfiguration.configurations.findOne({ service: 'oidc' });
    if (!config) {
        throw new ServiceConfiguration.ConfigError();
    }

    try {
        var response = HTTP.get(config.userinfoEndpoint, {
            params: {
                access_token: accessToken
            }
        });
        return response.data;
    } catch (err) {
        throw _.extend(new Error("Failed to fetch identity from your provider. " + err.message), { response: err.response });
    }
};

OIDC.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
