import React, { useEffect, useState } from 'react'
import { Modal, Skeleton } from 'antd'
import axios from '../../api/axios'

export default function DetailsModal({ onClose, ticketNumber }: any) {
  const [details, setData] = useState(null as any)
  useEffect(() => {
    axios.get(`/reports/issue-details/${ticketNumber}`).then(({ data }: any) => {
      setData(data)
    })
    // ticketNumber
  }, [])

  return (
    <Modal title={`Ticket: ${ticketNumber}`} visible onOk={onClose} onCancel={onClose}>
      {details ? (
        <>
          <h2>{details?.summary}</h2>
          <p>{details?.description}</p>
        </>
      ) : (
        <Skeleton loading />
      )}
    </Modal>
  )
}
