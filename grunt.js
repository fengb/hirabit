module.exports = function(grunt) {
  grunt.initConfig({
    qunit: {
      all: ['test/**/*.html']
    },

    lint: {
      all: ['grunt.js', 'src/**/*.js']
    },

    jshint: {
      options: {
        browser: true
      }
    }
  });

  grunt.registerTask('default', 'lint qunit');
};
