/*
* Crearia 0.4.0 
* Easy ajax and easy response
* Created by shawroger 2019
*/


!(function(global,factory) {   
    if (typeof define ==='function') {
        define( function() {
            return (global.Crearia= factory());
        });
    }
    else if (typeof exports === 'object') {
        module.exports = factory();
    }
    else {
        global.Crearia  = factory();
    }
} (this, function () {
    'use strict';
    
    var it = {}; 
    
    it.name = 'crearia';
    
    it.version = '0.4.0';

    it.install= function(Vue, options) {
        Vue.prototype.$crearia = this;
    };

    it.mixin = function(Obj,name='crearia') {

        var ADD_OBJ = {};
        var OBJ_NAME = '$'+name;
        ADD_OBJ[OBJ_NAME] = this;
        Object.assign(Obj,ADD_OBJ);
        
    };
    
    it.ajax = function(content, callback) {
        
        var TYPE = 'GET';
        var ajax;
        var message = '';
        var urlparam = '';
        var url = content.url; 
        
        if(content.post) {
            TYPE = 'POST';
        }  
        
        if(content.get) {     
            for(var i in content.get) {
                var key = i;
                var value = content.get[i];
                urlparam = urlparam+'&'+key+'='+value;
            }
        }
        if(content.random) {
            var rand_name = content.random.name;
            var rand_value = Math.floor(Math.pow(10,(parseInt(content.random.digit)+1))*Math.random());
            urlparam = urlparam+'&'+rand_name+'='+rand_value;
        }
        if(content.get && content.random) {
            url = url +'?'+urlparam.substr(1);
        }
               
        if(window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }

        ajax.onreadystatechange = () => {
            
            if(ajax.readyState === 4 && ajax.status === 200) {
                
                this.response = {};
                this.response.data = ajax.responseText;
                this.response.text = ajax.statusText;
                this.response.msg = ajax.content;
                this.response.state = ajax.readyState;
                this.response.url = ajax.responseURL;
                callback.call(this,this.response);
            }
        }
        
        ajax.open(TYPE,url,true);
       
        if(content.post) {
            
            ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
            
            for(var i in content.post) {
                
                var key = i;
                var value = content.post[i];
                message = message+'&'+key+'='+value;
            }  
            message = message.substr(1);     
            
        } 
        ajax.send(message);
        
        this.response = ajax;
        this.response.content = content;
    };
    
    return it;
}));