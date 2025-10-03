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
import { ExportCsv } from "@material-table/exporters";
import Styles from "@/styles/mooNews.module.css";
import { API_URL3 as API_BASE } from "@/config/index";

// Dynamic import MaterialTable (aman untuk Next.js)
const MaterialTable = dynamic(() => import("@material-table/core"), {
  ssr: false,
});

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

function ImageCell({ filename, altText }) {
  if (!filename) return <span style={{ color: "#aaa" }}>No Image</span>;
  let src = "";
  if (typeof filename === "string") {
    if (filename.startsWith("http")) {
      src = filename;
    } else {
      src = `${API_BASE}/${filename}`;
    }
  } else {
    return <span style={{ color: "#aaa" }}>No Image</span>;
  }
  return (
    <img
      src={src}
      alt={altText}
      style={{ maxWidth: 80, maxHeight: 80, borderRadius: 6 }}
    />
  );
}

export default function MooNewsList({ news }) {
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

  // Kolom desktop
  const desktopColumns = [
    {
      title: "ID",
      field: "NewsID",
      editable: "never",
      cellStyle: { minWidth: 80 },
    },
    {
      title: "Volume",
      field: "Volume",
      editable: "never",
      cellStyle: { minWidth: 140 },
    },
    {
      title: "Images",
      field: "Images",
      editable: "never",
      render: (rowData) => {
        return (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(rowData.Images || []).map((img, idx) => (
              <ImageCell
                key={idx}
                filename={img.ImageUrl}
                altText={`Image ${idx + 1}`}
              />
            ))}
          </div>
        );
      },
      cellStyle: { minWidth: 160, textAlign: "center" },
    },
    {
      title: "Created At",
      field: "created_at",
      editable: "never",
      type: "datetime",
      cellStyle: { minWidth: 140 },
    },
  ];

  // Kolom mobile (ringkas)
  const mobileColumns = [
    {
      title: "Volume",
      field: "Volume",
      editable: "never",
      cellStyle: { minWidth: 90 },
    },
    {
      title: "Images",
      field: "Images",
      editable: "never",
      render: (rowData) => {
        return (
          <div style={{ display: "flex", gap: 4 }}>
            {(rowData.Images || []).slice(0, 1).map((img, idx) => (
              <ImageCell
                key={idx}
                filename={img.ImageUrl}
                altText={`Image ${idx + 1}`}
              />
            ))}
          </div>
        );
      },
      cellStyle: { minWidth: 80, textAlign: "center" },
    },
  ];

  const columns = isMobile ? mobileColumns : desktopColumns;
  // Sort agar yang terbaru di atas (created_at descending)
  const data = useMemo(() => {
    if (!Array.isArray(news)) return [];
    return [...news].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [news]);

  return (
    <Layout title="Moo News List">
      <h2
        style={{
          fontSize: isMobile ? 25 : 20,
          fontWeight: 700,
          textAlign: "center",
          color: "#334155",
        }}
        className={Styles.mooNewsMobile}
      >
        Moo News
      </h2>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", overflowX: "auto", overflowY: "auto" }}>
          <MaterialTable
            title={
              <span
                style={{
                  fontSize: isMobile ? 16 : 36,
                  fontWeight: 700,
                  color: "#334155",
                }}
                className={Styles.desktopMenu}
              >
                Moo News
              </span>
            }
            icons={tableIcons}
            columns={columns}
            data={data}
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit News",
                onClick: (_event, rowData) => {
                  const id = Array.isArray(rowData)
                    ? rowData[0]?.NewsID
                    : rowData?.NewsID;
                  if (id) router.push(`/mooNews/edit?id=${id}`);
                },
              },
            ]}
            detailPanel={[
              {
                tooltip: "Show details",
                icon: tableIcons.DetailPanel,
                openIcon: tableIcons.DetailPanel,
                render: (rd) => {
                  const row = rd && rd.rowData ? rd.rowData : rd;
                  return (
                    <div
                      style={{
                        padding: 16,
                        background: "#F8FAFC",
                        borderTop: "1px solid #E2E8F0",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr",
                          gap: 12,
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 16 }}>
                          Detail News #{row.NewsID}
                        </div>
                        <FieldRow label="Volume" value={row.Volume} />
                        <FieldRow label="Created At" value={row.created_at} />
                        <div style={{ fontWeight: 700, color: "#334155" }}>
                          Images
                        </div>
                        <div
                          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                        >
                          {(row.Images || []).map((img, idx) => (
                            <ImageCell
                              key={idx}
                              filename={img.ImageUrl || img}
                              altText={`Image ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                },
              },
            ]}
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
              rowStyle: {
                fontSize: isMobile ? 12 : 14,
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "visible",
              },
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
                : [10, 20, 30, 50, 100, 500],
              draggable: !isMobile,
              maxBodyHeight: isMobile ? "62vh" : "68vh",
              minBodyHeight: isMobile ? "62vh" : "68vh",
              showDetailPanelIcon: true,
              exportMenu: [
                {
                  label: "Export CSV",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "MooNews"),
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
    const res = await fetch(`${API_BASE}/news`);
    const response = await res.json();

    let news;
    if (response && response.success && Array.isArray(response.data)) {
      news = response.data;
    } else if (Array.isArray(response)) {
      news = response;
    } else {
      console.error("Unknown API response structure:", response);
      news = [];
    }

    return { props: { news } };
  } catch (error) {
    console.error("Error fetching Moo News:", error);
    return { props: { news: [] } };
  }
}
