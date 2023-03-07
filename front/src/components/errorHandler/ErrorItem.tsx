import { Typography } from "@mui/material";

interface ErrorItemProps {
  titulo: string;
  texto?: string;
}

export function ErrorItem({ titulo, texto }: ErrorItemProps) {
  return (
    <li>
      <span>
        <Typography sx={{ fontWeight: "bold" }} variant="caption">
          {titulo}:{" "}
        </Typography>
        {texto != null && (
          <Typography variant="caption">
            {texto.length > 1000 ? texto.substring(0, 1000) + "... <<TEXTO RECORTADO>>" : texto}
          </Typography>
        )}
      </span>
    </li>
  );
}
