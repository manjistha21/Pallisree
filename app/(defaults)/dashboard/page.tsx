'use client';
import React from 'react'
import ComponentsDashboardSales from '@/components/dashboard/components-dashboard-sales';
import DefaultLayout from '../layout';
import withAuth from '../components/hoc/withAuth';


const Dashboard = () => {
  return (
    <DefaultLayout>
        <ComponentsDashboardSales/>
    </DefaultLayout>
  )
}

export default withAuth(Dashboard);