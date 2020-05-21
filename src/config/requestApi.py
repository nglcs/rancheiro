import requests.auth
from requests.auth import HTTPBasicAuth
import json

def removeElements(array,rancher_version):
    if rancher_version == 1.6:
        if 'io.rancher.host.kvm' in array:
            array.remove('io.rancher.host.kvm')

        if 'io.rancher.host.docker_version' in array:
            array.remove('io.rancher.host.docker_version')

        if 'io.rancher.host.agent_image' in array:
            array.remove('io.rancher.host.agent_image')

        if 'io.rancher.host.linux_kernel_version' in array:
            array.remove('io.rancher.host.linux_kernel_version')

    elif rancher_version == 2:
        if 'beta.kubernetes.io/arch' in array:
            array.remove('beta.kubernetes.io/arch')

        if 'beta.kubernetes.io/os' in array: 
            array.remove('beta.kubernetes.io/os')
        
        if 'kubernetes.io/arch' in array:
            array.remove('kubernetes.io/arch')

        if 'kubernetes.io/os' in array:
            array.remove('kubernetes.io/hostname')

        if 'kubernetes.io/os' in array:
            array.remove('kubernetes.io/os')

        if 'node-role.kubernetes.io/worker' in array:
            array.remove('node-role.kubernetes.io/worker')

        if 'node-role.kubernetes.io/controlplane' in array:
            array.remove('node-role.kubernetes.io/controlplane')
            array.append('controlplane')

        if 'node-role.kubernetes.io/etcd' in array:
            array.remove('node-role.kubernetes.io/etcd')
            array.append('etcd')

    return array


Data = []

keys = open("/app/src/config/keys.txt", "r")
for key in keys:
    key.split(';')

    url =  key.split(';')[0]
    user =  key.split(';')[1]
    password =  key.split(';')[2]
    password = password.replace("\n", "")
    
    #Rancher 1.6
    if (url.split('/')[3] == 'v2-beta') or (url.split('/')[3] == 'v1'):
        res = requests.request("GET", url + '/projects',  auth=HTTPBasicAuth(user, password))
        if (res.status_code == 200):
            env=[]   
            res=res.json()
            for data in res['data']:
                if data['name'] != None:
                    hosts=[]
                    hostsData = requests.request("GET", url + '/projects/' + data['id'] + '/hosts' ,  auth=HTTPBasicAuth(user, password)).json()   
                    for host in hostsData['data']:
                        Type='worker'
                        for text in list(host['labels']):
                            if "reverse" in text:
                                Type='reverse'
                        hosts.append({"hostname": host['hostname'],"type": Type, "labels": removeElements(list(host['labels']),1.6)}) 
                        
                        
                    env.append({"name": data['name'], "rancher_version": 1.6, "hosts":  sorted(hosts, key=lambda k: k['hostname']) })

            Data.append({"name": url.split('/')[2].split('.')[0], "environment": env })
        else:
            print ("Falha na conexão")
    #Rancher 2
    if (url.split('/')[3] == 'v3'):
        res = requests.request("GET", url + '/clusters',  auth=HTTPBasicAuth(user, password))
        if (res.status_code == 200):
            env=[]
            res=res.json()
            for data in res['data']:
                hosts=[]
                hostsData = requests.request("GET", url + '/clusters/' + data['id'] + '/nodes' ,  auth=HTTPBasicAuth(user, password)).json()   
                for host in hostsData['data']:
                    Type="worker"
                    for text in list(host['labels']):
                            if "reverse" in text:
                                Type='reverse'
                            elif "controlplane" in text:
                                Type='control'
                    hosts.append({"hostname": host['hostname'],"type": Type, "labels": removeElements(list(host['labels']),2)}) 

                env.append({"name": data['name'], "hosts":  sorted(hosts, key=lambda k: k['hostname']) })
            Data.append({"name": url.split('/')[2].split('.')[0], "rancher_version": 2, "environment": env })
        else:
            print ("Falha na conexão")

with open('/app/src/config/data.json', 'w') as f:
    json.dump(Data, f)