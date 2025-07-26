'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectAuthLoading,
} from '@/redux/features/auth/authSlice';

interface NotAllowedRolesMiddlewareProps {
  children: React.ReactNode;
  notAllowedRoles?: string[];
}

export default function NotAllowedRolesMiddleware({
  children,
  notAllowedRoles = [],
}: NotAllowedRolesMiddlewareProps) {
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectAuthLoading);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && user) {
      if (notAllowedRoles.includes(user.role)) {
        router.replace('/unauthorized');
      }
    }
  }, [loading, user, router, pathname, notAllowedRoles]);

  return <>{children}</>;
}
