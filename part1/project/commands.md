# Project excercises

## EX 1.04

I already did make the deployment file in the ex 1.02 so this is done already.

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