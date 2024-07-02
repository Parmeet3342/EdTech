import React, { useState } from 'react'

export const Upload = ({
    name,
    lable,
    register,
    setValue,
    errors,
    editData = null
}) => {

    const [previewSource,setPreviewSource] = useState(editData ? editData:"");
  return (
    <div>

    </div>
  )
}
