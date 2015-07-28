window.Bootstrap    = require('bootstrap.js');
require('bootstrap.css');

let app             = require('ampersand-app');
let template        = require('../../templates/content.tpl');
let domReady        = require('domready');
let log             = require('bows')('RustWebApp');
let Ractive         = window.Ractive;

class RustWebApp {
  constructor(){
    domReady(() => {
      this.init();
    });
   }
  init(){
    let self = this;

      self.instance = new Ractive({
        el: '.app-container',
        template: template,
        data: function(){
          return {
            'rustaceans' : '10',
            'users': '10',
            'coffee': '25',
            'github': '1000'
          };
        },
        onrender: function(){
          log('Rendered');
        },
        onteardown: function(){
          log('Closing');
        }
      });
      self.instance.on('rustaceans-link', function(e){
        e.original.preventDefault();
        log(`Navigate to ${e.target}`);
      });
      self.instance.on('coffee-link', function(e){
        e.original.preventDefault();
        log(`Navigate to ${e.target}`);
      });
      self.instance.on('users-link', function(e){
        e.original.preventDefault();
        log(`Navigate to ${e.target}`);
      });
      self.instance.on('github-link', function(e){
        e.original.preventDefault();
        log(`Navigate to ${e.target}`);
      });
  }
}

export default new RustWebApp();