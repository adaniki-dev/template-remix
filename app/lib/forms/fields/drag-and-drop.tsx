import React, { useRef, useState, DragEvent, useEffect } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FileWithPreview {
  file: File;
  preview: string;
}

interface InputDragDropProps {
  id?: string;
  name: string;
  label?: string;
  multiple?: boolean;
  maxFileSize?: number;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
}

const InputDragDrop: React.FC<InputDragDropProps> = ({
  id,
  name,
  label,
  multiple = true,
  maxFileSize = 2 * 1024 * 1024, // 2MB default
  required = false,
  containerClassName = "",
  labelClassName = "",
  errorClassName = "",
  helpText,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useForm();

  const [draggedOver, setDraggedOver] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
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

  // Processa os arquivos selecionados
  const handleFiles = (selectedFiles: FileList) => {
    const imageFiles = Array.from(selectedFiles)
      .filter((file) => {
        if (
          file.type !== "image/png" &&
          file.type !== "image/jpeg" &&
          file.type !== "image/jpg"
        ) {
          toast.error(
            `Arquivo inválido: ${file.name}. Apenas PNG, JPEG e JPG são permitidos.`,
            {
              duration: 5000,
            },
          );
          return false;
        }
        if (file.size > maxFileSize) {
          toast.error(
            `Arquivo muito grande: ${file.name}. O tamanho máximo é ${maxFileSize / 1024 / 1024}MB.`,
            {
              duration: 5000,
            },
          );
          return false;
        }
        return true;
      })
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    let newFiles: FileWithPreview[];
    if (multiple) {
      newFiles = [...files, ...imageFiles];
    } else {
      newFiles = imageFiles.slice(0, 1); // Pega apenas o primeiro arquivo se não for múltiplo
    }

    setFiles(newFiles);
    setFieldValue(
      name,
      multiple ? newFiles.map((f) => f.file) : newFiles[0]?.file || null,
    );
    setFieldTouched(name, true);
  };

  // Cleanup de URLs de preview quando o componente é desmontado
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

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

  const removeFile = (fileIndex: number) => {
    const newFiles = files.filter((_, index) => index !== fileIndex);
    setFiles(newFiles);
    setFieldValue(
      name,
      multiple ? newFiles.map((f) => f.file) : newFiles[0]?.file || null,
    );
    setFieldTouched(name, true);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

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
        multiple={multiple}
        accept="image/png, image/jpeg, image/jpg"
        aria-invalid={hasError ? "true" : "false"}
        aria-required={required ? "true" : "false"}
        aria-describedby={ariaDescribedBy}
      />

      <div
        className={`border border-dashed ${dropZoneStyle} rounded-lg text-center p-4 h-40 overflow-auto flex flex-col`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="Área de upload de arquivos"
      >
        <div className="flex flex-col gap-2 items-center mb-2">
          <p className="text-primary text-sm font-medium">
            {multiple
              ? "Arraste e solte imagens aqui ou"
              : "Arraste e solte uma imagem aqui ou"}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="text-primary underline p-0 h-auto font-medium hover:bg-transparent"
            onClick={openFileDialog}
          >
            clique para selecionar
          </Button>
          <p className="text-xs text-gray-500 mt-1">
            {`Tamanho máximo: ${maxFileSize / 1024 / 1024}MB (PNG, JPEG, JPG)`}
          </p>
        </div>

        {files.length > 0 && (
          <div className="flex flex-col gap-2 mt-auto overflow-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md flex items-center justify-between bg-gray-50 p-2"
              >
                <p
                  className="text-sm overflow-hidden truncate max-w-[80%]"
                  title={file.file.name}
                >
                  {file.file.name}
                </p>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-7 px-2"
                  aria-label={`Remover arquivo ${file.file.name}`}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
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

export default InputDragDrop;
