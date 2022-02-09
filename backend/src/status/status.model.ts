import { Field, ObjectType } from "@nestjs/graphql";
import { Room } from "src/room/room.model";
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

  @ManyToOne(() => Room, (room) => room.statuses, { cascade: true })
  @Field(() => Room)
  room: Room;
}
