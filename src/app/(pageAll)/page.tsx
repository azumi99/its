'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(pageAll)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(pageAll)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(pageAll)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(pageAll)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(pageAll)/components/dashboard/ProductPerformance';
import Blog from '@/app/(pageAll)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(pageAll)/components/dashboard/MonthlyEarnings';
import DashboardCard from './components/shared/DashboardCard';

const Dashboard = () => {
  
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
      
      <DashboardCard title="Welcome">
        </DashboardCard>
       
        {/* <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid> */}
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
