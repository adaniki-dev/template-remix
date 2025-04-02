import React, { useRef, useState, DragEvent, useEffect } from "react";
import { ImageUp, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useField, useForm } from "@/lib/forms/wrapper-form";
import { Button } from "@/components/ui/button";

interface FileWithPreview {
  file: File;
  preview: string;
}

interface InitialImage {
  url: string;
  name?: string;
}

interface InputDragDropImageProps {
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

const InputDragDropImage: React.FC<InputDragDropImageProps> = ({
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
  const [initialImages, setInitialImages] = useState<InitialImage[]>([]);
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

  // Efeito para lidar com os valores iniciais
  useEffect(() => {
    if (field.value && !files.length) {
      const initialValue = field.value;
      if (typeof initialValue === "string") {
        // Caso seja uma única URL
        setInitialImages([{ url: initialValue }]);
      } else if (Array.isArray(initialValue)) {
        // Caso seja um array de URLs ou objetos com url
        const images = initialValue.map((item) =>
          typeof item === "string" ? { url: item } : item,
        );
        setInitialImages(images);
      }
    }
  }, [field.value, files.length]);

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
      newFiles = imageFiles.slice(0, 1);
      setInitialImages([]); // Limpa imagens iniciais ao selecionar nova imagem
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

  const removeFile = (fileIndex: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Previne que o clique abra o seletor de arquivos
    const newFiles = files.filter((_, index) => index !== fileIndex);
    setFiles(newFiles);
    setFieldValue(
      name,
      multiple ? newFiles.map((f) => f.file) : newFiles[0]?.file || null,
    );
  };

  const removeInitialImage = (imageIndex: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Previne que o clique abra o seletor de arquivos
    const newImages = initialImages.filter((_, index) => index !== imageIndex);
    setInitialImages(newImages);
    setFieldValue(
      name,
      multiple ? newImages.map((img) => img.url) : newImages[0]?.url || null,
    );
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
        className={`border border-dashed ${dropZoneStyle} rounded-lg text-center overflow-auto min-h-[10rem] p-4 flex flex-col items-center justify-center cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        role="button"
        tabIndex={0}
        aria-label={`Clique ou arraste imagens para${multiple ? "" : " "} upload`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        {files.length === 0 && initialImages.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 text-primary p-4">
            <ImageUp size={48} />
            <span className="text-sm">
              {multiple
                ? "Arraste imagens aqui ou clique para selecionar"
                : "Arraste uma imagem aqui ou clique para selecionar"}
            </span>
            <span className="text-xs text-gray-500">
              {`Tamanho máximo: ${maxFileSize / 1024 / 1024}MB (PNG, JPEG, JPG)`}
            </span>
          </div>
        )}

        {initialImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {initialImages.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.url}
                  alt={img.name || `Imagem ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => removeInitialImage(index, e)}
                  aria-label={`Remover imagem ${index + 1}`}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => removeFile(index, e)}
                  aria-label={`Remover ${file.file.name}`}
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

export default InputDragDropImage;
