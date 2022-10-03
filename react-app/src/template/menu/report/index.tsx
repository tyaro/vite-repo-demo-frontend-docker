import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link,useMatch } from 'react-router-dom';


const ConfigMenu = () =>{
  const url = '/report/config'
  let match = useMatch(url)
  return (
    <div>
      <List>
        <Link to={url} >
          <ListItem disablePadding>
            <ListItemButton selected={!match?false:true}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"レポート設定"} sx={{textDecoration:'none',color:'white'}} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );
}

export default ConfigMenu; 