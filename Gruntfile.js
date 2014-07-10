// Generated on 2014-06-20 using generator-webapp-rjs 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/specs/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/specs/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

            // Project settings
            yeoman: {
                // Configurable paths
                app: 'app',
                dist: 'dist',
                test: 'test'
            },

            // Watches files for changes and runs tasks based on the changed files
            watch: {
                js: {
                    files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                    tasks: ['jshint'],
                    options: {
                        livereload: true
                    }
                },
                jstest: {
                    files: ['test/specs/{,*/}*.js'],
                    tasks: ['test:watch']
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= yeoman.app %>/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/images/{,*/}*'
                    ]
                }
            },

            // The actual grunt server settings
            connect: {
                options: {
                    port: 9000,
                    livereload: 35729,
                    // Change this to '0.0.0.0' to access the server from outside
                    hostname: 'localhost'
                },
                livereload: {
                    options: {
                        open: true,
                        base: [
                            '.tmp',
                            '<%= yeoman.app %>'
                        ]
                    }
                },
                test: {
                    options: {
                        port: 9001,
                        base: [
                            '.tmp',
                            'test',
                            '<%= yeoman.app %>',
                            '.'
                        ]
                    }
                },
                dist: {
                    options: {
                        open: true,
                        base: '<%= yeoman.dist %>',
                        livereload: false
                    }
                }
            },

            open: {
                server: {
                    path: 'http://127.0.0.1:9001'
                },
                test  : {
                    path: 'http://127.0.0.1:9001/_SpecRunner.html'
                }
            },

            // Empties folders to start fresh
            clean: {
                dist: {
                    files: [
                        {
                            dot: true,
                            src: [
                                '.tmp',
                                '<%= yeoman.dist %>/*',
                                '!<%= yeoman.dist %>/.git*'
                            ]
                        }
                    ]
                },
                server: '.tmp'
            },

            // Make sure code styles are up to par and there are no obvious mistakes
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                all: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    '!<%= yeoman.app %>/scripts/vendor/*',
                    'test/specs/{,*/}*.js'
                ]
            },

            // Copies remaining files to places other tasks can use
            copy: {
                dist: {
                    files: [
                        {
                            expand: true,
                            dot: true,
                            cwd: '<%= yeoman.app %>',
                            dest: '<%= yeoman.dist %>',
                            src: [
                                '*.{ico,png,txt}',
                                '.htaccess',
                                'images/{,*/}*.webp',
                                '{,*/}*.html',
                                'styles/fonts/{,*/}*.*'
                            ]
                        }
                    ]
                },
                styles: {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/styles',
                    dest: '.tmp/styles/',
                    src: '{,*/}*.css'
                }
            },

            jsdoc: {
                dist: {
                    src: ['<%= yeoman.app %>/scripts/**/*.js', '<%= yeoman.test %>/specs/**/*.js'],
                    options: {
                        destination: '<%= yeoman.dist %>/doc'
                    }
                }
            },

            // Run some tasks in parallel to speed up build process
            concurrent: {
                server: [
                ],
                test: [
                ],
                dist: [
                ]
            },

            jasmine: {
                alicate: {
                    src: '<%= yeoman.app %>/scripts/**/*.js',
                    options: {
                        specs: '<%= yeoman.test %>/specs/**/*.js',
                        host: 'http://127.0.0.1:9001/',
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfigFile: '<%= yeoman.app %>/scripts/config.js'
                        }
                    }
                }
            }
        }
    );

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'jasmine:alicate:build',
                'concurrent:server',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'connect:test',
                'jasmine'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'jasmine'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'copy:dist',
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'bower-install',
        'test',
        'build'
    ]);
}
;
