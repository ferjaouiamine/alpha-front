import React, { useState, useEffect } from "react";
import "../css/userDataTable.css";
import axios from "axios";
import { Upload, Button, message, Form } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Select, Input } from "antd";
import { useLocation } from "react-router-dom";
import { Alert } from 'antd';

const { Option } = Select;
const UpdateCourse = (props) => {
  axios.create({
    baseURL: `http://37.59.204.215/api/`,
  });

  const location = useLocation();

  let history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    let pdfUrl = [...new Set(pdf)];
    let videoUrl = [...new Set(video)];
    try {
      const newCourse = {
        courseName,
        chapterName,
        description,
        classe,
        section,
        svgUrl,
        pdfUrl,
        videoUrl,
      };
      console.log(newCourse)
      
      if (description===undefined ||courseName===undefined ||chapterName===undefined ||classe===undefined ){
        return setInvalidForm(true)
      } 
      const course = await axios.put(
        `http://37.59.204.215/api/course/${location.state.rowData._id}`,
        newCourse
      );
      setCourse(course);
      history.push("/gestioncours");
    } catch (err) {
      console.log(err);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const { TextArea } = Input;
  const [data, setData] = useState([]); //table data
  const [error, setError] = useState();
  const [invalidForm, setInvalidForm] = useState(false);
  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState(location.state.rowData.courseName);
  const [chapterName, setChapterName] = useState(location.state.rowData.chapterName);
  const [description, setDescription] = useState(location.state.rowData.description);
  const [section] = useState();
  const [classe, setClasse] = useState(location.state.rowData.classe);
  const [pdf, setPdf] = useState([]);
  const [video, setVideo] = useState([]);

  const [fileList, updateFileList] = useState([]);
  const [svgUrl ,setSvgUrl] = useState();
  
  let defaultfiles = [];
  /*useEffect(
    () => {
      const getCourse = async () => {
        await api
          .get(`/course/${location.state.rowData._id}`)
          .then((res) => {
            setDataToUpdate(res.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getCourse();
    },
    [location],
    [dataToUpdate]
  );
*/

  useEffect(() => {
    const pdfFiles = () => {
      location.state.rowData.pdfUrl.map((file) => {
        defaultfiles.push({
          name: file,
          url: `http://37.59.204.215/api/${file}`,
        });
        return defaultfiles;
      });
    };
    const videoFiles = () => {
      location.state.rowData.videoUrl.map((file) => {
        defaultfiles.push({
          name: file,
          url: `http://37.59.204.215/api/${file}`,
        });
        return defaultfiles;
      });
    };
    pdfFiles();
    videoFiles();
    //allFiles = defaultfiles.concat(defaultFilesVideo);
  }, []);

  const addFiles = {
    name: "file",
    multiple: true,
    action: "http://37.59.204.215/api/upload/uploadFile",
    beforeUpload: (file) => {
      if (file.type !== "application/pdf" && file.type !== "video/mp4") {
        return message.error(`${file.name} type de fichier non autorisé.`);
      }
      return file.type;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} fichier téléchargé avec succès.`);
      } else if (status === "error") {
        message.error(`${info.file.name} échec du téléchargement du fichier.`);
      }
    },

    onRemove: (file) => {
      if (file.name.indexOf(".pdf") > -1) {
        const index = location.state.rowData.pdfUrl.indexOf(file);
        console.log(index);
        const newFileList = location.state.rowData.pdfUrl.slice();
        location.state.rowData.pdfUrl.splice(index, 1);
        console.log(newFileList.url);
        setPdf(location.state.rowData.pdfUrl);
        let pdfUrl = [...new Set(pdf)];
        setVideo(location.state.rowData.videoUrl);
        let videoUrl = [...new Set(video)];
        axios.put(
          `http://37.59.204.215/api/course/${location.state.rowData._id}`,
          pdfUrl,
          videoUrl
        );
        return {
          defaultfiles: newFileList,
        };
      } else {
        const index = location.state.rowData.videoUrl.indexOf(file);
        console.log(index);
        const newFileList = location.state.rowData.videoUrl.slice();
        location.state.rowData.videoUrl.splice(index, 1);
        console.log(newFileList.url);
        setVideo(location.state.rowData.videoUrl);
        let videoUrl = [...new Set(video)];
        let pdfUrl = [...new Set(pdf)];
        setPdf(location.state.rowData.pdfUrl);
        axios.put(
          `http://37.59.204.215/api/course/${location.state.rowData._id}`,
          videoUrl,
          pdfUrl
        );
        return {
          defaultfiles: newFileList,
        };
      }
    },

    onChange: (info) => {
      //file.status is empty when beforeUpload return false
      updateFileList(info.fileList.filter((file) => !!file.status));
      console.log(defaultfiles);
      if (info.file.type === "application/pdf")
        setPdf((fileList) => [
          ...fileList,
          info.file.name.toLowerCase().split(" ").join("-"),
        ]);
      else if (info.file.type === "video/mp4")
        setVideo((fileList) => [
          ...fileList,
          info.file.name.toLowerCase().split(" ").join("-"),
        ]);
    },
    defaultFileList: defaultfiles,
    /*[
    {
      name: location.state.rowData.pdfUrl[0],
      url: `https://alpha-school.herokuapp.com/uploads/${location.state.rowData.pdfUrl[0]}`,
    },
    
    {
      uid: "2",
      name: location.state.rowData.videoUrl[0],
      status: "done",
      url: `https://alpha-school.herokuapp.com/uploads/${location.state.rowData.videoUrl[0]}`,
    },
  ],*/
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  function handleChangeCourse(value) {
    console.log(`selected ${value}`);
    setChapterName(value[0]);
  }

  function handleChangeClasse(value) {
    console.log(`selected ${value}`);
    setClasse(value);
  }

  function handleChangeCourseName(value) {
    console.log(`selected ${value}`);
    setCourseName(value);
    switch (value) {
      case "Physique":
        setSvgUrl(
          "https://ta-storage.s3.amazonaws.com/prod/subjects_icons/physique.svg"
        );
        break;
      case "Chimie":
        setSvgUrl(
          "https://ta-storage.s3.amazonaws.com/prod/subjects_icons/chimie.svg"
        );
        break;
      case "Base de donnée":
        setSvgUrl(
          "https://ta-storage.s3.amazonaws.com/prod/subjects_icons/bd.svg"
        );
        break;
      case "algo":
        setSvgUrl(
          "https://ta-storage.s3.amazonaws.com/prod/subjects_icons/programmation.svg"
        );
        break;
      case "arabe":
        setSvgUrl(
          "https://ta-storage.s3.amazonaws.com/prod/subjects_icons/arabe.svg"
        );
        break;
      case "français":
        setSvgUrl(
          "https://ta-storage.s3.amazonaws.com/prod/subjects_icons/francais.svg"
        );
        break;
      case "anglais":
        setSvgUrl(
          "https://ta-storage.s3.amazonaws.com/prod/subjects_icons/english.svg"
        );
        break;
      case "math":
        setSvgUrl(
          "https://ta-storage.s3.amazonaws.com/prod/subjects_icons/maths.svg"
        );
        break;
    }
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  const chapitres = [];
  data.map((chapitre) => {
    chapitres.push(
      <Option key={chapitre.chapterName}>{chapitre.chapterName}</Option>
    );
  });


  const onClose = (e) => {
    setInvalidForm(false)
   };
 
  return (
    <div>
      {invalidForm &&   <Alert style={{marginTop:20}}
      message="Formulaire invalide"
      description="Veuillez remplir tous les champs."
      type="error"
      showIcon
      closable
      onClose={onClose}
      
    />}
    <Form
    {...layout}
    onSubmit={submit}
    noValidate
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 25,
    }}
    size="large"
    layout="vertical"
    style={{ marginTop: 100 }}
    initialValues={{
      remember: true,
    }}>
      <Form.Item  label="Matière :" >
        <Select
          onChange={handleChangeCourseName}
          defaultValue={location.state.rowData.courseName}
        >
          <Option value="Physique">Physique</Option>
          <Option value="Chimie">Chimie</Option>
          {/* <option value="Base de donnée">Base de donnée</option>
          <option value="algo">Algorithme</option>
          <option value="technique">Technique</option>
          <option value="arabic">Arabe</option>
          <option value="français">Français</option>
          <option value="anglais">English</option>
          <option value="science">Science</option>
          <option value="mecanique">Mecanique</option>
          <option value="économie">économie</option>
          <option value="gestion">Gestion</option>*/}
        </Select>
      </Form.Item>
      <Form.Item label="Classe :" >
        <Select
          onChange={handleChangeClasse}
          defaultValue={location.state.rowData.classe}
        >
          <Option value="1">1 ère Secondaire</Option>
          <Option value="2économie">2 ème économie et serivce</Option>
          <Option value="2Informatique">2 ème Informatique</Option>
          <Option value="2Science Exp">2 ème Scientifique </Option>
          <Option value="3Informatique">3 ème Informatique</Option>
          <Option value="3Mathématiques">3 ème Mathématiques</Option>
          <Option value="3Science Exp">3 ème Science Exp</Option>
          <Option value="3Techniques">3 ème Techniques</Option>
          <Option value="4économie">Bac économie</Option>
          <Option value="4Informatique">Bac Informatique</Option>
          <Option value="4Lettre">Bac Lettre</Option>
          <Option value="4mathématiques">Bac Mathématiques</Option>
          <Option value="4Science Exp">Bac Science Exp</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Chapitre :">
        <Select
          mode="tags"
         
          placeholder="Chapitre"
          onChange={handleChangeCourse}
          defaultValue={location.state.rowData.chapterName}
        >
          {chapitres}
        </Select>
      </Form.Item>
      {/*<Select
        defaultValue="Chapitre"
        style={{ width: 300 }}
        onChange={handleChangeCourse}
      >
        <Option value="Le condensateur">Le condensateur</Option>
        <Option value="Dipole RC">Dipole RC</Option>
        <Option value="La Bobine">La Bobine</Option>
        <Option value="Le dipole RL">Le dipole RL</Option>
        <Option value="Les alcools">Les alcools</Option>
        <Option value="Mesure d'une quantité de la matière">
          Mesure d'une quantité de la matière
        </Option>
      </Select>*/}
      <Form.Item label="Description :">
        <TextArea
          rows={4}
          placeholder="description"
          defaultValue={location.state.rowData.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Modifier un fichier :"> 
        <Upload {...addFiles}>
          <Button icon={<FileAddOutlined />}>Ajouter un fichier</Button>
        </Upload>
      </Form.Item>
      {/*<Upload {...addFiles}>
        <Button style={{ marginTop: 20 }} icon={<UploadOutlined />}>
          Ajouter un video
        </Button>
    </Upload>*/}
      <Form.Item label="Modifier :">
        <Button htmlType="submit" type="primary" onClick={submit}>
          Modifier
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default UpdateCourse;
