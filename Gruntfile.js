module.exports = function(grunt) {
    // configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // configuration for the sass task
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'server/public/styles/main.css': 'server/public/styles/scss/main.scss'
                }
            } 
        },
        // configuration for the watch task
        watch: {
            css: {
                files: ['server/public/styles/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            } 
        }
    });

    // plug-in's
    grunt.loadNpmTasks('grunt-contrib-sass');
    // watches scss folder, checks for changes, and runs the watch command 
    grunt.loadNpmTasks('grunt-contrib-watch');

    // runs when we type `grunt` in the terminal
    grunt.registerTask('default', ['sass']);

};