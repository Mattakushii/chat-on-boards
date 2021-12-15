import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.model";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
}
