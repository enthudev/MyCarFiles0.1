import "bootstrap";
import {ViewLocator} from 'aurelia-framework';

export function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging();

    ViewLocator.prototype.convertOriginToViewUrl = (origin) => {
        var moduleId = origin.moduleId;
        var id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts'))
            ? moduleId.substring(0, moduleId.length - 3)
            : moduleId;
        return id.replace("viewmodels", "views") + '.html';
    };

    aurelia.start().then(a => a.setRoot("viewmodels/shell"));
}