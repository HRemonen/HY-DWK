# Log output exercises

## EX 1.10

Split the application into two; [the generator](./src/generator/) and [the server](./src/server/). The generator produces a hash and every five seconds writes the current timestamp and the hash to a file in the defined [volume](./manifests/deployment.yaml#26). This directory is then read by the server to display the hash to user.

- Created the new app for the Generator
- Built the new image hremonen/logoutput-generator:1.10
- Pushed hremonen/logoutput-generator:1.10 to Docker hub
- Updated the old logoutput app to read from the file
- Built the new image hremonen/logoutput:1.10
- Pushed hremonen/logoutput:1.10 to Docker hub
- Updated the [deploymen.yaml](./manifests/deployment.yaml) to have two containers; the generator and the server and the volume logoutput-vol
- Apply all of the manifests
    ```hash
    kubectl apply -f manifests/

    deployment.apps/logoutput-dep configured
    ingress.networking.k8s.io/logoutput-ingress unchanged
    service/logoutput-svc unchanged
    ```
- Check the logs for the logoutput generator that it is working
    ```bash
    kubectl get pods    

    NAME                             READY   STATUS    RESTARTS   AGE
    pingpong-dep-5f685fbd94-gfxql    1/1     Running   0          15h
    logoutput-dep-76ff49c48f-dwf9v   2/2     Running   0          5m

    kubectl logs logoutput-dep-76ff49c48f-dwf9v logoutput-generator

    > log_output_generator@1.0.0 start
    > node index.js

    2024-06-09T08:11:54.411Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0
    2024-06-09T08:11:59.414Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0
    ```
- Check that the message is available on localhost
    ```bash
    curl localhost:8081

    2024-06-09T08:13:54.502Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0%                                                                                                                                      
    curl localhost:8081

    2024-06-09T08:14:04.509Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0%                                                                                                                                      
    curl localhost:8081

    2024-06-09T08:14:04.509Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0%                                                                                                                                      
    curl localhost:8081

    2024-06-09T08:14:04.509Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0%                                                                                                                                      
    curl localhost:8081

    2024-06-09T08:14:04.509Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0%                                                                                                                                      
    curl localhost:8081

    2024-06-09T08:14:09.515Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0%                                                                                                                                      
    curl localhost:8081

    2024-06-09T08:14:09.515Z: 71f7e48d-efd2-4f4b-abe8-5cdd4058d5e0
    ```

## EX 1.07

As we already had our cluster ports set up by following the material the Ingress port is available on port 8081 locally.

- Updated the logic to an Express API and added the endpoint to query the current time and string
- Created [service.yaml](./manifests/service.yaml) and [ingress.yaml](./manifests/ingress.yaml) files
- Updated the [deploymen.yaml](./manifests/deployment.yaml) image verion
- Build and pushed the new image hremonen/logoutput:1.07 to Docker hub
- Applied all of the manifests
    ```bash
    kubectl apply -f manifests/

    deployment.apps/logoutput-dep created
    ingress.networking.k8s.io/logoutput-ingress created
    service/logoutput-svc created
    ```
- Checked that the application is running locally on port 8081
    ```bash
    curl localhost:8081
    2024-06-08T14:28:06.054Z: 150f377c-2053-45ed-9303-a58f7d51a9f9
    ```

## EX 1.03

I already did make the deployment file in the ex 1.01 so this is done already. However this is what I did:

- Updated the name of the deployment from uuidgenerator to logoutput in deployment.yaml
- Built the new image hremonen/logoutput:1.03
- Pushed hremonen/logoutput:1.03 to Docker hub
- Create kubernetes deployment named **logoutput-dep**
    ```bash
    kubectl create deployment logoutput-dep --image=hremonen/logoutput:1.03

    deployment.apps/logoutput-dep created
    ```
- Checked that everything works 
    ```bash
    log_output % kubectl get pods

    NAME                             READY   STATUS    RESTARTS   AGE
    logoutput-dep-6fc56d45b5-tdkt2   1/1     Running   0          76s

    log_output % kubectl logs -f logoutput-dep-6fc56d45b5-tdkt2

    > log_output@1.0.0 start
    > node index.js

    2024-06-08T06:55:07.399Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:12.410Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:17.413Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:22.418Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:27.422Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:32.423Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:37.426Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:42.427Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:47.434Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:52.443Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:55:57.449Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:56:02.454Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:56:07.460Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:56:12.466Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:56:17.469Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:56:22.470Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:56:27.476Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:56:32.481Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    2024-06-08T06:56:37.487Z: 4351e10f-450f-4f5a-85b2-81a001477e21
    ```

## Ex 1.01 

Build the image and push to docker hub

```bash 
docker image push hremonen/uuidgenerator:1.01 

The push refers to repository [docker.io/hremonen/uuidgenerator]
6003d445221d: Preparing
9893ae224b6f: Preparing
4c8360d9e94d: Preparing
f38cfde3b1ff: Preparing
29fa401b1d57: Preparing
709277cdfd40: Preparing
d2332e9d05c9: Preparing
50171d1acbd5: Preparing
d2332e9d05c9: Waiting
50171d1acbd5: Waiting
709277cdfd40: Waiting
9893ae224b6f: Layer already exists
f38cfde3b1ff: Layer already exists
29fa401b1d57: Layer already exists
6003d445221d: Layer already exists
4c8360d9e94d: Layer already exists
709277cdfd40: Layer already exists
d2332e9d05c9: Layer already exists
50171d1acbd5: Layer already exists
1.01: digest: sha256:b54bbaec28de3e8b91dd322fe1634e1509ed8860f7d11f4d417f5ed088aea858 size: 1986
```

Create kubernetes deployment named **uuid-dep**
```bash
kubectl create deployment uuid-dep --image=hremonen/uuidgenerator:1.01

deployment.apps/uuid-dep created
```

Get the pod name for the deployment
```bash
kubectl get pods

NAME                                 READY   STATUS    RESTARTS   AGE
hashgenerator-dep-78967f76cf-qcx2q   1/1     Running   0          54m
uuid-dep-5fdd58c8cc-gvwnb            1/1     Running   0          2m43s
```

Output the logs of the pod to stdout

``` bash
kubectl logs -f uuid-dep-5fdd58c8cc-gvwnb

> ex_1_01@1.0.0 start
> node index.js

2024-06-07T11:58:34.442Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:58:39.449Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:58:44.451Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:58:49.457Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:58:54.458Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:58:59.465Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:04.466Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:09.468Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:14.469Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:19.472Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:24.481Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:29.486Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:34.486Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:39.489Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:44.492Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:49.499Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:54.499Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T11:59:59.505Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:04.505Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:09.509Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:14.511Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:19.514Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:24.520Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:29.525Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:34.526Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:39.532Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:44.535Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:49.538Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:54.540Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:00:59.541Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:04.545Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:09.551Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:14.552Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:19.559Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:24.563Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:29.569Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:34.574Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:39.575Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:44.577Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:49.584Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:54.586Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:01:59.589Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:02:04.595Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:02:09.600Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:02:14.601Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
2024-06-07T12:02:19.604Z: abea67e4-a8d8-4a2c-9e46-b02e082ff2b7
```