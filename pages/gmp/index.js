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

export default function DisableFieldEditable({ evt, token }) {
  const { useState } = React;
  const router = useRouter();
  // const { user, logout } = useContext(AuthContext);

  const [columns, setColumns] = useState([
    {
      title: "WA",
      render: (d) => {
        const aData = [
          d.description,
          d.location,
          d.preventive_action,
          d.corrective_action,
          d.pic,
          d.ID,
        ];
        return (
          <div>
            <WhatsappShareButton
              url={"http://10.24.0.155:3000/gmp"}
              title={
                "*#Deskripsi:* " +
                aData[0] +
                " *#Lokasi:* " +
                aData[1] +
                " *#Prev Action:* " +
                aData[2] +
                " *#Cor Action:* " +
                aData[3] +
                " *#Auditor:* " +
                aData[4] +
                " *#ID:* " +
                aData[5]
              }
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        );
      },
      cellStyle: {
        paddingTop: 0,
        paddingLeft: 7,
        width: "10%",
      },
    },
    {
      title: "ID",
      field: "ID",
      editable: "never",
    },
    {
      title: "Date of Audit",
      field: "date_of_audit",
      editable: "never",
      type: "date",
    },
    {
      title: "Due Date of Close",
      field: "due_date_of_close",
      editable: "never",
      type: "date",
    },
    {
      title: "GMP Category",
      field: "gmp_category",
      editable: "never",
    },
    {
      title: "Area",
      field: "location",
      editable: "never",
    },
    // {
    //   title: "Department Area",
    //   field: "department_area",
    //   editable: "never",
    // },
    {
      title: "Auditor",
      field: "pic",
      editable: "never",
    },
    {
      title: "Internal 3rd party",
      field: "internal_3rdparty",
      editable: "never",
    },
    {
      title: "GMP Subcategory",
      field: "gmp_subcategory",
      editable: "never",
    },
    {
      title: "Potential Hazard",
      field: "grading_finding",
      editable: "never",
    },
    {
      title: "Description",
      field: "description",
      editable: "onUpdate",
    },
    {
      title: "Corrective Action",
      field: "corrective_action",
      editable: "onUpdate",
    },
    {
      title: "Corrective Status",
      field: "corrective_status",
      editable: "onUpdate",
      lookup: { "Close     ": "Close     ", "Open      ": "Open      " },
    },
    {
      title: "Preventive Action",
      field: "preventive_action",
      editable: "onUpdate",
    },
    {
      title: "Preventive Status",
      field: "preventive_status",
      editable: "onUpdate",
      lookup: { "Close     ": "Close     ", "Open      ": "Open      " },
    },
    {
      title: "Finding Status",
      field: "finding_audit_status",
      editable: "onUpdate",
      lookup: { "Close     ": "Close     ", "Open      ": "Open      " },
      // render: (rowData) => {
      //   console.log(rowData);
      //   return rowData.finding_audit_status == "Open      " ? (
      //     <p style={{ color: "#E87722", fontWeight: "bold" }}>
      //       {rowData.finding_audit_status}
      //     </p>
      //   ) : rowData.finding_audit_status == "Close      " ? (
      //     <p style={{ color: "#008240" }}>{rowData.finding_audit_status}</p>
      //   ) : (
      //     <p style={{ color: "#B0B700", fontWeight: "bold" }}>
      //       {rowData.finding_audit_status}
      //     </p>
      //   );
      // },
    },
  ]);

  const [data, setData] = useState(evt);

  const rowBackgroundColors = {
    2: "green",
    3: "yellow",
    4: "red",
  };

  const postData = async (id, values) => {
    //data fetch
    // console.log("id", id);
    // console.log("values", values);
    //edit
    const res = await fetch(`http://10.24.7.70:8080/editGMP/${id}`, {
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

  // useEffect(async () => {
  //   const response = await fetch(`http://10.24.7.70:8080/auditbhvy/2022`);
  //   const data = await response.json();
  //   setData(data);
  // }, []);

  return (
    <Layout title="Audit GMP">
      {evt.length === 0 && <h3>No data to show</h3>}
      <MaterialTable
        title="Audit GMP"
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
        editable={{
          // onRowAdd: (newData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       setData([...data, newData]);
          //       resolve();
          //     }, 1000);
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                // console.log("id ", index); //ID OF ARRAY
                dataUpdate[index] = newData;
                // console.log("newData ID ", newData.ID); //ID database
                // console.log("newData ", newData); //data baru database
                setData([...dataUpdate]);
                postData(newData.ID, newData);
                resolve();
              }, 1000);
            }),
          // onRowDelete: (oldData) =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataDelete = [...data];
          //       const index = oldData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setData([...dataDelete]);
          //       resolve();
          //     }, 1000);
          //   }),
        }}
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
    </Layout>
  );
}

export async function getServerSideProps() {
  // const { token } = parseCookies(req);

  // const res = await fetch(`${API_URL}/events/${id}`);
  // http://10.24.7.70:8080/auditbhvy/2022
  const res = await fetch(`http://10.24.7.70:8080/getGMP/2022`);
  const evt = await res.json();

  return {
    props: {
      evt,
      // token,
    },
  };
}
