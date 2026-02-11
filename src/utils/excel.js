import * as XLSX from 'xlsx'

export function saveProfileToExcel(data) {
    // If data is just a single profile, wrap it in an array
    const records = Array.isArray(data) ? data : [data]

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(records)

    // Create a workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "FarmerData")

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "farmer_profile.xlsx")
}
