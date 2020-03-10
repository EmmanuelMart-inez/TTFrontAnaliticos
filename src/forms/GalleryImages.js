import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function GalleryImages() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([1, 2, 3, 4, 1, 2, 3, 4]);
  const [imageSelected, setImageSelected] = React.useState("");

  const handleLoading = () => {
    // setLoading(true);
    axios
      .get(`https://bubbletown.me/images`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data.images);
          setLoading(false);
        }
        //   else return 3;
        // else Show a error messages
        // let data = this.state.data;
        // const index = data.indexOf(oldData);
        // data.splice(index, 1);
        // this.setState({ data }, () => resolve());
      })
      .catch(e => {
        console.log(e);
        return 3;
        // setFieldValue("sendProgress", 3);
      });
  };

  const url = `https://bubbletown.me/images`;
  useEffect(() => {
    const fetchData = async () => {
      //   setIsError(false);
      setLoading(true);
      try {
        const result = await axios.get(url);
        setData(result.data.images);
      } catch (error) {
        console.log(error);
        // setIsError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <>
      {/* {handleLoadisng()} */}
      <div class="ui four cards">
        {loading
          ? data.map(img => (
              <a class="red card">
                <div class=" small image">
                  <img src="/assets/white-image.png" />
                </div>
              </a>
            ))
          : data.map(imagen => {
              if (imageSelected == imagen)
                return (
                  <a
                    class="blue card"
                    onClick={() => setImageSelected(imagen)}
                  >
                    <div class="content" style={{backgroundColor: "#98d6ea"}}>
                      <div class="right floated meta">Imagen Seleccionada</div>
                      <i
                        class="big check circle icon"
                      ></i>
                    </div>
                    <div class="small image">
                      <img src={`https://bubbletown.me/download/${imagen}`} />
                    </div>
                  </a>
                );
              else
                return (
                  <a class="green card" onClick={() => setImageSelected(imagen)}>
                    <div class="small image">
                      <img src={`https://bubbletown.me/download/${imagen}`} />
                    </div>
                  </a>
                );
            })}
      </div>
    </>
  );
}
