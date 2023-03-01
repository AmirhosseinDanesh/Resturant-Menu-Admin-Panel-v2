import React, { useEffect, useState } from 'react'
import ErrorBox from "../../Components/ErrorBox/ErrorBox"
import Data from '../../Data/Data';
import DetailModals from '../../Components/DetailModals/DetailModals';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import EditModal from "../../Components/EditModal/EditModal"
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'
import "./Comments.css"
export default function Comments() {
  const [comments, setComments] = useState([])
  const [productComment, setProductComment] = useState("")

  const [iShowdetailModal, setIShowdetailModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  const [isShowDeclineModal, setIsShowDeclineModal] = useState(false)
  const [commentID, setCommentID] = useState(null)
  const [commentBody, setCommentBody] = useState(null)

  const closeDetailModal = () => setIShowdetailModal(false)
  const closeDeleteModal = () => setIsShowDeleteModal(false)
  const closeEditModal = () => setIsShowEditModal(false)
  const closeAcceptModal = () => setIsShowAcceptModal(false)
  const closeDeclineModal = () => setIsShowDeclineModal(false)


  const getAllComment = () => {
    fetch(`${Data.url}/comments/`)
      .then(res => res.json())
      .then(data => setComments(data))
  }

  const deleteComment = () => {
    fetch(`${Data.url}/comments/${commentID}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => getAllComment())
    closeDeleteModal()
  }

  const updateComment = () => {

    const commentNewinfo = {
      body: commentBody
    }
    fetch(`${Data.url}/comments/${commentID}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(commentNewinfo)
    }).then(res => res.json())
      .then(result => {
        closeEditModal()
        getAllComment()
      })
    closeEditModal()
  }


  const acceptModal = () => {
    fetch(`${Data.url}/comments/accept/${commentID}`, { method: "POST" })
      .then(res => res.json())
      .then(data => getAllComment())
    closeAcceptModal()
  }
  const declineModal = () => {
    fetch(`${Data.url}/comments/reject/${commentID}`, { method: "POST" })
      .then(res => res.json())
      .then(data => getAllComment())
    closeDeclineModal()
  }




  useEffect(() => {
    getAllComment()
  }, [])
  return (
    <>
      <Sidebar />
      <div className="main d-flex flex-column m-1 p-3 p-md-4 ">
        <Header />
        <div className="">

          {
            comments.length ? (
              <div className='mt-3 '>
                <div className="table-responsive">
                  <table className="table  text-center">
                    <thead>
                      <tr>
                        <th className='fw-bold'>اسم کاربر</th>
                        <th className='fw-bold'>محصول</th>
                        <th className='fw-bold'>کامنت</th>
                        <th className='fw-bold'>تاریخ</th>
                        <th className='fw-bold'>ساعت</th>
                        <th className='fw-bold'>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        comments.map(cm => (
                          <tr key={cm.id} style={{ verticalAlign: "middle" }}>
                            <td>
                              {cm.userID}
                            </td>
                            <td>
                              {cm.productID}
                            </td>
                            <td>
                              <button className='btn btn-info text-white' onClick={() => {
                                setIShowdetailModal(true)
                                setProductComment(cm.body)
                              }}>
                                باز کردن
                              </button>
                            </td>
                            <td>
                              {cm.date}
                            </td>
                            <td>
                              {cm.hour}
                            </td>
                            <td>
                              <div className='d-flex justify-content-center'>
                                <button className="btn text-white ms-2 btn-sm btn-danger" onClick={() => {
                                  setIsShowDeleteModal(true)
                                  setCommentID(cm.id)
                                }}>حذف</button>
                                <button className="btn text-white ms-2 btn-sm btn-primary" onClick={() => {
                                  setIsShowEditModal(true)
                                  setCommentBody(cm.body)
                                  setCommentID(cm.id)
                                }}>ویرایش</button>
                                {
                                  cm.isAccept === 1 ? (
                                    <button className="btn text-white ms-2 btn-sm btn-danger" onClick={() => {
                                      setCommentID(cm.id)
                                      setIsShowDeclineModal(true)
                                    }}>کنسل</button>
                                  ) : (
                                    <button className="btn text-white ms-2 btn-sm btn-success" onClick={() => {
                                      setCommentID(cm.id)
                                      setIsShowAcceptModal(true)
                                    }}>تایید</button>
                                  )
                                }
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <ErrorBox msg="هیچ کامنتی یافت نشد!" />
            )
          }

        </div>
      </div>

      {
        iShowdetailModal && <DetailModals onHide={closeDetailModal} >

          <p>{productComment}</p>

        </DetailModals>
      }
      {
        isShowDeleteModal && <DeleteModal cancel={closeDeleteModal} submit={deleteComment} title={"آیا از حذف کامنت اطمینان دارید؟"} />
      }
      {
        isShowEditModal && <EditModal onHide={closeEditModal} submit={updateComment}>

          <div className="form-group col-12 p-1">
            <textarea className="form-control" placeholder="ویرایش کامنت" value={commentBody} onChange={(event) => {
              setCommentBody(event.target.value)
            }} ></textarea>
          </div>

        </EditModal>
      }
      {
        isShowAcceptModal && <DeleteModal cancel={closeAcceptModal} submit={acceptModal} title={"آیا از تایید کامنت اطمینان دارید؟"} />
      }
      {
        isShowDeclineModal && <DeleteModal cancel={closeDeclineModal} submit={declineModal} title={"آیا از قبول نکردن کامنت اطمینان دارید؟"} />
      }
    </>
  );
}
