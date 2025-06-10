import React, { useState } from 'react';
import { useField } from 'formik';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ImagePlus } from 'lucide-react';
import { ImageUploaderComponent } from '@/features/galeria/components/imageList/imageUploaderComponent';
import { useApiQuery } from '@/core/useAPI';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageVisualizer } from '@/features/galeria/components/imageList/imageVisualizer';

interface Response {
  data: Datum[];
  orderBy: string;
  page: number;
  perPage: number;
  search: string;
  searchBy: string;
  total: number;
  [property: string]: any;
}

interface Datum {
  id: string;
  name: null;
  url: string;
  [property: string]: any;
}

const ImageGalleryField = ({ name, label, ...props }: any) => {
  const [field, meta, helpers] = useField(name);
  const [openPop, setOpenPop] = useState(false);
  const [page, setPage] = useState(1);
  const { setValue } = helpers;

  const { data, isLoading, isError } = useApiQuery<Response>(
    ['/users/gallery', `page=${page}&perPage=20`],
    `/users/gallery?page=${page}&perPage=20`,
    {
      enabled: openPop,
    },
  );
  const totalPages = data ? Math.ceil(data.total / 20) : 0;

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const selectImage = (url: string) => {
    setValue(url);
    setOpenPop(false);
  };

  return (
    <Popover modal open={openPop} onOpenChange={setOpenPop}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-32 flex flex-col items-center justify-center gap-2"
        >
          {field.value ? (
            <img
              src={field.value}
              alt="Selected"
              className="w-full h-full object-contain rounded-md"
            />
          ) : (
            <>
              <ImagePlus className="h-8 w-8" />
              <span>Selecione uma imagem</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[578px] "
        align="start"
        side="right"
        sideOffset={-190}
        alignOffset={0}
      >
        <div className="flex items-center mb-4 justify-between">
          <p>Minha Galeria</p>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={page === 1 || isLoading}
            >
              <ChevronLeft />
            </Button>
            <span>{page}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={page === totalPages || isLoading}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,8rem)] grid-rows-[repeat(auto-fill,8rem)] gap-2 h-96 overflow-auto">
          <ImageUploaderComponent />
          {isLoading && <Skeleton className="w-full h-32" />}
          {!isLoading &&
            !isError &&
            data?.data.map((image: any) => (
              <ImageVisualizer
                key={image.id}
                url={image.url}
                id={image.id}
                onClick={() => selectImage(image.url)}
              />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ImageGalleryField;
