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
    href: '/edit-access-rights' 
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
    icon:  <OutlineIcon.DocumentText className="h-6"/>,
    href: '/learning-materials'
  },
  {
    name: 'Bab',
    icon:  <OutlineIcon.Collection className="h-6"/>,
    href: '/chapters'
  },
  {
    name: 'Ujian',
    icon:  <OutlineIcon.Puzzle className="h-6"/>,
    href: '/exams'
  },
  {
    name: 'Bank Soal',
    icon:  <OutlineIcon.Document className="h-6"/>,
    href: '/questions-bank'
  },
  {
    name: 'Penilaian Sikap',
    icon:  <OutlineIcon.ClipboardCheck className="h-6"/>,
    href: '/attitude-assessment'
  },
];

export const guardianOfStudent = [
  ...all,
  {
    name: 'Kehadiran Siswa',
    icon:  <OutlineIcon.ClipboardList className="h-6"/>,
    href: '/student-attendance'
  },
];

export const student = [
  ...all,
  {
    name: 'Kehadiran Siswa',
    icon:  <OutlineIcon.ClipboardList className="h-6"/>,
    href: '/student-attendance'
  },
  {
    name: 'Ujian',
    icon: <OutlineIcon.Puzzle className="h-6"/>,
    href: '/exams'
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
