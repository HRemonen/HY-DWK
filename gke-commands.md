# GKE Commands

## Clusters

Create cluster
```bash
gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.29
```

Delete cluster
```bash
gcloud container clusters delete dwk-cluster --zone=europe-north1-b
```

Add sealed-secrets controller
```bash
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.27.1/controller.yaml

kubeseal -f project/project-backend/manifests/secret.yaml -w project/project-backend/manifests/sealed-secret.yaml
```