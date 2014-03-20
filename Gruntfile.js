module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        appFolder: 'app/',
        distFolder: 'dist/',

        copy: {
            build: {
                cwd: '<%= appFolder %>',
                src: [ '**', '!**/partials/**/*', '!*.jade' , '!**/images/**/*', '!**/sass/**/*', '!**/coffee/**/*'],
                dest: '<%= distFolder %>',
                expand: true
            }
        }, 

        clean: {
            build: {
                nonull: false,
                src: ['<%= distFolder %>']
            },

            stylesheets: {
                nonull: false,
                src: ['<%= distFolder %>*.css']
            },

            scripts: {
                nonull: false,
                src: ['<%= distFolder %>js']        
            },

            images: {
                nonull: false,
                src: ['<%= distFolder %>images']
            },

            postbuild: {
                nonull: false,
                src: ['<%= distFolder %>coffee','<%= distFolder %>js/coffee-compiled','<%= distFolder %>js/dist','<%= distFolder %>sass','<%= distFolder %>partials','<%= distFolder %>assets','<%= distFolder %>css']
            }
        },

        jade: {
            dev: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= appFolder %>',
                    src: [ '*.jade' ],
                    dest: '<%= distFolder %>',
                    ext: '.html'
                }]
            },
            dist: {
                options: {
                    pretty: false,
                    data: {
                        debug: false
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= appFolder %>',
                    src: [ '*.jade' ],
                    dest: '<%= distFolder %>',
                    ext: '.html'
                }]
            }
        },

        coffee: {
            glob_to_multiple: {
                expand: true,
                flatten: true,
                cwd: '<%= appFolder %>',
                src: ['coffee/**/*.coffee'],
                dest: '<%= distFolder %>js/coffee-compiled',
                ext: '.js'
            }  
        },

        concat: {
            options: {
                    // define a string to put between each file in the concatenated output
                separator: ';'
            },

            dist: {
                // the files to concatenate
                src: ['<%= distFolder %>js/coffee-compiled/*.js'],
                // the location of the resulting JS file
                dest: '<%= distFolder %>js/dist/<%= pkg.name %>.<%= pkg.version %>.js'
            }
        },

        jshint: {
            files: ['<%= distFolder %>js/coffee-compiled/*.js'],
            options: {
                unused: true,
                strict: true,
                eqnull: true
            }
        },

        uglify: {
            my_target: {
                options: {
                    mangle: false
                },

                files: {
                    '<%= distFolder %>js/<%= pkg.name %>.<%= pkg.version %>.min.js': ['<%= distFolder %>js/dist/<%= pkg.name %>.<%= pkg.version %>.js']
                }
            }
        },

        imagemin: {                          // Task
            dist: {                            // Target
                options: {                       // Target options
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= appFolder %>images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: '<%= distFolder %>images'
                }]
            }
        },

        compass: {
            dev: {
                options: {
                    cssDir: '<%= distFolder %>',
                    httpPath: '/',
                    sassDir: '<%= appFolder %>sass',
                    fontsDir: '<%= distFolder %>fonts',
                    imagesDir: '<%= distFolder %>images',
                    javascriptsDir: '<%= distFolder %>js',
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    lineComments: false
                }
            },

            dist: {
                options: {
                    cssDir: '<%= distFolder %>',
                    httpPath: '/',
                    sassDir: '<%= appFolder %>sass',
                    fontsDir: '<%= distFolder %>fonts',
                    imagesDir: '<%= distFolder %>images',
                    javascriptsDir: '<%= distFolder %>js',
                    outputStyle: 'compressed',
                    relativeAssets: true,
                    lineComments: false
                }
            }
        },

		autoprefixer: {
            options: {
            
            },
			build: {
				expand: false,
				cwd: '<%= distFolder %>',
				src: ['<%= distFolder %>styles.css'],
				dest: '<%= distFolder %>styles.css'
			}
		},

        csslint: {
            strict: {
                options: {
                    "unique-headings": false,
                    "font-sizes": false,
                    "box-sizing": false,
                    "floats": false,
                    "duplicate-background-images": false,
                    "font-faces": false,
                    "star-property-hack": false,
                    "qualified-headings": false,
                    "ids": false,
                    "text-indent": false,
                    "box-model": false,
                    "adjoining-classes": false
                },
                src: ['<%= distFolder %>*.css']
            }
        },

        watch: {

            jade: {
                files: ['<%= appFolder %>/**/*.jade'],
                tasks: [ 'jade:dev' ],
            },

            images: {
                files: ['<%= appFolder %>images/**/*.{png,jpg,jpeg}'],
                tasks: [ 'imagemin' ],
            },

            compass: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['<%= appFolder %>sass/**/*.scss'],
                tasks: [ 'compass:dev', 'csslint' ],
            },

            scripts: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['<%= appFolder %>assets/*.js', '<%= appFolder %>coffee/**/*.coffee'],
                tasks: [ 'coffee', 'concat', 'jshint', 'uglify' ],
            },

            copy: {
                files: [ '<%= appFolder %>**', '!<%= appFolder %>**/*.scss', '!<%= appFolder %>**/*.coffee', '!<%= appFolder %>**/*.{png,jpg,jpeg}' ],
                tasks: [ 'copy' ]
            },

            livereload: {
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: ['<%= distFolder %>**/*'],
            },
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Default task(s).
    grunt.registerTask('cssstuff', ['clean:stylesheets', 'copy', 'compass:dev', 'autoprefixer', 'csslint', 'clean:postbuild']);
    grunt.registerTask('jsstuff', ['clean:scripts', 'copy', 'coffee', 'concat', 'jshint', 'uglify', 'clean:postbuild']);
    grunt.registerTask('imgstuff', ['clean:images', 'copy', 'imagemin', 'clean:postbuild']);
    grunt.registerTask('default', ['clean:build', 'copy', 'jade:dev', 'imagemin', 'coffee', 'concat', 'uglify', 'compass:dev', 'autoprefixer', 'csslint', 'jshint', 'clean:postbuild', 'watch']);
    grunt.registerTask('build', ['clean:build', 'copy', 'jade:dist', 'imagemin', 'coffee', 'concat', 'uglify', 'compass:dist', 'autoprefixer', 'csslint', 'jshint', 'clean:postbuild'])

};