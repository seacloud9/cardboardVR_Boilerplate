'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var gulp = require("gulp");
var sys = require('sys');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;


module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.log(chalk.blue("Welcome to cardboardVR generator!\n\n"+ "                 _    _                                _               _     _                        \n" +
"                | |  (_)                              | |             (_)   | |                       \n" +
" _ __ ___   __ _| | ___ _ __   __ _  __   ___ __   ___| |_ _   _ _ __  _  __| |   ___  __ _ ___ _   _ \n" +
"| '_ ` _ \\ / _` | |/ | | '_ \\ / _` | \\ \\ / | '__| / __| __| | | | '_ \\| |/ _` |  / _ \\/ _` / __| | | |\n" +
"| | | | | | (_| |   <| | | | | (_| |  \\ V /| |    \\__ | |_| |_| | |_) | | (_| | |  __| (_| \\__ | |_| |\n" +
"|_| |_| |_|\\__,_|_|\\_|_|_| |_|\\__, |   \\_/ |_|    |___/\\__|\\__,_| .__/|_|\\__,_|  \\___|\\__,_|___/\\__, |\n" +
"                               __/ |                            | |                              __/ |\n" +
"                              |___/                             |_|                             |___/ \n"));
    
    var prompts = [
    {
        name: 'project_title',
        message: 'What is your project name (example: cardboardVR)?',
        default: 'cardboardVR'
    },
    {
          type: 'confirm',
          name: 'isBabylonJS',
          message: 'This is a babylonJS project (default is true if false it is a threeJS project)?',
          default: true
      }
];

this.prompt(prompts, function(props) {
    console.log(props.hasDeps);
    this.props = props;
    done();
}.bind(this));

},


copyMainFiles: function () {

  var context = {
      project_title:this.props.project_title
  };

  if(this.props.isBabylonJS){
        context.importMod = '../../modules/babylonmod';
        context.importModName = "babylonMod";
        context.logo =  "logo-babylonjs.svg";
        context.includes = "<script src='build/vendor/babylonjs/hand.minified-1.2.js'></script><script src='build/vendor/babylonjs/cannon.js'></script><script src='build/vendor/babylonjs/oimo.js'></script><script src='http://www.babylonjs.com/babylon.js'></script>";
  }else{
        context.importMod = '../../modules/threemod';
        context.importModName = "threeMod";
        context.logo =  "threejs_logo.png";
        context.includes = "<script src='build/vendor/threejs/es6-promise.min.js'></script><script src='build/vendor/threejs/three.min.js'></script><script src='build/vendor/threejs/VRControls.js'></script><script src='build/vendor/threejs/VREffect.js'></script><script src='build/vendor/threejs/webvr-polyfill.js'></script><script src='build/vendor/threejs/webvr-manager.js'></script>";
  }

  //this.copy('boilerVR', 'boilerVR');
  this.fs.copy(
    this.templatePath('boilerVR/**/*'),
    this.destinationRoot(context.project_title)
  );
  this.template("cardboard.js", 'app/pages/cardboard/cardboard.js', context);
  this.template("intro.html", 'app/pages/intro/intro.html', context);
  this.template("index.html",  'www/index.html', context);
}
});
