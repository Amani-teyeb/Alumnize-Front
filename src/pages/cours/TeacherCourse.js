import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Card, Table, Stack, Paper, TextField, Button, Popover, Box, Checkbox, TableRow, MenuItem, TableBody, TableCell, Container, FormControlLabel, FormControl, Typography, IconButton, TableContainer, TablePagination, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SettingsRemote } from '@mui/icons-material';
// dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from "react-mui-fileuploader"

// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

// mock
import USERLIST from '../../_mock/user'
import { AddCourse, getAllCourses } from '../../Redux/actions';




// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'level', label: 'Level', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TeacherCourse() {

  const dispatch = useDispatch()
  const courses = useSelector(state => state.course.courses)
  const themes = useSelector(state => state.theme.themes)


  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // .................................................................

  const [opend, setOpend] = useState(false)
  const [fullWidth, setFullWidth] = useState(true);
  const [fileToUpload, setFileToUpload] = useState()
  const [teme, setTeme] = useState('')
  const [level, setLevel] = useState('')
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')

  const LevelTab = [
    "première année",
    "deuxième année",
    "troisième année",
    "Quatrième année",
    "Cinquième année",
    "sixième année"
  ]

  // .................................................................
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;

    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  // ..........................................................................Dialog_Functions
  const handleOpenDialog = () => {
    setOpend(true)
  }
  const handleCloseDialog = () => {
    setOpend(false)
  }
  const handleSubmitDialog = () => {
    const form = new FormData();
    form.append('titre', titre);
    form.append('description', description);
    form.append('level', level);
    form.append('theme', teme);
    form.append('url', fileToUpload);

    dispatch(AddCourse(form))
    setOpend(false)

  }
  // const handleFileChange = (event) => {
  //   // Update chosen files
  //   setFileToUpload(event.target.file[0])
  //   console.log(event.target.file)
  // };

  const handleLevel = (event) => {
    const {
      target: { value },
    } = event;
    setLevel(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value._id,
    );
  };
  const handleTheme = (event, theme) => {
    const {
      target: { value },
    } = event;
    setTeme(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(theme.name)
  };
  const handleFilesChange = (file) => {
    // Update chosen files
    setFileToUpload(file[0])
    console.log(file[0])
  };
  const[age, setAge] = useState('')



  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenDialog}>
            New Course
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={courses.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody key={courses._id}>
                  {courses.length > 0 ? courses.map((course) => {

                    const selectedUser = selected.indexOf(titre) !== -1;

                    return (
                      <TableRow hover key={course.titre} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack >
                            <Typography variant="subtitle2" noWrap>
                              {course.level}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{course.titre}</TableCell>
                        <TableCell align="left">{course.description}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }) : null}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>


      <Dialog
        fullWidth={fullWidth}
        open={opend}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          {"Add your new course"}
        </DialogTitle>
        <DialogContent>

          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',


            }}
          >

            <TextField
              id="filled-basic"
              label="Filled"
              variant="filled"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Filled"
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />



            <FormControl sx={{ mt: 2, maxWidth: 'xl' }}>
              <InputLabel htmlFor="max-width">Level</InputLabel>
              <Select
                autoFocus
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                  defaultValue: "level"
                }}
                value={level}
                onChange={handleLevel}
              >
                {
                  LevelTab.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  )
                  )

                }

              </Select>

            </FormControl>

            {/* <FormControl sx={{ mb: 4, mt: 2, maxWidth: 'xl' }}  >
              <InputLabel htmlFor="max-width">Theme</InputLabel>
              <Select
                autoFocus
                label="maxWidth"
                value={teme}
                onChange={handleTheme}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                  defaultValue: "theme"
                }}
              >
                {themes.map((theme, index) =>
                  <MenuItem key={index} value={theme.slug}>{theme.name}</MenuItem>
                )}

              </Select>
            </FormControl> */}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={teme}
                onChange={handleTheme}
              >
                {themes.map(theme =>
                  <MenuItem key={theme._id} value={theme._id}>{theme.name}</MenuItem>
                )}
              </Select>
            </FormControl>

            <FileUpload

              onFilesChange={handleFilesChange}
              onContextReady={(context) => { }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitDialog} autoFocus>
            Submit
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
}
