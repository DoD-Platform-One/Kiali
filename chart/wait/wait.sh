#!/bin/bash
wait_project() {
   echo

   if ! current_generation=$(kubectl -n kiali get deployment/kiali -o=jsonpath='{.status.observedGeneration}'); then
      current_generation=0
   fi

   # NOTE: Since this is a hard-coded string, it may need to be updated if the way Kiali reports its progress changes
   # If the upgrade CI job fails on future versions, this is likely the first place to check
   kubectl -n kiali wait --for=jsonpath='{.status.progress.message}'="6. Finished all resource creation" --all kiali --timeout=60s && echo "Kiali CR is ready"

   elapsed_time=0
   while [[ $(kubectl get deploy kiali -n kiali -o jsonpath='{.status.observedGeneration}') -lt "$current_generation" && $elapsed_time -le 180 ]]; do
      echo "Waiting for new deployment..."
      sleep 5
      elapsed_time=$((elapsed_time+5))
   done

   kubectl -n kiali rollout status deployment/kiali --timeout=180s && echo "Kiali is ready"
}

wait_project