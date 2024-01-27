import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export function Loading() {
  const [progress, setProgress] = useState(10);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        // Se o progresso for menor que 100, aumenta o valor
        setProgress(progress + 30);
      } else {
        // Se o progresso atingir 100, exibe o conteúdo adicional
        setShowContent(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <>
      {showContent ? (
        <div></div>
      ) : (
        // Exibe a barra de progresso enquanto o progresso é menor que 100
        <Progress value={progress} className="w-[60%]" />
      )}
    </>
  );
}
