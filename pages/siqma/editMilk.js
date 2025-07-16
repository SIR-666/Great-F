/* eslint-disable react/display-name */

import React, { forwardRef, useEffect, useContext } from "react";
import { parseCookies } from "@/helpers/index";
//import MaterialTable from "material-table";
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
import Select from "react-select";
import ASelect from "react-select/async";
import styles from "@/styles/Form.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import CachedIcon from "@mui/icons-material/Cached";

// import Select from "@mui/material/Select";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DisableFieldEditable({ evt, token }) {
  const { useState } = React;
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const { user, logout } = useContext(AuthContext);
  let today = moment().format("YYYYMMDD-H:mm");
  let jam = moment().format("H:mm");
  let today2 = moment().format("YYYY-MM-DD");
  // const date = new Date();
  const [kode, setKode] = useState("");
  const [values, setValues] = useState({
    date_of_inspection: "",
    batch: "",
    date_of_production: "",
    date_of_expired: "",
    nama_produsen: "",
    // quantity: "",
    // remarks: "",
    tipe_material: "",
    nama_material: "",
    idDateData: "",
    footprint: user ? user.email : null, // auto by login
    datesystem: today2,
  });

  const [values2, setValues2] = useState({
    time: " ",
  });
  const [data, setData] = useState([]);

  const optionsTipeMaterial = [
    // { label: "-", value: "-" },
    { label: "UHT", value: "UHT" },
    { label: "ESL", value: "ESL" },
  ];

  const optionsLine = [
    { label: "Line E", value: "Line E", prod: "UHT" },
    { label: "Line F", value: "Line F", prod: "UHT" },
    { label: "Line G", value: "Line G", prod: "UHT" },
    { label: "Line B", value: "Line B", prod: "ESL" },
    { label: "Line C", value: "Line C", prod: "ESL" },
    { label: "Line D", value: "Line D", prod: "ESL" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log("values 1", values);
  };
  const handleInputChangeX = (e) => {
    const { name, value } = e.target;
    setValues2({ ...values, [name]: value });
  };

  //untuk tipe material UHT / ESL
  const handleInputChange2 = (e) => {
    // const { name, value } = e.value;
    setValues({
      ...values,
      tipe_material: e.value,
      // nama_produsen: "",
      // nama_material: "",
    });
    console.log("values", values);
  };

  //line
  const handleInputChange3 = (e) => {
    // const { name, value } = e.value;
    setValues({
      ...values,
      nama_material: e.value,
      // idDateData:
      //   // values.tipe_material.replaceAll(" ", "-") +
      //   // "-" +
      //   e.value.replaceAll(" ", "-") + "-" + today,
    });
  };

  //nama produk
  const handleInputChange4 = (e) => {
    // const { name, value } = e.value;
    // setValues({ ...values, nama_produsen: e.value });
    setValues({
      ...values,
      nama_produsen: e.value,
      idDateData:
        values.nama_material.replaceAll(" ", "-") +
        "-" +
        e.value.replaceAll(" ", "-") +
        "-" +
        today2 +
        "_" +
        jam,
    });
  };

  const handleInputChange5 = (e) => {
    // const { name, value } = e.value;
    setValues({
      ...values,
      idDateData: e.value,
    });
    console.log("values", values.idDateData);
  };

  const changeID = (e) => {
    // const { name, value } = e.value;
    // setValues({ ...values, nama_produsen: e.value });
    console.log(values.idDateData);
    setValues({
      ...values,
      idDateData:
        // values.tipe_material.replaceAll(" ", "-") +
        // "-" +
        values.idDateData.substring(0, values.idDateData.indexOf("_")) +
        "_" +
        values2.time,
    });
  };

  const [columns, setColumns] = useState([
    {
      title: "Code",
      field: "code",
      editable: "never",
    },
    {
      title: "Category",
      field: "part",
      editable: "never",
      // type: "date",
    },
    {
      title: "Parameter",
      field: "param",
      editable: "never",
      // type: "date",
    },
    {
      title: "Good",
      field: "good",
      editable: "never",
    },
    {
      title: "Need Action",
      field: "needaction",
      editable: "never",
    },
    {
      title: "Reject",
      field: "reject",
      editable: "never",
    },
    {
      title: "Result",
      field: "value",
      lookup: { Good: "Good", "Need Action": "Need Action", Reject: "Reject" },
      cellStyle: {
        paddingTop: 0,
        paddingLeft: 7,
        width: "5%",
      },
    },
    {
      title: "Remarks",
      field: "Vremarks",
    },
  ]);

  const rowBackgroundColors = {
    2: "green",
    3: "yellow",
    4: "red",
  };

  const [optIdDateData, setOptIdDateData] = useState([]);
  const [optionsNamaMaterial, setoptionsNamaMaterial] = useState([]);
  const [optionsNamaProd, setoptionsNamaProd] = useState([]);

  const postData = async (value, code, dateData) => {
    //data fetch
    // console.log("id", id);
    // console.log("values", value);
    // console.log("code ", code);
    // console.log("dateData ", dateData);
    // const data2 = JSON.stringify(value);
    // const data3 = data2.push({ datesystem: today2 });
    // console.log("data2", data3);

    const res = await fetch(
      `http://10.24.7.70:8080/editSiqma2/${code}/${dateData}`,
      {
        // const res = await fetch(`http://10.24.7.70:8080/addSiqma`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      }
    );

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
    }
    //data fetch end
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const hasEmptyFields = Object.values(values != batch).some(
      (element) => element === ""
    );
    // const hasEmptyFields = false;

    //cek dulu apa table value ada isi semua
    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
      // alert("Please fill in all fields");
    } else {
      setLoading(true);
      console.log(values);
      const res = await fetch(`http://10.24.7.70:8080/addSiqmaH`, {
        method: "POST",
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
        // console.log("res ", res);
        setLoading(false);
        // console.log("res msg ", res.message);
      } else {
        // const evt = await res.json();
        router.push(`/`);
        setLoading(false);
      }
    }
  };

  const handleRefresh = async (e) => {
    e.preventDefault();
    console.log("values 2 ", values);

    try {
      await fetch(
        `http://10.24.7.70:8080/siQmaMilkEdit/${values.date_of_production}/${values.tipe_material}/${values.nama_material}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json(); // return response.json() first
        })
        .then((json) => {
          // setData(json2);
          // console.log(json);
          const options = json
            // .filter((c) => c.materialType == values.tipe_material)
            .map((d) => ({
              value: d.idDateData,
              label: d.idDateData,
            }));
          setOptIdDateData(options);
          // setOpen(false);
        });
    } catch (err) {
      console.log("terjadi error:", err);
    }

    // console.log("id", kode); // ga keluar
  };

  const handleSubmitModal = async (e) => {
    e.preventDefault();
    // console.log("date_of_production", values.date_of_production);
    // console.log("optIdDateData ", values.optIdDateData);

    // const arr = [];
    // values.tipe_material == "UHT" ? (arr = "uh") : (arr = "es");

    try {
      await fetch(
        `http://10.24.7.70:8080/siQmaMilkEditD/${values.idDateData}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          return response.json(); // return response.json() first
        })
        .then((json) => {
          setData(json);
          // console.log(json);
          const dua = async () => {
            try {
              //http://10.24.7.70:8080/siQma/RM58
              await fetch(
                `http://10.24.7.70:8080/siQmaMilkEditH/${values.idDateData}`,
                {
                  method: "GET",
                }
              )
                .then((response) => response.json())
                .then((json2) => {
                  // console.log("data:", json2);
                  const options = json2
                    // .filter((c) => c.materialType == values.tipe_material)
                    .map((d) => ({
                      idDateData: d.idDateData,
                      date_of_inspection: d.date_of_inspection,
                      batch: d.batch,
                      date_of_production: d.date_of_production,
                      date_of_expired: d.date_of_expired,
                      nama_produsen: d.nama_produsen,
                      tipe_material: d.tipe_material,
                      nama_material: d.nama_material,
                      datesystem: d.datesystem,
                      footprint: d.footprint,
                    }));
                  // console.log(options);
                  // setValues(options[0]);
                  setValues({
                    ...values,
                    idDateData: options[0].idDateData,
                    date_of_inspection: moment(
                      options[0].date_of_inspection
                    ).format("YYYY-MM-DD"),
                    batch: options[0].batch,
                    date_of_production: moment(
                      options[0].date_of_production
                    ).format("YYYY-MM-DD"),
                    date_of_expired: moment(options[0].date_of_expired).format(
                      "YYYY-MM-DD"
                    ),
                    nama_produsen: options[0].nama_produsen,
                    tipe_material: options[0].tipe_material,
                    nama_material: options[0].nama_material,
                    datesystem: options[0].datesystem,
                    footprint: options[0].footprint,
                  });
                  console.log("options 3 ", options[0]);
                  console.log("values 3 ", values);
                });
              setOpen(false);
            } catch (err) {
              console.log("terjadi error:", err);
              setOpen(false);
            }
          };
          dua();
          setOpen(false);
        });
    } catch (err) {
      console.log("terjadi error:", err);
    }

    // console.log("id", kode); // ga keluar
  };

  //buat modal
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //buat modal end

  useEffect(() => {
    const fetchData = async () => {
      const arr = [];
      try {
        await fetch("http://10.24.7.70:8080/siQmaMaterial", {
          method: "GET",
        })
          .then((response) => {
            return response.json(); // return response.json() first
          })
          .then((json) => {
            const options = json
              .filter((c) => c.materialType == values.tipe_material)
              .map((d) => ({
                value: d.name,
                label: d.name,
              }));
            setoptionsNamaMaterial(options);
          });
      } catch (err) {
        console.log("terjadi error:", err);
      }
    };
    const fetchData2 = async () => {
      const arr = [];
      try {
        await fetch(`http://10.24.7.70:8080/getSKU/${values.tipe_material}`, {
          method: "GET",
        })
          .then((response) => {
            return response.json(); // return response.json() first
            // console.log(response);
          })
          .then((json) => {
            // console.log("values.tipe_material ", values);
            const options2 = json
              .filter((c) => c.type == values.tipe_material)
              .map((d) => ({
                value: d.sku,
                label: d.sku,
              }));
            setoptionsNamaProd(options2);
          });
      } catch (err) {
        console.log("terjadi error:");
      }
    };

    fetchData();
    fetchData2();
    // handleSubmitModal();
  }, [values.tipe_material]);

  return (
    <Layout title="siQma">
      {evt.length === 0 && <h3>No data to show</h3>}
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Material Code
          </Typography>
          <Divider />
          <br />
          <Grid container direction="row" justifyContent="space-between">
            <form onSubmit={handleSubmitModal}>
              <div className={styles.form2}>
                <div>
                  <label htmlFor="date_of_production">Production date</label>
                  <input
                    type="date"
                    name="date_of_production"
                    id="date_of_production"
                    value={values.date_of_production}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div>
                  <label htmlFor="tipe_material">Product Type</label>
                  <Select
                    defaultValue={values.tipe_material}
                    name="tipe_material"
                    id="tipe_material"
                    onChange={handleInputChange2}
                    // onChange={handleInputChange}
                    options={optionsTipeMaterial}
                    height="40px"
                    padding="5px"
                  />
                </div>
                <div>
                  <label htmlFor="nama_material">Line</label>
                  <Select
                    defaultValue={values.nama_material}
                    //inputValue={values.nama_material}
                    // defaultInputValue={values.nama_material}
                    name="nama_material"
                    id="nama_material"
                    onChange={handleInputChange3}
                    options={optionsLine.filter(
                      (c) => c.prod == values.tipe_material
                    )}
                    size="small"
                  />
                </div>
                <IconButton
                  color="primary"
                  aria-label="refresh data"
                  onClick={handleRefresh}
                >
                  <CachedIcon />
                </IconButton>
                <div>
                  <label htmlFor="idDateData">idDateData</label>
                  <Select
                    defaultValue={values.idDateData}
                    name="idDateData"
                    id="idDateData"
                    onChange={handleInputChange5}
                    // onChange={handleInputChange}
                    options={optIdDateData}
                    height="40px"
                    padding="5px"
                  />
                </div>
              </div>
              <Divider />
              <br />

              <input
                type="submit"
                value="Select"
                className="btn"
                variant="contained"
              />
            </form>
          </Grid>
        </Box>
      </Modal>
      <form onSubmit={handleSubmit} className={styles.form2}>
        {/* <div className={styles.grid}> */}
        <h1>ORION : Online Reporting IntegratiON</h1>
        <div className={styles.grid}>
          <div>
            <h4>#id: {values.idDateData} </h4>
          </div>
          <div>
            <label htmlFor="time">Change Time</label>
            <input
              type="time"
              name="time"
              id="time"
              value={values2.time}
              onChange={handleInputChangeX}
            ></input>

            <Button variant="outlined" onClick={changeID}>
              Refresh ID
            </Button>
          </div>
        </div>

        <div className={styles.grid}>
          <div>
            <label htmlFor="date_of_inspection">Inspection date</label>
            <input
              type="date"
              name="date_of_inspection"
              id="date_of_inspection"
              value={values.date_of_inspection}
              onChange={handleInputChange}
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="batch">Batch</label>
            <input
              type="text"
              name="batch"
              id="batch"
              value={values.batch}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="date_of_expired"> Expired date</label>
            <input
              type="date"
              name="date_of_expired"
              id="date_of_expired"
              value={values.date_of_expired}
              onChange={handleInputChange}
              disabled
            ></input>
          </div>

          <div>
            <label htmlFor="nama_produsen">Product Name</label>
            {/* <Select
              // defaultValue={values.nama_produsen}
              inputValue={values.nama_produsen}
              name="nama_produsen"
              id="nama_produsen"
              onChange={handleInputChange4}
              options={optionsNamaProd}
            /> */}
            <input
              type="text"
              name="nama_produsen"
              id="nama_produsen"
              value={values.nama_produsen}
              disabled
              // onChange={handleInputChange}
            ></input>
          </div>
          {/* <div>
            <label htmlFor="quantity">Qty</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              value={values.quantity}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="remarks">Remarks</label>
            <textarea
              type="text"
              name="remarks"
              id="remarks"
              value={values.remarks}
              onChange={handleInputChange}
            ></textarea>
          </div> */}
        </div>

        <MaterialTable
          title="Inspection Checklist"
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
          cellEditable={{
            cellStyle: {},
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve, reject) => {
                console.log("newValue: " + newValue);
                setTimeout(resolve, 4000);
              });
            },
          }}
          editable={{
            // onRowAdd: (newData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       setData([...data, newData]);
            //       resolve();
            //     }, 1000);
            //   }),
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       const dataUpdate = [...data]; // buat variable dataUpdate ambil dari isi data
            //       const index = oldData.tableData.id; // dapatkan id nya
            //       // console.log("newData ID array ", index); //ID OF ARRAY
            //       dataUpdate[index] = newData;
            //       // console.log("newData ", newData); //data baru database
            //       // console.log("dataUpdate ", dataUpdate); //data baru database
            //       setData([...dataUpdate]); // data yg hasil update untuk ditampilkan di table di update
            //       //setData([newData]); //CARA ADD
            //       const newArray = Object.assign(newData, {
            //         datesystem: today2,
            //         footprint: user ? user.email : null,
            //         idDateData: values.idDateData,
            //       });
            //       // console.log("index ", index);
            //       // console.log("newArray ", newArray);
            //       console.log("newData code ", newData.code); //ID database
            //       console.log("newData date data ", newData.idDateData); //ID database
            //       console.log("newData data ", newData); //ID database
            //       postData(newArray, newData.code, newData.idDateData); //kirim ke database
            //       resolve();
            //     }, 1000);
            //   }),

            onBulkUpdate: (selectedRows) =>
              new Promise((resolve, reject) => {
                const rows = Object.values(selectedRows);
                const dataUpdate = [...data];
                let index;
                rows.map((dt) => {
                  index = dt.oldData.tableData.id;
                  dataUpdate[index] = dt.newData;
                  const newArray = Object.assign(dt.newData, {
                    datesystem: today2,
                    footprint: user ? user.email : null,
                    idDateData: values.idDateData,
                  });
                  console.log("newData code ", dt.newData.code); //GRM01
                  console.log("newData date data ", dt.newData.idDateData); // RM-Alkohol--20221110-858
                  console.log("newData data ", dt.newData); //ALL DATA
                  postData(newArray, dt.newData.code, dt.newData.idDateData); //kirim ke database
                  // submitHandler(dt.newData.no_persetujuan,dt.newData.id)
                });
                setData(dataUpdate);
                resolve();
              }),

            // onBulkUpdate: (selectedRows) =>
            //   new Promise((resolve, reject) => {
            //     console.log(selectedRows); //
            //   }),

            // onBulkUpdate: (selectedRows) =>
            //   new Promise((resolve, reject) => {
            //     const rows = Object.values(selectedRows);
            //     // console.log("rows ", rows);
            //     const updatedRows = [...data];
            //     // console.log("updatedRows ", updatedRows);
            //     let index;
            //     rows.map((emp) => {
            //       index = emp.oldData.tableData.id;
            //       // console.log("index ", index);
            //       updatedRows[index] = emp.newData;
            //     });
            //     setTimeout(() => {
            //       setData(updatedRows);
            //       // console.log("updatedRows ", updatedRows);
            //       resolve();
            //     }, 2000);
            //   }),

            // onBulkUpdate: (changes) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       setData([...data, newData]);
            //       resolve();
            //     }, 1000);
            //   }),

            //
            //
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
            actionsColumnIndex: -1,
            addRowPosition: "first",
            headerStyle: {
              backgroundColor: "#11ba11",
              color: "#FFF",
            },
            // exportButton: true,
            sorting: true,
            paging: false,
            pageSize: 10, // make initial page size
            emptyRowsWhenPaging: false, // To avoid of having empty rows
            pageSizeOptions: [10, 20, 30], // rows selection options
            // rowStyle: (rowData) => ({
            //   backgroundColor:
            //     rowData.tableData.finding_audit_status === "Open"
            //       ? "#EEE"
            //       : "#FFF",
            // }),
          }}
        />

        {loading ? (
          <CircularProgress />
        ) : (
          <input
            type="submit"
            value="KEMASKINI DATA"
            className="btn"
            disabled={loading}
            style={{ backgroundColor: "#11ba11" }}
          />
        )}
      </form>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const { token } = parseCookies(req);
  // const res = await fetch(`${API_URL}/events/${id}`);

  //tidak dipakai
  const res = await fetch(`http://10.24.7.70:8080/siQma06`);
  const evt = await res.json();

  return {
    props: {
      evt,
      // token,
    },
  };
}
