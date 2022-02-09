import { Message } from "./../message/message.model";
import { Status } from "./../status/status.model";
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.model";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("room")
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn()
  @Field()
  room_id: number;

  @Column()
  @Field()
  room_name: string;

  @Column()
  @Field()
  owner_id: number;

  @ManyToMany(() => User, (user) => user.id, { cascade: true })
  @JoinTable()
  @Field(() => [User])
  participants: User[];

  @OneToMany(() => Status, (status) => status.id)
  @Field(() => [Status], { nullable: true })
  statuses: Status[];

  //может оно и не надо

  @ManyToOne(() => Message, (message) => message.message_id)
  @JoinTable()
  @Field(() => [Message])
  messages: Message[];
}
