import * as React from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import './index.css'
import { AppContext } from '../../contexts/globalContext'
import { useNavigate } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))

// eslint-disable-next-line react/prop-types
const Header = () => {
    const navigate = useNavigate()
    const { userLogged, getUserLogged, writeDataTable} = React.useContext(AppContext)
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLoggout = () =>{
        writeDataTable(null, 'userLogged')
        navigate('/')
        window.location.reload()
    }

    React.useEffect(()=>{
        getUserLogged()
    },[])
    console.log('userlogged', userLogged)
    console.log('location',window.location)
    return (
        <AppBar position='fixed' className='appBar'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    ></Typography>
                    <Link to='/'><a href='#' alt='Logo'>
                        <img
                            src='/logo.png'
                            alt='Logo'
                            className='navbar_logo'
                        ></img>
                    </a></Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem>
                                <Typography textAlign='center' color='inherit'>
                                    Tournaments
                                </Typography>
                            </MenuItem>

                        </Menu>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style={{ marginLeft:10}}>
                        <Link to='/tournaments'>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                Tournaments
                            </Button>
                        </Link>
                    </Box>
                    <Search className='navbar-search' sx={{
                        display: { xs: 'none', md: 'flex' },    
                    }} >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Search…'
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    {(userLogged?.id)? 
                        (<Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        alt='Profile Image'
                                        src={userLogged.avatarURL}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
                                <MenuItem onClick={handleLoggout}>Logout</MenuItem>
                            </Menu>            
                        </Box>) : (
                            <div>
                                <Link to='/user/register'><Button
                                    key='register'
                                    variant='text'
                                    sx={{ color: 'white'}}
                                >
                                    Register
                                </Button></Link>
                                <Link to='/user/login'><Button
                                    key='login'
                                    variant='contained'
                                    sx={{ color: 'white', backgroundColor:'orange', '&:hover':{backgroundColor:'orange'}}}
                                >
                                    Login
                                </Button></Link>
                            </div>
                        )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header
