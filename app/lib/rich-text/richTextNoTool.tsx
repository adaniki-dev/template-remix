import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { Underline } from "@tiptap/extension-underline";
import HardBreak from "@tiptap/extension-hard-break";
import { Skeleton } from "@/components/ui/skeleton";

const InputRichTextNoTool = function RichTextComponent({ ...props }: any) {
  const extensions = [StarterKit, Underline];
  const [editorValue, setEditorValue] = useState(
    props.formValues.content || "",
  );
  const editor = useEditor({
    extensions: extensions,
    immediatelyRender: false,
    HardBreak,
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] max-h-80 overflow-auto w-full rounded-md border border-primary bg-white px-3 py-2 ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },

    ...props.formValues,
  });
  useEffect(() => {
    if (editorValue !== props.initialValues[props.name]) {
      editor?.commands.setContent(props.formValues.content);
      setEditorValue(props.formValues.content);
    }
  }, [props.formValues.content]);

  if (!editor) {
    return <Skeleton className="h-40 w-full" />;
  }

  return (
    <div id={props.name}>
      <style>
        {`
          strong {
            color: #1187f4;
          }
        `}
      </style>
      <EditorContent editor={editor} />
    </div>
  );
};

export default InputRichTextNoTool;
