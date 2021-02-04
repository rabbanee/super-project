import ActiveLink from '@modules/ActiveLink';
import { useEffect, useState } from 'react';
import { isAdmin } from '@utils/roles/isAdmin';
import { isTeacher } from '@utils/roles/isTeacher';
import { isStudent} from '@utils/roles/isStudent';
import { isHeadmaster} from '@utils/roles/isHeadmaster';
import { _all, _admin, _teacher, _student, _headmaster } from '@data/nav-items';

const List = (props: any) => {
  const { role } = props;
  const [items, setItems] = useState(_all);
  
  useEffect(() => {
    if (isAdmin(role)) setItems(_admin);

    if (isTeacher(role)) setItems(_teacher);

    if (isStudent(role)) setItems(_student);

    if (isHeadmaster(role)) setItems(_headmaster);
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