type Props = {
  title: string;
  children: React.ReactNode;
};

export function PartLayout({ title, children }: Props) {
  return (
    <div className="my-4 ml-2 flex items-center gap-6 rounded bg-gray-50">
      <div className="mb-4 font-bold text-green-800">{title}</div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
