/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { MarkModule } from './mark/mark.module';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    playground: true,
    installSubscriptionHandlers: true,
    context: ({req}) => ({headers: req.headers})
  }), TypeOrmModule.forRoot(),UserModule, RoomModule, MarkModule],
})
export class AppModule { }
