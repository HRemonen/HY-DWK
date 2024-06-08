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
