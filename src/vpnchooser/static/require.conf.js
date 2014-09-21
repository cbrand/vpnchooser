requirejs.config({
    baseUrl: './src/scripts',
    out: './dist/main.js',
    paths: {
        'angular': './bower_components/angular/angular',
        'angular-resource': './bower_components/angular-resource/angular-resource.js',
        'jquery': './bower_components/jquery/dist/jquery'
    }
});