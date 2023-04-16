import React from 'react'

const SelectOption = ({
  options,
  optionTitle,
  optionValue,
  value,
  className = '',
  label,
  ...attributes
}) => {
  return (
    <div className='space-y-1 text-left'>
      {label && (
        <label className='text-sm uppercase font-semibold text-gray-500 ml-2'>
          {' '}
          {label}
        </label>
      )}
      <select className={`input ${className}`} value={value} {...attributes}>
        <option value=''>Select One</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectOption
