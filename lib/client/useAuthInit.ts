'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { initUser } from '@/store/authSlice';
import { selectUser } from '@/store/selectors';

let authCheckInProgress = false;

export default function useAuthInit() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (user !== null || authCheckInProgress || hasInitializedRef.current) {
      return;
    }

    authCheckInProgress = true;
    hasInitializedRef.current = true;

    dispatch(initUser()).finally(() => {
      authCheckInProgress = false;
    });
  }, [dispatch, user]);
}
