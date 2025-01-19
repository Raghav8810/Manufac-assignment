import { Table, ScrollArea } from '@mantine/core';
import { yearlyData } from '../config/AgriculterData';

/**
 * DataTable component renders a table displaying yearly agricultural data.
 * It shows the year, crop with maximum production, and crop with minimum production in table format.
 * 
 * @returns {JSX.Element} A scrollable table containing agricultural data.
 */
const DataTable = () => {
  return (
    <ScrollArea h={400}>
    <Table  highlightOnHover withTableBorder withColumnBorders
    style={{ backgroundColor: '#FDF7F4', border: '2px solid #ccc' }} 
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Maximum Production</Table.Th>
          <Table.Th>Crop with Minimum Production</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {yearlyData.map((row) => (
          <Table.Tr key={row.year}>
            <Table.Td>{row.year}</Table.Td>
            <Table.Td>{row.maxCrop}</Table.Td>
            <Table.Td>{row.minCrop}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </ScrollArea>
  )
}

export default DataTable
