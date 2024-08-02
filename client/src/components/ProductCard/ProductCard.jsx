import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductCard = ({ product, count, onAdd, onRemove }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        boxShadow: "none",
        border: "none",
        backgroundColor: "white",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
          padding: "25px",
          backgroundColor: "white",
        }}
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent sx={{ paddingBottom: 0, backgroundColor: "white" }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price} сум
        </Typography>
      </CardContent>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={2}
        sx={{ height: "60px" }}
      >
        {count === 0 ? (
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "100%",
              backgroundColor: "black",
              color: "white",
              "&:active": { backgroundColor: "gray" },
            }}
            onClick={onAdd}
          >
            Добавить
          </Button>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            sx={{ justifyContent: "space-between", width: "100%" }}
          >
            <IconButton
              onClick={onRemove}
              sx={{
                color: "white",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "black" },
                "&:active": { backgroundColor: "gray" },
                marginRight: "10px",
                width: "30px",
                height: "30px",
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ margin: "0 10px" }}>{count}</Typography>
            <IconButton
              onClick={onAdd}
              sx={{
                color: "white",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "black" },
                "&:active": { backgroundColor: "gray" },
                marginLeft: "10px",
                width: "30px",
                height: "30px",
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ProductCard;
