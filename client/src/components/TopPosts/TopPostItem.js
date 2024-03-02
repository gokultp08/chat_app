import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function TopPostItem({ item, index }) {
  return (
    <Box sx={{ width: 225 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {index + 1}
          </Typography>
          <Typography variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Email: {item.email}
          </Typography>
          <Typography variant="body2">
            Post Count : {item.distinctPostCount}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
