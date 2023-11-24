// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import * as React from "react";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import FlightLandIcon from "@mui/icons-material/FlightLand";
// import { WaterDropOutlined } from "@mui/icons-material";
// import ClassIcon from "@mui/icons-material/Class";
// import SchoolIcon from "@mui/icons-material/School";
// import LogoutIcon from "@mui/icons-material/Logout";
// import SettingsIcon from "@mui/icons-material/Settings";
// import Avatar from "@mui/material/Avatar";
// import { Menu, MenuItem, Tooltip } from "@mui/material";

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// interface Class {
//   id: number;
//   name: string;
// }

// interface Classes {
//   classes: Class[];
// }

// function createClass(id: number, name: string): Class {
//   return { id, name };
// }

// const classes = [
//   createClass(1, "Class 1"),
//   createClass(2, "Class 2"),
//   createClass(3, "Class 3"),
// ];

// const classNames = classes.map((c) => c.name);

// interface Assigment {
//   id: number;
//   name: string;
//   mark: number;
// }

// interface Column {
//   id: "name" | "avg_mark" | "assignments";
//   label: string;
//   maxWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "name", label: "Name", maxWidth: 10 },
//   { id: "avg_mark", label: "Average Mark", maxWidth: 10 },
//   { id: "assignments", label: "Assignments", maxWidth: 10 },
// ];

// interface Data {
//   name: string;
//   avg_mark: number;
//   assignments?: Assigment[];
// }

// function createData(
//   name: string,
//   avg_mark: number,
//   assignments: Assigment[]
// ): Data {
//   return { name, avg_mark, assignments };
// }

// const rows = [
//   createData("Minh An", 3.5, [
//     { id: 1, name: "Assignment 1", mark: 3.5 },
//     { id: 2, name: "Assignment 2", mark: 3.5 },
//     { id: 3, name: "Assignment 3", mark: 3.5 },
//   ]),
//   createData("Huy Hoan", 3.5, [
//     { id: 1, name: "Assignment 1", mark: 3.5 },
//     { id: 2, name: "Assignment 2", mark: 3.5 },
//     { id: 3, name: "Assignment 3", mark: 3.5 },
//   ]),
// ];

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function TeacherMarkPage() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const assignments = rows[0].assignments?.map((a) => a.name) || [];

//   const averageMark = (assignments: Assigment[]) => {
//     let sum = 0;
//     assignments.forEach((a) => {
//       sum += a.mark;
//     });
//     return sum / assignments.length;
//   };
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
//     null
//   );
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
//     null
//   );

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           open={open}
//           style={{
//             backgroundColor: "#fff",
//             color: "#000",
//             boxShadow: "none",
//             borderBottom: "1px solid #ccc",
//           }}
//         >
//           <Toolbar>
//             <Box sx={{ flexGrow: 1 }}>
//               <IconButton
//                 color="default"
//                 aria-label="open drawer"
//                 onClick={handleDrawerOpen}
//                 edge="start"
//                 sx={{
//                   marginRight: 5,
//                   ...(open && { display: "none" }),
//                 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography
//                 variant="h6"
//                 noWrap
//                 component="a"
//                 href="#app-bar-with-responsive-menu"
//                 style={{
//                   fontFamily: "monospace",
//                   fontWeight: 700,
//                   letterSpacing: ".3rem",
//                   color: "#000",
//                   textDecoration: "none",
//                 }}
//               >
//                 Drope Classroom
//               </Typography>
//             </Box>
//             <Box sx={{ flexGrow: 0, float: "left" }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: "45px" }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 {settings.map((setting) => (
//                   <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                     <Typography textAlign="center">{setting}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open}>
//           <DrawerHeader>
//             <IconButton onClick={handleDrawerClose}>
//               {theme.direction === "rtl" ? (
//                 <ChevronRightIcon />
//               ) : (
//                 <ChevronLeftIcon />
//               )}
//             </IconButton>
//           </DrawerHeader>
//           <Divider />
//           <List>
//             {["Home", "Landing Page"].map((text, index) => (
//               <ListItem key={text} disablePadding sx={{ display: "block" }}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {index % 2 === 0 ? <HomeIcon /> : <FlightLandIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//           <Divider />
//           <List>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <SchoolIcon />
//               </ListItemIcon>
//               <ListItemText
//                 primary={"Your Classes"}
//                 sx={{ opacity: open ? 1 : 0 }}
//               />
//             </ListItemButton>
//             {classNames.map((text, index) => (
//               <ListItem key={text} disablePadding sx={{ display: "block" }}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <ClassIcon />
//                   </ListItemIcon>
//                   <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//           <Divider />
//           <List>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <SchoolIcon />
//               </ListItemIcon>
//               <ListItemText
//                 primary={"Attemped Classes"}
//                 sx={{ opacity: open ? 1 : 0 }}
//               />
//             </ListItemButton>
//             {classNames.map((text, index) => (
//               <ListItem key={text} disablePadding sx={{ display: "block" }}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <ClassIcon />
//                   </ListItemIcon>
//                   <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//           <Divider />
//           <List>
//             {["Settings", "Logout"].map((text, index) => (
//               <ListItem key={text} disablePadding sx={{ display: "block" }}>
//                 <ListItemButton
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <DrawerHeader />
//           <TableContainer
//             component={Paper}
//             style={{
//               // when sidebar is active
//               marginLeft: -25,
//               marginTop: -25,
//               width: "calc(100% + 50px)",
//             }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Average Mark</TableCell>
//                   {assignments.map((assignment) => (
//                     <TableCell key={assignment}>{assignment}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <TableRow key={row.name}>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.avg_mark}</TableCell>
//                     {assignments.map((assignment) => (
//                       <TableCell key={assignment}>
//                         {
//                           row.assignments?.find((a) => a.name === assignment)
//                             ?.mark
//                         }
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Box>
//     </>
//   );
// }
