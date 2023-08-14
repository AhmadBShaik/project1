'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const promptData = z.object({
  prompt: z.string().min(5),
});

type PromptData = z.infer<typeof promptData>;

export default function Page() {
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingChunk, setLoadingChunk] = useState<boolean>(false)
  const generateText = async (prompt: string) => {
    setText("");

    setLoading(true);

    const response = await fetch("/api/edge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
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
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PromptData>({
    resolver: zodResolver(promptData),
  });
  const submitData = async (promptData: PromptData) => {
    setText("");
    reset()
    await generateText(promptData.prompt)
  }
  return <div className='w-full max-w-2xl p-2.5 xl:p-0'>
    <div> {errors.prompt ? (
      <span className="text-sm text-red-500">
        {errors.prompt.message}
      </span>
    ) : null}</div>
    <form className='flex w-full flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center mt-2.5'
      onSubmit={loading ? undefined : handleSubmit(submitData)}
    >

      <input
        className='w-full flex-1 bg-neutral-800 p-2 rounded outline-0'
        placeholder={'Ask me anything!'}
        {...register("prompt")}
      />

      <div className='w-full sm:w-fit'>
        <button className={`${loading ? "bg-opacity-50 cursor-not-allowed" : ""} bg-green-500 px-2.5 py-2 rounded cursor-pointer w-full`}>Generate</button>
      </div>
    </form>
    {text ?
      <div className={`mt-5 p-5 bg-neutral-800 text-white max-w-2xl`}>
        <span>{text}</span>
        <span className={`${loadingChunk ? "" : "animate-cursor-blink"}`}>_</span>
      </div>
      : null}

  </div>
}