module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['server.js', 'app/collections/links.js', 'app/collections/users.js', 'app/models/link.js', 'app/models/user.js', 'app/config.js', 'lib/request-handler.js', 'lib/utility.js', 'client/app.js', 'client/createLinkView.js', 'client/link.js', 'client/links.js', 'client/linksView.js', 'client/linkView.js', 'client/router.js' ],
        dest: 'src/build.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      },
      env: {
        PORT: '4568'
      },
      cwd: __dirname,
      ignore: ['node_modules/**'],
      watch: ['server']
    },

    uglify: {
      my_target: {
        files: {
          'dest/output.min.js': ['src/input1.js', 'src/input2.js']
        }
      }
    },

    eslint: {
      target: [
        'server.js', 'app/collections/links.js', 'app/collections/users.js', 'app/models/link.js', 'app/models/user.js', 'app/config.js', 'lib/request-handler.js', 'lib/utility.js', 'client/app.js', 'client/createLinkView.js', 'client/link.js', 'client/links.js', 'client/linksView.js', 'client/linkView.js', 'client/router.js'
        // Add list of files to lint here
      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['shell', 'server-dev', 'test', 'concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
