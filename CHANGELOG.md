# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.88.0-bb.0] - 2024-08-16

### Changed

- Updated Kiali to v1.88.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali to 1.88.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.88.0
- Updated gluon to 0.5.3

## [1.87.0-bb.0] - 2024-07-11

### Changed

- Updated Kiali to v1.87.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali to 1.87.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.87.0

## [1.86.2-bb.0] - 2024-06-27

### Changed

- Updated Kiali to v1.86.2
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali to 1.86.2
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.86.2

## [1.86.0-bb.2] - 2024-06-25

### Changed

- Removed shared authorization policies

## [1.86.0-bb.1] - 2024-06-25

### Changed

- Updating DEVELOPMENT_MAINTENANCE.md to fix bb docs

## [1.86.0-bb.0] - 2024-06-18

### Changed

- Updated Kiali to v1.86.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali to 1.86.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.86.0

## [1.85.0-bb.0] - 2024-05-28

### Changed

- Updated Kiali to v1.85.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.85.0

## [1.84.0-bb.0] - 2024-05-10

### Changed

- Updated Kiali to v1.84.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.84.0

## [1.83.0-bb.0] - 2024-05-08

### Changed

- Updated Kiali to v1.83.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.83.0

## [1.82.0-bb.3] - 2024-04-09

### Changed

- Update annotations tag to 1.82.0

## [1.82.0-bb.2] - 2024-04-08

### Added

- Custom network policies

## [1.82.0-bb.1] - 2024-04-02

### Changed

- Updated Renovate config to catch gluon

## [1.82.0-bb.0] - 2024-04-01

### Changed

- Updated Kiali to v1.82.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.82.0

## [1.81.0-bb.0] - 2024-03-14

### Changed

- Updated Kiali to v1.81.0
- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.81.0

## [1.80.0-bb.2] - 2024-03-13

### Added

- Added allow-intranamespace policy
- Added allow-nothing-policy
- Added ingressgateway-authz-policy
- Added monitoring-authz-policy
- Added template for adding user defined policies

## [1.80.0-bb.1] - 2024-03-04

### Added

- New ServiceEntries for SSO, grafana, and tracing services

## [1.80.0-bb.0] - 2024-02-28

### Changed

- Updated kiali and kiali-operator images updated to v1.80.0

## [1.78.0-bb.5] - 2024-02-07

### Changed

- Made outboundTrafficPolicy.mode in `Sidecar` configurable

## [1.78.0-bb.4] - 2024-02-02

### Added

- Added template to allow end users to define ServiceEntries for external hostnames/endpoints to add to the istio service registry.
- Updated creation of new istio resources to be reliant on the value of `.Values.istio.hardened.enabled`

## [1.78.0-bb.3] - 2024-01-30

### Added

- Added Istio Sidecar resource to restrict Egress to REGISTRY_ONLY

## [1.78.0-bb.2] - 2024-01-18

### Changed

- Updated gluon to 4.7 to allow consumers to utilize custom cypress scripts

## [1.78.0-bb.1] - 2023-12-18

### Changed

- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.78.0

## [1.78.0-bb.0] - 2023-12-12

### Changed

- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali to 1.78.0

## [1.77.1-bb.1] - 2023-12-06

### Changed

- Increased Cypress test timeouts
- Add some cpu horsepower to test values for the kiali operator

## [1.77.1-bb.0] - 2023-12-01

### Updated

- Updated registry1.dso.mil/ironbank/opensource/kiali/kiali-operator to 1.77.1

## [1.76.0-bb.5] - 2023-11-27

### Changed

- Updating OSCAL Component file

## [1.76.0-bb.4] - 2023-11-22

### Changed

- Reverting cr.spec.deployment.accesible_namespaces tweak

## [1.76.0-bb.3] - 2023-11-14

### Changed

- Kiali CR deployment container securityContext

## [1.76.0-bb.2] - 2023-11-12

### Changed

- Increase memory limit from 1700 to 8000 to prevent operator from OOM crashes in pipelines

## [1.76.0-bb.1] - 2023-11-07

### Changed

- Changed registry1.dso.mil/ironbank/big-bang/base 2.0.0 -> 2.1.0

## [1.76.0-bb.0] - 2023-11-01

### Changed

- Changed registry1.dso.mil/ironbank/opensource/kiali/kiali to 1.76.0

## [1.74.0-bb.4] - 2023-10-26

### Added

- Changed to 1.75.1 images (latest in IB)

## [1.74.0-bb.3] - 2023-10-19

