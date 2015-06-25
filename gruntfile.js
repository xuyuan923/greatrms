module.exports = function(grunt){
    grunt.initConfig({
        less: {
            // 编译
            compile: {
                files: {
                    'public/css/common.css': 'public/less/common.less',
                    'public/css/myLine.css': 'public/less/myLine.less',
                    'public/css/lineRole.css': 'public/less/lineRole.less'
                }
            }
        },
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['public/less/*.less'],
                tasks: ['less']
            }
        },

        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    ignore: ['README.md', 'node_modules/**', 'DS_Store'],
                    ext: 'js',
                    watch: ['./'],
                    nodeArgs: ['--debug'],
                    delay: 1000,
                    env: {
                        PORT: 8000
                    },
                    cwd: __dirname
                }
            }
        },

        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        },

        concurrent: {
            tasks: ['less','nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.option('force',true);
    grunt.registerTask('default',['less','concurrent']);
    grunt.registerTask('test',['mochaTest']);
}