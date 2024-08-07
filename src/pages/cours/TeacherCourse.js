import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TextField,
  Button,
  Popover,
  Box,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  FormControlLabel,
  FormControl,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  InputLabel,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SettingsRemote } from '@mui/icons-material';
// dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from 'react-mui-fileuploader';

// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

// mock
import USERLIST from '../../_mock/user';
import { AddCourse, deleteCourse, getAllCourses } from '../../Redux/actions';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'العنوان', label: 'العنوان', alignRight: false },
  { id: 'المستوى', label: 'المستوى', alignRight: false },
  { id: 'تاريخ التنزيل', label: 'تاريخ التنزيل', alignRight: false },
  { id: 'الدرس', label: 'الدرس', alignRight: false },
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
  const dispatch = useDispatch();
  const allcourses = useSelector((state) => state.course.courses);
  const auth = useSelector((state) => state.auth.user);
  const courses = allcourses.filter((e) => e.createdBy === auth._id);
  console.log(courses);
  const themes = useSelector((state) => state.theme.themes);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // .................................................................

  const [opend, setOpend] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [fileToUpload, setFileToUpload] = useState();
  const [teme, setTeme] = useState('');
  const [level, setLevel] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState('');

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
  const handleGroup = (event) => {
    const {
      target: { value },
    } = event;
    setGroup(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value : value._id
    );
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
    setOpend(true);
  };
  const handleCloseDialog = () => {
    setOpend(false);
  };
  const handleSubmitDialog = () => {
    const form = new FormData();
    form.append('titre', titre);
    form.append('group', group);
    form.append('description', description);
    form.append('level', level);
    form.append('theme', teme);
    form.append('url', fileToUpload);

    dispatch(AddCourse(form));
    setOpend(false);
  };
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
      typeof value === 'string' ? value.split(',') : value._id
    );
  };
  const handleTheme = (event, theme) => {
    const {
      target: { value },
    } = event;
    setTeme(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    console.log(theme.name);
  };
  const handleFilesChange = (file) => {
    // Update chosen files
    setFileToUpload(file[0]);
    console.log(file[0]);
  };
  const [age, setAge] = useState('');

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            الدروس
          </Typography>
          <Button variant="contained" endIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenDialog}>
            {/* <span style={{ fontSize: 'h4' }}>اضافة درس</span> */}
            <Typography sx={{ ml: 1.5 }} variant="h6" gutterBottom>
              اضافة درس
            </Typography>
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
                  {courses.length > 0
                    ? courses.map((course) => {
                        const selectedUser = selected.indexOf(titre) !== -1;

                        return (
                          <TableRow hover key={course.titre} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack>
                                <Typography variant="subtitle2" noWrap>
                                  {course.titre}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{course.level}</TableCell>
                            <TableCell align="left">{course.createdAt}</TableCell>
                            <TableCell align="left">
                              {/* <iframe
                                src={course.url}
                                id={course._id}
                                title={course.titre}
                                width="80%"
                                autoPlay="false"
                              /> */}
                              <iframe
                                width="260"
                                height="115"
                                src={course.url}
                                title={course.titre}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            </TableCell>

                            <TableCell align="right">
                              <IconButton size="large" onClick={() => dispatch(deleteCourse({ courseId: course._id }))}>
                                <Iconify icon={'eva:trash-2-outline'} sx={{ color: 'error.main' }} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
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
        <DialogTitle id="alert-dialog-title">{'Add image'}</DialogTitle>
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
              label="title"
              variant="filled"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
            <FormControl sx={{ mt: 2, maxWidth: 'xl' }}>
              <InputLabel htmlFor="max-width">level</InputLabel>
              <Select
                autoFocus
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                  defaultValue: 'level',
                }}
                value={level}
                onChange={handleLevel}
              >
                <MenuItem value={'2 ème année'}>2 ème année</MenuItem>
                <MenuItem value={'3 ème année'}>3 ème année</MenuItem>
                <MenuItem value={'4 ème année'}>4 ème année</MenuItem>
                <MenuItem value={'5 ème année'}>5 ème année</MenuItem>
                <MenuItem value={'6 ème année'}>6 ème année</MenuItem>
                <MenuItem value={'7 ème année'}>7 ème année</MenuItem>
                <MenuItem value={'8 ème année'}>8 ème année</MenuItem>
                <MenuItem value={'9 ème année'}>9 ème année</MenuItem>
                <MenuItem value={'1 ère secondaire'}> 1 ère secondaire</MenuItem>
                <MenuItem value={'2 ème secondaire informatique'}>2 ème secondaire informatique</MenuItem>
                <MenuItem value={'2 ème secondaire scientifique'}>2 ème secondaire scientifique</MenuItem>
                <MenuItem value={'2 ème secondaire économie'}>2 ème secondaire économie</MenuItem>
                <MenuItem value={'2 ème secondaire lettres'}>2 ème secondaire lettres</MenuItem>
                <MenuItem value={'3 ème secondaire économie'}>3 ème secondaire économie</MenuItem>
                <MenuItem value={'3 ème secondaire informatique'}>3 ème secondaire informatique</MenuItem>
                <MenuItem value={'3 ème secondaire math'}>3 ème secondaire math</MenuItem>
                <MenuItem value={'3 ème secondaire sciences exp'}>3 ème secondaire sciences exp</MenuItem>
                <MenuItem value={'3 ème secondaire techniques'}>3 ème secondaire techniques</MenuItem>
                <MenuItem value={'3 ème secondaire lettres'}>3 ème secondaire lettres</MenuItem>
                <MenuItem value={'Bac économie'}>Bac économie</MenuItem>
                <MenuItem value={'Bac sciences exp'}>Bac sciences exp</MenuItem>
                <MenuItem value={'Bac informatique'}>Bac informatique</MenuItem>
                <MenuItem value={'Bac lettres'}>Bac lettres</MenuItem>
                <MenuItem value={'Bac mathématiques'}>Bac mathématiques</MenuItem>
                <MenuItem value={'Bac techniques'}>Bac techniques</MenuItem>
                <MenuItem value={'Formation Langues'}>Formation Langues</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, maxWidth: 'xl' }}>
              <InputLabel htmlFor="max-width">group</InputLabel>
              <Select
                autoFocus
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                  defaultValue: 'group',
                }}
                value={group}
                onChange={handleGroup}
              >
                <MenuItem value="group_1"> group_1 </MenuItem>
                <MenuItem value="group_2"> group_2 </MenuItem>
                <MenuItem value="group_3"> group_3 </MenuItem>
                <MenuItem value="group_4"> group_4 </MenuItem>
                <MenuItem value="group_5"> group_5 </MenuItem>
                <MenuItem value="group_6"> group_6 </MenuItem>
                <MenuItem value="group_7"> group_7 </MenuItem>
                <MenuItem value="group_8"> group_8 </MenuItem>
                <MenuItem value="group_9"> group_9 </MenuItem>
                <MenuItem value="group_10"> group_10 </MenuItem>
                <MenuItem value="group_pilote_1"> group_pilote_1 </MenuItem>
                <MenuItem value="group_pilote_2"> group_pilote_2 </MenuItem>
                <MenuItem value="group_pilote_3"> group_pilote_3 </MenuItem>
                <MenuItem value="group_pilote_4"> group_pilote_4 </MenuItem>
                <MenuItem value="group_pilote_5"> group_pilote_5 </MenuItem>
                <MenuItem value="group_pilote_6"> group_pilote_6 </MenuItem>
                <MenuItem value="group_pilote_7"> group_pilote_7 </MenuItem>
                <MenuItem value="group_pilote_8"> group_pilote_8 </MenuItem>
                <MenuItem value="group_pilote_9"> group_pilote_9 </MenuItem>
                <MenuItem value="group_pilote_10"> group_pilote_10 </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, maxWidth: 'xl' }}>
              <InputLabel htmlFor="max-width">level</InputLabel>
              <Select
                autoFocus
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                  defaultValue: 'level',
                }}
                value={teme}
                onChange={handleTheme}
              >
                {themes.map((theme) => (
                  <MenuItem key={theme._id} value={theme._id}>
                    {theme.level} {'_'} {theme.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FileUpload onFilesChange={handleFilesChange} onContextReady={(context) => {}} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button autoFocus onClick={handleSubmitDialog}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
