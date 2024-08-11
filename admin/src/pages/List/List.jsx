import React, { useState, useEffect } from 'react'
import "./List.css"
import axios from "axios"
import { toast } from "react-toastify"

const List = ({ url }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error("Error fetching food list")
      }
    } catch (error) {
      toast.error("Error fetching food list")
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList() // Refresh the list after removal
      } else {
        toast.error("Error removing food item")
      }
    } catch (error) {
      toast.error("Error removing food item")
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
