import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UploadFile from "@mui/icons-material/UploadFile";
import Close from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface ListItem {
  icon: any;
  name: string;
  isFolder: boolean;
  subFolder: ListItem[];
}

export default function UploadFileModal({ menuItemList, onUpload }: any) {
  const itemList: ListItem[] = menuItemList;
  const listDropdownFolder = itemList.filter((menu) => menu.isFolder);
  const [open, setOpen] = React.useState(false); // modal
  const handleOpen = () => setOpen(true); // modal
  const handleClose = () => {
    resetData();
    setOpen(false);
  }; // modal

  //input
  const [mode, setMode] = React.useState<string>("1");
  const changeMode = (event: any) => {
    resetData();
    setMode(event.target.value);
  };

  // Validate
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await uploadFileFunction(data);
  };

  //upload
  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const resetData = () => {
    setValue("folderFiles", null);
    setValue("folderName", null);
  };

  const selectedDropdown = watch("folderName") || "0";
  const fileName = watch("folderFiles")?.[0]?.name || "";

  const uploadFileFunction = async (data: any) => {
    try {
      console.log("uploadFileFunction", data);
      const req = new FormData();
      req.set("file", data.folderFiles[0]);
      req.set("folderName", data.folderName);
      if (mode === "1") {
        const res = await fetch("/api/upload-file-folder", {
          method: "POST",
          body: req,
        });
        if (res && res["status"] === 200) {
          handleClose();
          onUpload();
        }
      } else {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: req,
        });
        if (res && res["status"] === 200) {
          handleClose();
          onUpload();
        }
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        <UploadFile className="mr-1"></UploadFile>Upload Data
      </Button>
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "700px", // Set your width here
            },
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="flex justify-between align-center">
            <div>
              <DriveFolderUploadIcon className="mr-3" />
              Upload Data
            </div>
            <div className="cursor-pointer text-red-500" onClick={handleClose}>
              <Close></Close>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="mt-4">
            <FormControl>
              <FormLabel id="radio-buttons-group-label">Mode</FormLabel>
              <RadioGroup row value={mode} onChange={changeMode} aria-labelledby="radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="1" control={<Radio />} label="Upload" />
                <FormControlLabel value="2" control={<Radio />} label="Folder" />
              </RadioGroup>
            </FormControl>
          </div>
          {mode == "1" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <Box sx={{ minWidth: 350 }}>
                  <FormControl fullWidth className="py-0 my-0">
                    <InputLabel className="bg-white">Folder Name</InputLabel>
                    <Select value={selectedDropdown || "0"} {...register("folderName", { required: true })}>
                      {listDropdownFolder.map((menu, index) => (
                        <MenuItem key={`menu` + `${index}`} value={menu.name}>
                          {menu.name}
                        </MenuItem>
                      ))}
                      <MenuItem value={"0"}>------No Folder------</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <div className="mt-4 flex justify-between">
                  <div>
                    <Button
                      variant="contained"
                      id="upload"
                      onClick={() => {
                        handleUploadClick();
                      }}
                    >
                      <UploadFile className="mr-1"></UploadFile>Upload
                    </Button>
                    <input type="file" accept={selectedDropdown == "0" ? ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" : ".txt"}
                    id="fileInput" className="hidden" {...register("folderFiles", { required: true })}></input>
                    {errors?.folderFiles ? (
                      <label htmlFor="fileInput" className="ml-3 text-red-500 text-xs">
                        Please Upload files*
                      </label>
                    ) : (
                      <label htmlFor="fileInput" className="ml-3 text-secondary text-xs cursor-pointer">
                        {fileName ? fileName : null}
                      </label>
                    )}
                  </div>
                  {fileName && (
                    <Button variant="contained" type="submit">
                      <UploadFile className="mr-1"></UploadFile>Confirm
                    </Button>
                  )}
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 flex justify-between self-center">
                <TextField
                  fullWidth
                  size="small"
                  error={Boolean(errors.folderName)}
                  label="Folder Name"
                  defaultValue=""
                  helperText={errors.folderName && "This field is required"}
                  {...register("folderName", { required: true })}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <Button
                    variant="contained"
                    id="upload"
                    onClick={() => {
                      handleUploadClick();
                    }}
                  >
                    <UploadFile className="mr-1"></UploadFile>Upload
                  </Button>
                  <input type="file" accept=".txt"  
                  id="fileInput" className="hidden" {...register("folderFiles", { required: true })}></input>
                  {errors?.folderFiles ? (
                    <label htmlFor="fileInput" className="ml-3 text-red-500 text-xs">
                      Please Upload files*
                    </label>
                  ) : (
                    <label htmlFor="fileInput" className="ml-3 text-secondary text-xs cursor-pointer">
                      {fileName ? fileName : null}
                    </label>
                  )}
                </div>
                {fileName && (
                  <Button variant="contained" type="submit">
                    <UploadFile className="mr-1"></UploadFile>Confirm
                  </Button>
                )}
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
