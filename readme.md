```
kapp deploy -a namespace-prep -f <(ytt --ignore-unknown-comments -f values.yaml -f prep.yaml)
kapp deploy -a deploy-app -f <(ytt --ignore-unknown-comments -f values.yaml -f deploy.yaml)
kubectl get pods,secret,sa,ingress,svc,pvc -n test-app

cat <<EOF | kubectl apply -f -
apiVersion: velero.io/v1
kind: Backup
metadata:
  creationTimestamp: null
  name: test-app-backup-02
  namespace: velero
spec:
  hooks: {}
  storageLocation: gorkemo-minio-target
  includedNamespaces:
  - test-app
  ttl: 720h0m0s
status: {}
EOF

kubectl delete ns test-app

cat <<EOF | kubectl apply -f -
apiVersion: velero.io/v1
kind: Restore
metadata:
  creationTimestamp: null
  name: test-app-restore-02
  namespace: velero
spec:
  backupName: test-app-backup-02
  includedNamespaces:
  - '*'
status: {}
EOF

kubectl get pods,secret,sa,ingress,svc,pvc -n test-app
```