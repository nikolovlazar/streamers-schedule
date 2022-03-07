import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { useAuth } from '~providers/auth';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    setUser(session?.user ?? null);
  }, [session]);

  return user;
};
