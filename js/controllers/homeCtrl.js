'use strict';

app.controller('homeCtrl', function(){
    this.sites = [
    	{ name: 'Switch', description: 'A pure CSS Switch (with optional Text)' },
    	{ name: 'BlurElement', description: 'Blurs the background-image of an element' },
    	{ name: 'ChangeListener', description: 'Calls a function inside a component from the parent controller' }
    ];
});
