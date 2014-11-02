module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        concat: {
            options: {
                sourceMap: true
            },
            js: {
                src: [
                    'src/scripts/app.js',
                    'src/scripts/directives/**/*.js',
                    'src/scripts/service/**/*.js',
                    'src/scripts/controller/**/*.js'
                ],
                dest: 'dist/app.js'
            },
            lib: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-base64/angular-base64.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-local-storage/dist/angular-local-storage.js',
                    'bower_components/semantic-ui/build/packaged/javascript/semantic.js'
                ],
                dest: 'dist/lib.js'
            },
            css: {
                src: [
                    'bower_components/semantic-ui/build/packaged/css/semantic.css'
                ],
                dest: 'dist/css/app.css'
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/semantic-ui/build/packaged/fonts',
                        src: ['**'],
                        dest: 'dist/fonts'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/semantic-ui/build/packaged/images',
                        src: ['**'],
                        dest: 'dist/images'
                    }
                ]
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

    grunt.registerTask('build:css', [
        'concat:css',
        'copy:main'
    ]);
    grunt.registerTask('build:lib', [
        'concat:lib'
    ]);

    grunt.registerTask('build:js', [
        'concat:js',
        'ngAnnotate:app'
    ]);
    grunt.registerTask('build:dev', [
        'build:css',
        'build:lib',
        'build:js'
    ]);
    grunt.registerTask('dev', [
        'build:dev'
    ]);

}
