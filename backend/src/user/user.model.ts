import { Field, ObjectType } from "@nestjs/graphql";
import { Chat } from "src/chat/chat.model";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  surname: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Chat, (chat) => chat.id, { cascade: true })
  @Field(() => [Chat])
  chats: Chat[];
}
