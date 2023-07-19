import AgentsList from "@/components/agents-list";

export const metadata = {
  title: "Project 1",
  description: "Generated by create next app",
};

export default async function Home() {
  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="flex-1 flex w-full">
        <div className="hidden xl:block w-2/12"></div>
        <div className="flex-1 w-full p-5 xl:px-0 flex flex-col">
          <AgentsList />
        </div>
        <div className="hidden xl:block w-2/12"></div>
      </div>
    </section>
  );
}
