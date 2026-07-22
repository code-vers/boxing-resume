import React from 'react';
import ComparisonPage from '@/components/website/compare/ComparisonPage';

/**
 * @page ComparePage
 * @description Route entry point for the /compare page.
 * Renders the full fighter comparison UI inside a Suspense boundary
 * to support async data fetching gracefully.
 */
export default function ComparePage() {
  return (
    <React.Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center bg-page-bg'>
          <div className='flex flex-col items-center gap-3'>
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-[#e8e2d8] border-t-text-accent' />
            <p className='text-[13px] text-text-placeholder'>Loading comparison…</p>
          </div>
        </div>
      }
    >
      <ComparisonPage />
    </React.Suspense>
  );
}
