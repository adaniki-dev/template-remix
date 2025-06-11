import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export function LoadingTable() {
  return (
    <div className="w-full ">
      <div className="flex flex-col justify-center items-center gap-6 h-96">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl h-10 w-10 text-primary" />
        <p>Carregando Relatorios...</p>
      </div>
    </div>
  );
}
