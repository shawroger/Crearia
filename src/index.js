!(function(global,factory) {   
    if (typeof define ==='function') {
        define(function(){
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
    it.version = '0.3.2';
    it.ajax = function() {
        if(arguments.length === 1) {          
            var content = this.send;
            var callback = arguments[0];
        }
        if(arguments.length === 2) {
            var content = arguments[0];
            var callback = arguments[1];
        }
        var ajax;
        var message = '';
        var urlparam = '';
        var url = content.url; 
        if(content.get) {     
            for(var i in content.get) {
                var key = i;
                var value = content.get[i];
                urlparam = urlparam+'&'+key+'='+value;
            }
        }
        if(content.random) {
            var force_fresh_name = content.random.name;
            var force_fresh_value = Math.floor(Math.pow(10,(parseInt(content.random.digit)+1))*Math.random());
            urlparam = urlparam+'&'+force_fresh_name+'='+force_fresh_value;
        }
        url = url +'?'+urlparam.substr(1);       
        if(window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        ajax.onreadystatechange = () => {
            if(ajax.readyState === 4 && ajax.status === 200) {
                this.response = {};
                this.response.html = ajax.response;
                this.response.title = ajax.statusText;
                this.response.msg = ajax.content;
                this.response.state = ajax.readyState;
                this.response.text = ajax.responseText;
                this.response.url = ajax.responseURL;
                callback.bind(this,this.response)();
            }
        }
        ajax.open(content.type,url,true);
        ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
        if(content.post) {
            for(var i in content.post) {
                var key = i;
                var value = content.post[i];
                message = message+'&'+key+'='+value;
            }  
        }
        message = message.substr(1);     
        ajax.send(message);
        this.response = ajax;
        this.response.content = content;
    };return it;
}));