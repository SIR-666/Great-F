/* eslint-disable react/display-name */

import React, { forwardRef, useEffect, useContext } from "react";
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
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import moment from "moment";
import "moment/locale/id";
import { CsvBuilder } from "filefy";

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
  const { user } = useContext(AuthContext);
  const { useState } = React;
  const router = useRouter();
  // const { user, logout } = useContext(AuthContext);

  const [columns, setColumns] = useState([
    {
      title: "WA",
      render: (d) => {
        const aData = [
          new Date(d.date_of_reserveS),
          new Date(d.date_of_reserveE),
          d.asset_name,
          d.client_name,
          d.asset_type,
          d.client_data,
          d.remarks,
          d.facility,
          d.facility2,
          d.facility3,
          d.facility4,
          d.facility5,
        ];
        return (
          <div>
            <WhatsappShareButton
              url={"http://10.24.0.155:3000/reservation"}
              title={
                "*#Start:* " +
                aData[0] +
                " *#End:* " +
                aData[1] +
                " *#Room:* " +
                aData[2] +
                " *#Requestor:* " +
                aData[3] +
                " *#Agenda:* " +
                aData[4] +
                " *#Remarks:* " +
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
        width: "5%",
      },
    },
    {
      title: "No",
      field: "ID",
      editable: "never",
    },
    {
      title: "Date Start",
      field: "date_of_reserveS",
      editable: "never",
      type: "date",
    },
    {
      title: "Day Start",
      field: "day_start",
      editable: "never",
      // render: (rowData) => {
      //   // console.log(rowData);
      //   return moment(rowData["date_of_reserveS"]).locale("id").format("dddd");
      // },
      // type: "day",
    },
    // {
    //   title: "Date End",
    //   field: "date_of_reserveE",
    //   editable: "never",
    //   type: "date",
    // },
    {
      title: "Agenda",
      field: "client_data",
      editable: "onUpdate",
    },

    {
      title: "Time Start",
      field: "time_start",
      editable: "never",
      type: "time",
      dateSetting: { locale: "id-ID" },
    },
    {
      title: "Time End",
      field: "time_end",
      editable: "never",
      type: "time",
      dateSetting: { locale: "id-ID" },
    },
    {
      title: "No of Guest",
      field: "destination",
      editable: "onUpdate",
    },

    {
      title: "Snack",
      field: "facility3",
      editable: "onUpdate",
      lookup: { Snack: "Snack", No: "No" },
    },
    {
      title: "Milk",
      field: "facility2",
      editable: "onUpdate",
      lookup: { Milk: "Milk", No: "No" },
    },

    {
      title: "Yogurt",
      field: "facility4",
      editable: "onUpdate",
      lookup: { Yogurt: "Yogurt", No: "No" },
    },
    {
      title: "Lunch",
      field: "facility",
      editable: "onUpdate",
      lookup: { Lunch: "Lunch", No: "No" },
    },
    {
      title: "Other",
      field: "facility5",
      editable: "onUpdate",
      lookup: { Other: "Other", No: "No" },
    },
    {
      title: "Requestor",
      field: "client_name",
      editable: "never",
    },

    {
      title: "Remarks",
      field: "remarks",
      editable: "onUpdate",
    },
    {
      title: "Room",
      field: "asset_name",
      editable: "never",
    },
    {
      title: "Cost Center",
      field: "asset_type",
      editable: "onUpdate",
    },
    {
      title: "Date Order",
      field: "datesystem",
      editable: "never",
      type: "date",
    },
    {
      title: "Time Order",
      field: "time_order",
      editable: "never",
      type: "time",
      // dateSetting: { locale: "id-ID" },
    },

    // {
    //   title: "Description",
    //   field: "description",
    //   editable: "onUpdate",
    // },

    // {
    //   title: "Corrective Status",
    //   field: "corrective_status",
    //   editable: "onUpdate",
    //   lookup: { "Close     ": "Close     ", "Open      ": "Open      " },
    // },

    // {
    //   title: "Finding Status",
    //   field: "finding_audit_status",
    //   editable: "onUpdate",
    //   lookup: { "Close     ": "Close     ", "Open      ": "Open      " },
    //   // render: (rowData) => {
    //   //   console.log(rowData);
    //   //   return rowData.finding_audit_status == "Open      " ? (
    //   //     <p style={{ color: "#E87722", fontWeight: "bold" }}>
    //   //       {rowData.finding_audit_status}
    //   //     </p>
    //   //   ) : rowData.finding_audit_status == "Close      " ? (
    //   //     <p style={{ color: "#008240" }}>{rowData.finding_audit_status}</p>
    //   //   ) : (
    //   //     <p style={{ color: "#B0B700", fontWeight: "bold" }}>
    //   //       {rowData.finding_audit_status}
    //   //     </p>
    //   //   );
    //   // },
    // },
  ]);

  // const newArray = Object.assign(evt, {
  //   day_start: moment(evt.date_of_reserveS).locale("id").format("dddd"),
  //   // STD: parseFloat(newData.STD[0]),
  // });

  function convertTo24HourFormat(timeOrder) {
    // Mengonversi string waktu ke objek Date
    const date = new Date(timeOrder);

    // Mendapatkan jam dan menit dalam format 24 jam
    const hours = date.getUTCHours().toString().padStart(2, "0"); // Menggunakan UTC jam
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Menggunakan UTC menit

    // Menggabungkan jam dan menit
    const time24HourFormat = `${hours}:${minutes}`;

    return time24HourFormat;
  }

  const ArrayBaru = evt.map((rowData) =>
    Object.assign(rowData, {
      day_start: moment(rowData.date_of_reserveS).locale("id").format("dddd"),
      time_start: moment(rowData.date_of_reserveS).locale("id").format("HH:mm"),
      time_end: moment(rowData.date_of_reserveE).locale("id").format("HH:mm"),
      // time_order: moment(rowData.datesystem).format("HH:mm"),
      time_order: convertTo24HourFormat(rowData.datesystem),
      // STD: parseFloat(newData.STD[0]),
    })
  );

  // const [data, setData] = useState(evt);
  const [data, setData] = useState(ArrayBaru);

  const postData = async (id, values) => {
    //data fetch
    // console.log("id", id);
    // console.log("values", values);
    //edit
    const res = await fetch(
      `http://10.24.7.70:8080/editRESERVE/${values.asset_name}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        // toast.error("No token included");
        console.log("Data gagal diupdate");
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

  const handleDelete = async (deletedId) => {
    // Simulate http request: return the deleted id

    console.log("deletedId ", deletedId);

    const res = await fetch(
      `http://10.24.7.70:8080/deleteRESERVE/${deletedId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(newArray),
      }
    );
    if (!res.ok) {
      if (res.status === 403 || res.status === 404) {
        alert("data gagal didelete");
        return new Promise((res, rej) => {
          // console.log("event before", event);
          res({
            // ...event,event_id: event.event_id || Math.random(),
            event: [],
          });
          // console.log("event after", event);
        });
        return;
      }
      // console.log(res);
      // // setLoading(false);
      // console.log(res.message);
    } else {
      // const evt = await res.json();
      // router.push(`/`);
      console.log(res);
      // setLoading(false);
      // console.log(res.message);
    }

    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 1000);
    });
  };

  const checkUser = (username) => {
    if (!username) {
      router.push(`/`);
    }
  };

  const checkAdmin = (username, role) => {
    !username || role != 6 ? router.push(`/`) : null;
    // console.log(user);
  };

  const _filefy = require("filefy");

  const exportCsv = (allColumns, allData) => {
    const columns = allColumns.filter(
      (columnDef) =>
        // columnDef.title == "Date Start"
        //   ? null
        //   :  : columnDef.title == "Day Start"
        //   ? null
        columnDef["export"] !== false
    );
    // const exportedData = allData.map((rowData) =>
    //   columns.map((columnDef) => rowData[columnDef.field])
    // );

    const exportedData = allData.map((rowData) =>
      columns.map((columnDef) =>
        columnDef.field == "date_of_reserveS" ||
        columnDef.field == "date_of_reserveE"
          ? //
            moment(rowData[columnDef.field]).locale("id").format("Do MMM YYYY")
          : rowData[columnDef.title] == "Time End"
          ? "anu"
          : rowData[columnDef.field]
      )
    );

    console.log("columns ", columns);
    console.log("allData ", allData);
    console.log("exportedData ", exportedData);
    new _filefy.CsvBuilder(
      "Reservasi Ruangan - " + moment().format("dddd, Do MMM YYYY - hh,mm")
    )
      .setDelimeter(",")
      .setColumns(columns.map((columnDef) => columnDef.title))
      // .setColumns(
      //   columns.map((columnDef) =>
      //     columnDef.title == "Time End" ? null : columnDef.title
      //   )
      // )
      .addRows(exportedData)
      .exportFile();
  };

  // useEffect(() => {
  //   console.log("data ", evt);
  // }, []);

  useEffect(() => {
    // checkUserLoggedIn();
    const username = getCookie("username");
    const role = getCookie("role");
    checkAdmin(username, role);
    // console.log("user", username);
    // console.log("role", role);
    // console.log("all ", getCookies());
  }, []);

  return (
    <Layout title="Room Reservation List">
      {evt.length === 0 && <h3>No data to show</h3>}
      <MaterialTable
        title="Room Reservation List"
        icons={tableIcons}
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                console.log("id ", index); //ID OF ARRAY
                console.log("olddata", oldData); //ID OF ARRAY
                dataUpdate[index] = newData;
                // console.log("newData ID ", newData.ID); //ID database
                // console.log("newData ", newData); //data baru database
                setData([...dataUpdate]);
                postData(newData.ID, newData);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.ID;
                // console.log("tabledata ", oldData); //ID OF ARRAY
                // console.log("index ", index);
                // dataDelete.splice(index, 1);
                const arrayAfterDel = dataDelete.filter(function (letter) {
                  return letter.ID !== index;
                });
                console.log("del data ", arrayAfterDel); //ID database
                // console.log("newData ", ; //data baru database
                setData([...arrayAfterDel]);
                handleDelete(index);
                resolve();
              }, 1000);
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: "#57d450",
            color: "#FFF",
          },
          // exportButton: true,
          // exportMenu: exportCsv,
          exportButton: true,
          exportMenu: [
            {
              label: "Export CSV",
              // exportFunc: (cols, datas) => {
              //   // ExportCsv(cols, datas, "CsvExportFromWEB");
              //   // console.log("cols ", cols);
              //   // console.log("datas ", datas);
              // },
              exportFunc: exportCsv,
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
  const d = new Date();
  let year = d.getFullYear();
  const res = await fetch(`http://10.24.7.70:8080/getRESERVE/${year}`);
  // console.log("res ", res);
  const evt = await res.json();
  // console.log(evt);

  return {
    props: {
      evt,
      // token,
    },
  };
}
