import React, { useState } from 'react'
import { Dropdown, Menu, Typography, Tag, Button, message, Input, Popover } from 'antd'
import { ResizableBox } from 'react-resizable'
// @ts-ignore
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'
// @ts-ignore
import toMaterialStyle from 'material-color-hash'
import './resizable.less'
import DetailsModal from '../DetailsModal'

const convertDurationToDisplay = (h: any) => {
  return `${Math.floor(h)}h:${Math.round((h - Math.floor(h)) * 60 * 5) / 5}m`
}

const DragHandle = sortableHandle(() => <span className="grippy" />)

const createMenu = ({ showDetails, removeElement }: any) => (
  <Menu>
    <Menu.Item key="1" onClick={showDetails}>
      Details
    </Menu.Item>
    <Menu.Item key="1" onClick={removeElement}>
      Delete Item
    </Menu.Item>
  </Menu>
)

const SortableItem = sortableElement(
  ({ value, onResizeStop, timeToWidth, defaultTime, removeElement, showDetails }: any) => {
    const width = timeToWidth(value?.time ?? defaultTime)

    // @ts-ignore
    const bColor = toMaterialStyle(value?.ticket)?.backgroundColor

    return (
      <Dropdown
        overlay={createMenu({
          removeElement: () => removeElement(value?.ticket),
          showDetails: () => showDetails(value?.ticket),
        })}
        trigger={['contextMenu']}
      >
        <ResizableBox
          className="box"
          width={width}
          height={70}
          draggableOpts={{ grid: [12.5] }}
          axis="x"
          onResizeStop={onResizeStop}
          resizeHandles={['w', 'e']}
          handle={(resizeHandle) => (
            <div
              className={`resize-handle ${resizeHandle === 'w' ? 'resize-handle__left' : ''}`}
              style={{ borderColor: bColor }}
            />
          )}
          data-ticket-number={value?.ticket}
        >
          <DragHandle />
          <Typography.Text copyable={{ text: value?.ticket }}>
            <Tag>{convertDurationToDisplay(value?.time ?? defaultTime)}</Tag>
            {value?.ticket}
          </Typography.Text>
          <div>
            {Object.keys(value?.actions || {})?.map((e) => (
              <Tag color="lime" key={e}>
                {e}
              </Tag>
            ))}
          </div>
        </ResizableBox>
      </Dropdown>
    )
  }
)

const SortableContainer = sortableContainer(({ children, maxWidth, innerRef }: any) => {
  return (
    <div style={{ maxWidth }} className="time-control__box" ref={innerRef}>
      {children}
    </div>
  )
})

const CONTROL_WIDTH = 1200
const TOTAL_HOURS = 8

const convertWidthToTime = (width: any, totalWidth: any) => {
  return Math.round((width / totalWidth) * TOTAL_HOURS * 12) / 12
}

const TimeControl = ({ input, meta }: any) => {
  const { value: items } = input

  const getId = () => {
    return `create-popup-input-${input.name.replace('.', '')}`
  }

  const ref: any = React.useRef(null)
  const [ticketDetails, setDetailsTicket] = useState(null)

  const onCloseDetails = () => setDetailsTicket(null)

  const [isVisibleCreateMenu, setIsVisibleCreateMenu]: any = React.useState(null)
  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    input.onChange(arrayMove(items, oldIndex, newIndex))
  }

  const removeElement = (ticket: any) => {
    input.onChange(items?.filter((e: any) => e.ticket !== ticket))
  }

  const addElement = () => {
    const ticket = (document.getElementById(getId()) as any)?.value

    console.log(ticket)
    if (!ticket) {
      message.warning('Enter ticket number')
    } else if (items?.some((e: any) => e.ticket === ticket)) {
      message.warning('This ticket already added')
    } else {
      input.onChange([...items, { ticket, actions: ['added-manually'] }])
      ;(document.getElementById(getId()) as any).value = ''
      setIsVisibleCreateMenu(false)
    }
  }

  const onResizeStop = (length: number) => {
    const widthMap: any = [...(ref.current?.children || [])]?.reduce(
      (acc: any, e) => ({
        ...acc,
        [e.getAttribute('data-ticket-number')]: e?.getBoundingClientRect?.()?.width,
      }),
      {}
    )
    const total = CONTROL_WIDTH - length * 5 - 10
    Object.keys(widthMap).forEach((k) => {
      widthMap[k] = convertWidthToTime(widthMap[k], total)
    })

    input.onChange(
      items.map((e: any, i: any) => ({
        ...e,
        time: widthMap[e.ticket],
      }))
    )
  }

  const timeToWidth = (t: any) => {
    return (t * CONTROL_WIDTH) / TOTAL_HOURS
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%' }}>
        <SortableContainer onSortEnd={onSortEnd} useDragHandle axis="x" maxWidth={`${CONTROL_WIDTH}px`} innerRef={ref}>
          {((items as any[]) || []).map((value, index) => (
            <SortableItem
              key={`item-${value}`}
              index={index}
              value={value}
              removeElement={removeElement}
              showDetails={setDetailsTicket}
              onResizeStop={() => onResizeStop(items?.length)}
              defaultTime={0.5}
              timeToWidth={timeToWidth}
            />
          ))}
        </SortableContainer>
      </div>
      <div style={{ maxWidth: '100px' }}>
        <Popover
          content={
            <form
              onSubmit={(e: any) => {
                e.preventDefault()
                e.stopPropagation()
                addElement()
              }}
            >
              <Input name="task-name" placeholder="GENESIS-222" id={getId()} />
              <Button htmlType="submit">+ add</Button>
            </form>
          }
          title="Enter Task Name"
          trigger="click"
          visible={isVisibleCreateMenu}
          onVisibleChange={setIsVisibleCreateMenu}
        >
          <Button>Add Task</Button>
        </Popover>
      </div>
      {ticketDetails && <DetailsModal ticketNumber={ticketDetails} onClose={onCloseDetails} />}
    </div>
  )
}

export default TimeControl as any
