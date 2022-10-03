import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import MainMenu from '../menu/main';
import ConfigMenu from '../menu/system';
import ReportgMenu from '../menu/report';
import SelectLang from '../language'
import { Outlet } from 'react-router-dom';
import UserInfo from '../userinfo'
import { useTranslation } from "react-i18next";
import { useAuthContext } from '../../contexts';

const darkTheme = createTheme({
  palette:{
    mode:'dark',
  }
})

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // backgroundColor:"black",
  textAlign:'left',
  padding: theme.spacing(7),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  //  marginLeft: 0,
  //  marginLeft: `-${drawerWidth}px`,
  //marginLeft: open?`calc(${drawerWidth}px - ${theme.spacing(15)})`:`-${drawerWidth}px`,
  //marginLeft: open?`calc(${drawerWidth}px - ${theme.spacing(7)})`:0,
  ...(open && {
    marginLeft: `calc(${drawerWidth}px - ${theme.spacing(7)})`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export const GenericTemplate:React.FC = (()=>{
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const {t} = useTranslation()
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const authUser = useAuthContext()
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" noWrap component="div">
            {t("system.name")}
          </Typography>
            <div style={{ flexGrow: 1 }}></div>
            <UserInfo />
            <Box sx={{marginLeft:2}}>
            <SelectLang />
            </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MainMenu />
        {authUser.user?.role==='admin'||'manager'?<ReportgMenu />:<></>}
        {authUser.user?.role==='admin'?<ConfigMenu />:<></>}
        <Divider />
      </Drawer>
      </Box>
      {/* <Box component='main' sx={{flexGrow:1,textAlign:'left',justifyContent:'start',alignItems:'start'}}> */}
      <Main open={open}>
        <Outlet />
      </Main>
      {/* </Box> */}
    </ThemeProvider>
  );
})

export default GenericTemplate;