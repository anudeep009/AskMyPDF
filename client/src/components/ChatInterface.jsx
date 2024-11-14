import { useState } from 'react'

export default function ChatInterface() {
  const [message, setMessage] = useState('')

  return (
    <div className="flex min-h-[90vh] flex-col bg-[#171926] font-Poppins">
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          
          <div className="flex items-start gap-3 text-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-500">
              S
            </div>
            <div className="rounded-lg bg-[#293040] p-3 shadow-sm text-white">
              explain like im 5
            </div>
          </div>

         
          <div className="flex items-start gap-3 text-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5b63d3] text-[#5b63d3]">
              {/* logo of AI  */}
            </div>
            <div className="rounded-lg bg-[#293040] text-white p-3 shadow-sm">
              <p className="text-sm sm:text-base">
                Our own Large Language Model (LLM) is a type of AI that can learn from data. We have trained it on 7 billion parameters which makes it better than other LLMs. We are featured on aiplanet.com and work with leading enterprises to help them use AI securely and privately. We have a Generative AI Stack which helps reduce the hallucinations in LLMs and allows enterprises to use AI in their applications.
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="border-gray-200 bg-[#171926] p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2">
            <input
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#5b63d3]focus:outline-none focus:ring-1 focus:ring-[#5b63d3]"
              placeholder="Send a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="rounded-md bg-[#5b63d3] p-2 text-white hover:bg-[#5b63d3] focus:outline-none focus:ring-2 focus:ring-[#5b63d3] focus:ring-offset-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}