import { format } from "date-fns";
import morgan from "morgan";

export const logger = morgan(
  (_, req) => {
    const date = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    const id = (req as any).body?.id || (req as any).params?.id;
    const title = (req as any).body?.titulo;
    const method = req.method === "DELETE" ? "Removido" : "Alterado";
    return `${date} - Card ${id} - ${title} - ${method}`;
  },
  {
    skip: function (req) {
      return req.method === "GET" || req.method === "POST";
    },
  },
);
