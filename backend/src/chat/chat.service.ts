import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "./chat.model";
import { User } from "src/user/user.model";
import { CreateRoomType, InviteRoomType } from "src/shared/types";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createChat({ admin, room_name }: CreateRoomType) {
    const chat = new Chat();
    chat.name = room_name;
    chat.admin = admin;
    chat.users = [admin];
    chat.messages = null;

    return this.chatRepo.save(chat);
  }

  async getChats(userId: number) {
    const data = await this.chatRepo
      .createQueryBuilder("chats")
      .leftJoinAndSelect("chats.lastMessage", "messages")
      .leftJoinAndSelect("chats.users", "users")
      .leftJoinAndSelect("chats.admin", "admin")
      .where("users.id = :userId ", {
        userId,
      })
      .getMany();

    return data;
  }

  /**
   * Добавляет пользователя в чат
   * @param {number} room_owner - id администратора комнаты.
   * @param {number} roomId - id комнаты
   * @param {number} userId - id приглашаемого пользователя
   */
  async inviteToRoom({ roomId, userId }: InviteRoomType) {
    const chat = await this.chatRepo.findOne({
      relations: ["users"],
      where: {
        id: roomId,
      },
    });

    const user = await this.userRepo.findOne(userId);

    return this.chatRepo.save({ ...chat, users: [...chat.users, user] });
  }

  async getChat(chatId: number) {
    const data = await this.chatRepo
      .createQueryBuilder("chats")
      .leftJoinAndSelect("chats.users", "users")
      .leftJoinAndSelect("chats.admin", "admin")
      .leftJoinAndSelect(
        (subQuery) => subQuery.select().where("id = :id", { chatId }),
        "sms",
        "sms.id",
      )
      .where("chats.id = :chatId", {
        chatId,
      })
      .getOne();

    console.log(data);

    return data;
  }

  // async removeFromRoom({ owner_id, room_id, user_id }) {
  //   if (!owner_id) {
  //     throw new BadRequestException("something went wrong");
  //   }

  //   const room = await this.getRoomById({ id: room_id });

  //   if (room.admin !== owner_id) {
  //     throw new BadRequestException("u are not owner of this room");
  //   }

  //   const user = (await this.getParticipants(room_id)).find(
  //     (item) => item.id === user_id,
  //   );
  //   const participants = (await this.getParticipants(room_id)).filter(
  //     (user) => user.id !== user_id,
  //   );

  //   if (user) {
  //     return await this.chatRepo.save({
  //       ...room,
  //       participants: [...participants],
  //     });
  //   }

  //   throw new BadRequestException("User does not exist in your room");
  // }

  // async getParticipants(roomId: number) {
  //   const room = await this.chatRepo.findOne({
  //     relations: ["participants"],
  //     where: { room_id: roomId },
  //   });

  //   return room.participants ?? [];
  // }

  // async getRoomById({ id }: GetRoomInput) {
  //   const room = await this.chatRepo.findOne({ id: id });
  //   const participants = await this.getParticipants(id);

  //   return { ...room, participants };
  // }
}
