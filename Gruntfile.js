module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      src:  ['src/**/*.js'],
      test: ['test/**/*.js']
    },

    qunit: {
      all: ['test/**/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('test',    ['jshint', 'qunit']);
  grunt.registerTask('default', ['test']);
};
