import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CommonAuthWrapper = ({ children }) => {
  return (
    <Box
      width={"100%"}
      p={5}
      sx={{
        backgroundColor: "primary.main",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Paper
        sx={{
          maxWidth: "40%",
          margin: "auto",
          p: 2,
        }}
      >
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          px={4}
          pb={2}
          spacing={2}
        >
          <AccountCircleIcon
            color='secondary'
            sx={{
              width: "80px",
              height: "80px",
            }}
          />
          <Typography variant='h4' mt={"-8px !important"}>
            Welcome User
          </Typography>
          <Divider width='100%' />
          <>{children}</>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CommonAuthWrapper;
