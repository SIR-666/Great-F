import { parseCookies } from "@/helpers/index";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

const options = [
  { value: "Adi Nugroho", label: "Adi Nugroho" },
  { value: "Imam Nur", label: "Imam Nur" },
  { value: "Joeng Loekman", label: "Joeng Loekman" },
];

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    projectName: "",
    projectLeader: "",
    projectDate: "",
    methode: "",
    problemDescription: "",
    target: "",
    rootCause: "",
    // rootCausePhoto: "",
    // so: "",
    // photo_before: "",
    // photo_after: "",
    // photo: "",
    action: "",
    // actionPhoto: "",
    // status: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      console.log(res);
      // console.log(res.message);
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      // router.push(`/events/${evt.attributes.slug}`);
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputChange2 = (e) => {
    // const { name, value } = e.value;
    setValues({ ...values, projectLeader: e.value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Project</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={values.projectName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="projectLeader">Project Leader</label>
            {/* <input
              type="text"
              name="projectLeader"
              id="projectLeader"
              value={values.projectLeader}
              onChange={handleInputChange}
            /> */}

            <Select
              defaultValue={values.projectLeader}
              // value={values.projectLeader}
              // onChange={setSelectedOption}
              name="projectLeader"
              id="projectLeader"
              onChange={handleInputChange2}
              options={options}
            />
          </div>

          <div>
            <label htmlFor="methode">Methode</label>
            <input
              type="text"
              name="methode"
              id="methode"
              value={values.methode}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="projectDate">Date</label>
            <input
              type="date"
              name="projectDate"
              id="projectDate"
              value={values.projectDate}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>

        <div>
          <label htmlFor="problemDescription">Problem Description</label>
          <textarea
            type="text"
            name="problemDescription"
            id="problemDescription"
            value={values.problemDescription}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="target">Target</label>
          <textarea
            type="text"
            name="target"
            id="target"
            value={values.target}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="rootCause">Root Cause</label>
          <textarea
            type="text"
            name="rootCause"
            id="rootCause"
            value={values.rootCause}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="action">Action</label>
          <textarea
            type="text"
            name="action"
            id="action"
            value={values.action}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Project" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
