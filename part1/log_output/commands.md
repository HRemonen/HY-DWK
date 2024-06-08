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