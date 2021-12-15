export type CreateRoomType = {
  owner_id: number;
  room_name: string;
};

export type InviteRoomType = {
  room_owner: number;
  roomId: number;
  userId: number;
};
