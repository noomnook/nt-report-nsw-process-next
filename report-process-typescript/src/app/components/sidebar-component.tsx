import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
export interface ListItem {
  name: string;
  isFolder: boolean;
  path: string;
  subFolder: ListItem[];
}

export default function SidebarComponent({ menuItemList, fetchData, jsonData }: any) {
  const itemList: ListItem[] = menuItemList;

  const [openSecondLevel, setOpenSecondLevel] = React.useState(-1);

  const [open, setOpen] = React.useState(false);
  const handleClickDialogOpen = (path: any) => {
    if (path) {
      setPathDelete(path);
      setOpen(true);
    }
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  const [openSnackBar, setOpenSnackBar] = React.useState({
    isOpen: false,
    message: "",
    status: "200",
  });
  const handleSnackbarOpen = (message: string, status: string) => {
    setOpenSnackBar({ isOpen: true, message: message, status: status });
  };
  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar({ isOpen: false, message: "", status: "" });
  };

  const [path, setPathDelete] = React.useState("");
  const onSelectedDelete = async () => {
    try {
      const body = {
        path: path,
      };
      const resp = await axios.delete("/api/upload3", {
        data: body,
      });
      if (resp && resp["data"].status === 200) {
        handleSnackbarOpen("DELETED SUCCESSFULLY", "200");
      } else {
        handleSnackbarOpen(resp["data"].message, "400");
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      handleDialogClose();
      fetchData();
    }
  };

  const handlePassingData = (path: any) => {
    if (path) {
      searchJsonDataFromExcelByPath(path);
    }
  };

  const handlePassingData2 = (path: any) => {
    if (path) {
      searchJsonDataFromTxtBypath(path);
    }
  };

  const searchJsonDataFromExcelByPath = async (path: string) => {
    try {
      const body = {
        path: path,
      };
      const resp = await axios.post("/api/upload3", body);
      if (resp && resp["data"]["data"]) {
        jsonData({
          fileName: resp["data"]["fileNames"],
          data: resp["data"]["data"],
        });
      }
    } catch (err: any) {
      console.log(err);
    } finally {
    }
  };

  const searchJsonDataFromTxtBypath = async (path: string) => {
    try {
      const body = {
        path: path,
      };
      const resp = await axios.post("/api/search-file-txt", body);
      if (resp && resp["data"]["data"]) {
        jsonData({
          fileName: resp["data"]["fileNames"],
          data: resp["data"]["data"],
        });
      }
    } catch (err: any) {
      console.log(err);
    } finally {
    }
  };

  return (
    <div>
      {
        <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader">
          {itemList.map((item, index) => {
            if (item.subFolder.length === 0) {
              return (
                <ListItemButton key={index}>
                  <ListItemIcon>{item.isFolder ? <FolderIcon /> : <DescriptionIcon />}</ListItemIcon>
                  <ListItemText primary={item.name} />
                  <SearchIcon onClick={() => handlePassingData(item.path)} className="mr-3 p-1 text-blue-500 rounded-full bg-blue-200" />
                  <DeleteForeverIcon onClick={() => handleClickDialogOpen(item.path)} className="mr-3 p-1 text-red-500 rounded-full bg-red-200" />
                </ListItemButton>
              );
            } else {
              return (
                <div key={index}>
                  <ListItemButton>
                    <ListItemIcon onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)}>{item.isFolder ? <FolderIcon /> : <DescriptionIcon />}</ListItemIcon>
                    <ListItemText onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)} primary={item.name} />
                    <SearchIcon onClick={() => handlePassingData2(item.path)} className="mr-3 p-1 text-blue-500 rounded-full bg-blue-200" />
                    <DeleteForeverIcon onClick={() => handleClickDialogOpen(item.path)} className="mr-3 p-1 text-red-500 rounded-full bg-red-200" />
                    {openSecondLevel === index ? (
                      <ExpandLess onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)} />
                    ) : (
                      <ExpandMore onClick={() => setOpenSecondLevel(openSecondLevel === index ? -1 : index)} />
                    )}
                  </ListItemButton>
                  {item.subFolder.map((subItem, subIndex) => {
                    return (
                      <Collapse key={`collapse_${index}_${subIndex}`} in={openSecondLevel === index} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={subItem.name} />
                            <SearchIcon onClick={() => handlePassingData2(subItem.path)} className="mr-3 p-1 text-blue-500 rounded-full bg-blue-200" />
                            <DeleteForeverIcon onClick={() => handleClickDialogOpen(subItem.path)} className="mr-3 p-1 text-red-500 rounded-full bg-blue-100" />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    );
                  })}
                </div>
              );
            }
          })}
        </List>
      }
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle id="alert-dialog-title">{"Are you sure to delete this ?"}</DialogTitle>
        <DialogActions>
          <div className="flex justify-between">
            <Button color="error" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button onClick={onSelectedDelete} autoFocus>
              Confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackBar.isOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={openSnackBar.status == "200" ? "success" : "error"} variant="filled" sx={{ width: "100%" }}>
          {openSnackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
