import React, { useState, useEffect } from "react";
//import PDFViewer from "pdf-viewer-reactjs";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import Progress from "./progress";
import { Collapse } from "antd";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Breadcrumb } from "antd";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const CoursePage = () => {
  const location = useLocation();
  const [coures, setCoures] = useState({});
  const [video, setVideo] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const { Panel } = Collapse;

  //let id = location.pathname.substr(12, location.pathname.length);
  let id = location.state.courseId;

  console.log(id);
  const courseContent = () => {
    return (
      <div style={{ marginTop: "5%" }}>
        <div>
          <Breadcrumb  style={{ marginTop: 20,justifyContent: "flexStart" ,display: "flex"}}>
            <h2><Breadcrumb.Item>Mes cours</Breadcrumb.Item></h2>
            <h2><Breadcrumb.Item>Chapitre</Breadcrumb.Item></h2>
            <Breadcrumb.Item><h2>{coures.chapterName}</h2></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ marginTop: 20 ,boxShadow: "2px 4px 2px #9E9E9E"}}>
            <Collapse bordered={true} className="site-collapse-custom-collapse">
              <Panel header="Liste des videos">
                <Collapse accordion>
                  {video.map((v, i) => (
                    <Panel header={v} key={i + 1}>
                      <video
                        controls="controls"
                        controlsList="nodownload"
                        width="750"
                        height="470"
                        src={`http://localhost:3001/uploads/${v}`}
                      ></video>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            </Collapse>
          </div>

          <div style={{ marginTop: 40 ,boxShadow: "2px 4px 2px #9E9E9E"}}>
            <Collapse bordered={true} className="site-collapse-custom-collapse">
              <Panel header="Lesson Attachments">
                <Collapse accordion>
                  {pdf.map((p, i) => {
                    return (
                      <Panel header={p} key={i + 1}>
                        <iframe
                          className="embed-responsive-item"
                          width="1000"
                          height="700"
                          src={`http://localhost:3001/uploads/${p}#toolbar=0`}
                        ></iframe>
                      </Panel>
                    );
                  })}
                </Collapse>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const coursesRes = Axios.get(`http://localhost:3001/api/course/${id}`);
        setPdf((await coursesRes).data.data.pdfUrl);
        setVideo((await coursesRes).data.data.videoUrl);
        setCoures((await coursesRes).data.data);
        setLoading(false);
      } catch (err) {
        err && setError(err);
        console.log(error);
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  return <>{loading ? <Progress /> : courseContent()}</>;
};

export default CoursePage;
