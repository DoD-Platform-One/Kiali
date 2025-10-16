<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# kiali

![Version: 2.17.0-bb.0](https://img.shields.io/badge/Version-2.17.0--bb.0-informational?style=flat-square) ![AppVersion: 2.17.0](https://img.shields.io/badge/AppVersion-2.17.0-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

Kiali is an open source project for service mesh observability, refer to https://www.kiali.io for details.

## Upstream References

- <https://github.com/kiali/kiali-operator>
- <https://github.com/kiali/kiali>
- <https://github.com/kiali/kiali-operator>
- <https://github.com/kiali/helm-charts>

## Upstream Release Notes

- [Find upstream chart's release notes and CHANGELOG here](https://kiali.io/news/release-notes/)

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install kiali chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| domain | string | `"bigbang.dev"` |  |
| sso.enabled | bool | `false` |  |
| routes.inbound.kiali.enabled | bool | `true` |  |
| routes.inbound.kiali.gateways[0] | string | `"istio-gateway/public-ingressgateway"` |  |
| routes.inbound.kiali.hosts[0] | string | `"kiali.{{ .Values.domain }}"` |  |
| routes.inbound.kiali.service | string | `"kiali.kiali.svc.cluster.local"` |  |
| routes.inbound.kiali.port | int | `20001` |  |
| istio.enabled | bool | `false` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.mtls.mode | string | `"STRICT"` |  |
| tracing.enabled | bool | `true` |  |
| monitoring.enabled | bool | `true` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.egress.definitions.sso.to[0].ipBlock.cidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.egress.from.*.to.definition.kubeAPI | bool | `true` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://kiali:20001"` |  |
| waitJob.enabled | bool | `true` |  |
| waitJob.permissions.apiGroups[0] | string | `"apps"` |  |
| waitJob.permissions.apiGroups[1] | string | `"kiali.io"` |  |
| waitJob.permissions.apiGroups[2] | string | `"kiali.io/v1alpha1"` |  |
| waitJob.permissions.resources[0] | string | `"deployments"` |  |
| waitJob.permissions.resources[1] | string | `"kialis"` |  |
| upstream.nameOverride | string | `"kiali-operator"` |  |
| upstream.image.repo | string | `"registry1.dso.mil/ironbank/opensource/kiali/kiali-operator"` |  |
| upstream.image.tag | string | `"v2.17.0"` |  |
| upstream.image.pullPolicy | string | `"IfNotPresent"` |  |
| upstream.image.pullSecrets[0] | string | `"private-registry"` |  |
| upstream.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.securityContext.privileged | bool | `false` |  |
| upstream.securityContext.runAsNonRoot | bool | `true` |  |
| upstream.securityContext.readOnlyRootFilesystem | bool | `true` |  |
| upstream.securityContext.runAsGroup | int | `2001` |  |
| upstream.securityContext.runAsUser | int | `2001` |  |
| upstream.allowAdHocKialiImage | bool | `true` |  |
| upstream.allowSecurityContextOverride | bool | `true` |  |
| upstream.cr.create | bool | `true` |  |
| upstream.cr.spec.server.port | int | `20001` |  |
| upstream.cr.spec.auth.strategy | string | `"anonymous"` |  |
| upstream.cr.spec.deployment.image_name | string | `"registry1.dso.mil/ironbank/opensource/kiali/kiali"` |  |
| upstream.cr.spec.deployment.image_version | string | `"v2.17.0"` |  |
| upstream.cr.spec.deployment.image_pull_secrets[0] | string | `"private-registry"` |  |
| upstream.cr.spec.deployment.resources.requests.cpu | string | `"100m"` |  |
| upstream.cr.spec.deployment.resources.requests.memory | string | `"128Mi"` |  |
| upstream.cr.spec.deployment.resources.limits.memory | string | `"1Gi"` |  |
| upstream.cr.spec.deployment.security_context.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.cr.spec.deployment.security_context.allowPrivilegeEscalation | bool | `false` |  |
| upstream.cr.spec.deployment.security_context.privileged | bool | `false` |  |
| upstream.cr.spec.deployment.security_context.runAsNonRoot | bool | `true` |  |
| upstream.cr.spec.deployment.security_context.readOnlyRootFilesystem | bool | `true` |  |
| upstream.cr.spec.deployment.security_context.runAsGroup | int | `1001` |  |
| upstream.cr.spec.deployment.security_context.runAsUser | int | `1001` |  |
| upstream.cr.spec.external_services.prometheus.url | string | `"http://monitoring-monitoring-kube-prometheus.monitoring.svc.cluster.local:9090"` |  |
| upstream.cr.spec.external_services.grafana.internal_url | string | `"http://monitoring-grafana.monitoring.svc.cluster.local:80"` |  |
| upstream.cr.spec.external_services.grafana.url | string | `"https://grafana.bigbang.dev"` |  |
| upstream.cr.spec.external_services.grafana.auth.username | string | `"admin"` |  |
| upstream.cr.spec.external_services.grafana.auth.password | string | `"prom-operator"` |  |
| upstream.cr.spec.external_services.grafana.auth.type | string | `"basic"` |  |
| upstream.cr.spec.external_services.tracing.enabled | bool | `true` |  |
| upstream.cr.spec.external_services.tracing.url | string | `"https://tracing.bigbang.dev"` |  |
| upstream.cr.spec.external_services.tracing.internal_url | string | `"http://jaeger-query.jaeger.svc.cluster.local:16686"` |  |
| upstream.cr.spec.external_services.tracing.use_grpc | bool | `false` |  |
| upstream.cr.spec.external_services.tracing.whitelist_istio_system[0] | string | `"istio"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

