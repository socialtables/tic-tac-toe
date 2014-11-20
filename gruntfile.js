module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    connect: {
		server : {
			port: 80,
			base: 'src'
		}
	}
  });

  grunt.loadNpmTasks( 'grunt-connect' );

  // Default task(s).
  grunt.registerTask('default', ['connect']);

};