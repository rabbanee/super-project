import * as SolidIcon from '@elements/icon/Solid';
import * as OutlineIcon from '@elements/icon/Outline';
import removeDuplicates from '@utils/removeDuplicates';
import findNavItemsByName from '@utils/findNavItemsByName';
import findPermissionByName from '@utils/findPermissionByName';

const tes = [
  // 'login',
  // 'register',
  // 'forgot password',
  // 'edit profile',
  'edit permission',
  'crud student attendance',
  'crud chapter',
  'crud learning materials',
  'crud exam',
  'crud score',
  'crud attitude assessment',
  'recap student attandance',
  'exam',
  'crud announcement',
  'view announcement',
  'crud news',
  'view news',
];

const navItems = async (permissions) => {
  let items = [
    {
      name: 'Beranda',
      icon: <OutlineIcon.Home className="h-6"/>,
      href: '/'
    },  
  ];

  await permissions.forEach(permission => {
    if (permission.name === 'recap user') items.push({
      name: 'Rekap Pengguna',
      icon: <OutlineIcon.UserGroup className="h-6"/>,
      href: '/recap-user'
    });

    if (permission.name === 'edit permission') items.push({
      name: 'Edit Hak Akses',
      icon: <SolidIcon.PencilAlt className="h-6"/>,
      href: '/edit-access-rights' 
    });

    if (permission.name === 'crud question bank') items.push({
      name: 'Bank Soal',
      icon:  <OutlineIcon.Document className="h-6"/>,
      href: '/question-bank'
    });

    if (permission.name === 'register') items.push({
      name: 'Tambahkan Pengguna',
      icon: <OutlineIcon.UserAdd className="h-6"/>,
      href: '/add-user'
    });

    if ((permission.name === 'crud student attendance' || permission.name === 'recap student attendance') && !findNavItemsByName(items, 'Kehadiran Siswa')) items.push({
      name: 'Kehadiran Siswa',
      icon:  <OutlineIcon.ClipboardList className="h-6"/>,
      href: '/student-attendance'
    });

    if (permission.name === 'crud chapter') items.push({
      name: 'Bab',
      icon:  <OutlineIcon.Collection className="h-6"/>,
      href: '/chapters'
    });

    if (permission.name === 'crud learning materials') items.push({
      name: 'Materi Pembelajaran',
      icon:  <OutlineIcon.DocumentText className="h-6"/>,
      href: '/learning-materials'
    });

    if ((permission.name === 'crud exam' || permission.name === 'exam') && !findNavItemsByName(items, 'Ujian')) items.push({
      name: 'Ujian',
      icon:  <OutlineIcon.Puzzle className="h-6"/>,
      href: '/exams'
    });

    if (permission.name === 'crud score') items.push({
      name: 'Penilaian',
      icon:  <OutlineIcon.Tag className="h-6"/>,
      href: '/assessment'
    });

    if (permission.name === 'crud attitude assessment') items.push({
      name: 'Penilaian Sikap',
      icon:  <OutlineIcon.ClipboardCheck className="h-6"/>,
      href: '/attitude-assessment'
    });

    if ((permission.name === 'crud announcement' || permission.name === 'view announcement') && !findNavItemsByName(items, 'Pengumuman')) {
      items = [
        ...items, 
        {
          name: 'Pengumuman',
          icon:  <OutlineIcon.Speakerphone className="h-6"/>,
          href: findPermissionByName(permissions, 'crud announcement') && !findPermissionByName(permissions, 'view announcement') ? '/announcement/management' : '/announcement'
        }
      ];
        
    }
    
    if ((permission.name === 'crud news' || permission.name === 'view news') && !findNavItemsByName(items, 'Berita')) {
      items = [
        ...items, 
        {
          name: 'Berita',
          icon: <OutlineIcon.Newspaper className="h-6"/>,
          href: '/news'
        }
      ];
    };
  });
  // items = items.filter(onlyUnique);
  
  return items;
}

export default navItems;

export const all = [
  {
    name: 'Beranda',
    icon: <OutlineIcon.Home className="h-6"/>,
    href: '/'
  },  
];

// export const admin = [
//   ...all,
//   {
//     name: 'Tambahkan Pengguna',
//     icon: <OutlineIcon.UserAdd className="h-6"/>,
//     href: '/add-user'
//   },
//   {
//     name: 'Rekap Pengguna',
//     icon: <OutlineIcon.UserGroup className="h-6"/>,
//     href: '/recap-user'
//   },
//   {
//     name: 'Edit Hak Akses',
//     icon: <SolidIcon.PencilAlt className="h-6"/>,
//     href: '/edit-access-rights' 
//   },
// ];

// export const teacher = [
//   ...all,
//   {
//     name: 'Kehadiran Siswa',
//     icon:  <OutlineIcon.ClipboardList className="h-6"/>,
//     href: '/student-attendance'
//   },
//   {
//     name: 'Materi Pembelajaran',
//     icon:  <OutlineIcon.DocumentText className="h-6"/>,
//     href: '/learning-materials'
//   },
//   {
//     name: 'Bab',
//     icon:  <OutlineIcon.Collection className="h-6"/>,
//     href: '/chapters'
//   },
//   {
//     name: 'Ujian',
//     icon:  <OutlineIcon.Puzzle className="h-6"/>,
//     href: '/exams'
//   },
//   {
//     name: 'Bank Soal',
//     icon:  <OutlineIcon.Document className="h-6"/>,
//     href: '/questions-bank'
//   },
//   {
//     name: 'Penilaian Sikap',
//     icon:  <OutlineIcon.ClipboardCheck className="h-6"/>,
//     href: '/attitude-assessment'
//   },
// ];

// export const guardianOfStudent = [
//   ...all,
//   {
//     name: 'Kehadiran Siswa',
//     icon:  <OutlineIcon.ClipboardList className="h-6"/>,
//     href: '/student-attendance'
//   },
// ];

// export const student = [
//   ...all,
//   {
//     name: 'Kehadiran Siswa',
//     icon:  <OutlineIcon.ClipboardList className="h-6"/>,
//     href: '/student-attendance'
//   },
//   {
//     name: 'Ujian',
//     icon: <OutlineIcon.Puzzle className="h-6"/>,
//     href: '/exams'
//   },
// ];

// export const headmaster = [
//   ...all,
//   {
//     name: 'Rekap Pengguna',
//     icon: <OutlineIcon.UserGroup className="h-6"/>,
//     href: '/recap-user'
//   },
// ];
