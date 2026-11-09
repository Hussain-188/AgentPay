"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { MessageBubble } from "./MessageBubble";
import { ToolCallCard } from "./ToolCallCard";
import { ApprovalCard } from "./ApprovalCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const transport = new DefaultChatTransport({
  api: "/api/chat",
});

export function ChatInterface() {
  const {
    messages,
    sendMessage,
    stop,
    status,
    addToolApprovalResponse,
  } = useChat({ transport });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const text = inputValue;
    setInputValue("");
    sendMessage({ text });
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <QuickActions onSelect={handleQuickAction} />
        <ChatInput
          input={inputValue}
          setInput={setInputValue}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ScrollArea className="flex-1 p-4">
        <div ref={scrollRef} className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.parts.map((part, i) => {
                if (part.type === "text" && part.text.trim()) {
                  return (
                    <MessageBubble
                      key={`${message.id}-text-${i}`}
                      role={message.role as "user" | "assistant"}
                      content={part.text}
                    />
                  );
                }

                if (
                  part.type.startsWith("tool-") &&
                  "toolCallId" in part &&
                  "toolName" in part
                ) {
                  const toolPart = part as unknown as {
                    type: string;
                    toolCallId: string;
                    toolName: string;
                    args?: Record<string, unknown>;
                    state?: string;
                    approval?: { state: string };
                  };

                  if (toolPart.approval?.state === "pending") {
                    return (
                      <ApprovalCard
                        key={`${message.id}-approval-${i}`}
                        toolName={toolPart.toolName}
                        args={toolPart.args ?? {}}
                        onApprove={() => {
                          addToolApprovalResponse({
                            id: toolPart.toolCallId,
                            approved: true,
                          });
                        }}
                        onReject={() => {
                          addToolApprovalResponse({
                            id: toolPart.toolCallId,
                            approved: false,
                            reason: "User rejected this action.",
                          });
                        }}
                      />
                    );
                  }

                  return (
                    <ToolCallCard
                      key={`${message.id}-tool-${i}`}
                      toolName={toolPart.toolName}
                      state={
                        (toolPart.state as
                          | "call"
                          | "result"
                          | "partial-call") ?? "call"
                      }
                      args={toolPart.args}
                    />
                  );
                }

                return null;
              })}
            </div>
          ))}

          {isLoading &&
            messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <span className="text-xs font-bold">AP</span>
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
        </div>
      </ScrollArea>
      <ChatInput
        input={inputValue}
        setInput={setInputValue}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
      />
    </div>
  );
}
