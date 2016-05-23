# Meteor OpenID Connect Client

Generic OpenID Connect relying party implementation for Meteor applications.

## Usage

### Setting Up

```
$ meteor add juanifioren:oidc-client
```

Add your info provided by your OIDC Provider on a `settings.json` file.

```
{
    "oidc": {
        "authEndpoint": "http://localhost:8000/authorize/",
        "tokenEndpoint": "http://localhost:8000/token/",
        "userinfoEndpoint": "http://localhost:8000/userinfo/",
        "clientId": "399291",
        "secret": "a88720fb53545f129f4530aa6abd58cf"
    }
}
```

Manage configuration with the `service-configuration` package. Then create a file on server-side.

```
ServiceConfiguration.configurations.upsert({ service: "oidc" }, {
    $set: {
        authEndpoint: Meteor.settings.oidc.authEndpoint,
        tokenEndpoint: Meteor.settings.oidc.tokenEndpoint,
        userinfoEndpoint: Meteor.settings.oidc.userinfoEndpoint,
        clientId: Meteor.settings.oidc.clientId,
        loginStyle: "popup",
        secret: Meteor.settings.oidc.secret
    }
});
```

Run your app.

```
$ meteor run --settings=settings.json
```

### Launching Popup

Somewhere on a client-side script.

```
Meteor.loginWithOIDC({
    requestPermissions: ['email']
}, function (err) {
    if (err)
        console.log(err);
});
```

## Contributing

I love contributions, so please feel free to fix bugs, improve things, provide documentation. Just send me a pull request.
