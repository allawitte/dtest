(function () {
    'use strict';

    angular
        .module('app')
    directive('dateTypeMulti', dateTypeMulti);

    function dateTypeMulti() {
        return {
            priority: -1000,
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                ngModel.$render = function () {
                    angular.extend(scope.$eval(attrs.dateTypeMulti), ngModel.$viewValue);
                };

                scope.$watch(attrs.dateTypeMulti, function (viewValue) {
                    ngModel.$setViewValue(viewValue);
                }, true);

                ngModel.$formatters.push(function (modelValue) {
                    if (!modelValue) return;

                    var parts = String(modelValue).split('/');

                    return {
                        year: parts[0],
                        month: parts[1],
                        day: parts[2]
                    };
                });

                ngModel.$parsers.unshift(function (viewValue) {
                    var isValid = true,
                        modelValue = '',
                        date;

                    if (viewValue) {
                        date = new Date(viewValue.year, viewValue.month - 1, viewValue.day);
                        modelValue = [viewValue.year, viewValue.month, viewValue.day].join('/');

                        if ('//' === modelValue) {
                            modelValue = '';
                        } else if (
                            date.getFullYear() != viewValue.year ||
                            date.getMonth() != viewValue.month - 1 ||
                            date.getDate() != viewValue.day) {
                            isValid = false;
                        }
                    }

                    ngModel.$setValidity('dateTypeMulti', isValid);

                    return isValid ? modelValue : undefined;
                });
            }
        }
    }
})();

/**
 * Created by HP on 9/8/2016.
 */
