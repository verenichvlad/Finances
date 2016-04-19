System.config({
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        },
        'ng2-charts': {
            defaultExtension: 'js'
        }
    },
    map: {
        'ng2-charts': 'app/components/charts'
    }
});
System.import('app/boot')
    .then(null, console.error.bind(console));