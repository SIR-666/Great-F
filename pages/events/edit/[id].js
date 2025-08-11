import { parseCookies } from "@/helpers/index";
import moment from "moment";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import Box from "@mui/material/Box";

const options = [
  { value: "Adi Nugroho", label: "Adi Nugroho" },
  { value: "Imam Nur", label: "Imam Nur" },
  { value: "Joeng Loekman", label: "Joeng Loekman" },
];

export default function EditEventPage({ evt, token }) {
  const [values, setValues] = useState({
    projectName: evt.projectName,
    projectLeader: evt.projectLeader,
    projectDate: evt.projectDate,
    methode: evt.methode,
    problemDescription: evt.problemDescription,
    target: evt.target,
    rootCause: evt.rootCause,
    action: evt.action,
    actionPhoto: evt.actionPhoto,
    rootCause: evt.rootCause,
    rootCausePhoto: evt.rootCausePhoto,
    orgStructure: evt.orgStructure,
    photo_before: evt.photoBefore,
    photo_after: evt.photoAfter,
    status: evt.status,
  });
  // const [selectedOption, setSelectedOption] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    evt.actionPhoto ? evt.actionPhoto.formats.small.url : null
  );
  const [imagePreviewOS, setImagePreviewOS] = useState(
    evt.orgStructure ? evt.orgStructure.formats.small.url : null
  );
  const [imagePreviewPB, setImagePreviewPB] = useState(
    evt.photoBefore ? evt.photoBefore.formats.small.url : null
  );
  const [imagePreviewPA, setImagePreviewPA] = useState(
    evt.photoAfter ? evt.photoAfter.formats.small.url : null
  );
  const [imagePreviewRC, setImagePreviewRC] = useState(
    evt.rootCausePhoto ? evt.rootCausePhoto.formats.small.url : null
  );

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);

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

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
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

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreview(data.actionPhoto.formats.small.url);
    setShowModal(false);
  };

  const imageUploaded2 = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreviewOS(data.orgStructure.formats.small.url);
    setShowModal2(false);
  };

  const imageUploaded3 = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreviewPB(data.photoBefore.formats.small.url);
    setShowModal3(false);
  };

  const imageUploaded4 = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreviewPA(data.photoAfter.formats.small.url);
    setShowModal4(false);
  };

  const imageUploaded5 = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreviewRC(data.rootCausePhoto.formats.small.url);
    setShowModal5(false);
  };

  return (
    <Layout title="Edit New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Project</h1>
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
              value={moment(values.projectDate).format("yyyy-MM-DD")}
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

        <input type="submit" value="Update Project" className="btn" />
      </form>

      <>
        <h2>Action Image</h2>
        {imagePreview ? (
          <Image src={imagePreview} width={900} height={600} />
        ) : (
          <div>
            <p>No image uploaded</p>
          </div>
        )}

        <div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-secondary btn-icon"
          >
            <FaImage />
            Change Image
          </button>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload
            evtId={evt.id}
            imageUploaded={imageUploaded}
            token={token}
            type="actionPhoto"
          />
        </Modal>
      </>

      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <div sx={{ flexDirection: "row" }}>
            <h2>Root Cause</h2>
            {imagePreviewRC ? (
              <Image src={imagePreviewRC} width={450} height={300} />
            ) : (
              <div>
                <p>No image uploaded</p>
              </div>
            )}
            <div>
              <button
                onClick={() => setShowModal5(true)}
                className="btn-secondary btn-icon"
              >
                <FaImage />
                Change Image
              </button>
            </div>
            <Modal show={showModal5} onClose={() => setShowModal5(false)}>
              <ImageUpload
                evtId={evt.id}
                imageUploaded={imageUploaded5}
                token={token}
                type="rootCausePhoto"
              />
            </Modal>
          </div>
          <div sx={{ flexDirection: "row" }}> &nbsp;</div>
          <div sx={{ flexDirection: "row" }}>
            <h2>Organization Structure</h2>
            {imagePreviewOS ? (
              <Image src={imagePreviewOS} width={450} height={300} />
            ) : (
              <div>
                <p>No image uploaded</p>
              </div>
            )}
            <div>
              <button
                onClick={() => setShowModal2(true)}
                className="btn-secondary btn-icon"
              >
                <FaImage />
                Change Image
              </button>
            </div>
            <Modal show={showModal2} onClose={() => setShowModal2(false)}>
              <ImageUpload
                evtId={evt.id}
                imageUploaded={imageUploaded2}
                token={token}
                type="orgStructure"
              />
            </Modal>
          </div>
        </Box>
      </div>

      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <div sx={{ flexDirection: "row" }}>
            <h2>Photo Before</h2>
            {imagePreviewPB ? (
              <Image src={imagePreviewPB} width={450} height={300} />
            ) : (
              <div>
                <p>No image uploaded</p>
              </div>
            )}

            <div>
              <button
                onClick={() => setShowModal3(true)}
                className="btn-secondary btn-icon"
              >
                <FaImage />
                Change Image
              </button>
            </div>

            <Modal show={showModal3} onClose={() => setShowModal3(false)}>
              <ImageUpload
                evtId={evt.id}
                imageUploaded={imageUploaded3}
                token={token}
                type="photoBefore"
              />
            </Modal>
          </div>
          <div sx={{ flexDirection: "row" }}> &nbsp;</div>
          <div sx={{ flexDirection: "row" }}>
            <h2>Photo After</h2>
            {imagePreviewPA ? (
              <Image src={imagePreviewPA} width={450} height={300} />
            ) : (
              <div>
                <p>No image uploaded</p>
              </div>
            )}

            <div>
              <button
                onClick={() => setShowModal4(true)}
                className="btn-secondary btn-icon"
              >
                <FaImage />
                Change Image
              </button>
            </div>

            <Modal show={showModal4} onClose={() => setShowModal4(false)}>
              <ImageUpload
                evtId={evt.id}
                imageUploaded={imageUploaded4}
                token={token}
                type="photoAfter"
              />
            </Modal>
          </div>
        </Box>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  console.log(req.headers.cookie); //cookie

  return {
    props: {
      evt,
      token,
    },
  };
}
