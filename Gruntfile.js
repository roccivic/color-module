
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
      options: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      unit: {},
      watch: {
        singleRun: false
      },
      sauceIe8: {
        sauceLabs: { testName: 'Color Module Tests' },
        reporters: ['progress','saucelabs'],
        customLaunchers: {
          custom: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '8'
          }
        },
        browsers: ['custom']
      },
      sauceIe9: {
        sauceLabs: { testName: 'Color Module Tests' },
        reporters: ['progress','saucelabs'],
        customLaunchers: {
          custom: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '9'
          }
        },
        browsers: ['custom']
      },
      sauceIe10: {
        sauceLabs: { testName: 'Color Module Tests' },
        reporters: ['progress','saucelabs'],
        customLaunchers: {
          custom: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '10'
          }
        },
        browsers: ['custom']
      },
      sauceIe11: {
        sauceLabs: { testName: 'Color Module Tests' },
        reporters: ['progress','saucelabs'],
        customLaunchers: {
          custom: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '11'
          }
        },
        browsers: ['custom']
      },
      sauceFirefox: {
        sauceLabs: { testName: 'Color Module Tests' },
        reporters: ['progress','saucelabs'],
        customLaunchers: {
          custom: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '30'
          }
        },
        browsers: ['custom']
      },
      sauceChrome: {
        sauceLabs: { testName: 'Color Module Tests' },
        reporters: ['progress','saucelabs'],
        customLaunchers: {
          custom: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '40'
          }
        },
        browsers: ['custom']
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
          'dist/color-module.min.js': ['dist/color-module.temp.js']
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
    },
    replace: {
      all: {
        src: ['dist/color-module.js'],
        dest: 'dist/color-module.temp.js',
        replacements: [{
          from: '.hsla',
          to: '.h'
        }, {
          from: '.rgba',
          to: '.r'
        }, {
          from: 'hsla:',
          to: 'h:'
        }, {
          from: 'rgba:',
          to: 'r:'
        }]
      }
    }
  });

  grunt.registerTask('default', [
    'concat:dist',
    'replace:all',
    'jshint:all',
    'karma:unit'
  ]);

  grunt.registerTask('test', [
    'concat:dist',
    'replace:all',
    'jshint:all',
    'karma:unit'
  ]);

  grunt.registerTask('watch', [
    'concat:dist',
    'replace:all',
    'jshint:all',
    'karma:watch'
  ]);

  grunt.registerTask('ci', [
    'concat:dist',
    'replace:all',
    'jshint:all',
    'karma:unit',
    'coveralls:main',
    'david:all'
  ]);

  grunt.registerTask('sauce', [
    'concat:dist',
    'replace:all',
    'jshint:all',
    'karma:sauceIe8',
    'karma:sauceIe9',
    'karma:sauceIe10',
    'karma:sauceIe11',
    'karma:sauceFirefox',
    'karma:sauceChrome'
  ]);

  grunt.registerTask('build', [
    'concat:dist',
    'replace:all',
    'jshint:all',
    'karma:unit',
    'uglify:main'
  ]);
};
