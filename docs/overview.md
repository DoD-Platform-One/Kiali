# Kiali

## Overview

This package consists of a helm chart which bundles the kiali operator and server.

## Kiali

Kiali is an application that allows for monitoring and management related to the [Istio](https://repo1.dso.mil/platform-one/big-bang/apps/core/istio-controlplane) mesh. Kiali can show you mesh topology, details, health, and can also help you determine misconfigurations.

## How it works

Kiali connects with Prometheus, Grafana, Jaeger, and Istio to collect and aggregate data. Please reference the [architecture document](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/understanding-bigbang/package-architecture/kiali.md) for more information.

## Prerequisites

Because Kiali is used to aggregate data about the Istio service mesh, it will always be dependent on Istio.  In the Big Bang implementation, Kiali is also coupled with and dependent on Prometheus, Grafana, and Jaeger.

## Authentication
  
Kiali can be configured to use SSO for authentication, but in most cases this is more of a headache than you may want to deal with when there is a simple alternative.
  
That alternative is to create an ephemeral service token with the command below:  
  
```
kubectl -n kiali create token kiali-service-account
```
  
Drop that token into the textbox on the [Kiali login screen](https://kiali.dev.bigbang.mil) and you're in!
