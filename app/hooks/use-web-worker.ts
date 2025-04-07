export default async function webWorker(worker: Worker, values: any) {
  if (typeof window !== "undefined") {
    if (!values) {
      return null;
    }
    try {
      worker.postMessage(values);
      const processedValues = await new Promise<any>((resolve) => {
        worker.onmessage = (event) => {
          resolve(event.data);
          worker.terminate();
        };
      });
      return processedValues;
    } catch (error) {
      console.error("Erro ao processar itens:", error);
      throw error;
    }
  }
}
