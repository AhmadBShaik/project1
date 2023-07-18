export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="flex-1 flex w-full mt-18">
        <div className="hidden xl:block w-2/12"></div>
        {children}
        <div className="hidden xl:block w-2/12"></div>
      </div>
    </section>
  );
}
