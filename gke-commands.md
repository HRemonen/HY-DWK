# GKE Commands

## Clusters

Create local cluster
```bash
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
```

Remove local cluster
```bash
k3d cluster delete
```

Create GKE cluster
```bash
gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.29
```

Delete GKE cluster
```bash
gcloud container clusters delete dwk-cluster --zone=europe-north1-b
```

## Prometheus

Create new namespace for Prometheus
```bash
kubectl create namespace prometheus
```

Install ``kube-prometheus-stack``
```bash
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus
```

Port forward

```bash
kubectl -n prometheus port-forward <PROMETHEUS_POD_NAME> 9090:9090
```

## Controllers

Add sealed-secrets controller
```bash
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.27.1/controller.yaml

kubeseal -f project/project-backend/manifests/secret.yaml -w project/project-backend/manifests/sealed-secret.yaml
```