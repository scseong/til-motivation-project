'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/users';
import Loader from '@/app/_components/Loader';
import Profile from './Profile';

export default function PageCompoent() {
  const params = useParams();
  const userRef = params.username as string;

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
  return <Profile userProfile={userProfile} userRef={userRef} />;
}
