import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  href: string;
};

export const SectionCard: React.FC<Props> = ({ title, href }) => {
  return (
    <Link className="rounded bg-green-50 px-4 py-2" href={href}>
      {title}
    </Link>
  );
};
