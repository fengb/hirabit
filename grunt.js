module.exports = function(grunt) {
  grunt.initConfig({
    qunit: {
      all: ['qunit.html']
    },

    lint: {
      all: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },

    jshint: {
      options: {
        browser: true
      }
    }
  });

  grunt.registerTask('default', 'lint qunit');
};
