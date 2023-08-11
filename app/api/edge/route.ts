export const config = {
  runtime: "edge",
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const data =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima obcaecati eius deleniti ex doloribus nihil enim hic, accusantium voluptatem. Asperiores eligendi ex quisquam voluptatibus fuga ut impedit est exercitationem ipsum.";
export async function POST() {
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < data.length; i++) {
        controller.enqueue(encoder.encode(data[i]));
        await delay(Math.floor(Math.random() * 5 + 1) * 100);
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
