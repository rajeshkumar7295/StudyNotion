import React from 'react'
import { useState, useEffect } from 'react'
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsApi'
import IconBtn from '../../common/IconBtn';
import CoursesTable from './InstructorCourses/CoursesTable'
const MyCourses = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const { token } = useSelector((state) => state.auth)
  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
        console.log('result...........', result);

      }
    }
    fetchCourses()
  }, [])
  return (
    <div>
      <div className='mb-14 flex items-center justify-between'>
        <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {
        courses && <CoursesTable courses={courses} setCourses={setCourses} />
      }
    </div>
  )
}

export default MyCourses
