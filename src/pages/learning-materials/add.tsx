import { User } from '@interface/User';
import AddOrUpdateLearningMaterials from 'components/templates/learning-materials/AddOrUpdate';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function AddLearningMaterials() {   
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const token = Cookies.get('token');
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    getGrades();
    getSubjects();
    getChapters();
  }, []);

  const getSubjects = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}subjects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      return error;
    }
    setSubjects(response.data);
  };

  const getChapters = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}chapter`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      return error;
    }
    setChapters(response.data);
    console.log(response.data);
  };

  const getGrades = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}grades`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      return error;
    }
    setGrades(response.data);
    // console.log(response.data);
  };

  return(
    <AddOrUpdateLearningMaterials grades={grades} title="Tambash Materi Pembelajaran" user={user} permissions={permissions.list}/>
  );
};

export default WithAuth(AddLearningMaterials, 'crud learning materials');
