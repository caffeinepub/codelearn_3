import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Loader2, Send, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage } from "../backend.d";
import { useGetChatHistory, useSendMessage } from "../hooks/useQueries";

function generateSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const WELCOME_MESSAGE: ChatMessage = {
  sender: "bot",
  message:
    "Olá! Sou o Chef Bot 🧑‍🍳 Pode me perguntar sobre combinações de ingredientes, sabores, dicas culinárias e muito mais!",
  timestamp: BigInt(Date.now()),
};

const SUGGESTIONS = [
  "Posso misturar abacaxi com carne?",
  "Quais temperos combinam com frango?",
  "Como deixar o bolo mais fofo?",
  "Chocolate amargo com sal é bom?",
];

interface LocalMessage {
  sender: string;
  message: string;
  timestamp: bigint;
}

export default function ConselhosTab() {
  const [sessionId] = useState(generateSessionId);
  const [inputValue, setInputValue] = useState("");
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([
    WELCOME_MESSAGE,
  ]);
  const [msgCount, setMsgCount] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: chatHistory } = useGetChatHistory(sessionId);
  const { mutate: sendMsg, isPending } = useSendMessage(sessionId);

  const allMessages = useMemo(() => {
    const fromBackend =
      chatHistory && chatHistory.length > 0 ? chatHistory : [];
    if (fromBackend.length > 0) return [WELCOME_MESSAGE, ...fromBackend];
    return localMessages;
  }, [chatHistory, localMessages]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when message count changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgCount]);

  const handleSend = () => {
    const msg = inputValue.trim();
    if (!msg || isPending) return;

    const userMsg: LocalMessage = {
      sender: "user",
      message: msg,
      timestamp: BigInt(Date.now()),
    };

    setLocalMessages((prev) => [...prev, userMsg]);
    setMsgCount((c) => c + 1);
    setInputValue("");

    sendMsg(
      { message: msg },
      {
        onSuccess: (botReply: string) => {
          const botMsg: LocalMessage = {
            sender: "bot",
            message: botReply,
            timestamp: BigInt(Date.now()),
          };
          setLocalMessages((prev) => [...prev, botMsg]);
          setMsgCount((c) => c + 1);
        },
        onError: () => {
          const errorMsg: LocalMessage = {
            sender: "bot",
            message:
              "Desculpe, tive um problema ao processar sua pergunta. Tente novamente!",
            timestamp: BigInt(Date.now()),
          };
          setLocalMessages((prev) => [...prev, errorMsg]);
          setMsgCount((c) => c + 1);
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: "calc(100vh - 220px)", minHeight: 400 }}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-1 space-y-4 pb-4"
      >
        {allMessages.map((msg, i) => {
          const isUser = msg.sender === "user";
          return (
            <motion.div
              key={`${msg.sender}-${Number(msg.timestamp)}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              data-ocid={`conselhos.chat.item.${i + 1}`}
              className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarFallback
                  className={
                    isUser
                      ? "bg-primary text-primary-foreground text-xs"
                      : "bg-accent text-accent-foreground text-xs"
                  }
                >
                  {isUser ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isUser
                    ? "chat-bubble-user rounded-br-sm"
                    : "chat-bubble-bot rounded-bl-sm"
                }`}
              >
                {!isUser && (
                  <p className="text-xs font-semibold text-accent-foreground mb-1 opacity-70">
                    Chef Bot
                  </p>
                )}
                {msg.message}
              </div>
            </motion.div>
          );
        })}

        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-2.5"
          >
            <Avatar className="w-7 h-7 flex-shrink-0">
              <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                <Bot className="w-3.5 h-3.5" />
              </AvatarFallback>
            </Avatar>
            <div className="chat-bubble-bot px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1.5 items-center">
                <span
                  className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {allMessages.length <= 1 && (
        <div className="py-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Sugestões de perguntas:
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border hover:bg-accent/20 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-3 border-t border-border">
        <Input
          placeholder="Pergunte sobre combinações, sabores, dicas..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          className="flex-1 bg-card border-border focus-visible:ring-primary/30"
          data-ocid="conselhos.message_input"
        />
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim() || isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 flex-shrink-0"
          data-ocid="conselhos.send_button"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
