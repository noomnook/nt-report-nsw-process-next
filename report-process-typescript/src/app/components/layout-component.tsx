import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarComponent from "./sidebar-component";
import UploadFileModal from "./modal/uploadfile-modal";
import TableComponent from "./table-component";

const drawerWidth = 500;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface ListItem {
  name: string;
  isFolder: boolean;
  subFolder: ListItem[];
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

export default function LayoutComponent() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [dataSource, setDataSource] = React.useState(null);

  React.useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      const res = await fetch("/api/upload3", {
        method: "GET",
      });
      const data = await res.json();
      if (data["data"]) {
        setDataSource(data["data"]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [dataJson,setDataJson] = React.useState([]);

  const setJsonDataExel = (data:any) => {
    setDataJson(data);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton onClick={handleDrawerClose} sx={{ mr: 2, ...(!open && { display: "none" }) }}>
            {theme.direction === "ltr" ? <ChevronLeftIcon sx={{ color: "white" }} /> : <ChevronRightIcon />}
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            NT Report Process
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <DrawerHeader>
            <UploadFileModal onUpload={fetchingData} menuItemList={dataSource || []} />
          </DrawerHeader>
        </div>
        <SidebarComponent fetchData={fetchingData} menuItemList={dataSource || []} jsonData={setJsonDataExel} ></SidebarComponent>
      </Drawer>
      <Main open={open} className={open ?  "min-w-[calc(95vw_-_600px)] max-w-[calc(100vw_-_600px)]" : " max-w-[95vw]"} >
          <TableComponent jsonData={dataJson}/>
      </Main>
    </Box>
  );
}
