import { User } from "./../user/user.model";
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("message")
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn()
  @Field()
  message_id: number;

  @Column()
  @Field()
  text_message: string;

  @Column()
  @Field()
  room_id: number;

  @ManyToOne(() => User, (user) => user.id)
  @Field(() => User)
  author: User;

  @Column()
  @Field()
  date: Date;
}
