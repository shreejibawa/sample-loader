/// <reference path="../../typings/index.d.ts" />

import {testComp} from './testComp/testComp';

angular.module('test.app')
    .component(testComp.componentName, new testComp());