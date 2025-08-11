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
import Link from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

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
  const emailOk = [
    "qhibat@gmail.com",
    "ari.isnadi@greenfieldsdairy.com",
    "rifai.santoso@greenfieldsdairy.com",
    "marjhyX@gmail.com",
  ]; // List of emails allowed to edit

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
              url={"http://10.24.0.155:3000/greentag/list"}
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
    },

    {
      title: "Tag No",
      field: "TagNo",
      editable: "never",
    },
    {
      title: "Issued Date",
      field: "IssuedDate",
      editable: "never",
      type: "date",
    },
    {
      title: "Expected Date",
      field: "ExpectedDate",
      editable: "never",
      type: "date",
    },

    {
      title: "Abnormality Type",
      field: "AbnormalityType",
      editable: "never",
      lookup: {
        Safety: "Safety",
        Quality: "Quality",
        "5S": "5S",
        "Kerusakan Ringan": "Kerusakan Ringan",
        "Kondisi Dasar": "Kondisi Dasar",
        "Sulit Dijangkau SD": "Sulit Dijangkau SD",
        "Sumber Pengotor SP": "Sumber Pengotor SP",
      },
    },

    {
      title: "Observed Area",
      field: "ObservedArea",
      editable: "never",
      // type: "time",
      // dateSetting: { locale: "id-ID" },
    },
    {
      title: "Picture",
      field: "Picture",
      editable: "never",
      render: (rowData) => (
        <>
          {rowData.Picture.split(",").map((url, index) => (
            <div key={index}>
              <Link href={url.trim()}>
                <a target="_blank">Picture {index + 1}</a>
              </Link>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Line",
      field: "Line",
      editable: "never",
      // type: "time",
      // dateSetting: { locale: "id-ID" },
    },
    {
      title: "Machine",
      field: "Machine",
      editable: "never",
    },

    {
      title: "Tagger Name",
      field: "TaggerName",
      editable: "never",
      // lookup: { Snack: "Snack", No: "No" },
    },
    {
      title: "Maintenance Type",
      field: "MaintenanceType",
      editable: "never",
      lookup: {
        "Autonomous Maintenance": "Autonomous Maintenance",
        "Planned Maintenance": "Planned Maintenance",
      },
    },

    {
      title: "Abnormality Description",
      field: "AbnormalityDescription",
      editable: "never",
      render: (rowData) => {
        const words = rowData.AbnormalityDescription.split(" ");
        if (words.length > 6) {
          return words.slice(0, 6).join(" ") + "...";
        }
        return rowData.AbnormalityDescription;
      },

      // editable: "onUpdate",
      // lookup: { Yogurt: "Yogurt", No: "No" },
    },
    {
      title: "Proposed Solution",
      field: "ProposedSolution",
      editable: "never",
      render: (rowData) => {
        const words = rowData.ProposedSolution.split(" ");
        if (words.length > 6) {
          return words.slice(0, 6).join(" ") + "...";
        }
        return rowData.ProposedSolution;
      },

      // editable: "onUpdate",
      // lookup: { Lunch: "Lunch", No: "No" },
    },

    {
      title: "Open / Close",
      field: "info1",
      editable: "never",
      lookup: { Open: "Open", Close: "Close" },
    },
  ]);

  const ArrayBaru = evt.map((rowData) =>
    Object.assign(rowData, {
      day_start: moment(rowData.date_of_reserveS).locale("id").format("dddd"),
      time_start: moment(rowData.date_of_reserveS).locale("id").format("HH:mm"),
      time_end: moment(rowData.date_of_reserveE).locale("id").format("HH:mm"),
      // STD: parseFloat(newData.STD[0]),
    })
  );

  // const [data, setData] = useState(evt);
  const [data, setData] = useState(ArrayBaru);

  const postData = async (id, values) => {
    //data fetch
    // console.log("id", id);
    console.log("values", values);
    //edit
    const res = await fetch(`http://10.24.7.70:8080/editgreenTAG/`, {
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
      `http://10.24.7.70:8080/deletegreenTAG/${deletedId}/`,
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
      console.log(res);
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

      .addRows(exportedData)
      .exportFile();
  };

  useEffect(() => {
    // checkUserLoggedIn();
    const username = getCookie("username");
    const role = getCookie("role");
    // checkAdmin(username, role);
    checkUser(username);
  }, []);

  const handleClickOpen = (rowData) => {
    setSelectedRow(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // console.log("rowData", rowData);
    console.log("selectedRow", selectedRow);
    console.log("selectedRow.id", selectedRow.ID);

    router.push(`edit/${selectedRow.ID}`);
    setOpen(false);
  };

  const handleConfirmX = () => {
    console.log("selectedRow", selectedRow); // Check the entire object structure
    console.log("selectedRow.ID", selectedRow.ID); // Specifically check the ID property

    if (selectedRow && selectedRow.ID) {
      router.push(`edit/${selectedRow.ID}`);
      setOpen(false);
    } else {
      console.error("The ID is undefined.", selectedRow);
      alert("No valid ID available for navigation.");
    }
  };

  return (
    <Layout title="greenTAG List">
      {evt.length === 0 && <h3>No data to show</h3>}
      <MaterialTable
        title="greenTAG List"
        icons={tableIcons}
        columns={columns}
        data={data}
        onRowClick={(event, rowData) => handleClickOpen(rowData)}
        // editable={{
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         const dataUpdate = [...data];
        //         const index = oldData.tableData.id;
        //         console.log("id ", index); //ID OF ARRAY
        //         console.log("olddata", oldData); //ID OF ARRAY
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
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Edit"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin akan mengedit Tag No {selectedRow?.TagNo}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const { token } = parseCookies(req);
  // const res = await fetch(`${API_URL}/events/${id}`);
  const d = new Date();
  let year = d.getFullYear();
  const res = await fetch(`http://10.24.7.70:8080/getgreenTAG/${year}`);
  const evt = await res.json();
  // console.log(evt);

  return {
    props: {
      evt,
      // token,
    },
  };
}
