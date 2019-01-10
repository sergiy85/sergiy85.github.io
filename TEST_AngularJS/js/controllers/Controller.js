mapsApp.controller('MapCtrl', ['$scope', '$modal', '$log', 
    function ($scope, $modal, $log) {

    /* ============ DATA INPUT =================== */
        
    const trucks = [
            {
                truck : 'Truck 1001',
                lat : 43.7000,
                long : -79.4000
            },
            {
                truck : 'Truck 1002',
                lat : 40.6700,
                long : -73.9400
            },
            {
                truck : 'Truck 1003',
                lat : 41.8819,
                long : -87.6278
            },
            {
                truck : 'Truck 1004',
                lat : 34.0500,
                long : -118.2500
            },
            {
                truck : 'Truck 1005',
                lat : 36.0800,
                long : -115.3322
            },
            {
                truck : 'Truck 1006',
                lat : 36.1220,
                long : -114.4422
            },
            {
                truck : 'Truck 1007',
                lat : 36.0800,
                long : -113.1322
            },
            
        ];

        const trucks2 = [
            {
                truck : 'Truck 1008',
                lat : 43.817699,
                long : -79.1880791
            
            },
            {
                truck : 'Truck 1009',
                lat : 46.0780,
                long : -115.1862
            
            },
            {
                truck : 'Truck 1010',
                lat : 36.0820,
                long : -119.1592
            
            },
            {
                truck : 'Truck 1011',
                lat : 36.0823,
                long : -112.1322
            
            },
            {
                truck : 'Truck 1012',
                lat : 36.0845,
                long : -116.1529
           
            }
        ];
        $scope.trucks = trucks;
        $scope.trucks2 = trucks2;

    /* ============ Settings ===================*/    
            /*
            * Map Options
            */

        const mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }  

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
            /*
            * InfoWindow 
            */
        const infoWindow = new google.maps.InfoWindow();
        
            /*
            * Container for adding New Markers (HTML) 
            */

        const res = document.querySelectorAll('res');

            /*
            * Buttons 
            */
        $scope.buttons = []; 
        const btn = {};
            /*
            * Markers
            */
        $scope.markers = [];
            /* function Create markers() */   

        const createMarker = function (info){
            const marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng( info.lat, info.long),
                title: info.truck,
                visible: false
            });
                $scope.markers.push(marker);
                $scope.buttons.push(btn);        
                         
            /*   переключение маркеров на карте  */

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h3>' + marker.title + '</h3>');
                infoWindow.open($scope.map, marker);
                this.marker = marker;
                this.markers = $scope.markers; 
                const out = [];
                
                for(i=0; i<this.markers.length; i++){                    
                    if(this.marker != this.markers[i]){
                        out.push(this.markers[i]);
                        for(j=0; j<out.length; j++){
                            out[j].setVisible(false);
                            this.marker.setVisible(true);    
                        }
                    }    
                }
                
            });    
        }      
        /* ../ function Create markers() */

        /* ===================== CREATE MARKERS & INIT ================================*/            
        for (i = 0; i < trucks.length; i++){
            createMarker(trucks[i]); 
        };
        /* =================== InfoWindow call ====================================== */
        $scope.openInfoWindow = function(e, selectedMarker ){
            e.preventDefault();        
            google.maps.event.trigger(selectedMarker, 'click');
        }

        /*===================== REMOVE MARKERS ================================*/

        $scope.deleteMarker = function (marker) {
            const index = $scope.markers.indexOf(this.marker);
            $scope.markers.splice(index, 1);
            this.marker.setVisible(false);
            infoWindow.close($scope.map, marker);
            
        };
        
        /*============ ADD NEW MARKER  ================*/

        const action = genMark();
        function* genMark(i=0) {
            while(true) {
                yield createMarker(trucks2[i]); 
                yield createMarker(trucks2[i++]);
                yield createMarker(trucks2[i-1]);
                yield createMarker(trucks2[i-1]);
                yield createMarker(trucks2[i-1]);
            }
        };
    
        $scope.addMarkers = function(e){
            res.textContent = action.next().value;
            $scope.trucks2.splice(0, 1);
        }
                 
    /* ============== Open Modal for adding new markers =================*/

        $scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
                 
            const modalInstance = $modal.open({
                template: '<div class="dialog-modal-add">\
                <div class="modal-header">\
                    <h4>Add New Asset...</h4>\
                </div>\
                <form name="form.userForm">\
                <div class="modal-body" ng-repeat="truck2 in trucks2 | limitTo:1">\
                    <!-- NAME -->\
                    <div class="form-group flexform">\
                        <label class="form-descr">Name</label>\
                        <input type="text" name="name" ng-model="truck2.truck" class="form-control"  required>\
                    </div>\
                    <!-- LATITUDE -->\
                    <div class="form-group flexform">\
                        <label class="form-descr">latitude</label>\
                        <input type="text" name="lat" ng-model="truck2.lat"  class="form-control"  required>\
                    </div>\
                    <!-- LONGITUDE -->\
                    <div class="form-group flexform">\
                        <label class="form-descr">Longitude</label>\
                        <input type="text" name="long" ng-model="truck2.long" class="form-control"  required>\
                    </div>\
                </div>\
                <div class="modal-footer">\
                <button class="btn btn-warning" ng-click= "cancel()">Cancel</button>\
                    <button type="submit" class="btn btn-success" ng-click= "okey()"> Add </button>\
                </div>\
            </form>\
            </div>',
                size: 'md',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;               
                    }
                }
            });
            
            modalInstance.result.then(function () {
                $scope.addMarkers();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    

    const ModalInstanceCtrl = function ($scope, $modalInstance) {
        $scope.form = {};
        
        $scope.okey = function () {
            $modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
              
    };

}]);

/*============ MARKERS GENERATION  ==================*/

// function generateMarkers(tlCorner, brCorner, count) {
//     let deltaLat = tlCorner[0] - brCorner[0];
//     let deltaLon = brCorner[1] - tlCorner[1];
    
//     for(let i = 0; i < count; i++) {
//         let Lat = brCorner[0] + Math.random()*deltaLat;
//         let Lon = tlCorner[1] + Math.random()*deltaLon;
//         let number = 1008;
//         number += i;
//         trucks2.push({
//             truck: 'Truck ' + number,
//             lat: Lat,
//             long: Lon
//         });
        
//     }
//     return trucks2 ;
// }
// generateMarkers([57.18, 35.55], [52.43, 40.23], 10);
