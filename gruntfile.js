module.exports = function(grunt) {
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'dist/js/catclicker.min.js': 'src/js/catclicker.js'
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js',],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            dist: {
                 files: {
                    'dist/index.html': 'src/index.html'
                }               
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/css/catclicker.min.css': 'src/css/catclicker.css'
                }
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                },
                files: {
                    'dist/img/cat.jpg': 'src/img/cat.jpg',
                    'dist/img/kitty.jpg': 'src/img/kitty.jpg',
                    'dist/img/jinxy.jpg': 'src/img/jinxy.jpg',
                    'dist/img/cutie.jpg': 'src/img/cutie.jpg'
                }
            }
        },
        copy: {
            js: {
                src: 'src/js/catclicker.js',
                dest: 'dist/js/catclicker.js'
            },
            css: {
                src: 'src/css/catclicker.css',
                dest: 'dist/js/catclicker.css'
            }
        },
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['jshint','uglify','copy:js']               
            },
            css: {
                files: ['src/**/*.css', 'copy:css'],
                tasks: ['cssmin']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['htmlmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['jshint', 'uglify', 'htmlmin', 'imagemin']);
};