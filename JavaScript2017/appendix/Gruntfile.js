module.exports = function(grunt) {
  // タスクの設定を行う
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src : ['test.js'],
        dest: 'test.min.js'
      }
    }
  });

  // モジュールの読み込み
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // タスクの登録
  grunt.registerTask('default', ['uglify']);
};