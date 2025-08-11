/* eslint-disable react/display-name */

import React, { useState, useEffect, useContext } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { ThemeProvider, createTheme } from "@mui/material";
import moment from "moment";
import Layout from "@/components/LayoutLarge";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CachedIcon from "@mui/icons-material/Cached";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import Image from "next/image";

export default function DisableFieldEditable({ evt }) {
  const { user } = useContext(AuthContext);
  const { useState } = React;
  const router = useRouter();

  const [selectedRow, setSelectedRow] = useState(null);
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    { title: "ID", field: "id", editable: "never" },
    {
      title: "Start Patroli",
      field: "jam_patroli_start",
      editable: "never",
      type: "date",
    },
    {
      title: "Jam Start",
      field: "jam_patroli_start",
      editable: "never",
      type: "time",
      // dateSetting: { locale: "id-ID" },
    },
    {
      title: "End Patroli",
      field: "jam_patroli_end",
      editable: "never",
      type: "date",
    },

    {
      title: "Jam End",
      field: "jam_patroli_end",
      editable: "never",
      type: "time",
      // dateSetting: { locale: "id-ID" },
    },
    { title: "PIC", field: "username", editable: "never" },
    { title: "Shift", field: "shift", editable: "never" },
    { title: "Sesi", field: "jenis", editable: "never" },
    {
      title: "Jumlah temuan Negative",
      field: "temuan_negatif",
      editable: "never",
    },
    {
      title: "Open / Close",
      field: "status",
      editable: "never",
      lookup: { Open: "Open", Close: "Close", Draft: "Draft" },
    },
  ];

  const detailColumnsOLD = [
    { title: "ID", field: "id", editable: "never" },
    { title: "Area", field: "name", editable: "never" },
    {
      title: "Image",
      field: "image",
      editable: "never",

      render: (rowData) => (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image src={rowData.image} alt="image" width={50} height={50} />
        </div>
      ),
    },
    { title: "Remarks", field: "remarks", editable: "never" },
    { title: "Status", field: "status", editable: "never" },
  ];

  const detailColumns = [
    { title: "ID", field: "id", editable: "never" },
    { title: "Area", field: "name", editable: "never" },
    {
      title: "Image",
      field: "image",
      editable: "never",
      render: (rowData) => (
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <a href={rowData.image} target="_blank" rel="noopener noreferrer">
            <Image src={rowData.image} alt="image" width={50} height={50} />
          </a>
        </div>
      ),
    },
    { title: "Remarks", field: "remarks", editable: "never" },
    { title: "Status", field: "status", editable: "never" },
  ];

  const handleRowClick = async (event, rowData) => {
    if (rowData.temuan_negatif > 0) {
      // console.log(rowData);
      console.log(rowData.id);

      try {
        const res = await fetch(
          `http://93.127.172.213:3003/dashboardRecordTemuan?id_recordPatrol=${rowData.id}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setDetails(data);
        setSelectedRow(rowData);
        setOpen(true);
      } catch (error) {
        console.error("Failed to fetch details:", error);
        alert("Failed to fetch details. Please try again later.");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout title="greenSHIELD List">
      <MaterialTable
        title="greenSHIELD Dashboard"
        columns={columns}
        data={evt}
        onRowClick={handleRowClick}
        options={{
          headerStyle: {
            backgroundColor: "#57d450",
            color: "#FFF",
          },
          sorting: true,
          filtering: true,
          paging: true,
          pageSize: 10,
          emptyRowsWhenPaging: false,
          pageSizeOptions: [10, 20, 30, 50, 100],
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "DetailTemuanData"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "DetailTemuanData"),
            },
          ],
        }}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Detail Temuan</DialogTitle>
        <DialogContent>
          <MaterialTable
            title="Detail Temuan"
            columns={detailColumns}
            data={details}
            options={{
              headerStyle: {
                backgroundColor: "#57d450",
                color: "#FFF",
              },
              sorting: true,
              filtering: true,
              paging: true,
              pageSize: 10,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [10, 20, 30, 50, 100],
              exportMenu: [
                {
                  label: "Export PDF",
                  exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "PatrolDashboardData"),
                },
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "PatrolDashboardData"),
                },
              ],
            }}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Close</Button> */}

          <IconButton
            color="primary"
            aria-label="refresh data"
            onClick={handleClose}
          >
            <HighlightOffIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export async function getServerSideProps() {
  const d = new Date();
  let year = d.getFullYear();
  const res = await fetch(
    `http://93.127.172.213:3003/getPatrolDashboard?year=${year}`
  );
  const evt = await res.json();
  return {
    props: {
      evt,
    },
  };
}
