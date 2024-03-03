import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const columns = [
  { field: "invoice_id", headerName: "Invoice ID", width: 150 },
  { field: "fk_customer_id", headerName: "Customer ID", width: 150 },
  { field: "invoice_number", headerName: "Invoice Number", width: 150 },
  { field: "invoice_date", headerName: "Invoice Date", width: 150 },
  { field: "due_date", headerName: "Due Date", width: 150 },
  { field: "customer_name", headerName: "Customer Name", width: 150 },
  { field: "customer_address", headerName: "Customer Address", width: 200 },
  { field: "customer_city", headerName: "Customer City", width: 150 },
  { field: "customer_state", headerName: "Customer State", width: 150 },
  { field: "customer_zip", headerName: "Customer ZIP", width: 150 },
  { field: "customer_country", headerName: "Customer Country", width: 150 },
  { field: "customer_contact_name", headerName: "Contact Name", width: 150 },
  { field: "customer_contact_email", headerName: "Contact Email", width: 200 },
  { field: "customer_contact_phone", headerName: "Contact Phone", width: 150 },
  { field: "vendor_name", headerName: "Vendor Name", width: 150 },
  { field: "vendor_address", headerName: "Vendor Address", width: 200 },
  { field: "vendor_city", headerName: "Vendor City", width: 150 },
  { field: "vendor_state", headerName: "Vendor State", width: 150 },
  { field: "vendor_zip", headerName: "Vendor ZIP", width: 150 },
  { field: "vendor_country", headerName: "Vendor Country", width: 150 },
  {
    field: "vendor_contact_name",
    headerName: "Vendor Contact Name",
    width: 200,
  },
  {
    field: "vendor_contact_email",
    headerName: "Vendor Contact Email",
    width: 200,
  },
  {
    field: "vendor_contact_phone",
    headerName: "Vendor Contact Phone",
    width: 200,
  },
  { field: "item_description", headerName: "Item Description", width: 200 },
  { field: "item_quantity", headerName: "Item Quantity", width: 150 },
  { field: "unit_price", headerName: "Unit Price", width: 150 },
  { field: "total_amount", headerName: "Total Amount", width: 150 },
  { field: "subtotal", headerName: "Subtotal", width: 150 },
  { field: "tax", headerName: "Tax", width: 150 },
  { field: "tax_rate", headerName: "Tax Rate", width: 150 },
  { field: "discount", headerName: "Discount", width: 150 },
  { field: "discount_rate", headerName: "Discount Rate", width: 150 },
  { field: "shipping_charges", headerName: "Shipping Charges", width: 150 },
  { field: "total_amount_due", headerName: "Total Amount Due", width: 180 },
  { field: "payment_terms", headerName: "Payment Terms", width: 150 },
  { field: "currency", headerName: "Currency", width: 150 },
  { field: "exchange_rate", headerName: "Exchange Rate", width: 150 },
  { field: "payment_method", headerName: "Payment Method", width: 150 },
  { field: "transaction_id", headerName: "Transaction ID", width: 200 },
  { field: "payment_status", headerName: "Payment Status", width: 150 },
  { field: "notes", headerName: "Notes", width: 200 },
  { field: "attachment_path", headerName: "Attachment Path", width: 200 },
  { field: "invoice_type", headerName: "Invoice Type", width: 150 },
  {
    field: "late_payment_charges",
    headerName: "Late Payment Charges",
    width: 200,
  },
  { field: "billing_address", headerName: "Billing Address", width: 200 },
  { field: "billing_city", headerName: "Billing City", width: 150 },
  { field: "billing_state", headerName: "Billing State", width: 150 },
  { field: "billing_zip", headerName: "Billing ZIP", width: 150 },
  { field: "billing_country", headerName: "Billing Country", width: 150 },
  { field: "shipping_address", headerName: "Shipping Address", width: 200 },
  { field: "shipping_city", headerName: "Shipping City", width: 150 },
  { field: "shipping_state", headerName: "Shipping State", width: 150 },
  { field: "shipping_zip", headerName: "Shipping ZIP", width: 150 },
  { field: "shipping_country", headerName: "Shipping Country", width: 150 },
  { field: "create_time", headerName: "Create Time", width: 200 },
  { field: "update_time", headerName: "Update Time", width: 200 },
];

export default function DataTable(props) {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      
    return (
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            margin: "20px",
          }}
        >
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              getRowId={props.getRowId}
              rows={props.rows}
              rowCount={100}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              onPaginationModelChange={(newModel) => {
                props.onPaginationModelChange(newModel);
              }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              checkboxSelection
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }
