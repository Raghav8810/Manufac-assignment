
import { Container, Title, Space } from '@mantine/core';
import DataTable from '../components/DataTable';
import {BarData} from '../components/BarData';
const Index = () => {
      const Heading = {
        bg: '#ff5733', 
        mt: 'md',
      };
      
    
  return (
    <Container  size="lg" py="xl" >
    <Title order={1} ta="center" mb="xl" {...Heading}>
      Indian Agriculture Data Visualization
    </Title>
    
    <Title order={2} size="h3" mb="md">
      All Crop Production by Year
    </Title>
    <DataTable />
    
    <Space h="xl" />
    
    <Title order={2} size="h3" mb="md">
      Average Crop Yields
    </Title>
   <BarData/>
  </Container>
  )
}

export default Index
