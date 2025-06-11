export default function ShowHooksVariables({ variables }: { variables: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-lg">Variáveis</p>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {variables.map((variable) => (
          <div key={variable} className="grid gap-2 border-b border-primary">
            <p>{variable}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
