# Ping pong exercises

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