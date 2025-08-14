/* eslint-disable react/display-name */

import React, { forwardRef, useEffect } from "react";
import { parseCookies } from "@/helpers/index";
// import MaterialTable from "material-table";
import MaterialTable from "@material-table/core";
import { ThemeProvider, createTheme } from "@mui/material";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Layout from "@/components/LayoutLarge";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import { WhatsappShareButton, WhatsappIcon } from "next-share";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { yellow } from "@mui/material/colors";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function DisableFieldEditable({ evt, evt2, token, evt3, evt4 }) {
  const { useState } = React;
  const router = useRouter();
  // const { user, logout } = useContext(AuthContext);

  const speb = 82;
  const spec = 82;
  const sped = 87;
  const spee = 90;

  const opeb = 53;
  const opec = 39;
  const oped = 48;
  const opee = 56;

  const [columns, setColumns] = useState([
    {
      title: "Minggu",
      field: "Minggu",
      editable: "never",
    },

    {
      title: "PE Line B",
      field: "peb",
      editable: "never",

      cellStyle: (data, rowData) => {
        // console.log({ data, rowData });
        return data >= speb
          ? {
              backgroundColor: "#FFFFFF",
            }
          : {
              backgroundColor: "yellow",
            };
      },
    },
    {
      title: "PE Line C",
      field: "pec",
      editable: "never",

      cellStyle: (data, rowData) => {
        // console.log({ data, rowData });
        return data >= spec
          ? {
              backgroundColor: "#FFFFFF",
            }
          : {
              backgroundColor: "yellow",
            };
      },
    },
    {
      title: "PE Line D",
      field: "ped",
      editable: "never",

      cellStyle: (data, rowData) => {
        // console.log({ data, rowData });
        return data >= sped
          ? {
              backgroundColor: "#FFFFFF",
            }
          : {
              backgroundColor: "yellow",
            };
      },
    },
    {
      title: "PE Line E",
      field: "pee",
      editable: "never",

      cellStyle: (data, rowData) => {
        // console.log({ data, rowData });
        return data >= spee
          ? {
              backgroundColor: "#FFFFFF",
            }
          : {
              backgroundColor: "yellow",
            };
      },
    },
  ]);

  const [columns2, setColumns2] = useState([
    {
      title: "Minggu",
      field: "Minggu",
      editable: "never",
    },

    {
      title: "OEE Line B",
      field: "oeb",
      editable: "never",

      cellStyle: (data, rowData) => {
        // console.log({ data, rowData });
        return data >= opeb
          ? {
              backgroundColor: "#FFFFFF",
            }
          : {
              backgroundColor: "yellow",
            };
      },
    },
    {
      title: "OEE Line C",
      field: "oec",
      editable: "never",

      cellStyle: (data, rowData) => {
        // console.log({ data, rowData });
        return data >= opec
          ? {
              backgroundColor: "#FFFFFF",
            }
          : {
              backgroundColor: "yellow",
            };
      },
    },
    {
      title: "OEE Line D",
      field: "oed",
      editable: "never",

      cellStyle: (data, rowData) => {
        // console.log({ data, rowData });
        return data >= oped
          ? {
              backgroundColor: "#FFFFFF",
            }
          : {
              backgroundColor: "yellow",
            };
      },
    },
    {
      title: "OEE Line E",
      field: "oee",
      editable: "never",

      cellStyle: (data, rowData) => {
        // console.log({ data, rowData });
        return data >= opee
          ? {
              backgroundColor: "#FFFFFF",
            }
          : {
              backgroundColor: "yellow",
            };
      },
    },
  ]);

  const [data, setData] = useState(evt);
  const [data2, setData2] = useState(evt2);

  const warna = () => {
    // console.log(data);
    //lakukan pengolahan data
    //  { Minggu: 'STD', peb: 82, pec: 82, ped: 87, pee: 90 },
    //  jika ada data pe* yang berurutan 1x < 82 (std) kuning
    //  jika ada data pe* yang berurutan 2x < 82 (std) kuning
    //  jika ada data pe* yang berurutan 3x < 82 (std) merah
  };
  // const [data, setData] = useState(evt);

  const rowBackgroundColors = {
    2: "green",
    3: "yellow",
    4: "red",
  };

  const postData = async (id, values) => {
    //data fetch
    // console.log("id", id);
    // console.log("values", values);
    const res = await fetch(`http://10.24.7.70:8080/ab/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        // toast.error("No token included");
        console.log("No token included");
        return;
      }
      console.log(res);
      // console.log(res.message);
    } else {
      // const evt = await res.json();
      // router.push(`/`);
      console.log("Done");
    }
    //data fetch end
  };

  useEffect(async () => {
    // const response = await fetch(`http://10.24.7.70:8080/auditbhvy/2022`);
    // const data = await response.json();
    // setData(data);
    warna();
  }, []);

  return (
    <Layout title="Moo News">
      <>
        {evt.length === 0 && <h3>No data to show</h3>}
        <MaterialTable
          title="None"
          // actions={[
          //   {
          //     icon: tableIcons.Delete,
          //     tooltip: "Delete User",
          //     onClick: (event, rowData) =>
          //       alert("You want to delete " + rowData.name),
          //   },
          //   {
          //     icon: tableIcons.Add,
          //     tooltip: "Add User",
          //     isFreeAction: true,
          //     onClick: (event) => alert("You want to add a new row"),
          //   },
          // ]}
          icons={tableIcons}
          columns={columns}
          data={data}
          // editable={{
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         const dataUpdate = [...data];
          //         const index = oldData.tableData.id;
          //         // console.log("id ", index); //ID OF ARRAY
          //         dataUpdate[index] = newData;
          //         // console.log("newData ID ", newData.ID); //ID database
          //         // console.log("newData ", newData); //data baru database
          //         setData([...dataUpdate]);
          //         postData(newData.ID, newData);
          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          options={{
            headerStyle: {
              backgroundColor: "#57d450",
              color: "#FFF",
            },
            // exportButton: true,
            exportMenu: [
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, "CsvExportFromWEB"),
              },
            ],
            sorting: true,
            filtering: true,
            sorting: true,
            paging: true,
            pageSize: 10, // make initial page size
            emptyRowsWhenPaging: false, // To avoid of having empty rows
            pageSizeOptions: [10, 20, 30, 50, 100, 500, 10000], // rows selection options
            rowStyle: (rowData) => ({
              backgroundColor:
                rowData.tableData.finding_audit_status === "Open"
                  ? "#EEE"
                  : "#FFF",
            }),
            // exportButton: true,
            // rowStyle: (rowData) => {
            //   // console.log(rowData);
            //   if (rowData.finding_audit_status == "Open") {
            //     return { backgroundColor: rowBackgroundColors[4] ?? "#fff" };
            //   } else {
            //     return { backgroundColor: rowBackgroundColors[0] ?? "#fff" };
            //   }

            // return {
            //   // fontFamily: "Mulish-Regular",
            //   // backgroundColor: rowBackgroundColors[rowData.finding_audit_status] ?? "#fff",
            //   // backgroundColor: rowBackgroundColors[0] ?? "#fff",
            // };
            //},
          }}
        />
      </>

      <>
        {evt.length === 0 && <h3>No data to show</h3>}
        <MaterialTable
          title="None"
          // actions={[
          //   {
          //     icon: tableIcons.Delete,
          //     tooltip: "Delete User",
          //     onClick: (event, rowData) =>
          //       alert("You want to delete " + rowData.name),
          //   },
          //   {
          //     icon: tableIcons.Add,
          //     tooltip: "Add User",
          //     isFreeAction: true,
          //     onClick: (event) => alert("You want to add a new row"),
          //   },
          // ]}
          icons={tableIcons}
          columns={columns2}
          data={data2}
          // editable={{
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         const dataUpdate = [...data];
          //         const index = oldData.tableData.id;
          //         // console.log("id ", index); //ID OF ARRAY
          //         dataUpdate[index] = newData;
          //         // console.log("newData ID ", newData.ID); //ID database
          //         // console.log("newData ", newData); //data baru database
          //         setData([...dataUpdate]);
          //         postData(newData.ID, newData);
          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          options={{
            headerStyle: {
              backgroundColor: "#57d450",
              color: "#FFF",
            },
            // exportButton: true,
            exportMenu: [
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, "CsvExportFromWEB"),
              },
            ],
            sorting: true,
            filtering: true,
            sorting: true,
            paging: true,
            pageSize: 10, // make initial page size
            emptyRowsWhenPaging: false, // To avoid of having empty rows
            pageSizeOptions: [10, 20, 30, 50, 100, 500, 10000], // rows selection options
            rowStyle: (rowData) => ({
              backgroundColor:
                rowData.tableData.finding_audit_status === "Open"
                  ? "#EEE"
                  : "#FFF",
            }),
            // exportButton: true,
            // rowStyle: (rowData) => {
            //   // console.log(rowData);
            //   if (rowData.finding_audit_status == "Open") {
            //     return { backgroundColor: rowBackgroundColors[4] ?? "#fff" };
            //   } else {
            //     return { backgroundColor: rowBackgroundColors[0] ?? "#fff" };
            //   }

            // return {
            //   // fontFamily: "Mulish-Regular",
            //   // backgroundColor: rowBackgroundColors[rowData.finding_audit_status] ?? "#fff",
            //   // backgroundColor: rowBackgroundColors[0] ?? "#fff",
            // };
            //},
          }}
        />
      </>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const { token } = parseCookies(req);

  // const res = await fetch(`${API_URL}/events/${id}`);
  // http://10.24.7.70:8080/auditbhvy/2022
  const d = new Date();
  let year = d.getFullYear();

  let lineB = [];
  let newFormat = [];

  const speb = 82;
  const spec = 82;
  const sped = 87;
  const spee = 90;

  const soeb = 53;
  const soec = 39;
  const soed = 48;
  const soee = 56;

  const res = await fetch(`http://10.24.7.70:8080/PSGgetLossFilM/${year}`);
  const evt = await res.json();
  var std = { Minggu: "STD", peb: speb, pec: spec, ped: sped, pee: spee };

  const res2 = await fetch(`http://10.24.7.70:8080/OSGgetLossFilM/${year}`);
  const evt2 = await res2.json();
  var std2 = { Minggu: "STD", oeb: soeb, oec: soec, oed: soed, oee: soee };

  // let evt2 = evt.map((ev) => {
  //   let properties = {
  //     Minggu: ev.Minggu,
  //     peb: ev.peb,
  //     pec: ev.pec,
  //     ped: ev.ped,
  //     pee: ev.pee,
  //   };
  //   return properties;
  // });
  const evt3 = evt.unshift(std);
  const evt4 = evt2.unshift(std2);

  console.log("evt ", evt);
  console.log("evt2 ", evt2);

  return {
    props: {
      // fetchJSON(),
      evt,
      evt3,
      evt2,
      evt4,
      // lineB,
      // token,
    },
  };
}
