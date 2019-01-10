/*
   Confirm an ng-click action with a modal dialog window (requires UI Bootstrap Modal service)
   Using this modal requires two things: apply the attribute to the dom element and prepend
   the confirmClick() action to the ng-click attribute.

      <button ng-click="confirmClick() && deleteMarker(marker)" confirm-click>X</a>

   */
  mapsApp.directive('confirmClick', ['$q', 'dialogModal', function($q, dialogModal) {
       
    return {
        link: function (scope, element, attrs) {
            const ngClick = attrs.ngClick.replace('confirmClick()', 'true')
                .replace('confirmClick(', 'confirmClick(true,');
                
            scope.confirmClick = function(msg) {
                
                if (msg === true) {
                    return true;
                }
                msg = msg || attrs.confirmClick || 'Are you sure to want to delete' + this.marker.title + '?';
                // open a dialog modal, and then continue ngClick actions if it's confirmed
              //   console.log()
                dialogModal(msg).result.then(function() {
                    scope.$eval(ngClick);
                });
                
                // return false to stop the current ng-click flow and wait for our modal answer
                return false;
            };
            
        }
    }
}])

/*
 Open a modal confirmation dialog window with the UI Bootstrap Modal service.
 This is a basic modal that can display a message with okay or cancel buttons.
 It returns a promise that is resolved or rejected based on okay/cancel clicks.
 The following settings can be passed:

    message         the message to pass to the modal body
    title           (optional) title for modal window
    okButton        text for OK button. set false to not include button
    cancelButton    text for Cancel button. ste false to not include button

 */
.service('dialogModal', ['$modal', function($modal) {
    return function (message, title, okButton, cancelButton) {
        // setup default values for buttons
        // if a button value is set to false, then that button won't be included
        okButton = okButton === false ? false : (okButton || 'Delete');
        cancelButton = cancelButton === false ? false : (cancelButton || 'Cancel');
        
        // setup the Controller to watch the click
        const ModalInstanceCtrl = function ($scope, $modalInstance, settings) {
            // add settings to scope
            
            angular.extend($scope, settings);
            // ok button clicked

            $scope.ok = function () {
                $modalInstance.close(true);
            };
            // cancel button clicked
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        // open modal and return the instance (which will resolve the promise on ok/cancel clicks)
        const modalInstance = $modal.open({
            template: '<div class="dialog-modal fade in" id = "exampleModal"> \
                <div class="modal-header" ng-show="modalTitle"> \
                    <h4 class="modal-title">{{modalTitle}}</h4> \
                </div> \
                <div class="modal-body">{{modalBody}}</div> \
                <div class="modal-footer"> \
                    <button class="btn btn-warning" ng-click="cancel()" ng-show="cancelButton">{{cancelButton}}</button> \
                    <button class="btn btn-danger" ng-click="ok()" ng-show="okButton">{{okButton}}</button> \
                </div> \
            </div>',
            controller: ModalInstanceCtrl,
            size: 'md',
            resolve: {
                settings: function() {
                    return {
                        modalTitle: 'Warning!',
                        modalBody: message,
                        okButton: okButton,
                        cancelButton: cancelButton
                    };
                }
            }
        });
        
        return modalInstance;
    }
}]);
