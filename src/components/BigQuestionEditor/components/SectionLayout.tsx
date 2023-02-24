type Props = {
  title: string;
  children: React.ReactNode;
};

export function SectionLayout({ title, children }: Props) {
  return (
    <div className="my-4 rounded bg-gray-50 px-4 pt-3 pb-2">
      <div className="mb-3 text-lg font-bold text-green-800">{title}</div>
      {children}
    </div>
  );
}
