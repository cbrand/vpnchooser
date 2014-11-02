vpnChooserControllers.controller('devicesCtrl', function ($scope, Device, DeviceType) {

    $scope.devices = Device.query();

    $scope.add_device = function () {
        var newDevice = new Device();
        newDevice.type = 'pc';
        newDevice.is_new = true;
        $scope.devices.push(newDevice);
    };

});


vpnChooserControllers.controller('deviceCtrl', function ($scope, $timeout, Device, DeviceType) {
    $scope.deviceTypes = DeviceType;

    $scope.save = function () {
        var device = $scope.device;
        if ($scope.deviceForm.$valid) {
            if (!device.id) {
                Device.save(device, function (d_return) {
                    $scope.device = d_return;
                });
            } else {
                Device.update({id: device.id}, device);
            }
        }
    };

    $scope.delete = function ($event) {
        $event && $event.stopPropagation();
        var device = $scope.device;

        if (device.id) {
            Device.delete({id: device.id}, function () {
                var device_ids = $scope.devices.map(function (device) {
                    return device.id
                });
                $scope.devices.splice(
                    device_ids.indexOf(device.id),
                    1
                );
            });
        }
    };

    $scope.selectDeviceType = function (type) {
        $scope.device.type = type.key;
        $scope.save();
    };

    Object.defineProperty($scope, 'selectedDeviceTypeText', {
        get: function() {
            var deviceTypeKey = $scope.device.type;
            var selectedDeviceTypes = $scope.deviceTypes.filter(
                function(deviceType) {
                    return deviceType.key == deviceTypeKey;
                }
            );
            if(selectedDeviceTypes.length) {
                return selectedDeviceTypes[0].name;
            }
            else {
                return "Device type";
            }
        }
    });

    $(".ui.selection.dropdown").dropdown({
        action: 'updateForm'
    });


});
