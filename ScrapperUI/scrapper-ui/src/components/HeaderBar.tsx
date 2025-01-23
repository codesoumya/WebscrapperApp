import { AppBar, Avatar, Divider, IconButton, Menu, MenuItem, TextField, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/rootReducer"
import { useState } from "react"
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

interface headerBarPropsType {
    message?: string
    handleMesageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const HeaderBar = (props: headerBarPropsType) => {
    const auth = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [menuOpener, setMenuOpener] = useState(false);

    // Open the menu
    const handleMenuClick = () => {
        setMenuOpener(true)
    };

    // Close the menu
    const handleMenuClose = () => {
        setMenuOpener(false);
    };

    // Handle logout
    const handleLogout = () => {
        handleMenuClose();
        const authDetails = {
            isAuthenticated: false,
            emailId: '',
            name: '',
            password: '',
            phone: ''
          }
        localStorage.setItem('auth', JSON.stringify(authDetails))
        dispatch({
            type: "SET_AUTH_DETAILS",
            payload: {
                authDetails: authDetails
            }
        })
        navigate("/login")
    };

    return <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {
            props?.message? 
            <TextField
            label="Welcome"
            value={props?.message}
            onChange={props?.handleMesageChange}
            variant="outlined"
            fullWidth
            sx={{ fontWeight: 900 }}
            margin="normal"
            />:
            <Typography variant="h6" sx={{ fontWeight: 900 }} gutterBottom>
                {props?.message ?? `Welcome ${auth?.name?.split(" ")?.[0]}`}
            </Typography>
            }
            
            
            <IconButton onClick={handleMenuClick} size="large" edge="end" color="inherit" style={{ position: 'absolute', top: '3px', right: '25px' }}>
                <Avatar alt={auth?.name ?? ''} src="/path-to-avatar-image.jpg">
                    {auth?.name ? auth?.name?.charAt(0) : 'U'} {/* First letter of user name */}
                </Avatar>
            </IconButton>
            <Menu
                open={menuOpener}
                onClose={handleMenuClose}
                style={{ marginTop: '50px' }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {/* Display the username */}
                <MenuItem disabled>{auth?.name}</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ExitToApp sx={{ mr: 1 }} /> Logout
                </MenuItem>
            </Menu>
        </div>
        <Divider sx={{ mb: 2 }} />
    </>
}

export default HeaderBar