import React, { useState } from 'react';
import { useActionData } from 'react-router-dom';
import EditServiceForm from './EditServiceForm.jsx';
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiMiniXMark } from "react-icons/hi2";

const ServiceItem = ({ data, setServices }) => {
  const [ editMode, setEditMode ] = useState(false);
  const [ showDeleteOptions, setShowDeleteOptions ] = useState(false);

  const toEditMode = () => {
    setEditMode(true);
  };

  const toViewMode = () => {
    setEditMode(false)
  };

  const formateDate = (date) => {
    const dateArr = date.split('-');
    dateArr[0] = dateArr[0].substring(2);
    const newDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
    return newDate;
  };

  const date = formateDate(data.date);

  const handleDeleteService = async (e) => {
    e.preventDefault();

    const res = await axios.delete(`/api/delete-service/${data.id}`);

    if (res.data.success) {
      const res = await axios.get('/api/maintenance');

      if (res.data.success) {
        setServices(res.data.maintData);
      };
    };
  };

  return (
    <li>
      <div className='card-container flex justify-between'>
        <div>
          <p>Part: {data.part.name}</p>
          <p>Build: {data.part.builds[0]?.name || 'none'}</p>
          <p>Date: {date}</p>
          {data.notes && <p>Notes: {data.notes}</p>}
        </div>
        <div className='flex items-start gap-2'>
          <button onClick={toEditMode}><MdModeEdit className='primary-icon-gray' /></button>
          <button onClick={() => setShowDeleteOptions(true)}><MdDelete className='primary-icon-red' /></button>
        </div>
      </div>

      {showDeleteOptions &&
        <>
          <div className="overlay" />
          <div className="modal">
            <div id='modal-x-container' className='modal-x-container'>
              <button onClick={() => setShowDeleteOptions(false)}>
                <HiMiniXMark className='modal-x-icon' />
              </button>
            </div>
            <div className="modal-title-container">
              <h2>Delete service for <i>{data.part.name}</i> on {date}</h2>
              <p className='text-sm'>This action can't be undone.</p>
            </div>
            <form className="modal-form" onSubmit={handleDeleteService}>
              <div className="modal-bottom-btns-container">
                <button
                  className='btn-cancel'
                  type='button' 
                  onClick={() => setShowDeleteOptions(false)}
                >
                  Cancel
                </button>
                <button
                  className='btn-delete'
                  type="submit"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </>
      }

      {editMode &&
        <>
          <div className="overlay" />
          <div className='modal'>
            <div className='modal-x-container'>
              <button onClick={toViewMode}>
                <HiMiniXMark className='modal-x-icon' />
              </button>
            </div>

            <div className="modal-title-container">
              <h2>Edit Service</h2>
            </div>

            <EditServiceForm
              toViewMode={toViewMode}
              data={data}
              setServices={setServices}
            />
          </div>
        </>
      }
    </li>
  )
};

export default ServiceItem;