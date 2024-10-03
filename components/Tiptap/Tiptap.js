"use client";
import "./Tiptap.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import History from "@tiptap/extension-history";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List,
  Link as LinkIcon,
  Code,
  TextQuote,
  Heading as HeadingIcon,
  Undo,
  Redo,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const lowlight = createLowlight(all);

export default function Tiptap({ desc, onChange }) {
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Write your achievements here …",
      }),
      Document,
      Paragraph,
      Text,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      BulletList,
      ListItem,
      Blockquote,
      Heading.configure({
        levels: [2],
      }),
      Bold,
      Italic,
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["ftp", "mailto", "http", "https"],
      }),
      History,
    ],
    content: desc,
    editorProps: {
      attributes: {
        class: `w-full rounded-md text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          onChange
            ? "p-4 pb-2 my-4 min-h-32 border border-input bg-background"
            : "-mb-5"
        }`,
      },
    },
    editable: onChange ? true : false,
    onUpdate({ editor }) {
      if (onChange) onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="pt-3">
      {onChange && <Toolbar editor={editor} />}
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
}

function Toolbar({ editor }) {
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null || url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    let normalizedUrl = url.trim();

    // Regex to match supported protocols with their `:`
    const protocolRegex =
      /^(https?|mailto|ftp|tel|sms|data|file|geo|news|irc|telnet|ssh|javascript|magnet):/i;

    // If URL does not start with a recognized protocol, add "https://"
    if (!protocolRegex.test(normalizedUrl))
      normalizedUrl = `https://${normalizedUrl}`;

    // Validate URL and ensure it doesn't start with the current window's URL
    try {
      new URL(normalizedUrl);
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: normalizedUrl })
        .run();
    } catch (error) {
      window.alert("Invalid URL:", normalizedUrl);
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
  };

  return (
    <div className="control-group">
      <div className="button-group flex flex-wrap items-center gap-1">
        {/* heading */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                type="button"
                pressed={editor.isActive("heading", { level: 2 })}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                aria-label="toggle heading"
              >
                <HeadingIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* bold */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                type="button"
                pressed={editor.isActive("bold")}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBold().run();
                }}
                aria-label="toggle bold"
              >
                <BoldIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* italic */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                type="button"
                pressed={editor.isActive("italic")}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleItalic().run();
                }}
                aria-label="toggle italic"
              >
                <ItalicIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* link */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                type="button"
                pressed={editor.isActive("link")}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setLink();
                }}
                aria-label="toggle link"
              >
                <LinkIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* code */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                type="button"
                pressed={editor.isActive("codeBlock")}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleCodeBlock().run();
                }}
                aria-label="toggle code"
              >
                <Code />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* unordered list */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                type="button"
                pressed={editor.isActive("bulletList")}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBulletList().run();
                }}
                aria-label="toggle list"
              >
                <List />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bullet List</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* blockquote */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Toggle
                type="button"
                pressed={editor.isActive("blockquote")}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBlockquote().run();
                }}
                aria-label="toggle blockquote"
              >
                <TextQuote />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Blockquote</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* undo */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                type="button"
                disabled={!editor.can().undo()}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().undo().run();
                }}
                aria-label="undo"
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* redo */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                type="button"
                disabled={!editor.can().redo()}
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  editor.chain().focus().redo().run();
                }}
                aria-label="redo"
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
