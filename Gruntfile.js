
module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    coveralls: {
      options: {
        // LCOV coverage file relevant to every target 
        //src: 'test-results/lcov.info',
   
        // When true, grunt-coveralls will only print a warning rather than 
        // an error, to prevent CI builds from failing unnecessarily (e.g. if 
        // coveralls.io is down). Optional, defaults to false. 
        force: false
      },
      main_target: {
        src: "test-results/lcov.info"
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      watch: {
        configFile: 'test/karma.conf.js',
        singleRun: false
      }
    },
    david: {
      all: {
        options: {
          update: true
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/color-module.js', 'test/**/*.js']
    }
  });

  grunt.registerTask('default', [
    'jshint:all',
    'karma:unit',
  ]);

  grunt.registerTask('test', [
    'jshint:all',
    'karma:unit',
    'coveralls:main_target',
    'david:all'
  ]);

  grunt.registerTask('watch', [
    'karma:watch'
  ]);
};
