import { auth } from '@/auth'
import React from 'react'

const Dashboard = async({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params
  return (
    <div>{id}</div>
  )
}

export default Dashboard