### Changed

- Increase kiali-operator memory limit to 1700Mi

## [1.74.0-bb.2] - 2023-10-07

### Added

- Changed non root group user for kiali CR

## [1.74.0-bb.1] - 2023-10-06

### Changed

- Fixed Cypress Testing

## [1.74.0-bb.0] - 2023-10-03

### Changed

- Renovated chart to 1.74.0
- Bumped kiali operator to 1.74.0
- Bumped kiali tenant to 1.74.1
- Change runAsUser and runAsGroup to 2001 for ansible user

## [1.72.0-bb.2] - 2023-09-07

### Added

- Changed non root group user

## [1.72.0-bb.1] - 2023-08-18

### Changed

- Upgraded to Gluon 0.4.1 and Cypress 13.x
- Changed cypress test to Cypress 13.x format

## [1.72.0-bb.0] - 2023-08-18

### Added

- Changed to 1.72.0 images (latest in IB)

## [1.71.0-bb.1] - 2023-07-26

### Changed

- Changed grafana in_cluster_url value in chart/values.yaml

## [1.71.0-bb.0] - 2023-07-21

### Added

- Changed to 1.71.0 images (latest in IB)

## [1.70.0-bb.0] - 2023-07-12

### Added

- Changed to 1.70.0 images (latest in IB)

## [1.68.0-bb.1] - 2023-06-30

### Added

- Added `oidcCaCert` value to enable a custom CA cert from an OIDC IdP.

## [1.68.0-bb.0] - 2023-06-06

### Added

- Changed to 1.68.0 images (latest in IB)

## [1.67.0-bb.0] - 2023-05-18

### Changed

- Changed to 1.67.0 images (latest in IB)

## [1.66.0-bb.1] - 2023-05-26

### Added

- Added OpenShift support

## [1.66.0-bb.0] - 2023-04-11

### Changed

- Changed to 1.66.0 images (latest in IB)

## [1.65.0-bb.0] - 2023-02-22

### Changed

- Changed to 1.65.0 images (latest in IB)

## [1.64.0-bb.0] - 2023-02-22

### Changed

- Changed to 1.64.0 images (latest in IB)

## [1.60.0-bb.2] - 2023-01-20

### Changed

- Modified chart name to `kiali` and added `nameOverride` to preserve past naming

## [1.60.0-bb.1] - 2023-01-17

### Changed

- Update gluon to new registry1 location + latest version (0.3.2)

## [1.60.0-bb.0] - 2022-12-14

### Changed

- Changed to 1.60.0 images (latest in IB)

## [1.59.1-bb.1] - 2022-11-18

### Changed

- Rename hostname to domain

## [1.59.1-bb.0] - 2022-11-15

### Changed

- Changed to 1.59.1 images (latest in IB)

## [1.58.0-bb.0] - 2022-10-20

### Changed

- Changed to 1.58.0 images (latest in IB)

## [1.57.1-bb.0] - 2022-09-13

### Changed

- Changed to 1.57.1 images (latest in IB)

## [1.56.1-bb.1] - 2022-09-13

### Fixed

- Fixed clicking in cypress test that was being blocked

## [1.56.1-bb.0] - 2022-09-13

### Changed

- Changed to 1.56.1 images (latest in IB)

## [1.56.0-bb.0] - 2022-09-12

### Changed

- Changed to 1.56.0 images (latest in IB)

## [1.55.0-bb.0] - 2022-08-23

### Changed

- Changed to 1.55.0 images (latest in IB)

## [1.54.0-bb.0] - 2022-08-01

### Changed

- Changed to 1.50.0 images (latest in IB)

## [1.51.0-bb.3] - 2022-06-30

### Added

- Added cypress test for keycloak sso integration

## [1.51.0-bb.2] - 2022-06-28

### Changed

- Changed bb base image to 2.0.0
- Update gluon to 0.2.10

## [1.51.0-bb.1] - 2022-06-23

### Changed

- Drop all capabilities for operator

## [1.51.0-bb.0] - 2022-06-07

### Changed

- Changed to 1.51.0 images (latest in IB)

## [1.50.0-bb.1] - 2022-05-26

### Changed

- Changed CI /test/wait.sh. The Big Bang CI infra RKE2 pipeline was failing after the last Kiali upgrade.

## [1.50.0-bb.0] - 2022-05-23

### Changed

- Changed to 1.50.0 images (latest in IB)

## [1.49.0-bb.0] - 2022-04-25

### Changed

- Changed to 1.49.0 images (latest in IB)

