import ActiveLink from '@modules/ActiveLink';
import { useEffect, useState } from 'react';
import { isAdmin } from '@utils/roles/isAdmin';
import { isTeacher } from '@utils/roles/isTeacher';
import { isStudent} from '@utils/roles/isStudent';
import { isHeadmaster} from '@utils/roles/isHeadmaster';
import { all, admin, teacher, student, headmaster, guardianOfStudent } from '@data/nav-items';
import { isGuardianOfStudent } from '@utils/roles/isGuardianOfStudent';

const List = (props: any) => {
  const { role } = props;
  const [items, setItems] = useState(all);
  
  useEffect(() => {
    if (isAdmin(role)) setItems(admin);

    if (isTeacher(role)) setItems(teacher);

    if (isStudent(role)) setItems(student);

    if (isHeadmaster(role)) setItems(headmaster);

    if (isGuardianOfStudent(role)) setItems(guardianOfStudent);
  }, [role]);

  return (
    <ul className="w-full pt-2">
     {
      items.map((item, index) => {
      return <li className="w-full" key={index}>
        <ActiveLink href={item.href} activeClassName="bg-primary-light text-gray-50">
          <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
            { item.icon }
            <span className="text-lg flex items-center">{ item.name }</span>
          </a>
        </ActiveLink>
      </li>
      })
    }
    </ul>
  );
};

export default List;