
module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // sauce labs launchers
  var customLaunchers = {
    ie: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9'
    },
    firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    }
  };

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
      },
      ci: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        sauceLabs: {
            testName: 'Color Module Tests'
        },
        reporters: ['progress','coverage','saucelabs'],
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers)
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
      all: ['Gruntfile.js', 'lib/*.js', 'test/**/*.js']
    },
    uglify: {
      main: {
        files: {
          'dist/color-module.min.js': ['dist/color-module.js']
        }
      }
    },
    concat: {
      dist: {
        src: [
          'lib/util.js',
          'lib/convert.js',
          'lib/parse.js',
          'lib/format.js',
          'lib/color-module.js'
        ],
        dest: 'dist/color-module.js',
        options: {
          banner: ";var Color = (function(Math){\n'use strict';",
          footer: "\nreturn Color;}(Math));"
        }
      }
    }
  });

  grunt.registerTask('default', [
    'concat:dist',
    'jshint:all',
    'karma:unit'
  ]);

  grunt.registerTask('test', [
    'concat:dist',
    'jshint:all',
    'karma:unit'
  ]);

  grunt.registerTask('watch', [
    'concat:dist',
    'jshint:all',
    'karma:watch'
  ]);

  grunt.registerTask('ci', [
    'concat:dist',
    'jshint:all',
    'karma:ci',
    'coveralls:main',
    'david:all'
  ]);

  grunt.registerTask('build', [
    'concat:dist',
    'jshint:all',
    'karma:unit',
    'uglify:main'
  ]);
};
