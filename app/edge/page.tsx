'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingChunk, setLoadingChunk] = useState<boolean>(false)
  const generateText = async (e: any) => {
    e.preventDefault();
    setText("");

    setLoading(true);

    const response = await fetch("/api/edge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      setLoadingChunk(true)
      const { value, done: doneReading } = await reader.read();
      setLoadingChunk(false)
      done = doneReading;
      const chunkValue = decoder.decode(value);

      setText((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return <div className='w-full'>
    <div className='w-fit bg-green-500 px-2.5 py-2 rounded cursor-pointer' onClick={generateText}>Generate</div>
    {text ?
      <div className='mt-5 p-5 bg-neutral-800 text-white max-w-2xl'>
        <span>{text}</span>
        <span className={`${loadingChunk ? "" : "animate-cursor-blink"}`}>_</span>
      </div>
      : null}

  </div>
}
