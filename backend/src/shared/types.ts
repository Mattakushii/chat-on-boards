import { User } from "./../user/user.model";
export type CreateRoomType = {
  admin: User;
  room_name: string;
};

export type InviteRoomType = {
  roomId: number;
  userId: number;
};

export type SendMessageType = {
  room_id: number;
  user: User;
  text: string;
};
