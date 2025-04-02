import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { Underline } from "@tiptap/extension-underline";
import { Skeleton } from "../../components/ui/skeleton";
import Toolbar from "@/lib/rich-text/toolBar";

const InputRichText = function RichTextComponent({ ...props }: any) {
  const extensions = [StarterKit, Underline];
  const [editorValue, setEditorValue] = useState(
    props.formValues.content || "",
  );
  const editor = useEditor({
    extensions: extensions,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] max-h-[500px] overflow-auto w-full rounded-md border border-primary bg-white px-3 py-2 ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
      <Toolbar editor={editor} />
      <style>
        {`
          .rich-text-editor h1 {
            font-size: 2.125rem;
          }
          .rich-text-editor h2 {
            font-size:1.875rem;
          }
          .rich-text-editor h3 {
            font-size:1.5rem;
          }
          .rich-text-editor h4 {
            font-size:1.25rem;
          }
          .rich-text-editor p {
            font-size: 14px;
          }
          .rich-text-editor ul {
            margin-left:10px;
            list-style-type: circle;
          }
          .rich-text-editor ol {
            margin-left:10px;
            list-style-type: number;
          }
          .rich-text-editor blockquote {
            margin-left:5px;
            border-left: 3px solid gray;
            padding-left:0.5rem;
          }
        `}
      </style>
      <EditorContent editor={editor} className="rich-text-editor" />
    </div>
  );
};

export default InputRichText;
