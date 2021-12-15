import { Field, ObjectType } from "@nestjs/graphql";
import { Room } from "src/room/room.model";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @ManyToMany(() => Room, (room) => room.room_id, { cascade: true })
  @JoinTable()
  @Field(() => [Number])
  room_id: number[];
}
