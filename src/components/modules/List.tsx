import * as Icon from '@elements/Icon';
import ActiveLink from '@modules/ActiveLink';
import { useEffect, useState } from 'react';
import { isAdmin } from '@utils/roles/isAdmin';
import { isTeacher } from '@utils/roles/isTeacher';
import { isGuardianOfStudent } from '@utils/roles/isGuardianOfStudent';

const _all = [
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
    {
      name: 'Ujian',
      icon: <Icon.ClipboardList  className="h-6"/>,
      href: '/exam'
    },
];

const _admin = [
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
  {
    name: 'Pengumuman',
    icon:  <Icon.Speakerphone className="h-6"/>,
    href: '/announcement'
  }
];

const _teacher = [
  ..._all,
  {
    name: 'Kehadiran Siswa',
    icon:  <Icon.ClipboardList className="h-6"/>,
    href: '/student-attendance'
  }
];

const _walisantri = [
  ..._all,
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

const List = (props: any) => {
  const { role } = props;
  const [items, setItems] = useState(_all);
  
  useEffect(() => {
    if (isAdmin(role)) {
      setItems(_admin);
    }

    if (isTeacher(role)) {
      setItems(_teacher);
    }

    if (isGuardianOfStudent(role)) {
      setItems(_walisantri);
    }

  }, []);

  return (
    <ul className="w-full pt-2">
     {
      items.map((item, index) => {
      return <li className="w-full" key={index}>
        <ActiveLink href={item.href} activeClassName="bg-primary-light text-gray-50">
          <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
            {item.icon}
            <span className="text-lg flex items-center">{item.name}</span>
          </a>
        </ActiveLink>
      </li>
      })
    }
    </ul>
  );
};

export default List;