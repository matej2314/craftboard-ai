'use client';

import { usePathname } from 'next/navigation';

import { getProfession } from 'utils/getProfession';

export default function ToolsPage() {
  const pathname = usePathname();
  const profession = getProfession(pathname);

  return (
    <div className="flex flex-col justify-center gap-5 lg:gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="flex justify-center text-2xl text-brand-800">Tools</h1>
        </div>
      </div>
    </div>
  );
}
