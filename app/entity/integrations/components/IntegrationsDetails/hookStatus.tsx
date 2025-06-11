export default function HookStatus({ status }: { status: boolean }) {
  return (
    <div
      className={`rounded-full ${status ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center  text-white px-2 py-1`}
    >
      {status ? (
        <span className="text-white">Ativo</span>
      ) : (
        <span className="text-white">Inativo</span>
      )}
    </div>
  );
}
