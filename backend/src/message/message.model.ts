import { User } from "./../user/user.model";
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "src/chat/chat.model";

@Entity("message")
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  text: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @Field(() => Chat)
  chat: Chat;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @Field(() => User)
  author: User;

  @Column()
  @Field()
  date: Date;
}
