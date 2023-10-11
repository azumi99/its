'use client';
import { Box, Grid, Typography } from '@mui/material';
import PageContainer from '@/app/(pageAll)/components/container/PageContainer';
import DashboardCard from '@/app/(pageAll)/components/shared/DashboardCard';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';


const SamplePage = () => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    
  });
  console.log('test',data);
  return (
    <PageContainer title="Inventory" description="this is Typography">
      <DashboardCard title="Inventory">
          <DataGrid
            {...data}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 100]}
          />
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

