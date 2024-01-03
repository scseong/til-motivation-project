'use client';
import { useParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '@/api/users';
import Loader from '@/app/_components/Loader';
import Profile from './Profile';
import { useEffect, useState } from 'react';

export default function PageCompoent() {
  const params = useParams();
  const userRef = params.username;

  const {
    isLoading,
    error,
    data: userProfile
  } = useQuery({
    queryKey: ['userProfile', userRef],
    queryFn: () => getUserProfile(userRef as string)
  });
  if (isLoading) return <Loader />;
  if (!userProfile) {
    return <div>User profile not found.</div>;
  }
  return <Profile userProfile={userProfile} />;
}
