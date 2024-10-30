"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface DragAndDropProps {
  onFilesChange: (files: File[]) => void;
}

export default function DragAndDrop({ onFilesChange }: DragAndDropProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFilesChange([...files, ...newFiles]);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onFilesChange([...files, ...newFiles]);
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: string, idx: number) {
    const newFiles = files.filter((_, index) => index !== idx);
    setFiles(newFiles);
    onFilesChange(newFiles);
  }

  function openFileExplorer() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form
        className={`${
          dragActive ? "bg-blue-400" : "bg-blue-100"
        } p-4 w-full rounded-lg min-h-[10rem] text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        <p>
          Arraste e solte arquivos ou{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Selecione arquivos</u>
          </span>{" "}
          para enviar
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {files.map((file, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {file.type.startsWith("image/") ? (
                <Image
                  alt={`Preview of ${file.name}`}
                  className="aspect-square rounded-md object-cover"
                  height={64}
                  width={64}
                  src={URL.createObjectURL(file)}
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-xs text-gray-500">
                    {file.name.split(".").pop()}
                  </span>
                </div>
              )}
              <span className="text-sm mt-1 truncate w-16">{file.name}</span>
              <span
                className="text-red-500 cursor-pointer text-xs"
                onClick={() => removeFile(file.name, idx)}
              >
                remover
              </span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
