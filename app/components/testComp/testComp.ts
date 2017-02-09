/// <reference path="../../../typings/index.d.ts" />

export class testComp implements ng.IComponentOptions {
    static componentName = 'testComp';
    
    bindings:any;

    template = '<div>Test Componet</div>';

    constructor(){}
}