#!/bin/bash
wait_project() {
   echo

   if ! current_generation=$(kubectl -n kiali get deployment/kiali -o=jsonpath='{.status.observedGeneration}'); then
      current_generation=0
   fi
   next_generation=$((current_generation + 1))

   # NOTE: Since this is a hard-coded string, it may need to be updated if the way Kiali reports its progress changes
   # If the upgrade CI job fails on future versions, this is likely the first place to check
   kubectl -n kiali wait --for=jsonpath='{.status.progress.message}'="6. Finished all resource creation" --all kiali --timeout=60s && echo "Kiali CR is ready"

   if ! kubectl -n kiali wait --for=jsonpath='{.status.observedGeneration}'="$next_generation" deployment/kiali --timeout=180s 2>/dev/null; then
      echo "No new Kiali deployment generation detected. Checking if existing pods are ready."
   else
      echo "New Kiali deployment generation detected. Waiting for new pods to be ready."
   fi

   kubectl -n kiali rollout status deployment/kiali --timeout=180s && echo "Kiali is ready"
}
