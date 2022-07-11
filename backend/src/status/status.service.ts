import { User } from "./../user/user.model";
import { Chat } from "src/chat/chat.model";
import { Repository } from "typeorm";
import { Status } from "./status.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status) private statusRepo: Repository<Status>,
    @InjectRepository(Chat) private roomRepo: Repository<Chat>,
  ) {}

  async createStatus(
    room_id: number,
    name: string,
    description: string,
    user: User,
  ) {
    const status = { room_id, name, description };
    const userData = user;
    const room = await this.roomRepo.findOne(room_id);

    //проверить права пользователя, состоит ли он в группе или нет

    if (!room) {
      throw new BadRequestException("room with this ID does not exist");
    }

    try {
      return await this.statusRepo.save({ ...status, room: room });
    } catch {
      throw new BadRequestException("sometging went wrong...");
    }
  }

  getStatusById(status_id: number) {}
}
