# Project exercises

## EX 4.04

- Apply the argo rollouts
    ```bash
    kubectl create namespace argo-rollouts
    kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
    ```
- Create resource for the [Analysis Template](./project-backend/manifests/analysistemplate.yaml)
- Create resource for the [Rollout](./project-backend/manifests/rollout.yaml)
- Remove the old `deployment.yaml`
- Update the [kustomization.yaml](kustomization.yaml) to use the new rollout manifest instead of the old deployment
- Set the successCondition to: result < 0.001 which basically means that it will fail always. --> confirm that the new pod is not deployed.
- Set the successCondition to something more realistic and see that the new pod gets deployed.

## EX 4.03

- Installed the prometheus following part 2 instructions
- Queried with the following query
    ```query
    sum(kube_pod_info{namespace="prometheus", created_by_kind="StatefulSet"})
    ```

## EX 4.02

- Created /health endpoint for the readiness and liveness probes.
- Added the probes to the deployment
- Built new image hremonen/dwkproject-backend:4.02 which works
- Built another image hremonen/dwkproject-backend:nodb which has wrong db crendentials
- Deployed the working application
- Updated the dwkproject-backend image to the one which breaks the application
- Checked that everything is working regardless
    ```bash
    k get po -n dwk-project
    NAME                                      READY   STATUS    RESTARTS     AGE
    dwkproject-backend-dep-79d5fb645c-4kpqp   1/1     Running   0            4m33s
    dwkproject-backend-dep-7cb6fbcd4b-w6tp6   0/1     Running   1 (3s ago)   29s
    dwkproject-dep-67b6c6b6f5-t7zxd           1/1     Running   0            4m33s
    project-db-stset-0                        1/1     Running   0  
    ```

## EX 3.10

- Picture of the logs ![](./logs.png "GKE Logs")

## EX 3.07 - 3.09

- Check commits

## EX 3.06

