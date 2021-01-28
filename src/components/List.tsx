import * as Icon from './Icon';
import ActiveLink from './ActiveLink';
import { useEffect, useState } from 'react';

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
      name: 'Lupa Password',
      icon:  <Icon.News className="h-6"/>,
      href: '/forgot-password'
    },
    {
      name: 'Edit Profile',
      icon: <Icon.News className="h-6"/>,
      href: '/edit-profile'
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
    name: 'Register Akun (OTP)',
    icon: <Icon.UserAdd className="h-6"/>,
    href: '/'
  },
  {
    name: 'Lupa Password',
    icon:  <Icon.News className="h-6"/>,
    href: '/forgot-password'
  },
  {
    name: 'Edit Profile',
    icon: <Icon.News className="h-6"/>,
    href: '/edit-profile'
  },
  {
    name: 'Rekap User',
    icon: <Icon.UserAdd className="h-6"/>,
    href: '/'
  },
  {
    name: 'Edit Hak Akses',
 
    href: '/' 
  },
  {
    name: 'CRUD  Pengumuman',
    icon:  <Icon.Speakerphone className="h-6"/>,
    href: '/'
  },
  {
    name: 'Pengumuman',
    icon:  <Icon.Speakerphone className="h-6"/>,
    href: '/'

  }
];



const List = (props: any) => {
  const { role } = props;
  const [items, setItems] = useState(_all);
  
  useEffect(() => {
    if (role === 1) {
      setItems(_admin);
      console.log(items);
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