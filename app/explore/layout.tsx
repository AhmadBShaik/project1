export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="flex-1 flex w-full">
        <div className="hidden xl:block w-2/12"></div>
        <div className="flex-1 w-full p-5 xl:px-0 flex flex-col">
          {children}
        </div>
        <div className="hidden xl:block w-2/12"></div>
      </div>
    </section>
  );
}
