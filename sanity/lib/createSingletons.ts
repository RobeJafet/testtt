import { SINGLETONS } from '@/sanity/lib/singletons';
import {getCliClient} from 'sanity/cli'
import { languagesSanity } from '@/i18n/i18n-config';

//npx sanity@latest exec ./sanity/lib/createSingletons.ts --with-user-token
const client = getCliClient()

async function createSingletons() {
  
  const documents = SINGLETONS.map((singleton: { id: string; _type: string; }) => {
    if(Array.isArray(languagesSanity)){
      const translations = languagesSanity.map((language: { id: string; title: string }) => ({
        _id: `${singleton.id}-${language.id}`,
        _type: singleton._type,
        language: language.id,
      }))

      const metadata = {
        _id: `${singleton.id}-translation-metadata`,
        _type: `translation.metadata`,
        translations: translations.map((translation) => ({
          _key: translation.language,
          value: {
            _type: 'reference',
            _ref: translation._id,
          },
        })),
        schemaTypes: Array.from(
          new Set(translations.map((translation) => translation._type))
        ),
      }
      return [metadata, ...translations]
    }
    return {
      _id: singleton.id,
      _type: singleton._type,
    }
  }).flat()

  const transaction = client.transaction()
  
  documents.forEach((doc) => {
    transaction.createOrReplace(doc)
  })
  
  await transaction
    .commit()
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
  }
  
createSingletons()