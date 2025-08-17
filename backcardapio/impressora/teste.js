const usb = require('usb')

// Lista todos os dispositivos USB

const devices = usb.getDeviceList();
console.log('Dispositivos USB Encontrados')

if (devices.length === 0) {
    console.log('Nenhum dispositivo foi encontrado!')
} else {
    devices.forEach((device, i) => {
        console.log(`${i + 1}: VendorID=${device.deviceDescriptor.idVendor}, ProductID${device.deviceDescriptor.idProduct}`);
    })
}