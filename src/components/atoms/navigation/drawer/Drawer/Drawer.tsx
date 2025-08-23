import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { default as MUIDrawer } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconContainer from "components/atoms/IconContainer/IconContainer";

import useAuth from "infrastructure/services/AuthProvider";

import { useTranslation } from "../../../../../i18n/client";
import { drawerWidth, lessons, levels, other, studying } from "./config";

export interface IDrawer {
  open: boolean;
  onClose: () => void;
}

const Drawer: React.FC<IDrawer> = ({ open, onClose }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [value, setValue] = useState<string>();
  const [lessonsOpen, setLessonsOpen] = useState(false);
  const [levelsOpen, setlevelsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <MUIDrawer
      sx={{
        width: drawerWidth,
        gap: 0,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflow: "hidden",
          paddingRight: "8px",
          "&:hover": {
            overflowY: "scroll",
            paddingRight: 0,
          },
        },
        "*::-webkit-scrollbar": {
          width: "8px",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: 1,
        },
      }}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          my: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#CECECE",
          }}
        >
          {t("project-name")}
        </Typography>
        <Typography variant="subtitle2">
          {user?.selectedCourse?.name}
        </Typography>
      </Toolbar>
      <List sx={{ pt: 0 }}>
        <ListItemButton onClick={() => setlevelsOpen(!levelsOpen)}>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText primary={t("navigation.levels")} />
          {levelsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={levelsOpen} timeout="auto" unmountOnExit>
          <List>
            {levels.map((item, i) => {
              return (
                <ListItem
                  disablePadding
                  key={`levels-${i}`}
                  selected={value === `levels-${i}`}
                >
                  <Link
                    href={
                      item.premium && user?.role !== "PREMIUM_USER"
                        ? "/subscription"
                        : item.path
                    }
                    style={{ width: "100%" }}
                  >
                    <ListItemButton
                      onClick={() => {
                        setValue(`levels-${i}`);
                      }}
                    >
                      <ListItemIcon>
                        <IconContainer name={item.icon} />
                      </ListItemIcon>
                      <ListItemText primary={t(item.label)} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Collapse>

        <ListItemButton onClick={() => setLessonsOpen(!lessonsOpen)}>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText primary={t("navigation.lessons")} />
          {lessonsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={lessonsOpen} timeout="auto" unmountOnExit>
          <List>
            {lessons.map((item, i) => {
              return (
                <ListItem
                  disablePadding
                  key={`lessons-${i}`}
                  selected={value === `lessons-${i}`}
                >
                  <ListItemButton
                    onClick={() => {
                      setValue(`lessons-${i}`);
                      router.push(item.path);
                    }}
                  >
                    <ListItemIcon>
                      <IconContainer name={item.icon} />
                    </ListItemIcon>
                    <ListItemText primary={t(item.label)} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
        {studying.map((item, i) => {
          return (
            <ListItem
              disablePadding
              key={`studying-${i}`}
              selected={value === `studying-${i}`}
            >
              <ListItemButton
                onClick={() => {
                  setValue(`studying-${i}`);
                  router.push(item.path);
                }}
              >
                <ListItemIcon>
                  <IconContainer name={item.icon} />
                </ListItemIcon>
                <ListItemText primary={t(item.label)} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {other.map((item, i) => {
          return (
            <ListItem
              disablePadding
              key={`other-${i}`}
              selected={value === `other-${i}`}
            >
              <ListItemButton
                onClick={() => {
                  setValue(`other-${i}`);
                  router.push(item.path);
                }}
              >
                <ListItemIcon>
                  <IconContainer name={item.icon} />
                </ListItemIcon>
                <ListItemText primary={t(item.label)} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
