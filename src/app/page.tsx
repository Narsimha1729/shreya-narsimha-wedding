import { Suspense } from 'react';
import { HomeView } from '@/sections';

export default function Home() {
  return (
    <Suspense>
      <HomeView />
    </Suspense>
  );
}
