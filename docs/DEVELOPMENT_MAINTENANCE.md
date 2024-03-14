# Code Changes for Updates/Renovates
**NOTE:** Updated kiali-operator images can be requested by creating an issue in the Iron Bank kiali-operator [project](https://repo1.dso.mil/dsop/opensource/kiali/kiali-operator/-/issues)

1. Checkout renovate/ironbank branch

2. Check upstream repo for chart updates https://github.com/kiali/helm-charts/tags

3. Note that Iron Bank does not automatically update kiali-operator with Renovate. Verify that the version of the kiali image to which you'll be updating and the kiali-operator version match (to do this look at how the MR will change the annotation.helm.sh/images section in chart/Chart.yaml). If the kiali and kiali-operator image versions match, proceed to the next step to upgrade the chart with kpt. If they do not match, open an issue with Iron Bank [here](https://repo1.dso.mil/dsop/opensource/kiali/kiali-operator/-/issues) to have them update kiali-operator manually. If you have IL2 Mattermost access, it's a good idea to ping them in the [BB <-> IB channel](https://chat.il2.dso.mil/platform-one/channels/bbib-coordination-and-collaboration) to let them know you've opened this issue. 

4. From the root of the repo run, kpt pkg update chart@<v1.x.x> --strategy alpha-git-patch. Use the version tag you got in step 2-3. You may be prompted to resolve some conflicts - choose what makes sense (if there are BB additions/changes keep them, if there are upstream additions/changes keep them).

5. Modify the `version` in `Chart.yaml` - you will want to append `-bb.0` to the chart version from upstream. update dependencies to latest BB gluon library version.
    ```
    helm dependency update ./chart
    ```

6. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Kiali to x.x.x`).

7. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

8. Push up your changes, validate that CI passes. If there are any failures follow the information in the pipeline to make the necessary updates and reach out to the team if needed.

9. Perform the steps below for manual testing. CI provides a good set of basic smoke tests but it is beneficial to run some additional checks.

# Manual testing steps

1. Browse to https://kiali.bigbang.dev/kiali/ and log on through SSO. Alternatively if you are using anonymous access you can generate the token it asks for with `kubectl -n kiali create token kiali-service-account`.

1. On the main menu, choose Overview and verify that the panels that appear populate and that there are no errors. 

1. Still on the main menu, choose Workloads, then kiali (if you see "no namespace is selected" here you may need to select the kiali namespace in the Select Namespaces drop-down menu). Click Inbound Metrics, then Outbound Metrics. Verify that graphs populate for at least some of the items in both.

Note: Sometimes it takes a while for the graphs to populate on the Inbound Metrics tab. Logging on to grafana.bigbang.dev and clicking around for a while tends to speed this up.

4. Click on Traces and verify that at least some traces appear on the graph. 

Note: The notification bell on the upper right will be red and you will see error pop-ups near it as you move between screens if there are errors. Errors on individual application listings for labels, etc are expected and OK.

### automountServiceAccountToken
The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads). 

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.
