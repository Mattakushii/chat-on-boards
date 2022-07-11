import { AuthGuard } from "./auth/auth.guard";
import { MessageModule } from "./message/message.module";
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    playground: true,
    subscriptions: {
      'subscriptions-transport-ws': {
        onConnect: (connectionParams) => {
          return {
            user: AuthGuard.validateToken(connectionParams.authorization)
          }
        },
      }
    },
    context: ({req}) => ({headers: req.headers})
  }), TypeOrmModule.forRoot(), UserModule, ChatModule, MessageModule],
})
export class AppModule { }
