'use client';
import { useEffect, useRef, useState } from 'react';

import { useChat } from 'ai/react';

export default function Page() {
  const [query, setQuery] = useState('');
  const outputRef = useRef<null | HTMLDivElement>(null);

  const scrollToAnswer = () => {
    if (outputRef.current !== null) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        query
      },
      onResponse() {
        scrollToAnswer();
      },
    });

  useEffect(() => {
    setQuery(input);
  }, [input])

  const onSubmit = (e: any) => {
    handleSubmit(e);
  };

  const lastMessage = messages[messages.length - 1];
  const answer = lastMessage?.role === "assistant" ? lastMessage.content : null;
  return (
    <div className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <main className="flex flex-1 w-full flex-col items-center text-center px-4">
        <form className="w-full space-x-2 max-w-3xl flex items-center" onSubmit={onSubmit}>
          <input
            value={input}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 outline-0 rounded bg-neutral-600 text-neutral-100"
            placeholder={
              'Ask me anything!'
            }
          />
          <div>
            <button
              disabled={isLoading}
              className={` font-bold ${isLoading ? "bg-green-300" : "bg-green-500"
                } text-neutral-100 py-2 px-2.5 rounded cursor-pointer`}
              type="submit"
            >
              Search
            </button>
          </div>

        </form>

        <output className={`mt-10 w-full p-5 max-w-3xl flex rounded text-green-500 ${answer ? "bg-neutral-700" : ""}`}>
          {answer ? (
            <>
              <div ref={outputRef} className={`w-full rounded py-2.5  ${answer ? "text-left" : ""}`}>
                <p>
                  <span>
                    {answer}
                  </span>
                  <span className='animate-cursor-blink'>_</span>
                </p>
              </div>
            </>
          ) : <div className='w-full'>
            <div>Start your search</div>
            <div>Let's Go!</div>
          </div>}
        </output>
      </main>

    </div>
  );
}
