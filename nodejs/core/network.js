module.exports = function () {

    let infomation = {
        IPv4: [],
        IPv6: []
    };

    let networks = require('os').networkInterfaces()

    let IPv4Had = {}, IPv6Had = {}

    for (let typeName in networks) {
        let network = networks[typeName]
        for (let index = 0; index < network.length; index++) {
            if (network[index].mac != "00:00:00:00:00:00") {
                if (network[index].family == 'IPv4' && network[index].address != '127.0.0.1') {
                    if (!IPv4Had[network[index].mac]) {
                        infomation.IPv4.push({
                            address: network[index].address,
                            mac: network[index].mac
                        });

                        IPv4Had[network[index].mac] = true
                    }
                } else if (network[index].family == 'IPv6' && network[index].address != '::1') {
                    if (!IPv6Had[network[index].mac]) {
                        infomation.IPv6.push({
                            address: network[index].address,
                            mac: network[index].mac
                        });

                        IPv6Had[network[index].mac] = true
                    }
                }
            }
        }
    }

    return infomation;
};