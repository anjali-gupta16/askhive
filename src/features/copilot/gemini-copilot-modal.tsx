"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Sparkles,
  Send,
  Bot,
  Copy,
  Check,
  Key,
  PlusCircle,
  Code2,
  CornerDownLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  source?: string;
}

interface GeminiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDraftQuestion?: (draft: { title: string; body: string; tags: string[] }) => void;
}

const QUICK_PROMPTS = [
  "Explain optimistic UI updates with TanStack Query",
  "How to do zero-copy WebAssembly memory in Rust?",
  "Best security setup for NextAuth v5 middleware",
  "How to optimize Postgres indexing for time-series queries?",
];

export function GeminiCopilotModal({
  isOpen,
  onClose,
  onDraftQuestion,
}: GeminiCopilotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content:
        "👋 **Hello! I'm Gemini Copilot**, your personal developer assistant inside AskHive.\n\nType anything below — ask about code bugs, architecture patterns, API design, performance optimization, or anything tech-related. I'm here to help! 🚀",
      timestamp: "Just now",
      source: "gemini-api",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => inputRef.current?.focus(), 50);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          history: messages.slice(-8).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          customApiKey: customKey || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch AI response");

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      const errorMessage: Message = {
        id: `bot-err-${Date.now()}`,
        role: "assistant",
        content: `⚠️ **Connection issue**: ${err instanceof Error ? err.message : "Please check your network and try again."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDraftFromAnswer = (content: string) => {
    const lines = content.split("\n");
    const headingLine = lines.find((l) => l.startsWith("#"));
    const title = headingLine
      ? headingLine.replace(/^[#\s]+/, "")
      : "How to implement this architecture pattern?";

    onDraftQuestion?.({ title, body: content, tags: ["gemini", "architecture"] });
    onClose();
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        role: "assistant",
        content: "Chat cleared! Ask me anything — I'm ready to help. 🚀",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl rounded-3xl bg-surface-container-low border border-primary/30 shadow-2xl overflow-hidden flex flex-col h-[88vh] max-h-[780px]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-container-high bg-gradient-to-r from-primary/10 via-surface-container to-surface-container-high flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center shadow-sm ring-1 ring-primary/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-on-surface">Gemini Copilot</h3>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-secondary/15 text-secondary border border-secondary/30 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
                  Live
                </span>
              </div>
              <p className="text-[10px] text-outline font-mono">
                AskHive AI • Type below to start chatting ↓
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={clearChat}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-mono text-outline hover:text-on-surface hover:bg-surface-container border border-transparent hover:border-surface-container-highest transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 ${
                showKeyInput || customKey
                  ? "bg-primary/20 text-primary border-primary/40"
                  : "bg-surface-container text-outline hover:text-on-surface border-surface-container-highest"
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-mono">
                {customKey ? "Key ✓" : "API Key"}
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── API Key Tray ── */}
        {showKeyInput && (
          <div className="px-5 py-2 bg-surface-container border-b border-surface-container-high flex items-center gap-2 flex-shrink-0">
            <Key className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <input
              type="password"
              placeholder="Paste your Gemini API key (optional — works without one too)"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary font-mono"
            />
            <span className="text-[10px] text-outline font-mono whitespace-nowrap">Session only</span>
          </div>
        )}

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">

          {messages.map((msg) => {
            const isBot = msg.role === "assistant";
            return (
              <div key={msg.id} className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"} items-start`}>

                {/* Bot avatar */}
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-primary/20">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] flex flex-col ${isBot ? "items-start" : "items-end"}`}>
                  {/* Bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isBot
                        ? "bg-surface-container border border-surface-container-highest text-on-surface rounded-tl-sm"
                        : "bg-primary text-surface font-medium rounded-tr-sm shadow-md"
                    }`}
                  >
                    {isBot ? (
                      <div className="space-y-1">{renderFormattedMarkdown(msg.content)}</div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>

                  {/* Footer row */}
                  <div className={`flex items-center gap-3 mt-1 px-1 text-[10px] text-outline font-mono ${isBot ? "justify-start" : "justify-end"}`}>
                    <span>{msg.timestamp}</span>
                    {isBot && msg.id !== "msg-welcome" && (
                      <>
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="flex items-center gap-1 hover:text-on-surface transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <><Check className="w-3 h-3 text-secondary" /><span className="text-secondary">Copied</span></>
                          ) : (
                            <><Copy className="w-3 h-3" /><span>Copy</span></>
                          )}
                        </button>
                        {onDraftQuestion && (
                          <button
                            onClick={() => handleDraftFromAnswer(msg.content)}
                            className="flex items-center gap-1 text-primary font-semibold hover:underline cursor-pointer"
                          >
                            <PlusCircle className="w-3 h-3" />
                            <span>Post to Community</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* User avatar */}
                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-primary text-surface flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[9px] font-mono tracking-tight">
                    YOU
                  </div>
                )}
              </div>
            );
          })}

          {/* Animated typing dots */}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 ring-1 ring-primary/20">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-surface-container border border-surface-container-highest rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
                <span className="ml-2 text-xs text-outline font-mono">Gemini is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Quick Prompts ── */}
        {messages.length <= 2 && !isLoading && (
          <div className="px-4 py-2.5 border-t border-surface-container-high bg-surface-container-low/50 flex-shrink-0">
            <p className="text-[10px] font-mono uppercase text-outline mb-2 font-semibold tracking-wider">
              💡 Try asking:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-primary/15 hover:text-primary hover:border-primary/30 border border-surface-container-highest text-[11px] text-on-surface-variant transition-all text-left cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Input Area ── */}
        <div className="p-3 sm:p-4 border-t-2 border-primary/20 bg-surface-container-low flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message and press Enter or click Send..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-2xl bg-surface-container border-2 border-surface-container-highest text-sm text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 transition-all duration-200"
              />
              {input.trim() && !isLoading && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-outline font-mono opacity-60 pointer-events-none">
                  <CornerDownLeft className="w-3 h-3" />
                </div>
              )}
            </div>

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold shadow-md transition-all duration-150 ${
                input.trim() && !isLoading
                  ? "bg-gradient-to-br from-primary to-primary-container text-surface hover:brightness-110 hover:scale-105 cursor-pointer"
                  : "bg-surface-container text-outline cursor-not-allowed opacity-50"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-2 text-center text-[10px] text-outline/50 font-mono">
            Press{" "}
            <kbd className="px-1 py-0.5 rounded bg-surface-container border border-surface-container-highest text-[9px]">
              Enter
            </kbd>{" "}
            to send • Click outside modal to close • Powered by Gemini 1.5 Flash
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Floating Copilot Button ──
export function FloatingCopilotButton({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      title="Open Gemini Copilot"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-surface shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group cursor-pointer ring-2 ring-primary/30"
    >
      <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      <span className="absolute inset-0 rounded-2xl ring-4 ring-primary/20 animate-ping opacity-40" />
    </button>
  );
}

// ── Markdown renderer ──
function renderFormattedMarkdown(text: string) {
  // Split on fenced code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    // Fenced code block
    if (part.startsWith("```") && part.endsWith("```")) {
      const firstLineEnd = part.indexOf("\n");
      const lang = part.slice(3, firstLineEnd).trim() || "code";
      const code = part.slice(firstLineEnd + 1, -3);

      return (
        <div key={index} className="my-2.5 rounded-xl overflow-hidden border border-surface-container-highest bg-[#0d0f17] text-[#e0e2ed]">
          <div className="px-3 py-1.5 bg-[#12141f] border-b border-surface-container-highest flex items-center justify-between text-[10px] font-mono text-outline">
            <span className="text-secondary font-semibold">{lang}</span>
            <Code2 className="w-3 h-3" />
          </div>
          <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    // Render line-by-line for headings and regular text
    const lines = part.split("\n");
    return (
      <span key={index} className="block">
        {lines.map((line, li) => {
          if (line.startsWith("### ")) {
            return (
              <span key={li} className="block text-[15px] font-bold text-on-surface mt-3 mb-1">
                {renderInline(line.slice(4))}
              </span>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <span key={li} className="block text-base font-bold text-primary mt-3 mb-1 border-b border-surface-container-highest pb-1">
                {renderInline(line.slice(3))}
              </span>
            );
          }
          if (line.startsWith("# ")) {
            return (
              <span key={li} className="block text-lg font-extrabold text-primary mt-3 mb-1">
                {renderInline(line.slice(2))}
              </span>
            );
          }
          if (line.trim() === "") {
            return <span key={li} className="block h-1.5" />;
          }
          return (
            <span key={li} className="block leading-relaxed">
              {renderInline(line)}
            </span>
          );
        })}
      </span>
    );
  });
}

// Renders **bold** and `inline code` within a single line
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-on-surface">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1 py-0.5 rounded bg-surface-container-highest text-secondary text-[11px] font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

