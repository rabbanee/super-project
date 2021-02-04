import * as Icon from '@elements/Icon';

export const _all = [
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

export const _admin = [
  ..._all,
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

export const _teacher = [
  ..._all,
  {
    name: 'Kehadiran Siswa',
    icon:  <Icon.ClipboardList className="h-6"/>,
    href: '/student-attendance'
  }
];

export const _student = [
  ..._all,
  {
    name: 'Ujian',
    icon: <Icon.ClipboardList  className="h-6"/>,
    href: '/exam'
  },
];

export const _headmaster = [
  ..._all,
  {
    name: 'Rekap Pengguna',
    icon: <Icon.UserGroup className="h-6"/>,
    href: '/recap-user'
  },
];
