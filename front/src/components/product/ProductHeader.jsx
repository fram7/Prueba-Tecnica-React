import Typography from "@mui/material/Typography";
import { Button, Card, CardActions, CardContent, CardMedia, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductHeader({ product }) {
  const navigate = useNavigate();

  const { _id, name, image } = product;

  return (
    <Grid item key={Card} xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          image={`${process.env.REACT_APP_IMAGE_URL}/${image}`}
          alt={name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {name}
          </Typography>
          {/* <Typography sx={{ textAlign: "right" }}>{brand}</Typography> */}
        </CardContent>
        <CardActions
          sx={{
            alignSelf: "stretch",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            p: 0.1,
          }}
        >
          <Button
            size="small"
            onClick={() => {
              navigate(`product/${_id}`);
            }}
          >
            View more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
