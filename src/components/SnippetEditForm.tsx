"use client";
import type { Snippet } from "@prisma/client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}
const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);
  const handleOnChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div className="mt-4">
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleOnChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default SnippetEditForm;
