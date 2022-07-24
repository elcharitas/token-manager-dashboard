import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";

export const Column = ({ children, title = "Column", ...props }) => {
  return (
    <Card {...props}>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};
