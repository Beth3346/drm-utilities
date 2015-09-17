module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        appFolder: 'app/',
        distFolder: 'dist/',

        copy: {
            build: {
                cwd: '<%= appFolder %>',
                src: [ '**', '!**/partials/**/*',
                    '!**/*.jade' ,
                    '!**/images/**/*',
                    '!**/sass/**/*',
                    '!**/coffee/**/*'],
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
                src: ['<%= distFolder %>coffee',
                    '<%= distFolder %>js/coffee-compiled',
                    '<%= distFolder %>js/dist',
                    '<%= distFolder %>sass',
                    '<%= distFolder %>partials',
                    '<%= distFolder %>assets',
                    '<%= distFolder %>css']
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
                separator: ''
            },

            dist: {
                // the files to concatenate
                src: ['<%= distFolder %>assets/jquery.js',
                    '<%= appFolder %>assets/elr-utilities.js',
                    '<%= appFolder %>assets/elr-time-utilities.js',
                    '<%= appFolder %>assets/elr-validation-utilities.js',
                    '<%= distFolder %>assets/elr-js-utilities/*.js',
                    '<%= distFolder %>assets/main.js',
                    '<%= distFolder %>js/coffee-compiled/*.js'],
                // the location of the resulting JS file
                dest: '<%= distFolder %>js/<%= pkg.name %>.<%= pkg.version %>.js'
            }
        },

        jshint: {
            files: ['<%= distFolder %>js/coffee-compiled/*.js',
                '<%= appFolder %>assets/elr-js-utilities/*.js',
                '<%= appFolder %>assets/main.js',
                '<%= appFolder %>assets/elr-utilities.js',
                '<%= appFolder %>assets/elr-time-utilities.js',
                '<%= appFolder %>assets/elr-validation-utilities.js'],
            options: {
                maxerr: 10,
                // unused: true,
                eqnull: true,
                eqeqeq: true,
                jquery: true
            }
        },

        uglify: {
            my_target: {
                options: {
                    mangle: false
                },

                files: {
                    '<%= distFolder %>js/<%= pkg.name %>.<%= pkg.version %>.js': ['<%= distFolder %>js/<%= pkg.name %>.<%= pkg.version %>.js']
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
                browsers: ['last 8 versions']
            },
			build: {
				expand: false,
                files: {
                    '<%= distFolder %>styles.css': '<%= distFolder %>styles.css'
                }
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
                    "adjoining-classes": false,
                    "compatible-vendor-prefixes": false,
                    "selector-max-approaching": false,
                    "important": false,
                    "shorthand": false,
                    "selector-max": false
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
                files: ['<%= distFolder %>assets/jquery.js',
                '<%= appFolder %>assets/el-utilities.js',
                '<%= appFolder %>assets/el-time-utilities.js',
                '<%= appFolder %>assets/el-validation-utilities.js',
                '<%= distFolder %>assets/elr-js-utilities/*.js',
                '<%= distFolder %>assets/main.js',
                '<%= appFolder %>coffee/**/*.coffee'],
                tasks: [ 'coffee', 'concat', 'jshint' ],
            },

            copy: {
                files: [ '<%= appFolder %>*',
                '<%= appFolder %>assets/*',
                '<%= appFolder %>assets/elr-js-utilities/*',
                '<%= appFolder %>sass/**/*',
                '<%= appFolder %>partials/**/*',
                '!<%= appFolder %>**/*.scss',
                '!<%= appFolder %>**/*.coffee',
                '!<%= appFolder %>**/*.{png,jpg,jpeg}' ],
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

    grunt.registerTask('default',
        ['clean:build',
        'copy',
        'jade:dev',
        'imagemin',
        'coffee',
        'concat',
        'compass:dev',
        'autoprefixer',
        'csslint',
        'jshint',
        'watch']
    );

    grunt.registerTask('build',
        ['clean:build',
        'copy',
        'jade:dist',
        'imagemin',
        'coffee',
        'concat',
        'uglify',
        'compass:dist',
        'autoprefixer',
        'csslint',
        'jshint',
        'clean:postbuild']
    );
};