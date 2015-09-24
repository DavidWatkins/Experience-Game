/**
 * @author David Watkins
 * @author Gina Roussos
 */
(function () {
    'use strict';

    function List(list) {
        this.list = list;
    }

    List.prototype.contains = function (obj) {
        var i;
        for (i = 0; i < this.list.length; i += 1) {
            if (this.list[i] === obj) {
                return true;
            }
        }

        return false;
    };

    window.List = List;
}());
