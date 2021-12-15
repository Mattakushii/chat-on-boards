import { Status } from "./../status/status.model";
import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("mark")
@ObjectType()
export class Mark {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  test: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  author: number;

  @ManyToMany(() => Status, (status) => status.id, { cascade: true })
  @JoinTable()
  @Field(() => Status)
  status_id: Status;
}
