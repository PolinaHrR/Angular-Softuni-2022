import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import * as ApolloUploadClient from "apollo-upload-client";

export function createApollo(): ApolloClientOptions<any> {
  return {
    link: ApolloUploadClient.createUploadLink({ uri: 'http://localhost:1337/graphql' }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
    },
  ],
})
export class GraphQLModule {
}
