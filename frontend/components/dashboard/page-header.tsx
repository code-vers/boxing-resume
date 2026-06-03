import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

/**
 * @component PageHeader
 * @description A reusable header component for dashboard pages with a title and optional description.
 */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className='mb-8 space-y-1'>
      <h1 className='text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
        {title}
      </h1>
      {description && (
        <p className='text-sm mt-5 text-text-placeholder md:text-base'>
          {description}
        </p>
      )}
    </div>
  );
}
