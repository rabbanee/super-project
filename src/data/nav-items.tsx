import * as Icon from '@elements/Icon';

export const all = [
  {
    name: 'Beranda',
    icon: <Icon.Home className="h-6"/>,
    href: '/'
  },  
  {
    name: 'Berita',
    icon: <Icon.News className="h-6"/>,
    href: '/news'
  },
  {
    name: 'Pengumuman',
    icon:  <Icon.Speakerphone className="h-6"/>,
    href: '/announcement'
  },
];

export const admin = [
  ...all,
  {
    name: 'Tambahkan Pengguna',
    icon: <Icon.UserAdd className="h-6"/>,
    href: '/add-user'
  },
  {
    name: 'Rekap Pengguna',
    icon: <Icon.UserGroup className="h-6"/>,
    href: '/recap-user'
  },
  {
    name: 'Edit Hak Akses',
    icon: <Icon.PencilAltSolid className="h-6"/>,
    href: '/s' 
  },
];

export const teacher = [
  ...all,
  {
    name: 'Kehadiran Siswa',
    icon:  <Icon.ClipboardList className="h-6"/>,
    href: '/student-attendance'
  }
];

export const student = [
  ...all,
  {
    name: 'Ujian',
    icon: <Icon.ClipboardList  className="h-6"/>,
    href: '/exam'
  },
];

export const headmaster = [
  ...all,
  {
    name: 'Rekap Pengguna',
    icon: <Icon.UserGroup className="h-6"/>,
    href: '/recap-user'
  },
];
