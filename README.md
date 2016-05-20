# Meteor OpenID Connect Client

Generic OpenID Connect relying party implementation for Meteor applications.

## Installation

```
$ meteor add juanifioren:oidc-client
```

Then add your info provided by your OIDC Provider on a `settings.json` file.

```
{
    "oidc": {
        "clientId": "399291",
        "secret": "a88720fb53545f129f4530aa6abd58cf"
    }
}
```

Finally, run your app.

```
$ meteor run --settings=settings.json
```

## Contributing

I love contributions, so please feel free to fix bugs, improve things, provide documentation. Just send me a pull request.
