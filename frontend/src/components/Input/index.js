const Input = ({ label, props }) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input type="text" className="form-control" {...props} />
    </div>
  )
}

export default Input
