import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Key from "@mui/icons-material/Key";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const UserMenu = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries(["user"]);
  };
  return (
    <Menu
      anchorEl={anchorEl}
      id='account-menu'
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          navigate("/change-password");
        }}
      >
        <ListItemIcon>
          <Key fontSize='small' />
        </ListItemIcon>{" "}
        Change Password
      </MenuItem>

      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
