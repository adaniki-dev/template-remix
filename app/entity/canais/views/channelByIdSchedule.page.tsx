import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChannelByIdSchedulePage() {
  return (
    <div className="p-4">
      <Card className="flex flex-col items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center p-8 gap-4">
          <CardTitle>Estamos melhorando sua esperiencia!</CardTitle>
          <Button>Clique aqui para enviar conteúdo</Button>
          <p>Em breve você poderá visualizar os metricas e muito mais para este canal.</p>
        </CardContent>
      </Card>
    </div>
  );
}
