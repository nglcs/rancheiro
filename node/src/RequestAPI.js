const express = require('express');
const request = require('request');
const Data = require('../models/Data')
const fs = require('fs');

let rancherVersion = (url) => {
    if (url.split('/')[3] == 'v2-beta')
        return 1.6
    else
        return 2
}
let remove = (array, element) => {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array
}
let removeElements = (array, url) => {
    if (url.split('/')[3] == 'v2-beta') {
        if (array.includes('io.rancher.host.kvm'))
            array = remove(array, 'io.rancher.host.kvm')

        if (array.includes('io.rancher.host.docker_version'))
            array = remove(array, 'io.rancher.host.docker_version')

        if (array.includes('io.rancher.host.agent_image'))
            array = remove(array, 'io.rancher.host.agent_image')

        if (array.includes('io.rancher.host.linux_kernel_version'))
            array = remove(array, 'io.rancher.host.linux_kernel_version')
    }
    else if (url.split('/')[3] == 'v3') {
        if (array.includes('beta.kubernetes.io/arch'))
            array = remove(array, 'beta.kubernetes.io/arch')

        if (array.includes('beta.kubernetes.io/os'))
            array = remove(array, 'beta.kubernetes.io/os')

        if (array.includes('kubernetes.io/arch'))
            array = remove(array, 'kubernetes.io/arch')

        if (array.includes('kubernetes.io/hostname'))
            array = remove(array, 'kubernetes.io/arch')


        if (array.includes('kubernetes.io/os'))
            array = remove(array, 'kubernetes.io/os')

        if (array.includes('node-role.kubernetes.io/worker'))
            array = remove(array, 'node-role.kubernetes.io/worker')

        if (array.includes('kubernetes.io/hostname'))
            array = remove(array, 'kubernetes.io/hostname')

        if (array.includes('node-role.kubernetes.io/controlplane')) {
            array = remove(array, 'node-role.kubernetes.io/controlplane')
            array.push('controlplane/etcd')
        }
        if (array.includes('node-role.kubernetes.io/etcd')) {
            array = remove(array, 'node-role.kubernetes.io/etcd')
        }
    }

    return array
}

let options = (url, user, password) => {
    return {
        'method': 'GET',
        'url': url,
        'headers': {
            'Authorization': 'Basic ' + Buffer.from(user + ":" + password).toString('base64'),
            'Cookie': 'PL=rancher'
        }
    }
}
let urlChanged = (url, idx, id) => {
    if (url.split('/')[3] == 'v2-beta') {
        if (idx == 0)
            return (url + '/projects')
        else if (idx == 1)
            return (url + '/projects/' + id + '/hosts')
    }
    else if (url.split('/')[3] == 'v3')
        if (idx == 0)
            return (url + '/clusters')
        else if (idx == 1)
            return (url + '/clusters/' + id + '/nodes')
}

let doRequest = (url, idx, id, user, password) => {
    return new Promise(function (resolve, reject) {
        request(options(urlChanged(url, idx, id), user, password), function (error, res, body) {
            if (res.statusCode == 200) {
                resolve(body);
            } else {
                console.log("CONNECTION FAILED:", url)
                reject(error);
            }
        });
    });
}
let getAnnotations = (host, url) => {
    if (url.split('/')[3] == 'v2-beta') {
        let array = Object.keys(host.info.diskInfo.fileSystems).map(i => host.info.diskInfo.fileSystems[i]);
        let storage = 0;
        for (var key in array)
            storage += array[key].capacity;

        return {
            "storage": (storage / 1024),
            "memory": (host.info.memoryInfo.memTotal / 1024),
            "cpu": (host.info.cpuInfo.count)
        }
    }
    else if (url.split('/')[3] == 'v3')
        return {
            "storage": (parseInt(host.capacity['ephemeral-storage']) / 1049000),
            "memory": (parseInt(host.capacity.memory) / 1049000),
            "cpu": (host.capacity.cpu)
        }
}
let keys = process.env.KEYRANCHER.split('\\')
let DataAll = []
void async function () {
    DataAll = await Promise.all(keys.map(async function (value) {

        let url = value.split(';')[0]
        let user = value.split(';')[1]
        let password = value.split(';')[2].trim()

        let response = await doRequest(url, 0, '-', user, password);
        let env = []
        let body = JSON.parse(response)
        await body.data.forEach(async function (data) {
            let hosts = []
            let res = await doRequest(url, 1, data.id, user, password);
            hostsData = JSON.parse(res)
            await hostsData.data.forEach(async function (host) {
                let type = 'worker'
                await Object.keys(host.labels).forEach(async function (label) {
                    if (label.includes('reverse'))
                        type = 'reverse'
                    else if (label.includes('controlplane'))
                        type = 'control'
                });
                hosts.push({ "hostname": host.hostname, "annotations": getAnnotations(host, url), "type": type, "labels": removeElements(Object.keys(host.labels), url) })

            });
            env.push({ "name": data.name, "hosts": hosts })
        });


        return { "name": url.split('/')[2].split('.')[0], "rancher_version": rancherVersion(url), "environment": env }
    }));

}()
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function demo() {
    await sleep(4000);
    const Body = { "Data": DataAll }
    try {
        const data = await Data.create(Body)
        console.log(data)


    }
    catch (err) {
        return console.log(err)
    }
    process.exit()
}

demo();

