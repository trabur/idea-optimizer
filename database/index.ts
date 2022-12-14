
import { createRxDatabase, addRxPlugin } from 'rxdb';
// import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

import accessKeys from './schema/accessKeys'
import apps from './schema/apps'
import chatbots from './schema/chatbots'
import clients from './schema/clients'
import deployments from './schema/deployments'
import domainNames from './schema/domainNames'
import features from './schema/features'
import ideas from './schema/ideas'
import industries from './schema/industries'
import languages from './schema/languages'
import librariesAndFrameworks from './schema/librariesAndFrameworks'
import licenseKeys from './schema/licenseKeys'
import namespaces from './schema/namespaces'
import platforms from './schema/platforms'
import projects from './schema/projects'
import reports from './schema/reports'
import solutions from './schema/solutions'
import tenants from './schema/tenants'
import users from './schema/users'

async function addCollectionsToDatabase (database) {
  return await database.addCollections({
    accessKey: {
      schema: accessKeys
    },
    app: {
      schema: apps
    },
    chatbot: {
      schema: chatbots
    },
    client: {
      schema: clients
    },
    deployment: {
      schema: deployments
    },
    domainName: {
      schema: domainNames
    },
    feature: {
      schema: features
    },
    idea: {
      schema: ideas
    },
    industry: {
      schema: industries
    },
    language: {
      schema: languages
    },
    libraryOrFramework: {
      schema: librariesAndFrameworks
    },
    licenseKey: {
      schema: licenseKeys
    },
    namespace: {
      schema: namespaces
    },
    platform: {
      schema: platforms
    },
    project: {
      schema: projects
    },
    report: {
      schema: reports
    },
    solution: {
      schema: solutions
    },
    tenant: {
      schema: tenants
    },
    user: {
      schema: users
    },
  });
}

export async function server () {
  let { getRxStoragePouch, addPouchPlugin } = require('rxdb/plugins/pouchdb');
  let { RxDBUpdatePlugin } = require('rxdb/plugins/update');

  const leveldown = require('leveldown');

  addPouchPlugin(require('pouchdb-adapter-leveldb'));
  
  addRxPlugin(RxDBUpdatePlugin);

  const rxdb = await createRxDatabase({
    name: 'data/istrav.com',
    storage: getRxStoragePouch(leveldown)
  });

  return await addCollectionsToDatabase(rxdb)
}

export async function browser () {
  let dexiePlugin = (await import('rxdb/plugins/dexie'));
  let RxDBUpdatePlugin: any = (await import('rxdb/plugins/update')).RxDBUpdatePlugin;

  addRxPlugin(RxDBUpdatePlugin);

  const rxdb = await createRxDatabase({
    name: 'data/istrav.com',
    storage: dexiePlugin.getRxStorageDexie()
  });

  return await addCollectionsToDatabase(rxdb)
}