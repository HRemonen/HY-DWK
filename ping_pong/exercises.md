# Ping pong exercises

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