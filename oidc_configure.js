Template.configureLoginServiceDialogForOIDC.helpers({
    siteUrl: function () {
        return Meteor.absoluteUrl();
    }
});

Template.configureLoginServiceDialogForOIDC.fields = function () {
    return [
        { property: 'clientId', label: 'Key' },
        { property: 'secret', label: 'Secret' }
    ];
};
