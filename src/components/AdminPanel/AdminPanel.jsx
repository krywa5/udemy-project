import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../../store/StoreProvider';
import CourseDetails from './subcomponents/CourseDetails';
import CoursePopup from './subcomponents/CoursePopup';



const style = bemCssModules();



const AdminPanel = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { courses } = useContext(StoreContext);

  const showPopup = () => {
    setIsPopupOpen(true);
  }

  const hidePopup = e => {
    if (e) {
      e.preventDefault();
    }
    setIsPopupOpen(false);
  }

  const coursesElements = courses.map(course => <CourseDetails key={course.id} {...course} />);

  return (
    <section>
      {coursesElements}
      <button onClick={showPopup}>Dodaj nowy kurs</button>
      <CoursePopup isPopupOpen={isPopupOpen} hidePopup={hidePopup} isEditMode={false} />
    </section>
  );
}

export default AdminPanel;