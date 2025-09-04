<template>
  <div>Exceljs</div>
</template>
<script setup lang="ts">
import * as ExcelJS from 'exceljs';
import { onMounted } from 'vue';


async function createExcelDemo() {
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  // Add a worksheet
  const worksheet = workbook.addWorksheet('My Demo Sheet');

  // Define columns with headers, keys, and widths
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'City', key: 'city', width: 20 }
  ];

  // Add rows of data
  worksheet.addRow({ id: 1, name: 'Alice Smith', age: 28, city: 'New York' });
  worksheet.addRow({ id: 2, name: 'Bob Johnson', age: 35, city: 'London' });
  worksheet.addRow({ id: 3, name: 'Charlie Brown', age: 22, city: 'Paris' });

  // Add a formula
  worksheet.getCell('B5').value = { formula: 'SUM(C2:C4)', result: 85 }; // Sum of ages

  // Apply some styling
  worksheet.getCell('A1').font = { bold: true, color: { argb: 'FF0000FF' } }; // Blue bold text for header
  worksheet.getCell('B5').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' } // Yellow background for formula cell
  };

  // Write the workbook to a file
  await workbook.xlsx.writeFile('exceljs_demo.xlsx');
  console.log('Excel file "exceljs_demo.xlsx" created successfully!');
}


onMounted(() => {
  createExcelDemo()
});
</script>