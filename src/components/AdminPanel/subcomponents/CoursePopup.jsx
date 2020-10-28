import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import { default as CoursePopupStyles } from './CoursePopup.module.scss';
import Modal from '../../Modal/Modal';
import { StoreContext } from '../../../store/StoreProvider';
import request from '../../../helpers/request';

const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({
  authors = [],
  hidePopup,
  isEditMode = true,
  isPopupOpen,
  id,
  img = '',
  price = 0,
  title = ''
}) => {

  const [formAuthors, setFormAuthors] = useState(authors);
  const [formAuthor, setFormAuthor] = useState('');
  const [formImg, setFormImg] = useState(img);
  const [formPrice, setFormPrice] = useState(price);
  const [formTitle, setFormTitle] = useState(title);

  const { setCourses } = useContext(StoreContext);

  const handleOnChangeAuthor = e => setFormAuthor(e.target.value);
  const handleOnChangeImg = e => setFormImg(e.target.value);
  const handleOnChangePrice = e => setFormPrice(e.target.value);
  const handleOnChangeTitle = e => setFormTitle(e.target.value);

  const handleOnSubmit = async e => {
    e.preventDefault();

    const courseObject = {
      id,
      authors: formAuthors,
      img: formImg,
      price: Number(formPrice),
      title: formTitle,
    };

    if (isEditMode) {
      const { data, status } = await request.put('/courses', courseObject);

      if (status === 200) {
        setCourses(data.courses);
      }
    } else {
      const { data, status } = await request.post('/courses', courseObject);

      if (status === 201) {
        setCourses(data.courses);
      }
    }
    hidePopup();
  }

  const addAuthor = e => {
    e.preventDefault();

    setFormAuthors(prev => [...prev, formAuthor]);
    setFormAuthor('');
  }

  const deleteAuthor = e => {
    const authorToDelete = e.target.dataset.author;
    setFormAuthors(prev => prev.filter(author => author !== authorToDelete));
  }

  const authorsElements = formAuthors.map(author => (
    <li key={author}>
      <p>{author}</p>
      <button data-author={author} onClick={deleteAuthor}>Usuń</button>
    </li>
  ));

  const correctLabel = isEditMode ? 'Zaktualizuj kurs' : 'Stwórz kurs';

  return (
    <Modal handleOnClose={hidePopup} isOpen={isPopupOpen}>
      <div className={style()}>
        <form className={style('form')} method="submit" onSubmit={handleOnSubmit}>
          <div className={style('form-row')}>
            <label>Autor:
              <input type="text" className={style('input')} value={formAuthor} onChange={handleOnChangeAuthor} />
              <button onClick={addAuthor}>Dodaj autora</button>
            </label>
          </div>
          <div className={style('form-row')}>
            <label>Obrazek url:
              <input type="text" className={style('input')} value={formImg} onChange={handleOnChangeImg} />
            </label>
          </div>
          <div className={style('form-row')}>
            <label>Cena:
              <input type="number" min={0} className={style('input')} value={formPrice} onChange={handleOnChangePrice} />
            </label>
          </div>
          <div className={style('form-row')}>
            <label>Tytuł:
              <input type="text" className={style('input')} value={formTitle} onChange={handleOnChangeTitle} />
            </label>
          </div>
          <button type="submit">{correctLabel}</button>
          <button onClick={hidePopup} type="button">Anuluj</button>
        </form>
        <p>Lista autorów:</p>
        <ul>
          {authorsElements}
        </ul>
      </div>
    </Modal>
  );
}

export default CoursePopup;