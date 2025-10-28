/* eslint-disable react/display-name */

import React, {
  useContext,
  forwardRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import {
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Box,
  Button,
  Chip,
} from "@mui/material";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import { API_CILT } from "@/config/index";
import Edit from "@material-ui/icons/Edit";
import Layout from "@/components/LayoutLarge";
import { ExportCsv } from "@material-table/exporters";
import { getCookie } from "cookies-next";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";

// Dynamic import MaterialTable (safe for Next.js SSR)
const MaterialTable = dynamic(() => import("@material-table/core"), {
  ssr: false,
});

const tableIcons = {
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
};

export default function CILTApprovalPage({ data }) {
  const { user } = useContext(AuthContext);
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

  // Kolom desktop sesuai response API_CILT
  const desktopColumns = [
    {
      title: "Process Order",
      field: "processOrder",
      editable: "never",
      cellStyle: { minWidth: 220 },
    },
    {
      title: "Package Type",
      field: "packageType",
      editable: "never",
      cellStyle: { minWidth: 160 },
    },
    {
      title: "Plant",
      field: "plant",
      editable: "never",
      cellStyle: { minWidth: 160 },
    },
    {
      title: "Line",
      field: "line",
      editable: "never",
      cellStyle: { minWidth: 120 },
    },
    {
      title: "Date",
      field: "date",
      type: "datetime",
      editable: "never",
      cellStyle: { minWidth: 140 },
    },
    {
      title: "Shift",
      field: "shift",
      editable: "never",
      cellStyle: { minWidth: 100 },
    },
    {
      title: "Product",
      field: "product",
      editable: "never",
      cellStyle: { minWidth: 180 },
    },
    {
      title: "Machine",
      field: "machine",
      editable: "never",
      cellStyle: { minWidth: 120 },
    },
    {
      title: "Status Approval",
      field: "status",
      editable: "never",
      cellStyle: { minWidth: 120 },
      render: (rowData) => {
        const row = rowData.tableData ? rowData : rowData;
        const approvedC = !!(row.approvedCoordinator ?? row.approval_coor);
        const approvedS = !!(row.approvedSupervisor ?? row.approval_spv);
        const chipSx = { whiteSpace: "nowrap", fontWeight: 400 };
        const containerStyle = {
          display: "inline-block",
          minWidth: 140,
          maxWidth: 320,
          overflow: "visible",
          whiteSpace: "nowrap",
        };
        if (approvedC && approvedS) {
          return (
            <div style={containerStyle}>
              <Chip label="Approved" color="success" size="small" sx={chipSx} />
            </div>
          );
        }
        if (approvedC && !approvedS) {
          return (
            <div style={containerStyle}>
              <Chip
                label="Partially Approved"
                color="warning"
                size="small"
                sx={chipSx}
              />
            </div>
          );
        }
        return (
          <Chip label="Pending" color="default" size="small" sx={chipSx} />
        );
      },
    },
    ...(user?.role?.id === 11
      ? [
          {
            title: "Approval by Coordinator",
            field: "approval_coor",
            editable: "never",
            cellStyle: { minWidth: 160 },
            render: (rowData) => {
              const row = rowData.tableData ? rowData : rowData;
              const approvedC = !!(
                row.approvedCoordinator ?? row.approval_coor
              );
              return (
                <input
                  type="button"
                  value={approvedC ? "Approved" : "Approved"}
                  className={
                    approvedC ? "btn2 btn2-secondary" : "btn2 btn2-primary"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(row);
                  }}
                  style={{ cursor: approvedC ? "not-allowed" : "pointer" }}
                  disabled={approvedC}
                />
              );
            },
          },
        ]
      : []),
    ...(user?.role?.id === 9
      ? [
          {
            title: "Approval by Supervisor",
            field: "approval_spv",
            editable: "never",
            cellStyle: { minWidth: 160 },
            render: (rowData) => {
              const row = rowData.tableData ? rowData : rowData;
              const approvedS = !!(row.approvedSupervisor ?? row.approval_spv);
              return (
                <input
                  type="button"
                  value={approvedS ? "Approve" : "Approve"}
                  className={
                    approvedS ? "btn2 btn2-secondary" : "btn2 btn2-primary"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(row);
                  }}
                  disabled={approvedS}
                />
              );
            },
          },
        ]
      : []),
  ];

  // Kolom mobile
  const mobileColumns = [
    {
      title: "Order",
      field: "processOrder",
      editable: "never",
      cellStyle: { minWidth: 120 },
    },
    {
      title: "Type",
      field: "packageType",
      editable: "never",
      cellStyle: { minWidth: 90 },
    },
    {
      title: "Plant",
      field: "plant",
      editable: "never",
      cellStyle: { minWidth: 90 },
    },
    {
      title: "Line",
      field: "line",
      editable: "never",
      cellStyle: { minWidth: 70 },
    },
    {
      title: "Date",
      field: "date",
      type: "datetime",
      editable: "never",
      cellStyle: { minWidth: 90 },
    },
    {
      title: "Shift",
      field: "shift",
      editable: "never",
      cellStyle: { minWidth: 70 },
    },
    {
      title: "Product",
      field: "product",
      editable: "never",
      cellStyle: { minWidth: 120 },
    },
    {
      title: "Machine",
      field: "machine",
      editable: "never",
      cellStyle: { minWidth: 70 },
    },
    {
      title: "Approval",
      field: "machine",
      editable: "never",
      cellStyle: { minWidth: 70 },
    },
  ];

  const columns = isMobile ? mobileColumns : desktopColumns;

  // Use local state so approve buttons can optimistically update UI
  const [tableDataState, setTableDataState] = useState(
    Array.isArray(data) ? data : []
  );

  useEffect(() => {
    setTableDataState(Array.isArray(data) ? data : []);
  }, [data]);

  // Approve handler: derive role from localStorage, confirm, optimistic update and POST to API
  async function handleApprove(item) {
    try {
      // derive username & role from localStorage (client)
      let username = null;
      let roleRaw = null;
      if (typeof window !== "undefined") {
        // try common keys
        const rawUser = getCookie("user");
        const rawUsername = getCookie("username");
        const rawRole = getCookie("role");
        if (rawUsername) username = rawUsername;
        if (rawUser && !username) {
          try {
            const parsed = JSON.parse(rawUser);
            if (parsed?.username) username = parsed.username;
            else if (parsed?.email) username = parsed.email.split("@")[0];
          } catch (e) {
            username = rawUser;
          }
        }
        if (rawRole) roleRaw = rawRole;
        // try to read role from parsed user object
        if (!roleRaw && rawUser) {
          try {
            const parsed = JSON.parse(rawUser);
            if (parsed?.role) roleRaw = parsed.role;
            else if (parsed?.roleId) roleRaw = parsed.roleId;
          } catch (e) {
            // ignore
          }
        }
      }

      const roleNum = roleRaw ? Number(roleRaw) : null;
      const roleLabel =
        roleNum === 11 ? "Coordinator" : roleNum === 9 ? "Supervisor" : "User";

      const confirmed =
        typeof window !== "undefined"
          ? window.confirm(`Approve item ini sebagai ${roleLabel}?`)
          : true;
      if (!confirmed) return;

      // only coordinator(11) or supervisor(9) can approve
      if (roleNum !== 11 && roleNum !== 9) {
        if (typeof window !== "undefined")
          toast.error("Anda tidak memiliki izin untuk approve.");
        return;
      }

      // save previous state for potential rollback
      const prev = tableDataState;

      // optimistic update
      setTableDataState((prevState) =>
        prevState.map((r) => {
          if (r.id !== item.id) return r;
          const updated = { ...r };
          if (roleNum === 11) {
            updated.approvedCoordinator = true;
            updated.approval_coor = true;
          } else if (roleNum === 9) {
            updated.approvedSupervisor = true;
            updated.approval_spv = true;
          }
          return updated;
        })
      );

      // prepare payload and endpoint
      const payload = {
        id: item.id,
        username: username || "",
        role: String(roleNum),
      };
      const endpoint =
        roleNum === 11
          ? `${API_CILT}/cilt/approve-coordinator/` + payload.id
          : `${API_CILT}/cilt/approve-supervisor/` + payload.id;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // rollback optimistic update
        setTableDataState(prev);
        const text = await res.text().catch(() => null);
        if (typeof window !== "undefined")
          window.alert(`Approve gagal: ${res.status} ${text || ""}`);
      }
      // success: nothing else to do (state already updated)
    } catch (err) {
      // rollback on error
      setTableDataState((prev) =>
        prev.map((r) =>
          r.id === item.id
            ? {
                ...r,
                approvedCoordinator: r.approvedCoordinator,
                approvedSupervisor: r.approvedSupervisor,
              }
            : r
        )
      );
      if (typeof window !== "undefined")
        window.alert(err?.message || "Gagal approve");
      console.error("handleApprove error", err);
    }
  }

  // Helper kecil untuk row di panel detail
  function FieldRow({ label, value }) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ minWidth: 160, color: "#334155", fontWeight: 600 }}>
          {label}
        </div>
        <div
          style={{
            color: "#0f172a",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {value ?? "-"}
        </div>
      </div>
    );
  }

  // Format tanggal
  const fmt = (d) =>
    d
      ? new Date(d).toLocaleString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  // Detail panel untuk CILT Approval
  const detailPanel = [
    {
      tooltip: "Show details",
      render: (rowData) => {
        const row = rowData && rowData.rowData ? rowData.rowData : rowData;
        if (!row || Object.keys(row).length === 0) {
          return (
            <div
              style={{
                padding: 16,
                background: "#F8FAFC",
                borderTop: "1px solid #E2E8F0",
                color: "#b91c1c",
              }}
            >
              Data tidak ditemukan.
            </div>
          );
        }
        return (
          <div
            style={{
              padding: 16,
              background: "#F8FAFC",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
              Detail CILT Approval ID - {row.id ?? "-"}
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}
            >
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  padding: 12,
                  display: "grid",
                  gap: 8,
                }}
              >
                <FieldRow label="Process Order" value={row.processOrder} />
                <FieldRow label="Package Type" value={row.packageType} />
                <FieldRow label="Plant" value={row.plant} />
                <FieldRow label="Line" value={row.line} />
                <FieldRow label="Date" value={fmt(row.date)} />
                <FieldRow label="Shift" value={row.shift} />
                <FieldRow label="Product" value={row.product} />
                <FieldRow label="Machine" value={row.machine} />
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Layout title="CILT Approval">
      {(!tableDataState || tableDataState.length === 0) && (
        <h3>No data to show</h3>
      )}
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", overflowX: "auto", overflowY: "auto" }}>
          {isMobile && (
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                textAlign: "center",
                color: "#334155",
                margin: "12px 0 8px 0",
              }}
            >
              CILT Approval
            </div>
          )}
          <MaterialTable
            title={isMobile ? "" : "CILT Approval"}
            icons={tableIcons}
            columns={columns}
            data={tableDataState}
            actions={[]}
            detailPanel={detailPanel}
            onRowClick={(_evt, _row, togglePanel) =>
              togglePanel && togglePanel()
            }
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
              pageSizeOptions: isMobile
                ? [5, 10, 20]
                : [10, 20, 30, 50, 100, 500, 10000],
              draggable: !isMobile,
              maxBodyHeight: isMobile ? "62vh" : "68vh",
              minBodyHeight: isMobile ? "62vh" : "68vh",
              showDetailPanelIcon: true,
              exportMenu: [
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "CILTApprovalExport"),
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

// (old persistApproval removed) approvals are handled directly in handleApprove

export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_CILT}/cilt?status=0`);
    const response = await res.json();
    let data = [];
    if (Array.isArray(response)) {
      data = response;
    }
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
}