- Check out [this post](https://www.hremonen.com/blog/dbaas-vs-self-hosted-database-solutions) I wrote about it.

## EX 3.05

- Created delete-deployment workflow file
- Removed branch e304. See [workflow job summary](https://github.com/HRemonen/HY-DWK/actions/runs/10751890026/job/29819605966)

## EX 3.04

- Updated the deployment

## EX 3.03

- Updated each project Dockerfile to use specific architecture so that it's compatible with GKE.
- Started the GKE cluster
- Built new images for each of the parts (backend, frontend, cron)
- Created [kustomization.yaml](./kustomization.yaml)
- Updated the deployments and whatever to be compatible with GKE
- Created Sealed secret
    ```bash
    # Added sealed secrets controller to the dwk-cluster
    kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.27.1/controller.yaml

    # Used kubeseal to create sealed-secret.yaml file from the secret.yaml file
    kubeseal -f project/project-backend/manifests/secret.yaml -w project/project-backend/manifests/sealed-secret.yaml
    ```
- Created the deployment workflow file
- Tunkkaus 
- Profit

## EX 2.09

- Created a new "application" [project-cron](../project-cron/) which is just a script that calls the backend with the random wikipedia article to read
- Built new image hremonen/create-todo
- Pushed the new image hremonen/create-todo to Docker hub
- Created [cronjob](../project-backend/manifests/todocron.yaml) which uses this new application every hour to create a new todo
- Applied the changed manifests 
- Checked that the todo is created successfully every hour

## EX 2.08

- Created new [manifest](../project-backend/manifests/postgres.yaml) set for the postgres database
- Created secrets for the database -- I did not feel like encrypting so I just omitted it from git
    ```yaml
        apiVersion: v1
        kind: Secret
        metadata:
            name: project-db-secret
            namespace: dwk-project
        data:
            POSTGRES_PASSWORD: <INSERT PASSWORD OF CHOICE>
    ```
- Created [dir](../project-backend/src/database/) to handle the databse related stuff such as the models, connection, migrations and seeders
- Updated the [index.js](../project-backend/src/index.js) accordingly to save the todos to db
- Built new image hremonen/dwkproject-backend:2.08
- pushed the hremonen/dwkproject-backend:2.08 to Docker hub
- Applied the new and changed manifests
- Checked that everything is working -- also when the pods are deleted the todos should remain

## EX 2.04

- Created a new namespace **dwk-project**
    ```bash
    kubectl create namespace dwk-project  
    namespace/dwk-project created
    ```
- Deleted old manifests while in the default namespace
    ```bash
    kubectl delete -f manifests/

    deployment.apps "dwkproject-dep" deleted
    ingress.networking.k8s.io "dwkproject-ingress" deleted
    persistentvolumeclaim "dwkproject-claim" deleted
    service "dwkproject-svc" deleted
    ```

    ```bash
    kubectl delete -f manifests/

    deployment.apps "dwkproject-backend-dep" deleted
    service "dwkproject-backend-svc" deleted
    ```
- Switched to the new namespace
    ```bash
    kubens dwk-project

    Context "k3d-k3s-default" modified.
    Active namespace is "dwk-project".
    ```
- Updated the manifests to use the newly created namespace
- Re-applied the manifests
    ```bash
    kubectl apply -f manifests/

    deployment.apps/dwkproject-dep created
    ingress.networking.k8s.io/dwkproject-ingress created
    persistentvolumeclaim/dwkproject-claim created
    service/dwkproject-svc created
    ```

    ```bash
    kubectl apply -f manifests/

    deployment.apps/dwkproject-backend-dep created
    service/dwkproject-backend-svc created
    ```

## EX 2.02

- Create new [backend](../project-backend/) and all the functionality needed 
- Built the new image hremonen/dwkproject-backend:2.02
- Pushed hremonen/dwkproject-backend:2.02 to Docker hub
- Created [deployment and service](../project-backend/manifests/) for the backend
- Updated [ingress](./manifests/ingress.yaml) to take care of the routing to the /todos route
- Updated dwkproject logic and template files accordingly
- Built the new image hremonen/dwkproject:2.02
- Pushed hremonen/dwkproject:2.02 to Docker hub
- Applied the changes to deployment and ingress
- Check that everything works

## EX 1.13

- Updated the [index.pug](./views/index.pug) file to have the input and some predefined todo items
- Built the new image hremonen/dwkproject:1.13
- Pushed hremonen/dwkproject:1.13 to Docker hub
- Update the [deployment](./manifests/deployment.yaml) container image
- Apply the changes to the dwkproject deployment
    ```bash
    kubectl apply -f /manifests/deployment.yaml
    deployment.apps/dwkproject-dep configured
    ```
- Check that everything works

## EX 1.12

- Updated the logic for index.js to fetch the file every hour and save it to image.jpeg
- Built the new image hremonen/dwkproject:1.12_2
- Pushed hremonen/dwkproject:1.12_2 to Docker hub
- Added the [persistenVolumeClaim.yaml](./manifests/persistentVolumeClaim.yaml)
- Update the [deployment](./manifests/deployment.yaml) to use the pvc we just created to create a volume for the containers
- Apply the persistent volume claim
    ```bash
    kubectl apply -f /manifests/persistentvolumeclaim.yaml
    persistentvolumeclaim/dwkproject-claim created
    ```
- Apply the changes to the dwkproject deployment
    ```bash
    kubectl apply -f /manifests/deployment.yaml
    deployment.apps/dwkproject-dep configured
    ```
- Checked that everything works. Here curl is not really helpful but checking with the browser we can see that the image stays the same even if the deployment is deleted and applied again.

## EX 1.08

As we already had our cluster ports set up by following the material the Ingress port is available on port 8081 locally.

- Deleted logoutput ingress with 
```bash
    kubectl delete -f ../log_output/manifests/ingress.yaml
    ingress.networking.k8s.io "logoutput-ingress" deleted
```
- Created [service.yaml](./manifests/service.yaml) and [ingress.yaml](./manifests/ingress.yaml) files
- Applied all of the manifests
    ```bash
    kubectl apply -f manifests/

    deployment.apps/dwkproject-dep unchanged
    ingress.networking.k8s.io/dwkproject-ingress created
    service/dwkproject-svc created
    ```
- Checked that the application is running locally on port 8081
    ```bash
    curl localhost:8081

    <html><head><title>DWK project</title></head><body><h1>Hello world!</h1></body></html>
    ```

## EX 1.06

Created [service.yaml](./manifests/service.yaml) file for getting access to the project.

- Deleted the old cluster
    ```bash
    project % k3d cluster delete            
    INFO[0000] Deleting cluster 'k3s-default'               
    INFO[0003] Deleting cluster network 'k3d-k3s-default'   
    INFO[0003] Deleting 1 attached volumes...               
    INFO[0003] Removing cluster details from default kubeconfig... 
    INFO[0003] Removing standalone kubeconfig file (if there is one)... 
    INFO[0003] Successfully deleted cluster k3s-default!
    ```

- Create the new cluster
    ```bash
    k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2 
    INFO[0000] portmapping '8081:80' targets the loadbalancer: defaulting to [servers:*:proxy agents:*:proxy] 
    INFO[0000] Prep: Network                                
    INFO[0000] Created network 'k3d-k3s-default'            
    INFO[0000] Created image volume k3d-k3s-default-images  
    INFO[0000] Starting new tools node...                   
    INFO[0000] Starting node 'k3d-k3s-default-tools'        
    INFO[0001] Creating node 'k3d-k3s-default-server-0'     
    INFO[0001] Creating node 'k3d-k3s-default-agent-0'      
    INFO[0001] Creating node 'k3d-k3s-default-agent-1'      
    INFO[0001] Creating LoadBalancer 'k3d-k3s-default-serverlb' 
    INFO[0001] Using the k3d-tools node to gather environment information 
    INFO[0001] Starting new tools node...                   
    INFO[0001] Starting node 'k3d-k3s-default-tools'        
    INFO[0002] Starting cluster 'k3s-default'               
    INFO[0002] Starting servers...                          
    INFO[0002] Starting node 'k3d-k3s-default-server-0'     
    INFO[0006] Starting agents...                           
    INFO[0006] Starting node 'k3d-k3s-default-agent-1'      
    INFO[0006] Starting node 'k3d-k3s-default-agent-0'      
    INFO[0010] Starting helpers...                          
    INFO[0010] Starting node 'k3d-k3s-default-serverlb'     
    INFO[0017] Injecting records for hostAliases (incl. host.k3d.internal) and for 5 network members into CoreDNS configmap... 
    INFO[0019] Cluster 'k3s-default' created successfully!  
    INFO[0019] You can now use it like this:                
    kubectl cluster-info
    ```
- Apply deployment manifest and the service manifest
    ```bash
    kubectl apply -f manifests/deployment.yaml
    deployment.apps/dwkproject-dep created

    kubectl apply -f manifests/service.yaml   
    service/dwkproject-svc created
    ```
- Check that the project is served on port 8082
    ```bash
    curl localhost:8082

    <html><head><title>DWK project</title></head><body><h1>Hello world!</h1></body></html>                                                                    
    ```

## EX 1.05

Created simple static html template with Pug that is served on requests on the route '/'.

- Updated the deployment.yaml to use the image dwkproject:1.05
- Built the new image hremonen/dwkproject:1.05
- Pushed hremonen/dwkproject:1.05 to Docker hub
- Applied the new deployment
    ```bash
    kubectl apply -f manifest/deployment.yaml

    deployment.apps/dwkproject-dep updated
    ```
- Check the new pod
    ```bash
    project % kubectl get pods                                              
    NAME                                READY   STATUS    RESTARTS   AGE
    logoutput-dep-6fc56d45b5-tdkt2      1/1     Running   0          76m
    hashresponse-dep-768d7cbbf8-tgr4l   1/1     Running   0          33m
    dwkproject-dep-64f5c6bf94-xmrq4     1/1     Running   0          51s
    ```
- Forwarded the pods port 8080 to local port 3000
    ```bash
    kubectl port-forward dwkproject-dep-64f5c6bf94-xmrq4 3000:8080
    Forwarding from 127.0.0.1:3000 -> 8080
    Forwarding from [::1]:3000 -> 8080
    ```
- Checked that the html is available on localhost:3000
    ```bash
    curl localhost:3000

    <html><head><title>DWK project</title></head><body><h1>Hello world!</h1></body></html>
    ```

## EX 1.04

I already did make the deployment file in the ex 1.01 so this is done already. However this is what I did:

- Updated the name of the deployment from webserver to dwkproject in deployment.yaml
- Built the new image hremonen/dwkproject:1.04
- Pushed hremonen/dwkproject:1.04 to Docker hub
- Create kubernetes deployment named **dwkproject-dep**
    ```bash
    kubectl apply -f manifest/deployment.yaml

    deployment.apps/dwkproject-dep created
    ```
- Checked that everything works 
    ```bash
    kubectl get pods

    NAME                              READY   STATUS    RESTARTS   AGE
    logoutput-dep-6fc56d45b5-tdkt2    1/1     Running   0          16m
    dwkproject-dep-556598b557-stngg   1/1     Running   0          19s

    kubectl logs -f dwkproject-dep-556598b557-stngg

    > project@1.0.0 start
    > node index.js

    Server started in port 8000
    ```
- Update the port ENV variable in deployment from 8000 to 8080
- Update the deployment
    ```bash
    kubectl apply -f manifest/deployment.yaml

    deployment.apps/dwkproject-dep configured
    ```
- Check the new pod
    ```bash
    kubectl get pods

    NAME                              READY   STATUS    RESTARTS   AGE
    logoutput-dep-6fc56d45b5-tdkt2    1/1     Running   0          18m
    dwkproject-dep-86bb549c65-8zcjv   1/1     Running   0          13s

    kubectl logs -f dwkproject-dep-86bb549c65-8zcjv
    
    > project@1.0.0 start
    > node index.js

    Server started in port 8080
    ```
    


## EX 1.02

Before these steps I built and pushed the image to docker hub - not interesting stuff

---

Create kubernetes deployment named **webserver-dep**

```bash
kubectl create deployment webserver-dep --image hremonen/webserver:1.02

deployment.apps/webserver-dep created
```

Get the pod name for the deployment
```bash
kubectl get pods 

NAME                                 READY   STATUS    RESTARTS   AGE
hashgenerator-dep-78967f76cf-qcx2q   1/1     Running   0          82m
uuid-dep-5fdd58c8cc-gvwnb            1/1     Running   0          30m
webserver-dep-6b7f4cdcfd-q6665       1/1     Running   0          77s
```

Output the logs of the pod to stdout

``` bash
kubectl logs -f webserver-dep-6b7f4cdcfd-q6665

> ex_1_02@1.0.0 start
> node index.js

Server started in port 8000
```

As we can see the port is defined in the [deployment](./manifests/deployment.yaml) as the containers env variable. Locally .env file is used to define the port.
If that shit wouldn't work it should of been 3000.

----