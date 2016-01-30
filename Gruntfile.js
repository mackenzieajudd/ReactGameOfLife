module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    jasmine: {
        coverage: {
            src: ['dest/specs.js'],
            options: {
                specs: ['dest/specs.js'],
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'bin/coverage/coverage.json',
                    report: 'bin/coverage',
                    thresholds: {
                        lines: 95,
                        statements: 95,
                        branches: 50,
                        functions: 100
                    }
                }
            }
        }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ';'
      },
      dist: {
        src: ['src/app/**/*.js', 'tmp/templates.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: true
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dest/**/*.js']
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        jasmine: true,
        browserify: true,
        globals: {}
      },
      all: {
        src: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js']
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['**/*.sass'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: ['src/sass/**/*.sass'],
        tasks: ['sass']
      }
    },
    browserify: {
            dev: {
                src: 'src/js/app.jsx',
                dest: 'dest/app.js',
                options: {
                    browserifyOptions: {
                        debug: true,
                        transform: ['reactify'],
                        extensions: ['.jsx']
                    }
                }
            },
            test: {
                src: 'spec/**/*.js',
                dest: 'dest/specs.js',
                options: {
                    browserifyOptions: {
                        debug: true,
                        transform: ['reactify'],
                        extensions: ['.jsx']
                    }
                }
            }
        }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('dist', ['browserify', 'uglify']);
  grunt.registerTask('test', ['browserify', 'jasmine']);
};