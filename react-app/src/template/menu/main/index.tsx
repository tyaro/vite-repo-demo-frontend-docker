import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EngineeringIcon from '@mui/icons-material/Engineering';


const MainMenu = () =>{
  return (
    <div>
      <List>
        <Link to={'/home'} >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} sx={{textDecoration:'none',color:'white'}} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to={'/report/record/select'} >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary={"レポート記入"} sx={{textDecoration:'none',color:'white'}} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );
}

export default MainMenu; 