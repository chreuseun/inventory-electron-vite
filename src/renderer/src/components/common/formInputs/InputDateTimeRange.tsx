/* eslint-disable react/prop-types */
import { IDateRangeValue, IDynamicInput } from '@renderer/interfaces/form.interface'
import { showToast } from '@renderer/utils/reactToastify'
import moment from 'moment'
import React, { useState } from 'react'

interface InputDateTimeRangeProps {
  className?: string
  input: IDynamicInput
  onChange: (arg0: IDateRangeValue) => void
  errorMsg?: string
}

type IOnChangeDateHandler = (
  dateType: 'start' | 'end'
) => React.ChangeEventHandler<HTMLInputElement>

const InputDateTimeRange: React.FC<InputDateTimeRangeProps> = ({
  className,
  input,
  onChange,
  errorMsg
}) => {
  const [dateRangeValues, setDateRangeValues] = useState<IDateRangeValue>({
    start: null,
    end: null
  })

  const onChangeDate: IOnChangeDateHandler = (dateType) => (event) => {
    const dateValue = event.target.value

    try {
      if (dateValue === '') {
        setDateRangeValues((prev) => {
          const newPrev = { ...prev }
          return {
            ...newPrev,
            [dateType]: null
          }
        })
      } else {
        const date = moment(dateValue).format('YYYY-MM-DD HH:mm:ss')

        // If start date is greater than end date
        if (dateType === 'start' && !!dateRangeValues.end && date > dateRangeValues.end) {
          showToast({
            type: 'warning',
            message: 'Start Date cannot be After End Date'
          })

          return

          // If End date is less than start date
        } else if (dateType === 'end' && !!dateRangeValues.start && dateRangeValues.start > date) {
          showToast({
            type: 'warning',
            message: 'End Date cannot be Before Start Date'
          })

          return
        } else {
          setDateRangeValues((prev) => {
            const newPrev = { ...prev }

            newPrev[dateType] = date

            onChange(newPrev)

            return {
              ...newPrev
            }
          })

          event.target.blur()
        }
      }
    } catch (dateErr) {
      showToast({
        type: 'warning',
        message: `Date Time Range Error: ${dateErr}`
      })
    }
  }

  const renderDateInputs: (arg0: {
    value: string | null
    onChange: React.ChangeEventHandler<HTMLInputElement>
    id: string
    name: string
    className?: string
    label?: string
    disabled?: boolean
  }) => JSX.Element = ({ value, onChange, id, name, className, label, disabled }) => {
    return (
      <React.Fragment>
        <label htmlFor="startDate" className="text-white text-px9 mb-1">
          {label}
        </label>
        <input
          value={value || ''}
          type="datetime-local"
          id={id}
          name={name}
          onChange={onChange}
          className={`p-1 border border-gray-300 text-black text-px9 ${className}`}
          disabled={disabled}
        />
      </React.Fragment>
    )
  }
  return (
    <div className={`p-2 text-dark mb-1 ${className || ''}`}>
      <div className="text-white text-xs mb-1">{input.label}</div>
      <div className="flex gap-2">
        <div className="flex flex-col">
          {renderDateInputs({
            label: 'Start Date-Time',
            onChange: onChangeDate('start'),
            value: dateRangeValues.start,
            id: 'startDate',
            name: 'startDate'
          })}
        </div>
        <div className="flex flex-col">
          {renderDateInputs({
            label: 'End Date-Time',
            onChange: onChangeDate('end'),
            value: dateRangeValues.end,
            id: 'endDate',
            name: 'endDate',
            disabled: !dateRangeValues.start
          })}
        </div>
      </div>
      {errorMsg ? <div className="text-error text-xs">{errorMsg}</div> : null}
    </div>
  )
}

export default InputDateTimeRange
