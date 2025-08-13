/* eslint-disable react/display-name */

import React, { forwardRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { ThemeProvider, createTheme, useMediaQuery, Box } from "@mui/material";
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
import { useRouter } from "next/router";
import { WhatsappShareButton, WhatsappIcon } from "next-share";
import { ExportCsv } from "@material-table/exporters";
import { ImageCell } from "@/utils/imageHelpers";
import Styles from "@/styles/Header.module.css";

// Dynamic import MaterialTable (aman untuk Next.js)
const MaterialTable = dynamic(() => import("@material-table/core"), { ssr: false });

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// Helper kecil untuk row di panel detail
function FieldRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <div style={{ minWidth: 160, color: "#334155", fontWeight: 600 }}>{label}</div>
      <div style={{ color: "#0f172a", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {value ?? "-"}
      </div>
    </div>
  );
}

export default function DisableFieldEditable({ evt }) {
  const router = useRouter();
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

  // --------------------------
  // Kolom lengkap (desktop)
  // --------------------------
  const desktopColumns = [
    // {
    //   title: "WA",
    //   render: (d) => (
    //     <WhatsappShareButton
    //       url={"http://10.24.0.155:3000/auditBehaviours"}
    //       title={`*#Deskripsi:* ${d.description} *#Lokasi:* ${d.location} *#Prev Action:* ${d.preventive_action} *#Cor Action:* ${d.corrective_action} *#Auditor:* ${d.pic} *#ID:* ${d.ID}`}
    //       separator=":: "
    //     >
    //       <WhatsappIcon size={28} round />
    //     </WhatsappShareButton>
    //   ),
    //   cellStyle: { paddingTop: 0, paddingLeft: 6, width: 68, textAlign: "center" },
    //   sorting: false,
    //   filtering: false,
    //   searchable: false,
    // },
    { title: "ID", field: "ID", editable: "never", cellStyle: { minWidth: 80 } },
    { title: "Date of Audit", field: "date_of_audit", editable: "never", type: "date", cellStyle: { minWidth: 140 } },
    { title: "Due Date of Close", field: "due_date_of_close", editable: "never", type: "date", cellStyle: { minWidth: 160 } },
    { title: "Safety Category", field: "safety_category", editable: "never", cellStyle: { minWidth: 160 } },
    { title: "Area", field: "location", editable: "never", cellStyle: { minWidth: 160 } },
    { title: "Department Area", field: "department_area", editable: "never", cellStyle: { minWidth: 180 } },
    { title: "Auditor", field: "pic", editable: "never", cellStyle: { minWidth: 140 } },
    { title: "Internal 3rd party", field: "internal_3rdparty", editable: "never", cellStyle: { minWidth: 180 } },
    { title: "Behaviour Category", field: "behaviour_category", editable: "never", cellStyle: { minWidth: 180 } },
    // { title: "Description", field: "description", editable: "never", cellStyle: { minWidth: 580 } },
    {
      title: "Photo Before",
      field: "photo_before",
      editable: "never",
      render: (rowData) => (
        <div style={{ maxWidth: 120, margin: "0 auto" }}>
          <ImageCell filename={rowData.photo_before} altText="Photo Before" />
        </div>
      ),
      cellStyle: { minWidth: 140, textAlign: "center" },
    },
    {
      title: "Photo After",
      field: "photo_after",
      editable: "never",
      render: (rowData) => (
        <div style={{ maxWidth: 120, margin: "0 auto" }}>
          <ImageCell filename={rowData.photo_after} altText="Photo After" />
        </div>
      ),
      cellStyle: { minWidth: 140, textAlign: "center" },
    },
    // { title: "Corrective Action", field: "corrective_action", editable: "never", cellStyle: { minWidth: 260 } },
    // { title: "Corrective Status", field: "corrective_status", editable: "never", cellStyle: { minWidth: 160 } },
    // { title: "Preventive Action", field: "preventive_action", editable: "never", cellStyle: { minWidth: 260 } },
    // { title: "Preventive Status", field: "preventive_status", editable: "never", cellStyle: { minWidth: 160 } },
    {
      title: "Finding Status",
      field: "finding_audit_status",
      editable: "never",
      render: (row) => {
        const v = (row.finding_audit_status || "").trim();
        const color = v === "Open" ? "#E87722" : v === "Close" ? "#008240" : "#B0B700";
        return <span style={{ color, fontWeight: 700 }}>{row.finding_audit_status}</span>;
      },
      cellStyle: { minWidth: 160 },
    },
  ];

  // --------------------------
  // Kolom ringkas khusus HP
  // (hanya 4 kolom diminta)
  // --------------------------
  const mobileColumns = [
    { title: "Date of Audit", field: "date_of_audit", editable: "never", type: "date", cellStyle: { minWidth: 110 } },
    { title: "Area", field: "location", editable: "never", cellStyle: { minWidth: 90 } },
    {
      title: "Behaviour Category",
      field: "behaviour_category",
      editable: "never",
      cellStyle: { minWidth: 160, whiteSpace: "normal", wordBreak: "break-word", overflow: "visible" },
    },
    {
      title: "Finding Status",
      field: "finding_audit_status",
      editable: "never",
      render: (row) => {
        const v = (row.finding_audit_status || "").trim();
        const color = v === "Open" ? "#E87722" : v === "Close" ? "#008240" : "#B0B700";
        return <span style={{ color, fontWeight: 700 }}>{row.finding_audit_status}</span>;
      },
      cellStyle: { minWidth: 140 },
    },
  ];

  const columns = isMobile ? mobileColumns : desktopColumns;
  const data = useMemo(() => (Array.isArray(evt) ? evt : []), [evt]);

  return (
    <Layout title="Audit Behavior">
      {/* Title hanya muncul di HP */}
            <h2 style={{ fontSize: isMobile ? 25 : 20, fontWeight: 700, textAlign: "center", color: "#334155" }} className={Styles.auditmobile}>
              Audit Behavior
            </h2>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", overflowX: "auto", overflowY: "auto" }}>
          <MaterialTable
            title={
              <span
                style={{ fontSize: isMobile ? 16 : 36, fontWeight: 700, color: "#334155" }} 
                className={Styles.desktopMenu}
              >
                Audit Behavior
              </span>
            }
            icons={tableIcons}
            columns={columns}
            data={data}
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit Record",
                onClick: (_event, rowData) => {
                  const id = Array.isArray(rowData) ? rowData[0]?.ID : rowData?.ID;
                  if (id) router.push(`/auditBehaviours/edit?id=${id}`);
                },
              },
            ]}
            // DETAIL PANEL: semua field + foto besar tetap bisa dilihat di HP
            detailPanel={[
              {
                tooltip: 'Show details',
                icon: tableIcons.DetailPanel,
                openIcon: tableIcons.DetailPanel,
                render: (rd) => {
                  // ⬅️ rd bisa {rowData:{...}} atau langsung {...} tergantung versi
                  const row = rd && rd.rowData ? rd.rowData : rd;

                  // (opsional) format tanggal biar enak dibaca
                  const fmt = (d) =>
                    d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

                  const v = (row.finding_audit_status || '').trim();
                  const chipColor = v === 'Open' ? '#E87722' : v === 'Close' ? '#008240' : '#B0B700';

                  return (
                    <div style={{ padding: 16, background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>Detail Audit #{row.ID}</div>
                          <span
                            style={{
                              background: chipColor,
                              color: '#fff',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 999,
                              fontSize: 12,
                            }}
                          >
                            {row.finding_audit_status}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 12, display: 'grid', gap: 8 }}>
                            <FieldRow label="Date of Audit" value={fmt(row.date_of_audit)} />
                            <FieldRow label="Due Date of Close" value={fmt(row.due_date_of_close)} />
                            <FieldRow label="Safety Category" value={row.safety_category} />
                            <FieldRow label="Behaviour Category" value={row.behaviour_category} />
                            <FieldRow label="Area" value={row.location} />
                            <FieldRow label="Department Area" value={row.department_area} />
                            <FieldRow label="Auditor" value={row.pic} />
                            <FieldRow label="Internal 3rd party" value={row.internal_3rdparty} />
                            <FieldRow label="Description" value={row.description} />
                            <FieldRow label="Corrective Action" value={row.corrective_action} />
                            <FieldRow label="Corrective Status" value={row.corrective_status} />
                            <FieldRow label="Preventive Action" value={row.preventive_action} />
                            <FieldRow label="Preventive Status" value={row.preventive_status} />
                          </div>

                          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 12, display: 'grid', gap: 12 }}>
                            <div style={{ fontWeight: 700, color: '#334155' }}>Photos</div>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                              <div style={{ border: '1px dashed #CBD5E1', borderRadius: 8, padding: 8, textAlign: 'center', background: '#F9FAFB' }}>
                                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>Before</div>
                                <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                                  <ImageCell filename={row.photo_before} altText="Photo Before" />
                                </div>
                              </div>
                              <div style={{ border: '1px dashed #CBD5E1', borderRadius: 8, padding: 8, textAlign: 'center', background: '#F9FAFB' }}>
                                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>After</div>
                                <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                                  <ImageCell filename={row.photo_after} altText="Photo After" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <WhatsappShareButton
                            url={'http://10.24.0.155:3000/auditBehaviours'}
                            title={`*#Deskripsi:* ${row.description} *#Lokasi:* ${row.location} *#Prev Action:* ${row.preventive_action} *#Cor Action:* ${row.corrective_action} *#Auditor:* ${row.pic} *#ID:* ${row.ID}`}
                            separator=":: "
                          >
                            <WhatsappIcon size={28} round />
                          </WhatsappShareButton>
                        </div>
                      </div>
                    </div>
                  );
                },
              },
            ]}

            // klik baris untuk toggle panel (biar UX enak)
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
                backgroundColor:
                  (rowData?.finding_audit_status || "").trim() === "Open" ? "#F7F7F7" : "#FFF",
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
              filtering: !isMobile, // matikan filter di HP agar ringan
              sorting: true,
              search: true,
              paging: true,
              padding: isMobile ? "dense" : "normal",
              pageSize: isMobile ? 5 : 10,
              emptyRowsWhenPaging: false,
              pageSizeOptions: isMobile ? [5, 10, 20] : [10, 20, 30, 50, 100],
              draggable: !isMobile,
              maxBodyHeight: isMobile ? "62vh" : "68vh",
              minBodyHeight: isMobile ? "62vh" : "68vh",
              showDetailPanelIcon: true,
              exportMenu: [
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) => ExportCsv(cols, datas, "AuditBehaviour"),
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
    const res = await fetch(`http://10.24.0.155:3030/api/audit-behaviours`);
    const response = await res.json();

    let evt;
    if (response && response.success && Array.isArray(response.data)) {
      evt = response.data;
    } else if (Array.isArray(response)) {
      evt = response;
    } else {
      console.error("Unknown API response structure:", response);
      evt = [];
    }

    return { props: { evt } };
  } catch (error) {
    console.error("Error fetching Audit Behaviors:", error);
    return { props: { evt: [] } };
  }
}
