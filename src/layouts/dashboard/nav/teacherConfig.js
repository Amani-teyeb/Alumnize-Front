// component

import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigTeacher = [
  {
    icon: icon('ic_analytics'),
    title: 'صفحة الاستقبال',
    path: '/dashboard/app',
  },

  {
    title: 'دردشة',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: ' اضافة وثائق',
    path: '/dashboard/cours',
    icon: icon('ic_lock'),
  },
  {
    title: ' اضافة درس',
    path: '/dashboard/videoCourse',
    icon: icon('ic_blog'),
  },

  // {
  //   title: 'الدروس',
  //   path: '/dashboard/products',
  //   icon: icon('ic_lock'),
  // },

  // {
  //   title: 'Formation',
  //   path: '/dashboard/formation',
  //   icon: icon('ic_lock'),
  // },
];

export default navConfigTeacher;
