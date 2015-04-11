
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
        force: false
      },
      main: {
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
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'lib/color-module.js', 'test/**/*.js']
    },
    uglify: {
      main: {
        files: {
          'dist/color-module.min.js': ['lib/color-module.js']
        }
      }
    }
  });

  grunt.registerTask('default', [
    'jshint:all',
    'karma:unit'
  ]);

  grunt.registerTask('test', [
    'jshint:all',
    'karma:unit'
  ]);

  grunt.registerTask('watch', [
    'jshint:all',
    'karma:watch'
  ]);

  grunt.registerTask('ci', [
    'jshint:all',
    'karma:unit',
    'coveralls:main',
    'david:all'
  ]);

  grunt.registerTask('build', [
    'jshint:all',
    'karma:unit',
    'uglify:main'
  ]);
};
