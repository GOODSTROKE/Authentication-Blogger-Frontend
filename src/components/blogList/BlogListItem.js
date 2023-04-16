import React from 'react'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'
import Modal from './../ui/Modal'
import UpdateBlog from './../updateBlog/UpdateBlog'
import DeleteBlog from './../deleteBlog/DeleteBlog'

const BlogListItem = ({ blog }) => {
  const {
    _id,
    title,
    description,
    category,
    banner,
    createdAt,
    user: { name, avatar },
  } = blog

  // Modal Functionalities
  const [editModal, setEditModal] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [id, setid] = React.useState(null)

  const modalCloser = () => {
    setEditModal(false)
    setDeleteModal(false)
  }
  const setModal = (type) => {
    switch (type) {
      case 'edit':
        modalCloser()
        setEditModal(true)
        break
      case 'delete':
        modalCloser()
        setDeleteModal(true)
        break
      default:
        return false
    }
  }

  return (
    <>
      {editModal && (
        <Modal open={editModal} modalHandler={modalCloser}>
          <UpdateBlog id={id} modalHandler={modalCloser} data={blog} />
        </Modal>
      )}
      {deleteModal && (
        <Modal open={deleteModal} modalHandler={modalCloser}>
          <DeleteBlog id={id} modalHandler={modalCloser} />
        </Modal>
      )}
      <div class='card lg:flex-row'>
        <img
          class='h-48 w-full shrink-0 rounded-t-lg bg-cover bg-center object-cover object-center lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l-lg'
          src={banner}
          alt='bannar'
        />
        <div class='flex w-full grow flex-col px-4 py-3 sm:px-5'>
          <div class='flex items-center justify-between'>
            <span class='text-xs+ text-info'>{category}</span>
            <div class='-mr-1.5 flex space-x-0.5'>
              <button
                onClick={() => {
                  setModal('delete')
                  setid(_id)
                }}
                class='btn h-9 w-9 p-0 text-lg text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25'
              >
                <i class='fa-solid fa-trash'></i>
              </button>
              <button
                onClick={() => {
                  setModal('edit')
                  setid(_id)
                }}
                class='btn h-9 w-9 p-0 text-lg text-success hover:bg-success/20 focus:bg-success/20 active:bg-success/25'
              >
                <i class='fa-solid fa-pen-to-square'></i>
              </button>
            </div>
          </div>
          <div>
            <Link
              to={`/?tab=blog_read&id=${_id}`}
              class='text-lg font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light'
            >
              {title}
            </Link>
          </div>
          <p class='mt-1 line-clamp-3'>{description}</p>
          <div class='grow'>
            <div class='mt-2 flex items-center text-xs'>
              <div class='flex items-center space-x-2 hover:text-slate-800 dark:hover:text-navy-100'>
                <div class='avatar h-6 w-6'>
                  <img class='rounded-full' src={avatar} alt='avatar' />
                </div>
                <span class='line-clamp-1'>{name} </span>
              </div>
              <div class='mx-3 my-1 w-px self-stretch bg-slate-200 dark:bg-navy-500'></div>
              <span class='shrink-0 text-slate-400 dark:text-navy-300'>
                {moment(createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div class='mt-1 flex justify-end'>
            <Link
              to={`/?tab=blog_read&id=${_id}`}
              class='btn px-2.5 py-1.5 font-medium text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25'
            >
              READ ARTICLE
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogListItem
