import { User } from "./../user/user.model";
export type CreateRoomType = {
  owner_id: number;
  room_name: string;
};

export type InviteRoomType = {
  room_owner: number;
  roomId: number;
  userId: number;
};

export type SendMessageType = {
  room_id: number;
  user: User;
  text: string;
};
