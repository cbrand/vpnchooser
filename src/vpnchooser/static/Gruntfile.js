module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        concat: {
            options: {
                sourceMap: true
            },
            js: {
                src: [
                    'src/scripts/app.js',
                    'src/scripts/service/**/*.js',
                    'src/scripts/controller/**/*.js'
                ],
                dest: 'dist/app.js'
            },
            lib: {
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-base64/angular-base64.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js'
                ],
                dest: 'dist/lib.js'
            }
        },

        ngAnnotate: {
            options: {
                // Task-specific options go here.
                singleQuotes: true
            },
            app: {
                // The application.
                files: {
                    'dist/app.js': [
                        'dist/app.js'
                    ]
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: 'build:js'
            },
            libs: {
                files: ['src/libs/**/*.js'],
                tasks: 'build:lib'
            }
        }
    });

    grunt.registerTask('build:lib', [
        'concat:lib'
    ]);

    grunt.registerTask('build:js', [
        'concat:js',
        'ngAnnotate:app'
    ]);
    grunt.registerTask('build:dev', [
        'build:lib',
        'build:js'
    ]);
    grunt.registerTask('dev', [
        'build:dev'
    ]);

}
