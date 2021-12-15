/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from 'src/room/room.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    playground: true,
    installSubscriptionHandlers: true,
    context: ({req}) => ({headers: req.headers})
  }), TypeOrmModule.forRoot(), RoomModule],
})
export class AppModule { }
