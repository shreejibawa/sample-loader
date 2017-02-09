/// <reference path="../../../typings/index.d.ts" />

export class testComp implements ng.IComponentOptions {
    static componentName = 'testComp';
    
    bindings:any;

    template = '<div class="showbox"><div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div>';

    constructor(){}
}