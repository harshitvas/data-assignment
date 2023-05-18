import { Data } from "../Model/Data";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  data: Data[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "userId",
    headerName: "User Id",
    width: 80,
    editable: false,
  },
  {
    field: "title",
    headerName: "TItle",
    width: 200,
    editable: false,
  },
  {
    field: "body",
    headerName: "Body",
    sortable: false,
    editable: true,
    width: 700,
  },
];

const ShowData = ({ data }: Props) => {
  return (
    <div className="w-full h-fit flex flex-col gap-5 justify-center items-center mt-5">
      <p className="text-2xl md:text-4xl font-bold">Table</p>
      <div className="w-3/4 h-fit">
        <Box
          sx={{ height: 400, width: "100%", border: 2, borderColor: "blue" }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
                },
              },
            }}
            pageSizeOptions={[6]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default ShowData;
