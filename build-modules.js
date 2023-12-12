import * as jsYaml from 'js-yaml'
import * as fs from 'fs'
import modules from "./modules.js";
import { get } from 'http';


async function getLatestVersion(m) {
  if (m.latestGithubRelease) {
    const headers = {}
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }
    let path = `https://api.github.com/repos/${m.latestGithubRelease.repository}/releases/latest`
    try {
      let res = await fetch(path, { headers })
      if (res.status != 200) {
        console.log("error fetching latest release for module", m.name, res.status)
        return
      }
      let body = await res.json()
      let version = body.tag_name
      let deploymentYaml = body.assets.find(a => a.name == m.latestGithubRelease.deploymentYaml)
      let crYaml = body.assets.find(a => a.name == m.latestGithubRelease.crYaml)
      let existing = m.versions.find(v => v.version == version)
      if (existing) {
        if (existing.deploymentYaml != deploymentYaml.browser_download_url) {
          console.log(deploymentYaml.browser_download_url, "<>", existing.deploymentYaml)
          throw new Error("Deployment YAML URL mismatch for latest release of module " + m.name)
        }
        if (existing.crYaml != crYaml.browser_download_url) {
          console.log(crYaml.browser_download_url, "<>", existing.crYaml)
          throw new Error("CR YAML URL mismatch for latest release of module " + m.name)
        }
      } else if (isSemVer(version)) {
        console.log("adding latest version", version, "to module", m.name)
        m.versions.push({
          version: version,
          deploymentYaml: deploymentYaml.browser_download_url,
          crYaml: crYaml.browser_download_url
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
function validateImageVersion(image, version, channel) {
  let im = image.split('/')[image.split('/').length - 1]
  if (!im.endsWith(`:${version}`)) {
    console.error(`manager image version ${im} doesn't match version ${version} in channel ${channel}`)
  }
}

function operatorImage(r) {
  const skip = ['kube-rbac-proxy']
  if (r.kind == 'Deployment') {
    for (let c of r.spec.template.spec.containers) {
      if (skip.find(s => c.name.includes(s))) {
        continue
      }
      return c.image
    }
  }
  return null
}

function resPath(r, manifest) {
  for (let res of manifest) {
    if (res.kind == 'CustomResourceDefinition' && res.spec.names.kind == r.kind) {
      for (let v of res.spec.versions) {
        if (res.spec.group + '/' + v.name == r.apiVersion) {
          if (res.spec.scope == 'Namespaced') {
            return `/apis/${r.apiVersion}/namespaces/${r.metadata.namespace}/${res.spec.names.plural}/${r.metadata.name}`
          } else {
            return `/apis/${r.apiVersion}/${res.spec.names.plural}/${r.metadata.name}`
          }
        }
      }
    }
  }
  return null
}
function isNamespaced(r, manifest) {
  for (let res of manifest) {
    if (res.kind == 'CustomResourceDefinition' && res.spec.names.kind == r.kind) {
      for (let v of res.spec.versions) {
        if (res.spec.group + '/' + v.name == r.apiVersion) {
          return (res.spec.scope == 'Namespaced')
        }
      }
    }
  }
  return undefined
}

async function loadModule(m, v) {
  let url = v.deploymentYaml || m.deploymentYaml
  const resources = []
  if (url) {
    let response = await fetch(url)
    let body = await response.text()
    jsYaml.loadAll(body, (doc) => {
      resources.push(doc)
    });
    fs.writeFileSync(`public/${m.name}-${v.version}.json`, JSON.stringify(resources, null, 2))
    console.log("module resources written to :", `build/${m.name}-${v.version}.json`)
  }
  v.managerPath = managerPath(resources)
  v.managerImage = managerImage(resources)
  validateImageVersion(v.managerImage, v.version, channel)
  
  url = v.crYaml || m.crYaml
  if (!v.cr && url) {
    let response = await fetch(url)
    if (response.status != 200) {
      throw new Error("Resource not found: " + url)
    }
    let body = await response.text()
    v.cr = jsYaml.load(body)
    if (!v.cr.metadata.namespace && isNamespaced(v.cr, resources)) {
      v.cr.metadata.namespace = 'kyma-system'
    }
    if (!v.crPath) {
      v.crPath = resPath(v.cr, resources)
    }
  }
}

async function latestVersions() {
  console.log("checking latest versions")
  const tasks = []
  for (let m of modules) {
    tasks.push(getLatestVersion(m))
  }
  await Promise.allSettled(tasks)
  console.log("latest versions checked")
}

function isSemVer(version) {
  return /^\d+\.\d+\.\d+$/.test(version)
}
function semVerCompare(a, b) {
  const aParts = a.version.split('.')
  const bParts = b.version.split('.')
  for (let i = 0; i < 3; i++) {
    if (aParts[i] > bParts[i]) {
      return 1
    }
    if (aParts[i] < bParts[i]) {
      return -1
    }
  }
  return 0
}

async function build() {
  await latestVersions()
  const tasks = []
  for (let m of modules) {
    m.versions.sort(semVerCompare)
    for (let v of m.versions) {
      v.cr = v.cr || m.cr
      tasks.push(loadModule(m, v))
    }
  }
  await Promise.allSettled(tasks)

  fs.writeFileSync(`public/modules.json`, JSON.stringify(modules, null, 2))
  console.log("modules written:", `build/modules.json`)
}

function getFolders(parentFolder) {
  return fs.readdirSync(parentFolder, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}
function getFiles(parentFolder) {
  return fs.readdirSync(parentFolder, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)
}

// name: kyma-project.io/module/btp-operator
// channel: fast
// version: 1.0.2
// manifest: btp-manager.yaml
// defaultCR: btp-operator-default-cr.yaml
// annotations:
//   "operator.kyma-project.io/doc-url": "https://kyma-project.io/#/btp-manager/user/README"
// moduleRepo: https://github.com/kyma-project/btp-manager.git
// moduleSecurityScanConfig: true

function managerPath(resources) {
  for (let r of resources) {
    if (r.kind == 'Deployment') {
      const ns = r.metadata.namespace || 'kyma-system'
      const name = r.metadata.name
      return  `/apis/apps/v1/namespaces/${ns}/deployments/${name}`
    }
  }
  return null
}

function managerImage(resources) {
  for (let r of resources) {
    if (r.kind == 'Deployment') {
      return operatorImage(r)
    }
  }
}

function loadModuleFromFolder(name) {
  let m = { name, versions: [] }
  getFolders(`module-manifests/modules/${name}`).forEach(channel => {
    if (channel == 'dev') return // skip dev channel
    let moduleConfig = null
    try {
      moduleConfig = fs.readFileSync(`module-manifests/modules/${name}/${channel}/module-config.yaml`, 'utf8')
    } catch (e) {
      console.error("error reading module-config.yaml for module", name, channel)
      return;
    }
    let module = jsYaml.load(moduleConfig)
    let n = module.name.split('/')[module.name.split('/').length - 1]
    if (n != name) {
      console.error("module name mismatch", n, name, channel)
      throw new Error("module name mismatch")
    }
    let version = module.version
    let v = m.versions.find(ver => ver.version == version)
    if (v) {
      v.channels.push(channel)
    } else {
      v = { version, channels: [channel] }
      m.versions.push(v)
    }
    let manifest = fs.readFileSync(`module-manifests/modules/${name}/${channel}/${module.manifest}`, 'utf8')

    let resources = []
    jsYaml.loadAll(manifest, (doc) => {
      resources.push(doc)
    });
    fs.writeFileSync(`public/${m.name}-2-${v.version}.json`, JSON.stringify(resources, null, 2))

    v.documentation = module.annotations["operator.kyma-project.io/doc-url"]
    v.repository = module.moduleRepo
    v.managerPath = managerPath(resources)
    v.managerImage = managerImage(resources)
    validateImageVersion(v.managerImage, v.version, channel)

    let crYaml = fs.readFileSync(`module-manifests/modules/${name}/${channel}/${module.defaultCR}`, 'utf8')
    v.cr = jsYaml.load(crYaml)
    if (!v.cr.metadata.namespace && isNamespaced(v.cr, resources)) {
      v.cr.metadata.namespace = 'kyma-system'
    }
    if (!v.crPath) {
      v.crPath = resPath(v.cr, resources)
    }

  })
  return m
}

function loadModulesFromManifests() {
  let names = getFolders('module-manifests/modules')
  let modules = []
  for (let name of names) {
    let m = loadModuleFromFolder(name)
    if (m.versions.length > 0) {
      modules.push(loadModuleFromFolder(name))
    } else {
      console.log("skipping module", name, "- no versions found")
    }
  }
  fs.writeFileSync(`public/modules2.json`, JSON.stringify(modules, null, 2))
  console.log("modules written:", `build/modules2.json`)

}
// build()
loadModulesFromManifests()
