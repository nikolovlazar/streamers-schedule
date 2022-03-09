export type FollowRelationship = {
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
  followed_at: string;
};

export type FollowsResult = {
  total: number;
  data: FollowRelationship[];
  pagination: {
    cursor?: string;
  };
};
