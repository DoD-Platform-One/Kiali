# kiali

![Version: 1.83.0-bb.0](https://img.shields.io/badge/Version-1.83.0--bb.0-informational?style=flat-square) ![AppVersion: 1.83.0](https://img.shields.io/badge/AppVersion-1.83.0-informational?style=flat-square)

Kiali is an open source project for service mesh observability, refer to https://www.kiali.io for details.

## Upstream References
* <https://github.com/kiali/kiali-operator>

* <https://github.com/kiali/kiali>
* <https://github.com/kiali/kiali-operator>
* <https://github.com/kiali/helm-charts>

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install kiali chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| nameOverride | string | `"kiali-operator"` |  |
| fullnameOverride | string | `""` |  |
| domain | string | `"bigbang.dev"` |  |
| istio.enabled | bool | `false` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.hardened.monitoring.enabled | bool | `true` |  |
| istio.hardened.monitoring.namespaces[0] | string | `"monitoring"` |  |
| istio.hardened.monitoring.principals[0] | string | `"cluster.local/ns/monitoring/sa/monitoring-grafana"` |  |
| istio.hardened.monitoring.principals[1] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-alertmanager"` |  |
| istio.hardened.monitoring.principals[2] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-operator"` |  |
| istio.hardened.monitoring.principals[3] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-prometheus"` |  |
| istio.hardened.monitoring.principals[4] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-state-metrics"` |  |
| istio.hardened.monitoring.principals[5] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-prometheus-node-exporter"` |  |
| istio.kiali.gateways[0] | string | `"istio-system/main"` |  |
| istio.kiali.hosts[0] | string | `"kiali.{{ .Values.domain }}"` |  |
| istio.mtls.mode | string | `"STRICT"` |  |
| port | int | `20001` |  |
| image.repo | string | `"registry1.dso.mil/ironbank/opensource/kiali/kiali-operator"` |  |
| image.tag | string | `"v1.83.0"` |  |
| image.digest | string | `""` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.pullSecrets[0] | string | `"private-registry"` |  |
| nodeSelector | object | `{}` |  |
| podAnnotations | object | `{}` |  |
| podLabels | object | `{}` |  |
| env | list | `[]` |  |
| tolerations | list | `[]` |  |
| resources.requests.cpu | string | `"200m"` |  |
| resources.requests.memory | string | `"8000Mi"` |  |
| resources.limits.cpu | string | `"200m"` |  |
| resources.limits.memory | string | `"8000Mi"` |  |
| affinity | object | `{}` |  |
| replicaCount | int | `1` |  |
| priorityClassName | string | `""` |  |
| securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| securityContext.allowPrivilegeEscalation | bool | `false` |  |
| securityContext.privileged | bool | `false` |  |
| securityContext.runAsNonRoot | bool | `true` |  |
| securityContext.readOnlyRootFilesystem | bool | `true` |  |
| securityContext.runAsGroup | int | `2001` |  |
| securityContext.runAsUser | int | `2001` |  |
| metrics.enabled | bool | `true` |  |
| debug.enabled | bool | `true` |  |
| debug.verbosity | string | `"1"` |  |
| debug.enableProfiler | bool | `false` |  |
| watchNamespace | string | `""` |  |
| clusterRoleCreator | bool | `true` |  |
| secretReader[0] | string | `"cacerts"` |  |
| secretReader[1] | string | `"istio-ca-secret"` |  |
| onlyViewOnlyMode | bool | `false` |  |
| allowAdHocKialiNamespace | bool | `true` |  |
| allowAdHocKialiImage | bool | `true` |  |
| allowAdHocOSSMConsoleImage | bool | `false` |  |
| allowSecurityContextOverride | bool | `true` |  |
| allowAllAccessibleNamespaces | bool | `true` |  |
| accessibleNamespacesLabel | string | `""` |  |
| oidcCaCert | string | `""` |  |
| cr.create | bool | `true` |  |
| cr.name | string | `"kiali"` |  |
| cr.namespace | string | `""` |  |
| cr.annotations | object | `{}` |  |
| cr.spec.istio_component_namespaces.grafana | string | `"monitoring"` |  |
| cr.spec.istio_component_namespaces.prometheus | string | `"monitoring"` |  |
| cr.spec.istio_component_namespaces.tracing | string | `"jaeger"` |  |
| cr.spec.istio_namespace | string | `"istio-system"` |  |
| cr.spec.deployment.image_name | string | `"registry1.dso.mil/ironbank/opensource/kiali/kiali"` |  |
| cr.spec.deployment.image_version | string | `"v1.83.0"` |  |
| cr.spec.deployment.image_pull_secrets[0] | string | `"private-registry"` |  |
| cr.spec.deployment.ingress_enabled | bool | `false` |  |
| cr.spec.deployment.accessible_namespaces[0] | string | `"**"` |  |
| cr.spec.deployment.logger.log_level | string | `"info"` |  |
| cr.spec.deployment.resources.requests.cpu | string | `"200m"` |  |
| cr.spec.deployment.resources.requests.memory | string | `"368Mi"` |  |
| cr.spec.deployment.resources.limits.cpu | string | `"200m"` |  |
| cr.spec.deployment.resources.limits.memory | string | `"368Mi"` |  |
| cr.spec.deployment.security_context.capabilities.drop[0] | string | `"ALL"` |  |
| cr.spec.deployment.security_context.allowPrivilegeEscalation | bool | `false` |  |
| cr.spec.deployment.security_context.privileged | bool | `false` |  |
| cr.spec.deployment.security_context.runAsNonRoot | bool | `true` |  |
| cr.spec.deployment.security_context.readOnlyRootFilesystem | bool | `true` |  |
| cr.spec.deployment.security_context.runAsGroup | int | `1001` |  |
| cr.spec.deployment.security_context.runAsUser | int | `1001` |  |
| cr.spec.auth.strategy | string | `"anonymous"` |  |
| cr.spec.external_services.custom_dashboards.enabled | bool | `true` |  |
| cr.spec.external_services.prometheus.url | string | `"http://monitoring-monitoring-kube-prometheus.monitoring.svc.cluster.local:9090"` |  |
| cr.spec.external_services.grafana.enabled | bool | `true` |  |
| cr.spec.external_services.grafana.in_cluster_url | string | `"http://monitoring-grafana.monitoring.svc.cluster.local:80"` |  |
| cr.spec.external_services.grafana.url | string | `"https://grafana.bigbang.dev"` |  |
| cr.spec.external_services.grafana.auth.username | string | `"admin"` |  |
| cr.spec.external_services.grafana.auth.password | string | `"prom-operator"` |  |
| cr.spec.external_services.grafana.auth.type | string | `"basic"` |  |
| cr.spec.external_services.grafana.dashboards[0].name | string | `"Istio Service Dashboard"` |  |
| cr.spec.external_services.grafana.dashboards[0].variables.namespace | string | `"var-namespace"` |  |
| cr.spec.external_services.grafana.dashboards[0].variables.service | string | `"var-service"` |  |
| cr.spec.external_services.grafana.dashboards[1].name | string | `"Istio Workload Dashboard"` |  |
| cr.spec.external_services.grafana.dashboards[1].variables.namespace | string | `"var-namespace"` |  |
| cr.spec.external_services.grafana.dashboards[1].variables.workload | string | `"var-workload"` |  |
| cr.spec.external_services.grafana.dashboards[2].name | string | `"Istio Mesh Dashboard"` |  |
| cr.spec.external_services.grafana.dashboards[3].name | string | `"Istio Control Plane Dashboard"` |  |
| cr.spec.external_services.grafana.dashboards[4].name | string | `"Istio Performance Dashboard"` |  |
| cr.spec.external_services.grafana.dashboards[5].name | string | `"Istio Wasm Extension Dashboard"` |  |
| cr.spec.external_services.tracing.enabled | bool | `true` |  |
| cr.spec.external_services.tracing.url | string | `"https://tracing.bigbang.dev"` |  |
| cr.spec.external_services.tracing.in_cluster_url | string | `"http://jaeger-query.jaeger.svc.cluster.local:16686"` |  |
| cr.spec.external_services.tracing.use_grpc | bool | `false` |  |
| cr.spec.external_services.tracing.whitelist_istio_system[0] | string | `"istio"` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| openshift | bool | `false` |  |
| svcPatchJob.enabled | bool | `false` |  |
| svcPatchJob.image.repository | string | `"registry1.dso.mil/ironbank/big-bang/base"` |  |
| svcPatchJob.image.tag | string | `"2.1.0"` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://kiali:{{ default 20001 .Values.port }}"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
