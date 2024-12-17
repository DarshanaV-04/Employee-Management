// src/EmployeeForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './EmployeeForm.css'

const EmployeeForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      employeeId: '',
      email: '',
      phone: '',
      department: '',
      dateOfJoining: '',
      role: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      employeeId: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .required('Employee ID is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit number')
        .required('Phone number is required'),
      department: Yup.string().required('Department is required'),
      dateOfJoining: Yup.date()
        .max(new Date(), 'Cannot select a future date')
        .required('Date of joining is required'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>
      
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="employeeId"
          {...formik.getFieldProps('employeeId')}
        />
        {formik.touched.employeeId && formik.errors.employeeId ? <div>{formik.errors.employeeId}</div> : null}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          {...formik.getFieldProps('phone')}
        />
        {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
      </div>

      <div>
        <label>Department:</label>
        <select
          name="department"
          {...formik.getFieldProps('department')}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
        {formik.touched.department && formik.errors.department ? <div>{formik.errors.department}</div> : null}
      </div>

      <div>
        <label>Date of Joining:</label>
        <input
          type="date"
          name="dateOfJoining"
          {...formik.getFieldProps('dateOfJoining')}
        />
        {formik.touched.dateOfJoining && formik.errors.dateOfJoining ? <div>{formik.errors.dateOfJoining}</div> : null}
      </div>

      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          {...formik.getFieldProps('role')}
        />
        {formik.touched.role && formik.errors.role ? <div>{formik.errors.role}</div> : null}
      </div>

      <button type="submit">Submit</button>
      <button type="reset" onClick={formik.handleReset}>Reset</button>
    </form>
  );
};

export default EmployeeForm;
