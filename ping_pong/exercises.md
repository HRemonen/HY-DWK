# Ping pong exercises

## EX 4.01

- Added the ReadinesProbes to the deployment
- Made same changes to the log_output app
- Created namespace `dwk-exercises` to the cluster
- Checked that everything works
    ```bash
    k get po -n dwk-exercises         
    NAME                            READY   STATUS    RESTARTS   AGE
    logoutput-dep-97b8fdfff-grr78   1/2     Running   0          29s
    pingpong-dep-765b69f645-m4fxc   0/1     Running   0          20s

    k apply -f manifests/postgres.yaml
    service/postgres-svc unchanged
    statefulset.apps/postgres-stset created

    k get po -n dwk-exercises
    NAME                            READY   STATUS    RESTARTS   AGE
    logoutput-dep-97b8fdfff-grr78   2/2     Running   0          73s
    pingpong-dep-765b69f645-m4fxc   1/1     Running   0          64s
    postgres-stset-0                1/1     Running   0          13s
    ```

## EX 3.02

- Update the service type from `LoadBalancer` to `NodePort`

## EX 3.01

- Created the GKE project as in the course material
- Enabled container.googleapis.com
- Created container cluster dwk-cluster
    ```bash
    gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.29
    ```
- Created namespace `dwk-exercises` to the cluster
    ```bash
    kubectl create namespace dwk-exercises
    ```
- Updated the manifests
- Needed to build new Docker image bc of GKE can not use ARM built images or w/e
- Applied manifests
- Checked that everything works
    ```bash
    kgs -n dwk-exercises  

    NAME           TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
    pingpong-svc   LoadBalancer   34.118.232.17   34.88.68.32   80:31186/TCP   8m2s
    postgres-svc   ClusterIP      None            <none>        5432/TCP       8m3s

    curl http://34.88.68.32:80

    ping                             

    curl http://34.88.68.32/pingpong
    Ping / Pongs: 0                                                                                       
    curl http://34.88.68.32/pingpong
    Ping / Pongs: 1
    ```

## EX 2.07

- Created new [service and stateful](./manifests/postgres.yaml) set for the postgres database
- Created secrets for the database -- I did not feel like encrypting so I just omitted it from git
    ```yaml
        apiVersion: v1
        kind: Secret
        metadata:
        name: postgres-secret
        namespace: dwk-exercises
        data:
        POSTGRES_PASSWORD: <INSERT PASSWORD OF CHOICE>
    ```
- Created [file](./database.js) to handle the databse connection
- Updated the [index.js] accordingly to save the pongs to DB
- Built new image hremonen/pingpong:2.07
- pushed the hremonen/pingpong:2.07 to Docker hub
- Applied the new and changed manifests
- Checked that everything is working -- also when the pods are deleted the pong count should remain


## EX 2.03

Created a new namespace **dwk-exercises** 
```bash
kubectl create namespace dwk-exercises
namespace/dwk-exercises created
```

- Updated the metadata on every [manifest](./manifests/)

## EX 2.01

- Updated the [index.js](./index.js) to serve the number of pings as http response rather than saving to the file
- Built new image hremonen/pingpong:2.01
- pushed the hremonen/pingpong:2.01 to Docker hub
- Removed the volume mount from the container
- Applied the updated [deploymen.yaml](./manifests/deployment.yaml)

## EX 1.11

See other steps in logoutput dir also.

- Updated the [deployment](./manifests/deployment.yaml) to use the pvc we just created to create a volume for the containers
- Updated the logic for index.js to save to the file the pong count
- Built the new image hremonen/pingpong:1.11
- Pushed hremonen/pingpong:1.11 to Docker hub
- Applied the new manifest
    ```bash
    kubectl apply -f manifests/deployment.yaml
    deployment.apps/pingpong-dep configured
    ```

## EX 1.09

- Create project files etc.
- Built the new image hremonen/pingpong:1.09
- Pushed hremonen/pingpong:1.09 to Docker hub
- Update the [logoutput ingress](../log_output/manifests/ingress.yaml)
- Apply the logoutput ingress
    ```bash
    kubectl apply -f ../log_output/manifests/ingress.yaml     
    ```
- Apply the pingpong manifests
    ```bash
    kubectl apply -f manifests/     

    deployment.apps/pingpong-dep created
    service/pingpong-svc created
    ```
- Check that everything is working nicely
    ```bash
    curl localhost:8081
    2024-06-08T16:50:34.779Z: a8cc8a45-1158-4ec9-915b-4ec50ecdf9d5%   

    curl localhost:8081/pingpong
    pong 0                         

    curl localhost:8081/pingpong
    pong 1                                                                                                                                                              

    curl localhost:8081/pingpong
    pong 2
    ```