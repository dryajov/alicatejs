define('app',
    [
        'framework/eggplantjs'
    ],
    function (eggplantjs) {
        'use strict';

        console.log('App started');

        eggplantjs.start();

        return 'hello';
    });
