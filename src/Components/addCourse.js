import { UploadOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, message, Select, Upload } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/userDataTable.css";

const { Option } = Select;
const AddCourse = () => {
  axios.create({
    baseURL: `http://alphaskool.tn/api/`,
  });

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
        section,
        classe,
        pdfUrl,
        svgUrl,
        videoUrl,
      };
      if (description===undefined ||courseName===undefined ||chapterName===undefined ||classe===undefined ){
        return setInvalidForm(true)
      } 

      console.log(newCourse);
      const course = await axios.post(
        "http://alphaskool.tn/api/course",
        newCourse
      );
      console.log(course);
      setCourse(course);
      setPdf([]);
      setVideo([]);
      history.push("/gestioncours");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      message.error(err.response.data.msg);
    }
  };

  const { TextArea } = Input;
  const [data] = useState([]); //table data
  const [error, setError] = useState();
  const [invalidForm, setInvalidForm] = useState(false);
  const [course, setCourse] = useState({});
  const [courseName, setCourseName] = useState();
  const [chapterName, setChapterName] = useState();
  const [description, setDescription] = useState();
  const [section, setSection] = useState();
  const [classe, setClasse] = useState();
  const [pdf, setPdf] = useState([]);
  const [video, setVideo] = useState([]);
  const [fileList, updateFileList] = useState([]);
  const [svgUrl, setSvgUrl] = useState();

  const addFiles = {
    name: "file",
    multiple: true,
    action: "http://alphaskool.tn/api/upload/uploadFile",
    beforeUpload: (file) => {
      if (file.type !== "application/pdf" && file.type !== "video/mp4") {
        return message.error(`${file.name} type de fichier non autorisé.`);
      }
      return file.type;
    },

    onChange: (info) => {
      //file.status is empty when beforeUpload return false
      if (info.file.type === "application/pdf")
        setPdf((pdf) => [
          ...pdf,
          info.file.name.toLowerCase().split(" ").join("-"),
        ]);
      // setPdf(info.file.name.toLowerCase().split(" ").join("-"));
      else if (info.file.type === "video/mp4")
        setVideo((video) => [
          ...video,
          info.file.name.toLowerCase().split(" ").join("-"),
        ]);
      updateFileList(info.fileList.filter((file) => !!file.status));
    },
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
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
      default:
        console.log("no svg");
    }
  }

  const chapitres = [];
  data.map((chapitre) => {
    return chapitres.push(
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
      }}
    >
      <Form.Item label="Matière :" >
        <Select defaultValue="Matière" onChange={handleChangeCourseName}>
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
        <Select defaultValue="Classe" onChange={handleChangeClasse}>
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
          // style={{ width: 300 }}
          placeholder="Chapitre"
          onChange={handleChangeCourse}
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
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Ajouter un fichier :">
        <Upload {...addFiles}>
          <Button icon={<UploadOutlined />}>Ajouter un fichier</Button>
        </Upload>
      </Form.Item>

      {/* <Upload {...addFiles}>
        <Button style={{ marginTop: 20 }} icon={<UploadOutlined />}>
          Ajouter un video
    </Button>
      </Upload>*/}
      <Form.Item label="Ajouter :"  >
        <Button htmlType="submit" type="primary" onClick={submit}>
          Ajouter
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default AddCourse;
