import { useNavigate } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <Button className="bg-transparent " onClick={() => navigate(-1)}>
      <Icon name="ArrowLeft" size="sm" />
    </Button>
  );
}
