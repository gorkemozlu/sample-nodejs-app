```
ytt --ignore-unknown-comments -f yaml/values.yaml -f yaml/prep.yaml |kapp deploy -a namespace-prep -f- -y
ytt --ignore-unknown-comments -f yaml/values.yaml -f yaml/deploy.yaml |kapp deploy -a deploy-test-app -f- -y
kubectl get pods,secret,sa,ingress,svc -n test-app
```