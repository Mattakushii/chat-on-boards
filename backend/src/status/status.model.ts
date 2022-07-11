import { Field, ObjectType } from "@nestjs/graphql";
import { Chat } from "src/chat/chat.model";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("status")
@ObjectType()
export class Status {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;
}
