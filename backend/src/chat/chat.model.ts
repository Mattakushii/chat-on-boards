import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.model";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "../message/message.model";

@Entity("chat")
@ObjectType()
export class Chat {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @Field(() => User)
  admin: User;

  @ManyToMany(() => User, (user) => user.id, { cascade: true })
  @JoinTable()
  @Field(() => [User])
  users: User[];

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  @Field(() => [Message])
  messages: Message[];

  @OneToOne(() => Message)
  @JoinColumn()
  @Field(() => Message)
  lastMessage: Message;
}
