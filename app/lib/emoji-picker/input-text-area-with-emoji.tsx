import React, { useState, useRef, useEffect } from "react";
import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import EmojiPicker from "./emoji-picker";

type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "value"
>;

interface TextAreaWithEmojiProps extends TextAreaProps {
  placeholder?: string;
  locale?: string;
  theme?: "light" | "dark";
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}
const TextAreaWithEmoji = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaWithEmojiProps
>(
  (
    {
      placeholder = "Digite sua mensagem...",
      locale = "pt",
      theme = "light",
      maxLength = 500,
      value: externalValue,
      onChange: externalOnChange,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [message, setMessage] = useState(externalValue || "");
    const [cursorPosition, setCursorPosition] = useState(0);
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;
    useEffect(() => {
      if (externalValue !== undefined) {
        setMessage(externalValue);
      }
    }, [externalValue]);

    const handleEmojiSelect = (emoji: any) => {
      if (!textareaRef.current) return;

      const start = message.substring(0, cursorPosition);
      const end = message.substring(cursorPosition);
      const newMessage = start + emoji.native + end;

      setMessage(newMessage);
      if (externalOnChange) {
        externalOnChange(newMessage);
      }

      const newCursorPosition = cursorPosition + emoji.native.length;
      setCursorPosition(newCursorPosition);

      setTimeout(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 10);
    };

    const handleTextareaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const newValue = e.target.value;
      setMessage(newValue);
      if (externalOnChange) {
        externalOnChange(newValue);
      }
      setCursorPosition(e.target.selectionStart);
    };

    const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
      setCursorPosition(e.currentTarget.selectionStart);
    };

    const handleTextareaKeyUp = (
      e: React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
      setCursorPosition(e.currentTarget.selectionStart);
    };

    return (
      <div className="relative w-full max-w-2xl">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onClick={handleTextareaClick}
            onKeyUp={handleTextareaKeyUp}
            placeholder={placeholder}
            className={`min-h-[100px] pr-12 ${className}`}
            maxLength={maxLength}
            {...props}
          />
          <div className="absolute bottom-2 right-2">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" className="h-8 w-8 p-0">
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="end" sideOffset={5}>
                <EmojiPicker
                  onEmojiSelect={handleEmojiSelect}
                  theme={theme}
                  navPosition="bottom"
                  categories={[
                    "people",
                    "nature",
                    "foods",
                    "activity",
                    "places",
                    "objects",
                    "symbols",
                    "flags",
                  ]}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-1 text-sm text-gray-500 text-right">
          {message.length}/{maxLength}
        </div>
      </div>
    );
  },
);

TextAreaWithEmoji.displayName = "TextAreaWithEmoji";

export default TextAreaWithEmoji;
