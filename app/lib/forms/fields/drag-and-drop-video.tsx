import React, { useRef, useState, DragEvent, useEffect } from "react";
import { FaVideo, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";
import { Button } from "@/components/ui/button";

interface FileWithPreview {
  file: File;
  preview: string;
}

interface InputDragDropVideoProps {
  id?: string;
  name: string;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  maxFileSize?: number;
}

const InputDragDropVideo: React.FC<InputDragDropVideoProps> = ({
  id,
  name,
  label,
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
  maxFileSize = 15 * 1024 * 1024, // 15MB default
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useForm();

  const [draggedOver, setDraggedOver] = useState(false);
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputId = id || `${name}-upload`;
  const errorId = `${inputId}-error`;
  const helpTextId = helpText ? `${inputId}-helpText` : undefined;

  const hasError = meta.touched && meta.error;
  const errorStyle = hasError ? "" : "opacity-0";
  const dropZoneStyle = hasError
    ? "border-red-500"
    : draggedOver
      ? "border-secondary border-4"
      : "border-gray-400 border-2";

  const ariaDescribedBy =
    [helpTextId, hasError ? errorId : undefined].filter(Boolean).join(" ") ||
    undefined;

  // Efeito para lidar com o valor inicial
  useEffect(() => {
    if (field.value && typeof field.value === "string" && !file) {
      setVideoUrl(field.value);
    }
  }, [field.value, file]);

  const handleFiles = (selectedFiles: FileList) => {
    if (!selectedFiles.length) {
      return;
    }

    const videoFile = selectedFiles[0];

    // Verificar se é um arquivo de vídeo
    if (!videoFile.type.includes("video/")) {
      toast.error("Por favor, selecione um arquivo de vídeo válido.", {
        duration: 5000,
      });
      return;
    }

    if (videoFile.size > maxFileSize) {
      toast.error(
        `Arquivo muito grande: ${videoFile.name}. O tamanho máximo é ${maxFileSize / 1024 / 1024}MB.`,
        {
          duration: 5000,
        },
      );
      return;
    }

    const newFile = {
      file: videoFile,
      preview: URL.createObjectURL(videoFile),
    };

    setFile(newFile);
    setVideoUrl(null); // Limpa a URL quando um novo arquivo é carregado
    setFieldValue(name, videoFile);
    setFieldTouched(name, true);
  };

  // Cleanup de URLs de preview quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previne que o clique abra o seletor de arquivos

    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setVideoUrl(null);
    setFieldValue(name, null);
    setFieldTouched(name, true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Determina a fonte do vídeo atual
  const currentVideoSrc = file ? file.preview : videoUrl;

  return (
    <div className={`grid gap-1 ${containerClassName}`}>
      {label && (
        <div className="flex items-center justify-between">
          <Label className={`text-sm ${labelClassName}`} htmlFor={inputId}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>

          <div
            id={errorId}
            className={`error text-xs text-end h-3 text-red-500 ${errorStyle} ${errorClassName}`}
            aria-live="polite"
          >
            {meta.error}
          </div>
        </div>
      )}

      <input
        type="file"
        id={inputId}
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
        accept="video/*"
        aria-invalid={hasError ? "true" : "false"}
        aria-required={required ? "true" : "false"}
        aria-describedby={ariaDescribedBy}
      />

      <div
        className={`border border-dashed ${dropZoneStyle} rounded-lg text-center min-h-[12rem] p-4 flex flex-col items-center justify-center cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        role="button"
        tabIndex={0}
        aria-label="Clique ou arraste um arquivo de vídeo para upload"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        {!currentVideoSrc && (
          <div className="flex flex-col items-center justify-center gap-2 text-primary p-4">
            <FaVideo className="text-4xl" />
            <span className="text-sm">
              Arraste o vídeo aqui ou clique para selecionar
            </span>
            <span className="text-xs text-gray-500">
              {`Tamanho máximo: ${maxFileSize / 1024 / 1024}MB`}
            </span>
          </div>
        )}

        {currentVideoSrc && (
          <div
            className="flex flex-col items-center gap-3 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-lg flex flex-col gap-2 items-center">
              <video
                src={currentVideoSrc}
                controls
                className="max-w-xs w-full object-contain rounded-lg shadow-md"
                controlsList="nodownload"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="mt-2"
                onClick={removeFile}
                aria-label="Remover arquivo de vídeo"
              >
                <FaTrash className="mr-2" size={14} />
                Remover vídeo
              </Button>
            </div>
          </div>
        )}
      </div>

      {helpText && (
        <div id={helpTextId} className="text-xs text-gray-500 mt-1">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputDragDropVideo;
