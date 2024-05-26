import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'store-basic',
  access: (allow) => ({
    'audio/private/{entity_id}/*': [
      allow.entity('identity').to(["read","write","delete"]),
    ],
    'text/*': [
      allow.guest.to(['read', "write",]),
      allow.authenticated.to(["read","write","delete"])
    ]
  })
});