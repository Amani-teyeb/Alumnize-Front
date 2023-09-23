// component

import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
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
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },

  {
    title: 'تسجيل في الدروس',
    path: '/dashboard/cours',
    icon: icon('ic_blog'),
  },

  {
    title: 'دروسي',
    path: '/dashboard/wishlist',
    icon: icon('ic_lock'),
  },

  // {
  //   title: 'لغات',
  //   path: '/dashboard/formation',
  //   icon: icon('ic_lock'),
  // },
];

export default navConfig;
