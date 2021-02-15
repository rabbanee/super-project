import * as SolidIcon from '@elements/icon/Solid';
import * as OutlineIcon from '@elements/icon/Outline';

export const all = [
  {
    name: 'Beranda',
    icon: <OutlineIcon.Home className="h-6"/>,
    href: '/'
  },  
  {
    name: 'Berita',
    icon: <OutlineIcon.Newspaper className="h-6"/>,
    href: '/news'
  },
  {
    name: 'Pengumuman',
    icon:  <OutlineIcon.Speakerphone className="h-6"/>,
    href: '/announcement'
  },
];

export const admin = [
  ...all,
  {
    name: 'Tambahkan Pengguna',
    icon: <OutlineIcon.UserAdd className="h-6"/>,
    href: '/add-user'
  },
  {
    name: 'Rekap Pengguna',
    icon: <OutlineIcon.UserGroup className="h-6"/>,
    href: '/recap-user'
  },
  {
    name: 'Edit Hak Akses',
    icon: <SolidIcon.PencilAlt className="h-6"/>,
    href: '/s' 
  },
];

export const teacher = [
  ...all,
  {
    name: 'Kehadiran Siswa',
    icon:  <OutlineIcon.ClipboardList className="h-6"/>,
    href: '/student-attendance'
  },
  {
    name: 'Materi Pembelajaran',
    icon:  <OutlineIcon.Collection className="h-6"/>,
    href: '/learning-materials'
  },
];

export const student = [
  ...all,
  {
    name: 'Ujian',
    icon: <OutlineIcon.ClipboardList  className="h-6"/>,
    href: '/exam'
  },
];

export const headmaster = [
  ...all,
  {
    name: 'Rekap Pengguna',
    icon: <OutlineIcon.UserGroup className="h-6"/>,
    href: '/recap-user'
  },
];
