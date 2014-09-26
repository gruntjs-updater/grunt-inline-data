/*
 * grunt-inline-data
 * https://github.com/xiaokai/grunt-inline-data
 *
 * Copyright (c) 2014 xiaokai
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
            dist: ['test/dist']
        },

        // css压缩  
        cssmin: {
            minify: {
                expand: true,
                cwd: 'test/src/',
                src: ['*.css'],
                dest: 'test/dist/',
                ext: '.min.css'
            }
        },
        // html压缩
        htmlmin: {
            dist: {
                options: {
                    // removeAttributeQuotes: true,
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: 'test/src/',
                    src: ['*.tpl'],
                    dest: 'test/dist/',
                    ext: '.min.tpl'
                }]
            }
        },
        // Configuration to be run (and then tested).
        inline_data: {
            dist: {
                src: ['test/src/app.js'],
                dest: ['tmp/appinline.js']
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    // css压缩
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'cssmin', 'htmlmin' ,'inline_data', 'clean:dist']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
