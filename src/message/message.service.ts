import { RoomService } from "./../room/room.service";
import { UserService } from "./../user/user.service";
import { SendMessageType } from "./../shared/types";
import { Repository } from "typeorm";
import { Message } from "./message.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    private userService: UserService,
    private roomService: RoomService,
  ) {}

  async sendMessage(data: SendMessageType) {
    const { room_id, user, text } = data;

    const isInGroup = await this.checkIsUserInGroup(room_id, user.id);

    if (!isInGroup) {
      throw new BadRequestException("User isn't path of this room");
    }

    const message = new Message();

    message.author = user;
    message.date = new Date();
    message.room_id = room_id;
    message.text_message = text;

    return await this.messageRepo.save(message);
  }

  async checkIsUserInGroup(roomId: number, userId: number): Promise<boolean> {
    return await this.roomService
      .getParticipants(roomId)
      .then((res) => {
        if (res && res.length > 0) {
          const user = res.find((user) => user.id === userId);
          if (user) {
            return true;
          }

          return false;
        } else {
          throw new BadRequestException("User isn't path of this room");
        }
      })
      .catch((e) => {
        throw new BadRequestException(`Something went worng..: ${e.message}`);
      });
  }
}
