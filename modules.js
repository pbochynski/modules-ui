export default
[
  {
    "name": "istio",
    "documentation": "https://kyma-project.io/#/istio/user/00-overview/README",
    "repository": "https://github.com/kyma-project/istio.git",
    "managedResources": [
      "/apis/extensions.istio.io/v1alpha1/wasmplugins",
      "/apis/install.istio.io/v1alpha1/istiooperators",
      "/apis/networking.istio.io/v1alpha3/destinationrules",
      "/apis/networking.istio.io/v1alpha3/envoyfilters",
      "/apis/networking.istio.io/v1alpha3/gateways",
      "/apis/networking.istio.io/v1alpha3/serviceentries",
      "/apis/networking.istio.io/v1alpha3/sidecars",
      "/apis/networking.istio.io/v1alpha3/virtualservices",
      "/apis/networking.istio.io/v1alpha3/workloadentries",
      "/apis/networking.istio.io/v1alpha3/workloadgroups",
      "/apis/networking.istio.io/v1beta1/destinationrules",
      "/apis/networking.istio.io/v1beta1/gateways",
      "/apis/networking.istio.io/v1beta1/proxyconfigs",
      "/apis/networking.istio.io/v1beta1/serviceentries",
      "/apis/networking.istio.io/v1beta1/sidecars",
      "/apis/networking.istio.io/v1beta1/virtualservices",
      "/apis/networking.istio.io/v1beta1/workloadentries",
      "/apis/networking.istio.io/v1beta1/workloadgroups",
      "/apis/operator.kyma-project.io/v1alpha1/istios",
      "/apis/operator.kyma-project.io/v1alpha2/istios",
      "/apis/security.istio.io/v1/authorizationpolicies",
      "/apis/security.istio.io/v1/requestauthentications",
      "/apis/security.istio.io/v1beta1/authorizationpolicies",
      "/apis/security.istio.io/v1beta1/peerauthentications",
      "/apis/security.istio.io/v1beta1/requestauthentications",
      "/apis/telemetry.istio.io/v1alpha1/telemetries"
    ],
    "manageable": true,
    "latestGithubRelease" : {
      "repository": "kyma-project/istio",
      "deploymentYaml": "istio-manager.yaml",
      "crYaml": "istio-default-cr.yaml"
    },
    "versions": [
      {
        "version": "1.1.2",
        "channels":["fast","regular"],
        "deploymentYaml": "https://github.com/kyma-project/istio/releases/download/1.1.2/istio-manager.yaml",
        "crYaml": "https://github.com/kyma-project/istio/releases/download/1.1.2/istio-default-cr.yaml"
      }
    ]
  },
  {
    "name": "api-gateway",
    "documentation": "https://kyma-project.io/#/api-gateway/user/README",
    "repository": "https://github.com/kyma-project/api-gateway.git",
    "managedResources": [
      "/apis/operator.kyma-project.io/v1alpha1/apigateways",
      "/apis/gateway.kyma-project.io/v1beta1/apirules"
    ],
    "manageable": true,
    "latestGithubRelease" : {
      "repository": "kyma-project/api-gateway",
      "deploymentYaml": "api-gateway-manager.yaml",
      "crYaml": "apigateway-default-cr.yaml"
    },
    "versions": [
      {
        "version": "2.0.0",
        "channels":["fast","regular"],
        "deploymentYaml": "https://github.com/kyma-project/api-gateway/releases/download/2.0.0/api-gateway-manager.yaml",
        "crYaml": "https://github.com/kyma-project/api-gateway/releases/download/2.0.0/apigateway-default-cr.yaml"
      }
    ]
  },
  {
    "name": "serverless",
    "documentation": "https://kyma-project.io/#/serverless-manager/user/README",
    "repository": "https://github.com/kyma-project/serverless-manager.git",
    "managedResources": [
      "/apis/serverless.kyma-project.io/v1alpha2/functions",
      "/apis/operator.kyma-project.io/v1alpha1/serverlesses"
    ],
    "manageable": true,
    "latestGithubRelease" : {
      "repository": "kyma-project/serverless-manager",
      "deploymentYaml": "serverless-operator.yaml",
      "crYaml": "default-serverless-cr.yaml"
    },
    "versions": [      
      {
        "version": "1.1.0",
        "channels":["fast"],
        "deploymentYaml": "https://github.com/kyma-project/serverless/releases/download/1.1.0/serverless-operator.yaml  ",
        "crYaml": "https://github.com/kyma-project/serverless/releases/download/1.1.0/default-serverless-cr.yaml"
      },
      {
        "version": "1.0.3",
        "channels":["regular"],
        "deploymentYaml": "https://github.com/kyma-project/serverless/releases/download/v1.0.3/serverless-operator.yaml  ",
        "crYaml": "https://github.com/kyma-project/serverless/releases/download/v1.0.3/default_serverless_cr.yaml"
      }
    ]
  },
  {
    "name": "btp-operator",
    "documentation": "https://kyma-project.io/#/btp-manager/user/README",
    "repository": "https://github.com/kyma-project/btp-manager.git",
    "managedResources": [
      "/apis/services.cloud.sap.com/v1/serviceinstances",
      "/apis/services.cloud.sap.com/v1/servicebindings",
      "/apis/services.cloud.sap.com/v1alpha1/servicebindings",
      "/apis/services.cloud.sap.com/v1alpha1/serviceinstances",
      "/apis/operator.kyma-project.io/v1alpha1/btpoperators"
    ],
    "manageable": true,
    "latestGithubRelease" : {
      "repository": "kyma-project/btp-manager",
      "deploymentYaml": "btp-manager.yaml",
      "crYaml": "btp-operator-default-cr.yaml"
    },
    "versions": [
      {
        "version": "1.0.0",
        "channels":["regular"],
        "deploymentYaml": "https://github.com/kyma-project/btp-manager/releases/download/1.0.0/btp-manager.yaml",
        "crYaml": "https://github.com/kyma-project/btp-manager/releases/download/1.0.0/btp-operator-default-cr.yaml"
      },
      {
        "version": "1.0.1",
        "channels":["fast"],
        "deploymentYaml": "https://github.com/kyma-project/btp-manager/releases/download/1.0.1/btp-manager.yaml",
        "crYaml": "https://github.com/kyma-project/btp-manager/releases/download/1.0.1/btp-operator-default-cr.yaml"
      }
    ]
  },
  {
    "name": "telemetry",
    "documentation": "https://kyma-project.io/#/telemetry-manager/user/README",
    "repository": "https://github.com/kyma-project/telemetry-manager.git",
    "managedResources": [
      "/apis/operator.kyma-project.io/v1alpha1/telemetries",
      "/apis/telemetry.kyma-project.io/v1alpha1/logparsers",
      "/apis/telemetry.kyma-project.io/v1alpha1/logpipelines",
      "/apis/telemetry.kyma-project.io/v1alpha1/tracepipelines"
    ],
    "manageable": true,
    "latestGithubRelease" : {
      "repository": "kyma-project/telemetry-manager",
      "deploymentYaml": "telemetry-manager.yaml",
      "crYaml": "telemetry-default-cr.yaml"
    },
    "versions": [
      {
        "version": "1.3.0",
        "channels":["fast"],
        "deploymentYaml": "https://github.com/kyma-project/telemetry-manager/releases/download/1.3.0/telemetry-manager.yaml",
        "crYaml": "https://github.com/kyma-project/telemetry-manager/releases/download/1.3.0/telemetry-default-cr.yaml"
      },
      {
        "version": "1.2.0",
        "channels":["regular"],
        "deploymentYaml": "https://github.com/kyma-project/telemetry-manager/releases/download/1.2.0/telemetry-manager.yaml",
        "crYaml": "https://github.com/kyma-project/telemetry-manager/releases/download/1.2.0/telemetry-default-cr.yaml"
      }
    ]

  },
  {
    "name": "nats",
    "documentation": "https://kyma-project.io/#/nats-manager/user/README",
    "repository": "https://github.com/kyma-project/nats-manager.git",
    "managedResources": [
      "/apis/operator.kyma-project.io/v1alpha1/nats"
    ],
    "manageable": true,
    "latestGithubRelease" : {
      "repository": "kyma-project/nats-manager",
      "deploymentYaml": "nats-manager.yaml",
      "crYaml": "nats_default_cr.yaml"
    },
    "versions": [      
      {
        "version": "1.0.2",
        "channels":["fast","regular"],
        "deploymentYaml": "https://github.com/kyma-project/nats-manager/releases/download/v1.0.2/nats-manager.yaml",
        "crYaml": "https://github.com/kyma-project/nats-manager/releases/download/v1.0.2/nats_default_cr.yaml"
      }
    ]

  },
  {
    "name": "eventing",
    "documentation": "https://kyma-project.io/#/eventing-manager/user/README",
    "repository": "https://github.com/kyma-project/eventing-manager.git",
    "manageable": true,
    "managedResources": [
      "/apis/eventing.kyma-project.io/v1alpha1/subscriptions",
      "/apis/eventing.kyma-project.io/v1alpha2/subscriptions",
      "/apis/operator.kyma-project.io/v1alpha1/eventings"
    ],
    "latestGithubRelease" : {
      "repository": "kyma-project/eventing-manager",
      "deploymentYaml": "eventing-manager.yaml",
      "crYaml": "eventing_default_cr.yaml"
    },
    "versions": [
      {
        "version": "1.0.1",
        "channels":["fast","regular"],
        "deploymentYaml": "https://github.com/kyma-project/eventing-manager/releases/download/1.0.1/eventing-manager.yaml",
        "crYaml": "https://github.com/kyma-project/eventing-manager/releases/download/1.0.1/eventing_default_cr.yaml"
      }
    ]
  },
  {
    "name": "application-connector",
    "documentation": "https://kyma-project.io/#/application-connector-manager/user/README",
    "repository": "https://github.com/kyma-project/application-connector-manager.git",
    "manageable": true,
    "managedResources": [
      "/apis/operator.kyma-project.io/v1alpha1/applicationconnectors"
    ],
    "latestGithubRelease" : {
      "repository": "kyma-project/application-connector-manager",
      "deploymentYaml": "application-connector-manager.yaml",
      "crYaml": "default_application_connector_cr.yaml"
    },
    "versions": [
      {
        "version": "1.0.3",
        "channels":["fast","regular"],
        "deploymentYaml": "https://github.com/kyma-project/application-connector-manager/releases/download/1.0.3/application-connector-manager.yaml",
        "crYaml": "https://github.com/kyma-project/application-connector-manager/releases/download/1.0.3/default_application_connector_cr.yaml"
      }
    ]

  },
  {
    "name": "keda",
    "documentation": "https://kyma-project.io/#/keda-manager/user/README",
    "repository": "https://github.com/kyma-project/keda-manager.git",
    "managedResources": [
      "/apis/operator.kyma-project.io/v1alpha1/kedas",
      "/apis/keda.sh/v1alpha1/clustertriggerauthentications",
      "/apis/keda.sh/v1alpha1/scaledjobs",
      "/apis/keda.sh/v1alpha1/scaledobjects",
      "/apis/keda.sh/v1alpha1/triggerauthentications"
    ],
    "manageable": true,
    "latestGithubRelease" : {
      "repository": "kyma-project/keda-manager",
      "deploymentYaml": "keda-manager.yaml",
      "crYaml": "keda-default-cr.yaml"
    },
    "versions": [
      {
        "version": "1.0.0",
        "channels":["fast","regular"],
        "deploymentYaml": "https://github.com/kyma-project/keda-manager/releases/download/1.0.0/keda-manager.yaml",
        "crYaml": "https://github.com/kyma-project/keda-manager/releases/download/1.0.0/keda-default-cr.yaml"
      }
    ]

  },
  {
    "name": "transparent-proxy",
    "documentation": "https://help.sap.com/docs/connectivity/sap-btp-connectivity-cf/transparent-proxy-in-kyma-environment",
    "managedResources": [
      "apis/operator.kyma-project.io/v1alpha1/transparentproxies"
    ],
    "manageable": true,
    "cr": {
      "resource": {
        "apiVersion": "operator.kyma-project.io/v1alpha1",
        "kind": "TransparentProxy",
        "metadata": {
          "name": "transparent-proxy",
          "namespace": "sap-transp-proxy-system"
        }
      }
    },
    "versions": [
      {
        "version": "1.3.1",
        "channels":["fast","regular"],
        "managerPath": "/apis/apps/v1/namespaces/sap-transp-proxy-system/deployments/sap-transp-proxy-operator-controller-manager",
        "managerImage": "sapse/sap-transp-proxy-operator:1.3.1",
        "crPath": "/apis/operator.kyma-project.io/v1alpha1/namespaces/sap-transp-proxy-system/transparentproxies/transparent-proxy"
      }
    ]

  },
  {
    "name": "cap-operator",
    "documentation": "https://sap.github.io/cap-operator/docs/",
    "repository": "https://github.com/SAP/cap-operator-lifecycle.git",
    "managedResources": [
      "/apis/operator.sme.sap.com/v1alpha1/capoperators"
    ],
    "community": true,
    "manageable": false,
    "latestGithubRelease" : {
      "repository": "SAP/cap-operator-lifecycle",
      "deploymentYaml": "manager_manifest.yaml",
      "crYaml": "manager_default_CR.yaml"
    },
    "versions": [
      {
        "version": "0.0.1",
        "deploymentYaml": "https://github.com/SAP/cap-operator-lifecycle/releases/download/manager%2Fv0.0.1/manager_manifest.yaml",
        "crYaml": "https://github.com/SAP/cap-operator-lifecycle/releases/download/manager%2Fv0.0.1/manager_default_CR.yaml"
      }
    ]

  },
  {
    "name": "cluster-ip",
    "documentation": "https://github.com/pbochynski/cluster-ip#readme",
    "repository": "https://github.com/pbochynski/cluster-ip.git",
    "managedResources": [
      "apis/operator.kyma-project.io/v1alpha1/clusterips"
    ],
    "community": true,
    "manageable": false,
    "latestGithubRelease" : {
      "repository": "pbochynski/cluster-ip",
      "deploymentYaml": "cluster-ip-operator.yaml",
      "crYaml": "cluster-ip-nodes.yaml",
    },
    "versions": [
      {
        "version": "0.0.28",
        "deploymentYaml": "https://github.com/pbochynski/cluster-ip/releases/download/0.0.28/cluster-ip-operator.yaml",
        "crYaml": "https://github.com/pbochynski/cluster-ip/releases/download/0.0.28/cluster-ip-nodes.yaml"
      }
    ]
  }
]