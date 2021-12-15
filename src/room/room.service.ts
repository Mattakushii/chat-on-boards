import { Repository } from "typeorm";
import { GetRoomInput } from "./dto/room.inputs";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "./room.model";
import { User } from "src/user/user.model";
import { CreateRoomType, InviteRoomType } from "src/shared/types";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createChat({ owner_id, room_name }: CreateRoomType) {
    const user = await this.userRepo.findOne(owner_id);
    const room = {
      owner_id,
      room_name,
      participants: [user],
    };

    return await this.roomRepo.save(room);
  }

  async inviteToRoom({ room_owner, roomId, userId }: InviteRoomType) {
    const room = await this.getRoomById({ id: roomId });
    const user = await this.userRepo.findOne(userId);

    const participants = await this.getParticipants(roomId);

    if (room.room_id && room.owner_id === room_owner) {
      return await this.roomRepo.save({
        ...room,
        participants: [...(participants ?? []), user],
      });
    }

    throw new BadRequestException("something went wrong...");
  }

  async removeFromRoom({ owner_id, room_id, user_id }) {
    if (!owner_id) {
      throw new BadRequestException("something went wrong");
    }

    const room = await this.getRoomById({ id: room_id });

    if (room.owner_id !== owner_id) {
      throw new BadRequestException("u are not owner of this room");
    }

    const user = (await this.getParticipants(room_id)).find(
      (item) => item.id === user_id,
    );
    const participants = (await this.getParticipants(room_id)).filter(
      (user) => user.id !== user_id,
    );

    if (user) {
      return await this.roomRepo.save({
        ...room,
        participants: [...participants],
      });
    }

    throw new BadRequestException("User does not exist in your room");
  }

  async getParticipants(roomId: number) {
    const room = await this.roomRepo.findOne({
      relations: ["participants"],
      where: { room_id: roomId },
    });

    return room.participants ?? [];
  }

  async getRoomById({ id }: GetRoomInput) {
    const room = await this.roomRepo.findOne({ room_id: id });
    const participants = await this.getParticipants(id);

    return { ...room, participants };
  }
}