## [1.47.0-bb.5] - 2022-04-13

### Changed

- Added a document on how to login to Kiali with the default token setup
- Fixed OSCAL schema validation issues

## [1.47.0-bb.4] - 2022-04-04

### Changed

- Changed network policy to allow egress traffic to tempo for tracing on port 16686

## [1.47.0-bb.3] - 2022-04-01

### Changed

- Modified Cypress test to validate no errors appear on traces tab and check for generic errors

## [1.47.0-bb.2] - 2022-03-24

### Added

- Added Tempo Zipkin Egress Policy

## [1.47.0-bb.1] - 2022-03-15

### Changed

- Modified egress policy to istiod to allow version scraping

## [1.47.0-bb.0] - 2022-02-24

### Changed

- Changed to Kiali 1.47.0 and latest upstream chart

## [1.45.0-bb.3] - 2022-02-15

### Changed

- Modified PeerAuthentication to allow for passing in mode

## [1.45.0-bb.2] - 2022-1-27

### Changed

- Added PeerAuthentication file for mTLS between kiali and istio

## [1.45.0-bb.1] - 2022-1-31

### Changed

- Update Chart.yaml to follow new standardization for release automation
- Added renovate check to update new standardization

## [1.45.0-bb.0] - 2022-1-21

### Changed

- Changed to new Upstream chart
- Changed Image tags to v1.45.0

## [1.44.0-bb.3] - 2022-1-21

### Changed

- Relocated bbtests from `test-values.yaml` to `values.yaml`

## [1.44.0-bb.2] - 2022-1-13

### Added

- Added OSCAL document for NIST 800-53 control inhertiance

## [1.44.0-bb.1] - 2021-12-14

### Changed

- Update Kiali Server to v1.44.0

## [1.44.0-bb.0] - 2021-12-10

### Changed

- Update Kiali Operator to v1.44.0
- Update Kiali Server to v1.43.0 (waiting for IB 1.44)

## [1.42.0-bb.0] - 2021-11-10

### Changed

- Update Kiali to v1.42.0

## [1.40.1-bb.1] - 2021-10-20

### Changed

- Added timeout to cypress test

## [1.40.1-bb.0] - 2021-10-07

### Changed

- Changed base kiali image to v1.40.1
- Changed base kiali-operator image to v1.40.1
- Changed base kiali-operator helm chart to v1.40.1
- Changed VS to v1beta1 API version

## [1.39.0-bb.3] - 2021-09-28

### Added

- Added readOnlyRootFileSystem to Kiali deployment

## [1.39.0-bb.2] - 2021-09-14

### Fixed

- Fixed requests typo

## [1.39.0-bb.1] - 2021-09-13

### Added

- Added wait script for CI

## [1.39.0-bb.0] - 2021-08-25

### Changed

- Changed base images to v1.39.0
- Changed base kiali-operator helm chart to v1.39.0

## [1.37.0-bb.3] - 2021-08-25

### Changed

- Increased resource limits and requests to 512Mi due to OOM errors

## [1.37.0-bb.2] - 2021-08-20

### Changed

- Increased resource limits and requests for memory on Kiali operator to prevent OOMKilled errors

## [1.37.0-bb.1] - 2021-08-16

### Changed

- Set resource limits and requests for kiali operator and cr.

## [1.37.0-bb.0] - 2021-08-03

### Changed

- Changed kiali-operator helm chart to v1.37.0
- Changed kiali images to latest in irobank images v1.37.0

## [1.36.0-bb.3] - 2021-07-21

### Changed

- add openshift toggle. conditionally modify networkpolicy for dns

## [1.36.0-bb.2]

### Fixed

- Use ironbank bigbang base image 8.4 for svc-patch-job

## [1.36.0-bb.1]

### Fixed

- Istio disabled by default

## [1.36.0-bb.0]

### Added

- Because of a change in v1.35.0 of Kiali, we added a job to patch svc/kiali created by the Kiali CR (see <https://github.com/kiali/kiali/issues/4143#issuecomment-873073251>)

### Changed

- Changed base images to v1.36.0
- Changed base kiali-operator helm chart to v1.36.0
- Removing cr.spec.custom_dashboards from values.yaml. Its function was unclear, and it was throwing errors

## [1.32.0-bb.2]

### Added

- Network Policy

## [1.32.0-bb.1]

### Changed

- Copied default CR file into values.yaml from here <https://github.com/kiali/kiali-operator/blob/v1.28/deploy/kiali/kiali_cr.yaml>
