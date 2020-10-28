import React, { useContext, useState } from 'react';
import request from '../../../helpers/request';
import { StoreContext } from '../../../store/StoreProvider';
import CoursePopup from './CoursePopup';

const CourseDetails = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setCourses } = useContext(StoreContext);
  const { title, id } = props;

  const showPopup = () => {
    setIsPopupOpen(true);
  }

  const hidePopup = e => {
    if (e) {
      e.preventDefault();
    }
    setIsPopupOpen(false);
  }

  const handleDeleteCourse = async () => {
    try {
      const { status } = await request.delete(`/courses/${id}`);

      if (status === 200) {
        setCourses(prevArr => prevArr.filter(course => course.id !== id));
      }

    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <details>
      <summary>{title}</summary>
      <button onClick={showPopup}>Edytuj</button>
      <button onClick={handleDeleteCourse}>Usuń</button>
      <CoursePopup {...props} hidePopup={hidePopup} isPopupOpen={isPopupOpen} />
    </details>
  );
}

export default CourseDetails;