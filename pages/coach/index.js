/* eslint-disable react/display-name */


import React, { forwardRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider, createTheme, useMediaQuery, Box } from "@mui/material";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import Edit from "@material-ui/icons/Edit";
import Layout from "@/components/LayoutLarge";
import { ExportCsv } from "@material-table/exporters";

// Dynamic import MaterialTable (safe for Next.js SSR)
const MaterialTable = dynamic(() => import("@material-table/core"), { ssr: false });



const tableIcons = {
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
};

export default function CoachingTablePage({ data }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const theme = useMemo(
    () =>
      createTheme({
        typography: { fontSize: isMobile ? 12 : 14 },
        components: {
          MuiTableCell: {
            styleOverrides: {
              root: {
                padding: isMobile ? "6px 8px" : "10px 12px",
                lineHeight: 1.35,
                verticalAlign: "top",
              },
              head: { fontWeight: 700 },
            },
          },
        },
      }),
    [isMobile]
  );

  // Kolom desktop
  const desktopColumns = [
    { title: "ID", field: "id", editable: "never", cellStyle: { minWidth: 80 } },
    { title: "Date of Coaching", field: "date_of_coach", type: "date", editable: "never", cellStyle: { minWidth: 140 } },
    { title: "Coach", field: "coach", editable: "never", cellStyle: { minWidth: 160 } },
    { title: "Area Observation", field: "area_observation", editable: "never", cellStyle: { minWidth: 160 } },
    { title: "Result Observation", field: "result_observation", editable: "never", cellStyle: { minWidth: 180 } },
    {
      title: "Coachee",
      field: "employees",
      editable: "never",
      render: (rowData) =>
        Array.isArray(rowData.employees)
          ? rowData.employees.map((emp) => emp.employee_name).join(", ")
          : "",
      cellStyle: { minWidth: 180, whiteSpace: "normal", wordBreak: "break-word", overflow: "visible" },
    },
  ];

  // Kolom mobile
  const mobileColumns = [
    { title: "Date", field: "date_of_coach", type: "date", editable: "never", cellStyle: { minWidth: 110 } },
    { title: "Coach", field: "coach", editable: "never", cellStyle: { minWidth: 90 } },
    { title: "Area", field: "area_observation", editable: "never", cellStyle: { minWidth: 90 } },
    {
      title: "Coachee",
      field: "employees",
      editable: "never",
      render: (rowData) =>
        Array.isArray(rowData.employees)
          ? rowData.employees.map((emp) => emp.employee_name).join(", ")
          : "",
      cellStyle: { minWidth: 160, whiteSpace: "normal", wordBreak: "break-word", overflow: "visible" },
    },
  ];

  const columns = isMobile ? mobileColumns : desktopColumns;
  const tableData = Array.isArray(data) ? data : [];

  // Helper kecil untuk row di panel detail
  function FieldRow({ label, value }) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ minWidth: 160, color: "#334155", fontWeight: 600 }}>{label}</div>
        <div style={{ color: "#0f172a", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{value ?? "-"}</div>
      </div>
    );
  }

  // Format tanggal
  const fmt = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-';

  // Detail panel mirip auditBehaviours
  const detailPanel = [
    {
      tooltip: 'Show details',
      render: (rowData) => {
        const row = rowData && rowData.rowData ? rowData.rowData : rowData;
        if (!row || Object.keys(row).length === 0) {
          return (
            <div style={{ padding: 16, background: '#F8FAFC', borderTop: '1px solid #E2E8F0', color: '#b91c1c' }}>
              Data tidak ditemukan.
            </div>
          );
        }
        return (
          <div style={{ padding: 16, background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
              Detail Coaching ID - {row.id ?? '-'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 12, display: 'grid', gap: 8 }}>
                <FieldRow label="Date of Coaching" value={fmt(row.date_of_coach)} />
                <FieldRow label="Coach" value={row.coach} />
                <FieldRow label="Area Observation" value={row.area_observation} />
                <FieldRow label="Result Observation" value={row.result_observation} />
                <FieldRow label="Coachee" value={Array.isArray(row.employees) && row.employees.length > 0 ? row.employees.map(e => e.employee_name ?? '-').join(", ") : '-'} />
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Layout title="Coaching Data">
      {(!tableData || tableData.length === 0) && <h3>No data to show</h3>}
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", overflowX: "auto", overflowY: "auto" }}>
          {isMobile && (
            <div style={{ fontSize: 22, fontWeight: 700, textAlign: "center", color: "#334155", margin: "12px 0 8px 0" }}>
              Coaching Data
            </div>
          )}
          <MaterialTable
            title={isMobile ? "" : "Coaching Data"}
            icons={tableIcons}
            columns={columns}
            data={tableData}
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit Record",
                onClick: (event, rowData) => {
                  // Ganti dengan routing ke halaman edit jika sudah ada
                  // Misal: router.push(`/coach/edit?id=${rowData.id}`)
                  alert(`Edit coaching ID: ${rowData.id}`);
                },
              },
            ]}
            detailPanel={detailPanel}
            onRowClick={(_evt, _row, togglePanel) => togglePanel && togglePanel()}
            options={{
              tableLayout: "fixed",
              headerStyle: {
                backgroundColor: "#57d450",
                color: "#FFF",
                fontSize: isMobile ? 12 : 14,
                whiteSpace: "normal",
                lineHeight: 1.25,
              },
              rowStyle: (rowData) => ({
                backgroundColor: "#FFF",
                fontSize: isMobile ? 12 : 14,
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "visible",
              }),
              cellStyle: {
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "visible",
              },
              filtering: !isMobile,
              sorting: true,
              search: true,
              paging: true,
              padding: isMobile ? "dense" : "normal",
              pageSize: isMobile ? 5 : 10,
              emptyRowsWhenPaging: false,
              pageSizeOptions: isMobile ? [5, 10, 20] : [10, 20, 30, 50, 100, 500, 10000],
              draggable: !isMobile,
              maxBodyHeight: isMobile ? "62vh" : "68vh",
              minBodyHeight: isMobile ? "62vh" : "68vh",
              showDetailPanelIcon: true,
              exportMenu: [
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "CoachingDataExport"),
                },
              ],
            }}
            localization={{ header: { actions: "Actions" } }}
          />
        </Box>
      </ThemeProvider>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`http://localhost:3030/api/coaching`);
    const response = await res.json();
    let data = [];
    if (response.success && Array.isArray(response.data)) {
      data = response.data;
    }
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching coaching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}
//   // console.log(rowData);
