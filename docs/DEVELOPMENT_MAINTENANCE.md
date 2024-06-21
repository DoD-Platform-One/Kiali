# Maintaining Kiali

## Code Changes for Updates/Renovates

**NOTE:** Updated kiali-operator images can be requested by creating an issue in the [Iron Bank kiali-operator project](https://repo1.dso.mil/dsop/opensource/kiali/kiali-operator/-/issues)

1. Checkout the `renovate/ironbank` branch.
1. Check the [upstream repo](https://github.com/kiali/helm-charts/tags) for chart updates.
1. Note that Iron Bank does not automatically update kiali-operator with Renovate. Verify that the version of the kiali image to which you'll be updating and the kiali-operator version match (to do this look at how the MR will change the `annotation.helm.sh/images` section in [chart/Chart.yaml](../chart/Chart.yaml)).
    - If the kiali and kiali-operator image versions match, proceed to the next step that handles upgrading the chart with kpt.
    - If they do not match, open an issue with Iron Bank [here](https://repo1.dso.mil/dsop/opensource/kiali/kiali-operator/-/issues) to have them update kiali-operator manually. It's also a good idea to ping them in the [BB <-> IB channel in IL4 Mattermost](https://chat.il4.dso.mil/platform-one/channels/bbib-coordination-and-collaboration) to let them know you've opened this issue. See the [Testing kiali-operator image updates](#testing-kiali-operator-image-updates) subsection below for important details on the process of updating the kiali-operator image and testing Kiali with the new image.
1. From the root of the repo run, `kpt pkg update chart@<v1.x.x> --strategy alpha-git-patch`. Use the version tag you got in the previous steps. You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them).
1. Modify the `version` in [chart/Chart.yaml](../chart/Chart.yaml) - append `-bb.0` to the chart version from upstream.
1. Update dependencies to latest versions.

    ```sh
    helm dependency update ./chart
    ```

1. Update [CHANGELOG.md](../CHANGELOG.md) adding an entry for the new version and noting all changes (at minimum this should include the line `Updated Kiali to x.x.x`).
1. Generate the [README.md](../README.md) using the [gluon library script](https://repo1.dso.mil/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md) guidelines noting any additional chart changes you make during development testing.
1. Push your changes, validate that the CI pipeline passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.
1. Deploy and test Kiali with the [testing steps below](#testing-kiali-updates). The CI pipeline provides a good set of basic smoke tests but it is beneficial to run some additional checks.

## Testing kiali-operator image updates

Iron Bank will initially push the updated kiali-operator image to staging at a url such as: `registry1.dso.mil/ironbank-staging/opensource/kiali/kiali-operator:v1.84.0`

1. Update the references to the kiali-operator in [chart/Chart.yaml](../chart/Chart.yaml) and [chart/values.yaml](../chart/values.yaml) to point to this image in staging.
1. Follow the steps below to finish updating Kiali on your branch.
1. When you're finished updating your branch, deploy and test Kiali with the [testing steps below](#testing-kiali-updates).
1. Once the package pipeline passes and Kiali passes all the testing steps, let Iron Bank know that they can push the kiali-operator image to production via the [BB <-> IB channel in IL4 Mattermost](https://chat.il4.dso.mil/platform-one/channels/bbib-coordination-and-collaboration).
1. Once the kiali-operator image is in production, you'll want to point to the production image by editing [chart/Chart.yaml](../chart/Chart.yaml) and [chart/values.yaml](../chart/values.yaml) again to point to the production image. For example: `registry1.dso.mil/ironbank/opensource/kiali/kiali-operator:v1.84.0`.
1. Generate the [README.md](../README.md) using the [gluon library script](https://repo1.dso.mil/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md) guidelines noting any additional chart changes you make during development testing.
1. Confirm that the package pipeline passes with these changes and test again with the [testing steps below](#testing-kiali-updates) before putting your MR in review status.

## Testing kiali updates

You should perform these steps on both a clean install and an upgrade from BB master.

### Branch/Tag Config

If you'd like to install from a specific branch or tag, then the code block under kiali needs to be uncommented and used to target your changes.

For example, this would target the `renovate/ironbank` branch.

```yaml
kiali:
  <other config/labels>
  ...
  ...

  # Add git branch or tag information to test against a specific branch or tag instead of using `main`
  # Must set the unused label to null
  git:
    tag: null
    branch: "renovate/ironbank"
```

### Cluster setup

⚠️ Always make sure your local bigbang repo is current before deploying.

1. Export your Ironbank/Harbor credentials (this can be done in your `~/.bashrc` or `~/.zshrc` file if desired). These specific variables are expected by the `k3d-dev.sh` script when deploying metallb, and are referenced in other commands for consistency:

```sh
export REGISTRY_USERNAME='<your_username>'
export REGISTRY_PASSWORD='<your_password>'
```

1. Export the path to your local bigbang repo (without a trailing `/`):

⚠️ Note that wrapping your file path in quotes when exporting will break expansion of `~`.

```sh
export BIGBANG_REPO_DIR=<absolute_path_to_local_bigbang_repo>
```

e.g.

```sh
export BIGBANG_REPO_DIR=~/repos/bigbang
```

1. Run the [k3d_dev.sh](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/assets/scripts/developer/k3d-dev.sh) script to deploy a dev cluster (`-a` flag required if deploying a local Keycloak):

    For `login.dso.mil` Keycloak:

    ```sh
    "${BIGBANG_REPO_DIR}"/docs/assets/scripts/developer/k3d-dev.sh
    ```

    For local `keycloak.dev.bigbang.mil` Keycloak (`-a` deploys instance with a second public IP and metallb):

    ```sh
    "${BIGBANG_REPO_DIR}"/docs/assets/scripts/developer/k3d-dev.sh -a
    ```

1. Export your kubeconfig:

    ```sh
    export KUBECONFIG=~/.kube/<your_kubeconfig_file>
    ```

    e.g.

    ```sh
    export KUBECONFIG=~/.kube/Christopher.Galloway-dev-config
    ```

1. [Deploy flux to your cluster](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/scripts/install_flux.sh):

```sh
"${BIGBANG_REPO_DIR}"/scripts/install_flux.sh -u "${REGISTRY_USERNAME}" -p "${REGISTRY_PASSWORD}"
```

### Deploy Bigbang

From the root of this repo, run one of the following deploy commands depending on which Keycloak you wish to reference:

For `login.dso.mil` Keycloak:

  ```sh
  helm upgrade -i bigbang ${BIGBANG_REPO_DIR}/chart/ -n bigbang --create-namespace \
  --set registryCredentials.username=${REGISTRY_USERNAME} --set registryCredentials.password=${REGISTRY_PASSWORD} \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/tests/test-values.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/chart/ingress-certs.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/docs/assets/configs/example/dev-sso-values.yaml \
  -f docs/dev-overrides/minimal.yaml \
  -f docs/dev-overrides/kiali-testing.yaml
  ```

For local `keycloak.dev.bigbang.mil` Keycloak:

  ```sh
  helm upgrade -i bigbang ${BIGBANG_REPO_DIR}/chart/ -n bigbang --create-namespace \
  --set registryCredentials.username=${REGISTRY_USERNAME} --set registryCredentials.password=${REGISTRY_PASSWORD} \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/tests/test-values.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/chart/ingress-certs.yaml \
  -f docs/dev-overrides/minimal.yaml \
  -f docs/dev-overrides/kiali-testing-local-keycloak.yaml
  ```

This will deploy the following apps for testing:

- Istio, Istio operator and Authservice
- Kiali and Monitoring (including Grafana), all with SSO enabled
- Optionally Keycloak

### Validation/Testing Steps

⚠️ For testing with a local Keycloak instance, you will need to manually register or create an account as an admin before proceeding with the below tests. For more info please reference the Keycloak [DEVELOPMENT_MAINTENANCE.md](https://repo1.dso.mil/big-bang/product/packages/keycloak/-/blob/main/docs/DEVELOPMENT_MAINTENANCE.md).

⚠️ In the Kiali web interface, the notification bell on the upper right will sometimes be red and you will see error pop-ups near it as you move between screens if there are errors. Errors on individual application listings for labels, annotations, etc are expected and OK.

1. Navigate to [Kiali](https://kiali.dev.bigbang.mil/) and validate you are prompted to login with SSO and that the login is successful.
1. On the main menu, choose `Overview` and verify that the panels that appear populate and that there are no errors.
1. Still on the main menu, choose `Workloads`, then `Kiali` (if you see "no namespace is selected" here you may need to select the Kiali namespace in the `Select Namespaces` drop-down menu).
    - Check both `Inbound Metrics` and `Outbound Metrics`. Verify that graphs populate for at least some of the items in each. *Note: Sometimes it takes a while for the graphs to populate on the Inbound Metrics tab. Logging on to grafana.bigbang.dev and clicking around for a while tends to speed this up.*
1. Click on `Traces` and verify that at least some traces appear on the graph.
1. Once you've confirmed that the package tests above pass, also test your branches against Big Bang per the steps in [this document](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/developer/test-package-against-bb.md).

## automountServiceAccountToken

The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads).

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.

## Modifications made to the upstream chart

### [chart/values.yaml](../chart/values.yaml)

- Ensure renovate does not remove `oidcCaCert` key and associated comment. This corresponds to `chart/templates/bigbang/oidc-ca-cm.yaml` added in [#52](https://repo1.dso.mil/big-bang/product/packages/kiali/-/issues/52)
