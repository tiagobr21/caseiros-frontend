import { useEffect, useState } from "react";
import { alertService } from "../../services/alert";

export default function Alert() {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "warning" | "info">("success");

  useEffect(() => {
    alertService.subscribe((msg, tp) => {
      setMessage(msg);
      setType(tp);

      setTimeout(() => setMessage(null), 3000);
    });
  }, []);

  if (!message) return null;

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-3 text-white rounded shadow-lg transition-all ${colors[type]}`}
    >
      {message}
    </div>
  );
}
