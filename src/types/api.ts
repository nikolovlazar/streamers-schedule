type Pagination = {
  pagination: {
    cursor?: string;
  };
};

export type Streamer = {
  id: string;
  name: string;
  segments: Segment[];
  profile_image_url: string;
};

export type FollowRelationship = {
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
  followed_at: string;
};

export type FollowsResult = Pagination & {
  total: number;
  data: FollowRelationship[];
};

export type Segment = {
  id: string;
  start_time: string;
  end_time: string;
  title: string;
  canceled_until: any;
  category: {
    id: string;
    name: string;
  };
  is_recurring: boolean;
};

export type ScheduleResult = Pagination & {
  data: {
    segments: Segment[];
  };
};
