import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const COURSES_TITLES = [
  'رياضيات',
  'الايقاظ العلمي',
  'العلوم',
  'العربية',
  'français',
  'English',
  'Informatique'
];

const courses = [...Array(7)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/courses/course_${index + 1}.jpg`,
  title: COURSES_TITLES[index]
}));

export default courses;