'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemas'
import {structure} from './sanity/structure'
import { documentInternationalization } from '@sanity/document-internationalization'

import { languagesSanity, defaultLocale } from './i18n/i18n-config'
import { SINGLETONS } from './sanity/lib/singletons'

import { resolve } from './sanity/presentation'

//SINGLETONS ACTIONS
const singletonTypes: Set<string> = new Set(SINGLETONS.map(singleton => singleton._type));
const singletonActions: Set<string> = new Set(["publish", "discardChanges", "restore"])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
    templates.filter(({ id }) => 
      !['page', 'home', 'settings', 'project.post' ,'home-es', 'home-en', 'settings-es', 'settings-en'].includes(id)
    ),
  },
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draftMode/enable',
        },
      },
      resolve,
    }),
    documentInternationalization({
      supportedLanguages: languagesSanity,
      schemaTypes: ['page', 'settings', 'home', 'project.post'],
    })
  ],
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
