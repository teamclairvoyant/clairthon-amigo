import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { COPY } from "../../constant";
import Link from "@mui/material/Link";
import Profile from "../common/Profile";
import styles from "./Header.module.scss";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import User from "../Hooks/useAuth";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
/**
 * Header that is displayed at the top of every page that uses the Main layout
 */
function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = User();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    try {
      localStorage.clear();
      await Auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        className={`h-20 sm:h-full ${styles.bgColor}`}
      >
        <Toolbar className={styles.toolbar}>
          <Link className="w-1/6">
            <div className={styles.tenantLogoContainer}>
              <img
                src="clair-logo-white.svg"
                alt={COPY.ALT_TEXT_LOGO}
                className="my-0 mx-auto my-auto"
              />
            </div>
          </Link>
          <div className="flex-grow" />
          <div className="flex items-center">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <>
                  <div className="ml-0 xs:ml-2">
                    <Profile
                      firstName={user?.given_name}
                      lastName={user?.family_name}
                      bgColor="#6734ba"
                      size={12}
                    />
                  </div>
                  <span className="mr-1 text-lg text-white leading-4 text-left font-display-bold md:ml-3">
                    <span className="hidden md:inline-block">
                      {user?.given_name} {user?.family_name}
                    </span>
                  </span>
                </>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
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
        <MenuItem onClick={onLogout}>{COPY.LOGOUT}</MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
