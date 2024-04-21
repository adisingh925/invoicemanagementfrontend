import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function Datagrid(props) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="ms-5 mt-10 me-5 mb-5">
        <DataGrid
          getRowId={(row) => row.membership_id || row.id}
          rows={props.rows}
          columns={props.columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          processRowUpdate={props.handleRowUpdate}
          onRowSelectionModelChange={props.handleSelectionModelChange}
        />
      </Box>
    </ThemeProvider>
  );
}
